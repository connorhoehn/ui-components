#!/usr/bin/env node
//
// Generates docs/COMPONENT_INDEX.md: every PascalCase runtime export of every
// JS entry in package.json's `exports` map, grouped by job, with the import
// path a consumer should use, the first sentence of its doc comment, its
// Storybook id and a deprecated flag.
//
// Why: a consumer's agent sees only what ships in the tarball. Before this
// index it could find ~95 of ~900 exported components documented anywhere,
// so it hand-rolled the rest. `src/__tests__/component-index.test.ts` fails
// when the committed index differs from this script's output, so a new export
// cannot ship undocumented-by-omission.
//
// How it reads the surface WITHOUT a build: package.json `exports` keys map to
// the vite.config.ts lib `entry` sources (so a new subpath is picked up
// automatically), and each entry barrel is walked with the TypeScript 6
// *parser* (`@typescript/typescript6`, a direct devDependency — TypeScript 7
// has no JS API, see scripts/tsc.mjs). Only `ts.createSourceFile` is used; the
// module resolution below is ours and deliberately small: relative specifiers
// and the `@/` alias, `export *`, `export { a as b } from`, `export default`,
// and import-then-export. Nothing is type-checked, so this runs in ~1-2 s.
//
//   node scripts/generate-component-index.mjs           # write the index
//   node scripts/generate-component-index.mjs --check   # exit 1 if stale
//
// Grouping: a curated name map first (CANONICAL_GROUP), then the declaring
// file's directory (DIR_GROUP), then name patterns for the generic `ui/` and
// `shared/` directories (NAME_RULES). New page templates in `shared/` whose
// names end in `Page`/`Frame` land in "Page templates" automatically.

import { readFileSync, writeFileSync, existsSync, statSync } from 'node:fs';
import { createRequire } from 'node:module';
import { resolve, dirname, relative, basename, join } from 'node:path';

const require = createRequire(import.meta.url);
const ts = require('@typescript/typescript6');

const ROOT = resolve(import.meta.dirname, '..');
const PKG_NAME = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8')).name;
export const INDEX_PATH = join(ROOT, 'docs/COMPONENT_INDEX.md');

// ---------------------------------------------------------------------------
// Entries: package.json exports key -> source barrel (via vite.config.ts)
// ---------------------------------------------------------------------------

