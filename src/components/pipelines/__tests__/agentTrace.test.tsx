// src/components/pipelines/__tests__/agentTrace.test.tsx
//
// The trace half of the agent step: the AgentStepOutput → TraceTimeline
// adapter, and the section that renders it.
//
// FIXTURE-DRIVEN. `agentStepFixture()` below is shaped exactly like the
// `AgentStepOutput` in the shared contract, because neither platform-api
// (which will persist it) nor distributed-core (which will produce it) had
// landed when this was written. Switching to real run data is a wiring
// change only — StepThread already reads `step.output` and duck-types it.
//
// What these tests defend:
//   - a toolless step still renders, and reads as toolless rather than as
//     an ordinary agent step that happened to be quiet;
//   - a step cut off by maxTurns/timeout does not read like one that
//     finished, and its text is labelled partial;
//   - a failed tool call is visibly failed;
//   - an in-flight call (no endedAt) is drawn with real width instead of
//     collapsing to zero and disappearing.

import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { traceFromAgentStepOutput, isAgentStepOutput, liveAgentOutputFromCalls } from '../steps/agentTrace';
import { AgentTraceSection } from '../steps/AgentTraceSection';
import type { AgentStepOutput } from '../../../types/pipeline';

const T0 = '2026-08-24T10:00:00.000Z';
const ms = (n: number) => new Date(Date.parse(T0) + n).toISOString();

function agentStepFixture(overrides: Partial<AgentStepOutput> = {}): AgentStepOutput {
  return {
    text: 'I found 3 TODOs and grouped them by file.',
    turns: 4,
    model: 'sonnet',
    tokensIn: 1820,
    tokensOut: 340,
    stopReason: 'complete',
    toolless: false,
    toolCalls: [
      {
        name: 'Grep',
        input: { pattern: 'TODO' },
        output: '17 matches',
        ok: true,
        startedAt: ms(100),
        endedAt: ms(350),
      },
      {
        name: 'Read',
        input: { file: 'src/index.ts' },
        output: '…file body…',
        ok: true,
        startedAt: ms(400),
        endedAt: ms(600),
      },
      {
        name: 'Bash',
        input: { command: 'npm test' },
        ok: false,
        error: 'exit 1: 2 tests failed',
        startedAt: ms(650),
        endedAt: ms(1900),
      },
    ],
    ...overrides,
  };
}

describe('isAgentStepOutput', () => {
  it('accepts a contract-shaped agent output', () => {
    expect(isAgentStepOutput(agentStepFixture() as unknown as Record<string, unknown>)).toBe(true);
  });

  it('accepts a TOOLLESS agent output — toolless is not the discriminator', () => {
    // The whole point of `toolless` is to mark honest degradation. If it
    // were the discriminator, the outputs that most need the honest
    // rendering would be the ones that fail to get it.
    const toolless = agentStepFixture({ toolCalls: [], toolless: true });
    expect(isAgentStepOutput(toolless as unknown as Record<string, unknown>)).toBe(true);
  });

  it('rejects an LLM step output', () => {
    expect(isAgentStepOutput({ response: 'hello', tokensIn: 10, tokensOut: 3 })).toBe(false);
  });

  it('rejects a vision step output', () => {
    expect(isAgentStepOutput({ visionId: 'v1', caption: 'a cat', tags: ['cat'] })).toBe(false);
  });

  it('rejects null / undefined / empty', () => {
    expect(isAgentStepOutput(undefined)).toBe(false);
    expect(isAgentStepOutput(null)).toBe(false);
    expect(isAgentStepOutput({})).toBe(false);
  });
});

