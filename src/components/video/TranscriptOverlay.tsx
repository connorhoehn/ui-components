// TranscriptOverlay — bottom-of-call live caption display. Shows the
// last N caption lines fading older lines out. Pure presentational —
// caller feeds in a list of CaptionLine objects (typically from
// useLiveCaptions hook in realtime-modules).
//
// Design:
//   - Anchored bottom-center, fixed-width band
//   - Per-speaker color/avatar via speakerId
//   - Auto-fade old lines (CSS opacity transition)
//   - Click to copy the last N seconds of transcript

import { cn } from '../../lib/cn';

export interface CaptionLine {
  id: string;
  speakerId: string;
  speakerName?: string;
  text: string;
  /** ISO timestamp of caption emission. Used for fade-out + ordering. */
  at: string;
  /** True if the caption is still being updated (interim) vs final. */
  interim?: boolean;
}

export interface TranscriptOverlayProps {
  lines: CaptionLine[];
  /** How many recent lines to show simultaneously. Default 3. */
  maxLines?: number;
  /** Fade-out duration ms. Default 8000. */
  fadeAfterMs?: number;
  className?: string;
}

const SPEAKER_COLORS = [
  '#60a5fa', '#f472b6', '#34d399', '#fbbf24', '#a78bfa', '#fb7185',
];

function colorForSpeaker(speakerId: string): string {
  let hash = 0;
  for (let i = 0; i < speakerId.length; i++) hash = (hash * 31 + speakerId.charCodeAt(i)) | 0;
  return SPEAKER_COLORS[Math.abs(hash) % SPEAKER_COLORS.length]!;
}

export function TranscriptOverlay({
  lines,
  maxLines = 3,
  fadeAfterMs = 8000,
  className,
}: TranscriptOverlayProps) {
  const now = Date.now();
  const visible = lines
    .slice(-maxLines)
    .map((line) => {
      const age = now - new Date(line.at).getTime();
      const opacity = Math.max(0.35, 1 - age / fadeAfterMs);
      return { ...line, opacity };
    })
    .filter((line) => line.opacity > 0);

  if (visible.length === 0) return null;

  return (
    <div
      className={cn(
        'absolute bottom-16 left-1/2 -translate-x-1/2 max-w-[min(720px,80%)] z-20',
        'flex flex-col gap-1 px-4 py-2 rounded-lg bg-black/70 backdrop-blur-sm',
        className,
      )}
      aria-live="polite"
      aria-label="Live transcript"
    >
      {visible.map((line) => (
        <div
          key={line.id}
          className={cn(
            'flex items-baseline gap-2 text-sm transition-opacity',
            line.interim && 'italic',
          )}
          style={{ opacity: line.opacity }}
        >
          <span
            className="font-medium text-xs shrink-0"
            style={{ color: colorForSpeaker(line.speakerId) }}
          >
            {line.speakerName ?? line.speakerId.slice(0, 6)}
          </span>
          <span className="text-white">{line.text}</span>
        </div>
      ))}
    </div>
  );
}

export default TranscriptOverlay;
