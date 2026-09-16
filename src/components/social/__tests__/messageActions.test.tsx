import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ReactionChips, groupReactions, describeReactors } from '../ReactionChips';
import { MessageActionBar } from '../MessageActionBar';
import { QuoteBlock, excerpt } from '../QuoteBlock';

afterEach(cleanup);

const r = (emoji: string, userId: string, displayName?: string) => ({ emoji, userId, displayName });

describe('groupReactions', () => {
  it('collapses the same emoji into one chip with a count', () => {
    const g = groupReactions([r('👍', 'a'), r('👍', 'b'), r('🎉', 'c')], 'me');
    expect(g.map((x) => [x.emoji, x.count])).toEqual([['👍', 2], ['🎉', 1]]);
  });

  // An optimistic update that double-fires must not inflate the count.
  it('counts one person once per emoji', () => {
    const g = groupReactions([r('👍', 'a'), r('👍', 'a')], 'me');
    expect(g[0].count).toBe(1);
  });

  it('marks the viewer own reaction, because the chip is a toggle', () => {
    const g = groupReactions([r('👍', 'me'), r('👍', 'b')], 'me');
    expect(g[0].mine).toBe(true);
    expect(g[0].count).toBe(2);
  });

  // Chips reshuffling under the pointer makes them unclickable.
  it('keeps first-seen order', () => {
    const g = groupReactions([r('🎉', 'a'), r('👍', 'b'), r('🎉', 'c')], 'me');
    expect(g.map((x) => x.emoji)).toEqual(['🎉', '👍']);
  });
});

describe('describeReactors', () => {
  it('puts you first', () => {
    const [g] = groupReactions([r('👍', 'me'), r('👍', 'b', 'Ada')], 'me');
    expect(describeReactors(g)).toBe('You and Ada');
  });

  it('summarises a crowd rather than listing everyone', () => {
    const [g] = groupReactions(
      [r('👍', 'a', 'Ada'), r('👍', 'b', 'Sam'), r('👍', 'c', 'Kai'), r('👍', 'd', 'Lee')],
      'me',
    );
    expect(describeReactors(g)).toBe('Ada, Sam and 2 others');
  });
});

describe('ReactionChips', () => {
  it('renders nothing when nobody has reacted', () => {
    const { container } = render(<ReactionChips reactions={[]} currentUserId="me" onToggle={vi.fn()} />);
    expect(container.firstChild).toBeNull();
  });

  it('toggles the emoji it shows', () => {
    const onToggle = vi.fn();
    render(<ReactionChips reactions={[r('👍', 'a')]} currentUserId="me" onToggle={onToggle} />);
    fireEvent.click(screen.getByTestId('reaction-chip'));
    expect(onToggle).toHaveBeenCalledWith('👍');
  });

  it('announces the toggle state to assistive tech', () => {
    render(<ReactionChips reactions={[r('👍', 'me')]} currentUserId="me" onToggle={vi.fn()} />);
    expect(screen.getByTestId('reaction-chip')).toHaveAttribute('aria-pressed', 'true');
  });
});

