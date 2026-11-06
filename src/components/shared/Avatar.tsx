import { useState, type CSSProperties, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { TONE_SOFT, toneKey, type ToneOrAlias } from './tones';

/**
 * Fills for name-derived avatars. Each one carries the white initials at
 * ≥4.5:1 (WCAG AA for normal text), so the 9–16px initials read at every
 * size. The fill and the text are both literal, so the ratio is the same in
 * light and dark themes. Before 2.503.0 these were the 400/500 shades, and
 * white on orange measured 2.8:1. Pinned by `Avatar.contrast.test.tsx`.
 */
export const AVATAR_PALETTE: readonly string[] = [
  '#2563eb', // blue    5.17:1
  '#15803d', // green   5.02:1
  '#b45309', // amber   5.02:1
  '#dc2626', // red     4.83:1
  '#9333ea', // purple  5.38:1
  '#0f766e', // teal    5.47:1
  '#0369a1', // sky     5.93:1
  '#c2410c', // orange  5.18:1
];

export function nameToColor(name: string): string {
  // These two are public exports AND run on every Avatar render, and callers
  // pass a payload field straight through — a user who never set a display
  // name arrives as `name: null`. Supplying `initials` did not rescue it,
  // because this runs first. Coerce rather than throw: an avatar with a
  // fallback glyph beats an activity feed that renders nothing at all.
  const safe = typeof name === 'string' ? name : '';
  // djb2 hash
  let hash = 5381;
  for (let i = 0; i < safe.length; i++) {
    hash = (hash * 33) ^ safe.charCodeAt(i);
  }
  const index = Math.abs(hash) % AVATAR_PALETTE.length;
  return AVATAR_PALETTE[index];
}

/**
 * Relative luminance of a CSS colour, 0 (black) to 1 (white), or `null` when
 * the string isn't a form we can read (a `var(--x)`, an `hsl()`, a named
 * colour). Callers treat `null` as "don't guess".
 *
 * Only hex and `rgb()/rgba()` are parsed on purpose: those are the two forms
 * an avatar colour actually arrives in (a palette constant, or a per-user
 * colour from a presence payload), and a half-hearted colour parser that
 * silently mis-reads the rest is worse than one that admits defeat.
 */
function luminanceOf(color: string): number | null {
  const value = color.trim();
  let r: number, g: number, b: number;
  const hex = /^#([0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.exec(value);
  if (hex) {
    const digits = hex[1];
    const short = digits.length <= 4;
    const part = (i: number) =>
      short
        ? parseInt(digits[i] + digits[i], 16)
        : parseInt(digits.slice(i * 2, i * 2 + 2), 16);
    [r, g, b] = [part(0), part(1), part(2)];
  } else {
    const rgb = /^rgba?\(\s*([0-9.]+)[\s,]+([0-9.]+)[\s,]+([0-9.]+)/i.exec(value);
    if (!rgb) return null;
    [r, g, b] = [Number(rgb[1]), Number(rgb[2]), Number(rgb[3])];
  }
  if (![r, g, b].every((n) => Number.isFinite(n))) return null;
  // sRGB relative luminance (WCAG 2.x).
  const channel = (n: number) => {
    const c = n / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

/**
 * The text colour that reads on `background`, or `null` when the background
 * can't be parsed. The 0.6 cut is where white-on-fill stops clearing 4.5:1
 * for the palette's own colours; above it, dark text wins.
 */
export function readableAvatarForeground(background: string): string | null {
  const lum = luminanceOf(background);
  if (lum === null) return null;
  return lum > 0.6 ? 'var(--color-text-primary)' : '#fff';
}

export function nameToInitials(name: string): string {
  const trimmed = (typeof name === 'string' ? name : '').trim();
  if (!trimmed) return '?';
  const parts = trimmed.split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  // Single word: first 2 chars (capitalized)
  const first = parts[0];
  if (first.length >= 2) {
    return (first[0].toUpperCase() + first[1].toLowerCase());
  }
  return first[0].toUpperCase();
}

export interface AvatarProps {
  name: string;
  size?: number;
  /**
   * Override the derived initials. Use when the caller already has canonical
   * initials (e.g. from a presence payload) and shouldn't re-derive them from
   * a display name — deriving would turn "AS" into "As".
   */
  initials?: string;
  /** Override the auto-computed color. */
  color?: string;
  /** Optional profile image URL. Falls back to initials if absent or load fails. */
  src?: string;
  /**
   * An arbitrary node in the circle instead of initials — an icon, usually.
   *
   * Exists because not every avatar-shaped thing is a person. A channel row
   * wants a `#` in the same coloured circle at the same size with the same
   * overlap rules, and without this the only way to get one was a hand-rolled
   * `<span className="rounded-full …">` beside a real `Avatar`, which is two
   * components to keep in step and one of them outside the design system.
   *
   * Wins over `src` only when there is no image to show; loses to a loaded
   * image, because a photo is more specific than a glyph.
   */
  icon?: ReactNode;
  /**
   * A single character or emoji in the circle — `#` for a channel, `🔒` for a
   * private one. The string form of `icon`, sized a little larger than initials
   * because one character at initials size reads as a speck.
   */
  glyph?: string;
  /**
   * Explicit text colour for the initials/glyph. Overrides everything else.
   *
   * The default is white, which is right for the saturated palette above and
   * wrong for a pale fill — a task row's assignee badge is dark indigo on a
   * light indigo tint, and white on that fails contrast, which is exactly why
   * such badges were being hand-rolled as bare `<span>`s beside real Avatars.
   */
  foreground?: string;
  /**
   * Paint the circle in a semantic tone's soft surface (`-bg` background,
   * `-fg` text) instead of a derived or caller-supplied colour. Wins over
   * `color` / `foreground` / `autoContrast`, because a tone already declares
   * both halves of the pair.
   */
  tone?: ToneOrAlias;
  /**
   * Pick the foreground from the resolved background's luminance rather than
   * always using white. Opt-in, not the default: flipping existing avatars to
   * dark text on the lighter half of the palette would change every presence
   * row in every consumer at once.
   */
  autoContrast?: boolean;
  className?: string;
  style?: CSSProperties;
  /**
   * Tooltip text. Defaults to `name`. Pass `null` (or `showTitle={false}`) to
   * render no `title` at all — a wrapping button or link with its own `title`
   * otherwise gets two tooltips fighting, and `title=""` is not the same thing
   * as no attribute.
   */
  title?: string | null;
  /** `false` suppresses the `title` attribute entirely. See `title`. */
  showTitle?: boolean;
}

export function Avatar({
  name,
  size = 28,
  initials: initialsProp,
  color,
  src,
  icon,
  glyph,
  foreground,
  tone,
  autoContrast = false,
  className,
  style,
  title,
  showTitle = true,
}: AvatarProps) {
  const bg = color || nameToColor(name);
  const toneClasses = tone ? TONE_SOFT[toneKey(tone)] : undefined;
  const fg =
    foreground ?? (autoContrast ? readableAvatarForeground(bg) ?? '#fff' : '#fff');
  const resolvedTitle = !showTitle || title === null ? undefined : title ?? name;
  const initials = initialsProp ?? nameToInitials(name);
  // A broken image URL (404, expired signed URL, offline) used to render as
  // the browser's broken-image glyph forever. Track WHICH src failed so a
  // rerender with a fresh URL gets another chance at the image.
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const showImage = !!src && src !== failedSrc;
  // A glyph is one character where initials are two, so it takes the larger of
  // the two sizes; anything else in `icon` is sized by the caller.
  const hasMark = !showImage && (icon !== undefined || !!glyph);
  return (
    <div
      title={resolvedTitle}
      data-ui-text="avatar"
      className={cn(
        'inline-flex items-center justify-center rounded-full flex-shrink-0 font-semibold select-none overflow-hidden',
        toneClasses,
        className,
      )}
      style={{
        width: size,
        height: size,
        // A tone owns both halves of the pair and paints them as classes, so
        // leaving these undefined is what lets the class win.
        background: toneClasses ? undefined : bg,
        color: toneClasses ? undefined : fg,
        fontSize: hasMark ? Math.max(9, size * 0.5) : Math.min(16, Math.max(9, size * 0.38)),
        ...style,
      }}
    >
      {showImage ? (
        <img
          src={src}
          alt={name}
          width={size}
          height={size}
          onError={() => setFailedSrc(src ?? null)}
          className="w-full h-full object-cover"
        />
      ) : icon !== undefined ? (
        <span className="inline-flex items-center justify-center leading-none" aria-hidden="true">
          {icon}
        </span>
      ) : glyph ? (
        <span className="leading-none" aria-hidden="true">{glyph}</span>
      ) : (
        initials
      )}
    </div>
  );
}

/** One person in an AvatarGroup, when a bare name isn't enough. */
export interface AvatarGroupItem {
  name: string;
  initials?: string;
  color?: string;
  src?: string;
}

export interface AvatarGroupProps {
  /** Convenience form — colors and initials are derived from the name. */
  names?: string[];
  /**
   * Richer form, for callers that already know each person's brand color,
   * canonical initials, or photo. Takes precedence over `names`. Without this,
   * callers with per-user colors had to hand-roll the whole stack.
   */
  items?: AvatarGroupItem[];
  maxVisible?: number;
  size?: number;
  className?: string;
  /**
   * Total people, when it exceeds what was passed in. Lets a caller render
   * "+3" without materialising three more entries.
   */
  total?: number;
}

export function AvatarGroup({
  names,
  items,
  maxVisible = 5,
  size = 28,
  className,
  total,
}: AvatarGroupProps) {
  const people: AvatarGroupItem[] =
    items ?? (names ?? []).map((name) => ({ name }));
  const visible = people.slice(0, maxVisible);
  const overflow = (total ?? people.length) - visible.length;
  const overlap = -(size * 0.3);

  return (
    <div className={cn('inline-flex items-center', className)}>
      {visible.map((person, index) => (
        <Avatar
          key={`${person.name}-${index}`}
          name={person.name}
          initials={person.initials}
          color={person.color}
          src={person.src}
          size={size}
          className="border-2 border-white"
          style={{ marginLeft: index > 0 ? overlap : 0 }}
        />
      ))}
      {overflow > 0 && (
        <div
          data-ui-text="avatar"
          className="inline-flex items-center justify-center rounded-full flex-shrink-0 font-semibold select-none bg-surface-emphasis text-text-secondary border-2 border-white"
          style={{
            width: size,
            height: size,
            fontSize: Math.max(10, size * 0.38),
            marginLeft: overlap,
          }}
          title={`+${overflow} more`}
        >
          +{overflow}
        </div>
      )}
    </div>
  );
}

export default Avatar;
