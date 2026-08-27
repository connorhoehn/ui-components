// The fleet, as the server sees it, with a local mirror for first paint.
//
// The server owns the fleet: statuses, labels and the per-box event log all
// live there so any browser can see the lab and tail any box. localStorage
// keeps a mirror for exactly two jobs — instant first paint, and re-adopting
// boxes when the server has restarted and lost its registry, so a live
// microVM is not stranded with nothing pointing at it.

import { useCallback, useEffect, useRef, useState } from 'react';
import { FLEET_STORAGE_KEY } from '../lib/storage';
import type { ComputeClient } from '../lib/computeClient';
import type { Computer, ComputeSource } from '../types';

function readMirror(): Computer[] {
  try {
    const raw = globalThis.localStorage?.getItem(FLEET_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Computer[]) : [];
  } catch {
    return [];
  }
}

function writeMirror(computers: Computer[]): void {
  try {
    globalThis.localStorage?.setItem(FLEET_STORAGE_KEY, JSON.stringify(computers));
  } catch {
    /* quota or private mode — the mirror is best-effort by design */
  }
}

export interface UseComputeFleetOptions {
  client: ComputeClient;
  /** Poll interval for status dots. 0 disables polling. Default 5s. */
  pollIntervalMs?: number;
  /** Host-supplied fleet. Wins over both the mirror and the server. */
  computers?: Computer[];
  /** Sample data when there is no client-visible fleet at all. */
  fixtures?: Computer[];
  /** Talk to the backend at all. False reports an empty fleet and fetches nothing. */
  enabled?: boolean;
  /**
   * Re-POST mirrored boxes when the server reports an empty fleet.
   *
   * On by default, and only ever fires on an *empty* server response, so it
   * cannot resurrect a box someone deliberately removed.
   */
  readopt?: boolean;
}

export interface UseComputeFleetResult {
  computers: Computer[];
  source: ComputeSource;
  /** True while the first load is in flight — not while polling. */
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  create: (label?: string) => Promise<Computer>;
  rename: (id: string, label: string) => Promise<void>;
  remove: (id: string) => Promise<void>;
  stop: (sessionId: string) => Promise<void>;
}

export function useComputeFleet({
  client,
  pollIntervalMs = 5_000,
  computers: provided,
  fixtures,
  enabled = true,
  readopt = true,
}: UseComputeFleetOptions): UseComputeFleetResult {
  const [computers, setComputers] = useState<Computer[]>(
    () => provided ?? (readMirror().length > 0 ? readMirror() : (fixtures ?? [])),
  );
  const [source, setSource] = useState<ComputeSource>(
    provided ? 'provided' : readMirror().length > 0 ? 'remote' : fixtures?.length ? 'fixture' : 'remote',
  );
  const [isLoading, setIsLoading] = useState(!provided);
  const [error, setError] = useState<string | null>(null);

  // Monotonic, not a boolean each effect run resets: the client can change
  // while a request is in flight, and a shared flag lets the next run un-set
  // the previous run's "cancelled" — so the slower response wins whichever
  // order the two were issued in.
  const requestIdRef = useRef(0);
  const settledRef = useRef(false);

  const refresh = useCallback(async () => {
    if (provided || !enabled) return;
    const requestId = ++requestIdRef.current;
    const isCurrent = () => requestIdRef.current === requestId;

    try {
      let fleet = await client.listComputers();

      if (readopt && fleet.length === 0) {
        const mirror = readMirror();
        if (mirror.length > 0) {
          await Promise.all(
            mirror.map((box) =>
              client
                .adoptComputer({ sessionId: box.sessionId, label: box.label, createdAt: box.createdAt })
                .catch(() => {
                  /* best-effort: one unadoptable box must not sink the rest */
                }),
            ),
          );
          fleet = await client.listComputers();
        }
      }

      if (!isCurrent()) return;
      setComputers(fleet);
      setSource('remote');
      setError(null);
      writeMirror(fleet);
    } catch (err) {
      // The mirror stands. A failed poll while offline should not blank a
      // fleet the operator can still see and reason about — it should say so.
      if (isCurrent()) setError(err instanceof Error ? err.message : 'Failed to list computers');
    } finally {
      if (isCurrent()) {
        settledRef.current = true;
        setIsLoading(false);
      }
    }
  }, [client, provided, readopt, enabled]);

  useEffect(() => {
    if (provided) {
      setComputers(provided);
      setSource('provided');
      setIsLoading(false);
      return;
    }
    if (!enabled) {
      setIsLoading(false);
      return;
    }
    void refresh();
    if (pollIntervalMs <= 0) return;
    const interval = setInterval(() => void refresh(), pollIntervalMs);
    return () => {
      clearInterval(interval);
      requestIdRef.current += 1;
    };
  }, [refresh, pollIntervalMs, provided, enabled]);

  // Mutations write through the server and then re-read, rather than patching
  // local state: the server assigns ids and statuses, and a locally-invented
  // row that the next poll contradicts is worse than a half-second wait.
  const create = useCallback(
    async (label?: string) => {
      const box = await client.createComputer(label);
      writeMirror([...readMirror().filter((b) => b.id !== box.id), box]);
      await refresh();
      return box;
    },
    [client, refresh],
  );

  const rename = useCallback(
    async (id: string, label: string) => {
      await client.renameComputer(id, label);
      await refresh();
    },
    [client, refresh],
  );

  const remove = useCallback(
    async (id: string) => {
      await client.removeComputer(id);
      writeMirror(readMirror().filter((b) => b.id !== id));
      await refresh();
    },
    [client, refresh],
  );

  const stop = useCallback(
    async (sessionId: string) => {
      await client.stopSession(sessionId);
      await refresh();
    },
    [client, refresh],
  );

  return { computers, source, isLoading, error, refresh, create, rename, remove, stop };
}
