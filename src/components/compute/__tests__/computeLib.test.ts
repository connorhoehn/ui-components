import { describe, expect, it, vi } from 'vitest';
import { buildWorkspaceTree, countDescendants, visibleRows } from '../lib/workspaceTree';
import { closeAdvice, encodeFrame, encodeResize, exhaustedAdvice, exitCodeOf, SHELL_CHANNEL } from '../lib/shellProtocol';
import { expiryPressure, statusOf } from '../lib/status';
import { fuzzyScore } from '../components/LabChooser';
import { summarizeTool } from '../hooks/useComputeTask';
import { createComputeClient, type ComputeClient } from '../lib/computeClient';

describe('buildWorkspaceTree', () => {
  it('nests files under directories and sorts dirs first', () => {
    const tree = buildWorkspaceTree(['f README.md', 'd src', 'f src/main.py', 'd src/lib', 'f src/lib/x.py']);
    expect(tree.map((n) => n.name)).toEqual(['src', 'README.md']);
    const src = tree[0]!;
    expect(src.children.map((n) => n.name)).toEqual(['lib', 'main.py']);
  });

  it('creates parents for a child printed before its directory', () => {
    // `find` does not guarantee parents come first; a tree that only linked
    // what it had already seen would scatter these at the root.
    const tree = buildWorkspaceTree(['f a/b/c.txt']);
    expect(tree).toHaveLength(1);
    expect(tree[0]!.name).toBe('a');
    expect(tree[0]!.children[0]!.children[0]!.name).toBe('c.txt');
  });

  it('keeps pruned directories as unexpandable stubs', () => {
    const tree = buildWorkspaceTree(['p node_modules', 'f index.js']);
    const pruned = tree.find((n) => n.name === 'node_modules')!;
    expect(pruned.pruned).toBe(true);
    expect(pruned.children).toHaveLength(0);
  });

  it('strips the leading ./ and drops the root entry', () => {
    const tree = buildWorkspaceTree(['d .', 'f ./a.txt']);
    expect(tree.map((n) => n.path)).toEqual(['a.txt']);
  });

  it('ignores malformed lines rather than throwing', () => {
    expect(buildWorkspaceTree(['', 'x', 'f ok.txt'])).toHaveLength(1);
  });
});

describe('visibleRows', () => {
  const tree = buildWorkspaceTree(['d src', 'f src/main.py', 'f README.md']);

  it('hides the children of a collapsed directory', () => {
    expect(visibleRows(tree, new Set()).map((r) => r.node.name)).toEqual(['src', 'README.md']);
  });

  it('reveals them, with depth, when expanded', () => {
    const rows = visibleRows(tree, new Set(['src']));
    expect(rows.map((r) => r.node.name)).toEqual(['src', 'main.py', 'README.md']);
    expect(rows[1]!.depth).toBe(1);
  });
});

describe('countDescendants', () => {
  it('counts the whole subtree, not just direct children', () => {
    const tree = buildWorkspaceTree(['d a', 'd a/b', 'f a/b/c.txt']);
    expect(countDescendants(tree[0]!)).toBe(2);
  });
});

describe('shell protocol', () => {
  it('prefixes the channel byte', () => {
    const frame = encodeFrame(SHELL_CHANNEL.STDIN, new TextEncoder().encode('ls'));
    expect(frame[0]).toBe(0x00);
    expect(new TextDecoder().decode(frame.subarray(1))).toBe('ls');
  });

  it('encodes a resize as width/height JSON, not cols/rows', () => {
    const frame = encodeResize(120, 40);
    expect(frame[0]).toBe(SHELL_CHANNEL.RESIZE);
    expect(JSON.parse(new TextDecoder().decode(frame.subarray(1)))).toEqual({ width: 120, height: 40 });
  });

  it('handles an empty payload', () => {
    expect(encodeFrame(SHELL_CHANNEL.HEARTBEAT)).toHaveLength(1);
  });

  it('never retries the two codes retrying cannot fix', () => {
    // 1003 means we sent text on a binary socket — reconnecting repeats it.
    expect(closeAdvice(1003).retry).toBe(false);
    // 4000 means someone else claimed the shell — retrying starts a fight.
    expect(closeAdvice(4000).retry).toBe(false);
    expect(closeAdvice(1006).retry).toBe(true);
    expect(closeAdvice(1000).retry).toBe(false);
  });

  it('blames the shell quota only once the retries are spent', () => {
    expect(exhaustedAdvice(1006, 1)).toBeNull();
    expect(exhaustedAdvice(1006, 5)).toMatch(/10 shells/);
    expect(exhaustedAdvice(1000, 5)).toBeNull();
  });

  it('reads an exit code out of a status frame', () => {
    expect(exitCodeOf({ details: { causes: [{ reason: 'ExitCode', message: '3' }] } })).toBe(3);
    expect(exitCodeOf({ details: { causes: [{ reason: 'Other', message: '3' }] } })).toBeNull();
    expect(exitCodeOf({})).toBeNull();
    expect(exitCodeOf({ details: { causes: [{ reason: 'ExitCode', message: 'nope' }] } })).toBeNull();
  });
});

