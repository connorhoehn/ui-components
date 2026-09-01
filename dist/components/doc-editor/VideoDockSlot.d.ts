import { type DragEvent, type ReactNode } from 'react';
export interface VideoDockSlotProps {
    /** True when the caller has portaled the live widget into `children`. */
    docked: boolean;
    /**
     * True when a call exists and could be moved here. Gates BOTH the dashed
     * affordance and the drag-over feedback: a slot that cannot take the video
     * must not light up under a drag and promise otherwise.
     */
    canAccept: boolean;
    /** Names the region for screen readers and labels the dashed prompt. */
    label?: string;
    /** Prompt text inside the empty affordance. */
    hint?: string;
    /** Accessible name for the undock control. */
    undockLabel?: string;
    /** Fires when the undock / pop-out control is used. Omit to hide it. */
    onRequestUndock?: () => void;
    /** Called after the internal drag-over state updates, with the raw event. */
    onDragOver?: (e: DragEvent<HTMLDivElement>) => void;
    onDragLeave?: (e: DragEvent<HTMLDivElement>) => void;
    /** Called on drop. The payload is the caller's — this component reads none of it. */
    onDrop?: (e: DragEvent<HTMLDivElement>) => void;
    className?: string;
    children?: ReactNode;
    'data-testid'?: string;
}
export default function VideoDockSlot({ docked, canAccept, label, hint, undockLabel, onRequestUndock, onDragOver, onDragLeave, onDrop, className, children, 'data-testid': testId, }: VideoDockSlotProps): import("react").JSX.Element | null;
//# sourceMappingURL=VideoDockSlot.d.ts.map