// TailPane's own view-layer behavior: the follow affordance (pinned
// indicator, backlog counter, jump-to-live control) and the DOM ring buffer
// on a long run.
//
// Both are pure "given a `steps` array, what does the pane do" concerns —
// unlike the banner/cost-chip/error tests in mockTail.test.tsx, which exist
// to keep the WIRE parsing honest, these don't touch `useComputeTail`'s
// frame reduction at all. Mocking the hook here (rather than driving the
// whole thing through the SSE simulator, real setTimeouts included) is what
// makes 250-step and mid-run-scroll scenarios fast and deterministic instead
// of a timing-dependent script.

import { render, screen, fireEvent } from '@testing-library/react';
import { TailPane } from '../components/TailPane';
import { ComputeProvider } from '../context/ComputeContext';
import { fixtureComputers, fixtureRuntimeStatus } from '../fixtures/computeFixture';
import type { ComputeClient } from '../lib/computeClient';
import type { TaskStep } from '../hooks/useComputeTask';
import { useComputeTail } from '../hooks/useComputeTail';
import type { UseComputeTailResult } from '../hooks/useComputeTail';

vi.mock('../hooks/useComputeTail', () => ({ useComputeTail: vi.fn() }));
const mockedUseComputeTail = vi.mocked(useComputeTail);

function step(kind: TaskStep['kind'], text: string, at: number): TaskStep {
  return { kind, text, at };
}

function tailResult(steps: TaskStep[], over: Partial<UseComputeTailResult> = {}): UseComputeTailResult {
  return { steps, connected: true, running: true, result: null, error: null, ...over };
}

const client = {
  getStatus: async () => fixtureRuntimeStatus,
  listComputers: async () => fixtureComputers,
  tail: (boxId: string) => ({ url: `unused://${boxId}`, withCredentials: false, headers: {} }),
} as unknown as ComputeClient;

/**
 * jsdom has no layout: scrollHeight/clientHeight are hardcoded 0. Give the
 * log region a fake, mutable box — scrollHeight grows with however many
 * step rows are currently rendered, the same trick `ChatPanel.scrollOwnership`
 * uses for its message list.
 */
function fakeLayout(el: HTMLElement, opts: { clientHeight: number; rowHeight: number }) {
  Object.defineProperty(el, 'clientHeight', { get: () => opts.clientHeight, configurable: true });
  Object.defineProperty(el, 'scrollHeight', {
    get: () => el.children.length * opts.rowHeight,
    configurable: true,
  });
}

function renderPane() {
  const view = render(
    <ComputeProvider client={client} computers={fixtureComputers} pollIntervalMs={0}>
      <TailPane computer={fixtureComputers[0]!} />
    </ComputeProvider>,
  );
  const log = screen.getByTestId('tail-pane-log');
  fakeLayout(log, { clientHeight: 100, rowHeight: 20 });
  return { ...view, log };
}

