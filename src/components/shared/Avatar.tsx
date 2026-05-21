import type { CSSProperties } from 'react';
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
  // djb2 hash
  let hash = 5381;
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 33) ^ name.charCodeAt(i);
  }
  const index = Math.abs(hash) % AVATAR_PALETTE.length;
  return AVATAR_PALETTE[index];
}

export function nameToInitials(name: string): string {
  const trimmed = name.trim();
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
  /** Override the auto-computed color. */
  color?: string;
  className?: string;
  style?: CSSProperties;
  title?: string;
}

export function Avatar({
  name,
  size = 28,
  color,
  className,
  style,
  title,
}: AvatarProps) {
  const bg = color || nameToColor(name);
  const initials = nameToInitials(name);
  return (
    <div
      title={title ?? name}
      className={cn(
        'inline-flex items-center justify-center rounded-full flex-shrink-0 font-semibold select-none',
        className,
      )}
      style={{
        width: size,
        height: size,
        background: bg,
        color: '#fff',
        fontSize: size * 0.38,
        ...style,
      }}
    >
      {initials}
    </div>
  );
}

export interface AvatarGroupProps {
  names: string[];
  maxVisible?: number;
  size?: number;
  className?: string;
}

export function AvatarGroup({
  names,
  maxVisible = 5,
  size = 28,
  className,
}: AvatarGroupProps) {
  const visible = names.slice(0, maxVisible);
  const overflow = names.length - visible.length;
  const overlap = -(size * 0.3);

  return (
    <div className={cn('inline-flex items-center', className)}>
      {visible.map((name, index) => (
        <Avatar
          key={`${name}-${index}`}
          name={name}
          size={size}
          style={{
            marginLeft: index > 0 ? overlap : 0,
            border: '2px solid white',
          }}
        />
      ))}
      {overflow > 0 && (
        <div
          className="inline-flex items-center justify-center rounded-full flex-shrink-0 font-semibold select-none bg-slate-200 text-slate-600"
          style={{
            width: size,
            height: size,
            fontSize: size * 0.38,
            marginLeft: overlap,
            border: '2px solid white',
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
