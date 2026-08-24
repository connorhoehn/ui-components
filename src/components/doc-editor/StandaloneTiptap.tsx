// frontend/src/components/doc-editor/StandaloneTiptap.tsx
//
// Self-contained collaborative TipTap editor. Absorbs the Y.Doc +
// GatewayProvider + WebSocket bootstrap so consumers can drop in a single
// component pointed at a gateway URL, instead of constructing a full
// collaboration stack themselves.
//
// Two modes:
//   1. Bootstrap mode  — pass { gatewayUrl, docId, authToken }; the
//      component owns the Y.Doc, GatewayProvider, and WS lifecycle.
//   2. Escape-hatch    — pass an already-built { ydoc, provider, fragment }
//      trio; the component renders TiptapEditor unchanged. Use this for
//      advanced setups (custom transports, shared docs across multiple
//      editors, server-rendered providers).
//
// Either mode requires { user, fragmentName? }.
// The internal `prosemirror` Y.XmlFragment is the default convention.
import { useCallback, useMemo, useRef } from 'react';
import * as Y from 'yjs';
import TiptapEditor from './TiptapEditor';
import type { CollaborationProvider } from './TiptapEditor';
import { useWebSocket } from '../../hooks/useWebSocket';
import { useYjsDoc } from '../../hooks/useYjsDoc';
import type { GatewayMessage } from '../../types/gateway';
import { cn } from '../../lib/cn';

export interface StandaloneTiptapUser {
  name: string;
  color: string;
}

interface SharedProps {
  user: StandaloneTiptapUser;
  /** Y.XmlFragment name on the shared doc. Default: 'prosemirror'. */
  fragmentName?: string;
  editable?: boolean;
  placeholder?: string;
  className?: string;
  /**
   * Called once when the editor first connects to a non-null XmlFragment.
   * Useful for seeding initial content via consumer code.
   */
  onFragmentReady?: (fragment: Y.XmlFragment, ydoc: Y.Doc) => void;
  /** Slot shown while bootstrapping (Y.Doc not yet constructed). */
  loadingSlot?: React.ReactNode;
  /**
   * Wait for the provider's first sync before mounting the editor.
   *
   * Default `false`, which is the historical behaviour: the editor mounts on
   * the first commit, before any server snapshot has arrived. The user sees an
   * empty document with a placeholder and can start typing into it — and the
   * server's content then merges *around* what they wrote. Tiptap's
   * Collaboration extension also writes an empty paragraph into an empty
   * fragment, so a cold open can leave a stray block behind.
   *
   * Set `true` when the document is expected to have existing content and you
   * would rather show `loadingSlot` than risk that. It is opt-in rather than
   * the default because a gateway that sends no snapshot for a brand-new
   * document never fires `synced`, and gating on it there would hang the
   * editor forever.
   *
   * `onFragmentReady` respects this too: seeding content into an unsynced doc
   * is the same corruption by another route.
   */
  requireSync?: boolean;
}

export interface StandaloneTiptapBootstrapProps extends SharedProps {
  /** WebSocket URL of the gateway, e.g. wss://gateway.example.com/ws */
  gatewayUrl: string;
  /** Document id; the component subscribes to `doc:${docId}`. */
  docId: string;
  /** Bearer-style token forwarded as Sec-WebSocket-Protocol. May be ''. */
  authToken: string;
  /** Optional channel override; default `doc:${docId}`. */
  channel?: string;
  ydoc?: undefined;
  provider?: undefined;
  fragment?: undefined;
}

export interface StandaloneTiptapEscapeHatchProps extends SharedProps {
  ydoc: Y.Doc;
  provider: CollaborationProvider | null;
  /** If omitted, falls back to ydoc.getXmlFragment(fragmentName ?? 'prosemirror'). */
  fragment?: Y.XmlFragment;
  gatewayUrl?: undefined;
  docId?: undefined;
  authToken?: undefined;
  channel?: undefined;
}

