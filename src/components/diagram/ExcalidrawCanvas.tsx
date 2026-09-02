// ui-components/src/components/diagram/ExcalidrawCanvas.tsx
//
// The chunk boundary. This is the ONLY module in the library that statically
// imports `@excalidraw/excalidraw`, so `React.lazy(() => import(...))` in
// CollaborativeExcalidraw splits ~1.9MB of editor out of every page that has
// no diagram on it. Do not import this file directly from a barrel.
//
// Everything collaborative is delegated to `useCollaborativeDiagram` from
// realtime-modules. This file is the glue between that hook and Excalidraw's
// imperative API, and nothing more.

import { useCallback, useEffect, useRef, useState } from 'react';
import {
    Excalidraw,
    reconcileElements,
    CaptureUpdateAction,
} from '@excalidraw/excalidraw';
import '@excalidraw/excalidraw/index.css';
import { useCollaborativeDiagram } from '@connorhoehn/realtime-modules/adapters/excalidraw';
import type { DiagramElement } from '@connorhoehn/realtime-modules/adapters/excalidraw';
import { cn } from '../../lib/cn';
import { useResolvedTheme } from './useResolvedTheme';
import type { ExcalidrawCanvasProps } from './types';

/**
 * Excalidraw's public types are deliberately branded (`OrderedExcalidrawElement`,
 * `RemoteExcalidrawElement`, `SocketId`) to stop callers hand-rolling scenes.
 * The binding speaks plain JSON on purpose — that is what keeps
 * realtime-modules free of an Excalidraw dependency — so the two type systems
 * meet here, in one file, behind these aliases.
 */
type AnyElement = Parameters<typeof reconcileElements>[0][number];
type ExcalidrawAPI = {
    updateScene: (data: Record<string, unknown>) => void;
    getSceneElementsIncludingDeleted: () => readonly AnyElement[];
    getAppState: () => Record<string, unknown>;
    scrollToContent: (target?: unknown, opts?: Record<string, unknown>) => void;
};

