import { type HitlCallout } from './hitlText';
/** One candidate addressee: the identity the row is keyed on, and its label. */
export interface HitlPerson {
    /** The auth subject written into `assignee:`. */
    id: string;
    /** What a reader sees. Never written into the body — see `hitlMirrorRow`. */
    name: string;
}
export interface HitlBlockProps {
    callout: HitlCallout;
    /** False renders the callout read-only — no answering, no retracting. */
    editable?: boolean;
    /**
     * The clock, for expiry. Injected rather than read from `Date.now()` here
     * so a test can pin it; defaults to now.
     */
    now?: number;
    /** Records an answer. Never called for an expired callout. */
    onAnswer?: (answer: string) => void;
    /** An answer is in flight — the controls are live but must not be re-fired. */
    busy?: boolean;
    /**
     * Why the last answer did not stick.
     *
     * Set when an answer was written into the document and then TAKEN BACK
     * because the mirror write failed. The card must say so: the alternative
     * is a callout that silently returns to `waiting` and a person who
     * believes they unblocked something.
     */
    failure?: string | null;
    /**
     * Who this callout may be addressed to, as identity + label.
     *
     * Empty (or absent) draws no picker at all, which is the honest rendering
     * of "this surface has no directory": a control listing nobody would
     * suggest the addressee is unchangeable when it is only unknown.
     */
    people?: readonly HitlPerson[];
    /**
     * Readdresses the callout. Only ever called with an id from `people`, or
     * `''` to address it to nobody.
     *
     * Load-bearing rather than cosmetic: `assignee` is the ONLY field the
     * cross-document query is keyed on, so a callout stuck on the wrong
     * addressee is invisible to the person who should answer it and answerable
     * by nobody — the answer endpoint refuses everyone but the addressee.
     */
    onAssign?: (assignee: string) => void;
    /** Takes a recorded answer back. Omitted when it cannot be done in one edit. */
    onRetract?: () => void;
    /** Takes the whole block off the page. Omitted when not editable. */
    onRemove?: () => void;
    'data-testid'?: string;
}
type Phase = 'waiting' | 'answered' | 'expired';
/** What the card is, in one word — and the only place that decides it. */
export declare function hitlPhase(callout: HitlCallout, now?: number): Phase;
export declare function HitlBlock({ callout, editable, now, onAnswer, busy, failure, people, onAssign, onRetract, onRemove, 'data-testid': testId, }: HitlBlockProps): import("react").JSX.Element;
export default HitlBlock;
//# sourceMappingURL=HitlBlock.d.ts.map