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

  // The underline indicator and the strip's own bottom rule are ONE line: the
  // link's `-mb-px` overlaps them. Both have to be present for either to look
  // deliberate.
  it('underline variant puts the indicator on a rule that exists', () => {
    render(<NavTabs items={ITEMS.slice(0, 3)} activeHref="/components" />);
    const nav = screen.getByRole('navigation', { name: 'Sub navigation' });
    expect(nav.className).toContain('border-b');
    const active = screen.getByRole('link', { name: 'Components' });
    expect(active.className).toContain('border-b-2');
    expect(active.className).toContain('-mb-px');
  });

  // In a header there is no such rule — the header's own border belongs to the
  // header and sits lower down, so an underline indicator hangs in mid-air.
  // Measured in the app at 12px above the header rule, attached to nothing.
  it('pill variant drops the rule AND the underline together', () => {
    render(<NavTabs items={ITEMS.slice(0, 3)} activeHref="/components" variant="pill" />);
    const nav = screen.getByRole('navigation', { name: 'Sub navigation' });
    expect(nav.className).not.toContain('border-b');
    const active = screen.getByRole('link', { name: 'Components' });
    expect(active.className).not.toContain('border-b-2');
    expect(active.className).not.toContain('-mb-px');
    expect(active.className).toContain('rounded-md');
    expect(active.getAttribute('aria-current')).toBe('page');
  });

  it('pill variant still marks exactly one item current', () => {
    render(<NavTabs items={ITEMS.slice(0, 3)} activeHref="/components" variant="pill" />);
    const current = screen.getAllByRole('link').filter((a) => a.getAttribute('aria-current') === 'page');
    expect(current).toHaveLength(1);
  });

  // Apps stack these two: a primary row in the header (pill) and a section row
  // under it (underline). They only read as one control if the item BOX is the
  // same — same height, same padding, same gap. It used to be h-8 against
  // h-10, so the second row stood 4px taller than the first.
  it('both variants render the same item box', () => {
    const { unmount } = render(<NavTabs items={ITEMS.slice(0, 3)} variant="pill" />);
    const pill = screen.getByRole('link', { name: 'Home' }).className;
    unmount();
    render(<NavTabs items={ITEMS.slice(0, 3)} variant="underline" />);
    const underline = screen.getByRole('link', { name: 'Home' }).className;
    for (const box of ['h-9', 'px-3', 'gap-1.5', 'text-sm']) {
      expect(pill).toContain(box);
      expect(underline).toContain(box);
    }
    // ...and neither carries the other's height, which is the regression this
    // guards: twMerge would keep whichever came last.
    expect(pill).not.toContain('h-8');
    expect(pill).not.toContain('h-10');
    expect(underline).not.toContain('h-10');
  });

  // The hierarchy the variants exist to express: the primary row's active item
  // is a FILLED tint, the secondary row's is a hairline. Same brand colour,
  // ~18x the area. If the pill ever goes back to a bare colour swap the two
  // rows read as equals again.
  it('pill marks active with a filled tint; underline with a hairline', () => {
    const { unmount } = render(<NavTabs items={ITEMS.slice(0, 3)} activeHref="/components" variant="pill" />);
    const pill = screen.getByRole('link', { name: 'Components' }).className;
    expect(pill).toContain('bg-[var(--color-primary-bg)]');
    expect(pill).toContain('font-semibold');
    unmount();
    render(<NavTabs items={ITEMS.slice(0, 3)} activeHref="/components" variant="underline" />);
    const underline = screen.getByRole('link', { name: 'Components' }).className;
    expect(underline).not.toContain('bg-[var(--color-primary-bg)]');
    expect(underline).toContain('border-b-2');
    expect(underline).toContain('font-medium');
  });
});
