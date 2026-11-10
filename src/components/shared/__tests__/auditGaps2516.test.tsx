// 2.516.1 — the open half of the Storymaker Studio's ui-dom-audit gap list
// (G88-O1..O5, G88-E8, G88-A1, G119-1, G119-2, G120-1..3). Each case pins the
// new default (or the new prop) on the house scales: type 11 / 12 / 14 / 16 /
// 20 px, spacing on 4px steps.
import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import Chip from '../Chip';
import { Tabs } from '../Tabs';
import { FilePickerButton } from '../FilePickerButton';
import { Button } from '../../ui/Button';
import { MarkdownView } from '../MarkdownView';
import { SettingsLayout } from '../../layout/SettingsLayout';
import { SettingsPage } from '../SettingsPage';
import { T } from '../Text';
import { DataTable } from '../DataTable';
import { DialogueSegment } from '../../social/DialogueSegment';
import { SubjectFrame } from '../SubjectFrame';
import { ActionRowList } from '../../work/ActionRowList';
import { RichChatComposer } from '../../social/RichChatComposer';

const classes = (el: Element | null) => (el?.getAttribute('class') ?? '').split(/\s+/);
const sections = [
  { id: 'general', label: 'General', content: <p>General form</p> },
  { id: 'members', label: 'Members', content: <p>Members form</p> },
];

describe('Chip padding (G88-O1)', () => {
  it.each([
    ['xs', 'px-1', 'leading-4'],
    ['sm', 'px-2', 'leading-5'],
    ['md', 'px-2', 'leading-5'],
  ] as const)('%s: no block padding, %s sides, height from a %s line', (size, px, leading) => {
    render(<Chip size={size} data-testid="chip">Draft</Chip>);
    const chip = screen.getByTestId('chip');
    expect(chip.getAttribute('data-chip')).toBe(size);
    expect(classes(chip)).toEqual(expect.arrayContaining([px, 'py-0', leading]));
    for (const off of ['py-0.5', 'py-px', 'px-1.5', 'leading-[1.4]']) expect(classes(chip)).not.toContain(off);
  });

  it('lg: 12 / 4px', () => {
    render(<Chip size="lg" data-testid="chip">Blocked</Chip>);
    expect(classes(screen.getByTestId('chip'))).toEqual(expect.arrayContaining(['px-3', 'py-1']));
    expect(classes(screen.getByTestId('chip'))).not.toContain('px-2.5');
  });
});

describe('Tabs segmented track (G88-O2)', () => {
  it('pads the track 4px and spaces options 4px', () => {
    render(<Tabs variant="segmented" items={[{ id: 'a', label: 'Grid' }, { id: 'b', label: 'List' }]} value="a" onValueChange={() => {}} />);
    const list = screen.getByRole('tablist');
    expect(list.getAttribute('data-tabs-variant')).toBe('segmented');
    expect(classes(list)).toEqual(expect.arrayContaining(['p-1', 'gap-1']));
    expect(classes(list)).not.toContain('p-0.5');
    expect(classes(list)).not.toContain('gap-0.5');
  });
});

describe('FilePickerButton sm (G88-O3)', () => {
  it('is the Button sm height', () => {
    render(<><FilePickerButton size="sm" onFiles={() => {}}>Import</FilePickerButton><Button size="sm">Save</Button></>);
    const height = (el: Element) => classes(el).find((c) => c.startsWith('h-'));
    expect(height(screen.getByTestId('file-picker-button'))).toBe(height(screen.getByRole('button', { name: 'Save' })));
    expect(classes(screen.getByTestId('file-picker-button'))).not.toContain('h-8');
  });
});

describe('MarkdownView md h2 (G88-O4)', () => {
  it('puts 16px above a ## heading', () => {
    render(<MarkdownView markdown={'Intro\n\n## Section\n\nBody'} />);
    const h2 = screen.getByRole('heading', { level: 2, name: 'Section' });
    expect(classes(h2)).toContain('mt-4');
    expect(classes(h2)).not.toContain('mt-5');
  });
});

