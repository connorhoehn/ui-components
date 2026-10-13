// Controls read at 12 or 14px (the app scale; the DOM audit's control rule).
// Each block is a failing/valid pair from the 2026-10-12 orgiq audit: the
// shape the audit flagged must now be on the scale, and the neighbouring
// non-control shape must keep its own hierarchy (2.441.2).
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { StatStrip } from '../StatStrip';
import { ChoiceRow } from '../ChoiceList';
import { Textarea } from '../../forms/Textarea';
import { SourceCard } from '../../work/SourceCard';
import { ScopeHeader } from '../../work/ScopeHeader';
import { Breadcrumbs } from '../Breadcrumbs';
import { Button } from '../../ui/Button';
import { CodeBlock } from '../CodeBlock';
import { SegmentedControl } from '../SegmentedControl';
import { GroupedList } from '../GroupedList';
import { FileUploadDrop } from '../FileUploadDrop';

afterEach(cleanup);

const OFF_SCALE = /text-\[(9|10|11|13|15|16|17)px\]/;

describe('StatStrip card variant', () => {
  const tiers = (clickable: boolean) => [
    { label: 'Raw', value: 120, hint: 'today', ...(clickable ? { onSelect: () => {} } : {}) },
    { label: 'Distilled', value: 14, hint: 'kept', ...(clickable ? { onSelect: () => {} } : {}), status: { label: 'Healthy', tone: 'success' as const } },
  ];

  it('flagged: a clickable item (a button) draws value 14/600, label and hint 12/400', () => {
    render(<StatStrip items={tiers(true)} connectors={[{ label: '12%' }]} data-testid="tier-flow" />);
    const button = screen.getAllByRole('button')[0];
    expect(button.innerHTML).not.toMatch(OFF_SCALE);
    expect(screen.getByText('120').className).toContain('text-sm');
    expect(screen.getByText('120').className).toContain('font-semibold');
    expect(screen.getByText('Raw').className).toContain('text-xs');
    expect(screen.getByText('Raw').className).toContain('font-normal');
    expect(screen.getByText('today').className).toContain('text-xs');
    // Connectors and per-tier status still draw.
    expect(screen.getByTestId('stat-strip-connector')).toBeInTheDocument();
    expect(screen.getByTestId('stat-strip-status')).toHaveTextContent('Healthy');
  });

  it('valid: a read-only card keeps its large figure under the caption', () => {
    render(<StatStrip items={tiers(false)} />);
    expect(screen.queryByRole('button')).toBeNull();
    expect(screen.getByText('120').className).toContain('text-[17px]');
    expect(screen.getByText('Raw').className).toContain('text-[10px]');
  });
});

describe('ChoiceRow', () => {
  it('flagged: the title was 13px; it is 14/500 with a 12px description', () => {
    render(<ChoiceRow title="Supervisor system prompt" description="Edited 2h ago" onSelect={() => {}} data-testid="prompt-row" />);
    const button = screen.getByTestId('prompt-row-button');
    expect(button.innerHTML).not.toMatch(OFF_SCALE);
    expect(screen.getByText('Supervisor system prompt').className).toContain('text-sm');
    expect(screen.getByText('Supervisor system prompt').className).toContain('font-medium');
    expect(screen.getByText('Edited 2h ago').className).toContain('text-xs');
  });
});

describe('Textarea', () => {
  it('flagged: the default was 13px; it is the 14px text-control step', () => {
    render(<Textarea aria-label="Note" data-testid="review-note" />);
    const area = screen.getByTestId('review-note');
    expect(area.className).not.toMatch(OFF_SCALE);
    expect(area.className).toContain('text-sm');
  });

  it('valid: a host size class still wins over the default', () => {
    render(<Textarea aria-label="Note" className="text-xs" data-testid="small" />);
    expect(screen.getByTestId('small').className).toContain('text-xs');
    expect(screen.getByTestId('small').className).not.toContain('text-sm');
  });
});

describe('SourceCard', () => {
  it.each(['card', 'row'] as const)('flagged: the %s title inside a control was 13px; it is 14/500', (layout) => {
    render(<SourceCard id="cl-019" title="Cold start runbook" layout={layout} onOpen={() => {}} />);
    const button = screen.getAllByRole('button')[0];
    expect(button.outerHTML).not.toMatch(OFF_SCALE);
    const title = layout === 'row' ? screen.getByTestId('source-card-cl-019-title') : button;
    expect(title.className).toContain('text-sm');
    expect(title.className).toContain('font-medium');
  });
});

describe('ScopeHeader tabs at md (2.441.3)', () => {
  it('flagged: tabSize="md" and titleSize="lg" tabs were 15px; every step is 14px', () => {
    const tabs = [{ id: 'o', label: 'Overview' }];
    const { rerender } = render(<ScopeHeader title="Obs" tabs={tabs} tabSize="md" />);
    expect(screen.getByRole('tab').className).toContain('text-sm');
    rerender(<ScopeHeader title="Obs" tabs={tabs} titleSize="lg" />);
    expect(screen.getByRole('tab').className).not.toMatch(OFF_SCALE);
  });
});

