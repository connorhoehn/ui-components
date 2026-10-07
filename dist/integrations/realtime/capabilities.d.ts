import { type ReactNode } from 'react';
import type { RealtimeClientModules } from './modules';
/**
 * The capabilities a conversation surface can be composed from.
 *
 * Each is a distinct product decision, not a UI detail:
 *   chat       — send and read messages
 *   presence   — who is here / typing
 *   video      — start or join a video room from a conversation
 *   audio      — audio-only call, independently of video: a host may want
 *                voice without ever putting a camera in the product
 *   files      — attachments and drag-drop upload
 *   reactions  — emoji on messages
 *   recordings — past-call playback and transcripts
 */
export interface RealtimeCapabilitySet {
    chat?: boolean;
    presence?: boolean;
    video?: boolean;
    audio?: boolean;
    files?: boolean;
    reactions?: boolean;
    recordings?: boolean;
}
export type RealtimeCapabilityName = keyof RealtimeCapabilitySet;
export declare const ALL_REALTIME_CAPABILITIES: readonly RealtimeCapabilityName[];
/**
 * Chat and presence only.
 *
 * The default for a host that declares nothing, chosen deliberately: the
 * conservative set is the one that cannot surprise anyone with a camera, a
 * microphone, or a stored recording. Opting IN to those is a decision a host
 * should have to write down.
 */
export declare const DEFAULT_REALTIME_CAPABILITIES: RealtimeCapabilitySet;
export interface ResolvedCapabilities {
    /** declared ∩ provisioned — what may actually render. */
    can: Record<RealtimeCapabilityName, boolean>;
    /** What the host asked for. */
    declared: Record<RealtimeCapabilityName, boolean>;
    /** What the tenant is granted. */
    provisioned: Record<RealtimeCapabilityName, boolean>;
    /** True until the grant has been resolved once. */
    isLoading: boolean;
}
export interface RealtimeCapabilityProviderProps {
    /**
     * What this host wants. Omitted keys are OFF — an allow-list, so adding a
     * capability to this library never switches something on inside an app that
     * never asked for it.
     */
    capabilities?: RealtimeCapabilitySet;
    /** Scope the grant lookup to one channel. */
    channel?: string;
    children: ReactNode;
}
/** The realtime-modules functions RealtimeCapabilityProvider calls. */
export type RealtimeCapabilityProviderModules = Pick<RealtimeClientModules, 'useCapabilities'>;
export type RealtimeCapabilityProviderComponent = (props: RealtimeCapabilityProviderProps) => React.JSX.Element;
/**
 * Bind RealtimeCapabilityProvider to an injected `useCapabilities`. Every
 * binding writes the SAME context, so `CapabilityGate` / `useRealtimeCapabilities`
 * from either entry read whichever provider is above them.
 */
export declare function createRealtimeCapabilityProvider(rm: RealtimeCapabilityProviderModules): RealtimeCapabilityProviderComponent;
/**
 * Read the effective capabilities.
 *
 * Outside a provider every capability is OFF rather than ON. An unwrapped
 * surface silently rendering video is exactly the failure this module exists to
 * prevent, so the unconfigured case is the safe one.
 */
export declare function useRealtimeCapabilities(): ResolvedCapabilities;
export interface CapabilityGateProps {
    /** Renders children only when ALL of these are effective. */
    need: RealtimeCapabilityName | readonly RealtimeCapabilityName[];
    children: ReactNode;
    /**
     * Shown when the capability is unavailable. Defaults to nothing.
     *
     * Nothing, not a disabled control or an upsell: a greyed "Start call" in a
     * chat-only deployment is a promise the product cannot keep, and the reader
     * cannot tell whether it is broken, loading, or needs a permission. The way a
     * surface says "this does not apply here" is by not being there.
     */
    fallback?: ReactNode;
}
export declare function CapabilityGate({ need, children, fallback }: CapabilityGateProps): import("react").JSX.Element;
//# sourceMappingURL=capabilities.d.ts.map