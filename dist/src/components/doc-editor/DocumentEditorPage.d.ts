import type { GatewayMessage } from '../../types/gateway';
import type { UseWebSocketReturn } from '../../hooks/useWebSocket';
export interface DocumentEditorPageProps {
    documentId: string;
    documentType?: string;
    ws: UseWebSocketReturn;
    userId: string;
    displayName: string;
    color?: string;
    onMessage: (handler: (msg: GatewayMessage) => void) => () => void;
    activityPublish: (eventType: string, detail: Record<string, unknown>) => void;
    activityEvents: import('../../hooks/useActivityBus').ActivityEvent[];
    onBack?: () => void;
    /** Whether the video call is docked to the left sidebar (managed by AppLayout) */
    isVideoDocked?: boolean;
    /** Dock the video panel to the left sidebar */
    onDockVideo?: () => void;
    /** Undock the video panel from the left sidebar */
    onUndockVideo?: () => void;
    /**
     * Bearer token for the editor's REST calls. Wins over this library's
     * `useIdentityContext().idToken` — see `useDocumentEditorState`'s
     * `idToken` prop, which this passes straight through.
     */
    idToken?: string | null;
}
export default function DocumentEditorPage({ documentId, documentType, ws, userId, displayName, color, onMessage, activityPublish, onBack, isVideoDocked, onDockVideo, onUndockVideo, idToken, }: DocumentEditorPageProps): import("react").JSX.Element;
//# sourceMappingURL=DocumentEditorPage.d.ts.map