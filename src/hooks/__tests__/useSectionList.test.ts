import { renderHook, act } from '@testing-library/react';
import * as Y from 'yjs';
import { useSectionList } from '../useSectionList';
import type { Section, TaskItem } from '../../types/document';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeSection(overrides: Partial<Section> = {}): Section {
  return {
    id: 's1',
    type: 'tasks',
    title: 'My Tasks',
    items: [],
    ...overrides,
  };
}

function makeItem(overrides: Partial<TaskItem> = {}): TaskItem {
  return {
    id: 'i1',
    text: 'Do the thing',
    status: 'pending',
    priority: 'medium',
    assignees: [],
    ...overrides,
  };
}

/** Advance fake timers past the 16ms observer debounce. */
async function flush() {
  await act(async () => {
    vi.advanceTimersByTime(20);
    await Promise.resolve();
  });
}

// ---------------------------------------------------------------------------
// Setup
// ---------------------------------------------------------------------------

beforeEach(() => { vi.useFakeTimers(); });
afterEach(() => { vi.useRealTimers(); });

// ---------------------------------------------------------------------------
// null ydoc
// ---------------------------------------------------------------------------

describe('null ydoc', () => {
  it('returns empty sections and comments when ydoc is null', () => {
    const { result } = renderHook(() => useSectionList(null));
    expect(result.current.sections).toEqual([]);
    expect(result.current.comments).toEqual({});
  });

  it('CRUD operations are no-ops when ydoc is null', () => {
    const { result } = renderHook(() => useSectionList(null));
    expect(() => {
      result.current.addSection(makeSection());
      result.current.updateSection('s1', { title: 'x' });
      result.current.removeSection('s1');
    }).not.toThrow();
  });
});

// ---------------------------------------------------------------------------
// Section CRUD
// ---------------------------------------------------------------------------

describe('addSection', () => {
  it('adds a section and reflects it in state', async () => {
    const ydoc = new Y.Doc();
    const { result } = renderHook(() => useSectionList(ydoc));

    act(() => { result.current.addSection(makeSection()); });
    await flush();

    expect(result.current.sections).toHaveLength(1);
    expect(result.current.sections[0].id).toBe('s1');
    expect(result.current.sections[0].title).toBe('My Tasks');
  });

  it('adds a section with pre-populated items', async () => {
    const ydoc = new Y.Doc();
    const { result } = renderHook(() => useSectionList(ydoc));

    act(() => {
      result.current.addSection(makeSection({ items: [makeItem()] }));
    });
    await flush();

    expect(result.current.sections[0].items).toHaveLength(1);
    expect(result.current.sections[0].items[0].text).toBe('Do the thing');
  });
});

describe('updateSection', () => {
  it('updates a field on an existing section', async () => {
    const ydoc = new Y.Doc();
    const { result } = renderHook(() => useSectionList(ydoc));

    act(() => { result.current.addSection(makeSection()); });
    await flush();

    act(() => { result.current.updateSection('s1', { title: 'Renamed' }); });
    await flush();

    expect(result.current.sections[0].title).toBe('Renamed');
  });

  it('is a no-op for an unknown sectionId', async () => {
    const ydoc = new Y.Doc();
    const { result } = renderHook(() => useSectionList(ydoc));

    act(() => { result.current.addSection(makeSection()); });
    await flush();

    act(() => { result.current.updateSection('ghost', { title: 'x' }); });
    await flush();

    expect(result.current.sections[0].title).toBe('My Tasks');
  });
});

describe('removeSection', () => {
  it('removes a section by id', async () => {
    const ydoc = new Y.Doc();
    const { result } = renderHook(() => useSectionList(ydoc));

    act(() => {
      result.current.addSection(makeSection({ id: 's1' }));
      result.current.addSection(makeSection({ id: 's2', title: 'Keep me' }));
    });
    await flush();

    act(() => { result.current.removeSection('s1'); });
    await flush();

    expect(result.current.sections).toHaveLength(1);
    expect(result.current.sections[0].id).toBe('s2');
  });
});

