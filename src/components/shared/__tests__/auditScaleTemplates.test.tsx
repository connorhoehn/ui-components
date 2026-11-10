// 2.515.12 — page templates drawn on the house scales (type 11/12/14/16/20,
// spacing on 4px steps). Each case pins the default the Storymaker audit
// measured off-scale (gaps G88-W1, W2, E2, 3, 20, 8, 9).
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DetailPage } from '../DetailPage';
import { DetailHeader } from '../DetailHeader';
import { Tabs } from '../Tabs';
import { SettingsPage } from '../SettingsPage';
import { SettingsLayout } from '../../layout/SettingsLayout';
import { DashboardPage } from '../DashboardPage';
import { TitledFrame } from '../TitledFrame';
import { MasterDetailPage } from '../MasterDetailPage';
import { WorkspaceRail } from '../../layout/WorkspaceRail';
import { SubjectFrame } from '../SubjectFrame';

const classes = (el: Element | null) => (el?.getAttribute('class') ?? '').split(/\s+/);

describe('DetailPage header (G88-W1)', () => {
  it('draws the title at the 20px page-title size with a 4px header stack', () => {
    render(<DetailPage title="Episode 01" description="Pilot" />);
    const h1 = screen.getByRole('heading', { level: 1, name: 'Episode 01' });
    expect(classes(h1)).toEqual(expect.arrayContaining(['text-xl', 'leading-7']));
    expect(classes(h1)).not.toContain('text-sm');
    expect(h1.getAttribute('data-title-size')).toBe('page');
    const stack = h1.closest('[data-detail-header-stack]');
    expect(classes(stack)).toContain('gap-1');
    expect(classes(stack)).not.toContain('gap-1.5');
  });

  it('draws no top padding when the host frame owns the gutter', () => {
    const { container, rerender } = render(<DetailPage title="Episode 01" />);
    const header = () => container.querySelector('[data-detail-page-header]');
    expect(classes(header())).toContain('pt-3');
    rerender(<DetailPage title="Episode 01" gutter="none" />);
    expect(classes(header()).some((c) => /^pt-/.test(c))).toBe(false);
    rerender(<DetailPage title="Episode 01" gutter="none" breadcrumbs={[{ label: 'Episodes', href: '/e' }, { label: 'Episode 01' }]} />);
    expect(classes(header()).some((c) => /^pt-/.test(c))).toBe(false);
  });

  it('keeps a panel DetailHeader at 14px', () => {
    render(<DetailHeader title="Run" />);
    const h2 = screen.getByRole('heading', { level: 2, name: 'Run' });
    expect(classes(h2)).toContain('text-sm');
    expect(h2.getAttribute('data-title-size')).toBe('panel');
  });
});

describe('DetailPage tabs (G88-W2)', () => {
  const tabs = [
    { id: 'a', label: 'Outline', content: <p>a</p> },
    { id: 'b', label: 'Shots', badge: 3, content: <p>b</p> },
  ];
  it('draws md (14px) tabs by default and sm on request', () => {
    const { rerender } = render(<DetailPage title="Episode 01" tabs={tabs} />);
    expect(classes(screen.getByRole('tab', { name: /Outline/ }))).toContain('text-sm');
    rerender(<DetailPage title="Episode 01" tabs={tabs} tabsSize="sm" />);
    expect(classes(screen.getByRole('tab', { name: /Outline/ }))).toContain('text-xs');
  });
});

describe('Tabs badge baseline (G88-E2)', () => {
  it("gives a plain count the label's line box at each size", () => {
    const items = [{ id: 'a', label: 'Plain' }, { id: 'b', label: 'Counted', badge: 2 }];
    const { container, rerender } = render(<Tabs items={items} value="a" onValueChange={() => {}} size="sm" badgeStyle="plain" />);
    const badge = () => container.querySelector('[data-tab-badge="plain"]');
    expect(classes(badge())).toContain('leading-4');
    rerender(<Tabs items={items} value="a" onValueChange={() => {}} size="md" badgeStyle="plain" />);
    expect(classes(badge())).toContain('leading-5');
  });
});

