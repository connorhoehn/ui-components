// SidePane (2.438.0) — the app's right pane: the fourth column beside the
// rails and the content, where a page's conversation, a record's details, a
// run's log or a person open "far right" without leaving the page.
//
// Three parts, one model:
//
//   <SidePaneProvider storageKey="shell.conversation-pane">   ← the shell, above its rails
//     …rails…
//     <SidePaneSplit paneTestId="page-conversation-pane">     ← where the page renders
//       <Outlet />
//     </SidePaneSplit>
//   </SidePaneProvider>
//
//   // in a page:
//   <SidePane title="Discussion" tabs={pane.tabs} value={pane.tab} onValueChange={pane.select}>…</SidePane>
//
// - ONE pane per page. A page registers it with `SidePane`; its children are
//   portaled into a stable element that stays mounted whether or not the pane
//   is on screen, so collapsing it (the reader's ×, a narrow window) never
//   drops a thread's subscription or a draft.
// - Open state and the split ratio are remembered per device
//   (`<storageKey>.open`, `<storageKey>.ratio`). A page that owns its pane
//   (`onClose`, e.g. "Ask about selection") shows it while registered and its
//   × calls the page instead.
// - It fits or it waits: the split needs `fitPrimaryPx + minSecondaryPx`; a
//   narrower window keeps the pane off screen until `reveal()` (the footer's
//   Message) asks for it, which holds until the window changes band.
// - `widthPx` bounds a pane whatever the remembered ratio (Search keeps its
//   graph the larger column).
// - `useSidePaneHost()` publishes what the shell needs — `explored` (the pane
//   shows a selection of the page: two rail-depth levels, see `railDepth`),
//   `reveal`, `shown` — so nothing reads pane state through a global.
// - The tab row (`PaneHeader`), the body and a docked `footer` (the pane's
//   one composer) are the pane's three rows, on one 16px inset. Tab state
//   and its URL contract are `usePaneState` (`?pane=<tab>&paneRecord=<kind>:<id>`).
// - The pane draws at `compact` density (`DensityProvider`): it is a column.
// - Menus opened inside the pane stay inside it (the frame is a popover boundary).
import {
  createContext, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../lib/cn';
import { SplitPane } from './SplitPane';
import { ChatSidePanelFrame } from '../social/ChatSidePanelRegistry';
import { DensityProvider, type Density } from '../shared/Density';
import { Tabs, type TabItem } from '../shared/Tabs';

// ─── Bounds ─────────────────────────────────────────────────────────────────

export interface SidePaneBounds {
  /** The split's ratio (page share) when nothing is remembered. Default 0.72. */
  defaultRatio: number;
  /** The remembered ratio is kept inside [ratioMin, ratioMax]. Defaults 0.4 / 0.85. */
  ratioMin: number;
  ratioMax: number;
  /** The page's floor while dragging (px). Default 520. */
  minPrimaryPx: number;
  /** The pane's floor (px). Default 300. */
  minSecondaryPx: number;
  /**
   * The page needs this much beside an open pane (px) — a section rail and a
   * readable content column — or the pane waits for `reveal()`. Default 860.
   */
  fitPrimaryPx: number;
}

export const SIDE_PANE_BOUNDS: SidePaneBounds = {
  defaultRatio: 0.72, ratioMin: 0.4, ratioMax: 0.85, minPrimaryPx: 520, minSecondaryPx: 300, fitPrimaryPx: 860,
};

/** A stored ratio inside the bounds, else the default. */
export function readSidePaneRatio(stored: string | null | undefined, bounds: SidePaneBounds = SIDE_PANE_BOUNDS): number {
  const value = stored == null || stored === '' ? Number.NaN : Number(stored);
  if (!Number.isFinite(value)) return bounds.defaultRatio;
  return Math.min(bounds.ratioMax, Math.max(bounds.ratioMin, value));
}

/** The stored open choice ('1' / '0'), else the default. */
export function readSidePaneOpen(stored: string | null | undefined, defaultOpen = true): boolean {
  return stored === '1' ? true : stored === '0' ? false : defaultOpen;
}

/** The split is wide enough for the page beside the pane. Unmeasured (first paint): it fits. */
export function sidePaneFits(splitWidthPx: number | null, bounds: SidePaneBounds = SIDE_PANE_BOUNDS): boolean {
  if (splitWidthPx == null) return true;
  return splitWidthPx >= bounds.fitPrimaryPx + bounds.minSecondaryPx;
}

/** The ratio that keeps a width-bounded pane inside its bounds at this split width; the ratio otherwise. */
export function boundedSidePaneRatio(ratio: number, splitWidthPx: number | null, widthPx?: { min: number; max: number } | null): number {
  if (!widthPx || splitWidthPx == null || splitWidthPx <= 0) return ratio;
  const secondary = Math.min(widthPx.max, Math.max(widthPx.min, (1 - ratio) * splitWidthPx));
  return 1 - secondary / splitWidthPx;
}

// ─── The host ───────────────────────────────────────────────────────────────

export interface SidePaneRegistration {
  /** The frame's title ("Discussion", "Details"). */
  title: string;
  /** The second line: what the pane is about. */
  subtitle?: string;
  /** Names the frame's × ("Collapse discussion"); default `Collapse <title>`. */
  closeLabel?: string;
  /** The page owns the open state: the pane shows while registered and × calls this. */
  onClose?: () => void;
  /** Bounds the pane's width (px) whatever the remembered ratio. */
  widthPx?: { min: number; max: number };
  /** The pane shows a selection of the page (a record, a detail) — a rail-depth level of its own. */
  explores?: boolean;
}

interface HostValue {
  node: HTMLElement | null;
  registration: SidePaneRegistration | null;
  register(registration: SidePaneRegistration): () => void;
  open: boolean;
  shown: boolean;
  fits: boolean;
  ratio: number;
  width: number | null;
  bounds: SidePaneBounds;
  setWidth(width: number | null): void;
  setRatio(ratio: number): void;
  reveal(): void;
  collapse(): void;
}

const HostContext = createContext<HostValue | null>(null);

function readStored(key: string): string | null {
  if (typeof window === 'undefined') return null;
  try { return window.localStorage.getItem(key); } catch { return null; }
}
function writeStored(key: string, value: string): void {
  try { window.localStorage.setItem(key, value); } catch { /* not remembered, still applied */ }
}

export interface SidePaneProviderProps {
  /** Per-device memory: `<storageKey>.open` and `<storageKey>.ratio`. Default `uic.side-pane`. */
  storageKey?: string;
  /** Open when nothing is remembered. Default true. */
  defaultOpen?: boolean;
  bounds?: Partial<SidePaneBounds>;
  children: ReactNode;
}

export function SidePaneProvider({ storageKey = 'uic.side-pane', defaultOpen = true, bounds: boundsOverride, children }: SidePaneProviderProps) {
  const openKey = `${storageKey}.open`, ratioKey = `${storageKey}.ratio`;
  const bounds = useMemo<SidePaneBounds>(() => ({ ...SIDE_PANE_BOUNDS, ...(boundsOverride ?? {}) }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [boundsOverride?.defaultRatio, boundsOverride?.ratioMin, boundsOverride?.ratioMax, boundsOverride?.minPrimaryPx, boundsOverride?.minSecondaryPx, boundsOverride?.fitPrimaryPx]);
  const [node] = useState<HTMLElement | null>(() => {
    if (typeof document === 'undefined') return null;
    const element = document.createElement('div');
    element.className = 'flex h-full min-h-0 flex-col';
    return element;
  });
  const [registration, setRegistration] = useState<SidePaneRegistration | null>(null);
  const register = useCallback((next: SidePaneRegistration) => {
    setRegistration(next);
    return () => setRegistration((current) => (current === next ? null : current));
  }, []);
  const [open, setOpen] = useState(() => readSidePaneOpen(readStored(openKey), defaultOpen));
  const [ratio, setRatioState] = useState(() => readSidePaneRatio(readStored(ratioKey), bounds));
  const [revealed, setRevealed] = useState(false);
  const [width, setWidth] = useState<number | null>(null);
  const fits = sidePaneFits(width, bounds);
  // An explicit reveal holds only until the window next changes band.
  useEffect(() => { setRevealed(false); }, [fits]);
  const pageOwned = !!registration?.onClose;
  const shown = !!registration && (open || pageOwned) && (fits || revealed);
  const reveal = useCallback(() => { setOpen(true); writeStored(openKey, '1'); setRevealed(true); }, [openKey]);
  const collapse = useCallback(() => { setOpen(false); writeStored(openKey, '0'); setRevealed(false); }, [openKey]);
  const setRatio = useCallback((next: number) => { setRatioState(next); writeStored(ratioKey, String(next)); }, [ratioKey]);
  const value = useMemo<HostValue>(() => ({
    node, registration, register, open: open || pageOwned, shown, fits, ratio, width, bounds, setWidth, setRatio, reveal, collapse,
  }), [node, registration, register, open, pageOwned, shown, fits, ratio, width, bounds, setRatio, reveal, collapse]);
  return <HostContext.Provider value={value}>{children}</HostContext.Provider>;
}

export interface SidePaneHostState {
  /** A page has registered a pane. */
  registered: boolean;
  /** The pane is asked for (registered and open, or page-owned) — on screen or waiting for room. */
  asked: boolean;
  /** On screen now. */
  shown: boolean;
  /** Asked for, and showing a selection of the page: two rail-depth levels (`railDepth` `explored`). */
  explored: boolean;
  /** Open (and remember open) and show it even in a narrow window. */
  reveal(): void;
  /** Close it (remembered); a page-owned pane's × is the page's. */
  collapse(): void;
}

const NO_HOST: SidePaneHostState = { registered: false, asked: false, shown: false, explored: false, reveal: () => {}, collapse: () => {} };

/** What the shell reads: whether a pane is asked for, shown, exploring a selection. */
export function useSidePaneHost(): SidePaneHostState {
  const host = useContext(HostContext);
  return useMemo(() => {
    if (!host) return NO_HOST;
    const registered = !!host.registration;
    const asked = registered && host.open;
    return { registered, asked, shown: host.shown, explored: asked && !!host.registration?.explores, reveal: host.reveal, collapse: host.collapse };
  }, [host]);
}

/** The page's view of its pane: on screen (focus waits for it), how to bring it back, and whether it is attached. */
export function useSidePane(): { visible: boolean; reveal(): void; attached(): boolean } {
  const host = useContext(HostContext);
  const node = host?.node ?? null;
  const shown = !!host?.shown;
  const reveal = host?.reveal;
  return useMemo(() => ({ visible: shown, reveal: reveal ?? (() => {}), attached: () => !!node?.isConnected }), [shown, reveal, node]);
}

export interface SidePaneSplitProps {
  /** The page. */
  children: ReactNode;
  /** Stacked above the page's pane in the same column (a call's media grid). */
  before?: ReactNode;
  /** Stacked below it (a huddle's chat). Alone, it takes the column. */
  after?: ReactNode;
  /** The registered pane's frame test id (its title `-title`, subtitle `-subtitle`, × `-close`). */
  paneTestId?: string;
  dividerLabel?: string;
  className?: string;
  'data-testid'?: string;
}

function SplitInner({ children, before, after, paneTestId = 'side-pane', dividerLabel = 'Resize page and pane', className, 'data-testid': testId = 'side-pane-split' }: SidePaneSplitProps) {
  const host = useContext(HostContext)!;
  // Measured before paint (not a later observer callback), so a narrow window
  // never flashes the pane open on its first frame.
  const [measured, setMeasured] = useState<HTMLDivElement | null>(null);
  const setWidth = host.setWidth;
  const width = host.width;
  useLayoutEffect(() => {
    if (!measured) return undefined;
    // Zero is "not laid out yet" (a hidden tab, a test DOM), not "too narrow".
    const update = () => { const w = measured.getBoundingClientRect().width; setWidth(w > 0 ? w : null); };
    update();
    if (typeof ResizeObserver === 'undefined') return undefined;
    const observer = new ResizeObserver(update);
    observer.observe(measured);
    return () => observer.disconnect();
  }, [measured, setWidth]);
  const [slot, setSlot] = useState<HTMLElement | null>(null);
  const { node, registration } = host;
  const shown = host.shown;
  useLayoutEffect(() => {
    if (!node) return;
    if (shown && slot) { if (node.parentElement !== slot) slot.appendChild(node); }
    else node.remove();
  }, [node, slot, shown]);
  const extra = before != null || after != null;
  const pane = shown && registration
    ? <ChatSidePanelFrame size="sm" title={registration.title} {...(registration.subtitle ? { subtitle: registration.subtitle } : {})}
        closeLabel={registration.closeLabel ?? `Collapse ${registration.title.toLowerCase()}`} onClose={registration.onClose ?? host.collapse}
        className="min-h-0 flex-1 border-l border-border bg-surface" data-testid={paneTestId}>
        <div ref={setSlot} className="flex h-full min-h-0 flex-col" data-testid={`${paneTestId}-slot`} />
      </ChatSidePanelFrame>
    : null;
  const secondary = pane || extra
    ? (pane && !extra ? pane
      : <div className="flex h-full min-h-0 flex-col bg-surface" data-testid={`${testId}-stack`}>{before}{pane}{after}</div>)
    : null;
  const ratio = shown ? boundedSidePaneRatio(host.ratio, width, registration?.widthPx) : host.ratio;
  return (
    <div ref={setMeasured} className={cn('flex h-full min-h-0 min-w-0 flex-col', className)}>
      <SplitPane primary={children} secondary={secondary} ratio={ratio} onRatioChange={host.setRatio}
        minPrimaryPx={host.bounds.minPrimaryPx} minSecondaryPx={host.bounds.minSecondaryPx} dividerLabel={dividerLabel}
        className="h-full min-h-0" data-testid={testId} />
    </div>
  );
}

/**
 * Where the page renders, with its pane on the right. Under a
 * `SidePaneProvider` it uses that host (the shell reads it); alone it hosts
 * itself.
 */
export function SidePaneSplit(props: SidePaneSplitProps) {
  const host = useContext(HostContext);
  if (host) return <SplitInner {...props} />;
  return <SidePaneProvider><SplitInner {...props} /></SidePaneProvider>;
}

// ─── The page's pane ────────────────────────────────────────────────────────

export interface PaneHeaderProps {
  /** The pane's sections. One tab row — the only tablist in the pane. */
  tabs: readonly TabItem[];
  value: string;
  onValueChange: (id: string) => void;
  /** Right end of the row (a view switcher), on the row's own line. */
  trailing?: ReactNode;
  /** Names the tablist. Default "Pane sections". */
  label?: string;
  'data-testid'?: string;
}

/**
 * The pane's tab row: underline tabs whose first label starts on the pane's
 * 16px inset (the frame title's edge), a trailing slot on the same row, one
 * rule under it.
 */
export function PaneHeader({ tabs, value, onValueChange, trailing, label = 'Pane sections', 'data-testid': testId = 'pane-header' }: PaneHeaderProps) {
  return (
    // pl-1.5: the first tab's own 10px padding brings its label to 16px.
    <div className="flex shrink-0 items-center justify-between gap-2 border-b border-border pl-1.5 pr-4" data-testid={testId}>
      <Tabs size="sm" variant="underline" indicator="bar" aria-label={label} className="min-w-0 after:hidden"
        items={[...tabs]} value={value} onValueChange={onValueChange} />
      {trailing}
    </div>
  );
}

export interface SidePaneProps extends SidePaneRegistration {
  /** The pane's sections (`usePaneState().tabs`); none, no tab row. */
  tabs?: readonly TabItem[];
  value?: string;
  onValueChange?: (id: string) => void;
  /** Right end of the tab row. */
  trailing?: ReactNode;
  /** Docked under the body: the pane's one composer. */
  footer?: ReactNode;
  /** The pane's density; default `compact`. */
  density?: Density;
  children: ReactNode;
  /** The pane content's root; its tab row is `<id>-header-row`, its tabs `<id>-tab-<tab>`, its footer `<id>-footer`. */
  'data-testid'?: string;
}

/**
 * A page's pane, registered with the shell's `SidePaneProvider` and portaled
 * into its right column. Outside a host it renders nothing (the page's own
 * column is unchanged).
 */
export function SidePane({
  title, subtitle, closeLabel, onClose, widthPx, explores = false,
  tabs, value, onValueChange, trailing, footer, density = 'compact', children, 'data-testid': testId = 'side-pane-content',
}: SidePaneProps) {
  const host = useContext(HostContext);
  const register = host?.register;
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  const owned = !!onClose;
  const wMin = widthPx?.min, wMax = widthPx?.max;
  useEffect(() => register?.({
    title, ...(subtitle ? { subtitle } : {}), ...(closeLabel ? { closeLabel } : {}), explores,
    ...(owned ? { onClose: () => closeRef.current?.() } : {}),
    ...(wMin != null && wMax != null ? { widthPx: { min: wMin, max: wMax } } : {}),
  }), [register, title, subtitle, closeLabel, explores, owned, wMin, wMax]);
  if (!host?.node) return null;
  const tabRow = tabs && tabs.length > 0 && value != null && onValueChange
    ? <PaneHeader tabs={tabs.map((t) => ({ ...t, testId: t.testId ?? `${testId}-tab-${t.id}` }))} value={value} onValueChange={onValueChange}
        {...(trailing ? { trailing } : {})} data-testid={`${testId}-header-row`} />
    : null;
  return createPortal(
    <DensityProvider value={density}>
      <div className="flex h-full min-h-0 min-w-0 flex-col" data-testid={testId}>
        {tabRow}
        <div className="flex min-h-0 min-w-0 flex-1 flex-col">{children}</div>
        {footer != null && <div className="shrink-0 min-w-0" data-testid={`${testId}-footer`}>{footer}</div>}
      </div>
    </DensityProvider>,
    host.node,
  );
}

export default SidePane;
