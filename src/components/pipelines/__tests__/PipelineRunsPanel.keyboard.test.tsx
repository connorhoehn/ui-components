// REGRESSION — run rows in the runs side panel were mouse-only.
//
// The bug: selecting a run (or ticking it for comparison, in compare mode)
// lived on `<li onClick>` with no role, tabIndex or key handler, so the
// whole run history was unreachable from the keyboard. The row cannot be a
// `<button>` because compare mode nests a real Checkbox inside it, so it
// gets role="button" + tabIndex=0 + Enter/Space + an aria-label naming the
// run — and the nested Checkbox stops both click and keydown so it never
// double-fires the row.

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, createEvent, waitFor } from '@testing-library/react';
import type { PipelineRun } from '../../../types/pipeline';

const run = {
  id: 'run-12345678abc',
  pipelineId: 'p1',
  pipelineVersion: 1,
  status: 'completed',
  triggeredBy: { triggerType: 'manual', userId: 'ana' },
  ownerNodeId: 'local',
  startedAt: new Date().toISOString(),
  durationMs: 1200,
  currentStepIds: [],
  steps: {},
  context: {},
} as unknown as PipelineRun;

vi.mock('../../../api/pipelineRuns', () => ({
  listPipelineRuns: vi.fn(async () => ({ runs: [run] })),
}));
vi.mock('../context/EventStreamContext', () => ({ useEventStream: () => {} }));
vi.mock('react-router', () => ({ useNavigate: () => vi.fn() }));
vi.mock('../RunDetailDrawer', () => ({
  default: ({ run: r }: { run: PipelineRun }) => (
    <div data-testid="run-detail-drawer">{r.id}</div>
  ),
}));

import PipelineRunsPanel from '../PipelineRunsPanel';

async function renderRow() {
  render(<PipelineRunsPanel pipelineId="p1" onClose={vi.fn()} />);
  return screen.findByRole('button', { name: 'Open run run-1234' });
}

describe('PipelineRunsPanel run row — keyboard activation', () => {
  beforeEach(() => vi.clearAllMocks());

  it('exposes each run row as a focusable, named button', async () => {
    const li = await renderRow();
    expect(li.tagName).toBe('LI');
    expect(li).toHaveAttribute('tabindex', '0');
  });

  it('opens the run detail on Enter', async () => {
    const li = await renderRow();
    expect(screen.queryByTestId('run-detail-drawer')).toBeNull();
    fireEvent.keyDown(li, { key: 'Enter' });
    await waitFor(() =>
      expect(screen.getByTestId('run-detail-drawer')).toHaveTextContent('run-12345678abc'),
    );
  });

  it('opens the run detail on Space and prevents the page from scrolling', async () => {
    const li = await renderRow();
    const ev = createEvent.keyDown(li, { key: ' ' });
    fireEvent(li, ev);
    await waitFor(() => expect(screen.getByTestId('run-detail-drawer')).toBeInTheDocument());
    expect(ev.defaultPrevented).toBe(true);
  });

  it('toggles the compare pick from the keyboard when compare mode is on', async () => {
    await renderRow();
    fireEvent.click(screen.getByTestId('runs-panel-compare-toggle'));
    const li = screen.getByRole('button', { name: 'Toggle run run-1234 for comparison' });
    fireEvent.keyDown(li, { key: 'Enter' });
    expect(screen.getByTestId('runs-panel-compare-check-run-12345678abc')).toBeChecked();
  });
});
