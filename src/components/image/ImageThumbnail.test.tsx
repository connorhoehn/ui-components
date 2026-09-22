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

  // Regression: `rounded` on a video-aspect thumbnail (e.g. a deck slide
  // screenshot) used to draw `rounded-full`, an ellipse on a 16:9 box that
  // clips a wide image into a blob. A circle only reads as a circle on a
  // square box, so `rounded` gets rounded corners instead on any other
  // aspect ratio — never a circle.
  it('never renders rounded-full on a non-square aspect ratio', () => {
    render(<ImageThumbnail src="/deck.svg" alt="Slide" aspectRatio="video" rounded data-testid="video-thumb" />);
    const box = screen.getByTestId('video-thumb');
    expect(box.className).not.toContain('rounded-full');
    expect(box.className).toContain('aspect-video');
    expect(box.className).toContain('rounded-lg');
  });

  it('still renders a circle for a rounded square avatar', () => {
    render(<ImageThumbnail src="/avatar.jpg" alt="Avatar" aspectRatio="square" rounded data-testid="avatar-thumb" />);
    const box = screen.getByTestId('avatar-thumb');
    expect(box.className).toContain('rounded-full');
  });
});
