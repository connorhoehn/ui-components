// Packaging contract.
//
// These are the failures a consumer hits that our own test suite cannot see,
// because in-repo everything resolves from devDependencies. Found by packing a
// tarball and installing it into a scratch project:
//
//   - dist/index.d.ts imported y-protocols/awareness and lib0/observable, so
//     every consumer's typecheck failed on the ROOT import (TS2307).
//   - the root bundle statically imports amazon-cognito-identity-js, so
//     `import { Button } from '@connorhoehnslalom/ui-components'` crashed at
//     runtime with ERR_MODULE_NOT_FOUND.
//   - 13 of 15 export subpaths declared only `import`, so nothing but the root
//     could be require()d even though a .cjs shipped for each.
//
// Anything vite externalises must be declared, or it is a runtime crash in
// somebody else's app.

import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { describe, it, expect } from 'vitest';

const ROOT = join(__dirname, '..', '..');
const DIST = join(ROOT, 'dist');
const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'));

const declared = new Set([
  ...Object.keys(pkg.dependencies ?? {}),
  ...Object.keys(pkg.peerDependencies ?? {}),
]);

/** A valid npm specifier: `foo`, `foo-bar`, `@scope/name`, plus subpaths. */
const SPECIFIER = /^(?:@[a-z0-9][\w.-]*\/)?[a-z0-9][\w.-]*(?:\/[\w.@-]+)*$/i;
const NODE_BUILTINS = new Set([
  'url', 'path', 'fs', 'os', 'crypto', 'util', 'stream', 'buffer', 'events',
  'assert', 'process', 'child_process', 'http', 'https', 'zlib', 'tty', 'net',
]);

function packageOf(spec: string): string {
  return spec.startsWith('@')
    ? spec.split('/').slice(0, 2).join('/')
    : spec.split('/')[0];
}

function walk(dir: string, test: (f: string) => boolean, out: string[] = []) {
  if (!existsSync(dir)) return out;
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, test, out);
    else if (test(entry)) out.push(full);
  }
  return out;
}

function bareImports(files: string[]): Set<string> {
  const found = new Set<string>();
  const RE = /(?:\bfrom\s*|\bimport\s*\(?\s*|\brequire\s*\(\s*)["']([^"']+)["']/g;
  for (const f of files) {
    const src = readFileSync(f, 'utf8');
    for (const m of src.matchAll(RE)) {
      const spec = m[1];
      if (spec.startsWith('.') || spec.startsWith('/')) continue;
      if (spec.startsWith('node:')) continue;
      if (!SPECIFIER.test(spec)) continue; // minified template-literal noise
      const name = packageOf(spec);
      if (NODE_BUILTINS.has(name)) continue;
      found.add(name);
    }
  }
  return found;
}

const distExists = existsSync(join(DIST, 'index.js'));

describe.skipIf(!distExists)('packaging contract (requires a build)', () => {
  it('every runtime import in dist/ is a declared dependency or peer', () => {
    const js = walk(DIST, (f) => f.endsWith('.js') || f.endsWith('.cjs'));
    const undeclaredRuntime = [...bareImports(js)].filter((n) => !declared.has(n)).sort();
    expect(
      undeclaredRuntime,
      `These are externalised in vite.config.ts and imported by the shipped\n` +
        `bundle, but not declared — a consumer gets ERR_MODULE_NOT_FOUND:\n  ` +
        undeclaredRuntime.join('\n  '),
    ).toEqual([]);
  });

  // The inverse of the check above, and the one that was missing until
  // v2.73.0: a runtime `dependency` that is NOT externalised gets inlined
  // into a shared chunk that every entry drags in. `cmdk` was bundled that
  // way — importing `Chip` pulled 64KB of command-palette fuzzy-matching,
  // a 10x weight penalty on the smallest primitives.
  it('every runtime dependency is externalised, not bundled into dist', () => {
    const js = walk(DIST, (f) => f.endsWith('.js'));
    const imported = bareImports(js);
    const bundled = Object.keys(pkg.dependencies ?? {})
      .filter((dep) => !imported.has(dep))
      .sort();
    expect(
      bundled,
      `These are declared dependencies but never imported by the shipped\n` +
        `bundle, which means vite INLINED them. Add them to the externals\n` +
        `list in vite.config.ts so consumers resolve them from node_modules:\n  ` +
        bundled.join('\n  '),
    ).toEqual([]);
  });

  it('every type-only import in dist/**.d.ts is declared', () => {
    const dts = walk(DIST, (f) => f.endsWith('.d.ts'));
    const undeclaredTypes = [...bareImports(dts)].filter((n) => !declared.has(n)).sort();
    expect(
      undeclaredTypes,
      `These appear in the shipped .d.ts files but are not declared — a\n` +
        `consumer's tsc fails with TS2307 on import:\n  ` +
        undeclaredTypes.join('\n  '),
    ).toEqual([]);
  });

  it('every export subpath ships both an ESM and a CJS entry', () => {
    const broken: string[] = [];
    for (const [key, val] of Object.entries<Record<string, string> | string>(pkg.exports)) {
      if (typeof val === 'string') continue; // ./styles.css, ./package.json
      for (const cond of ['types', 'import', 'require'] as const) {
        const target = val[cond];
        if (!target) { broken.push(`${key} has no "${cond}" condition`); continue; }
        if (!existsSync(join(ROOT, target))) broken.push(`${key} "${cond}" -> ${target} missing`);
      }
    }
    expect(broken, broken.join('\n')).toEqual([]);
  });

  it('exposes ./package.json, which build tooling and version probes read', () => {
    expect(pkg.exports['./package.json']).toBe('./package.json');
  });
});
