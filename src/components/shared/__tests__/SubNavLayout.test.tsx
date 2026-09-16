import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  SubNavLayout,
  type SubNavItem,
  activeNavItemClassName,
  inactiveNavItemClassName,
} from '../SubNavLayout';

const FLAT: SubNavItem[] = [
  { path: 'summary', label: 'Summary' },
  { path: 'runs', label: 'Runs', count: 12 },
  { path: 'halt', label: 'Halt', onClick: vi.fn(), accent: 'danger' },
];

describe('SubNavLayout', () => {
  beforeEach(() => window.localStorage.clear());

  it('renders the rail title and the content children', () => {
    render(
      <SubNavLayout title="Ingest" items={FLAT}>
        <div>main content</div>
      </SubNavLayout>,
    );
    expect(screen.getByText('Ingest')).toBeInTheDocument();
    expect(screen.getByText('main content')).toBeInTheDocument();
  });

  it('renders link items as anchors and action items as buttons', () => {
    render(<SubNavLayout title="T" items={FLAT}>c</SubNavLayout>);
    expect(screen.getByRole('link', { name: /Summary/ })).toBeInTheDocument();
    const halt = screen.getByRole('button', { name: /Halt/ });
    fireEvent.click(halt);
    expect(FLAT[2].onClick).toHaveBeenCalled();
  });

  it('shows the count badge', () => {
    render(<SubNavLayout title="T" items={FLAT}>c</SubNavLayout>);
    expect(screen.getByText('12')).toBeInTheDocument();
  });

  it('renders collapsible group sections when items carry groups', () => {
    const grouped: SubNavItem[] = [
      { path: 'a', label: 'Alpha', group: 'Sources' },
      { path: 'b', label: 'Beta', group: 'Sources' },
    ];
    render(<SubNavLayout title="T" items={grouped}>c</SubNavLayout>);
    const header = screen.getByText('Sources');
    expect(screen.getByText('Alpha')).toBeInTheDocument();
    fireEvent.click(header);
    expect(screen.queryByText('Alpha')).toBeNull();
  });

  it('delegates link rendering to renderNavItem when provided', () => {
    render(
      <SubNavLayout
        title="T"
        items={[{ path: 'x', label: 'X' }]}
        renderNavItem={(item, children) => (
          <div data-testid={`custom-${item.path}`}>{children}</div>
        )}
      >
        c
      </SubNavLayout>,
    );
    expect(screen.getByTestId('custom-x')).toHaveTextContent('X');
    expect(screen.queryByRole('link')).toBeNull();
  });

  it('renders the secondary rail when secondaryItems are given', () => {
    render(
      <SubNavLayout
        title="T"
        items={FLAT}
        secondaryTitle="Details"
        secondaryItems={[{ path: 'd', label: 'Detail A' }]}
      >
        c
      </SubNavLayout>,
    );
    expect(screen.getByText('Details')).toBeInTheDocument();
    expect(screen.getByText('Detail A')).toBeInTheDocument();
  });
});

// REGRESSION: collapsing a group unmounts its links. With focus on one of
// them, the browser had nowhere to put focus and dropped it to <body> — the
// keyboard user's Tab position silently reset to the top of the page. Focus
// must be handed up to the group header. Same defect and same fix as
// layout/CollapsibleSidebar, sidebar/SidebarSection and shared/CollapsibleSection.
describe('SubNavLayout — focus handoff on group collapse', () => {
  const grouped: SubNavItem[] = [
    { path: 'a', label: 'Alpha', group: 'Sources' },
    { path: 'b', label: 'Beta', group: 'Sources' },
  ];

  it('moves focus to the group header instead of stranding it', () => {
    render(<SubNavLayout title="T" items={grouped}>c</SubNavLayout>);

    const link = screen.getByText('Alpha').closest('a') as HTMLElement;
    link.focus();
    expect(document.activeElement).toBe(link);

    const header = screen.getByRole('button', { name: /Sources/ });
    fireEvent.click(header);

    expect(document.activeElement).toBe(header);
    expect(document.activeElement).not.toBe(document.body);
  });

  it('leaves focus alone when it was never inside the group', () => {
    render(
      <>
        <button type="button">Outside</button>
        <SubNavLayout title="T" items={grouped}>c</SubNavLayout>
      </>,
    );

    const outside = screen.getByRole('button', { name: 'Outside' });
    outside.focus();

    fireEvent.click(screen.getByRole('button', { name: /Sources/ }));

    expect(document.activeElement).toBe(outside);
  });

  it('points aria-controls at the group body', () => {
    render(<SubNavLayout title="T" items={grouped}>c</SubNavLayout>);

    const header = screen.getByRole('button', { name: /Sources/ });
    const bodyId = header.getAttribute('aria-controls');
    expect(bodyId).toBeTruthy();
    expect(document.getElementById(bodyId as string)).not.toBeNull();
  });

  it('renders no aria-label on the primary nav by default', () => {
    render(<SubNavLayout title="T" items={FLAT}>c</SubNavLayout>);
    expect(screen.getByRole('navigation')).not.toHaveAttribute('aria-label');
  });

  it('applies railLabel as the primary nav aria-label', () => {
    render(<SubNavLayout title="T" items={FLAT} railLabel="Ingest sections">c</SubNavLayout>);
    expect(screen.getByRole('navigation', { name: 'Ingest sections' })).toBeInTheDocument();
  });

  it('renders the content pane as <main> by default and as <section> with contentLabel when contentAs is set', () => {
    const { container, rerender } = render(
      <SubNavLayout title="T" items={FLAT}>main content</SubNavLayout>,
    );
    expect(container.querySelector('main')).not.toBeNull();
    expect(container.querySelector('section')).toBeNull();

    rerender(
      <SubNavLayout title="T" items={FLAT} contentAs="section" contentLabel="Distillation">
        main content
      </SubNavLayout>,
    );
    expect(container.querySelector('main')).toBeNull();
    const section = container.querySelector('section');
    expect(section).not.toBeNull();
    expect(section).toHaveAttribute('aria-label', 'Distillation');
  });

  it('exports className-based active-state equivalents of activeNavItemStyle for router integration', () => {
    render(
      <SubNavLayout
        title="T"
        items={[{ path: 'x', label: 'X' }]}
        renderNavItem={(item, children) => (
          <a
            data-testid={`link-${item.path}`}
            href={item.path}
            className={item.path === 'x' ? activeNavItemClassName : inactiveNavItemClassName}
          >
            {children}
          </a>
        )}
      >
        c
      </SubNavLayout>,
    );
    const link = screen.getByTestId('link-x');
    expect(link.className).toBe(activeNavItemClassName);
    expect(link).not.toHaveAttribute('style');
    expect(activeNavItemClassName).not.toBe(inactiveNavItemClassName);
    expect(inactiveNavItemClassName).toContain('border-transparent');
    expect(activeNavItemClassName).toContain('border-primary');
  });
});
