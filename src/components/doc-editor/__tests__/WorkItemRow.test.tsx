// Pins the one thing this row got wrong the first time.
//
// A remark about the document as a whole — "update this document to have a
// different header" — has no section, so the capture path files it as UNPLACED
// by construction. The predecessor of this component (`WorkItemInbox`) rendered
// only that unplaced case, and gave it a section picker and a dismiss button and
// nothing else. That meant the single example the feature was asked for could
// not be actioned at all: the only proposal shape that can change a header
// (`meta.title`) was reachable only from a remark already attached to a section
// it does not belong to.
//
// So: every remark can be drafted, placed or not. If this file goes green with
// the draft button removed from the unplaced branch, it is not testing anything.

import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import WorkItemRow from '../WorkItemRow';
import { selectValues } from '../../../test-utils/selectListbox';

const SECTIONS = [
  { id: 'sec-a', title: 'Executive Summary' },
  { id: 'sec-b', title: 'Action Items' },
];

function row(props: Partial<React.ComponentProps<typeof WorkItemRow>> = {}) {
  const onPropose = vi.fn();
  const onAttach = vi.fn();
  const onDismiss = vi.fn();
  render(
    <WorkItemRow
      itemId="ITEM1"
      utterance="Update this document to have a different header"
      unplaced
      sections={SECTIONS}
      onPropose={onPropose}
      onAttach={onAttach}
      onDismiss={onDismiss}
      {...props}
    />,
  );
  return { onPropose, onAttach, onDismiss };
}

describe('WorkItemRow', () => {
  it('offers to draft a change for an UNPLACED remark — the header case', () => {
    const { onPropose } = row();
    fireEvent.click(screen.getByTestId('work-item-ITEM1-propose'));
    expect(onPropose).toHaveBeenCalledTimes(1);
  });

  it('offers to draft a change for a PLACED remark too', () => {
    const { onPropose } = row({ unplaced: false, targetLabel: '“Executive Summary”' });
    fireEvent.click(screen.getByTestId('work-item-ITEM1-propose'));
    expect(onPropose).toHaveBeenCalledTimes(1);
  });

  it('still offers to file an unplaced remark under a section', () => {
    const { onAttach } = row();
    fireEvent.change(screen.getByTestId('work-item-ITEM1-file-under'), {
      target: { value: 'sec-b' },
    });
    expect(onAttach).toHaveBeenCalledWith('sec-b');
  });

  it('ranks candidates by score without printing the score', () => {
    const { onAttach } = row({
      sections: [...SECTIONS, { id: 'sec-c', title: 'Risks' }],
      candidates: [
        { sectionId: 'sec-b', sectionTitle: 'Action Items', score: 0.2, reason: 'weak match' },
        { sectionId: 'sec-a', sectionTitle: 'Executive Summary', score: 0.9, reason: 'named it' },
      ],
    });
    const buttons = screen.getAllByTestId('work-item-ITEM1-candidate');
    expect(buttons[0]!.textContent).toContain('Executive Summary');
    expect(buttons[1]!.textContent).toContain('Action Items');
    // Ordering only — a ranking heuristic must never read as a probability.
    expect(screen.queryByText(/0\.9|90%/)).toBeNull();

    fireEvent.click(buttons[0]!);
    expect(onAttach).toHaveBeenCalledWith('sec-a');

    // A section a candidate already names must not ALSO appear in the picker;
    // one no candidate names must.
    const picker = screen.getByTestId('work-item-ITEM1-file-under');
    const values = selectValues(picker);
    expect(values).not.toContain('sec-a');
    expect(values).not.toContain('sec-b');
    expect(values).toContain('sec-c');
  });

  it('does not offer filing controls on a placed remark', () => {
    row({ unplaced: false, targetLabel: '“Action Items”' });
    expect(screen.queryByTestId('work-item-ITEM1-file-under')).toBeNull();
    expect(screen.getByText('“Action Items”')).toBeTruthy();
  });

  it('surfaces a drafting failure on the row rather than swallowing it', () => {
    row({ draftError: 'the claude-code provider could not be reached: Not logged in' });
    expect(screen.getByTestId('work-item-ITEM1-draft-error').textContent).toContain(
      'Not logged in',
    );
  });

  it('reads as busy and refuses a second draft while one is in flight', () => {
    const { onPropose } = row({ drafting: true });
    const button = screen.getByTestId('work-item-ITEM1-propose') as HTMLButtonElement;
    expect(button.textContent).toContain('Drafting');
    expect(button.disabled).toBe(true);
    fireEvent.click(button);
    expect(onPropose).not.toHaveBeenCalled();
  });

  it('says the screen moved, so a split context is never a silent one', () => {
    row({ contextSplit: true, reason: 'the speaker changed tabs mid-sentence' });
    expect(screen.getByTestId('work-item-ITEM1-split')).toBeTruthy();
    expect(screen.getByText('the speaker changed tabs mid-sentence')).toBeTruthy();
  });

  it('dismisses', () => {
    const { onDismiss } = row();
    fireEvent.click(screen.getByTestId('work-item-ITEM1-dismiss'));
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });
});
