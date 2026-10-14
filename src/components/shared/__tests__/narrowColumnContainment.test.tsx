// Controls never run past their column (2.446.4). The DOM audit's
// `layout.contained-controls` measures this in a real browser; these pin the
// owning composites' contract so a refactor cannot quietly drop it:
// a tab row and a table scroll inside themselves (the audit's two named
// scrollers), and header actions / a detail readout are capped at their
// header's width and wrap there.
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Tabs } from '../Tabs';
import { PageHeader } from '../PageHeader';
import { DetailHeader } from '../DetailHeader';
import { SegmentedControl } from '../SegmentedControl';
import { PageSection } from '../../ui/PageSection';
import { Table, TableBody, TableRow, TableTd } from '../../ui/Table';

describe('narrow-column containment', () => {
  it('a tab row is capped at its column and scrolls inside itself', () => {
    render(<Tabs aria-label="Views" value="a" onValueChange={() => {}} items={[{ id: 'a', label: 'Overview' }, { id: 'b', label: 'Contributors' }]} variant="underline" indicator="bar" />);
    const row = screen.getByRole('tablist');
    expect(row).toHaveClass('min-w-0', 'max-w-full', 'overflow-x-auto');
    expect(row).toHaveAttribute('data-tab-scroller');
    for (const tab of screen.getAllByRole('tab')) expect(tab).toHaveClass('shrink-0', 'whitespace-nowrap');
  });

  it('a table draws its own horizontal scroller around the <table>', () => {
    render(<Table aria-label="Runs"><TableBody><TableRow><TableTd>row</TableTd></TableRow></TableBody></Table>);
    const scroller = screen.getByRole('table').parentElement!;
    expect(scroller).toHaveAttribute('data-table-scroller');
    expect(scroller).toHaveClass('overflow-x-auto', 'max-w-full', 'min-w-0');
  });

  it('PageHeader actions are capped at the header width and wrap', () => {
    render(<PageHeader title="Compaction activity" actions={<button type="button">Compact L1 → L2</button>} />);
    const actions = screen.getByRole('button', { name: 'Compact L1 → L2' }).parentElement!;
    expect(actions).toHaveClass('max-w-full', 'min-w-0', 'flex-wrap');
    // The title's cluster wraps its badge under the title instead of squeezing it.
    expect(screen.getByRole('heading', { level: 1 }).parentElement).toHaveClass('flex-wrap');
  });

  it('PageSection wraps its header row and caps the actions', () => {
    render(<PageSection title="Runs" description="Live" actions={<button type="button">Search</button>}><p>body</p></PageSection>);
    const actions = screen.getByRole('button', { name: 'Search' }).parentElement!;
    expect(actions).toHaveClass('max-w-full', 'flex-wrap');
    expect(actions.parentElement).toHaveClass('flex-wrap');
  });

  it('DetailHeader keeps asideWidth as a preference capped at the header width', () => {
    const { container } = render(<DetailHeader title="prompt" aside={<span>readout</span>} asideWidth={420} />);
    const aside = container.querySelector('[data-detail-aside]') as HTMLElement;
    expect(aside.style.width).toBe('420px');
    expect(aside).toHaveClass('max-w-full');
  });

  it('a segment label never breaks across lines', () => {
    render(<SegmentedControl aria-label="Activity view" value="runs" onChange={() => {}} options={[{ value: 'runs', label: 'Runs' }, { value: 'graph', label: 'Tier graph' }]} />);
    expect(screen.getByRole('radio', { name: 'Tier graph' })).toHaveClass('whitespace-nowrap');
  });
});
