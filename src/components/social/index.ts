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

// RichChatComposer — the Teams-style message box: formatting, @mentions,
// attachments and drag-drop. ChatComposer remains for hosts that want a plain
// field and should not pay for a rich-text stack.
export { RichChatComposer } from './RichChatComposer';
export type { RichChatComposerProps, ComposedMessage } from './RichChatComposer';
export { MentionSuggestions } from './MentionSuggestions';
export type { MentionCandidate, MentionSuggestionsProps } from './MentionSuggestions';