describe('expiryPressure', () => {
  it('is urgent under five minutes and not above it', () => {
    expect(expiryPressure(4 * 60_000, 3_600_000).urgent).toBe(true);
    expect(expiryPressure(6 * 60_000, 3_600_000).urgent).toBe(false);
  });

  it('clamps a deadline beyond the assumed window', () => {
    expect(expiryPressure(9_999_999, 3_600_000).fraction).toBe(1);
    expect(expiryPressure(-5, 3_600_000).fraction).toBe(0);
  });
});

describe('statusOf', () => {
  it('treats a status-less box as idle rather than crashing a lookup table', () => {
    expect(statusOf({})).toBe('idle');
    expect(statusOf(null)).toBe('idle');
    expect(statusOf({ status: 'running' })).toBe('running');
  });
});

describe('fuzzyScore', () => {
  it('matches a subsequence', () => {
    expect(fuzzyScore('demo-bravo', 'dba')).not.toBeNull();
    expect(fuzzyScore('demo-bravo', 'zzz')).toBeNull();
  });

  it('scores a tighter match better', () => {
    const tight = fuzzyScore('demo-alpha', 'demo')!;
    const scattered = fuzzyScore('demo-alpha', 'dla')!;
    expect(tight).toBeLessThan(scattered);
  });

  it('is case-insensitive and treats an empty query as a match', () => {
    expect(fuzzyScore('Demo-Alpha', 'demo')).not.toBeNull();
    expect(fuzzyScore('anything', '')).toBe(0);
  });
});

describe('summarizeTool', () => {
  it('prefers the target over the tool name', () => {
    expect(summarizeTool('Read', { file_path: 'src/main.py' })).toBe('src/main.py');
    expect(summarizeTool('Bash', { command: 'git status' })).toBe('git status');
  });

  it('falls back to the tool name when nothing identifies the target', () => {
    expect(summarizeTool('Mystery', {})).toBe('Mystery');
    expect(summarizeTool('Mystery', { count: 3 })).toBe('Mystery');
  });

  it('truncates a target long enough to wreck a one-line stream', () => {
    const summary = summarizeTool('Write', { file_path: 'x'.repeat(500) });
    expect(summary).toHaveLength(96);
    expect(summary.endsWith('…')).toBe(true);
  });

  it('collapses newlines so a multi-line command stays one line', () => {
    expect(summarizeTool('Bash', { command: 'a\n  b' })).toBe('a b');
  });
});

describe('createComputeClient', () => {
  const ok = (body: unknown) =>
    ({ ok: true, status: 200, json: async () => body }) as Response;

  it('surfaces the server error message rather than a bare status', async () => {
    const fetchImpl = vi.fn(async () =>
      ({ ok: false, status: 403, json: async () => ({ error: 'requires ManageDevbox' }) }) as Response);
    const client = createComputeClient({ fetchImpl: fetchImpl as unknown as typeof fetch });
    await expect(client.listComputers()).rejects.toThrow('requires ManageDevbox');
  });

  it('falls back to the status when the body is not JSON', async () => {
    const fetchImpl = vi.fn(async () =>
      ({ ok: false, status: 502, json: async () => { throw new Error('not json'); } }) as unknown as Response);
    const client = createComputeClient({ fetchImpl: fetchImpl as unknown as typeof fetch });
    await expect(client.listComputers()).rejects.toThrow('HTTP 502');
  });

  it('unwraps the boxes envelope', async () => {
    const fetchImpl = vi.fn(async () => ok({ boxes: [{ id: 'a' }] }));
    const client = createComputeClient({ fetchImpl: fetchImpl as unknown as typeof fetch });
    await expect(client.listComputers()).resolves.toEqual([{ id: 'a' }]);
  });

  it('honours a custom base path everywhere, including the tail URL', async () => {
    const seen: string[] = [];
    const fetchImpl = vi.fn(async (input: RequestInfo | URL) => {
      seen.push(String(input));
      return ok({ boxes: [] });
    });
    const client = createComputeClient({ baseUrl: '/x/compute', fetchImpl: fetchImpl as unknown as typeof fetch });
    await client.listComputers();
    expect(seen[0]).toBe('/x/compute/boxes');
    expect(client.tail('b1').url).toBe('/x/compute/boxes/b1/tail');
  });

  it('encodes ids that would otherwise break the path', () => {
    const client = createComputeClient({ baseUrl: '/api' });
    expect(client.tail('a/b').url).toBe('/api/boxes/a%2Fb/tail');
  });

  it('tells the caller how to authenticate a tail, since EventSource cannot send headers', () => {
    const cookie = createComputeClient({ credentials: 'include' });
    expect(cookie.tail('b1').withCredentials).toBe(true);

    // A host authenticating with headers gets them back rather than a silent
    // 401: EventSource cannot carry them, so it has to tail another way.
    const header = createComputeClient({ credentials: 'omit', headers: { Authorization: 'Bearer x' } });
    expect(header.tail('b1').withCredentials).toBe(false);
    expect(header.tail('b1').headers).toEqual({ Authorization: 'Bearer x' });
  });
});

