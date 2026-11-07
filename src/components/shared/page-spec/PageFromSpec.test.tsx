import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, expectTypeOf, it, vi } from 'vitest';
import { PageFromSpec, definePage, tableLeaf } from './PageFromSpec';
import { SpecLeaf, renderSection } from './render';
import { PageSpecProvider, registerLeafKind } from './registry';
import type { BuiltinLeafKind, LeafSpec, PageSpec, TableLeaf } from './types';

// An app-defined kind, declared the way a consumer augments the shipped interface.
declare module './types' {
  interface PageSpecLeafKinds {
    'test-meter': { value: number; label: string };
    'test-late-meter': { value: number; label: string };
  }
}

function Meter({ value, label, 'data-spec-leaf': marker }: { value: number; label: string; 'data-spec-leaf': string }) {
  return <output data-spec-leaf={marker} aria-label={label}>{value}%</output>;
}

const rows = [{ id: 'r1', name: 'Nightly import', status: 'ok' }, { id: 'r2', name: 'Backfill', status: 'failed' }];
const columns = [{ key: 'name', header: 'Name' }, { key: 'status', header: 'Status' }];

const leafMarker = (container: HTMLElement, kind: string) => container.querySelector(`[data-spec-leaf="${kind}"]`);

describe('PageFromSpec templates', () => {
  it('collection: CollectionPage with header actions, toolbar search and a striped table', () => {
    const { container } = render(<PageFromSpec spec={definePage({
      template: 'collection', title: 'Runs',
      actions: [{ kind: 'button', variant: 'primary', label: 'New run' }],
      toolbar: { label: 'Run controls', search: { value: '', onChange: () => {}, placeholder: 'Search runs' } },
      table: { data: rows, columns, keyField: (r: { id: string }) => r.id },
      empty: { title: 'No runs yet' },
    })} />);
    const root = container.querySelector('[data-page-spec="collection"]')!;
    expect(root.getAttribute('data-page-template')).toBe('collection');
    expect(leafMarker(container, 'button')?.textContent).toBe('New run');
    expect(screen.getByText('Nightly import')).toBeTruthy();
    expect(root.querySelector('[data-collection-body]')?.getAttribute('data-state')).toBe('ready');
  });

  it('collection: empty table renders the empty state with its action leaf', () => {
    const { container } = render(<PageFromSpec spec={{
      template: 'collection', title: 'Runs', table: { data: [], columns, keyField: (r: { id: string }) => r.id },
      empty: { title: 'No runs yet', action: { kind: 'button', variant: 'primary', label: 'Start one' } },
    }} />);
    expect(screen.getByText('No runs yet')).toBeTruthy();
    expect(leafMarker(container, 'button')?.textContent).toBe('Start one');
  });

  it('master-detail: the rail body and the selected record are leaves', () => {
    const { container } = render(<PageFromSpec spec={{
      template: 'master-detail', title: 'Requests',
      list: {
        label: 'requests', title: 'Pending', count: 1,
        header: [{ kind: 'search', value: '', onChange: () => {}, 'aria-label': 'Search requests' }],
        body: [{ kind: 'list', variant: 'grouped', groups: [{ id: 'g', title: 'Open' }], rows: [{ id: 'q1', groupId: 'g', title: 'Access to billing' }] }],
      },
      detail: [{ title: 'Summary', body: [{ kind: 'key-values', items: [{ label: 'Owner', value: 'Layla' }] }] }],
    }} />);
    expect(container.querySelector('[data-page-spec="master-detail"]')?.getAttribute('data-page-template')).toBe('master-detail');
    expect(leafMarker(container, 'search')).toBeTruthy();
    expect(screen.getByText('Access to billing')).toBeTruthy();
    expect(screen.getByText('Layla')).toBeTruthy();
    expect(container.querySelector('[data-master-detail-body]')?.getAttribute('data-master-detail-body')).toBe('selected');
  });

  it('master-detail: with no detail the emptyDetail leaves show', () => {
    render(<PageFromSpec spec={{
      template: 'master-detail', title: 'Requests', list: { label: 'requests', body: [] },
      emptyDetail: [{ kind: 'empty', title: 'Pick a request' }],
    }} />);
    expect(screen.getByText('Pick a request')).toBeTruthy();
  });

  it('detail: DetailPage tabs hold sections; only the active tab mounts', () => {
    const { container } = render(<PageFromSpec spec={{
      template: 'detail', title: 'Run 42',
      badge: { kind: 'status', tone: 'success', label: 'Succeeded' },
      meta: { kind: 'meta', items: ['nova-pro', '2 min'] },
      tabs: [
        { id: 'summary', label: 'Summary', content: [{ title: 'Inputs', body: [{ kind: 'text', text: 'thirteen notes' }] }] },
        { id: 'trace', label: 'Trace', badge: 3, content: [{ body: [{ kind: 'text', text: 'span list' }] }] },
      ],
    }} />);
    expect(container.querySelector('[data-page-spec="detail"]')?.getAttribute('data-page-template')).toBe('detail');
    expect(screen.getByText('Succeeded')).toBeTruthy();
    expect(screen.getByText('nova-pro')).toBeTruthy();
    expect(screen.getByText('thirteen notes')).toBeTruthy();
    expect(screen.queryByText('span list')).toBeNull();
    fireEvent.click(screen.getByRole('tab', { name: /Trace/ }));
    expect(screen.getByText('span list')).toBeTruthy();
  });

  it('dashboard: stat strip and panels whose content is leaves', () => {
    const { container } = render(<PageFromSpec spec={{
      template: 'dashboard', title: 'Overview', stats: [{ label: 'Invocations', value: '12.4k' }],
      panels: [{ id: 'latency', title: 'Latency', span: 2, content: [{ kind: 'chart', type: 'sparkline', points: [1, 3, 2], label: 'p95 latency' }] }],
    }} />);
    expect(container.querySelector('[data-page-spec="dashboard"]')?.getAttribute('data-page-template')).toBe('dashboard');
    expect(screen.getByText('12.4k')).toBeTruthy();
    expect(screen.getByTestId('dashboard-panel-latency').querySelector('[data-spec-leaf="chart"]')).toBeTruthy();
  });

  it('settings: SettingsPage sections hold a form leaf', () => {
    const { container } = render(<PageFromSpec spec={{
      template: 'settings', title: 'Workspace',
      sections: [{ id: 'general', label: 'General', content: [{ title: 'Profile', body: [{ kind: 'form', fields: [{ control: 'input', label: 'Name', value: 'Acme', onChange: () => {} }] }] }] }],
    }} />);
    expect(container.querySelector('[data-page-spec="settings"]')?.getAttribute('data-page-template')).toBe('settings');
    expect(leafMarker(container, 'form')).toBeTruthy();
    expect((screen.getByLabelText('Name') as HTMLInputElement).value).toBe('Acme');
  });

  it('frame: PageFrame with sections in a SectionStack, a rule between them', () => {
    const { container } = render(<PageFromSpec spec={{
      template: 'frame', title: 'New connector',
      sections: [
        { title: 'Details', body: [{ kind: 'text', text: 'first' }] },
        false,
        { title: 'Access', body: [{ kind: 'banner', variant: 'info', message: 'Read only' }] },
      ],
      footer: [{ kind: 'button', variant: 'primary', label: 'Save' }],
    }} />);
    expect(container.querySelector('[data-page-spec="frame"]')?.getAttribute('data-page-template')).toBe('page-frame');
    expect(container.querySelectorAll('[data-ui-section-rule]')).toHaveLength(1);
    expect(screen.getByText('Read only')).toBeTruthy();
    expect(container.querySelector('[data-page-footer] [data-spec-leaf="button"]')?.textContent).toBe('Save');
  });
});

