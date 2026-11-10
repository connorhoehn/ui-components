// frontend/src/components/shared/CommandPalette.tsx
//
// Shared Cmd+K command palette. Provider owns open/query state and the global
// keydown listener; <CommandPalette /> renders the dialog when open; the
// useCommandPalette() hook gives consumers programmatic control. Wraps the
// `cmdk` library — we do NOT roll our own filter or list. See README and
// CLAUDE.md for the design rationale.

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { Command as Cmdk } from 'cmdk';
import { cn } from '../../lib/cn';
import Modal from './Modal';
import { safeHref } from '../../lib/safeHref';

export interface Command {
  id: string;
  label: string;
  group?: string;
  hint?: string;
  keywords?: string[];
  icon?: ReactNode;
  /** Display-only shortcut glyphs rendered right-aligned in the item. */
  shortcut?: string[];
  /**
   * Active global hotkey that invokes `run()` without opening the palette.
   * Format: `[mod+|cmd+|meta+|ctrl+|shift+|alt+]<key>`. `mod` resolves to
   * cmd on macOS and ctrl elsewhere. The key portion is matched against
   * `KeyboardEvent.key` lowercased — so `?`, `/`, `k`, `arrowdown` all
   * work; multi-key chords are not supported in v1.
   */
  hotkey?: string;
  /** Visibility predicate — when returns false, the command is filtered out. */
  when?: () => boolean;
  /** Action invoked when the item is selected. */
  run: () => void | Promise<void>;
}

export interface CommandPaletteProviderProps {
  /**
   * Static command list. Optional: pure-registry consumers can pass
   * nothing and have pages contribute commands via `useRegisterCommand`.
   */
  commands?: Command[];
  /**
   * Synchronous derivation hook for query-dependent commands (URL paste,
   * UUID detection, etc.). Results are merged with the static `commands`
   * list before cmdk runs its own filter.
   */
  getDynamicCommands?: (query: string) => Command[];
  /**
   * Future hook — currently the keybinding is always cmd/ctrl + K. Accepted
   * for API forward-compat; ignored in v1.
   */
  toggleShortcut?: string[];
  /**
   * localStorage key for the most-recently-used command id list. Pass
   * `null` to disable persistence (useful for tests and SSR). Defaults
   * to `'cui:command-palette:recents'`.
   */
  recentsKey?: string | null;
  /** Maximum number of recent command ids to remember. Default: 5. */
  recentsLimit?: number;
  children: ReactNode;
}

/** One record a host's search returned (a person, an initiative, a request…). */
export interface PaletteRecord {
  id: string;
  title: string;
  subtitle?: string;
  /** Short type label shown as a chip, e.g. "Person", "Request". */
  kind: string;
  /** Where the record lives; handed to `onOpenRecord` on Enter/click. */
  href: string;
  icon?: ReactNode;
}

/** Records of one type, in the order the host wants them shown. */
export interface PaletteRecordGroup {
  group: string;
  items: PaletteRecord[];
}

/**
 * Host search. Must honour `signal` (the palette aborts it when the query
 * changes or the palette closes). Reject to show the palette's error row.
 */
export type SearchPaletteRecords = (
  query: string,
  options: { signal: AbortSignal },
) => Promise<PaletteRecordGroup[]>;

export interface CommandPaletteProps {
  /**
   * Input placeholder. Hosts must only promise what `searchRecords` can find
   * (not "a person" unless people are indexed).
   */
  placeholder?: string;
  /** Replaces the default "No matches for “query”" empty row. */
  emptyState?: ReactNode;
  className?: string;
  /**
   * Async record search. When set, a record section follows the commands
   * once the query reaches `minRecordQueryLength`; commands never wait on it.
   * Since 2.457.0.
   */
  searchRecords?: SearchPaletteRecords;
  /** Called with the record on Enter/click. Defaults to `location.assign(href)`. */
  onOpenRecord?: (record: PaletteRecord) => void;
  /** Quiet period before `searchRecords` fires. Default 200ms. */
  recordDebounceMs?: number;
  /** Shortest trimmed query sent to `searchRecords`. Default 2. */
  minRecordQueryLength?: number;
}

