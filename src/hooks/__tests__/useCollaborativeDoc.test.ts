import { renderHook, act, waitFor } from '@testing-library/react';
import * as Y from 'yjs';
import { useCollaborativeDoc } from '../useCollaborativeDoc';
import type { UseCollaborativeDocOptions } from '../useCollaborativeDoc';
import type { GatewayMessage } from '../../types/gateway';

// ---------------------------------------------------------------------------
// Mock sub-hooks. The composer's only unique responsibilities are the
// sectionReviews observer + reviewSection mutation + loadFromMarkdown stub
// and the merged return shape — everything else has its own coverage.
// ---------------------------------------------------------------------------

const ctx = vi.hoisted(() => ({
  ydoc: null as Y.Doc | null,
  provider: { tag: 'provider-stub' } as unknown,
  exportJSONImpl: vi.fn(() => ({ document: 'exported' })),
  sectionApi: {
    sections: [{ id: 's1' }],
    comments: { s1: [] },
    addSection: vi.fn(),
    updateSection: vi.fn(),
    removeSection: vi.fn(),
    addItem: vi.fn(),
    updateItem: vi.fn(),
    removeItem: vi.fn(),
    ackItem: vi.fn(),
    rejectItem: vi.fn(),
    getSectionFragment: vi.fn(() => null),
    addComment: vi.fn(),
    resolveThread: vi.fn(),
    unresolveThread: vi.fn(),
  },
  awarenessUpdaters: {
    updateSection: vi.fn(),
    updateMode: vi.fn(),
    updateIdle: vi.fn(),
    updateCursorInfo: vi.fn(),
  },
  participants: [{ userId: 'u1', displayName: 'Alice' }],
  meta: { title: 'doc' },
  updateMeta: vi.fn(),
}));

