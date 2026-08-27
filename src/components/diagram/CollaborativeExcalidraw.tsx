// ui-components/src/components/diagram/CollaborativeExcalidraw.tsx
//
// A collaborative Excalidraw canvas that absorbs its own setup.
//
// Two modes, mirroring StandaloneTiptap so the two collaborative surfaces in
// this library have the same shape:
//
//   1. Bootstrap — pass { gatewayUrl, diagramId, authToken } and the component
//      builds the WebSocket, the Y.Doc and the provider itself.
//   2. Hosted    — pass { ydoc, awareness } and it binds into a document the
//      caller already owns. This is the mode a page/canvas host uses to embed
//      a diagram as ONE BLOCK among many on a shared page.
//
// Handing a caller a bare canvas and telling them to wire a provider stack is
// the thing this component exists to prevent.
//
// ---------------------------------------------------------------------------
// Bundle
// ---------------------------------------------------------------------------
// Excalidraw is ~1.9MB of JavaScript. It is behind React.lazy so that only a
// page which actually renders a diagram pays for it; every other route in the
// host app is byte-for-byte unchanged. `@excalidraw/excalidraw` is an OPTIONAL
// peer dependency and is externalised from this library's bundle — an app that
// never draws never installs it, and the friendly error below is what it sees
// if it renders this component anyway.

import { Suspense, lazy, useCallback, useMemo, useRef } from 'react';
import { useWebSocket } from '../../hooks/useWebSocket';
import { useYjsDoc } from '../../hooks/useYjsDoc';
import type { GatewayMessage } from '../../types/gateway';
import { cn } from '../../lib/cn';
import type {
    CollaborativeExcalidrawProps,
    CollaborativeExcalidrawBootstrapProps,
    CollaborativeExcalidrawHostedProps,
} from './types';

// The one lazy boundary. Everything Excalidraw lives on the far side of it.
const ExcalidrawCanvas = lazy(() => import('./ExcalidrawCanvas'));

function CanvasFallback({ label }: { label: string }) {
    return (
        <div
            data-testid="diagram-loading"
            className="flex h-full min-h-40 w-full items-center justify-center rounded-md border border-border bg-surface-inset text-[13px] text-neutral"
        >
            {label}
        </div>
    );
}

function isHosted(
    p: CollaborativeExcalidrawProps,
): p is CollaborativeExcalidrawHostedProps {
    return (p as CollaborativeExcalidrawHostedProps).ydoc !== undefined;
}

export default function CollaborativeExcalidraw(props: CollaborativeExcalidrawProps) {
    return isHosted(props) ? <HostedDiagram {...props} /> : <BootstrappedDiagram {...props} />;
}

// ---------------------------------------------------------------------------
// Hosted — the page owns the Y.Doc; we are a namespaced subtree of it.
// ---------------------------------------------------------------------------

function HostedDiagram({
    ydoc,
    awareness,
    className,
    ...rest
}: CollaborativeExcalidrawHostedProps) {
    return (
        <div className={cn('h-full w-full', className)}>
            <Suspense fallback={<CanvasFallback label="Loading diagram editor…" />}>
                <ExcalidrawCanvas ydoc={ydoc} awareness={awareness ?? null} {...rest} />
            </Suspense>
        </div>
    );
}

// ---------------------------------------------------------------------------
// Bootstrap — we own the socket, the Y.Doc and the provider.
// ---------------------------------------------------------------------------

function BootstrappedDiagram({
    gatewayUrl,
    diagramId,
    authToken,
    requireSync,
    loadingSlot,
    className,
    ...rest
}: CollaborativeExcalidrawBootstrapProps) {
    // Fan-out registry — useYjsDoc registers its handler here and the single
    // useWebSocket onMessage broadcasts to it. Same shape as StandaloneTiptap;
    // it exists so a future second consumer of this socket can join without
    // opening a second connection.
    const handlersRef = useRef<Set<(msg: GatewayMessage) => void>>(new Set());

    const subscribeMessages = useCallback((handler: (msg: GatewayMessage) => void) => {
        handlersRef.current.add(handler);
        return () => {
            handlersRef.current.delete(handler);
        };
    }, []);

    const onWsMessage = useCallback((msg: GatewayMessage) => {
        handlersRef.current.forEach((h) => h(msg));
    }, []);

    const wsConfig = useMemo(
        () => ({
            wsUrl: gatewayUrl,
            cognitoToken: authToken,
            // `doc:` is deliberate, not incidental. That prefix is what gets a
            // channel owner-routing across gateway nodes, server-side presence
            // and the existing authz interceptor. A bespoke `diagram:` prefix
            // would silently lose all three.
            defaultChannel: `doc:${diagramId}`,
        }),
        [gatewayUrl, authToken, diagramId],
    );

    const ws = useWebSocket({ config: wsConfig, onMessage: onWsMessage });

    const { ydoc, provider, synced } = useYjsDoc({
        documentId: diagramId,
        ws,
        onMessage: subscribeMessages,
    });

    const ready = !!ydoc && (requireSync !== true || synced);

    if (!ready) {
        return (
            <div className={cn('h-full w-full', className)}>
                {loadingSlot ?? <CanvasFallback label="Connecting…" />}
            </div>
        );
    }

    return (
        <div className={cn('h-full w-full', className)}>
            <Suspense fallback={<CanvasFallback label="Loading diagram editor…" />}>
                <ExcalidrawCanvas
                    ydoc={ydoc}
                    awareness={(provider?.awareness ?? null) as never}
                    {...rest}
                />
            </Suspense>
        </div>
    );
}