function entrySources() {
  const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'));
  const viteSrc = readFileSync(join(ROOT, 'vite.config.ts'), 'utf8');
  const entryMap = new Map();
  for (const m of viteSrc.matchAll(/(?:'([^']+)'|([\w-]+))\s*:\s*resolve\(\s*import\.meta\.dirname\s*,\s*'([^']+)'\s*\)/g)) {
    entryMap.set(m[1] ?? m[2], join(ROOT, m[3]));
  }
  const out = [];
  for (const [key, value] of Object.entries(pkg.exports)) {
    if (typeof value !== 'object' || !value.import) continue;
    const distName = value.import.replace(/^\.\/dist\//, '').replace(/\.js$/, '');
    const src = entryMap.get(distName);
    if (!src) throw new Error(`exports["${key}"] -> ${value.import} has no vite.config.ts lib entry`);
    out.push({ key, subpath: key === '.' ? '' : key.slice(1), src });
  }
  return out;
}

// ---------------------------------------------------------------------------
// A small re-export resolver over the TS parser
// ---------------------------------------------------------------------------

const parsed = new Map();
function parse(file) {
  let sf = parsed.get(file);
  if (!sf) {
    sf = ts.createSourceFile(file, readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true,
      file.endsWith('x') ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
    parsed.set(file, sf);
  }
  return sf;
}

function resolveModule(fromFile, spec) {
  let base;
  if (spec.startsWith('.')) base = resolve(dirname(fromFile), spec);
  else if (spec.startsWith('@/')) base = join(ROOT, 'src', spec.slice(2));
  else return null;
  base = base.replace(/\.(js|jsx|ts|tsx)$/, '');
  for (const cand of [`${base}.ts`, `${base}.tsx`, join(base, 'index.ts'), join(base, 'index.tsx')]) {
    if (existsSync(cand) && statSync(cand).isFile()) return cand;
  }
  return null;
}

const hasMod = (node, kind) => !!node.modifiers?.some((m) => m.kind === kind);

function jsDocOf(node) {
  const docs = node?.jsDoc;
  return docs && docs.length ? docs[docs.length - 1] : null;
}
function docText(doc) {
  if (!doc || doc.comment == null) return '';
  return typeof doc.comment === 'string' ? doc.comment : doc.comment.map((c) => c.text ?? '').join('');
}
function isDeprecated(...nodes) {
  for (const n of nodes) for (const d of n?.jsDoc ?? []) {
    if (d.tags?.some((t) => t.tagName.escapedText === 'deprecated')) return true;
  }
  return false;
}

/** Local declarations of a file: name -> { node, isType } */
const localsCache = new Map();
function localsOf(file) {
  if (localsCache.has(file)) return localsCache.get(file);
  const sf = parse(file);
  const locals = new Map();
  const imports = new Map(); // local name -> { spec, imported }
  for (const st of sf.statements) {
    if (ts.isFunctionDeclaration(st) || ts.isClassDeclaration(st) || ts.isEnumDeclaration(st)) {
      if (st.name) locals.set(st.name.text, { node: st, isType: false });
    } else if (ts.isInterfaceDeclaration(st) || ts.isTypeAliasDeclaration(st)) {
      locals.set(st.name.text, { node: st, isType: true });
    } else if (ts.isVariableStatement(st)) {
      for (const d of st.declarationList.declarations) {
        if (ts.isIdentifier(d.name)) locals.set(d.name.text, { node: st, isType: false, decl: d });
      }
    } else if (ts.isImportDeclaration(st) && st.importClause && ts.isStringLiteral(st.moduleSpecifier)) {
      const spec = st.moduleSpecifier.text;
      const ic = st.importClause;
      if (ic.name) imports.set(ic.name.text, { spec, imported: 'default' });
      if (ic.namedBindings && ts.isNamedImports(ic.namedBindings)) {
        for (const el of ic.namedBindings.elements) {
          imports.set(el.name.text, { spec, imported: (el.propertyName ?? el.name).text });
        }
      }
    }
  }
  const res = { locals, imports };
  localsCache.set(file, res);
  return res;
}

function makeDecl(file, name, entry) {
  return { id: `${file}#${name}`, file, name, node: entry.node, isType: entry.isType, decl: entry.decl };
}

/** Resolve a local identifier of `file` to its declaration. */
function resolveLocal(file, name, seen) {
  const { locals, imports } = localsOf(file);
  if (locals.has(name)) return makeDecl(file, name, locals.get(name));
  const imp = imports.get(name);
  if (imp) {
    const target = resolveModule(file, imp.spec);
    if (target) return exportsOf(target, seen).get(imp.imported) ?? null;
  }
  return null;
}

const exportsCache = new Map();
/** Map exportedName -> { ...decl, deprecated } for a module. */
function exportsOf(file, seen = new Set()) {
  if (exportsCache.has(file)) return exportsCache.get(file);
  if (seen.has(file)) return new Map();
  seen.add(file);
  const sf = parse(file);
  const out = new Map();
  const set = (name, decl, extraDeprecated = false) => {
    if (!decl || out.has(name)) return;
    out.set(name, { ...decl, deprecated: decl.deprecated || extraDeprecated });
  };
  const withDep = (decl) => decl && { ...decl, deprecated: decl.deprecated ?? isDeprecated(decl.node, decl.decl) };

  for (const st of sf.statements) {
    if (ts.isExportDeclaration(st)) {
      const spec = st.moduleSpecifier && ts.isStringLiteral(st.moduleSpecifier) ? st.moduleSpecifier.text : null;
      const target = spec ? resolveModule(file, spec) : null;
      if (spec && !target) continue; // a package re-export; not ours to index
      if (!st.exportClause) {
        for (const [n, d] of exportsOf(target, seen)) if (n !== 'default') set(n, d);
      } else if (ts.isNamespaceExport(st.exportClause)) {
        // `export * as ns` — a namespace object, not a component; skip.
      } else {
        for (const el of st.exportClause.elements) {
          const from = (el.propertyName ?? el.name).text;
          const decl = target ? exportsOf(target, seen).get(from) : withDep(resolveLocal(file, from, seen));
          if (decl) set(el.name.text, { ...decl, isType: decl.isType || st.isTypeOnly || el.isTypeOnly },
            isDeprecated(el, st));
        }
      }
    } else if (ts.isExportAssignment(st) && !st.isExportEquals) {
      if (ts.isIdentifier(st.expression)) set('default', withDep(resolveLocal(file, st.expression.text, seen)));
    } else if (hasMod(st, ts.SyntaxKind.ExportKeyword)) {
      const isDefault = hasMod(st, ts.SyntaxKind.DefaultKeyword);
      if (ts.isVariableStatement(st)) {
        for (const d of st.declarationList.declarations) {
          if (ts.isIdentifier(d.name)) set(d.name.text, withDep(makeDecl(file, d.name.text, { node: st, isType: false, decl: d })));
        }
      } else if (st.name) {
        const isType = ts.isInterfaceDeclaration(st) || ts.isTypeAliasDeclaration(st);
        const decl = withDep(makeDecl(file, st.name.text, { node: st, isType }));
        set(isDefault ? 'default' : st.name.text, decl);
      }
    }
  }
  exportsCache.set(file, out);
  return out;
}

// ---------------------------------------------------------------------------
// Descriptions
// ---------------------------------------------------------------------------

function firstSentence(text) {
  const t = text
    .replace(/\{@link\s+([^}|\s]+)[^}]*\}/g, '`$1`')
    .replace(/\s+/g, ' ')
    .trim();
  if (!t) return '';
  // End at the first ". " / "! " / "? " not inside backticks, or at the end.
  let inTick = false;
  for (let i = 0; i < t.length; i++) {
    const c = t[i];
    if (c === '`') inTick = !inTick;
    if (!inTick && (c === '.' || c === '!' || c === '?') && (i === t.length - 1 || t[i + 1] === ' ')) {
      // Skip common abbreviations ("e.g.", "i.e.", "vs.").
      const before = t.slice(Math.max(0, i - 4), i + 1).toLowerCase();
      if (/(e\.g\.|i\.e\.|vs\.|etc\.)$/.test(before) && i !== t.length - 1) continue;
      return clip(t.slice(0, i + 1));
    }
  }
  return clip(t);
}
function clip(s) {
  const out = s.length > 220 ? `${s.slice(0, 217).trimEnd()}…` : s;
  return out.replace(/\|/g, '\\|');
}