describe('SettingsPage heading (G88-3)', () => {
  const sections = [{ id: 'general', label: 'General', content: <p>General form</p> }];
  it('draws its title as the page h1', () => {
    render(<SettingsPage title="Access" sections={sections} />);
    expect(screen.getByRole('heading', { level: 1, name: 'Access' })).toBeTruthy();
  });
  it('takes titleAs, and a bare SettingsLayout keeps its div', () => {
    const { rerender, container } = render(<SettingsPage title="Access" sections={sections} titleAs="h2" />);
    expect(screen.getByRole('heading', { level: 2, name: 'Access' })).toBeTruthy();
    rerender(<SettingsLayout title="Access" sections={sections} />);
    expect(screen.queryByRole('heading', { name: 'Access' })).toBeNull();
    expect(container.querySelector('[data-settings-title]')?.tagName).toBe('DIV');
  });
});

describe('DashboardPage panel titles (G88-20)', () => {
  it('draws panel titles at 12px in the house font with 4px padding', () => {
    render(<DashboardPage title="Overview" panels={[{ id: 'p', title: 'Latency', content: <p>x</p> }]} />);
    const title = screen.getByTestId('dashboard-panel-p').querySelector('[data-titled-frame-title]');
    expect(title?.getAttribute('data-titled-frame-title')).toBe('label');
    expect(classes(title)).toEqual(expect.arrayContaining(['text-xs', 'px-1']));
    expect(classes(title)).not.toContain('font-mono');
    expect(classes(title)).not.toContain('text-[10px]');
  });
  it('leaves a plain TitledFrame on its mono label', () => {
    const { container } = render(<TitledFrame title="claude">x</TitledFrame>);
    const title = container.querySelector('[data-titled-frame-title]');
    expect(classes(title)).toEqual(expect.arrayContaining(['font-mono', 'text-[10px]']));
  });
});

describe('Master-detail rail insets (G88-8)', () => {
  it('insets the caption rail 16px, its count chip 4px in the block', () => {
    const { container } = render(
      <MasterDetailPage title="Requests" list={{ label: 'requests', title: 'Pending', count: 4, header: <input aria-label="Search" />, body: <p>rows</p> }}>
        <p>record</p>
      </MasterDetailPage>,
    );
    const nav = container.querySelector('[data-rail-inset]')!.closest('nav')!;
    const header = nav.querySelector('[data-rail-inset]');
    expect(header?.getAttribute('data-rail-inset')).toBe('16');
    expect(classes(header)).toContain('pl-4');
    expect(classes(header)).not.toContain('pl-5');
    expect(classes(nav.querySelector('[data-rail-header-slot]'))).toContain('px-4');
    const count = screen.getByLabelText('4 items');
    expect(classes(count)).toContain('py-1');
    expect(classes(count)).not.toContain('py-0.5');
  });
  it('insets the compact strip 12px', () => {
    render(<WorkspaceRail title="Files" header={<span>h</span>} footer={<span>f</span>}>x</WorkspaceRail>);
    const header = screen.getByTestId('workspace-rail-header');
    expect(header.getAttribute('data-rail-inset')).toBe('12');
    expect(classes(header)).toEqual(expect.arrayContaining(['pl-3', 'pr-2']));
    expect(classes(screen.getByText('h').parentElement)).toContain('px-3');
    expect(classes(screen.getByText('f').parentElement)).toContain('px-3');
  });
});

describe('SubjectFrame in a pane that names the record (G88-9)', () => {
  it('titleHidden keeps the name for screen readers and drops the visible row', () => {
    const { container } = render(<SubjectFrame title="Toby" titleHidden facts={[{ label: 'Role', value: 'Lead' }]} />);
    const section = screen.getByRole('region', { name: 'Toby' });
    expect(section).toBeTruthy();
    expect(classes(screen.getByRole('heading', { name: 'Toby' }))).toContain('sr-only');
    expect(container.querySelector('[data-subject-part="title"]')).toBeNull();
  });
  it('titleHidden still draws badges, subtitle and header actions', () => {
    const { container } = render(<SubjectFrame title="Toby" titleHidden subtitle="Character · Lead" headerActions={<button type="button">Close</button>} />);
    const row = container.querySelector('[data-subject-part="title"]');
    expect(row).not.toBeNull();
    expect(row?.querySelector('h2')).toBeNull();
    expect(screen.getByText('Character · Lead')).toBeTruthy();
  });
  it('scrolls its tab row by default in a narrow pane', () => {
    render(<SubjectFrame title="Toby" tabs={{ items: [{ id: 'a', label: 'Details' }, { id: 'b', label: 'Versions' }], value: 'a', onValueChange: () => {} }} />);
    expect(screen.getByRole('tablist', { name: 'Record sections' }).getAttribute('data-tabs-overflow')).toBe('scroll');
  });
});
