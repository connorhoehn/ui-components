// Derives the Storybook contract from the shipped work-ui contract, dropping only full-app-page rules.
import fs from 'node:fs';
const src = process.argv[2], out = process.argv[3];
const c = JSON.parse(fs.readFileSync(src, 'utf8'));
export const NOT_APPLICABLE = {
  'shell.header.count': 'Story iframe has no app shell header.',
  'shell.footer.count': 'Story iframe has no app shell footer.',
  'shell.header.height': 'Story iframe has no app shell header.',
  'shell.footer.height': 'Story iframe has no app shell footer.',
  'shell.columns': 'Rails: a component story renders no primary/section rail columns.',
  'subnav.columns': 'Rails: no SubNavLayout section rail in a component story.',
  'rail.accordion-font': 'Rails: no rail group headers in a component story.',
  'rail.accordion-height': 'Rails: no rail group headers in a component story.',
  'rail.disclosure-label': 'Rails: no rail captions in a component story.',
  'rail.item-label': 'Rails: no rail items in a component story.',
  'content.gutter': 'Content-column edges: no SectionContent column or breadcrumb trail to anchor to.',
  'content.header-alignment': 'Breadcrumb trail: a story has no section crumbs to align the header against.',
  'content.single-title': 'Page title/H1: a component story is not a page and carries no page title.',
  'identity.font-size': 'Shell chrome: the tenant switch only exists in the app header.',
  'layout.content-share': 'Content-column edges: binds $contentColumns (the trail-parent column), absent in a story.',
  'density.blank-band': 'Content-column edges: binds $contentColumns, absent in a story.',
  'density.table-first': 'Content-column edges: list-page density judged inside $contentColumns, absent in a story.',
  'density.narrow-block': 'Content-column edges: max-width blocks judged against $contentColumns, absent in a story.',
  'align.grid': 'Content-column edges: inset grid anchored on $contentColumns, absent in a story.',
  'section.separator': 'Content-column edges: sibling groups judged inside $contentColumns, absent in a story.',
  'page.vertical-budget': 'Page length: a page budget judged on $contentColumns; a story is not a page.',
  'element.unmarked': 'Content-column edges: hand-rolled DOM judged inside $contentColumns; story scaffolding is not app content.',
  'consistency.fingerprint': 'Page title/H1 + content column: fingerprints a page title and its column, neither exists in a story.',
  'ticker.font-size': 'Shell chrome: the footer ticker only exists in the app footer.',
};
c.name = c.name + ' (storybook component subset)';
c.rules = c.rules.filter(r => !NOT_APPLICABLE[r.id]);
fs.mkdirSync(new URL('.', 'file://' + (out.startsWith('/') ? out : process.cwd() + '/' + out)), { recursive: true });
fs.writeFileSync(out, JSON.stringify(c, null, 2));
fs.writeFileSync(out.replace(/\.json$/, '.not-applicable.json'), JSON.stringify(NOT_APPLICABLE, null, 2));
console.log(c.rules.length, 'rules kept,', Object.keys(NOT_APPLICABLE).length, 'not applicable');