// ── The in-band failure frames ─────────────────────────────────────────────
//
// `devbox_error` and `devbox_end` are emitted AFTER the response head is
// written, so the HTTP request succeeds and the stream ends normally. Nothing
// throws. Before these were handled, a failed or timed-out run resolved as a
// silent success: no output, no error, nothing to act on.

import { renderHook, act } from '@testing-library/react';
import { useComputeTask } from '../hooks/useComputeTask';

/** Only `runTask` is reached, so the rest of the surface is not stubbed. */
function clientEmitting(events: Array<Record<string, unknown>>): Pick<ComputeClient, 'runTask'> {
  return {
    runTask: async (_sessionId, _body, onEvent) => {
      for (const event of events) onEvent(event);
    },
  };
}

async function runWith(events: Array<Record<string, unknown>>) {
  const client = clientEmitting(events) as ComputeClient;
  const { result } = renderHook(() => useComputeTask({ client }));
  await act(async () => {
    await result.current.run('session-0000000000000000000000000000', { prompt: 'go', resume: true });
  });
  return result;
}

describe('useComputeTask in-band failures', () => {
  it('surfaces devbox_error as an error, not a silent success', async () => {
    const result = await runWith([{ type: 'devbox_error', error: 'runtime unreachable' }]);
    expect(result.current.error).toBe('runtime unreachable');
    expect(result.current.steps.some((s) => s.kind === 'error' && s.text === 'runtime unreachable')).toBe(true);
    expect(result.current.isRunning).toBe(false);
  });

  it('treats a timeout as terminal, since no result event follows it', async () => {
    const result = await runWith([
      { type: 'devbox_end', timed_out: true, exit_code: 137, stderr: 'killed after 3300s' },
    ]);
    expect(result.current.error).toMatch(/timed out/);
    expect(result.current.steps.some((s) => s.text === 'killed after 3300s')).toBe(true);
  });

  it('reports a non-zero exit and keeps the stderr tail', async () => {
    const result = await runWith([
      { type: 'devbox_end', timed_out: false, exit_code: 2, stderr: 'ModuleNotFoundError: no module named x' },
    ]);
    expect(result.current.error).toBe('exited 2');
    expect(result.current.steps.some((s) => s.text.includes('ModuleNotFoundError'))).toBe(true);
  });

  it('stays quiet on a clean exit', async () => {
    const result = await runWith([
      { type: 'devbox_end', timed_out: false, exit_code: 0, stderr: 'a harmless warning' },
      { type: 'result', subtype: 'success', num_turns: 3, duration_ms: 1000, total_cost_usd: 0.01 },
    ]);
    expect(result.current.error).toBeNull();
    expect(result.current.result?.turns).toBe(3);
    // A clean run's stderr is noise, not a diagnostic.
    expect(result.current.steps.some((s) => s.text === 'a harmless warning')).toBe(false);
  });

  it('records the model the runtime actually resolved', async () => {
    // An override an older image cannot honour is otherwise invisible: you
    // ask for the expensive model and quietly get the default.
    const result = await runWith([{ type: 'devbox_start', model: 'us.anthropic.claude-opus-4-8' }]);
    expect(result.current.steps.some((s) => s.text === 'model: us.anthropic.claude-opus-4-8')).toBe(true);
  });

  it('shows raw CLI output that never became a structured event', async () => {
    const result = await runWith([{ type: 'devbox_raw', text: 'bash: claude: command not found' }]);
    expect(result.current.steps.some((s) => s.text.includes('command not found'))).toBe(true);
  });
});

// ── Storage keys ───────────────────────────────────────────────────────────

import { COMPUTE_STORAGE_KEYS, clearComputeStorage, DOCK_STORAGE_KEY } from '../lib/storage';

describe('compute storage', () => {
  it('enumerates every key it owns, so a host clearing state cannot miss one', () => {
    // The point of the export: a host writes `COMPUTE_STORAGE_KEYS`, not three
    // string literals that drift the first time a key is renamed here.
    expect(COMPUTE_STORAGE_KEYS).toHaveLength(3);
    expect(COMPUTE_STORAGE_KEYS).toContain(DOCK_STORAGE_KEY);
    expect(new Set(COMPUTE_STORAGE_KEYS).size).toBe(COMPUTE_STORAGE_KEYS.length);
  });

  it('clears all of them and leaves other keys alone', () => {
    for (const key of COMPUTE_STORAGE_KEYS) globalThis.localStorage.setItem(key, 'x');
    globalThis.localStorage.setItem('someone.elses.key', 'keep');
    clearComputeStorage();
    for (const key of COMPUTE_STORAGE_KEYS) expect(globalThis.localStorage.getItem(key)).toBeNull();
    expect(globalThis.localStorage.getItem('someone.elses.key')).toBe('keep');
  });
});
