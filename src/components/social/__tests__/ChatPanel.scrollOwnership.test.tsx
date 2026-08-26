// Who owns the viewport while messages arrive?
//
// The old effect ran `scrollTop = scrollHeight` on every change of
// messages.length. Measured in the DM thread: parked at scrollTop=0 of a
// 1222px scroll height, one incoming message threw the viewport to
// scrollTop=1053 — you lost your place mid-sentence, every time anyone
// typed. The reader now keeps the viewport unless they are already at the
// live edge; anything that arrives above the fold is announced instead.
//
// These assertions are on scrollTop NUMBERS, not on classes: a DOM-only
// check here would pass with the whole guard deleted.

import { render, screen, fireEvent } from '@testing-library/react';
import { ChatPanel } from '../ChatPanel';
import type { ChatMessage } from '../../../hooks/useChat';

function msg(i: number): ChatMessage {
  return {
    clientId: 'peer',
    content: `message ${i}`,
    timestamp: '2026-01-01T12:34:00.000Z',
    displayName: 'Peer',
  };
}

const seed = (n: number) => Array.from({ length: n }, (_, i) => msg(i));

/**
 * jsdom has no layout: scrollHeight/clientHeight are hardcoded 0, so the
 * component can never tell "at the bottom" from "scrolled up". Give the
 * scroller a fake, mutable box — scrollHeight grows with the row count the
 * way a real list would.
 */
function fakeLayout(el: HTMLElement, opts: { clientHeight: number; rowHeight: number }) {
  const box = { rows: el.querySelectorAll('[data-testid="message-row"]').length };
  Object.defineProperty(el, 'clientHeight', { get: () => opts.clientHeight, configurable: true });
  Object.defineProperty(el, 'scrollHeight', {
    get: () => el.querySelectorAll('[data-testid="message-row"]').length * opts.rowHeight,
    configurable: true,
  });
  return box;
}

function setup(count: number) {
  const onSend = vi.fn();
  const view = render(<ChatPanel fill messages={seed(count)} onSend={onSend} />);
  const list = screen.getByTestId('chat-panel-messages');
  fakeLayout(list, { clientHeight: 200, rowHeight: 40 });
  return { view, list, onSend };
}

