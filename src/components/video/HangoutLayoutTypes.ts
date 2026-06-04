// Shared types for the HangoutLayout family (HangoutLayout, HangoutGrid,
// HangoutSpotlight). Kept in their own file so the sub-pieces don't have
// to import each other through the orchestrator.

import type { ReactNode } from 'react';

export interface HangoutLayoutParticipant {
  id: string;
  displayName: string;
  avatarUrl?: string;
  isMuted?: boolean;
  isLocal?: boolean;
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
