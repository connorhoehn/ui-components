// The DeckSpec contract, mirrored for the editor.
//
// MIRRORS `@connorhoehn/realtime-modules` 0.152.0, `src/deck/DeckSpec.ts` —
// the deck engine. It lays the slides out, renders the `.pptx`, PDF and
// preview, and refuses a spec it does not like. The types, the caps, the
// layout list and the validator below are a COPY of that file, kept
// structurally identical so a spec that round-trips through this editor is a
// spec the engine accepts. When the engine's format moves, this file moves
// with it, and the line above names the version it was copied from.
//
// It is a copy rather than an import because the two live in different
// packages and this library must not take a dependency on the engine to draw
// a form. The cost is that the two can drift; the mitigation is that the
// types are plain structural shapes, so a drift shows up as a TypeScript
// error in the host that wires them together, and the validator mirror
// (`validateDeckSpec`) is tested against the same cases the engine refuses.
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
//
// ## Layout payloads
//
// Each layout past `bullets` owns one payload field (`chart`, `quote`,
// `figures`, `table`, …) and the engine refuses that field on any other
// layout. The editor keeps a payload when the layout changes, so switching
// back does not lose work (`withLayoutDefaults`), and `slideForEngine` /
// `deckForEngine` drop what the current layout does not own before the spec
// leaves the editor. Bullets are the one thing every layout may carry.

export type DeckTheme = 'product' | 'engineering' | 'plain';

/**
 * A theme named by id, which the HOST resolves to a theme object and hands to
 * layout. A deck names its theme; it never carries colours, fonts or sizes.
 */
export interface DeckThemeRef {
  ref: string;
}

/** Theme ids a `{ ref }` may carry: the same shape as slide ids. */
export const THEME_REF_PATTERN = /^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$/;

/**
 * What a model is told about `theme`: it picks, it does not design. A host
 * that offers published themes lists their ids after this sentence.
 */
export const DECK_THEME_RULE =
  "theme: optional. Either one of the built-in names 'product', 'engineering' or 'plain', or { \"ref\": \"<theme id>\" } naming one of the theme ids you were given. Pick only among the ids you were given; never write colours, fonts or sizes into the deck.";

export type SlideLayout =
  | 'title' | 'section' | 'bullets' | 'two-column' | 'chart' | 'quote' | 'image'
  | 'key-figures' | 'table' | 'comparison' | 'timeline' | 'agenda' | 'closing';

/** A citation: the document the claim came from, and (optionally) where in it. */
export interface DeckSource {
  documentId: string;
  anchor?: string;
  title: string;
}

/** `stacked-bar` stacks the series per label; `pie` takes one series of non-negative values, one slice per label. */
export interface DeckChart {
  kind: 'bar' | 'line' | 'stacked-bar' | 'pie';
  labels: string[];
  series: Array<{ name: string; values: number[] }>;
}

export interface DeckQuote {
  text: string;
  by: string;
}

/**
 * An image slide carries only its alt text. Nothing is fetched at render time —
 * neither the .pptx nor the SVG preview reaches the network — so the slide is a
 * framed caption until a real asset pipeline puts bytes behind it.
 */
export interface DeckImage {
  alt: string;
}

/** One big number: `value` as it should read ("42%", "$1.2M"), a label, and an optional change ("+8 pts"). */
export interface DeckFigure {
  value: string;
  label: string;
  delta?: string;
}

/** A small table of short text: a header row and up to 8 rows of the same width. */
export interface DeckTable {
  header: string[];
  rows: string[][];
}

export interface DeckComparisonSide {
  title: string;
  points: string[];
}

/** Two titled columns of points, and optionally the line that settles it. */
export interface DeckComparison {
  left: DeckComparisonSide;
  right: DeckComparisonSide;
  verdict?: string;
}

/** One dated step on a timeline. */
export interface DeckTimelineStep {
  date: string;
  label: string;
  detail?: string;
}

/** Numbered agenda items; `current` (0-based) marks where the talk is. */
export interface DeckAgenda {
  items: string[];
  current?: number;
}

/** The last word: a closing line, up to three next steps, and a contact line. */
export interface DeckClosing {
  line: string;
  nextSteps?: string[];
  contact?: string;
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
  figures?: DeckFigure[];
  table?: DeckTable;
  comparison?: DeckComparison;
  timeline?: DeckTimelineStep[];
  agenda?: DeckAgenda;
  closing?: DeckClosing;
  notes?: string;
  sources: DeckSource[];
}

export interface DeckSpec {
  title: string;
  subtitle?: string;
  /** A built-in theme name, or a `{ ref }` the host resolves. */
  theme?: DeckTheme | DeckThemeRef;
  slides: DeckSlide[];
}

