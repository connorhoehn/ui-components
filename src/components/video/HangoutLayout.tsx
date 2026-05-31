// HangoutLayout — orchestrator that picks the right sub-layout for a
// hangout call. Delegates rendering to <HangoutGrid> or <HangoutSpotlight>.
//
// Mode resolution:
//   - `spotlightContent` non-null → spotlight (regardless of `mode`).
//   - `mode="spotlight"` → spotlight.
//   - `mode="auto"` + totalCount ≥ 10 → auto-flip to spotlight (a 4×4
//     grid is too small to be legible past 9 participants).
//   - otherwise → auto-grid.
//
// The grid + spotlight implementations live in HangoutGrid.tsx and
// HangoutSpotlight.tsx; this file is purely the dispatch shell.

import type { CSSProperties, ReactNode } from 'react';
import { HangoutGrid } from './HangoutGrid';
import { HangoutSpotlight } from './HangoutSpotlight';
import type { HangoutLayoutParticipant, HangoutMode } from './HangoutLayoutTypes';

export type { HangoutLayoutParticipant, HangoutMode } from './HangoutLayoutTypes';

export interface HangoutLayoutProps {
  /** Remote participants (callers should NOT include the local user here). */
  participants: HangoutLayoutParticipant[];
  /** The local user. Rendered as a tile in the grid at N≥3 (per Meet/Teams
   * convention) or as a small PiP overlay at N≤2. Pass null/undefined to
   * suppress entirely. */
  localParticipant?: HangoutLayoutParticipant | null;
  /** 'auto' = grid view; 'spotlight' = main slot + filmstrip. Spotlight is
   * forced on whenever `spotlightContent` is non-null regardless of mode. */
  mode?: HangoutMode;
  /** Active speaker id — drives the spotlight slot (in spotlight mode) and
   * the green-border highlight (in any mode). Hysteresis is applied
   * internally (default 750ms) so brief speech bursts don't flicker the
   * main slot. */
  activeSpeakerId?: string | null;
  /** Override the hysteresis window (ms) before the spotlight slot swaps.
   * 0 disables hysteresis (immediate swap). Default 750. */
  speakerHysteresisMs?: number;
  /** Content for the spotlight main slot — typically a `<video>` for a
   * shared screen, or a `<ParticipantTile>` clone. When provided, the
   * layout switches to spotlight regardless of `mode`. */
  spotlightContent?: ReactNode;
  /** Click handler per tile (e.g. pin / promote to spotlight). */
  onParticipantClick?: (id: string) => void;
  className?: string;
  style?: CSSProperties;
}

const AUTO_SPOTLIGHT_THRESHOLD = 10;

export function HangoutLayout({
  participants,
  localParticipant = null,
  mode = 'auto',
  activeSpeakerId = null,
  speakerHysteresisMs = 750,
  spotlightContent,
  onParticipantClick,
  className,
  style,
}: HangoutLayoutProps) {
  const totalCount = participants.length + (localParticipant ? 1 : 0);
  const effectiveMode: HangoutMode = spotlightContent
    ? 'spotlight'
    : mode === 'auto' && totalCount >= AUTO_SPOTLIGHT_THRESHOLD
      ? 'spotlight'
      : mode;

  if (effectiveMode === 'spotlight') {
    return (
      <HangoutSpotlight
        participants={participants}
        localParticipant={localParticipant}
        spotlightContent={spotlightContent}
        activeSpeakerId={activeSpeakerId}
        speakerHysteresisMs={speakerHysteresisMs}
        onParticipantClick={onParticipantClick}
        className={className}
        style={style}
      />
    );
  }

  return (
    <HangoutGrid
      participants={participants}
      localParticipant={localParticipant}
      activeSpeakerId={activeSpeakerId}
      onParticipantClick={onParticipantClick}
      className={className}
      style={style}
    />
  );
}