describe('SettingsLayout / SettingsPage (G88-O5, G119-1)', () => {
  it('SettingsPage: a 20px h1 and no main landmark of its own', () => {
    render(<SettingsPage title="Access" sections={sections} />);
    const h1 = screen.getByRole('heading', { level: 1, name: 'Access' });
    expect(classes(h1)).toEqual(expect.arrayContaining(['text-xl', 'leading-7']));
    expect(h1.getAttribute('data-title-size')).toBe('page');
    expect(screen.queryByRole('main')).toBeNull();
    expect(screen.getByTestId('settings-page-layout-body').tagName).toBe('DIV');
  });

  it('SettingsPage titleSize="panel" and contentAs="main" restore the old title and landmark', () => {
    render(<SettingsPage title="Access" sections={sections} titleSize="panel" contentAs="main" />);
    expect(classes(screen.getByRole('heading', { level: 1 }))).toContain('text-[14px]');
    expect(screen.getByRole('main')).toBe(screen.getByTestId('settings-page-layout-body'));
  });

  it('SettingsLayout keeps its defaults: 14px title, a main body', () => {
    render(<SettingsLayout title="Access" sections={sections} />);
    const title = screen.getAllByText('Access')[0]!;
    expect(classes(title)).toContain('text-[14px]');
    expect(screen.getByRole('main')).toBeTruthy();
  });

  it('SettingsLayout contentAs="section" names a region instead', () => {
    render(<SettingsLayout title="Access" sections={sections} contentAs="section" contentLabel="Access settings" />);
    expect(screen.queryByRole('main')).toBeNull();
    expect(screen.getByRole('region', { name: 'Access settings' })).toBeTruthy();
  });

  it('narrow: 4px subtitle margin and strip gaps; gutter="none" drops the top padding', () => {
    const { container, rerender } = render(<SettingsLayout narrow title="Access" subtitle="Who can open the show" sections={sections} />);
    const head = () => container.querySelector('[data-settings-narrow-title]');
    expect(classes(head())).toContain('pt-3');
    for (const sub of container.querySelectorAll('[data-settings-subtitle]')) {
      expect(classes(sub)).toContain('mt-1');
      expect(classes(sub)).not.toContain('mt-0.5');
    }
    for (const item of screen.getAllByTestId('settings-layout-strip-item')) {
      expect(classes(item)).toContain('gap-1');
      expect(classes(item)).not.toContain('gap-1.5');
    }
    rerender(<SettingsLayout narrow gutter="none" title="Access" sections={sections} />);
    expect(classes(head())).toContain('pt-0');
    expect(container.querySelector('[data-settings-gutter]')?.getAttribute('data-settings-gutter')).toBe('none');
  });

  it('SettingsPage gutter="none" reaches the layout', () => {
    const { container } = render(<SettingsPage narrow gutter="none" title="Access" sections={sections} />);
    expect(container.querySelector('[data-settings-gutter]')?.getAttribute('data-settings-gutter')).toBe('none');
  });
});

describe('T tones (G119-2)', () => {
  it.each([
    ['success', 'text-success-fg', 'text-success'],
    ['warning', 'text-warning-fg', 'text-warning'],
    ['danger', 'text-danger-fg', 'text-danger'],
  ] as const)('%s draws in the text ink', (tone, ink, fill) => {
    render(<T tone={tone}>Saved.</T>);
    const el = screen.getByText('Saved.');
    expect(classes(el)).toContain(ink);
    expect(classes(el)).not.toContain(fill);
  });
});

