// The registration contract of `src/renderers/index.ts`.
//
// WHY THIS FILE EXISTS, SEPARATELY FROM registry.test.ts
//
// `src/renderers/index.ts` is a side-effect module: importing it is what
// populates the registry, and `src/index.ts` re-exports it, so the whole
// library depends on that import surviving the bundler. It has already been
// broken once — setting `sideEffects: false` in package.json let the bundler
// tree-shake the registration calls away. The build reported success, the
// registry came up empty, and every section silently fell back to nothing.
// Nothing failed loudly, because the only registry test in the repo
// (registry.test.ts) registers its OWN fakes and never imports the barrel, so
// it passes just as happily against an empty barrel.
//
// These tests import the barrel and assert what it actually put in the
// registry. Deleting a `registerRenderer` line, dropping a definition import,
// or letting a bundler eliminate the module all fail here.
//
// Keep this file free of `registerRenderer` calls of its own: registry.test.ts
// clobbers the `*:*` wildcard with a fake DefaultRenderer, and the two files
// only stay independent because vitest isolates the module registry per file.

import { describe, it, expect } from 'vitest';
import {
  getRenderer,
  getFieldType,
  getFieldTypes,
  listRegisteredRenderers,
} from '../index';
import type { ViewMode } from '../../types/document';

import DefaultRenderer from '../default/DefaultRenderer';
import RichTextEditorRenderer from '../rich-text/RichTextEditorRenderer';
import RichTextReaderRenderer from '../rich-text/RichTextReaderRenderer';
import TasksEditorRenderer from '../tasks/TasksEditorRenderer';
import TasksReaderRenderer from '../tasks/TasksReaderRenderer';
import ChecklistEditorRenderer from '../checklist/ChecklistEditorRenderer';
import ChecklistReaderRenderer from '../checklist/ChecklistReaderRenderer';
import DecisionsEditorRenderer from '../decisions/DecisionsEditorRenderer';
import DecisionsReaderRenderer from '../decisions/DecisionsReaderRenderer';
import FileUploadEditorRenderer from '../file-upload/FileUploadEditorRenderer';
import FileUploadReaderRenderer from '../file-upload/FileUploadReaderRenderer';
import DiagramEditorRenderer from '../diagram/DiagramEditorRenderer';
import DiagramReaderRenderer from '../diagram/DiagramReaderRenderer';
import LinkBlockEditorRenderer from '../link-block/LinkBlockEditorRenderer';
import LinkBlockReaderRenderer from '../link-block/LinkBlockReaderRenderer';
import TextEditorRenderer from '../text/TextEditorRenderer';
import TextReaderRenderer from '../text/TextReaderRenderer';
import DateEditorRenderer from '../date/DateEditorRenderer';
import DateReaderRenderer from '../date/DateReaderRenderer';
import NumberEditorRenderer from '../number/NumberEditorRenderer';
import NumberReaderRenderer from '../number/NumberReaderRenderer';
import BooleanEditorRenderer from '../boolean/BooleanEditorRenderer';
import BooleanReaderRenderer from '../boolean/BooleanReaderRenderer';

/** Every (sectionType, viewMode) the barrel is contracted to serve. */
const EXPECTED: Array<[string, ViewMode, unknown]> = [
  ['rich-text', 'editor', RichTextEditorRenderer],
  ['rich-text', 'ack', RichTextReaderRenderer],
  ['rich-text', 'reader', RichTextReaderRenderer],
  ['tasks', 'editor', TasksEditorRenderer],
  ['tasks', 'ack', TasksReaderRenderer],
  ['tasks', 'reader', TasksReaderRenderer],
  ['checklist', 'editor', ChecklistEditorRenderer],
  ['checklist', 'ack', ChecklistReaderRenderer],
  ['checklist', 'reader', ChecklistReaderRenderer],
  ['decisions', 'editor', DecisionsEditorRenderer],
  ['decisions', 'ack', DecisionsReaderRenderer],
  ['decisions', 'reader', DecisionsReaderRenderer],
  ['file-upload', 'editor', FileUploadEditorRenderer],
  ['file-upload', 'ack', FileUploadReaderRenderer],
  ['file-upload', 'reader', FileUploadReaderRenderer],
  ['diagram', 'editor', DiagramEditorRenderer],
  ['diagram', 'ack', DiagramReaderRenderer],
  ['diagram', 'reader', DiagramReaderRenderer],
  ['link-block', 'editor', LinkBlockEditorRenderer],
  ['link-block', 'ack', LinkBlockReaderRenderer],
  ['link-block', 'reader', LinkBlockReaderRenderer],
  ['text', 'editor', TextEditorRenderer],
  ['text', 'ack', TextReaderRenderer],
  ['text', 'reader', TextReaderRenderer],
  ['date', 'editor', DateEditorRenderer],
  ['date', 'ack', DateReaderRenderer],
  ['date', 'reader', DateReaderRenderer],
  ['number', 'editor', NumberEditorRenderer],
  ['number', 'ack', NumberReaderRenderer],
  ['number', 'reader', NumberReaderRenderer],
  ['boolean', 'editor', BooleanEditorRenderer],
  ['boolean', 'ack', BooleanReaderRenderer],
  ['boolean', 'reader', BooleanReaderRenderer],
];

