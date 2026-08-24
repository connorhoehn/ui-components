import { cleanup, createEvent, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import CommentThreadNode from '../CommentThread';
import type { CommentThread } from '../../../types/document';

afterEach(cleanup);

function resolvedThread(overrides: Partial<CommentThread> = {}): CommentThread {
  return {
    id: 'c1',
    text: 'Please double-check this paragraph',
    userId: 'u1',
    displayName: 'Jane Doe',
    color: '#f00',
    timestamp: '2026-06-07T12:00:00Z',
    parentCommentId: null,
    resolved: true,
    resolvedBy: 'Ann Lee',
    resolvedAt: '2026-06-07T12:30:00Z',
    replies: [],
    ...overrides,
  };
}

function renderBanner(props: Partial<React.ComponentProps<typeof CommentThreadNode>> = {}) {
  return render(
    <CommentThreadNode
      comment={resolvedThread()}
      depth={0}
      onReply={() => {}}
      mentionUsers={[]}
      {...props}
    />,
  );
}

// REGRESSION: the resolved-thread banner ("click to expand" / "click to
// collapse") was a bare <div> with onClick. It was not focusable, exposed no
// role, and had no aria-expanded — so a keyboard user could never read a
// resolved thread. It cannot become a <button> because it wraps the nested
// "Reopen" button, so it is role="button" + tabIndex + onKeyDown.
describe('CommentThread — resolved banner keyboard access', () => {
  it('exposes the collapsed banner as a focusable disclosure', () => {
    renderBanner();

    const banner = screen.getByRole('button', { name: /Resolved by Ann Lee/ });
    expect(banner).toHaveAttribute('tabindex', '0');
    expect(banner).toHaveAttribute('aria-expanded', 'false');

    banner.focus();
    expect(banner).toHaveFocus();
  });

  it('expands the thread on Enter and reports aria-expanded=true', () => {
    renderBanner();

    fireEvent.keyDown(screen.getByRole('button', { name: /Resolved by Ann Lee/ }), { key: 'Enter' });

    expect(screen.getByText(/click to collapse/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Resolved by Ann Lee/ })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
  });

  it('expands on Space and prevents the page from scrolling', () => {
    renderBanner();

    const banner = screen.getByRole('button', { name: /Resolved by Ann Lee/ });
    const ev = createEvent.keyDown(banner, { key: ' ' });
    fireEvent(banner, ev);

    expect(screen.getByText(/click to collapse/)).toBeInTheDocument();
    expect(ev.defaultPrevented).toBe(true);
  });

  it('collapses again on Space from the expanded banner', () => {
    renderBanner();

    fireEvent.keyDown(screen.getByRole('button', { name: /Resolved by Ann Lee/ }), { key: 'Enter' });

    const expanded = screen.getByRole('button', { name: /Resolved by Ann Lee/ });
    const ev = createEvent.keyDown(expanded, { key: ' ' });
    fireEvent(expanded, ev);

    expect(ev.defaultPrevented).toBe(true);
    expect(screen.getByText(/click to expand/)).toBeInTheDocument();
  });

  it('keeps the nested Reopen button independent of the banner', () => {
    const onUnresolveThread = vi.fn();
    renderBanner({ onUnresolveThread });

    fireEvent.click(screen.getByRole('button', { name: 'Reopen' }));

    expect(onUnresolveThread).toHaveBeenCalledWith('c1');
    // The banner must not have expanded as a side effect of the nested click.
    expect(screen.getByText(/click to expand/)).toBeInTheDocument();
  });
});
