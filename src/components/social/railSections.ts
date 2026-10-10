// The conversation rail's half of the rail model (2.438.0): sections as DATA,
// one builder that turns a host's records into a section, and the rail's
// per-device memory (folded sections, the reader's section order).
//
// Before this, each host assembled `RailSectionHeader` + `ConversationList`
// inside `ConversationRail` by hand and re-derived the same four things —
// rows, unread, the find filter and row keys — plus its own localStorage for
// folds and order. Now a host passes data:
//
//   const groups = buildRailSection({
//     id: 'groups', label: 'My initiatives', items: org.groups, query,
//     key: (g) => `group:${g.id}`, name: (g) => g.name,
//     row: (g) => ({ lastMessagePreview: '#auth', unreadCount: 2 }),
//     active: openKey, onSelect: openRow, state: { loading, error, nouns: 'initiatives' },
//   });
//   const memory = useRailSectionMemory('social.chatRail', { defaultFolded: { Teams: true } });
//   <ConversationRail sections={[groups, …]} {...memory.railProps} … />
//
// The count is the records the host holds (before the find filter), so a
// heading never shrinks while the reader types; the rows are the ones that
// match. Nothing here decides authority — the rows are what the server
// returned.
import { useCallback, useMemo, useState } from 'react';
import type { ConversationItem } from './ConversationList';
import type { ConversationRailSection } from './ConversationRail';

export interface RailSectionState {
  loading?: boolean;
  /** The read failed: the section says so rather than "nothing here". */
  error?: string | null;
  /** The plural noun for the empty and error lines ("initiatives"). */
  noun?: string;
  /** The empty line when there is nothing at all. Default "You are not on any <noun> yet." */
  emptyLabel?: string;
  /** One honest line instead of the rows (an account that cannot have any). */
  note?: string | null;
}

export interface BuildRailSectionOptions<T> {
  id: string;
  label: string;
  items: readonly T[];
  /** The rail's find text; rows whose name does not contain it are left out. */
  query?: string;
  /** The row key — what `onSelect` hands back. Unique across the rail. */
  key: (item: T) => string;
  /** The row's name (and what the find filter matches). */
  name: (item: T) => string;
  /** The rest of the row: second line, unread, live marker. */
  row?: (item: T) => Partial<Omit<ConversationItem, 'channel' | 'name'>>;
  /** The open row's key. */
  active?: string | null;
  onSelect: (key: string) => void;
  state?: RailSectionState;
  /** Rows before "Show N more". Default 8. */
  maxVisible?: number;
  'data-testid'?: string;
}

/** Whether `name` matches the rail's find text (case-insensitive substring). */
export function matchesRailQuery(name: string, query: string | null | undefined): boolean {
  const q = (query ?? '').trim().toLowerCase();
  return !q || name.toLowerCase().includes(q);
}

/** A data section for `ConversationRail sections`: the heading's count, the rows, the empty line. */
export function buildRailSection<T>(o: BuildRailSectionOptions<T>): ConversationRailSection {
  const rows: ConversationItem[] = o.items
    .filter((item) => matchesRailQuery(o.name(item), o.query))
    .map((item) => ({ kind: 'channel' as const, peers: [], ...(o.row?.(item) ?? {}), channel: o.key(item), name: o.name(item) }));
  const s = o.state ?? {};
  const noun = s.noun ?? 'items';
  const emptyLabel = s.error ? `Couldn’t load your ${noun} — ${s.error}.`
    : s.loading ? 'Loading…'
      : (o.query ?? '').trim() ? 'No match'
        : s.emptyLabel ?? `You are not on any ${noun} yet.`;
  return {
    id: o.id,
    label: o.label,
    count: s.note ? 0 : o.items.length,
    rows,
    activeRow: o.active ?? null,
    onSelectRow: o.onSelect,
    emptyLabel,
    ...(s.note ? { note: s.note } : {}),
    maxVisible: o.maxVisible ?? 8,
    ...(o['data-testid'] ? { 'data-testid': o['data-testid'] } : {}),
  };
}

export interface RailSectionMemoryOptions {
  /** Sections folded until the reader opens them, by label. */
  defaultFolded?: Readonly<Record<string, boolean>>;
  /** Labels the page is about (Teams on a teams route): open unless the reader folded them. */
  opened?: readonly string[];
}

export interface RailSectionMemory {
  /** Folded state by label (stored over the defaults). */
  collapsedSections: Readonly<Record<string, boolean>>;
  isFolded: (label: string) => boolean;
  setFolded: (label: string, next: boolean) => void;
  sectionLayout: string[] | null;
  setSectionLayout: (order: string[] | null) => void;
  /** Spread onto `ConversationRail`. */
  railProps: {
    collapsedSections: Readonly<Record<string, boolean>>;
    onToggleSection: (label: string, next: boolean) => void;
    sectionLayout: string[] | null;
    onSectionLayoutChange: (order: string[] | null) => void;
  };
}

function readJson<T>(key: string, valid: (v: unknown) => v is T): T | null {
  if (typeof window === 'undefined') return null;
  try {
    const value: unknown = JSON.parse(window.localStorage.getItem(key) ?? 'null');
    return valid(value) ? value : null;
  } catch { return null; }
}
function writeJson(key: string, value: unknown): void {
  try {
    if (value == null) window.localStorage.removeItem(key);
    else window.localStorage.setItem(key, JSON.stringify(value));
  } catch { /* a device preference only */ }
}
const isFoldMap = (v: unknown): v is Record<string, boolean> => !!v && typeof v === 'object' && !Array.isArray(v);
const isOrder = (v: unknown): v is string[] => Array.isArray(v) && v.every((x) => typeof x === 'string');

/**
 * The rail's per-device memory under `<storageKey>.folded` (labels → folded)
 * and `<storageKey>.layout` (the reader's section order). A preference, not
 * state: private mode or blocked storage still folds, just forgets.
 */
export function useRailSectionMemory(storageKey: string, options: RailSectionMemoryOptions = {}): RailSectionMemory {
  const foldKey = `${storageKey}.folded`, layoutKey = `${storageKey}.layout`;
  const [stored, setStored] = useState<Record<string, boolean>>(() => readJson(foldKey, isFoldMap) ?? {});
  const [layout, setLayout] = useState<string[] | null>(() => readJson(layoutKey, isOrder));
  const setFolded = useCallback((label: string, next: boolean) => setStored((value) => {
    const updated = { ...value, [label]: next };
    writeJson(foldKey, updated);
    return updated;
  }), [foldKey]);
  const setSectionLayout = useCallback((order: string[] | null) => { setLayout(order); writeJson(layoutKey, order); }, [layoutKey]);
  const openedKey = (options.opened ?? []).join('|');
  const defaults = options.defaultFolded;
  const collapsedSections = useMemo(() => {
    const opened = new Set(openedKey ? openedKey.split('|') : []);
    const base: Record<string, boolean> = {};
    for (const [label, folded] of Object.entries(defaults ?? {})) if (folded && !opened.has(label)) base[label] = true;
    return { ...base, ...stored };
  }, [defaults, openedKey, stored]);
  const isFolded = useCallback((label: string) => !!collapsedSections[label], [collapsedSections]);
  return {
    collapsedSections, isFolded, setFolded, sectionLayout: layout, setSectionLayout,
    railProps: { collapsedSections, onToggleSection: setFolded, sectionLayout: layout, onSectionLayoutChange: setSectionLayout },
  };
}
