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
  /** Visibility predicate — when returns false, the command is filtered out. */
  when?: () => boolean;
  /** Action invoked when the item is selected. */
  run: () => void | Promise<void>;
}

export interface CommandPaletteProviderProps {
  commands: Command[];
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

export function CommandPaletteProvider({
  commands,
  getDynamicCommands,
  children,
}: CommandPaletteProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => {
    setIsOpen(false);
    // Reset query when closing — otherwise the next open re-shows the stale
    // filter. cmdk's selectedItem also benefits from the reset.
    setQuery('');
  }, []);
  const toggle = useCallback(() => setIsOpen((v) => !v), []);

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
    const all = [...commands, ...dynamic];
    return all.filter((c) => (c.when ? c.when() : true));
  }, [commands, getDynamicCommands, query]);

  const value: InternalContext = {
    open,
    close,
    toggle,
    isOpen,
    query,
    setQuery,
    mergedCommands,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
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
  const { isOpen, close, query, setQuery, mergedCommands } = useInternal();

  const grouped = useMemo(() => groupCommands(mergedCommands), [mergedCommands]);

  // We close BEFORE invoking run() so navigation/route changes happen with a
  // clean modal state. Any async work in run() resolves after the close has
  // committed.
  const handleSelect = useCallback(
    (cmd: Command) => {
      close();
      // Defer to the next microtask so the close() state flush lands first.
      void Promise.resolve().then(() => cmd.run());
    },
    [close],
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
