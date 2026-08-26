// MediaEffectsPreviewPanel — audition camera effects PRIVATELY, then
// publish them with an explicit Apply.
//
// Complaint that produced it: the Effects tab applied every click LIVE,
// so clicking "Sunglasses" instantly broadcast sunglasses to everyone in
// the meeting. Microsoft Teams' "Video effects" panel is the model — a
// large self-view, the effect applied to the PREVIEW only, and an
// explicit Apply to publish. This panel is that surface.
//
// ── The safety property ───────────────────────────────────────────────
// `previewActive` is the gate. It means "a preview session is open, and
// every setter below writes the DRAFT, not the live pipeline". When it
// is false the panel is inert: chips are disabled AND — belt and braces
// — no selection callback fires at all. That second half is the one that
// matters: a disabled attribute is a rendering detail a future refactor
// can drop, whereas a callback that refuses to run cannot leak an effect
// to peers by accident.
//
// ── Layout ────────────────────────────────────────────────────────────
// The preview gets the majority of the panel (Teams gives it the whole
// top half). Under it: an in-words privacy line — not just styling, so
// the user can TELL at a glance that peers cannot see this yet — then
// the same filter / background / face-FX trays as before, then a footer
// with Cancel and an Apply that stays disabled until something differs
// from live.
//
// Purely presentational. `beginPreview` / `applyPreview` / `cancelPreview`
// live on the consumer's effects controller; the wiring adapter is
// <WrappedMediaEffectsPreviewPanel> in
// ui-components/integrations/realtime-modules.

import { cn } from '../../lib/cn';
import { MediaEffectsTray } from './MediaEffectsTray';
import type { MediaEffectsTrayProps } from './MediaEffectsTray';
import { StreamVideo } from './StreamVideo';

/**
 * The safety gate, hoisted out of the component so it can be asserted on
 * directly. Every selection handler in this panel is wrapped in it.
 *
 * Outside a preview session the wrapped callback is a no-op — a click
 * cannot reach the controller, and therefore cannot reach peers. The
 * `disabled` attribute on the chips is the SECOND layer, not this one;
 * disabling is a rendering detail a refactor can drop, whereas this
 * refuses to run.
 */
export function guardedSelection<A extends unknown[]>(
  previewActive: boolean,
  fn: (...args: A) => void,
): (...args: A) => void {
  return (...args: A) => {
    if (!previewActive) return;
    fn(...args);
  };
}

export interface MediaEffectsPreviewPanelProps
  extends Pick<
    MediaEffectsTrayProps,
    | 'filters'
    | 'activeFilterId'
    | 'onSelectFilter'
    | 'backgrounds'
    | 'backgroundMode'
    | 'activeBackgroundUrl'
    | 'onSelectBackground'
    | 'faceSprites'
    | 'activeFaceSpriteId'
    | 'onSelectFaceSprite'
  > {
  /**
   * True while a preview session is open — i.e. the controller has a
   * non-null `draft` and its setters write that draft instead of the
   * live pipeline. When false the panel renders read-only and NO
   * selection callback fires, so nothing can reach peers.
   */
  previewActive: boolean;
  /**
   * The draft self-view (built from the controller's `previewTrack`).
   * Never published. Pass null for the camera-off / warming-up state.
   */
  previewStream: MediaStream | null;
  /** Draft differs from live. Gates Apply. */
  isDirty: boolean;
  /** Commit the draft — the only thing that changes what peers see. */
  onApply: () => void;
  /** Discard the draft and dismiss. Live stays untouched. */
  onCancel: () => void;

  /** Extra dimming on top of `previewActive`, e.g. while the engine warms. */
  disabled?: boolean;
  /** Panel heading. Defaults to "Video effects" (Teams' wording). */
  title?: string;
  /** Label for the commit button. Defaults to "Apply". */
  applyLabel?: string;
  className?: string;
  'data-testid'?: string;
}

