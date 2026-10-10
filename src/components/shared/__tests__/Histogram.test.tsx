import { render, screen } from '@testing-library/react';
import { Histogram } from '../Histogram';
import { AccentStripe, dataAccentProps } from '../dataAccent';

describe('Histogram', () => {
  it('scales bars to the largest bucket with a 2px floor', () => {
    render(<Histogram buckets={[0, 5, 10]} height={40} data-testid="h" />);
    expect(screen.getByTestId('h-bar-2')).toHaveAttribute('height', '40');
    expect(screen.getByTestId('h-bar-1')).toHaveAttribute('height', '20');
    expect(screen.getByTestId('h-bar-0')).toHaveAttribute('height', '2');
  });

  it('describes itself with labels', () => {
    render(<Histogram buckets={[1, 2]} labels={['low', 'high']} />);
    expect(screen.getByRole('img')).toHaveAttribute('aria-label', expect.stringContaining('high: 2'));
  });

  it('slot accents use a data attribute, raw colours a custom property', () => {
    expect(dataAccentProps(3)).toEqual({ 'data-accent': '3' });
    expect(dataAccentProps('#123456').style).toEqual({ '--data-accent': '#123456' });
    expect(dataAccentProps(undefined)).toEqual({});
    render(<AccentStripe accent={2} data-testid="s" />);
    expect(screen.getByTestId('s')).toHaveAttribute('data-accent', '2');
  });
});
