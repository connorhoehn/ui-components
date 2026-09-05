import { ForwardRefExoticComponent } from 'react';
import { JSX } from 'react';
import { ReactNode } from 'react';
import { RefAttributes } from 'react';

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
}

export declare function ComposerAttachments({ files, onRemove, disabled, className, 'data-testid': testId, }: ComposerAttachmentsProps): JSX.Element | null;

export declare interface ComposerAttachmentsProps {
    files: readonly StagedFile[];
    onRemove: (id: string) => void;
    disabled?: boolean;
    className?: string;
    'data-testid'?: string;
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

export declare function RichChatComposer({ onSend, onSearchPeople, allowAttachments, allowEmoji, onRequestLink, placeholder, disabled, toolbarExtras, className, 'data-testid': testId, }: RichChatComposerProps): JSX.Element;

export declare interface RichChatComposerProps {
    onSend: (message: ComposedMessage) => void;
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
