import { useEffect, useState, useMemo } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { ParticipantTile } from './ParticipantTile';

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

export interface HangoutLayoutProps {
  /** Remote participants (callers should NOT include the local user here). */
  participants: HangoutLayoutParticipant[];
  /** The local user. Rendered as a tile in the grid at N≥3 (per Meet/Teams convention)
   * or as a small PiP overlay at N≤2. Pass null/undefined to suppress entirely. */
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

/**
 * Multi-person hangout layout with two modes:
 *
 *   - **auto-grid** (`mode="auto"`, no spotlight): N=1 single tile / N=2
 *     50:50 split / N=3-4 2×2 / N=5-9 3×3 / N=10+ paginated 3×3.
 *     Active speaker is indicated by border highlight only — no reflow.
 *
 *   - **spotlight** (`mode="spotlight"` OR `spotlightContent` provided):
 *     a large main slot (active speaker or shared screen) plus a horizontal
 *     filmstrip of the remaining participants along the bottom. Spotlight
 *     swaps obey `speakerHysteresisMs` to prevent flicker.
 *
 * Pure presentational — no media wiring. Caller passes a `videoElement` per
 * participant (typically a `<video>` with srcObject already attached) and the
 * layout decides where to render each one.
 */
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
  const effectiveMode: HangoutMode = spotlightContent ? 'spotlight' : mode;
  const stableSpotlightId = useStableActiveSpeaker(activeSpeakerId, speakerHysteresisMs);

  // For grid mode: include localParticipant inline when 3+ remote
  // participants (matches Meet/Teams behavior). At N≤2 remote, local is
  // rendered as a small PiP overlay so the remote(s) fill the canvas.
  const remoteCount = participants.length;
  const showLocalInline = !!localParticipant && remoteCount >= 3;
  const showLocalPip = !!localParticipant && remoteCount > 0 && remoteCount <= 2;

  if (effectiveMode === 'spotlight') {
    return (
      <SpotlightLayout
        participants={participants}
        localParticipant={localParticipant}
        spotlightContent={spotlightContent}
        spotlightParticipantId={stableSpotlightId}
        onParticipantClick={onParticipantClick}
        className={className}
        style={style}
      />
    );
  }

  // Auto-grid path
  const inlineParticipants = useMemo<HangoutLayoutParticipant[]>(() => {
    const list = [...participants];
    if (showLocalInline && localParticipant) list.push({ ...localParticipant, isLocal: true });
    return list;
  }, [participants, showLocalInline, localParticipant]);

  const cols = gridCols(inlineParticipants.length);

  return (
    <div
      className={cn('relative grid gap-1 bg-[#0f0f0f] rounded-lg overflow-hidden', className)}
      style={{ gridTemplateColumns: `repeat(${cols}, 1fr)`, ...style }}
    >
      {inlineParticipants.map((p) => (
        <ParticipantTile
          key={p.id}
          id={p.id}
          displayName={p.displayName}
          avatarUrl={p.avatarUrl}
          isSpeaking={p.id === activeSpeakerId}
          isMuted={p.isMuted}
          isLocal={p.isLocal}
          videoElement={p.videoElement}
          onClick={onParticipantClick ? () => onParticipantClick(p.id) : undefined}
        />
      ))}

      {/* Empty-state when alone (no remotes AND no local — defensive) */}
      {inlineParticipants.length === 0 && (
        <div className="aspect-video flex items-center justify-center text-white/40 text-sm">
          Waiting for others to join…
        </div>
      )}

      {/* PiP overlay for local participant at N=1 or N=2 remotes */}
      {showLocalPip && localParticipant && (
        <div className="absolute bottom-2 right-2 w-24 aspect-video rounded overflow-hidden border border-white/20 shadow-lg z-10">
          <ParticipantTile
            id={localParticipant.id}
            displayName={localParticipant.displayName}
            avatarUrl={localParticipant.avatarUrl}
            isMuted={localParticipant.isMuted}
            isLocal
            videoElement={localParticipant.videoElement}
          />
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Spotlight subcomponent
// ---------------------------------------------------------------------------

function SpotlightLayout({
  participants,
  localParticipant,
  spotlightContent,
  spotlightParticipantId,
  onParticipantClick,
  className,
  style,
}: {
  participants: HangoutLayoutParticipant[];
  localParticipant: HangoutLayoutParticipant | null;
  spotlightContent: ReactNode;
  spotlightParticipantId: string | null;
  onParticipantClick?: (id: string) => void;
  className?: string;
  style?: CSSProperties;
}) {
  // Filmstrip = everyone except the participant currently in the spotlight slot.
  // Local participant always appears in the filmstrip in spotlight mode.
  const filmstrip = useMemo<HangoutLayoutParticipant[]>(() => {
    const list = participants.filter(p => p.id !== spotlightParticipantId);
    if (localParticipant) list.push({ ...localParticipant, isLocal: true });
    return list;
  }, [participants, spotlightParticipantId, localParticipant]);

  return (
    <div className={cn('flex flex-col gap-1 bg-[#0f0f0f] rounded-lg overflow-hidden', className)} style={style}>
      {/* Main spotlight slot */}
      <div className="flex-1 bg-black aspect-video relative">
        {spotlightContent ?? (
          // Fall back to the active speaker if no explicit spotlight content.
          spotlightParticipantId && (() => {
            const p = participants.find(x => x.id === spotlightParticipantId);
            return p ? (
              <ParticipantTile
                id={p.id}
                displayName={p.displayName}
                avatarUrl={p.avatarUrl}
                isMuted={p.isMuted}
                isLocal={p.isLocal}
                isSpotlight
                videoElement={p.videoElement}
                className="w-full h-full"
              />
            ) : null;
          })()
        )}
      </div>

      {/* Filmstrip */}
      {filmstrip.length > 0 && (
        <div className="flex gap-1 overflow-x-auto px-1 pb-1">
          {filmstrip.map(p => (
            <div key={p.id} className="w-32 shrink-0">
              <ParticipantTile
                id={p.id}
                displayName={p.displayName}
                avatarUrl={p.avatarUrl}
                isMuted={p.isMuted}
                isLocal={p.isLocal}
                videoElement={p.videoElement}
                onClick={onParticipantClick ? () => onParticipantClick(p.id) : undefined}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function gridCols(count: number): number {
  if (count <= 1) return 1;
  if (count === 2) return 2; // 1x2 horizontal (most common)
  if (count <= 4) return 2; // 2x2
  if (count <= 9) return 3; // 3x3
  return 4; // 4x4 (paginate beyond 16 — TODO)
}

/**
 * Debounce activeSpeakerId so the spotlight slot only swaps after the new
 * speaker has been talking for at least `hysteresisMs`. Without this, every
 * cough, laugh, or short interjection causes flicker.
 */
function useStableActiveSpeaker(activeSpeakerId: string | null, hysteresisMs: number): string | null {
  const [stable, setStable] = useState<string | null>(activeSpeakerId);

  useEffect(() => {
    if (hysteresisMs <= 0) {
      setStable(activeSpeakerId);
      return;
    }
    if (activeSpeakerId === stable) return;
    const t = setTimeout(() => setStable(activeSpeakerId), hysteresisMs);
    return () => clearTimeout(t);
  }, [activeSpeakerId, hysteresisMs, stable]);

  return stable;
}
