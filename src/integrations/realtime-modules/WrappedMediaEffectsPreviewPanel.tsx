// src/integrations/realtime-modules/WrappedMediaEffectsPreviewPanel.tsx
//
// <MediaEffectsPreviewPanel> wired to a useMediaEffects() controller that
// supports PREVIEW SESSIONS. This adapter owns the session lifecycle so
// the host only has to say "the panel is open":
//
//   open true            → beginPreview()   (snapshot live → draft)
//   Apply                → applyPreview()   (the only publish)
//   Cancel / close /     → cancelPreview()  (draft discarded, live intact)
//   unmount while open
//
// Abandoning the surface — Escape, backdrop click, navigating away, the
// component unmounting mid-session — therefore NEVER publishes. That is
// the whole point of the feature: the operator wanted to audition a face
// filter in a meeting without broadcasting it while deciding.
//
// Per the integrations convention (see WrappedMediaEffectsTray), the
// controller type is a STRUCTURAL mirror, not an import — the subpath
// compiles without a runtime dep on realtime-modules, and any object with
// these fields (including a test stub) satisfies it.

import { useEffect, useMemo, useRef } from 'react';

import { MediaEffectsPreviewPanel } from '../../components/video/MediaEffectsPreviewPanel';
import type { MediaEffectsPreviewPanelProps } from '../../components/video/MediaEffectsPreviewPanel';
import type {
  RMBackgroundMode,
  RMMediaEffectsControllerSource,
} from './WrappedMediaEffectsTray';

/** The four values a preview session snapshots and commits. */
export interface RMMediaEffectsSettings {
  filterId: string;
  backgroundMode: RMBackgroundMode;
  backgroundImageUrl: string | null;
  faceSpriteId: string | null;
}

/**
 * useMediaEffects()'s controller plus the preview-session surface added
 * for the audition-before-publish flow.
 */
export interface RMMediaEffectsPreviewControllerSource
  extends RMMediaEffectsControllerSource {
  /** Non-null only during a preview session. */
  draft: RMMediaEffectsSettings | null;
  /** Draft differs from live. */
  isDirty: boolean;
  /** The draft self-view. NEVER published. */
  previewTrack: MediaStreamTrack | null;
  /** Snapshot live → draft; the setters now write the draft. */
  beginPreview(): void;
  /** Commit the draft to live — the only thing peers ever see. */
  applyPreview(): void;
  /** Discard the draft; live untouched. */
  cancelPreview(): void;
}

export interface WrappedMediaEffectsPreviewPanelProps
  extends Pick<
    MediaEffectsPreviewPanelProps,
    | 'disabled'
    | 'title'
    | 'applyLabel'
    | 'className'
    | 'data-testid'
    | 'variant'
    | 'showFooter'
    | 'hint'
    | 'thumbnailSrc'
    | 'onSelectCustomBackground'
    | 'backgroundsUnsupported'
  > {
  /** Mounts the surface and opens a preview session. */
  open: boolean;
  /** Return value of useMediaEffects() from realtime-modules. */
  controller: RMMediaEffectsPreviewControllerSource;
  /** Host closes its dialog/panel here. Fired after Apply AND Cancel. */
  onClose: () => void;
  /** Extra hook fired only on Apply (e.g. a "Effects updated" toast). */
  onApplied?: () => void;
}

export function WrappedMediaEffectsPreviewPanel({
  open,
  controller,
  onClose,
  onApplied,
  ...rest
}: WrappedMediaEffectsPreviewPanelProps) {
  // Read the controller through a ref inside the lifecycle effect: the
  // hook returns a fresh object every render, and depending on it would
  // tear down + restart the preview session on every keystroke elsewhere
  // in the tree.
  const controllerRef = useRef(controller);
  controllerRef.current = controller;

  // `true` between beginPreview() and whichever of apply/cancel ends the
  // session. Stops the effect cleanup from cancelling a session that the
  // Apply button already committed (which would revert the publish).
  const sessionOpenRef = useRef(false);

  useEffect(() => {
    if (!open) return;
    controllerRef.current.beginPreview();
    sessionOpenRef.current = true;
    return () => {
      if (!sessionOpenRef.current) return;
      sessionOpenRef.current = false;
      controllerRef.current.cancelPreview();
    };
  }, [open]);

  // The draft self-view. `previewTrack` is a bare track; <StreamVideo>
  // binds a MediaStream. Guarded for jsdom/SSR, where MediaStream is
  // absent — the panel then shows its "Starting preview…" empty state
  // instead of throwing.
  const previewStream = useMemo(() => {
    const track = controller.previewTrack;
    if (!track || typeof MediaStream === 'undefined') return null;
    try {
      return new MediaStream([track]);
    } catch {
      return null;
    }
  }, [controller.previewTrack]);

  if (!open) return null;

  // While a session is open the chips must reflect the DRAFT, not live —
  // otherwise auditioning would look like it did nothing. Before the
  // draft lands (first render of the session) fall back to live values.
  const draft = controller.draft;
  const shown: RMMediaEffectsSettings = draft ?? {
    filterId: controller.filterId,
    backgroundMode: controller.backgroundMode,
    backgroundImageUrl: controller.backgroundImageUrl,
    faceSpriteId: controller.faceSpriteId,
  };

  const endSession = () => {
    sessionOpenRef.current = false;
  };

  return (
    <MediaEffectsPreviewPanel
      {...rest}
      previewActive={draft !== null}
      previewStream={previewStream}
      isDirty={controller.isDirty}
      onApply={() => {
        controller.applyPreview();
        endSession();
        onApplied?.();
        onClose();
      }}
      onCancel={() => {
        controller.cancelPreview();
        endSession();
        onClose();
      }}
      filters={controller.filters.map(({ id, label, cssFilter }) => ({ id, label, ...(cssFilter ? { cssFilter } : {}) }))}
      activeFilterId={shown.filterId}
      onSelectFilter={(id) => controller.setFilter(id)}
      backgrounds={controller.backgrounds.map(({ id, label, url }) => ({ id, label, url }))}
      backgroundMode={shown.backgroundMode}
      activeBackgroundUrl={shown.backgroundImageUrl}
      onSelectBackground={(mode, url) => {
        // Image URL first, then mode — same ordering as the live tray:
        // the engine warms the segmenter on the mode flip, and an
        // image-mode flip with a stale URL briefly composites the
        // previous background into the preview.
        controller.setBackgroundImageUrl(url);
        controller.setBackgroundMode(mode);
      }}
      faceSprites={controller.faceSprites.map(({ id, label }) => ({ id, label }))}
      activeFaceSpriteId={shown.faceSpriteId}
      onSelectFaceSprite={(id) => controller.setFaceSpriteId(id)}
    />
  );
}

/**
 * How many of the four settings the open preview session changes — the
 * "2 changes" in the call-settings Effects footer. 0 outside a session.
 */
export function mediaEffectsChangeCount(controller: RMMediaEffectsPreviewControllerSource): number {
  const d = controller.draft;
  if (!d) return 0;
  let n = 0;
  if (d.filterId !== controller.filterId) n++;
  if (d.backgroundMode !== controller.backgroundMode || (d.backgroundMode === 'image' && d.backgroundImageUrl !== controller.backgroundImageUrl)) n++;
  if (d.faceSpriteId !== controller.faceSpriteId) n++;
  return n;
}

export default WrappedMediaEffectsPreviewPanel;
