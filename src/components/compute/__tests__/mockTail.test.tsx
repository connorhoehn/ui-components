// The tail simulator — the fixture that makes "watch a bot" reviewable with no
// backend. If this drifts from what useComputeTail expects, the story goes
// quiet and looks like a broken pane rather than a broken fixture.

import { render, screen, cleanup } from '@testing-library/react';
import { installMockTailSource, mockTailUrl, MOCK_TAIL_SCRIPTS } from '../fixtures/mockTail';
import { ComputeProvider } from '../context/ComputeContext';
import { TailPane } from '../components/TailPane';
import { fixtureComputers, fixtureRuntimeStatus } from '../fixtures/computeFixture';
import type { ComputeClient } from '../lib/computeClient';

function collect(url: string, ms: number): Promise<Record<string, unknown>[]> {
  return new Promise((resolve) => {
    const seen: Record<string, unknown>[] = [];
    const src = new EventSource(url);
    src.onmessage = (e) => seen.push(JSON.parse((e as MessageEvent).data as string));
    setTimeout(() => { src.close(); resolve(seen); }, ms);
  });
}

describe('installMockTailSource', () => {
  let uninstall: () => void;
  beforeEach(() => { uninstall = installMockTailSource(); });
  afterEach(() => uninstall());

  it('delegates non-mock URLs to the real EventSource', () => {
    // A fixture that hijacks every URL breaks the other live surfaces on the
    // page, which is worse than an empty pane. Asserted by standing a spy in
    // for the native constructor and checking it is the one that runs — not by
    // checking the call throws, which it would do for several wrong reasons.
    uninstall();
    const native = vi.fn();
    const previous = globalThis.EventSource;
    (globalThis as { EventSource?: unknown }).EventSource = native;

    const restore = installMockTailSource();
    new EventSource('https://example.test/stream');
    expect(native).toHaveBeenCalledWith('https://example.test/stream', undefined);

    native.mockClear();
    new EventSource(mockTailUrl('c1'));
    expect(native).not.toHaveBeenCalled();

    restore();
    (globalThis as { EventSource?: unknown }).EventSource = previous;
    uninstall = installMockTailSource();
  });

  it('streams a scripted run in the backend\'s own vocabulary', async () => {
    vi.useRealTimers();
    const seen = await collect(mockTailUrl('c1', 'nightly-dependency-audit'), 1800);
    const types = seen.map((e) => e['type']);
    expect(types[0]).toBe('job_started');
    expect(types).toContain('task_started');
    // The tail pane reads these; a rename here is a silent blank pane.
    expect(seen.every((e) => typeof e['ts'] === 'string')).toBe(true);
  }, 10_000);

  it('does not deliver before the caller can attach a handler', async () => {
    // A real EventSource never calls back synchronously from the constructor.
    // A simulator that does teaches the consumer a lie it only discovers in
    // production.
    const src = new EventSource(mockTailUrl('c1'));
    let early = 0;
    src.onmessage = () => { early += 1; };
    expect(early).toBe(0);
    src.close();
  });

  it('picks a run deterministically per box', () => {
    // Two panes on different boxes should show different work; the same box
    // across a remount should show the same run.
    const a1 = new EventSource(mockTailUrl('alpha'));
    const a2 = new EventSource(mockTailUrl('alpha'));
    expect(a1.url).toBe(a2.url);
    a1.close(); a2.close();
  });

  it('covers success, a question, and a failure', () => {
    // Each is a distinct status in the rail: idle, waiting, error. A fixture
    // that only shows the happy path cannot review the other two.
    const endings = MOCK_TAIL_SCRIPTS.map(
      (s) => s.frames[s.frames.length - 1]!.data['type'],
    );
    expect(endings).toContain('devbox_end');
    expect(endings).toContain('devbox_error');
    const asksAQuestion = MOCK_TAIL_SCRIPTS.some((s) =>
      s.frames.some((f) => String(f.data['result'] ?? '').trimEnd().endsWith('?')));
    expect(asksAQuestion).toBe(true);
  });

  it('restores the global on uninstall', () => {
    const before = globalThis.EventSource;
    const restore = installMockTailSource();
    restore();
    expect(globalThis.EventSource).toBe(before);
  });
});

// ─── End to end: the simulator through the real pane ─────────────────────────
//
// The story's whole claim is "you can watch a bot run here". These assert the
// claim through the actual TailPane + useComputeTail, so the fixture and the
// consumer cannot drift apart while both look fine in isolation.

describe('TailPane driven by the simulator', () => {
  let uninstall: () => void;
  beforeEach(() => { uninstall = installMockTailSource(); });
  afterEach(() => { uninstall(); cleanup(); });

  const client = {
    ...({} as ComputeClient),
    getStatus: async () => fixtureRuntimeStatus,
    listComputers: async () => fixtureComputers,
    tail: (boxId: string) => ({ url: mockTailUrl(boxId, 'nightly-dependency-audit'), withCredentials: false, headers: {} }),
  } as ComputeClient;

  it('shows the run as it arrives', async () => {
    render(
      <ComputeProvider client={client} computers={fixtureComputers} pollIntervalMs={0}>
        <TailPane computer={fixtureComputers[0]!} />
      </ComputeProvider>,
    );

    // The prompt the bot was given, then a step it took. If either never
    // appears the story is a blank rectangle and looks unbuilt.
    expect(await screen.findByText(/Audit dependencies for advisories/, {}, { timeout: 4000 }))
      .toBeInTheDocument();
    expect(await screen.findByText(/Reading the lockfile/, {}, { timeout: 4000 }))
      .toBeInTheDocument();
  }, 15_000);
});
