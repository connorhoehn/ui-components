import type { ReactNode } from 'react';
import { type ConversationItem } from './ConversationList';
import { type ConversationShelfItem } from './ConversationShelf';
import type { RailSectionAction } from './RailSectionHeader';
/**
 * What the rail currently points at. One value, because one pane.
 */
export type RailSelection = {
    kind: 'shelf';
    id: string;
} | {
    kind: 'conversation';
    channel: string;
};
export interface ConversationRailProps {
    /**
     * Persistent destinations — Mentions, Threads, Drafts. Empty renders
     * nothing at all rather than an empty strip.
     */
    shelf?: readonly ConversationShelfItem[];
    conversations: ConversationItem[];
    /** Null when nothing is open — a cold start, or a pane the rail does not model. */
    selected?: RailSelection | null;
    onSelect: (selection: RailSelection) => void;
    /** Renders the "+ New chat" row above the conversations when set. */
    onNewChat?: () => void;
    /**
     * Split conversations into Channels and Direct messages. On by default
     * here — unlike the bare list, which serves compact sidebars too. A rail is
     * the full-height case, where a forty-row flat mix stops being scannable.
     */
    grouped?: boolean;
    /**
     * Which group leads. Forwarded to ConversationList — `'dms-first'` on a
     * surface whose subject is people rather than rooms.
     */
    sectionOrder?: 'channels-first' | 'dms-first';
    /** Trailing buttons on each section heading, keyed by section name. Forwarded to the list. */
    sectionActions?: Readonly<Record<string, readonly RailSectionAction[]>>;
    /**
     * Which conversation sections are folded away, keyed by section name.
     * Forwarded to the list.
     *
     * Nothing to do with `collapsed` below: that shrinks the WHOLE rail to an
     * icon strip, this folds one section inside an otherwise normal rail.
     */
    collapsedSections?: Readonly<Record<string, boolean>>;
    /** Fires with the section's name and the state to switch to. Forwarded to the list. */
    onToggleSection?: (label: string, next: boolean) => void;
    /** "Call" / "Video call" in each row's ⋯ menu. Forwarded to the list. */
    onStartCall?: (channel: string, kind: 'audio' | 'video') => void;
    /** Forwarded to the list: rows per group before a "Show N more" row. */
    maxVisible?: number;
    emptyLabel?: string;
    /** Above the shelf: a workspace switcher, a search field, a title. */
    header?: ReactNode;
    title?: string;
    actions?: ReactNode;
    /** Below the list: a "you" row, a status control. */
    /**
     * Between the shelf and the conversation list — where a team → channel
     * tree goes, so it sits above the flat conversations rather than below
     * them.
     */
    beforeList?: ReactNode;
    footer?: ReactNode;
    /**
     * Per-row actions, forwarded to the list: the ⋯ menu on each conversation.
     * Each item appears only when its handler does.
     */
    onTogglePin?: (channel: string, next: boolean) => void;
    onToggleMute?: (channel: string, next: boolean) => void;
    onMarkUnread?: (channel: string) => void;
    /** "Rename" in each row's ⋯ menu. Forwarded to the list; see its prop docs. */
    onRename?: (channel: string) => void;
    /** Which rows accept a rename. Forwarded to the list. */
    canRename?: (item: ConversationItem) => boolean;
    /** "Move to section…" in each row's ⋯ menu. Forwarded to the list. */
    onSetSection?: (channel: string) => void;
    /**
     * Opts into the Teams/Slack "shrink to an icon strip" toggle. Off by
     * default, so every existing caller keeps its always-expanded rail with no
     * behaviour change.
     */
    collapsible?: boolean;
    /**
     * Whether the rail is currently the narrow icon strip. The rail does not
     * own this — the host decides, typically from a piece of state it
     * persists, and hears about a change through `onToggleCollapse`.
     */
    collapsed?: boolean;
    /** Fires with the state the host should switch to when the toggle is used. */
    onToggleCollapse?: (next: boolean) => void;
    className?: string;
    'data-testid'?: string;
}
export declare function ConversationRail({ shelf, conversations, selected, onSelect, onNewChat, grouped, sectionOrder, sectionActions, collapsedSections, onToggleSection, onStartCall, maxVisible, emptyLabel, header, title, actions, beforeList, footer, onTogglePin, onToggleMute, onMarkUnread, onRename, canRename, onSetSection, collapsible, collapsed, onToggleCollapse, className, 'data-testid': testId, }: ConversationRailProps): import("react").JSX.Element;
export default ConversationRail;
//# sourceMappingURL=ConversationRail.d.ts.map