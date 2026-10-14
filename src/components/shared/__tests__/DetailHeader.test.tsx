import { render, screen } from '@testing-library/react';
import { DetailHeader } from '../DetailHeader';

describe('DetailHeader', () => {
  it('renders the title as an h2 by default', () => {
    render(<DetailHeader title="Sprint 98" />);
    expect(screen.getByRole('heading', { level: 2, name: 'Sprint 98' })).toBeInTheDocument();
  });

  it('can drop to h3 so a nested panel does not outrank its page', () => {
    render(<DetailHeader as="h3" title="Sprint 98" />);
    expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
  });

  it('puts the badge inline with the title', () => {
    render(<DetailHeader title="Sprint 98" badge={<span>active</span>} />);
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading.parentElement?.textContent).toBe('Sprint 98active');
  });

  it('omits the description paragraph entirely when there is none', () => {
    const { container } = render(<DetailHeader title="t" />);
    expect(container.querySelector('p')).toBeNull();
  });

  it('caps the description at a readable measure, not the panel width', () => {
    const { container } = render(<DetailHeader title="t" description="Some goal." />);
    expect(container.querySelector('p')?.className).toContain('max-w-[72ch]');
  });

  it('renders the meta slot', () => {
    render(<DetailHeader title="t" meta={<div>Steward: Layla</div>} />);
    expect(screen.getByText('Steward: Layla')).toBeInTheDocument();
  });

  it('omits the aside element when there is nothing to put in it', () => {
    const { container } = render(<DetailHeader title="t" />);
    expect(container.querySelector('[data-detail-aside]')).toBeNull();
  });

  it('gives the aside a fixed, non-shrinking width — a reflowing gauge is unreadable', () => {
    const { container } = render(<DetailHeader title="t" aside={<div>bar</div>} />);
    const aside = container.querySelector('[data-detail-aside]')!;
    expect(aside.className).toContain('shrink-0');
    expect(aside).toHaveStyle({ width: '260px' });
  });

  it('takes an aside width', () => {
    const { container } = render(<DetailHeader title="t" aside={<div>b</div>} asideWidth={180} />);
    expect(container.querySelector('[data-detail-aside]')).toHaveStyle({ width: '180px' });
  });

  it('is header content, not a complementary landmark (no <aside> for host rail rules to style)', () => {
    const { container } = render(<DetailHeader title="t" aside={<div>bar</div>} />);
    expect(container.querySelector('aside')).toBeNull();
    expect(container.querySelector('[data-detail-aside]')).not.toBeNull();
  });
});