vi.mock('../useYjsDoc', () => ({
  useYjsDoc: () => ({ ydoc: ctx.ydoc, provider: ctx.provider, synced: true }),
}));
vi.mock('../useDocumentMetadata', () => ({
  useDocumentMetadata: () => ({ meta: ctx.meta, updateMeta: ctx.updateMeta }),
}));
vi.mock('../useSectionList', () => ({
  useSectionList: () => ctx.sectionApi,
}));
vi.mock('../useAwareness', () => ({
  useAwareness: () => ({ awareness: ctx.awarenessUpdaters, participants: ctx.participants }),
}));
vi.mock('../useDocumentExport', () => ({
  useDocumentExport: () => ({ exportJSON: ctx.exportJSONImpl }),
}));

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeOptions(overrides: Partial<UseCollaborativeDocOptions> = {}): UseCollaborativeDocOptions {
  return {
    documentId: 'doc-1',
    mode: 'editor',
    ws: { sendMessage: vi.fn() } as unknown as UseCollaborativeDocOptions['ws'],
    userId: 'user-1',
    displayName: 'Alice',
    color: '#3b82f6',
    onMessage: (_handler: (msg: GatewayMessage) => void) => () => {},
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('useCollaborativeDoc', () => {
  beforeEach(() => {
    ctx.ydoc = new Y.Doc();
    vi.clearAllMocks();
  });
  afterEach(() => {
    ctx.ydoc?.destroy();
    ctx.ydoc = null;
  });

  describe('return shape', () => {
    it('passes through values from each sub-hook', () => {
      const { result } = renderHook(() => useCollaborativeDoc(makeOptions()));

      expect(result.current.ydoc).toBe(ctx.ydoc);
      expect(result.current.provider).toBe(ctx.provider);
      expect(result.current.synced).toBe(true);
      expect(result.current.meta).toEqual(ctx.meta);
      expect(result.current.sections).toEqual(ctx.sectionApi.sections);
      expect(result.current.comments).toEqual(ctx.sectionApi.comments);
      expect(result.current.participants).toEqual(ctx.participants);
      expect(result.current.awareness).toBe(ctx.awarenessUpdaters);
    });

    it('exports all mutation functions on the return', () => {
      const { result } = renderHook(() => useCollaborativeDoc(makeOptions()));

      expect(result.current.updateMeta).toBe(ctx.updateMeta);
      expect(result.current.addSection).toBe(ctx.sectionApi.addSection);
      expect(result.current.removeItem).toBe(ctx.sectionApi.removeItem);
      expect(result.current.addComment).toBe(ctx.sectionApi.addComment);
      expect(result.current.resolveThread).toBe(ctx.sectionApi.resolveThread);
      expect(result.current.unresolveThread).toBe(ctx.sectionApi.unresolveThread);
      expect(result.current.getSectionFragment).toBe(ctx.sectionApi.getSectionFragment);
      expect(result.current.exportJSON).toBe(ctx.exportJSONImpl);
      expect(typeof result.current.loadFromMarkdown).toBe('function');
      expect(typeof result.current.reviewSection).toBe('function');
    });
  });

  describe('sectionReviews observer', () => {
    it('starts empty', () => {
      const { result } = renderHook(() => useCollaborativeDoc(makeOptions()));
      expect(result.current.sectionReviews).toEqual({});
    });

    it('reflects existing Y.Map entries on mount', async () => {
      const yReviews = ctx.ydoc!.getMap('sectionReviews');
      const existing = new Y.Map<unknown>();
      existing.set('userId', 'user-9');
      existing.set('displayName', 'Bob');
      existing.set('status', 'approved');
      existing.set('timestamp', '2026-01-01T00:00:00Z');
      yReviews.set('sec-1:user-9', existing);

      const { result } = renderHook(() => useCollaborativeDoc(makeOptions()));

      await waitFor(() => {
        expect(result.current.sectionReviews['sec-1']).toBeDefined();
      });
      expect(result.current.sectionReviews['sec-1']).toHaveLength(1);
      expect(result.current.sectionReviews['sec-1'][0]).toMatchObject({
        userId: 'user-9',
        displayName: 'Bob',
        status: 'approved',
      });
    });

    it('updates when Y.Map gains a new review (deep observe)', async () => {
      const { result } = renderHook(() => useCollaborativeDoc(makeOptions()));
      const yReviews = ctx.ydoc!.getMap('sectionReviews');

      act(() => {
        const r = new Y.Map<unknown>();
        r.set('userId', 'user-2');
        r.set('displayName', 'Bea');
        r.set('status', 'changes_requested');
        r.set('timestamp', '2026-02-02T00:00:00Z');
        yReviews.set('sec-7:user-2', r);
      });

      await waitFor(() => {
        expect(result.current.sectionReviews['sec-7']?.[0]?.userId).toBe('user-2');
      });
    });

    it('groups multiple reviews by sectionId derived from key prefix', async () => {
      const { result } = renderHook(() => useCollaborativeDoc(makeOptions()));
      const yReviews = ctx.ydoc!.getMap('sectionReviews');

      act(() => {
        const r1 = new Y.Map<unknown>();
        r1.set('userId', 'user-2'); r1.set('status', 'approved');
        const r2 = new Y.Map<unknown>();
        r2.set('userId', 'user-3'); r2.set('status', 'approved');
        yReviews.set('sec-x:user-2', r1);
        yReviews.set('sec-x:user-3', r2);
      });

      await waitFor(() => {
        expect(result.current.sectionReviews['sec-x']).toHaveLength(2);
      });
    });

    it('stays empty when ydoc is null', () => {
      ctx.ydoc = null;
      const { result } = renderHook(() => useCollaborativeDoc(makeOptions()));
      expect(result.current.sectionReviews).toEqual({});
    });

    it('ignores non-Y.Map entries', async () => {
      const yReviews = ctx.ydoc!.getMap('sectionReviews');
      yReviews.set('sec-bad:user-1', 'not-a-map' as unknown as Y.Map<unknown>);

      const { result } = renderHook(() => useCollaborativeDoc(makeOptions()));

      await waitFor(() => {
        // mount-time observer call completes
        expect(result.current.sectionReviews).toBeDefined();
      });
      expect(result.current.sectionReviews['sec-bad']).toBeUndefined();
    });
  });

  describe('reviewSection', () => {
    it('writes a Y.Map review with userId, displayName, status, timestamp', () => {
      const { result } = renderHook(() => useCollaborativeDoc(makeOptions()));

      act(() => { result.current.reviewSection('sec-1', 'approved'); });

      const yReviews = ctx.ydoc!.getMap('sectionReviews');
      const stored = yReviews.get('sec-1:user-1') as Y.Map<unknown>;
      expect(stored).toBeInstanceOf(Y.Map);
      expect(stored.get('userId')).toBe('user-1');
      expect(stored.get('displayName')).toBe('Alice');
      expect(stored.get('status')).toBe('approved');
      expect(typeof stored.get('timestamp')).toBe('string');
      expect(stored.get('comment')).toBeUndefined();
    });

    it('includes comment when provided', () => {
      const { result } = renderHook(() => useCollaborativeDoc(makeOptions()));

      act(() => { result.current.reviewSection('sec-1', 'changes_requested', 'fix wording'); });

      const yReviews = ctx.ydoc!.getMap('sectionReviews');
      const stored = yReviews.get('sec-1:user-1') as Y.Map<unknown>;
      expect(stored.get('status')).toBe('changes_requested');
      expect(stored.get('comment')).toBe('fix wording');
    });

    it('overwrites the same user\'s prior review for the section', () => {
      const { result } = renderHook(() => useCollaborativeDoc(makeOptions()));

      act(() => { result.current.reviewSection('sec-1', 'approved'); });
      act(() => { result.current.reviewSection('sec-1', 'changes_requested', 'on second thought'); });

      const yReviews = ctx.ydoc!.getMap('sectionReviews');
      const stored = yReviews.get('sec-1:user-1') as Y.Map<unknown>;
      expect(stored.get('status')).toBe('changes_requested');
      expect(stored.get('comment')).toBe('on second thought');
    });

    it('is a no-op when ydoc is null', () => {
      ctx.ydoc = null;
      const { result } = renderHook(() => useCollaborativeDoc(makeOptions()));
      expect(() => act(() => { result.current.reviewSection('sec-1', 'approved'); })).not.toThrow();
    });
  });

  describe('loadFromMarkdown stub', () => {
    it('logs a not-yet-implemented warning', () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
      const { result } = renderHook(() => useCollaborativeDoc(makeOptions()));

      act(() => { result.current.loadFromMarkdown('# heading'); });

      expect(warn).toHaveBeenCalledWith(expect.stringMatching(/not yet implemented/i));
      warn.mockRestore();
    });
  });
});
