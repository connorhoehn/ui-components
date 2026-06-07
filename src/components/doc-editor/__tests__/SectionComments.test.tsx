import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { CommentThread } from '../../../types/document';

vi.mock('../MentionDropdown', () => ({
  MentionDropdown: () => <div data-testid="mention-dropdown" />,
}));

vi.mock('../../../hooks/useMentionUsers', () => ({
  useMentionUsers: () => [{ userId: 'u1', displayName: 'Alice', color: '#000' }],
}));

vi.mock('../CommentThread', () => {
  const MENTION_INITIAL = {
    active: false,
    query: '',
    position: { top: 0, left: 0 },
    atIndex: -1,
  };
  const CommentThreadNode = (props: {
    comment: { id: string; text: string };
    onReply: (id: string, text: string) => void;
  }) => (
    <div data-testid={`thread-${props.comment.id}`}>
      <span>{props.comment.text}</span>
      <button
        data-testid={`reply-${props.comment.id}`}
        onClick={() => props.onReply(props.comment.id, 'a reply')}
      >
        reply
      </button>
    </div>
  );
  return {
    default: CommentThreadNode,
    MENTION_INITIAL,
    countAllComments: (threads: CommentThread[]) =>
      threads.reduce(
        (n, t) => n + 1 + (Array.isArray(t.replies) ? t.replies.length : 0),
        0,
      ),
    detectMention: (value: string) =>
      value.endsWith('@')
        ? { active: true, query: '', position: { top: 0, left: 0 }, atIndex: value.length - 1 }
        : MENTION_INITIAL,
    insertMention: (value: string) => ({
      newValue: `${value}Alice `,
      newCursor: value.length + 6,
    }),
  };
});

import SectionComments from '../SectionComments';

function thread(
  id: string,
  text: string,
  timestamp: string,
  overrides: Partial<CommentThread> = {},
): CommentThread {
  return {
    id,
    text,
    userId: 'u',
    displayName: 'U',
    color: '#000',
    timestamp,
    replies: [],
    resolved: false,
    ...overrides,
  } as CommentThread;
}

let onAdd: (text: string, parentId?: string | null) => void;
let onResolve: (commentId: string) => void;
let onUnresolve: (commentId: string) => void;

beforeEach(() => {
  onAdd = vi.fn();
  onResolve = vi.fn();
  onUnresolve = vi.fn();
});
afterEach(cleanup);

describe('SectionComments — toggle', () => {
  it('renders ▼ + count when expanded with threads', () => {
    render(<SectionComments comments={[thread('t1', 'hi', '2026-03-01T00:00:00Z')]} onAddComment={onAdd} />);
    expect(screen.getByRole('button', { name: /▼ Comments \(1\)/ })).toBeInTheDocument();
  });

  it('collapses on click, hiding the input', () => {
    render(<SectionComments comments={[]} onAddComment={onAdd} />);
    expect(screen.getByPlaceholderText(/Add a comment/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Comments/ }));
    expect(screen.queryByPlaceholderText(/Add a comment/)).toBeNull();
    expect(screen.getByRole('button', { name: /▶ Comments/ })).toBeInTheDocument();
  });

  it('omits the (N) suffix when no comments are present', () => {
    render(<SectionComments comments={[]} onAddComment={onAdd} />);
    const btn = screen.getByRole('button', { name: /Comments/ });
    expect(btn.textContent).not.toMatch(/\(\d+\)/);
  });
});

describe('SectionComments — empty state', () => {
  it('shows the "Start the discussion" copy when expanded with no threads', () => {
    render(<SectionComments comments={[]} onAddComment={onAdd} />);
    expect(screen.getByText(/Start the discussion/)).toBeInTheDocument();
  });
});

