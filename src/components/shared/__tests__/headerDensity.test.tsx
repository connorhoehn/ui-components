import { act, fireEvent, render, renderHook, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { PageHeader } from '../PageHeader';
import { ScopeHeader } from '../../work/ScopeHeader';
import { DensityProvider, useDensity } from '../Density';
import { HoverCard, HOVER_CARD_CLOSE_MS, HOVER_CARD_OPEN_MS } from '../HoverCard';
import {
  HeaderTrailFold, foldTitleIntoTrail, headerDefaults, headerDensityStorageKey, isRichHeaderContent,
} from '../headerDensity';
import { HEADER_SCROLL_COLLAPSE_PX, useHeaderDensity } from '../useHeaderDensity';
import * as shared from '../index';

const PEOPLE = [
  { label: 'Owner', people: [{ id: 'p1', name: 'Nora DaSilva' }] },
  { label: 'SMEs', people: [{ id: 'p2', name: 'Layla Hassan' }, { id: 'p3', name: 'Eli Garcia' }] },
];
const CRUMBS = [{ label: 'Plan', href: '/plan' }, { label: 'Initiatives', href: '/i' }];
const TABS = [{ id: 'overview', label: 'Overview' }, { id: 'work', label: 'Work', count: 11 }, { id: 'activity', label: 'Activity' }];

describe('Density', () => {
  it('one vocabulary: prop over provider over comfortable', () => {
    expect(renderHook(() => useDensity()).result.current).toBe('comfortable');
    const wrapper = ({ children }: { children: React.ReactNode }) => <DensityProvider value="compact">{children}</DensityProvider>;
    expect(renderHook(() => useDensity(), { wrapper }).result.current).toBe('compact');
    expect(renderHook(() => useDensity('comfortable'), { wrapper }).result.current).toBe('comfortable');
  });

  it('a PageHeader under a compact provider draws compact', () => {
    render(<DensityProvider value="compact"><PageHeader title="T" /></DensityProvider>);
    expect(screen.getByTestId('page-header')).toHaveAttribute('data-density', 'compact');
  });
});

describe('header rules', () => {
  it('rich content asks for compact, plain for comfortable; collapsed is a separate state', () => {
    for (const kind of ['canvas', 'graph', 'conversation', 'document'] as const) {
      expect(isRichHeaderContent(kind)).toBe(true);
      expect(headerDefaults({ contentKind: kind })).toEqual({ density: 'compact', collapsed: false });
    }
    for (const kind of ['list', 'detail'] as const) {
      expect(isRichHeaderContent(kind)).toBe(false);
      expect(headerDefaults({ contentKind: kind })).toEqual({ density: 'comfortable', collapsed: false });
    }
  });

  it('a short container tightens; an unmeasured one is ignored; a preference wins on density', () => {
    expect(headerDefaults({ contentKind: 'detail', containerHeight: 500 }).density).toBe('compact');
    expect(headerDefaults({ contentKind: 'graph', containerHeight: 400 })).toEqual({ density: 'compact', collapsed: true });
    expect(headerDefaults({ contentKind: 'graph', containerHeight: 0 }).collapsed).toBe(false);
    expect(headerDefaults({ contentKind: 'graph', preference: 'comfortable' }).density).toBe('comfortable');
  });

  it('folds the title into the trail once', () => {
    expect(foldTitleIntoTrail(CRUMBS, 'Observability').map((c) => c.label)).toEqual(['Plan', 'Initiatives', 'Observability']);
    expect(foldTitleIntoTrail([...CRUMBS, { label: 'Observability' }], 'Observability')).toHaveLength(3);
    expect(foldTitleIntoTrail(undefined, 'X')).toEqual([{ label: 'X' }]);
  });

  it('keys the remembered chevron by header id and rich/plain', () => {
    expect(headerDensityStorageKey('initiative', 'graph')).toBe('uic:header-density:initiative:rich');
    expect(headerDensityStorageKey('initiative', 'detail')).toBe('uic:header-density:initiative:plain');
  });
});

describe('PageHeader', () => {
  it('comfortable: trail, 20px title, description, people row, tabs', () => {
    render(<PageHeader breadcrumbs={CRUMBS} title="Observability" description="Collect telemetry" people={PEOPLE} tabs={TABS} activeTab="work" />);
    expect(screen.getByTestId('page-header-crumbs')).toHaveTextContent('Initiatives');
    expect(screen.getByRole('heading', { level: 1, name: 'Observability' }).className).toContain('text-xl');
    expect(screen.getByText('Collect telemetry')).toBeInTheDocument();
    expect(screen.getByText('Nora DaSilva')).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Work/ })).toHaveAttribute('aria-selected', 'true');
  });

  it('compact: one 28px row, 14/600 title, avatars with names in tooltips, description in a hover card', () => {
    vi.useFakeTimers();
    try {
      render(<PageHeader density="compact" title="Observability" description="Collect telemetry" people={PEOPLE} tabs={TABS}
        badge={<span data-testid="status">In progress</span>} actions={<button>Start call</button>} />);
      expect(screen.getByTestId('page-header')).toHaveAttribute('data-density', 'compact');
      expect(screen.getByTestId('page-header-row').className).toContain('h-7');
      const h1 = screen.getByRole('heading', { level: 1, name: 'Observability' });
      expect(h1.className).toContain('text-sm');
      expect(h1.className).toContain('font-semibold');
      expect(screen.queryByText('Collect telemetry')).toBeNull();
      expect(screen.getByRole('img', { name: 'Nora DaSilva, Owner' })).toBeInTheDocument();
      expect(screen.queryByText('Nora DaSilva')).toBeNull();
      expect(screen.getByRole('tab', { name: 'Activity' })).toBeInTheDocument();
      // Keyboard reaches the description: focus the info glyph.
      const info = screen.getByRole('button', { name: 'About Observability' });
      act(() => info.focus());
      expect(screen.getByTestId('page-header-description-card')).toHaveTextContent('Collect telemetry');
      expect(document.activeElement).toBe(info);
    } finally {
      vi.useRealTimers();
    }
  });

  it('compact with a host info trigger draws no description card of its own', () => {
    render(<PageHeader density="compact" title="T" description="D" info={<button>Details</button>} />);
    expect(screen.getByRole('button', { name: 'Details' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'About T' })).toBeNull();
  });

  it('collapsed: the trail row with the title folded in, actions and tabs kept, an expand chevron', () => {
    const onToggle = vi.fn();
    render(<PageHeader density="compact" collapsed onToggleCollapsed={onToggle} breadcrumbs={CRUMBS} title="Observability"
      actions={<button>Start call</button>} tabs={TABS} />);
    expect(screen.queryByRole('heading', { level: 1 })).toBeNull();
    expect(screen.getByTestId('page-header-fold-crumbs')).toHaveTextContent('Observability');
    expect(screen.getByRole('button', { name: 'Start call' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Overview' })).toBeInTheDocument();
    const chevron = screen.getByRole('button', { name: 'Expand header' });
    expect(chevron).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(chevron);
    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  it('the chevron collapses from the title row in either density', () => {
    const onToggle = vi.fn();
    const { rerender } = render(<PageHeader title="T" onToggleCollapsed={onToggle} />);
    fireEvent.click(screen.getByRole('button', { name: 'Collapse header' }));
    rerender(<PageHeader density="compact" title="T" onToggleCollapsed={onToggle} />);
    expect(screen.getByRole('button', { name: 'Collapse header' })).toHaveAttribute('aria-expanded', 'true');
    fireEvent.click(screen.getByRole('button', { name: 'Collapse header' }));
    expect(onToggle).toHaveBeenCalledTimes(2);
  });

  it('HeaderTrailFold folds the title and expands from the trail', () => {
    const onExpand = vi.fn();
    render(<HeaderTrailFold breadcrumbs={CRUMBS} title="Observability" onExpand={onExpand} />);
    expect(screen.getByTestId('header-trail-fold-crumbs')).toHaveTextContent('Observability');
    fireEvent.click(screen.getByRole('button', { name: 'Expand header' }));
    expect(onExpand).toHaveBeenCalled();
  });
});

describe('ScopeHeader (the same contract)', () => {
  it('default variant: compact is one row; collapsed is the folded trail with tabs kept', () => {
    const tabs = [{ id: 'a', label: 'Overview' }, { id: 'b', label: 'Activity' }];
    const { rerender } = render(<ScopeHeader title="Observability" breadcrumbs={CRUMBS} description="Collect telemetry" people={PEOPLE} tabs={tabs} density="compact" />);
    expect(screen.getByTestId('scope-header')).toHaveAttribute('data-density', 'compact');
    expect(screen.getByTestId('scope-header-title').className).toContain('text-sm');
    expect(screen.queryByTestId('scope-header-description')).toBeNull();
    expect(screen.getByRole('button', { name: 'About Observability' })).toBeInTheDocument();
    rerender(<ScopeHeader title="Observability" breadcrumbs={CRUMBS} tabs={tabs} collapsed onToggleCollapsed={() => {}} />);
    expect(screen.queryByTestId('scope-header-title')).toBeNull();
    expect(screen.getByTestId('scope-header-crumbs')).toHaveTextContent('Observability');
    expect(screen.getByRole('button', { name: 'Expand header' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Activity' })).toBeInTheDocument();
  });

  it('crumbs variant folds the title only when collapsed', () => {
    const { rerender } = render(<ScopeHeader variant="crumbs" title="Communication" breadcrumbs={CRUMBS} />);
    expect(screen.getByTestId('scope-header-crumbs')).not.toHaveTextContent('Communication');
    rerender(<ScopeHeader variant="crumbs" title="Communication" breadcrumbs={CRUMBS} collapsed onToggleCollapsed={() => {}} />);
    expect(screen.getByTestId('scope-header-crumbs')).toHaveTextContent('Communication');
    expect(screen.getByRole('button', { name: 'Expand header' })).toBeInTheDocument();
  });

  it('inline variant: compact title at 14/600 on a 40px row', () => {
    render(<ScopeHeader variant="inline" title="People" breadcrumbs={CRUMBS} density="compact" />);
    expect(screen.getByTestId('scope-header')).toHaveAttribute('data-density', 'compact');
    expect(screen.getByTestId('scope-header').className).toContain('h-10');
    expect(screen.getByTestId('scope-header-title').className).toContain('text-sm');
  });
});

describe('HoverCard', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  function card(props: Partial<React.ComponentProps<typeof HoverCard>> = {}) {
    return render(
      <>
        <HoverCard label="Card" content={<span>Inside</span>} {...props}>
          {(trigger) => <button {...trigger}>Trigger</button>}
        </HoverCard>
        <button>Next</button>
      </>,
    );
  }

  it('opens on hover after the one timing and closes after leaving', () => {
    card();
    const trigger = screen.getByRole('button', { name: 'Trigger' });
    fireEvent.mouseEnter(trigger);
    act(() => { vi.advanceTimersByTime(HOVER_CARD_OPEN_MS - 1); });
    expect(screen.queryByText('Inside')).toBeNull();
    act(() => { vi.advanceTimersByTime(1); });
    expect(screen.getByRole('dialog', { name: 'Card' })).toHaveTextContent('Inside');
    fireEvent.mouseLeave(trigger);
    act(() => { vi.advanceTimersByTime(HOVER_CARD_CLOSE_MS); });
    expect(screen.queryByText('Inside')).toBeNull();
  });

  it('never takes focus; Escape closes leaving focus on the trigger; Enter pins', () => {
    card();
    const trigger = screen.getByRole('button', { name: 'Trigger' });
    act(() => trigger.focus());
    expect(screen.getByText('Inside')).toBeInTheDocument();
    expect(document.activeElement).toBe(trigger);
    fireEvent.keyDown(trigger, { key: 'Escape' });
    expect(screen.queryByText('Inside')).toBeNull();
    expect(document.activeElement).toBe(trigger);
    fireEvent.keyDown(trigger, { key: 'Enter' });
    expect(screen.getByTestId('hover-card')).toHaveAttribute('data-pinned', 'true');
    fireEvent.mouseDown(document.body);
    expect(screen.queryByText('Inside')).toBeNull();
  });

  it('openOnFocus={false}: focus alone does nothing', () => {
    card({ openOnFocus: false });
    act(() => screen.getByRole('button', { name: 'Trigger' }).focus());
    expect(screen.queryByText('Inside')).toBeNull();
  });
});

describe('useHeaderDensity', () => {
  beforeEach(() => window.localStorage.clear());
  afterEach(() => window.localStorage.clear());

  it('picks compact for rich content and comfortable for plain, open by default', () => {
    const rich = renderHook(() => useHeaderDensity({ contentKind: 'graph' })).result.current;
    expect([rich.density, rich.collapsed]).toEqual(['compact', false]);
    expect(renderHook(() => useHeaderDensity({ contentKind: 'list' })).result.current.density).toBe('comfortable');
  });

  it('remembers a collapse per device and per rich/plain key; expanding forgets it', () => {
    const { result, unmount } = renderHook(() => useHeaderDensity({ contentKind: 'graph', headerId: 'initiative' }));
    act(() => result.current.toggleCollapsed());
    expect(result.current.collapsed).toBe(true);
    expect(result.current.density).toBe('compact');
    expect(window.localStorage.getItem('uic:header-density:initiative:rich')).toBe('collapsed');
    unmount();
    const again = renderHook(() => useHeaderDensity({ contentKind: 'conversation', headerId: 'initiative' }));
    expect(again.result.current.collapsed).toBe(true);
    expect(renderHook(() => useHeaderDensity({ contentKind: 'detail', headerId: 'initiative' })).result.current.collapsed).toBe(false);
    act(() => again.result.current.toggleCollapsed());
    expect(again.result.current.collapsed).toBe(false);
    expect(window.localStorage.getItem('uic:header-density:initiative:rich')).toBeNull();
  });

  it('re-reads the remembered state when the content kind changes', () => {
    window.localStorage.setItem('uic:header-density:p:rich', 'collapsed');
    const { result, rerender } = renderHook(({ kind }) => useHeaderDensity({ contentKind: kind, headerId: 'p' }), {
      initialProps: { kind: 'detail' as 'detail' | 'graph' },
    });
    expect(result.current.collapsed).toBe(false);
    rerender({ kind: 'graph' });
    expect(result.current.collapsed).toBe(true);
    expect(result.current.headerProps).toMatchObject({ density: 'compact', collapsed: true });
  });

  it('collapses on a reader scroll of rich content and opens at the top; ignores programmatic scroll', () => {
    const { result } = renderHook(() => useHeaderDensity({ contentKind: 'conversation', headerId: 's' }));
    const region = document.createElement('div');
    const scroller = document.createElement('div');
    region.appendChild(scroller);
    document.body.appendChild(region);
    act(() => result.current.contentRef(region));
    act(() => { scroller.scrollTop = 400; scroller.dispatchEvent(new Event('scroll')); });
    expect(result.current.collapsed).toBe(false);
    act(() => {
      scroller.dispatchEvent(new Event('wheel', { bubbles: true }));
      scroller.scrollTop = HEADER_SCROLL_COLLAPSE_PX + 10;
      scroller.dispatchEvent(new Event('scroll'));
    });
    expect(result.current.collapsed).toBe(true);
    expect(window.localStorage.getItem('uic:header-density:s:rich')).toBeNull();
    act(() => {
      scroller.dispatchEvent(new Event('wheel', { bubbles: true }));
      scroller.scrollTop = 0;
      scroller.dispatchEvent(new Event('scroll'));
    });
    expect(result.current.collapsed).toBe(false);
    region.remove();
  });

  it('never scroll-collapses plain content', () => {
    const { result } = renderHook(() => useHeaderDensity({ contentKind: 'list' }));
    const region = document.createElement('div');
    document.body.appendChild(region);
    act(() => result.current.contentRef(region));
    act(() => {
      region.dispatchEvent(new Event('wheel'));
      region.scrollTop = 500;
      region.dispatchEvent(new Event('scroll'));
    });
    expect(result.current.collapsed).toBe(false);
    region.remove();
  });

  it('is exported from the shared barrel', () => {
    for (const name of ['useHeaderDensity', 'HeaderCollapseToggle', 'HeaderTrailFold', 'HoverCard', 'DensityProvider', 'useDensity'] as const) {
      expect(typeof shared[name]).toBe('function');
    }
  });
});
