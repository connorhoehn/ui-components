import { GatewayError } from '../../types/gateway';
import { EphemeralReaction } from '../../hooks/useReactions';
import { LogEntry } from '../misc/EventLog';
export interface DockVideoContext {
    dockedVideoDocId: string | null;
    setDockedVideoDocId: (id: string | null) => void;
}
export interface AppLayoutProps {
    currentChannel: string;
    onSwitchChannel: (channel: string) => void;
    onDisconnect: () => void;
    onReconnect: () => void;
    activeReactions: EphemeralReaction[];
    logEntries: LogEntry[];
    errors: GatewayError[];
    lastError: GatewayError | null;
    activityEvents: import('../../hooks/useActivityBus').ActivityEvent[];
    activityPublish: (eventType: string, detail: Record<string, unknown>) => void;
    activityIsLive: boolean;
}
/**
 * Wraps the layout body in the pipelines event-stream + runs providers so
 * the cross-pipeline approvals page and the document-trigger hook can
 * share a single runs store for the whole app. Events are sourced from the
 * gateway WS bridge — there is no other producer.
 */
export declare function AppLayout(props: AppLayoutProps): import("react").JSX.Element;
//# sourceMappingURL=AppLayout.d.ts.map