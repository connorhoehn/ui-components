import { type Ref, type RefObject } from 'react';
/**
 * One thread, reduced to what a card can show before the reader commits to
 * opening the whole discussion.
 *
 * Structural, not imported: this package keeps zero runtime dependency on
 * realtime-modules, so the host maps its own comment rows onto this.
 */
export interface CommentGhostThread {
    /** Matches the `data-comment-id` on the painted range. */
    id: string;
    /** Display name of whoever opened the thread. */
    author: string;
    /** The first comment. Clamped in the card — this is a preview, not the thread. */
    text: string;
    /** Replies below the first comment. Absent and 0 both read as "no replies". */
    replyCount?: number;
    resolved?: boolean;
    /** ISO timestamp, rendered as relative time. */
    timestamp?: string;
    /** Author colour, so the ghost card and the gutter card agree. */
    color?: string;
    /**
     * The text the thread was anchored to. Worth showing because a ghost can be
     * opened from a mark the reader has not read yet.
     */
    quote?: string;
}
/** Imperative surface, for wiring the extension's click callback. */
export interface CommentGhostPopoverHandle {
    /**
     * Opens the card for `id`. The anchor element is optional: without one the
     * mark is looked up inside the container, so a host-driven "jump to next
     * comment" needs only the id.
     */
    openComment: (id: string, anchor?: Element | null) => void;
    close: () => void;
}
export interface CommentGhostPopoverProps {
    /** Every thread that could be behind a mark. Unknown ids never open a card. */
    threads: readonly CommentGhostThread[];
    /**
     * The element the painted ranges live in — the `.doc-page` sheet. Hover and
     * click delegation binds here.
     *
     * Must already be attached when this mounts, which it is whenever both live
     * in the same tree: refs are assigned during commit, before effects run.
     */
    containerRef?: RefObject<HTMLElement | null>;
    /** Dwell before a hover opens a card, so a pointer crossing the line is ignored. */
    hoverDelayMs?: number;
    /**
     * Hover-to-open. Turn it off in an editing mode: opening the card takes
     * focus, and a card that opens because the pointer drifted over a word steals
     * the caret mid-sentence.
     */
    hoverEnabled?: boolean;
    /**
     * Fires as the open thread changes (null when it closes). The reason to wire
     * it: the host can flip that thread's `CommentHighlight` state to `active`,
     * so the mark under the card is the prominent one.
     */
    onOpenChange?: (id: string | null) => void;
    /** "Open thread" — show the full discussion (a panel, a drawer, the gutter). */
    onOpenThread?: (id: string) => void;
    /** Omitted when the reader may not resolve; never offered on a resolved thread. */
    onResolve?: (id: string) => void;
    ref?: Ref<CommentGhostPopoverHandle>;
    'data-testid'?: string;
}
/** "no replies" / "1 reply" / "4 replies" — the count is the thread's weight. */
export declare function replyLabel(count: number): string;
export default function CommentGhostPopover({ threads, containerRef, hoverDelayMs, hoverEnabled, onOpenChange, onOpenThread, onResolve, ref, 'data-testid': testId, }: CommentGhostPopoverProps): import("react").JSX.Element;
//# sourceMappingURL=CommentGhostPopover.d.ts.map