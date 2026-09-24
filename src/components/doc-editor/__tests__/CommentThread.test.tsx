import { cleanup, createEvent, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import CommentThreadNode, { resolverLabel } from '../CommentThread';
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

    expect(screen.getByTestId('comment-resolved-banner')).toHaveAttribute('aria-expanded', 'true');
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

    expect(screen.getByTestId('comment-resolved-banner')).toHaveAttribute('aria-expanded', 'true');
    expect(ev.defaultPrevented).toBe(true);
  });

  it('collapses again on Space from the expanded banner', () => {
    renderBanner();

    fireEvent.keyDown(screen.getByRole('button', { name: /Resolved by Ann Lee/ }), { key: 'Enter' });

    const expanded = screen.getByRole('button', { name: /Resolved by Ann Lee/ });
    const ev = createEvent.keyDown(expanded, { key: ' ' });
    fireEvent(expanded, ev);

    expect(ev.defaultPrevented).toBe(true);
    expect(screen.getByTestId('comment-resolved-banner')).toHaveAttribute('aria-expanded', 'false');
  });

  it('keeps the nested Reopen button independent of the banner', () => {
    const onUnresolveThread = vi.fn();
    renderBanner({ onUnresolveThread });

    fireEvent.click(screen.getByRole('button', { name: 'Reopen' }));

    expect(onUnresolveThread).toHaveBeenCalledWith('c1');
    // The banner must not have expanded as a side effect of the nested click.
    expect(screen.getByTestId('comment-resolved-banner')).toHaveAttribute('aria-expanded', 'false');
  });
});

// WS-J polish: one tidy row — a person's name, never an agent's id; no inline
// "click to expand" text (the chevron + clickable row say it).
describe('CommentThread — resolved banner row', () => {
  it('names an agent resolver as "<Model> agent", not its id', () => {
    renderBanner({ comment: resolvedThread({ resolvedBy: 'agent:haiku' }) });
    expect(screen.getByTestId('comment-resolved-banner').textContent).toContain('Resolved by Haiku agent');
    expect(screen.queryByText(/agent:haiku/)).toBeNull();
    expect(screen.queryByText(/click to/)).toBeNull();
  });

  it('resolverLabel keeps a display name as is', () => {
    expect(resolverLabel('Ann Lee')).toBe('Ann Lee');
    expect(resolverLabel('agent:claude-sonnet')).toBe('Claude sonnet agent');
    expect(resolverLabel(undefined)).toBe('someone');
  });
});

// WS-J: a comment card says WHERE it was made.
describe('CommentThreadNode context header', () => {
  const open = () => resolvedThread({ resolved: false, resolvedBy: undefined, resolvedAt: undefined });

  it('quotes the anchored text above the body', () => {
    renderBanner({ comment: open(), context: { kind: 'quote', text: 'Publish the rollback procedure' } });
    const header = screen.getByTestId('comment-context');
    expect(header.getAttribute('data-kind')).toBe('quote');
    expect(header.textContent).toContain('Publish the rollback procedure');
  });

  it('says the text was removed, keeping the snapshot', () => {
    renderBanner({ comment: open(), context: { kind: 'removed', text: 'Old line' } });
    expect(screen.getByText('Original text was removed')).toBeTruthy();
    expect(screen.getByText('Old line')).toBeTruthy();
  });

  it('labels a document-level comment', () => {
    renderBanner({ comment: open(), context: { kind: 'document' } });
    expect(screen.getByTestId('comment-context').textContent).toBe('On the whole document');
  });

  it('renders the actions slot on the root only', () => {
    const reply = { ...open(), id: 'r1', parentCommentId: 'c1' };
    renderBanner({ comment: { ...open(), replies: [reply] }, actions: <button type="button">Ask agent</button> });
    expect(screen.getAllByText('Ask agent')).toHaveLength(1);
  });
});
