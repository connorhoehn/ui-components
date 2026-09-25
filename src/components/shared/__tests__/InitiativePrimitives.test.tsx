// 2.390.0 — the Initiatives redesign's additions to shared/ components. Each
// prop is additive; the "default" cases pin what an unchanged caller renders.
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Banner from '../Banner';
import { StatStrip } from '../StatStrip';
import { KeyValue } from '../KeyValue';
import EmptyState from '../EmptyState';
import { GroupedList } from '../GroupedList';
import { DetailSection } from '../DetailSection';
import { Disclosure as SharedDisclosure } from '..';
import { Disclosure } from '../../ui/Disclosure';

afterEach(cleanup);

describe('Banner callout (2.390.0)', () => {
  it('accent="bar" adds the 3px tone bar on the left edge', () => {
    render(<Banner layout="callout" variant="warning" accent="bar" data-testid="b" title="T">Body</Banner>);
    const el = screen.getByTestId('b');
    expect(el.getAttribute('data-accent')).toBe('bar');
    expect(el.className).toContain('border-l-[3px]');
    expect(el.className).toContain('border-l-warning');
  });

  it('accent defaults to none', () => {
    render(<Banner layout="callout" variant="warning" data-testid="b">Body</Banner>);
    expect(screen.getByTestId('b').className).not.toContain('border-l-[3px]');
  });

  it('meta draws a third line under the body', () => {
    render(<Banner layout="callout" variant="warning" data-testid="b" title="T" meta="Blocked · Eli Garcia · 2 points">Body</Banner>);
    expect(screen.getByTestId('b-meta').textContent).toBe('Blocked · Eli Garcia · 2 points');
  });

  it('size="lg" is the 17px title over a 15px body, action on the title line', () => {
    render(<Banner layout="callout" variant="warning" size="lg" data-testid="b" title="Next step" action={<button type="button">Open</button>}>Body</Banner>);
    const el = screen.getByTestId('b');
    expect(el.getAttribute('data-size')).toBe('lg');
    expect(el.className).toContain('items-start');
    expect(screen.getByText('Next step').className).toContain('text-[17px]');
    expect(screen.getByText('Body').className).toContain('text-[15px]');
  });

  it('size defaults to md (14px title, centred action)', () => {
    render(<Banner layout="callout" variant="warning" data-testid="b" title="T">Body</Banner>);
    expect(screen.getByTestId('b').className).toContain('items-center');
    expect(screen.getByText('T').className).toContain('text-sm');
  });
});

