import { render, screen, fireEvent, within } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ImageCompare } from '../ImageCompare';
import { StatusPill } from '../StatusPill';

const three = [
  { src: '/ref.png', label: 'Reference', description: 'Uploaded brief' },
  { src: '/cur.png', label: 'Current', description: 'v2' },
  { src: '/cand.png', label: 'Candidate', meta: <StatusPill size="sm" state="warning" label="Needs review" /> },
];

describe('ImageCompare', () => {
  it('renders each image with its label in one labelled list, in order', () => {
    render(<ImageCompare images={three} label="Compare driveway" />);
    const list = screen.getByRole('list', { name: 'Compare driveway' });
    const items = within(list).getAllByRole('listitem');
    expect(items).toHaveLength(3);
    expect(items.map((li) => within(li).getByRole('img').getAttribute('src'))).toEqual(['/ref.png', '/cur.png', '/cand.png']);
    expect(within(items[0]).getByText('Reference')).toBeInTheDocument();
    expect(within(items[0]).getByText('Uploaded brief')).toBeInTheDocument();
    expect(within(items[2]).getByText('Needs review')).toBeInTheDocument();
    expect(list).toHaveAttribute('data-ui-image-compare', '3');
  });

  it('gives every pane the same frame so heights match', () => {
    const { container } = render(<ImageCompare images={three} aspect="square" />);
    const frames = [...container.querySelectorAll('[data-image-compare-frame]')];
    expect(frames).toHaveLength(3);
    for (const f of frames) expect(f).toHaveClass('aspect-square', 'bg-surface-inset');
    for (const img of screen.getAllByRole('img')) expect(img).toHaveClass('object-contain', 'h-full', 'w-full');
  });

  it('stacks at narrow widths and goes side by side via container queries', () => {
    const { rerender } = render(<ImageCompare images={three.slice(0, 2)} />);
    const list = () => screen.getByRole('list');
    expect(list()).toHaveClass('grid-cols-1', '@md:grid-cols-2');
    rerender(<ImageCompare images={three} />);
    expect(list()).toHaveClass('grid-cols-1', '@2xl:grid-cols-3');
    expect(list().parentElement).toHaveClass('@container');
  });

  it('opens the lightbox on the clicked image and flips to the others with the arrow keys', () => {
    render(<ImageCompare images={three} />);
    fireEvent.click(screen.getByRole('button', { name: 'Enlarge Current' }));
    expect(screen.getByTestId('image-lightbox-img')).toHaveAttribute('src', '/cur.png');
    expect(screen.getByTestId('image-lightbox-counter')).toHaveTextContent('2 / 3');
    fireEvent.keyDown(window, { key: 'ArrowRight' });
    expect(screen.getByTestId('image-lightbox-img')).toHaveAttribute('src', '/cand.png');
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.queryByTestId('image-lightbox')).not.toBeInTheDocument();
  });

  it('panes are real buttons, so keyboard users reach and open them', () => {
    render(<ImageCompare images={three} />);
    const buttons = screen.getAllByRole('button', { name: /^Enlarge / });
    expect(buttons).toHaveLength(3);
    for (const b of buttons) {
      expect(b.tagName).toBe('BUTTON');
      expect(b).toHaveAttribute('type', 'button');
      expect(b.className).toContain('focus-visible:ring-primary');
    }
  });

  it('zoomable={false} renders plain figures with no buttons or lightbox', () => {
    render(<ImageCompare images={three} zoomable={false} />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('uses alt over label for the image and ignores images past three', () => {
    render(<ImageCompare images={[...three, { src: '/x.png', label: 'Extra' }].map((i, n) => (n === 0 ? { ...i, alt: 'Brief photo of the driveway' } : i))} />);
    expect(screen.getAllByRole('img')).toHaveLength(3);
    expect(screen.getByAltText('Brief photo of the driveway')).toBeInTheDocument();
    expect(screen.queryByText('Extra')).not.toBeInTheDocument();
  });

  it('renders nothing for an empty list', () => {
    const { container } = render(<ImageCompare images={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('uses no inline styles or raw colours', () => {
    const { container } = render(<ImageCompare images={three} />);
    expect(container.querySelector('[style]')).toBeNull();
    expect(container.innerHTML).not.toMatch(/#[0-9a-f]{3,8}\b|bg-(red|blue|gray|slate|black|white)\b/i);
  });
});
