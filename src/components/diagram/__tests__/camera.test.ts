import { cameraToContain, sceneBounds, visibleSceneArea } from '../camera';

describe('diagram camera maths', () => {
    it('reads the scene area a camera shows', () => {
        expect(visibleSceneArea({ scrollX: 46, scrollY: 114, zoom: 0.5 }, { width: 1000, height: 500 })).toEqual({
            x: -46,
            y: -114,
            width: 2000,
            height: 1000,
        });
    });

    it('keeps the preferred zoom when the rectangle fits, centred', () => {
        const cam = cameraToContain({ x: 0, y: 0, width: 100, height: 100 }, { width: 1000, height: 1000 }, { zoom: 1 });
        expect(cam).toEqual({ scrollX: 450, scrollY: 450, zoom: 1 });
    });

    // The room's numbers: a 1188x498 lead canvas following a 1280x600 one at 0.7.
    it('zooms out until a larger followed view fits whole', () => {
        const theirs = visibleSceneArea({ scrollX: 46, scrollY: 114, zoom: 0.7 }, { width: 1280, height: 600 });
        const cam = cameraToContain(theirs, { width: 1188, height: 498 }, { zoom: 0.7, margin: 0 });
        expect(cam.zoom).toBeLessThan(0.7);
        const mine = visibleSceneArea(cam, { width: 1188, height: 498 });
        expect(mine.x).toBeLessThanOrEqual(theirs.x + 0.001);
        expect(mine.y).toBeLessThanOrEqual(theirs.y + 0.001);
        expect(mine.x + mine.width).toBeGreaterThanOrEqual(theirs.x + theirs.width - 0.001);
        expect(mine.y + mine.height).toBeGreaterThanOrEqual(theirs.y + theirs.height - 0.001);
    });

    it('holds a readable floor and pins the start of a region too big for it', () => {
        const cam = cameraToContain(
            { x: 200, y: 300, width: 4000, height: 3000 },
            { width: 1000, height: 500 },
            { zoom: 1, minZoom: 0.6, margin: 0, overflow: 'start' },
        );
        expect(cam).toEqual({ scrollX: -200, scrollY: -300, zoom: 0.6 });
    });

    it('bounds elements, skipping deleted ones and handling leftward lines', () => {
        expect(
            sceneBounds([
                { x: 10, y: 10, width: 20, height: 20 },
                { x: 100, y: 50, width: -40, height: 10 },
                { x: -999, y: -999, width: 1, height: 1, isDeleted: true },
            ]),
        ).toEqual({ x: 10, y: 10, width: 90, height: 50 });
        expect(sceneBounds([])).toBeNull();
    });
});
