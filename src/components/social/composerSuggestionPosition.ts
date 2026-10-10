/** A hidden command-prefix decoration has no rendered caret. Anchor its
 * suggestion to the visible editor, while preserving a real caret rectangle. */
export function visibleSuggestionRect(rect: DOMRect | null | undefined, boundary?: Pick<Element, 'getBoundingClientRect'> | null): DOMRect | null | undefined {
  return rect && rect.width === 0 && rect.height === 0 ? boundary?.getBoundingClientRect() ?? rect : rect;
}
