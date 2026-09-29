// Ported from the aws-agentcore portal's pages/search/__tests__/searchGraph.test.ts
// (node:test → vitest).
import { expect, test } from 'vitest';
import {
  filterRecordGraph, recordGraphKey, layoutRecordGraph, recordForceParams, recordGraphFitKeys,
  recordGraphInset, recordGraphLegendSize, recordGraphViewport, recordRadialRings,
  RECORD_GRAPH_CONTROLS_SIZE, RECORD_GRAPH_MIN_FIT_ZOOM, RECORD_GRAPH_READABLE_ZOOM,
  RECORD_GRAPH_NEIGHBOURHOOD_ZOOM, RECORD_GRAPH_FOCUS_MIN_ZOOM, RECORD_GRAPH_FIT_ALL_MIN_ZOOM, RECORD_GRAPH_NODE_HEIGHT as NODE_H, RECORD_GRAPH_NODE_WIDTH as NODE_W,
  type RecordGraphEdge, type RecordGraphRecord, type RecordGraphType,
} from '../recordGraphLayout';

const records: RecordGraphRecord[] = [
  { id: 'shared', type: 'person', title: 'Owner', href: '/people/shared' },
  { id: 'shared', type: 'initiative', title: 'Initiative', href: '/initiatives/shared' },
  { id: 'work', type: 'work', title: 'Blocked work', href: '/work/work', status: 'blocked' },
  { id: 'guide', type: 'knowledge', title: 'A guide', href: '/knowledge/guide' },
];
const edges: RecordGraphEdge[] = [
  { id: 'owns', source: 'person:shared', target: 'initiative:shared', label: 'owns' },
  { id: 'includes', source: 'initiative:shared', target: 'work:work', label: 'includes' },
  { id: 'missing', source: 'knowledge:guide', target: 'work:missing', label: 'supports' },
];

test('mixed graph preserves typed IDs and does not create relationships for disconnected records', () => {
  const graph = filterRecordGraph([...records, records[0]], [...edges, edges[0]], 'all');
  expect(graph.records.length).toBe(4);
  expect(graph.edges.map(edge => edge.id)).toEqual(['owns', 'includes']);
  expect(recordGraphKey(records[0])).not.toBe(recordGraphKey(records[1]));
  expect(graph.records.some(record => record.id === 'guide')).toBe(true);
});

test('type filtering removes edges whose other endpoint is hidden', () => {
  const graph = filterRecordGraph(records, edges, 'person');
  expect(graph.records).toEqual([records[0]]);
  expect(graph.edges).toEqual([]);
});

test('all layouts retain disconnected records and handle cyclic evidence without mutating inputs', () => {
  const cyclic = [...edges, { id: 'cycle', source: 'work:work', target: 'person:shared', label: 'assigned to' }];
  const before = JSON.stringify({ records, cyclic });
  for (const layout of ['force', 'radial', 'hierarchy'] as const) {
    const positions = layoutRecordGraph(records, cyclic, layout);
    expect(positions.size).toBe(records.length);
    expect(new Set([...positions.values()].map(point => `${point.x},${point.y}`)).size).toBe(records.length);
    for (const position of positions.values()) {
      expect(Number.isFinite(position.x) && Number.isFinite(position.y)).toBe(true);
    }
  }
  expect(JSON.stringify({ records, cyclic })).toBe(before);
});

test('hierarchy follows directed edges and force layout is repeatable', () => {
  const hierarchy = layoutRecordGraph(records, edges, 'hierarchy');
  expect(hierarchy.get('person:shared')!.x < hierarchy.get('initiative:shared')!.x).toBe(true);
  expect(hierarchy.get('initiative:shared')!.x < hierarchy.get('work:work')!.x).toBe(true);
  expect(layoutRecordGraph(records, edges, 'force')).toEqual(layoutRecordGraph(records, edges, 'force'));
});

// ── 2.403.2: readable at the search page's density ──────────────────────────

/** The portal's failing case: 3 people, 2 initiatives, work, decisions and
 *  knowledge — 25 records and 56 edges on a 1160 × 418 canvas. */
