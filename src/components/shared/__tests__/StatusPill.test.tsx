import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { StatusPill, type StatusPillState } from '../StatusPill';

describe('StatusPill', () => {
  it('renders a status role with the label and data-state', () => {
    render(<StatusPill state="success" label="Healthy" data-testid="pill" />);
    const pill = screen.getByTestId('pill');
    expect(pill).toHaveTextContent('Healthy');
    expect(pill.dataset.state).toBe('success');
    expect(pill).toHaveAttribute('role', 'status');
  });

  it.each(['success', 'error', 'warning', 'info', 'neutral', 'pending'] as StatusPillState[])(
    '%s uses tone classes, never a raw palette colour',
    (state) => {
      render(<StatusPill state={state} label="x" data-testid={`p-${state}`} />);
      const cls = screen.getByTestId(`p-${state}`).className;
      expect(cls).not.toMatch(/(green|red|amber|blue|emerald|indigo)-\d/);
    },
  );

  it('pending renders the animate-ping halo, others do not', () => {
    const { rerender } = render(<StatusPill state="pending" label="x" data-testid="p" />);
    expect(screen.getByTestId('p').querySelector('.animate-ping')).not.toBeNull();
    rerender(<StatusPill state="success" label="x" data-testid="p" />);
    expect(screen.getByTestId('p').querySelector('.animate-ping')).toBeNull();
  });

  it('an icon replaces the dot', () => {
    render(<StatusPill state="info" label="x" icon={<svg data-testid="ico" />} data-testid="p" />);
    expect(screen.getByTestId('ico')).toBeInTheDocument();
    expect(screen.getByTestId('p').querySelector('.rounded-full.relative')).toBeNull();
  });
});

describe('StatusPill stays on one line', () => {
  it('never wraps its label and ellipsizes it with the full text in a title', () => {
    render(<div className="w-12"><StatusPill state="success" variant="label" label="Completed" data-testid="pill" /></div>);
    const pill = screen.getByTestId('pill');
    expect(pill).toHaveClass('whitespace-nowrap', 'min-w-0', 'max-w-full');
    const label = pill.querySelector('[data-status-pill-label]')!;
    expect(label).toHaveClass('truncate');
    expect(label).toHaveAttribute('title', 'Completed');
    expect(pill).toHaveTextContent('Completed');
  });
});
