// The rail model's fold half (2.438.0): how deep a page sits, which band that
// is, and each rail's remembered fold in that band — one storage convention
// for every rail that folds.
//
// Before this every host kept its own: a shell rule with a depth function, a
// hand-maintained list of "drill" query params, a module-global signal so
// the rule could see the right pane, and three storage formats ('open' /
// 'collapsed', '1' / '0', 'true' / 'false') under keys that each spelt the
// band differently. Now:
//
//   const depth = railDepth(location, { prefixes, drillParams, leafRoutes, explored });
//   <RailBandProvider band={railBand(depth)}>…</RailBandProvider>
//   const primary = useRailFold({ storageKey: 'shell.primary-rail', defaultFolded: deep || narrow });
//   const list = useRailFold({ storageKey: 'initiatives.rail-collapsed' });
//
// - `railDepth` is pure. The HOST declares its routes (tenant prefixes, the
//   query params that open a record beside its list, the routes that are
//   always a record); `explored` is the side pane showing a selection of the
//   page (`useSidePaneHost().explores`), which is two levels: the selection
//   and the pane beside it.
// - Bands: depth 1–2 is `shallow` (a section's lists, one record), 3+ is
//   `deep`. A reader's fold is remembered per band, so folding the primary
//   rail on a work item does not fold it on every list page, and a fold set
//   on a list page never leaves a deep page without its section rail.
// - Storage: `<storageKey>.<band>` = `collapsed` | `open`. Nothing stored
//   means the host's default for that band.
//
// The fold itself is drawn by the rail: `SubNavLayout collapsed` (a 44px
// strip holding only its title action), `ExplorerLayout railCollapsed`, a
// `ConversationRail` section's fold.
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';

export type RailBand = 'shallow' | 'deep';

/** Under this window width the primary rail folds at any depth (rail + section rail + content + an aside do not fit). */
export const RAIL_FOLD_PRIMARY_BELOW = 1180;
/** Under this width a section rail folds too — always after the primary rail. */
export const RAIL_FOLD_SECTION_BELOW = 768;

export interface RailDepthSpec {
  /** Leading path segments that name an app/tenant, not a level (`iq`, `admin`). */
  prefixes?: readonly string[];
  /** Query params whose presence opens a record beside the page's list (`item`, `run`): one level. */
  drillParams?: readonly string[];
  /** Routes that are always a record: depth 3 at least. */
  leafRoutes?: readonly RegExp[];
  /**
   * The side pane shows a selection of this page (a record tab, a detail):
   * two levels — the selection, then the pane beside it — unless a drill
   * param already counts the record.
   */
  explored?: boolean;
}

/**
 * How deep a route sits under its section: `/iq/projects` 1, `/iq/projects/p-x`
 * 2, `/iq/projects/p-x?item=wi` 3, a page with its side pane exploring a
 * selection +2.
 */
export function railDepth(location: { pathname: string; search?: string }, spec: RailDepthSpec = {}): number {
  const segments = location.pathname.split('/').filter(Boolean);
  const below = segments.length > 0 && spec.prefixes?.includes(segments[0]!) ? segments.slice(1) : segments;
  const search = location.search ?? '';
  const params = new URLSearchParams(search.startsWith('?') ? search.slice(1) : search);
  const drilled = (spec.drillParams ?? []).some((p) => params.get(p));
  let depth = Math.max(1, below.length) + (drilled ? 1 : 0);
  if (spec.explored && !drilled) depth += 2;
  if ((spec.leafRoutes ?? []).some((re) => re.test(location.pathname))) depth = Math.max(depth, 3);
  return depth;
}

export function railBand(depth: number): RailBand {
  return depth >= 3 ? 'deep' : 'shallow';
}

/** The storage key a rail's fold is remembered under in a band. */
export function railFoldKey(storageKey: string, band: RailBand): string {
  return `${storageKey}.${band}`;
}

