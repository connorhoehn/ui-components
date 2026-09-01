import { useRef, type Ref } from 'react';
import { act, render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import CommentGhostPopover, {
  replyLabel,
  type CommentGhostPopoverHandle,
  type CommentGhostPopoverProps,
  type CommentGhostThread,
} from '../CommentGhostPopover';

afterEach(cleanup);

const THREADS: CommentGhostThread[] = [
  {
    id: 'c1',
    author: 'Ada Lovelace',
    text: 'Is this still the agreed rollout order?',
    replyCount: 2,
    quote: 'a commented phrase',
  },
  { id: 'c2', author: 'Grace Hopper', text: 'Settled in the review.', resolved: true },
];

/**
 * Deliberately renders NO gutter — that is the whole point of the ghost. The
 * page is the only thing on screen, exactly as a read-only reader sees it.
 */
function Page(
  props: Partial<CommentGhostPopoverProps> & {
    handleRef?: Ref<CommentGhostPopoverHandle>;
  } = {},
) {
  const { handleRef, ...rest } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <div>
      <div ref={containerRef} className="doc-page" data-testid="page">
        <p>
          A sentence with{' '}
          <span className="canvas-comment canvas-comment--open" data-comment-id="c1">
            a commented phrase
          </span>{' '}
          in it.
        </p>
        <p>
          And{' '}
          <span className="canvas-comment canvas-comment--resolved" data-comment-id="c2">
            an old one
          </span>
          .
        </p>
      </div>
      <CommentGhostPopover
        threads={THREADS}
        containerRef={containerRef}
        hoverDelayMs={0}
        ref={handleRef}
        {...rest}
      />
    </div>
  );
}

const ghost = (id: string) => document.querySelector(`[data-comment-id="${id}"]`)!;

describe('replyLabel', () => {
  it('reads as a thread weight, not a raw number', () => {
    expect(replyLabel(0)).toBe('No replies');
    expect(replyLabel(1)).toBe('1 reply');
    expect(replyLabel(4)).toBe('4 replies');
  });
});

