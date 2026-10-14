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
import { WorkListView } from '../../work/WorkListView';
import { ComposerReferences } from '../../social/ComposerReferences';
import { SpeakerNotes } from '../../doc-editor/presentation/SpeakerNotes';
import { RadioGroup } from '../../forms/RadioGroup';
import { SlideSources } from '../../doc-editor/presentation/SlideSources';
import { Filmstrip } from '../../doc-editor/presentation/Filmstrip';
import { SortableSlideList } from '../../doc-editor/presentation/SortableSlideList';
import { PageHeader } from '../PageHeader';
import { CollectionPage } from '../CollectionPage';
import { CollectionToolbar } from '../CollectionToolbar';
import { DensityProvider } from '../Density';
import { FormWizard } from '../FormWizard';
import { Combobox } from '../Combobox';
import FormField from '../FormField';
import { act, fireEvent } from '@testing-library/react';

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

describe('WorkListView embedded rail (2.441.4)', () => {
  const groups = [{ id: 'next', title: 'Next up' }];
  const items = [{ id: 's4', groupId: 'next', title: 'Decommission legacy StatsD bridge', points: 5, owner: { id: 'lh', name: 'Layla Hassan' }, kindLabel: 'Story' }];
  const sortOptions = [{ value: 'rank', label: 'Rank' }, { value: 'points', label: 'Points' }];
  it.each(['select', 'menu'] as const)('flagged: meta 13px, %s sort 15px, group count 10px; now 12, 14, 12', (sortStyle) => {
    render(<WorkListView groups={groups} items={items} query="" onQueryChange={() => {}} metaStyle="text" chrome="embedded"
      sortOptions={sortOptions} sort="rank" onSortChange={() => {}} sortStyle={sortStyle} data-testid="initiative-work-rail" />);
    const meta = screen.getByTestId('initiative-work-rail-groups-row-meta-s4');
    expect(meta.className).toContain('text-xs');
    expect(meta.className).not.toContain('text-[13px]');
    const sort = screen.getByTestId('initiative-work-rail-toolbar-sort');
    expect(sort.className).toContain('text-sm');
    expect(sort.className).not.toContain('text-[15px]');
    const count = screen.getByTestId('initiative-work-rail-groups-group-count-next');
    expect(count.className).toContain('text-[12px]');
    expect(count.className).not.toContain('text-[10px]');
    // The row title stays on the rail-item profile.
    expect(screen.getByText('Decommission legacy StatsD bridge')).toHaveAttribute('data-ui-text', 'rail-item');
  });
  it('flagged: GroupedList md group headings were 15px; they are 14/600', () => {
    render(<GroupedList size="md" groups={[{ id: 'g', title: 'In progress' }]} rows={[]} data-testid="gl" />);
    const heading = screen.getByRole('button', { name: /In progress/ });
    expect(heading.className).toContain('text-sm');
    expect(heading.className).not.toContain('text-[15px]');
  });
});

describe('ComposerReferences xs menu trigger (2.441.4)', () => {
  it('flagged: the xs menu trigger was 11px; it is 12px', () => {
    render(<ComposerReferences references={[{ id: 'g', label: 'This guide', menu: [{ items: [{ label: 'This guide + sources', onSelect: () => {} }] }] }]} data-testid="rich-chat-composer-references" />);
    const trigger = screen.getByTestId('rich-chat-composer-references-menu-trigger');
    expect(trigger.className).toContain('text-xs');
    expect(trigger.className).not.toContain('text-[11px]');
  });
});

