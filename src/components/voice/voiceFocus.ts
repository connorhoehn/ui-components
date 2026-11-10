// The voice cards' focus rule (2.519.0).
//
// A card opens because the assistant asked for something, not because the
// person pressed anything — it can open while they are typing in a composer,
// a search box or a note. Taking focus then would send their next Enter to
// the card. So a card never takes focus from a field someone is typing in;
// the live region announces it instead.

/** Whether `el` takes typed text: an input, a textarea, a select or a contenteditable. */
export function isEditableElement(el: Element | null | undefined): boolean {
  if (!el || !(el instanceof HTMLElement)) return false;
  if (el.isContentEditable || el.closest('[contenteditable=""], [contenteditable="true"]')) return true;
  if (el instanceof HTMLTextAreaElement || el instanceof HTMLSelectElement) return true;
  if (el instanceof HTMLInputElement) {
    return !['button', 'submit', 'reset', 'checkbox', 'radio', 'range', 'color', 'file', 'image', 'hidden'].includes(el.type);
  }
  return false;
}

/** Whether a card mounting at `container` may move focus to itself: never away from an editable field outside it. */
export function mayTakeFocus(container: HTMLElement | null): boolean {
  if (typeof document === 'undefined' || !container) return false;
  const active = document.activeElement;
  if (active && container.contains(active)) return false;
  return !isEditableElement(active);
}
