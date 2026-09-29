// ui-components/src/components/social/rich-composer.ts
//
// The rich-text chat entry point, deliberately SEPARATE from `./social`.
//
// ## Why this is its own subpath
//
// RichChatComposer imports @tiptap/extension-mention, which imports
// @tiptap/suggestion. Both are optional peers. Re-exporting the composer from
// the `social` barrel put them in the import graph of everyone who imports
// anything from `ui-components/social` — including hosts that only wanted
// ConversationList — and a host without them installed fails to BUILD with
// "Failed to resolve import @tiptap/suggestion". That is not a theoretical
// risk: it took the example app down.
//
// A subpath is how a package says "this part costs extra". Importing
// `ui-components/social` stays free of the rich-text stack; importing
// `ui-components/social/rich-composer` is the host declaring it has the peers.
//
//   npm i @tiptap/core @tiptap/react @tiptap/starter-kit \
//         @tiptap/extension-placeholder @tiptap/extension-mention
//
// Everything here is a first-class export, not a deep path into src.

export { RichChatComposer, matchComposerCommand, composerCommandArgumentText, matchesModeTrigger, COMPOSER_MODE_ORDER, COMPOSER_BREAKPOINTS, composerSizeFor } from './RichChatComposer';
export type {
  RichChatComposerProps,
  RichChatComposerHandle,
  RichChatDraft,
  ComposedMessage,
  ComposerCommand,
  ComposerCommandArgument,
  ComposerArgumentItem,
  ComposerMode,
  ComposerProcess,
  ComposerStatus,
  ComposerHint,
  ComposerSize,
  ComposerToolbarPreset,
  ComposerRadius,
  ComposerSendOption,
  MentionCandidate,
  DocumentCandidate,
} from './RichChatComposer';

export { MentionSuggestions } from './MentionSuggestions';
export type { MentionSuggestionsProps, MentionSuggestionsHandle } from './MentionSuggestions';

export { DocumentSuggestions } from './DocumentSuggestions';
export type { DocumentSuggestionsProps, DocumentSuggestionsHandle } from './DocumentSuggestions';

export { EmojiSuggestions } from './EmojiSuggestions';
export type { EmojiSuggestionsProps, EmojiSuggestionsHandle } from './EmojiSuggestions';

export { CommandSuggestions } from './CommandSuggestions';
export type { CommandSuggestionsProps, CommandSuggestionsHandle, CommandSuggestionItem } from './CommandSuggestions';

// Staged-attachment chips and the emoji shortcode table are re-exported here
// too, so a host building on the composer has one import path rather than two.
// Both are ALSO on the plain `social` barrel — neither touches tiptap, and a
// chat panel may want the chips without the composer.
export { ComposerAttachments } from './ComposerAttachments';
export type { ComposerAttachmentsProps, StagedFile } from './ComposerAttachments';
export { ComposerReferences } from './ComposerReferences';
export type { ComposerReference, ComposerReferencesProps } from './ComposerReferences';
export { EMOJI_SHORTCODES, searchEmoji } from './emojiShortcodes';
export type { EmojiShortcode } from './emojiShortcodes';

// The agent composer a page docks under its content (2.403.0): the pinned
// FloatingComposerDock + this composer with the mode menu / toolbar / Workflow
// preset. The root barrel exports the same component behind a lazy boundary.
export { AgentComposerDock } from './AgentComposerDock';
export type { AgentComposerDockProps, AgentComposerWorkflow, AgentComposerSendContext } from './AgentComposerDock';
export { composerDraftOf } from './agentComposerDraft';

// ContextComposer (2.407.0): the one composer — idle row, expanded card, its
// features gated by what it is attached to. AgentComposerDock above is now a
// deprecated preset over it.
export { ContextComposer } from './ContextComposer';
export type {
  ContextComposerProps,
  ContextComposerSendContext,
  ComposerWorkflow,
  ComposerReply,
  ComposerTaskReport,
} from './ContextComposer';
export { composerContextPreset, identityDisplayName, COMPOSER_CONTEXT_KINDS, COMPOSER_CONTEXT_REASONS } from './composerContext';
export type {
  ComposerContext,
  ComposerContextKind,
  ComposerContextFeatures,
  ComposerContextPreset,
  ComposerContextWiring,
  ComposerIdentity,
} from './composerContext';