describe('PresentationEditor parts (2.441.7)', () => {
  const slide = (id: string, title: string) => ({ id, layout: 'bullets' as const, title, sources: [{ documentId: 'd1', title: 'Doc' }] });

  it('flagged: the speaker-notes textarea passed its own 13px; it is the 14px Textarea default', () => {
    render(<SpeakerNotes value="Say this" onChange={() => {}} data-testid="deck-editor-slide-notes" />);
    const notes = screen.getByTestId('deck-editor-slide-notes');
    expect(notes.className).toContain('text-sm');
    expect(notes.className).not.toContain('text-[13px]');
  });

  it('flagged: an already-added source option labelled "added" at 10px; it is 12px', () => {
    render(<SlideSources sources={[{ documentId: 'd1', title: 'Doc' }]} onChange={() => {}} options={[{ documentId: 'd1', title: 'Doc' }]} testIdPrefix="deck-editor-slide" />);
    const option = screen.getByTestId('deck-editor-slide-source-option-d1');
    expect(option.innerHTML).not.toMatch(OFF_SCALE);
    expect(screen.getByText('added').className).toContain('text-xs');
  });

  it('flagged: the drag handle glyph was 11px; it is 12px', () => {
    render(<SortableSlideList items={[{ slide: slide('title', 'Title'), uncited: false }, { slide: slide('two', 'Two'), uncited: false }]} selectedId="title"
      onSelect={() => {}} onMove={() => {}} onDuplicate={() => {}} onDelete={() => {}} canDuplicate testIdPrefix="deck-editor-slide" />);
    const handle = screen.getByTestId('deck-editor-slide-drag-handle-title');
    expect(handle.className).toContain('text-xs');
    expect(handle.className).not.toContain('text-[11px]');
  });

  it('flagged: "Add slide" had a dashed border; it is the solid secondary button', () => {
    render(<Filmstrip items={[{ slide: slide('title', 'Title'), uncited: false }]} selectedId="title" onSelect={() => {}} onMove={() => {}}
      onDuplicate={() => {}} onDelete={() => {}} onAdd={() => {}} canAdd testIdPrefix="deck-editor-slide" />);
    const add = screen.getByTestId('deck-editor-slide-add');
    expect(add.className).not.toContain('border-dashed');
    expect(add).toHaveAttribute('data-variant', 'secondary');
    expect(add).not.toHaveAttribute('data-ui-dropzone');
  });
});

// 2.441.8: the compact header form demoted the page title to 14/600, so every
// CollectionPage (and every page passing density="compact") lost its 20/600
// title. Density is spacing; the title is 20/600 unless the host asks for sm.
describe('page titles under the compact density', () => {
  it('flagged: CollectionPage inside a compact provider renders an h1 at 20/600', () => {
    render(<DensityProvider density="compact"><CollectionPage title="Catalog"><p>rows</p></CollectionPage></DensityProvider>);
    const h1 = screen.getByRole('heading', { level: 1, name: 'Catalog' });
    expect(h1.className).toContain('text-xl');
    expect(h1.className).toContain('font-semibold');
    expect(screen.getByTestId('page-header')).toHaveAttribute('data-density', 'compact');
  });
  it('flagged: PageHeader density="compact" keeps the 20/600 title on its one 28px row', () => {
    render(<DensityProvider density="compact"><PageHeader density="compact" title="Runs" /></DensityProvider>);
    const h1 = screen.getByRole('heading', { level: 1, name: 'Runs' });
    expect(h1.className).toContain('text-xl');
    expect(h1.className).toContain('leading-7');
    expect(screen.getByTestId('page-header-row').className).toContain('h-7');
  });
  it('valid: an explicit size="sm" still renders the 14/600 compact title', () => {
    render(<PageHeader density="compact" size="sm" title="Runs" />);
    const h1 = screen.getByRole('heading', { level: 1, name: 'Runs' });
    expect(h1.className).toContain('text-sm');
    expect(h1.className).not.toContain('text-xl');
  });
  it('valid: the comfortable form is unchanged (20px h1)', () => {
    render(<PageHeader title="Runs" />);
    expect(screen.getByRole('heading', { level: 1, name: 'Runs' }).className).toContain('text-xl');
  });
});

