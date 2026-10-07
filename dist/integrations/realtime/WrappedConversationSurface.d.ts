import type { RealtimeClientModules } from './modules';
import { type ReactNode } from 'react';
import { type ConversationFeature, type ConversationSurfaceProps } from '../../components/social/ConversationSurface';
/**
 * Capability name per view. Exported so a host whose CRDs are named
 * differently can remap without forking the component — the names below are a
 * default, not a protocol.
 */
/** The views that need no capability: chat itself, and who is in it. */
export type UngatedConversationFeature = 'chat' | 'members';
export type GatedConversationFeature = Exclude<ConversationFeature, UngatedConversationFeature>;
export declare const CONVERSATION_CAPABILITY_NAMES: Record<GatedConversationFeature, string>;
/** The `enabled` map from realtime-modules' `useCapabilities`, restated. */
export type RMCapabilityMap = Record<string, boolean>;
export interface WrappedConversationSurfaceProps extends Omit<ConversationSurfaceProps, 'features'> {
    /**
     * What this product offers. Defaults to everything, so a host that has not
     * thought about it gets whatever the gateway provisions.
     */
    declare?: readonly ConversationFeature[];
    /**
     * `useCapabilities(capabilityNamesFor(declare)).enabled`. Omit it entirely
     * to skip the gateway gate — appropriate for a deployment with no
     * capability service, where the host's declaration is the only answer
     * available and treating "no service" as "nothing enabled" would leave a
     * bare transcript.
     */
    capabilities?: RMCapabilityMap;
    /**
     * The `error` from `useCapabilities`. Load-bearing: the hook reports every
     * unresolved name as `false`, so a gateway that is momentarily 500ing is
     * indistinguishable from one that provisions nothing — and a surface gated
     * on that silently loses every view, with no explanation, until the gateway
     * recovers. COULD NOT ASK is not the same answer as NO, so a failed
     * resolution falls back to the host's declaration, exactly as a deployment
     * with no capability service does.
     */
    capabilitiesError?: unknown;
    /** Remap capability names when the host's CRDs are named differently. */
    capabilityNames?: Partial<Record<GatedConversationFeature, string>>;
    children?: ReactNode;
}
/**
 * The capability names to resolve for a declared feature set — feed this to
 * `useCapabilities`. Asking for names the host has not declared would make the
 * gateway's answer decide a question the host already answered.
 */
export declare function capabilityNamesFor(declare?: readonly ConversationFeature[], overrides?: Partial<Record<GatedConversationFeature, string>>): string[];
/**
 * Which features a conversation is CAPABLE of, before anyone asks the gateway
 * what it provisions.
 *
 * This is the host's half of the two gates: the app declares what it ships,
 * the gateway says what it provisions per channel, and the surface renders the
 * intersection. Some of the host's half depends on WHICH conversation this is,
 * and that is what this answers.
 *
 * The rule that motivated it: a call is addressed to a LOBBY, and a plain
 * channel has none — calls go to people (`dm:`) or to a room (`room:`). A
 * `#general` that offered a Calls tab showed an empty state reading "Calls
 * recorded in this conversation show up here", which no call ever could:
 * there is no way to start one and nowhere to record it. A feature this
 * conversation cannot have should be ABSENT, not empty — the same rule that
 * drops documents when the host is mounted without their provider.
 *
 * `mentions` is never included: mentions span every conversation, so a
 * per-channel tab for them claims a scope it does not have. They belong on a
 * shelf beside the conversation list.
 */
export type ConversationFeaturesForOptions = {
    /** The conversation's channel id. Null before one is open. */
    channel?: string | null;
    /** False when the host ships without a documents provider. */
    hasDocuments?: boolean;
    /** Defaults to everything the surface knows how to render. */
    from?: readonly ConversationFeature[];
};
/** The realtime-modules functions conversationFeaturesFor calls. */
export type ConversationFeaturesForModules = Pick<RealtimeClientModules, 'lobbyForChannel'>;
export type ConversationFeaturesFor = (opts: ConversationFeaturesForOptions) => ConversationFeature[];
/**
 * Bind conversationFeaturesFor to an injected `lobbyForChannel` (the rule for
 * "does this channel have a call lobby" lives in realtime-modules' `/call`).
 */
export declare function createConversationFeaturesFor(rm: ConversationFeaturesForModules): ConversationFeaturesFor;
export declare function WrappedConversationSurface({ declare, capabilities, capabilitiesError, capabilityNames, children, ...surface }: WrappedConversationSurfaceProps): import("react").JSX.Element;
export default WrappedConversationSurface;
//# sourceMappingURL=WrappedConversationSurface.d.ts.map