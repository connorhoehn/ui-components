// src/components/shared/UserChip.tsx
//
// Compact "avatar + name (+ optional presence dot)" inline chip. Smaller
// and tighter than EntityCell — designed for inline contexts like mention
// pills, presence rows in a sidebar, transcript speaker labels, etc.

import type { CSSProperties, MouseEvent } from 'react';
import { cn } from '../../lib/cn';
import { Avatar } from './Avatar';
import { PresenceDot, type PresenceState } from './PresenceDot';

export interface UserChipProps {
  name: string;
  /** Optional display label (e.g. "@alice"); defaults to `name`. */
  label?: string;
  /** Avatar pixel size. Defaults to 20. */
  avatarSize?: number;
  /** Override the avatar background color. */
  avatarColor?: string;
  /** Show a presence indicator after the name. */
  presence?: PresenceState;
  /** Make the whole chip clickable. */
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  className?: string;
  style?: CSSProperties;
  title?: string;
  'data-testid'?: string;
}

export function UserChip({
  name,
  label,
  avatarSize = 20,
  avatarColor,
  presence,
  onClick,
  className,
  style,
  title,
  'data-testid': testId = 'user-chip',
}: UserChipProps) {
  const Tag = onClick ? 'button' : 'span';
  return (
    <Tag
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      title={title ?? name}
      data-testid={testId}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-1.5 py-0.5 text-[12px] text-text-primary',
        onClick && 'hover:bg-slate-100 cursor-pointer transition-colors',
        !onClick && 'cursor-default',
        className,
      )}
      style={style}
    >
      <Avatar name={name} size={avatarSize} color={avatarColor} />
      <span className="font-medium leading-none">{label ?? name}</span>
      {presence && <PresenceDot state={presence} size="xs" />}
    </Tag>
  );
}

export default UserChip;
