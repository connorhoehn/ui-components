import { type ReactNode } from 'react';
import { type ToneOrAlias } from '../shared/tones';
export interface DisclosureProps {
    /** Always-visible trigger row. Any node — not just text. */
    summary: ReactNode;
    /** Shown when open. */
    children: ReactNode;
    /**
     * Controlled open state. Omit to let the component own it (see
     * `defaultOpen`); pass it and update it from `onToggle` to control it, the
     * same contract as a controlled `<input>`.
     */
    open?: boolean;
    /** Uncontrolled initial state. Default false. Ignored once `open` is passed. */
    defaultOpen?: boolean;
    /** Fires after every toggle, either direction, with the new open state. */
    onToggle?: (open: boolean) => void;
    /**
     * Semantic tint for the summary row (and its left rule) — an admonition
     * inside a longer document, a warning the reader can collapse once read.
     * Default: no tint, matches surrounding chrome.
     */
    tone?: ToneOrAlias;
    /**
     * `'compact'` tightens padding, drops to `text-xs`, and shrinks the
     * chevron — a disclosure nested inside an already-dense panel (a
     * debugger side rail, a node inspector) where the default's `text-sm` /
     * `px-3 py-2` reads oversized next to its neighbours. Default: unchanged.
     */
    density?: 'default' | 'compact';
    /**
     * `'plain'` drops the outer border and the summary row's background tint
     * (including `tone`'s) entirely — just the summary row and body, for a
     * borderless toggle inside a list where every row already has its own
     * separator and a bordered/tinted card would double up. Composable with
     * `density="compact"`. Default: unchanged (bordered card, tinted summary).
     */
    variant?: 'default' | 'plain';
    /**
     * Muted text after the summary, on the same row — what is inside, or why
     * it is closed ("SME or release manager required to dispatch"). Since 2.390.0.
     */
    hint?: ReactNode;
    /**
     * `md` (default): the summary at the body size. `lg` (since 2.390.0): the
     * summary is a section heading — 19px semibold with a 16px chevron — so a
     * collapsed section ("› Run setup") reads like its open neighbours.
     * Composable with `variant="plain"`; ignored with `density="compact"`.
     */
    size?: 'md' | 'lg';
    className?: string;
    summaryClassName?: string;
    bodyClassName?: string;
    'data-testid'?: string;
}
export declare function Disclosure({ summary, children, open, defaultOpen, onToggle, tone, density, variant, hint, size, className, summaryClassName, bodyClassName, 'data-testid': testId, }: DisclosureProps): import("react").JSX.Element;
//# sourceMappingURL=Disclosure.d.ts.map