// ---------------------------------------------------------------------------
// Item CRUD
// ---------------------------------------------------------------------------

describe('addItem', () => {
  it('appends an item to a section', async () => {
    const ydoc = new Y.Doc();
    const { result } = renderHook(() => useSectionList(ydoc));

    act(() => { result.current.addSection(makeSection()); });
    await flush();

    act(() => { result.current.addItem('s1', makeItem()); });
    await flush();

    expect(result.current.sections[0].items).toHaveLength(1);
    expect(result.current.sections[0].items[0].id).toBe('i1');
  });
});

describe('updateItem', () => {
  it('updates fields on an item', async () => {
    const ydoc = new Y.Doc();
    const { result } = renderHook(() => useSectionList(ydoc));

    act(() => { result.current.addSection(makeSection({ items: [makeItem()] })); });
    await flush();

    act(() => { result.current.updateItem('s1', 'i1', { text: 'Updated', status: 'done' }); });
    await flush();

    const item = result.current.sections[0].items[0];
    expect(item.text).toBe('Updated');
    expect(item.status).toBe('done');
  });
});

describe('removeItem', () => {
  it('removes an item by id', async () => {
    const ydoc = new Y.Doc();
    const { result } = renderHook(() => useSectionList(ydoc));

    act(() => {
      result.current.addSection(
        makeSection({ items: [makeItem({ id: 'i1' }), makeItem({ id: 'i2', text: 'Keep' })] }),
      );
    });
    await flush();

    act(() => { result.current.removeItem('s1', 'i1'); });
    await flush();

    expect(result.current.sections[0].items).toHaveLength(1);
    expect(result.current.sections[0].items[0].id).toBe('i2');
  });
});

describe('ackItem / rejectItem', () => {
  it('ackItem sets status to acked with userId and timestamp', async () => {
    const ydoc = new Y.Doc();
    const { result } = renderHook(() => useSectionList(ydoc));

    act(() => { result.current.addSection(makeSection({ items: [makeItem()] })); });
    await flush();

    act(() => { result.current.ackItem('s1', 'i1', 'user-42'); });
    await flush();

    const item = result.current.sections[0].items[0];
    expect(item.status).toBe('acked');
    expect(item.ackedBy).toBe('user-42');
    expect(item.ackedAt).toBeTruthy();
  });

  it('rejectItem sets status to rejected', async () => {
    const ydoc = new Y.Doc();
    const { result } = renderHook(() => useSectionList(ydoc));

    act(() => { result.current.addSection(makeSection({ items: [makeItem()] })); });
    await flush();

    act(() => { result.current.rejectItem('s1', 'i1', 'user-7'); });
    await flush();

    const item = result.current.sections[0].items[0];
    expect(item.status).toBe('rejected');
    expect(item.ackedBy).toBe('user-7');
  });
});

// ---------------------------------------------------------------------------
// getSectionFragment
// ---------------------------------------------------------------------------

describe('getSectionFragment', () => {
  it('returns null before content is initialized', async () => {
    const ydoc = new Y.Doc();
    const { result } = renderHook(() => useSectionList(ydoc));

    act(() => { result.current.addSection(makeSection()); });
    await flush();

    const frag = result.current.getSectionFragment('s1');
    expect(frag).toBeNull();
  });

  it('returns a Y.XmlFragment once created via microtask', async () => {
    const ydoc = new Y.Doc();
    const { result } = renderHook(() => useSectionList(ydoc));

    act(() => { result.current.addSection(makeSection()); });
    await flush();

    // First call returns null and queues creation
    result.current.getSectionFragment('s1');

    // Let the queued microtask run
    await act(async () => { await Promise.resolve(); });

    // Second call should now find the fragment
    const frag = result.current.getSectionFragment('s1');
    expect(frag).toBeInstanceOf(Y.XmlFragment);
  });
});

