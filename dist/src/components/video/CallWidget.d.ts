import { type ReactNode, type CSSProperties } from 'react';
import { type CallStripParticipant } from './CallParticipantStrip';
import { type CallStatsOverlayStats } from './CallStatsOverlay';
import { type CallSidePanelTab } from './CallSidePanel';
import { type CallWidgetMode } from './callWidgetMode';
/** Card width with the dock closed. */
export declare const CALL_CARD_WIDTH = "w-[380px]";
/** Video-column width with the dock open — it GROWS, it is not pinned. */
export declare const CALL_STAGE_DOCKED_WIDTH = "w-[480px]";
/** The single height both columns take when the dock is open. */
export declare const CALL_DOCK_ROW_HEIGHT = "h-[480px]";
export type CallWidgetState = 'idle' | 'ringing' | 'connecting' | 'active' | 'ended';
export type CallMode = 'audio' | 'video';
/**
 * dataTransfer key the widget stamps on a dock drag.
 *
 * A custom type rather than `text/plain` on purpose, in both directions: an
 * ordinary text drop target (a comment box, a rich-text editor) must not
 * mistake a dragged call for pasted text, and a dock slot must be able to
 * accept-or-reject during `dragover` — where the only thing a browser
 * exposes is `dataTransfer.types`, never the payload itself.
 */
