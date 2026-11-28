// Rich decks (2.550.0): the 0.153.0 format mirror, text runs, the emphasis
// toolbar, the icon / graphic / style pickers, the grouped layout gallery,
// the new layout forms, and editing in place on the stage.

import { useState } from 'react';
import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import {
  addSlideRow,
  IMAGE_LAYOUTS,
  makeSlide,
  moveSlideRow,
  removeSlideRow,
  setSlidePath,
  slideForEngine,
  validateDeckSpec,
  withLayoutDefaults,
  type DeckSlide,
  type DeckSpec,
} from '../presentation/deckSpec';
import { applyEmphasis, editDeckText, emphasisAt } from '../presentation/deckText';
import { DeckTextField } from '../presentation/DeckTextField';
import { DeckIconPicker, type DeckCatalogueItem } from '../presentation/IconPicker';
import { GraphicPicker } from '../presentation/GraphicPicker';
import { DeckStylePicker } from '../presentation/DeckStylePicker';
import { LayoutGallery } from '../presentation/LayoutGallery';
import { SlideForm } from '../presentation/SlideForm';
import { readingOrder, regionLabel, SlideRegionsOverlay, type SlideRegion } from '../presentation/SlideRegionsOverlay';
import { PresentationEditor } from '../presentation/PresentationEditor';

const SRC = [{ documentId: 'd1', title: 'Notes' }];

const ICONS: DeckCatalogueItem[] = [
  { name: 'rocket', label: 'Rocket', category: 'growth', keywords: ['launch', 'start'] },
  { name: 'target', label: 'Target', category: 'growth', keywords: ['goal', 'aim'] },
  { name: 'users', label: 'Users', category: 'people', keywords: ['team', 'group'] },
];
const ICON_PATHS = { rocket: ['M1 1h2'], target: 'M2 2h2', users: ['M3 3h2'] };
const GRAPHICS: DeckCatalogueItem[] = [
  { name: 'blob', label: 'Blob', category: 'shape', keywords: ['organic'] },
  { name: 'dots', label: 'Dots', category: 'pattern', keywords: ['grid'] },
];

