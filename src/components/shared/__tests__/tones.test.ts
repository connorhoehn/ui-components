// Guards the branding scheme.
//
// The problem this exists to prevent: Chip, Badge and StackDiagram each grew
// their own `Record<Tone, string>` of raw Tailwind palette classes, and they
// disagreed — Chip's success was green-50/green-600, Badge's was
// emerald-100/emerald-700. The same semantic state rendered in two different
// greens depending on which component you reached for, and rebranding meant
// hunting literals across three files.
//
// So: tinted surfaces go through tones.ts (or the token classes directly), and
// no component names a raw palette colour for a semantic state.

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, it, expect } from 'vitest';
import {
  TONES,
  TONE_SOFT,
  TONE_SOLID,
  TONE_SOLID_BG,
  TONE_BORDER,
  TONE_TEXT,
  TONE_BG,
  toneKey,
  toneVar,
} from '../tones';

// Scan all of src/ — renderers/ and integrations/ ship too, and both had
// palette literals that a components-only scan missed.
const SRC_DIR = join(__dirname, '..', '..', '..');

/** Palette families that carry semantic meaning and therefore must be tokens. */
const SEMANTIC_FAMILIES = [
  'green', 'emerald', 'red', 'rose', 'amber', 'yellow',
  'blue', 'sky', 'indigo', 'orange', 'purple', 'violet',
];

// Any utility that takes a colour. A focus ring, an SVG fill and a gradient
// stop are all semantic choices, so none of them get a pass.
const PREFIXES = [
  'bg', 'text', 'border', 'border-l', 'border-r', 'border-t', 'border-b',
  'ring', 'fill', 'stroke', 'divide', 'outline', 'decoration', 'accent',
  'caret', 'shadow', 'from', 'to', 'via',
];

const PALETTE_RE = new RegExp(
  `\\b(?:${PREFIXES.join('|')})-(?:${SEMANTIC_FAMILIES.join('|')})-\\d{2,3}\\b`,
  'g',
);

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      if (entry === '__tests__' || entry === 'node_modules') continue;
      walk(full, out);
    } else if (entry.endsWith('.tsx') || entry.endsWith('.ts')) {
      // Stories are included: they are what people copy from, so a raw
      // palette colour in one teaches the wrong pattern.
      out.push(full);
    }
  }
  return out;
}

describe('tone scale', () => {
  it('defines every role for every tone', () => {
    for (const tone of TONES) {
      for (const [name, map] of Object.entries({
        TONE_SOFT, TONE_SOLID, TONE_SOLID_BG, TONE_BORDER, TONE_TEXT, TONE_BG,
      })) {
        expect(
          (map as Record<string, string>)[tone],
          `${name} is missing tone "${tone}"`,
        ).toBeTruthy();
      }
    }
  });

  it('only references token colours, never raw palette classes', () => {
    const offenders: string[] = [];
    for (const map of [
      TONE_SOFT, TONE_SOLID, TONE_SOLID_BG, TONE_BORDER, TONE_TEXT, TONE_BG,
    ]) {
      for (const [tone, classes] of Object.entries(map)) {
        const hits = classes.match(PALETTE_RE);
        if (hits) offenders.push(`${tone}: ${hits.join(', ')}`);
      }
    }
    expect(offenders).toEqual([]);
  });

  it('folds the deprecated purple alias onto accent', () => {
    expect(toneKey('purple')).toBe('accent');
    expect(toneKey('success')).toBe('success');
  });

  it('exposes a CSS variable per tone for canvas/SVG callers', () => {
    expect(toneVar('success')).toBe('var(--color-success)');
    expect(toneVar('purple')).toBe('var(--color-accent)');
  });
});

describe('nothing hardcodes a semantic palette colour', () => {
  // Zero tolerance. This started as a baseline of 91 files; all of them were
  // converted, so the allowlist is gone and any new palette literal fails here.
  // If you need a colour the tone scale does not express, add a tone (four CSS
  // variables in styles.css + an entry in tones.ts) rather than a literal.
  it('src/** uses tone tokens, not bg-green-600 & friends', () => {
    const offenders: string[] = [];
    for (const file of walk(SRC_DIR)) {
      const rel = file.slice(file.indexOf('src/'));
      if (rel.endsWith('__tests__/tones.test.ts')) continue; // this file's own regex
      const hits = readFileSync(file, 'utf8').match(PALETTE_RE);
      if (hits) offenders.push(`${rel} -> ${[...new Set(hits)].join(', ')}`);
    }
    expect(
      offenders,
      `Use the tone scale (src/components/shared/tones.ts) or token classes\n` +
        `(bg-success-bg, text-danger-fg, ring-primary, ...) instead of raw\n` +
        `palette colours.\n` + offenders.join('\n'),
    ).toEqual([]);
  });
});
