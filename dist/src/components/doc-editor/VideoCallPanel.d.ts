import { DocumentMeta } from '../../types/document';
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
export default function VideoCallPanel({ documentId, userId, idToken, meta, updateMeta, sendMessage, onClose, onDockToSidebar, isDocked, onUndock, onCallEnd, }: VideoCallPanelProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=VideoCallPanel.d.ts.map