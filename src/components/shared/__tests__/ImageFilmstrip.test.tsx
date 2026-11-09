import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { ImageFilmstrip } from '../ImageFilmstrip';

const src = (n: number) => `data:image/png;base64,AA${n}=`;
const items = ['Full', 'Front', 'Side', 'Back', '3/4', 'Top', 'Bottom', 'Detail'].map((label, i) => ({ id: label.toLowerCase(), label, src: src(i) }));

describe('ImageFilmstrip', () => {
  it('shows the first view whole, the others as thumbnails, and a caption chip', () => {
    render(<ImageFilmstrip items={items.slice(0, 4)} caption="Approved concept · v2" />);
    const strip = screen.getByTestId('image-filmstrip');
    expect(strip).toHaveAttribute('data-image-filmstrip');
    expect(strip).toHaveTextContent('Approved concept · v2');
    expect(strip.querySelector('[data-image-compare-frame]')).toHaveAttribute('data-image-fit', 'contain');
    const thumbs = screen.getAllByRole('button', { pressed: undefined }).filter((b) => b.hasAttribute('data-filmstrip-thumb'));
    expect(thumbs).toHaveLength(4);
    expect(screen.getByRole('button', { name: 'Full' })).toHaveAttribute('aria-pressed', 'true');
  });

  it('choosing a thumbnail swaps the large frame (uncontrolled) and reports it', async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    render(<ImageFilmstrip items={items.slice(0, 4)} onValueChange={onValueChange} />);
    await user.click(screen.getByRole('button', { name: 'Side' }));
    expect(onValueChange).toHaveBeenCalledWith('side');
    expect(screen.getByRole('button', { name: 'Side' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByTestId('image-filmstrip-current')).toHaveTextContent('Side');
  });

  it('caps thumbnails and offers "+N more" only with onMore', async () => {
    const onMore = vi.fn();
    const user = userEvent.setup();
    const { rerender } = render(<ImageFilmstrip items={items} maxThumbs={5} />);
    expect(screen.queryByTestId('image-filmstrip-more')).toBeNull();
    rerender(<ImageFilmstrip items={items} maxThumbs={5} onMore={onMore} />);
    await user.click(screen.getByRole('button', { name: '+3 more' }));
    expect(onMore).toHaveBeenCalledOnce();
  });

  it('renders nothing for no items and no strip for one', () => {
    const { container, rerender } = render(<ImageFilmstrip items={[]} />);
    expect(container).toBeEmptyDOMElement();
    rerender(<ImageFilmstrip items={items.slice(0, 1)} />);
    expect(screen.queryByTestId('image-filmstrip-thumbs')).toBeNull();
  });
});
