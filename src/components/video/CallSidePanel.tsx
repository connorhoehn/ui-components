// CallSidePanel — the in-call side-panel DOCK.
//
// Complaint that produced the 2.107 rewrite: in-call chat rendered in a
// free-floating <FloatingPanel> that drifted anywhere on screen, visually
// unrelated to the call it belonged to. Google Meet, Zoom and Teams all
// attach chat/people/captions to the RIGHT EDGE of the call surface so
// the two move, resize and close together; Slack huddles do the same.
// This component is that dock.
//
// ── One region, several destinations ──────────────────────────────────
// Chat / People / Captions are MUTUALLY EXCLUSIVE in every product that
// does this well, so the dock holds a tab list, not a stack of windows.
// `activeTab` is a single id (or null = closed); the control-bar buttons
// (<CallSidePanelToggles/>) pick which one is showing.
//
// ── Placement is a function of the widget's display mode ──────────────
// See ./callWidgetMode for the canonical 'mini' | 'window' | 'fullscreen'
// vocabulary. `callSidePanelPlacement(mode)` resolves it:
//
//   'window'      → 'docked'   right-edge column beside the video
//   'fullscreen'  → 'docked'   same, wider
//   'mini'        → 'overlay'  full-bleed sheet ON TOP of the video
//
// A ~320px mini widget cannot be split — Meet and Teams both switch to a
// full-bleed sheet over the video at that size rather than crushing the
// stage to nothing, and Slack's huddle does the same on narrow windows.
// The host widget decides whether to WIDEN itself (CallWidget, whose
// 320px stage has no slack) or SPLIT (ExpandableCallWidget, already
// 960px) — the dock only reports the placement it rendered via
// `data-call-side-panel-placement`.
//
// ── Placement contract (docked) ───────────────────────────────────────
// The consumer renders it as a SIBLING of the video layout inside a
// `flex` container — the panel takes a fixed width on the right and the
// video layout keeps `flex-1`. In 'overlay' placement the panel is
// `absolute inset-0` instead, so that same flex parent must be
// `relative`. Both call widgets in this module wire that up for you.
//
// Purely presentational: every tab's `content` is a slot (typically a
// chat panel wired to the call's channel); no realtime hooks here.
// When no tab is active the panel renders nothing, so the video layout
// reflows to full width.
//
// ── Back-compat ───────────────────────────────────────────────────────
// The pre-2.107 single-panel API (`open` / `onClose` / `title` /
// `children`) still works unchanged: it is treated as a one-tab dock.

import type { ReactNode } from 'react';

import { cn } from '../../lib/cn';
import { DockedPanelProvider } from '../shared/DockedPanelContext';
import { CaptionsIcon, ChatBubbleIcon, SettingsGearIcon, UsersIcon } from './MediaIcons';
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

/** Toggle testids the consuming app already pins — keep them stable. */
const WELL_KNOWN_TOGGLE_TESTID: Record<string, string> = {
  chat: 'call-chat-open',
  people: 'call-people-open',
  captions: 'captions-toggle',
};

const WELL_KNOWN_PANEL_TESTID: Record<string, string> = {
  chat: 'call-chat-panel',
  people: 'call-people-panel',
  captions: 'call-captions-panel',
};

export function callSidePanelToggleTestId(tab: CallSidePanelTab): string {
  return tab.toggleTestId ?? WELL_KNOWN_TOGGLE_TESTID[tab.id] ?? `call-side-panel-open-${tab.id}`;
}

export function callSidePanelBodyTestId(tab: CallSidePanelTab): string {
  return tab.panelTestId ?? WELL_KNOWN_PANEL_TESTID[tab.id] ?? `call-side-panel-body-${tab.id}`;
}

/**
 * Which placement the dock takes for a given widget display mode.
 *
 * 'mini' is the only mode that cannot afford a column: at 320px a docked
 * panel would leave the video ~0px wide, so the dock covers the stage
 * instead (Meet/Teams narrow-window behaviour).
 */
export function callSidePanelPlacement(mode: CallWidgetMode): CallSidePanelPlacement {
  return mode === 'mini' ? 'overlay' : 'docked';
}

