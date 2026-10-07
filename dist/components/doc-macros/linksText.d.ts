import { type TextRangeEdit } from './macroListText';
/** The `macro:<name>` discriminator for a reference list. */
export declare const LINKS_MACRO_NAME = "links";
/** One row of the list. */
export interface LinkRow {
    /** Position in `links`, 0-based. */
    index: number;
    /** The `label:` scalar. `''` when the row has none. */
    label: string;
    /** The `url:` scalar VERBATIM — not validated. See `linkHref`. */
    url: string;
}
/**
 * The `href` a row may be given, or `null` when it must render as text.
 *
 * A bare `example.com/x` is accepted and promoted to `https://` — a person
 * typing a link into a field means a link, and refusing it over a missing
 * scheme would be pedantry that shows them plain grey text instead.
 */
export declare function linkHref(url: string): string | null;
/**
 * The list a macro body describes, or `null` when the body is not the shape
 * this renderer edits — in which case the node view shows the fence.
 */
export declare function readLinks(source: string): LinkRow[] | null;
/** Retitling one row, as an edit. */
export declare function setLinkLabelEdit(source: string, index: number, label: string): TextRangeEdit | null;
/** Repointing one row, as an edit. Stored verbatim; safety is at render. */
export declare function setLinkUrlEdit(source: string, index: number, url: string): TextRangeEdit | null;
/** The edit that removes one row. Removing the last writes `links: []`. */
export declare function removeLinkEdit(source: string, index: number): TextRangeEdit | null;
/**
 * The edit that appends a row.
 *
 * Both keys are always written, even empty, so the row has two entries from
 * the start: `removeListItemKeyEdit` declines to strip an item's only entry
 * (it would leave a bare `-` marker), and a row that began with one key would
 * therefore be uneditable in one direction.
 */
export declare function addLinkEdit(source: string, label?: string, url?: string): TextRangeEdit | null;
/**
 * The macro body for a reference list — byte-identical to what the chassis
 * serializer writes between the fences, with no trailing newline (the closing
 * fence supplies the final break).
 */
export declare function linksMacroText(rows: readonly {
    label?: string;
    url?: string;
}[]): string;
//# sourceMappingURL=linksText.d.ts.map