/** The file's leading comment block (// lines or one block comment), if any. */
function fileHeader(file) {
  const text = parse(file).getFullText();
  const lines = [];
  const blk = text.match(/^\s*\/\*\*?([\s\S]*?)\*\//);
  if (blk && text.trimStart().startsWith('/*')) {
    lines.push(...blk[1].split('\n').map((l) => l.replace(/^\s*\*\s?/, '')));
  } else {
    for (const raw of text.split('\n')) {
      const l = raw.trim();
      if (!l.startsWith('//')) { if (l === '' && lines.length === 0) continue; break; }
      lines.push(l.replace(/^\/\/\s?/, ''));
    }
  }
  // Drop a leading "src/components/…/File.tsx" path line and blank lines.
  while (lines.length && (/^\s*$/.test(lines[0]) || /^[\w./-]+\.(t|j)sx?\b/.test(lines[0].trim()))) lines.shift();
  // Paragraph one only.
  const para = [];
  for (const l of lines) { if (/^\s*$/.test(l)) break; para.push(l); }
  return para.join(' ');
}

function describe(decl) {
  const own = docText(jsDocOf(decl.node));
  if (own.trim()) return firstSentence(own);
  const props = localsOf(decl.file).locals.get(`${decl.name}Props`);
  const propsDoc = props ? docText(jsDocOf(props.node)) : '';
  if (propsDoc.trim()) return firstSentence(propsDoc);
  // A file header describes this declaration only when the file is named for it.
  const stem = basename(decl.file).replace(/\.(tsx?|jsx?)$/, '');
  if (stem === decl.name || stem === 'index' && basename(dirname(decl.file)) === decl.name) {
    let h = fileHeader(decl.file);
    h = h.replace(new RegExp(`^\`?<?${decl.name}>?\`?\\s*(—|--|-|:)\\s*`), '');
    if (h) return firstSentence(h.charAt(0).toUpperCase() + h.slice(1));
  }
  return '';
}

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

function walk(dir, acc = []) {
  for (const name of require('node:fs').readdirSync(dir)) {
    if (name === 'node_modules' || name.startsWith('.')) continue;
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, acc);
    else acc.push(p);
  }
  return acc;
}

/** GitHub's heading anchor: lowercase, drop punctuation, spaces to dashes. */
const anchor = (s) => s.toLowerCase().replace(/[^a-z0-9 -]/g, '').replace(/ /g, '-');
const sanitize = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

