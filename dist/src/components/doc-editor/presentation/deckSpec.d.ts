export type DeckTheme = 'product' | 'engineering' | 'plain';
export type SlideLayout = 'title' | 'section' | 'bullets' | 'two-column' | 'chart' | 'quote' | 'image';
/** A citation: the document the claim came from, and (optionally) where in it. */
export interface DeckSource {
    documentId: string;
    anchor?: string;
    title: string;
}
export interface DeckChart {
    kind: 'bar' | 'line';
    labels: string[];
    series: Array<{
        name: string;
        values: number[];
    }>;
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
export declare const MAX_SLIDES = 40;
export declare const MAX_BULLETS_PER_SLIDE = 8;
export declare const MAX_BULLET_CHARS = 200;
export declare const MAX_TITLE_CHARS = 120;
export declare const MAX_SUBTITLE_CHARS = 200;
export declare const MAX_EYEBROW_CHARS = 60;
export declare const MAX_NOTES_CHARS = 2000;
export declare const MAX_CHART_LABELS = 24;
export declare const MAX_CHART_SERIES = 6;
export declare const MAX_QUOTE_CHARS = 400;
export declare const MAX_SOURCES_PER_SLIDE = 10;
/** Slide ids stay filename- and handle-safe: they end up in preview handles. */
export declare const SLIDE_ID_PATTERN: RegExp;
export declare const SLIDE_LAYOUTS: readonly SlideLayout[];
/** What each layout is FOR, in the words a person picking one needs. */
export declare const SLIDE_LAYOUT_LABELS: Record<SlideLayout, string>;
export declare const DECK_THEMES: readonly DeckTheme[];
/**
 * Slides that cite nothing, in deck order.
 *
 * The editor's only hard validation. Empty array means the spec can be saved;
 * anything else is the list the warning names and the reason Save is off.
 */
export declare function uncitedSlideIds(spec: DeckSpec): string[];
/** True when nothing blocks a save. Kept separate so the host can ask too. */
export declare function canSaveDeck(spec: DeckSpec): boolean;
/**
 * A slide id that is unique within the deck and passes `SLIDE_ID_PATTERN`.
 *
 * Counts up from the deck's size rather than hashing or using a UUID: the ids
 * end up in preview handles a person reads in a URL, and `s7` is a better
 * thing to read than a 36-character guid.
 */
export declare function nextSlideId(spec: DeckSpec, prefix?: string): string;
/** A blank slide of a layout, with the sub-object that layout needs. */
export declare function makeSlide(id: string, layout?: SlideLayout): DeckSlide;
/**
 * Move a slide's layout, keeping everything the new layout can still use.
 *
 * Content is NOT discarded on a layout change: a bullets slide turned into a
 * chart keeps its bullets, so turning it back does not lose the words. The
 * generator ignores the fields a layout does not read, and the alternative —
 * deleting them — makes the layout picker a destructive control people learn
 * to avoid.
 */
export declare function withLayoutDefaults(slide: DeckSlide, layout: SlideLayout): DeckSlide;
/** Replace one slide by id. Returns the same spec object when nothing matched. */
export declare function replaceSlide(spec: DeckSpec, slide: DeckSlide): DeckSpec;
/** Move the slide at `from` so it lands at `to`. Out-of-range moves are no-ops. */
export declare function moveSlide(spec: DeckSpec, from: number, to: number): DeckSpec;
/** Insert a fresh slide after `afterIndex` (-1 puts it first). */
export declare function addSlide(spec: DeckSpec, afterIndex: number, layout?: SlideLayout): DeckSpec;
/**
 * Copy a slide, sources included.
 *
 * The citations come along deliberately: a duplicate is nearly always the same
 * claim said differently, and a copy that arrived uncited would be a copy that
 * cannot be saved.
 */
export declare function duplicateSlide(spec: DeckSpec, id: string): DeckSpec;
/** Drop a slide. The last slide cannot be removed — a deck of none is not a deck. */
export declare function removeSlide(spec: DeckSpec, id: string): DeckSpec;
/**
 * The next revision's label, given the ones that exist.
 *
 * Reads the numbers off `v<n>` labels rather than counting rows, because a
 * revision list can be paged or filtered and "Save as v3" over four revisions
 * is a promise the server would have to break.
 */
export declare function nextRevisionLabel(revisions: readonly {
    label: string;
}[]): string;
//# sourceMappingURL=deckSpec.d.ts.map