function searchResult(count = 25) {
  const types: RecordGraphType[] = ['person', 'person', 'person', 'initiative', 'initiative',
    ...Array<RecordGraphType>(13).fill('work'), 'decision', 'decision', ...Array<RecordGraphType>(5).fill('knowledge')];
  const all: RecordGraphRecord[] = types.map((type, i) => ({ id: `r${i}`, type, title: `Record ${i}`, href: `/r/${i}` }));
  const key = (i: number) => recordGraphKey(all[i]!);
  const links: RecordGraphEdge[] = [];
  for (let i = 5; i < 25; i++) links.push({ id: `inc-${i}`, source: key(3 + (i % 2)), target: key(i), label: 'includes' });
  for (let i = 5; i < 25; i++) links.push({ id: `asg-${i}`, source: key(i % 3), target: key(i), label: 'assigned to' });
  for (let i = 5; i < 21; i++) links.push({ id: `rel-${i}`, source: key(i), target: key(i + 4), label: 'related' });
  return filterRecordGraph(all.slice(0, count), links, 'all');
}

const CANVAS = { width: 1160, height: 418 };

/** The zoom a padded fit of these positions would need on CANVAS. */
function fitZoom(positions: Map<string, { x: number; y: number }>) {
  const xs = [...positions.values()].map(p => p.x), ys = [...positions.values()].map(p => p.y);
  const w = Math.max(...xs) - Math.min(...xs) + NODE_W;
  const h = Math.max(...ys) - Math.min(...ys) + NODE_H;
  return { zoom: Math.min((CANVAS.width * 0.88) / w, (CANVAS.height * 0.88) / h), w, h, xs };
}

function overlaps(positions: Map<string, { x: number; y: number }>) {
  const v = [...positions.values()];
  let count = 0;
  for (let i = 0; i < v.length; i++) for (let j = i + 1; j < v.length; j++) {
    if (Math.abs(v[i]!.x - v[j]!.x) < NODE_W && Math.abs(v[i]!.y - v[j]!.y) < NODE_H * 0.8) count++;
  }
  return count;
}

test('force parameters scale with the record count and canvas', () => {
  const dozen = recordForceParams(12, CANVAS.width, CANVAS.height);
  const many = recordForceParams(25, CANVAS.width, CANVAS.height);
  expect(many.linkDistance).toBeLessThan(dozen.linkDistance);
  expect(many.charge).toBeGreaterThan(dozen.charge); // weaker repulsion for more records
  expect(recordForceParams(1, 4000, 4000).linkDistance).toBe(240);
  expect(recordForceParams(500, 400, 300).linkDistance).toBe(130);
  // Collide follows the node box, not the count, so boxes never overlap.
  expect(many.collide).toBeGreaterThan(NODE_W / 2);
  expect(many.collide).toBe(dozen.collide);
  // A wide canvas pulls harder vertically; a tall one horizontally.
  expect(many.yStrength).toBeGreaterThan(many.xStrength);
  const tall = recordForceParams(25, 418, 1160);
  expect(tall.xStrength).toBeGreaterThan(tall.yStrength);
});

test('force: a dozen records read at 100%, twenty-five near the floor — never the old 46%', () => {
  const dozen = searchResult(12);
  expect(fitZoom(layoutRecordGraph(dozen.records, dozen.edges, 'force', CANVAS)).zoom).toBeGreaterThanOrEqual(0.95);
  const full = searchResult();
  expect(full.records).toHaveLength(25);
  expect(full.edges).toHaveLength(56);
  const positions = layoutRecordGraph(full.records, full.edges, 'force', CANVAS);
  expect(fitZoom(positions).zoom).toBeGreaterThan(0.55);
  expect(overlaps(positions)).toBe(0);
});

