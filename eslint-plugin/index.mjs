// ESLint flat-config plugin for consumers of @connorhoehnslalom/ui-components.
//
// Write-time enforcement of the same rules the library holds itself to: no
// hand-rolled controls, no inline styles, no arbitrary values that re-spell a
// design token, no Button without a deliberate variant, no hand-drawn
// separators. Plain ESM, no build step and no runtime dependencies; `eslint`
// is the consumer's (an optional peer of this package).
//
//   import uiComponents from '@connorhoehnslalom/ui-components/eslint-plugin';
//   export default [...uiComponents.configs.recommended];
//
// The rules only inspect standard ESTree JSX nodes, so they work with espree
// (.jsx) and with typescript-eslint's parser (.tsx), which the consumer
// configures. See docs/consumer-handoffs/eslint-plugin.md.

import { readFileSync } from 'node:fs';

const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));

const INDEX = 'docs/COMPONENT_INDEX.md in @connorhoehnslalom/ui-components';
const LIBRARY_SOURCE_RE = /^@connorhoehn(?:slalom)?\/ui-components(?:\/|$)/;
const DEFAULT_CLASS_CALLEES = ['cn', 'clsx', 'cx', 'classnames', 'classNames', 'twMerge', 'twJoin'];

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

/**
 * Tracks which local JSX names come from the library, for both scopes
 * (`@connorhoehnslalom/ui-components*` and the `@connorhoehn/ui-components*`
 * alias). Returns a resolver from a JSX element name node to the imported
 * name (`'Button'`), or null when the element is not a library component.
 */
function libraryImports() {
  const named = new Map(); // local -> imported
  const namespaces = new Set(); // `import * as UI` / default import

  return {
    ImportDeclaration(node) {
      if (typeof node.source.value !== 'string' || !LIBRARY_SOURCE_RE.test(node.source.value)) return;
      for (const spec of node.specifiers) {
        if (spec.type === 'ImportSpecifier') {
          const imported = spec.imported.type === 'Identifier' ? spec.imported.name : spec.imported.value;
          named.set(spec.local.name, imported);
        } else {
          namespaces.add(spec.local.name);
        }
      }
    },
    resolve(nameNode) {
      if (nameNode.type === 'JSXIdentifier') return named.get(nameNode.name) ?? null;
      if (
        nameNode.type === 'JSXMemberExpression' &&
        nameNode.object.type === 'JSXIdentifier' &&
        namespaces.has(nameNode.object.name)
      ) {
        return nameNode.property.name;
      }
      return null;
    },
  };
}

function isIntrinsic(nameNode) {
  return nameNode.type === 'JSXIdentifier' && /^[a-z]/.test(nameNode.name);
}

function attr(openingElement, name) {
  return openingElement.attributes.find(
    (a) => a.type === 'JSXAttribute' && a.name.type === 'JSXIdentifier' && a.name.name === name,
  );
}

function staticAttrValue(attribute) {
  if (!attribute?.value) return undefined;
  if (attribute.value.type === 'Literal') return attribute.value.value;
  if (
    attribute.value.type === 'JSXExpressionContainer' &&
    attribute.value.expression.type === 'Literal'
  ) {
    return attribute.value.expression.value;
  }
  return undefined;
}

/** Minimal glob: `**` any path, `*` any segment chars, `?` one char. */
function globToRegExp(glob) {
  let re = '';
  for (let i = 0; i < glob.length; i++) {
    const c = glob[i];
    if (c === '*' && glob[i + 1] === '*') {
      re += '.*';
      i++;
      if (glob[i + 1] === '/') i++;
    } else if (c === '*') re += '[^/]*';
    else if (c === '?') re += '[^/]';
    else re += c.replace(/[.+^${}()|[\]\\]/g, '\\$&');
  }
  return new RegExp(`(?:^|/)${re}$`);
}

function fileMatches(filename, patterns) {
  const normalized = filename.replace(/\\/g, '/');
  return patterns.some((p) => globToRegExp(p).test(normalized));
}

