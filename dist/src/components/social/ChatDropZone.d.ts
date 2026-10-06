import { type ReactNode } from 'react';
export interface ChatDropZoneProps {
    children: ReactNode;
    /** Receives the dropped files after validation. */
    onFiles: (files: File[]) => void;
    /** Comma-separated MIME patterns, e.g. "image/*,.pdf". Omit to accept all. */
    accept?: string;
    /** Per-file byte cap. Rejected files are reported via `onError`. */
    maxSize?: number;
    /** Called with a human-readable reason when a drop is rejected. */
    onError?: (message: string) => void;
    /** Suppresses the drop affordance entirely (e.g. while disconnected). */
    disabled?: boolean;
    /** Overlay copy. Defaults to a generic prompt. */
    label?: string;
    className?: string;
}
export declare function ChatDropZone({ children, onFiles, accept, maxSize, onError, disabled, label, className, }: ChatDropZoneProps): import("react").JSX.Element;
export default ChatDropZone;
//# sourceMappingURL=ChatDropZone.d.ts.map