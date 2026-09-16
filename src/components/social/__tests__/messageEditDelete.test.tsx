import { render, screen, cleanup, fireEvent, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ChatPanel } from '../ChatPanel';
import { InlineMessageEditor } from '../InlineMessageEditor';

afterEach(cleanup);

const mine = { id: 'm1', clientId: 'c1', userId: 'eve', displayName: 'Eve', content: 'first draft', timestamp: '2026-09-16T08:00:00.000Z' };
const theirs = { id: 'm2', clientId: 'c2', userId: 'carol', displayName: 'Carol', content: 'hello', timestamp: '2026-09-16T08:01:00.000Z' };
const deleted = { id: 'm3', clientId: 'c1', userId: 'eve', displayName: 'Eve', content: '', timestamp: '2026-09-16T08:02:00.000Z', deletedAt: '2026-09-16T08:03:00.000Z', metadata: { deleted: true } };
const card = { id: 'm4', clientId: 'c1', userId: 'eve', displayName: 'Eve', content: 'Recording', timestamp: '2026-09-16T08:04:00.000Z', metadata: { kind: 'recording', recordingId: 'r1' } };

function panel(extra: Record<string, unknown> = {}) {
  return render(
    <ChatPanel
      messages={[mine, theirs, deleted, card] as never}
      currentUserId="eve"
      onSend={vi.fn()}
      onEditMessage={vi.fn()}
      onDeleteMessage={vi.fn()}
      {...extra}
    />,
  );
}

function rowOf(id: string): HTMLElement {
  const el = document.querySelector(`[data-message-id="${id}"]`);
  if (!el) throw new Error(`no row ${id}`);
  return el as HTMLElement;
}

describe('edit and delete on own messages', () => {
  it('offers Edit and Delete only on own, undeleted, plain messages', () => {
    panel();
    expect(rowOf('m1').querySelector('[aria-label="Edit message"]')).toBeTruthy();
    expect(rowOf('m1').querySelector('[aria-label="Delete message"]')).toBeTruthy();
    expect(rowOf('m2').querySelector('[aria-label="Edit message"]')).toBeNull();
    expect(rowOf('m2').querySelector('[aria-label="Delete message"]')).toBeNull();
    // A deleted message has no action bar at all; a card has no edit.
    expect(rowOf('m3').querySelector('[data-testid="message-actions"]')).toBeNull();
    expect(rowOf('m4').querySelector('[aria-label="Edit message"]')).toBeNull();
  });

  it('shows a deleted message as a placeholder in the author\'s place', () => {
    panel();
    expect(rowOf('m3').textContent).toContain('This message was deleted.');
    expect(rowOf('m3').querySelector('[data-testid="message-row-author"]')?.textContent).toBe('Eve');
  });

  it('marks an edited message', () => {
    render(<ChatPanel messages={[{ ...mine, editedAt: '2026-09-16T08:10:00.000Z' }] as never} currentUserId="eve" onSend={vi.fn()} />);
    expect(screen.getByTestId('message-row-edited').textContent).toBe('(edited)');
  });

  it('edits in place and hands the text to the host', async () => {
    const onEditMessage = vi.fn().mockResolvedValue(undefined);
    panel({ onEditMessage });
    fireEvent.click(rowOf('m1').querySelector('[aria-label="Edit message"]')!);
    const input = screen.getByTestId('message-editor-input') as HTMLTextAreaElement;
    expect(input.value).toBe('first draft');
    expect((screen.getByTestId('message-editor-save') as HTMLButtonElement).disabled).toBe(true);
    fireEvent.change(input, { target: { value: 'second draft' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    await waitFor(() => expect(onEditMessage).toHaveBeenCalledWith(expect.objectContaining({ id: 'm1' }), 'second draft'));
    await waitFor(() => expect(screen.queryByTestId('message-editor')).toBeNull());
  });

  it('Escape cancels without saving', () => {
    const onEditMessage = vi.fn();
    panel({ onEditMessage });
    fireEvent.click(rowOf('m1').querySelector('[aria-label="Edit message"]')!);
    const input = screen.getByTestId('message-editor-input');
    fireEvent.change(input, { target: { value: 'changed' } });
    fireEvent.keyDown(input, { key: 'Escape' });
    expect(screen.queryByTestId('message-editor')).toBeNull();
    expect(onEditMessage).not.toHaveBeenCalled();
    expect(rowOf('m1').textContent).toContain('first draft');
  });

  it('asks before deleting, then hands the message to the host', async () => {
    const onDeleteMessage = vi.fn().mockResolvedValue(undefined);
    panel({ onDeleteMessage });
    fireEvent.click(rowOf('m1').querySelector('[aria-label="Delete message"]')!);
    expect(screen.getByText('Delete this message?')).toBeTruthy();
    fireEvent.click(screen.getByTestId('confirm-dialog-confirm'));
    await waitFor(() => expect(onDeleteMessage).toHaveBeenCalledWith(expect.objectContaining({ id: 'm1' })));
  });
});

describe('InlineMessageEditor', () => {
  it('Shift+Enter is a newline, not a save; a refusal shows inline', async () => {
    const onSave = vi.fn().mockRejectedValue(new Error('too late to edit'));
    render(<InlineMessageEditor initialText="a" onSave={onSave} onCancel={vi.fn()} />);
    const input = screen.getByTestId('message-editor-input');
    fireEvent.change(input, { target: { value: 'ab' } });
    fireEvent.keyDown(input, { key: 'Enter', shiftKey: true });
    expect(onSave).not.toHaveBeenCalled();
    fireEvent.click(screen.getByTestId('message-editor-save'));
    await waitFor(() => expect(screen.getByTestId('message-editor-error').textContent).toBe('too late to edit'));
  });
});
