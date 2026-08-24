// REGRESSION — the "Success rate" KPI and the p95 duration.
//
// 1. The success rate divided by `runs.length`, which includes `running`,
//    `pending` and `awaiting_approval` runs. Those can never be counted as
//    successes, so every in-flight run was silently charged to the failure
//    column: 8 completed + 2 running rendered "8/10 (80%)" in warning amber
//    above a sub-line reading "0 failed · 0 cancelled". The denominator is now
//    the terminal runs only.
// 2. `percentile` indexed with `Math.floor(len * p)`, one too high whenever
//    `len * p` is a whole number — which the "10"/"50" range buttons produce
//    directly. p95 of 20 runs returned the slowest run (p100).

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import type { PipelineRun, RunStatus } from '../../../types/pipeline';

vi.mock('react-router', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router')>();
  return {
    ...actual,
    useNavigate: () => vi.fn(),
    useParams: () => ({ pipelineId: 'pipe-1' }),
  };
});

const definition = {
  id: 'pipe-1',
  name: 'Nightly ETL',
  version: 1,
  nodes: [],
  edges: [],
};

let RUNS: PipelineRun[] = [];

vi.mock('../persistence/pipelineStorage', () => ({
  loadPipeline: () => definition,
}));
vi.mock('../persistence/runHistory', () => ({
  listRuns: () => RUNS,
}));

import PipelineStatsPage from '../PipelineStatsPage';

let seq = 0;
const makeRun = (status: RunStatus, durationMs?: number): PipelineRun =>
  ({
    id: `run-${seq++}`,
    pipelineId: 'pipe-1',
    pipelineVersion: 1,
    status,
    triggeredBy: { triggerType: 'manual', userId: 'ana' },
    ownerNodeId: 'local',
    startedAt: '2026-08-16T10:00:00.000Z',
    durationMs,
    currentStepIds: [],
    steps: {},
    context: {},
  }) as unknown as PipelineRun;

function renderWith(runs: PipelineRun[]) {
  seq = 0;
  RUNS = runs;
  return render(
    <MemoryRouter>
      <PipelineStatsPage />
    </MemoryRouter>,
  );
}

describe('PipelineStatsPage success rate', () => {
  it('excludes in-flight runs from the denominator', () => {
    // 8 completed + 2 running. The old denominator (10) gave "8/10 (80%)".
    renderWith([
      ...Array.from({ length: 8 }, () => makeRun('completed', 1000)),
      makeRun('running'),
      makeRun('running'),
    ]);
    expect(screen.getByTestId('stats-success-rate')).toHaveTextContent(
      '8/8 (100%)',
    );
  });

  it('counts failed and cancelled runs as attempts', () => {
    renderWith([
      ...Array.from({ length: 6 }, () => makeRun('completed', 1000)),
      makeRun('failed', 500),
      makeRun('cancelled', 500),
      makeRun('running'),
    ]);
    expect(screen.getByTestId('stats-success-rate')).toHaveTextContent(
      '6/8 (75%)',
    );
  });

  it('renders an em-dash rather than a red 0% when nothing has finished', () => {
    renderWith([makeRun('running'), makeRun('running'), makeRun('running')]);
    const tile = screen.getByTestId('stats-success-rate');
    // The old output was "0/3 (0%)" painted danger red — a pipeline reported as
    // failing 100% of the time with zero failures.
    expect(tile).toHaveTextContent('—');
    expect(tile.textContent).not.toContain('0%');
    expect(tile).toHaveStyle({ color: 'var(--color-text-tertiary)' });
  });

  it('names the in-flight runs in the sub-line so the counts reconcile', () => {
    renderWith([
      ...Array.from({ length: 8 }, () => makeRun('completed', 1000)),
      makeRun('running'),
      makeRun('running'),
    ]);
    expect(
      screen.getByText('0 failed · 0 cancelled · 2 in flight'),
    ).toBeInTheDocument();
  });
});

describe('PipelineStatsPage percentiles', () => {
  it('reports p95 of 20 runs as the 19th value, not the slowest', () => {
    // Durations 1000ms…20000ms. floor(20 * 0.95) = 19 -> index 19 -> 20.0s.
    // Nearest rank is ceil(19) - 1 = 18 -> index 18 -> 19.0s.
    renderWith(
      Array.from({ length: 20 }, (_, i) => makeRun('completed', (i + 1) * 1000)),
    );
    const durationTile = screen.getByText(/^p95 · /);
    expect(durationTile).toHaveTextContent('p95 · 19.0s');
  });

  it('reports the median of 20 runs as the 10th value', () => {
    renderWith(
      Array.from({ length: 20 }, (_, i) => makeRun('completed', (i + 1) * 1000)),
    );
    // floor(20 * 0.5) = 10 -> index 10 -> 11.0s; nearest rank -> index 9 -> 10.0s.
    expect(screen.getByTestId('stats-kpis')).toHaveTextContent('10.0s');
  });
});