describe('ScopeHeader tabs', () => {
  // The 13px measured on /iq/projects/:id?item=… comes from the portal's
  // app.css (`[data-testid="work-item-header"] [role="tab"] { font-size: 13px }`),
  // not from here: the library draws every ScopeHeader tab size on the scale.
  it.each([undefined, 'sm'] as const)('valid: tabSize=%s labels are 14px', (tabSize) => {
    render(<ScopeHeader title="Work item" tabs={[{ id: 'brief', label: 'Brief' }, { id: 'docs', label: 'Docs' }]} activeTab="brief"
      onTabChange={() => {}} {...(tabSize ? { tabSize } : {})} data-testid="work-item-header" />);
    const tab = screen.getByTestId('work-item-header-tab-brief');
    expect(tab.className).not.toContain('text-[13px]');
    expect(tab.className).toContain('text-sm');
  });
});

describe('Breadcrumbs size="sm" (2.441.3)', () => {
  it('flagged: crumb buttons were 13px; the sm step is the 12px meta step', () => {
    render(<Breadcrumbs size="sm" lastIsCurrent={false} items={[{ label: 'Rules', onClick: () => {} }, { label: 'Scoring', onClick: () => {} }]} data-testid="document-shell-path-crumbs" />);
    const crumbs = screen.getByTestId('document-shell-path-crumbs');
    expect(crumbs.innerHTML).not.toMatch(OFF_SCALE);
    const buttons = crumbs.querySelectorAll('button');
    expect(buttons.length).toBeGreaterThan(0);
    for (const b of buttons) expect(b.className).toContain('text-xs');
  });
  it('valid: md stays 14px', () => {
    render(<Breadcrumbs lastIsCurrent={false} items={[{ label: 'Rules', onClick: () => {} }]} data-testid="c" />);
    expect(screen.getByTestId('c').querySelector('button')!.className).toContain('text-sm');
  });
});

describe('Button variant="link" (2.441.3)', () => {
  it('flagged: a sized link inherited the page 16px; it draws its size (sm 12, md 14)', () => {
    render(<><Button variant="link" size="sm">View all</Button><Button variant="link" size="md">Open this guide</Button></>);
    expect(screen.getByRole('button', { name: 'View all' }).className).toContain('text-xs');
    expect(screen.getByRole('button', { name: 'Open this guide' }).className).toContain('text-sm');
  });
  it('valid: an unsized link stays inline prose and inherits; a host class still wins', () => {
    render(<><Button variant="link">Cancel</Button><Button variant="link" size="sm" className="text-sm">Points</Button></>);
    expect(screen.getByRole('button', { name: 'Cancel' }).className).not.toMatch(/\btext-(xs|sm)\b/);
    expect(screen.getByRole('button', { name: 'Points' }).className).toContain('text-sm');
    expect(screen.getByRole('button', { name: 'Points' }).className).not.toContain('text-xs');
  });
});

describe('CodeBlock copy button (2.441.3)', () => {
  it('flagged: the copy button was 11px monospace; it is 12px in the page face, the code stays mono', () => {
    const { container } = render(<CodeBlock code="const a = 1;" language="ts" copyButton />);
    const button = screen.getByRole('button', { name: 'Copy code' });
    expect(button.className).toContain('text-xs');
    expect(button.className).not.toMatch(OFF_SCALE);
    // No monospace ancestor for the button to inherit; the <pre> carries it.
    expect(button.closest('.font-mono')).toBeNull();
    expect(container.querySelector('pre')!.className).toContain('font-mono');
  });
});

describe('SegmentedControl tone="accent" (2.441.3)', () => {
  it('flagged: accent segments were 15px; they are 14px', () => {
    render(<SegmentedControl tone="accent" options={[{ value: 'all', label: 'All' }, { value: 'claims', label: 'Claims' }]} value="all" onChange={() => {}} data-testid="dimension-rail-filter" />);
    const seg = screen.getByTestId('dimension-rail-filter-all');
    expect(seg.className).toContain('text-sm');
    expect(seg.className).not.toContain('text-[15px]');
  });
});

describe('GroupedList plain group count (2.441.3)', () => {
  it('flagged: the count in a group header button was 13px; it is 12px', () => {
    render(<GroupedList groups={[{ id: 'claims', title: 'Claims', count: 4 }]} rows={[]} groupCountStyle="plain" data-testid="dimension-rail" />);
    const count = screen.getByTestId('dimension-rail-group-count-claims');
    expect(count.className).toContain('text-xs');
    expect(count.className).not.toContain('text-[13px]');
  });
});

describe('FileUploadDrop dashed drop target (2.441.3)', () => {
  it('valid: the drop target carries the dropzone marker and hosts no nested control', () => {
    render(<FileUploadDrop onFiles={() => {}} />);
    const zone = screen.getByRole('button', { name: 'File upload drop zone' });
    expect(zone).toHaveAttribute('data-ui-dropzone');
    expect(zone.className).toContain('border-dashed');
    expect(zone.querySelector('button, input, select, textarea, [role="button"]')).toBeNull();
  });
  it('flagged shape: an ordinary Button never carries the marker', () => {
    render(<Button variant="secondary">Browse</Button>);
    expect(screen.getByRole('button', { name: 'Browse' })).not.toHaveAttribute('data-ui-dropzone');
  });
});
