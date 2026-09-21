import { Editor } from '@tiptap/core';
import { ForwardRefExoticComponent } from 'react';
import { JSX } from 'react';
import { ReactNode } from 'react';
import { RefAttributes } from 'react';

/** One row. Both a command and a command's argument fit this shape. */
export declare interface CommandSuggestionItem {
    /** Stable key. For a command, its trigger. */
    id: string;
    /** The typed token, rendered in mono — `/doc`. */
    code?: string;
    /** A glyph rendered where the token would be, for argument rows. */
    icon?: string;
    label: string;
    /** A second clause on the right: what it needs, or where it lives. */
    hint?: string;
    /** The long form, shown under the list for the highlighted row only. */
    description?: string;
}

export declare const CommandSuggestions: ForwardRefExoticComponent<CommandSuggestionsProps & RefAttributes<CommandSuggestionsHandle>>;

export declare interface CommandSuggestionsHandle {
    onKeyDown: (props: {
        event: KeyboardEvent;
    }) => boolean;
}

export declare interface CommandSuggestionsProps {
    items: CommandSuggestionItem[];
    command: (item: CommandSuggestionItem) => void;
    /** The listbox's accessible name. */
    label?: string;
    /**
     * The whole draft, for the command menu only. When it equals the
     * highlighted row's `code` exactly, Enter is not a pick — see the note at
     * the top.
     */
    draft?: string;
}

/** What the composer hands back on send. */
export declare interface ComposedMessage {
    /** Rich body. Empty when only files were attached. */
    html: string;
    /** Plain-text fallback, for clients and notifications that cannot render HTML. */
    text: string;
    /** Everyone the sender explicitly mentioned, de-duplicated, in document order. */
    mentions: MentionCandidate[];
    /** Files staged in the composer, sent WITH the message. */
    files: File[];
    /** Every document the sender referenced with `#`, de-duplicated, in document order. Absent when there are none. */
    documents?: Array<{
        id: string;
        label: string;
    }>;
    /**
     * Set when the draft starts with a known command trigger. `argument` is the
     * item picked from the argument menu, present only when the pick was made
     * in THIS draft and its label is still in the text — an edited-away label
     * means the person changed their mind, and the host should read `text`.
     */
    command?: {
        trigger: string;
        argument?: ComposerArgumentItem;
    };
    /**
     * Who can see this message. Mirrors the `privacy` prop at send time, so a
     * host with no opinion on the feature still gets `'visible'` rather than an
     * absent field.
     */
    privacy: 'visible' | 'hidden';
}

export declare interface ComposerArgumentItem {
    /** Stable identity — this is what travels to the host, not the label. */
    id: string;
    label: string;
    /** Shown on the right of the row: where it lives, who owns it. */
    hint?: string;
    /** A glyph for the row, e.g. `📄`. */
    icon?: string;
}

export declare function ComposerAttachments({ files, onRemove, disabled, className, 'data-testid': testId, }: ComposerAttachmentsProps): JSX.Element | null;

export declare interface ComposerAttachmentsProps {
    files: readonly StagedFile[];
    onRemove: (id: string) => void;
    disabled?: boolean;
    className?: string;
    'data-testid'?: string;
}

export declare interface ComposerCommand {
    /** The leading token, e.g. `/doc`. Matched case-insensitively at the start of the draft. */
    trigger: string;
    /** What it does — "Edit the open document with Haiku". */
    label: string;
    /** A second clause: what it needs, or what will happen. */
    hint?: string;
    /** True when the command cannot run right now (no document open); the bar says why via `hint`. */
    disabled?: boolean;
    /** The long form, shown as a tooltip on the bar: what will happen, step by step. */
    description?: string;
    /** What the command acts on, offered as a second menu once the trigger is typed. */
    argument?: ComposerCommandArgument;
}

export declare interface ComposerCommandArgument {
    /** Shown in the status bar while the argument is empty — "type a document name". */
    placeholder?: string;
    /**
     * Resolves the argument menu from the text after the trigger. A promise is
     * supported (and debounced ~120ms) so a host can hit an index rather than
     * filter a preloaded array; the previous list stays up while a new one is
     * in flight.
     */
    search: (query: string) => ComposerArgumentItem[] | Promise<ComposerArgumentItem[]>;
    /**
     * What picking a row does. `'execute'` clears the draft and calls
     * `onCommand` — the pick WAS the message. `'insert'` (the default) writes the
     * label into the draft so the person can keep typing, and the pick travels
     * on send as `ComposedMessage.command.argument`.
     */
    onPick?: (item: ComposerArgumentItem) => 'execute' | 'insert';
}

