// "Take me to that" — on BOTH document shapes.
//
// A legacy document renders one element per section with the id
// `section-<id>` (see SectionBlock, ReaderSectionCard, ReviewMode), and every
// navigation in this tree was written against that id. A canvas renders no such
// element: it is one continuous page, and a comment is anchored to a text RANGE
// rather than to a section. So on a page-shaped document every one of those
// calls became `getElementById('section-')` → null → nothing happened. The row
// in My Items still highlighted on hover; the click just did nothing, forever,
// with no error anywhere.
//
// The canvas's equivalent landmark is the highlight span the comment extension
// paints, which carries `data-comment-id` (realtime-modules' CommentHighlight,
// and this package's CommentGhostPopover reads the same attribute). This takes
// both landmarks and uses whichever the document in front of it actually has,
// so a caller never has to know the shape.

/** How long the "here it is" flash stays on the target. */
const FLASH_MS = 2000;

/**
 * The ring colour.
 *
 * A literal rather than a token because it is written to `style.boxShadow` at
 * runtime, where a `var(--color-info)` reference would resolve against whatever
 * element it lands on — and because this is the exact ring the section path has
 * flashed since before the canvas existed.
 */
const FLASH_RING = '0 0 0 3px #3b82f640';

export interface DocumentTarget {
  /** Legacy landmark: the section this item belongs to. Empty on a canvas. */
  sectionId?: string | null;
  /** Canvas landmark: the comment thread whose highlight sits in the page. */
  commentId?: string | null;
}

/** Quote a value for use inside an attribute selector. */
function q(value: string): string {
  return value.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
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
export function findDocumentTarget(
  target: DocumentTarget,
  root: ParentNode = document,
): HTMLElement | null {
  const { sectionId, commentId } = target;

  if (sectionId) {
    const el = root.querySelector<HTMLElement>(`[id="section-${q(sectionId)}"]`);
    if (el) return el;
  }

  if (commentId) {
    const el = root.querySelector<HTMLElement>(`[data-comment-id="${q(commentId)}"]`);
    if (el) return el;
  }

  return null;
}

/**
 * Scroll to the target and flash it.
 *
 * Returns whether anything was found, so a caller can tell "navigated" from
 * "there was nowhere to go" instead of assuming the former — which is how this
 * failed silently for the whole life of the canvas.
 */
export function scrollToDocumentTarget(
  target: DocumentTarget,
  root: ParentNode = document,
): boolean {
  const el = findDocumentTarget(target, root);
  if (!el) return false;

  // jsdom has no layout, so it has no scrollIntoView. Guarded rather than
  // mocked in every test that touches this path.
  el.scrollIntoView?.({ behavior: 'smooth', block: 'center' });
  el.style.transition = 'box-shadow 0.3s ease';
  el.style.boxShadow = FLASH_RING;
  setTimeout(() => {
    el.style.boxShadow = '';
  }, FLASH_MS);

  return true;
}
