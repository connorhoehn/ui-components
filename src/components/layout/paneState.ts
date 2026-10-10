// usePaneState (2.438.0) — a side pane's tabs and the ONE URL contract for
// them:
//
//   ?pane=<tab>                          a tab of the pane ("details", "docs", "chat")
//   ?pane=<tab>&paneRecord=<kind>:<id>   a record tab and the record it shows ("log" + "run:job-7")
//
// The resting tab (the pane's default, e.g. a Discussion) is the absence of
// both params. `paneRecord` is never a page selection: a page that selects
// things on its canvas keeps its own `selection` param for that.
//
// Tabs are a registry: `{ id, label, remember?, recordKinds? }`.
// - A plain tab is always listed.
// - A RECORD tab (`recordKinds`) shows one record — a run's log, a person —
//   and is listed only while the URL names a record of one of its kinds.
// - `remember` tabs are restored per device (`rememberKey`) when the reader
//   arrives with no pane params; record tabs never are.
//
// Router-agnostic: pass the router's search params and setter. Pure helpers
// (`readPaneState`, `writePaneState`, `visiblePaneTabs`) are exported for
// links that open a pane tab from elsewhere.
import { useCallback, useEffect, useMemo, useRef } from 'react';
import type { TabItem } from '../shared/Tabs';

export interface PaneTabSpec {
  id: string;
  label: string;
  /** Restored per device on arrival (a resting choice: Details, Docs). */
  remember?: boolean;
  /** A record tab: the record kinds it shows. Listed only while one is named. */
  recordKinds?: readonly string[];
  badge?: TabItem['badge'];
}

export interface PaneRecord { kind: string; id: string }
export interface PaneState { tab: string; record: PaneRecord | null }

export interface PaneUrlOptions {
  /** Default `pane`. */
  urlKey?: string;
  /** Default `paneRecord`. */
  recordKey?: string;
}

const VALID_ID = /^[a-zA-Z0-9:_.@-]{1,256}$/;
const VALID_KIND = /^[a-z][a-z0-9-]{0,31}$/;

/** `run:job-7` → `{kind:'run', id:'job-7'}`; null for anything malformed. */
export function parsePaneRecord(raw: string | null | undefined): PaneRecord | null {
  if (!raw) return null;
  const at = raw.indexOf(':');
  if (at <= 0) return null;
  const kind = raw.slice(0, at), id = raw.slice(at + 1);
  return VALID_KIND.test(kind) && VALID_ID.test(id) ? { kind, id } : null;
}

export function paneRecordKey(record: PaneRecord): string {
  return `${record.kind}:${record.id}`;
}

/** The tab and record the URL names, against the registry; the default tab for anything unknown. */
export function readPaneState(params: URLSearchParams, tabs: readonly PaneTabSpec[], defaultTab: string, opts: PaneUrlOptions = {}): PaneState {
  const urlKey = opts.urlKey ?? 'pane', recordKey = opts.recordKey ?? 'paneRecord';
  const record = parsePaneRecord(params.get(recordKey));
  const spec = tabs.find((t) => t.id === params.get(urlKey));
  if (!spec) return { tab: defaultTab, record: record && tabs.some((t) => t.recordKinds?.includes(record.kind)) ? record : null };
  if (spec.recordKinds) {
    // A record tab with no (or a foreign) record is not a place.
    return record && spec.recordKinds.includes(record.kind) ? { tab: spec.id, record } : { tab: defaultTab, record: null };
  }
  return { tab: spec.id, record: record && tabs.some((t) => t.recordKinds?.includes(record.kind)) ? record : null };
}

/** The params for a pane state: the default tab with no record drops both. */
export function writePaneState(params: URLSearchParams, state: PaneState, defaultTab: string, opts: PaneUrlOptions = {}): URLSearchParams {
  const urlKey = opts.urlKey ?? 'pane', recordKey = opts.recordKey ?? 'paneRecord';
  const next = new URLSearchParams(params);
  if (state.tab === defaultTab && !state.record) { next.delete(urlKey); next.delete(recordKey); return next; }
  next.set(urlKey, state.tab);
  if (state.record) next.set(recordKey, paneRecordKey(state.record)); else next.delete(recordKey);
  return next;
}

