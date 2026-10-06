import { type ReactNode } from 'react';
export interface TranscriptSegment {
    startMs: number;
    endMs: number;
    /**
     * Diarization id. OPTIONAL, because a transcript produced without
     * diarization has no speakers to identify — and a required-in-the-type,
     * absent-in-the-payload field is how this panel threw
     * `Cannot read properties of undefined (reading 'length')` out of its
     * colour hash and took the whole recordings page down with it.
     */
    speakerId?: string;
    /** Display name for the speaker. Optional for the same reason. */
    speakerLabel?: string;
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
    /** Surface the failure message when status === 'failed'. Write it for a
     *  person: this panel is on a page end users open, so queue names and
     *  transport-library prefixes belong in `errorDetail`, not here. */
    errorMessage?: string;
    /** The raw internal text behind `errorMessage`, revealed behind a
     *  "Show technical details" disclosure. Omit when there is nothing more
     *  to show than the message itself. */
    errorDetail?: string | null;
    /** When status is processing/pending, surface what phase. */
    pendingMessage?: string;
    /** Render-prop slot for the empty/idle state. */
    idleState?: ReactNode;
    className?: string;
}
export declare function TranscriptPanel({ status, segments, currentTimeMs, onSeek, title, errorMessage, errorDetail, pendingMessage, idleState, className, }: TranscriptPanelProps): import("react").JSX.Element;
//# sourceMappingURL=TranscriptPanel.d.ts.map