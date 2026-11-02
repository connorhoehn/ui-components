import { fireEvent, screen, within } from '@testing-library/react';

/** Open the actions belonging to one message, as a pointer/keyboard user would. */
export function openMessageActions(row: HTMLElement): HTMLElement {
  const trigger = within(row).getByRole('button', { name: 'Message actions' });
  if (trigger.getAttribute('aria-expanded') !== 'true') {
    fireEvent.keyDown(document, { key: 'Escape' });
    fireEvent.click(trigger);
  }
  return screen.getByRole('dialog', { name: 'Message actions' });
}
