import { type ReactNode } from 'react';
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
export interface ChatSidePanelProviderProps {
    /** This layer's renderers by kind. Merged over any provider above; overrides by kind. */
    renderers?: ChatSidePanelRenderers;
    children: ReactNode;
}
export declare function ChatSidePanelProvider({ renderers, children }: ChatSidePanelProviderProps): import("react").JSX.Element;
/** Every renderer visible here, by kind; `{}` outside a provider. */
export declare function useChatSidePanelRenderers(): ChatSidePanelRenderers;
/** The renderer for `kind`, or null when nothing above registered one. */
export declare function useChatSidePanelRenderer(kind: string): ChatSidePanelRenderer | null;
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
export declare function ChatSidePanelFrame({ title, subtitle, onClose, onOpenFullPage, actions, expanded, onToggleExpanded, children, className, 'data-testid': testId, }: ChatSidePanelFrameProps): import("react").JSX.Element;
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
export declare function chatSidePanelKindLabel(kind: string): string;
/**
 * Looks the panel's renderer up and shows it inside the frame. With no
 * renderer for the kind the frame still opens — with an empty state that names
 * the kind, so a missing registration is a visible bug, not a blank split.
 */
export declare function ChatSidePanel({ panel, onClose, onOpenFullPage, subtitle, actions, expanded, onToggleExpanded, className, 'data-testid': testId }: ChatSidePanelProps): import("react").JSX.Element;
export default ChatSidePanel;
//# sourceMappingURL=ChatSidePanelRegistry.d.ts.map