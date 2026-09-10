export { SocialPanel } from './SocialPanel';
export { default as SocialTabContent } from './SocialTabContent';
// documentRefFromMetadata / callRefFromMetadata are exported so a host that
// renders its own transcript can read the same events out of message metadata
// rather than reimplementing the wire shape.
export {
  ChatPanel,
  documentRefFromMetadata,
  callRefFromMetadata,
  truncationFromMetadata,
} from './ChatPanel';
export type { ChatPanelProps } from './ChatPanel';
export { MessageRow, formatChatTime } from './MessageRow';
export { DaySeparator } from './DaySeparator';
export type { DaySeparatorProps } from './DaySeparator';
export { dayKeyOf, dayLabel, isNewDay, fullDateLabel, fullTimestampLabel } from './dayBoundary';
export type { MessageRowProps } from './MessageRow';
export { MessageGroup } from './MessageGroup';
export type { MessageGroupProps, MessageGroupItem } from './MessageGroup';
export { ChatRoom } from './ChatRoom';
export { RoomList } from './RoomList';
export { PostFeed } from './PostFeed';
export { GroupPanel } from './GroupPanel';
export { CommentThread } from './CommentThread';
export { PresencePanel } from './PresencePanel';
export { ActivityPanel } from './ActivityPanel';

export { ConversationList } from './ConversationList';
export type {
    ConversationListProps,
    ConversationItem,
    ConversationPeer,
} from './ConversationList';

export { ReactionsBar } from './ReactionsBar';
export type { ReactionsBarProps, ReactionSummary } from './ReactionsBar';

export { ReactionPickerPopover, DEFAULT_PICKER_EMOJIS } from './ReactionPickerPopover';
export type { ReactionPickerPopoverProps } from './ReactionPickerPopover';

export { AttachmentBubble, TransferBubble, isImageAttachment, formatBytes } from './ChatAttachment';
export type {
    AttachmentBubbleProps,
    ChatAttachment,
    ChatTransfer,
    TransferBubbleProps,
    TransferPhase,
} from './ChatAttachment';

export { ChatDropZone } from './ChatDropZone';
export type { ChatDropZoneProps } from './ChatDropZone';

// RichChatComposer is deliberately NOT re-exported from this barrel.
//
// It statically imports @tiptap/extension-mention, which in turn imports
// @tiptap/suggestion. Both are OPTIONAL peers. Re-exporting it here puts them
// in the import graph of every consumer of `ui-components/social` — including
// hosts that only wanted ConversationList — and a host without them installed
// fails to build with "Failed to resolve import @tiptap/suggestion". That is
// exactly what happened to the example app.
//
// Import it by path instead, from a host that has the peers:
//   import { RichChatComposer } from '@connorhoehn/ui-components/social/RichChatComposer';
//
// MentionSuggestions is safe on its own (no tiptap imports) but stays beside
// it, because it is meaningless without the composer that drives it.

// NewConversationPanel — one field that finds people and names channels,
// replacing the two stacked create-forms.
export { NewConversationPanel, toChannelName } from './NewConversationPanel';
export type { NewConversationPanelProps, NewConversationPerson } from './NewConversationPanel';

// Emoji shortcodes for `:` autocomplete. Data, so a host can supply its own set.
export { EMOJI_SHORTCODES, searchEmoji } from './emojiShortcodes';
export type { EmojiShortcode } from './emojiShortcodes';

// LinkDialog — URL + display text. Exported so a host can reuse the same
// dialog outside the composer (message edit, a link in a doc comment).
export { LinkDialog, normalizeHref } from './LinkDialog';
export type { LinkDialogProps, LinkDialogValue } from './LinkDialog';

// MessageBody — renders a message's rich text from an ALLOW-LIST. Message
// bodies are attacker-controlled; this is the component that makes rendering
// them safe.
export { MessageBody } from './MessageBody';
export type { MessageBodyProps } from './MessageBody';

// Message-level interaction primitives. Each is presentational — the transport
// (useReactions, chat metadata, pin events) is the host's to wire.
export { ReactionChips, groupReactions, describeReactors } from './ReactionChips';
export type { ReactionChipsProps, MessageReaction, ReactionGroup } from './ReactionChips';
export { MessageActionBar } from './MessageActionBar';
export type { MessageActionBarProps } from './MessageActionBar';
export { QuoteBlock, excerpt } from './QuoteBlock';
export type { QuoteBlockProps, QuotedMessage } from './QuoteBlock';

// Channel views — the same channel seen as its files, its pins, or the times
// you were named in it. These are the panels behind ChannelHeader's tabs.
export { PinnedMessagesPanel, ChannelFilesPanel, ChannelMentionsPanel, ChannelRecordingsPanel, ChannelDocumentsPanel, formatDuration } from './ChannelViews';
export type {
    PinnedMessageItem,
    PinnedMessagesPanelProps,
    ChannelFileItem,
    ChannelFilesPanelProps,
    ChannelMentionItem,
    ChannelMentionsPanelProps,
    ChannelRecordingItem,
    ChannelRecordingsPanelProps,
    ChannelDocumentItem,
    ChannelDocumentsPanelProps,
} from './ChannelViews';

// The whole conversation, assembled: header, tabs, transcript and every view
// that belongs to the channel. Which views exist is DATA, so the same
// component ships as chat-only in one product and chat+video+documents in
// another.
export { ConversationSurface, ALL_CONVERSATION_FEATURES } from './ConversationSurface';
export type { ConversationFeature, ConversationSurfaceProps } from './ConversationSurface';

// A document as it appears INSIDE a conversation: what it is, who is in it
// right now, and a way in that does not cost you the thread.
export { DocumentActivityCard } from './DocumentActivityCard';
export type { DocumentActivityCardProps, DocumentActivityEditor } from './DocumentActivityCard';

// CallActivityCard — the same idea for calls: live it is an invitation, ended
// it is a record, and it is one component so the transcript does not swap
// rows underneath a reader as the call ends.
export { CallActivityCard, formatCallDuration, describeParticipants } from './CallActivityCard';
export type { CallActivityCardProps, CallActivityParticipant } from './CallActivityCard';

// The persistent destinations above a conversation list — Activity, Mentions.
// They are not conversations, so they do not live in a list sorted by recency.
export { ConversationShelf } from './ConversationShelf';
export type { ConversationShelfItem, ConversationShelfProps } from './ConversationShelf';

// ConversationRail — shelf + conversation list under ONE selection, so a host
// cannot end up with two highlighted rows and one pane.
export { ConversationRail } from './ConversationRail';
export type { ConversationRailProps, RailSelection } from './ConversationRail';
export { AgentRunCard, agentRunRefFromMetadata } from './AgentRunCard';
export type { AgentRunCardProps, AgentRunStatus, AgentRunPhase } from './AgentRunCard';
export type { ComposerCommand, ComposerCommandArgument, ComposerArgumentItem } from './composerCommands';
export { matchComposerCommand, composerCommandArgumentText } from './composerCommands';
