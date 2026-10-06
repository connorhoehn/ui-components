// Vendored fork of @handlewithcare/prosemirror-suggest-changes 0.1.8 — see ./LICENSE
//
// Upstream inlines the literal U+200B character in a dozen places, which is
// invisible in a diff and trivially destroyed by a "strip weird whitespace"
// lint pass. Named once here instead.

/**
 * Anchor character. A deletion that starts at the very end of a block (or an
 * insertion that opens one) has no text to hang a mark on, so we insert one of
 * these and mark IT. They are stripped again when the suggestion is
 * accepted/rejected, and the arrow keys skip over them.
 */
export const ZERO_WIDTH_SPACE = String.fromCharCode(0x200b);
