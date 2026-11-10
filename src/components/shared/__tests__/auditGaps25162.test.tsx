// 2.516.2 — the Storymaker Studio's ui-dom-audit gaps after 2.516.1
// (G121-B1..B5 the settings rail, G121-1..4, the composer suggestions and
// KeyValue layout="stacked-row"). Each case pins the new default (or prop)
// on the house scales: type 11 / 12 / 14 / 16 / 20 px, spacing on 4px steps.
import { describe, expect, it } from 'vitest';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { SettingsLayout } from '../../layout/SettingsLayout';
import { SettingsPage } from '../SettingsPage';
import { ImageCompare } from '../ImageCompare';
import { TitledFrame } from '../TitledFrame';
import { WorkflowStepper } from '../WorkflowStepper';
import { StatusPill } from '../StatusPill';
import { KeyValue } from '../KeyValue';
import { RichChatComposer } from '../../social/RichChatComposer';

const classes = (el: Element | null) => (el?.getAttribute('class') ?? '').split(/\s+/);
const sections = [
  { id: 'general', label: 'General', description: 'Name and owner', icon: '⚙', content: <p>General form</p> },
  { id: 'members', label: 'Members', description: 'Who can open it', icon: '👥', content: <p>Members form</p> },
];

describe('SettingsLayout rail (G121-B1..B5)', () => {
  it('B1: 4px between items, label and description, icon and label', () => {
    const { container } = render(<SettingsLayout title="Access" sections={sections} />);
    const nav = container.querySelector('[data-settings-rail-items]');
    expect(classes(nav)).toContain('gap-1');
    expect(classes(nav)).not.toContain('gap-0.5');
    for (const item of screen.getAllByTestId('settings-layout-rail-item')) {
      expect(classes(item)).toContain('gap-1');
      expect(classes(item)).not.toContain('gap-0.5');
      expect(classes(item.firstElementChild)).toContain('gap-1');
      expect(classes(item.firstElementChild)).not.toContain('gap-1.5');
    }
  });

  it('B2, B5: 11px descriptions; the selected one in the full primary, no opacity', () => {
    const { container } = render(<SettingsLayout title="Access" sections={sections} />);
    const [selected, other] = Array.from(container.querySelectorAll('[data-settings-rail-description]'));
    for (const d of [selected, other]) {
      expect(classes(d!)).toContain('text-[11px]');
      expect(classes(d!)).not.toContain('text-[10px]');
    }
    expect(classes(selected!)).toContain('text-[var(--color-primary,#4338ca)]');
    expect(classes(selected!)).not.toContain('opacity-80');
  });

  it('B3: gutter="none" drops the wide rail top padding; default keeps 16px', () => {
    const { rerender } = render(<SettingsLayout title="Access" sections={sections} />);
    const rail = () => screen.getByTestId('settings-layout-rail');
    expect(classes(rail())).toContain('pt-4');
    rerender(<SettingsLayout title="Access" sections={sections} gutter="none" />);
    expect(classes(rail())).toContain('pt-0');
    expect(rail().getAttribute('data-rail-gutter')).toBe('none');
  });

  it('B3: SettingsPage gutter="none" reaches the wide rail', () => {
    render(<SettingsPage title="Access" sections={sections} gutter="none" />);
    expect(classes(screen.getByTestId('settings-page-layout-rail'))).toContain('pt-0');
  });

  it('B4: the section is centred by the body, not its own auto margins; sectionAlign="start"', () => {
    const { rerender } = render(<SettingsLayout title="Access" sections={sections} />);
    const section = () => screen.getByTestId('settings-layout-section');
    const body = () => screen.getByTestId('settings-layout-body');
    expect(classes(section())).not.toContain('mx-auto');
    expect(classes(section())).toEqual(expect.arrayContaining(['w-full', 'max-w-3xl']));
    expect(classes(body())).toEqual(expect.arrayContaining(['flex', 'flex-col', 'items-center']));
    rerender(<SettingsLayout title="Access" sections={sections} sectionAlign="start" />);
    expect(classes(body())).toContain('items-start');
    expect(section().getAttribute('data-section-align')).toBe('start');
  });
});

