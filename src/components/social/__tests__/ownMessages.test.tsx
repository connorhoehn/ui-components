import { render, screen, cleanup } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { MessageRow } from '../MessageRow';
import { ChatPanel } from '../ChatPanel';

afterEach(cleanup);

// In a busy thread "which of these did I write" is answered constantly, and
// answering it by reading names is work. Own messages flip side and take a
// tint, so the shape of the conversation is legible before it is read.

describe('MessageRow, mine', () => {
  it('flips the row so the content runs the other way', () => {
    render(<MessageRow author="Bob" content="hi" timestamp="2026-09-05T08:00:00Z" mine />);
    expect(screen.getByTestId('message-row').className).toContain('flex-row-reverse');
  });

  it('tints only the viewer own message', () => {
    const { rerender } = render(
      <MessageRow author="Bob" content="hi" timestamp="2026-09-05T08:00:00Z" mine />,
    );
    expect(screen.getByTestId('message-row-content').className).toContain('bg-primary-bg');

    rerender(<MessageRow author="Eve" content="hi" timestamp="2026-09-05T08:00:00Z" />);
    // Both sides tinted doubles the ink and makes them harder to tell apart,
    // not easier: the contrast IS the signal.
    expect(screen.getByTestId('message-row-content').className).not.toContain('bg-primary-bg');
  });

  it('keeps somebody else message on the normal side', () => {
    render(<MessageRow author="Eve" content="hi" timestamp="2026-09-05T08:00:00Z" />);
    expect(screen.getByTestId('message-row').className).not.toContain('flex-row-reverse');
  });

  it('marks it for anything else keying off ownership', () => {
    render(<MessageRow author="Bob" content="hi" timestamp="2026-09-05T08:00:00Z" mine />);
    expect(screen.getByTestId('message-row')).toHaveAttribute('data-mine', 'true');
  });
});

describe('ChatPanel deciding what is mine', () => {
  const mineMsg = { id: 'm1', clientId: 'conn-1', userId: 'dev-bob', content: 'mine', timestamp: '2026-09-05T08:00:00Z' };
  const theirs = { id: 'm2', clientId: 'conn-2', userId: 'dev-eve', content: 'theirs', timestamp: '2026-09-05T08:01:00Z' };

  it('matches on the authenticated user', () => {
    render(<ChatPanel messages={[mineMsg, theirs]} onSend={vi.fn()} currentUserId="dev-bob" />);
    const rows = screen.getAllByTestId('message-row');
    expect(rows[0]).toHaveAttribute('data-mine', 'true');
    expect(rows[1]).toHaveAttribute('data-mine', 'false');
  });

  // A clientId identifies a CONNECTION and changes on every reconnect, so
  // keying on it makes your own messages stop being yours halfway up a thread.
  it('does not match on clientId', () => {
    render(<ChatPanel messages={[mineMsg]} onSend={vi.fn()} currentUserId="conn-1" />);
    expect(screen.getByTestId('message-row')).toHaveAttribute('data-mine', 'false');
  });

  it('claims nothing when there is no viewer', () => {
    render(<ChatPanel messages={[mineMsg]} onSend={vi.fn()} />);
    expect(screen.getByTestId('message-row')).toHaveAttribute('data-mine', 'false');
  });

  // Older messages predate the userId stamp; they are not everyone's.
  it('claims nothing for a message with no sender id', () => {
    render(
      <ChatPanel
        messages={[{ id: 'm3', clientId: 'conn-1', content: 'old', timestamp: '2026-09-05T08:00:00Z' }]}
        onSend={vi.fn()}
        currentUserId="dev-bob"
      />,
    );
    expect(screen.getByTestId('message-row')).toHaveAttribute('data-mine', 'false');
  });
});

describe('the hover action bar', () => {
  const msg = { id: 'm1', clientId: 'c1', content: 'asdasdf', timestamp: '2026-09-05T08:00:00Z' };

  // `focus-within` is true after a MOUSE click too, so clicking a reaction
  // left that row's bar stuck open after the pointer moved away — two bars on
  // screen, one for a message you were no longer pointing at.
  it('reveals on hover and on KEYBOARD focus only', () => {
    render(<ChatPanel messages={[msg]} onSend={vi.fn()} onReply={vi.fn()} />);
    const bar = screen.getByTestId('message-actions');
    expect(bar.className).toContain('group-hover:opacity-100');
    expect(bar.className).toContain('group-has-[:focus-visible]:opacity-100');
    expect(bar.className).not.toContain('focus-within:opacity-100');
  });

  // Top right of the row, lifted into the gap above it — never over the
  // author line — with the hovered row tinted so bar and message read as one.
  it('sits at the top right of the row, off the author line', () => {
    render(<ChatPanel messages={[msg]} onSend={vi.fn()} onReply={vi.fn()} />);
    const bar = screen.getByTestId('message-actions');
    // Since fc1f8c1a the bar lives in the row header's own actions slot, so it
    // takes layout space instead of overlaying the author line.
    expect(bar.className).not.toContain('absolute');
    expect(bar.className).not.toContain('-top-3');
    expect(bar.className).not.toContain('left-14');
    expect(screen.getByTestId('chat-message').className).toContain('hover:bg-surface-hover');
  });
});

describe('composer extensions', () => {
  // StarterKit 3.x bundles Link. Registering it again warned on every mount —
  // and two registrations of the same mark means the winning configuration is
  // undefined, so openOnClick/autolink/rel may have applied to a mark that was
  // not the one in use.
  it('mounts without tiptap complaining about duplicate extensions', async () => {
    const { RichChatComposer } = await import('../RichChatComposer');
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    try {
      render(<RichChatComposer onSend={vi.fn()} />);
      const duplicates = warn.mock.calls
        .map((c) => c.join(' '))
        .filter((m) => m.includes('Duplicate extension names'));
      expect(duplicates).toEqual([]);
    } finally {
      warn.mockRestore();
    }
  });
});
