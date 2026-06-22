import { ActivityEvent } from '../../hooks/useActivityBus';
import { DocumentInfo } from '../../hooks/useDocuments';
export interface PresenceUser {
    clientId: string;
    metadata: Record<string, unknown>;
}
type ConnectionState = 'idle' | 'connecting' | 'connected' | 'reconnecting' | 'disconnected';
export interface PipelineSidebarEntry {
    id: string;
    name: string;
    status: 'draft' | 'published' | 'archived';
    updatedAt: string;
    icon?: string;
}
export interface CollapsibleSidebarProps {
    connectionState: ConnectionState;
    onDisconnect: () => void;
    onReconnect: () => void;
    onCollapse?: () => void;
    presenceUsers: PresenceUser[];
    currentClientId: string;
    currentChannel: string;
    activityEvents: ActivityEvent[];
    userId: string;
    documents: DocumentInfo[];
    onOpenDocument: (id: string) => void;
    pipelines?: PipelineSidebarEntry[];
    onOpenPipeline?: (id: string) => void;
    onSeeAllPipelines?: () => void;
    videoSlot?: React.ReactNode;
}
export declare function CollapsibleSidebar({ connectionState, onDisconnect, onReconnect, onCollapse, presenceUsers, currentClientId, currentChannel, activityEvents, userId, documents, onOpenDocument, pipelines, onOpenPipeline, onSeeAllPipelines, videoSlot, }: CollapsibleSidebarProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=CollapsibleSidebar.d.ts.map