// REGRESSION — execution-log rows were mouse-only.
//
// The bug: `onToggle(row.id)` — the only way to reveal a row's JSON payload
// — hung off a bare `<div onClick>` with no role, tabIndex or key handler,
// so a keyboard user could never inspect an event payload. The row renders
// a block `<pre>` when open, so it stays a div and gains role="button" +
// tabIndex=0 + Enter/Space + aria-expanded.

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, createEvent } from '@testing-library/react';
import LogRow, { type LogRowData } from '../LogRow';

const row: LogRowData = {
  id: 7,
  at: Date.UTC(2026, 0, 1, 12, 0, 0),
  eventType: 'pipeline.step.completed',
  payload: { stepId: 'node-42', durationMs: 12 },
};

const onToggle = vi.fn();

function renderRow(isOpen = false) {
  render(<LogRow row={row} isOpen={isOpen} onToggle={onToggle} />);
  return screen.getByTestId('execution-log-row-7');
}

describe('LogRow — keyboard activation', () => {
  beforeEach(() => onToggle.mockClear());

  it('exposes the row as a focusable button with collapsed state', () => {
    const el = renderRow();
    expect(el).toHaveAttribute('role', 'button');
    expect(el).toHaveAttribute('tabindex', '0');
    expect(el).toHaveAttribute('aria-expanded', 'false');
  });

  it('reports aria-expanded=true while the payload is showing', () => {
    const el = renderRow(true);
    expect(el).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByTestId('execution-log-row-json-7')).toBeInTheDocument();
  });

  it('toggles the payload on Enter', () => {
    const el = renderRow();
    fireEvent.keyDown(el, { key: 'Enter' });
    expect(onToggle).toHaveBeenCalledWith(7);
  });

  it('toggles on Space and prevents the page from scrolling', () => {
    const el = renderRow();
    const ev = createEvent.keyDown(el, { key: ' ' });
    fireEvent(el, ev);
    expect(onToggle).toHaveBeenCalledWith(7);
    expect(ev.defaultPrevented).toBe(true);
  });
});