describe('the 0.153.0 format', () => {
  it('accepts the new layouts, runs, icons and a decoration', () => {
    const result = validateDeckSpec({
      title: 'Plan',
      slides: [
        {
          id: 's1', layout: 'cards', title: [{ text: 'Grow ' }, { text: 'faster', emphasis: 'gradient' }],
          items: [{ title: 'A', icon: 'rocket' }, { title: 'B' }, { title: 'C', text: 'c' }],
          decoration: { graphic: 'blob', placement: 'corner' }, sources: SRC,
        },
        { id: 's2', layout: 'matrix', title: 'Bets', matrix: { x: ['Low', 'High'], y: ['Low', 'High'], quadrants: [{ title: 'a' }, { title: 'b' }, { title: 'c' }, { title: 'd' }] }, sources: SRC },
        { id: 's3', layout: 'funnel', title: 'Funnel', funnel: [{ label: 'a', value: '1' }, { label: 'b', value: '2' }, { label: 'c', value: '3' }], sources: SRC },
        { id: 's4', layout: 'kpi', title: 'KPIs', figures: [{ value: '1', label: 'a', context: 'vs 0' }, { value: '2', label: 'b' }], chart: { kind: 'bar', labels: ['a'], series: [{ name: 's', values: [1] }] }, sources: SRC },
      ],
    });
    expect(result.ok).toBe(true);
  });

  it('checks icon and graphic names only when the host passes the catalogues', () => {
    const deck = { title: 'x', slides: [{ id: 's1', layout: 'cards', title: 't', items: [{ title: 'a', icon: 'nope' }, { title: 'b' }, { title: 'c' }], decoration: { graphic: 'blob' }, sources: SRC }] };
    expect(validateDeckSpec(deck).ok).toBe(true);
    const strict = validateDeckSpec(deck, { iconNames: ['rocket'], graphicNames: ['dots'] });
    expect(strict.ok).toBe(false);
    if (!strict.ok) {
      expect(strict.errors.join('; ')).toContain("unknown icon 'nope'");
      expect(strict.errors.join('; ')).toContain("unknown graphic 'blob'");
    }
  });

  it('pads a list to its floor, keeps a roomier list while editing, and trims it for the engine', () => {
    const process = { ...makeSlide('s1', 'process'), items: [1, 2, 3, 4, 5].map((n) => ({ title: `${n}` })) };
    const cards = withLayoutDefaults(process, 'cards');
    expect(cards.items).toHaveLength(5);
    expect(slideForEngine(cards).items).toHaveLength(4);
    expect(makeSlide('s2', 'people').people).toHaveLength(2);
    const kpi = makeSlide('s3', 'kpi');
    expect(slideForEngine(kpi).chart).toBeDefined();
    expect(slideForEngine(kpi).figures).toHaveLength(2);
    expect(slideForEngine({ ...kpi, layout: 'big-number' }).figures).toHaveLength(1);
  });

  it('sets a field by path and moves rows within the layout bounds', () => {
    const slide: DeckSlide = { ...makeSlide('s1', 'cards'), sources: SRC };
    expect(setSlidePath(slide, 'items.1.text', 'hello').items![1]).toEqual({ title: '', text: 'hello' });
    expect(setSlidePath(setSlidePath(slide, 'items.1.text', 'x'), 'items.1.text', '').items![1]).toEqual({ title: '' });
    expect(setSlidePath(slide, 'nope.3', 'x')).toBe(slide);
    const four = addSlideRow(slide, 'items', 0);
    expect(four.items).toHaveLength(4);
    expect(addSlideRow(four, 'items', 0)).toBe(four);
    expect(removeSlideRow(slide, 'items', 0)).toBe(slide);
    const moved = moveSlideRow(setSlidePath(slide, 'items.0.title', 'first'), 'items', 0, 2);
    expect(moved.items!.map((i) => i.title)).toEqual(['', '', 'first']);
  });
});

describe('text runs', () => {
  it('a string becomes runs only when emphasised, and back when cleared', () => {
    const runs = applyEmphasis('Grow faster now', 5, 11, 'accent');
    expect(runs).toEqual([{ text: 'Grow ' }, { text: 'faster', emphasis: 'accent' }, { text: ' now' }]);
    expect(emphasisAt(runs, 5, 11)).toBe('accent');
    expect(emphasisAt(runs, 0, 11)).toBe('mixed');
    expect(applyEmphasis(runs, 0, 15, null)).toBe('Grow faster now');
    expect(applyEmphasis('abc', 1, 1, 'bold')).toBe('abc');
  });

  it('typing keeps the runs around the edit', () => {
    const runs = applyEmphasis('Grow faster', 5, 11, 'bold');
    expect(editDeckText(runs, 'Grow fasterer')).toEqual([{ text: 'Grow ' }, { text: 'fasterer', emphasis: 'bold' }]);
    expect(editDeckText(runs, 'We grow faster')).toEqual([{ text: 'We grow ' }, { text: 'faster', emphasis: 'bold' }]);
    expect(editDeckText('plain', 'plainer')).toBe('plainer');
  });

  it('DeckTextField: select words, press Bold in the named toolbar, get runs', () => {
    const onChange = vi.fn();
    render(<DeckTextField aria-label="Slide title" value="Grow faster" onChange={onChange} data-testid="t" />);
    const input = screen.getByRole('textbox', { name: 'Slide title' }) as HTMLInputElement;
    expect(screen.queryByRole('toolbar')).toBeNull();
    fireEvent.focus(input);
    input.setSelectionRange(5, 11);
    fireEvent.select(input);
    const toolbar = screen.getByRole('toolbar', { name: 'Slide title: emphasis' });
    fireEvent.click(within(toolbar).getByRole('button', { name: 'Bold' }));
    expect(onChange).toHaveBeenCalledWith([{ text: 'Grow ' }, { text: 'faster', emphasis: 'bold' }]);
  });
});

