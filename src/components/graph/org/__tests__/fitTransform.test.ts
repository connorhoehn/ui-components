import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  fitTransform, orgGraphBounds, orgLabelWidth, reserveCorner, ORG_CONTROLS_SIZE, ORG_FIT_ALL_MIN_ZOOM, ORG_FIT_MIN_ZOOM,
  nodesUnderOverlays, orgGraphViewport, orgNodeBoxes, orgOverlayRects, toScreen,
} from '../fitTransform';
import { createOrgSimulation, ORG_LABEL_BAND } from '../useForceLayout';
import { ORG_LEGEND_INSET } from '../OrgGraphLegend';
import type { GraphDepartment, GraphPerson, GraphRelationship } from '../types';

const size = { width: 1000, height: 500 };

describe('fitTransform', () => {
  it('centres the box and scales to the binding axis within the padding', () => {
    // 400 × 100 box; available 920 × 420 → x allows 2.3, y 4.2 → 2.3, but capped at 3.
    const t = fitTransform({ minX: 100, minY: 50, maxX: 500, maxY: 150 }, size, 40, 3);
    expect(t.scale).toBeCloseTo(2.3);
    // The box centre (300, 100) lands on the canvas centre (500, 250).
    expect(300 * t.scale + t.x).toBeCloseTo(500);
    expect(100 * t.scale + t.y).toBeCloseTo(250);
    // Both box edges sit inside the padding.
    expect(100 * t.scale + t.x).toBeCloseTo(40);
    expect(500 * t.scale + t.x).toBeCloseTo(960);
  });

  it('never zooms past maxZoom — two people stay people-sized', () => {
    const t = fitTransform({ minX: 0, minY: 0, maxX: 100, maxY: 40 }, size, 32, 1.25);
    expect(t.scale).toBe(1.25);
    expect(50 * t.scale + t.x).toBeCloseTo(500);
  });

  it('zooms out for a box bigger than the canvas, down to minZoom', () => {
    expect(fitTransform({ minX: 0, minY: 0, maxX: 2000, maxY: 400 }, size, 0, 2).scale).toBeCloseTo(0.5);
    expect(fitTransform({ minX: 0, minY: 0, maxX: 20000, maxY: 400 }, size, 0, 2, 0.3).scale).toBe(0.3);
  });

  it('handles a point or a line without dividing by zero', () => {
    const point = fitTransform({ minX: 10, minY: 10, maxX: 10, maxY: 10 }, size, 20, 1.5);
    expect(point).toEqual({ x: 500 - 15, y: 250 - 15, scale: 1.5 });
    const row = fitTransform({ minX: 0, minY: 5, maxX: 1680, maxY: 5 }, size, 80, 3);
    expect(row.scale).toBeCloseTo(0.5);
  });
});

describe('fitTransform — insets and the label floor', () => {
  it('centres the box in the canvas less the insets', () => {
    // Clear area: x 200 … 680 (480 wide), y 0 … 500; available 416 × 436 after 32px padding.
    const t = fitTransform({ minX: 0, minY: 0, maxX: 208, maxY: 100 }, size, 32, 3, 0, { left: 200, right: 320 });
    expect(t.scale).toBeCloseTo(2);
    expect(0 * t.scale + t.x).toBeCloseTo(200 + 32);
    expect(208 * t.scale + t.x).toBeCloseTo(1000 - 320 - 32);
    expect(50 * t.scale + t.y).toBeCloseTo(250);
  });

  it('honours top and bottom insets and treats missing edges as 0', () => {
    const t = fitTransform({ minX: 0, minY: 0, maxX: 100, maxY: 100 }, size, 0, 1, 0, { top: 100 });
    expect(50 * t.scale + t.x).toBeCloseTo(500);
    expect(50 * t.scale + t.y).toBeCloseTo(100 + 200);
    expect(fitTransform({ minX: 0, minY: 0, maxX: 100, maxY: 100 }, size, 0, 1, 0, {}))
      .toEqual(fitTransform({ minX: 0, minY: 0, maxX: 100, maxY: 100 }, size, 0, 1));
  });

  it('stops at the label floor and start-aligns the overflowing axis', () => {
    // 900 × 600 of world on a 1000 × 500 canvas, legend inset 200: the fit
    // would be ~0.73; the floor holds 0.9 and the drawing runs off the bottom.
    const t = fitTransform({ minX: 0, minY: 0, maxX: 900, maxY: 600 }, size, 32, 1.25, ORG_FIT_MIN_ZOOM, { left: 200 });
    expect(t.scale).toBe(ORG_FIT_MIN_ZOOM);
    expect(0 * t.scale + t.y).toBeCloseTo(32); // top of the drawing at the top padding
    // Width (810) still overflows the 736 clear width → left edge right of the legend.
    expect(0 * t.scale + t.x).toBeCloseTo(232);
    // An axis that still fits stays centred.
    const wide = fitTransform({ minX: 0, minY: 0, maxX: 600, maxY: 600 }, size, 32, 1.25, ORG_FIT_MIN_ZOOM, { left: 200 });
    expect(300 * wide.scale + wide.x).toBeCloseTo(200 + 400);
    expect(0 * wide.scale + wide.y).toBeCloseTo(32);
  });

  it('keeps the automatic floor at 0.9 and the fit-all floor at 0.3 (0.5 before 2.403.5)', () => {
    expect(ORG_FIT_MIN_ZOOM).toBe(0.9);
    expect(ORG_FIT_ALL_MIN_ZOOM).toBe(0.3);
    // The same overflowing box fits whole under the fit-all floor.
    const all = fitTransform({ minX: 0, minY: 0, maxX: 900, maxY: 600 }, size, 32, 1.25, ORG_FIT_ALL_MIN_ZOOM, { left: 200 });
    expect(all.scale).toBeCloseTo(436 / 600);
    expect(600 * all.scale + all.y).toBeLessThanOrEqual(500 - 32 + 0.01);
    expect(900 * all.scale + all.x).toBeLessThanOrEqual(1000 - 32 + 0.01);
  });
});

