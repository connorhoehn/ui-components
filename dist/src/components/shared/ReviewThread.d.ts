import type { ToneOrAlias } from './tones';
export type ReviewAuthorKind = 'agent' | 'human';
export interface ReviewPostData {
    id: string;
    authorKind: ReviewAuthorKind;
    authorName: string;
    /** Post kind slug — e.g. 'problem' | 'question' | 'decision'. */
    kind: string;
    body: string;
    /** For 'question' posts: true once answered. An unresolved question is the
     *  thread's live HITL gate and renders highlighted with a composer. */
    resolved?: boolean;
    /** What the author produced — a browser screenshot, diagram, document. */
    artifact?: {
        name: string;
        type?: string;
        url?: string | null;
    } | null;
    /** Preformatted timestamp, e.g. "4d ago". */
    timeLabel?: string;
}
export declare const REVIEW_KIND_LABELS: Record<string, string>;
export declare const REVIEW_KIND_TONES: Record<string, ToneOrAlias>;
export interface ReviewThreadProps {
    posts: ReviewPostData[];
    /** Answer an open question. Omit to render read-only (terminal threads). */
    onAnswer?: (postId: string, body: string) => void;
    answerBusy?: boolean;
    answerPlaceholder?: string;
    /** The submit label — say what answering does, e.g. "Answer & continue". */
    answerLabel?: string;
    /** Merge/override the built-in kind vocabulary. */
    kindLabels?: Record<string, string>;
    kindTones?: Record<string, ToneOrAlias>;
    /** Shown when the thread has no posts yet. */
    emptyLabel?: string;
    className?: string;
    'data-testid'?: string;
}
export declare function ArtifactTile({ name, type, url }: {
    name: string;
    type?: string;
    url?: string | null;
}): import("react").JSX.Element;
export declare function ReviewThread({ posts, onAnswer, answerBusy, answerPlaceholder, answerLabel, kindLabels, kindTones, emptyLabel, className, 'data-testid': testId, }: ReviewThreadProps): import("react").JSX.Element;
export default ReviewThread;
//# sourceMappingURL=ReviewThread.d.ts.map