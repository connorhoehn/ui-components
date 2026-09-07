import { renderHook } from '@testing-library/react';
import { useMyMentionsAndTasks } from '../useMyMentionsAndTasks';
import type { Section, CommentThread } from '../../types/document';

// ---------------------------------------------------------------------------
// Test data helpers
// ---------------------------------------------------------------------------

const ME = { userId: 'u-alice', displayName: 'Alice' };

function makeSection(id: string, items: Section['items'] = []): Section {
  return { id, type: 'tasks', title: `Section ${id}`, collapsed: false, items };
}

function makeTask(overrides: Partial<Section['items'][number]>): Section['items'][number] {
  return {
    id: 'i1',
    text: '',
    status: 'pending',
    priority: 'medium',
    assignee: '',
    ackedBy: '',
    ackedAt: '',
    notes: '',
    ...overrides,
  };
}

function makeThread(
  id: string,
  text: string,
  opts: Partial<CommentThread> = {},
): CommentThread {
  return {
    id,
    text,
    userId: 'u-other',
    displayName: 'Bob',
    color: '#00f',
    timestamp: '2024-01-01T00:00:00.000Z',
    resolved: false,
    resolvedBy: undefined,
    resolvedAt: undefined,
    parentCommentId: null,
    replies: [],
    ...opts,
  };
}

// ---------------------------------------------------------------------------
// Empty / no data
// ---------------------------------------------------------------------------

