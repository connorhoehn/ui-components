// 2.515.6 — the work graph's ‹ › / Following now / Earlier work say why they
// are off, from the window's own state.
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { WORK_WINDOW_REASONS, WorkTimeWindow, workWindowDisabledReasons } from '../WorkTimeWindow';
import type { WorkActivityPresentation } from '../types';

afterEach(cleanup);

const start = Date.parse('2026-09-20T12:00:00Z');
const end = start + 105 * 60_000;
const activity = (window: WorkActivityPresentation['window']): WorkActivityPresentation => ({
  efforts: [], mode: 'split', window, bounds: { start, end }, now: end, temporalMode: 'recent',
  view: { focusedEffortId: null, expandedSourceEfforts: [], canvasInitialized: true },
  onWindowChange: vi.fn(), onViewChange: vi.fn(),
}) as unknown as WorkActivityPresentation;
const describedBy = (el: HTMLElement) => (el.getAttribute('aria-describedby') ?? '').split(' ').filter(Boolean).map((id) => document.getElementById(id)?.textContent);

describe('workWindowDisabledReasons', () => {
  it('names each off control and leaves the on ones null', () => {
    expect(workWindowDisabledReasons({ start, end, following: true, boundsStart: start, liveEnd: end }))
      .toEqual({ previous: WORK_WINDOW_REASONS.earliest, next: WORK_WINDOW_REASONS.newest, follow: WORK_WINDOW_REASONS.following });
    expect(workWindowDisabledReasons({ start: start + 30 * 60_000, end: end - 30 * 60_000, following: false, boundsStart: start, liveEnd: end }))
      .toEqual({ previous: null, next: null, follow: null });
  });
});

describe('WorkTimeWindow', () => {
  it('following the whole day: ‹, › and Following now are off, each with its reason as tooltip and description', () => {
    render(<WorkTimeWindow activity={activity({ start, end, following: true })} />);
    const previous = screen.getByRole('button', { name: 'Previous interval' });
    const next = screen.getByRole('button', { name: 'Next interval' });
    const follow = screen.getByRole('button', { name: /Following now/ });
    expect(previous).toBeDisabled();
    expect(previous).toHaveAttribute('title', 'No earlier work in this window');
    expect(describedBy(previous)).toEqual(['No earlier work in this window']);
    expect(next).toHaveAttribute('title', 'Already at the newest work');
    expect(describedBy(next)).toEqual(['Already at the newest work']);
    expect(follow).toBeDisabled();
    expect(describedBy(follow)).toEqual(['Already following the newest work']);
  });

  it('a window in the middle: every control on, no reasons', () => {
    render(<WorkTimeWindow activity={activity({ start: start + 30 * 60_000, end: start + 45 * 60_000, following: false })} />);
    for (const name of ['Previous interval', 'Next interval']) {
      const button = screen.getByRole('button', { name });
      expect(button).not.toBeDisabled();
      expect(button).not.toHaveAttribute('aria-describedby');
      expect(button).not.toHaveAttribute('title');
    }
    expect(screen.getByRole('button', { name: /Back to now/ })).not.toHaveAttribute('aria-describedby');
  });
});
