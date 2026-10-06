import type { ReactNode } from 'react';
export interface ExpertSkillMatch {
    name: string;
    /**
     * 0..1 evidence strength for THIS skill on THIS person, when the domain
     * has one (e.g. a person→skill edge weight). Renders as chip emphasis,
     * never as a printed number — a number invites ranking people, which is
     * exactly the reading this card exists to avoid.
     */
    strength?: number;
}
export interface ExpertEvidenceItem {
    id: string;
    /** e.g. a document title, an ADR, a postmortem. */
    title: string;
    /** Where it came from — "adr", "slack", "postmortem". Shown as a quiet tag. */
    source?: string;
    href?: string;
}
export interface ExpertCardProps {
    name: string;
    title?: string;
    /** Second context line, e.g. department or team. */
    subtitle?: string;
    imageUrl?: string;
    /** Skills that matched the query, strongest first. */
    matchedSkills: readonly ExpertSkillMatch[];
    /** The person's other skills, shown quieter. Keep short; the card truncates. */
    otherSkills?: readonly string[];
    /** Where this person spends their time — initiative/project names. */
    contexts?: readonly string[];
    /** The work the match was derived from. */
    evidence?: readonly ExpertEvidenceItem[];
    /** Heading over the evidence list. */
    evidenceLabel?: string;
    /** Primary action. Omit to render a card with no footer. */
    onAsk?: () => void;
    askLabel?: string;
    /** Secondary slot beside the action, e.g. a link into an org graph. */
    footerExtra?: ReactNode;
    /** Click anywhere that isn't a control — e.g. open a profile. */
    onOpen?: () => void;
    className?: string;
    'data-testid'?: string;
}
export declare function ExpertCard({ name, title, subtitle, imageUrl, matchedSkills, otherSkills, contexts, evidence, evidenceLabel, onAsk, askLabel, footerExtra, onOpen, className, 'data-testid': testId, }: ExpertCardProps): import("react").JSX.Element;
export default ExpertCard;
//# sourceMappingURL=ExpertCard.d.ts.map