describe('empty inputs', () => {
  it('returns empty array when there are no sections', () => {
    const { result } = renderHook(() =>
      useMyMentionsAndTasks({ sections: [], comments: {}, ...ME }),
    );
    expect(result.current).toEqual([]);
  });

  it('returns empty array when no mentions or assignments match', () => {
    const sections = [makeSection('s1')];
    const comments = { s1: [makeThread('c1', 'No mention here')] };
    const { result } = renderHook(() =>
      useMyMentionsAndTasks({ sections, comments, ...ME }),
    );
    expect(result.current).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// Mentions
// ---------------------------------------------------------------------------

describe('mentions', () => {
  it('picks up a @mention of displayName', () => {
    const sections = [makeSection('s1')];
    const comments = { s1: [makeThread('c1', 'Hey @Alice great job!')] };
    const { result } = renderHook(() =>
      useMyMentionsAndTasks({ sections, comments, ...ME }),
    );

    expect(result.current).toHaveLength(1);
    expect(result.current[0].kind).toBe('mention');
    if (result.current[0].kind === 'mention') {
      expect(result.current[0].commentId).toBe('c1');
      expect(result.current[0].authorName).toBe('Bob');
    }
  });

  it('is case-insensitive for mention matching', () => {
    const sections = [makeSection('s1')];
    const comments = { s1: [makeThread('c1', 'ping @alice please')] };
    const { result } = renderHook(() =>
      useMyMentionsAndTasks({ sections, comments, ...ME }),
    );
    expect(result.current).toHaveLength(1);
  });

  it('ignores self-authored comments', () => {
    const sections = [makeSection('s1')];
    const comments = {
      s1: [makeThread('c1', '@Alice self-mention', { userId: ME.userId })],
    };
    const { result } = renderHook(() =>
      useMyMentionsAndTasks({ sections, comments, ...ME }),
    );
    expect(result.current).toHaveLength(0);
  });

  it('finds mentions in nested replies', () => {
    const reply = makeThread('r1', '@Alice see below');
    const root = makeThread('c1', 'Root comment', { replies: [reply] });
    const sections = [makeSection('s1')];
    const comments = { s1: [root] };
    const { result } = renderHook(() =>
      useMyMentionsAndTasks({ sections, comments, ...ME }),
    );
    expect(result.current).toHaveLength(1);
    if (result.current[0].kind === 'mention') {
      expect(result.current[0].commentId).toBe('r1');
    }
  });

  it('sorts mentions newest-first', () => {
    const sections = [makeSection('s1')];
    const comments = {
      s1: [
        makeThread('c1', '@Alice early', { timestamp: '2024-01-01T00:00:00.000Z' }),
        makeThread('c2', '@Alice late', { timestamp: '2024-06-01T00:00:00.000Z' }),
      ],
    };
    const { result } = renderHook(() =>
      useMyMentionsAndTasks({ sections, comments, ...ME }),
    );
    expect(result.current[0].kind === 'mention' && result.current[0].commentId).toBe('c2');
    expect(result.current[1].kind === 'mention' && result.current[1].commentId).toBe('c1');
  });
});

// ---------------------------------------------------------------------------
// Task assignments
// ---------------------------------------------------------------------------

describe('task assignments', () => {
  it('picks up a task assigned to the displayName (case-insensitive)', () => {
    const sections = [
      makeSection('s1', [
        makeTask({ id: 'i1', text: 'Fix bug', assignee: 'alice', status: 'pending', priority: 'high' }),
      ]),
    ];
    const { result } = renderHook(() =>
      useMyMentionsAndTasks({ sections, comments: {}, ...ME }),
    );
    expect(result.current).toHaveLength(1);
    expect(result.current[0].kind).toBe('task');
    if (result.current[0].kind === 'task') {
      expect(result.current[0].taskText).toBe('Fix bug');
      expect(result.current[0].status).toBe('pending');
    }
  });

  it('picks up a task assigned to userId', () => {
    const sections = [
      makeSection('s1', [
        makeTask({ id: 'i1', text: 'Deploy', assignee: ME.userId, status: 'done', priority: 'low' }),
      ]),
    ];
    const { result } = renderHook(() =>
      useMyMentionsAndTasks({ sections, comments: {}, ...ME }),
    );
    expect(result.current).toHaveLength(1);
    expect(result.current[0].kind).toBe('task');
  });

  it('ignores tasks assigned to other users', () => {
    const sections = [
      makeSection('s1', [
        makeTask({ id: 'i1', text: 'Bob task', assignee: 'bob', status: 'pending', priority: 'medium' }),
      ]),
    ];
    const { result } = renderHook(() =>
      useMyMentionsAndTasks({ sections, comments: {}, ...ME }),
    );
    expect(result.current).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// Ordering: mentions before tasks
// ---------------------------------------------------------------------------

describe('ordering', () => {
  it('returns mentions before tasks in the result', () => {
    const sections = [
      makeSection('s1', [
        makeTask({ id: 'i1', text: 'My task', assignee: 'Alice', status: 'pending', priority: 'low' }),
      ]),
    ];
    const comments = { s1: [makeThread('c1', 'Hey @Alice')] };
    const { result } = renderHook(() =>
      useMyMentionsAndTasks({ sections, comments, ...ME }),
    );
    expect(result.current[0].kind).toBe('mention');
    expect(result.current[1].kind).toBe('task');
  });
});

// ---------------------------------------------------------------------------
// Page-shaped (canvas) documents
// ---------------------------------------------------------------------------
//
// A canvas document has NO sections — its comments are anchored to text ranges
// and filed under an empty section id. Walking `sections` to find mentions
// therefore examined nothing, and My Items was permanently empty on exactly
// the documents this product now creates. The failure was silent: an empty
// panel is indistinguishable from "nobody mentioned you".
describe('a document with no sections', () => {
  it('still finds a mention filed under an empty section id', () => {
    const comments = {
      '': [makeThread('c1', '@Alice can you look at this line?', { userId: 'u-bob', displayName: 'Bob' })],
    };
    const { result } = renderHook(() =>
      useMyMentionsAndTasks({ sections: [], comments, ...ME }),
    );
    expect(result.current).toHaveLength(1);
    expect(result.current[0]).toMatchObject({ kind: 'mention', commentId: 'c1' });
  });

  it('leaves the section title empty rather than dropping the mention', () => {
    const comments = {
      'anchor-xyz': [makeThread('c2', 'ping @Alice', { userId: 'u-bob', displayName: 'Bob' })],
    };
    const { result } = renderHook(() =>
      useMyMentionsAndTasks({ sections: [], comments, ...ME }),
    );
    expect(result.current).toHaveLength(1);
    expect(result.current[0]).toMatchObject({ sectionId: 'anchor-xyz', sectionTitle: '' });
  });

  it('still titles a mention when the section DOES exist', () => {
    const sections = [makeSection('s1')];
    const comments = {
      s1: [makeThread('c3', 'hey @Alice', { userId: 'u-bob', displayName: 'Bob' })],
    };
    const { result } = renderHook(() =>
      useMyMentionsAndTasks({ sections, comments, ...ME }),
    );
    expect(result.current[0]).toMatchObject({ sectionTitle: 'Section s1' });
  });
});
