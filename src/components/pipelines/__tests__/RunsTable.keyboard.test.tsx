// REGRESSION — the "View →" affordance in the runs table was a dead control.
//
// The bug: the last cell rendered `<span className="text-primary">View →</span>`
// inside a `<td onClick={e => e.stopPropagation()}`. It looked like a link
// but had no handler of its own and the cell swallowed the row's click, so
// it did nothing for anybody — mouse or keyboard — and the only real way to
// open a run was clicking elsewhere on the `<tr>`. It is now a real
// `<button type="button">` that navigates.
//
// The `<tr>` itself deliberately keeps its pointer-only onClick: the row
// already contains interactive descendants (select checkbox, Force-fail,
// Retry, View), which makes role="button" invalid there. The keyboard path
// is the View button, so this file pins that it exists and works.

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import type { PipelineRun } from '../../../types/pipeline';
import RunsTable from '../RunsTable';

const run = {
  id: 'run-12345678abc',
  pipelineId: 'p1',
  pipelineVersion: 1,
  status: 'completed',
  triggeredBy: { triggerType: 'manual', userId: 'ana' },
  ownerNodeId: 'local',
  startedAt: new Date().toISOString(),
  durationMs: 900,
  currentStepIds: [],
  steps: {},
  context: {},
} as unknown as PipelineRun;

const onNavigate = vi.fn();

function renderTable() {
  render(
    <RunsTable
      filtered={[run]}
      selected={new Set()}
      onSelectionChange={vi.fn()}
      comparePair={[]}
      onToggleComparePair={vi.fn()}
      costByRunId={{}}
      pipelineId="p1"
      onNavigate={onNavigate}
      onOpenRetryModal={vi.fn()}
    />,
  );
}

describe('RunsTable "View" affordance', () => {
  beforeEach(() => onNavigate.mockClear());

  it('is a real, focusable button rather than a decorative span', () => {
    renderTable();
    const view = screen.getByRole('button', { name: 'View run run-1234' });
    expect(view.tagName).toBe('BUTTON');
    expect(view).toHaveAttribute('type', 'button');
    view.focus();
    expect(document.activeElement).toBe(view);
  });

  it('navigates to the run when activated', () => {
    renderTable();
    fireEvent.click(screen.getByRole('button', { name: 'View run run-1234' }));
    expect(onNavigate).toHaveBeenCalledWith('/pipelines/p1/runs/run-12345678abc');
  });

  it('does not double-fire the row click it sits inside', () => {
    renderTable();
    fireEvent.click(screen.getByRole('button', { name: 'View run run-1234' }));
    expect(onNavigate).toHaveBeenCalledTimes(1);
  });
});