export declare const CALL_DOCK_DRAG_TYPE = "application/x-call-dock";
/** A place in the page that can hold the call. */
export interface CallDockTarget {
    id: string;
    label: string;
}
/** JSON written under {@link CALL_DOCK_DRAG_TYPE}. */
export interface CallDockDragPayload {
    /** The call being moved, when the host stamped `data-call-id` via `dataAttrs`. */
    callId?: string;
    /** Slot the widget is leaving, or null when it was floating free. */
    fromDockId: string | null;
}
export interface CallWidgetParticipant extends CallStripParticipant {
    videoStream?: MediaStream | null;
}
export interface CallWidgetProps {
    state: CallWidgetState;
    mode: CallMode;
    participants: CallWidgetParticipant[];
    localParticipant?: CallWidgetParticipant;
    callerName?: string;
    duration?: number;
    isMuted?: boolean;
    isCameraOn?: boolean;
    isScreenSharing?: boolean;
    onAnswer?: () => void;
    onDecline?: () => void;
    onEndCall?: () => void;
    onToggleMute?: () => void;
    onToggleCamera?: () => void;
    onToggleScreenShare?: () => void;
    onUpgradeToVideo?: () => void;
    onAddParticipant?: (participantId: string) => void;
    /** Slot rendered IN the control row (between add-participant and End)
     *  — the collapsed-widget counterpart to MediaControlsBar's `extras`.
     *  Lets a consumer add one action (effects, captions, settings)
     *  without forking the chrome, so the docked and expanded widgets can
     *  offer the SAME affordance in the same place. */
    controlsExtras?: ReactNode;
    /** Consumer-owned "add people" flow — see CallControls. Renders the
     *  add-participant button inline with the other controls (which is
     *  where it belongs visually) while the consumer owns the picker. */
    onOpenAddParticipant?: () => void;
    /** List of people available to add to the call */
    availableParticipants?: CallWidgetParticipant[];
    onMinimize?: () => void;
    onExpand?: () => void;
    /**
     * Canonical display mode for the widget chrome.
     *
     *   'mini'        collapsed pill (what `minimized` used to mean)
     *   'window'      the normal 320px widget
     *   'fullscreen'  same chrome as 'window'; <CallWidget> has no
     *                 viewport-filling stage of its own, so this renders
     *                 the full chrome and stamps `data-call-widget-mode`
     *                 for a host that supplies the stage.
     *
     * NOTE the prop is `displayMode`, not `mode`: `mode` on this component
     * has always meant the CALL mode ('audio' | 'video'), an orthogonal
     * axis, and renaming it would be the breaking change this API exists
     * to avoid. <ExpandableCallWidget> — which has no such collision —
     * spells the same vocabulary `defaultMode`/`setMode`.
     *
     * Wins over `minimized` when both are supplied (dev-only warn).
     */
    displayMode?: CallWidgetMode;
    /**
     * @deprecated Use `displayMode`. Maps as
     * `minimized === true → 'mini'`, `minimized === false → 'window'`.
     * Still fully supported; `displayMode` takes precedence if both are set.
     */
    minimized?: boolean;
    position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
    /** When true, uses absolute positioning within a relative parent instead of fixed to viewport */
    contained?: boolean;
    draggable?: boolean;
    /**
     * Optional render slot that replaces the default video area (local fullscreen
     * + single remote PiP). When provided, the widget renders this node in the
     * video area while preserving its own header, controls, drag/minimize, and
     * call-state machine. Use for multi-person hangout layouts (pair with
     * `HangoutLayout` from the same module).
     *
     * Absent → the widget renders today's single-PiP layout (backwards compatible).
     */
    layoutComponent?: ReactNode;
    /**
     * Optional diagnostics stats. When provided (and at least one field is
     * set), CallWidget renders a `<CallStatsOverlay>` inside the video area.
     */
    callStats?: CallStatsOverlayStats;
    className?: string;
    style?: CSSProperties;
    /**
     * Destinations for the docked side panel (chat / people / captions).
     *
     * Supplying this gives the widget a side-panel REGION that is part of
     * the widget — not a detached floating window. The toggle buttons are
     * rendered automatically into the control row (ahead of
     * `controlsExtras`), and because the panel lives inside the widget's
     * own transformed root it travels with the widget when dragged.
     *
     * Per-mode behaviour:
     *   'window' / 'fullscreen'  the card WIDENS — the stage has no slack to
     *                            give up, so Meet's split becomes a grow
     *                            here: the stage column itself goes to
     *                            `CALL_STAGE_DOCKED_WIDTH` and the dock is
     *                            added beside it. Both columns take one
     *                            height (`CALL_DOCK_ROW_HEIGHT`), the stage
     *                            and the panel body absorbing the slack, so
     *                            the card has no dead bands in it.
     *   'mini'                   the collapsed pill has no video stage to
     *                            dock beside; the dock and its toggles are
     *                            not rendered. Expand to reach chat, which
     *                            is what Meet's PiP and Slack's huddle bar
     *                            both do.
     */
    sidePanelTabs?: CallSidePanelTab[];
    /** The single open destination, or null when the dock is closed. */
    activeSidePanelTab?: string | null;
    /** Fires with the next id, or null when the dock should close. */
    onSidePanelTabChange?: (id: string | null) => void;
    /** Width utility for the docked column. Defaults to `w-80`. */
    sidePanelWidthClassName?: string;
    /**
     * Places in the page the call can be moved INTO (see "Page docking"
     * above). Supplying a non-empty list turns on the dock affordances: a
     * drag grip in the header, and a "Move to…" menu beside the window
     * controls.
     *
     * Absent or empty → the widget is exactly the floating card it has
     * always been. Nothing about the free-drag changes.
     */
    dockTargets?: CallDockTarget[];
    /**
     * The slot currently holding the call, or null while it floats. When
     * set, the widget stops free-dragging: it is part of the page's layout
     * now, and an offset transform would shove it back out of the slot it
     * was just dropped into. Pop out to get the floating card back.
     */
    activeDockId?: string | null;
    /** Fires with the destination slot id, or null to pop back out. */
    onDockTo?: (id: string | null) => void;
    /**
     * Fires when a free-drag of the widget starts and ends. A page uses it to
     * show the places the call could land — a ghost of a dock along its bottom
     * edge — only while the reader is actually moving the call toward one.
     * The drop itself is the pointer-drag hit-test on `data-call-dock-target`;
     * this is only the cue.
     */
    onDragStateChange?: (dragging: boolean) => void;
    /** Arbitrary `data-*` attributes to spread onto the root element.
     *  Lets callers (e.g. HangoutOverlay) attach e2e-friendly testids and
     *  lobby/callId metadata without an extra wrapper div that would
     *  conflict with the widget's own `position: fixed` placement. */
    dataAttrs?: Record<string, string | number | undefined>;
}
export declare function formatDuration(seconds: number): string;
export declare function CallWidget({ state, mode, participants, localParticipant, callerName, duration, isMuted, isCameraOn, isScreenSharing, onAnswer, onDecline, onEndCall, onToggleMute, onToggleCamera, onToggleScreenShare, onUpgradeToVideo, onAddParticipant, availableParticipants, controlsExtras, onOpenAddParticipant, onMinimize, onExpand, layoutComponent, callStats, displayMode, minimized: minimizedProp, sidePanelTabs, activeSidePanelTab, onSidePanelTabChange, sidePanelWidthClassName, dockTargets, activeDockId, onDockTo, onDragStateChange, position, contained, draggable, className, style, dataAttrs, }: CallWidgetProps): import("react").JSX.Element | null;
export default CallWidget;
//# sourceMappingURL=CallWidget.d.ts.map