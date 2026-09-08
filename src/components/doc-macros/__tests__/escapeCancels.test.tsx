// Escape must discard an inline edit, not commit it.
//
// The obvious implementation commits. `setDraft(original)` schedules a React
// state update; `e.target.blur()` fires its handler SYNCHRONOUSLY, before that
// update is applied — so the `onBlur` closure still holds the pre-Escape draft,
// finds it different from the original, and writes exactly what Escape was
// supposed to throw away.
//
// Nothing errors and nothing looks wrong until you read the value back. These
// tests fail against a closure-read commit and pass against `useDraft`'s
// ref-backed read.

import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ActionItemsBlock } from '../ActionItemsBlock';
import { readActionItems } from '../actionItemsText';

const SOURCE = ['items:', '  - text: Ada', '    status: todo'].join('\n');

function mount(onTextChange: (id: string, text: string) => void) {
  const items = readActionItems(SOURCE)!;
  return render(
    <ActionItemsBlock
      items={items}
      editable
      onTextChange={onTextChange}
      onToggle={vi.fn()}
    />,
  );
}

describe('Escape cancels an action item edit', () => {
  it('does not commit the discarded keystrokes', async () => {
    const onTextChange = vi.fn();
    mount(onTextChange);

    const input = screen.getByLabelText('Action item text') as HTMLInputElement;
    await userEvent.click(input);
    await userEvent.type(input, 'x');
    // Before the fix this wrote "Adax" — the edit Escape was cancelling.
    await userEvent.keyboard('{Escape}');

    expect(onTextChange).not.toHaveBeenCalled();
  });

  it('still commits a real edit on blur', async () => {
    // The cancel path must not have been bought by breaking the commit path.
    const onTextChange = vi.fn();
    mount(onTextChange);

    const input = screen.getByLabelText('Action item text') as HTMLInputElement;
    await userEvent.click(input);
    await userEvent.type(input, 'x');
    await userEvent.tab();

    expect(onTextChange).toHaveBeenCalledWith(expect.anything(), 'Adax');
  });

  it('commits on Enter', async () => {
    const onTextChange = vi.fn();
    mount(onTextChange);

    const input = screen.getByLabelText('Action item text') as HTMLInputElement;
    await userEvent.click(input);
    await userEvent.type(input, '!');
    await userEvent.keyboard('{Enter}');

    expect(onTextChange).toHaveBeenCalledWith(expect.anything(), 'Ada!');
  });

  it('leaves the text alone when nothing was typed', async () => {
    const onTextChange = vi.fn();
    mount(onTextChange);

    const input = screen.getByLabelText('Action item text') as HTMLInputElement;
    await userEvent.click(input);
    await userEvent.tab();

    expect(onTextChange).not.toHaveBeenCalled();
  });
});
