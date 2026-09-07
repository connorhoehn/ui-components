// doc-types/ — the document-type authoring surface: list page, 3-step wizard,
// and the prebuilt-template ("cookbook") gallery.
//
// These four files were deleted on 2026-09-07 as dead code and restored the
// same day, because "dead" was the wrong diagnosis. They had no consumer for a
// reachability reason, not a quality one: this directory is not a build entry
// in vite.config.ts and is not re-exported from src/index.ts, so nothing here
// has ever reached `dist` and no consumer has ever had an import path to it.
// The one app that renders these screens (realtime-examples/frontend)
// lazy-loads its OWN copies from `../components/doc-types/*` — not because the
// library's were unfit, but because there was nothing to import.
//
// The library's copies are the better ones and always were: Tailwind tokens
// instead of inline hex, forms/ composites instead of raw <input>, and
// StepIndicator / WizardStepNavigation / FieldDefinitionEditor split out of
// the 1000-line wizard the app still carries. Two things the app had and the
// library did not have been merged back in: the inline export-schema error
// (the library used to call `alert()`), and the accurate remote-first wording
// on `idToken`.
//
// TO ACTUALLY SHIP THIS, someone who owns those files must add:
//   vite.config.ts  -> 'doc-types': resolve(..., 'src/components/doc-types/index.ts')
//   package.json    -> an "./doc-types" export block, mirroring "./doc-editor"
// Until then this barrel is internal-only and the app's fork cannot be retired.
//
// FieldDefinitionEditor is additionally imported directly by a test in the
// human-owned shared/ directory
// (src/components/shared/__tests__/labelWiring.nonPipelines.test.tsx), so it
// has a second, independent reason to exist.

export { DocumentTypesPage } from './DocumentTypesPage';
export type { DocumentTypesPageProps } from './DocumentTypesPage';

export { DocumentTypeWizard } from './DocumentTypeWizard';
export type { DocumentTypeWizardProps } from './DocumentTypeWizard';

export { StepIndicator, WizardStepNavigation } from './WizardStepNavigation';
export type { WizardNavProps } from './WizardStepNavigation';

export { FieldDefinitionEditor } from './FieldDefinitionEditor';
export type { FieldDefinitionEditorProps } from './FieldDefinitionEditor';

export { default as CookbooksModal } from './CookbooksModal';

export {
  documentTypeCookbooks,
  COOKBOOK_CATEGORIES,
} from './cookbooks';
export type {
  CookbookCategory,
  DocumentTypeCookbook,
} from './cookbooks';
