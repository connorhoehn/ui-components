// src/components/doc-editor/canvasLineSpacing.ts
//
// Line spacing for a paragraph, measured in GRID ROWS.
//
// ## Why this exists when Tiptap already ships `setLineHeight`
//
// It does, and it is already registered here: `TextStyleKit` bundles
// `@tiptap/extension-text-style`'s `LineHeight` unless you configure it away, so
// `editor.commands.setLineHeight` is live on this canvas today. Measured on a
// real page-shaped document, `setLineHeight('2')` over a selection produces
//
//     <p><span style="line-height: 2">…</span></p>
//
// and that is wrong here twice over:
//
//   1. It is an INLINE MARK. `line-height` on a span raises the line box it sits
//      on and cannot lower it below the block's own strut, so the control can
//      only ever add space, never remove it, and a partial selection spaces
//      SOME of a paragraph's lines. Line spacing is a paragraph property in
//      every word processor because that is the only thing it can honestly be.
//   2. Its unit is the FONT SIZE. This paper's single spacing is 26.4px on 16px
//      type — 1.65em — so Tiptap's "2" is 32px: 1.21x the paper's own leading,
//      not 2x. A control labelled "Double" that produces 1.21x is a lie, and it
//      is off the baseline grid by 5.6px per line into the bargain (measured: a
//      211.25px eight-line paragraph, exactly 8 rows, became 256px — 9.697
//      rows).
//
// So the value stored here is a MULTIPLE OF `--doc-line`, the paper's own grid
// row, and it lands on the block. `1.5` means one and a half rows, not one and
// a half em.
//
// ## What it does to the baseline grid, and why that is contained
//
// `styles.css` is emphatic that every block height on a paginated page must be
// a whole number of `--doc-line`, or the grid drifts for the rest of the
// document and page seams start cutting text. A paragraph at 1.5 rows per line
// is on the grid only when it wraps to an even number of lines, so this
// deliberately breaks that rule — locally, and only where a person asked for it.
//
// It is contained because `flowCanvasPages` re-snaps EVERY on-grid block's top:
// `if (b.onGrid) move(gridSnap(top, line))` runs before anything else in the
// loop, so the block after a 1.5-spaced paragraph starts on a row again and the
// drift never accumulates. The cost is up to one row of extra white space after
// such a paragraph, paid once, by the paragraph that asked for it.
//
// That is also why the calc below is INLINE and not a rule in `styles.css`:
// `CanvasDocumentView.pagination.test.tsx` fails the build on any
// `calc(var(--doc-line) * N)` with a fractional N in that stylesheet, and it
// should — the paper's OWN typography must stay whole-row. An opt-in override
// on one paragraph is a different claim, and the flow is what makes it safe.
//
// ## Why 1.15 and "add space before/after paragraph" are not here
//
// 1.15 rows is 30.36px, which coincides with the grid only every twentieth
// line. Every paragraph would therefore end at an arbitrary fraction of a row
// and the flow would spend up to a whole row closing the gap — a spacing
// control whose most visible effect is UNEVEN GAPS BETWEEN PARAGRAPHS. It also
// buys least here: Google Docs offers 1.15 because its single spacing is
// ~1.15em and tight; this paper's is 1.65em and already airy.
//
// "Add space before / after paragraph" is a points field in Docs. On this grid
// it can only be a whole row, and a paginated paragraph already carries a full
// row of space after it (26.4px, up from the 14.4px an unpaginated page uses).
// The only setting it could offer is "double an already-doubled gap", which is
// not the control anyone is reaching for.
//
// ## The export tradeoff, same as `textAlign`
//
// Markdown cannot express line spacing, and `pmModel.ts` reads paragraph
// CONTENT and never paragraph attributes. So this replicates over the CRDT,
// survives undo and reload, renders for every collaborator — and is gone the
// moment the document is serialised to markdown. Losing a presentation property
// at the export boundary beats writing raw HTML into a file the chassis then
// degrades to a code block.