describe('TailPane — follow affordance', () => {
  it('shows a quiet "following" indicator while pinned, no jump control', () => {
    mockedUseComputeTail.mockReturnValue(
      tailResult(Array.from({ length: 5 }, (_, i) => step('text', `line ${i}`, i))),
    );
    renderPane();

    expect(screen.getByTestId('tail-pane-following')).toHaveTextContent('following');
    expect(screen.queryByTestId('tail-pane-jump')).toBeNull();
  });

  it('counts steps arriving after the reader scrolls up, and offers a jump control', () => {
    const initial = Array.from({ length: 20 }, (_, i) => step('text', `line ${i}`, i));
    mockedUseComputeTail.mockReturnValue(tailResult(initial));
    const { rerender, log } = renderPane();

    // Scroll away from the live edge — the pane must stop following AND
    // stop showing "following".
    log.scrollTop = 0;
    fireEvent.scroll(log);
    expect(screen.queryByTestId('tail-pane-following')).toBeNull();
    expect(screen.queryByTestId('tail-pane-jump')).toBeNull(); // nothing new yet

    // Three more steps arrive while scrolled up.
    const grown = [...initial, step('tool', 'Bash', 21), step('tool', 'Read', 22), step('text', 'done', 23)];
    mockedUseComputeTail.mockReturnValue(tailResult(grown));
    rerender(
      <ComputeProvider client={client} computers={fixtureComputers} pollIntervalMs={0}>
        <TailPane computer={fixtureComputers[0]!} />
      </ComputeProvider>,
    );

    expect(screen.getByTestId('tail-pane-jump')).toHaveTextContent('3 new ↓');
    // Still not auto-scrolled — the whole point of the counter is that the
    // reader's position was not disturbed.
    expect(log.scrollTop).toBe(0);
  });

  it('the jump control re-pins: scrolls to the live edge, clears the count, restores "following"', () => {
    const initial = Array.from({ length: 20 }, (_, i) => step('text', `line ${i}`, i));
    mockedUseComputeTail.mockReturnValue(tailResult(initial));
    const { rerender, log } = renderPane();

    log.scrollTop = 0;
    fireEvent.scroll(log);
    const grown = [...initial, step('tool', 'Bash', 21)];
    mockedUseComputeTail.mockReturnValue(tailResult(grown));
    rerender(
      <ComputeProvider client={client} computers={fixtureComputers} pollIntervalMs={0}>
        <TailPane computer={fixtureComputers[0]!} />
      </ComputeProvider>,
    );

    fireEvent.click(screen.getByTestId('tail-pane-jump'));

    expect(log.scrollTop).toBe(log.scrollHeight); // jumped to the live edge
    expect(screen.getByTestId('tail-pane-following')).toBeInTheDocument();
    expect(screen.queryByTestId('tail-pane-jump')).toBeNull();
  });

  it('the End key re-pins, matching the jump control', () => {
    const initial = Array.from({ length: 20 }, (_, i) => step('text', `line ${i}`, i));
    mockedUseComputeTail.mockReturnValue(tailResult(initial));
    const { rerender, log } = renderPane();

    log.scrollTop = 0;
    fireEvent.scroll(log);
    const grown = [...initial, step('tool', 'Bash', 21)];
    mockedUseComputeTail.mockReturnValue(tailResult(grown));
    rerender(
      <ComputeProvider client={client} computers={fixtureComputers} pollIntervalMs={0}>
        <TailPane computer={fixtureComputers[0]!} />
      </ComputeProvider>,
    );
    expect(screen.getByTestId('tail-pane-jump')).toBeInTheDocument();

    fireEvent.keyDown(log, { key: 'End' });

    expect(screen.getByTestId('tail-pane-following')).toBeInTheDocument();
    expect(screen.queryByTestId('tail-pane-jump')).toBeNull();
  });
});

describe('TailPane — DOM ring buffer', () => {
  it('caps the DOM at the newest ~200 steps and notes the trim, on a long run', () => {
    const steps = Array.from({ length: 250 }, (_, i) => step('text', `step-${i}`, i));
    mockedUseComputeTail.mockReturnValue(tailResult(steps));
    renderPane();

    // 250 - 200 kept = 50 trimmed off the head.
    expect(screen.getByTestId('tail-pane-trimmed')).toHaveTextContent('50');
    // The oldest 50 are gone from the DOM entirely — not just visually
    // clipped — and the newest step is present.
    expect(screen.queryByText('step-0')).toBeNull();
    expect(screen.queryByText('step-49')).toBeNull();
    expect(screen.getByText('step-50')).toBeInTheDocument();
    expect(screen.getByText('step-249')).toBeInTheDocument();
  });

  it('shows no trim note under the cap', () => {
    const steps = Array.from({ length: 50 }, (_, i) => step('text', `step-${i}`, i));
    mockedUseComputeTail.mockReturnValue(tailResult(steps));
    renderPane();

    expect(screen.queryByTestId('tail-pane-trimmed')).toBeNull();
  });
});
