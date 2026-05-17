import { render, screen } from '@testing-library/react';
import { ViewerCount } from '../ViewerCount';

describe('ViewerCount', () => {
  it('renders an integer count under 1000 verbatim', () => {
    render(<ViewerCount count={42} />);
    expect(screen.getByText('42 watching')).toBeInTheDocument();
  });

  it('renders zero as "0 watching"', () => {
    render(<ViewerCount count={0} />);
    expect(screen.getByText('0 watching')).toBeInTheDocument();
  });

  it('formats 1000 as 1.0K', () => {
    render(<ViewerCount count={1000} />);
    expect(screen.getByText('1.0K watching')).toBeInTheDocument();
  });

  it('formats counts >= 1000 with one decimal of K precision', () => {
    render(<ViewerCount count={2345} />);
    expect(screen.getByText('2.3K watching')).toBeInTheDocument();
  });

  it('formats large counts with K suffix', () => {
    render(<ViewerCount count={123456} />);
    expect(screen.getByText('123.5K watching')).toBeInTheDocument();
  });
});
