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
        marginTop: 0, marginBottom: 8, ink: lines(n, 16),
      };
    }
    case 'quote': {
      const n = pick(2, 5);
      return {
        top: 0, height: n * DOC_LINE, splittable: true, onGrid: true,
        marginTop: 0, marginBottom: 8, ink: lines(n, 16),
      };
    }
    case 'ul': {
      const n = pick(2, 6);
      return {
        top: 0, height: n * DOC_LINE, splittable: true, onGrid: true,
        marginTop: 0, marginBottom: 8, ink: lines(n, 16),
      };
    }
    case 'h1':
      // 36px type in a 44px line box, 24px above and 4px below (2.385.6).
      return {
        top: 0, height: 44, splittable: false, onGrid: true, keepWithNext: true,
        marginTop: 24, marginBottom: 4, ink: [inkBand(36, 44)],
      };
    case 'h2':
      // 22px type in a 28px box, 20px above and 8px below.
      return {
        top: 0, height: 28, splittable: false, onGrid: true, keepWithNext: true,
        marginTop: 20, marginBottom: 8, ink: [inkBand(22, 28)],
      };
    case 'h3':
      return {
        top: 0, height: DOC_LINE, splittable: false, onGrid: true, keepWithNext: true,
        marginTop: 16, marginBottom: 4, ink: [inkBand(18, DOC_LINE)],
      };
    case 'pre': {
      const n = pick(2, 12);
      return {
        top: 0, height: n * DOC_LINE + 24, splittable: false, onGrid: true,
        marginTop: 0, marginBottom: 8, ink: lines(n, 14, 12),
      };
    }
    case 'hr':
      return {
        top: 0, height: 16, splittable: false, onGrid: true,
        marginTop: 0, marginBottom: 4, ink: [[7.5, 8.5]],
      };
    case 'img': {
      // The intrinsic height that has no relationship to the grid, and the
      // `0.9em auto` margin the paginated stylesheet deliberately leaves alone.
      const h = pick(90, 430);
      return {
        top: 0, height: h, splittable: false, onGrid: false,
        marginTop: 12, marginBottom: 12, ink: [[0, h]],
      };
    }
    case 'table': {
      // Cell padding 6px top and bottom around a 24px line, plus collapsed
      // 1px borders.
      const rows = pick(2, 8);
      const h = rows * (DOC_LINE + 12 + 1) + 1;
      return {
        top: 0, height: h, splittable: false, onGrid: false,
        marginTop: 12, marginBottom: 12, ink: [[0, h]],
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

/**
 * The band this design shipped with before pages had margins: 6px, chosen to
 * fit inside the 7.02px of clear leading a body line leaves. The baselines
 * below are scored against it because it is the band they were measured with —
 * scoring the pre-margin model against the 24px gap the post-margin one paints
 * would be comparing two different questions and calling it a regression.
 */
const HAIRLINE = 6;

/**
 * How far an h2's glyphs overflow their own line box: 24px of Inter ink is
 * 29.06px tall in a 26.4px single-row box, so 1.33px of ascender sits above the
 * box and 1.33px of descender below it. This is residual 1 in the styles.css
 * header — the irreducible one, the reason the flow treats headings as
 * unsplittable at all — and it is why the margin score below allows this much
 * slack. A heading whose BOX starts exactly at the top of the text area is
 * correctly placed; its ink starting 1.33px higher is a property of the type,
 * not of the pagination, and Google Docs does the same thing. Anything deeper
 * than this into a margin is a real invasion.
 */
const INK_OVERSHOOT = Math.max(0, -inkBand(22, 28)[0], -inkBand(36, 44)[0]);

/**
 * Page boundaries in content coordinates, and whether each one lands on ink.
 *
 * `reach` is how far from the boundary counts as a hit. Two values are used:
 * half the painted gap (does the band cut the type?) and the full page margin
 * (is there ink in the margin at all?). The second is the strictly harder
 * question and the one the margins exist to answer.
 */
function scoreSeams(
  ink: Array<[number, number]>,
  height: number,
  reach: number,
): { seams: number; bisected: number } {
  const pages = Math.max(1, Math.ceil((DOC_CONTENT_TOP * 2 + height) / DOC_PAGE_HEIGHT));
  let seams = 0;
  let bisected = 0;
  for (let k = 1; k < pages; k += 1) {
    const s = k * DOC_PAGE_HEIGHT - DOC_CONTENT_TOP;
    const band: [number, number] = [s - reach, s + reach];
    seams += 1;
    if (ink.some(([a, b]) => b - band[0] > 0.05 && band[1] - a > 0.05)) bisected += 1;
  }
  return { seams, bisected };
}

function run(table: Array<[Kind, number]>, withFlow: boolean, seed: number, reach: number) {
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
    const s = scoreSeams(ink, height, reach);
    seams += s.seams;
    bisected += s.bisected;
  }
  return { seams, bisected, rate: bisected / Math.max(1, seams) };
}

describe('page seams, simulated against the paginated stylesheet metrics', () => {
  it('relies on the flow, not the stylesheet, even for prose', () => {
    // Until 2.385.6 the stylesheet alone kept a hairline seam out of prose
    // (~4.6% bisected, all headings) because every margin was a whole 26.4px
    // line. The 4px grid gives that up on purpose — it is what buys 8px
    // between paragraphs — so without the flow a seam lands on text most of
    // the time. The next two tests are therefore the ones that matter.
    const before = report('prose, grid only', run(PROSE, false, 7, HAIRLINE / 2));
    expect(before.seams).toBeGreaterThan(500);
    expect(before.rate).toBeGreaterThan(0.35);
  });

  it('reproduces the collapse the baseline grid alone suffers on pictures', () => {
    // ~57%: an image's intrinsic height knocks every line below it off the
    // grid, and stays off for the rest of the document.
    const before = report('mixed, grid only', run(MIXED, false, 11, HAIRLINE / 2));
    expect(before.rate).toBeGreaterThan(0.35);
  });

  it('cuts nothing once the flow runs, prose or pictures', () => {
    // Scored against the band that is actually PAINTED, which is now 24px
    // rather than 6px. A 24px band is the one the styles.css header names as
    // bisecting 94.8% of boundaries under the old model — it is safe here only
    // because of the margins the next test measures.
    for (const [name, table, seed] of [['prose', PROSE, 7], ['mixed', MIXED, 11]] as const) {
      const after = report(`${name}, grid + flow`, run(table, true, seed, DOC_PAGE_GAP / 2));
      expect(after.seams, `${name}: no seams were exercised`).toBeGreaterThan(500);
      expect(after.bisected, `${name}: ${after.bisected}/${after.seams} seams bisected`).toBe(0);
    }
  });

  it('puts no ink in a page margin, on any page', () => {
    // The assertion the whole margin change exists for, and it is a much
    // stronger one than "the painted band misses the type": nothing may come
    // within an inch of a boundary from either side. Under the pre-margin flow
    // this scores near 100% by construction — that model filled the page to
    // the boundary on purpose.
    for (const [name, table, seed] of [['prose', PROSE, 7], ['mixed', MIXED, 11]] as const) {
      const after = report(`${name}, margins`, run(table, true, seed, DOC_CONTENT_TOP - INK_OVERSHOOT));
      expect(after.seams, `${name}: no boundaries were exercised`).toBeGreaterThan(400);
      expect(after.bisected, `${name}: ${after.bisected}/${after.seams} margins invaded`).toBe(0);
    }
  });

  it('costs a few more sheets, and no more', () => {
    // Margins are 96px of every 1056 (211.2px until 2.385.6), and a paragraph
    // that can no longer flow through a boundary leaves a ragged page bottom
    // on top of that. Measured: ~1.15x (it was 1.30x with inch margins). The guard is not that it is cheap — it is not — but
    // that the two known costs account for all of it. Anything approaching
    // 1.5x would mean pushes are fighting each other or a block class is
    // being moved that should not be.
    const r = rng(23);
    let plain = 0;
    let hairline = 0;
    let flowed = 0;
    for (let d = 0; d < ITERATIONS; d += 1) {
      const blocks = makeDocument(MIXED, r);
      const zero = layout(blocks, new Array(blocks.length).fill(0));
      plain += Math.ceil((DOC_CONTENT_TOP * 2 + zero.height) / DOC_PAGE_HEIGHT);
      hairline += flowCanvasPages(blocks, { pageMargin: 0 }).pageCount;
      flowed += flowCanvasPages(blocks).pageCount;
    }
    expect(flowed).toBeGreaterThanOrEqual(plain);
    expect(flowed / plain).toBeGreaterThan(1.05);
    expect(flowed / plain).toBeLessThan(1.3);
    // And the bill belongs to the margins, not to the seam avoidance that was
    // already there: without them the flow is still nearly free.
    expect(hairline / plain).toBeLessThan(1.13);
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
