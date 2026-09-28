import { describe, expect, it } from 'vitest';
import { fitTransform, orgGraphBounds, orgLabelWidth } from '../fitTransform';
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
