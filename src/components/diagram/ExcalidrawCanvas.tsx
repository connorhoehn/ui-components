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

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
import { DiagramPresenceBar } from './DiagramPresenceBar';
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
    followUserId = null,
    presenceActions,
}: ExcalidrawCanvasProps) {
    const hostRef = useRef<HTMLDivElement | null>(null);
    const theme = useResolvedTheme(hostRef);

    const apiRef = useRef<ExcalidrawAPI | null>(null);
    /** Last camera we published, so a drag does not publish every frame. */
    const lastViewportRef = useRef<{ scrollX: number; scrollY: number; zoom: number } | null>(null);
    /** True only while a followed peer's viewport is being written in. */
    const applyingFollowRef = useRef(false);
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

    const { ready, collaborators, participants, commitLocal, publishPresence, readAll } =
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
    // time.
    //
    // Both halves were then observed, in that order, in a real document:
    //
    //   attempt  api:true shared:5 scene:0   -> applied, scene:5 immediately
    //   attempt  api:true shared:5 scene:0   <- Excalidraw had replaced it
    //   attempt  api:true shared:5 scene:5   -> stuck; done
    //
    // The second line is the whole reason this loop cannot mark itself done
    // when it WRITES. Success is not "we called updateScene", it is "the
    // canvas still holds the scene on the next look" — so `hydratedRef` is set
    // only by the branch that OBSERVES elements already there, never by the
    // branch that puts them there.
    const hydratedRef = useRef(false);
    useEffect(() => {
        if (hydratedRef.current || !apiReady || !ready) return;

        let cancelled = false;
        let timer: ReturnType<typeof setTimeout> | null = null;

        const attempt = (delays: readonly number[]): void => {
            if (cancelled || hydratedRef.current) return;
            const api = apiRef.current;
            const shared = api ? readAll() : [];
            if (api && api.getSceneElementsIncludingDeleted().length > 0) {
                // Elements are on the canvas — either ours from a previous
                // attempt that stuck, or the user's, who started drawing before
                // the snapshot arrived. Either way there is nothing to hydrate
                // and nothing may be overwritten.
                hydratedRef.current = true;
                return;
            }
            if (api && shared.length > 0) {
                api.updateScene({
                    elements: shared as unknown as readonly AnyElement[],
                    // Loading the existing scene is not the local user's undo
                    // history — pressing undo must not erase everyone's work.
                    captureUpdate: CaptureUpdateAction.NEVER,
                });
                // Deliberately NOT marked done. The next pass is what decides.
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
            appState: {
                selectedElementIds?: Record<string, boolean>;
                scrollX?: number;
                scrollY?: number;
                zoom?: { value: number };
            },
        ) => {
            // Published ABOVE the `editable` gate: a viewer's camera is not an
            // edit, and someone walking a read-only board through a review is
            // exactly who others want to follow.
            //
            // Skipped while we are applying someone else's viewport — that
            // write comes back through onChange, and re-publishing it would
            // make two people following each other chase one another around
            // the board forever.
            if (!applyingFollowRef.current) {
                const next = {
                    scrollX: appState.scrollX ?? 0,
                    scrollY: appState.scrollY ?? 0,
                    zoom: appState.zoom?.value ?? 1,
                };
                const prev = lastViewportRef.current;
                // Sub-pixel scroll deltas arrive on almost every frame of a
                // drag; publishing them all would spend the presence budget on
                // movement nobody can see.
                const moved =
                    !prev ||
                    Math.abs(prev.scrollX - next.scrollX) > 0.5 ||
                    Math.abs(prev.scrollY - next.scrollY) > 0.5 ||
                    prev.zoom !== next.zoom;
                if (moved) {
                    lastViewportRef.current = next;
                    publishPresence({ viewport: next });
                }
            }

            if (!editable) return;
            commitLocal(elements as unknown as readonly DiagramElement[]);
            // Selection rides the same presence record as the pointer rather
            // than a channel of its own — it changes on the same gestures, and
            // the awareness budget is shared with the document editor's carets.
            //
            // This is a PATCH: the hook merges it over the last published
            // record, so publishing a selection here no longer erases the
            // pointer that `handlePointerUpdate` published a few milliseconds
            // ago. When both wrote whole records they alternated at pointer
            // rate and each destroyed the other's field.
            publishPresence({ selectedElementIds: appState.selectedElementIds });
            onSceneChange?.(elements.length);
        },
        [commitLocal, publishPresence, editable, onSceneChange],
    );

    const handlePointerUpdate = useCallback(
        (payload: {
            pointer: { x: number; y: number; tool: 'pointer' | 'laser' };
            button: 'down' | 'up';
        }) => {
            publishPresence({ pointer: payload.pointer, button: payload.button });
        },
        [publishPresence],
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

    // ---- Follow mode ------------------------------------------------------
    //
    // Matched on `userId` first so following survives the peer reconnecting on
    // a new socket, which mints a new clientId and would otherwise silently
    // drop the follow.
    const followed = useMemo(() => {
        if (!followUserId) return null;
        return (
            participants.find(
                (p) => !p.isSelf && (p.userId === followUserId || p.clientId === followUserId),
            ) ?? null
        );
    }, [followUserId, participants]);

    const fx = followed?.viewport?.scrollX;
    const fy = followed?.viewport?.scrollY;
    const fz = followed?.viewport?.zoom;

    useEffect(() => {
        const api = apiRef.current;
        if (!api || fx === undefined || fy === undefined || fz === undefined) return;

        applyingFollowRef.current = true;
        api.updateScene({
            appState: { scrollX: fx, scrollY: fy, zoom: { value: fz } },
            // Being carried somewhere is not something the follower should be
            // able to undo — their history is their own edits.
            captureUpdate: CaptureUpdateAction.NEVER,
        });
        // Cleared after onChange has drained, so the echo of our own write is
        // the thing being suppressed and not the user's next real gesture.
        const id = setTimeout(() => {
            applyingFollowRef.current = false;
        }, 0);
        return () => clearTimeout(id);
    }, [fx, fy, fz, apiReady]);

    return (
        <div
            ref={hostRef}
            data-testid="excalidraw-canvas"
            className={cn('relative h-full w-full', className)}
        >
            {/* Right rail, BELOW Excalidraw's own top island.
                Excalidraw owns the top-left (main menu), the top-centre
                (toolbar) and — when `isCollaborating` — a small avatar row at
                the top-right of that island. Sitting at `top-2` put this strip
                immediately beside that row, so a remote person appeared twice
                in two different colours about fifteen pixels apart. Dropping
                below the island reads as a separate roster, which is what it
                is. `z-[5]` clears the canvas layers without reaching the modal
                stack, and pointer-events-none on the wrapper means the strip
                never eats a drag that starts underneath it. */}
            <div className="pointer-events-none absolute right-2 top-20 z-[5] flex justify-end">
                <DiagramPresenceBar participants={participants} actions={presenceActions} followingUserId={followUserId} />
            </div>

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
