// @vitest-environment node
//
// RuleTester coverage for the consumer ESLint plugin
// (eslint-plugin/index.mjs, published as ./eslint-plugin). Parsed with espree's
// JSX support: the rules only read standard ESTree JSX nodes, so this is the
// same AST typescript-eslint hands them for .tsx.

import { RuleTester, Linter } from 'eslint';
import { afterAll, describe, expect, it } from 'vitest';
import plugin, { rules } from '../../eslint-plugin/index.mjs';

RuleTester.describe = describe;
RuleTester.it = it;
RuleTester.itOnly = it.only;
RuleTester.afterAll = afterAll;

const tester = new RuleTester({
  languageOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    parserOptions: { ecmaFeatures: { jsx: true } },
  },
});

const LIB = "import { Button } from '@connorhoehn/ui-components';\n";
const ALIAS = "import { Button as UIButton } from '@connorhoehn/ui-components/shared';\n";

tester.run('no-raw-controls', rules['no-raw-controls'] as never, {
  valid: [
    `${LIB}const A = () => <Button variant="secondary">Save</Button>;`,
    `const A = () => <input type="hidden" name="csrf" value="x" />;`,
    `const A = () => <div role="button" />;`,
    { code: `const A = () => <table />;`, options: [{ allow: ['table'] }] },
  ],
  invalid: [
    {
      code: `const A = () => <button onClick={go}>Go</button>;`,
      errors: [{ messageId: 'raw', data: { element: 'button', replacement: 'Button (or IconButton)', index: 'docs/COMPONENT_INDEX.md in @connorhoehn/ui-components' } }],
    },
    { code: `const A = () => <table><tbody /></table>;`, errors: [{ messageId: 'raw' }] },
    { code: `const A = () => <><input /><select /><textarea /></>;`, errors: 3 },
    {
      code: `const A = () => <input type="checkbox" />;`,
      errors: [{ messageId: 'raw', data: { element: 'input', replacement: 'Checkbox', index: 'docs/COMPONENT_INDEX.md in @connorhoehn/ui-components' } }],
    },
    {
      code: `const A = () => <input type="hidden" />;`,
      options: [{ allowHiddenInput: false }],
      errors: 1,
    },
  ],
});

tester.run('no-inline-style', rules['no-inline-style'] as never, {
  valid: [
    `const A = () => <div className="p-4" />;`,
    { code: `const A = ({ x }) => <div style={{ left: x }} />;`, filename: '/repo/src/canvas/CursorLayer.tsx', options: [{ allowFiles: ['src/canvas/**'] }] },
    { code: `const A = ({ pct }) => <div style={{ '--progress': pct }} />;`, options: [{ allowCustomProperties: true }] },
  ],
  invalid: [
    { code: `const A = () => <div style={{ padding: 8 }} />;`, errors: [{ messageId: 'inline' }] },
    { code: `const s = { padding: 8 };\nconst A = () => <div style={s} />;`, errors: [{ messageId: 'inline' }] },
    { code: `const A = ({ x }) => <div style={{ left: x }} />;`, filename: '/repo/src/pages/Home.tsx', options: [{ allowFiles: ['src/canvas/**'] }], errors: 1 },
    { code: `const A = ({ pct }) => <div style={{ '--progress': pct, color: 'red' }} />;`, options: [{ allowCustomProperties: true }], errors: 1 },
  ],
});

