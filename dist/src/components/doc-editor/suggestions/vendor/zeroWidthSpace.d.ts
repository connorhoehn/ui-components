/**
 * Anchor character. A deletion that starts at the very end of a block (or an
 * insertion that opens one) has no text to hang a mark on, so we insert one of
 * these and mark IT. They are stripped again when the suggestion is
 * accepted/rejected, and the arrow keys skip over them.
 */
export declare const ZERO_WIDTH_SPACE: string;
//# sourceMappingURL=zeroWidthSpace.d.ts.map