describe('leaf dispatch', () => {
  const leaves: Record<BuiltinLeafKind, { leaf: LeafSpec; text?: string; selector?: string }> = {
    button: { leaf: { kind: 'button', variant: 'secondary', label: 'Export' }, text: 'Export', selector: 'button' },
    'button-group': { leaf: { kind: 'button-group', label: 'Zoom', items: [{ kind: 'button', variant: 'ghost', label: 'In' }, { kind: 'button', variant: 'ghost', label: 'Out' }] }, selector: '[role="group"]' },
    menu: { leaf: { kind: 'menu', trigger: 'More', triggerLabel: 'More actions', sections: [{ items: [{ label: 'Archive' }] }] }, selector: 'button' },
    table: { leaf: tableLeaf({ data: rows, columns, keyField: (r) => r.id }), text: 'Backfill', selector: 'table' },
    stats: { leaf: { kind: 'stats', items: [{ label: 'Runs', value: '42' }] }, text: '42' },
    'stat-strip': { leaf: { kind: 'stat-strip', items: [{ label: 'Spend', value: '$41' }] }, text: '$41' },
    'key-values': { leaf: { kind: 'key-values', items: [{ label: 'Model', value: 'nova-pro' }] }, text: 'nova-pro' },
    status: { leaf: { kind: 'status', tone: 'warning', label: 'Degraded' }, text: 'Degraded' },
    badge: { leaf: { kind: 'badge', variant: 'count', value: 7, 'aria-label': '7 unread' }, text: '7' },
    text: { leaf: { kind: 'text', text: 'Plain words', tone: 'secondary' }, text: 'Plain words' },
    meta: { leaf: { kind: 'meta', items: ['Observability', '3 days left'] }, text: '3 days left' },
    empty: { leaf: { kind: 'empty', title: 'Nothing here', description: 'Add one' }, text: 'Nothing here' },
    banner: { leaf: { kind: 'banner', variant: 'warning', title: 'Heads up', message: 'Quota at 90%' }, text: 'Quota at 90%' },
    list: { leaf: { kind: 'list', variant: 'action-rows', items: [{ id: 'a', title: 'Plan next sprint' }], 'aria-label': 'Next' }, text: 'Plan next sprint' },
    form: { leaf: { kind: 'form', fields: [
      { control: 'input', label: 'Name', value: '', onChange: () => {} },
      { control: 'textarea', label: 'Notes', value: '', onChange: () => {} },
      { control: 'select', label: 'Region', value: 'us', onChange: () => {}, options: [{ value: 'us', label: 'US' }] },
      { control: 'number', label: 'Limit', value: 3, onChange: () => {} },
      { control: 'checkbox', label: 'Notify', checked: false, onChange: () => {} },
      { control: 'toggle', label: 'Enabled', checked: true, onChange: () => {} },
    ] }, text: 'Enabled' },
    tabs: { leaf: { kind: 'tabs', label: 'Views', items: [{ id: 'a', label: 'Alpha', content: [{ kind: 'text', text: 'alpha body' }] }, { id: 'b', label: 'Beta', content: [] }] }, text: 'alpha body', selector: '[role="tablist"]' },
    chart: { leaf: { kind: 'chart', type: 'sparkline', points: [1, 2, 3], label: 'Trend' }, selector: 'svg' },
    activity: { leaf: { kind: 'activity', events: [{ id: 'e1', kind: 'comment', at: 0, text: 'left a comment' }] }, text: 'left a comment' },
    search: { leaf: { kind: 'search', value: 'abc', onChange: () => {}, 'aria-label': 'Search' }, selector: 'input' },
    custom: { leaf: { kind: 'custom', reason: 'third-party map', render: () => <span>map canvas</span> }, text: 'map canvas' },
  };

  for (const [kind, { leaf, text, selector }] of Object.entries(leaves)) {
    it(`${kind} renders its library component under data-spec-leaf="${kind}"`, () => {
      const { container } = render(<SpecLeaf leaf={leaf} />);
      const marker = leafMarker(container, kind)!;
      expect(marker).toBeTruthy();
      if (text) expect(marker.textContent).toContain(text);
      if (selector) expect(marker.matches(selector) || marker.querySelector(selector)).toBeTruthy();
    });
  }

  it('the form leaf wires every control to its label', () => {
    render(<SpecLeaf leaf={leaves.form.leaf} />);
    expect(screen.getByLabelText('Name').tagName).toBe('INPUT');
    expect(screen.getByLabelText('Notes').tagName).toBe('TEXTAREA');
    expect(screen.getByLabelText('Notify').getAttribute('type')).toBe('checkbox');
    expect(screen.getByRole('switch', { name: 'Enabled' })).toBeTruthy();
  });

  it('custom carries its reason on a data-page-spec-custom marker', () => {
    const { container } = render(<SpecLeaf leaf={leaves.custom.leaf} />);
    expect(container.querySelector('[data-page-spec-custom]')?.getAttribute('data-page-spec-custom')).toBe('third-party map');
  });

  it('button and text put the marker on the component itself, not a wrapper', () => {
    const { container } = render(<><SpecLeaf leaf={leaves.button.leaf} /><SpecLeaf leaf={leaves.text.leaf} /></>);
    expect(leafMarker(container, 'button')?.tagName).toBe('BUTTON');
    expect(leafMarker(container, 'text')?.tagName).toBe('SPAN');
  });

  it('a section without a title renders its leaves without a heading', () => {
    const { container } = render(<>{renderSection({ body: [{ kind: 'text', text: 'loose' }] })}</>);
    expect(container.querySelector('h2')).toBeNull();
    expect(screen.getByText('loose')).toBeTruthy();
  });
});

