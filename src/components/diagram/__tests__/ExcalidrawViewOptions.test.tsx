import { vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import type { ReactNode } from 'react';

// The board's view options: follow-contain, the opening fit, the person's own
// camera input, and where Excalidraw's help "?" sits.

const updateScene = vi.fn();
let appState: Record<string, unknown> = {};
let sceneElements: Array<Record<string, unknown>> = [];
let onChange: ((els: unknown[], state: Record<string, unknown>) => void) | undefined;

vi.mock('@excalidraw/excalidraw', () => ({
    Excalidraw: ({
        excalidrawAPI,
        onChange: change,
        children,
    }: {
        excalidrawAPI?: (api: unknown) => void;
        onChange?: typeof onChange;
        children?: ReactNode;
    }) => {
        onChange = change;
        excalidrawAPI?.({
            updateScene,
            getSceneElementsIncludingDeleted: () => sceneElements,
            getAppState: () => appState,
            scrollToContent: () => {},
        });
        return <div data-testid="excalidraw">{children}</div>;
    },
    Footer: ({ children }: { children?: ReactNode }) => <div data-testid="excalidraw-footer">{children}</div>,
    reconcileElements: (els: unknown) => els,
    CaptureUpdateAction: { NEVER: 'never' },
}));

vi.mock('@excalidraw/excalidraw/index.css', () => ({}));

let participants: Array<Record<string, unknown>> = [];
const publishPresence = vi.fn();

vi.mock('@connorhoehn/realtime-modules/adapters/excalidraw', () => ({
    useCollaborativeDiagram: () => ({
        binding: {},
        ready: true,
        collaborators: [],
        participants,
        commitLocal: vi.fn(),
        publishPresence,
        readAll: () => sceneElements,
    }),
}));

vi.mock('../DiagramPresenceBar', () => ({
    DiagramPresenceBar: () => null as ReactNode,
}));

const { default: ExcalidrawCanvas } = await import('../ExcalidrawCanvas');
type Props = Parameters<typeof ExcalidrawCanvas>[0];

function renderCanvas(props: Partial<Props> = {}) {
    return render(
        <ExcalidrawCanvas ydoc={{} as never} awareness={null} user={{ displayName: 'Al', color: '#00f' }} {...props} />,
    );
}

function cameraWrites() {
    return updateScene.mock.calls
        .map(([arg]) => (arg as { appState?: Record<string, unknown> })?.appState)
        .filter((s): s is { scrollX: number; scrollY: number; zoom: { value: number } } => !!s && 'scrollX' in s);
}

beforeEach(() => {
    updateScene.mockClear();
    publishPresence.mockClear();
    appState = { width: 1188, height: 498 };
    sceneElements = [];
    participants = [];
});

describe('followFit', () => {
    const lead = {
        clientId: '7',
        userId: 'cand',
        displayName: 'Cand',
        color: '#f00',
        viewport: { scrollX: 46, scrollY: 114, zoom: 0.7, width: 1280, height: 600 },
    };

    it('contain zooms out so the whole followed view fits', () => {
        participants = [lead];
        renderCanvas({ followUserId: 'cand', followFit: 'contain' });
        const last = cameraWrites().at(-1)!;
        expect(last.zoom.value).toBeLessThan(0.7);
        // Their right edge (scene x = -46 + 1280 / 0.7) is on this canvas.
        expect(-last.scrollX + 1188 / last.zoom.value).toBeGreaterThanOrEqual(-46 + 1280 / 0.7 - 0.01);
    });

    it('mirrors a peer that publishes no canvas size', () => {
        participants = [{ ...lead, viewport: { scrollX: 46, scrollY: 114, zoom: 0.7 } }];
        renderCanvas({ followUserId: 'cand', followFit: 'contain' });
        expect(cameraWrites()).toContainEqual({ scrollX: 46, scrollY: 114, zoom: { value: 0.7 } });
    });

    it('publishes this canvas size with its camera', () => {
        renderCanvas();
        act(() => onChange?.([], { scrollX: 1, scrollY: 2, zoom: { value: 1 }, width: 800, height: 400 }));
        expect(publishPresence).toHaveBeenCalledWith({
            viewport: { scrollX: 1, scrollY: 2, zoom: 1, width: 800, height: 400 },
        });
    });
});

describe('onViewportInput', () => {
    it('fires for the person’s own pan, not for the first report', () => {
        const onViewportInput = vi.fn();
        renderCanvas({ onViewportInput });
        act(() => onChange?.([], { scrollX: 0, scrollY: 0, zoom: { value: 1 } }));
        expect(onViewportInput).not.toHaveBeenCalled();
        act(() => onChange?.([], { scrollX: 80, scrollY: 0, zoom: { value: 1 } }));
        expect(onViewportInput).toHaveBeenCalledTimes(1);
    });
});

describe('fitOnOpen', () => {
    it('fits the scene once it has elements', async () => {
        sceneElements = [{ id: 'a', x: 0, y: 0, width: 100, height: 100 }];
        renderCanvas({ fitOnOpen: true });
        await act(async () => {});
        expect(cameraWrites()).toContainEqual({ scrollX: 544, scrollY: 199, zoom: { value: 1 } });
    });

    it('opens on a region’s top-left at a readable floor', async () => {
        sceneElements = [
            { id: 'mt-a-1', x: 200, y: 300, width: 4000, height: 3000 },
            { id: 'other', x: 9000, y: 9000, width: 10, height: 10 },
        ];
        renderCanvas({ fitOnOpen: { elementIdPrefix: 'mt-a-', minZoom: 0.6, margin: 0 } });
        await act(async () => {});
        expect(cameraWrites()).toContainEqual({ scrollX: -200, scrollY: -300, zoom: { value: 0.6 } });
    });

    it('does nothing when off', async () => {
        sceneElements = [{ id: 'a', x: 0, y: 0, width: 100, height: 100 }];
        renderCanvas();
        await act(async () => {});
        expect(cameraWrites()).toEqual([]);
    });
});

describe('helpButton', () => {
    it('leaves Excalidraw’s corner button alone by default', () => {
        renderCanvas();
        expect(screen.getByTestId('excalidraw-canvas').className).not.toContain('help-icon');
        expect(screen.queryByTestId('excalidraw-footer')).toBeNull();
    });

    it('hides it with a rule scoped to this canvas', () => {
        renderCanvas({ helpButton: 'hidden' });
        expect(screen.getByTestId('excalidraw-canvas').className).toContain('[&_.help-icon:not([data-ui-help])]:hidden!');
        expect(screen.queryByRole('button', { name: 'Help' })).toBeNull();
    });

    it('moves it into the footer, where it opens the help dialog', () => {
        renderCanvas({ helpButton: 'start' });
        fireEvent.click(screen.getByRole('button', { name: 'Help' }));
        expect(updateScene).toHaveBeenCalledWith({ appState: { openDialog: { name: 'help' } } });
    });
});
