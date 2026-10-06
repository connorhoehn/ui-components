import type { ReactNode, Ref } from 'react';
export interface InlinePanelProps {
    children: ReactNode;
    /** Chrome colour — same meaning as `Panel`'s `variant`. Default 'light'. */
    variant?: 'light' | 'dark';
    className?: string;
    'data-testid'?: string;
    /**
     * The underlying `<div>`. A plain prop, not `forwardRef` — see the note on
     * `StackProps.ref` (and `Card`'s, `Button`'s): React 19, our only
     * supported peer, passes `ref` through as an ordinary prop. A host that
     * needs to measure or scroll this panel (a resize observer, "scroll to
     * bottom" on a sidebar chat pane) had no way to reach the node without it.
     */
    ref?: Ref<HTMLDivElement>;
}
export declare function InlinePanel({ children, variant, className, 'data-testid': testId, ref, }: InlinePanelProps): import("react").JSX.Element;
//# sourceMappingURL=InlinePanel.d.ts.map