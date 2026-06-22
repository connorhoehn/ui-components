import { ReactNode, Ref } from 'react';
import { PersistedWidgetMode } from './useCallWidgetPersistence';
export type CallWidgetMode = PersistedWidgetMode | 'fullscreen';
export interface ExpandableCallWidgetHandle {
    mode: CallWidgetMode;
    setMode: (m: CallWidgetMode) => void;
}
export interface ExpandableCallWidgetProps {
    /** Header label (left side of chrome). */
    title?: ReactNode;
    /** Optional status line shown under the title (e.g. "0:36 • 3 in call"). */
    subtitle?: ReactNode;
    /** Body — typically `<HangoutLayout fillParent participants={…}/>`. */
    children: ReactNode;
    /** Optional controls strip rendered below the body. Stays inside the
     *  widget chrome in mini mode (compact); spans full width in docked
     *  and fullscreen modes. */
    controls?: ReactNode;
    /** Initial mode. Persisted modes override this once `persistKey` is
     *  set and storage has a prior value. Default: 'mini'. */
    defaultMode?: PersistedWidgetMode;
    /** Fires after every settled mode change (programmatic or via UI). */
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
    /** z-index for the floating modes. Default 9999. */
    zIndex?: number;
    /** Class on the root. */
    className?: string;
}
export declare function ExpandableCallWidget({ title, subtitle, children, controls, defaultMode, onModeChange, persistKey, apiRef, defaultCorner, expandable, zIndex, className, }: ExpandableCallWidgetProps): import("react").JSX.Element;
//# sourceMappingURL=ExpandableCallWidget.d.ts.map