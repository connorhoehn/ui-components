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
    /** Extra footer content, e.g. a link to the session. */
    footer?: ReactNode;
    className?: string;
    'data-testid'?: string;
}
export declare function ConsultCard({ question, context, origin, askedAt, status, answer, answeredBy, onAnswer, answerPlaceholder, busy, footer, className, 'data-testid': testId, }: ConsultCardProps): import("react").JSX.Element;
export default ConsultCard;
//# sourceMappingURL=ConsultCard.d.ts.map