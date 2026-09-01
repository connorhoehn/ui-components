import type { VideoSession } from '../../hooks/useVideoSessions';
interface VideoHistoryPanelProps {
    sessions: VideoSession[];
    loading: boolean;
    onFetch: () => void;
    onClose: () => void;
}
export default function VideoHistoryPanel({ sessions, loading, onFetch, onClose }: VideoHistoryPanelProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=VideoHistoryPanel.d.ts.map