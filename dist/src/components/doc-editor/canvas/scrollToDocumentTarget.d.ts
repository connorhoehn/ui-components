export interface DocumentTarget {
    /** Legacy landmark: the section this item belongs to. Empty on a canvas. */
    sectionId?: string | null;
    /** Canvas landmark: the comment thread whose highlight sits in the page. */
    commentId?: string | null;
}
/**
 * The element a target points at, on whichever shape this document is.
 *
 * Section first: on a legacy document the section is the more specific answer,
 * and a legacy comment carries a section id anyway. A canvas comment carries an
 * empty section id by construction, so the fall-through is the canvas path —
 * and a CONVERTED document, whose old comments still carry section ids that no
 * longer render, falls through too rather than giving up at the first miss.
 */
export declare function findDocumentTarget(target: DocumentTarget, root?: ParentNode): HTMLElement | null;
/**
 * Scroll to the target and flash it.
 *
 * Returns whether anything was found, so a caller can tell "navigated" from
 * "there was nowhere to go" instead of assuming the former — which is how this
 * failed silently for the whole life of the canvas.
 */
export declare function scrollToDocumentTarget(target: DocumentTarget, root?: ParentNode): boolean;
//# sourceMappingURL=scrollToDocumentTarget.d.ts.map