// ---------------------------------------------------------------------------
// Caps — copied from the engine, surfaced in the form
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
/** A pie's slices each need their own colour, and every theme has at least six. */
export const MAX_PIE_SLICES = 6;
export const MIN_FIGURES = 2;
export const MAX_FIGURES = 4;
export const MAX_FIGURE_VALUE_CHARS = 12;
export const MAX_FIGURE_LABEL_CHARS = 60;
export const MAX_FIGURE_DELTA_CHARS = 24;
export const MAX_TABLE_ROWS = 8;
export const MAX_TABLE_COLUMNS = 5;
export const MAX_TABLE_CELL_CHARS = 40;
export const MAX_COMPARISON_POINTS = 5;
export const MAX_COMPARISON_POINT_CHARS = 120;
export const MAX_COMPARISON_TITLE_CHARS = 40;
export const MAX_VERDICT_CHARS = 140;
export const MIN_TIMELINE_STEPS = 3;
export const MAX_TIMELINE_STEPS = 6;
export const MAX_TIMELINE_DATE_CHARS = 16;
export const MAX_TIMELINE_LABEL_CHARS = 40;
export const MAX_TIMELINE_DETAIL_CHARS = 80;
export const MAX_AGENDA_ITEMS = 6;
export const MAX_AGENDA_ITEM_CHARS = 80;
export const MAX_CLOSING_LINE_CHARS = 100;
export const MAX_NEXT_STEPS = 3;
export const MAX_NEXT_STEP_CHARS = 120;
export const MAX_CONTACT_CHARS = 100;

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
  'key-figures',
  'table',
  'comparison',
  'timeline',
  'agenda',
  'closing',
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
  'key-figures': 'Key figures',
  table: 'Table',
  comparison: 'Comparison',
  timeline: 'Timeline',
  agenda: 'Agenda',
  closing: 'Closing',
};

/** One line per layout: when to reach for it. Shown under the name in `LayoutGallery`. */
export const SLIDE_LAYOUT_DESCRIPTIONS: Record<SlideLayout, string> = {
  title: 'The opening slide: the deck title and who it is for.',
  section: 'A divider that names the next part of the talk.',
  bullets: 'A short list of points under one heading.',
  'two-column': 'Two lists side by side.',
  chart: 'Numbers over time or across groups, as bars, lines, stacked bars or a pie.',
  quote: 'One attributed quotation, large.',
  image: 'A picture with its caption.',
  'key-figures': 'Two to four headline numbers, each with a label and an optional change.',
  table: 'A small grid of short text: up to 8 rows by 5 columns.',
  comparison: 'Two options weighed side by side, and the line that settles it.',
  timeline: 'Three to six dated steps, in order.',
  agenda: 'What the talk covers, with the current part marked.',
  closing: 'The last word: a closing line, next steps and who to contact.',
};

/** The chart kinds the engine draws, in the order the form offers them. */
export const DECK_CHART_KINDS: readonly DeckChart['kind'][] = ['bar', 'line', 'stacked-bar', 'pie'];

/** Plain names for the chart kinds. */
export const DECK_CHART_KIND_LABELS: Record<DeckChart['kind'], string> = {
  bar: 'Bar',
  line: 'Line',
  'stacked-bar': 'Stacked bar',
  pie: 'Pie',
};

export const DECK_THEMES: readonly DeckTheme[] = ['product', 'engineering', 'plain'];

/** True for a `{ ref }` theme (a host-published theme), false for a built-in name or none. */
export function isDeckThemeRef(theme: DeckSpec['theme']): theme is DeckThemeRef {
  return !!theme && typeof theme === 'object' && typeof (theme as DeckThemeRef).ref === 'string';
}

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
 * title, eyebrow, notes, sources and bullets carry over to every layout; a
 * layout's own payload (`chart`, `figures`, `table`, …) stays on the slide
 * while another layout is chosen, and `slideForEngine` drops it from what is
 * saved. The alternative — deleting it here — makes the layout picker a
 * destructive control people learn to avoid.
 *
 * The new layouts start from the smallest payload the engine accepts the
 * shape of (two figures, three timeline steps, a 2×2 table), with empty text
 * for the person to fill.
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
  if (layout === 'key-figures' && !next.figures) {
    next.figures = [{ value: '', label: '' }, { value: '', label: '' }];
  }
  if (layout === 'table' && !next.table) next.table = { header: ['', ''], rows: [['', '']] };
  if (layout === 'comparison' && !next.comparison) {
    // Two columns of points read naturally as the two sides.
    const [left, right] = next.columns ?? [[''], ['']];
    next.comparison = {
      left: { title: '', points: left.length ? left.slice(0, MAX_COMPARISON_POINTS) : [''] },
      right: { title: '', points: right.length ? right.slice(0, MAX_COMPARISON_POINTS) : [''] },
    };
  }
  if (layout === 'timeline' && !next.timeline) {
    next.timeline = [{ date: '', label: '' }, { date: '', label: '' }, { date: '', label: '' }];
  }
  if (layout === 'agenda' && !next.agenda) next.agenda = { items: [''] };
  if (layout === 'closing' && !next.closing) next.closing = { line: '' };
  return next;
}

/** Which payload field each layout owns. `title` and `section` own none; `bullets` are shared by all. */
const LAYOUT_PAYLOAD: Record<SlideLayout, keyof DeckSlide | null> = {
  title: null,
  section: null,
  bullets: null,
  'two-column': 'columns',
  chart: 'chart',
  quote: 'quote',
  image: 'image',
  'key-figures': 'figures',
  table: 'table',
  comparison: 'comparison',
  timeline: 'timeline',
  agenda: 'agenda',
  closing: 'closing',
};

