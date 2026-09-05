import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { HangoutRoomRow } from '../HangoutRoomRow';

afterEach(cleanup);

// A room is not only a call. Until this control existed the only way into a
// room was to join the video, so everything said, shared or written in it was
// unreachable unless somebody happened to be in there right now.

describe('opening a room conversation', () => {
  it('offers a way in that is not joining the call', () => {
    const onOpenConversation = vi.fn();
    render(<HangoutRoomRow slug="standup" name="standup" onOpenConversation={onOpenConversation} />);
    fireEvent.click(screen.getByTestId('room-row-open-conversation'));
    expect(onOpenConversation).toHaveBeenCalled();
  });

  // Without stopPropagation the row's own handler fires too and the call opens
  // on top of the conversation you asked for.
  it('does not also join the call', () => {
    const onClick = vi.fn();
    render(
      <HangoutRoomRow slug="standup" name="standup" onClick={onClick} onOpenConversation={vi.fn()} />,
    );
    fireEvent.click(screen.getByTestId('room-row-open-conversation'));
    expect(onClick).not.toHaveBeenCalled();
  });

  // Clicking the row is still how you join — that is what a hangout row is for.
  it('leaves the row click joining the call', () => {
    const onClick = vi.fn();
    render(
      <HangoutRoomRow slug="standup" name="standup" onClick={onClick} onOpenConversation={vi.fn()} />,
    );
    fireEvent.click(screen.getByTestId('room-row'));
    expect(onClick).toHaveBeenCalled();
  });

  it('renders no such control for a deployment that has no conversations', () => {
    render(<HangoutRoomRow slug="standup" name="standup" onClick={vi.fn()} />);
    expect(screen.queryByTestId('room-row-open-conversation')).toBeNull();
  });

  it('names the room, since the control is a glyph', () => {
    render(<HangoutRoomRow slug="standup" name="standup" onOpenConversation={vi.fn()} />);
    expect(screen.getByLabelText('Open the standup conversation')).toBeInTheDocument();
  });
});
