// REGRESSION — keyboard access to a run row on the all-runs table.
//
// The bug: the only way to open a run from this table was `onClick` on the
// `<tr>`. It had no role, no tabIndex and no key handler, so a keyboard or
// screen-reader user could see every run and open none of them. A `<tr>`
// cannot be a `<button>`, so the row now carries role="button" + tabIndex=0
// + an Enter/Space handler + an aria-label naming the run.

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, createEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import type { PipelineRun } from '../../../types/pipeline';

const navigate = vi.fn();

vi.mock('react-router', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router')>();
  return { ...actual, useNavigate: () => navigate };
});

const run = {
  id: 'run-abcdef0123456',
  pipelineId: 'pipe-1',
  pipelineVersion: 1,
  status: 'completed',
  triggeredBy: { triggerType: 'manual', userId: 'ana' },
  ownerNodeId: 'local',
  startedAt: new Date().toISOString(),
  currentStepIds: [],
  steps: {},
  context: {},
} as unknown as PipelineRun;

vi.mock('../persistence/pipelineStorage', () => ({
  listPipelines: () => [{ id: 'pipe-1', name: 'Nightly ETL' }],
}));
vi.mock('../persistence/runHistory', () => ({ listRuns: () => [] }));
vi.mock('../../../api/pipelineRuns', () => ({
  listPipelineRuns: vi.fn(async () => ({ runs: [run] })),
}));
vi.mock('../context/PipelineRunsContext', () => ({
  usePipelineRuns: () => ({ runs: {} }),
}));

import AllRunsPage from '../AllRunsPage';

async function renderRow() {
  render(
    <MemoryRouter>
      <AllRunsPage />
    </MemoryRouter>,
  );
  return screen.findByRole('button', { name: /Open run run-abcdef0 of Nightly ETL/ });
}

describe('AllRunsPage run row — keyboard activation', () => {
  beforeEach(() => navigate.mockClear());

  it('exposes each run row as a focusable, named button', async () => {
    const row = await renderRow();
    expect(row.tagName).toBe('TR');
    expect(row).toHaveAttribute('tabindex', '0');
  });

  it('opens the run on Enter', async () => {
    const row = await renderRow();
    fireEvent.keyDown(row, { key: 'Enter' });
    expect(navigate).toHaveBeenCalledWith('/pipelines/pipe-1/runs/run-abcdef0123456');
  });

  it('opens the run on Space and prevents the page from scrolling', async () => {
    const row = await renderRow();
    const ev = createEvent.keyDown(row, { key: ' ' });
    fireEvent(row, ev);
    expect(navigate).toHaveBeenCalledWith('/pipelines/pipe-1/runs/run-abcdef0123456');
    expect(ev.defaultPrevented).toBe(true);
  });
});
