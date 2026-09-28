import { describe, expect, it } from 'vitest';
import { fitTransform, orgGraphBounds, orgLabelWidth, ORG_FIT_MIN_ZOOM } from '../fitTransform';
import { ORG_LABEL_BAND } from '../useForceLayout';

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
    // would be ~0.6; the floor holds 1.1 and the drawing runs off the bottom.
    const t = fitTransform({ minX: 0, minY: 0, maxX: 700, maxY: 600 }, size, 32, 1.25, ORG_FIT_MIN_ZOOM, { left: 200 });
    expect(t.scale).toBe(ORG_FIT_MIN_ZOOM);
    expect(0 * t.scale + t.y).toBeCloseTo(32); // top of the drawing at the top padding
    // Width (770) still overflows the 736 clear width → left edge right of the legend.
    expect(0 * t.scale + t.x).toBeCloseTo(232);
    // An axis that still fits stays centred.
    const wide = fitTransform({ minX: 0, minY: 0, maxX: 600, maxY: 600 }, size, 32, 1.25, ORG_FIT_MIN_ZOOM, { left: 200 });
    expect(300 * wide.scale + wide.x).toBeCloseTo(200 + 400);
    expect(0 * wide.scale + wide.y).toBeCloseTo(32);
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
