import { type ReactNode } from 'react';
import type { RealtimeClientModules } from './modules';
import { type HangoutRoomRowComponent } from './HangoutRoomRow';
import { type HangoutRoomsSectionComponent } from './HangoutRoomsSection';
import { type WrappedHangoutRoomsListComponent } from './WrappedHangoutRoomsList';
import { type RealtimeCapabilityProviderComponent } from './capabilities';
import { type ConversationFeaturesFor } from './WrappedConversationSurface';
import { type WrappedStreamStageComponent } from './WrappedStreamStage';
import { type WrappedLVSHangoutLayoutComponent } from './WrappedLVSHangoutLayout';
/** Every integration that calls a realtime-modules function, bound to one bag. */
export interface RealtimeIntegrations {
    HangoutRoomRow: HangoutRoomRowComponent;
    HangoutRoomsSection: HangoutRoomsSectionComponent;
    WrappedHangoutRoomsList: WrappedHangoutRoomsListComponent;
    RealtimeCapabilityProvider: RealtimeCapabilityProviderComponent;
    conversationFeaturesFor: ConversationFeaturesFor;
    WrappedStreamStage: WrappedStreamStageComponent;
    WrappedLVSHangoutLayout: WrappedLVSHangoutLayoutComponent;
}
/**
 * Bind the hook-bound integrations to `rm`. Props and test ids are identical to
 * the same-named exports of `integrations/realtime-modules` (which is exactly
 * this, applied to the canonical `@connorhoehn/realtime-modules` imports).
 *
 * Hooks are read from `rm` at render time, not captured here.
 */
export declare function createRealtimeIntegrations(rm: RealtimeClientModules): RealtimeIntegrations;
export interface RealtimeIntegrationsProviderProps {
    /**
     * The realtime-modules functions to bind. Pass a stable object (module
     * scope or memoised) — a new object each render re-binds and remounts.
     */
    modules: RealtimeClientModules;
    children: ReactNode;
}
/** Bind the integrations once for a subtree; read them with `useRealtimeIntegrations()`. */
export declare function RealtimeIntegrationsProvider({ modules, children }: RealtimeIntegrationsProviderProps): import("react").JSX.Element;
/**
 * The integrations bound by the nearest RealtimeIntegrationsProvider. Throws
 * outside one: there is no canonical fallback in this entry (that would import
 * the package this entry exists to avoid importing).
 */
export declare function useRealtimeIntegrations(): RealtimeIntegrations;
//# sourceMappingURL=createRealtimeIntegrations.d.ts.map