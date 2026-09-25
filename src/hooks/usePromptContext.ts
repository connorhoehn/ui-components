// usePromptContext — the documents a viewer has gathered to use together in
// the next prompt (realtime-examples PLAN WS-K).
//
// Two surfaces read it and must never disagree: a result row's "Add / ✓ Added"
// toggle and the docked composer's chip row. So there is ONE store per scope,
// held at module level and read through `useSyncExternalStore`, rather than a
// copy in each component's state.
//
// It is pure client state. It holds ids and the titles THIS viewer already
// saw; nothing here is authority — the server checks `document:read` on every
// id again when a run is prepared, and refuses the whole run if one fails.
//
// Persistence is per viewer and per tab (`sessionStorage`): a gathered set is
// a working draft, not a preference, and must not leak into another tab's
// run. Storage that throws (private window, blocked site data) degrades to
// memory; the page works the same, it just forgets on reload.

import { useCallback, useMemo, useSyncExternalStore } from 'react';

export interface PromptContextItem {
  id: string;
  title: string;
  /** 'page' | 'presentation' | 'diagram' | … — drives the chip's glyph. */
  kind?: string;
}

export interface PromptContext {
  items: readonly PromptContextItem[];
  /** False when the set is full (the item is refused). An item already present only has its title refreshed. */
  add: (item: PromptContextItem) => boolean;
  remove: (id: string) => void;
  has: (id: string) => boolean;
  /** Add when absent, remove when present. Returns whether it is now present. */
  toggle: (item: PromptContextItem) => boolean;
  clear: () => void;
}

/** The most documents one prompt carries (the deck pipeline reads at most 6; room for a picker to show "full"). */
export const PROMPT_CONTEXT_LIMIT = 10;
/** The drag payload a result row sets and the composer accepts: a JSON array of `PromptContextItem`. */
export const PROMPT_CONTEXT_DRAG_TYPE = 'application/x-uic-prompt-context';

const STORAGE_PREFIX = 'uic:prompt-context:';
const EMPTY: readonly PromptContextItem[] = Object.freeze([]);

interface Store {
  items: readonly PromptContextItem[];
  listeners: Set<() => void>;
}

const stores = new Map<string, Store>();

function clean(value: unknown): PromptContextItem | null {
  if (!value || typeof value !== 'object') return null;
  const v = value as { id?: unknown; title?: unknown; kind?: unknown };
  if (typeof v.id !== 'string' || !v.id.trim()) return null;
  const title = typeof v.title === 'string' && v.title.trim() ? v.title.trim().slice(0, 200) : v.id;
  return { id: v.id.trim(), title, ...(typeof v.kind === 'string' && v.kind ? { kind: v.kind } : {}) };
}

function cleanList(value: unknown): PromptContextItem[] {
  if (!Array.isArray(value)) return [];
  const seen = new Set<string>();
  const out: PromptContextItem[] = [];
  for (const entry of value) {
    const item = clean(entry);
    if (!item || seen.has(item.id)) continue;
    seen.add(item.id);
    out.push(item);
    if (out.length >= PROMPT_CONTEXT_LIMIT) break;
  }
  return out;
}

function load(scope: string): readonly PromptContextItem[] {
  try {
    const raw = globalThis.sessionStorage?.getItem(STORAGE_PREFIX + scope);
    if (!raw) return EMPTY;
    const list = cleanList(JSON.parse(raw));
    return list.length ? list : EMPTY;
  } catch {
    return EMPTY;
  }
}

function storeFor(scope: string): Store {
  let store = stores.get(scope);
  if (!store) {
    store = { items: load(scope), listeners: new Set() };
    stores.set(scope, store);
  }
  return store;
}

function commit(scope: string, next: readonly PromptContextItem[]): void {
  const store = storeFor(scope);
  store.items = next.length ? next : EMPTY;
  try {
    if (next.length) globalThis.sessionStorage?.setItem(STORAGE_PREFIX + scope, JSON.stringify(next));
    else globalThis.sessionStorage?.removeItem(STORAGE_PREFIX + scope);
  } catch { /* memory only */ }
  for (const listener of [...store.listeners]) listener();
}

/** The store's operations without React — for a drop handler or a test. */
export function promptContextStore(scope = 'documents'): Omit<PromptContext, 'items'> & { get: () => readonly PromptContextItem[] } {
  const get = () => storeFor(scope).items;
  const has = (id: string) => get().some((item) => item.id === id);
  const add = (raw: PromptContextItem): boolean => {
    const item = clean(raw);
    if (!item) return false;
    const items = get();
    const at = items.findIndex((i) => i.id === item.id);
    if (at >= 0) {
      if (items[at]!.title !== item.title || items[at]!.kind !== item.kind) {
        commit(scope, items.map((i, n) => (n === at ? item : i)));
      }
      return true;
    }
    if (items.length >= PROMPT_CONTEXT_LIMIT) return false;
    commit(scope, [...items, item]);
    return true;
  };
  const remove = (id: string) => {
    const items = get();
    if (items.some((i) => i.id === id)) commit(scope, items.filter((i) => i.id !== id));
  };
  const toggle = (item: PromptContextItem): boolean => {
    if (has(item.id)) { remove(item.id); return false; }
    return add(item);
  };
  const clear = () => { if (get().length) commit(scope, EMPTY); };
  return { get, add, remove, has, toggle, clear };
}

/** Tests: forget every scope's in-memory copy (storage is left alone). */
export function resetPromptContextStores(): void { stores.clear(); }

export function usePromptContext(scope = 'documents'): PromptContext {
  const subscribe = useCallback((listener: () => void) => {
    const store = storeFor(scope);
    store.listeners.add(listener);
    return () => { store.listeners.delete(listener); };
  }, [scope]);
  const getSnapshot = useCallback(() => storeFor(scope).items, [scope]);
  const items = useSyncExternalStore(subscribe, getSnapshot, () => EMPTY);
  const ops = useMemo(() => promptContextStore(scope), [scope]);
  return useMemo(() => ({
    items,
    add: ops.add,
    remove: ops.remove,
    has: (id: string) => items.some((item) => item.id === id),
    toggle: ops.toggle,
    clear: ops.clear,
  }), [items, ops]);
}

/** Sets a drag's payload: the prompt-context MIME (JSON) plus the titles as plain text. */
export function writePromptContextDrag(dataTransfer: DataTransfer, items: readonly PromptContextItem[]): void {
  const list = cleanList(items);
  if (!list.length) return;
  dataTransfer.setData(PROMPT_CONTEXT_DRAG_TYPE, JSON.stringify(list));
  dataTransfer.setData('text/plain', list.map((item) => item.title).join('\n'));
  dataTransfer.effectAllowed = 'copy';
}

/** True while a drag carries a prompt-context payload (types are readable during dragover; data is not). */
export function isPromptContextDrag(dataTransfer: DataTransfer | null | undefined): boolean {
  return !!dataTransfer && Array.from(dataTransfer.types ?? []).includes(PROMPT_CONTEXT_DRAG_TYPE);
}

/** The items a drop carried, cleaned; [] for any other drop. */
export function readPromptContextDrag(dataTransfer: DataTransfer | null | undefined): PromptContextItem[] {
  if (!dataTransfer) return [];
  try {
    const raw = dataTransfer.getData(PROMPT_CONTEXT_DRAG_TYPE);
    return raw ? cleanList(JSON.parse(raw)) : [];
  } catch {
    return [];
  }
}