/** A stored fold: `collapsed` / `open`, anything else nothing. */
export function readRailFold(raw: string | null | undefined): boolean | null {
  return raw === 'collapsed' ? true : raw === 'open' ? false : null;
}

const BandContext = createContext<RailBand>('shallow');

/** The band every `useRailFold` under it remembers its fold in (the host computes it once from `railDepth`). */
export function RailBandProvider({ band, children }: { band: RailBand; children: ReactNode }) {
  return <BandContext.Provider value={band}>{children}</BandContext.Provider>;
}

/** The band set by the nearest `RailBandProvider`; `shallow` outside one. */
export function useRailBand(): RailBand {
  return useContext(BandContext);
}

export interface UseRailFoldOptions {
  /** Names the rail: the fold is stored under `<storageKey>.<band>`. */
  storageKey: string;
  /** The band to remember in; default the nearest `RailBandProvider`'s. */
  band?: RailBand;
  /** Folded when the reader has chosen nothing in this band (the host's rule: deep, narrow…). Default false. */
  defaultFolded?: boolean;
}

export interface RailFold {
  folded: boolean;
  /** Flip the fold and remember the choice in the current band. */
  toggle: () => void;
  /** The band the fold is read from. */
  band: RailBand;
  /** The reader chose this band's fold by hand (it overrides `defaultFolded`). */
  remembered: boolean;
}

function read(key: string): boolean | null {
  if (typeof window === 'undefined') return null;
  try { return readRailFold(window.localStorage.getItem(key)); } catch { return null; }
}

/** A rail's fold in the current band: the reader's remembered choice, else the host's default. */
export function useRailFold({ storageKey, band: bandOverride, defaultFolded = false }: UseRailFoldOptions): RailFold {
  const contextBand = useRailBand();
  const band = bandOverride ?? contextBand;
  const [stored, setStored] = useState<Record<RailBand, boolean | null>>(() => ({
    shallow: read(railFoldKey(storageKey, 'shallow')), deep: read(railFoldKey(storageKey, 'deep')),
  }));
  // A different rail (key) re-reads its own memory.
  const [forKey, setForKey] = useState(storageKey);
  if (forKey !== storageKey) {
    setForKey(storageKey);
    setStored({ shallow: read(railFoldKey(storageKey, 'shallow')), deep: read(railFoldKey(storageKey, 'deep')) });
  }
  const remembered = stored[band];
  const folded = remembered ?? defaultFolded;
  const toggle = useCallback(() => {
    const next = !folded;
    setStored((was) => ({ ...was, [band]: next }));
    try { window.localStorage.setItem(railFoldKey(storageKey, band), next ? 'collapsed' : 'open'); } catch { /* not remembered, still applied */ }
  }, [band, folded, storageKey]);
  return { folded, toggle, band, remembered: remembered != null };
}

/** The window's inner width, live. 1680 on the server. */
export function useViewportWidth(): number {
  const [width, setWidth] = useState(() => (typeof window === 'undefined' ? 1680 : window.innerWidth));
  useEffect(() => {
    const update = () => setWidth(window.innerWidth);
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  return width;
}

/**
 * The primary rail's fold as the shell hands it down (2.515.0): `AppShell
 * sidebarFold` provides it, and a `NavRail` in the shell's sidebar reads it,
 * so the rail draws its 44px strip and its fold toggle without the host
 * threading `collapsed` through by hand. Null outside a folding shell.
 */
export type ShellRailFold = Pick<RailFold, 'folded' | 'toggle'>;

const ShellRailFoldContext = createContext<ShellRailFold | null>(null);

export function ShellRailFoldProvider({ fold, children }: { fold: ShellRailFold | null; children: ReactNode }) {
  return <ShellRailFoldContext.Provider value={fold}>{children}</ShellRailFoldContext.Provider>;
}

/** The enclosing `AppShell sidebarFold`, or null. */
export function useShellRailFold(): ShellRailFold | null {
  return useContext(ShellRailFoldContext);
}