function defaultTabIcon(id: string): ReactNode {
  switch (id) {
    case 'chat':
      return <ChatBubbleIcon size={16} />;
    case 'people':
      return <UsersIcon size={16} />;
    case 'captions':
      return <CaptionsIcon size={16} />;
    case 'devices':
      return <SettingsGearIcon size={16} />;
    default:
      return null;
  }
}

// ---------------------------------------------------------------------------
// Toggles — the control-bar buttons that pick the active destination.
// ---------------------------------------------------------------------------

export interface CallSidePanelTogglesProps {
  tabs: CallSidePanelTab[];
  /** Currently open destination, or null/undefined when the dock is closed. */
  activeTab?: string | null;
  /** Fires with the next destination id, or null when the active button
   *  is clicked again (click-to-close, like Meet's chat button). */
  onTabChange?: (id: string | null) => void;
  disabled?: boolean;
  /**
   * `chrome` (default): round translucent-white buttons for the dark call
   * chrome (CallWidget, MediaControlsBar). `surface`: outline buttons that
   * follow the page theme, sized to `CallDock`'s 32px header row — for the
   * in-call shelf, whose header is not call chrome.
   */
  tone?: 'chrome' | 'surface';
  className?: string;
  'data-testid'?: string;
}

/**
 * Icon toggles for the dock's destinations. Rendered automatically by
 * <CallWidget> and <ExpandableCallWidget> into their control rows when
 * `sidePanelTabs` is supplied — a consumer never positions these by hand.
 * Exported for hosts that build their own control bar.
 */