test('force fills a wide canvas\'s width before it overflows its height (2.403.5: was 82% × 117%)', () => {
  for (const canvas of [CANVAS, { width: 1160, height: 360 }]) {
    const full = searchResult();
    const positions = layoutRecordGraph(full.records, full.edges, 'force', canvas);
    const { w, h } = fitZoom(positions);
    const drawnW = w * RECORD_GRAPH_MIN_FIT_ZOOM, drawnH = h * RECORD_GRAPH_MIN_FIT_ZOOM;
    // At the floor it spans at least 90% of the width; only then does it
    // overflow the height — not at all on the 418px canvas (~99% × 97%), by
    // about a seventh on 360px (~99% × 114%).
    expect(drawnW / canvas.width, `${canvas.height}`).toBeGreaterThan(0.9);
    expect(drawnH / canvas.height, `${canvas.height}`).toBeLessThan(canvas.height >= 418 ? 1.02 : 1.2);
    expect(overlaps(positions)).toBe(0);
  }
  // A tall canvas gets a tall drawing.
  const full = searchResult();
  const { w, h } = fitZoom(layoutRecordGraph(full.records, full.edges, 'force', { width: 418, height: 1160 }));
  expect(h).toBeGreaterThan(w);
});

test('radial rings are shaped to a wide canvas and spaced by arc length', () => {
  const full = searchResult();
  const positions = layoutRecordGraph(full.records, full.edges, 'radial', CANVAS);
  const { zoom, w, h } = fitZoom(positions);
  expect(w / h).toBeGreaterThan(1.8);
  expect(zoom).toBeGreaterThan(0.5); // was 0.26
  expect(overlaps(positions)).toBe(0);
});

test('hierarchy ranks by longest path, and wraps a tall rank into sub-columns', () => {
  const full = searchResult();
  const positions = layoutRecordGraph(full.records, full.edges, 'hierarchy', CANVAS);
  const { zoom, h } = fitZoom(positions);
  // The canvas at the fit floor bounds the column height.
  expect(h).toBeLessThanOrEqual(CANVAS.height / RECORD_GRAPH_MIN_FIT_ZOOM + NODE_H);
  expect(zoom).toBeGreaterThan(0.5); // was 0.15 — one column
  expect(new Set([...positions.values()].map(p => p.x)).size).toBeGreaterThanOrEqual(4);
  expect(overlaps(positions)).toBe(0);
  // Longest path: r5 → r9 → r13 puts r13 right of r9, which is right of r5.
  const x = (i: number) => positions.get(recordGraphKey(full.records[i]!))!.x;
  expect(x(5)).toBeLessThan(x(9));
  expect(x(9)).toBeLessThan(x(13));
  expect(x(0)).toBeLessThan(x(5));
});

test('hierarchy with no directed chain falls back to columns by record type', () => {
  const x = (positions: Map<string, { x: number; y: number }>, key: string) => positions.get(key)!.x;
  const flat = layoutRecordGraph(records, [], 'hierarchy', CANVAS);
  expect(x(flat, 'person:shared')).toBeLessThan(x(flat, 'initiative:shared'));
  expect(x(flat, 'initiative:shared')).toBeLessThan(x(flat, 'work:work'));
  expect(x(flat, 'work:work')).toBe(x(flat, 'knowledge:guide'));
  expect(new Set([...flat.values()].map(p => `${p.x},${p.y}`)).size).toBe(records.length);
});

test('recordGraphFitKeys is the drawn focus plus its direct neighbours', () => {
  const keys = records.map(recordGraphKey);
  expect(recordGraphFitKeys(keys, edges, ['person:shared'])).toEqual(['person:shared', 'initiative:shared']);
  expect(recordGraphFitKeys(keys, edges, ['initiative:shared'])).toEqual(['person:shared', 'initiative:shared', 'work:work']);
  expect(recordGraphFitKeys(keys, edges, ['person:missing'])).toEqual([]);
  expect(recordGraphFitKeys(keys, edges, undefined)).toEqual([]);
});

// ── 2.403.7: the automatic fit shows everything when it is readable ─────────

/** The search canvas's clear area: 24px padding, the 48px legend/controls band + 8px gap at the bottom. */
const CLEAR = { width: CANVAS.width - 48, height: CANVAS.height - 24 - (RECORD_GRAPH_CONTROLS_SIZE.height + 8) };
const span = (positions: Map<string, { x: number; y: number }>) => {
  const v = [...positions.values()];
  const x0 = Math.min(...v.map(p => p.x)), x1 = Math.max(...v.map(p => p.x)) + NODE_W;
  const y0 = Math.min(...v.map(p => p.y)), y1 = Math.max(...v.map(p => p.y)) + NODE_H;
  return { x0, x1, y0, y1, w: x1 - x0, h: y1 - y0 };
};
/** Boxes that genuinely intersect (the full 140 × 104). */
function boxOverlaps(positions: Map<string, { x: number; y: number }>) {
  const v = [...positions.values()];
  let count = 0;
  for (let i = 0; i < v.length; i++) for (let j = i + 1; j < v.length; j++) {
    if (Math.abs(v[i]!.x - v[j]!.x) < NODE_W && Math.abs(v[i]!.y - v[j]!.y) < NODE_H) count++;
  }
  return count;
}

