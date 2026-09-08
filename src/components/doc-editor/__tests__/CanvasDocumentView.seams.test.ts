// Does a page seam cut through anything?
//
// jsdom has no layout engine, so no component test in this package can answer
// that: every height it reports is zero. What CAN be done — and what the
// pagination design was originally argued from — is to SIMULATE the layout
// from the exact metrics the paginated stylesheet declares, then score where
// the seams fall. This file is that simulation, run against the shipping
// `flowCanvasPages` rather than against a description of it.
//
// The numbers it reproduces are the ones in the styles.css header, which were
// measured the same way before `pageFlow.ts` existed:
//
//   prose only, baseline grid alone ......... 4.6% of seams bisected
//   prose + images + tables, grid alone ..... 57.0%
//
// and the ones this module exists to produce:
//
//   prose + images + tables, with the flow ... 0%
//
// The generator is seeded, so a regression here is reproducible rather than
// flaky. Raise ITERATIONS locally to tighten the estimate; 400 documents is
// enough to move the mixed-corpus rate by well under a point run to run and
// keeps the suite fast.

import { describe, expect, it } from 'vitest';
import {
  DOC_CONTENT_TOP,
  DOC_LINE,
  DOC_PAGE_GAP,
  DOC_PAGE_HEIGHT,
  flowCanvasPages,
  type CanvasBlock,
} from '../canvas/pageFlow';

// Bump with `UIC_SEAM_DOCS=1000 npx vitest run ...` to tighten the estimate and
// print the rates; 400 documents keeps the suite under a second and moves the
// mixed-corpus rate by well under a point run to run.
const ITERATIONS = Number(process.env.UIC_SEAM_DOCS ?? 400);
const REPORT = Boolean(process.env.UIC_SEAM_DOCS);
const report = (label: string, r: { seams: number; bisected: number; rate: number }) => {
  // eslint-disable-next-line no-console
  if (REPORT) console.log(`${label.padEnd(34)} ${r.bisected}/${r.seams} = ${(r.rate * 100).toFixed(1)}%`);
  return r;
};

// --- the type metrics, straight off `.doc-page--paginated` -----------------
//
// A line box of height L holding type of size F paints its ink — Inter's
// ascender plus descender, 1.211em — centred in the box. That half-leading is
// the ONLY clear space a seam may occupy, and it is the whole reason the
// baseline grid works at all.
const INK = 1.211;
const inkBand = (fontPx: number, boxPx: number): [number, number] => {
  const ink = fontPx * INK;
  const half = (boxPx - ink) / 2;
  return [half, half + ink];
};

interface SimBlock extends CanvasBlock {
  marginTop: number;
  marginBottom: number;
  /** Glyph ink, relative to the block's border-box top. */
  ink: Array<[number, number]>;
}

const lines = (n: number, fontPx: number, offset = 0): Array<[number, number]> => {
  const [a, b] = inkBand(fontPx, DOC_LINE);
  return Array.from({ length: n }, (_, i) => [offset + i * DOC_LINE + a, offset + i * DOC_LINE + b] as [number, number]);
};

// A seeded LCG. Deterministic beats `Math.random` for anything whose failure
// mode is "5.2%, sometimes".
function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 0x100000000;
  };
}

type Kind = 'p' | 'h1' | 'h2' | 'h3' | 'ul' | 'pre' | 'hr' | 'quote' | 'img' | 'table';

