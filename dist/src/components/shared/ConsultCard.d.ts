import { type ReactNode } from 'react';
export interface ConsultCardProps {
    /** The agent's question. */
    question: string;
    /** What the agent was doing when it asked. */
    context?: string;
    /** Where it came from — repo, box, session. Rendered as quiet chips. */
    origin?: readonly string[];
    /** ISO timestamp or preformatted "asked 4m ago" string. */
    askedAt?: string;
    status: 'pending' | 'answered' | 'expired' | 'withdrawn';
    answer?: string;
    answeredBy?: string;
    /** Submit an answer. Only rendered while status is 'pending'. */
    onAnswer?: (answer: string) => void;
    answerPlaceholder?: string;
    busy?: boolean;
    /**
     * Extra footer content, e.g. a link to the session. Rendered in EVERY
     * state: beside the send button while answerable, on its own row when the
     * card is pending but has no `onAnswer` — the one state where this is the
     * card's only affordance, and the one state where it used to be dropped.
     */
    footer?: ReactNode;
    /**
     * Draw no frame of its own — no border, radius, padding or background — for
     * a card sitting inside a list group that already supplies them. The
     * pending signal stays on the "agent waiting" chip.
     */
    flush?: boolean;
    className?: string;
    'data-testid'?: string;
}
export declare function ConsultCard({ question, context, origin, askedAt, status, answer, answeredBy, onAnswer, answerPlaceholder, busy, footer, flush, className, 'data-testid': testId, }: ConsultCardProps): import("react").JSX.Element;
export default ConsultCard;
//# sourceMappingURL=ConsultCard.d.ts.map