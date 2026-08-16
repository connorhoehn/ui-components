import { type ReactNode } from 'react';
export interface TranscriptSegment {
    startMs: number;
    endMs: number;
    speakerId: string;
    speakerLabel: string;
    text: string;
    avgLogprob?: number;
    noSpeechProb?: number;
}
export type TranscriptStatus = 'idle' | 'pending' | 'processing' | 'ready' | 'failed';
export interface TranscriptPanelProps {
    status: TranscriptStatus;
    segments?: TranscriptSegment[];
    /** Current playback position in milliseconds; used to highlight the
     *  active segment. Pass null/undefined to disable highlighting. */
    currentTimeMs?: number | null;
    /** When provided, clicking a segment seeks the player to that time. */
    onSeek?: (timeMs: number) => void;
    /** Optional title above the panel. Defaults to "Transcript". */
    title?: string;
    /** Surface the failure message when status === 'failed'. */
    errorMessage?: string;
    /** When status is processing/pending, surface what phase. */
    pendingMessage?: string;
    /** Render-prop slot for the empty/idle state. */
    idleState?: ReactNode;
    className?: string;
}
export declare function TranscriptPanel({ status, segments, currentTimeMs, onSeek, title, errorMessage, pendingMessage, idleState, className, }: TranscriptPanelProps): import("react").JSX.Element;
//# sourceMappingURL=TranscriptPanel.d.ts.map