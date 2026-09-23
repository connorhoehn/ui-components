// canvasListStyle — the marker a list draws: disc / circle / square bullets,
// 1. / a. / A. / i. / I. numbering, and two multilevel presets that change
// the marker per nesting level. Since 2.386.3.
//
// An attribute on the LIST node (`bulletList`, `orderedList`), rendered as
// `data-list-style`; `styles.css` maps each value to `list-style-type`, the
// multilevel ones through descendant selectors. No inline style: the value is
// a closed set, so a class-free attribute selector covers it, and a client
// that has never heard of the attribute still renders the list with its
// default marker.

import { Extension } from '@tiptap/core';

export const BULLET_STYLES = ['disc', 'circle', 'square'] as const;
export const NUMBER_STYLES = ['decimal', 'lower-alpha', 'upper-alpha', 'lower-roman', 'upper-roman'] as const;
/** Multilevel presets: the marker changes at each nesting level. */
export const MULTILEVEL_STYLES = ['tiered-bullets', 'outline'] as const;

export type BulletStyle = (typeof BULLET_STYLES)[number];
export type NumberStyle = (typeof NUMBER_STYLES)[number];
export type MultilevelStyle = (typeof MULTILEVEL_STYLES)[number];
export type ListStyle = BulletStyle | NumberStyle | MultilevelStyle;

/** Menu words for each value. */
export const LIST_STYLE_LABELS: Record<ListStyle, string> = {
  disc: '● Filled circle',
  circle: '○ Hollow circle',
  square: '■ Square',
  decimal: '1. 2. 3.',
  'lower-alpha': 'a. b. c.',
  'upper-alpha': 'A. B. C.',
  'lower-roman': 'i. ii. iii.',
  'upper-roman': 'I. II. III.',
  'tiered-bullets': '● ○ ■  Bullets by level',
  outline: '1. a. i.  Outline by level',
};

const ALL: readonly string[] = [...BULLET_STYLES, ...NUMBER_STYLES, ...MULTILEVEL_STYLES];

export function parseListStyle(value: unknown): ListStyle | null {
  return typeof value === 'string' && ALL.includes(value) ? (value as ListStyle) : null;
}

/** Which list node a style belongs to. */
export function listTypeFor(style: ListStyle): 'bulletList' | 'orderedList' {
  return (BULLET_STYLES as readonly string[]).includes(style) || style === 'tiered-bullets' ? 'bulletList' : 'orderedList';
}

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

export const CanvasListStyle = Extension.create({
  name: 'canvasListStyle',

  addGlobalAttributes() {
    return [
      {
        types: ['bulletList', 'orderedList'],
        attributes: {
          listStyle: {
            default: null,
            parseHTML: (element) => parseListStyle(element.getAttribute('data-list-style')),
            renderHTML: (attributes) => {
              const style = parseListStyle(attributes['listStyle']);
              return style ? { 'data-list-style': style } : {};
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setListStyle:
        (style) =>
        ({ chain, editor }) => {
          if (!parseListStyle(style)) return false;
          const type = listTypeFor(style);
          const c = chain();
          if (!editor.isActive(type)) {
            if (type === 'bulletList') c.toggleBulletList();
            else c.toggleOrderedList();
          }
          return c.updateAttributes(type, { listStyle: style }).run();
        },
    };
  },
});

export default CanvasListStyle;
