import { Extension } from '@tiptap/core';
export declare const BULLET_STYLES: readonly ['disc', 'circle', 'square'];
export declare const NUMBER_STYLES: readonly ['decimal', 'lower-alpha', 'upper-alpha', 'lower-roman', 'upper-roman'];
/** Multilevel presets: the marker changes at each nesting level. */
export declare const MULTILEVEL_STYLES: readonly ['tiered-bullets', 'outline'];
export type BulletStyle = (typeof BULLET_STYLES)[number];
export type NumberStyle = (typeof NUMBER_STYLES)[number];
export type MultilevelStyle = (typeof MULTILEVEL_STYLES)[number];
export type ListStyle = BulletStyle | NumberStyle | MultilevelStyle;
/** Menu words for each value. */
export declare const LIST_STYLE_LABELS: Record<ListStyle, string>;
export declare function parseListStyle(value: unknown): ListStyle | null;
/** Which list node a style belongs to. */
export declare function listTypeFor(style: ListStyle): 'bulletList' | 'orderedList';
declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        canvasListStyle: {
            /**
             * Make the caret's block a list of the style's kind (if it is not one
             * already) and set its marker.
             */
            setListStyle: (style: ListStyle) => ReturnType;
        };
    }
}
export declare const CanvasListStyle: Extension<any, any>;
export default CanvasListStyle;
//# sourceMappingURL=canvasListStyle.d.ts.map