/**
 * Every static class-string fragment under a className value or a cn()-style
 * argument: string literals, template quasis, and the strings inside
 * conditionals, logical expressions, arrays and object keys (`{ 'px-2': on }`).
 * Yields { node, text } so reports land on the fragment.
 */
function* classStrings(node) {
  if (!node) return;
  switch (node.type) {
    case 'Literal':
      if (typeof node.value === 'string') yield { node, text: node.value };
      return;
    case 'TemplateLiteral':
      for (const q of node.quasis) yield { node: q, text: q.value.cooked ?? q.value.raw };
      for (const e of node.expressions) yield* classStrings(e);
      return;
    case 'JSXExpressionContainer':
      yield* classStrings(node.expression);
      return;
    case 'ConditionalExpression':
      yield* classStrings(node.consequent);
      yield* classStrings(node.alternate);
      return;
    case 'LogicalExpression':
      yield* classStrings(node.right);
      if (node.operator !== '&&') yield* classStrings(node.left);
      return;
    case 'ArrayExpression':
      for (const el of node.elements) yield* classStrings(el);
      return;
    case 'ObjectExpression':
      for (const prop of node.properties) {
        if (prop.type === 'Property') yield* classStrings(prop.key);
      }
      return;
    case 'CallExpression':
      for (const arg of node.arguments) yield* classStrings(arg);
      return;
    case 'TSAsExpression':
    case 'TSSatisfiesExpression':
    case 'TSNonNullExpression':
      yield* classStrings(node.expression);
      return;
    default:
      return;
  }
}

function calleeName(call) {
  if (call.callee.type === 'Identifier') return call.callee.name;
  if (call.callee.type === 'MemberExpression' && call.callee.property.type === 'Identifier') {
    return call.callee.property.name;
  }
  return null;
}

/**
 * Visits class strings in `className=` attributes and in class-helper calls.
 * `onString(fragment, openingElementOrNull)` — the element is passed for
 * className attributes so rules can check what they sit on.
 */
function classVisitors(context, callees, onString) {
  const seen = new WeakSet();
  const visit = (root, element) => {
    for (const fragment of classStrings(root)) {
      if (seen.has(fragment.node)) continue;
      seen.add(fragment.node);
      onString(fragment, element);
    }
  };
  return {
    JSXAttribute(node) {
      if (node.name.type !== 'JSXIdentifier' || (node.name.name !== 'className' && node.name.name !== 'class')) return;
      visit(node.value, node.parent);
    },
    CallExpression(node) {
      if (!callees.includes(calleeName(node))) return;
      // A call sitting directly in a className is visited with its element.
      let p = node.parent;
      while (p && p.type !== 'JSXAttribute' && p.type !== 'Program' && !p.type.startsWith('Function')) p = p.parent;
      if (p?.type === 'JSXAttribute') return;
      visit(node, null);
    },
  };
}

// ---------------------------------------------------------------------------
// no-raw-controls
// ---------------------------------------------------------------------------

const CONTROL_REPLACEMENTS = {
  button: 'Button (or IconButton)',
  table: 'DataTable or Table',
  input: 'Input',
  select: 'Select',
  textarea: 'Textarea',
};

const INPUT_TYPE_REPLACEMENTS = {
  checkbox: 'Checkbox',
  radio: 'RadioGroup',
  range: 'Slider',
  color: 'ColorInput',
  number: 'NumberInput',
  file: 'FileInput (or FileUploadDrop)',
  search: 'SearchInput',
};

