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
}

export type HangoutMode = 'auto' | 'spotlight';