export interface CommandPaletteHintProps {
  className?: string;
  /** The word after the shortcut. Default "Search". Since 2.385.0. */
  label?: string;
  /**
   * `sm` (default) is the quiet 24px chip; `md` is a 36px top-bar button that
   * sits level with the bar's other controls (the Documents redesign's
   * "⌘K Search"). Since 2.385.0.
   */
  size?: 'sm' | 'md';
}

export interface CommandPaletteController {
  open: () => void;
  close: () => void;
  toggle: () => void;
  isOpen: boolean;
  query: string;
}

// Internal context: the controller plus the merged command list. We split the
// public controller surface from the internal "render state" so consumers
// can't mutate `commands` via the hook.
interface InternalContext extends CommandPaletteController {
  setQuery: (q: string) => void;
  mergedCommands: Command[];
  registerCommand: (cmd: Command) => void;
  unregisterCommand: (id: string) => void;
  recents: string[];
  noteSelection: (id: string) => void;
}

const DEFAULT_RECENTS_KEY = 'cui:command-palette:recents';
const DEFAULT_RECENTS_LIMIT = 5;

function readRecents(key: string | null, limit: number): string[] {
  if (!key || typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((v): v is string => typeof v === 'string').slice(0, limit);
  } catch {
    return [];
  }
}

function writeRecents(key: string | null, ids: string[]): void {
  if (!key || typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(ids));
  } catch {
    // Privacy mode / quota / disabled storage — silently drop persistence.
  }
}

const Ctx = createContext<InternalContext | null>(null);

function useInternal(): InternalContext {
  const ctx = useContext(Ctx);
  if (!ctx) {
    throw new Error(
      'useCommandPalette must be used inside a <CommandPaletteProvider>.',
    );
  }
  return ctx;
}

export function useCommandPalette(): CommandPaletteController {
  // Expose only the public surface; consumers should not see the internal
  // `setQuery`/`mergedCommands` fields.
  const { open, close, toggle, isOpen, query } = useInternal();
  return { open, close, toggle, isOpen, query };
}

// ── Hotkey matching ──────────────────────────────────────────────────────
// Exported as a side-door for tests; not part of the public surface.
//
// Matching is strict: an extra unlisted modifier disqualifies the match.
// Otherwise `ctrl+p` would fire on `ctrl+shift+p`, which is the typical
// browser DevTools shortcut — a recipe for accidental triggers. The one
// exception is `mod`, which is intentionally loose (matches either cmd
// OR ctrl) so the same hotkey works for both Mac and Windows/Linux
// consumers without platform-specific spec strings.

export function matchHotkey(e: KeyboardEvent, spec: string): boolean {
  const parts = spec.toLowerCase().split('+').map((p) => p.trim()).filter(Boolean);
  if (parts.length === 0) return false;
  const key = parts[parts.length - 1];
  const modifiers = new Set(parts.slice(0, -1));

  const wantsMeta = modifiers.has('cmd') || modifiers.has('meta');
  const wantsCtrl = modifiers.has('ctrl');
  const wantsMod = modifiers.has('mod');
  const wantsShift = modifiers.has('shift');
  const wantsAlt = modifiers.has('alt');

  if (wantsMod) {
    // Either cmd or ctrl satisfies `mod`; we don't care which one.
    if (!e.metaKey && !e.ctrlKey) return false;
  } else {
    if (wantsMeta !== e.metaKey) return false;
    if (wantsCtrl !== e.ctrlKey) return false;
  }
  if (wantsShift !== e.shiftKey) return false;
  if (wantsAlt !== e.altKey) return false;

  return e.key.toLowerCase() === key;
}

