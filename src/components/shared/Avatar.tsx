import { useState, type CSSProperties, type ReactNode } from 'react';
import { cn } from '../../lib/cn';

const AVATAR_PALETTE = [
  '#4f7cff',
  '#22c55e',
  '#f59e0b',
  '#ef4444',
  '#a855f7',
  '#14b8a6',
  '#0ea5e9',
  '#f97316',
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
  className?: string;
  style?: CSSProperties;
  title?: string;
}

export function Avatar({
  name,
  size = 28,
  initials: initialsProp,
  color,
  src,
  icon,
  glyph,
  className,
  style,
  title,
}: AvatarProps) {
  const bg = color || nameToColor(name);
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
      title={title ?? name}
      className={cn(
        'inline-flex items-center justify-center rounded-full flex-shrink-0 font-semibold select-none overflow-hidden',
        className,
      )}
      style={{
        width: size,
        height: size,
        background: bg,
        color: '#fff',
        fontSize: hasMark ? size * 0.5 : size * 0.38,
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
          className="inline-flex items-center justify-center rounded-full flex-shrink-0 font-semibold select-none bg-surface-emphasis text-text-secondary border-2 border-white"
          style={{
            width: size,
            height: size,
            fontSize: size * 0.38,
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
