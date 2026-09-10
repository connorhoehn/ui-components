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
    onSend: (message: ComposedMessage) => void;
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
    /** Rendered between the formatting controls and the send button. */
    toolbarExtras?: ReactNode;
    className?: string;
    'data-testid'?: string;
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
