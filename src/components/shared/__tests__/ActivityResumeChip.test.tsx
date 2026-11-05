import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ActivityResumeChip, activityAge } from '../ActivityResumeChip';

describe('ActivityResumeChip (2.503.0)', () => {
  const now = Date.parse('2026-11-04T12:00:00Z');
  it('names the activity, its state and its age, and resumes on click', () => {
    const resume = vi.fn();
    render(<ActivityResumeChip label="Create artwork" status="Completed" tone="success" at="2026-11-04T11:58:00Z" now={now} onResume={resume} />);
    const chip = screen.getByRole('button', { name: 'Resume Create artwork · Completed · 2m ago' });
    expect(chip).toHaveTextContent('Create artwork·Completed·2m ago');
    fireEvent.click(chip);
    expect(resume).toHaveBeenCalledOnce();
  });
  it('omits the age when there is no time', () => {
    render(<ActivityResumeChip label="Create artwork" status="Running" onResume={() => {}} />);
    expect(screen.getByRole('button', { name: 'Resume Create artwork · Running' })).toBeInTheDocument();
  });
  it('formats ages', () => {
    expect(activityAge(now - 10_000, now)).toBe('just now');
    expect(activityAge(now - 3 * 3_600_000, now)).toBe('3h ago');
    expect(activityAge(now - 2 * 86_400_000, now)).toBe('2d ago');
    expect(activityAge('not a date', now)).toBe('');
  });
});
