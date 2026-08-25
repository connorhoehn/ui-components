// src/integrations/realtime-modules/WrappedMediaEffectsTray.tsx
//
// MediaEffectsTray wired directly to a useMediaEffects() controller from
// @connorhoehn/realtime-modules/client/media-effects. The controller owns
// the engine (lazy canvas pipeline, MediaPipe segmentation/landmarks); the
// tray is pure chips — this adapter is the mapping between them.
//
// Per the integrations convention (see WrappedConnectionPill), the
// controller type is a STRUCTURAL mirror, not an import — the subpath
// compiles without a runtime dep on realtime-modules, and any object
// with these fields (including a test stub) satisfies it.

import { MediaEffectsTray } from '../../components/video/MediaEffectsTray';
import type { MediaEffectsTrayProps } from '../../components/video/MediaEffectsTray';

export type RMBackgroundMode = 'none' | 'blur' | 'image';

/**
 * Minimum shape needed from useMediaEffects()'s MediaEffectsController.
 * Registry entries may carry extra fields (cssFilter, render fns) — the
 * tray only reads id/label/url.
 */
export interface RMMediaEffectsControllerSource {
  filterId: string;
  backgroundMode: RMBackgroundMode;
  backgroundImageUrl: string | null;
  faceSpriteId: string | null;
  filters: Array<{ id: string; label: string }>;
  backgrounds: Array<{ id: string; label: string; url: string }>;
  faceSprites: Array<{ id: string; label: string }>;
  setFilter(id: string): void;
  setBackgroundMode(mode: RMBackgroundMode): void;
  setBackgroundImageUrl(url: string | null): void;
  setFaceSpriteId(id: string | null): void;
}

export interface WrappedMediaEffectsTrayProps
  extends Pick<
    MediaEffectsTrayProps,
    'disabled' | 'compact' | 'className' | 'data-testid'
  > {
  /** Return value of useMediaEffects() from realtime-modules. */
  controller: RMMediaEffectsControllerSource;
}

export function WrappedMediaEffectsTray({
  controller,
  ...rest
}: WrappedMediaEffectsTrayProps) {
  return (
    <MediaEffectsTray
      filters={controller.filters.map(({ id, label }) => ({ id, label }))}
      activeFilterId={controller.filterId}
      onSelectFilter={(id) => controller.setFilter(id)}
      backgrounds={controller.backgrounds.map(({ id, label, url }) => ({ id, label, url }))}
      backgroundMode={controller.backgroundMode}
      activeBackgroundUrl={controller.backgroundImageUrl}
      onSelectBackground={(mode, url) => {
        // Image URL first, then mode — the engine warms the segmenter on
        // the mode flip, and an image-mode flip with a stale URL would
        // briefly composite the previous background.
        controller.setBackgroundImageUrl(url);
        controller.setBackgroundMode(mode);
      }}
      faceSprites={controller.faceSprites.map(({ id, label }) => ({ id, label }))}
      activeFaceSpriteId={controller.faceSpriteId}
      onSelectFaceSprite={(id) => controller.setFaceSpriteId(id)}
      {...rest}
    />
  );
}
