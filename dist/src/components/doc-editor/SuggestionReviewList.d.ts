import type { ReactNode } from 'react';
export interface SuggestionReviewListProps {
    /** How many are open — the count in the header. */
    count: number;
    /** The cards. */
    children?: ReactNode;
    /** Present, the header offers Accept all / Reject all. Absent for a reader who cannot resolve. */
    onAcceptAll?: () => void;
    onRejectAll?: () => void;
    /** Label of the accept-all button. Default "Accept all" — e.g. "Add selected as follow-ups" for a chosen subset. */
    acceptLabel?: string;
    /**
     * Per-item selection: how many cards are ticked (`SuggestionCard` `selected`). When given,
     * the accept-all button counts them ("Add selected (2)") and is disabled at zero, so it
     * acts on the chosen subset rather than everything.
     */
    selectedCount?: number;
    /** Something a resolution just refused, above the list. */
    error?: string | null;
    /** Something else the header should carry — a mode switch, say. */
    headerExtra?: ReactNode;
    /** Copy for the empty list. */
    emptyTitle?: string;
    emptyBody?: string;
    title?: string;
    /**
     * `card` (default) is a bordered, titled card for a page margin. `pane` is
     * the same list hosted inside a tab or side column that already names it:
     * no card chrome, no title, a slim toolbar carrying the count and the
     * whole-document resolutions, and its own gutter.
     */
    variant?: 'card' | 'pane';
    className?: string;
    'data-testid'?: string;
}
export declare function SuggestionReviewList({ count, children, onAcceptAll, onRejectAll, acceptLabel, selectedCount, error, headerExtra, emptyTitle, emptyBody, title, variant, className, 'data-testid': testId, }: SuggestionReviewListProps): import("react").JSX.Element;
export default SuggestionReviewList;
//# sourceMappingURL=SuggestionReviewList.d.ts.map