const noRawControls = {
  meta: {
    type: 'suggestion',
    docs: { description: 'Disallow raw <button>, <table>, <input>, <select> and <textarea>; use the library controls.' },
    schema: [
      {
        type: 'object',
        properties: {
          allow: { type: 'array', items: { enum: Object.keys(CONTROL_REPLACEMENTS) }, uniqueItems: true },
          allowHiddenInput: { type: 'boolean' },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      raw: 'Raw <{{element}}> hand-rolls a control the library already ships. Use {{replacement}} from @connorhoehnslalom/ui-components (see {{index}}).',
    },
  },
  create(context) {
    const { allow = [], allowHiddenInput = true } = context.options[0] ?? {};
    return {
      JSXOpeningElement(node) {
        if (node.name.type !== 'JSXIdentifier') return;
        const element = node.name.name;
        if (!(element in CONTROL_REPLACEMENTS) || allow.includes(element)) return;
        let replacement = CONTROL_REPLACEMENTS[element];
        if (element === 'input') {
          const type = staticAttrValue(attr(node, 'type'));
          if (type === 'hidden' && allowHiddenInput) return;
          if (typeof type === 'string' && type in INPUT_TYPE_REPLACEMENTS) replacement = INPUT_TYPE_REPLACEMENTS[type];
        }
        context.report({ node, messageId: 'raw', data: { element, replacement, index: INDEX } });
      },
    };
  },
};

// ---------------------------------------------------------------------------
// no-inline-style
// ---------------------------------------------------------------------------

const noInlineStyle = {
  meta: {
    type: 'suggestion',
    docs: { description: 'Disallow style={...} in JSX; use Tailwind token classes or a library composite.' },
    schema: [
      {
        type: 'object',
        properties: {
          // Files whose inline styles are runtime-derived (cursor positions,
          // drag transforms, prop-driven sizing). Globs against the filename.
          allowFiles: { type: 'array', items: { type: 'string' } },
          // `style={{ '--progress': pct }}` hands a runtime value to a token
          // class; allow objects whose keys are all custom properties.
          allowCustomProperties: { type: 'boolean' },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      inline:
        'Inline style={...}. Use Tailwind token classes via cn(), or a library composite (see {{index}}). ' +
        'If the values are genuinely runtime-derived, allowlist the file with the allowFiles option.',
    },
  },
  create(context) {
    const { allowFiles = [], allowCustomProperties = false } = context.options[0] ?? {};
    if (allowFiles.length > 0 && fileMatches(context.filename, allowFiles)) return {};
    return {
      JSXAttribute(node) {
        if (node.name.type !== 'JSXIdentifier' || node.name.name !== 'style') return;
        const expr = node.value?.type === 'JSXExpressionContainer' ? node.value.expression : null;
        if (
          allowCustomProperties &&
          expr?.type === 'ObjectExpression' &&
          expr.properties.length > 0 &&
          expr.properties.every(
            (p) => p.type === 'Property' && p.key.type === 'Literal' && String(p.key.value).startsWith('--'),
          )
        ) {
          return;
        }
        context.report({ node, messageId: 'inline', data: { index: INDEX } });
      },
    };
  },
};

// ---------------------------------------------------------------------------
// no-arbitrary-token-values
// ---------------------------------------------------------------------------

// `utility-[var(--family-name)]` and the v4 shorthand `utility-(--family-name)`.
// Leading variants (`hover:`, `md:`) and `!` are allowed before the utility.
const VAR_RE = /(?<![\w-])((?:[\w-]+:)*!?)([a-z][\w-]*?)-(?:\[var\((--[\w-]+)\)\]|\((--[\w-]+)\))(?![\w\]-])/g;
const COLOR_UTILITY_RE =
  /(?<![\w-])(?:[\w-]+:)*!?(?:bg|text|border|ring|from|to|via|fill|stroke|accent|shadow|outline|decoration|divide|caret|placeholder)(?:-(?:t|r|b|l|x|y|s|e|offset))?-\[(?:#[0-9a-fA-F]{3,8}|(?:rgb|rgba|hsl|hsla|oklch|oklab|color)\([^\]]*\))\]/g;
const PX_RE =
  /(?<![\w-])(?:[\w-]+:)*!?-?(?:w|h|size|min-w|max-w|min-h|max-h|p|px|py|pt|pr|pb|pl|ps|pe|m|mx|my|mt|mr|mb|ml|ms|me|gap|gap-x|gap-y|space-x|space-y|top|right|bottom|left|inset|inset-x|inset-y|text|leading|rounded(?:-[trblse]{1,2})?|basis|translate-x|translate-y)-\[\d+(?:\.\d+)?px\]/g;

const TOKEN_FAMILIES = {
  color: (utility, name) => `${utility}-${name}`,
  radius: (_utility, name) => `rounded-${name}`,
  shadow: (_utility, name) => `shadow-${name}`,
  font: (utility, name) => (utility === 'font' ? `font-${name}` : null),
  text: (utility, name) => (utility === 'text' ? `text-${name}` : null),
};

function tokenSuggestion(utility, variable) {
  const m = variable.match(/^--([a-z]+)-(.+)$/);
  if (!m) return null;
  const build = TOKEN_FAMILIES[m[1]];
  return build ? build(utility, m[2]) : null;
}

const noArbitraryTokenValues = {
  meta: {
    type: 'suggestion',
    docs: { description: 'Disallow Tailwind arbitrary values that re-spell a design token or hardcode a colour.' },
    schema: [
      {
        type: 'object',
        properties: {
          flagPixelSizes: { type: 'boolean' },
          callees: { type: 'array', items: { type: 'string' } },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      tokenVar: '`{{found}}` wraps a design token in an arbitrary value. Use the token class `{{suggestion}}`.',
      tokenVarGeneric: '`{{found}}` wraps a CSS variable in an arbitrary value. Use the matching token class from styles.css @theme.',
      hardColor:
        '`{{found}}` hardcodes a colour the theme cannot re-tone. Use a tone/token class (bg-surface, text-text-muted, bg-danger-bg, ...).',
      pixelSize: '`{{found}}` is a fixed pixel arbitrary size. Use the spacing/size scale (e.g. w-48) or a library layout composite.',
    },
  },
  create(context) {
    const { flagPixelSizes = false, callees = DEFAULT_CLASS_CALLEES } = context.options[0] ?? {};
    return classVisitors(context, callees, ({ node, text }) => {
      for (const m of text.matchAll(VAR_RE)) {
        const [found, variants, utility, v1, v2] = m;
        const suggestion = tokenSuggestion(utility, v1 ?? v2);
        if (suggestion) {
          context.report({ node, messageId: 'tokenVar', data: { found, suggestion: variants + suggestion } });
        } else {
          context.report({ node, messageId: 'tokenVarGeneric', data: { found } });
        }
      }
      for (const m of text.matchAll(COLOR_UTILITY_RE)) {
        context.report({ node, messageId: 'hardColor', data: { found: m[0] } });
      }
      if (flagPixelSizes) {
        for (const m of text.matchAll(PX_RE)) {
          context.report({ node, messageId: 'pixelSize', data: { found: m[0] } });
        }
      }
    });
  },
};

// ---------------------------------------------------------------------------
// button-explicit-variant
// ---------------------------------------------------------------------------

const buttonExplicitVariant = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Require an explicit variant on the library Button. It defaults to primary, so pages drift into many primaries.',
    },
    schema: [
      {
        type: 'object',
        properties: { components: { type: 'array', items: { type: 'string' } } },
        additionalProperties: false,
      },
    ],
    messages: {
      missing:
        '<{{name}}> without a variant renders as primary. Say which it is: variant="primary" for the one main action, otherwise "secondary", "ghost", "danger" or "link".',
    },
  },
  create(context) {
    const { components = ['Button'] } = context.options[0] ?? {};
    const lib = libraryImports();
    return {
      ImportDeclaration: lib.ImportDeclaration,
      JSXOpeningElement(node) {
        const imported = lib.resolve(node.name);
        if (!imported || !components.includes(imported)) return;
        // A spread may carry the variant; don't guess.
        if (node.attributes.some((a) => a.type === 'JSXSpreadAttribute')) return;
        if (attr(node, 'variant')) return;
        const name = context.sourceCode.getText(node.name);
        context.report({ node, messageId: 'missing', data: { name } });
      },
    };
  },
};

// ---------------------------------------------------------------------------
// no-hand-rolled-separators
// ---------------------------------------------------------------------------

const SEPARATOR_RE = /(?<![\w-])(?:[\w-]+:)*!?(border-[tb]|divide-y)(?![a-z])(?:-[\w.-]+)?/g;

const noHandRolledSeparators = {
  meta: {
    type: 'suggestion',
    docs: { description: 'Warn on border-t / border-b / divide-y drawn by hand on plain elements in pages.' },
    schema: [
      {
        type: 'object',
        properties: { callees: { type: 'array', items: { type: 'string' } } },
        additionalProperties: false,
      },
    ],
    messages: {
      separator:
        '`{{found}}` on <{{element}}> hand-draws a separator. Use <Divider>, <PanelHeader>, or <PageSection divided> from @connorhoehnslalom/ui-components (see {{index}}).',
    },
  },
  create(context) {
    const { callees = DEFAULT_CLASS_CALLEES } = context.options[0] ?? {};
    return classVisitors(context, callees, ({ node, text }, element) => {
      // Only className on plain DOM elements: a library component receiving a
      // border class is a deliberate override of its own chrome.
      if (!element || !isIntrinsic(element.name)) return;
      for (const m of text.matchAll(SEPARATOR_RE)) {
        context.report({
          node,
          messageId: 'separator',
          data: { found: m[0], element: element.name.name, index: INDEX },
        });
      }
    });
  },
};

// ---------------------------------------------------------------------------
// Plugin + configs
// ---------------------------------------------------------------------------

const rules = {
  'no-raw-controls': noRawControls,
  'no-inline-style': noInlineStyle,
  'no-arbitrary-token-values': noArbitraryTokenValues,
  'button-explicit-variant': buttonExplicitVariant,
  'no-hand-rolled-separators': noHandRolledSeparators,
};

const plugin = {
  meta: { name: '@connorhoehnslalom/ui-components/eslint-plugin', version: pkg.version },
  rules,
  configs: {},
};

/** Where app UI lives in the consumer repos (portal, realtime-examples, event-catalog). */
export const COMPONENT_FILES = ['**/src/**/*.jsx', '**/src/**/*.tsx', '**/app/**/*.jsx', '**/app/**/*.tsx'];
/** Route-level files, where separators should come from layout composites. */
export const PAGE_FILES = [
  '**/{pages,routes,views,screens}/**/*.jsx',
  '**/{pages,routes,views,screens}/**/*.tsx',
  '**/*Page.jsx',
  '**/*Page.tsx',
];
export const TEST_FILES = [
  '**/*.test.{jsx,tsx}',
  '**/*.spec.{jsx,tsx}',
  '**/*.stories.{jsx,tsx}',
  '**/__tests__/**',
  '**/e2e/**',
];

const PREFIX = 'ui-components';

plugin.configs.recommended = [
  {
    name: `${PREFIX}/recommended`,
    files: COMPONENT_FILES,
    ignores: TEST_FILES,
    plugins: { [PREFIX]: plugin },
    languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } },
    rules: {
      [`${PREFIX}/no-raw-controls`]: 'error',
      [`${PREFIX}/no-inline-style`]: 'error',
      [`${PREFIX}/no-arbitrary-token-values`]: 'error',
      [`${PREFIX}/button-explicit-variant`]: 'error',
    },
  },
  {
    name: `${PREFIX}/recommended/pages`,
    files: PAGE_FILES,
    ignores: TEST_FILES,
    plugins: { [PREFIX]: plugin },
    rules: {
      [`${PREFIX}/no-hand-rolled-separators`]: 'warn',
    },
  },
];

export { rules };
export default plugin;
