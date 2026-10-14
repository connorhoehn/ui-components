// Test helpers for the library Select (a custom listbox since 2.445.0, no
// platform <select>). A trigger is `role="combobox"` with `data-ui-control="select"`;
// its options exist only while it is open, in a portal.
import { fireEvent, within, screen } from '@testing-library/react';

export interface ListboxOption { value: string; label: string; disabled: boolean; selected: boolean; group?: string }

/** Open the select, read its options (value, label, disabled, selected), close it again. */
export function readSelectOptions(trigger: HTMLElement): ListboxOption[] {
  const wasOpen = trigger.getAttribute('aria-expanded') === 'true';
  if (!wasOpen) fireEvent.click(trigger);
  const listId = trigger.getAttribute('aria-controls');
  const list = listId ? document.getElementById(listId) : null;
  // A select with no options (or a disabled one) opens nothing: it has no options to read.
  if (!list) return [];
  let group: string | undefined;
  const out: ListboxOption[] = [];
  for (const li of Array.from(list.children) as HTMLElement[]) {
    if (li.getAttribute('role') === 'presentation') { group = li.textContent ?? undefined; continue; }
    if (li.getAttribute('role') !== 'option') continue;
    const label = li.querySelector('span.truncate')?.textContent ?? li.textContent ?? '';
    out.push({ value: li.dataset.value ?? '', label, disabled: li.getAttribute('aria-disabled') === 'true', selected: li.getAttribute('aria-selected') === 'true', ...(group ? { group } : {}) });
  }
  if (!wasOpen) fireEvent.keyDown(trigger, { key: 'Escape' });
  return out;
}

/** The option values, in order. */
export const selectValues = (trigger: HTMLElement): string[] => readSelectOptions(trigger).map((o) => o.value);
/** The option labels, in order. */
export const selectLabels = (trigger: HTMLElement): string[] => readSelectOptions(trigger).map((o) => o.label);

/** Choose an option by value (what a user's click does). */
export function chooseOption(trigger: HTMLElement, value: string): void {
  fireEvent.change(trigger, { target: { value } });
}

/** Choose an option by its visible label, through the open list. */
export function chooseOptionByLabel(trigger: HTMLElement, label: string): void {
  fireEvent.click(trigger);
  const listId = trigger.getAttribute('aria-controls')!;
  const list = document.getElementById(listId)!;
  fireEvent.mouseDown(within(list).getByRole('option', { name: label }));
}

/** The trigger's current value (`data-value`). */
export const selectValue = (trigger: HTMLElement): string => trigger.getAttribute('data-value') ?? '';

/** Find a select trigger by its accessible name. */
export const getSelect = (name: string | RegExp): HTMLElement => screen.getByRole('combobox', { name });
