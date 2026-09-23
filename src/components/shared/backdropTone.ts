// ui-components/src/components/shared/backdropTone.ts
//
// Which sky a console surface (the composer in Agent/Terminal, the chat column
// behind it) paints: `night` — the navy/black field it always had — or
// `graphite`, a neutral dark grey with lower-contrast stars.
//
// Night on a white page reads as a hole punched in the page; graphite sits on
// it like a dark control rather than a window onto space. So `auto` picks from
// the THEME the surface is sitting in, not from a global setting:
//
//   1. The nearest ancestor that already chose (`data-backdrop-tone`) wins —
//      a composer inside a console column must match the column, not decide
//      again and disagree with it.
//   2. Else the nearest ancestor `data-theme`: dark → night, light → graphite.
//      Nearest, because the library's theme is scope-aware: a `data-theme`
//      subtree can differ from `<html>`.
//   3. Else the OS: `prefers-color-scheme: dark` → night, otherwise graphite.
//      That is the app's "system" theme state, where nothing sets the attribute.
//
// The walk starts at the PARENT. A console surface sets `data-theme="dark"` on
// itself to flip its own ink, and reading that back would make every `auto`
// surface resolve to night the moment it lit up.

import { createContext, useContext, useLayoutEffect, useState, type RefObject } from 'react';

/** What a console surface paints behind itself. `none` keeps the ordinary surface. */
export type BackdropTone = 'auto' | 'night' | 'graphite' | 'none';
/** A tone after `auto` has been decided. */
export type ResolvedBackdropTone = Exclude<BackdropTone, 'auto'>;

function systemPrefersDark(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

/**
 * Resolve `tone` for a surface mounted at `el`. Pure apart from the DOM read and
 * the media query, so it is the thing the tests pin.
 */
export function resolveBackdropTone(
  tone: BackdropTone,
  el: Element | null,
  prefersDark: boolean = systemPrefersDark(),
): ResolvedBackdropTone {
  if (tone !== 'auto') return tone;
  for (let node = el?.parentElement ?? null; node; node = node.parentElement) {
    const chosen = node.getAttribute('data-backdrop-tone');
    if (chosen === 'night' || chosen === 'graphite') return chosen;
    const theme = node.getAttribute('data-theme');
    if (theme === 'dark') return 'night';
    if (theme === 'light') return 'graphite';
  }
  return prefersDark ? 'night' : 'graphite';
}

/**
 * `resolveBackdropTone`, kept current. Re-resolves when any `data-theme` /
 * `data-backdrop-tone` in the document changes and when the OS scheme flips.
 * Listens only while `enabled` — an idle composer (Chat mode) subscribes to
 * nothing, and resolves synchronously before paint when it lights up.
 */
export function useResolvedBackdropTone(
  ref: RefObject<Element | null>,
  tone: BackdropTone,
  enabled = true,
): ResolvedBackdropTone {
  const [resolved, setResolved] = useState<ResolvedBackdropTone>(() => (tone === 'auto' ? 'graphite' : tone));
  useLayoutEffect(() => {
    if (tone !== 'auto') {
      setResolved(tone);
      return;
    }
    if (!enabled) return;
    const update = () => setResolved(resolveBackdropTone('auto', ref.current));
    update();
    const cleanups: Array<() => void> = [];
    if (typeof MutationObserver !== 'undefined' && typeof document !== 'undefined') {
      const mo = new MutationObserver(update);
      mo.observe(document.documentElement, { attributes: true, subtree: true, attributeFilter: ['data-theme', 'data-backdrop-tone'] });
      cleanups.push(() => mo.disconnect());
    }
    if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      mq.addEventListener?.('change', update);
      cleanups.push(() => mq.removeEventListener?.('change', update));
    }
    return () => cleanups.forEach((fn) => fn());
  }, [tone, enabled, ref]);
  return resolved;
}

/** Star colours for the graphite sky: zinc greys, so no blue cast sits on a white page. */
export const GRAPHITE_PARTICLE_COLORS = ['#f4f4f5', '#d4d4d8', '#a1a1aa'] as const;

/**
 * What an enclosing console surface (a `ChatColumnBackdrop` in Agent/Terminal)
 * is already painting. A composer inside one reads this and does NOT start a
 * second star field in the same region: it keeps its tint and border and lets
 * the column's field show through. `working` is the column's "a loop is
 * mid-turn" cue, so a composer can follow it without the host passing it twice.
 */
export interface ConsoleSurfaceState {
  /** True while the enclosing surface is painting its sky. */
  painting: boolean;
  /** True while the enclosing surface shows its working density. */
  working: boolean;
}

export const ConsoleSurfaceContext = createContext<ConsoleSurfaceState | null>(null);

/** The nearest enclosing console surface, or `null` outside one. */
export function useEnclosingConsoleSurface(): ConsoleSurfaceState | null {
  return useContext(ConsoleSurfaceContext);
}
