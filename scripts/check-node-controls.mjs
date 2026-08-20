#!/usr/bin/env node
//
// Guards the pipeline node config panels against hand-rolled form controls.
//
// Every panel is supposed to build its fields from ConfigField plus the
// forms/ composites (Input, Select, Textarea, NumberInput, RadioGroup) and
// shared/ (SamplePills, SourceImagePathField). Raw <input>/<select>/<textarea>
// bring their own class strings, and those diverge: an audit on 2026-08-18
// found FOUR different definitions of the same `inputCls` constant across 17
// files, so the same field rendered differently depending on which node you
// had selected — and all four hardcoded `bg-white` instead of a surface token.
// That is the Chip/Badge tone divergence from v2.39.0 in a different guise.
//
// This runs as a RATCHET, not a wall. The files still to convert are listed in
// BASELINE with their current control count. A file may only get better:
//   - a count above its baseline fails (you added a hand-rolled control),
//   - a count below its baseline fails too, asking you to lower the number,
//     so the ratchet actually tightens instead of silently going slack,
//   - a file not in BASELINE must have zero.
//
// Delete a file's entry when it reaches zero. When BASELINE is empty, this
// becomes a plain "no hand-rolled controls" rule.

import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = 'src/components/pipelines';
const CONTROL_RE = /<(select|textarea|input)\b/g;

/**
 * File (relative to ROOT) -> raw controls still allowed.
 *
 * Scope widened from pipelines/nodes to ALL of pipelines on 2026-08-20; the
 * node config panels themselves are at zero and must stay there. Every entry
 * below is a JUSTIFIED exception, not unconverted debt — a raw element is the
 * correct implementation for it. If you convert one anyway, lower or delete
 * its entry. If a new panel needs something the composites cannot express,
 * add the primitive to forms/ first (the way Slider, ToggleField and Checkbox
 * were added), don't add an entry here.
 */
const BASELINE = {
  // Terminal-styled dev inspector (Catppuccin palette); deliberately NOT the
  // light form language — it reads as a debugger, because it is one.
  'context-inspector/ContextEditBuffer.tsx': 6,
  // Dev-only simulator payload editor, same reasoning.
  'dev/EventPayloadEditor.tsx': 3,
  // Invisible test hook (zero-size, tabIndex=-1) — not a user-facing control.
  'RunsTable.tsx': 1,
  // Invisible a11y range overlaid on the custom-drawn replay timeline;
  // a visible Slider track would double-draw the scrubber.
  'replay/Scrubber.tsx': 1,
  // Floating in-canvas label editor positioned over the drawn bbox.
  'vision/BBoxAuthoringCanvas.tsx': 1,
  // Palette-toned search field (surface-panel bg, info focus ring) — the
  // palette's own visual language, not the standard field chrome.
  'canvas/NodePalette.tsx': 1,
  // Command-palette-style inline input inside the quick-insert popover.
  'canvas/QuickInsertPopover.tsx': 1,
  // Borderless inline-rename field in the editor top bar.
  'editor/EditorTopBar.tsx': 1,
};

/** Strip comments so a code sample in a doc comment isn't counted. */
function stripComments(source) {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .split('\n')
    .filter((line) => !line.trim().startsWith('//'))
    .join('\n');
}

const counts = new Map();

function walk(dir, prefix = '') {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      if (entry.name !== '__tests__') walk(join(dir, entry.name), rel);
      continue;
    }
    if (!entry.name.endsWith('.tsx') || entry.name.endsWith('.stories.tsx')) continue;
    const code = stripComments(readFileSync(join(dir, entry.name), 'utf8'));
    const n = [...code.matchAll(CONTROL_RE)].length;
    if (n > 0) counts.set(rel, n);
  }
}

walk(ROOT);

const errors = [];

for (const [file, n] of [...counts].sort()) {
  const allowed = BASELINE[file];
  if (allowed === undefined) {
    errors.push(
      `${file}: ${n} hand-rolled control(s). Use ConfigField + the forms/ composites ` +
        `(Input, Select, Textarea, NumberInput, RadioGroup) instead.`,
    );
  } else if (n > allowed) {
    errors.push(`${file}: ${n} hand-rolled control(s), baseline allows ${allowed}. Do not add more.`);
  }
}

for (const [file, allowed] of Object.entries(BASELINE)) {
  const n = counts.get(file) ?? 0;
  if (n < allowed) {
    errors.push(
      `${file}: down to ${n} (baseline says ${allowed}) — nice. ` +
        `Lower it to ${n} in scripts/check-node-controls.mjs${n === 0 ? ', or delete the entry.' : '.'}`,
    );
  }
}

const total = [...counts.values()].reduce((a, b) => a + b, 0);

if (errors.length > 0) {
  console.error('check-node-controls: FAIL\n');
  for (const e of errors) console.error('  ' + e);
  console.error(`\n${counts.size} file(s), ${total} raw control(s) remaining.`);
  process.exit(1);
}

console.log(
  Object.keys(BASELINE).length === 0
    ? 'ok check-node-controls: pass (no hand-rolled controls under pipelines/).'
    : `ok check-node-controls: pass (${counts.size} file(s) with justified raw ` +
      `control(s), ${total} total — see BASELINE for why each is exempt).`,
);
