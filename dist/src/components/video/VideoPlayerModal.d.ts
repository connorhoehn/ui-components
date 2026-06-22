import { ReactNode } from 'react';
export interface VideoPlayerSource {
    /** Direct media URL (mp4 / webm / etc) served with Range support. */
    url: string;
    /** Optional human label for the segment switcher (e.g. "Segment 1"). */
    label?: string;
    /** Optional size in bytes — shown next to the label when present. */
    sizeBytes?: number;
}
export interface VideoPlayerModalProps {
    /** Required — backdrop click + Escape both fire this. */
    onClose: () => void;
    /** One or more media URLs. The first plays first; multiple ⇒ segment switcher. */
    sources: VideoPlayerSource[];
    /** Optional small title shown in the modal header (e.g. channel name). */
    title?: string;
    /** Optional subtitle shown under the title (e.g. start time + duration). */
    subtitle?: string;
    /** Auto-play the first source on mount. Default true. */
    autoPlay?: boolean;
    /** Start muted (useful when autoPlay is on — many browsers require it). Default false. */
    muted?: boolean;
    /** Hide the per-source Download link in the footer. Default false. */
    hideDownload?: boolean;
    /** Render extra content in the header (right side, before the close button). */
    header?: ReactNode;
    /** Render extra content in the footer (right side). */
    footer?: ReactNode;
    className?: string;
}
export declare function VideoPlayerModal({ onClose, sources, title, subtitle, autoPlay, muted, hideDownload, header, footer, className, }: VideoPlayerModalProps): import("react").JSX.Element;
export default VideoPlayerModal;
//# sourceMappingURL=VideoPlayerModal.d.ts.map