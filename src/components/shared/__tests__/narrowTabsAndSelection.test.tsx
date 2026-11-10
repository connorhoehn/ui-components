// 2.515.9: gaps the Storymaker Studio recorded while building its pages.
// - A tab row in a narrow inspector can scroll instead of folding three of
//   four views behind "More" (PaneHeader / SubjectFrame / SidePane / DetailPage).
// - SettingsLayout's narrow form: the sections become one scrolling row.
// - DataTable names its table and marks the selected row.
// - Text truncate, SubjectFrame factsLabel, DetailPage per-tab testIds,
//   PresenceAvatars busy.
// jsdom has no layout, so these pin the markers and classes that carry the
// behaviour; the geometry is the ui-dom-audit `tabs.reach` rule's.
import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { PaneHeader } from '../../layout/SidePane';
import { SettingsLayout } from '../../layout/SettingsLayout';
import { SubjectFrame } from '../SubjectFrame';
import { DetailPage } from '../DetailPage';
import { SettingsPage } from '../SettingsPage';
import { DataTable } from '../DataTable';
import { Text } from '../Text';
import { PresenceAvatars } from '../PresenceAvatars';

const tabs = [
  { id: 'details', label: 'Details' },
  { id: 'versions', label: 'Versions' },
  { id: 'activity', label: 'Activity' },
  { id: 'links', label: 'Links' },
];

describe('tab overflow: scroll or menu', () => {
  it('PaneHeader folds by default and scrolls when asked', () => {
    const { rerender } = render(<PaneHeader tabs={tabs} value="details" onValueChange={() => {}} />);
    expect(screen.getByRole('tablist').getAttribute('data-tabs-overflow')).toBe('menu');
    rerender(<PaneHeader tabs={tabs} value="details" onValueChange={() => {}} overflow="scroll" />);
    const list = screen.getByRole('tablist');
    expect(list.getAttribute('data-tabs-overflow')).toBe('scroll');
    expect(list.hasAttribute('data-folded')).toBe(false);
    // Every view stays in the row, which scrolls inside itself.
    expect(within(list).getAllByRole('tab')).toHaveLength(4);
    expect(list.className).toContain('overflow-x-auto');
  });

  it('SubjectFrame passes tabs.overflow to its tab row', () => {
    const { rerender } = render(<SubjectFrame title="Toby" tabs={{ items: tabs, value: 'details', onValueChange: () => {} }} />);
    expect(screen.getByRole('tablist', { name: 'Record sections' }).getAttribute('data-tabs-overflow')).toBe('menu');
    rerender(<SubjectFrame title="Toby" tabs={{ items: tabs, value: 'details', onValueChange: () => {}, overflow: 'scroll' }} />);
    expect(screen.getByRole('tablist', { name: 'Record sections' }).getAttribute('data-tabs-overflow')).toBe('scroll');
  });

  it('DetailPage scrolls by default and folds when asked', () => {
    const detailTabs = tabs.map((t) => ({ ...t, content: <p>{t.label} body</p> }));
    const { rerender } = render(<DetailPage title="Episode 01" tabs={detailTabs} />);
    expect(screen.getByRole('tablist', { name: 'Sections' }).getAttribute('data-tabs-overflow')).toBe('scroll');
    rerender(<DetailPage title="Episode 01" tabs={detailTabs} tabsOverflow="menu" />);
    expect(screen.getByRole('tablist', { name: 'Sections' }).getAttribute('data-tabs-overflow')).toBe('menu');
  });
});

describe('DetailPage per-tab testIds', () => {
  it('puts testId (or data-testid) on each trigger', () => {
    render(
      <DetailPage title="Episode 01" tabs={[
        { id: 'summary', label: 'Summary', testId: 'episode-tab-summary', content: 'S' },
        { id: 'cast', label: 'Cast', 'data-testid': 'episode-tab-cast', content: 'C' },
        { id: 'plain', label: 'Plain', content: 'P' },
      ]} />,
    );
    expect(screen.getByTestId('episode-tab-summary').getAttribute('role')).toBe('tab');
    fireEvent.click(screen.getByTestId('episode-tab-cast'));
    expect(screen.getByText('C')).toBeTruthy();
    expect(screen.getByRole('tab', { name: 'Plain' }).hasAttribute('data-testid')).toBe(false);
  });
});

describe('SubjectFrame factsLabel', () => {
  const facts = [{ label: 'Role', value: 'Lead' }];
  it('names the facts table "Facts" by default and as given', () => {
    const { rerender } = render(<SubjectFrame title="Toby" facts={facts} />);
    expect(screen.getByLabelText('Facts')).toBeTruthy();
    rerender(<SubjectFrame title="Toby" facts={facts} factsLabel="Character facts" />);
    expect(screen.getByLabelText('Character facts')).toBeTruthy();
    expect(screen.queryByLabelText('Facts')).toBeNull();
  });
});