function storyIndex() {
  const byDecl = new Map();
  const byFile = new Map();
  for (const file of walk(join(ROOT, 'src')).filter((f) => /\.stories\.tsx?$/.test(f)).sort()) {
    const sf = parse(file);
    let meta = null;
    const objOf = (expr) => {
      while (expr && (ts.isSatisfiesExpression?.(expr) || ts.isAsExpression(expr) || ts.isParenthesizedExpression(expr))) expr = expr.expression;
      return expr && ts.isObjectLiteralExpression(expr) ? expr : null;
    };
    for (const st of sf.statements) {
      if (ts.isExportAssignment(st)) {
        meta = objOf(st.expression);
        if (!meta && ts.isIdentifier(st.expression)) {
          const local = localsOf(file).locals.get(st.expression.text);
          meta = objOf(local?.decl?.initializer);
        }
      }
    }
    if (!meta) continue;
    const prop = (n) => meta.properties.find((p) => ts.isPropertyAssignment(p) && p.name.getText(sf) === n);
    const title = prop('title');
    if (!title || !ts.isStringLiteralLike(title.initializer)) continue;
    const id = sanitize(title.initializer.text);
    const comp = prop('component');
    if (comp && ts.isIdentifier(comp.initializer)) {
      const d = resolveLocal(file, comp.initializer.text, new Set());
      if (d && !byDecl.has(d.id)) byDecl.set(d.id, id);
    }
    const stemFile = file.replace(/\.stories\.tsx?$/, '');
    if (!byFile.has(stemFile)) byFile.set(stemFile, id);
  }
  return (decl) => byDecl.get(decl.id)
    ?? (basename(decl.file).replace(/\.(tsx?)$/, '') === decl.name ? byFile.get(decl.file.replace(/\.(tsx?)$/, '')) : undefined)
    ?? '';
}

// ---------------------------------------------------------------------------
// Groups
// ---------------------------------------------------------------------------

export const GROUPS = [
  'Page templates',
  'Shells & layouts',
  'Page structure, sections & dividers',
  'Tables & lists',
  'Forms',
  'Buttons & actions',
  'Feedback & states',
  'Chat & social',
  'Video',
  'Docs & editor',
  'Diagram, graph & pipelines',
  'Agents & compute',
  'Identity',
  'Observability',
  'Charts & data display',
  'Other',
  'Icons',
];

/** Curated: names whose job the directory or name pattern would misfile. */
const CANONICAL_GROUP = {
  PageFrame: 'Page templates', CollectionPage: 'Page templates', MasterDetailPage: 'Page templates',
  DetailPage: 'Page templates', SettingsPage: 'Page templates', SectionLayout: 'Page templates',
  PageFromSpec: 'Page templates', PageSpecProvider: 'Page templates', SpecLeaf: 'Page templates',
  AppShell: 'Shells & layouts', AppLayout: 'Shells & layouts', CollapsibleSidebar: 'Shells & layouts',
  WorkArea: 'Shells & layouts', SubNavLayout: 'Shells & layouts', SettingsLayout: 'Shells & layouts',
  PageHeader: 'Page structure, sections & dividers', PageSection: 'Page structure, sections & dividers',
  DetailSection: 'Page structure, sections & dividers', Divider: 'Page structure, sections & dividers',
  PanelHeader: 'Page structure, sections & dividers', ChannelHeader: 'Page structure, sections & dividers',
  Breadcrumbs: 'Page structure, sections & dividers', Tabs: 'Page structure, sections & dividers',
  DataTable: 'Tables & lists', Table: 'Tables & lists', EntityTable: 'Tables & lists',
  CollectionToolbar: 'Tables & lists',
  Button: 'Buttons & actions', IconButton: 'Buttons & actions',
  EmptyState: 'Feedback & states', ErrorState: 'Feedback & states', LoadingState: 'Feedback & states',
  PresenceAvatars: 'Chat & social', NotificationCenter: 'Chat & social',
  FileUploadDrop: 'Forms', FormField: 'Forms',
  ErrorBoundary: 'Feedback & states',
  HangoutLayout: 'Video',
  MasterDetail: 'Shells & layouts',
  FormWizard: 'Forms', Wizard: 'Forms',
  SegmentedControl: 'Buttons & actions', FilterChip: 'Buttons & actions', FollowUpChips: 'Buttons & actions',
  Chip: 'Feedback & states', TreeView: 'Tables & lists', KeyValue: 'Page structure, sections & dividers',
  SectionLabel: 'Page structure, sections & dividers', TitledFrame: 'Page structure, sections & dividers',
  Inline: 'Page structure, sections & dividers', MetaLine: 'Page structure, sections & dividers',
};