describe('ChatPanel — scroll ownership', () => {
  it('auto-scrolls when the reader is already at the live edge', () => {
    const { view, list } = setup(20);
    // Park at the bottom: 20 rows * 40 = 800 scrollHeight, 200 viewport.
    list.scrollTop = 600;
    fireEvent.scroll(list);

    view.rerender(<ChatPanel fill messages={seed(21)} onSend={vi.fn()} />);
    expect(list.scrollTop).toBe(840); // pinned: followed the new bottom
    expect(screen.queryByTestId('chat-panel-new-messages')).toBeNull();
  });

  it('does NOT move the viewport when the reader is scrolled up', () => {
    const { view, list } = setup(20);
    list.scrollTop = 0; // reading the top of the history
    fireEvent.scroll(list);

    view.rerender(<ChatPanel fill messages={seed(21)} onSend={vi.fn()} />);

    expect(list.scrollTop).toBe(0);
    expect(screen.getByTestId('chat-panel-new-messages')).toHaveTextContent('1 new message');
  });

  it('counts every message that arrived above the fold', () => {
    const { view, list } = setup(20);
    list.scrollTop = 0;
    fireEvent.scroll(list);

    view.rerender(<ChatPanel fill messages={seed(21)} onSend={vi.fn()} />);
    view.rerender(<ChatPanel fill messages={seed(23)} onSend={vi.fn()} />);

    expect(list.scrollTop).toBe(0);
    expect(screen.getByTestId('chat-panel-new-messages')).toHaveTextContent('3 new messages');
  });

  it('the affordance jumps to the bottom and clears itself', () => {
    const { view, list } = setup(20);
    list.scrollTop = 0;
    fireEvent.scroll(list);
    view.rerender(<ChatPanel fill messages={seed(22)} onSend={vi.fn()} />);

    fireEvent.click(screen.getByTestId('chat-panel-new-messages'));

    expect(list.scrollTop).toBe(880); // 22 rows * 40
    expect(screen.queryByTestId('chat-panel-new-messages')).toBeNull();
  });

  it('scrolling back to the bottom clears the affordance and re-arms auto-scroll', () => {
    const { view, list } = setup(20);
    list.scrollTop = 0;
    fireEvent.scroll(list);
    view.rerender(<ChatPanel fill messages={seed(21)} onSend={vi.fn()} />);
    expect(screen.getByTestId('chat-panel-new-messages')).toBeInTheDocument();

    list.scrollTop = 640; // 21*40 - 200 = bottom
    fireEvent.scroll(list);
    expect(screen.queryByTestId('chat-panel-new-messages')).toBeNull();

    view.rerender(<ChatPanel fill messages={seed(22)} onSend={vi.fn()} />);
    expect(list.scrollTop).toBe(880); // following again
  });

  it('treats "within the threshold of the bottom" as the live edge', () => {
    const { view, list } = setup(20);
    // 40px short of the bottom — still reading live, still follows.
    list.scrollTop = 560;
    fireEvent.scroll(list);
    view.rerender(<ChatPanel fill messages={seed(21)} onSend={vi.fn()} />);
    expect(list.scrollTop).toBe(840);

    // 200px short — deliberately reading back, must not follow.
    list.scrollTop = 440;
    fireEvent.scroll(list);
    view.rerender(<ChatPanel fill messages={seed(22)} onSend={vi.fn()} />);
    expect(list.scrollTop).toBe(440);
  });

  it('sending your own message re-pins to the bottom even when scrolled up', () => {
    const onSend = vi.fn();
    const view = render(<ChatPanel fill messages={seed(20)} onSend={onSend} />);
    const list = screen.getByTestId('chat-panel-messages');
    fakeLayout(list, { clientHeight: 200, rowHeight: 40 });
    list.scrollTop = 0;
    fireEvent.scroll(list);

    const input = screen.getByPlaceholderText('Type a message...') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'mine' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onSend).toHaveBeenCalledWith('mine');

    // The echo arrives from the server as a length change.
    view.rerender(<ChatPanel fill messages={seed(21)} onSend={onSend} />);
    expect(list.scrollTop).toBe(840);
    expect(screen.queryByTestId('chat-panel-new-messages')).toBeNull();
  });
});

describe('ChatPanel — load earlier', () => {
  it('offers the button only when a loader is wired and more exists', () => {
    const { rerender } = render(<ChatPanel fill messages={seed(3)} onSend={vi.fn()} />);
    expect(screen.queryByTestId('chat-panel-load-more')).toBeNull();

    rerender(<ChatPanel fill messages={seed(3)} onSend={vi.fn()} onLoadMore={vi.fn()} />);
    expect(screen.getByTestId('chat-panel-load-more')).toBeInTheDocument();

    rerender(<ChatPanel fill messages={seed(3)} onSend={vi.fn()} onLoadMore={vi.fn()} hasMore={false} />);
    expect(screen.queryByTestId('chat-panel-load-more')).toBeNull();
  });

  it('holds the reader’s line steady when older messages are prepended', () => {
    const onLoadMore = vi.fn();
    const view = render(
      <ChatPanel fill messages={seed(20)} onSend={vi.fn()} onLoadMore={onLoadMore} />,
    );
    const list = screen.getByTestId('chat-panel-messages');
    fakeLayout(list, { clientHeight: 200, rowHeight: 40 });
    list.scrollTop = 120; // reading near the top of what we have

    fireEvent.click(screen.getByTestId('chat-panel-load-more'));
    expect(onLoadMore).toHaveBeenCalledTimes(1);

    // 10 older messages land above: scrollHeight 800 -> 1200.
    view.rerender(<ChatPanel fill messages={seed(30)} onSend={vi.fn()} onLoadMore={onLoadMore} />);

    // Same line under the eye: old offset + the height that appeared above.
    expect(list.scrollTop).toBe(520);
    // ...and history is not announced as new traffic.
    expect(screen.queryByTestId('chat-panel-new-messages')).toBeNull();
  });
});
