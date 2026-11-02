import { render, screen, fireEvent } from '@testing-library/react';
import { ChatPanel } from '../ChatPanel';
import { openMessageActions } from './chatTestActions';

// MessageActionBar has had a "Copy link to message" control all along and
// ChatPanel never passed the prop, so no host could reach it — while the app
// has honoured `?jump=<messageId>` links for months. Another pair of finished
// halves that had never been connected.

const msg = {
  id: 'm1', clientId: 'c1', userId: 'u-carol', displayName: 'Carol Johnson',
  content: 'the decision we keep forgetting', timestamp: '2026-09-17T09:00:00.000Z',
};

const notice = {
  id: 'n1', clientId: 'c2', userId: 'u-carol', displayName: 'Carol Johnson',
  content: 'Carol joined', timestamp: '2026-09-17T09:01:00.000Z',
  metadata: { system: true },
};

describe('ChatPanel — copying a link to a message', () => {
  it('hands the host the message, because only the host knows the route', () => {
    const onCopyLink = vi.fn();
    render(<ChatPanel messages={[msg]} onSend={vi.fn()} onCopyLink={onCopyLink} />);
    openMessageActions(screen.getByTestId('chat-message'));
    fireEvent.click(screen.getByTestId('message-actions-copy-link'));
    expect(onCopyLink).toHaveBeenCalledTimes(1);
    expect(onCopyLink.mock.calls[0][0].id).toBe('m1');
  });

  it('offers nothing when the host cannot build a link', () => {
    // A Copy link that copies nothing is worse than no Copy link — the same
    // rule every other control on this bar follows.
    render(<ChatPanel messages={[msg]} onSend={vi.fn()} />);
    expect(screen.queryByTestId('message-actions-copy-link')).toBeNull();
  });

  it('offers nothing on a notice, which has no words of its own to link to', () => {
    render(<ChatPanel messages={[notice]} onSend={vi.fn()} onCopyLink={vi.fn()} />);
    expect(screen.queryByTestId('message-actions-copy-link')).toBeNull();
  });
});
