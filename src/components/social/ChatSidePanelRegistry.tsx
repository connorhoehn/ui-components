// ChatSidePanelRegistry — what a ChatSidePanelRef renders as, by kind.
//
// A conversation can open one thing beside itself: a document, a search
// result, a run. The library owns the FRAME — the same header every panel
// kind gets (title, "Open full page", close), so a graph from a plugin sits in
// the split exactly the way the app's document does — and a host owns the
// BODY, registered per kind. Renderers layer the way commands do: nested
// providers merge, later ones override by kind.

import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { PuzzleIcon, CloseIcon } from '../ui/Icons';
import { Tooltip } from '../shared/Tooltip';
import { IconButton } from '../ui/IconButton';
import { Inline } from '../ui/Stack';
import EmptyState from '../shared/EmptyState';
import type { ChatSidePanelRef } from './chatCommands';

export interface ChatSidePanelApi {
  close: () => void;
  /** Present when the host gave the panel a full-page destination. */
  openFullPage?: () => void;
  /** Replaces the frame's title once the body knows the real one (the live document title). */
  setTitle: (title: string | null) => void;
}

export type ChatSidePanelRenderer = (panel: ChatSidePanelRef, api: ChatSidePanelApi) => ReactNode;

export type ChatSidePanelRenderers = Record<string, ChatSidePanelRenderer>;

const RenderersContext = createContext<ChatSidePanelRenderers | null>(null);

export interface ChatSidePanelProviderProps {
  /** This layer's renderers by kind. Merged over any provider above; overrides by kind. */
  renderers?: ChatSidePanelRenderers;
  children: ReactNode;
}

export function ChatSidePanelProvider({ renderers, children }: ChatSidePanelProviderProps) {
  const parent = useContext(RenderersContext);
  const value = useMemo(() => ({ ...(parent ?? {}), ...(renderers ?? {}) }), [parent, renderers]);
  return <RenderersContext.Provider value={value}>{children}</RenderersContext.Provider>;
}

/** Every renderer visible here, by kind; `{}` outside a provider. */
export function useChatSidePanelRenderers(): ChatSidePanelRenderers {
  return useContext(RenderersContext) ?? NONE;
}
const NONE: ChatSidePanelRenderers = {};

/** The renderer for `kind`, or null when nothing above registered one. */
export function useChatSidePanelRenderer(kind: string): ChatSidePanelRenderer | null {
  return useChatSidePanelRenderers()[kind] ?? null;
}

// ---------------------------------------------------------------------------

export interface ChatSidePanelFrameProps {
  title: string;
  /** A second clause under the title — "12 results", "Edited by Grace". */
  subtitle?: string;
  onClose: () => void;
  /** Offers navigation to the full-page destination. */
  onOpenFullPage?: () => void;
  /** Additional controls beside the panel title. */
  actions?: ReactNode;
  /** Whether this panel currently occupies the conversation area. */
  expanded?: boolean;
  /** When supplied, offers an expand/restore control beside the title. */
  onToggleExpanded?: () => void;
  children: ReactNode;
  className?: string;
  'data-testid'?: string;
}

/**
 * The chrome around anything open beside a conversation: one header row with
 * the title on the left and the way out on the right, and a body that fills
 * the rest and scrolls on its own.
 */
