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

import { useRef, useState, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { Select } from '../forms/Select';
import { Button } from '../ui/Button';
import { InlineAlert } from '../shared/InlineAlert';
import { MoreHorizontalIcon } from './MediaIcons';
import { PlusIcon } from '../ui/Icons';
import { StreamVideo } from './StreamVideo';

export interface MediaEffectsFilterOption {
  id: string;
  label: string;
  /**
   * The CSS filter the effect applies (RM presets carry it as `cssFilter`).
   * The grid layout paints each filter thumbnail with it.
   */
  cssFilter?: string;
  /** Glyph for a face-effect button in the grid layout. */
  icon?: ReactNode;
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
  /**
   * `strip` (default): pill chips on the dark call chrome, for a popover or
   * the pre-join room. `grid`: the call-settings Effects tab — thumbnail
   * tiles in `columns` columns under "Filter · Reset", "Background" and "Face
   * effects" headings, painted in the page theme (light or dark).
   */
  layout?: 'strip' | 'grid';
  /** Grid columns. Default 3. */
  columns?: number;
  /** Grid: a live frame for the thumbnails (the preview stream), filtered per tile. */
  thumbnailStream?: MediaStream | null;
  /** Grid: a still frame for the thumbnails when there is no stream. */
  thumbnailSrc?: string;
  /** Grid: filter tiles before "More..." folds the rest. Default 5. */
  filterLimit?: number;
  /** Grid: when set, a dashed "+ Custom" tile opens a file picker (images ≤ 5 MB). */
  onSelectCustomBackground?: (file: File) => void;
  /** Grid: background replacement cannot run here (no WebGL / segmenter failed). */
  backgroundsUnsupported?: boolean;
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
  layout = 'strip',
  columns = 3,
  thumbnailStream = null,
  thumbnailSrc,
  filterLimit = 5,
  onSelectCustomBackground,
  backgroundsUnsupported = false,
  className,
  'data-testid': testId,
}: MediaEffectsTrayProps) {
  if (layout === 'grid') {
    return (
      <EffectsGrid
        filters={filters}
        activeFilterId={activeFilterId}
        onSelectFilter={onSelectFilter}
        backgrounds={backgrounds}
        backgroundMode={backgroundMode}
        activeBackgroundUrl={activeBackgroundUrl}
        onSelectBackground={onSelectBackground}
        faceSprites={faceSprites}
        activeFaceSpriteId={activeFaceSpriteId}
        onSelectFaceSprite={onSelectFaceSprite}
        disabled={disabled}
        columns={columns}
        thumbnailStream={thumbnailStream}
        {...(thumbnailSrc ? { thumbnailSrc } : {})}
        filterLimit={filterLimit}
        {...(onSelectCustomBackground ? { onSelectCustomBackground } : {})}
        backgroundsUnsupported={backgroundsUnsupported}
        {...(className ? { className } : {})}
        {...(testId ? { 'data-testid': testId } : {})}
      />
    );
  }
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

// ── Grid layout ────────────────────────────────────────────────────────

const MAX_CUSTOM_BYTES = 5 * 1024 * 1024;

/** `url("…")` that survives any URL: quoted, with the characters that end a quoted CSS string escaped. */
function cssUrl(url: string): string {
  return `url("${url.replace(/["\\\n\r]/g, (c) => encodeURIComponent(c))}")`;
}

/** A frame of the viewer's camera for a thumbnail, with an optional CSS filter. */
function Frame({
  stream,
  src,
  filter,
  backgroundUrl,
}: {
  stream: MediaStream | null;
  src?: string;
  filter?: string;
  backgroundUrl?: string;
}) {
  if (backgroundUrl) {
    return (
      <span
        aria-hidden
        className="absolute inset-0 bg-cover bg-center"
        // Dynamic, prop-driven URL — cannot be a Tailwind class.
        style={{ backgroundImage: cssUrl(backgroundUrl) }}
      />
    );
  }
  const f = filter && filter !== 'none' ? filter : undefined;
  return (
    <span
      aria-hidden
      className="absolute inset-0 overflow-hidden bg-video-tile"
      // The effect's own CSS filter (prop data) — the whole point of the thumb.
      style={f ? { filter: f } : undefined}
    >
      {stream ? (
        <StreamVideo stream={stream} muted className="h-full w-full scale-x-[-1] object-cover" />
      ) : src ? (
        <img src={src} alt="" className="h-full w-full object-cover" />
      ) : (
        <span className="block h-full w-full bg-gradient-to-br from-white/15 to-black/30" />
      )}
    </span>
  );
}

function Thumb({
  label,
  active,
  disabled,
  onClick,
  testId,
  children,
  dashed = false,
}: {
  label: string;
  active: boolean;
  disabled: boolean;
  onClick: () => void;
  testId: string;
  children: ReactNode;
  dashed?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={dashed ? undefined : active}
      title={label}
      data-testid={testId}
      data-active={active ? 'true' : 'false'}
      className={cn(
        'group/thumb flex min-w-0 cursor-pointer flex-col gap-1 border-none bg-transparent p-0 text-left font-[inherit]',
        'disabled:cursor-not-allowed disabled:opacity-50',
      )}
    >
      <span
        className={cn(
          'relative flex aspect-[96/56] w-full items-center justify-center overflow-hidden rounded-md',
          dashed ? 'border border-dashed border-border-emphasis bg-surface text-text-tertiary' : 'bg-video-tile',
          active ? 'ring-2 ring-primary ring-offset-2 ring-offset-surface' : !dashed && 'group-hover/thumb:ring-1 group-hover/thumb:ring-border-emphasis',
        )}
      >
        {children}
      </span>
      <span className={cn('truncate text-xs', dashed ? 'text-primary' : 'text-text-secondary')}>{label}</span>
    </button>
  );
}

function GridHeading({ children, action }: { children: ReactNode; action?: ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <h3 className="m-0 text-sm font-semibold text-text-primary">{children}</h3>
      {action}
    </div>
  );
}

type EffectsGridProps = Required<
  Pick<
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
  >
> & {
  disabled: boolean;
  columns: number;
  thumbnailStream: MediaStream | null;
  thumbnailSrc?: string;
  filterLimit: number;
  onSelectCustomBackground?: (file: File) => void;
  backgroundsUnsupported: boolean;
  className?: string;
  'data-testid'?: string;
};

const GRID_COLS: Record<number, string> = {
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
};

function EffectsGrid({
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
  disabled,
  columns,
  thumbnailStream,
  thumbnailSrc,
  filterLimit,
  onSelectCustomBackground,
  backgroundsUnsupported,
  className,
  'data-testid': testId,
}: EffectsGridProps) {
  const [allFilters, setAllFilters] = useState(false);
  const [allSprites, setAllSprites] = useState(false);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const cols = GRID_COLS[columns] ?? 'grid-cols-3';

  const folds = !allFilters && filters.length > filterLimit + 1;
  const shownFilters = folds ? filters.slice(0, filterLimit) : filters;
  const spriteLimit = 2;
  const spritesFold = !allSprites && faceSprites.length > spriteLimit + 1;
  const shownSprites = spritesFold ? faceSprites.slice(0, spriteLimit) : faceSprites;
  const frame = { stream: thumbnailStream, ...(thumbnailSrc ? { src: thumbnailSrc } : {}) };

  return (
    <div data-testid={testId} data-layout="grid" className={cn('flex flex-col gap-4 text-text-primary', className)}>
      <section className="flex flex-col gap-2" aria-label="Filter">
        <GridHeading
          action={
            <Button
              variant="link"
              onClick={() => onSelectFilter('none')}
              disabled={disabled}
              data-testid="effects-filter-reset"
              className="text-sm"
            >
              Reset
            </Button>
          }
        >
          Filter
        </GridHeading>
        <div className={cn('grid gap-x-3 gap-y-2', cols)}>
          {shownFilters.map((f) => (
            <Thumb
              key={f.id}
              label={f.label}
              active={f.id === activeFilterId}
              disabled={disabled}
              onClick={() => onSelectFilter(f.id)}
              testId={`effects-filter-${f.id}`}
            >
              <Frame {...frame} {...(f.cssFilter ? { filter: f.cssFilter } : {})} />
            </Thumb>
          ))}
          {folds && (
            <Thumb
              label="More..."
              active={false}
              disabled={disabled}
              onClick={() => setAllFilters(true)}
              testId="effects-filter-more"
            >
              <Frame {...frame} filter="blur(3px)" />
              <span className="relative text-white">
                <MoreHorizontalIcon size={22} />
              </span>
            </Thumb>
          )}
        </div>
      </section>

      <section className="flex flex-col gap-2" aria-label="Background">
        <GridHeading>Background</GridHeading>
        {backgroundsUnsupported ? (
          <InlineAlert tone="info" data-testid="effects-background-unsupported">
            Backgrounds need a newer browser
          </InlineAlert>
        ) : (
          <div className={cn('grid gap-x-3 gap-y-2', cols)}>
            <Thumb
              label="None"
              active={backgroundMode === 'none'}
              disabled={disabled}
              onClick={() => onSelectBackground('none', null)}
              testId="effects-background-none"
            >
              <Frame {...frame} />
            </Thumb>
            <Thumb
              label="Blur"
              active={backgroundMode === 'blur'}
              disabled={disabled}
              onClick={() => onSelectBackground('blur', null)}
              testId="effects-background-blur"
            >
              <Frame {...frame} filter="blur(4px)" />
            </Thumb>
            {backgrounds.map((b) => (
              <Thumb
                key={b.id}
                label={b.label}
                active={backgroundMode === 'image' && activeBackgroundUrl === b.url}
                disabled={disabled}
                onClick={() => onSelectBackground('image', b.url)}
                testId={`effects-background-${b.id}`}
              >
                <Frame stream={null} backgroundUrl={b.url} />
              </Thumb>
            ))}
            {onSelectCustomBackground && (
              <Thumb
                label="+ Custom"
                active={false}
                disabled={disabled}
                dashed
                onClick={() => fileRef.current?.click()}
                testId="effects-background-custom"
              >
                <PlusIcon size={22} />
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  data-testid="effects-background-custom-input"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    e.target.value = '';
                    if (file && file.size <= MAX_CUSTOM_BYTES) onSelectCustomBackground(file);
                  }}
                />
              </Thumb>
            )}
          </div>
        )}
      </section>

      <section className="flex flex-col gap-2" aria-label="Face effects">
        <GridHeading>Face effects</GridHeading>
        <Select
          value={activeFaceSpriteId ?? ''}
          onChange={(e) => onSelectFaceSprite(e.target.value || null)}
          disabled={disabled}
          aria-label="Face effect"
          data-testid="effects-face-select"
          options={[{ value: '', label: 'None' }, ...faceSprites.map((f) => ({ value: f.id, label: f.label }))]}
        />
        {faceSprites.length > 0 && (
          <div className={cn('grid gap-2', cols)}>
            {shownSprites.map((f) => {
              const active = f.id === activeFaceSpriteId;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => onSelectFaceSprite(active ? null : f.id)}
                  disabled={disabled}
                  aria-pressed={active}
                  data-testid={`effects-face-${f.id}`}
                  className={cn(
                    'flex cursor-pointer flex-col items-center gap-1 rounded-md border-none bg-transparent py-1.5 font-[inherit] text-xs text-text-secondary',
                    'hover:bg-surface-hover disabled:cursor-not-allowed disabled:opacity-50',
                    active && 'bg-primary-bg text-primary',
                  )}
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-inset text-lg text-text-primary">
                    {f.icon ?? f.label.slice(0, 1)}
                  </span>
                  <span className="truncate">{f.label}</span>
                </button>
              );
            })}
            {spritesFold && (
              <button
                type="button"
                onClick={() => setAllSprites(true)}
                disabled={disabled}
                data-testid="effects-face-more"
                className="flex cursor-pointer flex-col items-center gap-1 rounded-md border-none bg-transparent py-1.5 font-[inherit] text-xs text-text-secondary hover:bg-surface-hover"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-inset text-text-primary">
                  <MoreHorizontalIcon size={20} />
                </span>
                <span>More</span>
              </button>
            )}
          </div>
        )}
      </section>
    </div>
  );
}

export default MediaEffectsTray;
