import type { ReactNode } from 'react';
export interface FloatingDockBarProps {
    /** True while the caller has portaled the live call into `children`. */
    docked: boolean;
    /**
     * True while the call is being DRAGGED somewhere. Not docked here, the bar
     * shows a ghost of itself — a dashed band along the bottom edge, named —
     * so the reader can see where the call would land and let go over it.
     * Nothing renders when neither `docked` nor `ghost`.
     */
    ghost?: boolean;
    /**
     * The dock id the widget's pointer-drag hit-tests for. Published on the
     * ghost as `data-call-dock-target`, which is what the widget reads on
     * release; the ghost lights up while the widget is over it.
     */
    dockId?: string;
    /** What the ghost says. */
    ghostLabel?: string;
    /** Names the region for screen readers. */
    label?: string;
    /** Distance from the bottom edge, in px. Default 16. */
    bottomOffset?: number;
    className?: string;
    children?: ReactNode;
    'data-testid'?: string;
}
export default function FloatingDockBar({ docked, ghost, dockId, ghostLabel, label, bottomOffset, className, children, 'data-testid': testId, }: FloatingDockBarProps): import("react").JSX.Element | null;
//# sourceMappingURL=FloatingDockBar.d.ts.map