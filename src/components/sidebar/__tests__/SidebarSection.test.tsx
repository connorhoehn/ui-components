import { render, screen, fireEvent } from '@testing-library/react';
import { SidebarSection } from '../SidebarSection';

describe('SidebarSection', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('renders the title and children', () => {
    render(
      <SidebarSection title="Channels">
        <div>child-content</div>
      </SidebarSection>,
    );
    expect(screen.getByText('Channels')).toBeInTheDocument();
    expect(screen.getByText('child-content')).toBeInTheDocument();
  });

  it('wraps in a <section> with aria-labelledby pointing at the title button', () => {
    const { container } = render(
      <SidebarSection title="Activity">
        <div>x</div>
      </SidebarSection>,
    );
    const section = container.querySelector('section');
    expect(section).toBeTruthy();
    const labelledBy = section!.getAttribute('aria-labelledby');
    expect(labelledBy).toBeTruthy();
    const label = section!.querySelector(`#${labelledBy}`);
    expect(label?.textContent).toContain('Activity');
  });

  it('toggles collapse on header click', () => {
    render(
      <SidebarSection title="Documents">
        <div>doc-row</div>
      </SidebarSection>,
    );
    // Starts open
    expect(screen.getByText('doc-row')).toBeVisible();
    const button = screen.getByRole('button', { name: /documents/i });
    fireEvent.click(button);
    // After collapse, the body is hidden via `hidden` attr (not in tree
    // for visibility queries) — assert aria-expanded flipped.
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });

  it('persists collapse state in localStorage keyed by title', () => {
    const { unmount } = render(
      <SidebarSection title="Pipelines">
        <div>pl</div>
      </SidebarSection>,
    );
    const button = screen.getByRole('button', { name: /pipelines/i });
    fireEvent.click(button);
    expect(window.localStorage.getItem('sidebar-section:Pipelines')).toBe('true');
    unmount();
    // Re-render — should respect stored collapsed=true
    render(
      <SidebarSection title="Pipelines">
        <div>pl</div>
      </SidebarSection>,
    );
    const button2 = screen.getByRole('button', { name: /pipelines/i });
    expect(button2).toHaveAttribute('aria-expanded', 'false');
  });

  it('respects a custom storageKey when provided', () => {
    render(
      <SidebarSection title="X" storageKey="custom-key">
        <div>row</div>
      </SidebarSection>,
    );
    fireEvent.click(screen.getByRole('button', { name: /x/i }));
    expect(window.localStorage.getItem('custom-key')).toBe('true');
    expect(window.localStorage.getItem('sidebar-section:X')).toBeNull();
  });

  it('renders the actions slot in the header', () => {
    render(
      <SidebarSection title="Rooms" actions={<button>+ Add</button>}>
        <div />
      </SidebarSection>,
    );
    expect(screen.getByRole('button', { name: '+ Add' })).toBeInTheDocument();
  });

  it('does not toggle on header click when collapsible=false', () => {
    render(
      <SidebarSection title="Static" collapsible={false}>
        <div>row</div>
      </SidebarSection>,
    );
    const button = screen.getByRole('button', { name: /static/i });
    expect(button).toBeDisabled();
    expect(button).not.toHaveAttribute('aria-expanded');
  });
});
