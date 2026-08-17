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

const COMPONENTS_DIR = join(__dirname, '..', '..');

/** Palette families that carry semantic meaning and therefore must be tokens. */
const SEMANTIC_FAMILIES = [
  'green', 'emerald', 'red', 'rose', 'amber', 'yellow',
  'blue', 'sky', 'indigo', 'orange', 'purple', 'violet',
];

// Utility prefixes where a colour is a *semantic* choice. Deliberately not
// exhaustive over all Tailwind utilities — `ring-`, `from-`/`to-` gradients and
// one-off decorative accents are out of scope.
const PREFIXES = ['bg', 'text', 'border'];

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
    } else if (
      (entry.endsWith('.tsx') || entry.endsWith('.ts')) &&
      !entry.endsWith('.stories.tsx')
    ) {
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

describe('no NEW component hardcodes a semantic palette colour', () => {
  // 91 files predate the tone scale and are baselined in
  // scripts/tone-palette.allowlist.txt. This guard fails on anything not on
  // that list, so the backlog can shrink but not grow.
  const baseline = new Set(
    readFileSync(join(__dirname, '..', '..', '..', '..', 'scripts', 'tone-palette.allowlist.txt'), 'utf8')
      .split('\n')
      .map((l) => l.replace(/#.*$/, '').trim())
      .filter(Boolean),
  );

  it('uses tone tokens, not bg-green-600 & friends', () => {
    const offenders: string[] = [];
    for (const file of walk(COMPONENTS_DIR)) {
      const rel = file.slice(file.indexOf('src/'));
      if (baseline.has(rel)) continue;
      const hits = readFileSync(file, 'utf8').match(PALETTE_RE);
      if (hits) offenders.push(`${rel} -> ${[...new Set(hits)].join(', ')}`);
    }
    expect(
      offenders,
      `Use the tone scale (src/components/shared/tones.ts) or token classes\n` +
        `(bg-success-bg, text-danger-fg, ...) instead of raw palette colours.\n` +
        offenders.join('\n'),
    ).toEqual([]);
  });

  it('reports baseline entries that no longer need to be listed', () => {
    const stale = [...baseline].filter((rel) => {
      try {
        return !PALETTE_RE.test(readFileSync(join(process.cwd(), rel), 'utf8'));
      } catch {
        return true; // file moved or deleted
      }
    });
    // Informational, not a failure: shrinking the list is the goal.
    if (stale.length) {
      console.info(
        `[tones] ${stale.length} baseline entr${stale.length === 1 ? 'y' : 'ies'} ` +
          `can be removed from scripts/tone-palette.allowlist.txt:\n  ${stale.join('\n  ')}`,
      );
    }
    expect(true).toBe(true);
  });
});