/** The same shape at 60 records: 3 people, 2 initiatives, 55 work items. */
function sixtyRecords() {
  const all: RecordGraphRecord[] = [
    ...(['person', 'person', 'person', 'initiative', 'initiative'] as RecordGraphType[]).map((type, i) => ({ id: `s${i}`, type, title: `S ${i}`, href: '' })),
    ...Array.from({ length: 55 }, (_, i): RecordGraphRecord => ({ id: `w${i}`, type: 'work', title: `W ${i}`, href: '' })),
  ];
  const key = (i: number) => recordGraphKey(all[i]!);
  const links: RecordGraphEdge[] = [];
  for (let i = 5; i < 60; i++) links.push({ id: `inc-${i}`, source: key(3 + (i % 2)), target: key(i), label: 'includes' });
  for (let i = 5; i < 60; i++) links.push({ id: `asg-${i}`, source: key(i % 3), target: key(i), label: 'assigned to' });
  for (let i = 5; i < 56; i++) links.push({ id: `rel-${i}`, source: key(i), target: key(i + 4), label: 'related' });
  return filterRecordGraph(all, links, 'all');
}

test('the readable zoom is 70%', () => {
  expect(RECORD_GRAPH_READABLE_ZOOM).toBe(0.7);
});

test('radial: the outer ring\'s ellipse fits the canvas at 70% for 25 records, and no boxes overlap', () => {
  const plan = recordRadialRings(25, CANVAS.width, CANVAS.height);
  expect(plan.fits).toBe(true);
  expect(plan.counts.reduce((a, b) => a + b, 0)).toBe(24);
  // Rings are spaced from the node box (128px natural), squeezed to fit — not the old fixed 255px outer step.
  expect(plan.stepY).toBeLessThan(NODE_H + 24);
  const outer = { a: plan.rings * plan.stepX, b: plan.rings * plan.stepY };
  expect((2 * outer.a + NODE_W) * RECORD_GRAPH_READABLE_ZOOM).toBeLessThanOrEqual(CLEAR.width);
  expect((2 * outer.b + NODE_H) * RECORD_GRAPH_READABLE_ZOOM).toBeLessThanOrEqual(CLEAR.height);
  // Inner rings hold fewer than outer ones (spread by perimeter, not a straggler outside).
  plan.counts.slice(1).forEach((n, k) => expect(n).toBeGreaterThanOrEqual(plan.counts[k]!));
  const full = searchResult();
  const positions = layoutRecordGraph(full.records, full.edges, 'radial', CANVAS);
  // The focus (best connected) at the centre, every record inside the outer ring's bounds.
  expect([...positions.values()][0]).toEqual({ x: 0, y: 0 });
  positions.forEach((p, key) => {
    expect(Math.abs(p.x), key).toBeLessThanOrEqual(outer.a + 0.01);
    expect(Math.abs(p.y), key).toBeLessThanOrEqual(outer.b + 0.01);
  });
  expect(boxOverlaps(positions)).toBe(0);
  // A handful keeps the natural spacing; past ~30 nothing fits and the natural rings return.
  expect(recordRadialRings(4, CANVAS.width, CANVAS.height)).toMatchObject({ rings: 1, stepY: NODE_H + 24, fits: true });
  expect(recordRadialRings(60, CANVAS.width, CANVAS.height)).toMatchObject({ stepY: NODE_H + 24, fits: false });
});

