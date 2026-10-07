import type { ReactNode } from 'react';
export interface MessageRowProps {
    /** Display name shown next to the message; required even for anonymous rows (use a fallback). */
    author: string;
    /** Message body. Plain text or pre-rendered ReactNode for rich content. */
    content: ReactNode;
    /** ISO timestamp string; rendered as local HH:MM. */
    timestamp: string;
    /** Optional avatar image URL. Falls back to initials derived from `author`. */
    avatarUrl?: string;
    /** Hide the avatar slot (e.g. middle of a MessageGroup). Defaults to false. */
    hideAvatar?: boolean;
    /** Hide the author label (e.g. middle of a MessageGroup). Defaults to false. */
    hideAuthor?: boolean;
    /**
     * This row is the viewer's own message.
     *
     * Mirrors what Teams and iMessage do, and for the same reason: in a busy
     * thread the question "which of these did I write" is answered constantly
     * and answering it by reading names is work. The row flips to the other
     * side and takes a tinted bubble, so the shape of the conversation is
     * legible before any of it is read.
     *
     * The avatar goes with it — a own-side bubble with a left-hand avatar reads
     * as somebody else's message that has drifted right.
     */
    mine?: boolean;
    /**
     * Slot rendered below the content (e.g. a `<ReactionsBar>` for this message).
     * Indented under the content so it lines up under text, not under the avatar.
     */
    footer?: ReactNode;
    /** Surface the row renders on. 'light' (default) keeps the theme tokens;
     *  'dark' swaps to white/alpha classes for dark call chrome — without it
     *  the message text renders dark-on-dark and disappears. Mirrors
     *  InviteCandidateList's tone seam. */
    tone?: 'light' | 'dark';
    /** ISO: when the text was last changed. Renders "(edited)" after the time. */
    editedAt?: string;
    /**
     * How the content span is laid out. Defaults to `'inline'` — the
     * shrink-to-fit tinted bubble (`max-w-[85%]`, padded, right-aligned text)
     * this component has always used, sized for plain chat text.
     *
     * `'block'` is for a card body (an `AgentRunCard`, a document/deck
     * preview, an attachment) instead of text. Those cards size themselves to
     * their CONTAINER (`AgentRunCard` uses a `@container` query, so its
     * intrinsic inline size is 0) — inside the `'inline'` bubble, which has no
     * width of its own beyond its shrink-to-fit content, that container
     * collapses to a few px and the card's contents wrap letter-by-letter in
     * a sliver on the right. `'block'` renders the span as a full-width block
     * up to a cap (`w-full max-w-[30rem]`) with no tint/padding, so the card
     * gets real horizontal room to size against — still right-aligned via the
     * column's `items-end` on a `mine` row, not via `text-align`.
     *
     * The cap is ONE fixed width (30rem, 480px — where Teams puts its cards)
     * on EVERY card row, own or not, at every pane width. A card is never the
     * column's width: on a wide monitor a document card 1100px wide, icon at
     * one end and "Open" at the other, makes the reader run their eyes across
     * the whole pane for one line. Incoming cards sit at the left edge,
     * outgoing at the right, the way the bubbles do; a pane narrower than the
     * cap shrinks the card to fit.
     */
    contentLayout?: 'inline' | 'block';
    className?: string;
}
/** Formats an ISO timestamp string to HH:MM local time. */
export declare function formatChatTime(isoString: string): string;
export declare function MessageRow({ author, content, timestamp, avatarUrl, hideAvatar, hideAuthor, mine, footer, tone, editedAt, contentLayout, className, }: MessageRowProps): import("react").JSX.Element;
export default MessageRow;
//# sourceMappingURL=MessageRow.d.ts.map