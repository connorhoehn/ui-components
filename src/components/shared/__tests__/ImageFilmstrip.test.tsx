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

  it('maxWidth holds the filmstrip to a named width (2.546.0)', () => {
    const { rerender } = render(<ImageFilmstrip items={items.slice(0, 3)} maxWidth="sm" />);
    const strip = screen.getByTestId('image-filmstrip');
    expect(strip).toHaveAttribute('data-max-width', 'sm');
    expect(strip.className).toContain('max-w-sm');
    rerender(<ImageFilmstrip items={items.slice(0, 3)} />);
    expect(screen.getByTestId('image-filmstrip')).not.toHaveAttribute('data-max-width');
    expect(screen.getByTestId('image-filmstrip').className).not.toContain('max-w-');
  });

  it('has no navigation unless asked (2.546.0)', () => {
    render(<ImageFilmstrip items={items} />);
    expect(screen.queryByTestId('image-filmstrip-nav')).toBeNull();
  });

  it('navigation buttons move the controlled value, show label and position, and stop at the ends (2.546.0)', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    const { rerender } = render(<ImageFilmstrip items={items} value="full" onValueChange={onValueChange} navigation />);
    expect(screen.getByTestId('image-filmstrip-position')).toHaveTextContent('1 of 8');
    expect(screen.getByTestId('image-filmstrip-current-label')).toHaveTextContent('Full');
    expect(screen.getByRole('button', { name: 'Previous' })).toBeDisabled();
    await user.click(screen.getByRole('button', { name: 'Next' }));
    expect(onValueChange).toHaveBeenLastCalledWith('front');
    rerender(<ImageFilmstrip items={items} value="detail" onValueChange={onValueChange} navigation />);
    expect(screen.getByTestId('image-filmstrip-position')).toHaveTextContent('8 of 8');
    expect(screen.getByRole('button', { name: 'Next' })).toBeDisabled();
    await user.click(screen.getByRole('button', { name: 'Previous' }));
    expect(onValueChange).toHaveBeenLastCalledWith('bottom');
    expect(onValueChange).toHaveBeenCalledTimes(2);
  });

  it('Left/Right arrow keys step the current item (uncontrolled) and stop at the ends (2.546.0)', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<ImageFilmstrip items={items.slice(0, 3)} onValueChange={onValueChange} navigation showPosition={false} />);
    expect(screen.queryByTestId('image-filmstrip-position')).toBeNull();
    screen.getByRole('button', { name: 'Front' }).focus();
    await user.keyboard('{ArrowLeft}');
    expect(onValueChange).not.toHaveBeenCalled();
    await user.keyboard('{ArrowRight}');
    expect(screen.getByTestId('image-filmstrip-current-label')).toHaveTextContent('Front');
    await user.keyboard('{ArrowRight}{ArrowRight}');
    expect(screen.getByTestId('image-filmstrip-current-label')).toHaveTextContent('Side');
    expect(onValueChange.mock.calls.map((c) => c[0])).toEqual(['front', 'side']);
    await user.keyboard('{ArrowLeft}');
    expect(screen.getByTestId('image-filmstrip-current-label')).toHaveTextContent('Front');
  });
});
