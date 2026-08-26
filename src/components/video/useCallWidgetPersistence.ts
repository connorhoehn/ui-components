// useCallWidgetPersistence — localStorage roundtrip for the
// ExpandableCallWidget. Persists mode + position + size between
// reloads so the widget reopens where the user left it.
//
// Never persists transient modes (`fullscreen` coerces to `docked` on
// hydrate — browsers refuse auto-fullscreen on page load anyway).

import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Modes that survive a reload. Canonical vocabulary ('window', not the
 * pre-2.106 'docked') — see ./callWidgetMode. The value written to
 * localStorage keeps the LEGACY spelling so a rollback to an older build
 * still reads back the window state it wrote; the translation happens at
 * the storage boundary only.
 */
export type PersistedWidgetMode = 'mini' | 'window';

export interface PersistedWidgetState {
  mode: PersistedWidgetMode;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface UseCallWidgetPersistenceOptions {
  /** localStorage key. When undefined, the hook is a no-op (state lives
   *  only in memory) — useful for tests and for ephemeral consumers. */
  persistKey: string | undefined;
  /** Defaults written if no key exists yet (or storage is empty). */
  defaults: PersistedWidgetState;
  /** Debounce window for writes. Default 200ms. */
  debounceMs?: number;
}

const STORAGE_VERSION = 1;

interface Stored extends Omit<PersistedWidgetState, 'mode'> {
  v: number;
  /** Legacy spelling on the wire — 'docked', not 'window'. */
  mode: 'mini' | 'docked' | 'window';
}

export function useCallWidgetPersistence({
  persistKey,
  defaults,
  debounceMs = 200,
}: UseCallWidgetPersistenceOptions): {
  state: PersistedWidgetState;
  setState: (next: Partial<PersistedWidgetState>) => void;
} {
  const [state, setStateImpl] = useState<PersistedWidgetState>(() => {
    if (!persistKey || typeof window === 'undefined') return defaults;
    try {
      const raw = window.localStorage.getItem(persistKey);
      if (!raw) return defaults;
      const parsed = JSON.parse(raw) as Stored;
      if (!parsed || parsed.v !== STORAGE_VERSION) return defaults;
      // Coerce fullscreen → window on hydrate (browsers refuse
      // auto-fullscreen without a user gesture, so persisting it
      // would just produce a half-broken state on reload). Both the
      // legacy 'docked' and the canonical 'window' spellings are
      // accepted so state written by either build survives.
      const mode: PersistedWidgetMode =
        parsed.mode === 'docked' || parsed.mode === 'window' ? 'window' : 'mini';
      return {
        mode,
        x: numberOr(parsed.x, defaults.x),
        y: numberOr(parsed.y, defaults.y),
        width: numberOr(parsed.width, defaults.width),
        height: numberOr(parsed.height, defaults.height),
      };
    } catch {
      // Malformed JSON — clear so we don't keep trying to parse it.
      try { window.localStorage.removeItem(persistKey); } catch { /* ignore */ }
      return defaults;
    }
  });

  // Debounced write to localStorage. Writes the latest state after
  // `debounceMs` of quiescence — avoids hammering storage on every
  // drag pixel.
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // A write is owed but not yet flushed. Tracked separately from `timerRef`
  // because the debounce effect's cleanup clears the timer on unmount, and
  // cleanups run in effect-definition order — so the flush below cannot rely
  // on the handle still being there to know a write was pending.
  const pendingRef = useRef(false);
  const latestStateRef = useRef(state);
  latestStateRef.current = state;

  // What storage is already known to hold, and under which key. Seeded with
  // the HYDRATED value, because nothing is owed for it — `state` on the first
  // render is precisely what we just read out of storage (or the defaults we
  // fell back to).
  //
  // Without this the debounce effect marked a write pending on its very first
  // run, so a mount/unmount pair inside the debounce window made the flush
  // below persist a value the user never produced. Two ways that bit:
  // hydration that fell back (corrupt JSON, version mismatch, fullscreen→mini)
  // had its fallback written straight back over the stored entry — including
  // re-creating the key the corrupt-JSON path had deliberately removed — and
  // any double-mount (StrictMode, an <Activity>/Offscreen re-show, a Suspense
  // retry) triggered it on every single mount.
  const persistedRef = useRef<{ key: string | undefined; value: PersistedWidgetState }>({
    key: persistKey,
    value: state,
  });

  const write = useCallback((key: string, value: PersistedWidgetState) => {
    try {
      const stored: Stored = {
        v: STORAGE_VERSION,
        ...value,
        // Legacy spelling on the wire — see PersistedWidgetMode.
        mode: value.mode === 'window' ? 'docked' : value.mode,
      };
      window.localStorage.setItem(key, JSON.stringify(stored));
      persistedRef.current = { key, value };
    } catch { /* quota / private mode — ignore */ }
  }, []);

  useEffect(() => {
    if (!persistKey || typeof window === 'undefined') return;
    // Nothing changed since the last write/hydrate — no write is owed, so
    // don't arm the debounce and don't mark a flush pending. `setState` always
    // produces a fresh object, so identity is the right comparison; a changed
    // `persistKey` still seeds the new key with the on-screen state.
    if (persistedRef.current.key === persistKey && persistedRef.current.value === state) {
      return;
    }
    if (timerRef.current) clearTimeout(timerRef.current);
    pendingRef.current = true;
    timerRef.current = setTimeout(() => {
      pendingRef.current = false;
      write(persistKey, latestStateRef.current);
    }, debounceMs);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [persistKey, state, debounceMs, write]);

  // Flush on unmount (and when the key changes, so the old key keeps its
  // final value). Without this the debounce cleanup simply discarded a
  // pending write, so a widget moved within `debounceMs` of the call closing
  // never had its new position persisted — defeating the point of the hook.
  useEffect(() => {
    if (!persistKey || typeof window === 'undefined') return;
    return () => {
      if (pendingRef.current) {
        pendingRef.current = false;
        write(persistKey, latestStateRef.current);
      }
    };
  }, [persistKey, write]);

  const setState = useCallback((next: Partial<PersistedWidgetState>) => {
    setStateImpl((prev) => ({ ...prev, ...next }));
  }, []);

  return { state, setState };
}

function numberOr(v: unknown, fallback: number): number {
  return typeof v === 'number' && Number.isFinite(v) ? v : fallback;
}
