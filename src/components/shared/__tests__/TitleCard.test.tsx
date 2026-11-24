import { render, screen } from '@testing-library/react';
import { TitleCard } from '../TitleCard';
import { TitleCard as FromShared } from '..';

const image = { src: '/show.png', alt: 'The office at night' };

describe('TitleCard', () => {
  it('sets the title, tagline and meta on the picture, wide by default', () => {
    render(<TitleCard title="Little Office" tagline="Work is a stage" meta="6 episodes · Season 1" image={image} />);
    const card = screen.getByTestId('title-card');
    expect(card).toHaveAttribute('data-aspect', 'wide');
    expect(card.className).toContain('aspect-video');
    expect(screen.getByRole('img', { name: 'The office at night' })).toHaveClass('object-cover');
    const h = screen.getByRole('heading', { level: 2, name: 'Little Office' });
    expect(h.className).toContain('text-xl');
    expect(screen.getByTestId('title-card-tagline').className).toContain('text-sm');
    expect(screen.getByTestId('title-card-meta').className).toContain('text-xs');
    expect(card.querySelector('[data-title-card-scrim]')).toHaveAttribute('aria-hidden', 'true');
  });

  it('puts actions top-right and the text bottom-left by justification, with no inline style or auto margin', () => {
    const { container } = render(<TitleCard title="T" image={image} aspect="banner" as="h1" actions={<button type="button">Edit</button>} />);
    expect(screen.getByRole('heading', { level: 1, name: 'T' })).toBeInTheDocument();
    expect(screen.getByTestId('title-card')).toHaveAttribute('data-aspect', 'banner');
    expect(screen.getByTestId('title-card-actions').className).toContain('justify-end');
    expect(screen.getByTestId('title-card-actions').parentElement!.className).toContain('justify-between');
    expect(container.querySelector('[style]')).toBeNull();
    expect(container.innerHTML).not.toMatch(/\bm[lrxyt]-auto\b/);
  });

  it('draws no tagline, meta or actions row when absent, and is exported from /shared', () => {
    render(<FromShared title="T" image={image} />);
    expect(screen.queryByTestId('title-card-tagline')).toBeNull();
    expect(screen.queryByTestId('title-card-meta')).toBeNull();
    expect(screen.queryByTestId('title-card-actions')).toBeNull();
  });
});
