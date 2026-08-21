// frontend/src/components/doc-editor/VideoCallPanel.tsx
//
// Side panel for video calling within the document editor.
// Uses IVS RealTime Stages via the useHangoutEmbed hook.

import { useState, useMemo, useRef, useEffect } from 'react';
import type { DocumentMeta } from '../../types/document';
import { useVideoCall } from '../../hooks/useVideoCall';
import { useHangoutEmbed } from '../../lib/video/useHangoutEmbed';
import { useActiveSpeaker } from '../../lib/video/useActiveSpeaker';
import type { HangoutParticipant } from '../../lib/video/types';
import { Button, IconButton } from '../ui/Panel';
import { cn } from '../../lib/cn';

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface VideoCallPanelProps {
  documentId: string;
  userId: string;
  idToken: string | null;
  meta: DocumentMeta | null;
  updateMeta: (partial: Partial<DocumentMeta>) => void;
  sendMessage: (msg: Record<string, unknown>) => void;
  onClose: () => void;
  onDockToSidebar?: () => void;
  isDocked?: boolean;
  onUndock?: () => void;
  onCallEnd?: () => void;
}

// ---------------------------------------------------------------------------
// ParticipantTile
// ---------------------------------------------------------------------------

function ParticipantTile({ participant, isSpeaking }: { participant: HangoutParticipant; isSpeaking: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = videoRef.current;
    const stream = participant.streams[0] ?? null;
    if (el && stream && el.srcObject !== stream) {
      el.srcObject = stream;
    }
  }, [participant.streams]);

  return (
    <div
      className={cn('relative bg-surface-inverse rounded-lg overflow-hidden transition-shadow duration-300', isSpeaking ? 'video-tile-speaking' : 'video-tile-idle')}
    >
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted={participant.isLocal}
        className={cn('w-full h-full object-cover')}
      />
      <div className={cn('absolute bottom-0 left-0 right-0 h-9 bg-gradient-to-t from-black/50 to-transparent pointer-events-none')} />
      <div className={cn('absolute bottom-1.5 left-1.5 flex items-center gap-1 bg-black/60 text-white text-[11px] font-medium px-2 py-[3px] rounded-full')}>
        {isSpeaking && (
          <span className={cn('w-[5px] h-[5px] rounded-full bg-success')} />
        )}
        <span>{participant.userId}</span>
        {participant.isLocal && <span className={cn('opacity-50')}>(You)</span>}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// ScreenShareTile
// ---------------------------------------------------------------------------

function ScreenShareTile({ stream, userId, cameraStream, isLocal }: {
  stream: MediaStream;
  userId: string;
  cameraStream?: MediaStream;
  isLocal: boolean;
}) {
  const screenRef = useRef<HTMLVideoElement>(null);
  const pipRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = screenRef.current;
    if (el && el.srcObject !== stream) el.srcObject = stream;
  }, [stream]);

  useEffect(() => {
    const el = pipRef.current;
    if (el && cameraStream && el.srcObject !== cameraStream) el.srcObject = cameraStream;
  }, [cameraStream]);

  return (
    <div className={cn('relative bg-black rounded-[10px] overflow-hidden border-2 border-info aspect-video')}>
      <video
        ref={screenRef}
        autoPlay
        playsInline
        muted
        className={cn('w-full h-full object-contain')}
      />
      {/* PiP camera overlay */}
      {isLocal && cameraStream && (
        <video
          ref={pipRef}
          autoPlay
          playsInline
          muted
          className={cn('absolute bottom-2 right-2 w-36 object-cover rounded-lg border-2 border-white/30 aspect-video')}
        />
      )}
      <div className={cn('absolute bottom-1.5 left-1.5 bg-[rgba(59,130,246,0.8)] text-white text-[11px] font-medium px-2 py-[3px] rounded-full')}>
        {userId}&apos;s screen
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Active Call View
// ---------------------------------------------------------------------------

function ActiveCallView({ stageToken, participantId, userId, onEndCall }: {
  stageToken: string;
  participantId: string;
  userId: string;
  onEndCall: () => void;
}) {
  const { participants, isJoined, isScreenSharing, error, toggleMute, toggleCamera, startScreenShare, stopScreenShare, leave } = useHangoutEmbed({
    stageToken,
    userId,
    participantId,
  });

  const { activeSpeakerId } = useActiveSpeaker({ participants });

  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [showControls, setShowControls] = useState(false);

  const participantsWithSpeaking = useMemo(() =>
    participants.map(p => ({
      ...p,
      isSpeaking: p.participantId === activeSpeakerId,
    })),
    [participants, activeSpeakerId],
  );

  const screenSharer = participantsWithSpeaking.find(p => p.screenStream);

  const handleEndCall = () => {
    leave();
    onEndCall();
  };

  if (error) {
    return (
      <div className={cn('p-4 text-center text-danger-fg text-[13px]')}>
        {error}
        <br />
        <Button onClick={onEndCall} className="mt-3">Close</Button>
      </div>
    );
  }

  if (!isJoined) {
    return (
      <div className={cn('p-5 text-center text-text-secondary text-[13px]')}>
        Connecting to video...
      </div>
    );
  }

  return (
    <div
      className={cn('flex flex-col')}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Screen share */}
      {screenSharer?.screenStream && (
        <div className={cn('p-1.5 pb-0')}>
          <ScreenShareTile
            stream={screenSharer.screenStream}
            userId={screenSharer.userId}
            cameraStream={screenSharer.streams[0]}
            isLocal={screenSharer.isLocal}
          />
        </div>
      )}

      {/* Video tiles — responsive grid */}
      <div
        className={cn('flex-1 grid gap-1 p-1.5 content-start', participantsWithSpeaking.length <= 1 ? 'grid-cols-1' : 'grid-cols-2')}
      >
        {participantsWithSpeaking.map(p => (
          <ParticipantTile key={p.participantId} participant={p} isSpeaking={p.isSpeaking} />
        ))}
      </div>

      {/* Controls */}
      <div
        className={cn('flex justify-center gap-1 px-2 py-1.5 border-t border-code-raised shrink-0 transition-opacity duration-200', showControls ? 'opacity-100' : 'opacity-0')}
      >
        <IconButton onClick={() => { setIsMuted(!isMuted); toggleMute(!isMuted); }}
          title={isMuted ? 'Unmute' : 'Mute'} active={isMuted}
          activeColor="#dc2626" style={{ color: '#fff', background: isMuted ? '#dc2626' : 'rgba(255,255,255,0.1)' }}>
          {isMuted ? '\u{1F507}' : '\u{1F50A}'}
        </IconButton>
        <IconButton onClick={() => { setIsCameraOff(!isCameraOff); toggleCamera(isCameraOff); }}
          title={isCameraOff ? 'Camera On' : 'Camera Off'} active={isCameraOff}
          activeColor="#dc2626" style={{ color: '#fff', background: isCameraOff ? '#dc2626' : 'rgba(255,255,255,0.1)' }}>
          {isCameraOff ? '\u{1F6AB}' : '\u{1F4F7}'}
        </IconButton>
        <IconButton onClick={() => isScreenSharing ? stopScreenShare() : startScreenShare()}
          title={isScreenSharing ? 'Stop Sharing' : 'Share Screen'} active={isScreenSharing}
          activeColor="#646cff" style={{ color: '#fff', background: isScreenSharing ? '#646cff' : 'rgba(255,255,255,0.1)' }}>
          {'\u{1F4BB}'}
        </IconButton>
        <IconButton onClick={handleEndCall} title="Leave Call"
          style={{ color: '#fff', background: '#dc2626' }}>
          {'\u{1F4DE}'}
        </IconButton>
      </div>

      {/* Participant count */}
      <div className={cn('text-center text-[10px] text-text-secondary py-1')}>
        {participants.length} in call
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Panel
// ---------------------------------------------------------------------------

export default function VideoCallPanel({
  documentId,
  userId,
  idToken,
  meta,
  updateMeta,
  sendMessage,
  onClose,
  onDockToSidebar,
  isDocked,
  onUndock,
  onCallEnd,
}: VideoCallPanelProps) {
  const {
    callState,
    stageToken,
    participantId,
    userId: callUserId,
    error,
    hasActiveCall,
    startCall,
    joinCall,
    endCall,
  } = useVideoCall({ documentId, idToken, meta, updateMeta, sendMessage, displayName: userId });

  const prevCallStateRef = useRef(callState);
  useEffect(() => {
    if (prevCallStateRef.current === 'active' && callState === 'idle') {
      onCallEnd?.();
    }
    prevCallStateRef.current = callState;
  }, [callState, onCallEnd]);

  const activeCallSessionId = meta?.activeCallSessionId;

  return (
    <div className={cn('bg-surface-inverse border border-code-raised rounded-xl overflow-hidden')}>
      {/* Header */}
      <div className={cn('flex items-center justify-between px-2 py-1 border-b border-code-raised shrink-0')}>
        <span className={cn('text-[11px] font-semibold text-text-tertiary m-0')}>Video</span>
        <div className={cn('flex items-center gap-0.5')}>
          {onDockToSidebar && !isDocked && (
            <button type="button" onClick={onDockToSidebar} title="Dock to sidebar"
              className={cn('w-[22px] h-[22px] flex items-center justify-center border-none rounded bg-transparent text-text-tertiary cursor-pointer text-xs leading-none p-0')}>
              {'←'}
            </button>
          )}
          {isDocked && onUndock && (
            <button type="button" onClick={onUndock} title="Undock from sidebar"
              className={cn('w-[22px] h-[22px] flex items-center justify-center border-none rounded bg-transparent text-text-tertiary cursor-pointer text-xs leading-none p-0')}>
              {'→'}
            </button>
          )}
          <button type="button" onClick={onClose} title="Close video"
            className={cn('w-[22px] h-[22px] flex items-center justify-center border-none rounded bg-transparent text-text-tertiary cursor-pointer text-sm leading-none p-0')}>
            {'✕'}
          </button>
        </div>
      </div>

      {/* Content */}
      <div>
        {callState === 'active' && stageToken && participantId && callUserId && (
          <ActiveCallView
            stageToken={stageToken}
            participantId={participantId}
            userId={callUserId}
            onEndCall={endCall}
          />
        )}

        {(callState === 'creating' || callState === 'joining') && (
          <div className={cn('p-4 text-center text-text-tertiary text-[13px]')}>
            {callState === 'creating' ? 'Starting call...' : 'Joining call...'}
          </div>
        )}

        {callState === 'error' && (
          <div className={cn('p-4 text-center')}>
            <div className={cn('text-code-red text-[13px] mb-3')}>{error}</div>
            <Button variant="primary" onClick={() => startCall()}>Try Again</Button>
          </div>
        )}

        {callState === 'idle' && (
          <div className={cn('p-4 text-center')}>
            {hasActiveCall && activeCallSessionId ? (
              <>
                <div className={cn('text-[13px] text-code-subtle mb-3')}>
                  A call is in progress on this document.
                </div>
                <Button variant="primary" onClick={() => joinCall(activeCallSessionId)}>
                  Join Call
                </Button>
              </>
            ) : (
              <>
                <div className={cn('text-[13px] text-text-tertiary mb-3')}>
                  Start a video call with collaborators on this document.
                </div>
                <Button variant="primary" onClick={startCall}>
                  Start Call
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
