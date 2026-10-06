import type { EmojiShortcode } from './emojiShortcodes';
export interface EmojiSuggestionsProps {
    items: EmojiShortcode[];
    command: (item: {
        emoji: string;
    }) => void;
}
export interface EmojiSuggestionsHandle {
    onKeyDown: (props: {
        event: KeyboardEvent;
    }) => boolean;
}
export declare const EmojiSuggestions: import("react").ForwardRefExoticComponent<EmojiSuggestionsProps & import("react").RefAttributes<EmojiSuggestionsHandle>>;
export default EmojiSuggestions;
//# sourceMappingURL=EmojiSuggestions.d.ts.map