describe('ImageCompare figure (G121-1)', () => {
  it('4px between picture and caption, and between label and description', () => {
    const { container } = render(<ImageCompare images={[{ label: 'Front', description: 'Not drawn yet' }]} />);
    const figure = container.querySelector('figure');
    expect(classes(figure)).toContain('gap-1');
    expect(classes(figure)).not.toContain('gap-1.5');
    expect(classes(container.querySelector('figcaption'))).toContain('gap-1');
    expect(classes(container.querySelector('figcaption'))).not.toContain('gap-0.5');
  });
});

describe('TitledFrame default title (G121-2)', () => {
  it('surface tone defaults to the 12px label; code tone keeps the mono label', () => {
    const { rerender } = render(<TitledFrame title="Pictures" tone="surface">x</TitledFrame>);
    const title = () => screen.getByText('Pictures');
    expect(title().getAttribute('data-titled-frame-title')).toBe('label');
    expect(classes(title())).toContain('text-xs');
    rerender(<TitledFrame title="Pictures">x</TitledFrame>);
    expect(title().getAttribute('data-titled-frame-title')).toBe('mono');
    expect(classes(title())).toContain('text-[10px]');
    rerender(<TitledFrame title="Pictures" tone="surface" titleStyle="mono">x</TitledFrame>);
    expect(title().getAttribute('data-titled-frame-title')).toBe('mono');
  });
});

describe('WorkflowStepper sizes (G121-3)', () => {
  const steps = [{ step: 1, label: 'Concept', done: true, active: false }, { step: 2, label: 'Mesh', done: false, active: true }];
  it.each(['md', 'sm', 'compact'] as const)('%s: 12px labels 4px from the marker', (size) => {
    const { container } = render(<WorkflowStepper steps={steps} size={size} />);
    const label = screen.getByText('Mesh');
    expect(classes(label)).toContain('text-xs');
    expect(classes(label).some((c) => c === 'text-[10px]' || c === 'text-[11px]')).toBe(false);
    for (const head of container.querySelectorAll('[data-workflow-step-head]')) {
      expect(classes(head)).toContain('gap-1');
      expect(classes(head)).not.toContain('gap-1.5');
    }
  });
});

describe('StatusPill md dot gap (G121-4)', () => {
  it.each(['pill', 'text', 'tag'] as const)('%s md: 4px from dot to label', (variant) => {
    render(<StatusPill tone="success" label="Ready" size="md" variant={variant} data-testid="pill" />);
    const pill = screen.getByTestId('pill');
    expect(classes(pill)).toContain('gap-1');
    expect(classes(pill)).not.toContain('gap-1.5');
  });
});

describe('RichChatComposer suggestions', () => {
  it('no block padding; the 20px line carries the height', async () => {
    render(<RichChatComposer onSend={() => true} data-testid="c" layout="wide" suggestions={['Plan the next episode']} onSuggestion={() => {}} />);
    const input = document.querySelector('[data-testid=c] .ProseMirror') as HTMLElement;
    await act(async () => { input.focus(); fireEvent.focusIn(input); });
    const chip = screen.getByRole('button', { name: 'Plan the next episode' });
    expect(chip.getAttribute('data-ui-chip')).toBe('suggestion');
    expect(classes(chip)).toEqual(expect.arrayContaining(['py-0', 'leading-5']));
    expect(classes(chip)).not.toContain('py-0.5');
  });
});

describe('KeyValue layout="stacked-row"', () => {
  it('each item a 12px label above its value, items in one wrapping row', () => {
    render(<KeyValue layout="stacked-row" items={[{ label: 'Started', value: '10:02' }, { label: 'Steps', value: '4 of 6' }]} />);
    const dl = screen.getByTestId('key-value');
    expect(dl.getAttribute('data-layout')).toBe('stacked-row');
    expect(classes(dl)).toEqual(expect.arrayContaining(['flex', 'flex-wrap', 'gap-x-6', 'gap-y-3']));
    const [item] = screen.getAllByTestId('key-value-item');
    expect(classes(item!)).toEqual(expect.arrayContaining(['flex', 'flex-col', 'gap-1']));
    const dt = item!.querySelector('dt');
    expect(classes(dt)).toContain('text-[12px]');
    expect(item!.firstElementChild).toBe(dt);
  });
});
