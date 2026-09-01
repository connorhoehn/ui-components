import { type ReactNode, type Ref } from 'react';
import { type PersistedWidgetMode } from './useCallWidgetPersistence';
import { type AnyCallWidgetMode, type CallWidgetMode } from './callWidgetMode';
import { type CallSidePanelTab } from './CallSidePanel';
export type { CallWidgetMode, LegacyCallWidgetMode } from './callWidgetMode';
export interface ExpandableCallWidgetHandle {
    /** Always canonical — 'window', never 'docked'. */
    mode: CallWidgetMode;
    /** Accepts either dialect; normalizes to canonical. */
    setMode: (m: AnyCallWidgetMode) => void;
}
export interface ExpandableCallWidgetProps {
    /** Header label (left side of chrome). */
    title?: ReactNode;
    /** Optional status line shown under the title (e.g. "0:36 • 3 in call"). */
    subtitle?: ReactNode;
    /** Elapsed call time in seconds. When set, a monospace timer
     *  (data-testid="call-timer") renders after the subtitle — the same
     *  affordance CallWidget's collapsed chrome exposes, so e2e journeys
     *  can read the duration in either mode. */
    durationSeconds?: number;
    /** Body — typically `<HangoutLayout fillParent participants={…}/>`. */
    children: ReactNode;
    /** Optional controls strip rendered below the body. Stays inside the
     *  widget chrome in mini mode (compact); spans full width in window
     *  and fullscreen modes. */
    controls?: ReactNode;
    /** Initial mode. Persisted modes override this once `persistKey` is
     *  set and storage has a prior value. Default: 'mini'.
     *
     *  The pre-2.106 spelling `'docked'` is accepted and normalized to
     *  `'window'`.
     *  @see CallWidgetMode */
    defaultMode?: PersistedWidgetMode | 'docked';
    /** Fires after every settled mode change (programmatic or via UI).
     *  Emits the CANONICAL vocabulary — 'window' where builds before
     *  2.106 emitted 'docked'. */
    onModeChange?: (mode: CallWidgetMode) => void;
    /** localStorage key for `{mode,x,y,width,height}`. Omit to opt out
     *  (state lives only in memory). */
    persistKey?: string;
    /** Imperative handle — `apiRef.current.setMode('fullscreen')`. */
    apiRef?: Ref<ExpandableCallWidgetHandle>;
    /** Initial corner-snap for mini mode (only used if no persisted
     *  position exists). Default 'bottom-right'. */
    defaultCorner?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
    /** Hide the expand affordances (useful for read-only viewers). */
    expandable?: boolean;
    /**
     * Destinations for the docked side panel (chat / people / captions).
     *
     * The panel is part of the widget, not a sibling floating window: it
     * renders inside the same positioned root, so it moves, resizes and
     * closes with the call. Its toggle buttons are appended to the controls
     * strip automatically — the host positions nothing.
     *
     * Per-mode behaviour (see ./CallSidePanel for the full rationale):
     *   'window' / 'fullscreen'  SPLIT — the stage keeps `flex-1` and the
     *                            dock takes a right-edge column (w-80, or
     *                            w-96 in fullscreen). This is the Google
     *                            Meet / Zoom / Teams layout.
     *   'mini'                   OVERLAY — a full-bleed sheet on top of the
     *                            320px stage. Splitting a mini widget would
     *                            leave the video ~0px wide; Meet and Teams
     *                            both switch to a covering sheet at this
     *                            size instead.
     */
    sidePanelTabs?: CallSidePanelTab[];
    /** The single open destination, or null when the dock is closed. */
    activeSidePanelTab?: string | null;
    /** Fires with the next id, or null when the dock should close. */
    onSidePanelTabChange?: (id: string | null) => void;
    /** z-index for the floating modes. Default 9999. */
    zIndex?: number;
    /** Class on the root. */
    className?: string;
    /** Root testid. Defaults to 'expandable-call-widget' so tests (and the
     *  demo harness) can scope to THIS widget — `data-call-widget-mode` is
     *  also stamped by <CallWidget>, so it is not a unique handle. */
    'data-testid'?: string;
}
export declare function ExpandableCallWidget({ title, subtitle, durationSeconds, children, controls, defaultMode: defaultModeProp, onModeChange, persistKey, apiRef, defaultCorner, expandable, sidePanelTabs, activeSidePanelTab, onSidePanelTabChange, zIndex, className, 'data-testid': rootTestId, }: ExpandableCallWidgetProps): import("react").JSX.Element;
//# sourceMappingURL=ExpandableCallWidget.d.ts.map