/**
 * The text after a matched command's trigger and its one separator:
 * `/doc Roadmap` → `Roadmap`, `/doc` → ``. Leading whitespace beyond the
 * separator is kept, so callers replacing the argument know its exact extent.
 */
export declare function composerCommandArgumentText(draft: string, command: ComposerCommand): string;

export declare interface DocumentCandidate {
    /** Stable identity — this is what travels in the message, not the label. */
    id: string;
    /** The document's title. */
    label: string;
    /** Shown under the title, e.g. the folder or who last edited it. */
    hint?: string;
    /** The document's own icon, when it has one; 📄 otherwise. */
    icon?: string;
}

export declare const DocumentSuggestions: ForwardRefExoticComponent<DocumentSuggestionsProps & RefAttributes<DocumentSuggestionsHandle>>;

export declare interface DocumentSuggestionsHandle {
    onKeyDown: (props: {
        event: KeyboardEvent;
    }) => boolean;
}

export declare interface DocumentSuggestionsProps {
    items: DocumentCandidate[];
    command: (item: {
        id: string;
        label: string;
    }) => void;
}

export declare const EMOJI_SHORTCODES: readonly EmojiShortcode[];

export declare interface EmojiShortcode {
    /** The code typed between colons, without them. */
    code: string;
    emoji: string;
    /** Extra search terms, so `:party:` finds 🎉 even though its code is `tada`. */
    keywords?: readonly string[];
}

export declare const EmojiSuggestions: ForwardRefExoticComponent<EmojiSuggestionsProps & RefAttributes<EmojiSuggestionsHandle>>;

export declare interface EmojiSuggestionsHandle {
    onKeyDown: (props: {
        event: KeyboardEvent;
    }) => boolean;
}

export declare interface EmojiSuggestionsProps {
    items: EmojiShortcode[];
    command: (item: {
        emoji: string;
    }) => void;
}

/** The command a draft is addressing, or null. `/doc`, `/doc …`, never `/document`. */
export declare function matchComposerCommand(draft: string, commands: readonly ComposerCommand[] | undefined): ComposerCommand | null;

export declare interface MentionCandidate {
    /** Stable identity — this is what travels in the message, not the label. */
    id: string;
    label: string;
    avatarUrl?: string;
    color?: string;
    /** Shown under the name, e.g. a role or team. */
    hint?: string;
    /**
     * False when the composer knows the chat's members and this person is not
     * one: the row lists under "Not in this chat" and picking it offers to add
     * them rather than mentioning someone who could not read the message.
     */
    member?: boolean;
}

export declare const MentionSuggestions: ForwardRefExoticComponent<MentionSuggestionsProps & RefAttributes<MentionSuggestionsHandle>>;

export declare interface MentionSuggestionsHandle {
    onKeyDown: (props: {
        event: KeyboardEvent;
    }) => boolean;
}

export declare interface MentionSuggestionsProps {
    items: MentionCandidate[];
    command: (item: {
        id: string;
        label: string;
    }) => void;
    /** Picked a non-member: no mention is inserted; the host opens its add flow. */
    onPickNonMember?: (userId: string) => void;
}

export declare const RichChatComposer: ForwardRefExoticComponent<RichChatComposerProps & RefAttributes<RichChatComposerHandle>>;

/** What a host can do to the composer from outside — focus it, prefill it. */
export declare interface RichChatComposerHandle {
    /** The live tiptap editor, or null before mount. */
    readonly editor: Editor | null;
    focus: () => void;
    /** Inserts plain text at the caret, as if typed. */
    insertText: (text: string) => void;
}