describe('pickers', () => {
  it('DeckIconPicker searches, filters by category tab and selects', () => {
    const onSelect = vi.fn();
    render(<DeckIconPicker items={ICONS} icons={ICON_PATHS} value="target" onSelect={onSelect} />);
    expect(screen.getByRole('button', { name: 'Target' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: 'Rocket' }).querySelector('svg path')).not.toBeNull();
    fireEvent.change(screen.getByPlaceholderText('Search icons'), { target: { value: 'team' } });
    expect(screen.queryByRole('button', { name: 'Rocket' })).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: 'Users' }));
    expect(onSelect).toHaveBeenCalledWith('users');
    fireEvent.change(screen.getByPlaceholderText('Search icons'), { target: { value: '' } });
    fireEvent.click(screen.getByRole('tab', { name: 'Growth' }));
    expect(screen.queryByRole('button', { name: 'Users' })).toBeNull();
    fireEvent.click(screen.getByTestId('icon-picker-none'));
    expect(onSelect).toHaveBeenLastCalledWith(undefined);
  });

  it('GraphicPicker offers style default, none and a graphic with a placement', () => {
    const onChange = vi.fn();
    const { rerender } = render(<GraphicPicker items={GRAPHICS} onChange={onChange} />);
    expect(screen.getByTestId('graphic-picker-default')).toHaveAttribute('aria-pressed', 'true');
    fireEvent.click(screen.getByTestId('graphic-picker-none'));
    expect(onChange).toHaveBeenLastCalledWith('none');
    fireEvent.click(screen.getByRole('button', { name: 'Dots' }));
    expect(onChange).toHaveBeenLastCalledWith({ graphic: 'dots' });
    rerender(<GraphicPicker items={GRAPHICS} value={{ graphic: 'dots' }} onChange={onChange} />);
    fireEvent.click(screen.getByTestId('graphic-picker-placement-corner'));
    expect(onChange).toHaveBeenLastCalledWith({ graphic: 'dots', placement: 'corner' });
  });

  it('DeckStylePicker shows five tiles, a host image where given and a swatch otherwise', () => {
    const onChange = vi.fn();
    render(<DeckStylePicker value="bold" onChange={onChange} previews={{ playful: 'data:image/png;base64,AA==' }} />);
    const tiles = within(screen.getByRole('list', { name: 'Deck styles' })).getAllByRole('button');
    expect(tiles).toHaveLength(5);
    expect(screen.getByTestId('deck-style-picker-playful').querySelector('img')).not.toBeNull();
    expect(screen.getByTestId('deck-style-picker-minimal').querySelector('[data-style-swatch="minimal"]')).not.toBeNull();
    fireEvent.click(screen.getByRole('button', { name: /Corporate/ }));
    expect(onChange).toHaveBeenCalledWith('corporate');
  });

  it('LayoutGallery groups every layout and hides what the host asks', () => {
    render(<LayoutGallery onSelect={() => {}} hiddenLayouts={IMAGE_LAYOUTS} />);
    const group = screen.getByRole('group', { name: 'Slide layouts' });
    expect(within(group).getByRole('list', { name: 'Openers' })).toBeInTheDocument();
    expect(within(group).getByRole('list', { name: 'Lists and steps' })).toBeInTheDocument();
    expect(within(group).queryByRole('list', { name: 'Images' })).toBeNull();
    expect(screen.queryByTestId('layout-gallery-image-text')).toBeNull();
    expect(within(group).getAllByRole('button')).toHaveLength(20);
  });
});