describe('traceFromAgentStepOutput', () => {
  it('emits one root span plus one span per tool call', () => {
    const trace = traceFromAgentStepOutput('step-1', agentStepFixture());
    expect(trace.spans).toHaveLength(4);
    expect(trace.spans[0].spanId).toBe(trace.rootSpanId);
    expect(trace.spans[0].kind).toBe('agent');
    expect(trace.spans.slice(1).map((s) => s.name)).toEqual(['Grep', 'Read', 'Bash']);
    expect(trace.spans.slice(1).every((s) => s.kind === 'tool')).toBe(true);
  });

  it('parents every tool span to the root so the waterfall nests', () => {
    const trace = traceFromAgentStepOutput('step-1', agentStepFixture());
    for (const span of trace.spans.slice(1)) {
      expect(span.parentSpanId).toBe(trace.rootSpanId);
    }
  });

  it('computes each tool span duration from its own timestamps', () => {
    const trace = traceFromAgentStepOutput('step-1', agentStepFixture());
    const byName = Object.fromEntries(trace.spans.map((s) => [s.name, s]));
    expect(byName.Grep.durationMs).toBe(250);
    expect(byName.Read.durationMs).toBe(200);
    expect(byName.Bash.durationMs).toBe(1250);
  });

  it('spans the whole step, earliest start to latest end', () => {
    const trace = traceFromAgentStepOutput('step-1', agentStepFixture(), {
      startedAt: T0,
      completedAt: ms(2000),
    });
    expect(trace.startedAt).toBe(T0);
    expect(trace.totalDurationMs).toBe(2000);
  });

  it('maps ok:false to an error span carrying the error message', () => {
    const trace = traceFromAgentStepOutput('step-1', agentStepFixture());
    const bash = trace.spans.find((s) => s.name === 'Bash')!;
    expect(bash.status).toBe('error');
    expect(bash.attributes.error).toBe('exit 1: 2 tests failed');
  });

  it('gives an IN-FLIGHT call (no endedAt) real width, not zero', () => {
    // A zero-width bar is an invisible bar. A running tool must be visible.
    const output = agentStepFixture({
      toolCalls: [{ name: 'Bash', ok: true, startedAt: ms(100) }],
    });
    const trace = traceFromAgentStepOutput('step-1', output, { now: Date.parse(T0) + 5000 });
    const bash = trace.spans.find((s) => s.name === 'Bash')!;
    expect(bash.durationMs).toBe(4900);
    expect(bash.status).toBe('unset');
    expect(bash.attributes.inFlight).toBe(true);
  });

  it('produces a root-only trace for a toolless step rather than throwing', () => {
    const trace = traceFromAgentStepOutput(
      'step-1',
      agentStepFixture({ toolCalls: [], toolless: true }),
      { startedAt: T0, completedAt: ms(900) },
    );
    expect(trace.spans).toHaveLength(1);
    expect(trace.totalDurationMs).toBe(900);
  });

  it('marks the root span error when the agent hit a bound', () => {
    for (const stopReason of ['max_turns', 'timeout', 'error'] as const) {
      const trace = traceFromAgentStepOutput('s', agentStepFixture({ stopReason }));
      expect(trace.spans[0].status).toBe('error');
    }
    expect(traceFromAgentStepOutput('s', agentStepFixture()).spans[0].status).toBe('ok');
  });

  it('truncates large tool payloads instead of dumping them into attributes', () => {
    const output = agentStepFixture({
      toolCalls: [
        {
          name: 'Read',
          input: { body: 'x'.repeat(5000) },
          ok: true,
          startedAt: ms(0),
          endedAt: ms(10),
        },
      ],
    });
    const trace = traceFromAgentStepOutput('s', output);
    const input = trace.spans[1].attributes.input as string;
    expect(input.length).toBeLessThanOrEqual(160);
    expect(input.endsWith('…')).toBe(true);
  });
});

