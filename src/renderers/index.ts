// Central registration barrel — import once to register all field type definitions
// and section renderers. SectionBlock and reader components import from here to
// trigger side-effect registration before calling getRenderer() or getFieldTypes().

import { registerRenderer, registerFieldType } from './registry';

import tasksDef from './tasks/definition';
import richTextDef from './rich-text/definition';
import decisionsDef from './decisions/definition';
import checklistDef from './checklist/definition';
import fileUploadDef from './file-upload/definition';
import diagramDef from './diagram/definition';
import linkBlockDef from './link-block/definition';
import textDef from './text/definition';
import dateDef from './date/definition';
import numberDef from './number/definition';
import booleanDef from './boolean/definition';

import DefaultRenderer from './default/DefaultRenderer';
import RichTextEditorRenderer from './rich-text/RichTextEditorRenderer';
import RichTextReaderRenderer from './rich-text/RichTextReaderRenderer';
import TasksEditorRenderer from './tasks/TasksEditorRenderer';
import TasksReaderRenderer from './tasks/TasksReaderRenderer';
import ChecklistEditorRenderer from './checklist/ChecklistEditorRenderer';
import ChecklistReaderRenderer from './checklist/ChecklistReaderRenderer';
import DecisionsEditorRenderer from './decisions/DecisionsEditorRenderer';
import DecisionsReaderRenderer from './decisions/DecisionsReaderRenderer';
import FileUploadEditorRenderer from './file-upload/FileUploadEditorRenderer';
import FileUploadReaderRenderer from './file-upload/FileUploadReaderRenderer';
import DiagramEditorRenderer from './diagram/DiagramEditorRenderer';
import DiagramReaderRenderer from './diagram/DiagramReaderRenderer';
import LinkBlockEditorRenderer from './link-block/LinkBlockEditorRenderer';
import LinkBlockReaderRenderer from './link-block/LinkBlockReaderRenderer';
import TextEditorRenderer from './text/TextEditorRenderer';
import TextReaderRenderer from './text/TextReaderRenderer';
import DateEditorRenderer from './date/DateEditorRenderer';
import DateReaderRenderer from './date/DateReaderRenderer';
import NumberEditorRenderer from './number/NumberEditorRenderer';
import NumberReaderRenderer from './number/NumberReaderRenderer';
import BooleanEditorRenderer from './boolean/BooleanEditorRenderer';
import BooleanReaderRenderer from './boolean/BooleanReaderRenderer';

// Field type definitions (metadata + renderer key manifests)
registerFieldType(tasksDef);
registerFieldType(richTextDef);
registerFieldType(decisionsDef);
registerFieldType(checklistDef);
// Phase 51 / hub#66 — new section types. Renderers fall through to
// DefaultRenderer (registered with the '*' wildcard above) until
// dedicated editor/reader components ship as follow-ups.
registerFieldType(fileUploadDef);
registerFieldType(diagramDef);
registerFieldType(linkBlockDef);
// The scalar field types. The 14 shipped cookbooks declare 151 fields across
// these four — text (100), date (28), number (16), boolean (7) — and every one
// of them resolved to '*' -> DefaultRenderer, i.e. a rich-text note box, until
// these registrations landed. An Invoice due date was a paragraph.
registerFieldType(textDef);
registerFieldType(dateDef);
registerFieldType(numberDef);
registerFieldType(booleanDef);

// Renderer components per (sectionType × viewMode)
registerRenderer('*', '*', DefaultRenderer);

registerRenderer('rich-text', 'editor', RichTextEditorRenderer);
registerRenderer('rich-text', 'ack',    RichTextReaderRenderer);
registerRenderer('rich-text', 'reader', RichTextReaderRenderer);

registerRenderer('tasks', 'editor', TasksEditorRenderer);
registerRenderer('tasks', 'ack',    TasksReaderRenderer);
registerRenderer('tasks', 'reader', TasksReaderRenderer);

registerRenderer('checklist', 'editor', ChecklistEditorRenderer);
registerRenderer('checklist', 'ack',    ChecklistReaderRenderer);
registerRenderer('checklist', 'reader', ChecklistReaderRenderer);

registerRenderer('decisions', 'editor', DecisionsEditorRenderer);
registerRenderer('decisions', 'ack',    DecisionsReaderRenderer);
registerRenderer('decisions', 'reader', DecisionsReaderRenderer);