test('hierarchy: the column block is centred on x = 0 and fits the canvas at 70% for 25 records', () => {
  const full = searchResult();
  const positions = layoutRecordGraph(full.records, full.edges, 'hierarchy', CANVAS);
  const box = span(positions);
  expect((box.x0 + box.x1) / 2).toBeCloseTo(0, 6);
  expect(box.w * RECORD_GRAPH_READABLE_ZOOM).toBeLessThanOrEqual(CLEAR.width);
  expect(box.h * RECORD_GRAPH_READABLE_ZOOM).toBeLessThanOrEqual(CLEAR.height);
  expect(boxOverlaps(positions)).toBe(0);
  // A few columns spread over a wide canvas at 100% rather than huddling in the middle.
  const small = layoutRecordGraph(records, edges, 'hierarchy', CANVAS);
  const smallBox = span(small);
  expect((smallBox.x0 + smallBox.x1) / 2).toBeCloseTo(0, 6);
  expect(smallBox.w).toBeLessThanOrEqual(CLEAR.width);
  expect(smallBox.w).toBeGreaterThan(3 * NODE_W + 2 * 132);
});

test('the automatic fit shows all 25 records at ≥ 70% in every layout; 60 fall back to the focus at the floor', () => {
  const inset = recordGraphInset(CANVAS, {
    legend: recordGraphLegendSize(['People', 'Initiatives', 'Work', 'Decisions', 'Knowledge'], CANVAS.width),
    controls: RECORD_GRAPH_CONTROLS_SIZE,
  });
  for (const count of [25, 60]) {
    const graph = count === 25 ? searchResult() : sixtyRecords();
    const keys = graph.records.map(recordGraphKey);
    // Three people selected; at 60 one (Force spreads three hubs wider than the canvas at the floor).
    const focusKeys = keys.slice(0, count === 25 ? 3 : 1);
    const fitKeys = recordGraphFitKeys(keys, graph.edges, focusKeys);
    for (const layout of ['force', 'radial', 'hierarchy'] as const) {
      const positions = layoutRecordGraph(graph.records, graph.edges, layout, CANVAS);
      const vp = recordGraphViewport(positions, CANVAS, { mode: 'auto', focusKeys, fitKeys, inset })!;
      const inside = (key: string) => {
        const p = positions.get(key)!;
        const x0 = p.x * vp.zoom + vp.x, y0 = p.y * vp.zoom + vp.y;
        return x0 >= -0.5 && y0 >= -0.5 && x0 + NODE_W * vp.zoom <= CANVAS.width + 0.5 && y0 + NODE_H * vp.zoom <= CANVAS.height + 0.5;
      };
      focusKeys.forEach(key => expect(inside(key), `${count} ${layout} ${key}`).toBe(true));
      if (count === 25) {
        expect(vp.zoom, layout).toBeGreaterThanOrEqual(RECORD_GRAPH_READABLE_ZOOM);
        keys.forEach(key => expect(inside(key), `${layout} ${key}`).toBe(true));
      } else {
        expect(vp.zoom, layout).toBeCloseTo(RECORD_GRAPH_MIN_FIT_ZOOM);
        expect(keys.every(inside), layout).toBe(false);
      }
    }
  }
});

// ── 2.403.8: the selection is never clipped; the automatic fit is a ladder ──

const LEGEND = ['People', 'Initiatives', 'Work', 'Decisions', 'Knowledge'];
const insetFor = (size: { width: number; height: number }) =>
  recordGraphInset(size, { legend: recordGraphLegendSize(LEGEND, size.width), controls: RECORD_GRAPH_CONTROLS_SIZE });
/** Screen box of these records (their 2px selection ring included) under a viewport. */
function screenSpan(positions: Map<string, { x: number; y: number }>, keys: string[], vp: { x: number; y: number; zoom: number }) {
  const ps = keys.map(key => positions.get(key)!);
  return {
    x0: Math.min(...ps.map(p => p.x)) * vp.zoom + vp.x, x1: (Math.max(...ps.map(p => p.x)) + NODE_W) * vp.zoom + vp.x,
    y0: (Math.min(...ps.map(p => p.y)) - 2) * vp.zoom + vp.y, y1: (Math.max(...ps.map(p => p.y)) + NODE_H) * vp.zoom + vp.y,
  };
}
function expectWhole(box: { x0: number; y0: number; x1: number; y1: number }, size: { width: number; height: number }, margin: number, label: string) {
  expect(box.x0, label).toBeGreaterThanOrEqual(margin - 0.5);
  expect(box.y0, label).toBeGreaterThanOrEqual(margin - 0.5);
  expect(box.x1, label).toBeLessThanOrEqual(size.width - margin + 0.5);
  expect(box.y1, label).toBeLessThanOrEqual(size.height - margin + 0.5);
}

