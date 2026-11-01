import { render, screen, fireEvent, within } from '@testing-library/react';
import { Breadcrumbs } from '../Breadcrumbs';
import type { BreadcrumbItem } from '../Breadcrumbs';

describe('Breadcrumbs', () => {
  it('distinguishes a document location from the surrounding page trail', () => {
    render(<><Breadcrumbs items={[{ label: 'Workspace' }]} /><Breadcrumbs aria-label="Document location" items={[{ label: 'Folder' }]} /></>);
    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Document location' })).toBeInTheDocument();
  });
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

  describe('minItems', () => {
    it('renders nothing when the trail is shallower than minItems', () => {
      const { container } = render(
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Settings' }]} minItems={3} />,
      );
      expect(container.firstChild).toBeNull();
    });

    it('renders once the trail reaches minItems', () => {
      render(
        <Breadcrumbs
          items={[{ label: 'Home', href: '/' }, { label: 'Ops', href: '/ops' }, { label: 'Runs' }]}
          minItems={3}
        />,
      );
      expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument();
    });
  });

  describe('overflow="menu"', () => {
    const deep: BreadcrumbItem[] = [
      { label: 'Operate' },
      { label: 'Health', href: '/health' },
      { label: 'Harness', href: '/health/harness' },
      { label: 'Runs', href: '/health/harness/runs' },
      { label: 'Compare' },
    ];

    it('the collapsed middle is a button, not dead text', () => {
      render(<Breadcrumbs items={deep} maxItems={3} overflow="menu" />);
      expect(screen.getByRole('button', { name: 'Show hidden breadcrumbs' })).toBeInTheDocument();
      expect(screen.queryByLabelText('More items')).not.toBeInTheDocument();
    });

    it('opens the hidden crumbs as real links', () => {
      render(<Breadcrumbs items={deep} maxItems={3} overflow="menu" />);
      fireEvent.click(screen.getByRole('button', { name: 'Show hidden breadcrumbs' }));
      const panel = screen.getByTestId('breadcrumb-overflow');
      expect(within(panel).getByRole('link', { name: 'Health' })).toHaveAttribute('href', '/health');
      expect(within(panel).getByRole('link', { name: 'Harness' })).toBeInTheDocument();
      // The visible crumbs are not repeated inside the menu.
      expect(within(panel).queryByText('Compare')).not.toBeInTheDocument();
    });

    it('selecting a hidden crumb fires its handler and closes the menu', () => {
      const onClick = vi.fn();
      render(
        <Breadcrumbs
          items={[deep[0], { label: 'Health', href: '/health', onClick }, ...deep.slice(2)]}
          maxItems={3}
          overflow="menu"
        />,
      );
      fireEvent.click(screen.getByRole('button', { name: 'Show hidden breadcrumbs' }));
      fireEvent.click(within(screen.getByTestId('breadcrumb-overflow')).getByRole('link', { name: 'Health' }));
      expect(onClick).toHaveBeenCalledTimes(1);
      expect(screen.queryByTestId('breadcrumb-overflow')).not.toBeInTheDocument();
    });

    it('falls back to the inert ellipsis when nothing is actually hidden', () => {
      render(<Breadcrumbs items={deep.slice(0, 3)} maxItems={5} overflow="menu" />);
      expect(screen.queryByRole('button', { name: 'Show hidden breadcrumbs' })).not.toBeInTheDocument();
    });
  });
});