describe('AgentTraceSection', () => {
  const renderSection = (output: AgentStepOutput) =>
    render(<AgentTraceSection stepId="step-1" output={output} startedAt={T0} completedAt={ms(2000)} />);

  it('renders every tool call by name in the waterfall', () => {
    const { getByTestId } = renderSection(agentStepFixture());
    const trace = getByTestId('agent-trace');
    for (const name of ['Grep', 'Read', 'Bash']) {
      expect(trace.textContent).toContain(name);
    }
  });

  it('shows the tool-call count and the turn count', () => {
    const { getByTestId } = renderSection(agentStepFixture());
    expect(getByTestId('agent-toolcall-count').textContent).toBe('3 tool calls');
    expect(getByTestId('agent-summary').textContent).toContain('4 turns');
  });

  it('flags failed tool calls', () => {
    const { getByTestId } = renderSection(agentStepFixture());
    expect(getByTestId('agent-failed-calls').textContent).toBe('1 failed');
  });

  it('a toolless step says so, and does not pretend to have a waterfall', () => {
    const { getByTestId, queryByTestId } = renderSection(
      agentStepFixture({ toolCalls: [], toolless: true }),
    );
    expect(getByTestId('agent-toolless-badge').textContent).toMatch(/no tools/i);
    expect(queryByTestId('agent-toolcall-count')).toBeNull();
    expect(getByTestId('agent-trace').textContent).toMatch(/No tool calls/i);
  });

  it('a step cut off by maxTurns does not read like one that finished', () => {
    const { getByTestId } = renderSection(agentStepFixture({ stopReason: 'max_turns' }));
    expect(getByTestId('agent-stop-reason').textContent).toBe('cut off: max turns');
    // …and the text it did produce is labelled partial, not final.
    expect(getByTestId('agent-summary').parentElement!.textContent).toContain('Partial response');
  });

  it('a timeout reads as a cut-off too', () => {
    const { getByTestId } = renderSection(agentStepFixture({ stopReason: 'timeout' }));
    expect(getByTestId('agent-stop-reason').textContent).toBe('cut off: timeout');
  });

  it('a clean finish is labelled complete with a final response', () => {
    const { getByTestId } = renderSection(agentStepFixture());
    expect(getByTestId('agent-stop-reason').textContent).toBe('complete');
    expect(getByTestId('agent-summary').parentElement!.textContent).toContain('Final response');
  });

  it('renders the final assistant text', () => {
    const { getByTestId } = renderSection(agentStepFixture());
    expect(getByTestId('agent-text').textContent).toBe(
      'I found 3 TODOs and grouped them by file.',
    );
  });
});

// ---------------------------------------------------------------------------
// LIVE mode — the streamed half (pipeline.step.agent.tool → agentLive)
// ---------------------------------------------------------------------------

describe('AgentTraceSection — live (mid-run) rendering', () => {
  it('a live section shows the running badge and NO stop-reason badge', () => {
    const output = liveAgentOutputFromCalls([
      { name: 'Read', ok: true, startedAt: ms(100), endedAt: ms(200) },
    ]);
    const { getByTestId, queryByTestId } = render(
      <AgentTraceSection stepId="step-1" output={output} startedAt={T0} live />,
    );
    expect(getByTestId('agent-live-badge').textContent).toMatch(/running/i);
    expect(queryByTestId('agent-stop-reason')).toBeNull();
    expect(getByTestId('agent-toolcall-count').textContent).toBe('1 tool call');
    // The waterfall itself is painted — the tool name is inside the trace.
    expect(getByTestId('agent-trace').textContent).toContain('Read');
  });

  it('an in-flight call (no endedAt) is painted while live', () => {
    const output = liveAgentOutputFromCalls([
      { name: 'Read', ok: false, startedAt: ms(100) },
    ]);
    const { getByTestId } = render(
      <AgentTraceSection stepId="step-1" output={output} startedAt={T0} live />,
    );
    expect(getByTestId('agent-trace').textContent).toContain('Read');
  });

  it('live with zero calls says the agent is thinking, not "nothing to trace"', () => {
    const output = liveAgentOutputFromCalls([]);
    const { getByTestId } = render(
      <AgentTraceSection stepId="step-1" output={output} startedAt={T0} live />,
    );
    expect(getByTestId('agent-trace').textContent).toMatch(/No tool calls yet/i);
    // A live empty trace must NOT wear the toolless badge — that verdict
    // belongs to the persisted output only.
    expect(getByTestId('agent-toolcall-count').textContent).toBe('0 tool calls');
  });

  it('the live root span is open-ended: named running, status unset, measured to now', () => {
    const calls = [{ name: 'Read', ok: true, startedAt: ms(100), endedAt: ms(200) }];
    const now = Date.parse(T0) + 5000;
    const trace = traceFromAgentStepOutput('step-1', liveAgentOutputFromCalls(calls), {
      startedAt: T0,
      now,
      live: true,
    });
    const root = trace.spans.find((s) => s.spanId === trace.rootSpanId)!;
    expect(root.name).toBe('agent loop · running');
    expect(root.status).toBe('unset');
    // Root keeps growing toward `now` even though the only call closed at +200ms.
    expect(root.durationMs).toBe(5000);
  });
});