describe('MessageActionBar', () => {
  it('offers the quick reactions inline, so a thumbs-up is one click', () => {
    const onReact = vi.fn();
    render(<MessageActionBar onReact={onReact} />);
    fireEvent.click(screen.getByTestId('message-actions-react-👍'));
    expect(onReact).toHaveBeenCalledWith('👍');
  });

  it('names every control, since they are all glyphs', () => {
    render(<MessageActionBar onReply={vi.fn()} onTogglePin={vi.fn()} onCopyLink={vi.fn()} />);
    expect(screen.getByLabelText('Reply')).toBeInTheDocument();
    expect(screen.getByLabelText('Pin to channel')).toBeInTheDocument();
    expect(screen.getByLabelText('Copy link to message')).toBeInTheDocument();
  });

  it('says Unpin once pinned', () => {
    render(<MessageActionBar onTogglePin={vi.fn()} pinned />);
    expect(screen.getByLabelText('Unpin')).toBeInTheDocument();
  });

  // A greyed pin is a promise the product will not keep.
  it('omits actions the viewer may not take, rather than disabling them', () => {
    render(<MessageActionBar onReply={vi.fn()} />);
    expect(screen.queryByTestId('message-actions-pin')).toBeNull();
    expect(screen.queryByTestId('message-actions-delete')).toBeNull();
    expect(screen.queryByTestId('message-actions-forward')).toBeNull();
  });

  it('forwards to another conversation when the host can take one', () => {
    const onForward = vi.fn();
    render(<MessageActionBar onForward={onForward} />);
    fireEvent.click(screen.getByLabelText('Forward to another conversation'));
    expect(onForward).toHaveBeenCalled();
  });

  // Reply and Forward are the same gesture pointed different ways — keep it
  // here, or send a copy elsewhere — so they sit together, ahead of the
  // channel-admin controls.
  it('puts Forward next to Reply, before Pin', () => {
    render(<MessageActionBar onReply={vi.fn()} onForward={vi.fn()} onTogglePin={vi.fn()} />);
    const keys = Array.from(
      screen.getByTestId('message-actions').querySelectorAll('button'),
    ).map((b) => b.getAttribute('data-testid'));
    expect(keys).toEqual([
      'message-actions-reply',
      'message-actions-forward',
      'message-actions-pin',
    ]);
  });

  // A colour emoji ignores the button around it — it stays bright on a muted
  // bar, does not follow hover or dark mode, and renders as a text glyph on
  // one platform and a picture on another. Chrome is drawn; content is not.
  it('draws its chrome as icons, and leaves the reactions as the characters people sent', () => {
    render(
      <MessageActionBar
        quickReactions={['👍']}
        onReact={vi.fn()}
        onOpenReactionPicker={vi.fn()}
        onReply={vi.fn()}
        onCopyLink={vi.fn()}
      />,
    );
    for (const key of ['more-reactions', 'reply', 'copy-link']) {
      const button = screen.getByTestId(`message-actions-${key}`);
      expect(button.querySelector('svg')).not.toBeNull();
      expect(button.textContent).toBe('');
    }
    // The reaction itself is what a person chose to send, so it stays a char.
    expect(screen.getByTestId('message-actions-react-👍').textContent).toBe('👍');
  });

  it('keeps naming the icon-only controls for a screen reader', () => {
    render(<MessageActionBar onOpenReactionPicker={vi.fn()} onReply={vi.fn()} onCopyLink={vi.fn()} />);
    expect(screen.getByLabelText('More reactions')).toBeInTheDocument();
    expect(screen.getByLabelText('Reply')).toBeInTheDocument();
    expect(screen.getByLabelText('Copy link to message')).toBeInTheDocument();
  });
});

describe('excerpt', () => {
  it('leaves a short quote alone', () => {
    expect(excerpt('short one')).toBe('short one');
  });

  // Mid-word truncation reads as corruption rather than as an excerpt. The
  // check is that every retained word is a WHOLE word from the original —
  // "ends in a letter" cannot distinguish "jumps…" from "jum…".
  it('cuts on a word boundary', () => {
    const source = 'the quick brown fox jumps over the lazy dog and keeps running onwards';
    const out = excerpt(source, 30);
    expect(out.endsWith('…')).toBe(true);
    const words = out.slice(0, -1).trim().split(' ');
    expect(source.split(' ').slice(0, words.length)).toEqual(words);
  });

  it('flattens newlines so a quote stays one line', () => {
    expect(excerpt('a\n\n  b')).toBe('a b');
  });
});

describe('QuoteBlock', () => {
  const quote = { messageId: 'm1', author: 'Hank Anderson', timestamp: '2026-09-05T07:48:00Z', text: 'the upload path is live' };

  it('shows who said it — the whole reason a quote disambiguates', () => {
    render(<QuoteBlock quote={quote} />);
    expect(screen.getByText('Hank Anderson')).toBeInTheDocument();
    expect(screen.getByText(/upload path is live/)).toBeInTheDocument();
  });

  it('jumps to the original', () => {
    const onJump = vi.fn();
    render(<QuoteBlock quote={quote} onJump={onJump} />);
    fireEvent.click(screen.getByTestId('quote-block-jump'));
    expect(onJump).toHaveBeenCalledWith('m1');
  });

  // A quote whose original is gone should read as a record, not a dead button.
  it('is not clickable when the original cannot be reached', () => {
    render(<QuoteBlock quote={quote} />);
    expect(screen.queryByTestId('quote-block-jump')).toBeNull();
  });

  it('can be dismissed while composing', () => {
    const onDismiss = vi.fn();
    render(<QuoteBlock quote={quote} onDismiss={onDismiss} />);
    fireEvent.click(screen.getByTestId('quote-block-dismiss'));
    expect(onDismiss).toHaveBeenCalled();
  });
});