function build(kind: Kind, r: () => number): SimBlock {
  const pick = (lo: number, hi: number) => lo + Math.floor(r() * (hi - lo + 1));
  switch (kind) {
    case 'p': {
      const n = pick(1, 9);
      return {
        top: 0, height: n * DOC_LINE, splittable: true, onGrid: true,
        marginTop: 0, marginBottom: DOC_LINE, ink: lines(n, 16),
      };
    }
    case 'quote': {
      const n = pick(2, 5);
      return {
        top: 0, height: n * DOC_LINE, splittable: true, onGrid: true,
        marginTop: 0, marginBottom: DOC_LINE, ink: lines(n, 16),
      };
    }
    case 'ul': {
      const n = pick(2, 6);
      return {
        top: 0, height: n * DOC_LINE, splittable: true, onGrid: true,
        marginTop: 0, marginBottom: DOC_LINE, ink: lines(n, 16),
      };
    }
    case 'h1':
      // Two grid rows, because 32px type cannot wrap on 26.4px leading.
      return {
        top: 0, height: DOC_LINE * 2, splittable: false, onGrid: true, keepWithNext: true,
        marginTop: DOC_LINE * 2, marginBottom: DOC_LINE, ink: [inkBand(32, DOC_LINE * 2)],
      };
    case 'h2':
      // 24px ink in a 26.4px box OVERFLOWS it by 1.33px each side — this is
      // the irreducible 4.6% the styles.css header names.
      return {
        top: 0, height: DOC_LINE, splittable: false, onGrid: true, keepWithNext: true,
        marginTop: DOC_LINE * 2, marginBottom: DOC_LINE, ink: [inkBand(24, DOC_LINE)],
      };
    case 'h3':
      return {
        top: 0, height: DOC_LINE, splittable: false, onGrid: true, keepWithNext: true,
        marginTop: DOC_LINE * 2, marginBottom: DOC_LINE, ink: [inkBand(19.2, DOC_LINE)],
      };
    case 'pre': {
      const n = pick(2, 12);
      return {
        top: 0, height: (n + 2) * DOC_LINE, splittable: false, onGrid: true,
        marginTop: 0, marginBottom: DOC_LINE, ink: lines(n, 14.4, DOC_LINE),
      };
    }
    case 'hr':
      return {
        top: 0, height: DOC_LINE, splittable: false, onGrid: true,
        marginTop: 0, marginBottom: DOC_LINE, ink: [[DOC_LINE / 2 - 0.5, DOC_LINE / 2 + 0.5]],
      };
    case 'img': {
      // The intrinsic height that has no relationship to the grid, and the
      // `0.9em auto` margin the paginated stylesheet deliberately leaves alone.
      const h = pick(90, 430);
      return {
        top: 0, height: h, splittable: false, onGrid: false,
        marginTop: 14.4, marginBottom: 14.4, ink: [[0, h]],
      };
    }
    case 'table': {
      // Cell padding 0.4em top and bottom around a 26.4px line, plus collapsed
      // 1px borders.
      const rows = pick(2, 8);
      const h = rows * (DOC_LINE + 12.8 + 1) + 1;
      return {
        top: 0, height: h, splittable: false, onGrid: false,
        marginTop: 14.4, marginBottom: 14.4, ink: [[0, h]],
      };
    }
  }
}

const PROSE: Array<[Kind, number]> = [['p', 52], ['h2', 12], ['h3', 8], ['h1', 3], ['ul', 12], ['pre', 6], ['quote', 5], ['hr', 2]];
const MIXED: Array<[Kind, number]> = [...PROSE, ['img', 12], ['table', 6]];

function weighted(table: Array<[Kind, number]>, r: () => number): Kind {
  const total = table.reduce((a, [, w]) => a + w, 0);
  let t = r() * total;
  for (const [k, w] of table) { t -= w; if (t <= 0) return k; }
  return table[0]![0];
}

function makeDocument(table: Array<[Kind, number]>, r: () => number): SimBlock[] {
  const n = 25 + Math.floor(r() * 46);
  return Array.from({ length: n }, () => build(weighted(table, r), r));
}

/**
 * Lay the blocks out the way the browser would: adjacent margins collapse, the
 * first block's top margin is zeroed by the `:first-child` rule and the last
 * block's bottom margin by the `:last-child` rule.
 *
 * `pushes` is extra space ABOVE each block. Passing zeros gives the layout as
 * the baseline grid alone produces it, which is the "before" column.
 */
function layout(blocks: SimBlock[], pushes: number[]): { ink: Array<[number, number]>; height: number } {
  const ink: Array<[number, number]> = [];
  let y = 0;
  let prevBottomMargin = 0;
  blocks.forEach((b, i) => {
    const gap = i === 0 ? 0 : Math.max(prevBottomMargin, b.marginTop);
    y += gap + (pushes[i] ?? 0);
    b.top = y;
    for (const [a, z] of b.ink) ink.push([y + a, y + z]);
    y += b.height;
    prevBottomMargin = b.marginBottom;
  });
  return { ink, height: y };
}

