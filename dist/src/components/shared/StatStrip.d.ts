import { type ReactNode } from 'react';
import { type Tone } from './tones';
/** A cluster's health line: a tone dot and a short worded state. */
export interface StatStripStatus {
    label: string;
    /** Default `neutral` (secondary ink). */
    tone?: Tone;
}
export interface StatStripItem {
    label: string;
    value: ReactNode;
    hint?: ReactNode;
    tone?: 'default' | 'accent' | 'danger';
    /** A line under the value — "● 50m behind". Since 2.388.0. */
    status?: StatStripStatus | null;
    /** Native tooltip on the cluster (the full hint, provenance). Since 2.388.0. */
    title?: string;
    onSelect?: () => void;
    href?: string;
    /**
     * A thin bar under the cluster — "18 / 52 points delivered" with its fill.
     * Drawn only when `max` is above zero and `value` is finite (nothing is
     * drawn for "we do not know"). Since 2.390.0.
     */
    progress?: {
        value: number;
        max: number;
    } | null;
}
/** A labelled arrow between two clusters — "Compact", "Publish". */
export interface StatStripConnector {
    label: string;
    /** Tints the arrow and its label. Default: tertiary ink. */
    tone?: Tone;
}
export interface StatStripProps {
    items: StatStripItem[];
    /**
     * Drop the strip's own border, rounding and fill so a host frame can
     * provide them — the same escape hatch DataTable has.
     *
     * The strip is a card by default, which is right when it sits on the page.
     * Inside another Card it reads as a card in a card: two nested rounded
     * boxes a few pixels apart, which is visual noise standing in for a
     * hierarchy that isn't there. The dividers between clusters stay, since
     * those separate the numbers from each other, not the strip from the page.
     */
    frameless?: boolean;
    /**
     * Since 2.388.0: `connectors[i]` is drawn between `items[i]` and
     * `items[i + 1]` as a labelled arrow, replacing the divider there. A strip
     * with connectors reads left to right as a flow. Extra entries are ignored;
     * a missing one leaves a plain gap.
     */
    connectors?: StatStripConnector[];
    /**
     * `default`: the label over a 17px value (a KPI card, compressed).
     * `inline` (since 2.390.0): the value then its label on ONE line, sentence
     * case — "**18** / 52 points delivered · **2** agents running · **$1.73**
     * spent of $95 allocated" — with dividers between clusters, no card, and a
     * rule under the strip. The label is the words after the number, so write
     * it as the rest of the sentence.
     *
     * `line` (since 2.392.0): ONE unboxed line of prose-weight stats, clusters
     * separated by a muted "•" — "**18** / 52 points delivered ▬▬▭▭ • **2**
     * agents running • **$1.73** of $95 spent". No dividers, no rule, no card;
     * a cluster's `progress` is drawn as a 150px bar INLINE after its label
     * rather than under it. `hint` and `status` are not drawn (use `title`).
     * The line wraps between clusters, never inside one.
     */
    variant?: 'default' | 'inline' | 'line';
    className?: string;
    'aria-label'?: string;
    'data-testid'?: string;
}
export declare function StatStrip({ items, frameless, connectors, variant, className, 'aria-label': ariaLabel, 'data-testid': testId, }: StatStripProps): import("react").JSX.Element;
export default StatStrip;
//# sourceMappingURL=StatStrip.d.ts.map