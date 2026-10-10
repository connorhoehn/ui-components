// ConversationInputs.tsx (2.439.0) — the React side of conversationInputRegistry.ts.
//
//   <ConversationInputProvider>       once, around the shell
//     <ConversationComposer …/>       claims its channels, answers focus requests
//     <WrappedChatPanel composer={<ThreadInput channel={…} …/>} />
//                                     the thread's input, or its hand-off
//
// Without a provider every hook still works against one default registry, so a
// composer rendered alone (a test, a demo) behaves; an app with a shell mounts
// the provider so its claims are its own.

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, useSyncExternalStore, type ReactNode } from 'react';
import { Button } from '../ui/Button';
import { Stack } from '../ui/Stack';
import {
  ConversationInputRegistry,
  threadInputOwner,
  type ComposerFocusRequest,
  type ThreadInputIntent,
  type ThreadInputOwner,
} from './conversationInputRegistry';

const fallback = new ConversationInputRegistry();
const RegistryContext = createContext<ConversationInputRegistry>(fallback);

/** One registry for everything under it: claims, thread hand-offs and focus requests. */
export function ConversationInputProvider({ children }: { children: ReactNode }) {
  const [registry] = useState(() => new ConversationInputRegistry());
  return <RegistryContext.Provider value={registry}>{children}</RegistryContext.Provider>;
}

/** The nearest registry (the default one outside a provider). */
export function useConversationInputs(): ConversationInputRegistry {
  return useContext(RegistryContext);
}

/**
 * Claim `channels` for this composer while mounted and `enabled`. `focus` is
 * read through a ref, so an inline handler does not re-claim every render.
 */
export function useClaimConversationInput(opts: {
  channels: readonly (string | null | undefined)[];
  label: string;
  replies?: boolean;
  enabled?: boolean;
  focus(intent: ThreadInputIntent): boolean;
}): void {
  const registry = useConversationInputs();
  const focus = useRef(opts.focus);
  focus.current = opts.focus;
  const channels = opts.channels.filter((channel): channel is string => !!channel);
  const key = channels.join('\n');
  const enabled = opts.enabled !== false && channels.length > 0;
  useEffect(() => {
    if (!enabled) return undefined;
    return registry.claim({
      channels: key.split('\n'), label: opts.label, replies: !!opts.replies,
      focus: (intent) => focus.current(intent),
    });
  }, [registry, enabled, key, opts.label, opts.replies]);
}

export type ThreadInput = ThreadInputOwner & {
  /** The thread's send intent: the claiming composer takes the caret. False when none claims it. */
  focus(reply?: boolean): boolean;
};

/** Who owns the input for the thread bound to `channel`. */
export function useThreadInput(channel: string | null | undefined): ThreadInput {
  const registry = useConversationInputs();
  const claims = useSyncExternalStore(registry.subscribe, registry.claims, registry.claims);
  const owner = useMemo(() => threadInputOwner(channel, claims), [channel, claims]);
  const focus = useCallback(
    (reply?: boolean) => !!channel && registry.focusThread({ channel, ...(reply ? { reply } : {}) }),
    [registry, channel],
  );
  return useMemo(() => ({ ...owner, focus }), [owner, focus]);
}

/** Answer the shell's focus requests while mounted and `enabled` (the first mounted composer that answers takes it). */
export function useComposerFocusRequest(handler: (request: ComposerFocusRequest) => boolean, enabled = true): void {
  const registry = useConversationInputs();
  const latest = useRef(handler);
  latest.current = handler;
  useEffect(() => (enabled ? registry.onFocusRequest((request) => latest.current(request)) : undefined), [registry, enabled]);
}

/** Bring a surface on screen before any composer answers (a collapsed side pane). */
export function useComposerFocusReveal(revealer: (request: ComposerFocusRequest) => void, enabled = true): void {
  const registry = useConversationInputs();
  const latest = useRef(revealer);
  latest.current = revealer;
  useEffect(() => (enabled ? registry.onReveal((request) => latest.current(request)) : undefined), [registry, enabled]);
}

/** `request(…)`: true when a mounted composer took it; `present`: is one mounted to take it. */
export function useComposerFocus(): { request(request: ComposerFocusRequest): boolean; present: boolean } {
  const registry = useConversationInputs();
  const present = useSyncExternalStore(registry.subscribe, registry.composerPresent, registry.composerPresent);
  const request = useCallback((r: ComposerFocusRequest) => registry.requestFocus(r), [registry]);
  return { request, present };
}

export interface ThreadInputHandoffProps {
  /** The composer that owns this conversation's input ("the document composer"). */
  label: string;
  onFocus(): void;
  'data-testid'?: string;
}

/**
 * Where a thread's own input would be when a composer elsewhere on the page
 * owns it: one button naming that composer, which puts the caret there. Not an
 * input — one per conversation.
 */
export function ThreadInputHandoff({ label, onFocus, 'data-testid': testId = 'pane-input-handoff' }: ThreadInputHandoffProps) {
  return (
    <Stack gap="none" className="border-t border-border px-3 py-2" data-testid={testId}>
      <Button variant="secondary" size="sm" fullWidth onClick={onFocus} title={`Write in ${label}`} data-testid={`${testId}-focus`}>
        Reply in {label}
      </Button>
    </Stack>
  );
}
