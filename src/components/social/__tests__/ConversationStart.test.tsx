import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ConversationStart } from '../ConversationStart';

const people = (n: number) => Array.from({ length: n }, (_, i) => ({ id: `p${i}`, label: `Person ${i}` }));

describe('ConversationStart', () => {
  it('offers the three ways in as rows: start, add to a room, send to someone', () => {
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
    fireEvent.click(screen.getByRole('button', { name: /Start a conversation/ }));
    expect(onStart).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByRole('button', { name: /Add to a room/ }));
    fireEvent.click(screen.getByRole('button', { name: '#design' }));
    expect(onAddToRoom).toHaveBeenCalledWith('room:design');

    fireEvent.click(screen.getByRole('button', { name: /Send to someone/ }));
    fireEvent.click(screen.getByRole('button', { name: 'Hank Anderson' }));
    expect(onShareWith).toHaveBeenCalledWith('hank');
  });

  it('keeps an empty choice visible but disabled, rather than hiding it', () => {
    render(<ConversationStart onStart={() => {}} rooms={[]} onAddToRoom={() => {}} people={[]} onShareWith={() => {}} />);
    expect(screen.getByRole('button', { name: /Add to a room/ })).toBeDisabled();
    expect(screen.getByRole('button', { name: /Send to someone/ })).toBeDisabled();
  });

  it('grows a search once the list is long enough to lose someone in', () => {
    render(<ConversationStart people={people(8)} onShareWith={() => {}} />);
    fireEvent.click(screen.getByRole('button', { name: /Send to someone/ }));
    const search = screen.getByTestId('conversation-start-people-search');
    const input = search.tagName === 'INPUT' ? search : search.querySelector('input')!;
    fireEvent.change(input, { target: { value: 'Person 7' } });
    expect(screen.getAllByTestId('conversation-start-people-option')).toHaveLength(1);
  });

  it('shows the receipt with its way onward', () => {
    const onAction = vi.fn();
    render(<ConversationStart receipt={{ tone: 'success', text: 'Sent to Hank', actionLabel: 'Open the chat', onAction }} />);
    expect(screen.getByTestId('conversation-start-receipt').textContent).toContain('Sent to Hank');
    fireEvent.click(screen.getByRole('button', { name: 'Open the chat' }));
    expect(onAction).toHaveBeenCalled();
  });
});
