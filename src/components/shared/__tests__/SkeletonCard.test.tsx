import { render, screen } from '@testing-library/react';
import SkeletonCard from '../SkeletonCard';

describe('SkeletonCard', () => {
  it('renders the skeleton element', () => {
    render(<SkeletonCard />);
    expect(screen.getByTestId('skeleton-card')).toBeInTheDocument();
  });

  it('applies default width (100%) and height (64)', () => {
    render(<SkeletonCard />);
    const el = screen.getByTestId('skeleton-card');
    expect(el).toHaveStyle({ width: '100%', height: '64px' });
  });

  it('accepts custom width and height as numbers', () => {
    render(<SkeletonCard width={200} height={120} />);
    const el = screen.getByTestId('skeleton-card');
    expect(el).toHaveStyle({ width: '200px', height: '120px' });
  });

  it('accepts custom width as a string', () => {
    render(<SkeletonCard width="50%" height="2rem" />);
    const el = screen.getByTestId('skeleton-card');
    expect(el).toHaveStyle({ width: '50%', height: '2rem' });
  });
});
