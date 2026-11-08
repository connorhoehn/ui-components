// @vitest-environment node
import { describe, it, expect } from 'vitest';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';

/**
 * The markdown that ships in the tarball (README plus every doc in
 * package.json `files`) is what a consumer's agent reads. Two ways it lied:
 *
 *   - It told agents to import from `@connorhoehn/ui-components/layout`,
 *     a subpath that never existed (layout components are root-only), so
 *     every copied import failed to resolve.
 *   - The README linked `CLAUDE.md` and `docs/consumer-adoption.md`, neither
 *     of which shipped, so the links were dead inside node_modules.
 *
 * So: every package import specifier in shipped text must name an `exports`
 * key, and every relative link must point at a file that exists AND ships.
 */

const ROOT = resolve(import.meta.dirname, '../..');
const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8')) as {
  name: string;
  files: string[];
  exports: Record<string, unknown>;
};

const TEXT = /\.(md|txt)$/;

function walk(path: string, acc: string[] = []): string[] {
  if (!existsSync(path)) return acc;
  if (statSync(path).isDirectory()) {
    for (const name of readdirSync(path)) walk(join(path, name), acc);
  } else if (TEXT.test(path)) {
    acc.push(path);
  }
  return acc;
}

/** README is always packed by npm; `dist` holds no docs. */
const shippedRoots = ['README.md', ...pkg.files.filter((f) => f !== 'dist')];
const shippedDocs = shippedRoots.flatMap((f) => walk(join(ROOT, f)));

function isShipped(abs: string): boolean {
  const rel = relative(ROOT, abs).split('\\').join('/');
  if (rel === 'README.md' || rel === 'package.json') return true;
  return pkg.files.some((f) => rel === f || rel.startsWith(`${f.replace(/\/$/, '')}/`));
}

describe('shipped markdown', () => {
  it('ships the index and the adoption guide', () => {
    const rels = shippedDocs.map((f) => relative(ROOT, f));
    expect(rels).toEqual(expect.arrayContaining(['docs/COMPONENT_INDEX.md', 'docs/consumer-adoption.md', 'llms.txt']));
  });

  it('imports only subpaths that exist in the package.json exports map', () => {
    const name = pkg.name.replace(/[/.]/g, (c) => `\\${c}`);
    const spec = new RegExp(`(node_modules/)?${name}(/[A-Za-z0-9._/-]*)?`, 'g');
    const bad: string[] = [];
    for (const file of shippedDocs) {
      const text = readFileSync(file, 'utf8');
      for (const m of text.matchAll(spec)) {
        if (m[1]) continue; // a filesystem path into node_modules, not an import
        const sub = (m[2] ?? '').replace(/\/+$/, '').replace(/[.]+$/, '');
        const key = sub ? `.${sub}` : '.';
        if (!(key in pkg.exports)) bad.push(`${relative(ROOT, file)}: ${m[0]}`);
      }
    }
    expect(bad).toEqual([]);
  });

  it('links only to files that exist and ship', () => {
    const bad: string[] = [];
    for (const file of shippedDocs) {
      const text = readFileSync(file, 'utf8');
      for (const m of text.matchAll(/\]\(([^)\s]+)\)/g)) {
        const target = m[1];
        if (/^(https?:|mailto:|#)/.test(target)) continue;
        const abs = resolve(dirname(file), target.split('#')[0]);
        if (!existsSync(abs) || !isShipped(abs)) bad.push(`${relative(ROOT, file)} -> ${target}`);
      }
    }
    expect(bad).toEqual([]);
  });
});
