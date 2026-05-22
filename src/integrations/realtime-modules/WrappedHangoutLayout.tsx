// src/integrations/realtime-modules/WrappedHangoutLayout.tsx
//
// HangoutLayout wired directly to a useVideoHangout() hook return from
// realtime-modules. Adapts HangoutParticipant[] → HangoutLayoutParticipant[].
// The caller is responsible for injecting actual <video> elements via the
// `videoElements` prop (keyed by clientId) — this component stays pure.

import type { ReactNode } from 'react';
import type { RMUseVideoHangoutReturn } from './types';
import { adaptHangoutParticipants } from './adapters';
import { HangoutLayout } from '../../components/video/HangoutLayout';
import type { HangoutMode } from '../../components/video/HangoutLayout';

export interface WrappedHangoutLayoutProps {
  /** Return value of useVideoHangout(channel) from realtime-modules */
  hangout: RMUseVideoHangoutReturn;
  /** The local user's clientId (used to separate local vs remote tiles) */
  localClientId?: string | null;
  /** Keyed by participant clientId — caller wires actual <video> elements */
  videoElements?: Record<string, ReactNode>;
  /** Forwarded to HangoutLayout */
  mode?: HangoutMode;
  spotlightContent?: ReactNode;
  activeSpeakerId?: string | null;
  speakerHysteresisMs?: number;
  onParticipantClick?: (id: string) => void;
  className?: string;
}

export function WrappedHangoutLayout({
  hangout,
  localClientId,
  videoElements,
  mode,
  spotlightContent,
  activeSpeakerId,
  speakerHysteresisMs,
  onParticipantClick,
  className,
}: WrappedHangoutLayoutProps) {
  const allAdapted = adaptHangoutParticipants(hangout.participants, localClientId);

  // Split into local vs remote
  const localParticipant =
    localClientId != null
      ? (allAdapted.find((p) => p.id === localClientId) ?? null)
      : null;

  const remoteParticipants = localClientId != null
    ? allAdapted.filter((p) => p.id !== localClientId)
    : allAdapted;

  // Inject video elements supplied by caller
  function withVideo<T extends { id: string; videoElement?: ReactNode }>(
    participants: T[],
  ): T[] {
    if (!videoElements) return participants;
    return participants.map((p) => ({
      ...p,
      videoElement: videoElements[p.id] ?? p.videoElement,
    }));
  }

  return (
    <HangoutLayout
      participants={withVideo(remoteParticipants)}
      localParticipant={
        localParticipant ? withVideo([localParticipant])[0] : null
      }
      mode={mode}
      spotlightContent={spotlightContent}
      activeSpeakerId={activeSpeakerId}
      speakerHysteresisMs={speakerHysteresisMs}
      onParticipantClick={onParticipantClick}
      className={className}
    />
  );
}
