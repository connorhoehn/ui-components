import { render, screen } from '@testing-library/react';
import Sparkline from '../Sparkline';

describe('Sparkline', () => {
  it('renders an empty SVG when data is empty', () => {
    const { container } = render(<Sparkline data={[]} />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(container.querySelector('polyline')).not.toBeInTheDocument();
  });

  it('renders the sparkline SVG with data', () => {
    render(<Sparkline data={[10, 20, 30]} />);
    expect(screen.getByTestId('sparkline')).toBeInTheDocument();
    expect(document.querySelector('polyline')).toBeInTheDocument();
  });

  it('applies default width and height', () => {
    render(<Sparkline data={[1, 2]} />);
    const svg = screen.getByTestId('sparkline');
    expect(svg).toHaveAttribute('width', '80');
    expect(svg).toHaveAttribute('height', '20');
  });

  it('applies custom width and height', () => {
    render(<Sparkline data={[1, 2]} width={200} height={40} />);
    const svg = screen.getByTestId('sparkline');
    expect(svg).toHaveAttribute('width', '200');
    expect(svg).toHaveAttribute('height', '40');
  });

  it('applies custom color to the polyline stroke', () => {
    render(<Sparkline data={[1, 2, 3]} color="#ff0000" />);
    const polyline = document.querySelector('polyline');
    expect(polyline).toHaveAttribute('stroke', '#ff0000');
  });

  it('renders a single data point without crashing', () => {
    render(<Sparkline data={[42]} />);
    expect(screen.getByTestId('sparkline')).toBeInTheDocument();
  });

  const yValues = () =>
    (document.querySelector('polyline')!.getAttribute('points') ?? '')
      .split(' ')
      .map(p => Number(p.split(',')[1]));

  it('defaults to min-based normalization, filling the box', () => {
    render(<Sparkline data={[100, 101, 102]} height={20} />);
    expect(yValues()).toEqual([20, 10, 0]);
  });

  it('keeps a near-flat series flat when baseline is zero', () => {
    render(<Sparkline data={[100, 101, 102]} height={20} baseline="zero" />);
    const ys = yValues();
    // All three sit within a fifth of a pixel of the top — a flat line, not a climb.
    expect(Math.max(...ys) - Math.min(...ys)).toBeLessThan(0.5);
  });

  it('draws a flat bottom line for an all-zero series with baseline zero', () => {
    render(<Sparkline data={[0, 0, 0]} height={20} baseline="zero" />);
    expect(yValues()).toEqual([20, 20, 20]);
  });

  it('falls back to the series minimum when baseline zero meets negative values', () => {
    render(<Sparkline data={[-10, 0, 10]} height={20} baseline="zero" />);
    expect(yValues()).toEqual([20, 10, 0]);
  });

  it('accepts an explicit numeric baseline', () => {
    render(<Sparkline data={[50, 100]} height={20} baseline={0} />);
    expect(yValues()).toEqual([10, 0]);
  });
});
