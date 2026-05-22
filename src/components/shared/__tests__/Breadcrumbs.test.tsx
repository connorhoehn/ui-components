import { render, screen, fireEvent } from '@testing-library/react';
import { Breadcrumbs } from '../Breadcrumbs';
import type { BreadcrumbItem } from '../Breadcrumbs';

describe('Breadcrumbs', () => {
  it('renders nothing when items is empty', () => {
    const { container } = render(<Breadcrumbs items={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders all items', () => {
    const items: BreadcrumbItem[] = [
      { label: 'Home', href: '/' },
      { label: 'Projects', href: '/projects' },
      { label: 'Alpha' },
    ];
    render(<Breadcrumbs items={items} />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Alpha')).toBeInTheDocument();
  });

  it('last item has aria-current=page', () => {
    const items: BreadcrumbItem[] = [
      { label: 'Home', href: '/' },
      { label: 'Current' },
    ];
    render(<Breadcrumbs items={items} />);
    expect(screen.getByText('Current')).toHaveAttribute('aria-current', 'page');
  });

  it('renders links for items with href', () => {
    const items: BreadcrumbItem[] = [
      { label: 'Home', href: '/' },
      { label: 'Current' },
    ];
    render(<Breadcrumbs items={items} />);
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
  });

  it('calls onClick handler for button-style items', () => {
    const onClick = vi.fn();
    const items: BreadcrumbItem[] = [
      { label: 'Home', onClick },
      { label: 'Current' },
    ];
    render(<Breadcrumbs items={items} />);
    fireEvent.click(screen.getByRole('button', { name: 'Home' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('truncates middle items when maxItems is set', () => {
    const items: BreadcrumbItem[] = [
      { label: 'Home', href: '/' },
      { label: 'Level 1' },
      { label: 'Level 2' },
      { label: 'Level 3' },
      { label: 'Current' },
    ];
    render(<Breadcrumbs items={items} maxItems={3} />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Current')).toBeInTheDocument();
    // Middle items hidden; ellipsis shown
    expect(screen.queryByText('Level 1')).not.toBeInTheDocument();
    expect(screen.getByLabelText('More items')).toBeInTheDocument();
  });

  it('renders custom separator', () => {
    const items: BreadcrumbItem[] = [{ label: 'A', href: '/' }, { label: 'B' }];
    render(<Breadcrumbs items={items} separator=">" />);
    expect(screen.getByText('>')).toBeInTheDocument();
  });

  it('renders nav landmark', () => {
    const items: BreadcrumbItem[] = [{ label: 'Home', href: '/' }, { label: 'Page' }];
    render(<Breadcrumbs items={items} />);
    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument();
  });

  it('does not truncate when items <= maxItems', () => {
    const items: BreadcrumbItem[] = [
      { label: 'A', href: '/' },
      { label: 'B', href: '/b' },
      { label: 'C' },
    ];
    render(<Breadcrumbs items={items} maxItems={5} />);
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
    expect(screen.getByText('C')).toBeInTheDocument();
    expect(screen.queryByLabelText('More items')).not.toBeInTheDocument();
  });

  it('single item renders without separator', () => {
    render(<Breadcrumbs items={[{ label: 'Home' }]} />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.queryByText('/')).not.toBeInTheDocument();
  });
});
