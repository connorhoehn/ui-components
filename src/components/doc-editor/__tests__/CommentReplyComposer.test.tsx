// WS-J lane B: what a margin card can do from its reply box and action row.

import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import CommentThreadNode, { renderCommentText } from '../CommentThread';
import { commentReplyIntent } from '../CommentReplyComposer';
import { DictationButton, DICTATION_HOLD_MS } from '../DictationButton';
import type { CommentThread } from '../../../types/document';

afterEach(() => { cleanup(); vi.useRealTimers(); });

const thread = (over: Partial<CommentThread> = {}): CommentThread => ({
  id: 'c1', text: 'Rollback procedure needs an owner', userId: 'u1', displayName: 'carol@local.dev',
  color: '#f00', timestamp: '2026-09-23T12:00:00Z', parentCommentId: null, resolved: false, replies: [], ...over,
});

describe('commentReplyIntent', () => {
  it('routes the three commands and leaves everything else a reply', () => {
    expect(commentReplyIntent({ text: 'Looks good' })).toEqual({ kind: 'reply', text: 'Looks good' });
    expect(commentReplyIntent({ text: '/resolve' })).toEqual({ kind: 'resolve', note: '' });
    expect(commentReplyIntent({ text: '/resolve done in v2' })).toEqual({ kind: 'resolve', note: 'done in v2' });
    expect(commentReplyIntent({ text: '/agent add Carol as owner' })).toEqual({ kind: 'agent', instruction: 'add Carol as owner' });
    expect(commentReplyIntent({ text: '/assign @Frank' })).toEqual({ kind: 'assign', userId: null, name: 'Frank' });
    expect(commentReplyIntent({ text: '/assign Frank', command: { trigger: '/assign', argument: { id: 'u-frank', label: 'Frank' } } }))
      .toEqual({ kind: 'assign', userId: 'u-frank', name: 'Frank' });
    expect(commentReplyIntent({ text: '/resolved is a word' })).toEqual({ kind: 'reply', text: '/resolved is a word' });
    expect(commentReplyIntent({ text: '   ' })).toEqual({ kind: 'empty' });
  });
});

describe('renderCommentText', () => {
  it('links same-origin run paths and keeps mentions', () => {
    render(<p>{renderCommentText('Addressed by [run 3f2a1b2c](/pipelines/document-agent-edit/runs/3f2a1b2c) — ping @Carol')}</p>);
    const link = screen.getByRole('link', { name: 'run 3f2a1b2c' });
    expect(link.getAttribute('href')).toBe('/pipelines/document-agent-edit/runs/3f2a1b2c');
    expect(screen.getByText('@Carol')).toBeTruthy();
  });
  it('never links another origin', () => {
    render(<p>{renderCommentText('[x](//evil.example/a) [y](https://evil.example)')}</p>);
    expect(screen.queryByRole('link')).toBeNull();
  });
});

describe('CommentThreadNode — lane B', () => {
  it('offers Ask agent on an open root thread only', () => {
    const onAskAgent = vi.fn();
    render(<CommentThreadNode comment={thread({ replies: [thread({ id: 'r1', parentCommentId: 'c1' })] })} depth={0} onReply={() => {}} mentionUsers={[]} onAskAgent={onAskAgent} />);
    fireEvent.click(screen.getByTestId('comment-ask-agent-c1'));
    expect(onAskAgent).toHaveBeenCalledWith('c1');
    expect(screen.queryByTestId('comment-ask-agent-r1')).toBeNull();
  });
  it('renders the host reply box instead of the textarea, and submit replies to that comment', () => {
    const onReply = vi.fn();
    render(
      <CommentThreadNode
        comment={thread()} depth={0} onReply={onReply} mentionUsers={[]}
        renderReply={({ commentId, submit }) => <button type="button" onClick={() => submit('hi')}>host-{commentId}</button>}
      />,
    );
    fireEvent.click(screen.getByText('Reply'));
    expect(screen.queryByPlaceholderText(/Write a reply/)).toBeNull();
    fireEvent.click(screen.getByText('host-c1'));
    expect(onReply).toHaveBeenCalledWith('c1', 'hi');
    expect(screen.queryByText('host-c1')).toBeNull();
  });
});

describe('DictationButton', () => {
  it('hold records until release; a tap toggles', () => {
    vi.useFakeTimers();
    const onStart = vi.fn();
    const onStop = vi.fn();
    const { rerender } = render(<DictationButton state="idle" micActive={false} onStart={onStart} onStop={onStop} />);
    const btn = screen.getByTestId('dictation-button');
    fireEvent.pointerDown(btn, { button: 0 });
    act(() => { vi.advanceTimersByTime(DICTATION_HOLD_MS + 50); });
    fireEvent.pointerUp(btn);
    expect(onStart).toHaveBeenCalledTimes(1);
    expect(onStop).toHaveBeenCalledTimes(1);

    fireEvent.pointerDown(btn, { button: 0 });
    fireEvent.pointerUp(btn);
    expect(onStop).toHaveBeenCalledTimes(1);
    rerender(<DictationButton state="listening" micActive onStart={onStart} onStop={onStop} />);
    expect(btn.getAttribute('aria-pressed')).toBe('true');
    fireEvent.pointerDown(btn, { button: 0 });
    expect(onStop).toHaveBeenCalledTimes(2);
  });
  it('says why when it cannot record', () => {
    render(<DictationButton state="idle" micActive={false} unavailableReason="Sign in to dictate" onStart={() => {}} onStop={() => {}} />);
    expect(screen.getByLabelText('Sign in to dictate')).toBeTruthy();
  });
});
