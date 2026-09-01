import type { ReactNode } from 'react';
import type { CallWidgetMode } from './callWidgetMode';
/** How the dock rendered itself for the host widget's display mode. */
export type CallSidePanelPlacement = 'docked' | 'overlay';
export interface CallSidePanelTab {
    /** Stable id. 'chat' | 'people' | 'captions' get canonical testids and
     *  default icons; any other id works and falls back to derived ones. */
    id: string;
    /** Header text and toggle-button accessible name, e.g. "Chat". */
    label: string;
    /** Panel body — rendered inside a `min-h-0 flex-1 overflow-y-auto` slot. */
    content: ReactNode;
    /** Toggle-button glyph. Defaults by id for the three well-known tabs. */
    icon?: ReactNode;
    /** Unread/attention count rendered as a badge on the toggle button. */
    badgeCount?: number;
    /** Disable just this destination (e.g. captions still warming up). */
    disabled?: boolean;
    /** Override the derived toggle-button testid. */
    toggleTestId?: string;
    /** Override the derived tab-body testid. */
    panelTestId?: string;
}
export declare function callSidePanelToggleTestId(tab: CallSidePanelTab): string;
export declare function callSidePanelBodyTestId(tab: CallSidePanelTab): string;
/**
 * Which placement the dock takes for a given widget display mode.
 *
 * 'mini' is the only mode that cannot afford a column: at 320px a docked
 * panel would leave the video ~0px wide, so the dock covers the stage
 * instead (Meet/Teams narrow-window behaviour).
 */
export declare function callSidePanelPlacement(mode: CallWidgetMode): CallSidePanelPlacement;
export interface CallSidePanelTogglesProps {
    tabs: CallSidePanelTab[];
    /** Currently open destination, or null/undefined when the dock is closed. */
    activeTab?: string | null;
    /** Fires with the next destination id, or null when the active button
     *  is clicked again (click-to-close, like Meet's chat button). */
    onTabChange?: (id: string | null) => void;
    disabled?: boolean;
    className?: string;
    'data-testid'?: string;
}
/**
 * Icon toggles for the dock's destinations. Rendered automatically by
 * <CallWidget> and <ExpandableCallWidget> into their control rows when
 * `sidePanelTabs` is supplied — a consumer never positions these by hand.
 * Exported for hosts that build their own control bar.
 */
export declare function CallSidePanelToggles({ tabs, activeTab, onTabChange, disabled, className, 'data-testid': testId, }: CallSidePanelTogglesProps): import("react").JSX.Element | null;
export interface CallSidePanelProps {
    /** Destinations available in the dock. Supplying this switches the
     *  component to the tabbed API; `open`/`title`/`children` are ignored. */
    tabs?: CallSidePanelTab[];
    /** The single open destination, or null when the dock is closed. */
    activeTab?: string | null;
    /** Fires with the next id, or null when the dock should close. */
    onTabChange?: (id: string | null) => void;
    /** Host widget's display mode — decides docked vs overlay placement.
     *  Defaults to 'window' (docked). */
    mode?: CallWidgetMode;
    /** @deprecated Use `tabs` + `activeTab`. Kept working as a one-tab dock. */
    open?: boolean;
    /** The header ✕ fires this. The consumer owns the open/closed state.
     *  In the tabbed API this fires alongside `onTabChange(null)`. */
    onClose?: () => void;
    /** @deprecated Use `tabs`. Header text, e.g. "Chat". */
    title?: string;
    /** @deprecated Use `tabs`. Panel body. */
    children?: ReactNode;
    /** Width utility for the docked column. Defaults to `w-80`. Ignored in
     *  'overlay' placement, which is always full-bleed. */
    widthClassName?: string;
    className?: string;
    'data-testid'?: string;
}
export declare function CallSidePanel({ tabs, activeTab, onTabChange, mode, open, onClose, title, children, widthClassName, className, 'data-testid': testId, }: CallSidePanelProps): import("react").JSX.Element | null;
export default CallSidePanel;
//# sourceMappingURL=CallSidePanel.d.ts.map