/** The tabs to list: every plain tab, and a record tab while its record is named. */
export function visiblePaneTabs(tabs: readonly PaneTabSpec[], state: PaneState): TabItem[] {
  return tabs
    .filter((t) => !t.recordKinds || (state.record && t.recordKinds.includes(state.record.kind)))
    .map((t) => ({ id: t.id, label: t.label, ...(t.badge != null ? { badge: t.badge } : {}) }));
}

export interface UsePaneStateOptions extends PaneUrlOptions {
  tabs: readonly PaneTabSpec[];
  /** The resting tab — no params. */
  defaultTab: string;
  params: URLSearchParams;
  setParams: (next: URLSearchParams, options?: { replace?: boolean }) => void;
  /** Per-device memory of the last `remember` tab. */
  rememberKey?: string;
  /**
   * When to restore the remembered tab (the pane is on screen), and for
   * what (the page's subject): restored once per subject, in place.
   */
  restore?: { when: boolean; subject: string | null };
  /** Called whenever a tab is opened (bring the pane on screen). */
  onOpen?: () => void;
  /**
   * A named record stays while the reader moves to a plain tab (Search: the
   * person rides along as a tab beside the conversation). Default false: a
   * plain tab drops the record (an initiative's Log closes when the reader
   * goes back to Details).
   */
  keepRecord?: boolean;
}

export interface PaneStateControl extends PaneState {
  /** The tabs to list (`Tabs items`). */
  tabs: TabItem[];
  /** The URL names a tab or record (anything but the resting tab). */
  away: boolean;
  /**
   * Open a tab. A record tab shows `record`; a plain tab drops the record
   * unless `keepRecord` (then `record` replaces it when given, `null` drops it).
   */
  open(tab: string, record?: PaneRecord | null): void;
  /** The tab row's handler: a record tab keeps its record. */
  select(tab: string): void;
  /** Back to the resting tab. */
  clear(): void;
}

function readStored(key: string): string | null {
  if (typeof window === 'undefined') return null;
  try { return window.localStorage.getItem(key); } catch { return null; }
}
function writeStored(key: string, value: string): void {
  try { window.localStorage.setItem(key, value); } catch { /* not remembered */ }
}

export function usePaneState({ tabs, defaultTab, params, setParams, rememberKey, restore, onOpen, keepRecord = false, ...url }: UsePaneStateOptions): PaneStateControl {
  const state = readPaneState(params, tabs, defaultTab, url);
  const paramsRef = useRef(params);
  paramsRef.current = params;
  const write = useCallback((next: PaneState, replace = false) => {
    setParams(writePaneState(paramsRef.current, next, defaultTab, url), replace ? { replace: true } : undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setParams, defaultTab, url.urlKey, url.recordKey]);
  const remember = useCallback((tab: string) => {
    if (!rememberKey) return;
    const spec = tabs.find((t) => t.id === tab);
    if (tab === defaultTab || spec?.remember) writeStored(rememberKey, tab);
  }, [rememberKey, tabs, defaultTab]);
  const current = state.record;
  const open = useCallback((tab: string, record?: PaneRecord | null) => {
    remember(tab);
    const spec = tabs.find((t) => t.id === tab);
    const kept = record === undefined ? current : record;
    write({ tab, record: spec?.recordKinds || keepRecord ? kept ?? null : null });
    onOpen?.();
  }, [remember, tabs, write, onOpen, keepRecord, current]);
  // The tab row: a record tab keeps the record it shows.
  const select = useCallback((tab: string) => open(tab), [open]);
  const clear = useCallback(() => {
    remember(defaultTab);
    write({ tab: defaultTab, record: null });
  }, [remember, write, defaultTab]);
  // Arriving with no pane params: the remembered resting tab, in place (Back does not bounce).
  const restored = useRef<string | null>(null);
  const away = state.tab !== defaultTab || !!state.record;
  const subject = restore?.subject ?? null;
  const when = !!restore?.when;
  useEffect(() => {
    if (!rememberKey || !restore || !subject || !when || restored.current === subject) return;
    restored.current = subject;
    const stored = readStored(rememberKey);
    const spec = tabs.find((t) => t.id === stored && t.remember && !t.recordKinds);
    if (!away && spec) write({ tab: spec.id, record: null }, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rememberKey, subject, when, away]);
  const visible = useMemo(() => visiblePaneTabs(tabs, state), [tabs, state.tab, state.record?.kind, state.record?.id]); // eslint-disable-line react-hooks/exhaustive-deps
  return { ...state, tabs: visible, away, open, select, clear };
}
