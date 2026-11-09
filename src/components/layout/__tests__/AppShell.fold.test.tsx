import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useState } from 'react';
import { AppShell } from '../AppShell';
import { NavRail } from '../../shared/NavRail';

const items = [
  { to: '/overview', label: 'Overview', group: 'WORKSPACE', icon: <span>O</span> },
  { to: '/episodes', label: 'Episodes', group: 'PRODUCTION', icon: <span>E</span>, badge: 3 },
  { to: '/work', label: 'Work', group: 'PRODUCTION' },
];

function Shell({ initial = false }: { initial?: boolean }) {
  const [folded, setFolded] = useState(initial);
  return (
    <AppShell header={<span>Studio</span>} toastRegion={null} sidebarWidth={224}
      sidebarFold={{ folded, toggle: () => setFolded((f) => !f) }}
      sidebar={<NavRail title="Studio" items={items} activeHref="/episodes" />}>
      <p>page</p>
    </AppShell>
  );
}

describe('AppShell sidebarFold', () => {
  it('puts the sidebar in flow: no fixed positioning, sidebarWidth wide, main not offset', () => {
    render(<Shell />);
    const nav = screen.getByTestId('app-sidebar');
    expect(nav).toHaveAttribute('data-sidebar-flow', 'in-flow');
    expect(nav).toHaveAttribute('data-rail-folded', 'false');
    expect(nav.className).not.toMatch(/\bfixed\b/);
    expect(nav.style.width).toBe('224px');
    expect(screen.getByRole('main').style.marginLeft).toBe('');
  });

  it('folds to the 44px strip from the NavRail toggle, labels moved to accessible names', () => {
    render(<Shell />);
    fireEvent.click(screen.getByTestId('nav-rail-fold'));
    const nav = screen.getByTestId('app-sidebar');
    expect(nav).toHaveAttribute('data-rail-folded', 'true');
    expect(nav.className).toMatch(/\bw-11\b/);
    expect(nav.style.width).toBe('');
    const rail = screen.getByRole('navigation', { name: 'Studio' });
    expect(rail).toHaveAttribute('data-rail-folded', 'true');
    // Group labels are not drawn as text; each item is named by its label.
    expect(screen.queryByText('PRODUCTION')).toBeNull();
    expect(screen.getByRole('link', { name: 'Episodes' })).toHaveAttribute('aria-current', 'page');
    // An item without an icon shows its first letter.
    expect(screen.getByRole('link', { name: 'Work' })).toHaveTextContent('W');
    fireEvent.click(screen.getByTestId('nav-rail-fold'));
    expect(nav).toHaveAttribute('data-rail-folded', 'false');
    expect(screen.getByText('PRODUCTION')).toBeInTheDocument();
  });

  it('without sidebarFold the sidebar stays fixed (unchanged)', () => {
    render(<AppShell header={<span>x</span>} toastRegion={null} sidebar={<NavRail items={items} />}><p>p</p></AppShell>);
    const nav = screen.getByTestId('app-sidebar');
    expect(nav.className).toMatch(/\bfixed\b/);
    expect(nav).not.toHaveAttribute('data-rail-folded');
    expect(screen.queryByTestId('nav-rail-fold')).toBeNull();
  });
});

describe('NavRail collapsed', () => {
  it('a standalone collapsed rail is a strip with a toggle when onToggleCollapsed is given', () => {
    const onToggle = vi.fn();
    render(<NavRail title="Rail" items={items} collapsed onToggleCollapsed={onToggle} />);
    const rail = screen.getByRole('navigation', { name: 'Rail' });
    expect(rail.className).toMatch(/\bw-11\b/);
    expect(rail.querySelectorAll('[data-nav-rail-strip-item]')).toHaveLength(3);
    fireEvent.click(screen.getByRole('button', { name: 'Show Rail' }));
    expect(onToggle).toHaveBeenCalledTimes(1);
  });
});
