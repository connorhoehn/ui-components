// src/components/shared/CaptionedAvatar.tsx
//
// One person or character as the Storymaker concepts' Cast cards draw them:
// the avatar (picture or initials), the name under it, and a quieter role
// caption under that ("Mina · Lead", "Toby · Candidate"). With `onClick` or
// `href` the whole card is one target that opens the subject.
//
// `AvatarGroup`/`PresenceAvatars` stack faces without names, `UserChip` puts
// the name beside a small avatar, and `ActivePeopleGrid` (social) is a rail's
// "who is around" with first names only; none carries a role caption.
//
// Markers: `data-captioned-avatar`, `data-selected` when chosen.

import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { Avatar } from './Avatar';
import { safeHref } from '../../lib/safeHref';

export interface CaptionedAvatarProps {
  name: string;
  /** The caption under the name: "Lead", "Candidate". */
  role?: ReactNode;
  /** The picture. Falls back to initials. */
  src?: string;
  /** The avatar's diameter in px. Default 56. The card is a little wider than it so names wrap once at most. */
  size?: number;
  /** Something next to the caption, usually a small `StatusPill` ("Approved"). */
  meta?: ReactNode;
  /** Opens the subject. The card becomes one button. */
  onClick?: () => void;
  /** Opens the subject by link. Wins over `onClick`. */
  href?: string;
  /** Draw it as the chosen one. */
  selected?: boolean;
  className?: string;
  'data-testid'?: string;
}

export function CaptionedAvatar({
  name,
  role,
  src,
  size = 56,
  meta,
  onClick,
  href,
  selected = false,
  className,
  'data-testid': testId = 'captioned-avatar',
}: CaptionedAvatarProps) {
  const interactive = !!href || !!onClick;
  const content = (
    <>
      <Avatar name={name} src={src} size={size} />
      <span data-ui-part="" className="block w-full truncate text-center text-sm font-medium text-text-primary">{name}</span>
      {role != null && <span data-ui-part="" className="block w-full truncate text-center text-xs text-text-secondary">{role}</span>}
      {meta != null && <span data-ui-part="" className="flex justify-center">{meta}</span>}
    </>
  );
  const shared = cn(
    'flex w-24 min-w-0 flex-col items-center gap-1 rounded-lg p-2 text-center',
    interactive && 'cursor-pointer border-0 bg-transparent no-underline hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
    selected && 'bg-primary/10',
    className,
  );
  const common = {
    'data-captioned-avatar': '',
    'data-selected': selected || undefined,
    'data-testid': testId,
  } as const;
  if (href) {
    return <a {...common} href={safeHref(href) ?? undefined} aria-current={selected || undefined} className={shared}>{content}</a>;
  }
  if (onClick) {
    return <button {...common} type="button" aria-current={selected || undefined} onClick={onClick} className={shared}>{content}</button>;
  }
  return <div {...common} className={shared}>{content}</div>;
}

export default CaptionedAvatar;
