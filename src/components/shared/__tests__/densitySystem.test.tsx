// The one density system (2.440.0): a compact `DensityProvider` at the shell
// draws every composite exactly as its old per-call `size="sm"` did — the
// markup is compared byte for byte — and no explicit size is needed.
import { render, cleanup, renderHook } from '@testing-library/react';
import type { ReactElement, ReactNode } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  DensityProvider, useDensity, useDensityForm, useDensitySize, resetDensityWarnings,
} from '../Density';
import { containerDensity, CONTAINER_COMPACT_BELOW } from '../ContainerDensity';
import { StatStrip } from '../StatStrip';
import { PageSection } from '../../ui/PageSection';
import { DetailSection } from '../DetailSection';
import { ActionRowList } from '../../work/ActionRowList';
import { Table, TableBody, TableRow, TableTd } from '../../ui/Table';
import { DataTable } from '../DataTable';
import EmptyState from '../EmptyState';
import { ChatSidePanelFrame } from '../../social/ChatSidePanelRegistry';
import { SegmentedControl } from '../SegmentedControl';
import { WorkflowStepper } from '../WorkflowStepper';
import { headerDefaults } from '../headerDensity';
import { composerSizeFor } from '../../social/RichChatComposer';

let warn: ReturnType<typeof vi.spyOn>;
beforeEach(() => { resetDensityWarnings(); warn = vi.spyOn(console, 'warn').mockImplementation(() => {}); });
afterEach(() => { cleanup(); warn.mockRestore(); });

function html(node: ReactElement): string {
  const { container, unmount } = render(node);
  const out = container.innerHTML;
  unmount();
  return out;
}

const compact = (node: ReactElement) => <DensityProvider density="compact">{node}</DensityProvider>;

// Each composite twice: [explicit sm, same element with no size].
const CASES: Array<[string, (size?: 'sm') => ReactElement]> = [
  ['StatStrip', (size) => <StatStrip variant="line" {...(size ? { size } : {})} items={[{ label: 'assessed', value: '3/17' }, { label: 'open', value: 2 }]} />],
  ['PageSection', (size) => <PageSection title="Work" count={4} {...(size ? { size } : {})}><p>body</p></PageSection>],
  ['DetailSection', (size) => <DetailSection variant="heading" title="Owner" hint="who" {...(size ? { size } : {})}><p>x</p></DetailSection>],
  ['ActionRowList', (size) => <ActionRowList {...(size ? { size } : {})} items={[{ id: 'a', title: 'Fix login', description: 'p1' }]} onOpen={() => {}} />],
  ['Table', (size) => <Table {...(size ? { size } : {})}><TableBody><TableRow><TableTd>cell</TableTd></TableRow></TableBody></Table>],
  ['DataTable', (size) => <DataTable {...(size ? { size } : {})} data={[{ id: '1', name: 'Ada' }]} keyField={(r) => r.id} columns={[{ key: 'name', header: 'Name', render: (r) => r.name }]} />],
  ['EmptyState', (size) => <EmptyState {...(size ? { size } : {})} title="Nothing yet" body="Add one." actionLabel="Add" onAction={() => {}} />],
  ['ChatSidePanelFrame', (size) => <ChatSidePanelFrame {...(size ? { size } : {})} title="Discussion" subtitle="3 people" onClose={() => {}}><p>t</p></ChatSidePanelFrame>],
  ['SegmentedControl', (size) => <SegmentedControl {...(size ? { size } : {})} aria-label="View" value="a" onChange={() => {}} options={[{ value: 'a', label: 'A' }, { value: 'b', label: 'B' }]} />],
];

describe('the compact density draws what size="sm" drew', () => {
  for (const [name, el] of CASES) {
    it(`${name}: <DensityProvider density="compact"> with no size === size="sm"`, () => {
      expect(html(compact(el()))).toBe(html(el('sm')));
    });
    it(`${name}: no provider and no size is the comfortable default (unchanged)`, () => {
      const plain = html(el());
      expect(plain).toBe(html(<DensityProvider density="comfortable">{el()}</DensityProvider>));
      expect(plain).not.toBe(html(el('sm')));
    });
  }

  it('an explicit size="sm" still works and warns once per component in development', () => {
    html(<StatStrip variant="line" size="sm" items={[{ label: 'a', value: 1 }]} />);
    html(<StatStrip variant="line" size="sm" items={[{ label: 'b', value: 2 }]} />);
    const calls = warn.mock.calls.filter((args: unknown[]) => String(args[0]).includes('[StatStrip]'));
    expect(calls).toHaveLength(1);
    expect(String(calls[0]![0])).toMatch(/deprecated \(2\.440\.0\)/);
  });

  it('an explicit comfortable size overrides a compact provider without a warning', () => {
    expect(html(compact(<PageSection title="Work" size="lg"><p>b</p></PageSection>))).toBe(html(<PageSection title="Work"><p>b</p></PageSection>));
    expect(warn).not.toHaveBeenCalled();
  });
});

