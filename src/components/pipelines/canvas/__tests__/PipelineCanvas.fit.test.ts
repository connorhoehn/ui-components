// Guards the viewport-fit configuration on PipelineCanvas.
//
// React Flow's default `minZoom` is 0.5, and `fitView` will not zoom out past
// the flow's minZoom. The canvas is a `flex-1` column between the palette and
// the config panel — a few hundred pixels wide — while a real pipeline is
// several thousand flow-units across. So the fit silently CLAMPS at 0.5
// instead of fitting, and since the ReactFlow root is `overflow: hidden`, the
// part of the graph that does not fit is clipped away with no scrollbar and no
// indication anything is missing. The seeded 12-node demo lost half its nodes
// this way and read as a broken editor.
//
// A DOM test cannot catch this: jsdom reports every element as 0x0, so
// `fitView` has no geometry to clamp and the bug does not reproduce. The
// browser-level assertion lives in tests/e2e/pipeline-demo.spec.ts ("fits the
// whole graph inside the canvas"). What is checked here is the configuration
// that makes the fit achievable at all, since that is what silently regresses
// if someone drops the props.

import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const source = readFileSync(
  join(__dirname, '..', 'PipelineCanvas.tsx'),
  'utf8',
);

describe('PipelineCanvas viewport fit', () => {
  it('lowers minZoom below React Flow’s 0.5 default', () => {
    const match = source.match(/const MIN_ZOOM = ([\d.]+);/);
    expect(match, 'MIN_ZOOM constant should exist').not.toBeNull();
    expect(Number(match![1])).toBeLessThan(0.5);
  });

  it('passes minZoom to ReactFlow so fitView is allowed to reach it', () => {
    // fitViewOptions alone is not enough — the flow clamps to its own minZoom.
    expect(source).toMatch(/minZoom=\{MIN_ZOOM\}/);
  });

  it('passes the same floor through fitViewOptions', () => {
    expect(source).toMatch(/fitViewOptions=\{FIT_VIEW_OPTIONS\}/);
    expect(source).toMatch(/FIT_VIEW_OPTIONS = \{[^}]*minZoom: MIN_ZOOM/);
  });

  it('refits on container resize, and only while the user has not panned', () => {
    // The canvas is resized by the config pane and palette opening/closing.
    // `fitView` as a prop only runs on init, so without this the viewport keeps
    // a fit computed for a width that no longer exists.
    expect(source).toContain('ResizeObserver');
    expect(source).toMatch(/if \(userMovedViewportRef\.current\) return;\s*\n\s*fitView\(FIT_VIEW_OPTIONS\);/);
    // A non-null event means the move came from the user, not from us.
    expect(source).toMatch(/onMoveStart=\{handleMoveStart\}/);
  });
});