import { Extension } from '@tiptap/core';

/**
 * The spacings offered, as multiples of one grid row.
 *
 * `'1'` is the paper's own leading and is stored as ABSENCE — see
 * `setLineSpacing`. Strings rather than numbers so the stored value, the
 * `data-line-spacing` attribute and the menu's radio state are all one type and
 * `1.5` never arrives back as `1.4999999999999998`.
 */
export const LINE_SPACINGS = ['1', '1.5', '2'] as const;

export type LineSpacing = (typeof LINE_SPACINGS)[number];

/** What each value is called in the menu — Google Docs' words, where it has them. */
export const LINE_SPACING_LABELS: Record<LineSpacing, string> = {
  '1': 'Single',
  '1.5': '1.5',
  '2': 'Double',
};

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

export function isLineSpacing(value: unknown): value is LineSpacing {
  return typeof value === 'string' && (LINE_SPACINGS as readonly string[]).includes(value);
}

/**
 * The stored value for something read off the DOM, or `null` for anything else.
 *
 * Narrowed to the closed set at the boundary for the same reason `textAlign`
 * narrows there: pasted HTML carries `line-height: normal`, `120%`, `inherit`
 * and worse, and storing those verbatim would put values in the CRDT that no
 * command can produce and every future reader has to defend against.
 */
export function parseLineSpacing(value: unknown): LineSpacing | null {
  return isLineSpacing(value) ? value : null;
}

/**
 * The rendered attributes for a spacing, or nothing when it is the default.
 *
 * `--doc-line` is defined on `.doc-page--paginated`; the `1.65em` fallback is
 * the same leading expressed against the element's own font size, so an
 * unpaginated page (or a section editor, which shares this schema) gets a
 * proportional result rather than an unresolved `calc`.
 *
 * `data-line-spacing` carries the value because it is what `parseHTML` reads
 * back: parsing our own computed `line-height` would mean parsing a `calc()`
 * string, and reading the element's RESOLVED style would drag whichever value
 * the browser happened to compute into the CRDT.
 */
export function lineSpacingAttributes(value: unknown): Record<string, string> {
  const spacing = parseLineSpacing(value);
  if (!spacing || spacing === '1') return {};
  return {
    'data-line-spacing': spacing,
    style: `line-height: calc(var(--doc-line, 1.65em) * ${spacing})`,
  };
}

// Namespaced `canvasLineSpacing` for the same reason the align extension
// namespaces its own: a Tiptap `Commands` key is global to the program. The
// name `lineHeight` is already taken — by the extension inside `TextStyleKit`
// that this one exists to replace — so both the extension name and the commands
// are deliberately different words, and "spacing" is what the menu says anyway.
declare module '@tiptap/core' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
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

export const CanvasLineSpacing = Extension.create<CanvasLineSpacingOptions>({
  name: 'canvasLineSpacing',

  addOptions() {
    return { types: ['paragraph'] };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          lineSpacing: {
            default: null,
            parseHTML: (element) => parseLineSpacing(element.getAttribute('data-line-spacing')),
            renderHTML: (attributes) => lineSpacingAttributes(attributes['lineSpacing']),
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setLineSpacing:
        (spacing) =>
        ({ commands }) => {
          if (!isLineSpacing(spacing)) return false;
          if (spacing === '1') return commands.unsetLineSpacing();
          // `some`, not `every`: `updateAttributes` reports false for a type it
          // found nothing to update, so `every` would report failure whenever
          // the option list grows past the one node the selection is in.
          return this.options.types
            .map((type) => commands.updateAttributes(type, { lineSpacing: spacing }))
            .some(Boolean);
        },

      unsetLineSpacing:
        () =>
        ({ commands }) =>
          this.options.types
            .map((type) => commands.resetAttributes(type, 'lineSpacing'))
            .some(Boolean),
    };
  },
});

export default CanvasLineSpacing;