test('the ladder thresholds: 0.7 readable, 0.6 neighbourhood, 0.4 focus minimum (also the whole-graph fit floor)', () => {
  expect(RECORD_GRAPH_READABLE_ZOOM).toBe(0.7);
  expect(RECORD_GRAPH_NEIGHBOURHOOD_ZOOM).toBe(0.6);
  expect(RECORD_GRAPH_FOCUS_MIN_ZOOM).toBe(0.4);
  expect(RECORD_GRAPH_FIT_ALL_MIN_ZOOM).toBe(RECORD_GRAPH_FOCUS_MIN_ZOOM);
});

test('25 records, 3 selected people: after the automatic fit the selected boxes are whole, 16px inside, on 1160 × 418, 369 and 209', () => {
  const graph = searchResult();
  const keys = graph.records.map(recordGraphKey);
  const focusKeys = keys.slice(0, 3);
  const fitKeys = recordGraphFitKeys(keys, graph.edges, focusKeys);
  for (const layout of ['force', 'radial', 'hierarchy'] as const) {
    // Laid out for each canvas, and — as when a host strip opens before the
    // re-layout lands — for the 418px canvas and viewed on a shorter one.
    for (const laidFor of [418, 369, 209]) {
      const positions = layoutRecordGraph(graph.records, graph.edges, layout, { width: 1160, height: laidFor });
      for (const height of [418, 369, 209]) {
        const size = { width: 1160, height };
        const label = `${layout} laid for ${laidFor}, viewed at ${height}`;
        const vp = recordGraphViewport(positions, size, { mode: 'auto', focusKeys, fitKeys, inset: insetFor(size) })!;
        expect(vp.zoom, label).toBeGreaterThanOrEqual(RECORD_GRAPH_FOCUS_MIN_ZOOM);
        expect(vp.zoom, label).toBeLessThanOrEqual(1);
        expectWhole(screenSpan(positions, focusKeys, vp), size, 16, label);
      }
    }
  }
});

test('the member journey: three people ~430 flow px tall on the 209px canvas zoom below the floor rather than clip one', () => {
  const graph = searchResult();
  const keys = graph.records.map(recordGraphKey);
  const focusKeys = keys.slice(0, 3);
  const positions = layoutRecordGraph(graph.records, graph.edges, 'force', CANVAS);
  const ys = focusKeys.map(key => positions.get(key)!.y);
  const tall = Math.max(...ys) - Math.min(...ys) + NODE_H + 2;
  const size = { width: 1160, height: 209 };
  expect(tall * RECORD_GRAPH_MIN_FIT_ZOOM).toBeGreaterThan(size.height - 32); // clipped at the old 0.8 floor
  for (const mode of ['auto', 'focus'] as const) {
    const vp = recordGraphViewport(positions, size, {
      mode, focusKeys, fitKeys: recordGraphFitKeys(keys, graph.edges, focusKeys), inset: insetFor(size),
    })!;
    expect(vp.zoom, mode).toBeLessThan(RECORD_GRAPH_MIN_FIT_ZOOM);
    expect(vp.zoom, mode).toBeGreaterThanOrEqual(RECORD_GRAPH_FOCUS_MIN_ZOOM);
    expectWhole(screenSpan(positions, focusKeys, vp), size, 16, mode);
  }
  // The viewer's whole-graph fit at 0.4 cannot show all 25 here; it keeps the selection whole instead of top-left aligning.
  const all = recordGraphViewport(positions, size, { mode: 'all', focusKeys, inset: insetFor(size), minZoom: RECORD_GRAPH_FIT_ALL_MIN_ZOOM })!;
  expect(all.zoom).toBeCloseTo(RECORD_GRAPH_FOCUS_MIN_ZOOM);
  expectWhole(screenSpan(positions, focusKeys, all), size, 16, 'all');
});

