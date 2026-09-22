// The DeckSpec contract, mirrored for the editor.
//
// The authority is `platform-api/src/deck/DeckSpec.ts` — it renders the
// `.pptx` and it refuses a spec it does not like. These types are a COPY of
// that file's exported shapes, deliberately kept structurally identical so a
// spec that round-trips through this editor is a spec the generator accepts.
//
// It is a copy rather than an import because the two live in different
// repositories and this library must not take a dependency on a server
// package to draw a form. The cost is that the two can drift; the mitigation
// is that everything here is a plain structural type with no behaviour, so a
// drift shows up as a TypeScript error in the host that wires them together
// rather than as a deck that renders wrong.
//
// ## The one rule the editor enforces
//
// Every slide cites at least one source. The generator is GROUNDED — a slide
// with no citation is rejected server-side rather than rendered with an empty
// footer — so an editor that let you save one would be offering a button that
// always 400s. `uncitedSlideIds` is the whole of that rule, and the editor
// disables Save while it returns anything.
//
// The caps are copied for the same reason and used the same way: the slide
// count meter reads against `MAX_SLIDES`, and the fields that have a character
// cap say so rather than letting the server be the first to mention it.

export type DeckTheme = 'product' | 'engineering' | 'plain';

export type SlideLayout =
  | 'title'
  | 'section'
  | 'bullets'
  | 'two-column'
  | 'chart'
  | 'quote'
  | 'image';

/** A citation: the document the claim came from, and (optionally) where in it. */
export interface DeckSource {
  documentId: string;
  anchor?: string;
  title: string;
}

export interface DeckChart {
  kind: 'bar' | 'line';
  labels: string[];
  series: Array<{ name: string; values: number[] }>;
}

export interface DeckQuote {
  text: string;
  by: string;
}

/**
 * An image slide carries only its alt text. Nothing is fetched at render time,
 * so the slide is a framed caption until a real asset pipeline puts bytes
 * behind it.
 */
export interface DeckImage {
  alt: string;
}

export interface DeckSlide {
  id: string;
  layout: SlideLayout;
  title: string;
  eyebrow?: string;
  bullets?: string[];
  columns?: [string[], string[]];
  chart?: DeckChart;
  quote?: DeckQuote;
  image?: DeckImage;
  notes?: string;
  sources: DeckSource[];
}

export interface DeckSpec {
  title: string;
  subtitle?: string;
  theme?: DeckTheme;
  slides: DeckSlide[];
}

// ---------------------------------------------------------------------------
// Caps — copied from the validator, surfaced in the form
// ---------------------------------------------------------------------------

export const MAX_SLIDES = 40;
export const MAX_BULLETS_PER_SLIDE = 8;
export const MAX_BULLET_CHARS = 200;
export const MAX_TITLE_CHARS = 120;
export const MAX_SUBTITLE_CHARS = 200;
export const MAX_EYEBROW_CHARS = 60;
export const MAX_NOTES_CHARS = 2000;
export const MAX_CHART_LABELS = 24;
export const MAX_CHART_SERIES = 6;
export const MAX_QUOTE_CHARS = 400;
export const MAX_SOURCES_PER_SLIDE = 10;

/** Slide ids stay filename- and handle-safe: they end up in preview handles. */
export const SLIDE_ID_PATTERN = /^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$/;

export const SLIDE_LAYOUTS: readonly SlideLayout[] = [
  'title',
  'section',
  'bullets',
  'two-column',
  'chart',
  'quote',
  'image',
];

/** What each layout is FOR, in the words a person picking one needs. */
export const SLIDE_LAYOUT_LABELS: Record<SlideLayout, string> = {
  title: 'Title',
  section: 'Section divider',
  bullets: 'Bullets',
  'two-column': 'Two columns',
  chart: 'Chart',
  quote: 'Quote',
  image: 'Image',
};

export const DECK_THEMES: readonly DeckTheme[] = ['product', 'engineering', 'plain'];

// ---------------------------------------------------------------------------
// The grounding rule
// ---------------------------------------------------------------------------

/**
 * Slides that cite nothing, in deck order.
 *
 * The editor's only hard validation. Empty array means the spec can be saved;
 * anything else is the list the warning names and the reason Save is off.
 */
export function uncitedSlideIds(spec: DeckSpec): string[] {
  return spec.slides.filter((slide) => slide.sources.length === 0).map((slide) => slide.id);
}

/** True when nothing blocks a save. Kept separate so the host can ask too. */
export function canSaveDeck(spec: DeckSpec): boolean {
  return spec.slides.length > 0 && uncitedSlideIds(spec).length === 0;
}

// ---------------------------------------------------------------------------
// Editing primitives
//
// Pure functions over the spec. They live here rather than inside the
// component so the round-trip they define is testable without a DOM, and so
// the host can reuse them when it seeds a deck from a fixture.
// ---------------------------------------------------------------------------

/**
 * A slide id that is unique within the deck and passes `SLIDE_ID_PATTERN`.
 *
 * Counts up from the deck's size rather than hashing or using a UUID: the ids
 * end up in preview handles a person reads in a URL, and `s7` is a better
 * thing to read than a 36-character guid.
 */