tester.run('no-arbitrary-token-values', rules['no-arbitrary-token-values'] as never, {
  valid: [
    `const A = () => <div className="text-text-muted bg-surface w-[200px]" />;`,
    `const c = cn('rounded-md', active && 'bg-accent-bg');`,
    `const c = cn('w-[calc(100%-2rem)]', 'grid-cols-[1fr_auto]');`,
    // Not a class helper, so not inspected.
    `const s = format('bg-[#fff]');`,
  ],
  invalid: [
    {
      code: `const A = () => <div className="text-[var(--color-text-muted)]" />;`,
      errors: [{ messageId: 'tokenVar', data: { found: 'text-[var(--color-text-muted)]', suggestion: 'text-text-muted' } }],
    },
    {
      code: `const A = () => <div className="hover:border-b-(--color-border-subtle)" />;`,
      errors: [{ messageId: 'tokenVar', data: { found: 'hover:border-b-(--color-border-subtle)', suggestion: 'hover:border-b-border-subtle' } }],
    },
    {
      code: `const c = cn('p-2', on ? 'rounded-[var(--radius-lg)]' : 'bg-[#2563eb]');`,
      errors: [
        { messageId: 'tokenVar', data: { found: 'rounded-[var(--radius-lg)]', suggestion: 'rounded-lg' } },
        { messageId: 'hardColor', data: { found: 'bg-[#2563eb]' } },
      ],
    },
    { code: 'const A = () => <div className={`flex ${x} text-[rgb(1,2,3)]`} />;', errors: [{ messageId: 'hardColor' }] },
    { code: `const c = clsx({ 'bg-[var(--color-danger-bg)]': bad });`, errors: [{ messageId: 'tokenVar' }] },
    { code: `const A = () => <div className="p-[var(--my-gutter)]" />;`, errors: [{ messageId: 'tokenVarGeneric' }] },
    {
      code: `const A = () => <div className="w-[200px] md:h-[48px] w-[50%]" />;`,
      options: [{ flagPixelSizes: true }],
      errors: [
        { messageId: 'pixelSize', data: { found: 'w-[200px]' } },
        { messageId: 'pixelSize', data: { found: 'md:h-[48px]' } },
      ],
    },
  ],
});

tester.run('button-explicit-variant', rules['button-explicit-variant'] as never, {
  valid: [
    `${LIB}const A = () => <Button variant="primary">Go</Button>;`,
    `${LIB}const A = (p) => <Button {...p}>Go</Button>;`,
    // A local Button is not the library's.
    `function Button() { return null }\nconst A = () => <Button>Go</Button>;`,
    `import { Button } from './Button';\nconst A = () => <Button>Go</Button>;`,
    `${ALIAS}const A = () => <UIButton variant="ghost">Go</UIButton>;`,
  ],
  invalid: [
    { code: `${LIB}const A = () => <Button onClick={go}>Go</Button>;`, errors: [{ messageId: 'missing', data: { name: 'Button' } }] },
    { code: `${ALIAS}const A = () => <UIButton>Go</UIButton>;`, errors: [{ messageId: 'missing', data: { name: 'UIButton' } }] },
    {
      code: `import * as UI from '@connorhoehn/ui-components/shared';\nconst A = () => <UI.Button>Go</UI.Button>;`,
      errors: [{ messageId: 'missing', data: { name: 'UI.Button' } }],
    },
    {
      code: `import { IconButton } from '@connorhoehn/ui-components';\nconst A = () => <IconButton />;`,
      options: [{ components: ['Button', 'IconButton'] }],
      errors: 1,
    },
  ],
});

tester.run('no-hand-rolled-separators', rules['no-hand-rolled-separators'] as never, {
  valid: [
    `const A = () => <div className="border border-border rounded-md" />;`,
    `const A = () => <div className="border-transparent" />;`,
    // A library component taking a border class overrides its own chrome.
    `${LIB}const A = () => <Button variant="ghost" className="border-b" />;`,
    `const c = cn('border-b');`,
  ],
  invalid: [
    {
      code: `const A = () => <div className="flex border-b border-border pb-2" />;`,
      errors: [{ messageId: 'separator', data: { found: 'border-b', element: 'div', index: 'docs/COMPONENT_INDEX.md in @connorhoehn/ui-components' } }],
    },
    { code: `const A = () => <ul className={cn('md:divide-y', x)} />;`, errors: [{ messageId: 'separator' }] },
    { code: `const A = () => <header className="border-t-2" />;`, errors: [{ messageId: 'separator' }] },
  ],
});

