// REGRESSION — audit rows in the executor log were mouse-only.
//
// The bug: `handleRowClick` (expand the row's JSON trace + forward the
// stepId to `onStepClick`) hung off a bare `<div onClick>`. No role, no
// tabIndex, no key handler — so a keyboard user could neither expand a
// trace nor highlight the step on the canvas. The row is a CSS grid that
// renders block content when open, so it stays a div and gains
// role="button" + tabIndex=0 + Enter/Space + aria-expanded.

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, createEvent } from '@testing-library/react';
import type { AuditRow } from '../../../api/pipelineAudit';

const row = {
  auditId: 'a1',
  timestamp: new Date().toISOString(),
  actorUserId: 'ana',
  action: 'pipeline.step.completed',
  outcome: 'ok',
  details: { stepId: 'node-42' },
  trace: { stepId: 'node-42', durationMs: 12 },
} as unknown as AuditRow;

vi.mock('../hooks/usePipelineRunAuditLog', () => ({
  usePipelineRunAuditLog: () => ({
    items: [row],
    loading: false,
    error: null,
    hasMore: false,
    loadMore: vi.fn(),
    liveHealthy: true,
    refresh: vi.fn(),
  }),
}));

import ExecutorLog from '../ExecutorLog';

const onStepClick = vi.fn();

function renderRow() {
  render(<ExecutorLog pipelineId="p1" runId="r1" onStepClick={onStepClick} />);
  return screen.getByTestId('executor-log-row');
}

describe('ExecutorLog audit row — keyboard activation', () => {
  beforeEach(() => onStepClick.mockClear());

  it('exposes the row as a focusable button with collapsed state', () => {
    const el = renderRow();
    expect(el).toHaveAttribute('role', 'button');
    expect(el).toHaveAttribute('tabindex', '0');
    expect(el).toHaveAttribute('aria-expanded', 'false');
  });

  it('expands the trace and forwards the stepId on Enter', () => {
    const el = renderRow();
    expect(screen.queryByTestId('executor-log-trace')).toBeNull();
    fireEvent.keyDown(el, { key: 'Enter' });
    expect(screen.getByTestId('executor-log-trace')).toBeInTheDocument();
    expect(el).toHaveAttribute('aria-expanded', 'true');
    expect(onStepClick).toHaveBeenCalledWith('node-42');
  });

  it('activates on Space and prevents the page from scrolling', () => {
    const el = renderRow();
    const ev = createEvent.keyDown(el, { key: ' ' });
    fireEvent(el, ev);
    expect(screen.getByTestId('executor-log-trace')).toBeInTheDocument();
    expect(onStepClick).toHaveBeenCalledWith('node-42');
    expect(ev.defaultPrevented).toBe(true);
  });
});
