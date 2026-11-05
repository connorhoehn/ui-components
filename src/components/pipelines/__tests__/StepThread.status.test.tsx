// REGRESSION — the status badge was 10px white text on the raw status colour,
// 1.92:1 on dark success. It now uses the theme's tinted pairs at 11px, and a
// labelled step's type subtitle never wraps letter by letter in a narrow column.
import { render, screen } from '@testing-library/react';
import type { StepExecution } from '../../../types/pipeline';
import { StepThread } from '../steps/StepThread';

const at = (status: string) => ({ nodeId: 'n', status, startedAt: '2026-11-04T12:00:00.000Z' }) as unknown as StepExecution;

describe('StepThread status badge', () => {
  it.each([
    ['completed', 'bg-success-bg', 'text-success-fg'],
    ['failed', 'bg-danger-bg', 'text-danger-fg'],
    ['running', 'bg-info-bg', 'text-info-fg'],
    ['awaiting', 'bg-warning-bg', 'text-warning-fg'],
    ['pending', 'bg-surface-inset', 'text-text-secondary'],
  ])('%s uses a token pair, not white on a raw colour', (status, bg, fg) => {
    render(<StepThread stepId="n" step={at(status)} index={0} nodeType="unknown" />);
    const badge = screen.getByLabelText(`Status: ${status}`);
    expect(badge.className).toContain(bg);
    expect(badge.className).toContain(fg);
    expect(badge.className).toContain('text-[11px]');
    expect(badge.className).not.toContain('text-white');
    expect(badge.getAttribute('style')).toBeNull();
  });

  it('keeps a labelled step type on one line and lets the title shrink', () => {
    render(<StepThread stepId="n-abcdef1234" step={at('pending')} index={0} nodeType="action" nodeConfig={{ label: 'Check captured inputs' }} />);
    expect(screen.getByText('action').className).toContain('whitespace-nowrap');
    expect(screen.getByText('1. Check captured inputs').className).toContain('min-w-0');
  });
});