export type StandaloneTiptapProps =
  | StandaloneTiptapBootstrapProps
  | StandaloneTiptapEscapeHatchProps;

const DEFAULT_FRAGMENT_NAME = 'prosemirror';

function isEscapeHatch(
  p: StandaloneTiptapProps,
): p is StandaloneTiptapEscapeHatchProps {
  return p.ydoc !== undefined;
}

export default function StandaloneTiptap(props: StandaloneTiptapProps) {
  if (isEscapeHatch(props)) {
    return <EscapeHatchEditor {...props} />;
  }
  return <BootstrappingEditor {...props} />;
}

// ---------------------------------------------------------------------------
// Escape-hatch — consumer brought their own Y.Doc/provider.
// ---------------------------------------------------------------------------

function EscapeHatchEditor({
  ydoc,
  provider,
  fragment,
  user,
  fragmentName = DEFAULT_FRAGMENT_NAME,
  editable,
  placeholder,
  className,
  onFragmentReady,
}: StandaloneTiptapEscapeHatchProps) {
  const resolvedFragment = useMemo(
    () => fragment ?? ydoc.getXmlFragment(fragmentName),
    [fragment, ydoc, fragmentName],
  );

  const readyOnce = useRef(false);
  if (!readyOnce.current) {
    readyOnce.current = true;
    onFragmentReady?.(resolvedFragment, ydoc);
  }

  return (
    <div className={cn(className)}>
      <TiptapEditor
        fragment={resolvedFragment}
        ydoc={ydoc}
        provider={provider}
        user={user}
        editable={editable}
        placeholder={placeholder}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Bootstrap — component owns the Y.Doc + GatewayProvider + WS.
// ---------------------------------------------------------------------------

function BootstrappingEditor({
  gatewayUrl,
  docId,
  authToken,
  channel,
  user,
  fragmentName = DEFAULT_FRAGMENT_NAME,
  editable,
  placeholder,
  className,
  onFragmentReady,
  loadingSlot,
  requireSync,
}: StandaloneTiptapBootstrapProps) {
  const resolvedChannel = channel ?? `doc:${docId}`;

  // Fan-out registry — each useYjsDoc subscriber registers its handler here,
  // and the single useWebSocket onMessage broadcasts to all of them.
  const handlersRef = useRef<Set<(msg: GatewayMessage) => void>>(new Set());

  const subscribeMessages = useCallback(
    (handler: (msg: GatewayMessage) => void) => {
      handlersRef.current.add(handler);
      return () => {
        handlersRef.current.delete(handler);
      };
    },
    [],
  );

  const onWsMessage = useCallback((msg: GatewayMessage) => {
    handlersRef.current.forEach((h) => h(msg));
  }, []);

  const wsConfig = useMemo(
    () => ({
      wsUrl: gatewayUrl,
      cognitoToken: authToken,
      defaultChannel: resolvedChannel,
    }),
    [gatewayUrl, authToken, resolvedChannel],
  );

  const ws = useWebSocket({ config: wsConfig, onMessage: onWsMessage });

  const { ydoc, provider, synced } = useYjsDoc({
    documentId: docId,
    ws,
    onMessage: subscribeMessages,
  });

  const fragment = useMemo(
    () => (ydoc ? ydoc.getXmlFragment(fragmentName) : null),
    [ydoc, fragmentName],
  );

  const gateOnSync = requireSync === true;
  const ready = !!ydoc && !!fragment && (!gateOnSync || synced);

  const readyOnce = useRef(false);
  if (!readyOnce.current && ready && fragment && ydoc) {
    readyOnce.current = true;
    onFragmentReady?.(fragment, ydoc);
  }

  if (!ready) {
    return <div className={cn(className)}>{loadingSlot ?? null}</div>;
  }

  return (
    <div className={cn(className)}>
      <TiptapEditor
        fragment={fragment}
        ydoc={ydoc}
        provider={provider}
        user={user}
        editable={editable}
        placeholder={placeholder}
      />
    </div>
  );
}
