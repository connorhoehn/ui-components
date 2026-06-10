// src/components/shared/__tests__/ImageLightbox.test.tsx

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { useState } from 'react';
import { ImageLightbox, type ImageLightboxImage } from '../ImageLightbox';

const IMAGES: ImageLightboxImage[] = [
  { src: '/img/a.png', alt: 'Image A', caption: 'First image' },
  { src: '/img/b.png', alt: 'Image B' },
  { src: '/img/c.png', alt: 'Image C', caption: 'Third image' },
];

// Controlled harness — owns openIndex like a real parent would.
function Harness({
  images = IMAGES,
  initialIndex = 0,
  controlledNav = true,
}: {
  images?: ImageLightboxImage[];
  initialIndex?: number | null;
  controlledNav?: boolean;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(initialIndex);
  return (
    <ImageLightbox
      images={images}
      openIndex={openIndex}
      onClose={() => setOpenIndex(null)}
      onNavigate={controlledNav ? setOpenIndex : undefined}
    />
  );
}

describe('ImageLightbox', () => {
  it('renders nothing when openIndex is null', () => {
    render(
      <ImageLightbox images={IMAGES} openIndex={null} onClose={() => {}} />,
    );
    expect(screen.queryByTestId('image-lightbox')).not.toBeInTheDocument();
  });

  it('renders dialog with image, caption and counter when open', () => {
    render(<Harness initialIndex={0} />);
    const dialog = screen.getByTestId('image-lightbox');
    expect(dialog).toHaveAttribute('role', 'dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveFocus();

    const img = screen.getByTestId('image-lightbox-img') as HTMLImageElement;
    expect(img.src).toContain('/img/a.png');
    expect(img.alt).toBe('Image A');
    expect(screen.getByTestId('image-lightbox-caption').textContent).toBe('First image');
    expect(screen.getByTestId('image-lightbox-counter').textContent).toBe('1 / 3');
  });

  it('closes on backdrop click but not on image click', () => {
    render(<Harness initialIndex={0} />);
    fireEvent.click(screen.getByTestId('image-lightbox-img'));
    expect(screen.getByTestId('image-lightbox')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('image-lightbox'));
    expect(screen.queryByTestId('image-lightbox')).not.toBeInTheDocument();
  });

  it('closes on Escape and via the close button', () => {
    const { unmount } = render(<Harness initialIndex={1} />);
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.queryByTestId('image-lightbox')).not.toBeInTheDocument();
    unmount();

    render(<Harness initialIndex={1} />);
    fireEvent.click(screen.getByTestId('image-lightbox-close'));
    expect(screen.queryByTestId('image-lightbox')).not.toBeInTheDocument();
  });

  it('navigates with prev/next buttons', () => {
    render(<Harness initialIndex={0} />);
    fireEvent.click(screen.getByTestId('image-lightbox-next'));
    expect(screen.getByTestId('image-lightbox-counter').textContent).toBe('2 / 3');
    fireEvent.click(screen.getByTestId('image-lightbox-prev'));
    expect(screen.getByTestId('image-lightbox-counter').textContent).toBe('1 / 3');
  });

  it('navigates with arrow keys and wraps around both ends', () => {
    render(<Harness initialIndex={0} />);
    // ArrowLeft from index 0 wraps to the last image
    fireEvent.keyDown(window, { key: 'ArrowLeft' });
    expect(screen.getByTestId('image-lightbox-counter').textContent).toBe('3 / 3');
    // ArrowRight from the last image wraps back to the first
    fireEvent.keyDown(window, { key: 'ArrowRight' });
    expect(screen.getByTestId('image-lightbox-counter').textContent).toBe('1 / 3');
  });

  it('calls onNavigate with the wrapped target index', () => {
    const onNavigate = vi.fn();
    render(
      <ImageLightbox
        images={IMAGES}
        openIndex={2}
        onClose={() => {}}
        onNavigate={onNavigate}
      />,
    );
    fireEvent.keyDown(window, { key: 'ArrowRight' });
    expect(onNavigate).toHaveBeenCalledWith(0);
  });

  it('falls back to internal navigation when onNavigate is omitted', () => {
    render(<Harness initialIndex={0} controlledNav={false} />);
    fireEvent.click(screen.getByTestId('image-lightbox-next'));
    expect(screen.getByTestId('image-lightbox-counter').textContent).toBe('2 / 3');
    const img = screen.getByTestId('image-lightbox-img') as HTMLImageElement;
    expect(img.src).toContain('/img/b.png');
  });

  it('hides prev/next buttons for a single image', () => {
    render(
      <Harness images={[{ src: '/img/solo.png', alt: 'Solo' }]} initialIndex={0} />,
    );
    expect(screen.queryByTestId('image-lightbox-prev')).not.toBeInTheDocument();
    expect(screen.queryByTestId('image-lightbox-next')).not.toBeInTheDocument();
    expect(screen.getByTestId('image-lightbox-counter').textContent).toBe('1 / 1');
  });

  it('hides the caption bar when the image has no caption', () => {
    render(<Harness initialIndex={1} />);
    expect(screen.queryByTestId('image-lightbox-caption')).not.toBeInTheDocument();
  });
});
