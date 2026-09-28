import { describe, expect, it } from 'vitest';
import { createOrgSimulation, forceParamsFor, ORG_LABEL_BAND } from '../useForceLayout';
import type { GraphDepartment, GraphPerson, GraphRelationship } from '../types';

const DEPTS: GraphDepartment[] = ['Platform Engineering', 'Data Platform', 'Product', 'Design Systems', 'ML / AI', 'Security']
  .map((name, i) => ({ id: `d-${i}`, name, color: '#000000' }));
const FIRST = ['Sarah', 'Marcus', 'Tara', 'Sienna', 'Vera', 'Rachel', 'Noah', 'Caleb', 'Kayla', 'Marcus', 'Theo'];

/** The portal's failing case: one person and their ten neighbours, 25 lines. */
function focusedEleven(): { people: GraphPerson[]; relationships: GraphRelationship[] } {
  const people = FIRST.map((first, i) => ({
    id: `p-${i}`, name: `${first} Doe`, title: 'Engineer', department: DEPTS[i % 2 === 0 ? 0 : (i % 6)]!.name,
    skills: [], influenceScore: (i * 37 % 100) / 100,
  }));
  const relationships: GraphRelationship[] = [];
  for (let i = 1; i < 11; i++) relationships.push({ source: 'p-0', target: `p-${i}`, type: 'collaborates', strength: 0.7 });
  for (let i = 1; i < 11 && relationships.length < 25; i++) {
    relationships.push({ source: `p-${i}`, target: `p-${(i % 10) + 1}`, type: 'collaborates', strength: 0.5 });
    if (i % 2 === 0) relationships.push({ source: `p-${i}`, target: `p-${((i + 3) % 10) + 1}`, type: 'mentors', strength: 0.6 });
  }
  return { people, relationships: relationships.slice(0, 25) };
}

describe('forceParamsFor', () => {
  it('keeps the 56-person tuning within the original ranges', () => {
    for (const [w, h] of [[1200, 640], [1150, 640], [1000, 600]] as const) {
      const p = forceParamsFor(56, w, h);
      expect(p.linkDistance).toBeGreaterThanOrEqual(60);
      expect(p.linkDistance).toBeLessThanOrEqual(100);
      expect(p.charge).toBeLessThanOrEqual(-150);
      expect(p.charge).toBeGreaterThanOrEqual(-300);
      expect(p.collidePadding).toBeLessThanOrEqual(8);
      expect(p.linkStiffness).toBe(0.3);
      expect(p.xStrength).toBe(0.1);
      expect(p.yStrength).toBe(0.1);
    }
  });

  it('spreads a small set further, pushes harder and reserves the label band', () => {
    const big = forceParamsFor(56, 1150, 420);
    const small = forceParamsFor(11, 1150, 420);
    const pair = forceParamsFor(2, 1150, 420);
    expect(small.linkDistance).toBeGreaterThan(big.linkDistance * 1.5);
    expect(small.charge).toBeLessThan(big.charge * 2);
    expect(pair.linkDistance).toBeGreaterThanOrEqual(small.linkDistance);
    expect(pair.charge).toBeLessThanOrEqual(small.charge);
    expect(small.collidePadding).toBeGreaterThanOrEqual(ORG_LABEL_BAND);
  });

  it('scales link distance with √(area / N) and caps the extremes', () => {
    const a = forceParamsFor(10, 600, 300);
    const b = forceParamsFor(10, 1200, 600); // 4× the area → 2× the spacing
    expect(b.linkDistance / a.linkDistance).toBeCloseTo(2, 1);
    expect(forceParamsFor(1, 4000, 4000).linkDistance).toBe(240);
    expect(forceParamsFor(500, 400, 300).linkDistance).toBe(60);
    expect(forceParamsFor(1, 4000, 4000).charge).toBe(-1500);
  });

  it('pulls a small set harder along the short axis of a wide canvas', () => {
    const wide = forceParamsFor(11, 1150, 420);
    expect(wide.yStrength).toBeGreaterThan(wide.xStrength);
    const tall = forceParamsFor(11, 420, 1150);
    expect(tall.xStrength).toBeGreaterThan(tall.yStrength);
  });

  it('survives zero and degenerate sizes', () => {
    const p = forceParamsFor(0, 0, 0);
    expect(Number.isFinite(p.linkDistance) && Number.isFinite(p.charge)).toBe(true);
  });
});

describe('createOrgSimulation — the focused eleven on a wide canvas', () => {
  it('spreads across the canvas with no circle-and-label overlaps', () => {
    const W = 1150, H = 420;
    const { people, relationships } = focusedEleven();
    const radius = () => 20;
    const { sim, simNodes } = createOrgSimulation({ people, relationships, departments: DEPTS, width: W, height: H, nodeRadiusOf: radius });
    sim.stop();
    sim.tick(400);
    const xs = simNodes.map(n => n.x), ys = simNodes.map(n => n.y);
    const spanX = Math.max(...xs) - Math.min(...xs);
    const spanY = Math.max(...ys) - Math.min(...ys);
    // Was ~300px wide on a ~1150px canvas; now it uses most of the width.
    expect(spanX).toBeGreaterThan(W * 0.5);
    expect(spanY).toBeGreaterThan(H * 0.4);
    // Every pair keeps its circles and label band apart (collide is soft, so 90%).
    for (let i = 0; i < simNodes.length; i++) {
      for (let j = i + 1; j < simNodes.length; j++) {
        const a = simNodes[i]!, b = simNodes[j]!;
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        expect(d).toBeGreaterThan(0.9 * 2 * (20 + ORG_LABEL_BAND));
      }
    }
  });
});
