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
import { parseGuardArgs, readAllowlist } from './guard-cli.mjs';

const USAGE = `Usage: ui-check-node-controls [--root <dir>]... [--allowlist <file>]

Fails when a .tsx/.jsx file under the roots renders a raw <input>, <select> or
<textarea> instead of the @connorhoehnslalom/ui-components forms/ composites.
Allowlist lines are "<path> [maxCount]  # why"; with a count the entry is a
ratchet (above fails, below asks you to lower it), without one any count passes.

With no --root, scans this repo's src/components against the BASELINE in
scripts/check-node-controls.mjs.`;

const args = parseGuardArgs({ name: 'check-node-controls', scriptUrl: import.meta.url, usage: USAGE });

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
  // The invisible file picker behind a styled trigger. Added 2026-09-07 after
  // finding the same element hand-rolled three times (ChatPanel,
  // RichChatComposer, FileUploadDrop), twice missing the aria-hidden/tabIndex
  // pair and once missing the value reset that makes re-picking the SAME file
  // fire change. A file input has no stylable surface, so this is the one place
  // that plumbing should live.
  'forms/FileInput.tsx': 1,

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

  // ---- social/: zero. ChatPanel's and RichChatComposer's paperclip file
  // pickers were the last two, and they now reach forms/FileInput instead of
  // each keeping their own copy of the same plumbing.

  // ---- identity/
  'identity/shared/CodeInput.tsx': 1, // OTP digit boxes — the primitive itself
  'identity/auth/LoginPage.tsx': 1, // <input type="hidden"> — not a control

  // ---- video/
  // Player-overlay seek + volume ranges: media chrome (white accent on a
  // gradient, --progress fill var), not form controls.
  'video/RecordingPlayer.tsx': 2,

  // ---- pipelines/
  // Terminal-styled dev inspector: every field is bg-code-bg / text-code-text /
  // border-code-border / font-mono, i.e. the code pane's palette rather than the
  // form language. Reads as a debugger, because it is one.
  'pipelines/context-inspector/ContextEditBuffer.tsx': 5,
  // Invisible test hook (zero-size, opacity-0, pointer-events-none,
  // tabIndex={-1}) — the compare picker is driven by the row, not by this.
  // Not a user-facing control, so there is nothing for a Checkbox to render.
  'pipelines/RunsTable.tsx': 1,
  // Invisible a11y range overlaid on the custom-drawn replay timeline;
  // a visible Slider track would double-draw the scrubber.
  'pipelines/replay/Scrubber.tsx': 1,
  // Command-palette input inside the quick-insert popover. It is autofocused
  // for its whole lifetime, so Input's focus ring would be permanently lit —
  // a persistent "this field is focused" halo on the only thing in the
  // popover, which is noise rather than feedback. Deliberately outline-none.
  'pipelines/canvas/QuickInsertPopover.tsx': 1,
};

//
// 2026-09-07 audit of the entries above. Four came off the list because their
// stated reason did not survive reading the code — worth recording, because a
// baseline whose comments are wrong is worse than no baseline:
//
//   pipelines/canvas/NodePalette.tsx      "the palette's own visual language"
//     — it was Input's md class string copied out character for character.
//   pipelines/editor/EditorTopBar.tsx     "borderless inline-rename field"
//     — it had `bg-surface border border-border-field rounded-md`.
//   pipelines/dev/EventPayloadEditor.tsx  "terminal-styled, same reasoning"
//     — generic bordered fields, and the textarea and seq input carried NO
//       background token at all, so both were browser-default white in dark
//       mode. Exactly the bug this ratchet exists to catch, filed as an excuse.
//   pipelines/vision/BBoxAuthoringCanvas.tsx  "floating in-canvas label editor"
//     — floating is true and preserved via className, but it hardcoded
//       `bg-white`, the specific divergence named at the top of this file.
//
// social/ChatPanel.tsx also went to zero: it and RichChatComposer now share
// forms/FileInput instead of each keeping a copy of the same hidden-input
// plumbing.
//

/** Strip comments so a code sample in a doc comment isn't counted. */
function stripComments(source) {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .split('\n')
    .filter((line) => !line.trim().startsWith('//'))
    .join('\n');
}

const counts = new Map();

// Consumer mode (--root): no library BASELINE; the --allowlist (if any) is the
// whole exception list, keyed by the scanned path (root joined with relative).
// `null` from readAllowlist means "any count" and becomes Infinity here.
const allowlist = args.allowlistPath
  ? Object.fromEntries([...readAllowlist(args.allowlistPath)].map(([f, n]) => [f, n ?? Infinity]))
  : null;
const LIMITS = allowlist ?? (args.custom ? {} : BASELINE);
const LIMITS_FILE = args.allowlistPath ?? 'scripts/check-node-controls.mjs';
const FIX_HINT = args.custom
  ? 'Use Input, Select, Textarea, NumberInput, RadioGroup, Checkbox, Slider or ColorInput from @connorhoehnslalom/ui-components instead.'
  : 'Use ConfigField + the forms/ composites (Input, Select, Textarea, NumberInput, RadioGroup) instead.';

function walk(dir, prefix = '') {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      if (entry.name !== '__tests__' && entry.name !== 'node_modules') walk(join(dir, entry.name), rel);
      continue;
    }
    if (!/\.[jt]sx$/.test(entry.name) || /\.stories\.[jt]sx$/.test(entry.name)) continue;
    const code = stripComments(readFileSync(join(dir, entry.name), 'utf8'));
    const n = [...code.matchAll(CONTROL_RE)].length;
    if (n > 0) counts.set(rel, n);
  }
}

if (args.custom) for (const root of args.roots) walk(root, join(root).replace(/\/$/, ''));
else walk(ROOT);

const errors = [];

for (const [file, n] of [...counts].sort()) {
  const allowed = LIMITS[file];
  if (allowed === undefined) {
    errors.push(`${file}: ${n} hand-rolled control(s). ${FIX_HINT}`);
  } else if (n > allowed) {
    errors.push(`${file}: ${n} hand-rolled control(s), baseline allows ${allowed}. Do not add more.`);
  }
}

for (const [file, allowed] of Object.entries(LIMITS)) {
  const n = counts.get(file) ?? 0;
  if (n < allowed && allowed !== Infinity) {
    errors.push(
      `${file}: down to ${n} (baseline says ${allowed}) — nice. ` +
        `Lower it to ${n} in ${LIMITS_FILE}${n === 0 ? ', or delete the entry.' : '.'}`,
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
  Object.keys(LIMITS).length === 0
    ? 'ok check-node-controls: pass (no hand-rolled controls).'
    : `ok check-node-controls: pass (${counts.size} file(s) with justified raw ` +
      `control(s), ${total} total — see ${args.custom ? LIMITS_FILE : 'BASELINE'} for why each is exempt).`,
);
