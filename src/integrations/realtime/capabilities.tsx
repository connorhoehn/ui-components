// ui-components/src/integrations/realtime/capabilities.tsx
//
// What an embedded realtime surface is ALLOWED to render.
//
// ## The two axes, and why one is not enough
//
// There are two independent answers to "can this app do video calls", and the
// stack already had only one of them:
//
//   1. PROVISIONED — does the tenant have the capability CRD? The gateway owns
//      this (`GET /api/capabilities`), realtime-modules reads it
//      (`useCapabilities`). It is a grant, and it can change under you at
//      runtime when someone toggles a CRD.
//
//   2. DECLARED — does the embedding app WANT it? A host embedding a support
//      widget may want chat and nothing else, on a tenant that is fully
//      provisioned for video. Nothing in the stack could express that, so an
//      exported module rendered whatever the server happened to allow.
//
// The effective set is the INTERSECTION. Declared is a ceiling, not a request:
// a host that says `{ chat: true }` never gets a call button, no matter how
// generous the tenant's CRDs are. Provisioned is the grant: asking for video on
// a tenant without it renders nothing rather than a control that fails on click.
//
// Expressing this as "declared AND provisioned" — rather than letting either
// side win — is what makes the module safe to export. The host cannot exceed
// its grant, and the server cannot force UI into a host that did not ask for it.
//
// ## Why unknown names are refused
//
// A typo (`{ vidoe: true }`) silently disabling video is the kind of bug that
// survives review, so the declared set is typed to a closed union rather than
// `Record<string, boolean>`.

import { createContext, useContext, useMemo, type ReactNode } from 'react';
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

export const ALL_REALTIME_CAPABILITIES: readonly RealtimeCapabilityName[] = [
  'chat',
  'presence',
  'video',
  'audio',
  'files',
  'reactions',
  'recordings',
];

/**
 * Chat and presence only.
 *
 * The default for a host that declares nothing, chosen deliberately: the
 * conservative set is the one that cannot surprise anyone with a camera, a
 * microphone, or a stored recording. Opting IN to those is a decision a host
 * should have to write down.
 */
export const DEFAULT_REALTIME_CAPABILITIES: RealtimeCapabilitySet = {
  chat: true,
  presence: true,
};

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

const CapabilityContext = createContext<ResolvedCapabilities | null>(null);

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
export function createRealtimeCapabilityProvider(
  rm: RealtimeCapabilityProviderModules,
): RealtimeCapabilityProviderComponent {
  function RealtimeCapabilityProvider(props: RealtimeCapabilityProviderProps) {
    return RealtimeCapabilityProviderView(rm, props);
  }
  return RealtimeCapabilityProvider;
}

function RealtimeCapabilityProviderView(rm: RealtimeCapabilityProviderModules, {
  capabilities = DEFAULT_REALTIME_CAPABILITIES,
  channel,
  children,
}: RealtimeCapabilityProviderProps) {
  // Only ASK the gateway about capabilities this host could actually use.
  // Querying the full set would spend requests discovering grants that the
  // declared ceiling has already ruled out.
  const wanted = useMemo(
    () => ALL_REALTIME_CAPABILITIES.filter((name) => capabilities[name] === true),
    [capabilities],
  );

  const { enabled: provisionedRaw, isLoading } = rm.useCapabilities(wanted, channel);

  const value = useMemo<ResolvedCapabilities>(() => {
    const declared = {} as Record<RealtimeCapabilityName, boolean>;
    const provisioned = {} as Record<RealtimeCapabilityName, boolean>;
    const can = {} as Record<RealtimeCapabilityName, boolean>;

    for (const name of ALL_REALTIME_CAPABILITIES) {
      declared[name] = capabilities[name] === true;
      // Undeclared names are never queried, so they have no grant to report.
      // `false` here means "not asked", which for display purposes is the same
      // as "not granted" — neither one may render.
      provisioned[name] = provisionedRaw[name] ?? false;
      can[name] = declared[name] && provisioned[name];
    }

    return { can, declared, provisioned, isLoading };
  }, [capabilities, provisionedRaw, isLoading]);

  return <CapabilityContext.Provider value={value}>{children}</CapabilityContext.Provider>;
}

/**
 * Read the effective capabilities.
 *
 * Outside a provider every capability is OFF rather than ON. An unwrapped
 * surface silently rendering video is exactly the failure this module exists to
 * prevent, so the unconfigured case is the safe one.
 */
export function useRealtimeCapabilities(): ResolvedCapabilities {
  const ctx = useContext(CapabilityContext);
  return (
    ctx ?? {
      can: Object.fromEntries(ALL_REALTIME_CAPABILITIES.map((n) => [n, false])) as Record<
        RealtimeCapabilityName,
        boolean
      >,
      declared: Object.fromEntries(ALL_REALTIME_CAPABILITIES.map((n) => [n, false])) as Record<
        RealtimeCapabilityName,
        boolean
      >,
      provisioned: Object.fromEntries(ALL_REALTIME_CAPABILITIES.map((n) => [n, false])) as Record<
        RealtimeCapabilityName,
        boolean
      >,
      isLoading: false,
    }
  );
}

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

export function CapabilityGate({ need, children, fallback = null }: CapabilityGateProps) {
  const { can } = useRealtimeCapabilities();
  const names: readonly RealtimeCapabilityName[] = Array.isArray(need)
    ? (need as readonly RealtimeCapabilityName[])
    : [need as RealtimeCapabilityName];
  const ok = names.every((n) => can[n]);
  return <>{ok ? children : fallback}</>;
}
