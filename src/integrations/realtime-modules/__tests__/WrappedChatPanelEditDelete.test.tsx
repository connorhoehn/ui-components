import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { WrappedChatPanel } from '../WrappedChatPanel';
import type { RMUseChatReturn, RMChatMessage } from '../types';

const msg = (id: string, userId: string, text: string, extra: Partial<RMChatMessage> = {}): RMChatMessage => ({
  id, clientId: 'c-' + id, userId, channel: 'x', message: text, timestamp: '2026-01-01T00:00:00Z', ...extra,
});
function make(messages: RMChatMessage[], withEdit = true) {
  const editMessage = vi.fn();
  const deleteMessage = vi.fn();
  const chat: RMUseChatReturn = {
    messages, sendMessage: vi.fn(), loadHistory: vi.fn(),
    ...(withEdit ? { editMessage, deleteMessage } : {}),
  };
  return { chat, editMessage, deleteMessage };
}

describe('WrappedChatPanel edit/delete', () => {
  it('maps edit onto chat.editMessage with matching html, own messages only', () => {
    const { chat, editMessage } = make([msg('m1', 'me', 'mine'), msg('m2', 'other', 'theirs')]);
    render(<WrappedChatPanel chat={chat} currentUserId="me" />);
    expect(screen.getAllByRole('button', { name: /^edit/i })).toHaveLength(1);
    fireEvent.click(screen.getByRole('button', { name: /^edit/i }));
    const box = screen.getByRole('textbox', { name: /edit|message/i });
    fireEvent.change(box, { target: { value: 'a < b' } });
    fireEvent.keyDown(box, { key: 'Enter' });
    expect(editMessage).toHaveBeenCalledWith('m1', 'a < b', { html: '<p>a &lt; b</p>' });
  });

  it('maps delete onto chat.deleteMessage after confirm', () => {
    const { chat, deleteMessage } = make([msg('m1', 'me', 'mine')]);
    render(<WrappedChatPanel chat={chat} currentUserId="me" />);
    fireEvent.click(screen.getByRole('button', { name: /^delete/i }));
    const dialog = screen.getByRole('dialog');
    fireEvent.click(within(dialog).getByRole('button', { name: /^delete/i }));
    expect(deleteMessage).toHaveBeenCalledWith('m1');
  });

  it('canEdit/canDelete predicates replace the own-message default', () => {
    const { chat } = make([msg('m2', 'other', 'theirs')]);
    render(<WrappedChatPanel chat={chat} currentUserId="me" canDelete={() => true} />);
    expect(screen.queryByRole('button', { name: /^edit/i })).toBeNull();
    expect(screen.getByRole('button', { name: /^delete/i })).toBeInTheDocument();
  });

  it('shows edited marker and deleted placeholder from the hook frames', () => {
    const { chat } = make([
      msg('m1', 'me', 'fixed', { editedAt: '2026-01-01T00:01:00Z' }),
      msg('m2', 'other', '', { deletedAt: '2026-01-01T00:02:00Z', metadata: { deleted: true } }),
    ]);
    render(<WrappedChatPanel chat={chat} currentUserId="me" />);
    expect(screen.getByText(/edited/i)).toBeInTheDocument();
    expect(screen.getByTestId('message-deleted')).toBeInTheDocument();
  });

  it('names a deleted row by the person, never the socket client id', () => {
    const del = { deletedAt: '2026-01-01T00:02:00Z', metadata: { deleted: true } };
    const { chat } = make([
      msg('m1', 'alice', 'hi', { clientId: 'c_live', metadata: { displayName: 'Alice Ng' } }),
      msg('m2', 'alice', '', { clientId: 'c_muxlj2', ...del }),
      msg('m3', 'ghost', '', { clientId: 'c_zzz999', ...del }),
    ]);
    const { container } = render(<WrappedChatPanel chat={chat} currentUserId="me" />);
    const text = container.textContent ?? '';
    expect(text).not.toContain('c_muxlj2');
    expect(text).not.toContain('c_zzz999');
    expect(text.match(/Alice Ng/g)?.length).toBeGreaterThanOrEqual(1);
    expect(text).toContain('a removed member');
  });

  it('offers nothing when the hook has no edit/delete or editable=false', () => {
    const a = make([msg('m1', 'me', 'mine')], false);
    const { unmount } = render(<WrappedChatPanel chat={a.chat} currentUserId="me" />);
    expect(screen.queryByRole('button', { name: /^edit/i })).toBeNull();
    unmount();
    const b = make([msg('m1', 'me', 'mine')]);
    render(<WrappedChatPanel chat={b.chat} currentUserId="me" editable={false} />);
    expect(screen.queryByRole('button', { name: /^edit/i })).toBeNull();
  });
});
