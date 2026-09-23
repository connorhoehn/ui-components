// The Folders mockup's chrome (2.386.0): the icon strip marks the section you
// are in, a workbench whose parts all live elsewhere puts nothing on the
// folded column, the tree's `md` rows wear the brand tint when selected, and
// the tree marks draw a deck and a diagram in colour.
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CollapsedIconStrip } from '../CollapsedIconStrip';
import { ContextColumn } from '../ContextColumn';
import { AppShell } from '../AppShell';
import { TreeView } from '../../shared/TreeView';
import { FileKindMark } from '../../shared/FileKindMark';

describe('CollapsedIconStrip', () => {
  it('marks the active section and renders only wired sections', () => {
    const onDocuments = vi.fn();
    render(<CollapsedIconStrip connectionState="connected" onExpand={() => {}} onDocuments={onDocuments} onPipelines={() => {}} active="documents" headerHeight={53} />);
    const docs = screen.getByTestId('collapsed-icon-strip-documents');
    expect(docs.getAttribute('aria-current')).toBe('page');
    expect(screen.getByTestId('collapsed-icon-strip-documents-bar')).toBeTruthy();
    expect(screen.getByTestId('collapsed-icon-strip-pipelines').getAttribute('aria-current')).toBeNull();
    expect(screen.queryByTestId('collapsed-icon-strip-observability')).toBeNull();
    fireEvent.click(docs);
    expect(onDocuments).toHaveBeenCalledTimes(1);
  });
});

describe('ContextColumn entries: []', () => {
  it('puts nothing on the strip for that panel', () => {
    render(
      <ContextColumn
        state="collapsed"
        onStateChange={() => {}}
        onActivate={() => {}}
        activeId="workbench"
        label="Side"
        panels={[
          { id: 'workbench', label: 'Workbench', icon: <span>w</span>, entries: [], content: null },
          { id: 'chat', label: 'Conversation', icon: <span>c</span>, content: null },
        ]}
      />,
    );
    expect(screen.queryByLabelText('Workbench')).toBeNull();
    expect(screen.getByLabelText('Conversation')).toBeTruthy();
  });
});

describe('AppShell sidebarFullHeight', () => {
  it('starts the sidebar at the top and the header beside it', () => {
    render(<AppShell header={<span>h</span>} sidebar={<span>s</span>} sidebarWidth={52} sidebarFullHeight toastRegion={null}>x</AppShell>);
    const nav = screen.getByTestId('app-sidebar');
    expect(nav.style.top).toBe('0px');
    expect(nav.getAttribute('data-full-height')).toBe('true');
    expect((screen.getByTestId('app-shell-header').parentElement as HTMLElement).style.marginLeft).toBe('52px');
  });
});

describe('TreeView size="md"', () => {
  it('draws the selected row in the brand tint and 15px type', () => {
    render(
      <TreeView
        size="md"
        nodes={[{ id: 'a', title: 'Release plan', parentId: null, meta: '3h' }, { id: 'b', title: 'Sprint notes', parentId: null }]}
        selectedId="a"
        onSelect={() => {}}
      />,
    );
    const row = screen.getByTestId('tree-view-row-a');
    expect(row.className).toContain('bg-primary-bg');
    expect(row.className).toContain('text-primary-fg');
    expect(row.className).toContain('text-[15px]');
    expect(screen.getByTestId('tree-view-row-b').className).not.toContain('bg-primary-bg');
  });
});

describe('FileKindMark variant="glyph"', () => {
  it('draws a deck as coloured bars and a diagram as linked nodes, with no box tint', () => {
    const { container } = render(<><FileKindMark kind="presentation" size="sm" variant="glyph" data-testid="deck" /><FileKindMark kind="diagram" size="sm" variant="glyph" data-testid="diagram" /><FileKindMark kind="page" size="sm" variant="glyph" data-testid="page" /></>);
    expect(screen.getByTestId('deck').querySelector('[data-glyph="deck-bars"]')).toBeTruthy();
    expect(screen.getByTestId('diagram').querySelector('[data-glyph="diagram-nodes"]')).toBeTruthy();
    expect(screen.getByTestId('page').className).toContain('bg-transparent');
    expect(container.querySelector('[data-testid="page"] svg')?.getAttribute('width')).toBe('18');
  });
});