tester.run('safe-url-attributes', rules['safe-url-attributes'] as never, {
  valid: [
    `const A = () => <a href="https://x.test">x</a>;`,
    `const A = () => <a href={safeHref(url)}>x</a>;`,
    `const A = () => <a href={safeHref(url) ?? undefined}>x</a>;`,
    `const A = () => <a href={\`/docs/\${id}\`}>x</a>;`,
    `const A = () => <a href={\`#\${id}\`}>x</a>;`,
    `const A = () => { const href = safeHref(url); return <a href={href}>x</a>; };`,
    `const A = () => <a href={ok ? safeHref(u) : undefined}>x</a>;`,
    `const A = () => <img src={dataUrl} alt="" />;`,
    `const A = () => <Link href={dynamic}>x</Link>;`,
  ],
  invalid: [
    { code: `const A = () => <a href={url}>x</a>;`, errors: [{ messageId: 'unsafe' }] },
    { code: `const A = () => <a href={m.fileDataUrl ?? '#'}>x</a>;`, errors: [{ messageId: 'unsafe' }] },
    { code: `const A = () => <a href={\`\${base}/x\`}>x</a>;`, errors: [{ messageId: 'unsafe' }] },
    { code: `const A = () => <a href={\`//\${host}\`}>x</a>;`, errors: [{ messageId: 'unsafe' }] },
    { code: `const A = () => <iframe src={u} />;`, errors: [{ messageId: 'unsafe' }] },
    { code: `const A = () => <a href={other(url)}>x</a>;`, errors: [{ messageId: 'unsafe' }] },
  ],
});

describe('configs.recommended', () => {
  it('errors on the first four rules in component files and warns on separators in page files', () => {
    const linter = new Linter({ configType: 'flat', cwd: '/repo' });
    const code = [
      "import { Button } from '@connorhoehn/ui-components';",
      'export const P = () => (',
      '  <div className="border-b text-[var(--color-text-muted)]" style={{ padding: 4 }}>',
      '    <button>x</button>',
      '    <Button>y</Button>',
      '  </div>',
      ');',
    ].join('\n');
    const config = [...plugin.configs.recommended] as never;

    const page = linter.verify(code, config, '/repo/src/pages/Home.jsx');
    expect(page.filter((m) => m.ruleId === null)).toEqual([]);
    const byRule = (msgs: { ruleId: string | null; severity: number }[]) =>
      Object.fromEntries(msgs.map((m) => [m.ruleId, m.severity]));
    expect(byRule(page)).toEqual({
      'ui-components/no-raw-controls': 2,
      'ui-components/no-inline-style': 2,
      'ui-components/no-arbitrary-token-values': 2,
      'ui-components/button-explicit-variant': 2,
      'ui-components/no-hand-rolled-separators': 1,
    });

    const component = linter.verify(code, config, '/repo/src/components/Card.jsx');
    expect(byRule(component)['ui-components/no-hand-rolled-separators']).toBeUndefined();
    expect(byRule(component)['ui-components/no-raw-controls']).toBe(2);

    // Tests are ignored (ESLint only notes that nothing configured the file).
    const test = linter.verify(code, config, '/repo/src/components/Card.test.jsx');
    expect(test.filter((m) => m.ruleId?.startsWith('ui-components/'))).toEqual([]);
  });

  it('reports its own version and exposes every rule', () => {
    expect(plugin.meta.version).toMatch(/^\d+\.\d+\.\d+/);
    expect(Object.keys(plugin.rules).sort()).toEqual(
      ['button-explicit-variant', 'no-arbitrary-token-values', 'no-hand-rolled-separators', 'no-inline-style', 'no-raw-controls', 'safe-url-attributes'],
    );
  });
});
