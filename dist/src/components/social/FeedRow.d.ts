import type { HTMLAttributes, ReactNode } from 'react';
import { type Tone } from '../shared/tones';
export interface FeedRowProps extends Omit<HTMLAttributes<HTMLLIElement>, 'title' | 'children'> {
    /**
     * Left-hand visual: a thumbnail, an avatar, a glyph, a status disc. Rendered
     * OUTSIDE the jump so anything it announces survives — see above. Give it an
     * accessible name if it carries meaning, and `aria-hidden` if it does not.
     */
    leading: ReactNode;
    /**
     * Line one. `string`, not `ReactNode`, on purpose: it is also the line's
     * `title` attribute, and a caller who could pass markup could pass a second
     * line. Truncates.
     */
    title: string;
    /**
     * Right-aligned on the title line — already formatted, and short. A feed
     * column is read by shape ("14:03", "Yesterday", "Tue"), so a phrase like
     * "3 days ago" costs the reader arithmetic and cannot be scanned.
     *
     * Callers used to stuff this into `meta`, where it sat third in a run of
     * middle-dots and was the first thing to be truncated away.
     */
    timestamp?: string;
    /** ISO-8601 behind the stamp. Its presence is what makes the stamp a `<time>`. */
    timestampIso?: string;
    /** Hover text for the stamp — the full instant the abbreviation stands for. */
    timestampTitle?: string;
    /**
     * Line two: who, and where. Required, because a row whose second line is
     * sometimes absent is a list of two different heights. Truncates.
     */
    meta: string;
    /**
     * Colours line two when it carries a state rather than context — `danger`
     * for a run's error text, which read as ordinary grey metadata beside
     * "Hank Anderson · 180 KB". Omit for the quiet default.
     */
    metaTone?: Tone;
    /** Trailing controls — unpin, download, Approve/Reject. Never the jump: the row is the jump. */
    actions?: ReactNode;
    onJump?: () => void;
    /**
     * The jump's accessible name. It replaces the row's text for a screen
     * reader, so say where it goes: "Go to the pinned message from Hank".
     */
    jumpLabel?: string;
    /** Draws a dot over `leading` and reflects `data-unread` for selection. */
    unread?: boolean;
    /** Also spelled onto the jump as `<testid>-jump`, so it can be clicked by name. */
    'data-testid'?: string;
}
export declare function FeedRow({ leading, title, timestamp, timestampIso, timestampTitle, meta, metaTone, actions, onJump, jumpLabel, unread, className, 'data-testid': testId, ...rest }: FeedRowProps): import("react").JSX.Element;
export default FeedRow;
//# sourceMappingURL=FeedRow.d.ts.map