describe('reserveCorner', () => {
  const zero = { left: 0, right: 0, top: 0, bottom: 0 };
  it('reserves the controls corner along the cheaper edge', () => {
    // A wide strip: 48 of 400 tall is cheaper than 172 of 1160 wide.
    expect(reserveCorner({ ...zero, left: 200 }, { width: 1160, height: 400 }, ORG_CONTROLS_SIZE))
      .toEqual({ ...zero, left: 200, bottom: ORG_CONTROLS_SIZE.height });
    // A very wide, short strip gives up the right edge instead (172 of 1600 < 48 of 300).
    expect(reserveCorner(zero, { width: 1600, height: 300 }, ORG_CONTROLS_SIZE))
      .toEqual({ ...zero, right: ORG_CONTROLS_SIZE.width });
  });

  it('leaves host insets that already cover the corner alone', () => {
    const card = { ...zero, right: 320 };
    expect(reserveCorner(card, { width: 1160, height: 400 }, ORG_CONTROLS_SIZE)).toBe(card);
    const band = { ...zero, bottom: 60 };
    expect(reserveCorner(band, { width: 1160, height: 400 }, ORG_CONTROLS_SIZE)).toBe(band);
  });
});

describe('orgGraphBounds', () => {
  it('covers circles, the label band below and the full name above tall nodes', () => {
    const nodes = [
      { id: 'a', name: 'Vera Green', x: 0, y: 0 },
      { id: 'b', name: 'Bo Li', x: 200, y: 100 },
    ];
    const b = orgGraphBounds(nodes, () => 20, new Set(['a']))!;
    expect(b.minY).toBe(-20 - ORG_LABEL_BAND);
    expect(b.maxY).toBe(100 + 20 + ORG_LABEL_BAND);
    expect(b.minX).toBe(-orgLabelWidth('Vera Green') / 2);
    expect(b.maxX).toBe(220); // "Bo" is narrower than the circle
    expect(orgGraphBounds([], () => 1)).toBeNull();
  });
});

