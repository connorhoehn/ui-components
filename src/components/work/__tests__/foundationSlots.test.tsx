// The additive slots WS-A put on existing composites (2.385.0): ExplorerLayout
// header / lg rail / rail count, EditorShell path / subtitle / metaBar /
// crumbsTrailing, Breadcrumbs lastIsCurrent, CommandPaletteHint label + size.
// Each asserts the new behaviour AND that the default output is unchanged.
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ExplorerLayout } from '../../layout/ExplorerLayout';
import { EditorShell } from '../../doc-editor/EditorShell';
import { Breadcrumbs } from '../../shared/Breadcrumbs';
import { CommandPalette, CommandPaletteHint, CommandPaletteProvider } from '../../shared/CommandPalette';

afterEach(cleanup);

describe('ExplorerLayout header + lg rail', () => {
  it('puts the header above all three columns', () => {
    render(
      <ExplorerLayout header={<div>Scope</div>} rail={<p>list</p>} aside={<p>aside</p>} railWidth="lg" railTitle="Work" railCount={11} railHeading="prominent">
        <p>pane</p>
      </ExplorerLayout>,
    );
    const outer = screen.getByTestId('explorer-layout-with-header');
    const header = screen.getByTestId('explorer-layout-header');
    expect(outer.firstElementChild).toBe(header);
    expect(header.textContent).toBe('Scope');
    const rail = screen.getByTestId('explorer-layout-rail');
    expect(rail.className).toContain('w-[368px]');
    expect(screen.getByTestId('explorer-layout-rail-count').textContent).toBe('11');
    expect(screen.getByTestId('explorer-layout-rail-title').className).toContain('text-[18px]');
  });

  it('renders exactly the old frame without a header', () => {
    render(<ExplorerLayout rail={<p>list</p>} railTitle="Files"><p>pane</p></ExplorerLayout>);
    expect(screen.queryByTestId('explorer-layout-with-header')).toBeNull();
    expect(screen.getByTestId('explorer-layout-rail').className).toContain('w-[300px]');
    expect(screen.queryByTestId('explorer-layout-rail-count')).toBeNull();
    expect(screen.getByTestId('explorer-layout-rail-title').className).toContain('text-[12px]');
  });
});

describe('EditorShell work slots', () => {
  it('renders subtitle, metaBar between title and tabs, and crumbsTrailing beside the crumbs', () => {
    render(
      <EditorShell
        title="Decommission legacy StatsD bridge"
        breadcrumbs={[{ label: 'OpenTelemetry everywhere', onClick: () => {} }]}
        crumbsTrailing={<span>Story wi-obs-e1-s4</span>}
        subtitle="Service-by-service migration"
        metaBar={<div data-testid="bar">meta</div>}
        tabs={[{ id: 'brief', label: 'Brief' }, { id: 'comments', label: 'Discussion', count: 3 }]}
        activeTab="brief"
      >
        <p>body</p>
      </EditorShell>,
    );
    expect(screen.getByTestId('editor-shell-subtitle').textContent).toBe('Service-by-service migration');
    expect(screen.getByTestId('editor-shell-crumbs-trailing').textContent).toBe('Story wi-obs-e1-s4');
    const header = screen.getByTestId('editor-shell-header');
    const bar = screen.getByTestId('editor-shell-meta-bar');
    const tablist = screen.getByRole('tablist');
    expect(header.contains(bar)).toBe(true);
    // metaBar precedes the tabs in document order.
    expect(bar.compareDocumentPosition(tablist) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('puts a clickable folder path inline after the status pill', () => {
    const onFolder = vi.fn();
    render(
      <EditorShell
        title="Release plan"
        statusPill={<span>Draft</span>}
        path={[{ label: 'Sprint planning', onClick: () => {} }, { label: 'Release assets', onClick: onFolder }]}
        saveState={{ status: 'saved', detail: 'Saved 3 hours ago' }}
      >
        <p>body</p>
      </EditorShell>,
    );
    const path = screen.getByTestId('editor-shell-path');
    fireEvent.click(screen.getByRole('button', { name: 'Release assets' }));
    expect(onFolder).toHaveBeenCalled();
    expect(path.querySelector('[aria-current="page"]')).toBeNull();
    expect(screen.getByTestId('editor-shell-title').className).toContain('flex-initial');
  });

  it('keeps the old header when none of the slots are passed', () => {
    render(<EditorShell title="Plain"><p>body</p></EditorShell>);
    expect(screen.queryByTestId('editor-shell-subtitle')).toBeNull();
    expect(screen.queryByTestId('editor-shell-meta-bar')).toBeNull();
    expect(screen.queryByTestId('editor-shell-path')).toBeNull();
    expect(screen.getByTestId('editor-shell-title').className).toContain('flex-1');
  });
});

describe('Breadcrumbs lastIsCurrent', () => {
  it('defaults to a current last crumb, and makes it a link when false', () => {
    const onLast = vi.fn();
    const items = [{ label: 'A', onClick: () => {} }, { label: 'B', onClick: onLast }];
    const { rerender } = render(<Breadcrumbs items={items} />);
    expect(screen.getByText('B').getAttribute('aria-current')).toBe('page');
    rerender(<Breadcrumbs items={items} lastIsCurrent={false} />);
    fireEvent.click(screen.getByRole('button', { name: 'B' }));
    expect(onLast).toHaveBeenCalled();
  });
});

describe('CommandPaletteHint as the ⌘K Search trigger', () => {
  it('takes a label and a top-bar size and opens the palette', () => {
    render(
      <CommandPaletteProvider commands={[{ id: 'doc', label: 'Release plan', run: () => {} }]}>
        <CommandPaletteHint label="Search" size="md" />
        <CommandPalette />
      </CommandPaletteProvider>,
    );
    const hint = screen.getByTestId('command-palette-hint');
    expect(hint.textContent).toBe('⌘KSearch');
    expect(hint.className).toContain('h-9');
    expect(hint.getAttribute('aria-keyshortcuts')).toContain('Meta+K');
    fireEvent.click(hint);
    expect(screen.getByRole('dialog')).toBeTruthy();
  });
});
