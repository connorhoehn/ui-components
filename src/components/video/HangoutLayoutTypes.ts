// Shared types for the HangoutLayout family (HangoutLayout, HangoutGrid,
// HangoutSpotlight). Kept in their own file so the sub-pieces don't have
// to import each other through the orchestrator.

import type { ReactNode } from 'react';
import type { ParticipantAccess } from './ParticipantAccessBadge';

/** A tile's ring and its words (`label` is read by screen readers and shown as the tile's tooltip). Since 2.542.0. */
export interface TileHighlight {
  label: string;
}

export interface HangoutLayoutParticipant {
  id: string;
  displayName: string;
  avatarUrl?: string;
  isMuted?: boolean;
  isLocal?: boolean;
  /** Raised hand: `true`, or the 1-based queue position. Since 2.458.0. */
  handRaised?: boolean | number;
  /** Less than full access: `view-only` marks the tile (an eye, "View only"). */
  access?: ParticipantAccess;
  /**
   * A ring on the tile and words for it, e.g. `{ label: 'Talking to Milo' }`
   * for the person a call assistant is listening to. Since 2.542.0.
   */
  highlight?: TileHighlight;
  /** Pre-rendered video element — typically `<video ref={…} autoPlay playsInline />`. */
  videoElement?: ReactNode;
  /** Pre-rendered screen-share video element. When ANY participant supplies
   *  this, `<HangoutLayout>` auto-flips to spotlight mode and
   *  `<HangoutSpotlight>` promotes this element into the main slot (the
   *  sharer's camera tile stays visible in the filmstrip). An explicit
   *  `spotlightContent` prop on `<HangoutLayout>` still wins. */
  screenElement?: ReactNode;
}

export type HangoutMode = 'auto' | 'spotlight';