test('Radial on 1160 × 418 where the whole graph needs < 0.7: rung (b) or (c), the selection whole', () => {
  // Laid out for the 369px canvas (the answer strip open) and viewed at 418:
  // the drawing's fit-all is 0.55, the portal's Radial number.
  const graph = searchResult();
  const keys = graph.records.map(recordGraphKey);
  const focusKeys = keys.slice(0, 3);
  const fitKeys = recordGraphFitKeys(keys, graph.edges, focusKeys);
  const positions = layoutRecordGraph(graph.records, graph.edges, 'radial', { width: 1160, height: 369 });
  const inset = insetFor(CANVAS);
  const all = recordGraphViewport(positions, CANVAS, { mode: 'all', inset, minZoom: RECORD_GRAPH_FOCUS_MIN_ZOOM })!;
  expect(all.zoom).toBeLessThan(RECORD_GRAPH_READABLE_ZOOM);
  const vp = recordGraphViewport(positions, CANVAS, { mode: 'auto', focusKeys, fitKeys, inset })!;
  expect(vp).not.toEqual(all); // not rung (a)
  expect(vp.zoom).toBeGreaterThanOrEqual(RECORD_GRAPH_NEIGHBOURHOOD_ZOOM);
  expect(vp.zoom).toBeLessThanOrEqual(RECORD_GRAPH_MIN_FIT_ZOOM);
  expectWhole(screenSpan(positions, focusKeys, vp), CANVAS, 16, 'radial');
});

test('rung (b): the selection and its neighbours framed at 0.6–0.8 when the whole graph is not readable', () => {
  // Two selected records with three neighbours in an 830 × 500 flow block; far records 3000px away.
  const positions = new Map<string, { x: number; y: number }>([
    ['person:a', { x: 0, y: 0 }], ['person:b', { x: 690, y: 396 }],
    ['work:n1', { x: 345, y: 0 }], ['work:n2', { x: 0, y: 396 }], ['work:n3', { x: 690, y: 0 }],
    ['work:far1', { x: -3000, y: 0 }], ['work:far2', { x: 3000, y: 900 }],
  ]);
  const focusKeys = ['person:a', 'person:b'];
  const fitKeys = [...focusKeys, 'work:n1', 'work:n2', 'work:n3'];
  const inset = insetFor(CANVAS);
  const vp = recordGraphViewport(positions, CANVAS, { mode: 'auto', focusKeys, fitKeys, inset })!;
  expect(vp.zoom).toBeGreaterThanOrEqual(RECORD_GRAPH_NEIGHBOURHOOD_ZOOM);
  expect(vp.zoom).toBeLessThan(RECORD_GRAPH_MIN_FIT_ZOOM);
  expectWhole(screenSpan(positions, fitKeys, vp), CANVAS, 16, 'neighbourhood');
  // fitToFocus keeps its 0.8 floor for the neighbourhood, so it drops to the selection alone.
  const focus = recordGraphViewport(positions, CANVAS, { mode: 'focus', focusKeys, fitKeys, inset })!;
  expect(focus.zoom).toBeLessThanOrEqual(RECORD_GRAPH_MIN_FIT_ZOOM);
  expectWhole(screenSpan(positions, focusKeys, focus), CANVAS, 16, 'focus');
});

test('below 0.4 the selection keeps its circles whole', () => {
  // 466 flow px of boxes need 0.38 on 209px less 32; their circles (420px) fit at 0.4.
  const positions = new Map<string, { x: number; y: number }>([
    ['person:a', { x: 0, y: 0 }], ['person:b', { x: 0, y: 360 }], ['work:x', { x: 400, y: 700 }],
  ]);
  const size = { width: 1160, height: 209 };
  const vp = recordGraphViewport(positions, size, { mode: 'auto', focusKeys: ['person:a', 'person:b'], inset: insetFor(size) })!;
  expect(vp.zoom).toBeCloseTo(RECORD_GRAPH_FOCUS_MIN_ZOOM);
  const top = (0 - 2) * vp.zoom + vp.y, bottom = (360 + 58) * vp.zoom + vp.y;
  expect(top).toBeGreaterThanOrEqual(16 - 0.5);
  expect(bottom).toBeLessThanOrEqual(size.height - 16 + 0.5);
});