const PAYLOAD_FIELDS = Object.values(LAYOUT_PAYLOAD).filter((field): field is keyof DeckSlide => field !== null);

/**
 * The slide as the engine will take it: every payload the current layout
 * does not own is dropped (the engine refuses a `chart` on a bullets slide,
 * a `table` on a timeline, and so on). Title, eyebrow, bullets, notes and
 * sources always carry over. Returns the same object when nothing was dropped.
 */
export function slideForEngine(slide: DeckSlide): DeckSlide {
  const own = LAYOUT_PAYLOAD[slide.layout];
  const foreign = PAYLOAD_FIELDS.filter((field) => field !== own && slide[field] !== undefined);
  if (!foreign.length) return slide;
  const next: DeckSlide = { ...slide };
  for (const field of foreign) delete next[field];
  return next;
}

/** `slideForEngine` over the whole deck. Returns the same object when no slide changed. */
export function deckForEngine(spec: DeckSpec): DeckSpec {
  let changed = false;
  const slides = spec.slides.map((slide) => {
    const next = slideForEngine(slide);
    if (next !== slide) changed = true;
    return next;
  });
  return changed ? { ...spec, slides } : spec;
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
    figures: source.figures ? source.figures.map((f) => ({ ...f })) : undefined,
    table: source.table
      ? { header: source.table.header.slice(), rows: source.table.rows.map((row) => row.slice()) }
      : undefined,
    comparison: source.comparison
      ? {
          left: { title: source.comparison.left.title, points: source.comparison.left.points.slice() },
          right: { title: source.comparison.right.title, points: source.comparison.right.points.slice() },
          ...(source.comparison.verdict !== undefined ? { verdict: source.comparison.verdict } : {}),
        }
      : undefined,
    timeline: source.timeline ? source.timeline.map((step) => ({ ...step })) : undefined,
    agenda: source.agenda ? { ...source.agenda, items: source.agenda.items.slice() } : undefined,
    closing: source.closing
      ? { ...source.closing, ...(source.closing.nextSteps ? { nextSteps: source.closing.nextSteps.slice() } : {}) }
      : undefined,
    sources: source.sources.map((s) => ({ ...s })),
  };
  // Keep the copy's keys to the ones the source had, so a duplicate of a
  // bullets slide does not grow `figures: undefined` and friends.
  for (const key of Object.keys(copy) as (keyof DeckSlide)[]) {
    if (copy[key] === undefined) delete copy[key];
  }
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

// ---------------------------------------------------------------------------
// The validator mirror
//
// The engine's `validateDeckSpec`, copied as it is in 0.152.0 so the editor and
// a host can ask "would the engine take this?" without a round trip. Strict on
// purpose: unknown keys are refused, and every problem is listed, not the first.
// ---------------------------------------------------------------------------

const THEMES: ReadonlySet<string> = new Set(['product', 'engineering', 'plain']);
const LAYOUTS: ReadonlySet<string> = new Set([
  'title', 'section', 'bullets', 'two-column', 'chart', 'quote', 'image',
  'key-figures', 'table', 'comparison', 'timeline', 'agenda', 'closing',
]);

const SPEC_KEYS: ReadonlySet<string> = new Set(['title', 'subtitle', 'theme', 'slides']);
const SLIDE_KEYS: ReadonlySet<string> = new Set([
  'id', 'layout', 'title', 'eyebrow', 'bullets', 'columns', 'chart', 'quote', 'image',
  'figures', 'table', 'comparison', 'timeline', 'agenda', 'closing', 'notes', 'sources',
]);
const THEME_REF_KEYS: ReadonlySet<string> = new Set(['ref']);
const SOURCE_KEYS: ReadonlySet<string> = new Set(['documentId', 'anchor', 'title']);
const CHART_KEYS: ReadonlySet<string> = new Set(['kind', 'labels', 'series']);
const CHART_KINDS: ReadonlySet<string> = new Set(['bar', 'line', 'stacked-bar', 'pie']);
const SERIES_KEYS: ReadonlySet<string> = new Set(['name', 'values']);
const QUOTE_KEYS: ReadonlySet<string> = new Set(['text', 'by']);
const IMAGE_KEYS: ReadonlySet<string> = new Set(['alt']);
const FIGURE_KEYS: ReadonlySet<string> = new Set(['value', 'label', 'delta']);
const TABLE_KEYS: ReadonlySet<string> = new Set(['header', 'rows']);
const COMPARISON_KEYS: ReadonlySet<string> = new Set(['left', 'right', 'verdict']);
const SIDE_KEYS: ReadonlySet<string> = new Set(['title', 'points']);
const STEP_KEYS: ReadonlySet<string> = new Set(['date', 'label', 'detail']);
const AGENDA_KEYS: ReadonlySet<string> = new Set(['items', 'current']);
const CLOSING_KEYS: ReadonlySet<string> = new Set(['line', 'nextSteps', 'contact']);

export type DeckSpecValidation =
  | { ok: true; spec: DeckSpec }
  | { ok: false; errors: string[] };