export function CommandPaletteProvider({
  commands,
  getDynamicCommands,
  recentsKey = DEFAULT_RECENTS_KEY,
  recentsLimit = DEFAULT_RECENTS_LIMIT,
  children,
}: CommandPaletteProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  // Registry of commands contributed via useRegisterCommand. Kept in a Map
  // keyed by id so re-registration of the same id (e.g. when a caller's
  // command object identity changes between renders) overwrites cleanly
  // instead of duplicating list entries.
  const [registered, setRegistered] = useState<ReadonlyMap<string, Command>>(
    () => new Map(),
  );
  const [recents, setRecents] = useState<string[]>(
    () => readRecents(recentsKey, recentsLimit),
  );

  const noteSelection = useCallback(
    (id: string) => {
      // Null key disables the feature entirely — no in-memory list, no
      // persistence, no Recent group.
      if (recentsKey === null) return;
      setRecents((prev) => {
        const next = [id, ...prev.filter((existing) => existing !== id)].slice(
          0,
          recentsLimit,
        );
        writeRecents(recentsKey, next);
        return next;
      });
    },
    [recentsKey, recentsLimit],
  );

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => {
    setIsOpen(false);
    // Reset query when closing — otherwise the next open re-shows the stale
    // filter. cmdk's selectedItem also benefits from the reset.
    setQuery('');
  }, []);
  const toggle = useCallback(() => setIsOpen((v) => !v), []);

  const registerCommand = useCallback((cmd: Command) => {
    setRegistered((prev) => {
      const next = new Map(prev);
      next.set(cmd.id, cmd);
      return next;
    });
  }, []);

  const unregisterCommand = useCallback((id: string) => {
    setRegistered((prev) => {
      if (!prev.has(id)) return prev;
      const next = new Map(prev);
      next.delete(id);
      return next;
    });
  }, []);

  // ── Global keybinding: cmd/ctrl + K, capture phase ─────────────────────
  // Capture-phase so we beat input-level handlers in consumer apps that might
  // otherwise swallow the keystroke (e.g. CodeMirror, ProseMirror).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((v) => !v);
      }
    };
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  }, []);

  // Merge static + dynamic commands and apply the `when()` visibility filter.
  // Memoized on the inputs that actually drive the list so consumers passing a
  // stable `commands` array don't re-render every keystroke unnecessarily.
  const mergedCommands = useMemo(() => {
    const dynamic = getDynamicCommands ? getDynamicCommands(query) : [];
    const all = [...(commands ?? []), ...dynamic, ...registered.values()];
    return all.filter((c) => (c.when ? c.when() : true));
  }, [commands, getDynamicCommands, query, registered]);

  // ── Per-command hotkeys ───────────────────────────────────────────────
  // Bound via a ref so we can rebind whenever the merged list changes
  // without re-attaching the global listener (the listener stays stable;
  // it reads the latest snapshot via the ref).
  const cmdsRef = useRef(mergedCommands);
  cmdsRef.current = mergedCommands;
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Skip if the cmd-K toggle already fired this event.
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') return;
      for (const cmd of cmdsRef.current) {
        if (!cmd.hotkey) continue;
        if (matchHotkey(e, cmd.hotkey)) {
          e.preventDefault();
          // Defer to a microtask so any setState in run() lands after the
          // synchronous keydown handler returns.
          void Promise.resolve().then(() => cmd.run());
          return;
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const value: InternalContext = {
    open,
    close,
    toggle,
    isOpen,
    query,
    setQuery,
    mergedCommands,
    registerCommand,
    unregisterCommand,
    recents,
    noteSelection,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

/**
 * Register a command into the active CommandPaletteProvider for the lifetime
 * of the calling component. Registers on mount, unregisters on unmount.
 *
 * Re-registers whenever the `command` reference changes — wrap in `useMemo`
 * (or define the command outside the component) to avoid churn.
 */
export function useRegisterCommand(command: Command): void {
  const { registerCommand, unregisterCommand } = useInternal();
  useEffect(() => {
    registerCommand(command);
    return () => unregisterCommand(command.id);
  }, [command, registerCommand, unregisterCommand]);
}

// ── <CommandPalette /> — the dialog itself ───────────────────────────────

interface GroupedCommands {
  // null key = no group (rendered ungrouped at the top of the list)
  groupName: string | null;
  items: Command[];
}

function groupCommands(commands: Command[]): GroupedCommands[] {
  const groups = new Map<string | null, Command[]>();
  for (const cmd of commands) {
    const key = cmd.group ?? null;
    const existing = groups.get(key);
    if (existing) {
      existing.push(cmd);
    } else {
      groups.set(key, [cmd]);
    }
  }
  return Array.from(groups.entries()).map(([groupName, items]) => ({
    groupName,
    items,
  }));
}

/**
 * Token match: every whitespace-separated token of the query must appear
 * somewhere in the haystack, in any order ("requests my open" finds "My open
 * requests"). Falls back to an in-order character match of the whole query so
 * short fuzzy habits ("cp" for "command palette") keep working.
 */
export function matchTokens(haystack: string, query: string): number {
  const q = query.trim().toLowerCase();
  if (!q) return 1;
  const h = haystack.toLowerCase();
  const tokens = q.split(/\s+/).filter(Boolean);
  if (tokens.every((t) => h.includes(t))) {
    return h.startsWith(tokens[0]) ? 1 : 0.8;
  }
  let at = 0;
  for (const ch of q.replace(/\s+/g, '')) {
    at = h.indexOf(ch, at);
    if (at < 0) return 0;
    at += 1;
  }
  return 0.1;
}

type RecordState =
  | { status: 'idle'; groups: PaletteRecordGroup[] }
  | { status: 'loading'; groups: PaletteRecordGroup[] }
  | { status: 'done'; groups: PaletteRecordGroup[] }
  | { status: 'error'; groups: PaletteRecordGroup[] };

const IDLE: RecordState = { status: 'idle', groups: [] };

function useRecordSearch(
  active: boolean,
  query: string,
  search: SearchPaletteRecords | undefined,
  debounceMs: number,
  minLength: number,
): { state: RecordState; retry: () => void } {
  const [state, setState] = useState<RecordState>(IDLE);
  const [attempt, setAttempt] = useState(0);
  const searchRef = useRef(search);
  searchRef.current = search;
  const q = query.trim();
  const enabled = active && !!search && q.length >= minLength;

  useEffect(() => {
    if (!enabled) {
      setState(IDLE);
      return;
    }
    const controller = new AbortController();
    // Loading shows at once; the request itself waits out the debounce.
    setState({ status: 'loading', groups: [] });
    const timer = setTimeout(() => {
      const run = searchRef.current;
      if (!run) return;
      run(q, { signal: controller.signal }).then(
        (groups) => {
          if (controller.signal.aborted) return;
          setState({
            status: 'done',
            groups: (groups ?? []).filter((g) => g.items.length > 0),
          });
        },
        () => {
          if (controller.signal.aborted) return;
          setState({ status: 'error', groups: [] });
        },
      );
    }, debounceMs);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [enabled, q, debounceMs, attempt]);

  const retry = useCallback(() => setAttempt((n) => n + 1), []);
  return { state: enabled ? state : IDLE, retry };
}

const ITEM_CLASS = cn(
  'flex items-center gap-2 px-3 py-2 mx-1 rounded-md cursor-pointer text-sm',
  'text-text-primary aria-selected:bg-surface-hover',
);

export function CommandPalette({
  placeholder = 'Type a command or search…',
  emptyState,
  className,
  searchRecords,
  onOpenRecord,
  recordDebounceMs = 200,
  minRecordQueryLength = 2,
}: CommandPaletteProps = {}) {
  const {
    isOpen,
    close,
    query,
    setQuery,
    mergedCommands,
    recents,
    noteSelection,
  } = useInternal();

  // When the query is empty, surface the user's most-recently-selected
  // commands in a "Recent" group at the top — but only those still present
  // in the merged list (a registered command's page may have unmounted).
  const recentGroup = useMemo<Command[]>(() => {
    if (query.trim() !== '' || recents.length === 0) return [];
    const byId = new Map(mergedCommands.map((c) => [c.id, c]));
    return recents
      .map((id) => byId.get(id))
      .filter((c): c is Command => Boolean(c));
  }, [mergedCommands, query, recents]);

  const grouped = useMemo(() => groupCommands(mergedCommands), [mergedCommands]);

  const { state: records, retry } = useRecordSearch(
    isOpen,
    query,
    searchRecords,
    recordDebounceMs,
    minRecordQueryLength,
  );
  const trimmed = query.trim();
  const commandMatchCount = useMemo(
    () =>
      trimmed === ''
        ? mergedCommands.length
        : mergedCommands.filter(
            (c) =>
              matchTokens(
                `${c.id} ${c.label} ${(c.keywords ?? []).join(' ')}`,
                trimmed,
              ) > 0,
          ).length,
    [mergedCommands, trimmed],
  );
  const recordCount = records.groups.reduce((n, g) => n + g.items.length, 0);
  const totalMatches = commandMatchCount + recordCount;
  const showEmpty =
    trimmed !== '' && totalMatches === 0 && records.status !== 'loading' && records.status !== 'error';
  const announcement =
    trimmed === ''
      ? ''
      : records.status === 'loading'
        ? `${commandMatchCount} commands. Searching records.`
        : records.status === 'error'
          ? `${commandMatchCount} commands. Record search failed.`
          : totalMatches === 0
            ? `No matches for ${trimmed}`
            : `${totalMatches} ${totalMatches === 1 ? 'result' : 'results'}`;

  const handleOpenRecord = useCallback(
    (rec: PaletteRecord) => {
      close();
      void Promise.resolve().then(() => {
        if (onOpenRecord) onOpenRecord(rec);
        else if (typeof window !== 'undefined') {
          // rec.href comes from a search backend; never navigate to a scripting scheme.
          const href = safeHref(rec.href);
          if (href) window.location.assign(href);
        }
      });
    },
    [close, onOpenRecord],
  );

  // We close BEFORE invoking run() so navigation/route changes happen with a
  // clean modal state. Any async work in run() resolves after the close has
  // committed.
  const handleSelect = useCallback(
    (cmd: Command) => {
      noteSelection(cmd.id);
      close();
      // Defer to the next microtask so the close() state flush lands first.
      void Promise.resolve().then(() => cmd.run());
    },
    [close, noteSelection],
  );

  return (
    <Modal
      open={isOpen}
      onClose={close}
      ariaLabel="Command palette"
      maxWidth={640}
      rawChildren
      backdropTestId="command-palette-backdrop"
    >
      <Cmdk
        label="Command palette"
        value={undefined}
        filter={(value, search, keywords) =>
          matchTokens(`${value} ${(keywords ?? []).join(' ')}`, search)
        }
        // cmdk uses its own internal input value; we mirror it via the
        // Input's onValueChange so the provider owns query state.
        className={cn('flex flex-col gap-0 w-full', className)}
        data-testid="command-palette"
      >
        <Cmdk.Input
          value={query}
          onValueChange={setQuery}
          placeholder={placeholder}
          data-autofocus
          className={cn(
            'w-full px-3 py-2.5 text-sm border-0 border-b border-border',
            'outline-none bg-transparent text-text-primary placeholder:text-text-tertiary',
          )}
          data-testid="command-palette-input"
        />
        <Cmdk.List data-ui-listbox="command-palette" className="max-h-[360px] overflow-y-auto py-2">
          {showEmpty ? (
            <div
              className="px-3 py-6 text-center text-sm text-text-tertiary"
              data-testid="command-palette-empty"
            >
              {emptyState ?? `No matches for \u201c${trimmed}\u201d`}
            </div>
          ) : null}
          {recentGroup.length > 0 && (
            <Cmdk.Group heading="Recent" data-testid="command-palette-group-recent">
              {recentGroup.map((cmd) => (
                <Cmdk.Item
                  key={`recent-${cmd.id}`}
                  value={`recent-${cmd.id} ${cmd.label}`}
                  keywords={cmd.keywords}
                  onSelect={() => handleSelect(cmd)}
                  data-testid={`command-palette-recent-${cmd.id}`}
                  className={cn(
                    'flex items-center gap-2 px-3 py-2 mx-1 rounded-md cursor-pointer text-sm',
                    'text-text-primary aria-selected:bg-surface-hover',
                  )}
                >
                  {cmd.icon && (
                    <span className="shrink-0 text-text-secondary">
                      {cmd.icon}
                    </span>
                  )}
                  <span className="flex-1 truncate">{cmd.label}</span>
                </Cmdk.Item>
              ))}
            </Cmdk.Group>
          )}
          {grouped.map(({ groupName, items }) => (
            <Cmdk.Group
              key={groupName ?? '__ungrouped__'}
              heading={groupName ?? undefined}
            >
              {items.map((cmd) => (
                <Cmdk.Item
                  key={cmd.id}
                  value={`${cmd.id} ${cmd.label} ${(cmd.keywords ?? []).join(' ')}`}
                  keywords={cmd.keywords}
                  onSelect={() => handleSelect(cmd)}
                  data-testid={`command-palette-item-${cmd.id}`}
                  className={cn(
                    'flex items-center gap-2 px-3 py-2 mx-1 rounded-md cursor-pointer text-sm',
                    'text-text-primary aria-selected:bg-surface-hover',
                  )}
                >
                  {cmd.icon && (
                    <span className="shrink-0 text-text-secondary">
                      {cmd.icon}
                    </span>
                  )}
                  <span className="flex-1 truncate">{cmd.label}</span>
                  {cmd.hint && (
                    <span className="text-xs text-text-tertiary truncate">
                      {cmd.hint}
                    </span>
                  )}
                  {cmd.shortcut && cmd.shortcut.length > 0 && (
                    <span className="flex items-center gap-1 shrink-0">
                      {cmd.shortcut.map((k, i) => (
                        <kbd
                          key={`${cmd.id}-kbd-${i}`}
                          className={cn(
                            'inline-flex items-center justify-center min-w-[18px] h-[18px] px-1',
                            'text-[11px] font-mono font-medium',
                            'bg-surface-hover text-text-secondary',
                            'border border-border rounded',
                          )}
                        >
                          {k}
                        </kbd>
                      ))}
                    </span>
                  )}
                </Cmdk.Item>
              ))}
            </Cmdk.Group>
          ))}
          {records.groups.map((g) => (
            <Cmdk.Group
              key={`records-${g.group}`}
              heading={g.group}
              forceMount
              data-testid={`command-palette-records-${g.group}`}
            >
              {g.items.map((rec) => (
                <Cmdk.Item
                  key={`${g.group}-${rec.id}`}
                  value={`record ${g.group} ${rec.id} ${rec.title}`}
                  forceMount
                  onSelect={() => handleOpenRecord(rec)}
                  data-testid={`command-palette-record-${rec.id}`}
                  className={ITEM_CLASS}
                >
                  {rec.icon && (
                    <span className="shrink-0 text-text-secondary">{rec.icon}</span>
                  )}
                  <span className="min-w-0 flex-1">
                    <span className="block truncate">{rec.title}</span>
                    {rec.subtitle && (
                      <span className="block truncate text-xs text-text-tertiary">
                        {rec.subtitle}
                      </span>
                    )}
                  </span>
                  <span className="shrink-0 rounded border border-border px-1.5 text-xs text-text-secondary">
                    {rec.kind}
                  </span>
                </Cmdk.Item>
              ))}
            </Cmdk.Group>
          ))}
          {records.status === 'loading' && (
            <div
              className="px-3 py-2 text-sm text-text-tertiary"
              data-testid="command-palette-records-loading"
            >
              Searching records…
            </div>
          )}
          {records.status === 'error' && (
            <div
              className="flex items-center gap-2 px-3 py-2 text-sm text-text-secondary"
              data-testid="command-palette-records-error"
            >
              <span className="flex-1">Couldn&rsquo;t search records.</span>
              <button
                data-ui-part=""
                type="button"
                onClick={retry}
                className="rounded border border-border px-2 py-0.5 text-xs hover:bg-surface-hover"
              >
                Retry
              </button>
            </div>
          )}
        </Cmdk.List>
        <div
          role="status"
          aria-live="polite"
          className="sr-only"
          data-testid="command-palette-status"
        >
          {announcement}
        </div>
      </Cmdk>
    </Modal>
  );
}

// ── <CommandPaletteHint /> — affordance button ──────────────────────────

export function CommandPaletteHint({ className, label = 'Search', size = 'sm' }: CommandPaletteHintProps = {}) {
  const { toggle } = useInternal();
  return (
    <button
      data-ui-part=""
      type="button"
      onClick={toggle}
      data-testid="command-palette-hint"
      className={cn(
        'inline-flex items-center rounded-md border border-border',
        size === 'md'
          ? 'h-9 gap-2 bg-surface px-3 text-[13px] font-medium text-text-primary shadow-sm hover:bg-surface-hover'
          : 'gap-1.5 px-2 py-1 text-xs text-text-secondary bg-surface-hover hover:bg-surface-panel',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        'cursor-pointer transition-colors',
        className,
      )}
      aria-label="Open command palette"
      aria-keyshortcuts="Meta+K Control+K"
    >
      <kbd className={cn('font-mono', size === 'md' ? 'text-[12px] text-text-secondary' : 'text-[11px]')}>⌘K</kbd>
      <span>{label}</span>
    </button>
  );
}

export default CommandPalette;