const DIR_GROUP = [
  [/^components\/layout\//, 'Shells & layouts'],
  [/^components\/sidebar\//, 'Shells & layouts'],
  [/^components\/(forms|field-types)\//, 'Forms'],
  [/^components\/(social|inbox|collaboration)\//, 'Chat & social'],
  [/^(components\/(video|hangout|voice)\/|video(-ivs)?\.ts$)/, 'Video'],
  [/^components\/(doc-editor|doc-types|doc-macros|change-review)\//, 'Docs & editor'],
  [/^components\/(diagram|graph|pipelines)\//, 'Diagram, graph & pipelines'],
  [/^components\/(agents|compute)\//, 'Agents & compute'],
  [/^components\/identity\//, 'Identity'],
  [/^components\/observability\//, 'Observability'],
  [/^renderers\//, 'Docs & editor'],
];

const NAME_RULES = [
  [/Icon$/, 'Icons'],
  [/Page$/, 'Page templates', /^components\/shared\//],
  [/(Chart|Sparkline|Histogram|Gauge|StatStrip|Diagram)$/, 'Charts & data display'],
  [/(Chat|Message|Messages|Comment|Comments|Reaction|Reactions|Presence|Avatar|Avatars|Thread|Mention|Typing|Notification|Activity)/, 'Chat & social'],
  [/(Hangout|Video|Call|Media|Stream|Recording|Broadcast|Breakout|AudioVideo|Meeting)/, 'Video'],
  [/(Shell|Layout|Sidebar|Rail|RailStack|WorkArea|SplitPane|Split)$/, 'Shells & layouts'],
  [/(Table|List|Row|Rows|Grid|Column|Columns|Pagination|Pager|Tree|Toolbar|Board|Kanban)$|^Table/, 'Tables & lists'],
  [/(Input|Select|Field|Checkbox|Radio|Slider|Switch|Picker|Editor|Combobox|Form|Upload|Drop|Dropzone|TagEditor)$/, 'Forms'],
  [/(Button|Buttons|Menu|MenuItem|Action|Actions|Dropdown|Link|Toggle|Shortcut|Kbd|Palette)$/, 'Buttons & actions'],
  [/(State|Empty|Error|Loading|Spinner|Skeleton|Toast|Toaster|Banner|Alert|Badge|Pill|Progress|ProgressBar|Notice|Status|Callout|Indicator|Fallback|Boundary|Meter|Dot)$/, 'Feedback & states'],
  [/(Header|Heading|Section|Divider|Separator|Card|Cards|Panel|Tabs|Tab|Breadcrumbs|Stack|Disclosure|Modal|Dialog|Drawer|Popover|Tooltip|Sheet|Accordion|Group|Text|Title|T)$/, 'Page structure, sections & dividers'],
];

function groupOf(name, decl) {
  if (CANONICAL_GROUP[name]) return CANONICAL_GROUP[name];
  const rel = relative(join(ROOT, 'src'), decl.file).split('\\').join('/');
  if (/Icon$/.test(name)) return 'Icons';
  for (const [re, g] of DIR_GROUP) if (re.test(rel)) return g;
  for (const [re, g, dirRe] of NAME_RULES) if (re.test(name) && (!dirRe || dirRe.test(rel))) return g;
  return 'Other';
}

// ---------------------------------------------------------------------------
// Canonical choices (hand-written; the generator only flags missing names)
// ---------------------------------------------------------------------------

const CANONICAL = [
  ['A new page (the default)', 'PageFromSpec', 'Describe the page as data (`PageSpec`: `template` → regions → `SectionSpec[]` → `LeafSpec[]`) and render it; `definePage(spec)` types it. Each leaf `kind` (`button`, `table`, `stats`, `form`, `tabs`, …) is one library component, so the page cannot contain hand-rolled markup. Reference: `docs/page-spec.md`.', 'Not for what a spec cannot express (a canvas, an editor): use the JSX template directly, or a registered leaf kind (`registerLeafKind` / `PageSpecProvider`) before reaching for `custom`.'],
  ['App-defined leaf kinds', 'PageSpecProvider', 'Supplies components for the kinds an app declares on `PageSpecLeafKinds` (module augmentation), so they type-check in a spec; `registerLeafKind` does the same globally.', 'Not to replace a built-in kind (it throws); not for one-off markup (that is a `custom` leaf with a `reason`).'],
  ['Frame for any page', 'PageFrame', 'The outer frame of every routed page: title row, width and gutters. Use it (or a template built on it) instead of a hand-rolled `<div className="p-6 max-w-…">`.', 'Not for panels or drawers inside a page.'],
  ['A list / collection page', 'CollectionPage', 'Title, description, header actions and a `CollectionToolbar` (search, filters, view switch) over the body. Pass rows as `table` (a striped `DataTable` with its `loading`/`empty`/`error` states) or a custom body as `children`; pass `gutter="page"` (its default is `none`).', 'Not for a list with a persistent detail pane (use `MasterDetailPage`) or a single record.'],
  ['A list with a detail panel', 'MasterDetailPage', 'Selectable list on one side, the selected record on the other; owns selection layout and the narrow-screen fallback. (`MasterDetail` is the lower-level rail + pane primitive it builds on.)', 'Not for a list whose rows navigate to their own route (use `CollectionPage` + `DetailPage`).'],
  ['One record\'s detail page', 'DetailPage', 'Header with the record\'s title/status/actions, then **tabs** for the record\'s facets.', 'Don\'t stack a column of `Card`s for each facet; put facets in tabs and use `DetailSection` inside a tab.'],
  ['A dashboard', 'DashboardPage', 'KPI row plus a grid of chart/stat panels. Use `StatCard`/`KPIGrid` inside it.', 'Not the observability cluster dashboard: that is a different `DashboardPage` on the `/observability` subpath.', ['/observability']],
  ['Pages inside a sectioned area', 'SectionLayout', 'Section rail (`items`, `railFold`) + optional list rail (`list`, `listFold`) + the content column: with `header`, the trail row (`trailControls`), the title band and a body whose `footer`/`ColumnDock` composer docks at the column\'s bottom; fills the viewport (`fill="viewport"`). Without `header` the child page template is the column.', 'Not for one standalone page (use `PageFrame` or the matching template); not for a list + record with no section rail (use `MasterDetailPage`).'],
  ['A settings page', 'SettingsPage', 'Section rail + settings content with consistent row spacing. (`SettingsLayout` is the lower-level shell.)', 'Not for a one-off form inside a modal (use the `forms/` controls in a `Modal`).'],
  ['App chrome', 'AppShell', 'Sidebar + top bar + content region. Pass `layout="fill"` when the content area must fill the viewport (canvases, chat, editors) rather than scroll as a document.', 'Not inside a page; there is exactly one per app. Import it (and `ThemeProvider`) from `/shared`; there is no `/layout` subpath.'],
  ['A data table', 'DataTable', 'Columns + rows with sorting, selection, empty/loading states and row striping by default. Start here for any tabular data.', 'Don\'t drop to `Table` primitives unless you need cell layouts `DataTable` cannot express.'],
  ['Table building blocks', 'Table', '`Table`, `TableHead`, `TableBody`, `TableRow`, `TableTh`, `TableTd`: the styled primitives `DataTable` is made of.', 'Not a first choice: no sorting, selection or states built in.'],
  ['Identity admin tables', 'EntityTable', 'The identity-admin entity list (users, groups, roles) with row actions.', 'Not a general-purpose table; use `DataTable` outside identity admin.'],
  ['Separate sections', 'SectionStack', 'Stacks a page\'s sections with a full-width hairline between each (none before the first or after the last; skips null children). `Divider` is a single (optionally captioned) hairline; `PageSection divided` rules the groups inside one section; inside a detail surface use `DetailSection`.', 'Don\'t separate sections with nested `Card`s, `<hr>`, or border utility classes.'],
  ['A section of a page', 'PageSection', 'Titled section with description, count and actions; sizes `lg`/`md`/`sm`.', 'Not for sections inside a drawer or detail tab (use `DetailSection`).'],
  ['A section inside a detail surface', 'DetailSection', 'Titled block with a hairline above it (`first` suppresses the first rule); `variant="heading"` for document-like bodies.', 'Not for top-level page sections (use `PageSection`).'],
  ['A section or panel header inside a page', 'CardHeader', 'Title + actions row with the separator under it, for a card or panel section. Use `PaneHeader` when the pane has tabs. Never hand-draw `border-b` header bands.', 'Not a page header (use `PageHeader` or a page template) or a channel/room header (use `ChannelHeader`).'],
  ['A page\'s title row', 'PageHeader', 'Title, description, back link and actions at the top of a page. Templates render it for you.', 'Don\'t hand-roll an `<h1>` + flex row of buttons.'],
  ['Buttons', 'Button', 'Always pass an explicit `variant` (`primary`, `secondary`, `ghost`, `danger`, `danger-solid`, `success`, `info`, `link`) and `size` where it matters. `IconButton` for icon-only actions.', 'Don\'t style a raw `<button>`, and don\'t rely on the default variant: one primary action per region.'],
  ['Empty / error / loading', 'EmptyState', '`EmptyState`, `ErrorState` and `LoadingState` for whole-region states.', 'Don\'t write "No items" paragraphs or spinners by hand.'],
  ['Form controls', 'Input', 'Every control comes from `forms/`: `Input`, `Select`, `Textarea`, `NumberInput`, `RadioGroup`, `Checkbox`, `Slider`, `ColorInput`, `Switch`, wrapped in `FormField` for label/help/error.', 'Never a raw `<input>`/`<select>`.'],
  ['Chat', 'ChatPanel', 'Message list + composer. With realtime-modules, use `WrappedChatPanel` from `/integrations/realtime-modules`.', 'Don\'t hand-roll a message list.'],
  ['Who is here', 'PresenceAvatars', 'Stacked avatars for the people in a room or document.', 'Don\'t draw avatar circles by hand (single avatar: `Avatar`).'],
];

// ---------------------------------------------------------------------------
// Assemble
// ---------------------------------------------------------------------------

const isPascal = (n) => /^[A-Z][A-Za-z0-9]*$/.test(n) && (/[a-z]/.test(n) || n.length === 1);

/**
 * Which entry a row's import path names when several export the same
 * declaration: a subpath before the root, because the root barrel reaches
 * every optional peer and the package deliberately declares no `sideEffects`
 * (docs/bundle-side-effects.md), so a root import costs consumers the whole
 * library. `/shared` first, `/integrations/realtime-modules` over the
 * scope-agnostic `/integrations/realtime`, then package.json order; the root
 * only for names no subpath exports.
 */
function entryRank(key, i) {
  if (key === './shared') return -2;
  if (key === './integrations/realtime-modules') return -1;
  if (key === '.') return 10_000;
  return i;
}

/** First-sentence overrides where the source doc comment is a note, not a summary. */
const DESCRIPTION_OVERRIDE = {
  AppShell: 'The app chrome: sidebar, header, optional subheader and the content region, with a toast region by default.',
  AppLayout: 'The room-shaped app layout: rooms sidebar, presence and nested content, wired to the pipelines run providers.',
  CollectionPage: 'A list/collection page: PageHeader, an optional CollectionToolbar, then the collection content.',
};

export function collect() {
  const entries = entrySources()
    .map((e, i) => ({ ...e, rank: entryRank(e.key, i) }))
    .sort((a, b) => a.rank - b.rank);
  const rows = new Map(); // decl id -> row
  let total = 0;
  for (const { subpath, src } of entries) {
    for (const [name, decl] of exportsOf(src)) {
      if (name === 'default' || decl.isType || !isPascal(name)) continue;
      let row = rows.get(decl.id);
      if (!row) {
        row = { decl, name, subpath, aliases: [], deprecated: false };
        rows.set(decl.id, row);
        total++;
      } else if (name !== row.name && !row.aliases.some((a) => a.name === name)) {
        row.aliases.push({ name, subpath });
      }
      row.deprecated ||= !!decl.deprecated;
    }
  }
  const storyOf = storyIndex();
  for (const row of rows.values()) {
    row.description = DESCRIPTION_OVERRIDE[row.name] ?? describe(row.decl);
    row.story = storyOf(row.decl);
    row.group = groupOf(row.name, row.decl);
  }
  return { rows: [...rows.values()], total, entries };
}

const importPath = (subpath) => `${PKG_NAME}${subpath}`;

export function render() {
  const { rows, entries } = collect();
  const documented = rows.filter((r) => r.description).length;

  const L = [];
  L.push('# Component index');
  L.push('');
  L.push('<!-- GENERATED by `npm run docs:index` (scripts/generate-component-index.mjs). Do not edit by hand: ');
  L.push('     src/__tests__/component-index.test.ts fails when this file is stale. -->');
  L.push('');
  L.push(`Every component-shaped (PascalCase, runtime) export of \`${PKG_NAME}\`, grouped by job. `
    + 'Before writing any page or hand-rolling markup, find the component here. '
    + 'Import paths are the ones to use: each names a subpath where one exports the component, because a root import pulls the whole library into a consumer bundle. `AppShell` and `ThemeProvider` are on `/shared`; other layout components (`AppLayout`, `CollapsibleSidebar`) are root-only; there is no `/layout` subpath.');
  L.push('');
  L.push(`${rows.length} components across ${entries.length} entry points; ${documented} carry a one-line description from their source doc comment. `
    + 'Story ids are Storybook ids (`npm run storybook`, then `?path=/docs/<id>--docs`).');
  L.push('');
  L.push('Also read: [`docs/consumer-adoption.md`](consumer-adoption.md) (decision tree and refactors), '
    + '[`patterns/`](../patterns/README.md), [`skills/ui-page-build/SKILL.md`](../skills/ui-page-build/SKILL.md) (building a page) and '
    + '[`skills/ui-dom-audit/SKILL.md`](../skills/ui-dom-audit/SKILL.md) (auditing one).');
  L.push('');
  L.push('## Canonical choices');
  L.push('');
  L.push('One component per common job. Reach for these first; the "don\'t use for" column is where the wrong pick usually happens.');
  L.push('');
  L.push('| Job | Use | Import | Notes | Don\'t use for |');
  L.push('|---|---|---|---|---|');
  for (const [job, name, notes, dont, excludeSubpaths = []] of CANONICAL) {
    // Prefer the root export; never point at an excluded same-named component.
    const candidates = rows.filter((r) => r.name === name && !excludeSubpaths.includes(r.subpath));
    const r = candidates.find((c) => c.subpath === '') ?? candidates[0];
    const where = r ? `\`${importPath(r.subpath)}\`` : '_not in this build yet_';
    L.push(`| ${job} | \`${name}\` | ${where} | ${notes.replace(/\|/g, '\\|')} | ${dont.replace(/\|/g, '\\|')} |`);
  }
  L.push('');

  const grouped = new Map(GROUPS.map((g) => [g, []]));
  for (const r of rows) grouped.get(r.group).push(r);
  L.push('## Contents');
  L.push('');
  for (const g of GROUPS) {
    const n = grouped.get(g).length;
    if (n) L.push(`- [${g}](#${anchor(g)}) (${n})`);
  }
  L.push('');
  for (const g of GROUPS) {
    const list = grouped.get(g).sort((a, b) => a.name.localeCompare(b.name) || a.subpath.localeCompare(b.subpath));
    if (!list.length) continue;
    L.push(`## ${g}`);
    L.push('');
    if (g === 'Icons') {
      const bySub = new Map();
      for (const r of list) {
        if (!bySub.has(r.subpath)) bySub.set(r.subpath, []);
        bySub.get(r.subpath).push(r.deprecated ? `${r.name} (deprecated)` : r.name);
      }
      for (const [sub, names] of [...bySub].sort()) {
        L.push(`From \`${importPath(sub)}\`: ${names.map((n) => `\`${n}\``).join(', ')}`);
        L.push('');
      }
      continue;
    }
    L.push('| Component | Import | Description | Story | Deprecated |');
    L.push('|---|---|---|---|---|');
    for (const r of list) {
      let desc = r.description || '—';
      if (r.aliases.length) desc += ` (also exported as ${r.aliases.map((a) => `\`${a.name}\` from \`${importPath(a.subpath)}\``).join(', ')})`;
      L.push(`| \`${r.name}\` | \`${importPath(r.subpath)}\` | ${desc} | ${r.story ? `\`${r.story}\`` : ''} | ${r.deprecated ? 'deprecated' : ''} |`);
    }
    L.push('');
  }
  return L.join('\n');
}

const isMain = process.argv[1] && resolve(process.argv[1]) === resolve(import.meta.filename);
if (isMain) {
  const out = render();
  if (process.argv.includes('--check')) {
    const cur = existsSync(INDEX_PATH) ? readFileSync(INDEX_PATH, 'utf8') : '';
    if (cur !== out) {
      console.error('docs/COMPONENT_INDEX.md is stale. Run `npm run docs:index` and commit the result.');
      process.exit(1);
    }
    console.log('docs/COMPONENT_INDEX.md is up to date.');
  } else {
    writeFileSync(INDEX_PATH, out);
    const { rows } = collect();
    console.log(`Wrote docs/COMPONENT_INDEX.md: ${rows.length} components, ${rows.filter((r) => r.description).length} described.`);
  }
}
