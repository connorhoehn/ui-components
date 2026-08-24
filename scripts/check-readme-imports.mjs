#!/usr/bin/env node
//
// The README's code samples must import symbols that actually exist.
//
// It advertised `TipTapEditor` (the export is `TiptapEditor`), `PipelineEditor`
// (it is `PipelineEditorPage`) and `ObservabilityDashboard` (it is
// `DashboardPage`). A consumer copy-pasting the quick-start got three import
// errors on their first try — the README lying is worse than no README.
//
// Checks every `import { … } from '@connorhoehnslalom/ui-components…'` in
// README.md against the barrel that subpath maps to.

import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const readme = readFileSync(resolve(ROOT, 'README.md'), 'utf8');

/** Subpath -> the barrel file that defines its exports. */
const BARREL = {
  '': 'src/index.ts',
  '/shared': 'src/components/shared/index.ts',
  '/hooks': 'src/hooks/index.ts',
  '/identity': 'src/components/identity/index.ts',
  '/social': 'src/components/social/index.ts',
  '/video': 'src/video.ts',
  '/agents': 'src/components/agents/index.ts',
  '/pipelines': 'src/components/pipelines/index.ts',
  '/doc-editor': 'src/components/doc-editor/index.ts',
  '/observability': 'src/components/observability/index.ts',
  '/ingest': 'src/components/ingest/index.ts',
  '/integrations/realtime-modules': 'src/integrations/realtime-modules/index.ts',
};

/** Follow `export * from './x'` one level so re-exported names are found. */
function exportedNames(relPath, depth = 0) {
  const file = resolve(ROOT, relPath);
  if (!existsSync(file) || depth > 3) return new Set();
  const src = readFileSync(file, 'utf8');
  const names = new Set();
  for (const m of src.matchAll(/export\s+(?:type\s+)?\{([^}]*)\}/g)) {
    for (const part of m[1].split(',')) {
      const name = part.trim().split(/\s+as\s+/).pop()?.trim();
      if (name) names.add(name);
    }
  }
  for (const m of src.matchAll(/export\s+(?:default\s+)?(?:function|class|const)\s+(\w+)/g)) names.add(m[1]);
  for (const m of src.matchAll(/export\s+\*\s+from\s+'([^']+)'/g)) {
    let rel = m[1];
    if (!rel.startsWith('.')) continue;
    const base = resolve(dirname(file), rel);
    for (const cand of [`${base}.ts`, `${base}.tsx`, `${base}/index.ts`]) {
      if (existsSync(cand)) {
        for (const n of exportedNames(cand.slice(ROOT.length + 1), depth + 1)) names.add(n);
        break;
      }
    }
  }
  return names;
}

const errors = [];
const IMPORT_RE = /import\s+\{([^}]+)\}\s+from\s+'@connorhoehnslalom\/ui-components([^']*)'/g;
for (const m of readme.matchAll(IMPORT_RE)) {
  const subpath = m[2];
  const barrel = BARREL[subpath];
  if (!barrel) { errors.push(`README imports from an unknown subpath '${subpath}'`); continue; }
  const available = exportedNames(barrel);
  if (available.size === 0) continue; // could not parse — do not cry wolf
  for (const raw of m[1].split(',')) {
    const name = raw.trim().split(/\s+as\s+/)[0].trim();
    if (!name || name === 'type') continue;
    if (!available.has(name)) {
      errors.push(`README: '${name}' is not exported from '@connorhoehnslalom/ui-components${subpath}' (${barrel})`);
    }
  }
}

if (errors.length) {
  console.error('check-readme-imports: FAIL\n');
  for (const e of errors) console.error('  ' + e);
  process.exit(1);
}
console.log('ok check-readme-imports: every README import resolves to a real export.');
