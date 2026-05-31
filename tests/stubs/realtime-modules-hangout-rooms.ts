// tests/stubs/realtime-modules-hangout-rooms.ts
//
// Minimal stub for `@connorhoehn/realtime-modules/client/hangout-rooms`,
// used by vitest in place of the real subpath (not yet shipped — see
// CLAUDE.md "Known issues"). Aliased in vitest.config.ts. Exposes just
// the surface HangoutRoomRow / HangoutRoomsSection / WrappedHangoutRoomsList
// touch: a `useRoomOccupancy(slug, opts)` hook and the `RoomsIndexSubscriber`
// type. The hook simply returns `{ occupancy: null }` so the row falls
// back to the static `occupancy` prop / no-trailing render path.

import { useEffect, useState } from 'react';

export interface RoomOccupancyMember {
  userId: string;
  displayName?: string;
  participantId: string;
}

export interface RoomOccupancy {
  slug: string;
  count: number;
  members: RoomOccupancyMember[];
}

export type RoomsIndexSubscriber = (
  listener: (occupancies: RoomOccupancy[]) => void,
) => () => void;

export interface UseRoomOccupancyReturn {
  occupancy: RoomOccupancy | null;
}

export interface UseRoomOccupancyOptions {
  subscribeRoomsIndex?: RoomsIndexSubscriber;
}

export function useRoomOccupancy(
  slug: string | null,
  opts: UseRoomOccupancyOptions = {},
): UseRoomOccupancyReturn {
  const [occupancy, setOccupancy] = useState<RoomOccupancy | null>(null);

  useEffect(() => {
    if (!slug || !opts.subscribeRoomsIndex) return;
    const unsubscribe = opts.subscribeRoomsIndex((rows) => {
      const found = rows.find((r) => r.slug === slug) ?? null;
      setOccupancy(found);
    });
    return unsubscribe;
  }, [slug, opts.subscribeRoomsIndex]);

  return { occupancy };
}