export function ChatSidePanelFrame({
  title, subtitle, onClose, onOpenFullPage, actions, expanded = false, onToggleExpanded, children, className, 'data-testid': testId = 'chat-side-panel',
}: ChatSidePanelFrameProps) {
  return (
    <section
      aria-label={title}
      data-testid={testId}
      className={cn('flex h-full min-h-0 flex-col border-l border-border bg-surface', className)}
    >
      <header className="flex shrink-0 items-center justify-between gap-2 border-b border-border px-3 py-1.5">
        <Inline gap="sm" align="center" wrap={false} className="min-w-0">
          <span className="flex min-w-0 flex-col">
            <span className="truncate text-[12px] font-semibold text-text-secondary" data-testid={`${testId}-title`}>{title}</span>
            {subtitle && <span className="truncate text-[11px] text-text-tertiary" data-testid={`${testId}-subtitle`}>{subtitle}</span>}
          </span>
          <Inline gap="xs" align="center" wrap={false} className="shrink-0">
            {onToggleExpanded && (
              <Tooltip content={expanded ? 'Show chat' : 'Expand board'} placement="bottom">
                <IconButton size="md" aria-label={expanded ? 'Show chat' : 'Expand board'} aria-pressed={expanded} onClick={onToggleExpanded} data-testid={`${testId}-expand`}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    {expanded ? <><rect x="2" y="2.5" width="12" height="11" rx="1.5" /><path d="M6 2.5v11" /></> : <path d="M6 2H2v4M10 2h4v4M14 10v4h-4M6 14H2v-4" />}
                  </svg>
                </IconButton>
              </Tooltip>
            )}
            {onOpenFullPage && (
              <Tooltip content="Open full page" placement="bottom">
                <IconButton size="md" aria-label="Open full page" onClick={onOpenFullPage} data-testid={`${testId}-open-full`}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M9 2h5v5M14 2 7 9M6 3H3a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-3" />
                  </svg>
                </IconButton>
              </Tooltip>
            )}
            {actions}
          </Inline>
        </Inline>
        <Tooltip content="Close panel" placement="bottom">
          <IconButton size="md" aria-label="Close panel" onClick={onClose} data-testid={`${testId}-close`} className="shrink-0"><CloseIcon /></IconButton>
        </Tooltip>
      </header>
      <div className="min-h-0 flex-1 overflow-auto">{children}</div>
    </section>
  );
}

// ---------------------------------------------------------------------------

export interface ChatSidePanelProps {
  panel: ChatSidePanelRef;
  onClose: () => void;
  /** Where the panel goes full-page, when it can. Receives the ref so one handler serves every kind. */
  onOpenFullPage?: (panel: ChatSidePanelRef) => void;
  /**
   * A second clause under the title — WHERE this panel came from.
   *
   * A panel beside a conversation gets its context free: the thread is right
   * there. One that takes the whole pane does not, and a bare document title
   * over a full-width canvas reads as a separate place the app navigated to
   * rather than something open inside a channel. This is where the host says
   * which conversation it belongs to.
   */
  subtitle?: string;
  /** Additional controls beside the panel title. */
  actions?: ReactNode;
  /** Whether this panel currently occupies the conversation area. */
  expanded?: boolean;
  /** When supplied, offers an expand/restore control beside the title. */
  onToggleExpanded?: () => void;
  className?: string;
  'data-testid'?: string;
}

/** Sentence-cases a kind for the header when the ref carries no title: `agent-trace` → `Agent trace`. */
export function chatSidePanelKindLabel(kind: string): string {
  const words = kind.replace(/[-_]+/g, ' ').trim();
  return words ? words[0].toUpperCase() + words.slice(1) : 'Panel';
}

/**
 * Looks the panel's renderer up and shows it inside the frame. With no
 * renderer for the kind the frame still opens — with an empty state that names
 * the kind, so a missing registration is a visible bug, not a blank split.
 */
export function ChatSidePanel({ panel, onClose, onOpenFullPage, subtitle, actions, expanded, onToggleExpanded, className, 'data-testid': testId = 'chat-side-panel' }: ChatSidePanelProps) {
  const renderer = useChatSidePanelRenderer(panel.kind);
  const [liveTitle, setLiveTitle] = useState<string | null>(null);
  const api = useMemo<ChatSidePanelApi>(
    () => ({
      close: onClose,
      openFullPage: onOpenFullPage ? () => onOpenFullPage(panel) : undefined,
      setTitle: setLiveTitle,
    }),
    [onClose, onOpenFullPage, panel],
  );
  const title = liveTitle || panel.title || chatSidePanelKindLabel(panel.kind);
  return (
    <ChatSidePanelFrame title={title} subtitle={subtitle} actions={actions} expanded={expanded} onToggleExpanded={onToggleExpanded} onClose={onClose} onOpenFullPage={api.openFullPage} className={className} data-testid={testId}>
      {renderer ? (
        // Keyed so a new id of the same kind remounts the body rather than reusing stale state.
        <div key={`${panel.kind}:${panel.id}`} className="flex h-full min-h-0 flex-col" data-kind={panel.kind} data-id={panel.id}>
          {renderer(panel, api)}
        </div>
      ) : (
        <EmptyState
          size="sm"
          icon={<PuzzleIcon size={28} />}
          title={`No view registered for ${panel.kind}`}
          body="Register a renderer for this kind with ChatSidePanelProvider."
          testId={`${testId}-empty`}
        />
      )}
    </ChatSidePanelFrame>
  );
}

export default ChatSidePanel;
