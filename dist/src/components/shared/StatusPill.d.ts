import { type ReactNode } from 'react';
export type StatusPillState = 'success' | 'error' | 'warning' | 'info' | 'neutral' | 'pending';
/**
 * What `state` accepts: a `StatusPillState`, or `danger` — the same tokens as
 * `error`, in the library's tone spelling (success / warning / danger /
 * neutral). Kept out of `StatusPillState` so a `Record<StatusPillState, …>`
 * elsewhere does not have to grow a duplicate key.
 */
export type StatusPillTone = StatusPillState | 'danger';
export type StatusPillSize = 'sm' | 'md';
/**
 * `pill` (default) is the bordered, tinted chip. `text` is dot + coloured label, no box.
 * `tag` (since 2.386.5) is a soft rounded-rectangle label with no dot and no
 * border — a document's "Draft" beside its title. `label` (since 2.386.15) is
 * the tag's soft rectangle WITH the dot — a scope's "● In progress".
 */
export type StatusPillVariant = 'pill' | 'text' | 'tag' | 'label';
export interface StatusPillProps {
    /** The pill's tone. Either `state` or `tone`; `tone` wins when both are given. */
    state?: StatusPillTone;
    /**
     * The same thing as `state`, under the name the catalog helpers use —
     * `statusPillFor(summary)` returns `{ tone, label, meta }`, and
     * `<StatusPill variant="text" {...statusPillFor(summary)} />` just works.
     */
    tone?: StatusPillTone;
    label: string;
    /** Optional icon placed to the left of the label. */
    icon?: ReactNode;
    /**
     * A quieter clause after the label — "29m ago", "3 of 5". Rendered as
     * "· <meta>" in the tertiary ink and normal weight; the label keeps the
     * colour and the weight.
     */
    meta?: string;
    size?: StatusPillSize;
    variant?: StatusPillVariant;
    className?: string;
    'data-testid'?: string;
}
export declare function StatusPill({ state: stateProp, tone, label, icon, meta, size, variant, className, 'data-testid': testId, }: StatusPillProps): import("react").JSX.Element;
export default StatusPill;
//# sourceMappingURL=StatusPill.d.ts.map