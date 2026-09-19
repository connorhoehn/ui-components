import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { ImageThumbnail } from './ImageThumbnail';

afterEach(cleanup);

describe('ImageThumbnail preview states', () => {
  it('shows the fallback without requesting an empty URL', () => {
    render(<ImageThumbnail src="" alt="Photo" fallback="Preview unavailable" />);
    expect(screen.getByText('Preview unavailable')).toBeInTheDocument();
    expect(screen.queryByRole('img')).toBeNull();
  });

  it('loads a replacement source after the previous one failed', () => {
    const { rerender } = render(<ImageThumbnail src="/missing.jpg" alt="Photo" fallback="Preview unavailable" />);
    fireEvent.error(screen.getByRole('img'));
    expect(screen.getByText('Preview unavailable')).toBeInTheDocument();
    rerender(<ImageThumbnail src="/available.jpg" alt="Photo" fallback="Preview unavailable" />);
    expect(screen.queryByText('Preview unavailable')).toBeNull();
    const img = screen.getByRole('img');
    expect(img).toHaveClass('opacity-0');
    fireEvent.load(img);
    expect(img).toHaveClass('opacity-100');
  });
});
