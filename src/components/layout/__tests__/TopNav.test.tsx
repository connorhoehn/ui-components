import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TopNav, NavTabs, type TopNavItem } from '../TopNav';

const ITEMS: TopNavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'Components', to: '/components' },
  { label: 'Hooks', to: '/hooks', badge: 4 },
  { label: 'Patterns', to: '/patterns' },
  { label: 'Guides', to: '/guides' },
  { label: 'Releases', to: '/releases' },
];

describe('TopNav', () => {
  it('renders all items as links by default', () => {
    render(<TopNav items={ITEMS} />);
    expect(screen.getAllByRole('link')).toHaveLength(ITEMS.length);
  });

  it('marks active item with aria-current=page when activeHref matches exactly', () => {
    render(<TopNav items={ITEMS} activeHref="/components" />);
    expect(screen.getByRole('link', { name: 'Components' }).getAttribute('aria-current')).toBe('page');
    expect(screen.getByRole('link', { name: 'Home' }).getAttribute('aria-current')).toBeNull();
  });

  it('marks active item when activeHref starts with item.to + "/"', () => {
    render(<TopNav items={ITEMS} activeHref="/components/button" />);
    expect(screen.getByRole('link', { name: 'Components' }).getAttribute('aria-current')).toBe('page');
  });

  it('does NOT mark "/" as active for any deeper path', () => {
    render(<TopNav items={ITEMS} activeHref="/components" />);
    expect(screen.getByRole('link', { name: 'Home' }).getAttribute('aria-current')).toBeNull();
  });

  it('renders badge slot on items that have one', () => {
    render(<TopNav items={ITEMS} />);
    const hooks = screen.getByRole('link', { name: /Hooks/ });
    expect(hooks.textContent).toContain('4');
  });

  it('renders brand and rightSlot', () => {
    render(<TopNav items={ITEMS} brand={<span>BrandX</span>} rightSlot={<button>Sign in</button>} />);
    expect(screen.getByText('BrandX')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument();
  });

  it('collapses items past maxVisible into a More menu', () => {
    render(<TopNav items={ITEMS} maxVisible={3} />);
    // visible: Home, Components, Hooks
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Hooks/ })).toBeInTheDocument();
    // hidden behind More
    expect(screen.queryByRole('link', { name: 'Patterns' })).toBeNull();
    expect(screen.getByTestId('topnav-more')).toBeInTheDocument();
  });

  it('opens the More menu on click and reveals overflow items', () => {
    render(<TopNav items={ITEMS} maxVisible={3} />);
    fireEvent.click(screen.getByTestId('topnav-more'));
    expect(screen.getByTestId('topnav-more-menu')).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: 'Patterns' })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: 'Guides' })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: 'Releases' })).toBeInTheDocument();
  });

  it('highlights the More button when an overflowed item is active', () => {
    render(<TopNav items={ITEMS} maxVisible={3} activeHref="/guides" />);
    const more = screen.getByTestId('topnav-more');
    expect(more.className).toMatch(/border-\[var\(--color-primary\)\]/);
  });

  it('renderLink override produces custom anchors', () => {
    render(
      <TopNav
        items={ITEMS.slice(0, 2)}
        renderLink={(item, props) => <a {...props} data-custom="yes" href={item.to}>{props.children}</a>}
      />,
    );
    expect(screen.getByRole('link', { name: 'Home' }).getAttribute('data-custom')).toBe('yes');
  });

  it('uses default aria-label "Main navigation"', () => {
    render(<TopNav items={ITEMS} />);
    expect(screen.getByRole('navigation', { name: 'Main navigation' })).toBeInTheDocument();
  });
});

describe('NavTabs', () => {
  it('renders link-style underline tabs', () => {
    render(<NavTabs items={ITEMS.slice(0, 3)} activeHref="/components" />);
    expect(screen.getByRole('navigation', { name: 'Sub navigation' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Components' }).getAttribute('aria-current')).toBe('page');
  });

  // The underline is a TAB indicator: it has to land on the bar's own bottom
  // border. A fixed-height link centred in a taller bar leaves it floating —
  // measured 12px above the bar's edge, with the `-mb-px` meant to overlap
  // that border doing nothing.
  it('stretches each tab to the bar so its underline meets the bar edge', () => {
    render(<TopNav items={[{ to: '/a', label: 'Alpha' }, { to: '/b', label: 'Beta' }]} activePath="/a" />);
    const tab = screen.getByTestId('topnav-link-/a');
    expect(tab.className).toContain('self-stretch');
    // A fixed height would re-introduce the gap.
    expect(tab.className).not.toMatch(/\bh-10\b/);
    // Still the tab idiom: border on the bottom, pulled over the bar's border.
    expect(tab.className).toContain('border-b-2');
    expect(tab.className).toContain('-mb-px');
  });
});
