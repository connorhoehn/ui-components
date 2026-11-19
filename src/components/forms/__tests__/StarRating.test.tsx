import { render, screen, fireEvent } from '@testing-library/react';
import { StarRating } from '../StarRating';

describe('StarRating', () => {
  it('names each star "n of max" and sets on click', () => {
    const onChange = vi.fn();
    render(<StarRating label="Overall" value={2} max={4} onChange={onChange} />);
    expect(screen.getAllByRole('radio')).toHaveLength(4);
    fireEvent.click(screen.getByRole('radio', { name: '3 of 4' }));
    expect(onChange).toHaveBeenCalledWith(3);
    expect(screen.getByRole('radio', { name: '2 of 4' })).toHaveAttribute('aria-checked', 'true');
  });

  it('moves with the arrow keys', () => {
    const onChange = vi.fn();
    render(<StarRating label="Overall" value={2} max={4} onChange={onChange} />);
    fireEvent.keyDown(screen.getByRole('radio', { name: '2 of 4' }), { key: 'ArrowRight' });
    expect(onChange).toHaveBeenCalledWith(3);
    fireEvent.keyDown(screen.getByRole('radio', { name: '2 of 4' }), { key: 'ArrowLeft' });
    expect(onChange).toHaveBeenLastCalledWith(1);
  });

  it('reads out a fractional average in words when read-only', () => {
    render(<StarRating label="Average" value={3.5} max={4} readOnly />);
    expect(screen.getByRole('img', { name: 'Average: 3.5 of 4 stars' })).toBeInTheDocument();
  });

  it('says not rated for null', () => {
    render(<StarRating label="Average" value={null} readOnly />);
    expect(screen.getByRole('img', { name: 'Average: not rated' })).toBeInTheDocument();
  });
});
