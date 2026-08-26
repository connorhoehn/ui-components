// MediaEffectsTray — picker for camera media effects: color filters,
// background replacement (blur / image), and face sprites.
//
// Pure presentational. The actual video processing (MediaPipe
// segmentation, canvas compositing, etc.) lives in the consumer's engine
// hook — this tray only reflects the active selection it is told about
// and reports clicks. It renders over dark call chrome (pre-join green
// room, in-call popover), so it styles itself on the inverse surface the
// way CallWidget / CallStartedBanner do.
//
// Selection contracts:
//   filters      — activeFilterId 'none' means off; the consumer decides
//                  whether to include a 'none' entry in `filters`.
//   backgrounds  — a built-in "None" chip, a built-in "Blur" chip, then
//                  one chip per image option. onSelectBackground always
//                  fires the (mode, url) tuple: ('none', null),
//                  ('blur', null) or ('image', url).
//   faceSprites  — a built-in "None" chip (null = off) then one chip per
//                  sprite; sprite labels already carry their emoji.
//
// Toggle-off: clicking the chip that is ALREADY active deselects it —
// the tray reports the section's off value ('none' filter, ('none',
// null) background, null sprite) instead of re-reporting the selection.
// The explicit "None" chips stay for discoverability; toggle-off is the
// shortcut for "turn this thing off that I just turned on".

import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

export interface MediaEffectsFilterOption {
  id: string;
  label: string;
}

export interface MediaEffectsBackgroundOption {
  id: string;
  label: string;
  /** Thumbnail + replacement image URL, rendered as the chip's preview. */
  url: string;
}

export interface MediaEffectsTrayProps {
  filters: MediaEffectsFilterOption[];
  /** 'none' = no filter active. */
  activeFilterId: string;
  onSelectFilter: (id: string) => void;

  backgrounds: MediaEffectsBackgroundOption[];
  backgroundMode: 'none' | 'blur' | 'image';
  /** Only meaningful when backgroundMode === 'image'. */
  activeBackgroundUrl: string | null;
  /** ('none', null) | ('blur', null) | ('image', url) */
  onSelectBackground: (mode: 'none' | 'blur' | 'image', url: string | null) => void;

  faceSprites: MediaEffectsFilterOption[];
  /** null = no sprite active. */
  activeFaceSpriteId: string | null;
  onSelectFaceSprite: (id: string | null) => void;

  /** Dims every chip and blocks clicks — e.g. while the engine loads. */
  disabled?: boolean;
  /** Compact = tighter paddings for popover placement. */
  compact?: boolean;
  className?: string;
  'data-testid'?: string;
}

// Local chip primitive. The shared <Chip> is a non-interactive status
// span (tones + dot), so the pressable effect chip lives here instead of
// forcing button semantics onto it.
interface EffectChipProps {
  label: string;
  active: boolean;
  disabled: boolean;
  compact: boolean;
  onClick: () => void;
  /** When set, a small round thumbnail renders before the label. */
  thumbUrl?: string;
  'data-testid': string;
}

function EffectChip({
  label,
  active,
  disabled,
  compact,
  onClick,
  thumbUrl,
  'data-testid': testId,
}: EffectChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={active}
      title={label}
      data-testid={testId}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full font-medium whitespace-nowrap shrink-0',
        'transition-colors duration-150',
        compact ? 'px-2.5 py-1 text-xs' : 'px-3 py-1.5 text-sm',
        active
          ? 'bg-call-chrome-accent text-white'
          : 'bg-white/10 text-white hover:bg-white/20',
        disabled && 'opacity-40 cursor-not-allowed',
        !disabled && 'cursor-pointer',
      )}
    >
      {thumbUrl && (
        <span
          aria-hidden
          className={cn(
            'rounded-full bg-cover bg-center shrink-0 border border-white/20',
            compact ? 'h-4 w-4' : 'h-5 w-5',
          )}
          // Dynamic, prop-driven URL — cannot be a Tailwind class.
          style={{ backgroundImage: `url(${thumbUrl})` }}
        />
      )}
      {label}
    </button>
  );
}

