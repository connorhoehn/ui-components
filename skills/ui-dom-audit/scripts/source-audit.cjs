/** Portable source candidates and archive/install verification. App gates stay in adapters. */
const fs = require('node:fs');
const path = require('node:path');
const cp = require('node:child_process');
const crypto = require('node:crypto');
const os = require('node:os');

function createSourceAudit({ typescript: ts, packageName, densityEntryPoints = [], isPage = () => false }) {
  const controls = new Set(['Button', 'IconButton', 'Input', 'Select', 'SearchInput', 'DropdownMenu', 'FilterChip', 'DataTable', 'Table', 'SegmentedControl']);
  const surfaces = new Set(['Toolbar', 'PageHeader', 'ChatPanel', 'ChatSidePanelFrame', 'ComposerSurface', 'CollectionPage', 'CollectionToolbar', 'SubNavLayout']);
  const geometry = /(?:^|\s)(?:[\w-]+:)*(?:[mp][xytrblse]?|gap(?:-[xy])?|[wh]|min-[wh]|max-[wh]|text|leading|rounded)(?:-[\w.[\]()%#,/-]+)(?=\s|$)/g;

  function analyzeTsx(source, filename) {
    const tree = ts.createSourceFile(filename, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
    const imports = new Map(), hits = [], used = new Set();
    for (const node of tree.statements) {
      if (!ts.isImportDeclaration(node) || !(node.moduleSpecifier.text === packageName || node.moduleSpecifier.text.startsWith(packageName + '/'))) continue;
      const names = node.importClause?.namedBindings;
      if (names && ts.isNamedImports(names)) for (const item of names.elements) imports.set(item.name.text, (item.propertyName ?? item.name).text);
    }
    function add(node, pattern, detail) { hits.push({ pattern, file: filename, line: tree.getLineAndCharacterOfPosition(node.getStart(tree)).line + 1, detail }); }
    function visit(node) {
      if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
        const name = imports.get(node.tagName.getText(tree));
        if (name) used.add(name);
        if (controls.has(name) || surfaces.has(name) || name === 'DensityProvider') {
          for (const attr of node.attributes.properties) {
            if (!ts.isJsxAttribute(attr)) continue;
            const key = attr.name.getText(tree), value = attr.initializer;
            if (key === 'size' && controls.has(name)) add(attr, 'explicit-control-size', `${name} ${attr.getText(tree)}`);
            if (key === 'className' && value) {
              // Parse literal portions only. Dynamic results require rendered inspection.
              const literals = [];
              function collect(n) { if (ts.isStringLiteral(n) || ts.isNoSubstitutionTemplateLiteral(n) || ts.isTemplateHead(n) || ts.isTemplateMiddle(n) || ts.isTemplateTail(n)) literals.push(n.text); else ts.forEachChild(n, collect); }
              collect(value);
              const overrides = literals.flatMap(text => [...text.matchAll(geometry)].map(m => m[0].trim()));
              if (overrides.length) add(attr, 'component-class-override', `${name}: ${overrides.join(' ')}`);
            }
            if (key === 'style') add(attr, 'component-style-override', name);
          }
          if (name === 'DensityProvider' && !densityEntryPoints.includes(filename)) add(node, 'local-density-provider', 'Check intentional local density against the real shell');
        }
      }
      ts.forEachChild(node, visit);
    }
    visit(tree);
    if (isPage(filename) && used.has('PageHeader') && (used.has('Toolbar') || used.has('DataTable')) && !used.has('CollectionPage')) hits.push({ pattern: 'local-collection-composition', file: filename, line: 1, detail: 'PageHeader plus table/toolbar: review whether CollectionPage owns this composition' });
    return hits;
  }

  function scanSource({ root, sourceDirs }) {
    const findings = [];
    function walk(dir) {
      for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
        if (['node_modules', '__tests__'].includes(item.name)) continue;
        const file = path.join(dir, item.name), relative = path.relative(root, file);
        if (item.isDirectory()) walk(file);
        else if (/\.tsx$/.test(file) && !/\.(test|stories)\./.test(file)) findings.push(...analyzeTsx(fs.readFileSync(file, 'utf8'), relative));
        else if (/\.css$/.test(file)) {
          const source = fs.readFileSync(file, 'utf8');
          // Selector scan, not declaration text: test IDs and library-private classes
          // turn component markup into an undocumented styling API.
          for (const match of source.matchAll(/([^{}]+)\{/g)) {
            const selector = match[1].replace(/\/\*[\s\S]*?\*\//g, '').trim();
            if (/data-testid|\.uic-/.test(selector)) findings.push({ pattern: 'css-internal-selector', file: relative, line: source.slice(0, match.index).split('\n').length, detail: selector.replace(/\s+/g, ' ') });
          }
        }
      }
    }
    for (const dir of sourceDirs) walk(path.resolve(root, dir));
    return findings;

  }
  return { analyzeTsx, scanSource };
}

function verifyInstalledArchive({ packageRoot, packageName: name, archivePrefix = 'file:' }) {
  const failures = [];
  const requireContract = (condition, message) => { if (!condition) failures.push(message); };
  const pkg = JSON.parse(fs.readFileSync(path.join(packageRoot, 'package.json'), 'utf8'));
  const lock = JSON.parse(fs.readFileSync(path.join(packageRoot, 'package-lock.json'), 'utf8'));
  const spec = pkg.dependencies?.[name];
  requireContract(spec?.startsWith(archivePrefix), 'UI dependency must reference the reviewed vendor archive.');
  if (spec?.startsWith(archivePrefix)) {
    const archive = path.join(packageRoot, spec.slice(5));
    const entry = lock.packages[`node_modules/${name}`];
    const hash = 'sha512-' + crypto.createHash('sha512').update(fs.readFileSync(archive)).digest('base64');
    requireContract(entry?.integrity === hash && entry?.resolved === spec, 'UI archive does not match package-lock integrity/resolution.');
    const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'ui-inheritance-'));
    try {
      cp.execFileSync('tar', ['-xzf', archive, '-C', temp]);
      const installed = path.join(packageRoot, 'node_modules', name);
      let checked = 0;
      function compare(dir, relative = '') {
        for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
          const rel = path.join(relative, item.name), file = path.join(dir, item.name);
          if (item.isDirectory()) compare(file, rel);
          else {
            checked++;
            const target = path.join(installed, rel);
            if (!fs.existsSync(target) || !fs.readFileSync(file).equals(fs.readFileSync(target))) failures.push(`Installed UI differs from archive: ${rel}. Reinstall before browser verification.`);
          }
        }
      }
      compare(path.join(temp, 'package'));
      requireContract(checked > 0, 'UI archive comparison checked no files.');
    } finally { fs.rmSync(temp, { recursive: true, force: true }); }
  }

  return failures;
}
module.exports = { createSourceAudit, verifyInstalledArchive };
