// doc-types/ — what remains of the library's document-type authoring surface.
//
// The pages that used to live here (DocumentTypesPage, DocumentTypeWizard,
// WizardStepNavigation, CookbooksModal, cookbooks/) were removed on
// 2026-09-07: they were reachable from nothing. This directory is not a build
// entry in vite.config.ts and is not re-exported from src/index.ts, so none of
// it ever reached `dist` — a consumer had no import path to it at all. The one
// app that renders these screens (realtime-examples/frontend) lazy-loads its
// OWN copies from `../components/doc-types/*`, not from this package.
//
// FieldDefinitionEditor survives only because a test outside this directory
// still imports it directly:
//   src/components/shared/__tests__/labelWiring.nonPipelines.test.tsx
// It is otherwise unreferenced. If that test goes, so can this.
export { FieldDefinitionEditor } from './FieldDefinitionEditor';
