// 2.390.0 — ExplorerLayout paneFooter / railBack / railCountStyle and the
// WorkspaceRail props underneath them.
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ExplorerLayout } from '../ExplorerLayout';
import { WorkspaceRail } from '../WorkspaceRail';

afterEach(cleanup);

describe('ExplorerLayout (2.390.0)', () => {
  it('paneFooter is a band under the pane, outside its scroll', () => {
    render(<ExplorerLayout rail={<div>rail</div>} paneFooter={<div>composer</div>}>body</ExplorerLayout>);
    const footer = screen.getByTestId('explorer-layout-pane-footer');
    const pane = screen.getByTestId('explorer-layout-pane');
    expect(footer.textContent).toBe('composer');
    expect(pane.contains(footer)).toBe(false);
    expect(footer.parentElement).toBe(screen.getByTestId('explorer-layout-pane-column'));
    expect(pane.nextElementSibling).toBe(footer);
  });

  it('paneFooter never spans the aside', () => {
    render(<ExplorerLayout rail={<div />} aside={<div>aside</div>} paneFooter={<div>f</div>}>body</ExplorerLayout>);
    expect(screen.getByTestId('explorer-layout-aside').contains(screen.getByTestId('explorer-layout-pane-footer'))).toBe(false);
  });

  it('works with paneHeader too (header, pane, footer in order)', () => {
    render(<ExplorerLayout rail={<div />} paneHeader={<div>h</div>} paneFooter={<div>f</div>}>body</ExplorerLayout>);
    const kids = Array.from(screen.getByTestId('explorer-layout-pane-column').children).map((c) => c.getAttribute('data-testid'));
    expect(kids).toEqual(['explorer-layout-pane-header', 'explorer-layout-pane', 'explorer-layout-pane-footer']);
  });

  it('without paneFooter or paneHeader the pane is unwrapped as before', () => {
    render(<ExplorerLayout rail={<div />}>body</ExplorerLayout>);
    expect(screen.queryByTestId('explorer-layout-pane-column')).toBeNull();
    expect(screen.queryByTestId('explorer-layout-pane-footer')).toBeNull();
  });

  it('railBack draws a back row above the title', () => {
    const onBack = vi.fn();
    render(<ExplorerLayout rail={<div />} railTitle="Work" railBack={{ label: 'Initiatives', onClick: onBack }}>body</ExplorerLayout>);
    const back = screen.getByTestId('explorer-layout-rail-back');
    expect(back.textContent).toContain('Initiatives');
    fireEvent.click(back);
    expect(onBack).toHaveBeenCalled();
    // Above the title row.
    const row = screen.getByTestId('explorer-layout-rail-back-row');
    expect(row.compareDocumentPosition(screen.getByTestId('explorer-layout-rail-title')) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('railCountStyle="plain" passes through', () => {
    render(<ExplorerLayout rail={<div />} railTitle="Initiatives" railCount={11} railCountStyle="plain">body</ExplorerLayout>);
    expect(screen.getByTestId('explorer-layout-rail-count').getAttribute('data-count-style')).toBe('plain');
  });
});

describe('WorkspaceRail (2.390.0)', () => {
  it('back with href is a link', () => {
    render(<WorkspaceRail title="Work" back={{ label: 'Initiatives', href: '/iq/projects' }}>x</WorkspaceRail>);
    const back = screen.getByTestId('workspace-rail-back');
    expect(back.tagName).toBe('A');
    expect(back.getAttribute('href')).toBe('/iq/projects');
  });

  it('back is hidden while collapsed, and absent by default', () => {
    const { rerender } = render(<WorkspaceRail title="Work" collapsed back={{ label: 'Initiatives', href: '#' }}>x</WorkspaceRail>);
    expect(screen.queryByTestId('workspace-rail-back')).toBeNull();
    rerender(<WorkspaceRail title="Work">x</WorkspaceRail>);
    expect(screen.queryByTestId('workspace-rail-back-row')).toBeNull();
  });

  it('countStyle="plain" is muted text; the default is the chip', () => {
    const { rerender } = render(<WorkspaceRail title="Work" count={11} countStyle="plain">x</WorkspaceRail>);
    expect(screen.getByTestId('workspace-rail-count').getAttribute('data-count-style')).toBe('plain');
    expect(screen.getByTestId('workspace-rail-count').textContent).toBe('11');
    rerender(<WorkspaceRail title="Work" count={11}>x</WorkspaceRail>);
    expect(screen.getByTestId('workspace-rail-count').getAttribute('data-count-style')).toBeNull();
  });
});
