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

export interface CommandPaletteProps {
  placeholder?: string;
  emptyState?: ReactNode;
  className?: string;
}

export interface CommandPaletteHintProps {
  className?: string;
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

export function CommandPalette({
  placeholder = 'Type a command or search…',
  emptyState,
  className,
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
      maxWidth={640}
      rawChildren
      backdropTestId="command-palette-backdrop"
    >
      <Cmdk
        label="Command palette"
        value={undefined}
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
        <Cmdk.List className="max-h-[360px] overflow-y-auto py-2">
          <Cmdk.Empty className="px-3 py-6 text-center text-sm text-text-tertiary">
            {emptyState ?? 'No results.'}
          </Cmdk.Empty>
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
                            'text-[10px] font-mono font-medium',
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
        </Cmdk.List>
      </Cmdk>
    </Modal>
  );
}

// ── <CommandPaletteHint /> — affordance button ──────────────────────────

export function CommandPaletteHint({ className }: CommandPaletteHintProps = {}) {
  const { toggle } = useInternal();
  return (
    <button
      type="button"
      onClick={toggle}
      data-testid="command-palette-hint"
      className={cn(
        'inline-flex items-center gap-1.5 px-2 py-1 rounded-md',
        'text-xs text-text-secondary bg-surface-hover',
        'border border-border hover:bg-surface-panel',
        'cursor-pointer transition-colors',
        className,
      )}
      aria-label="Open command palette"
    >
      <kbd className="font-mono text-[11px]">⌘K</kbd>
      <span>Search</span>
    </button>
  );
}

export default CommandPalette;