describe('StatStrip (2.390.0)', () => {
  const items = [
    { label: '/ 52 points delivered', value: 18, progress: { value: 18, max: 52 } },
    { label: 'agents running', value: 2 },
  ];

  it('variant="inline" puts the value before its label on one line, no card', () => {
    render(<StatStrip variant="inline" items={items} data-testid="s" />);
    const strip = screen.getByTestId('s');
    expect(strip.getAttribute('data-variant')).toBe('inline');
    expect(strip.className).not.toContain('rounded-lg');
    expect(strip.className).toContain('divide-x');
    const first = within(strip).getAllByTestId('stat-strip-cluster')[0]!;
    expect(first.textContent).toBe('18/ 52 points delivered');
  });

  it('progress draws a bar with the value and max', () => {
    render(<StatStrip variant="inline" items={items} />);
    const bar = screen.getByRole('progressbar');
    expect(bar.getAttribute('aria-valuenow')).toBe('18');
    expect(bar.getAttribute('aria-valuemax')).toBe('52');
    expect(screen.getAllByTestId('stat-strip-progress')).toHaveLength(1);
  });

  it('progress with no max above zero draws nothing', () => {
    render(<StatStrip items={[{ label: 'x', value: 1, progress: { value: 1, max: 0 } }]} />);
    expect(screen.queryByRole('progressbar')).toBeNull();
  });

  it('progress also works on the default variant, which is unchanged', () => {
    render(<StatStrip items={items} data-testid="s" />);
    expect(screen.getByTestId('s').className).toContain('rounded-lg');
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
});

describe('KeyValue (2.390.0)', () => {
  const items = [
    { label: 'Acceptance criteria', value: 'Not defined yet', muted: true, action: <button type="button">Draft with agent</button> },
    { label: 'Planning notes', value: '2 notes' },
  ];

  it('item.action renders at the row end', () => {
    render(<KeyValue items={items} />);
    expect(screen.getByTestId('key-value-action').textContent).toBe('Draft with agent');
    expect(screen.getAllByTestId('key-value-action')).toHaveLength(1);
  });

  it('item.muted paints the value tertiary', () => {
    render(<KeyValue items={items} />);
    expect(screen.getByText('Not defined yet').className).toContain('text-text-tertiary');
    expect(screen.getByText('2 notes').className).toContain('text-text-primary');
  });

  it('divided rules every row', () => {
    render(<KeyValue items={items} divided />);
    const dl = screen.getByTestId('key-value');
    expect(dl.getAttribute('data-divided')).toBe('true');
    expect(dl.className).toContain('border-t');
    for (const row of screen.getAllByTestId('key-value-item')) expect(row.className).toContain('border-b');
  });

  it('divided defaults off', () => {
    render(<KeyValue items={items} />);
    expect(screen.getByTestId('key-value').getAttribute('data-divided')).toBeNull();
  });
});

describe('EmptyState (2.390.0)', () => {
  it('align="start" is left-aligned with no minimum height', () => {
    render(<EmptyState title="Nothing linked yet" align="start" description="Try Everyone." />);
    const el = screen.getByTestId('empty-state');
    expect(el.getAttribute('data-align')).toBe('start');
    expect(el.className).toContain('items-start');
    expect(el.className).not.toContain('min-h-[220px]');
  });

  it('align defaults to the centred block', () => {
    render(<EmptyState title="x" />);
    expect(screen.getByTestId('empty-state').className).toContain('min-h-[220px]');
  });

  it('size="lg" is the 24px bold heading', () => {
    render(<EmptyState title="No initiatives are linked to you yet." size="lg" align="start" />);
    expect(screen.getByText('No initiatives are linked to you yet.').className).toContain('text-[24px]');
  });

  it('actionsDirection="row" lays actions side by side', () => {
    render(
      <EmptyState
        title="x"
        actionsDirection="row"
        actions={[{ label: 'Browse all initiatives', onClick: () => {} }, { label: 'Check profile', onClick: () => {} }]}
      />,
    );
    const list = screen.getByTestId('empty-state-actions');
    expect(list.getAttribute('data-direction')).toBe('row');
    expect(list.className).toContain('flex-row');
  });

  it('actionsDirection defaults to column', () => {
    render(<EmptyState title="x" actions={[{ label: 'A', onClick: () => {} }]} />);
    expect(screen.getByTestId('empty-state-actions').className).toContain('flex-col');
  });

  it('an action variant="link" is text, not a box', () => {
    const onClick = vi.fn();
    render(<EmptyState title="x" actions={[{ label: 'Show everyone →', variant: 'link', onClick }]} />);
    const btn = screen.getByRole('button', { name: 'Show everyone →' });
    expect(btn.className).toContain('text-primary');
    expect(btn.className).not.toContain('rounded-lg');
    fireEvent.click(btn);
    expect(onClick).toHaveBeenCalled();
  });

  it('details draws a ruled "how this works" block with its action', () => {
    const onRefresh = vi.fn();
    render(
      <EmptyState
        title="x"
        details={{ title: 'How this view works', body: 'An initiative appears here when…', action: { label: 'Refresh this view', onClick: onRefresh } }}
      />,
    );
    const block = screen.getByTestId('empty-state-details');
    expect(block.className).toContain('border-t');
    expect(within(block).getByText('How this view works')).toBeInTheDocument();
    fireEvent.click(within(block).getByRole('button', { name: 'Refresh this view' }));
    expect(onRefresh).toHaveBeenCalled();
  });

  it('details are not drawn at compact density', () => {
    render(<EmptyState title="x" density="compact" details={{ title: 'How' }} />);
    expect(screen.queryByTestId('empty-state-details')).toBeNull();
  });
});

describe('GroupedList groupCountStyle (2.390.0)', () => {
  const groups = [{ id: 'g', title: 'In progress', count: 9 }];
  const rows = [{ id: 'r', groupId: 'g', title: 'Row' }];

  it('plain draws the count as muted text, not a chip', () => {
    render(<GroupedList groups={groups} rows={rows} groupCountStyle="plain" />);
    const count = screen.getByTestId('grouped-list-group-count-g');
    expect(count.getAttribute('data-count-style')).toBe('plain');
    expect(count.textContent).toBe('9');
  });

  it('defaults to the chip', () => {
    render(<GroupedList groups={groups} rows={rows} />);
    expect(screen.getByTestId('grouped-list-group-count-g').getAttribute('data-count-style')).toBeNull();
  });
});

describe('DetailSection heading (2.390.0)', () => {
  it('size="lg" is the 19px section heading', () => {
    render(<DetailSection variant="heading" size="lg" title="Plan next" data-testid="d">x</DetailSection>);
    expect(screen.getByTestId('d').getAttribute('data-size')).toBe('lg');
    expect(screen.getByRole('heading', { name: 'Plan next' }).className).toContain('text-[19px]');
  });

  it('description draws a line under the heading', () => {
    render(<DetailSection variant="heading" title="Complete the brief" description="Add enough detail." data-testid="d">x</DetailSection>);
    expect(screen.getByTestId('d-description').textContent).toBe('Add enough detail.');
  });

  it('defaults are unchanged (16px, no description)', () => {
    render(<DetailSection variant="heading" title="Outcome" data-testid="d">x</DetailSection>);
    expect(screen.getByRole('heading', { name: 'Outcome' }).className).toContain('text-base');
    expect(screen.queryByTestId('d-description')).toBeNull();
  });
});

describe('Disclosure (2.390.0)', () => {
  it('is exported from /shared as the same component', () => {
    expect(SharedDisclosure).toBe(Disclosure);
  });

  it('hint draws muted text after the summary', () => {
    render(<Disclosure summary="Run setup" hint="SME or release manager required to dispatch">body</Disclosure>);
    expect(screen.getByTestId('disclosure-hint').textContent).toBe('SME or release manager required to dispatch');
    expect(screen.getByTestId('disclosure-summary').textContent).toContain('Run setup');
  });

  it('size="lg" is a heading-sized summary', () => {
    render(<Disclosure summary="Run setup" size="lg" variant="plain">body</Disclosure>);
    expect(screen.getByTestId('disclosure').getAttribute('data-size')).toBe('lg');
    expect(screen.getByText('Run setup').className).toContain('text-[19px]');
  });

  it('defaults: no hint, md summary', () => {
    render(<Disclosure summary="S">body</Disclosure>);
    expect(screen.queryByTestId('disclosure-hint')).toBeNull();
    expect(screen.getByTestId('disclosure').getAttribute('data-size')).toBeNull();
  });
});
