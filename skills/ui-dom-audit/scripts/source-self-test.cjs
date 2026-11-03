const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const crypto = require('node:crypto');
const { execFileSync } = require('node:child_process');
const { createSourceAudit, verifyInstalledArchive } = require('./source-audit.cjs');
// TypeScript 7 has no JS compiler API; use the library's declared DTS compiler.
const ts = require('@typescript/typescript6');
const { analyzeTsx, scanSource } = createSourceAudit({ typescript: ts, packageName: '@example/ui', densityEntryPoints: ['src/start.tsx'], isPage: f => f.startsWith('src/screens/') });

test('source candidates respect imported aliases, module boundaries and consumer policy', () => {
  const source = `import { Button as B, PageHeader, DataTable, DensityProvider } from '@example/ui/shared';
    import { Button as NotOurs } from '@example/ui-other';
    const x = <><PageHeader/><DataTable render={() => <Local className="h-20"/>}/>
    <B size="sm" className={active ? 'h-8 px-4' : 'h-7'} style={{color:'red'}}/><NotOurs size="lg"/><DensityProvider/></>;`;
  const hits = analyzeTsx(source, 'src/screens/List.tsx');
  assert.deepEqual(hits.map(h => h.pattern), ['explicit-control-size','component-class-override','component-style-override','local-density-provider','local-collection-composition']);
  assert.equal(hits[1].detail, 'Button: h-8 px-4 h-7');
  assert.equal(analyzeTsx(source, 'src/start.tsx').filter(h => /local-/.test(h.pattern)).length, 0);
});

test('source scan keeps private selectors as candidates and skips tests/dependencies', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'source-audit-test-'));
  try {
    fs.mkdirSync(path.join(root,'src/__tests__'),{recursive:true});
    fs.writeFileSync(path.join(root,'src/style.css'), '.uic-private { padding: 8px }\n[data-testid="x"] { color:red }');
    fs.writeFileSync(path.join(root,'src/__tests__/ignore.tsx'), "import {Button} from '@example/ui'; const x=<Button size='sm'/>;");
    const hits=scanSource({root,sourceDirs:['src']});
    assert.equal(hits.length,2);
    assert.ok(hits.every(h=>h.pattern==='css-internal-selector'));
  } finally { fs.rmSync(root,{recursive:true,force:true}); }
});

test('archive verification detects lock drift, stale installed bytes and missing files', () => {
  const root=fs.mkdtempSync(path.join(os.tmpdir(),'archive-audit-test-'));
  try {
    const pkg='@example/ui',spec='file:vendor/ui.tgz';
    fs.mkdirSync(path.join(root,'package/dist'),{recursive:true});
    fs.mkdirSync(path.join(root,'vendor'));
    fs.writeFileSync(path.join(root,'package/package.json'),JSON.stringify({name:pkg,version:'1.0.0'}));
    fs.writeFileSync(path.join(root,'package/dist/index.js'),'export const version=1;');
    execFileSync('tar',['-czf',path.join(root,'vendor/ui.tgz'),'-C',root,'package']);
    fs.mkdirSync(path.join(root,'node_modules/@example'),{recursive:true});
    fs.cpSync(path.join(root,'package'),path.join(root,'node_modules',pkg),{recursive:true});
    fs.writeFileSync(path.join(root,'package.json'),JSON.stringify({dependencies:{[pkg]:spec}}));
    const entry={resolved:spec,integrity:'sha512-'+crypto.createHash('sha512').update(fs.readFileSync(path.join(root,'vendor/ui.tgz'))).digest('base64')};
    const lock=()=>fs.writeFileSync(path.join(root,'package-lock.json'),JSON.stringify({packages:{['node_modules/'+pkg]:entry}}));
    const check=()=>verifyInstalledArchive({packageRoot:root,packageName:pkg,archivePrefix:'file:vendor/'});
    lock();assert.deepEqual(check(),[]);
    const installed=path.join(root,'node_modules',pkg,'dist/index.js');
    fs.writeFileSync(installed,'stale');assert.match(check().join(),/Installed UI differs.*dist\/index.js/);
    fs.rmSync(installed);assert.match(check().join(),/Installed UI differs/);
    fs.copyFileSync(path.join(root,'package/dist/index.js'),installed);
    entry.integrity='sha512-wrong';lock();assert.match(check().join(),/integrity/);
  } finally {fs.rmSync(root,{recursive:true,force:true});}
});