describe('DataTable actions header (G88-E8)', () => {
  const rows = [{ id: '1', name: 'Pilot' }];
  const columns = [{ key: 'name', header: 'Episode' }];
  it('defaults to the visible "Actions" header', () => {
    render(<DataTable data={rows} columns={columns} keyField={(r) => r.id} rowActions={() => <button type="button">Open</button>} />);
    const th = screen.getByTestId('datatable-actions-header');
    expect(th.getAttribute('data-row-actions-header')).toBe('visible');
    expect(th.textContent).toBe('Actions');
    expect(within(th).queryByText('Actions')?.className ?? '').not.toContain('sr-only');
  });

  it('rowActionsHeaderHidden keeps the name for screen readers only', () => {
    render(<DataTable data={rows} columns={columns} keyField={(r) => r.id} rowActions={() => <button type="button">Open</button>} rowActionsHeaderHidden rowActionsHeader="Row menu" />);
    const th = screen.getByTestId('datatable-actions-header');
    expect(th.getAttribute('data-row-actions-header')).toBe('hidden');
    expect(screen.getByRole('columnheader', { name: 'Row menu' })).toBe(th);
    expect(within(th).getByText('Row menu')).toHaveClass('sr-only');
  });
});

describe('DialogueSegment actions (G88-A1)', () => {
  const actions = [{ id: 'play', label: 'Play line', icon: 'P', onClick: () => {} }];
  it('reserves no padding; the bar overlays the line', () => {
    const { container } = render(<DialogueSegment author="Peb" text="Hi" metadata="Scene 2" actions={actions} />);
    const meta = container.querySelector('[data-dialogue-meta]');
    expect(classes(meta)).not.toContain('pr-24');
    expect(container.querySelector('[data-dialogue-segment]')?.getAttribute('data-dialogue-actions')).toBe('overlay');
    expect(screen.getByRole('button', { name: 'Play line' })).toBeTruthy();
  });

  it('without actions draws no bar', () => {
    const { container } = render(<DialogueSegment author="Peb" text="Hi" />);
    expect(container.querySelector('[data-dialogue-segment]')?.getAttribute('data-dialogue-actions')).toBe('none');
    expect(screen.queryByRole('toolbar')).toBeNull();
  });

  it('reserveActions keeps the old 96px', () => {
    const { container } = render(<DialogueSegment author="Peb" text="Hi" actions={actions} reserveActions />);
    expect(classes(container.querySelector('[data-dialogue-meta]'))).toContain('pr-24');
  });
});

describe('SubjectFrame disclosure test ids (G120-1)', () => {
  it('takes a test id per disclosure, keeping the generated one as the default', () => {
    render(<SubjectFrame title="Toby" data-testid="frame" disclosures={[
      { id: 'brief', title: 'Description', 'data-testid': 'work-brief', children: <p>Text</p> },
      { id: 'links', title: 'Links', children: <p>Links</p> },
    ]} />);
    expect(screen.getByTestId('work-brief')).toBeTruthy();
    expect(screen.queryByTestId('frame-disclosure-brief')).toBeNull();
    expect(screen.getByTestId('frame-disclosure-links')).toBeTruthy();
  });
});

describe('ActionRowList subline (G120-2)', () => {
  it('a string description carries its full text as title', () => {
    const text = 'Directions, requests and saved plans for this episode';
    render(<ActionRowList items={[{ id: 'w', title: 'Work', description: text, href: '#w' }]} />);
    expect(screen.getByTestId('action-row-description').getAttribute('title')).toBe(text);
  });
});

describe('RichChatComposer context remove (G120-3)', () => {
  it('draws the × at the 12px control label size', () => {
    render(<RichChatComposer onSend={() => true} data-testid="composer" layout="medium" responsive="pane" modeControl="menu" mode="chat" onModeChange={() => true}
      modes={['chat', 'agent']} references={[{ id: 'ep', label: 'Episode 01' }]} onRemoveReference={() => {}} />);
    const remove = screen.getByTestId('composer-context-remove');
    expect(classes(remove)).toContain('text-xs');
    expect(classes(remove)).not.toContain('text-[11px]');
  });
});