// Phase 51 / hub#71 — File Upload / Diagram / Link Block.
registerRenderer('file-upload', 'editor', FileUploadEditorRenderer);
registerRenderer('file-upload', 'ack',    FileUploadReaderRenderer);
registerRenderer('file-upload', 'reader', FileUploadReaderRenderer);

registerRenderer('diagram', 'editor', DiagramEditorRenderer);
registerRenderer('diagram', 'ack',    DiagramReaderRenderer);
registerRenderer('diagram', 'reader', DiagramReaderRenderer);

registerRenderer('link-block', 'editor', LinkBlockEditorRenderer);
registerRenderer('link-block', 'ack',    LinkBlockReaderRenderer);
registerRenderer('link-block', 'reader', LinkBlockReaderRenderer);

// Scalar fields. The editor renderers fall back to their own reader when
// `editable` is false, because a finalized document still resolves through the
// ':editor' entry (EditorModeSwitch passes editable={!isFinalized}).
registerRenderer('text', 'editor', TextEditorRenderer);
registerRenderer('text', 'ack',    TextReaderRenderer);
registerRenderer('text', 'reader', TextReaderRenderer);

registerRenderer('date', 'editor', DateEditorRenderer);
registerRenderer('date', 'ack',    DateReaderRenderer);
registerRenderer('date', 'reader', DateReaderRenderer);

registerRenderer('number', 'editor', NumberEditorRenderer);
registerRenderer('number', 'ack',    NumberReaderRenderer);
registerRenderer('number', 'reader', NumberReaderRenderer);

registerRenderer('boolean', 'editor', BooleanEditorRenderer);
registerRenderer('boolean', 'ack',    BooleanReaderRenderer);
registerRenderer('boolean', 'reader', BooleanReaderRenderer);

// `checkbox` is the SAME thing, and it is the name the rest of the codebase
// already uses: `useTypedDocuments` lists it as a section type,
// `documentTypeApiAdapter` maps it in both directions, and
// `scaffoldPrerequisites` emits it for a boolean field. Registering only
// `boolean` would have left every server-derived and scaffolded boolean
// falling through to DefaultRenderer — a prose box — which is the exact defect
// these renderers exist to remove. Aliasing here rather than renaming three
// emitters keeps documents that already carry `checkbox` working.
registerRenderer('checkbox', 'editor', BooleanEditorRenderer);
registerRenderer('checkbox', 'ack',    BooleanReaderRenderer);
registerRenderer('checkbox', 'reader', BooleanReaderRenderer);

// The scalar renderers themselves, not only the registry that holds them.
//
// The consuming app keeps its OWN copy of `registry.ts` — byte-identical to
// this one — and its own registration list, so registering these here reaches
// nothing it renders. Without exporting the components, its only options were
// to copy them (a fifth fork of this directory) or to leave 151 of the
// fourteen starter types' 219 fields rendering as prose boxes. Exported so the
// app can register the LIBRARY's components into its own registry, which is
// one step toward retiring that fork rather than widening it.
// …and their field-type DEFINITIONS, which carry the label, icon and
// description. The renderer components alone were not enough: an app that
// registers them into its own registry still has `getFieldType('date')`
// returning undefined, so a section chip cannot name itself and a data-types
// screen cannot list what exists. Both were true after 2.191.0.
export { default as textFieldType } from './text/definition';
export { default as dateFieldType } from './date/definition';
export { default as numberFieldType } from './number/definition';
export { default as booleanFieldType } from './boolean/definition';

export { default as TextEditorRenderer } from './text/TextEditorRenderer';
export { default as TextReaderRenderer } from './text/TextReaderRenderer';
export { default as DateEditorRenderer } from './date/DateEditorRenderer';
export { default as DateReaderRenderer } from './date/DateReaderRenderer';
export { default as NumberEditorRenderer } from './number/NumberEditorRenderer';
export { default as NumberReaderRenderer } from './number/NumberReaderRenderer';
export { default as BooleanEditorRenderer } from './boolean/BooleanEditorRenderer';
export { default as BooleanReaderRenderer } from './boolean/BooleanReaderRenderer';

export {
  registerRenderer,
  getRenderer,
  listRegisteredRenderers,
  registerFieldType,
  getFieldTypes,
  getFieldType,
} from './registry';