describe('the new layout forms', () => {
  function FormHarness({ initial, onSlide }: { initial: DeckSlide; onSlide?: (s: DeckSlide) => void }) {
    const [slide, setSlide] = useState(initial);
    return <SlideForm slide={slide} onChange={(s) => { setSlide(s); onSlide?.(s); }} sources={[]} icons={{ items: ICONS, icons: ICON_PATHS }} testIdPrefix="f" />;
  }

  it('cards: add to the cap, remove to the floor, reorder, and an inline icon picker', () => {
    const onSlide = vi.fn();
    render(<FormHarness initial={{ ...makeSlide('s1', 'cards'), sources: SRC }} onSlide={onSlide} />);
    expect(screen.getByTestId('f-items-count')).toHaveTextContent('3 of 3–4');
    expect(screen.getByRole('button', { name: 'Remove card 1' })).toBeDisabled();
    fireEvent.click(screen.getByTestId('f-items-add'));
    expect(screen.getByTestId('f-items-add')).toBeDisabled();
    fireEvent.change(screen.getByRole('textbox', { name: 'Card 1 title' }), { target: { value: 'First' } });
    fireEvent.click(screen.getByRole('button', { name: 'Move card 1 down' }));
    expect(onSlide.mock.calls.at(-1)![0].items[1].title).toBe('First');
    fireEvent.click(screen.getByRole('button', { name: 'Card 1 icon: none' }));
    expect(screen.queryByRole('dialog')).toBeNull();
    fireEvent.click(within(screen.getByRole('region', { name: 'Icon for card 1' })).getByRole('button', { name: 'Rocket' }));
    expect(onSlide.mock.calls.at(-1)![0].items[0].icon).toBe('rocket');
    expect(screen.queryByRole('region', { name: 'Icon for card 1' })).toBeNull();
  });

  it('matrix: four axis ends and four quadrants', () => {
    const onSlide = vi.fn();
    render(<FormHarness initial={{ ...makeSlide('s1', 'matrix'), sources: SRC }} onSlide={onSlide} />);
    fireEvent.change(screen.getByLabelText('Horizontal axis, right end'), { target: { value: 'High effort' } });
    fireEvent.change(screen.getByRole('textbox', { name: 'Bottom right quadrant title' }), { target: { value: 'Avoid' } });
    const last = onSlide.mock.calls.at(-1)![0] as DeckSlide;
    expect(last.matrix!.x).toEqual(['', 'High effort']);
    expect(last.matrix!.quadrants[3].title).toBe('Avoid');
  });

  it('people and funnel keep to their bounds', () => {
    render(<FormHarness initial={{ ...makeSlide('s1', 'funnel'), sources: SRC }} />);
    expect(screen.getByTestId('f-funnel-count')).toHaveTextContent('3 of 3–5');
    expect(screen.getByRole('button', { name: 'Remove stage 1' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Move stage 1 up' })).toBeDisabled();
  });
});

describe('SlideRegionsOverlay', () => {
  // As the engine sends them: reading order, bracket paths, no `row` (derived).
  const regions: SlideRegion[] = [
    { path: 'eyebrow', kind: 'text', box: { x: 60, y: 30, w: 200, h: 20 }, value: 'Q3' },
    { path: 'title', kind: 'runs', box: { x: 60, y: 60, w: 600, h: 60 }, value: 'Plan', fontSize: 34 },
    { path: 'items[0].icon', kind: 'icon', box: { x: 700, y: 60, w: 40, h: 40 }, value: 'rocket' },
    { path: 'bullets[0]', kind: 'runs', box: { x: 60, y: 200, w: 400, h: 30 }, value: 'First point' },
  ];

  it('names regions from their paths and tabs through them in the order given', () => {
    render(<SlideRegionsOverlay regions={regions} onEdit={() => {}} />);
    const names = screen.getAllByRole('button').filter((b) => b.dataset.kind).map((b) => b.getAttribute('aria-label'));
    expect(names).toEqual(['Eyebrow', 'Slide title', 'Card 1 icon', 'Bullet 1']);
    expect(regionLabel('items[1].text', 'process')).toBe('Step 2 text');
    expect(regionLabel('table.rows[0][2]')).toBe('Table row 1, column 3');
    expect(regionLabel('matrix.quadrants[3].text')).toBe('Bottom right quadrant text');
    expect(regionLabel('deck.subtitle')).toBe('Deck subtitle');
    expect(readingOrder([regions[3]!, regions[0]!]).map((r) => r.path)).toEqual(['eyebrow', 'bullets[0]']);
  });

  it('copes with any subset of paths (no title region)', () => {
    render(<SlideRegionsOverlay regions={[regions[3]!]} onEdit={() => {}} editPath="title" />);
    expect(screen.queryByRole('textbox')).toBeNull();
    expect(screen.getByRole('button', { name: 'Bullet 1' })).toBeInTheDocument();
  });

  it('a click opens an editor on the region box; Esc cancels; Enter commits path and value', () => {
    const onEdit = vi.fn();
    const { container } = render(<SlideRegionsOverlay regions={regions} onEdit={onEdit} />);
    fireEvent.click(screen.getByRole('button', { name: 'Slide title' }));
    const editor = screen.getByRole('textbox', { name: 'Slide title' });
    const box = editor.parentElement!;
    expect([box.getAttribute('x'), box.getAttribute('y'), box.getAttribute('width'), box.getAttribute('height'), box.getAttribute('font-size')]).toEqual(['60', '60', '600', '60', '34']);
    expect(container.querySelector('svg')!.getAttribute('viewBox')).toBe('0 0 960 540');
    expect(screen.getByRole('toolbar', { name: 'Slide title: emphasis' })).toBeInTheDocument();
    fireEvent.change(editor, { target: { value: 'Changed' } });
    fireEvent.keyDown(editor, { key: 'Escape' });
    expect(onEdit).not.toHaveBeenCalled();
    expect(screen.queryByRole('textbox')).toBeNull();

    fireEvent.click(screen.getByRole('button', { name: 'Slide title' }));
    const again = screen.getByRole('textbox', { name: 'Slide title' }) as HTMLTextAreaElement;
    expect(again.value).toBe('Plan');
    fireEvent.change(again, { target: { value: 'Plan for Q3' } });
    again.setSelectionRange(9, 11);
    fireEvent.select(again);
    fireEvent.click(within(screen.getByRole('toolbar', { name: 'Slide title: emphasis' })).getByRole('button', { name: 'Highlight' }));
    fireEvent.keyDown(screen.getByRole('textbox', { name: 'Slide title' }), { key: 'Enter' });
    expect(onEdit).toHaveBeenCalledWith('title', [{ text: 'Plan for ' }, { text: 'Q3', emphasis: 'highlight' }]);
    // Optimistic: drawn over the old picture until the host's value matches.
    expect(screen.getByTestId('slide-regions-pending-title')).toHaveTextContent('Plan for Q3');
  });

  it('blur commits; an icon region asks for its picker; row buttons name their row', () => {
    const onEdit = vi.fn();
    const onPick = vi.fn();
    const onRowAdd = vi.fn();
    render(<SlideRegionsOverlay regions={regions} onEdit={onEdit} onPick={onPick} onRowAdd={onRowAdd} onRowRemove={() => {}} />);
    fireEvent.click(screen.getByRole('button', { name: 'Eyebrow' }));
    const editor = screen.getByRole('textbox', { name: 'Eyebrow' });
    fireEvent.change(editor, { target: { value: 'Q4' } });
    fireEvent.blur(editor);
    expect(onEdit).toHaveBeenCalledWith('eyebrow', 'Q4');
    expect(screen.queryByRole('toolbar')).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: 'Card 1 icon' }));
    expect(onPick).toHaveBeenCalledWith(expect.objectContaining({ path: 'items[0].icon' }));
    fireEvent.click(screen.getByRole('button', { name: 'Add after Bullet 1' }));
    expect(onRowAdd).toHaveBeenCalledWith('bullets', 0);
  });
});

