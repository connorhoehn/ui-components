// demo/src/demos/hook-hangoutrooms-integration/index.tsx
//
// WrappedHangoutRoomsList wired to a useHangoutRooms() hook return.
//
// Live mode is gated on the @connorhoehn/realtime-modules/client/hangout-rooms
// subpath shipping — until then the demo runs in MOCK mode with a synthetic
// hook return + a synthetic subscribeRoomsIndex adapter that emits occupancy
// frames on a timer. The MOCK code path mirrors the structural shape the
// real hook will return, so the demo flips to LIVE with a one-line swap
// once the subpath is available.

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { WrappedHangoutRoomsList } from '@/integrations/realtime-modules/WrappedHangoutRoomsList';
import type {
  RMRoom,
  RMRoomOccupancy,
  RMCreateRoomInput,
  RMUseHangoutRoomsReturn,
  RMJoinRoomResult,
} from '@/integrations/realtime-modules/types';

const GATEWAY_URL = import.meta.env.VITE_GATEWAY_URL as string | undefined;
const IS_MOCK = !GATEWAY_URL;
const SELF_PARTICIPANT_ID = 'p-self';
const ORG = 'demo-org';

type RoomsIndexListener = (occupancy: RMRoomOccupancy) => void;

// ── Mock data ──────────────────────────────────────────────────────────

const SEED_ROOMS: RMRoom[] = [
  makeRoom({ slug: 'general', name: 'General' }),
  makeRoom({ slug: 'design-jam', name: 'Design Jam' }),
  makeRoom({ slug: 'pairing', name: 'Pairing' }),
  makeRoom({ slug: 'water-cooler', name: 'Water Cooler' }),
];

function makeRoom(overrides: Partial<RMRoom>): RMRoom {
  return {
    orgId: ORG,
    roomId: overrides.slug ?? 'r-x',
    slug: overrides.slug ?? 'r-x',
    name: overrides.name ?? 'Room',
    createdBy: 'u-alice',
    createdAt: new Date().toISOString(),
    visibility: 'org',
    settings: { audioOnly: false, recordingEnabled: false, softCap: 25 },
    state: 'active',
    lastActiveAt: new Date().toISOString(),
    ...overrides,
  };
}

// ── Synthetic useHangoutRooms() ────────────────────────────────────────

function useMockHangoutRooms(): RMUseHangoutRoomsReturn {
  const [rooms, setRooms] = useState<RMRoom[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate initial fetch latency
  useEffect(() => {
    const t = setTimeout(() => {
      setRooms(SEED_ROOMS);
      setIsLoading(false);
    }, 700);
    return () => clearTimeout(t);
  }, []);

  const createRoom = useCallback(
    async (input: RMCreateRoomInput): Promise<RMRoom> => {
      const slug = input.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const next = makeRoom({
        slug,
        name: input.name,
        description: input.description,
        visibility: input.visibility ?? 'org',
      });
      setRooms((prev) => [...prev, next]);
      return next;
    },
    [],
  );

  const joinRoom = useCallback(
    async (slug: string): Promise<RMJoinRoomResult> => {
      const found = rooms.find((r) => r.slug === slug);
      if (!found) throw new Error(`Room ${slug} not found`);
      return {
        room: found,
        sessionId: `sess-${slug}-${Date.now()}`,
        token: 'demo-token',
        participantId: SELF_PARTICIPANT_ID,
      };
    },
    [rooms],
  );

  const archiveRoom = useCallback(async (slug: string): Promise<void> => {
    setRooms((prev) =>
      prev.map((r) => (r.slug === slug ? { ...r, state: 'archived' } : r)),
    );
  }, []);

  const refetch = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    setTimeout(() => {
      setRooms(SEED_ROOMS);
      setIsLoading(false);
    }, 400);
  }, []);

  return useMemo(
    () => ({
      rooms,
      isLoading,
      error: null,
      refetch,
      createRoom,
      archiveRoom,
      joinRoom,
    }),
    [rooms, isLoading, refetch, createRoom, archiveRoom, joinRoom],
  );
}

// ── Synthetic subscribeRoomsIndex ──────────────────────────────────────
// Periodically pushes occupancy snapshots so each row's
// `useRoomOccupancy(slug)` call picks them up. Demonstrates live
// occupancy without a real gateway.

function useMockRoomsIndexSubscriber() {
  const listenersRef = useRef<Set<RoomsIndexListener>>(new Set());

  useEffect(() => {
    let tick = 0;
    const id = setInterval(() => {
      tick += 1;
      const rows: RMRoomOccupancy[] = [
        {
          slug: 'general',
          count: 2 + (tick % 3),
          members: [
            { userId: 'u-a', displayName: 'Alice', participantId: 'p-a' },
            { userId: 'u-b', displayName: 'Bob', participantId: 'p-b' },
            ...(tick % 3 === 0
              ? [
                  {
                    userId: 'u-c',
                    displayName: 'Carol',
                    participantId: 'p-c',
                  },
                ]
              : []),
          ],
        },
        {
          slug: 'design-jam',
          count: 1,
          members: [
            { userId: 'u-d', displayName: 'Dave', participantId: 'p-d' },
          ],
        },
        // pairing + water-cooler intentionally empty most of the time
      ];
      // subscribeRoomsIndex delivers ONE room's occupancy per call, not a
      // batch — see realtime-modules useRoomOccupancy: `handler(occ)`. Fan
      // the snapshot out row by row so each row's useRoomOccupancy(slug)
      // matches on its own slug.
      listenersRef.current.forEach((l) => {
        for (const row of rows) {
          try {
            l(row);
          } catch {
            /* swallow */
          }
        }
      });
    }, 2200);
    return () => clearInterval(id);
  }, []);

  return useCallback((listener: RoomsIndexListener) => {
    listenersRef.current.add(listener);
    return () => {
      listenersRef.current.delete(listener);
    };
  }, []);
}