export function nextSlideId(spec: DeckSpec, prefix = 's'): string {
  const taken = new Set(spec.slides.map((slide) => slide.id));
  let n = spec.slides.length + 1;
  while (taken.has(`${prefix}${n}`)) n += 1;
  return `${prefix}${n}`;
}

/** A blank slide of a layout, with the sub-object that layout needs. */
export function makeSlide(id: string, layout: SlideLayout = 'bullets'): DeckSlide {
  const base: DeckSlide = { id, layout, title: '', sources: [] };
  return withLayoutDefaults(base, layout);
}

/**
 * Move a slide's layout, keeping everything the new layout can still use.
 *
 * Content is NOT discarded on a layout change: a bullets slide turned into a
 * chart keeps its bullets, so turning it back does not lose the words. The
 * generator ignores the fields a layout does not read, and the alternative —
 * deleting them — makes the layout picker a destructive control people learn
 * to avoid.
 */
export function withLayoutDefaults(slide: DeckSlide, layout: SlideLayout): DeckSlide {
  const next: DeckSlide = { ...slide, layout };
  if (layout === 'bullets' && !next.bullets) next.bullets = [''];
  if (layout === 'two-column' && !next.columns) next.columns = [[''], ['']];
  if (layout === 'chart' && !next.chart) {
    next.chart = { kind: 'bar', labels: ['Q1', 'Q2'], series: [{ name: 'Series 1', values: [0, 0] }] };
  }
  if (layout === 'quote' && !next.quote) next.quote = { text: '', by: '' };
  if (layout === 'image' && !next.image) next.image = { alt: '' };
  return next;
}

/** Replace one slide by id. Returns the same spec object when nothing matched. */
export function replaceSlide(spec: DeckSpec, slide: DeckSlide): DeckSpec {
  const index = spec.slides.findIndex((candidate) => candidate.id === slide.id);
  if (index === -1) return spec;
  const slides = spec.slides.slice();
  slides[index] = slide;
  return { ...spec, slides };
}

/** Move the slide at `from` so it lands at `to`. Out-of-range moves are no-ops. */
export function moveSlide(spec: DeckSpec, from: number, to: number): DeckSpec {
  const { slides } = spec;
  if (from === to) return spec;
  if (from < 0 || from >= slides.length || to < 0 || to >= slides.length) return spec;
  const next = slides.slice();
  const [moved] = next.splice(from, 1);
  next.splice(to, 0, moved);
  return { ...spec, slides: next };
}

/** Insert a fresh slide after `afterIndex` (-1 puts it first). */
export function addSlide(spec: DeckSpec, afterIndex: number, layout: SlideLayout = 'bullets'): DeckSpec {
  if (spec.slides.length >= MAX_SLIDES) return spec;
  const slide = makeSlide(nextSlideId(spec), layout);
  const slides = spec.slides.slice();
  slides.splice(Math.min(Math.max(afterIndex + 1, 0), slides.length), 0, slide);
  return { ...spec, slides };
}

/**
 * Copy a slide, sources included.
 *
 * The citations come along deliberately: a duplicate is nearly always the same
 * claim said differently, and a copy that arrived uncited would be a copy that
 * cannot be saved.
 */
export function duplicateSlide(spec: DeckSpec, id: string): DeckSpec {
  if (spec.slides.length >= MAX_SLIDES) return spec;
  const index = spec.slides.findIndex((slide) => slide.id === id);
  if (index === -1) return spec;
  const source = spec.slides[index];
  const copy: DeckSlide = {
    ...source,
    id: nextSlideId(spec),
    bullets: source.bullets ? source.bullets.slice() : undefined,
    columns: source.columns ? [source.columns[0].slice(), source.columns[1].slice()] : undefined,
    chart: source.chart
      ? {
          kind: source.chart.kind,
          labels: source.chart.labels.slice(),
          series: source.chart.series.map((s) => ({ name: s.name, values: s.values.slice() })),
        }
      : undefined,
    quote: source.quote ? { ...source.quote } : undefined,
    image: source.image ? { ...source.image } : undefined,
    sources: source.sources.map((s) => ({ ...s })),
  };
  const slides = spec.slides.slice();
  slides.splice(index + 1, 0, copy);
  return { ...spec, slides };
}

/** Drop a slide. The last slide cannot be removed — a deck of none is not a deck. */
export function removeSlide(spec: DeckSpec, id: string): DeckSpec {
  if (spec.slides.length <= 1) return spec;
  const slides = spec.slides.filter((slide) => slide.id !== id);
  if (slides.length === spec.slides.length) return spec;
  return { ...spec, slides };
}

/**
 * The next revision's label, given the ones that exist.
 *
 * Reads the numbers off `v<n>` labels rather than counting rows, because a
 * revision list can be paged or filtered and "Save as v3" over four revisions
 * is a promise the server would have to break.
 */
export function nextRevisionLabel(revisions: readonly { label: string }[]): string {
  const highest = revisions.reduce((max, revision) => {
    const match = /^v(\d+)$/i.exec(revision.label.trim());
    return match ? Math.max(max, Number(match[1])) : max;
  }, 0);
  return `v${Math.max(highest, revisions.length) + 1}`;
}
