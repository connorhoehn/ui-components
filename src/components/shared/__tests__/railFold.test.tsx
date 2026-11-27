import { act, cleanup, render, renderHook, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { useLayoutEffect, type ReactNode } from 'react';
import { RailBandProvider, ShellFocusModeProvider, railBand, railDepth, readRailFold, useRailFold, useShellFocusMode, type RailDepthSpec } from '../railFold';
import { SubNavLayout } from '../SubNavLayout';
import { WorkspaceRail } from '../../layout/WorkspaceRail';

afterEach(cleanup);
beforeEach(() => window.localStorage.clear());

const SPEC: RailDepthSpec = {
  prefixes: ['iq', 'assessment', 'social', 'pipelines', 'admin'],
  drillParams: ['item', 'dimension', 'step', 'sample', 'run', 'candidate'],
  leafRoutes: [/^\/(iq|pipelines)\/runs\/[^/]+$/, /^\/iq\/documents\/[^/]+$/],
};
const at = (url: string, explored = false) => {
  const [pathname, search = ''] = url.split('?');
  return railDepth({ pathname: pathname!, search }, { ...SPEC, explored });
};

describe('railDepth', () => {
  it('counts path levels under the prefix, a drill param, and leaf records', () => {
    expect(at('/iq/projects')).toBe(1);
    expect(at('/iq/projects/p-x')).toBe(2);
    expect(at('/iq/projects/p-x?item=wi')).toBe(3);
    expect(at('/iq/projects/p-x?item=')).toBe(2);
    expect(at('/iq/distillation/review?sample=rev-027')).toBe(3);
    expect(at('/pipelines/runs/r-1')).toBe(3);
    expect(at('/iq/documents/page:A1')).toBe(3);
    expect(at('/')).toBe(1);
  });
  it('a pane exploring a selection is two levels, unless a drill param already counts the record', () => {
    expect(at('/iq/search?selection=person:p', false)).toBe(1);
    expect(at('/iq/search?selection=person:p', true)).toBe(3);
    expect(at('/iq/projects/p-x?item=wi', true)).toBe(3);
  });
  it('bands: 1–2 shallow, 3+ deep', () => {
    expect(railBand(1)).toBe('shallow');
    expect(railBand(2)).toBe('shallow');
    expect(railBand(3)).toBe('deep');
  });
  it('reads only its own storage values', () => {
    expect(readRailFold('collapsed')).toBe(true);
    expect(readRailFold('open')).toBe(false);
    expect(readRailFold('1')).toBeNull();
    expect(readRailFold(null)).toBeNull();
  });
});

describe('useRailFold', () => {
  const wrap = (band: 'shallow' | 'deep') => ({ children }: { children: ReactNode }) => <RailBandProvider band={band}>{children}</RailBandProvider>;
  it('defaults per band, remembers a toggle in its band only', () => {
    const deep = renderHook(() => useRailFold({ storageKey: 'shell.primary-rail', defaultFolded: true }), { wrapper: wrap('deep') });
    expect(deep.result.current.folded).toBe(true);
    expect(deep.result.current.remembered).toBe(false);
    act(() => deep.result.current.toggle());
    expect(deep.result.current.folded).toBe(false);
    expect(window.localStorage.getItem('shell.primary-rail.deep')).toBe('open');
    const shallow = renderHook(() => useRailFold({ storageKey: 'shell.primary-rail' }), { wrapper: wrap('shallow') });
    expect(shallow.result.current.folded).toBe(false);
    expect(window.localStorage.getItem('shell.primary-rail.shallow')).toBeNull();
  });
  it('a legacy, band-less value never folds a rail', () => {
    window.localStorage.setItem('initiatives.rail-collapsed', '1');
    window.localStorage.setItem('initiatives.rail-collapsed.deep', '1');
    const { result } = renderHook(() => useRailFold({ storageKey: 'initiatives.rail-collapsed' }), { wrapper: wrap('deep') });
    expect(result.current.folded).toBe(false);
  });
});

describe('SubNavLayout collapsed', () => {
  const items = [{ path: '/a', label: 'Alpha' }, { path: '/b', label: 'Beta' }];
  it('folds the rail to a strip holding only its title action', () => {
    const { container } = render(<SubNavLayout title="Org" items={items} collapsed titleAction={<button type="button">Expand</button>}><p>content</p></SubNavLayout>);
    const aside = container.querySelector('aside')!;
    expect(aside.getAttribute('data-collapsed')).toBe('true');
    expect(aside.className).toContain('w-11');
    expect(aside.getAttribute('style')).toBeNull();
    expect(screen.queryByText('Alpha')).toBeNull();
    expect(screen.queryByText('Org')).toBeNull();
    expect(screen.getByRole('button', { name: 'Expand' })).toBeTruthy();
    expect(screen.getByText('content')).toBeTruthy();
  });
  it('open, it is the full rail', () => {
    const { container } = render(<SubNavLayout title="Org" items={items} railWidth={200}><p>c</p></SubNavLayout>);
    expect(container.querySelector('aside')!.getAttribute('style')).toContain('width: 200px');
    expect(screen.getByText('Alpha')).toBeTruthy();
  });
  it('folded beside a compact section rail, the strip header takes that rail’s 36px row', () => {
    const { container, rerender } = render(
      <SubNavLayout title="Org" items={items} collapsed titleAction={<button type="button">Expand</button>}>
        <WorkspaceRail title="Chat">rows</WorkspaceRail>
      </SubNavLayout>,
    );
    const header = () => container.querySelector('aside > div')!;
    expect(header().className).toContain('h-9');
    rerender(
      <SubNavLayout title="Org" items={items} collapsed titleAction={<button type="button">Expand</button>}>
        <WorkspaceRail title="Initiatives" heading="caption">rows</WorkspaceRail>
      </SubNavLayout>,
    );
    expect(header().className).not.toContain('h-9');
  });
});

describe('focus mode (2.548.0)', () => {
  // The owner's shell: a primary rail and a section rail, each folding through useRailFold.
  function Shell({ children }: { children?: ReactNode }) {
    const primary = useRailFold({ storageKey: 'shell.primary-rail' });
    const section = useRailFold({ storageKey: 'docs.section-rail' });
    return (
      <div>
        <WorkspaceRail title="Primary" collapsed={primary.folded} onToggle={primary.toggle} data-testid="primary"><span /></WorkspaceRail>
        <WorkspaceRail title="Section" collapsed={section.folded} onToggle={section.toggle} data-testid="section"><span /></WorkspaceRail>
        {children}
      </div>
    );
  }
  function Page({ on }: { on: boolean }) {
    const focus = useShellFocusMode();
    // What a host does with a component's onFocusModeChange(on).
    const { request } = focus;
    useLayoutEffect(() => { request(on); }, [on, request]);
    return <span data-testid="focus" data-active={String(focus.active)} />;
  }
  const collapsed = (id: string) => screen.getByTestId(id).getAttribute('data-collapsed');

  it('collapses both rails and restores exactly what they were (one open, one already collapsed), storage untouched', () => {
    window.localStorage.setItem('docs.section-rail.shallow', 'collapsed');
    const tree = (on: boolean, mounted = true) => (
      <ShellFocusModeProvider><Shell>{mounted && <Page on={on} />}</Shell></ShellFocusModeProvider>
    );
    const { rerender } = render(tree(false));
    expect([collapsed('primary'), collapsed('section')]).toEqual(['false', 'true']);
    rerender(tree(true));
    expect(screen.getByTestId('focus')).toHaveAttribute('data-active', 'true');
    expect([collapsed('primary'), collapsed('section')]).toEqual(['true', 'true']);
    rerender(tree(false));
    expect([collapsed('primary'), collapsed('section')]).toEqual(['false', 'true']);
    expect(window.localStorage.getItem('shell.primary-rail.shallow')).toBeNull();
    expect(window.localStorage.getItem('docs.section-rail.shallow')).toBe('collapsed');
    // A page that unmounts while focused gives its request back.
    rerender(tree(true));
    expect(collapsed('primary')).toBe('true');
    rerender(tree(true, false));
    expect([collapsed('primary'), collapsed('section')]).toEqual(['false', 'true']);
  });

  it('a rail opened by hand during focus mode stays open until it ends, and is not remembered', () => {
    const tree = (on: boolean) => <ShellFocusModeProvider><Shell><Page on={on} /></Shell></ShellFocusModeProvider>;
    const { rerender } = render(tree(true));
    act(() => { screen.getByRole('button', { name: 'Show Primary' }).click(); });
    expect(collapsed('primary')).toBe('false');
    expect(collapsed('section')).toBe('true');
    expect(window.localStorage.getItem('shell.primary-rail.shallow')).toBeNull();
    rerender(tree(false));
    rerender(tree(true));
    expect(collapsed('primary')).toBe('true');
  });

  it('without a provider nothing changes and request is a no-op', () => {
    const { result } = renderHook(() => ({ fold: useRailFold({ storageKey: 'x' }), focus: useShellFocusMode() }));
    act(() => result.current.focus.request(true));
    expect(result.current.focus.active).toBe(false);
    expect(result.current.fold.folded).toBe(false);
  });
});
