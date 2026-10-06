import { Extension } from '@tiptap/core';
/**
 * The spacings offered, as multiples of one grid row.
 *
 * `'1'` is the paper's own leading and is stored as ABSENCE — see
 * `setLineSpacing`. Strings rather than numbers so the stored value, the
 * `data-line-spacing` attribute and the menu's radio state are all one type and
 * `1.5` never arrives back as `1.4999999999999998`.
 */
export declare const LINE_SPACINGS: readonly ['1', '1.5', '2'];
export type LineSpacing = (typeof LINE_SPACINGS)[number];
/** What each value is called in the menu — Google Docs' words, where it has them. */
export declare const LINE_SPACING_LABELS: Record<LineSpacing, string>;
export interface CanvasLineSpacingOptions {
    /**
     * Node names that gain the attribute.
     *
     * `paragraph` only, and headings are deliberately excluded. `styles.css`
     * sizes every heading in whole rows for a stated typographic reason — an h1
     * gets two rows "because 32px type cannot wrap on 26.4px leading without the
     * lines colliding" — so a spacing control that could write a heading's
     * leading would let Select-All + Single collapse 32px glyphs into a 26.4px
     * box. Heading leading is a constant of this paper, not a user setting.
     */
    types: string[];
}
export declare function isLineSpacing(value: unknown): value is LineSpacing;
/**
 * The stored value for something read off the DOM, or `null` for anything else.
 *
 * Narrowed to the closed set at the boundary for the same reason `textAlign`
 * narrows there: pasted HTML carries `line-height: normal`, `120%`, `inherit`
 * and worse, and storing those verbatim would put values in the CRDT that no
 * command can produce and every future reader has to defend against.
 */
export declare function parseLineSpacing(value: unknown): LineSpacing | null;
/**
 * The rendered attributes for a spacing, or nothing when it is the default.
 *
 * `--doc-line` is defined on `.doc-page--paginated`; the `1.5em` fallback is
 * the same leading expressed against the element's own font size, so an
 * unpaginated page (or a section editor, which shares this schema) gets a
 * proportional result rather than an unresolved `calc`.
 *
 * `data-line-spacing` carries the value because it is what `parseHTML` reads
 * back: parsing our own computed `line-height` would mean parsing a `calc()`
 * string, and reading the element's RESOLVED style would drag whichever value
 * the browser happened to compute into the CRDT.
 */
export declare function lineSpacingAttributes(value: unknown): Record<string, string>;
declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        canvasLineSpacing: {
            /**
             * Space the paragraphs in the selection.
             *
             * `'1'` UNSETS rather than storing `1`, so a paragraph returned to single
             * spacing carries no inline style at all and follows the paper — the same
             * rule the font picker's "Default" and the alignment's unset follow, and
             * the reason an untouched document stays untouched.
             */
            setLineSpacing: (spacing: LineSpacing) => ReturnType;
            /** Return the paragraphs in the selection to the paper's own leading. */
            unsetLineSpacing: () => ReturnType;
        };
    }
}
export declare const CanvasLineSpacing: Extension<CanvasLineSpacingOptions, any>;
export default CanvasLineSpacing;
//# sourceMappingURL=canvasLineSpacing.d.ts.map