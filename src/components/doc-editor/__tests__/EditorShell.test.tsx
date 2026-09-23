import { useState } from 'react';
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { EditorShell, DEFAULT_EDITOR_SHELL_TABS } from '../EditorShell';
import { FloatingComposerDock, DOCK_HEIGHT_VAR } from '../FloatingComposerDock';

afterEach(cleanup);

describe('EditorShell', () => {
  it('draws crumbs, title, byline and head actions around the surface', () => {
    render(
      <EditorShell
        breadcrumbs={[{ label: 'Sprint planning', href: '#' }, { label: 'Sprint review' }]}
        title="Sprint review"
        kind="presentation"
        statusPill={<span>Draft</span>}
        participants={[{ id: 'a', name: 'Alex Kim' }, { id: 'm', name: 'Maria Torres' }]}
        meta="Owned by Connor Hoehn"
        saveState={{ status: 'saved' }}
        headActions={<button type="button">Share</button>}
      >
        <p>slide canvas</p>
      </EditorShell>,
    );
    const pane = screen.getByRole('region', { name: 'Editor' });
    expect(within(pane).getByRole('heading', { level: 1, name: 'Sprint review' })).toBeInTheDocument();
    expect(within(pane).getByText('Sprint planning')).toBeInTheDocument();
    expect(within(pane).getByText('Draft')).toBeInTheDocument();
    expect(within(pane).getByText('Owned by Connor Hoehn')).toBeInTheDocument();
    expect(within(pane).getByTestId('document-save-status')).toHaveTextContent('Saved');
    expect(within(pane).getByRole('button', { name: 'Share' })).toBeInTheDocument();
    expect(within(pane).getByText('slide canvas')).toBeInTheDocument();
    expect(screen.getByTestId('editor-shell-kind')).toHaveAttribute('data-kind', 'presentation');
  });

  it('makes the title editable in place only when onTitleChange is passed', () => {
    const onTitleChange = vi.fn();
    const { rerender } = render(<EditorShell title="Release plan"><p /></EditorShell>);
    expect(screen.queryByRole('button', { name: /File name/ })).toBeNull();
    rerender(<EditorShell title="Release plan" onTitleChange={onTitleChange} titleLabel="Page title"><p /></EditorShell>);
    fireEvent.click(screen.getByRole('button', { name: /Page title/ }));
    const input = screen.getByRole('textbox', { name: /Page title/ });
    fireEvent.change(input, { target: { value: 'Release plan v2' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onTitleChange).toHaveBeenCalledWith('Release plan v2');
  });

  it('toggles the star with aria-pressed', () => {
    const onStarredChange = vi.fn();
    render(<EditorShell title="x" starred={false} onStarredChange={onStarredChange}><p /></EditorShell>);
    const star = screen.getByRole('button', { name: 'Star this file' });
    expect(star).toHaveAttribute('aria-pressed', 'false');
    fireEvent.click(star);
    expect(onStarredChange).toHaveBeenCalledWith(true);
  });

  it('renders the four handoff tabs and wires the surface as the active tabpanel', () => {
    function Host() {
      const [tab, setTab] = useState('editor');
      return (
        <EditorShell title="Release plan" tabs={DEFAULT_EDITOR_SHELL_TABS.map((t) => (t.id === 'comments' ? { ...t, count: 3 } : t))} activeTab={tab} onTabChange={setTab}>
          <p>{tab} content</p>
        </EditorShell>
      );
    }
    render(<Host />);
    expect(screen.getAllByRole('tab').map((t) => t.textContent)).toEqual(['Editor', 'Comments3', 'Versions', 'History']);
    let panel = screen.getByRole('tabpanel');
    expect(panel).toHaveTextContent('editor content');
    expect(panel.getAttribute('aria-labelledby')).toBe(screen.getByRole('tab', { name: 'Editor' }).id);
    fireEvent.click(screen.getByRole('tab', { name: 'Versions' }));
    panel = screen.getByRole('tabpanel');
    expect(panel).toHaveTextContent('versions content');
    expect(panel.getAttribute('aria-labelledby')).toBe(screen.getByRole('tab', { name: 'Versions' }).id);
  });

  it('has no tab row and no tabpanel role when no tabs are given', () => {
    render(<EditorShell title="x"><p>body</p></EditorShell>);
    expect(screen.queryByRole('tablist')).toBeNull();
    expect(screen.queryByRole('tabpanel')).toBeNull();
  });

  it('paints the workspace grey by default and plain on request', () => {
    const { rerender } = render(<EditorShell title="x"><p /></EditorShell>);
    expect(screen.getByTestId('editor-shell-surface').className).toContain('bg-workspace');
    rerender(<EditorShell title="x" surface="plain"><p /></EditorShell>);
    expect(screen.getByTestId('editor-shell-surface').className).not.toContain('bg-workspace');
  });

  it('pins a docked composer as the last row of the editor column, after the only scroller', () => {
    render(<EditorShell title="x" footer={<FloatingComposerDock composer={<textarea aria-label="Message" />} />}><p /></EditorShell>);
    const surface = screen.getByTestId('editor-shell-surface');
    const scroller = screen.getByTestId('editor-shell-scroller');
    const slot = screen.getByTestId('editor-shell-dock');
    // Last child of the surface, after the scroller: nothing renders below it.
    expect(surface.lastElementChild).toBe(slot);
    expect(scroller.nextElementSibling).toBe(slot);
    expect(slot.className).toContain('shrink-0');
    // The content's scroll box ends at the dock: no padding trick, no overlay.
    expect(scroller.className).toContain('overflow-auto');
    expect(scroller.className).not.toContain('--dock-height');
    const dock = screen.getByTestId('floating-composer-dock');
    expect(dock.dataset.placement).toBe('pinned');
    expect(dock.className).not.toContain('absolute');
    expect(surface.style.getPropertyValue(DOCK_HEIGHT_VAR)).toBe('');
  });

  it('wraps a crowded title row instead of collapsing the title', () => {
    render(<EditorShell title="Release plan" onTitleChange={() => {}} statusPill={<span>draft · Owned by someone with a long name</span>}><p /></EditorShell>);
    const row = screen.getByTestId('editor-shell-title').parentElement!;
    expect(row.className).toContain('flex-wrap');
  });

  it('frames explorer | editor | workbench when both outer slots are given', () => {
    render(
      <EditorShell title="x" explorer={<nav aria-label="Explorer" />} workbench={<aside aria-label="Workbench" />}>
        <p />
      </EditorShell>,
    );
    const frame = screen.getByTestId('editor-shell-frame');
    const order = [
      within(frame).getByRole('navigation', { name: 'Explorer' }),
      within(frame).getByRole('region', { name: 'Editor' }),
      within(frame).getByRole('complementary', { name: 'Workbench' }),
    ];
    for (let i = 1; i < order.length; i++) {
      expect(order[i - 1]!.compareDocumentPosition(order[i]!) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    }
  });
});

describe('FloatingComposerDock', () => {
  it('is a labelled region with the strip above the composer', () => {
    render(
      <div className="relative">
        <FloatingComposerDock strip={<div>strip</div>} composer={<textarea aria-label="Message" />} />
      </div>,
    );
    const dock = screen.getByRole('region', { name: 'Composer' });
    const strip = within(dock).getByTestId('floating-composer-dock-strip');
    const composer = within(dock).getByTestId('floating-composer-dock-composer');
    expect(strip.compareDocumentPosition(composer) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    // Squares off the composer's top so the strip and composer read as one box.
    expect(composer.className).toContain('rounded-t-none');
  });

  it('lets clicks through its fade but not through the dock', () => {
    render(<div><FloatingComposerDock composer={<textarea aria-label="Message" />} /></div>);
    const dock = screen.getByTestId('floating-composer-dock');
    expect(dock.className).toContain('pointer-events-none');
    expect((dock.firstElementChild as HTMLElement).className).toContain('pointer-events-auto');
  });

  it('writes --dock-height on its parent and removes it on unmount', () => {
    const { container, unmount } = render(<div data-testid="host"><FloatingComposerDock composer={<textarea aria-label="Message" />} /></div>);
    const host = container.querySelector('[data-testid="host"]') as HTMLElement;
    // jsdom has no layout, so the height is 0px — what matters is that it is set.
    expect(host.style.getPropertyValue(DOCK_HEIGHT_VAR)).toBe('0px');
    unmount();
    expect(host.style.getPropertyValue(DOCK_HEIGHT_VAR)).toBe('');
  });

  it('caps its width by token', () => {
    render(<div><FloatingComposerDock maxWidth="xl" composer={<textarea aria-label="Message" />} /></div>);
    expect((screen.getByTestId('floating-composer-dock').firstElementChild as HTMLElement).className).toContain('max-w-xl');
  });
});
