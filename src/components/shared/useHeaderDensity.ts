// useHeaderDensity (2.437.0) — a page header's density and collapsed state.
//
//   const header = useHeaderDensity({ contentKind: tab === 'activity' ? 'graph' : 'detail', headerId: 'initiative' });
//   <PageHeader {...header.headerProps} … />
//   <div ref={header.contentRef}>…the body…</div>
//
// Density (the library's `Density`): the host's `preference`, else the
// content kind — `canvas`, `graph`, `conversation` and `document` ask for
// compact; `list` and `detail` for comfortable (compact in a short
// container). See `headerDefaults`.
//
// Collapsed (a state, not a density):
// 1. Scroll: with rich content, scrolling the content region down (after the
//    reader's own wheel, touch, key or pointer — a chat pinning itself to its
//    newest message is not the reader asking for room) past
//    `HEADER_SCROLL_COLLAPSE_PX` collapses the header; back at the top it
//    opens again. A rich page in a very short container starts collapsed.
// 2. Chevron: `toggleCollapsed()`. A collapse is remembered per device under
//    `uic:header-density:<headerId>:<rich|plain>` (localStorage), so a reader
//    who folded the initiative's graph tabs finds them folded after a reload
//    while its Overview keeps its full header. An expand forgets it and holds
//    the header open (no scroll collapse) until the content kind changes.
import { useCallback, useEffect, useRef, useState } from 'react';
import { headerDefaults, headerDensityStorageKey, isRichHeaderContent, type HeaderContentKind } from './headerDensity';
import type { Density } from './Density';

/** Scrolled this far down (px), a rich page's header collapses. */
export const HEADER_SCROLL_COLLAPSE_PX = 48;
/** A scroll this soon (ms) after a wheel/touch/key/pointer input is the reader's. */
const USER_SCROLL_WINDOW_MS = 1000;

export interface UseHeaderDensityOptions {
  /** What the page's body holds. Default `detail`. */
  contentKind?: HeaderContentKind;
  /** The page's available height (px), when the host measures it. */
  containerHeight?: number | null;
  /** The host's own density; wins over the content kind. */
  preference?: Density | null;
  /** Names the header in the storage key ("initiative", "search"). Default "page". */
  headerId?: string;
  /** Collapse on scroll of the content region (rich content only). Default true. */
  scrollCollapse?: boolean;
}

export interface HeaderDensityState {
  density: Density;
  collapsed: boolean;
  /** Collapsed → open (forgotten); open → collapsed (remembered). */
  toggleCollapsed: () => void;
  /** Callback ref for the content region whose scroll collapses the header. */
  contentRef: (node: HTMLElement | null) => void;
  /** Spread onto `PageHeader` / `ScopeHeader`. */
  headerProps: { density: Density; collapsed: boolean; onToggleCollapsed: () => void };
}

type Manual = 'collapsed' | 'expanded' | null;

function readStored(key: string): Manual {
  if (typeof window === 'undefined') return null;
  try { return window.localStorage.getItem(key) === 'collapsed' ? 'collapsed' : null; } catch { return null; }
}

function writeStored(key: string, collapsed: boolean) {
  try {
    if (collapsed) window.localStorage.setItem(key, 'collapsed');
    else window.localStorage.removeItem(key);
  } catch { /* not remembered, still applied */ }
}

export function useHeaderDensity({
  contentKind = 'detail', containerHeight = null, preference = null, headerId = 'page', scrollCollapse = true,
}: UseHeaderDensityOptions = {}): HeaderDensityState {
  const key = headerDensityStorageKey(headerId, contentKind);
  const rich = isRichHeaderContent(contentKind);
  const { density, collapsed: shortCollapsed } = headerDefaults({ contentKind, containerHeight, preference });

  // The chevron's state belongs to one storage key: when the key changes (a
  // tab moves the page between rich and plain content) it is re-read.
  const [manualState, setManualState] = useState<{ key: string; manual: Manual }>(() => ({ key, manual: readStored(key) }));
  const [autoState, setAutoState] = useState<{ key: string; on: boolean }>({ key, on: false });
  const manual = manualState.key === key ? manualState.manual : readStored(key);
  const auto = autoState.key === key && autoState.on;
  if (manualState.key !== key) setManualState({ key, manual });
  if (autoState.key !== key && autoState.on) setAutoState({ key, on: false });

  const collapsed = manual === 'collapsed' || (manual === null && ((auto && rich) || shortCollapsed));

  const toggleCollapsed = useCallback(() => {
    if (collapsed) {
      writeStored(key, false);
      setManualState({ key, manual: 'expanded' });
      setAutoState({ key, on: false });
    } else {
      writeStored(key, true);
      setManualState({ key, manual: 'collapsed' });
    }
  }, [collapsed, key]);

  // Scroll collapse: only for rich content, only while the reader has not
  // chosen by hand, only for scrolls that follow the reader's own input.
  const live = useRef({ enabled: false, key });
  live.current = { enabled: scrollCollapse && rich && manual === null, key };
  const [node, setNode] = useState<HTMLElement | null>(null);
  useEffect(() => {
    if (!node) return undefined;
    let lastInput = 0;
    const mark = () => { lastInput = Date.now(); };
    const onScroll = (event: Event) => {
      if (!live.current.enabled || Date.now() - lastInput > USER_SCROLL_WINDOW_MS) return;
      const target = event.target instanceof HTMLElement ? event.target : null;
      const top = target ? target.scrollTop : 0;
      const k = live.current.key;
      if (top > HEADER_SCROLL_COLLAPSE_PX) setAutoState((s) => (s.key === k && s.on ? s : { key: k, on: true }));
      else if (top <= 0) setAutoState((s) => (s.key === k && !s.on ? s : { key: k, on: false }));
    };
    const inputs = ['wheel', 'touchmove', 'keydown', 'pointerdown'] as const;
    inputs.forEach((type) => node.addEventListener(type, mark, { passive: true, capture: true }));
    node.addEventListener('scroll', onScroll, { passive: true, capture: true });
    return () => {
      inputs.forEach((type) => node.removeEventListener(type, mark, { capture: true }));
      node.removeEventListener('scroll', onScroll, { capture: true });
    };
  }, [node]);

  return {
    density,
    collapsed,
    toggleCollapsed,
    contentRef: setNode,
    headerProps: { density, collapsed, onToggleCollapsed: toggleCollapsed },
  };
}