describe('registered leaf kinds', () => {
  afterEach(() => vi.restoreAllMocks());

  it('renders a kind registered with registerLeafKind', () => {
    const unregister = registerLeafKind('test-meter', Meter);
    const { container, unmount } = render(<SpecLeaf leaf={{ kind: 'test-meter', value: 64, label: 'Budget' }} />);
    expect(leafMarker(container, 'test-meter')?.textContent).toBe('64%');
    unmount();
    unregister();
  });

  it('renders a kind provided by PageSpecProvider inside a page', () => {
    const { container } = render(
      <PageSpecProvider leaves={{ 'test-meter': Meter }}>
        <PageFromSpec spec={{ template: 'frame', title: 'Budget', sections: [{ title: 'Spend', body: [{ kind: 'test-meter', value: 12, label: 'Spend' }] }] }} />
      </PageSpecProvider>,
    );
    expect(leafMarker(container, 'test-meter')?.textContent).toBe('12%');
  });

  it('a page already mounted picks up a kind registered after it, and drops it on unregister', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    const { container } = render(<SpecLeaf leaf={{ kind: 'test-late-meter', value: 30, label: 'Late' }} />);
    expect(leafMarker(container, 'test-late-meter')).toBeNull();
    let unregister = () => {};
    act(() => { unregister = registerLeafKind('test-late-meter', Meter); });
    expect(leafMarker(container, 'test-late-meter')?.textContent).toBe('30%');
    act(() => unregister());
    expect(leafMarker(container, 'test-late-meter')).toBeNull();
  });

  it('an unregistered kind renders nothing and reports it', () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});
    const { container } = render(<SpecLeaf leaf={{ kind: 'test-meter', value: 1, label: 'x' }} />);
    expect(container.innerHTML).toBe('');
    expect(error).toHaveBeenCalled();
  });

  it('refuses to replace a built-in kind', () => {
    expect(() => registerLeafKind('button' as 'test-meter', Meter)).toThrow(/built-in/);
  });
});

