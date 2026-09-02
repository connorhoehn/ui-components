export { SocialPanel } from './SocialPanel';
export { default as SocialTabContent } from './SocialTabContent';
export { ChatPanel } from './ChatPanel';
export type { ChatPanelProps } from './ChatPanel';
export { MessageRow, formatChatTime } from './MessageRow';
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
