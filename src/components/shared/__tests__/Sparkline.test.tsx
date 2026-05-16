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
});
