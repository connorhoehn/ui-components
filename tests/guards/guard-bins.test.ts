// @vitest-environment node
//
// The three guards double as package bins (ui-check-static-styles,
// ui-check-node-controls, ui-check-hex-colors). These tests run them the way a
// consumer does: against --root fixtures, with and without an --allowlist, and
// from a copy under node_modules where the repo's default roots do not exist.

import { spawnSync } from 'node:child_process';
import { copyFileSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

const SCRIPTS = resolve(import.meta.dirname, '../../scripts');
const GUARDS = ['check-static-styles.mjs', 'check-node-controls.mjs', 'check-hex-colors.mjs'];

let dir: string;

function run(script: string, args: string[], scriptDir = SCRIPTS) {
  const r = spawnSync(process.execPath, [join(scriptDir, script), ...args], { cwd: dir, encoding: 'utf8' });
  return { status: r.status, out: r.stdout + r.stderr };
}

beforeAll(() => {
  dir = mkdtempSync(join(tmpdir(), 'ui-guards-'));
  mkdirSync(join(dir, 'app/pages'), { recursive: true });
  mkdirSync(join(dir, 'app/node_modules/dep'), { recursive: true });
  writeFileSync(join(dir, 'app/pages/Clean.tsx'), 'export const C = () => <div className="p-4" />;\n');
  writeFileSync(
    join(dir, 'app/pages/Dirty.tsx'),
    [
      'export const D = () => (',
      '  <div style={{ padding: 4 }} className="bg-[#2563eb]">',
      '    <input />',
      '    <select />',
      '  </div>',
      ');',
      '',
    ].join('\n'),
  );
  // Never scanned: node_modules under a consumer root.
  writeFileSync(join(dir, 'app/node_modules/dep/X.tsx'), '<input style={{}} className="bg-[#fff]" />\n');
});

afterAll(() => rmSync(dir, { recursive: true, force: true }));

describe('guard bins in consumer mode', () => {
  it('flag the violating file under --root and nothing in node_modules', () => {
    for (const script of GUARDS) {
      const r = run(script, ['--root', 'app']);
      expect(r.status, `${script}: ${r.out}`).toBe(1);
      expect(r.out).toContain('app/pages/Dirty.tsx');
      expect(r.out).not.toContain('Clean.tsx');
      expect(r.out).not.toContain('node_modules');
    }
  });

  it('pass a clean root', () => {
    mkdirSync(join(dir, 'clean'), { recursive: true });
    writeFileSync(join(dir, 'clean/A.tsx'), 'export const A = () => <p className="text-text-muted" />;\n');
    for (const script of GUARDS) {
      const r = run(script, ['--root', 'clean']);
      expect(r.status, `${script}: ${r.out}`).toBe(0);
    }
  });

  it('honour an --allowlist, including counted ratchet entries', () => {
    writeFileSync(join(dir, 'any.txt'), '# runtime-derived\napp/pages/Dirty.tsx  # cursor\n');
    for (const script of GUARDS) {
      const r = run(script, ['--root', 'app', '--allowlist', 'any.txt']);
      expect(r.status, `${script}: ${r.out}`).toBe(0);
    }

    writeFileSync(join(dir, 'tight.txt'), 'app/pages/Dirty.tsx 1\n');
    const over = run('check-node-controls.mjs', ['--root', 'app', '--allowlist', 'tight.txt']);
    expect(over.status).toBe(1);
    expect(over.out).toContain('baseline allows 1');

    writeFileSync(join(dir, 'loose.txt'), 'app/pages/Dirty.tsx 5\n');
    const under = run('check-node-controls.mjs', ['--root', 'app', '--allowlist', 'loose.txt']);
    expect(under.status).toBe(1);
    expect(under.out).toContain('Lower it to 2 in loose.txt');
  });

  it('reject a missing root or allowlist with a usage error', () => {
    for (const script of GUARDS) {
      expect(run(script, ['--root', 'nope']).status).toBe(2);
      expect(run(script, ['--root', 'app', '--allowlist', 'nope.txt']).status).toBe(2);
      expect(run(script, ['--bogus']).status).toBe(2);
    }
  });

  it('require --root when installed under node_modules', () => {
    const installed = join(dir, 'node_modules/@connorhoehn/ui-components/scripts');
    mkdirSync(installed, { recursive: true });
    for (const f of [...GUARDS, 'guard-cli.mjs']) copyFileSync(join(SCRIPTS, f), join(installed, f));
    for (const script of GUARDS) {
      const bare = run(script, [], installed);
      expect(bare.status, `${script}: ${bare.out}`).toBe(2);
      expect(bare.out).toContain('--root');
      expect(run(script, ['--root', 'app'], installed).status).toBe(1);
    }
  });
});
