// ui-components/src/components/diagram/camera.ts
//
// Pure camera math for the board: what a camera shows, and the camera that
// keeps a scene rectangle in view. Excalidraw draws a scene point at
// (point + scroll) * zoom, so a canvas of width W at zoom z shows the scene
// from -scrollX to -scrollX + W / z.

export interface DiagramCamera {
    scrollX: number;
    scrollY: number;
    zoom: number;
}

export interface DiagramCanvasSize {
    width: number;
    height: number;
}

export interface DiagramSceneRect {
    x: number;
    y: number;
    width: number;
    height: number;
}

/** Excalidraw's own zoom bounds (MIN_ZOOM 0.1, MAX_ZOOM 30). */
export const DIAGRAM_ZOOM_FLOOR = 0.1;
export const DIAGRAM_ZOOM_CEILING = 30;

/** The scene rectangle a camera shows on a canvas of this size. */
export function visibleSceneArea(camera: DiagramCamera, canvas: DiagramCanvasSize): DiagramSceneRect {
    return {
        x: -camera.scrollX,
        y: -camera.scrollY,
        width: canvas.width / camera.zoom,
        height: canvas.height / camera.zoom,
    };
}

export interface ContainOptions {
    /** The preferred zoom: used when the rectangle fits at it. */
    zoom: number;
    /** Share of the canvas kept clear on each side when zooming out to fit. Default 0.05. */
    margin?: number;
    /** Never zoom out past this. Default Excalidraw's floor (0.1). */
    minZoom?: number;
    /**
     * When the rectangle cannot fit at `minZoom`: `'center'` (default) centres
     * it, `'start'` pins its top-left corner (with the margin) so the start of
     * a long region is what shows.
     */
    overflow?: 'center' | 'start';
}

/**
 * The camera that keeps `rect` in view on `canvas`: at the preferred zoom when
 * the rectangle fits there, else zoomed out until it fits with `margin` to
 * spare, never past `minZoom`. Centred, unless it still overflows and
 * `overflow` is `'start'`.
 */
export function cameraToContain(rect: DiagramSceneRect, canvas: DiagramCanvasSize, opts: ContainOptions): DiagramCamera {
    const margin = opts.margin ?? 0.05;
    const floor = Math.max(DIAGRAM_ZOOM_FLOOR, opts.minZoom ?? DIAGRAM_ZOOM_FLOOR);
    const room = { width: canvas.width * (1 - 2 * margin), height: canvas.height * (1 - 2 * margin) };
    const fits = Math.min(
        rect.width > 0 ? room.width / rect.width : Infinity,
        rect.height > 0 ? room.height / rect.height : Infinity,
    );
    const zoom = Math.min(DIAGRAM_ZOOM_CEILING, Math.max(floor, Math.min(opts.zoom, fits)));
    if (opts.overflow === 'start' && zoom > fits) {
        const padX = (canvas.width * margin) / zoom;
        const padY = (canvas.height * margin) / zoom;
        return { scrollX: padX - rect.x, scrollY: padY - rect.y, zoom };
    }
    const cx = rect.x + rect.width / 2;
    const cy = rect.y + rect.height / 2;
    return { scrollX: canvas.width / (2 * zoom) - cx, scrollY: canvas.height / (2 * zoom) - cy, zoom };
}

/** The bounding rectangle of some scene elements, or null when there are none. */
export function sceneBounds(
    elements: ReadonlyArray<{ x: number; y: number; width: number; height: number; isDeleted?: boolean }>,
): DiagramSceneRect | null {
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    for (const el of elements) {
        if (el.isDeleted) continue;
        // Lines and arrows can carry a negative width/height (drawn leftwards).
        const x0 = Math.min(el.x, el.x + el.width);
        const y0 = Math.min(el.y, el.y + el.height);
        const x1 = Math.max(el.x, el.x + el.width);
        const y1 = Math.max(el.y, el.y + el.height);
        minX = Math.min(minX, x0);
        minY = Math.min(minY, y0);
        maxX = Math.max(maxX, x1);
        maxY = Math.max(maxY, y1);
    }
    if (!Number.isFinite(minX)) return null;
    return { x: minX, y: minY, width: maxX - minX, height: maxY - minY };
}