describe('SettingsLayout narrow', () => {
  const sections = [
    { id: 'general', label: 'General', content: <p>General body</p> },
    { id: 'providers', label: 'Providers', content: <p>Providers body</p> },
    { id: 'storage', label: 'Storage', content: <p>Storage body</p> },
  ];

  it('draws no strip by default', () => {
    render(<SettingsLayout title="Settings" sections={sections} />);
    expect(screen.queryByTestId('settings-layout-strip')).toBeNull();
    expect(screen.getByTestId('settings-layout').hasAttribute('data-settings-narrow')).toBe(false);
    expect(screen.getByTestId('settings-layout-rail').className).not.toContain('@max-[40rem]:hidden');
  });

  it('is its own container; under 40rem the rail hides and the strip selects', () => {
    const onSectionChange = vi.fn();
    render(<SettingsLayout title="Settings" subtitle="This show" sections={sections} narrow onSectionChange={onSectionChange} />);
    const root = screen.getByTestId('settings-layout');
    expect(root.hasAttribute('data-settings-narrow')).toBe(true);
    expect(root.className).toContain('@container');
    expect(screen.getByTestId('settings-layout-rail').className).toContain('@max-[40rem]:hidden');
    const strip = screen.getByRole('navigation', { name: 'Settings sections (compact)' });
    expect(strip.hasAttribute('data-settings-strip')).toBe(true);
    expect(strip.className).toContain('overflow-x-auto');
    expect(strip.parentElement!.className).toContain('@min-[40rem]:hidden');
    const items = screen.getAllByTestId('settings-layout-strip-item');
    expect(items.map((b) => b.getAttribute('data-section-id'))).toEqual(['general', 'providers', 'storage']);
    expect(items[0].getAttribute('aria-current')).toBe('page');
    fireEvent.click(items[1]);
    expect(onSectionChange).toHaveBeenCalledWith('providers');
    expect(screen.getByText('Providers body')).toBeTruthy();
    expect(screen.getAllByTestId('settings-layout-strip-item')[1].getAttribute('aria-current')).toBe('page');
  });

  it('SettingsPage passes narrow through', () => {
    render(<SettingsPage title="Settings" sections={sections} narrow />);
    expect(screen.getByTestId('settings-page-layout-strip')).toBeTruthy();
  });
});

describe('DataTable name and selection', () => {
  type Row = { id: string; name: string };
  const data: Row[] = [{ id: 'a', name: 'Alpha' }, { id: 'b', name: 'Beta' }, { id: 'c', name: 'Gamma' }];
  const columns = [{ key: 'name', header: 'Name' }];

  it('names the table element', () => {
    const { rerender } = render(<DataTable data={data} columns={columns} keyField={(r) => r.id} aria-label="Jobs" />);
    expect(screen.getByRole('table', { name: 'Jobs' }).tagName).toBe('TABLE');
    rerender(<><h2 id="workers-h">Workers</h2><DataTable data={data} columns={columns} keyField={(r) => r.id} aria-labelledby="workers-h" /></>);
    expect(screen.getByRole('table', { name: 'Workers' })).toBeTruthy();
  });

  it('marks nothing without a selection prop', () => {
    render(<DataTable data={data} columns={columns} keyField={(r) => r.id} />);
    for (const row of screen.getAllByRole('row').slice(1)) expect(row.hasAttribute('aria-selected')).toBe(false);
  });

  it('tints and marks the selected row', () => {
    render(<DataTable data={data} columns={columns} keyField={(r) => r.id} selectedKey="b" onRowClick={() => {}} />);
    const [, a, b, c] = screen.getAllByRole('row');
    expect(b.getAttribute('aria-selected')).toBe('true');
    expect(b.hasAttribute('data-selected')).toBe(true);
    // The selection tint replaces the odd-row stripe.
    expect(b.className).toContain('bg-primary-bg');
    expect(b.className).not.toContain('bg-surface-inset');
    expect(a.getAttribute('aria-selected')).toBe('false');
    expect(c.getAttribute('aria-selected')).toBe('false');
    expect(a.className).not.toContain('bg-primary-bg');
  });

  it('selectedKey null selects nothing; isRowSelected selects several', () => {
    const { rerender } = render(<DataTable data={data} columns={columns} keyField={(r) => r.id} selectedKey={null} />);
    expect(screen.getAllByRole('row').slice(1).map((r) => r.getAttribute('aria-selected'))).toEqual(['false', 'false', 'false']);
    rerender(<DataTable data={data} columns={columns} keyField={(r) => r.id} isRowSelected={(r) => r.id !== 'b'} />);
    expect(screen.getAllByRole('row').slice(1).map((r) => r.getAttribute('aria-selected'))).toEqual(['true', 'false', 'true']);
  });
});

describe('Text truncate', () => {
  it('cuts to one line with the whole text as title', () => {
    render(<Text truncate size="sm" data-testid="t">A long episode title that will not fit</Text>);
    const el = screen.getByTestId('t');
    expect(el.className).toContain('truncate');
    expect(el.className).toContain('min-w-0');
    expect(el.className).toContain('text-sm');
    expect(el.getAttribute('title')).toBe('A long episode title that will not fit');
    expect(el.hasAttribute('data-text-truncate')).toBe(true);
  });

  it('keeps a given title and draws as before without truncate', () => {
    const { rerender } = render(<Text truncate title="Full" data-testid="t">Fu…</Text>);
    expect(screen.getByTestId('t').getAttribute('title')).toBe('Full');
    rerender(<Text data-testid="t">Plain</Text>);
    expect(screen.getByTestId('t').hasAttribute('title')).toBe(false);
    expect(screen.getByTestId('t').className).not.toContain('truncate');
  });
});

describe('PresenceAvatars busy', () => {
  it('draws busy present, not away', () => {
    render(<PresenceAvatars users={[{ id: 'w', name: 'Worker', online: true, busy: true, detail: 'Working on Draw guide' }]} />);
    const avatar = screen.getByTestId('presence-avatar');
    expect(avatar.getAttribute('data-presence-busy')).toBe('true');
    expect(avatar.hasAttribute('data-presence-idle')).toBe(false);
    expect(avatar.getAttribute('data-presence-detail')).toBe('Working on Draw guide');
    expect(screen.getByLabelText('Worker busy')).toBeTruthy();
  });
});
