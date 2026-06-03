import { type CSSProperties } from 'react';
export interface Reaction {
    id: string;
    emoji: string;
    userId?: string;
    displayName?: string;
}
export interface ReactionOverlayProps {
    reactions: Reaction[];
    style?: CSSProperties;
}
export declare function ReactionOverlay({ reactions, style }: ReactionOverlayProps): import("react/jsx-runtime").JSX.Element;
export interface ReactionPickerProps {
    onReact: (emoji: string) => void;
    emojis?: string[];
    style?: CSSProperties;
}
export declare function ReactionPicker({ onReact, emojis, style }: ReactionPickerProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=ReactionOverlay.d.ts.map