const SHIPPED_TYPES = [
  'tasks', 'rich-text', 'decisions', 'checklist', 'file-upload', 'diagram', 'link-block',
  // The scalar field types the cookbooks actually declare. Before these
  // registered, 151 of the 219 cookbook fields fell through to DefaultRenderer.
  'text', 'date', 'number', 'boolean',
] as const;

const VIEW_MODES: ViewMode[] = ['editor', 'ack', 'reader'];

describe('renderers barrel — side-effect registration', () => {
  it.each(EXPECTED)('resolves %s:%s to its own component', (type, mode, component) => {
    expect(getRenderer(type, mode)).toBe(component);
  });

  it('registers the wildcard fallback as DefaultRenderer', () => {
    expect(getRenderer('*', 'reader')).toBe(DefaultRenderer);
  });

  it('never leaves a shipped type × mode unresolved', () => {
    for (const type of SHIPPED_TYPES) {
      for (const mode of VIEW_MODES) {
        expect(getRenderer(type, mode), `${type}:${mode}`).not.toBeNull();
      }
    }
  });

  it('registers exactly the wildcard plus the shipped pairs — no stragglers', () => {
    // Guards against a half-landed renderer: a `registerRenderer` call whose
    // (type, mode) nobody expects means EXPECTED is out of date, and a missing
    // one means a section type quietly lost its renderer.
    const registered = listRegisteredRenderers()
      .map((e) => `${e.sectionType}:${e.viewMode}`)
      .sort();
    const expected = ['*:*', ...EXPECTED.map(([t, m]) => `${t}:${m}`)].sort();
    expect(registered).toEqual(expected);
  });
});

describe('renderers barrel — unknown types fall back, never throw', () => {
  it.each(VIEW_MODES)('an unregistered section type resolves to DefaultRenderer in %s mode', (mode) => {
    // The point of the fallback chain: a document saved by a newer build, with
    // a section type this build has never heard of, still renders something.
    expect(getRenderer('a-type-from-the-future', mode)).toBe(DefaultRenderer);
  });

  it('a null or undefined section type resolves to DefaultRenderer', () => {
    expect(getRenderer(null, 'reader')).toBe(DefaultRenderer);
    expect(getRenderer(undefined, 'editor')).toBe(DefaultRenderer);
  });

  it('an empty-string section type resolves to DefaultRenderer', () => {
    expect(getRenderer('', 'reader')).toBe(DefaultRenderer);
  });
});

describe('renderers barrel — field type definitions', () => {
  it.each(SHIPPED_TYPES)('registers the %s definition under its own key', (type) => {
    const def = getFieldType(type);
    expect(def, `${type} definition missing`).toBeDefined();
    // A definition filed under the wrong key would still be "registered" but
    // would never be found by the section type that needs it.
    expect(def!.type).toBe(type);
    expect(def!.label).toBeTruthy();
    expect(def!.icon).toBeTruthy();
  });

  it('lists exactly the shipped definitions', () => {
    expect(getFieldTypes().map((d) => d.type).sort()).toEqual([...SHIPPED_TYPES].sort());
  });

  it('every rendererKey a definition advertises actually resolves', () => {
    // rendererKeys is what config UIs offer the user. Advertising
    // `tasks:reader` while nothing is registered for it hands the user a
    // choice that renders nothing.
    for (const def of getFieldTypes()) {
      for (const [mode, keys] of Object.entries(def.rendererKeys)) {
        for (const key of keys ?? []) {
          const [keyType, keyMode] = key.split(':');
          expect(keyType, `${def.type} advertises ${key}`).toBe(def.type);
          expect(keyMode, `${def.type} advertises ${key}`).toBe(mode);
          expect(getRenderer(keyType, keyMode as ViewMode), key).not.toBe(DefaultRenderer);
          expect(def.rendererLabels[key], `${key} has no label`).toBeTruthy();
        }
      }
    }
  });
});

describe('renderers barrel — re-import is idempotent', () => {
  it('importing the barrel a second time does not duplicate or reshuffle anything', async () => {
    const before = listRegisteredRenderers().length;
    const beforeTypes = getFieldTypes().length;
    await import('../index');
    expect(listRegisteredRenderers()).toHaveLength(before);
    expect(getFieldTypes()).toHaveLength(beforeTypes);
    // Registration is keyed, not appended: the second pass overwrites with the
    // same values rather than shadowing the first.
    expect(getRenderer('tasks', 'editor')).toBe(TasksEditorRenderer);
  });

  it('the wildcard registration does not shadow a specific one regardless of order', () => {
    // index.ts registers '*':'*' FIRST and the specific pairs after. If that
    // order ever mattered — i.e. if registration appended rather than keyed —
    // every section would resolve to DefaultRenderer.
    expect(getRenderer('tasks', 'editor')).not.toBe(DefaultRenderer);
    expect(getRenderer('diagram', 'reader')).not.toBe(DefaultRenderer);
  });
});