describe('spec types', () => {
  it('rejects a button without a variant and an unknown kind', () => {
    // @ts-expect-error a button leaf must name its variant
    const noVariant: LeafSpec = { kind: 'button', label: 'Save' };
    // @ts-expect-error an unknown kind is not a LeafSpec
    const unknown: LeafSpec = { kind: 'raw-div', children: 'x' };
    // @ts-expect-error a template must be one of the six
    const badTemplate: PageSpec = { template: 'grid', title: 'x' };
    // @ts-expect-error content slots take leaves, not JSX
    const jsxAction: PageSpec = { template: 'frame', title: 'x', sections: [], actions: [<button key="b">x</button>] };
    expect([noVariant, unknown, badTemplate, jsxAction]).toHaveLength(4);
    expectTypeOf<{ kind: 'button'; label: string }>().not.toMatchTypeOf<LeafSpec>();
    expectTypeOf<{ kind: 'button'; label: string; variant: 'primary' }>().toMatchTypeOf<LeafSpec>();
    expectTypeOf<{ kind: 'test-meter'; value: number; label: string }>().toMatchTypeOf<LeafSpec>();
    expectTypeOf(definePage({ template: 'dashboard', title: 'x' })).toMatchTypeOf<PageSpec>();
    // tableLeaf keeps its row type, and the typed leaf still fits a spec slot.
    const typed = tableLeaf({ data: rows, columns, keyField: (r) => r.id });
    expectTypeOf(typed).toEqualTypeOf<TableLeaf<(typeof rows)[number]>>();
    expectTypeOf(typed).toMatchTypeOf<LeafSpec>();
  });
});
