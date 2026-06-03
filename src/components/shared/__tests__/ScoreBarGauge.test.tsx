import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ScoreBarGauge } from '../ScoreBarGauge';

describe('ScoreBarGauge', () => {
  it('renders a role=meter with the value', () => {
    render(<ScoreBarGauge value={0.42} />);
    const meter = screen.getByRole('meter');
    expect(meter.getAttribute('aria-valuenow')).toBe('0.42');
    expect(meter.getAttribute('aria-valuemin')).toBe('0');
    expect(meter.getAttribute('aria-valuemax')).toBe('1');
  });

  it('clamps values above 1 and below 0', () => {
    render(<ScoreBarGauge value={1.7} />);
    expect(screen.getByRole('meter').getAttribute('aria-valuenow')).toBe('1');
    render(<ScoreBarGauge value={-0.3} />);
    const meters = screen.getAllByRole('meter');
    expect(meters[meters.length - 1].getAttribute('aria-valuenow')).toBe('0');
  });

  it('treats NaN as 0 (defensive)', () => {
    render(<ScoreBarGauge value={Number.NaN} />);
    expect(screen.getByRole('meter').getAttribute('aria-valuenow')).toBe('0');
  });

  it('shows a percentage label by default', () => {
    render(<ScoreBarGauge value={0.42} />);
    expect(screen.getByText('42%')).toBeInTheDocument();
  });

  it('hides the label when showLabel=false', () => {
    render(<ScoreBarGauge value={0.42} showLabel={false} />);
    expect(screen.queryByText('42%')).not.toBeInTheDocument();
  });

  it('synthesizes a screen-reader aria-label including the threshold', () => {
    render(<ScoreBarGauge value={0.8} threshold={0.7} />);
    expect(screen.getByRole('meter').getAttribute('aria-label')).toMatch(/threshold 70%/);
  });
});
