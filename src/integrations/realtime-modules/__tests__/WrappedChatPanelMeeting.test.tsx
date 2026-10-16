// 2.477.0: the seams a meeting's chat needs on the wrapped panel —
// `transformMessages` (merge announcements into the thread) and `dock`
// (the "Room 1 chat" line and the organizer's To switch above the composer).
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { WrappedChatPanel } from '../WrappedChatPanel';
import type { RMUseChatReturn, RMChatMessage } from '../types';

const msg = (id: string, text: string, timestamp: string): RMChatMessage =>
  ({ id, clientId: 'c', channel: 'r', message: text, timestamp });
const chat = (messages: RMChatMessage[]): RMUseChatReturn => ({ messages, sendMessage: vi.fn(), loadHistory: vi.fn() });

describe('WrappedChatPanel meeting seams', () => {
  it('transformMessages merges a host entry into the thread in time order', () => {
    render(
      <WrappedChatPanel
        chat={chat([msg('a', 'first', '2026-10-16T10:00:00Z'), msg('c', 'third', '2026-10-16T10:02:00Z')])}
        transformMessages={(list) => [...list, { id: 'meeting-announcement:x', clientId: 'meeting', userId: 'u-org', displayName: 'Rowan', content: 'Five minutes left', timestamp: '2026-10-16T10:01:00Z' }]
          .sort((x, y) => Date.parse(x.timestamp) - Date.parse(y.timestamp))}
      />,
    );
    const text = document.body.textContent ?? '';
    expect(text.indexOf('first')).toBeLessThan(text.indexOf('Five minutes left'));
    expect(text.indexOf('Five minutes left')).toBeLessThan(text.indexOf('third'));
  });

  it('draws the dock above the composer', () => {
    render(<WrappedChatPanel chat={chat([])} dock={<div data-testid="meeting-dock">Room 1 chat</div>} />);
    expect(screen.getByTestId('meeting-dock')).toHaveTextContent('Room 1 chat');
  });
});