/** Seams in content coordinates, and whether each one lands on ink. */
function scoreSeams(ink: Array<[number, number]>, height: number): { seams: number; bisected: number } {
  const pages = Math.max(1, Math.ceil((DOC_CONTENT_TOP * 2 + height) / DOC_PAGE_HEIGHT));
  let seams = 0;
  let bisected = 0;
  for (let k = 1; k < pages; k += 1) {
    const s = k * DOC_PAGE_HEIGHT - DOC_CONTENT_TOP;
    const band: [number, number] = [s - DOC_PAGE_GAP / 2, s + DOC_PAGE_GAP / 2];
    seams += 1;
    if (ink.some(([a, b]) => b - band[0] > 0.05 && band[1] - a > 0.05)) bisected += 1;
  }
  return { seams, bisected };
}

function run(table: Array<[Kind, number]>, withFlow: boolean, seed: number) {
  const r = rng(seed);
  let seams = 0;
  let bisected = 0;
  for (let d = 0; d < ITERATIONS; d += 1) {
    const blocks = makeDocument(table, r);
    // The flow needs natural tops, so lay out unpushed first either way.
    layout(blocks, new Array(blocks.length).fill(0));
    const pushes = withFlow
      ? flowCanvasPages(blocks).pushes
      : new Array<number>(blocks.length).fill(0);
    const { ink, height } = layout(blocks, pushes);
    const s = scoreSeams(ink, height);
    seams += s.seams;
    bisected += s.bisected;
  }
  return { seams, bisected, rate: bisected / Math.max(1, seams) };
}

describe('page seams, simulated against the paginated stylesheet metrics', () => {
  it('reproduces the residual the baseline grid alone leaves on prose', () => {
    // ~4.6%: h2/h3 ink overflows its single-row line box by 1.33px each side,
    // and h1 puts an interior row boundary through the middle of its glyphs.
    // No stylesheet can fix this, which is why the flow moves the heading.
    const before = report('prose, grid only', run(PROSE, false, 7));
    expect(before.seams).toBeGreaterThan(500);
    // Wider than the 4.6% in the styles.css header, and deliberately so: that
    // figure came from a corpus whose heading density this generator does not
    // claim to reproduce, and headings ARE the residual. What both agree on is
    // the shape — a few per cent, entirely attributable to headings.
    expect(before.rate).toBeGreaterThan(0.02);
    expect(before.rate).toBeLessThan(0.15);
  });

  it('reproduces the collapse the baseline grid alone suffers on pictures', () => {
    // ~57%: an image's intrinsic height knocks every line below it off the
    // grid, and stays off for the rest of the document.
    const before = report('mixed, grid only', run(MIXED, false, 11));
    expect(before.rate).toBeGreaterThan(0.35);
  });

  it('cuts nothing once the flow runs, prose or pictures', () => {
    for (const [name, table, seed] of [['prose', PROSE, 7], ['mixed', MIXED, 11]] as const) {
      const after = report(`${name}, grid + flow`, run(table, true, seed));
      expect(after.seams, `${name}: no seams were exercised`).toBeGreaterThan(500);
      expect(after.bisected, `${name}: ${after.bisected}/${after.seams} seams bisected`).toBe(0);
    }
  });

  it('does not pay for it in pages', () => {
    // The flow buys clean seams with whitespace, and whitespace costs sheets.
    // The guard is that it stays a rounding error rather than a reflow: more
    // than about a page in eight would mean the pushes are fighting each other.
    const r = rng(23);
    let plain = 0;
    let flowed = 0;
    for (let d = 0; d < ITERATIONS; d += 1) {
      const blocks = makeDocument(MIXED, r);
      const zero = layout(blocks, new Array(blocks.length).fill(0));
      plain += Math.ceil((DOC_CONTENT_TOP * 2 + zero.height) / DOC_PAGE_HEIGHT);
      flowed += flowCanvasPages(blocks).pageCount;
    }
    expect(flowed).toBeGreaterThanOrEqual(plain);
    expect(flowed / plain).toBeLessThan(1.13);
  });

  it('leaves a prose document exactly where the grid already put it', () => {
    // The flow must be free where the baseline grid was already correct, or
    // every existing paginated document reflows for nothing. Paragraphs, lists
    // and code sit on whole rows already; only headings can move, and only
    // when a seam actually reaches one.
    const blocks = [
      build('p', rng(1)),
      build('p', rng(2)),
      build('ul', rng(3)),
    ];
    layout(blocks, [0, 0, 0]);
    expect(flowCanvasPages(blocks).pushes).toEqual([0, 0, 0]);
  });
});