// ── Mock view ──────────────────────────────────────────────────────────

function MockHangoutRoomsView() {
  const hangoutRooms = useMockHangoutRooms();
  const subscribeRoomsIndex = useMockRoomsIndexSubscriber();
  const [lastJoined, setLastJoined] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-4">
      <div className="w-[260px] bg-surface border border-border rounded-md p-2">
        <WrappedHangoutRoomsList
          hangoutRooms={hangoutRooms}
          subscribeRoomsIndex={subscribeRoomsIndex}
          participantId={SELF_PARTICIPANT_ID}
          onJoin={(slug) => setLastJoined(slug)}
        />
      </div>
      <div className="text-sm text-text-secondary">
        {lastJoined ? (
          <>
            Joined <code className="px-1.5 py-0.5 rounded bg-surface-2 font-mono text-xs">{lastJoined}</code>{' '}
            (the caller would now open the hangout overlay).
          </>
        ) : (
          <>Click a row to fire the <code className="px-1.5 py-0.5 rounded bg-surface-2 font-mono text-xs">onJoin(slug)</code> callback.</>
        )}
      </div>
    </div>
  );
}

// ── Live view ──────────────────────────────────────────────────────────
// The realtime-modules /client/hangout-rooms subpath is not shipped yet
// (tracked in CLAUDE.md "Known issues"). When it ships, the LIVE wiring
// is a 4-line drop-in:
//
//   import { useHangoutRooms, useRoomsSubscription } from
//     '@connorhoehn/realtime-modules/client/hangout-rooms';
//   const hangoutRooms = useHangoutRooms();
//   const { subscribeRoomsIndex } = useRoomsSubscription();
//   <WrappedHangoutRoomsList hangoutRooms={hangoutRooms}
//                            subscribeRoomsIndex={subscribeRoomsIndex} />

function LiveHangoutRoomsView({ url }: { url: string }) {
  return (
    <div className="p-4 border border-dashed border-border rounded-md bg-surface-2 text-sm text-text-secondary">
      <div className="font-semibold text-text-primary mb-1">
        Live mode pending realtime-modules subpath
      </div>
      <p className="leading-relaxed">
        <code className="px-1.5 py-0.5 rounded bg-surface font-mono text-xs">
          {'<WrappedHangoutRoomsList>'}
        </code>{' '}
        is structurally compatible with{' '}
        <code className="px-1.5 py-0.5 rounded bg-surface font-mono text-xs">
          useHangoutRooms()
        </code>{' '}
        from{' '}
        <code className="px-1.5 py-0.5 rounded bg-surface font-mono text-xs">
          @connorhoehn/realtime-modules/client/hangout-rooms
        </code>
        . That subpath has not been published yet, so the live demo will
        flip on once the realtime-modules adoption work lands. Target
        gateway:{' '}
        <code className="px-1.5 py-0.5 rounded bg-surface font-mono text-xs">
          {url}
        </code>
        .
      </p>
    </div>
  );
}

// ── Top-level demo ─────────────────────────────────────────────────────

export default function HookHangoutRoomsIntegrationDemo() {
  return (
    <div className="p-8 max-w-2xl mx-auto flex flex-col gap-3">
      <h2 className="text-xl font-bold text-text-primary">
        HangoutRoomsList + useHangoutRooms
      </h2>
      <p className="text-sm text-text-secondary leading-relaxed">
        <code className="px-1.5 py-0.5 rounded bg-surface-2 font-mono text-xs">
          {'<WrappedHangoutRoomsList>'}
        </code>{' '}
        wraps{' '}
        <code className="px-1.5 py-0.5 rounded bg-surface-2 font-mono text-xs">
          {'<HangoutRoomsSection>'}
        </code>{' '}
        and the per-row{' '}
        <code className="px-1.5 py-0.5 rounded bg-surface-2 font-mono text-xs">
          subscribeRoomsIndex
        </code>{' '}
        adapter. Callers pass the full{' '}
        <code className="px-1.5 py-0.5 rounded bg-surface-2 font-mono text-xs">
          useHangoutRooms()
        </code>{' '}
        return value plus an{' '}
        <code className="px-1.5 py-0.5 rounded bg-surface-2 font-mono text-xs">
          onJoin(slug)
        </code>{' '}
        callback — three prop drills the wrapper absorbs.
      </p>
      <div
        className={
          'inline-block self-start px-2.5 py-1 rounded-full text-xs font-semibold ' +
          (IS_MOCK
            ? 'bg-warning-bg text-warning'
            : 'bg-success-bg text-success')
        }
      >
        {IS_MOCK ? 'MOCK MODE' : `LIVE — ${GATEWAY_URL}`}
      </div>
      <div className="mt-2">
        {IS_MOCK ? (
          <MockHangoutRoomsView />
        ) : (
          <LiveHangoutRoomsView url={GATEWAY_URL!} />
        )}
      </div>
    </div>
  );
}
