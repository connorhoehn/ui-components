import { type RailSectionAction } from './RailSectionHeader';
export interface ConversationPeer {
    userId: string;
    displayName: string;
    avatarUrl?: string;
    color?: string;
    /** Presence: true → online dot, false → offline dot, undefined → no dot. */
    online?: boolean;
}
export interface ConversationItem {
    /** Chat channel id — handed back verbatim by `onSelect`. */
    channel: string;
    /**
     * What kind of conversation this is.
     *
     * The server already models all three as ONE thing — a room carries
     * `type: 'standalone' | 'group' | 'dm'` — so they belong in one list rather
     * than three panels with three "new" buttons. This only changes how the row
     * IDENTIFIES itself:
     *
     *   'dm'      → the peer's avatar and name
     *   'group'   → stacked avatars, all the names
     *   'channel' → a # and the channel's own name. A channel is not the sum of
     *               its members; #general does not want forty stacked avatars,
     *               and its identity survives everyone leaving.
     *
     * Defaults to peer-derived ('dm' or 'group' by peer count), so every existing
     * caller keeps the rows it already had.
     */
    kind?: 'dm' | 'group' | 'channel';
    /** Required for `kind: 'channel'` — the channel's name, without the '#'. */
    name?: string;
    /** 1 peer for a 1:1 conversation, N for groups. Empty for a channel. */
    peers: ConversationPeer[];
    lastMessagePreview?: string;
    /** ISO timestamp of the last message. Rendered as HH:MM. */
    lastMessageAt?: string;
    unreadCount?: number;
    /**
     * Somebody named YOU in this conversation.
     *
     * Separate from `unreadCount` because they answer different questions and
     * only one of them is urgent: unread is "there is traffic here", a mention
     * is "someone is waiting on you". Rolling them into one number is how a
     * mention gets lost inside a busy channel's 40 unread.
     */
    mentioned?: boolean;
    /**
     * A call is happening in this conversation RIGHT NOW.
     *
     * Its own signal, for the same reason `mentioned` is: unread says "there is
     * traffic here", a mention says "someone is waiting on you", and this says
     * "something is happening that you can still join". Only the last one
     * expires — a call you learn about afterwards is a fact, not an invitation.
     *
     * Until this existed a call was invisible from the list: the thread posted a
     * card when the call ENDED, so the only way to discover one in progress was
     * to already be looking at the conversation it was in. For a stream meant
     * for an audience that is the whole problem — nobody can watch what nobody
     * can find.
     */
    live?: boolean;
    /**
     * Kept at the top of the rail, above every other row and out of recency's
     * reach — the two or three conversations a person returns to all day.
     *
     * Pinned rows form ONE group regardless of kind: a pin says "I want this
     * where I can find it", and splitting the pins back into Channels and
     * Direct messages puts them back where they were.
     */
    pinned?: boolean;
    /**
     * A heading this person filed the row under — the Slack/Teams "custom
     * section". Absent or blank means the default grouping.
     *
     * Sections sit ABOVE Channels and Direct messages and below Pinned: someone
     * who has made a section has said, in the strongest terms the rail offers,
     * where they want this thread. A pin still outranks it — "keep this in
     * reach" is a stronger statement than "file this under Work", and a pinned
     * row pulled down into a section is a pin that stopped working.
     *
     * Filing is per person and per conversation, so two people in one channel
     * can file it differently and neither sees the other's arrangement.
     */
    section?: string | null;
    /**
     * Muted: traffic here is not worth interrupting for.
     *
     * The row still counts its unread — muting is not hiding — but the badge
     * loses its accent, so a glance down the rail separates "someone is talking"
     * from "someone wants me". A MENTION keeps its full-strength marker even
     * here, because being named is the one thing a mute is not meant to swallow.
     */
    muted?: boolean;
}
export interface ConversationListProps {
    items: ConversationItem[];
    /** Channel of the conversation currently open — its row highlights. */
    activeChannel?: string | null;
    onSelect: (channel: string) => void;
    /** Renders a "+ New chat" affordance above the rows when set. */
    onNewChat?: () => void;
    /** Empty-state text. Defaults to "No conversations yet". */
    emptyLabel?: string;
    /**
     * Split the list into Channels and Direct messages, the way Slack and Teams
     * do.
     *
     * A flat list mixing the two is scannable at four rows and not at forty: a
     * channel and a person are different kinds of destination, and the eye
     * looks for them in different places. Off by default so existing callers —
     * a compact sidebar, a call's people list — keep the single run they were
     * designed around.
     */
    grouped?: boolean;
    /**
     * Which group leads when `grouped`.
     *
     * `'channels-first'` (the default, and what every existing caller keeps) is
     * the Slack shape and is right when channels are things you deliberately
     * joined. `'dms-first'` is right on a surface whose subject is people: a DM
     * is addressed to you personally and a channel is not, and on a rail with
     * forty rooms in it that difference is the only thing keeping a new message
     * from a colleague above the fold.
     */
    sectionOrder?: 'channels-first' | 'dms-first';
    /**
     * Trailing buttons on a section's heading, keyed by the section's name —
     * 'Channels', 'Direct messages', 'Pinned'. A + on the Channels heading is
     * where people look for "make a new one"; a "new" button parked somewhere
     * else is a button nobody finds.
     */
    sectionActions?: Readonly<Record<string, readonly RailSectionAction[]>>;
    /**
     * Which sections are folded away, keyed by the section's name the way
     * `sectionActions` is — 'Pinned', 'Channels', 'Direct messages'.
     *
     * Controlled, and only live once `onToggleSection` is given: a collapsed
     * section with no handler is one nothing can reopen. The host owns the state
     * because this is a preference worth persisting — a rail that forgets which
     * sections you folded is one you refold every morning.
     *
     * Not to be confused with the "Show N more" cap (`maxVisible`), which is
     * this component's own state and a different idea: the cap trims a long
     * section down to its top rows, this hides the section outright. Neither
     * resets the other, so reopening a section brings back exactly the rows it
     * had.
     */
    collapsedSections?: Readonly<Record<string, boolean>>;
    /** Fires with the section's name and the state the host should switch to. */
    onToggleSection?: (label: string, next: boolean) => void;
    /**
     * Start a call in a conversation from the rail — the row's ⋯ gains "Call"
     * and "Video call". A conversation you can open is one you can call into,
     * and making people open it first to find the call button is a step for
     * nothing.
     */
    onStartCall?: (channel: string, kind: 'audio' | 'video') => void;
    /**
     * Sort rows most-recent-first within each group. Default TRUE.
     *
     * Off for a caller whose order already means something — a call's people
     * list is in join order, and re-sorting it by "last message" would shuffle
     * the participants of a live call every time somebody spoke.
     */
    sortByRecency?: boolean;
    /**
     * Show at most this many rows per group, with a "Show N more" row after
     * them that expands the group in place (and "Show less" to fold it back).
     *
     * A rail is a place to find the conversation you want, and past a handful
     * of rows the eye stops scanning and starts reading. With recency sorting
     * on, the cut keeps the most recent; the open conversation is always kept
     * visible so the highlight never sits inside the folded part. Unset shows
     * everything, which is what every existing caller gets.
     */
    maxVisible?: number;
    /**
     * Per-row actions, the way Teams and Slack hang them off a conversation:
     * a ⋯ button revealed on hover or focus, never a second permanent control
     * competing with the row itself. Each is optional and its menu row appears
     * only when the handler does — a rail that cannot mute should not offer to.
     *
     * `next` is the state being asked for, not the state now, so a host never
     * has to re-derive the flip.
     */
    onTogglePin?: (channel: string, next: boolean) => void;
    onToggleMute?: (channel: string, next: boolean) => void;
    /** Absent from a row that is already unread — there is nothing to mark. */
    onMarkUnread?: (channel: string) => void;
    /**
     * Rename this conversation — the Teams/Slack "Rename channel" row.
     *
     * Offered per row rather than per list because renaming is a permission:
     * the host knows which conversations this reader owns, and a row that
     * cannot be renamed should not say it can. Pass a handler only for rows
     * where it is allowed (see `canRename`).
     */
    onRename?: (channel: string) => void;
    /**
     * "Move to section…" — file this row under one of the person's own
     * headings. The host owns the picker; this only reports the intent.
     *
     * Offered on every row when given, unlike Rename: filing is the reader's
     * own arrangement of their own rail, so it needs no permission from anyone
     * and applies as well to a DM as to a channel.
     */
    onSetSection?: (channel: string) => void;
    /**
     * Which rows accept a rename. Defaults to "all of them" when `onRename` is
     * given. A DM has no name of its own — it is named by the people in it — so
     * a host will typically answer false for those.
     */
    canRename?: (item: ConversationItem) => boolean;
    tone?: 'light' | 'dark';
    className?: string;
    'data-testid'?: string;
}
export declare function ConversationList({ items, grouped, sectionOrder, sectionActions, collapsedSections, onToggleSection, onStartCall, sortByRecency, maxVisible, activeChannel, onSelect, onNewChat, emptyLabel, onTogglePin, onToggleMute, onMarkUnread, onRename, canRename, onSetSection, tone, className, 'data-testid': testId, }: ConversationListProps): import("react").JSX.Element;
export default ConversationList;
//# sourceMappingURL=ConversationList.d.ts.map