function isObject(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

/** Collapses whitespace so a cap counts characters a reader would see. */
function clean(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined;
  const trimmed = value.replace(/\s+/g, ' ').trim();
  return trimmed || undefined;
}

/** Notes keep their line breaks; only trailing space goes. */
function cleanMultiline(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined;
  const trimmed = value.replace(/[ \t]+$/gm, '').trim();
  return trimmed || undefined;
}

function unknownKeys(object: Record<string, unknown>, allowed: ReadonlySet<string>): string[] {
  return Object.keys(object).filter((key) => !allowed.has(key) && object[key] !== undefined);
}

/**
 * Validates one deck. Returns every problem it found rather than the first, so
 * a draft that has to be re-asked for can be re-asked for once.
 */
export function validateDeckSpec(input: unknown): DeckSpecValidation {
  const errors: string[] = [];
  if (!isObject(input)) return { ok: false, errors: ['deck: expected an object'] };

  for (const key of unknownKeys(input, SPEC_KEYS)) errors.push(`deck: unknown field '${key}'`);

  const title = clean(input.title);
  if (!title) errors.push('deck.title: required');
  else if (title.length > MAX_TITLE_CHARS) errors.push(`deck.title: longer than ${MAX_TITLE_CHARS} characters`);

  const subtitle = clean(input.subtitle);
  if (input.subtitle !== undefined && !subtitle) errors.push('deck.subtitle: must be a non-empty string when present');
  if (subtitle && subtitle.length > MAX_SUBTITLE_CHARS) errors.push(`deck.subtitle: longer than ${MAX_SUBTITLE_CHARS} characters`);

  let theme: DeckTheme | DeckThemeRef | undefined;
  if (input.theme !== undefined) theme = validateThemeChoice(input.theme, errors);

  if (!Array.isArray(input.slides) || input.slides.length === 0) {
    errors.push('deck.slides: at least one slide is required');
    return { ok: false, errors };
  }
  if (input.slides.length > MAX_SLIDES) errors.push(`deck.slides: ${input.slides.length} slides, the cap is ${MAX_SLIDES}`);

  const slides: DeckSlide[] = [];
  const seenIds = new Set<string>();
  input.slides.slice(0, MAX_SLIDES).forEach((raw, index) => {
    const slide = validateSlide(raw, index, seenIds, errors);
    if (slide) slides.push(slide);
  });

  if (errors.length) return { ok: false, errors };
  return {
    ok: true,
    spec: {
      title: title as string,
      ...(subtitle ? { subtitle } : {}),
      ...(theme ? { theme } : {}),
      slides,
    },
  };
}

/**
 * A built-in name or `{ ref }`. Anything else, and above all anything carrying
 * colours, is refused: a deck chooses among published themes, it cannot
 * inject a palette.
 */
function validateThemeChoice(raw: unknown, errors: string[]): DeckTheme | DeckThemeRef | undefined {
  const rule = "deck.theme: must be 'product', 'engineering', 'plain' or { ref: '<theme id>' } naming a theme you were given";
  if (typeof raw === 'string') {
    if (THEMES.has(raw)) return raw as DeckTheme;
    errors.push(rule);
    return undefined;
  }
  if (!isObject(raw)) { errors.push(rule); return undefined; }
  const extra = unknownKeys(raw, THEME_REF_KEYS);
  if (extra.length) {
    errors.push(`deck.theme: a deck names its theme and never describes it; only { ref } is accepted, not ${extra.map((k) => `'${k}'`).join(', ')}`);
    return undefined;
  }
  const ref = typeof raw.ref === 'string' ? raw.ref.trim() : '';
  if (!THEME_REF_PATTERN.test(ref)) { errors.push(`deck.theme.ref: must match ${THEME_REF_PATTERN} (a theme id you were given)`); return undefined; }
  return { ref };
}

function validateSlide(raw: unknown, index: number, seenIds: Set<string>, errors: string[]): DeckSlide | null {
  const at = `slides[${index}]`;
  if (!isObject(raw)) { errors.push(`${at}: expected an object`); return null; }
  for (const key of unknownKeys(raw, SLIDE_KEYS)) errors.push(`${at}: unknown field '${key}'`);

  const id = typeof raw.id === 'string' ? raw.id.trim() : '';
  if (!SLIDE_ID_PATTERN.test(id)) {
    errors.push(`${at}.id: must match ${SLIDE_ID_PATTERN} (letters, digits, '_' and '-')`);
  } else if (seenIds.has(id)) {
    errors.push(`${at}.id: '${id}' is used twice`);
  } else {
    seenIds.add(id);
  }

  const layout = typeof raw.layout === 'string' ? raw.layout : '';
  if (!LAYOUTS.has(layout)) errors.push(`${at}.layout: must be one of ${[...LAYOUTS].join(', ')}`);

  const title = clean(raw.title);
  if (!title) errors.push(`${at}.title: required`);
  else if (title.length > MAX_TITLE_CHARS) errors.push(`${at}.title: longer than ${MAX_TITLE_CHARS} characters`);

  const eyebrow = clean(raw.eyebrow);
  if (raw.eyebrow !== undefined && !eyebrow) errors.push(`${at}.eyebrow: must be a non-empty string when present`);
  if (eyebrow && eyebrow.length > MAX_EYEBROW_CHARS) errors.push(`${at}.eyebrow: longer than ${MAX_EYEBROW_CHARS} characters`);

  const notes = cleanMultiline(raw.notes);
  if (notes && notes.length > MAX_NOTES_CHARS) errors.push(`${at}.notes: longer than ${MAX_NOTES_CHARS} characters`);

  const bullets = raw.bullets === undefined ? undefined : validateBullets(raw.bullets, `${at}.bullets`, errors);
  const columns = raw.columns === undefined ? undefined : validateColumns(raw.columns, at, errors);
  const chart = raw.chart === undefined ? undefined : validateChart(raw.chart, `${at}.chart`, errors);
  const quote = raw.quote === undefined ? undefined : validateQuote(raw.quote, `${at}.quote`, errors);
  const image = raw.image === undefined ? undefined : validateImage(raw.image, `${at}.image`, errors);
  const figures = raw.figures === undefined ? undefined : validateFigures(raw.figures, `${at}.figures`, errors);
  const table = raw.table === undefined ? undefined : validateTable(raw.table, `${at}.table`, errors);
  const comparison = raw.comparison === undefined ? undefined : validateComparison(raw.comparison, `${at}.comparison`, errors);
  const timeline = raw.timeline === undefined ? undefined : validateTimeline(raw.timeline, `${at}.timeline`, errors);
  const agenda = raw.agenda === undefined ? undefined : validateAgenda(raw.agenda, `${at}.agenda`, errors);
  const closing = raw.closing === undefined ? undefined : validateClosing(raw.closing, `${at}.closing`, errors);

  // A layout's own payload belongs to it and nowhere else; bullets are the one
  // thing every layout may carry, as supporting text.
  if (layout === 'bullets' && !bullets?.length) errors.push(`${at}: a 'bullets' slide needs at least one bullet`);
  if (layout === 'two-column' && !columns) errors.push(`${at}: a 'two-column' slide needs columns`);
  if (layout === 'chart' && !chart) errors.push(`${at}: a 'chart' slide needs a chart`);
  if (layout === 'quote' && !quote) errors.push(`${at}: a 'quote' slide needs a quote`);
  if (layout === 'image' && !image) errors.push(`${at}: an 'image' slide needs image.alt`);
  if (columns && layout !== 'two-column') errors.push(`${at}.columns: only a 'two-column' slide may carry columns`);
  if (chart && layout !== 'chart') errors.push(`${at}.chart: only a 'chart' slide may carry a chart`);
  if (quote && layout !== 'quote') errors.push(`${at}.quote: only a 'quote' slide may carry a quote`);
  if (image && layout !== 'image') errors.push(`${at}.image: only an 'image' slide may carry an image`);
  const owned: Array<[unknown, string, string]> = [
    [figures, 'key-figures', 'figures'], [table, 'table', 'table'], [comparison, 'comparison', 'comparison'],
    [timeline, 'timeline', 'timeline'], [agenda, 'agenda', 'agenda'], [closing, 'closing', 'closing'],
  ];
  for (const [value, owner, field] of owned) {
    if (layout === owner && !value && raw[field] === undefined) errors.push(`${at}: a '${owner}' slide needs ${field}`);
    if (value && layout !== owner) errors.push(`${at}.${field}: only a '${owner}' slide may carry ${field}`);
  }
  if (layout === 'chart' && chart && chart.kind === 'pie' && chart.series.length !== 1) errors.push(`${at}.chart.series: a pie takes exactly one series`);
  if (layout === 'chart' && chart && chart.kind === 'pie' && chart.labels.length > MAX_PIE_SLICES) errors.push(`${at}.chart.labels: a pie takes at most ${MAX_PIE_SLICES} slices`);

  const sources = validateSources(raw.sources, at, errors);

  if (!id || !title || !LAYOUTS.has(layout)) return null;
  return {
    id,
    layout: layout as SlideLayout,
    title,
    ...(eyebrow ? { eyebrow } : {}),
    ...(bullets?.length ? { bullets } : {}),
    ...(columns ? { columns } : {}),
    ...(chart ? { chart } : {}),
    ...(quote ? { quote } : {}),
    ...(image ? { image } : {}),
    ...(figures ? { figures } : {}),
    ...(table ? { table } : {}),
    ...(comparison ? { comparison } : {}),
    ...(timeline ? { timeline } : {}),
    ...(agenda ? { agenda } : {}),
    ...(closing ? { closing } : {}),
    ...(notes ? { notes } : {}),
    sources,
  };
}

function validateBullets(raw: unknown, at: string, errors: string[]): string[] {
  if (!Array.isArray(raw)) { errors.push(`${at}: expected an array of strings`); return []; }
  if (raw.length > MAX_BULLETS_PER_SLIDE) errors.push(`${at}: ${raw.length} bullets, the cap is ${MAX_BULLETS_PER_SLIDE}`);
  const out: string[] = [];
  raw.slice(0, MAX_BULLETS_PER_SLIDE).forEach((item, index) => {
    const text = clean(item);
    if (!text) { errors.push(`${at}[${index}]: must be a non-empty string`); return; }
    if (text.length > MAX_BULLET_CHARS) { errors.push(`${at}[${index}]: longer than ${MAX_BULLET_CHARS} characters`); return; }
    out.push(text);
  });
  return out;
}

function validateColumns(raw: unknown, at: string, errors: string[]): [string[], string[]] | undefined {
  if (!Array.isArray(raw) || raw.length !== 2) { errors.push(`${at}.columns: expected exactly two arrays of bullets`); return undefined; }
  const left = validateBullets(raw[0], `${at}.columns[0]`, errors);
  const right = validateBullets(raw[1], `${at}.columns[1]`, errors);
  if (!left.length && !right.length) { errors.push(`${at}.columns: both columns are empty`); return undefined; }
  return [left, right];
}

function validateChart(raw: unknown, at: string, errors: string[]): DeckChart | undefined {
  if (!isObject(raw)) { errors.push(`${at}: expected an object`); return undefined; }
  for (const key of unknownKeys(raw, CHART_KEYS)) errors.push(`${at}: unknown field '${key}'`);
  const kind = typeof raw.kind === 'string' && CHART_KINDS.has(raw.kind) ? raw.kind as DeckChart['kind'] : undefined;
  if (!kind) errors.push(`${at}.kind: must be 'bar', 'line', 'stacked-bar' or 'pie'`);

  const labels: string[] = [];
  if (!Array.isArray(raw.labels) || raw.labels.length === 0) {
    errors.push(`${at}.labels: at least one label is required`);
  } else {
    if (raw.labels.length > MAX_CHART_LABELS) errors.push(`${at}.labels: ${raw.labels.length} labels, the cap is ${MAX_CHART_LABELS}`);
    raw.labels.slice(0, MAX_CHART_LABELS).forEach((label, index) => {
      const text = clean(label);
      if (!text) { errors.push(`${at}.labels[${index}]: must be a non-empty string`); return; }
      labels.push(text.slice(0, 40));
    });
  }

  const series: DeckChart['series'] = [];
  if (!Array.isArray(raw.series) || raw.series.length === 0) {
    errors.push(`${at}.series: at least one series is required`);
  } else {
    if (raw.series.length > MAX_CHART_SERIES) errors.push(`${at}.series: ${raw.series.length} series, the cap is ${MAX_CHART_SERIES}`);
    raw.series.slice(0, MAX_CHART_SERIES).forEach((entry, index) => {
      const where = `${at}.series[${index}]`;
      if (!isObject(entry)) { errors.push(`${where}: expected an object`); return; }
      for (const key of unknownKeys(entry, SERIES_KEYS)) errors.push(`${where}: unknown field '${key}'`);
      const name = clean(entry.name);
      if (!name) { errors.push(`${where}.name: required`); return; }
      if (!Array.isArray(entry.values) || entry.values.some((value) => typeof value !== 'number' || !Number.isFinite(value))) {
        errors.push(`${where}.values: expected finite numbers`);
        return;
      }
      if (entry.values.length !== labels.length) {
        errors.push(`${where}.values: ${entry.values.length} values for ${labels.length} labels`);
        return;
      }
      if (kind === 'pie' && (entry.values as number[]).some((v) => v < 0)) { errors.push(`${where}.values: a pie's values must be 0 or more`); return; }
      if (kind === 'pie' && !(entry.values as number[]).some((v) => v > 0)) { errors.push(`${where}.values: a pie needs at least one value above 0`); return; }
      series.push({ name: name.slice(0, 40), values: entry.values as number[] });
    });
  }

  if (!kind || !labels.length || !series.length) return undefined;
  return { kind, labels, series };
}

function validateQuote(raw: unknown, at: string, errors: string[]): DeckQuote | undefined {
  if (!isObject(raw)) { errors.push(`${at}: expected an object`); return undefined; }
  for (const key of unknownKeys(raw, QUOTE_KEYS)) errors.push(`${at}: unknown field '${key}'`);
  const text = clean(raw.text);
  const by = clean(raw.by);
  if (!text) errors.push(`${at}.text: required`);
  else if (text.length > MAX_QUOTE_CHARS) errors.push(`${at}.text: longer than ${MAX_QUOTE_CHARS} characters`);
  if (!by) errors.push(`${at}.by: required — an unattributed quote is not a source`);
  if (!text || !by) return undefined;
  return { text, by: by.slice(0, 80) };
}

function validateImage(raw: unknown, at: string, errors: string[]): DeckImage | undefined {
  if (!isObject(raw)) { errors.push(`${at}: expected an object`); return undefined; }
  for (const key of unknownKeys(raw, IMAGE_KEYS)) errors.push(`${at}: unknown field '${key}'`);
  const alt = clean(raw.alt);
  if (!alt) { errors.push(`${at}.alt: required`); return undefined; }
  if (alt.length > MAX_BULLET_CHARS) { errors.push(`${at}.alt: longer than ${MAX_BULLET_CHARS} characters`); return undefined; }
  return { alt };
}

/** A required short string, collapsed, within `max` characters; pushes the error and returns undefined otherwise. */
function shortText(raw: unknown, at: string, max: number, errors: string[], required = true): string | undefined {
  const text = clean(raw);
  if (raw === undefined && !required) return undefined;
  if (!text) { errors.push(required ? `${at}: required` : `${at}: must be a non-empty string when present`); return undefined; }
  if (text.length > max) { errors.push(`${at}: longer than ${max} characters`); return undefined; }
  return text;
}

/** An array of short strings between `min` and `max` long. */
function textList(raw: unknown, at: string, min: number, max: number, maxChars: number, errors: string[]): string[] {
  if (!Array.isArray(raw)) { errors.push(`${at}: expected an array of strings`); return []; }
  if (raw.length < min) errors.push(`${at}: ${raw.length} item${raw.length === 1 ? '' : 's'}, at least ${min} needed`);
  if (raw.length > max) errors.push(`${at}: ${raw.length} items, the cap is ${max}`);
  const out: string[] = [];
  raw.slice(0, max).forEach((item, i) => {
    const text = shortText(item, `${at}[${i}]`, maxChars, errors);
    if (text) out.push(text);
  });
  return out;
}

function validateFigures(raw: unknown, at: string, errors: string[]): DeckFigure[] | undefined {
  if (!Array.isArray(raw)) { errors.push(`${at}: expected an array of { value, label, delta? }`); return undefined; }
  if (raw.length < MIN_FIGURES || raw.length > MAX_FIGURES) errors.push(`${at}: ${raw.length} figures, expected ${MIN_FIGURES} to ${MAX_FIGURES}`);
  const out: DeckFigure[] = [];
  raw.slice(0, MAX_FIGURES).forEach((entry, i) => {
    const where = `${at}[${i}]`;
    if (!isObject(entry)) { errors.push(`${where}: expected an object`); return; }
    for (const key of unknownKeys(entry, FIGURE_KEYS)) errors.push(`${where}: unknown field '${key}'`);
    const value = shortText(entry.value, `${where}.value`, MAX_FIGURE_VALUE_CHARS, errors);
    const label = shortText(entry.label, `${where}.label`, MAX_FIGURE_LABEL_CHARS, errors);
    const delta = shortText(entry.delta, `${where}.delta`, MAX_FIGURE_DELTA_CHARS, errors, false);
    if (value && label) out.push({ value, label, ...(delta ? { delta } : {}) });
  });
  return out.length >= MIN_FIGURES && out.length === raw.length ? out : undefined;
}

function validateTable(raw: unknown, at: string, errors: string[]): DeckTable | undefined {
  if (!isObject(raw)) { errors.push(`${at}: expected { header, rows }`); return undefined; }
  for (const key of unknownKeys(raw, TABLE_KEYS)) errors.push(`${at}: unknown field '${key}'`);
  const before = errors.length;
  const header = textList(raw.header, `${at}.header`, 1, MAX_TABLE_COLUMNS, MAX_TABLE_CELL_CHARS, errors);
  const rows: string[][] = [];
  if (!Array.isArray(raw.rows) || raw.rows.length === 0) errors.push(`${at}.rows: at least one row is required`);
  else {
    if (raw.rows.length > MAX_TABLE_ROWS) errors.push(`${at}.rows: ${raw.rows.length} rows, the cap is ${MAX_TABLE_ROWS}`);
    raw.rows.slice(0, MAX_TABLE_ROWS).forEach((row, i) => {
      const where = `${at}.rows[${i}]`;
      if (!Array.isArray(row)) { errors.push(`${where}: expected an array of strings`); return; }
      if (row.length !== header.length) { errors.push(`${where}: ${row.length} cells for ${header.length} columns`); return; }
      // An empty cell is allowed (a blank in a table reads as "none"); a long one is not.
      const cells = row.map((cell, j) => {
        if (cell === '' ) return '';
        return shortText(cell, `${where}[${j}]`, MAX_TABLE_CELL_CHARS, errors) ?? '';
      });
      rows.push(cells);
    });
  }
  return errors.length === before ? { header, rows } : undefined;
}

function validateComparison(raw: unknown, at: string, errors: string[]): DeckComparison | undefined {
  if (!isObject(raw)) { errors.push(`${at}: expected { left, right, verdict? }`); return undefined; }
  for (const key of unknownKeys(raw, COMPARISON_KEYS)) errors.push(`${at}: unknown field '${key}'`);
  const before = errors.length;
  const side = (v: unknown, where: string): DeckComparisonSide | undefined => {
    if (!isObject(v)) { errors.push(`${where}: expected { title, points }`); return undefined; }
    for (const key of unknownKeys(v, SIDE_KEYS)) errors.push(`${where}: unknown field '${key}'`);
    const title = shortText(v.title, `${where}.title`, MAX_COMPARISON_TITLE_CHARS, errors);
    const points = textList(v.points, `${where}.points`, 1, MAX_COMPARISON_POINTS, MAX_COMPARISON_POINT_CHARS, errors);
    return title ? { title, points } : undefined;
  };
  const left = side(raw.left, `${at}.left`);
  const right = side(raw.right, `${at}.right`);
  const verdict = shortText(raw.verdict, `${at}.verdict`, MAX_VERDICT_CHARS, errors, false);
  if (errors.length !== before || !left || !right) return undefined;
  return { left, right, ...(verdict ? { verdict } : {}) };
}

function validateTimeline(raw: unknown, at: string, errors: string[]): DeckTimelineStep[] | undefined {
  if (!Array.isArray(raw)) { errors.push(`${at}: expected an array of { date, label, detail? }`); return undefined; }
  const before = errors.length;
  if (raw.length < MIN_TIMELINE_STEPS || raw.length > MAX_TIMELINE_STEPS) errors.push(`${at}: ${raw.length} steps, expected ${MIN_TIMELINE_STEPS} to ${MAX_TIMELINE_STEPS}`);
  const out: DeckTimelineStep[] = [];
  raw.slice(0, MAX_TIMELINE_STEPS).forEach((entry, i) => {
    const where = `${at}[${i}]`;
    if (!isObject(entry)) { errors.push(`${where}: expected an object`); return; }
    for (const key of unknownKeys(entry, STEP_KEYS)) errors.push(`${where}: unknown field '${key}'`);
    const date = shortText(entry.date, `${where}.date`, MAX_TIMELINE_DATE_CHARS, errors);
    const label = shortText(entry.label, `${where}.label`, MAX_TIMELINE_LABEL_CHARS, errors);
    const detail = shortText(entry.detail, `${where}.detail`, MAX_TIMELINE_DETAIL_CHARS, errors, false);
    if (date && label) out.push({ date, label, ...(detail ? { detail } : {}) });
  });
  return errors.length === before ? out : undefined;
}

function validateAgenda(raw: unknown, at: string, errors: string[]): DeckAgenda | undefined {
  if (!isObject(raw)) { errors.push(`${at}: expected { items, current? }`); return undefined; }
  for (const key of unknownKeys(raw, AGENDA_KEYS)) errors.push(`${at}: unknown field '${key}'`);
  const before = errors.length;
  const items = textList(raw.items, `${at}.items`, 1, MAX_AGENDA_ITEMS, MAX_AGENDA_ITEM_CHARS, errors);
  let current: number | undefined;
  if (raw.current !== undefined) {
    if (typeof raw.current !== 'number' || !Number.isInteger(raw.current) || raw.current < 0 || raw.current >= items.length) {
      errors.push(`${at}.current: must be the 0-based position of one of the ${items.length} items`);
    } else current = raw.current;
  }
  return errors.length === before ? { items, ...(current !== undefined ? { current } : {}) } : undefined;
}

function validateClosing(raw: unknown, at: string, errors: string[]): DeckClosing | undefined {
  if (!isObject(raw)) { errors.push(`${at}: expected { line, nextSteps?, contact? }`); return undefined; }
  for (const key of unknownKeys(raw, CLOSING_KEYS)) errors.push(`${at}: unknown field '${key}'`);
  const before = errors.length;
  const line = shortText(raw.line, `${at}.line`, MAX_CLOSING_LINE_CHARS, errors);
  const nextSteps = raw.nextSteps === undefined ? undefined : textList(raw.nextSteps, `${at}.nextSteps`, 1, MAX_NEXT_STEPS, MAX_NEXT_STEP_CHARS, errors);
  const contact = shortText(raw.contact, `${at}.contact`, MAX_CONTACT_CHARS, errors, false);
  if (errors.length !== before || !line) return undefined;
  return { line, ...(nextSteps?.length ? { nextSteps } : {}), ...(contact ? { contact } : {}) };
}

/**
 * The rule that makes this a grounded generator: a slide with no citation is
 * refused. Rendering it would be the deck asserting something no input said.
 */
function validateSources(raw: unknown, at: string, errors: string[]): DeckSource[] {
  if (!Array.isArray(raw) || raw.length === 0) {
    errors.push(`${at}.sources: every slide must cite at least one source document`);
    return [];
  }
  if (raw.length > MAX_SOURCES_PER_SLIDE) errors.push(`${at}.sources: ${raw.length} sources, the cap is ${MAX_SOURCES_PER_SLIDE}`);
  const out: DeckSource[] = [];
  raw.slice(0, MAX_SOURCES_PER_SLIDE).forEach((entry, index) => {
    const where = `${at}.sources[${index}]`;
    if (!isObject(entry)) { errors.push(`${where}: expected an object`); return; }
    for (const key of unknownKeys(entry, SOURCE_KEYS)) errors.push(`${where}: unknown field '${key}'`);
    const documentId = clean(entry.documentId);
    const title = clean(entry.title);
    const anchor = clean(entry.anchor);
    if (!documentId) { errors.push(`${where}.documentId: required`); return; }
    if (!title) { errors.push(`${where}.title: required`); return; }
    out.push({
      documentId: documentId.slice(0, 200),
      ...(anchor ? { anchor: anchor.slice(0, 120) } : {}),
      title: title.slice(0, 160),
    });
  });
  if (!out.length) errors.push(`${at}.sources: no usable source survived validation`);
  return out;
}
