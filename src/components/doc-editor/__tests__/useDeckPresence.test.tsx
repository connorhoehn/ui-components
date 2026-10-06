import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import {
  deckViewersOf,
  editingInMyOtherTab,
  useDeckPresence,
  type DeckRosterEntry,
} from '../useDeckPresence';

const entry = (clientId: string, metadata: Record<string, unknown>, extra: Partial<DeckRosterEntry> = {}): DeckRosterEntry => ({
  clientId, status: 'online', metadata, lastSeen: '2026-10-06T00:00:00Z', ...extra,
});

describe('deckViewersOf', () => {
  it('drops me and my other tabs, keeps one row per person, reads their slide', () => {
    const viewers = deckViewersOf([
      entry('me-1', { userId: 'u-me' }),
      entry('me-2', { userId: 'u-me' }),
      entry('f-1', { userId: 'u-f', displayName: 'Frank', deckSlide: { documentId: 'd', slideId: 's2' } }, { lastSeen: '2026-10-06T00:00:05Z' }),
      entry('f-2', { userId: 'u-f', displayName: 'Frank', deckSlide: { documentId: 'd', slideId: 's1' } }),
      entry('a-1', { userId: 'u-a', displayName: 'Ann', deckSlide: { documentId: 'other', slideId: 's9' } }),
      entry('g-1', { userId: 'u-g' }, { status: 'offline' }),
    ], 'd', 'me-1', (id) => (id === 's2' ? 'Slide 2' : undefined));
    expect(viewers.map((v) => [v.id, v.slideId, v.location])).toEqual([
      ['u-a', undefined, undefined],
      ['u-f', 's2', 'Slide 2'],
    ]);
  });

  it('marks editing only for this deck and idle for away', () => {
    const [ann, frank] = deckViewersOf([
      entry('f', { userId: 'u-f', displayName: 'Frank', deckEditing: { documentId: 'd' } }),
      entry('a', { userId: 'u-a', displayName: 'Ann', deckEditing: { documentId: 'x' } }, { status: 'away' }),
    ], 'd', null);
    expect(ann!.editing).toBeUndefined();
    expect(ann).toMatchObject({ idle: true, detail: 'viewing this deck' });
    expect(frank).toMatchObject({ editing: true, detail: 'editing this deck' });
  });
});

describe('editingInMyOtherTab', () => {
  it('sees my other tab editing this deck only', () => {
    const roster = [entry('1', { userId: 'u' }), entry('2', { userId: 'u', deckEditing: { documentId: 'd' } })];
    expect(editingInMyOtherTab(roster, 'd', '1')).toBe(true);
    expect(editingInMyOtherTab(roster, 'd', '2')).toBe(false);
    expect(editingInMyOtherTab(roster, 'x', '1')).toBe(false);
  });
});

describe('useDeckPresence', () => {
  it('returns FollowModeBar participants, slideViewers and editingElsewhere', () => {
    const roster = [
      entry('me-1', { userId: 'u-me' }),
      entry('me-2', { userId: 'u-me', deckEditing: { documentId: 'd' } }),
      entry('f-1', { userId: 'u-f', displayName: 'Frank', color: '#123456', mode: 'reviewer', deckSlide: { documentId: 'd', slideId: 's2' } }),
    ];
    const { result } = renderHook(() => useDeckPresence({
      roster, ownClientId: 'me-1', updateMetadata: () => {}, documentId: 'd', selectedSlideId: 's1',
    }));
    expect(result.current.editingElsewhere).toBe(true);
    expect(Object.keys(result.current.slideViewers)).toEqual(['s2']);
    expect(result.current.participants).toEqual([
      { clientId: 'f-1', userId: 'u-f', displayName: 'Frank', color: '#123456', mode: 'reviewer', currentSectionId: 's2' },
    ]);
  });

  it('publishes the slide and editing state and clears both on unmount', () => {
    const updateMetadata = vi.fn();
    const { rerender, unmount } = renderHook(
      ({ slide, editing }: { slide: string | null; editing: boolean }) => useDeckPresence({
        roster: [], ownClientId: null, updateMetadata, documentId: 'd', selectedSlideId: slide, editing,
      }),
      { initialProps: { slide: 's1' as string | null, editing: true } },
    );
    expect(updateMetadata).toHaveBeenCalledWith({ deckSlide: { documentId: 'd', slideId: 's1' } });
    expect(updateMetadata).toHaveBeenCalledWith({ deckEditing: { documentId: 'd' } });
    rerender({ slide: null, editing: false });
    expect(updateMetadata).toHaveBeenCalledWith({ deckSlide: null });
    expect(updateMetadata).toHaveBeenCalledWith({ deckEditing: null });
    unmount();
    expect(updateMetadata).toHaveBeenLastCalledWith({ deckSlide: null, deckEditing: null });
  });
});
