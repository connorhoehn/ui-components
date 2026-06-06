// useCallWidgetPersistence — localStorage roundtrip for the
// ExpandableCallWidget. Persists mode + position + size between
// reloads so the widget reopens where the user left it.
//
// Never persists transient modes (`fullscreen` coerces to `docked` on
// hydrate — browsers refuse auto-fullscreen on page load anyway).

import { useCallback, useEffect, useRef, useState } from 'react';

export type PersistedWidgetMode = 'mini' | 'docked';

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

interface Stored extends PersistedWidgetState {
  v: number;
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
      // Coerce fullscreen → docked on hydrate (browsers refuse
      // auto-fullscreen without a user gesture, so persisting it
      // would just produce a half-broken state on reload).
      const mode: PersistedWidgetMode = parsed.mode === 'docked' ? 'docked' : 'mini';
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
  useEffect(() => {
    if (!persistKey || typeof window === 'undefined') return;
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      try {
        const stored: Stored = { v: STORAGE_VERSION, ...state };
        window.localStorage.setItem(persistKey, JSON.stringify(stored));
      } catch { /* quota / private mode — ignore */ }
    }, debounceMs);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [persistKey, state, debounceMs]);

  const setState = useCallback((next: Partial<PersistedWidgetState>) => {
    setStateImpl((prev) => ({ ...prev, ...next }));
  }, []);

  return { state, setState };
}

function numberOr(v: unknown, fallback: number): number {
  return typeof v === 'number' && Number.isFinite(v) ? v : fallback;
}
