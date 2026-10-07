import { type ReactNode } from 'react';
export interface PersonCardData {
    userId?: string;
    displayName: string;
    /** Job title / role, e.g. "Staff Engineer". */
    title?: string;
    email?: string;
    /** Team or department. */
    department?: string;
    /** Local time where they are, already formatted, e.g. "3:42 PM". */
    localTime?: string;
    avatarUrl?: string;
    color?: string;
    /** true → online, false → offline, undefined → unknown (no dot). */
    online?: boolean;
    /** Free-text status, e.g. "In a meeting". */
    statusText?: string;
}
export interface PersonHoverCardProps {
    person: PersonCardData;
    /** The inline element that opens the card — usually the person's name. */
    children: ReactNode;
    /** Actions rendered at the foot of the card (Message, Call, …). */
    actions?: ReactNode;
    /**
     * Extra content between the identity block and the actions — skills,
     * a score, recent work. Domain-shaped detail the card itself should not
     * try to model, since every product means something different by it.
     */
    details?: ReactNode;
    /**
     * Set when `children` is ITSELF interactive — a link or a button.
     *
     * The trigger is normally a `role="button"` span so the card is reachable
     * without a pointer. But wrapping a link in that produces a link inside a
     * button: two nested activation targets with different destinations, which
     * assistive tech announces as one confused control and which swallows the
     * link's own Enter behaviour. With this set the wrapper keeps only the
     * pointer handlers and lets the child own focus and activation — hover
     * still opens the card, and focusing the link still opens it, because
     * React's onFocus is focusin and bubbles from the child.
     */
    interactiveChild?: boolean;
    /** ms before hover opens the card. */
    openDelay?: number;
    /** ms before leaving closes it. Must outlast the trigger→panel pointer trip. */
    closeDelay?: number;
    className?: string;
    'data-testid'?: string;
}
export declare function PersonHoverCard({ person, children, actions, details, interactiveChild, openDelay, closeDelay, className, 'data-testid': testId, }: PersonHoverCardProps): import("react").JSX.Element;
export default PersonHoverCard;
//# sourceMappingURL=PersonHoverCard.d.ts.map