function TraySection({
  label,
  compact,
  children,
}: {
  label: string;
  compact: boolean;
  children: ReactNode;
}) {
  return (
    <section className={cn('flex flex-col', compact ? 'gap-1.5' : 'gap-2')}>
      <h3 className="text-[11px] font-semibold uppercase tracking-wide text-white/60">
        {label}
      </h3>
      {/* Compact (popover) keeps a stable height via horizontal scroll;
          the full-size tray WRAPS so every option is visible at once —
          clipped chips with no scroll affordance read as missing
          features (operator feedback 2026-08-25). */}
      <div
        className={cn(
          'flex gap-2',
          compact ? 'items-center overflow-x-auto pb-1' : 'flex-wrap',
        )}
      >
        {children}
      </div>
    </section>
  );
}

export function MediaEffectsTray({
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
  compact = false,
  className,
  'data-testid': testId,
}: MediaEffectsTrayProps) {
  return (
    <div
      data-testid={testId}
      className={cn(
        'flex flex-col text-white',
        // Panel chrome only in compact/popover placement — full-size
        // renders flat so a dark host surface (CallSettingsDialog)
        // doesn't show a card-within-a-card inset.
        compact
          ? 'gap-3 rounded-xl border border-call-chrome-border bg-call-chrome p-3'
          : 'gap-4',
        className,
      )}
    >
      <TraySection label="Filters" compact={compact}>
        {filters.map((f) => {
          const active = f.id === activeFilterId;
          return (
            <EffectChip
              key={f.id}
              label={f.label}
              active={active}
              disabled={disabled}
              compact={compact}
              // Clicking the active chip toggles the filter back off.
              onClick={() => onSelectFilter(active ? 'none' : f.id)}
              data-testid={`effects-filter-${f.id}`}
            />
          );
        })}
      </TraySection>

      <TraySection label="Background" compact={compact}>
        <EffectChip
          label="None"
          active={backgroundMode === 'none'}
          disabled={disabled}
          compact={compact}
          onClick={() => onSelectBackground('none', null)}
          data-testid="effects-bg-none"
        />
        <EffectChip
          label="Blur"
          active={backgroundMode === 'blur'}
          disabled={disabled}
          compact={compact}
          // Clicking Blur while blurred toggles the background back off.
          onClick={() =>
            backgroundMode === 'blur'
              ? onSelectBackground('none', null)
              : onSelectBackground('blur', null)
          }
          data-testid="effects-bg-blur"
        />
        {backgrounds.map((b) => {
          const active = backgroundMode === 'image' && activeBackgroundUrl === b.url;
          return (
            <EffectChip
              key={b.id}
              label={b.label}
              active={active}
              disabled={disabled}
              compact={compact}
              // Clicking the active image toggles the background back off.
              onClick={() =>
                active
                  ? onSelectBackground('none', null)
                  : onSelectBackground('image', b.url)
              }
              thumbUrl={b.url}
              data-testid={`effects-bg-${b.id}`}
            />
          );
        })}
      </TraySection>

      <TraySection label="Face FX" compact={compact}>
        <EffectChip
          label="None"
          active={activeFaceSpriteId === null}
          disabled={disabled}
          compact={compact}
          onClick={() => onSelectFaceSprite(null)}
          data-testid="effects-face-none"
        />
        {faceSprites.map((s) => {
          const active = s.id === activeFaceSpriteId;
          return (
            <EffectChip
              key={s.id}
              label={s.label}
              active={active}
              disabled={disabled}
              compact={compact}
              // Clicking the active sprite toggles it back off.
              onClick={() => onSelectFaceSprite(active ? null : s.id)}
              data-testid={`effects-face-${s.id}`}
            />
          );
        })}
      </TraySection>
    </div>
  );
}

export default MediaEffectsTray;