export default function ExcalidrawCanvas({
    ydoc,
    awareness,
    blockId,
    user,
    editable = true,
    className,
    assetPath,
    onSceneChange,
}: ExcalidrawCanvasProps) {
    const hostRef = useRef<HTMLDivElement | null>(null);
    const theme = useResolvedTheme(hostRef);

    const apiRef = useRef<ExcalidrawAPI | null>(null);
    const [apiReady, setApiReady] = useState(false);

    // Excalidraw resolves its hand-drawn fonts against this global. Left
    // unset it falls back to a public CDN, which is both a network dependency
    // and offline-fragile; hosts that have copied the font files into their
    // own static dir pass `assetPath` and stay entirely local.
    useEffect(() => {
        if (!assetPath || typeof window === 'undefined') return;
        (window as unknown as Record<string, unknown>).EXCALIDRAW_ASSET_PATH = assetPath;
    }, [assetPath]);

    // ---- Remote → canvas ---------------------------------------------------
    // `reconcileElements` is Excalidraw's OWN merge function — the same one its
    // hosted collaboration uses. Reusing it means our remote-apply step has
    // exactly Excalidraw's semantics for version/versionNonce tie-breaks, and
    // in particular it preserves whatever the local user is dragging right now
    // instead of yanking the shape out from under their cursor.
    const applyRemote = useCallback((elements: DiagramElement[]) => {
        const api = apiRef.current;
        if (!api) return;
        const reconciled = reconcileElements(
            api.getSceneElementsIncludingDeleted(),
            elements as unknown as Parameters<typeof reconcileElements>[1],
            api.getAppState() as unknown as Parameters<typeof reconcileElements>[2],
        );
        api.updateScene({
            elements: reconciled,
            // Remote edits are not the local user's undo history.
            captureUpdate: CaptureUpdateAction.NEVER,
        });
    }, []);

    const { ready, collaborators, commitLocal, publishPointer, readAll } =
        useCollaborativeDiagram({
            // `as never`: in this monorepo both ui-components and
            // realtime-modules resolve their own copy of `yjs`, so TS sees two
            // structurally-identical-but-nominally-distinct `Y.Doc` types. The
            // consuming app has exactly one copy and the cast is a no-op there.
            ydoc: ydoc as never,
            awareness,
            blockId,
            user,
            onRemoteElements: applyRemote,
        });

    // ---- Hydrate the canvas from the shared scene --------------------------
    //
    // ## Why this retries instead of running once
    //
    // This used to be a single attempt behind a `hydratedRef`, and it lost the
    // whole scene on a cold open. Two things have to line up and neither is
    // ordered with respect to the other:
    //
    //   * the shared scene arrives when the server's snapshot lands, which is
    //     some milliseconds after the provider hands over its (empty) Y.Doc;
    //   * `<Excalidraw>` initialises its OWN empty scene while it mounts, and
    //     the `excalidrawAPI` callback fires in the middle of that — so an
    //     `updateScene` issued on the very first tick can be overwritten by
    //     the initialisation that is still finishing.
    //
    // The single attempt burned its one chance in both directions: an early
    // read returned nothing and set the flag forever, and a read that DID
    // return elements could still be clobbered a frame later. After that only
    // a further remote CHANGE could repair it, and a document whose diagram was
    // already complete never produces one — so it stayed blank through every
    // reload, while the elements sat in the Y.Doc and on the server the whole
    // time. Verified in the browser: `readAll()` returned four elements from
    // the live document's own snapshot while zoom-to-fit found nothing to
    // frame.
    //
    // So the condition is stated as the invariant it actually is — *the canvas
    // must show what the shared scene holds* — and re-checked on a bounded
    // backoff until it does. It stops at the first success, and every attempt
    // is a cheap array-length comparison.
    const hydratedRef = useRef(false);
    useEffect(() => {
        if (hydratedRef.current || !apiReady || !ready) return;

        let cancelled = false;
        let timer: ReturnType<typeof setTimeout> | null = null;

        const attempt = (delays: readonly number[]): void => {
            if (cancelled || hydratedRef.current) return;
            const api = apiRef.current;
            const shared = api ? readAll() : [];
            if (
                api &&
                shared.length > 0 &&
                api.getSceneElementsIncludingDeleted().length === 0
            ) {
                hydratedRef.current = true;
                api.updateScene({
                    elements: shared as unknown as readonly AnyElement[],
                    // Loading the existing scene is not the local user's undo
                    // history — pressing undo must not erase everyone's work.
                    captureUpdate: CaptureUpdateAction.NEVER,
                });
                return;
            }
            // A canvas that already has elements needs no hydration; treat that
            // as done rather than retrying against a scene the user is drawing.
            if (api && api.getSceneElementsIncludingDeleted().length > 0) {
                hydratedRef.current = true;
                return;
            }
            const [next, ...rest] = delays;
            if (next === undefined) return;
            timer = setTimeout(() => attempt(rest), next);
        };

        // Ends at ~5s. Past that the snapshot is not coming, and the observer
        // is the right path for anything that arrives later.
        attempt([0, 60, 150, 300, 600, 1000, 1500, 1500]);

        return () => {
            cancelled = true;
            if (timer) clearTimeout(timer);
        };
    }, [apiReady, ready, readAll]);

    // ---- Canvas → shared doc ----------------------------------------------
    const handleChange = useCallback(
        (
            elements: readonly AnyElement[],
            appState: { selectedElementIds?: Record<string, boolean> },
        ) => {
            if (!editable) return;
            commitLocal(elements as unknown as readonly DiagramElement[]);
            // Selection rides the pointer frame rather than its own — it
            // changes on the same gestures and the awareness budget is shared
            // with the document editor's carets.
            publishPointer({ selectedElementIds: appState.selectedElementIds });
            onSceneChange?.(elements.length);
        },
        [commitLocal, publishPointer, editable, onSceneChange],
    );

    const handlePointerUpdate = useCallback(
        (payload: {
            pointer: { x: number; y: number; tool: 'pointer' | 'laser' };
            button: 'down' | 'up';
        }) => {
            publishPointer({ pointer: payload.pointer, button: payload.button });
        },
        [publishPointer],
    );

    // ---- Peers → Excalidraw's native collaborator cursors ------------------
    // Excalidraw renders remote pointers and name tags itself given this map,
    // so there is no second cursor overlay to build or keep in sync. Note the
    // map goes through `updateScene`, NOT through a prop — `collaborators` is
    // part of SceneData, and passing it as a prop silently does nothing.
    useEffect(() => {
        const api = apiRef.current;
        if (!api) return;
        const collabMap = new Map<string, unknown>();
        for (const c of collaborators) {
            collabMap.set(c.clientId, {
                username: c.displayName,
                pointer: c.pointer,
                button: c.button,
                selectedElementIds: c.selectedElementIds,
                color: { background: c.color, stroke: c.color },
                id: c.userId ?? c.clientId,
            });
        }
        api.updateScene({ collaborators: collabMap });
    }, [collaborators, apiReady]);

    return (
        <div
            ref={hostRef}
            data-testid="excalidraw-canvas"
            className={cn('h-full w-full', className)}
        >
            <Excalidraw
                theme={theme}
                viewModeEnabled={!editable}
                isCollaborating
                excalidrawAPI={(api) => {
                    apiRef.current = api as unknown as ExcalidrawAPI;
                    setApiReady(true);
                }}
                onChange={handleChange as never}
                onPointerUpdate={handlePointerUpdate}
                UIOptions={{ canvasActions: { toggleTheme: false } }}
            />
        </div>
    );
}