export declare interface RichChatComposerProps {
    /** Resolve after accepting the send. Reject or return false to retain the draft. */
    onSend: (message: ComposedMessage) => void | boolean | Promise<void | boolean>;
    /** Optional controlled draft; key the composer by conversation. */
    draft?: RichChatDraft;
    /**
     * `previous` is the exact previous draft object. A host retaining drafts
     * across unmounts should compare it before applying a delayed send clear.
     */
    onDraftChange?: (draft: RichChatDraft, previous: RichChatDraft | undefined) => void;
    /**
     * Called when a command argument is picked with `onPick` → `'execute'`. The
     * draft has already been cleared; nothing goes through `onSend`.
     */
    onCommand?: (command: ComposerCommand, argument: ComposerArgumentItem) => void;
    /**
     * Resolves the @ menu. A promise is supported so a host can hit a directory
     * rather than filter a preloaded array. Omit to disable mentions entirely.
     */
    onSearchPeople?: (query: string) => MentionCandidate[] | Promise<MentionCandidate[]>;
    /**
     * Who is in this conversation. Given, the @ menu lists anyone
     * `onSearchPeople` returns who is NOT in it under "Not in this chat", and
     * picking them calls `onMentionNonMember` instead of inserting a mention —
     * a mention of someone who cannot read the message is a message to nobody.
     * Read live, like `onSearchPeople`.
     */
    mentionMembers?: ReadonlySet<string>;
    /** The host's add-to-chat flow, opened for the person picked under "Not in this chat". */
    onMentionNonMember?: (userId: string) => void;
    /**
     * Resolves the `#` menu — the documents a message can refer to. Omit to
     * disable document references entirely. Read live, like `onSearchPeople`:
     * a new function identity does not rebuild the editor.
     */
    onSearchDocuments?: (query: string) => DocumentCandidate[] | Promise<DocumentCandidate[]>;
    /**
     * Enables attachments. False means this deployment has no file capability and
     * every attachment affordance disappears — not a disabled paperclip, which
     * promises something the product cannot do.
     *
     * Files arrive on SEND, in `ComposedMessage.files`, not on drop.
     */
    allowAttachments?: boolean;
    /** Turns the emoji picker on. */
    allowEmoji?: boolean;
    /**
     * Asks the host for a URL when the link button is pressed, receiving the
     * selected text so it can prefill. Returning nothing cancels.
     *
     * A callback rather than a built-in prompt: `window.prompt` is blocked in
     * some embeddings and unstyleable in all of them, and a library that opens
     * one has decided what the host's dialogs look like.
     */
    onRequestLink?: (selectedText: string) => string | null | undefined;
    placeholder?: string;
    disabled?: boolean;
    /**
     * Slash commands the host understands. While the draft starts with one, the
     * composer says so — a bar naming the command above the text and a
     * different border — so a person typing `/doc rename…` knows before Send
     * that this is an instruction to an agent, not a message to the room.
     */
    commands?: ComposerCommand[];
    /**
     * Controlled per-message visibility. Defaults to `'visible'`. Passing
     * `onPrivacyChange` is what turns the feature on at all — see there.
     */
    privacy?: 'visible' | 'hidden';
    /**
     * Renders an eye / eye-off toggle in the toolbar, beside the attach and
     * document controls, and is called when it is pressed with the OTHER
     * state — the composer does not hold its own privacy state, so nothing
     * changes on screen until the host applies it back through `privacy`.
     *
     * Omitting this prop is the whole opt-in: no toggle, no hint row, no
     * `privacy` key on the published `RichChatDraft`. `ComposedMessage.privacy`
     * still reports `'visible'` on send either way, so a host that adopts the
     * field later does not have to touch every existing message.
     */
    onPrivacyChange?: (next: 'visible' | 'hidden') => void;
    /**
     * Tooltip/accessible-name text for each state. Defaults to
     * "Visible to everyone" / "Only you".
     */
    privacyLabels?: {
        visible: string;
        hidden: string;
    };
    /** Rendered between the formatting controls and the send button. */
    toolbarExtras?: ReactNode;
    className?: string;
    'data-testid'?: string;
}

/** In-memory draft. Hosts must keep File objects out of persistent storage. */
export declare interface RichChatDraft {
    html: string;
    files: File[];
    command?: ComposedMessage['command'];
    /**
     * The `privacy` prop as of the last publish, present only while a host has
     * wired `onPrivacyChange` — a host that never adopts the toggle never sees
     * this key on its draft. Ride-along storage, like `command`: the composer
     * does not read it back to set its own state, since `privacy` is already a
     * controlled prop; a host restoring a conversation reads `draft.privacy`
     * itself and passes it back in as `privacy`.
     */
    privacy?: 'visible' | 'hidden';
}

/**
 * Ranks shortcodes for a query.
 *
 * Prefix matches on the CODE come first: someone typing `:fi` means `fire`,
 * not `crossed_fingers` — a plain substring search buries the obvious answer
 * under coincidental matches, which is the difference between autocomplete
 * that feels instant and autocomplete you have to read.
 */
export declare function searchEmoji(query: string, list?: readonly EmojiShortcode[], limit?: number): EmojiShortcode[];

export declare interface StagedFile {
    /** Stable id for keying and removal — the File object itself is not a key. */
    id: string;
    file: File;
}

export { }
