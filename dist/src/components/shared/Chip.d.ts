import type { CSSProperties, ReactNode } from 'react';
import { type SurfaceTone, type ToneOrAlias } from './tones';
/** @see Tone — the library-wide semantic tone scale. */
export type ChipTone = ToneOrAlias;
/**
 * `tone` was already spoken for by the semantic scale, so the surface-family
 * axis is `palette` here. Same idea as `TitledFrame`'s `tone`, different word
 * only because renaming the seven-year-old `tone` prop would break every one
 * of Chip's several hundred call sites.
 */
export type ChipPalette = SurfaceTone;
export interface ChipProps {
    tone?: ChipTone;
    /**
     * Colour family. `surface` (default) follows the host theme; `code` paints
     * in the permanently-dark terminal palette, for chips inside a log console,
     * debugger or terminal pane.
     */
    palette?: ChipPalette;
    /** `lg` since 2.396.0: 14px regular text, 10px × 4px padding, 6px corners. */
    size?: 'lg' | 'md' | 'sm' | 'xs';
    /** Solid fill (dark bg + white text) instead of soft tint. */
    solid?: boolean;
    /**
     * Translucent fill — the tone colour at 15% opacity behind text in that
     * same colour, rather than the soft variant's opaque `-bg` token. Matches
     * the pipeline debugger's status badges, which sit directly on
     * `code-bg`/other tinted chrome and don't want their own opaque card.
     * Takes precedence over `solid` if both are set.
     */
    translucent?: boolean;
    /**
     * Outlined: a 1px border in the tone's `-border`, the tone's text colour,
     * and a faint surface wash instead of the soft `-bg` fill — a tag that sits
     * on an already-tinted row (the "Blocked" chip on `ActionRowList
     * tone="warning"`) without stacking a second tint on it. `surface` palette
     * only; ignored with `solid`/`translucent`. Since 2.393.1.
     *
     * `'soft'` (since 2.396.0): the same tone border and text over the tone's
     * pale `-bg` fill rather than the surface wash — a tag that should still
     * read as tinted on a tinted row (the Initiatives v2 "Blocked": pale red
     * fill, soft red border, red text).
     */
    outline?: boolean | 'soft';
    /** Monospace font — for count badges. */
    mono?: boolean;
    /** Indicator dot. 'static' = filled circle, 'pulse' = filled circle
     *  with an animated outer ping (matches Badge variant="pulse"). */
    dot?: 'static' | 'pulse';
    /** Uppercase the label with letter-spacing — the "REC" / "LIVE"
     *  pattern common to status pills. */
    uppercase?: boolean;
    /** Optional leading icon (SVG element). Sized by the chip's `size`. */
    icon?: ReactNode;
    children: ReactNode;
    title?: string;
    className?: string;
    style?: CSSProperties;
    'data-testid'?: string;
    'aria-label'?: string;
    /** When set, the chip renders as an `<a href>` instead of a `<span>`,
     *  carrying the same classes. `rel="noopener noreferrer"` is always
     *  applied — see `external` for `target="_blank"`. */
    href?: string;
    /** Only meaningful with `href`. Opens in a new tab (`target="_blank"`),
     *  matching `Link`'s `external` prop. */
    external?: boolean;
    /**
     * Renders a dismiss control inside the chip. A removable chip is a token in
     * a multi-select (approvers, tags, filters), and every host that needed one
     * hand-rolled the same borderless `<button>` — `Button`'s boxed variants
     * were too heavy for a 12px glyph in a pill and `IconButton`'s smallest size
     * is a 24px square. This uses `Button variant="link"`, which is exactly the
     * inline, unpadded, font-size-inheriting control that shape wants.
     */
    onRemove?: () => void;
    /**
     * Accessible name for the remove control. Defaults to `Remove`, which is
     * fine for a lone chip and useless in a row of eight — pass
     * `removeLabel={`Remove ${name}`}` whenever the chip is one of several.
     */
    removeLabel?: string;
    /** `data-testid` on the remove control. */
    removeTestId?: string;
    /** Glyph inside the remove control. Defaults to a multiplication sign. */
    removeIcon?: ReactNode;
}
export default function Chip({ tone, palette, size, solid, translucent, outline, mono, dot, uppercase, icon, children, title, className, style, 'data-testid': testId, 'aria-label': ariaLabel, href, external, onRemove, removeLabel, removeTestId, removeIcon, }: ChipProps): import("react").JSX.Element;
//# sourceMappingURL=Chip.d.ts.map