// Drag-handle presence + cross-page move for the wizard's multi-page layout.
//
// Ported from realtime-examples/frontend on 2026-09-07 as part of bringing
// these pages into the library. One assertion changed shape in the port and
// the change is the point: the app's version read
// `handle.getAttribute('style')` and matched /grab/, which only passed
// because the app's fork sets `cursor: 'grab'` as an inline style. The
// library's handles carry `cursor-grab` as a class, so the assertion is on
// the class instead. Asserting on inline style was asserting on the styling
// mechanism, not on the affordance.
//
// jsdom doesn't fire PointerEvents the way @dnd-kit's sensors expect, so
// these cover the DOM-level affordances (handles rendered, sortable items
// present) and the state outcomes (button reorder works, schema persists).
// Full drag-gesture coverage belongs to Playwright.

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DocumentTypeWizard } from '../DocumentTypeWizard';

async function gotoStep2(user: ReturnType<typeof userEvent.setup>, name: string) {
  await user.type(screen.getByTestId('name-input'), name);
  await user.click(screen.getByTestId('wizard-next'));
}

async function makeMultipageWizard() {
  const user = userEvent.setup();
  render(<DocumentTypeWizard onSave={vi.fn()} onCancel={vi.fn()} />);
  await gotoStep2(user, 'DragTest');
  // A section so the page isn't empty (cross-page drag needs at least one
  // section in scope).
  await user.click(screen.getByTestId('add-field-tasks'));
  // A 2nd page so the multi-page render path activates.
  await user.click(screen.getByTestId('add-page'));
  return { user };
}

describe('DocumentTypeWizard — drag-and-drop affordances', () => {
  it('renders a drag handle on each page header in multi-page mode', async () => {
    await makeMultipageWizard();
    const handles = screen.getAllByTestId(/^page-drag-handle-/);
    expect(handles.length).toBe(2);
    expect(handles[0].tagName).toBe('BUTTON');
    expect(handles[0].className).toMatch(/cursor-grab/);
  });

  it('renders a drag handle per section within each page', async () => {
    await makeMultipageWizard();
    const handles = screen.getAllByTestId(/^section-drag-handle-/);
    expect(handles.length).toBeGreaterThanOrEqual(1);
    expect(handles[0].className).toMatch(/cursor-grab/);
  });

  it('keeps the button-based reorder controls (accessibility fallback)', async () => {
    await makeMultipageWizard();
    expect(screen.getAllByTestId(/^page-up-/).length).toBe(2);
    expect(screen.getAllByTestId(/^page-down-/).length).toBe(2);
    expect(screen.getAllByTestId(/^section-move-page-/).length).toBeGreaterThanOrEqual(1);
  });

  it('cross-page move via the select still updates pages.sectionIds', async () => {
    const onSave = vi.fn();
    const user = userEvent.setup();
    render(<DocumentTypeWizard onSave={onSave} onCancel={vi.fn()} />);
    await gotoStep2(user, 'CrossPage');
    await user.click(screen.getByTestId('add-field-tasks'));
    await user.click(screen.getByTestId('add-page'));

    const sectionMove = screen.getAllByTestId(/^section-move-page-/)[0] as HTMLSelectElement;
    const optionValues = Array.from(sectionMove.options).map((o) => o.value);
    expect(optionValues.length).toBeGreaterThanOrEqual(2);
    await user.selectOptions(sectionMove, optionValues[1]);

    await user.click(screen.getByTestId('wizard-next')); // step 2 -> 3
    await user.click(screen.getByTestId('wizard-next')); // step 3 -> save
    expect(onSave).toHaveBeenCalled();
    const payload = onSave.mock.calls[0][0] as { pages: { id: string; sectionIds: string[] }[] };
    expect(payload.pages[0].sectionIds.length).toBe(0);
    expect(payload.pages[1].sectionIds.length).toBe(1);
  });
});
