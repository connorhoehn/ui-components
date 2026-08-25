import { readFileSync } from 'node:fs';
import { execSync } from 'node:child_process';

const files = execSync("find src -name '*.tsx' ! -path '*__tests__*' ! -name '*.stories.tsx' ! -name '*.test.tsx'", {encoding:'utf8'}).trim().split('\n');

const out = [];
for (const f of files) {
  const src = readFileSync(f, 'utf8');
  const lines = src.split('\n');
  const optional = new Set();
  const required = new Set();
  for (const l of lines) {
    let m = /^\s*(on[A-Z]\w*)\?\s*:/.exec(l);
    if (m) optional.add(m[1]);
    m = /^\s*(on[A-Z]\w*)\s*:\s*\(/.exec(l);
    if (m) required.add(m[1]);
  }
  if (!optional.size) continue;
  for (let i=0;i<lines.length;i++){
    const l = lines[i];
    const pats = [
      /on(?:Click|Change|Submit|Select|Toggle)\s*=\s*\{\s*(on[A-Z]\w*)\s*\}/,
      /on(?:Click|Change|Submit|Select|Toggle)\s*=\s*\{\s*\([^)]*\)\s*=>\s*(on[A-Z]\w*)\?\.\(/,
      /on(?:Click|Change|Submit|Select|Toggle)\s*=\s*\{\s*\([^)]*\)\s*=>\s*(on[A-Z]\w*)\(/,
    ];
    for (const p of pats) {
      const m = p.exec(l);
      if (m && optional.has(m[1]) && !required.has(m[1])) {
        const guardRe = new RegExp(`(\\{\\s*${m[1]}\\s*&&|${m[1]}\\s*\\?\\s|!!${m[1]}|typeof ${m[1]}|Boolean\\(${m[1]}\\)|${m[1]}\\s*!=\\s*null|${m[1]}\\s*!==\\s*undefined|disabled=\\{[^}]*${m[1]})`);
        const guarded = guardRe.test(src);
        out.push({f, line:i+1, prop:m[1], guarded, text:l.trim().slice(0,110)});
      }
    }
  }
}
const un = out.filter(o=>!o.guarded);
console.log('TOTAL candidate sites:', out.length, ' unguarded-anywhere:', un.length);
for (const o of un) console.log(`${o.f}:${o.line}  ${o.prop}   ${o.text}`);
console.log('\n--- has-a-guard-somewhere (needs eyeballing) ---');
for (const o of out.filter(o=>o.guarded)) console.log(`${o.f}:${o.line}  ${o.prop}   ${o.text}`);
