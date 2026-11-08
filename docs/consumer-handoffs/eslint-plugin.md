# ESLint plugin and guard bins — consumer handoff

The library now ships write-time enforcement for the rules it holds itself to.
Two additive surfaces, approved by the owner as exceptions to the no-touch
`package.json` rule:

- `exports["./eslint-plugin"]` → `eslint-plugin/index.mjs`, a flat-config
  ESLint plugin in plain ESM (no build step, no runtime dependencies).
  `eslint >=9` is an optional peer; types come from the sibling `index.d.mts`.
- `bin`: `ui-check-static-styles`, `ui-check-node-controls`,
  `ui-check-hex-colors` — the library's own guard scripts, now runnable against
  a consumer tree.

Nothing changes for a consumer that does not opt in.

## Rules

| Rule | Recommended | What it flags |
| --- | --- | --- |
| `no-raw-controls` | error | JSX `<button>`, `<table>`, `<input>`, `<select>`, `<textarea>`. The message names the replacement (`Button`, `DataTable`/`Table`, `Input`, `Select`, `Textarea`; `Checkbox`, `RadioGroup`, `Slider`, `ColorInput`, `NumberInput`, `FileInput`, `SearchInput` by `type=`). `<input type="hidden">` is allowed. Options: `allow: ['table']`, `allowHiddenInput`. |
| `no-inline-style` | error | Any `style={...}` in JSX, literal or hoisted. Options: `allowFiles: ['src/canvas/**']` (globs for files whose styles are runtime-derived), `allowCustomProperties: true` (permit objects whose keys are all `--custom-properties`). |
| `no-arbitrary-token-values` | error | Class strings in `className` and in `cn`/`clsx`/`cx`/`classnames`/`twMerge`/`twJoin` args that wrap a token (`text-[var(--color-text-muted)]` → `text-text-muted`, `rounded-[var(--radius-lg)]` → `rounded-lg`, v4 `bg-(--color-x)`) or hardcode a colour (`bg-[#…]`, `text-[rgb(…)]`). Options: `flagPixelSizes: true` also flags `w-[200px]`-style fixed sizes; `callees` overrides the helper list. |
| `button-explicit-variant` | error | A library `Button` with no `variant` (it defaults to primary). Skipped when props are spread. Options: `components: ['Button', 'IconButton']`. |
| `no-hand-rolled-separators` | warn (page files only) | `border-t*`, `border-b*`, `divide-y*` in a `className` on a plain DOM element → `Divider`, `PanelHeader`, `PageSection divided`. Classes passed to library components are left alone. |

Library components are recognised from imports of both
`@connorhoehn/ui-components*` and the `@connorhoehn/ui-components*`
alias, including namespace imports (`<UI.Button>`).

`configs.recommended` is an **array** of two config objects: the first four
rules on `**/src/**/*.{jsx,tsx}` and `**/app/**/*.{jsx,tsx}`, the separator
warning on `**/{pages,routes,views,screens}/**` and `**/*Page.{jsx,tsx}`. Both
ignore tests, stories, `__tests__/` and `e2e/`. The globs are also exported as
`COMPONENT_FILES`, `PAGE_FILES` and `TEST_FILES` for consumers who want to
build their own blocks.

## Wiring it (flat config)

The plugin does not choose a parser. `.tsx` needs `typescript-eslint` (install
it alongside `eslint` in the consumer); plain `.jsx` works with ESLint's
default parser.

```js
// eslint.config.js
import tseslint from 'typescript-eslint';
import uiComponents from '@connorhoehn/ui-components/eslint-plugin';

export default [
  { files: ['**/*.{ts,tsx}'], languageOptions: { parser: tseslint.parser } },
  ...uiComponents.configs.recommended,
  {
    // Runtime-derived positions/transforms: the documented exception.
    files: ['src/**/*.tsx'],
    rules: {
      'ui-components/no-inline-style': ['error', { allowFiles: ['src/canvas/**', 'src/video/Stage*.tsx'] }],
    },
  },
];
```

The plugin key is `ui-components`; override any rule as
`'ui-components/<rule>'`. If the portal imports through the
`@connorhoehn/ui-components` alias, nothing extra is needed.

## The guard bins

Each takes `--root <dir>` (repeatable) and `--allowlist <file>`. With `--root`
the library's own baselines are ignored: a consumer starts with no exceptions
and lists its own. Allowlist lines are `path [maxCount]  # why`, paths as
scanned (`join(root, relative)`). Without a count any number passes; with one
the entry is a ratchet that fails above the count and asks to be lowered below
it. `node_modules` under a root is skipped. Run from `node_modules` without
`--root`, each exits 2 with usage instead of passing silently.

```bash
npx ui-check-static-styles --root src --allowlist scripts/inline-style.allowlist.txt
npx ui-check-node-controls --root src
npx ui-check-hex-colors   --root src
```

Suggested consumer scripts:

```json
{
  "lint": "eslint . && npm run lint:ui-guards",
  "lint:ui-guards": "ui-check-static-styles --root src && ui-check-node-controls --root src && ui-check-hex-colors --root src"
}
```

For aws-agentcore that is `--root src` from `portal/`; realtime-examples runs
it from `frontend/`; event-catalog points `--root` at its React source dir.
Expect a first run to fail: either fix, or record each justified file in an
allowlist with a reason, the same discipline as
`scripts/check-static-styles.allowlist.txt` here.

## Idea: Claude Code PostToolUse hook (not installed)

Agents writing UI in a consumer repo get feedback only at review time today. A
`PostToolUse` hook matching `Edit|Write|MultiEdit` in the consumer's
`.claude/settings.json` could read the edited `file_path` from the hook's JSON
stdin, and when it ends in `.tsx`/`.jsx` run
`npx eslint --no-warn-ignored <file>`. On a non-zero exit it would print the
ESLint output to stderr and exit 2, which Claude Code feeds back to the model
as a blocking error, so the agent fixes the raw `<button>` or inline style in
the same turn instead of shipping it. Keep it scoped to the single edited file
(whole-repo lint is too slow per edit), and leave the guard bins to the `lint`
script and CI. This is a description only; each consumer decides whether to
add it.

## Verification

Rule behaviour is pinned by `tests/eslint-plugin/eslint-plugin.test.ts`
(RuleTester valid and invalid cases per rule, plus the recommended config's
severities and globs). Consumer-mode bins are pinned by
`tests/guards/guard-bins.test.ts`, including a copy installed under
`node_modules` with no repo files beside it. In this repo, `npm run lint:*`
with no arguments produces byte-identical output to before the change.
