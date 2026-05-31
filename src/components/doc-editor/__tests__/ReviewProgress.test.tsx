import { render, screen } from '@testing-library/react';
import ReviewProgress from '../ReviewProgress';

describe('ReviewProgress', () => {
  it('renders 0% when total is 0 (no divide-by-zero)', () => {
    render(<ReviewProgress current={0} total={0} />);
    expect(screen.getByText('0 of 0 sections reviewed')).toBeInTheDocument();
    expect(screen.getByText('0%')).toBeInTheDocument();
  });

  it('renders 50% when half are reviewed', () => {
    render(<ReviewProgress current={2} total={4} />);
    expect(screen.getByText('2 of 4 sections reviewed')).toBeInTheDocument();
    expect(screen.getByText('50%')).toBeInTheDocument();
  });

  it('renders 100% when all reviewed and rounds non-integer percentages', () => {
    render(<ReviewProgress current={3} total={3} />);
    expect(screen.getByText('100%')).toBeInTheDocument();
    // Now check rounding: 1/3 = 33.333... → "33%".
    render(<ReviewProgress current={1} total={3} />);
    expect(screen.getByText('33%')).toBeInTheDocument();
  });
});