describe('CommentGhostPopover', () => {
  it('shows nothing until a ghost is engaged', () => {
    render(<Page />);
    expect(screen.queryByTestId('comment-ghost-card')).toBeNull();
  });

  // Touch has no pointer to hover with, and the gutter is likeliest to be off
  // on exactly those screens — so click is the load-bearing way in.
  it('opens on click', async () => {
    render(<Page />);
    fireEvent.click(ghost('c1'));
    expect(await screen.findByTestId('comment-ghost-card')).toBeTruthy();
  });

  it('opens on hover', async () => {
    render(<Page />);
    fireEvent.mouseOver(ghost('c1'));
    expect(await screen.findByTestId('comment-ghost-card')).toBeTruthy();
  });

  it('renders the thread author, text and reply count', async () => {
    render(<Page />);
    fireEvent.click(ghost('c1'));
    await screen.findByTestId('comment-ghost-card');
    expect(screen.getByText('Ada Lovelace')).toBeTruthy();
    expect(screen.getByText('Is this still the agreed rollout order?')).toBeTruthy();
    expect(screen.getByTestId('comment-ghost-replies').textContent).toBe('2 replies');
    // The anchored words, because a ghost can be opened from a mark the reader
    // has not reached yet.
    expect(screen.getByText('a commented phrase', { selector: 'div' })).toBeTruthy();
  });

  it('closes on Escape', async () => {
    render(<Page />);
    fireEvent.click(ghost('c1'));
    await screen.findByTestId('comment-ghost-card');
    fireEvent.keyDown(document, { key: 'Escape' });
    await waitFor(() => expect(screen.queryByTestId('comment-ghost-card')).toBeNull());
  });

  // A card you can open and not close is a trap where there is no "hover away".
  it('closes when the same ghost is clicked again', async () => {
    render(<Page />);
    fireEvent.click(ghost('c1'));
    await screen.findByTestId('comment-ghost-card');
    fireEvent.click(ghost('c1'));
    await waitFor(() => expect(screen.queryByTestId('comment-ghost-card')).toBeNull());
  });

  it('calls back and closes when the thread is opened', async () => {
    const onOpenThread = vi.fn();
    render(<Page onOpenThread={onOpenThread} />);
    fireEvent.click(ghost('c1'));
    fireEvent.click(await screen.findByTestId('comment-ghost-open'));
    expect(onOpenThread).toHaveBeenCalledWith('c1');
    await waitFor(() => expect(screen.queryByTestId('comment-ghost-card')).toBeNull());
  });

  it('calls back when the thread is resolved', async () => {
    const onResolve = vi.fn();
    render(<Page onResolve={onResolve} />);
    fireEvent.click(ghost('c1'));
    fireEvent.click(await screen.findByTestId('comment-ghost-resolve'));
    expect(onResolve).toHaveBeenCalledWith('c1');
  });

  // Resolving something already resolved is a no-op the UI should not offer.
  it('does not offer resolve on a resolved thread', async () => {
    render(<Page onResolve={vi.fn()} onOpenThread={vi.fn()} />);
    fireEvent.click(ghost('c2'));
    await screen.findByTestId('comment-ghost-card');
    expect(screen.getByText('Resolved')).toBeTruthy();
    expect(screen.queryByTestId('comment-ghost-resolve')).toBeNull();
  });

  // The whole reason the component exists: no margin column anywhere on the
  // page, and the discussion is still both visible and reachable.
  it('works with no gutter rendered', async () => {
    render(<Page onOpenThread={vi.fn()} />);
    expect(screen.queryByTestId('document-gutter')).toBeNull();
    expect(document.querySelectorAll('[data-comment-id]').length).toBeGreaterThan(0);
    fireEvent.click(ghost('c1'));
    expect(await screen.findByTestId('comment-ghost-card')).toBeTruthy();
  });

  it('reports the open thread so the host can mark it active', async () => {
    const onOpenChange = vi.fn();
    render(<Page onOpenChange={onOpenChange} />);
    fireEvent.click(ghost('c1'));
    await screen.findByTestId('comment-ghost-card');
    expect(onOpenChange).toHaveBeenCalledWith('c1');
  });

  it('ignores hover entirely when hoverEnabled is false', async () => {
    render(<Page hoverEnabled={false} />);
    fireEvent.mouseOver(ghost('c1'));
    await new Promise((resolve) => setTimeout(resolve, 20));
    expect(screen.queryByTestId('comment-ghost-card')).toBeNull();
    // Click still works — turning hover off must not remove the affordance.
    fireEvent.click(ghost('c1'));
    expect(await screen.findByTestId('comment-ghost-card')).toBeTruthy();
  });

  // The wiring path for CommentHighlight's onCommentClick, which hands over an
  // id (and the event) rather than an element.
  it('opens from the imperative handle, looking the mark up by id', async () => {
    const handle = { current: null as CommentGhostPopoverHandle | null };
    render(<Page handleRef={handle} />);
    act(() => handle.current!.openComment('c1'));
    expect(await screen.findByTestId('comment-ghost-card')).toBeTruthy();
    expect(screen.getByText('Ada Lovelace')).toBeTruthy();
  });

  // A decoration whose thread the host has not loaded would otherwise open an
  // empty card, which is worse than leaving the mark alone.
  it('does not open a card for an unknown comment id', async () => {
    const handle = { current: null as CommentGhostPopoverHandle | null };
    render(<Page handleRef={handle} threads={[]} />);
    act(() => handle.current!.openComment('c1'));
    fireEvent.click(ghost('c1'));
    await new Promise((resolve) => setTimeout(resolve, 20));
    expect(screen.queryByTestId('comment-ghost-card')).toBeNull();
  });
});
