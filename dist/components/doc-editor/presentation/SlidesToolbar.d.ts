import type { ReactNode } from 'react';
import { type DeckChart, type DeckSlide, type DeckTheme, type SlideLayout } from './deckSpec';
/** The layouts the Insert menu offers, in the order a person reaches for them. */
export declare const SLIDE_INSERTS: readonly SlideLayout[];
/** One-row layouts, widest first. */
export type SlidesToolbarSize = 'wide' | 'medium' | 'narrow';
/**
 * Content-box widths (px) of the bar itself, not the window.
 *
 * - wide (≥ 900): everything inline, the style note included.
 * - medium (≥ 600): Insert, Theme and the style note move behind ⋯; New
 *   slide, Layout, the chart switch, Undo/Redo, `end` and Present stay.
 * - narrow: Layout and the chart switch join them behind ⋯.
 *
 * Measured with every control on (a chart slide, undo/redo, Present): the
 * wide bar's natural width is ~850px, medium's ~560px, narrow's ~340px. The
 * deck editor's bar in the shell is ~870px at a 1280px window.
 */
export declare const SLIDES_TOOLBAR_BREAKPOINTS: {
    readonly narrow: 600;
    readonly wide: 900;
};
/** `null` — not measured yet — is wide: a first paint that hides controls and then shows them is worse than one frame of overflow. */
export declare function slidesToolbarSize(width: number | null): SlidesToolbarSize;
export interface SlidesToolbarProps {
    /** The slide on the stage. Layout and the chart switch act on it. */
    slide?: DeckSlide;
    theme: DeckTheme;
    /** Adds a slide after the current one. `layout` comes from Insert. */
    onAddSlide: (layout?: SlideLayout) => void;
    /** False at the deck's slide cap. */
    canAddSlide?: boolean;
    onLayoutChange: (layout: SlideLayout) => void;
    onThemeChange: (theme: DeckTheme) => void;
    onChartKindChange?: (kind: DeckChart['kind']) => void;
    onUndo?: () => void;
    onRedo?: () => void;
    canUndo?: boolean;
    canRedo?: boolean;
    /** Renders Present. */
    onPresent?: () => void;
    /** Before Present — revision tabs, Save, Download when the host has no header for them. */
    end?: ReactNode;
    disabled?: boolean;
    className?: string;
    /** Prefix for the controls' test ids. Default `slides-toolbar`. */
    testIdPrefix?: string;
    /**
     * How much of the bar fits on ONE row. `auto` (the default) measures the
     * bar's own box — see `SLIDES_TOOLBAR_BREAKPOINTS`. A fixed value is for
     * tests and stories.
     */
    size?: SlidesToolbarSize | 'auto';
}
export declare function SlidesToolbar({ slide, theme, onAddSlide, canAddSlide, onLayoutChange, onThemeChange, onChartKindChange, onUndo, onRedo, canUndo, canRedo, onPresent, end, disabled, className, testIdPrefix, size: sizeProp, }: SlidesToolbarProps): import("react").JSX.Element;
export default SlidesToolbar;
//# sourceMappingURL=SlidesToolbar.d.ts.map