describe('orgGraphViewport — the opening view keeps nodes out from under the overlays (2.404.2)', () => {
  const W = 1160, H = 400;
  const size = { width: W, height: H };
  const base = { left: ORG_LEGEND_INSET, right: 0, top: 0, bottom: 0 };
  const inset = reserveCorner(base, size, ORG_CONTROLS_SIZE);
  const overlays = orgOverlayRects(size, base, ORG_CONTROLS_SIZE);
  const DEPTS: GraphDepartment[] = ['Platform Engineering', 'Data Platform', 'Product', 'Design Systems', 'ML / AI', 'Security']
    .map((name, i) => ({ id: `d-${i}`, name, color: '#000000' }));

  /** Deterministic Math.random for the force layout's start jitter. */
  function seeded(seed: number) {
    let a = seed >>> 0;
    return () => {
      a = (a + 0x6d2b79f5) >>> 0;
      let t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  afterEach(() => vi.restoreAllMocks());

  it('56 people, Force, 1160 × 400: stops at the floor, and no node sits under the legend or zoom cluster', () => {
    const people: GraphPerson[] = Array.from({ length: 56 }, (_, i) => ({
      id: `q-${i}`, name: `Person${i} Doe`, title: 'Engineer', department: DEPTS[i % 6]!.name,
      skills: [], influenceScore: ((i * 37) % 100) / 100,
    }));
    const relationships: GraphRelationship[] = people.flatMap((p, i) => [
      { source: p.id, target: people[(i + 6) % 56]!.id, type: 'mentors' as const, strength: 0.4 + ((i * 13) % 60) / 100 },
      { source: p.id, target: people[(i + 1) % 56]!.id, type: 'collaborates' as const, strength: 0.5 },
    ]);
    const radius = (p: GraphPerson) => 12 + p.influenceScore * 18;
    for (const seed of [1, 2, 3, 4, 5]) {
      vi.spyOn(Math, 'random').mockImplementation(seeded(seed));
      // Laid out exactly as OrgGraph does: the clear area at the floor.
      const { sim, simNodes } = createOrgSimulation({
        people, relationships, departments: DEPTS,
        width: (W - inset.left - inset.right - 64) / ORG_FIT_MIN_ZOOM,
        height: (H - inset.top - inset.bottom - 64) / ORG_FIT_MIN_ZOOM,
        nodeRadiusOf: radius,
      });
      sim.stop();
      sim.tick(300);
      vi.restoreAllMocks();
      const byId = new Map(simNodes.map(n => [n.id, n]));
      const radiusOf = (id: string) => radius(byId.get(id)!);
      const t = orgGraphViewport({
        nodes: simNodes, radiusOf, focus: new Set(), size, inset, overlays, layout: 'force', mode: 'auto',
      })!;
      expect(t.scale).toBe(ORG_FIT_MIN_ZOOM);
      // Nodes may run past the canvas edge; none may sit under an overlay.
      const under = nodesUnderOverlays(orgNodeBoxes(simNodes, radiusOf), t, overlays, size);
      expect(under.map(b => b.id), `seed ${seed}`).toEqual([]);
    }
  });

  it('shifts an overflowing floor fit off the zoom cluster rather than leaving a node under it', () => {
    // A 12 × 5 grid, 90px apart: 1080 × 450 world px — overflows both axes at 0.9.
    const nodes = Array.from({ length: 60 }, (_, i) => ({ id: `g-${i}`, name: `G${i}`, x: (i % 12) * 90, y: Math.floor(i / 12) * 90 }));
    const radiusOf = () => 14;
    const boxes = orgNodeBoxes(nodes, radiusOf);
    const plain = fitTransform(orgGraphBounds(nodes, radiusOf)!, size, 32, 1.25, ORG_FIT_MIN_ZOOM, inset);
    expect(nodesUnderOverlays(boxes, plain, overlays, size).length).toBeGreaterThan(0);
    const t = orgGraphViewport({ nodes, radiusOf, focus: new Set(), size, inset, overlays, layout: 'force', mode: 'auto' })!;
    expect(t.scale).toBe(ORG_FIT_MIN_ZOOM);
    expect(nodesUnderOverlays(boxes, t, overlays, size)).toEqual([]);
    // Only the overflow moves: the pan stays within the overlays' size (+ a node box).
    expect(Math.abs(t.x - plain.x)).toBeLessThanOrEqual(ORG_LEGEND_INSET + 60);
    expect(Math.abs(t.y - plain.y)).toBeLessThanOrEqual(ORG_CONTROLS_SIZE.height + 60);
  });

  it('Radial with no focus frames every ring whole; with a focus it keeps the floor and centres the focus', () => {
    // An 18-node ring 1400 × 500 world px.
    const nodes = Array.from({ length: 18 }, (_, i) => ({
      id: `r-${i}`, name: `R${i}`, x: 700 + 700 * Math.cos((i / 18) * 2 * Math.PI), y: 250 + 250 * Math.sin((i / 18) * 2 * Math.PI),
    }));
    const radiusOf = () => 14;
    const boxes = orgNodeBoxes(nodes, radiusOf);
    const all = orgGraphViewport({ nodes, radiusOf, focus: new Set(), size, inset, overlays, layout: 'radial', mode: 'auto' })!;
    expect(all.scale).toBeLessThan(ORG_FIT_MIN_ZOOM);
    expect(all.scale).toBeGreaterThanOrEqual(ORG_FIT_ALL_MIN_ZOOM);
    for (const b of boxes) {
      const s = toScreen(b, all);
      expect(s.left).toBeGreaterThanOrEqual(0);
      expect(s.right).toBeLessThanOrEqual(W);
      expect(s.top).toBeGreaterThanOrEqual(0);
      expect(s.bottom).toBeLessThanOrEqual(H);
    }
    expect(nodesUnderOverlays(boxes, all, overlays, size)).toEqual([]);
    // Force with the same drawing keeps the floor.
    expect(orgGraphViewport({ nodes, radiusOf, focus: new Set(), size, inset, overlays, layout: 'force', mode: 'auto' })!.scale)
      .toBe(ORG_FIT_MIN_ZOOM);
    // A focus on the ring's right-hand person: floor kept, focus whole and clear.
    const focus = new Set(['r-0']);
    const f = orgGraphViewport({ nodes, radiusOf, focus, size, inset, overlays, layout: 'radial', mode: 'auto' })!;
    expect(f.scale).toBe(ORG_FIT_MIN_ZOOM);
    const fb = toScreen(orgNodeBoxes(nodes, radiusOf, focus).find(b => b.id === 'r-0')!, f);
    expect(fb.left).toBeGreaterThanOrEqual(0);
    expect(fb.right).toBeLessThanOrEqual(W);
    expect(fb.top).toBeGreaterThanOrEqual(0);
    expect(fb.bottom).toBeLessThanOrEqual(H);
    expect(nodesUnderOverlays(orgNodeBoxes(nodes, radiusOf, focus).filter(b => b.id === 'r-0'), f, overlays, size)).toEqual([]);
    // Fit to view is the whole-set fit in either layout.
    expect(orgGraphViewport({ nodes, radiusOf, focus, size, inset, overlays, layout: 'radial', mode: 'all' })!.scale)
      .toBeLessThan(ORG_FIT_MIN_ZOOM);
  });
});
