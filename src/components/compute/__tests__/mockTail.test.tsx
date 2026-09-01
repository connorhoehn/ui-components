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
    // that only shows the happy path cannot review the other two. Checked as
    // "appears somewhere in the script" rather than "is the last frame" —
    // every script now closes with the dispatcher's own `job_finished`,
    // which sits after the container's terminal event, not in place of it.
    const containerEndings = MOCK_TAIL_SCRIPTS.map(
      (s) => s.frames.find((f) => f.data['type'] === 'devbox_end' || f.data['type'] === 'devbox_error')?.data['type'],
    );
    expect(containerEndings).toContain('devbox_end');
    expect(containerEndings).toContain('devbox_error');
    const asksAQuestion = MOCK_TAIL_SCRIPTS.some((s) =>
      s.frames.some((f) => String(f.data['result'] ?? '').trimEnd().endsWith('?')));
    expect(asksAQuestion).toBe(true);
  });

  it('closes every run with the dispatcher\'s own job_finished, ok matching the container outcome', () => {
    // job_finished is the frame `job_started`'s banner arc closes on; a
    // script missing it would silently leave the tail's job banner dangling.
    for (const script of MOCK_TAIL_SCRIPTS) {
      const last = script.frames[script.frames.length - 1]!.data;
      expect(last['type']).toBe('job_finished');
      const failed = script.frames.some((f) => f.data['type'] === 'devbox_error');
      expect(last['ok']).toBe(!failed);
    }
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

  it('renders job_started as a banner naming the title and kind, closed by job_finished', async () => {
    render(
      <ComputeProvider client={client} computers={fixtureComputers} pollIntervalMs={0}>
        <TailPane computer={fixtureComputers[0]!} />
      </ComputeProvider>,
    );

    // The banner is a distinct element (data-testid), not just coloured
    // text in the normal row path — that is what makes it read as the start
    // of an arc rather than one more step. Both the title (which run) and
    // the kind (what dispatched it) have to be visible, not just the title.
    const banner = await screen.findByTestId('tail-banner-job', {}, { timeout: 4000 });
    expect(banner).toHaveTextContent('nightly-dependency-audit');
    expect(banner).toHaveTextContent('devbox:task');

    // job_finished closes the arc the banner opened, as its own banner. The
    // AUDIT script ends clean, so `data-ok` is true, not the failed tone.
    const close = await screen.findByTestId('tail-banner-job-end', {}, { timeout: 15_000 });
    expect(close).toHaveTextContent('job finished');
    expect(close).toHaveAttribute('data-ok', 'true');
  }, 20_000);

  it('renders the result step as cost chips — turns, duration, total_cost_usd', async () => {
    render(
      <ComputeProvider client={client} computers={fixtureComputers} pollIntervalMs={0}>
        <TailPane computer={fixtureComputers[0]!} />
      </ComputeProvider>,
    );

    // AUDIT's result frame: num_turns 6, duration_ms 12800, total_cost_usd
    // 0.0412. Asserted as the rendered chip text inside the dedicated
    // chip row, not by re-parsing a sentence — that is the whole point of
    // carrying `step.result` structured instead of only a formatted string.
    const chips = await screen.findByTestId('tail-result-chips', {}, { timeout: 15_000 });
    expect(chips).toHaveTextContent('6 turns');
    expect(chips).toHaveTextContent('13s');
    expect(chips).toHaveTextContent('$0.0412');
  }, 20_000);

  it('renders devbox_error as a loud banner, and closes with a FAILED job_finished', async () => {
    const failingClient = {
      ...client,
      tail: (boxId: string) => ({ url: mockTailUrl(boxId, 'schema-drift-check'), withCredentials: false, headers: {} }),
    } as ComputeClient;

    render(
      <ComputeProvider client={failingClient} computers={fixtureComputers} pollIntervalMs={0}>
        <TailPane computer={fixtureComputers[0]!} />
      </ComputeProvider>,
    );

    // devbox_error renders through the loud-banner path (its own
    // data-testid), not the plain coloured-text row every other kind uses —
    // that distinction is the entire point of requirement 3. Closed by the
    // dispatcher's FAILED job_finished, which only DRIFT (the failing
    // script) produces.
    const errorBanner = await screen.findByTestId('tail-banner-error', {}, { timeout: 10_000 });
    expect(errorBanner).toHaveTextContent(/connection reset while reading pg_catalog/);

    const close = await screen.findByTestId('tail-banner-job-end', {}, { timeout: 10_000 });
    expect(close).toHaveTextContent('job failed');
    expect(close).toHaveAttribute('data-ok', 'false');
  }, 15_000);
});
