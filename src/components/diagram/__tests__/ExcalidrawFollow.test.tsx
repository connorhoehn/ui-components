import { vi } from 'vitest';
import { render, act } from '@testing-library/react';
import type { ReactNode } from 'react';

// Follow mode on a BOARD.
//
// Following on a page means scrolling to a section. A diagram has neither
// sections nor scroll — only a viewport — so the same control has to mean
// "match their scroll and zoom" here, or the button does nothing at all and
// says nothing about it.

const updateScene = vi.fn();

vi.mock('@excalidraw/excalidraw', () => ({
    // Hands the API back the way the real component does, then renders nothing.
    Excalidraw: ({ excalidrawAPI }: { excalidrawAPI?: (api: unknown) => void }) => {
        excalidrawAPI?.({
            updateScene,
            getSceneElementsIncludingDeleted: () => [],
            getAppState: () => ({}),
            scrollToContent: () => {},
        });
        return null;
    },
    reconcileElements: (els: unknown) => els,
    CaptureUpdateAction: { NEVER: 'never' },
}));

vi.mock('@excalidraw/excalidraw/index.css', () => ({}));

let participants: Array<Record<string, unknown>> = [];

vi.mock('@connorhoehn/realtime-modules/adapters/excalidraw', () => ({
    useCollaborativeDiagram: () => ({
        binding: {},
        ready: true,
        collaborators: [],
        participants,
        commitLocal: vi.fn(),
        publishPresence: vi.fn(),
        readAll: () => [],
    }),
}));

vi.mock('../DiagramPresenceBar', () => ({
    DiagramPresenceBar: () => null as ReactNode,
}));

const { default: ExcalidrawCanvas } = await import('../ExcalidrawCanvas');

function peer(over: Record<string, unknown> = {}) {
    return {
        clientId: '7',
        userId: 'user-b',
        displayName: 'Bea',
        color: '#f00',
        viewport: { scrollX: -400, scrollY: -250, zoom: 2 },
        ...over,
    };
}

/** Only the viewport half of an updateScene call. */
function viewportWrites() {
    return updateScene.mock.calls
        .map(([arg]) => (arg as { appState?: Record<string, unknown> })?.appState)
        .filter((s): s is Record<string, unknown> => !!s && 'scrollX' in s);
}

function renderCanvas(followUserId: string | null) {
    return render(
        <ExcalidrawCanvas
            ydoc={{} as never}
            awareness={null}
            user={{ displayName: 'Al', color: '#00f' }}
            followUserId={followUserId}
        />,
    );
}

describe('ExcalidrawCanvas — following a peer moves the camera', () => {
    beforeEach(() => {
        updateScene.mockClear();
        participants = [peer()];
    });

    it('applies the followed peer’s scroll and zoom', () => {
        renderCanvas('user-b');
        expect(viewportWrites()).toContainEqual({
            scrollX: -400,
            scrollY: -250,
            zoom: { value: 2 },
        });
    });

    it('leaves the viewport alone when following nobody', () => {
        renderCanvas(null);
        expect(viewportWrites()).toEqual([]);
    });

    // A peer who reconnects gets a new awareness clientId. Matching on that
    // alone would drop the follow the first time their socket blipped.
    it('follows by stable userId across a new clientId', () => {
        participants = [peer({ clientId: '999' })];
        renderCanvas('user-b');
        expect(viewportWrites()).toContainEqual({
            scrollX: -400,
            scrollY: -250,
            zoom: { value: 2 },
        });
    });

    it('never follows yourself', () => {
        participants = [peer({ isSelf: true })];
        renderCanvas('user-b');
        expect(viewportWrites()).toEqual([]);
    });

    it('does nothing until the peer has published a viewport', () => {
        participants = [peer({ viewport: undefined })];
        renderCanvas('user-b');
        expect(viewportWrites()).toEqual([]);
    });

    it('tracks the peer as they keep moving', () => {
        const { rerender } = renderCanvas('user-b');
        updateScene.mockClear();

        act(() => {
            participants = [peer({ viewport: { scrollX: -10, scrollY: -20, zoom: 1 } })];
        });
        rerender(
            <ExcalidrawCanvas
                ydoc={{} as never}
                awareness={null}
                user={{ displayName: 'Al', color: '#00f' }}
                followUserId="user-b"
            />,
        );

        expect(viewportWrites()).toContainEqual({
            scrollX: -10,
            scrollY: -20,
            zoom: { value: 1 },
        });
    });
});