export function MediaEffectsPreviewPanel({
  previewActive,
  previewStream,
  isDirty,
  onApply,
  onCancel,
  filters,
  activeFilterId,
  onSelectFilter,
  backgrounds,
  backgroundMode,
  activeBackgroundUrl,
  onSelectBackground,
  faceSprites,
  activeFaceSpriteId,
  onSelectFaceSprite,
  disabled = false,
  title = 'Video effects',
  applyLabel = 'Apply',
  className,
  'data-testid': testId = 'media-effects-preview-panel',
}: MediaEffectsPreviewPanelProps) {
  // THE guard. Outside a preview session every selection is swallowed —
  // a click can never reach a live setter, whatever the chips look like.
  const guard = <A extends unknown[]>(fn: (...args: A) => void) =>
    guardedSelection(previewActive, fn);

  const canApply = previewActive && isDirty && !disabled;

  return (
    <section
      data-testid={testId}
      data-preview-active={previewActive ? 'true' : 'false'}
      data-preview-dirty={isDirty ? 'true' : 'false'}
      aria-label={title}
      className={cn('flex flex-col gap-3 text-text-inverse', className)}
    >
      {/* ── The point of the feature: a LARGE private self-view. ─────── */}
      <div
        data-testid="media-effects-preview-stage"
        className="relative aspect-video w-full shrink-0 overflow-hidden rounded-xl bg-video-stage"
      >
        {previewStream ? (
          <div data-testid="media-effects-preview-video" className="h-full w-full">
            <StreamVideo
              stream={previewStream}
              muted
              className="h-full w-full scale-x-[-1] object-cover"
            />
          </div>
        ) : (
          <div
            data-testid="media-effects-preview-empty"
            className="flex h-full w-full flex-col items-center justify-center gap-1 text-sm text-white/50"
          >
            <span aria-hidden className="text-2xl">📷</span>
            {previewActive ? 'Starting preview…' : 'Camera off'}
          </div>
        )}
        <span
          data-testid="media-effects-preview-badge"
          className="absolute left-2 top-2 rounded-full bg-black/70 px-2 py-0.5 text-[11px] font-semibold text-white"
        >
          Preview — only you
        </span>
      </div>

      {/* Said in WORDS, not just styling. */}
      <p
        data-testid="media-effects-preview-notice"
        className="m-0 rounded-lg bg-white/10 px-3 py-2 text-[12px] leading-snug text-white/80"
      >
        {previewActive
          ? 'This preview is private. Nobody else in the call can see these effects until you choose ' +
            `${applyLabel}.`
          : 'Preview is not running, so these controls are read-only. Nothing here is shared with the call.'}
      </p>

      <MediaEffectsTray
        data-testid="media-effects-preview-tray"
        disabled={disabled || !previewActive}
        filters={filters}
        activeFilterId={activeFilterId}
        onSelectFilter={guard(onSelectFilter)}
        backgrounds={backgrounds}
        backgroundMode={backgroundMode}
        activeBackgroundUrl={activeBackgroundUrl}
        onSelectBackground={guard(onSelectBackground)}
        faceSprites={faceSprites}
        activeFaceSpriteId={activeFaceSpriteId}
        onSelectFaceSprite={guard(onSelectFaceSprite)}
      />

      <footer className="flex shrink-0 items-center justify-end gap-3 border-t border-white/10 pt-3">
        <span
          data-testid="media-effects-preview-status"
          className="mr-auto text-[12px] text-white/60"
        >
          {isDirty ? 'Not shared yet' : 'Nothing to apply'}
        </span>
        <button
          type="button"
          onClick={onCancel}
          data-testid="media-effects-preview-cancel"
          className="cursor-pointer rounded-lg border border-white/20 bg-transparent px-3 py-1.5 text-[13px] font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onApply}
          disabled={!canApply}
          data-testid="media-effects-preview-apply"
          className={cn(
            'rounded-lg border-none px-4 py-1.5 text-[13px] font-semibold transition-colors',
            canApply
              ? 'cursor-pointer bg-primary text-white hover:bg-primary-hover'
              : 'cursor-not-allowed bg-white/10 text-white/40',
          )}
        >
          {applyLabel}
        </button>
      </footer>
    </section>
  );
}

export default MediaEffectsPreviewPanel;
