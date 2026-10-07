/** A rail item's label: 13px, medium weight, 20px line. */
export declare const RAIL_ITEM_TEXT = "text-[13px] font-medium leading-5";
/** Vertical padding that puts a one-line rail row on a 36px pitch (8 + 20 + 8). */
export declare const RAIL_ROW_PAD_Y = "py-2";
/** The one-line row pitch in px, for hosts that cap a list by row count. */
export declare const RAIL_ROW_PITCH = 36;
/** A count at an item's right edge ("Initiatives 3"): muted, tabular. */
export declare const RAIL_ITEM_COUNT = "text-[12px] font-medium leading-4 tabular-nums text-text-tertiary";
/**
 * A group heading ("PLAN", "IN PROGRESS"): 11px semibold uppercase,
 * letter-spaced. Ink is separate (`RAIL_GROUP_LABEL_INK`) so a dark rail can
 * swap it without fighting class order.
 */
export declare const RAIL_GROUP_LABEL = "text-[11px] font-semibold uppercase leading-4 tracking-wide";
/** The default ink of a group heading. */
export declare const RAIL_GROUP_LABEL_INK = "text-text-secondary";
/**
 * A group heading's count ("IN PROGRESS … 9"): plain muted text at the label's
 * size, never a pill — the heading already says what it counts.
 */
export declare const RAIL_GROUP_COUNT = "text-[11px] font-medium leading-4 normal-case tracking-normal tabular-nums text-text-tertiary";
/** Padding that puts a group heading (20px caret box) on the same 36px pitch. */
export declare const RAIL_GROUP_PAD_Y = "py-2";
/** A rail's caption ("INITIATIVES 11"): 12px semibold uppercase, spaced. */
export declare const RAIL_CAPTION = "text-[12px] font-semibold uppercase tracking-[0.06em]";
/** The selected row's fill. The 3px primary edge bar goes with it. */
export declare const RAIL_CURRENT_FILL = "bg-primary/8";
/** Everything above, as one object — `railType.item`, `railType.groupLabel`… */
export declare const railType: {
    readonly item: "text-[13px] font-medium leading-5";
    readonly rowPadY: "py-2";
    readonly rowPitch: 36;
    readonly itemCount: "text-[12px] font-medium leading-4 tabular-nums text-text-tertiary";
    readonly groupLabel: "text-[11px] font-semibold uppercase leading-4 tracking-wide";
    readonly groupLabelInk: "text-text-secondary";
    readonly groupCount: "text-[11px] font-medium leading-4 normal-case tracking-normal tabular-nums text-text-tertiary";
    readonly groupPadY: "py-2";
    readonly caption: "text-[12px] font-semibold uppercase tracking-[0.06em]";
    readonly currentFill: "bg-primary/8";
};
/** The disclosure caret every rail group heading wears: 14px, down when open. */
export declare function RailCaretIcon({ open, className }: {
    open: boolean;
    className?: string;
}): import("react").JSX.Element;
//# sourceMappingURL=railType.d.ts.map