describe('PresentationEditor, editing in place', () => {
  const SVG = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="9"></svg>';
  const spec: DeckSpec = {
    title: 'Plan',
    slides: [{ id: 's1', layout: 'cards', title: 'Bets', items: [{ title: 'A' }, { title: 'B' }, { title: 'C' }], sources: SRC }],
  };
  const slideRegions = {
    s1: [
      { path: 'title', kind: 'runs' as const, box: { x: 60, y: 60, w: 600, h: 60 }, value: 'Bets' },
      { path: 'items[1].icon', kind: 'icon' as const, box: { x: 300, y: 260, w: 40, h: 40 } },
      { path: 'items[1].title', kind: 'text' as const, box: { x: 300, y: 320, w: 200, h: 40 }, value: 'B' },
      { path: 'deck.subtitle', kind: 'text' as const, box: { x: 60, y: 130, w: 400, h: 30 } },
    ],
  };

  function Harness({ onSpec, onRegionEdit, onRowAdd }: { onSpec: (s: DeckSpec) => void; onRegionEdit?: () => void; onRowAdd?: () => void }) {
    const [current, setCurrent] = useState(spec);
    return (
      <PresentationEditor
        spec={current}
        onChange={(next) => { setCurrent(next); onSpec(next); }}
        preview={{ slides: [{ id: 's1', svg: SVG }] }}
        onRequestPreview={() => undefined}
        onSaveRevision={async () => undefined}
        revisions={[{ id: 'r1', label: 'v1' }]}
        activeRevisionId="r1"
        onSelectRevision={() => undefined}
        sources={[]}
        slideRegions={slideRegions}
        icons={{ items: ICONS, icons: ICON_PATHS }}
        onRegionEdit={onRegionEdit}
        onRowAdd={onRowAdd}
        data-testid="pe"
      />
    );
  }

  it('has no form under the stage, opens the icon picker in the side pane, and edits by path', () => {
    const onSpec = vi.fn();
    const onRegionEdit = vi.fn();
    const onRowAdd = vi.fn();
    render(<Harness onSpec={onSpec} onRegionEdit={onRegionEdit} onRowAdd={onRowAdd} />);
    expect(screen.queryByTestId('pe-form-region')).toBeNull();
    expect(screen.getByTestId('pe-outline')).toBeInTheDocument();
    const pane = screen.getByRole('complementary', { name: 'Slide settings' });
    expect(within(pane).queryByTestId('pe-pick-pane')).toBeNull();

    fireEvent.click(screen.getByRole('button', { name: 'Card 2 icon' }));
    const pick = within(pane).getByTestId('pe-pick-pane');
    fireEvent.click(within(pick).getByRole('button', { name: 'Target' }));
    expect((onSpec.mock.calls.at(-1)![0] as DeckSpec).slides[0]!.items![1]!.icon).toBe('target');
    expect(onRegionEdit).toHaveBeenCalledWith('s1', 'items[1].icon', 'target');

    fireEvent.click(screen.getByRole('button', { name: 'Card 2 title' }));
    const editor = within(screen.getByTestId('pe-regions')).getByRole('textbox', { name: 'Card 2 title' });
    fireEvent.change(editor, { target: { value: 'Bold bet' } });
    act(() => { fireEvent.keyDown(editor, { key: 'Enter' }); });
    expect((onSpec.mock.calls.at(-1)![0] as DeckSpec).slides[0]!.items![1]!.title).toBe('Bold bet');

    fireEvent.click(screen.getByRole('button', { name: 'Deck subtitle' }));
    const sub = screen.getByRole('textbox', { name: 'Deck subtitle' });
    fireEvent.change(sub, { target: { value: 'For the board' } });
    act(() => { fireEvent.keyDown(sub, { key: 'Enter' }); });
    expect((onSpec.mock.calls.at(-1)![0] as DeckSpec).subtitle).toBe('For the board');

    fireEvent.click(screen.getByRole('button', { name: 'Add after Card 2 title' }));
    expect((onSpec.mock.calls.at(-1)![0] as DeckSpec).slides[0]!.items).toHaveLength(4);
    expect(onRowAdd).toHaveBeenCalledWith('s1', 'items', 1);
  });
});
