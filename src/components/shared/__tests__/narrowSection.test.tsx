// 2.515.5 (voice lane): the narrow forms a phone needs on a sectioned page —
// the section rail's one-row strip, the list rail's narrow form through
// SectionLayout, the header's folding tabs — and the copy-id control.
import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { SubNavLayout } from '../SubNavLayout';
import { SectionLayout } from '../SectionLayout';
import { PageHeader } from '../PageHeader';
import { CopyIdButton } from '../CopyIdButton';

const items = [
  { path: '/budgets', label: 'Initiatives', count: 14 },
  { path: '/budgets?report=sprints', label: 'Sprints', count: 19 },
];

describe('SubNavLayout narrow', () => {
  it('is its own size container: the rails hide under 40rem and their items become one scrolling row', () => {
    const { container } = render(
      <SubNavLayout title="Budgets" items={items} secondaryItems={[{ path: '/x', label: 'Extra' }]} narrow>
        <p>content</p>
      </SubNavLayout>,
    );
    expect(container.querySelector('[data-subnav-container]')!.className).toContain('@container');
    const strip = container.querySelector('[data-subnav-strip]')!;
    expect(strip.tagName).toBe('NAV');
    expect(strip.className).toContain('@min-[40rem]:hidden');
    expect(strip.className).toContain('overflow-x-auto');
    expect(within(strip as HTMLElement).getAllByTestId('subnav-item-label').map((n) => n.textContent)).toEqual(['Initiatives', 'Sprints', 'Extra']);
    // Both rails give the content the width under 40rem.
    const rails = container.querySelectorAll('aside');
    expect(rails).toHaveLength(2);
    rails.forEach((rail) => expect(rail.className).toContain('@max-[40rem]:hidden'));
    expect(container.querySelector('[data-subnav-narrow]')!.className).toContain('@max-[40rem]:flex-col');
    expect(screen.getByText('content')).toBeTruthy();
  });

  it('without narrow, or with a tree in the rail, nothing changes', () => {
    const plain = render(<SubNavLayout title="Budgets" items={items}><p>a</p></SubNavLayout>);
    expect(plain.container.querySelector('[data-subnav-strip]')).toBeNull();
    expect(plain.container.querySelector('[data-subnav-container]')).toBeNull();
    plain.unmount();
    const tree = render(<SubNavLayout title="Docs" items={items} railContent={<div>tree</div>} narrow><p>b</p></SubNavLayout>);
    expect(tree.container.querySelector('[data-subnav-strip]')).toBeNull();
    expect(tree.container.querySelector('aside')!.className).not.toContain('@max-[40rem]:hidden');
  });
});

describe('SectionLayout narrow', () => {
  const list = { label: 'initiatives', title: 'Initiatives', body: <ul><li>Auth Migration</li></ul> };

  it('hands the strip to the section rail and the narrow form to the list rail', () => {
    const onBack = vi.fn();
    const { container } = render(
      <SectionLayout title="Budgets" items={items} fill="parent" list={list} header={{ title: 'All spend' }}
        narrow={{ list: { showing: 'record', onBack, backLabel: 'All initiatives' } }}>
        <p>table</p>
      </SectionLayout>,
    );
    expect(container.querySelector('[data-subnav-strip]')).toBeTruthy();
    expect(container.querySelector('[data-narrow="record"]')).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: /All initiatives/ }));
    expect(onBack).toHaveBeenCalled();
  });

  it('an empty narrow is the section strip alone; omitted, neither', () => {
    const strip = render(<SectionLayout title="Budgets" items={items} fill="parent" list={list} header={{ title: 'x' }} narrow={{}}><p>t</p></SectionLayout>);
    expect(strip.container.querySelector('[data-subnav-strip]')).toBeTruthy();
    expect(strip.container.querySelector('[data-narrow]')).toBeNull();
    strip.unmount();
    const none = render(<SectionLayout title="Budgets" items={items} fill="parent" header={{ title: 'x' }}><p>t</p></SectionLayout>);
    expect(none.container.querySelector('[data-subnav-strip]')).toBeNull();
  });
});

describe('PageHeader tabsOverflowBelow', () => {
  it('passes the fold to its tabs', () => {
    render(<PageHeader title="Observability Platform" tabs={[{ id: 'a', label: 'Overview' }, { id: 'b', label: 'Work' }]} tabsOverflowBelow={560} data-testid="ph" />);
    expect(screen.getByTestId('ph-tabs').getAttribute('data-folded')).not.toBeNull();
  });

  it('omitted, the tabs never fold', () => {
    render(<PageHeader title="Observability Platform" tabs={[{ id: 'a', label: 'Overview' }]} data-testid="ph2" />);
    expect(screen.getByTestId('ph2-tabs').getAttribute('data-folded')).toBeNull();
  });
});

describe('CopyIdButton', () => {
  it('keeps the id out of the text, copies it, and acknowledges', async () => {
    const writeText = vi.fn(async () => {});
    Object.assign(navigator, { clipboard: { writeText } });
    render(<p>obs-nightly-maintenance <CopyIdButton value="bot:32970d0a" label="Copy the bot's id" /></p>);
    expect(screen.queryByText('bot:32970d0a')).toBeNull();
    const button = screen.getByRole('button', { name: "Copy the bot's id" });
    expect(button.getAttribute('data-copy-id')).toBe('bot:32970d0a');
    await act(async () => { fireEvent.click(button); });
    expect(writeText).toHaveBeenCalledWith('bot:32970d0a');
    expect(screen.getByRole('button', { name: "Copy the bot's id: copied" })).toBeTruthy();
  });
});
