// Two wrong answers rendered with total confidence in the chat sidebar:
//
//  * the Groups section header passed a hard-coded `count={0}`, so it read "0"
//    no matter how many groups were listed directly underneath it;
//  * an unread room's label used `text-surface-hover` — a SURFACE token — so
//    the rooms with something new in them were painted in the sidebar's own
//    background colour and were the only unreadable rows in the list.

import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { RoomItem } from '../../../hooks/useRooms';

vi.mock('../../../hooks/useGroups', () => ({
  useGroups: () => ({
    groups: [],
    createGroup: vi.fn(), deleteGroup: vi.fn(), joinGroup: vi.fn(),
    leaveGroup: vi.fn(), inviteUser: vi.fn(), acceptInvite: vi.fn(),
    loadMembers: vi.fn(), members: [], loading: false, error: null,
  }),
}));
vi.mock('../../../hooks/useFriends', () => ({
  useFriends: () => ({
    followers: [], following: [], friends: [],
    follow: vi.fn(), unfollow: vi.fn(), loading: false, error: null,
  }),
}));
vi.mock('../../../hooks/usePosts', () => ({
  usePosts: () => ({
    posts: [], createPost: vi.fn(), editPost: vi.fn(), deletePost: vi.fn(),
    getUserPosts: vi.fn(), loading: false, mutating: false, error: null,
    hasMore: false, loadMore: vi.fn(),
  }),
}));

import SocialTabContent from '../SocialTabContent';

function room(over: Partial<RoomItem> = {}): RoomItem {
  return {
    roomId: 'r1',
    name: 'general',
    type: 'standalone',
    createdAt: '2026-01-01T00:00:00.000Z',
    ...over,
  } as RoomItem;
}

/** Registers the WS handler so a test can push a `social:post` event. */
function makeOnMessage() {
  const handlers: ((m: Record<string, unknown>) => void)[] = [];
  const onMessage = (h: (m: never) => void) => {
    handlers.push(h as (m: Record<string, unknown>) => void);
    return () => {
      const i = handlers.indexOf(h as (m: Record<string, unknown>) => void);
      if (i >= 0) handlers.splice(i, 1);
    };
  };
  // Fan out to every live handler — StrictMode mounts the effect twice, and
  // the second mount's handler is the one still registered.
  const emit = (msg: Record<string, unknown>) => handlers.forEach(h => h(msg));
  return { onMessage: onMessage as never, emit };
}

function renderTab(rooms: RoomItem[], onMessage: never) {
  return render(
    <SocialTabContent
      userId="alice"
      displayName="Ada Lovelace"
      userEmail="ada@example.com"
      connectionState="connected"
      idToken="tok"
      rooms={rooms}
      createRoom={vi.fn().mockResolvedValue(undefined)}
      createDM={vi.fn().mockResolvedValue(undefined)}
      createGroupRoom={vi.fn().mockResolvedValue(undefined)}
      roomsLoading={false}
      handleRoomSelect={vi.fn()}
      activeRoomId={null}
      activityEvents={[]}
      onMessage={onMessage}
    />,
  );
}

beforeEach(() => {
  Element.prototype.scrollIntoView = vi.fn();
});

describe('SocialTabContent sidebar headers', () => {
  // The Groups section is gone entirely, so the count it used to fake is gone
  // with it. Group rooms appear in the conversation list like any other room,
  // which is what the section was a partial, separately-fetched view of.
  it('does not show a separate Groups section', () => {
    const { onMessage } = makeOnMessage();
    renderTab([room(), room({ roomId: 'r2', name: 'random' })], onMessage);

    expect(screen.queryByText('Groups')).toBeNull();
  });

  it('lists channels and DMs together, without section headers between them', () => {
    const { onMessage } = makeOnMessage();
    renderTab(
      [room(), room({ roomId: 'r2', name: 'Nora DaSilva', type: 'dm' })],
      onMessage,
    );

    expect(screen.getByText('general')).toBeInTheDocument();
    expect(screen.getByText('Nora DaSilva')).toBeInTheDocument();
    expect(screen.queryByText('Direct Messages')).toBeNull();
  });
});

describe('SocialTabContent unread rooms', () => {
  it('paints an unread room label in a text colour, not a surface colour', async () => {
    const { onMessage, emit } = makeOnMessage();
    renderTab([room()], onMessage);

    const { act } = await import('@testing-library/react');
    act(() => {
      emit({ type: 'social:post', payload: { roomId: 'r1' } });
    });

    // The label carries the colour (it is the element that goes bold on
    // unread), so that is what must not be painted with a SURFACE token.
    const label = screen.getByText('general');
    expect(label.className).not.toMatch(/text-surface-hover/);
    expect(label.className).toMatch(/text-text-primary/);
    // ...and the unread badge itself renders.
    const row = label.closest('button')!;
    expect(row).toHaveTextContent('1');
  });
});

// A third wrong answer, this one only visible in dark mode: the surfaces
// branched on `useColorScheme()`, which returns the context DEFAULT ('light')
// for any host that stamps `data-theme` itself instead of mounting our
// <ColorSchemeProvider> — the realtime-examples app does exactly that, so the
// whole social panel stayed white inside a fully dark shell. And the dark arm
// it *would* have taken painted the chat background with
// `var(--color-text-primary)`, which inverts the moment a real dark palette
// defines that token as a light colour (v2.105.0 does).
//
// Both are structural: assert the surfaces read tokens, so they follow
// whatever [data-theme] scope they land in with no provider required.
describe('SocialTabContent surfaces', () => {
  it('paints from theme tokens, never from a color-scheme branch', () => {
    const { onMessage } = makeOnMessage();
    const { container } = renderTab([room()], onMessage);

    const root = container.firstElementChild as HTMLElement;
    expect(root.style.background).toBe('var(--color-surface)');
    expect(root.style.border).toContain('var(--color-border)');

    // The sidebar is a distinct token, not a literal hex.
    const sidebar = root.firstElementChild as HTMLElement;
    expect(sidebar.style.background).toBe('var(--color-surface-panel)');

    // Nothing in the tree may use the TEXT token as a background — that is
    // the inversion trap this test exists to keep shut.
    const painted = [root, sidebar, ...Array.from(root.querySelectorAll<HTMLElement>('[style]'))];
    for (const el of painted) {
      expect(el.style.background).not.toContain('--color-text-');
      expect(el.style.backgroundColor).not.toContain('--color-text-');
    }
  });
});
