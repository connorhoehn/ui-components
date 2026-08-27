#!/usr/bin/env node
//
// Guards ALL of src/components against hand-rolled form controls.
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

const ROOT = 'src/components';
const CONTROL_RE = /<(select|textarea|input)\b/g;

/**
 * File (relative to ROOT) -> raw controls still allowed.
 *
 * Scope widened to ALL of src/components on 2026-08-21 — the migration is
 * complete; identity, typed-documents, doc-types, ingest, social, doc-editor,
 * observability, agents, collaboration, video and field-types are converted.
 * Every entry below is a JUSTIFIED exception, not unconverted debt — either
 * the primitive itself (forms/, shared pickers) or chrome where a raw element
 * is the correct implementation (media scrubbers, hidden inputs). If a page
 * needs something the composites cannot express, add the primitive to forms/
 * first (the way Slider, Checkbox and ColorInput were added), don't add an
 * entry here.
 */
const BASELINE = {
  // ---- forms/: the primitives themselves. The raw element IS the component;
  // everything else in the tree is supposed to reach these instead.
  'forms/Input.tsx': 2, // plain + prefix/suffix variants
  'forms/Select.tsx': 1,
  'forms/Textarea.tsx': 1,
  'forms/RadioGroup.tsx': 1,
  'forms/Checkbox.tsx': 1,
  'forms/Slider.tsx': 1,
  'forms/ColorInput.tsx': 1,

  // ---- shared/: composite primitives whose embedded control is their own
  // body (a picker's query field, a composer's message field). Fine as raw;
  // converting them to forms/ internals is optional polish, not debt.
  'shared/SearchInput.tsx': 1,
  'shared/TagEditor.tsx': 1,
  'shared/UserPicker.tsx': 1,
  'shared/IconPicker.tsx': 1,

  // ---- compute/: terminal chrome. These two are command lines, not form
  // fields — they live inside a code-toned pane and take ⏎ as "execute". A
  // forms/ Textarea brings a rounded app-surface box with an emphasis border,
  // which is exactly the affordance a multiplexer's command line must not
  // have: it would read as a field to fill in rather than a prompt to type at.
  // Same justification as SearchInput's query field, directly above. (A third
  // entry here was the agent pane's prompt box, deleted in 7395cd8: a textarea
  // that looked like a shell and was not one.)
  'compute/components/ComputerLab.tsx': 1,   // broadcast command line
  'compute/components/LabChooser.tsx': 1,    // fuzzy-jump query
  'shared/ChatComposer.tsx': 2, // input or textarea depending on `multiline`
  'shared/CodeEditor.tsx': 1, // the editor surface itself
  'shared/DataTable.tsx': 1, // built-in search field
  'shared/FileUploadDrop.tsx': 1, // invisible file input behind the drop zone

  // ---- identity/
  'identity/shared/CodeInput.tsx': 1, // OTP digit boxes — the primitive itself
  'identity/auth/LoginPage.tsx': 1, // <input type="hidden"> — not a control

  // ---- typed-documents/
  // Invisible file-input trigger behind the styled Bulk Import label.
  'typed-documents/TypedDocumentsPage.tsx': 1,

  // ---- video/
  // Player-overlay seek + volume ranges: media chrome (white accent on a
  // gradient, --progress fill var), not form controls.
  'video/RecordingPlayer.tsx': 2,

  // ---- pipelines/ (unchanged from the 2026-08-20 widening)
  // Terminal-styled dev inspector (Catppuccin palette); deliberately NOT the
  // light form language — it reads as a debugger, because it is one.
  'pipelines/context-inspector/ContextEditBuffer.tsx': 6,
  // Dev-only simulator payload editor, same reasoning.
  'pipelines/dev/EventPayloadEditor.tsx': 3,
  // Invisible test hook (zero-size, tabIndex=-1) — not a user-facing control.
  'pipelines/RunsTable.tsx': 1,
  // Invisible a11y range overlaid on the custom-drawn replay timeline;
  // a visible Slider track would double-draw the scrubber.
  'pipelines/replay/Scrubber.tsx': 1,
  // Floating in-canvas label editor positioned over the drawn bbox.
  'pipelines/vision/BBoxAuthoringCanvas.tsx': 1,
  // Palette-toned search field (surface-panel bg, info focus ring) — the
  // palette's own visual language, not the standard field chrome.
  'pipelines/canvas/NodePalette.tsx': 1,
  // Command-palette-style inline input inside the quick-insert popover.
  'pipelines/canvas/QuickInsertPopover.tsx': 1,
  // Borderless inline-rename field in the editor top bar.
  'pipelines/editor/EditorTopBar.tsx': 1,
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