describe('SectionComments — posting', () => {
  it('Post button calls onAddComment with trimmed text + null parent', () => {
    render(<SectionComments comments={[]} onAddComment={onAdd} />);
    const ta = screen.getByPlaceholderText(/Add a comment/) as HTMLTextAreaElement;
    fireEvent.change(ta, { target: { value: '  hello world  ' } });
    fireEvent.click(screen.getByRole('button', { name: 'Post' }));
    expect(onAdd).toHaveBeenCalledTimes(1);
    expect(onAdd).toHaveBeenCalledWith('hello world', null);
    expect(ta.value).toBe('');
  });

  it('does nothing when the draft is empty', () => {
    render(<SectionComments comments={[]} onAddComment={onAdd} />);
    fireEvent.click(screen.getByRole('button', { name: 'Post' }));
    expect(onAdd).not.toHaveBeenCalled();
  });

  it('does nothing when the draft is whitespace-only', () => {
    render(<SectionComments comments={[]} onAddComment={onAdd} />);
    const ta = screen.getByPlaceholderText(/Add a comment/);
    fireEvent.change(ta, { target: { value: '   \n  ' } });
    fireEvent.click(screen.getByRole('button', { name: 'Post' }));
    expect(onAdd).not.toHaveBeenCalled();
  });

  it('Enter without Shift submits the comment', () => {
    render(<SectionComments comments={[]} onAddComment={onAdd} />);
    const ta = screen.getByPlaceholderText(/Add a comment/);
    fireEvent.change(ta, { target: { value: 'quick post' } });
    fireEvent.keyDown(ta, { key: 'Enter', shiftKey: false });
    expect(onAdd).toHaveBeenCalledWith('quick post', null);
  });

  it('Enter while a mention dropdown is active does not submit', () => {
    render(<SectionComments comments={[]} onAddComment={onAdd} />);
    const ta = screen.getByPlaceholderText(/Add a comment/);
    fireEvent.change(ta, { target: { value: 'cc @' } });
    expect(screen.getByTestId('mention-dropdown')).toBeInTheDocument();
    fireEvent.keyDown(ta, { key: 'Enter', shiftKey: false });
    expect(onAdd).not.toHaveBeenCalled();
  });
});

describe('SectionComments — sorting + rendering', () => {
  it('hides the sort control when only one thread exists', () => {
    render(<SectionComments comments={[thread('t1', 'a', '2026-03-01T00:00:00Z')]} onAddComment={onAdd} />);
    expect(screen.queryByText(/Newest first/)).toBeNull();
  });

  it('renders newest-first by default and flips to oldest-first on toggle', () => {
    const threads = [
      thread('older', 'older', '2026-03-01T00:00:00Z'),
      thread('newer', 'newer', '2026-04-01T00:00:00Z'),
    ];
    render(<SectionComments comments={threads} onAddComment={onAdd} />);
    let rendered = screen.getAllByTestId(/^thread-/);
    expect(rendered.map((el) => el.getAttribute('data-testid'))).toEqual(['thread-newer', 'thread-older']);

    fireEvent.click(screen.getByRole('button', { name: /Newest first/ }));
    expect(screen.getByRole('button', { name: /Oldest first/ })).toBeInTheDocument();
    rendered = screen.getAllByTestId(/^thread-/);
    expect(rendered.map((el) => el.getAttribute('data-testid'))).toEqual(['thread-older', 'thread-newer']);
  });

  it('always sorts resolved threads after unresolved ones', () => {
    const threads = [
      thread('resolved-newer', 'r', '2026-05-01T00:00:00Z', { resolved: true }),
      thread('open-older', 'o', '2026-01-01T00:00:00Z', { resolved: false }),
    ];
    render(<SectionComments comments={threads} onAddComment={onAdd} />);
    const rendered = screen.getAllByTestId(/^thread-/);
    expect(rendered.map((el) => el.getAttribute('data-testid'))).toEqual([
      'thread-open-older',
      'thread-resolved-newer',
    ]);
  });

  it('forwards a thread reply to onAddComment with the parent id', () => {
    render(<SectionComments comments={[thread('t1', 'parent', '2026-03-01T00:00:00Z')]} onAddComment={onAdd} onResolveThread={onResolve} onUnresolveThread={onUnresolve} />);
    fireEvent.click(screen.getByTestId('reply-t1'));
    expect(onAdd).toHaveBeenCalledWith('a reply', 't1');
  });
});
