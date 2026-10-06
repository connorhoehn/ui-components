import type { ReactNode } from 'react';
import type { Tone } from './tones';
export interface SuggestionCardProps {
    /** Why this is being suggested. Shown above the title — see the note above. */
    reason: string;
    /** The thing itself. */
    title: string;
    /**
     * Short category shown as a pill beside the reason, e.g. "blocked".
     * Omit where every suggestion on screen is the same kind.
     */
    label?: string;
    /** Tone for the label pill. Defaults to neutral. */
    tone?: Tone;
    /** What acting costs — estimates, owner, target. Kept to one line. */
    meta?: ReactNode;
    /** Where it points, e.g. an initiative. Rendered as a quiet trailing note. */
    context?: string;
    /** Primary action. The whole card is the hit target. */
    onSelect: () => void;
    /** Verb for the action, shown on hover/focus. Default "Use this". */
    actionLabel?: string;
    disabled?: boolean;
    className?: string;
    'data-testid'?: string;
}
export declare function SuggestionCard({ reason, title, label, tone, meta, context, onSelect, actionLabel, disabled, className, 'data-testid': testId, }: SuggestionCardProps): import("react").JSX.Element;
export default SuggestionCard;
//# sourceMappingURL=SuggestionCard.d.ts.map