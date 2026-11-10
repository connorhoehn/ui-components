// VideoOverlayChip — a small readout drawn over video: a phase, a stat line, a status word.
//
// It sits on a translucent dark scrim (or a tone fill) so it reads over any
// frame, in either app theme, the same way the rest of the video family does.
// Drop it into a `VideoSurface` corner slot.
//
// With `details` the chip becomes a disclosure: the summary is a button with
// `aria-expanded`, and pressing it shows the details under the summary (a
// publisher's byte and packet counters under its bitrate line, say).
// Controlled through `expanded` + `onExpandedChange`, or uncontrolled with
// `defaultExpanded`.
//
// `live` makes the chip a polite status region, for a readout whose changes
// someone should hear (a player's phase). Leave it off for numbers that tick
// every second; announcing those is noise.

import { useId, useState, type ReactNode } from 'react';
import { cn } from '../../lib/cn';

export type VideoOverlayChipTone = 'neutral' | 'success' | 'warning' | 'danger' | 'info';

export interface VideoOverlayChipProps {
  children: ReactNode;
  /** Default `neutral`: white text on a dark scrim. Other tones fill with the tone. */
  tone?: VideoOverlayChipTone;
  /** Monospace, tabular figures: for numbers that change in place. */
  mono?: boolean;
  /** Extra lines revealed by pressing the chip. Makes the chip a button. */
  details?: ReactNode;
  /** Controlled disclosure state (with `details`). */
  expanded?: boolean;
  /** Uncontrolled initial disclosure state (with `details`). Default false. */
  defaultExpanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
  /** Polite live region: assistive tech announces changes. Default false. */
  live?: boolean;
  title?: string;
  className?: string;
  'data-testid'?: string;
}

const TONE_CLASSES: Record<VideoOverlayChipTone, string> = {
  neutral: 'bg-black/65 text-white',
  success: 'bg-success/85 text-white',
  warning: 'bg-warning/90 text-white',
  danger: 'bg-danger/90 text-white',
  info: 'bg-info/85 text-white',
};

const BASE = 'inline-flex max-w-full flex-col items-start rounded-md px-2 py-1 text-xs leading-4 backdrop-blur-sm';

export function VideoOverlayChip({
  children,
  tone = 'neutral',
  mono = false,
  details,
  expanded: expandedProp,
  defaultExpanded = false,
  onExpandedChange,
  live = false,
  title,
  className,
  'data-testid': testId = 'video-overlay-chip',
}: VideoOverlayChipProps) {
  const detailsId = useId();
  const [expandedState, setExpandedState] = useState(defaultExpanded);
  const expanded = expandedProp ?? expandedState;
  const liveProps = live ? { role: 'status' as const, 'aria-live': 'polite' as const } : {};
  const classes = cn(BASE, TONE_CLASSES[tone], mono && 'font-mono tabular-nums', className);

  if (details == null) {
    return (
      <span data-testid={testId} data-tone={tone} title={title} className={classes} {...liveProps}>
        <span className="min-w-0 break-words">{children}</span>
      </span>
    );
  }

  const toggle = () => {
    const next = !expanded;
    if (expandedProp === undefined) setExpandedState(next);
    onExpandedChange?.(next);
  };

  return (
    <div
      data-testid={testId}
      data-tone={tone}
      data-expanded={expanded ? 'true' : 'false'}
      className={cn(classes, expanded && 'px-3 py-2')}
      {...liveProps}
    >
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={detailsId}
        title={title}
        onClick={toggle}
        className="max-w-full cursor-pointer break-words text-left font-[inherit] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        {children}
      </button>
      <div id={detailsId} hidden={!expanded} className="mt-1 text-[11px] leading-4 text-white/75">
        {details}
      </div>
    </div>
  );
}

export default VideoOverlayChip;