describe('CollectionToolbar Filters popover focus (2.441.8)', () => {
  it('Escape returns focus to the Filters button even when the opening press did not focus it', async () => {
    render(<CollectionToolbar label="Catalog" filters={[{ id: 'kind', label: 'Kind', value: '', options: [{ value: '', label: 'All' }, { value: 'a', label: 'A' }], onChange: () => {} }]} />);
    const trigger = screen.getByRole('button', { name: 'Filters' });
    // A pointer press that leaves focus on <body> (jsdom's click, Safari).
    expect(document.activeElement).toBe(document.body);
    fireEvent.click(trigger);
    expect(await screen.findByRole('dialog')).toBeInTheDocument();
    await act(async () => { await Promise.resolve(); });
    act(() => { fireEvent.keyDown(document.activeElement ?? document.body, { key: 'Escape' }); });
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(document.activeElement).toBe(trigger);
  });
});

describe('RadioGroup option labels on the 12/14 scale (2.442.2)', () => {
  it('flagged before: an option label at 13px and its description at 11px; now 14 (text-sm) and 12 (text-xs)', () => {
    render(<RadioGroup name="who" aria-label="Who is it for?" value="self" onChange={() => {}}
      options={[{ value: 'self', label: 'Myself', description: 'Approvers may request on behalf of a report.' }, { value: 'report', label: 'Someone who reports to me' }]} />);
    const label = screen.getByText('Myself');
    const description = screen.getByText('Approvers may request on behalf of a report.');
    expect(label.className).toMatch(/\btext-sm\b/);
    expect(label.className).not.toMatch(/text-\[13px\]/);
    expect(description.className).toMatch(/\btext-xs\b/);
    expect(description.className).not.toMatch(/text-\[11px\]/);
  });
});

describe('GroupedList group heading wrapper (2.442.3)', () => {
  it('the h3 around a title heading carries the 14/600 step, never the document default', () => {
    render(<GroupedList size="sm" groupHeading="title" groups={[{ id: 'g', title: 'Policies', count: 2 }]} rows={[]} data-testid="gl" />);
    const h3 = document.querySelector('h3');
    expect(h3?.className).toMatch(/\btext-sm\b/);
  });
});

describe('FormWizard and its fields on the 12/14 scale (2.445.0)', () => {
  it('flagged before: FormField hints and Combobox descriptions at 11px; now 12/400', () => {
    render(
      <FormWizard summary={<p>Summary</p>} onSubmit={() => {}} sections={[{
        key: 'what', title: 'What do you need?', description: 'One catalog item per request.',
        content: (
          <FormField label="Item" hint="12 of at least 20 characters">
            {(w) => <Combobox {...w} options={[{ value: 'a', label: 'SME in Work', meta: 'Work', description: 'Dispatch runs' }]} value="" onChange={() => {}} />}
          </FormField>
        ),
      }]} />,
    );
    const hint = screen.getByText('12 of at least 20 characters');
    expect(hint.className).toMatch(/\btext-xs\b/);
    expect(hint.className).not.toMatch(OFF_SCALE);
    fireEvent.click(screen.getByRole('combobox'));
    expect(screen.getByText('Dispatch runs').className).toMatch(/\btext-xs\b/);
    expect(screen.getByRole('listbox').innerHTML).not.toMatch(OFF_SCALE);
  });

  it('valid: the section heading keeps the 14/600 step over a 12/400 description; the summary heading matches', () => {
    render(<FormWizard summary={<p>Summary</p>} onSubmit={() => {}} sections={[{ key: 'why', title: 'Why?', description: 'Approvers read this first.', content: null }]} />);
    const heading = screen.getByRole('heading', { name: 'Why?' });
    expect(heading.className).toMatch(/\btext-sm\b/);
    expect(heading.className).toMatch(/\bfont-semibold\b/);
    expect(screen.getByText('Approvers read this first.').className).toMatch(/\btext-xs\b/);
    expect(screen.getByRole('heading', { name: 'Summary' }).className).toMatch(/\btext-sm\b/);
  });
});
