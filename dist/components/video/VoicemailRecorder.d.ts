export interface VoicemailRecorderProps {
    open: boolean;
    onClose: () => void;
    /** Who the message is for — the title. */
    recipientName: string;
    /** Microphone access, with whatever device preference the host applies. */
    getStream: () => Promise<MediaStream>;
    /** Deliver the message. Reject to keep the dialog open with the error shown. */
    onSend: (blob: Blob, durationMs: number, mimeType: string) => Promise<void>;
    maxSeconds?: number;
    'data-testid'?: string;
}
export declare function VoicemailRecorder({ open, onClose, recipientName, getStream, onSend, maxSeconds, 'data-testid': testId }: VoicemailRecorderProps): import("react").JSX.Element;
export default VoicemailRecorder;
//# sourceMappingURL=VoicemailRecorder.d.ts.map