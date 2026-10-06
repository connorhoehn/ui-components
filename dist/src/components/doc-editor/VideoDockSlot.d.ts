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
    /**
     * Identifies this slot to a POINTER drag.
     *
     * HTML5 drag-and-drop is not the only way the widget arrives. While the
     * widget floats it is repositioned by a mousedown/mousemove drag, and that
     * gesture calls `preventDefault()` on mousedown — which is precisely what
     * stops a native `dragstart` firing on the same element. So a user dragging
     * the widget by its body generates no `drop` event here, ever, no matter how
     * accurately they land on this box.
     *
     * Publishing the id in the DOM lets the free-drag hit-test for slots on
     * mouseup and dock without a DataTransfer. Omit it and this slot is only
     * reachable by the HTML5 path.
     */
    dockId?: string;
    /** Names the region for screen readers and labels the dashed prompt. */
    label?: string;
    /** Prompt text inside the empty affordance. */
    hint?: string;
    /** Accessible name for the undock control. */
    undockLabel?: string;
    /** Fires when the undock / pop-out control is used. Omit to hide it. */
    onRequestUndock?: () => void;
    /**
     * A one-line drop prompt (label · hint in a 40px dashed strip) instead of
     * the 16:9 box — for a slot whose docked content is a shelf, not a stage:
     * the in-call shelf above a chat composer.
     */
    compact?: boolean;
    /** Called after the internal drag-over state updates, with the raw event. */
    onDragOver?: (e: DragEvent<HTMLDivElement>) => void;
    onDragLeave?: (e: DragEvent<HTMLDivElement>) => void;
    /** Called on drop. The payload is the caller's — this component reads none of it. */
    onDrop?: (e: DragEvent<HTMLDivElement>) => void;
    className?: string;
    children?: ReactNode;
    'data-testid'?: string;
}
export default function VideoDockSlot({ docked, canAccept, dockId, label, hint, undockLabel, onRequestUndock, compact, onDragOver, onDragLeave, onDrop, className, children, 'data-testid': testId, }: VideoDockSlotProps): import("react").JSX.Element | null;
//# sourceMappingURL=VideoDockSlot.d.ts.map