export function CallSidePanelToggles({
  tabs,
  activeTab = null,
  onTabChange,
  disabled = false,
  tone = 'chrome',
  className,
  'data-testid': testId = 'call-side-panel-toggles',
}: CallSidePanelTogglesProps) {
  if (tabs.length === 0) return null;

  return (
    <div
      data-testid={testId}
      className={cn('flex items-center', tone === 'surface' ? 'gap-2' : 'gap-1', className)}
      data-tone={tone}
      role="group"
      aria-label="Call side panel"
    >
      {tabs.map((tab) => {
        const active = tab.id === activeTab;
        const isDisabled = disabled || tab.disabled === true;
        return (
          <button
            key={tab.id}
            type="button"
            aria-label={tab.label}
            aria-pressed={active}
            title={tab.label}
            disabled={isDisabled}
            data-testid={callSidePanelToggleTestId(tab)}
            data-active={active ? 'true' : 'false'}
            onClick={() => onTabChange?.(active ? null : tab.id)}
            className={cn(
              tone === 'surface'
                ? [
                    'relative grid h-8 w-8 shrink-0 place-items-center rounded-md border border-solid transition-colors duration-150',
                    active
                      ? 'border-border bg-surface-inset text-text-primary'
                      : 'border-border bg-surface text-text-secondary hover:bg-surface-hover hover:text-text-primary',
                  ]
                : [
                    'relative grid h-9 w-9 shrink-0 place-items-center rounded-full transition-colors duration-150',
                    active
                      ? 'bg-call-chrome-accent text-white'
                      : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white',
                  ],
              isDisabled ? 'cursor-not-allowed opacity-40' : 'cursor-pointer',
            )}
          >
            {tab.icon ?? defaultTabIcon(tab.id) ?? (
              <span className="text-[11px] font-semibold uppercase">{tab.label.slice(0, 2)}</span>
            )}
            {tab.badgeCount !== undefined && tab.badgeCount > 0 && (
              <span
                data-testid={`${callSidePanelToggleTestId(tab)}-badge`}
                className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-danger px-1 text-[10px] font-bold leading-none text-white"
              >
                {tab.badgeCount > 99 ? '99+' : tab.badgeCount}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// The dock itself.
// ---------------------------------------------------------------------------

export interface CallSidePanelProps {
  // ── Tabbed dock API (2.107+) ──────────────────────────────────────
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

  // ── Pre-2.107 single-panel API (still supported) ──────────────────
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

const LEGACY_TAB_ID = '__legacy__';

export function CallSidePanel({
  tabs,
  activeTab,
  onTabChange,
  mode = 'window',
  open,
  onClose,
  title,
  children,
  widthClassName = 'w-80',
  className,
  'data-testid': testId = 'call-side-panel',
}: CallSidePanelProps) {
  const tabbed = Array.isArray(tabs);

  // Normalize both APIs onto one shape. The legacy props become a
  // single unnamed tab so there is exactly one render path below.
  const resolvedTabs: CallSidePanelTab[] = tabbed
    ? tabs!
    : [{ id: LEGACY_TAB_ID, label: title ?? '', content: children }];

  const activeId = tabbed ? (activeTab ?? null) : open ? LEGACY_TAB_ID : null;
  const active = resolvedTabs.find((t) => t.id === activeId) ?? null;

  // Closed → render nothing at all, so a docked flex sibling reflows to
  // full width and an overlay stops covering the stage.
  if (!active) return null;

  const placement = callSidePanelPlacement(mode);
  const showTabRail = tabbed && resolvedTabs.length > 1;

  const close = () => {
    onTabChange?.(null);
    onClose?.();
  };

  return (
    <aside
      data-testid={testId}
      data-call-side-panel-placement={placement}
      data-call-side-panel-tab={tabbed ? active.id : undefined}
      aria-label={active.label}
      className={cn(
        // Theme-invariant call chrome (see --color-call-chrome in
        // styles.css). Both halves of the old pair flipped in dark mode:
        // `bg-surface-inverse` went near-white AND `text-text-inverse`
        // went near-black, so the dock painted dark-on-white while its
        // siblings (text-white/60 tabs, the ✕, the chat body) stayed
        // white — the panel was half-invisible either way.
        'flex min-h-0 flex-col overflow-hidden bg-call-chrome text-white',
        placement === 'docked'
          ? ['h-full shrink-0 border-l border-call-chrome-border', widthClassName]
          : 'absolute inset-0 z-20',
        className,
      )}
    >
      {/* The dock's ONE header. `py-3 px-4` plus a body that drew its own
          card left a dead strip above the first row of content; this row
          is deliberately tight. */}
      <header className="flex shrink-0 items-center justify-between gap-2 border-b border-call-chrome-border px-2 py-2">
        {showTabRail ? (
          <div
            role="tablist"
            aria-label="Call side panel sections"
            className="flex min-w-0 items-center gap-1 overflow-x-auto"
          >
            {resolvedTabs.map((tab) => {
              const isActive = tab.id === active.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  disabled={tab.disabled === true}
                  onClick={() => onTabChange?.(tab.id)}
                  data-testid={`call-side-panel-tab-${tab.id}`}
                  className={cn(
                    'shrink-0 rounded-full px-3 py-1 text-[13px] font-medium transition-colors',
                    isActive
                      ? 'bg-white/15 text-white'
                      : 'text-white/60 hover:bg-white/10 hover:text-white/90',
                    tab.disabled === true ? 'cursor-not-allowed opacity-40' : 'cursor-pointer',
                  )}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        ) : (
          <h2 className="m-0 truncate text-sm font-semibold text-white">{active.label}</h2>
        )}
        <button
          type="button"
          aria-label="Close"
          onClick={close}
          data-testid="call-side-panel-close"
          className="grid h-7 w-7 shrink-0 cursor-pointer place-items-center rounded text-lg leading-none text-white/70 hover:bg-white/10 hover:text-white"
        >
          ×
        </button>
      </header>
      <div
        role={showTabRail ? 'tabpanel' : undefined}
        data-testid={tabbed ? callSidePanelBodyTestId(active) : undefined}
        className="min-h-0 flex-1 overflow-y-auto"
      >
        {/* The dock owns the header and the height; bodies that know about
            <DockedPanelContext> (e.g. <ChatPanel>) drop their own heading
            and stretch to the column instead of stopping short. */}
        <DockedPanelProvider hasHeader fillsHeight>
          {active.content}
        </DockedPanelProvider>
      </div>
    </aside>
  );
}

export default CallSidePanel;