describe('scale and form', () => {
  const wrap = (props: { density?: 'compact' | 'comfortable'; value?: 'compact' | 'comfortable' }) =>
    ({ children }: { children: ReactNode }) => <DensityProvider {...props}>{children}</DensityProvider>;

  it('the shell density sets the scale and leaves the form comfortable (a header never folds from it)', () => {
    const { result } = renderHook(() => [useDensity(), useDensityForm()], { wrapper: wrap({ density: 'compact' }) });
    expect(result.current).toEqual(['compact', 'comfortable']);
  });

  it('value (2.437) sets both — a side pane folds its chrome', () => {
    const { result } = renderHook(() => [useDensity(), useDensityForm()], { wrapper: wrap({ value: 'compact' }) });
    expect(result.current).toEqual(['compact', 'compact']);
  });

  it('a nested density keeps the form it inherited', () => {
    const { result } = renderHook(() => [useDensity(), useDensityForm()], {
      wrapper: ({ children }) => <DensityProvider value="compact"><DensityProvider density="comfortable">{children}</DensityProvider></DensityProvider>,
    });
    expect(result.current).toEqual(['comfortable', 'compact']);
  });

  it('useDensitySize: override wins, else the scale names the size', () => {
    const sizes = { comfortable: 'md', compact: 'sm' } as const;
    expect(renderHook(() => useDensitySize('X', undefined, sizes)).result.current).toBe('md');
    expect(renderHook(() => useDensitySize('X', undefined, sizes), { wrapper: wrap({ density: 'compact' }) }).result.current).toBe('sm');
    expect(renderHook(() => useDensitySize<'sm' | 'md'>('X', 'md', sizes), { wrapper: wrap({ density: 'compact' }) }).result.current).toBe('md');
  });
});

describe('WorkflowStepper compact', () => {
  const LEVELS = [
    { step: 1, label: 'L1', done: true, active: false },
    { step: 2, label: 'L2', done: false, active: true },
    { step: 3, label: 'L3', done: false, active: false },
  ];
  it('is the compact density’s form: a content-width track on 12/600 labels', () => {
    const { getByTestId, getByText } = render(compact(<WorkflowStepper steps={LEVELS} aria-label="Level L1 of target L3" />));
    const track = getByTestId('workflow-stepper');
    expect(track).toHaveAttribute('data-density', 'compact');
    expect(track).toHaveAttribute('aria-label', 'Level L1 of target L3');
    expect(track.className).toContain('inline-flex');
    expect(track.className).not.toContain('overflow-x-auto');
    expect(getByText('L2').className).toMatch(/text-xs/);
    expect(getByText('L2').className).toMatch(/font-semibold/);
  });
  it('size="compact" draws it without a provider; md is unchanged', () => {
    expect(html(<WorkflowStepper steps={LEVELS} size="compact" />)).toBe(html(compact(<WorkflowStepper steps={LEVELS} />)));
    expect(html(<WorkflowStepper steps={LEVELS} />)).not.toContain('data-density');
  });
});

describe('one rule from room to density', () => {
  it('containerDensity: under the threshold is compact; unmeasured is comfortable', () => {
    expect(containerDensity(599, 600)).toBe('compact');
    expect(containerDensity(600, 600)).toBe('comfortable');
    expect(containerDensity(0, 600)).toBe('comfortable');
    expect(containerDensity(null, 600)).toBe('comfortable');
    expect(containerDensity(100, null)).toBe('comfortable');
  });
  it('the composer and the header read it', () => {
    expect(composerSizeFor(CONTAINER_COMPACT_BELOW.pane - 1)).toBe('medium');
    expect(composerSizeFor(CONTAINER_COMPACT_BELOW.pane)).toBe('wide');
    expect(composerSizeFor(null)).toBe('wide');
    expect(headerDefaults({ contentKind: 'list', containerHeight: CONTAINER_COMPACT_BELOW.header - 1 }).density).toBe('compact');
    expect(headerDefaults({ contentKind: 'list', containerHeight: 0 }).density).toBe('comfortable');
  });
});

describe('StatStrip line track', () => {
  it('draws the track inline after the label in place of the progress bar', () => {
    const { getByTestId, queryByTestId } = render(compact(
      <StatStrip variant="line" items={[{ label: 'verified · target L3', value: 'L1', progress: { value: 1, max: 3 }, track: <span>levels</span> }]} />,
    ));
    expect(getByTestId('stat-strip-track')).toHaveTextContent('levels');
    expect(queryByTestId('stat-strip-progress')).toBeNull();
  });
});
