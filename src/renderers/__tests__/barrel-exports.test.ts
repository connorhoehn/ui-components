// What LEAVES `src/renderers/index.ts`, as opposed to what it registers.
//
// WHY THIS IS A SEPARATE CONTRACT FROM barrel-registration.test.ts
//
// That file asserts the registry is populated — that `getRenderer('tasks',
// 'editor')` resolves. This one asserts the components are NAMEABLE from
// outside, which is a different guarantee and was, until now, largely absent:
// only the four scalar pairs were exported, so the fifteen older renderers and
// `DefaultRenderer` could be reached only through this module's own registry.
//
// That is precisely what made an incremental migration impossible for a host
// that keeps its own copy of `registry.ts`. It could not register the
// library's `tasks` renderer into its registry, because it could not name it;
// its only choices were to adopt this barrel's registry wholesale or to keep a
// private copy of every renderer. Forking was the rational choice while these
// exports were missing, so a regression here re-justifies a fork — hence a
// test rather than a convention.

import { describe, it, expect } from 'vitest';
import * as barrel from '../index';

/** Every renderer component a host may need to register itself. */
const RENDERER_EXPORTS = [
  'DefaultRenderer',
  'RichTextEditorRenderer', 'RichTextReaderRenderer',
  'TasksEditorRenderer', 'TasksReaderRenderer',
  'ChecklistEditorRenderer', 'ChecklistReaderRenderer',
  'DecisionsEditorRenderer', 'DecisionsReaderRenderer',
  'FileUploadEditorRenderer', 'FileUploadReaderRenderer',
  'DiagramEditorRenderer', 'DiagramReaderRenderer',
  'LinkBlockEditorRenderer', 'LinkBlockReaderRenderer',
  'TextEditorRenderer', 'TextReaderRenderer',
  'DateEditorRenderer', 'DateReaderRenderer',
  'NumberEditorRenderer', 'NumberReaderRenderer',
  'BooleanEditorRenderer', 'BooleanReaderRenderer',
] as const;

/**
 * The field-type definitions. A component alone is not enough: a host that
 * registers renderers into its own registry still gets `undefined` from
 * `getFieldType('tasks')`, so a section chip cannot label itself and a
 * data-types screen cannot list what exists.
 */
const FIELD_TYPE_EXPORTS: Array<[string, string]> = [
  ['tasksFieldType', 'tasks'],
  ['richTextFieldType', 'rich-text'],
  ['decisionsFieldType', 'decisions'],
  ['checklistFieldType', 'checklist'],
  ['fileUploadFieldType', 'file-upload'],
  ['diagramFieldType', 'diagram'],
  ['linkBlockFieldType', 'link-block'],
  ['textFieldType', 'text'],
  ['dateFieldType', 'date'],
  ['numberFieldType', 'number'],
  ['booleanFieldType', 'boolean'],
];

const REGISTRY_EXPORTS = [
  'registerRenderer', 'getRenderer', 'listRegisteredRenderers',
  'registerFieldType', 'getFieldTypes', 'getFieldType',
] as const;

const APPROVAL_EXPORTS = [
  'setApprovalApiBase', 'getApprovalApiBase',
  'postApproval', 'mapStatusToDecision', 'readDocumentIdFromUrl',
] as const;

describe('renderers barrel export surface', () => {
  it.each(RENDERER_EXPORTS)('exports %s as a component', (name) => {
    expect(typeof (barrel as Record<string, unknown>)[name]).toBe('function');
  });

  it.each(FIELD_TYPE_EXPORTS)('exports %s, describing the %s type', (name, type) => {
    const def = (barrel as unknown as Record<string, { type: string; label: string }>)[name];
    expect(def).toBeTruthy();
    expect(def.type).toBe(type);
    // The label is the reason the definition is exported at all.
    expect(def.label).toBeTruthy();
  });

  it.each(REGISTRY_EXPORTS)('exports the registry function %s', (name) => {
    expect(typeof (barrel as Record<string, unknown>)[name]).toBe('function');
  });

  it.each(APPROVAL_EXPORTS)('exports the approvals function %s', (name) => {
    expect(typeof (barrel as Record<string, unknown>)[name]).toBe('function');
  });

  it('exports a component for every registered renderer key', () => {
    // The registry and the export surface must not drift: anything reachable
    // via getRenderer() should be nameable too, or a host can register the
    // wildcard fallback but not the specific renderer it wants to replace.
    const registered = new Set(
      barrel.listRegisteredRenderers().map((r) => r.component),
    );
    const exported = new Set(
      RENDERER_EXPORTS.map((n) => (barrel as Record<string, unknown>)[n]),
    );
    const unreachable = [...registered].filter((c) => !exported.has(c));
    expect(unreachable).toEqual([]);
  });

  it('keeps the internal item-reading helper internal', () => {
    // `sectionItems` is deliberately NOT part of the contract — see the header
    // of sectionItems.ts. Exporting everything is not the goal; exporting what
    // a host must NAME is.
    expect((barrel as Record<string, unknown>).sectionItems).toBeUndefined();
  });
});