// ---------------------------------------------------------------------------
// Comments
// ---------------------------------------------------------------------------

describe('addComment / resolveThread / unresolveThread', () => {
  it('addComment creates a root comment on the section', async () => {
    const ydoc = new Y.Doc();
    const { result } = renderHook(() => useSectionList(ydoc));

    act(() => { result.current.addSection(makeSection()); });
    await flush();

    act(() => {
      result.current.addComment('s1', {
        text: 'LGTM',
        userId: 'u1',
        displayName: 'Alice',
        color: '#ff0',
      });
    });
    await flush();

    const threads = result.current.comments['s1'];
    expect(threads).toHaveLength(1);
    expect(threads[0].text).toBe('LGTM');
    expect(threads[0].userId).toBe('u1');
    expect(threads[0].replies).toEqual([]);
  });

  it('addComment with parentCommentId creates a reply', async () => {
    const ydoc = new Y.Doc();
    const { result } = renderHook(() => useSectionList(ydoc));

    act(() => { result.current.addSection(makeSection()); });
    await flush();

    // Add root comment
    act(() => {
      result.current.addComment('s1', {
        text: 'Root',
        userId: 'u1',
        displayName: 'Alice',
        color: '#ff0',
      });
    });
    await flush();

    const rootId = result.current.comments['s1'][0].id;

    // Add reply
    act(() => {
      result.current.addComment('s1', {
        text: 'Reply',
        userId: 'u2',
        displayName: 'Bob',
        color: '#00f',
        parentCommentId: rootId,
      });
    });
    await flush();

    const threads = result.current.comments['s1'];
    expect(threads).toHaveLength(1);
    expect(threads[0].replies).toHaveLength(1);
    expect(threads[0].replies[0].text).toBe('Reply');
  });

  it('resolveThread marks the comment as resolved', async () => {
    const ydoc = new Y.Doc();
    const { result } = renderHook(() => useSectionList(ydoc));

    act(() => { result.current.addSection(makeSection()); });
    await flush();

    act(() => {
      result.current.addComment('s1', {
        text: 'Question',
        userId: 'u1',
        displayName: 'Alice',
        color: '#ff0',
      });
    });
    await flush();

    const commentId = result.current.comments['s1'][0].id;

    act(() => { result.current.resolveThread('s1', commentId, 'Bob'); });
    await flush();

    const thread = result.current.comments['s1'][0];
    expect(thread.resolved).toBe(true);
    expect(thread.resolvedBy).toBe('Bob');
    expect(thread.resolvedAt).toBeTruthy();
  });

  it('unresolveThread clears resolved state', async () => {
    const ydoc = new Y.Doc();
    const { result } = renderHook(() => useSectionList(ydoc));

    act(() => { result.current.addSection(makeSection()); });
    await flush();

    act(() => {
      result.current.addComment('s1', { text: 'Q', userId: 'u1', displayName: 'Alice', color: '#f' });
    });
    await flush();

    const commentId = result.current.comments['s1'][0].id;

    act(() => { result.current.resolveThread('s1', commentId, 'Bob'); });
    await flush();

    act(() => { result.current.unresolveThread('s1', commentId); });
    await flush();

    const thread = result.current.comments['s1'][0];
    expect(thread.resolved).toBe(false);
    expect(thread.resolvedBy).toBeUndefined();
  });
});

// ---------------------------------------------------------------------------
// ydoc switch (null → doc → null)
// ---------------------------------------------------------------------------

describe('ydoc transitions', () => {
  it('clears sections when ydoc switches to null', async () => {
    let ydoc: Y.Doc | null = new Y.Doc();
    const { result, rerender } = renderHook(() => useSectionList(ydoc));

    act(() => { result.current.addSection(makeSection()); });
    await flush();
    expect(result.current.sections).toHaveLength(1);

    ydoc = null;
    rerender();
    await flush();

    expect(result.current.sections).toHaveLength(0);
  });
});
