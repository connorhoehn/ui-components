import { render, screen, cleanup } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { StreamStage } from '../StreamStage';
import { StreamChatTicker } from '../StreamChatTicker';

// The watch surface. Chat rotates OVER the video rather than taking a column
// beside it: on a stream the video is the content, and a chat column that
// steals 320px is 320px of the thing you came to watch.

afterEach(cleanup);

const MSGS = [
  { id: '1', displayName: 'Alex Chen', content: 'starting now', timestamp: '2026-09-02T10:04:00Z' },
  { id: '2', displayName: 'Bea', content: 'audio is good' },
];

describe('StreamStage', () => {
  it('shows a placeholder rather than an error when no stream has arrived', () => {
    render(<StreamStage />);
    expect(screen.getByTestId('stream-stage-placeholder')).toBeInTheDocument();
  });

  it('marks itself live for the LIVE badge', () => {
    render(<StreamStage live title="Standup" />);
    expect(screen.getByTestId('stream-stage')).toHaveAttribute('data-live', 'true');
    expect(screen.getByTestId('stream-stage-live')).toBeInTheDocument();
  });

  // A silent stream should not carry an empty chat frame.
  it('renders no ticker when there is no chat', () => {
    render(<StreamStage chatMessages={[]} />);
    expect(screen.queryByTestId('stream-stage-chat')).toBeNull();
  });

  it('overlays chat when there is some', () => {
    render(<StreamStage chatMessages={MSGS} />);
    expect(screen.getByTestId('stream-stage-chat')).toBeInTheDocument();
  });

  // Omitted, not zero: "0 watching" and "unknown" are different claims.
  it('omits the viewer count when not supplied', () => {
    const { container } = render(<StreamStage title="Standup" />);
    expect(container.textContent).not.toMatch(/\b0\b/);
  });
});

describe('StreamChatTicker', () => {
  it('renders nothing at all when there are no messages', () => {
    const { container } = render(<StreamChatTicker messages={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('shows the newest message first', () => {
    render(<StreamChatTicker messages={MSGS} visibleCount={1} rotateMs={0} />);
    expect(screen.getByText(/audio is good/)).toBeInTheDocument();
  });

  // Capping before reversing would keep the OLDEST messages — precisely
  // backwards for a live ticker.
  it('keeps the most recent messages when the window overflows', () => {
    const many = Array.from({ length: 30 }, (_, i) => ({
      id: String(i),
      displayName: 'A',
      content: `msg-${i}`,
    }));
    render(<StreamChatTicker messages={many} window={5} visibleCount={5} rotateMs={0} />);
    expect(screen.getByText(/msg-29/)).toBeInTheDocument();
    expect(screen.queryByText(/msg-0$/)).toBeNull();
  });

  // The ticker floats over the video; a viewer clicking to pause or go
  // fullscreen must not be intercepted by chat they were only reading.
  it('never eats a click meant for the video', () => {
    render(<StreamChatTicker messages={MSGS} />);
    expect(screen.getByTestId('stream-chat-ticker').className).toMatch(/pointer-events-none/);
  });
});
