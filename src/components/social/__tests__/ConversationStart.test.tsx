import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ConversationStart } from '../ConversationStart';

describe('ConversationStart', () => {
  it('offers the three ways in, in order: start, add to a room, send to someone', () => {
    const onStart = vi.fn();
    const onAddToRoom = vi.fn();
    const onShareWith = vi.fn();
    render(
      <ConversationStart
        onStart={onStart}
        rooms={[{ id: 'room:design', label: '#design' }]}
        onAddToRoom={onAddToRoom}
        people={[{ id: 'hank', label: 'Hank Anderson' }]}
        onShareWith={onShareWith}
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Start a conversation' }));
    expect(onStart).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByRole('button', { name: 'Add to a room' }));
    fireEvent.click(screen.getByRole('menuitem', { name: '#design' }));
    expect(onAddToRoom).toHaveBeenCalledWith('room:design');

    fireEvent.click(screen.getByRole('button', { name: 'Send to someone' }));
    fireEvent.click(screen.getByRole('menuitem', { name: 'Hank Anderson' }));
    expect(onShareWith).toHaveBeenCalledWith('hank');
  });

  it('keeps an empty choice visible but disabled, rather than hiding it', () => {
    render(<ConversationStart onStart={() => {}} rooms={[]} onAddToRoom={() => {}} />);
    expect(screen.getByTestId('conversation-start-rooms-disabled')).toBeDisabled();
    expect(screen.getByTestId('conversation-start-people-disabled')).toBeDisabled();
  });

  it('shows the receipt with its way onward', () => {
    const onAction = vi.fn();
    render(<ConversationStart receipt={{ tone: 'success', text: 'Sent to Hank', actionLabel: 'Open the chat', onAction }} />);
    expect(screen.getByTestId('conversation-start-receipt').textContent).toContain('Sent to Hank');
    fireEvent.click(screen.getByRole('button', { name: 'Open the chat' }));
    expect(onAction).toHaveBeenCalled();
  });
});
