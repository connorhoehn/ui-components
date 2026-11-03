// ui-components/src/hooks/useFullscreen.ts
//
// One element in the browser's full-screen mode: whether it is there now,
// whether the page may ask at all, and a toggle. StreamStage, RecordGraph
// and RecordingPlayer each carried their own copy of this; a whiteboard page
// was the fourth, so the logic lives here once and the components compose it.
//
// Full screen is an affordance, never a failure path: a refused or unsupported
// request leaves `active` false and sets `error`, and the host keeps working.

import { useCallback, useEffect, useState, type RefObject } from 'react';

export interface UseFullscreenReturn {
  /** The element is the document's full-screen element right now. */
  active: boolean;
  /** The Fullscreen API exists here and the document allows it (false when SSR). */
  supported: boolean;
  /** The last request was refused or threw; cleared by the next request. */
  error: boolean;
  enter: () => Promise<void>;
  exit: () => Promise<void>;
  toggle: () => Promise<void>;
}

type FullscreenElement = HTMLElement & { webkitRequestFullscreen?: () => Promise<void> | void };
type FullscreenDocument = Document & { webkitExitFullscreen?: () => Promise<void> | void; webkitFullscreenElement?: Element | null };

function currentFullscreenElement(): Element | null {
  if (typeof document === 'undefined') return null;
  const doc = document as FullscreenDocument;
  return doc.fullscreenElement ?? doc.webkitFullscreenElement ?? null;
}

export function fullscreenSupported(): boolean {
  if (typeof document === 'undefined' || typeof Element === 'undefined') return false;
  const proto = Element.prototype as unknown as FullscreenElement;
  return document.fullscreenEnabled !== false && !!(proto.requestFullscreen ?? proto.webkitRequestFullscreen);
}

export function useFullscreen(target: RefObject<HTMLElement | null>): UseFullscreenReturn {
  const [active, setActive] = useState(false);
  const [error, setError] = useState(false);
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    setSupported(fullscreenSupported());
    if (typeof document === 'undefined') return;
    const changed = () => setActive(!!target.current && currentFullscreenElement() === target.current);
    changed();
    document.addEventListener('fullscreenchange', changed);
    document.addEventListener('webkitfullscreenchange', changed);
    return () => {
      document.removeEventListener('fullscreenchange', changed);
      document.removeEventListener('webkitfullscreenchange', changed);
    };
  }, [target]);

  const enter = useCallback(async () => {
    const el = target.current as FullscreenElement | null;
    setError(false);
    if (!el) { setError(true); return; }
    try {
      const request = el.requestFullscreen ?? el.webkitRequestFullscreen;
      if (!request) { setError(true); return; }
      await request.call(el);
    } catch {
      setError(true);
    }
  }, [target]);

  const exit = useCallback(async () => {
    if (typeof document === 'undefined') return;
    const doc = document as FullscreenDocument;
    setError(false);
    try {
      if (!currentFullscreenElement()) return;
      await (doc.exitFullscreen ?? doc.webkitExitFullscreen)?.call(doc);
    } catch {
      setError(true);
    }
  }, []);

  const toggle = useCallback(async () => {
    if (target.current && currentFullscreenElement() === target.current) await exit();
    else await enter();
  }, [target, enter, exit]);

  return { active, supported, error, enter, exit, toggle };
}
