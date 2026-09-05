// src/integrations/realtime-modules/WrappedConversationSurface.tsx
//
// ConversationSurface bound to realtime-modules: drop it in, hand it the hook
// returns, and you have a conversation.
//
// ## The two gates
//
// A feature is offered only where BOTH halves agree:
//
//   effective = declared by the host  ∩  provisioned by the gateway
//
// Either one alone is wrong. Declared-only ships a Documents tab against a
// gateway with no document service, and the tab is empty forever — which
// reads as a broken feature rather than an absent one. Provisioned-only means
// a product that deliberately ships chat-only grows tabs the day an operator
// enables something server-side.
//
// `declare` is the host's half. The gateway's half comes from
// `useCapabilities`, resolved by the CALLER and passed in — this package keeps
// no runtime dependency on realtime-modules, the same convention every other
// Wrapped* component follows.
//
// ## Why `chat` is never gated
//
// The transcript is the surface's reason to exist; nobody embeds a
// conversation without the conversation. Gating it would also mean the
// transcript vanishes for the moment capabilities are loading, because the
// hook reports every unresolved name as `false` — deliberately, so a caller
// never flashes a control it is about to hide. That doctrine is right for the
// extra views and wrong for the thing they hang off.

import { lobbyForChannel } from '@connorhoehn/realtime-modules/call';
import { useMemo, type ReactNode } from 'react';
import {
  ConversationSurface,
  ALL_CONVERSATION_FEATURES,
  type ConversationFeature,
  type ConversationSurfaceProps,
} from '../../components/social/ConversationSurface';

/**
 * Capability name per view. Exported so a host whose CRDs are named
 * differently can remap without forking the component — the names below are a
 * default, not a protocol.
 */
export const CONVERSATION_CAPABILITY_NAMES: Record<
  Exclude<ConversationFeature, 'chat'>,
  string
> = {
  files: 'conversation.files',
  documents: 'conversation.documents',
  pins: 'conversation.pins',
  mentions: 'conversation.mentions',
  calls: 'conversation.calls',
};

/** The `enabled` map from realtime-modules' `useCapabilities`, restated. */
export type RMCapabilityMap = Record<string, boolean>;

export interface WrappedConversationSurfaceProps
  extends Omit<ConversationSurfaceProps, 'features'> {
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
  capabilityNames?: Partial<Record<Exclude<ConversationFeature, 'chat'>, string>>;
  children?: ReactNode;
}

/**
 * The capability names to resolve for a declared feature set — feed this to
 * `useCapabilities`. Asking for names the host has not declared would make the
 * gateway's answer decide a question the host already answered.
 */
export function capabilityNamesFor(
  declare: readonly ConversationFeature[] = ALL_CONVERSATION_FEATURES,
  overrides: Partial<Record<Exclude<ConversationFeature, 'chat'>, string>> = {},
): string[] {
  return declare
    .filter((f): f is Exclude<ConversationFeature, 'chat'> => f !== 'chat')
    .map((f) => overrides[f] ?? CONVERSATION_CAPABILITY_NAMES[f]);
}

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
export function conversationFeaturesFor(opts: {
  /** The conversation's channel id. Null before one is open. */
  channel?: string | null;
  /** False when the host ships without a documents provider. */
  hasDocuments?: boolean;
  /** Defaults to everything the surface knows how to render. */
  from?: readonly ConversationFeature[];
}): ConversationFeature[] {
  const { channel = null, hasDocuments = true, from = ALL_CONVERSATION_FEATURES } = opts;
  return from.filter((f) => {
    if (f === 'mentions') return false;
    if (f === 'documents') return hasDocuments;
    if (f === 'calls') return !!lobbyForChannel(channel);
    return true;
  });
}

export function WrappedConversationSurface({
  declare = ALL_CONVERSATION_FEATURES,
  capabilities,
  capabilitiesError,
  capabilityNames = {},
  children,
  ...surface
}: WrappedConversationSurfaceProps) {
  const features = useMemo(() => {
    const names = capabilityNames;
    return declare.filter((f) => {
      // Never gated: see the header.
      if (f === 'chat') return true;
      // Nothing to ask, or asking failed: the host's declaration stands on
      // its own. Both are "we do not know", and neither is "no".
      if (!capabilities || capabilitiesError) return true;
      const name = names[f] ?? CONVERSATION_CAPABILITY_NAMES[f];
      return capabilities[name] === true;
    });
  }, [declare, capabilities, capabilitiesError, capabilityNames]);

  return (
    <ConversationSurface {...surface} features={features}>
      {children}
    </ConversationSurface>
  );
}

export default WrappedConversationSurface;
