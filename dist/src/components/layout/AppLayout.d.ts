import type { GatewayError } from '../../types/gateway';
import type { EphemeralReaction } from '../../hooks/useReactions';
import type { LogEntry } from '../misc/EventLog';
import type { IdentityContextValue } from '../../contexts/IdentityContext';
import type { PresenceUser } from '../../hooks/usePresence';
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
    /**
     * Whether the left sidebar starts expanded. Optional and **initial-only**
     * — the layout still owns the state afterwards, so the collapse/expand
     * controls keep working. Omit it and the sidebar starts open, which is the
     * historical behaviour.
     *
     * It exists because the 56px `CollapsedIconStrip` was previously reachable
     * only by clicking the sidebar's collapse control: a host cannot restore
     * the user's saved preference on mount, and a test has to click before it
     * can assert on the collapsed chrome.
     */
    defaultSidebarOpen?: boolean;
    /**
     * Full identity value. Wins over this library's `useIdentityContext()`,
     * so a host running its own identity provider never needs to mount this
     * library's `<IdentityProvider>` just for `AppLayout`. Defaults to the
     * context's value (or field-by-field fallbacks — `''`/`null`/a no-op
     * `onSignOut` — when no `<IdentityProvider>` is mounted and this prop is
     * also omitted) via the non-throwing `useOptionalIdentityContext`.
     */
    identity?: IdentityContextValue;
    /**
     * Presence-sourced users. Wins over this library's `usePresenceContext()`,
     * for the same reason as `identity` above. Defaults to the context's
     * `presenceUsers` (or `[]` when no `<PresenceProvider>` is mounted).
     */
    presenceUsers?: PresenceUser[];
}
/**
 * Wraps the layout body in the pipelines event-stream + runs providers so
 * the cross-pipeline approvals page and the document-trigger hook can
 * share a single runs store for the whole app. Events are sourced from the
 * gateway WS bridge — there is no other producer.
 */
export declare function AppLayout(props: AppLayoutProps): import("react").JSX.Element;
//# sourceMappingURL=AppLayout.d.ts.map