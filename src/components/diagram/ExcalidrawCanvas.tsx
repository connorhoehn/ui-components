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

    // ---- Hydrate once the API and the shared doc both exist ----------------
    const hydratedRef = useRef(false);
    useEffect(() => {
        if (hydratedRef.current || !apiReady || !ready) return;
        const api = apiRef.current;
        if (!api) return;
        hydratedRef.current = true;
        const existing = readAll();
        if (existing.length > 0) {
            api.updateScene({
                elements: existing as unknown as readonly AnyElement[],
                captureUpdate: CaptureUpdateAction.NEVER,
            });
        }
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
