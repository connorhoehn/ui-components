// ParticipantAccessBadge — what a participant may do in the call, when it is
// less than everything. Today that is one standing: `view-only`, a person the
// host stopped from publishing (camera, microphone, screen share) who stays
// in the call to watch and listen. Sits in a roster row (a "View only" chip),
// in a tile's name strip or on an avatar (the eye alone, named for screen
// readers). Renders nothing for a participant with full access.
//
// `ParticipantAccess` is a union so a further standing (say, audio only) is
// one more member and one more entry in the labels below, not a new boolean
// on every participant shape.

import { cn } from '../../lib/cn';
import { EyeIcon } from '../ui/Icons';
import { T } from '../shared/Text';

/** A participant's standing when it is less than full access. Absent: may publish. */
export type ParticipantAccess = 'view-only';

export interface ParticipantAccessInfo {
  /** Short visible label: "View only". */
  label: string;
  /** One sentence for a tooltip or screen reader: what the standing means. */
  description: string;
}

const ACCESS_INFO: Record<ParticipantAccess, ParticipantAccessInfo> = {
  'view-only': {
    label: 'View only',
    description: 'Can watch and listen, but cannot turn on a camera, microphone or screen share',
  },
};

/** The label and description for a standing, or null for full access. */
export function participantAccessInfo(access: ParticipantAccess | null | undefined): ParticipantAccessInfo | null {
  return access ? ACCESS_INFO[access] ?? null : null;
}

export interface ParticipantAccessBadgeProps {
  /** The standing to show. Absent / null renders nothing. */
  access: ParticipantAccess | null | undefined;
  /** `chip` (default): for light surfaces. `overlay`: on a video tile or dark call chrome. */
  tone?: 'chip' | 'overlay';
  size?: 'sm' | 'md';
  /**
   * Draw the eye alone (a tile's name strip, an avatar corner): the label is
   * then its accessible name and tooltip. Default false: eye and label.
   */
  iconOnly?: boolean;
  /** Replaces the visible label (e.g. a translation). The description stays the tooltip. */
  label?: string;
  className?: string;
  'data-testid'?: string;
}

export function ParticipantAccessBadge({
  access,
  tone = 'chip',
  size = 'sm',
  iconOnly = false,
  label: labelOverride,
  className,
  'data-testid': testId = 'participant-access-badge',
}: ParticipantAccessBadgeProps) {
  const info = participantAccessInfo(access);
  if (!info) return null;
  const label = labelOverride ?? info.label;
  const iconSize = size === 'sm' ? 11 : 13;
  return (
    <span
      {...(iconOnly ? { role: 'img', 'aria-label': label } : {})}
      title={iconOnly ? `${label}: ${info.description}` : info.description}
      data-testid={testId}
      data-access={access}
      className={cn(
        'inline-flex shrink-0 items-center gap-1 rounded-full leading-none',
        size === 'sm' ? 'h-4' : 'h-5',
        iconOnly ? (size === 'sm' ? 'w-4 justify-center' : 'w-5 justify-center') : size === 'sm' ? 'px-1.5' : 'px-2',
        tone === 'chip' ? 'bg-surface-emphasis text-text-secondary' : 'bg-white/20 text-white',
        className,
      )}
    >
      <EyeIcon size={iconSize} />
      {!iconOnly && (
        <T as="span" size="xs" weight="medium" tone="inherit" className="leading-none whitespace-nowrap">
          {label}
        </T>
      )}
    </span>
  );
}

export default ParticipantAccessBadge;
