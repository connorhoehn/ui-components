import type { ReactNode } from 'react';
import { type SelectOption } from '../forms/Select';
import { type AccessNoticeProps } from './AccessNotice';
import { type RunEstimate } from './EstimateRow';
export type { RunEstimate } from './EstimateRow';
export type RunDraftStatus = 'no-draft' | 'unsaved' | 'saved' | 'dispatching' | 'running' | 'completed' | 'failed' | 'stopped';
/**
 * Header state labels. PLAN §1.6 names the draft states; the mockup's
 * "Not started" is not used because it is ambiguous between "no draft yet"
 * and "saved but not dispatched" — those are `no-draft` and `saved` here.
 */
export declare const RUN_DRAFT_STATUS_LABELS: Record<RunDraftStatus, string>;
export interface RunEstimateConfidence {
    /** How many completed runs the estimate is based on. */
    sampleSize: number;
    /**
     * Where the range came from. `runs` (default) — measured history, so zero
     * runs means no estimate and the range is replaced by "No prior runs".
     * `prior` — a stated bracket the host stands behind without history (a
     * per-tier prior); the range is shown and marked low confidence.
     */
    basis?: 'runs' | 'prior';
}
export interface RunDraftSelectField {
    id: string;
    label: string;
    value: string;
    options: SelectOption[];
    onChange: (value: string) => void;
    /** Disables the select and says why (e.g. "This pipeline sets its own model"). */
    disabledReason?: string;
    placeholder?: string;
}
export interface RunDraftTokenBudget {
    /** Omitted or `'tokens'`: a token budget. */
    unit?: 'tokens';
    /** The enforced token budget; `null` = none set. */
    tokens: number | null;
    onChange: (tokens: number | null) => void;
    /** Price used for the derived "≈ $x" line. Omit or `null` when unknown — the line is then not shown. */
    usdPerMillionTokens?: number | null;
    /** Names the price basis: "Haiku" → "at Haiku prices". */
    priceLabel?: string;
    disabledReason?: string;
}
/** A dollar cap the host enforces (e.g. "don't start the run if it is forecast over $x"). */
export interface RunDraftUsdBudget {
    unit: 'usd';
    /** The cap in dollars; `null` = none set. */
    usd: number | null;
    onChange: (usd: number | null) => void;
    /** What the cap does, in the host's words — "Not started if forecast above this". */
    hint?: string;
    disabledReason?: string;
}
export type RunDraftBudget = RunDraftTokenBudget | RunDraftUsdBudget;
export interface RunDraftTarget {
    mark?: ReactNode;
    title: string;
    subtitle?: string;
}
/** A document the run will read, shown as a chip under the target. */
export interface RunDraftSourceItem {
    id: string;
    /** What the viewer may see: the document title, or the host's "Restricted item" for one they cannot read. */
    title: string;
    /** A file-kind mark (e.g. <FileKindMark kind="page" size="sm" />); omit for a restricted item. */
    mark?: ReactNode;
    /** The viewer cannot read it: neutral styling, no link, no mark. */
    restricted?: boolean;
    /** Opens the source; absent (or restricted) → not interactive. */
    onOpen?: () => void;
}
export interface RunDraftPanelProps {
    status: RunDraftStatus;
    /** Controlled collapse. Omit to let the panel own it. */
    collapsed?: boolean;
    defaultCollapsed?: boolean;
    onCollapsedChange?: (collapsed: boolean) => void;
    /** The chosen workflow. `null` shows "No workflow chosen"; `undefined` shows nothing. */
    target?: RunDraftTarget | null;
    /** The documents the run will read. Empty, `null` or omitted → no section. Stays visible when `live` is shown. */
    sources?: readonly RunDraftSourceItem[] | null;
    /** Header for the sources list; default "Sources". */
    sourcesLabel?: string;
    fields?: RunDraftSelectField[];
    cost?: RunEstimate;
    duration?: RunEstimate;
    confidence?: RunEstimateConfidence | null;
    budget?: RunDraftBudget | null;
    advanced?: ReactNode;
    advancedLabel?: string;
    access?: AccessNoticeProps | null;
    onSave?: () => void;
    saveDisabledReason?: string;
    saving?: boolean;
    onDispatch?: () => void;
    dispatchDisabledReason?: string;
    /** Shown verbatim, e.g. the dispatch route's 403 message. */
    error?: string | null;
    /** After dispatch: the live run (an `AgentTaskCard`). Replaces the form body. */
    live?: ReactNode;
    /** Defaults to "Nothing runs until you authorize it."; pass `null` to hide. */
    footnote?: ReactNode;
    className?: string;
    'data-testid'?: string;
}
export declare function RunDraftPanel({ status, collapsed: collapsedProp, defaultCollapsed, onCollapsedChange, target, sources, sourcesLabel, fields, cost, duration, confidence, budget, advanced, advancedLabel, access, onSave, saveDisabledReason, saving, onDispatch, dispatchDisabledReason, error, live, footnote, className, 'data-testid': testId, }: RunDraftPanelProps): import("react").JSX.Element;
export default RunDraftPanel;
//# sourceMappingURL=RunDraftPanel.d.ts.map