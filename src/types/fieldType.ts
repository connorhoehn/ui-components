// frontend/src/types/fieldType.ts
//
// User-defined data types — custom primitive types created through the Data Types admin page.
// Stored in localStorage via useCustomFieldTypes.
// At startup these are registered with the renderer registry so they appear
// in the document type wizard alongside the built-in section types.

import type { ViewMode } from './document';

/**
 * Step 2 ("Display") of the Data Types wizard, for one view mode.
 *
 * ADDITIVE, optional. Before this existed, `FieldTypesPage.handleSave` sent
 * only `{name, icon, description, primitiveType, baseType}` — the Visible
 * checkboxes and the renderer pickers had nowhere to be written, so every
 * step-2 choice was discarded the moment the user pressed Save and reopening
 * the type for edit showed all three modes visible with the default renderer.
 */
export interface CustomFieldTypeDisplay {
  /** Does this field appear at all in this view mode? */
  visible: boolean;
  /** Chosen renderer key, e.g. `'rich-text:reader'`. Absent = the base type's first. */
  renderer?: string;
}

export interface CustomFieldType {
  id: string;
  name: string;
  icon: string;
  description: string;
  /**
   * Primitive storage type — e.g. 'long_text_and_summary', 'list_text'.
   * Identifies the Drupal-style data storage class the user selected.
   * Optional for backward-compat with records persisted before this field was added.
   */
  primitiveType?: string;
  /**
   * Which built-in renderer to delegate to for display.
   * Derived from primitiveType at creation time.
   */
  baseType: string;
  /**
   * Per-view-mode visibility + renderer choice from step 2 of the wizard.
   * Optional for backward-compat with records persisted before it existed;
   * absent means "visible everywhere, base type's default renderer".
   */
  display?: Partial<Record<ViewMode, CustomFieldTypeDisplay>>;
  createdAt: string;
  updatedAt: string;
}

const VIEW_MODE_KEYS: ViewMode[] = ['editor', 'ack', 'reader'];

/**
 * `display` is optional, but a malformed one must not be waved through — it
 * feeds the renderer registry, and a `visible` that isn't a boolean would
 * silently read as "hidden".
 */
function isValidDisplay(x: unknown): boolean {
  if (typeof x !== 'object' || x === null || Array.isArray(x)) return false;
  const o = x as Record<string, unknown>;
  return Object.entries(o).every(([mode, cfg]) => {
    if (!VIEW_MODE_KEYS.includes(mode as ViewMode)) return false;
    if (typeof cfg !== 'object' || cfg === null) return false;
    const c = cfg as Record<string, unknown>;
    if (typeof c.visible !== 'boolean') return false;
    return c.renderer === undefined || typeof c.renderer === 'string';
  });
}

export const CUSTOM_FIELD_TYPE_STORAGE_KEY = 'ws_field_types_v1';

export function isValidCustomFieldType(x: unknown): x is CustomFieldType {
  if (typeof x !== 'object' || x === null) return false;
  const o = x as Record<string, unknown>;
  return (
    typeof o.id === 'string' && o.id.length > 0 &&
    typeof o.name === 'string' && o.name.length > 0 &&
    typeof o.icon === 'string' &&
    typeof o.description === 'string' &&
    typeof o.baseType === 'string' && o.baseType.length > 0 &&
    typeof o.createdAt === 'string' &&
    typeof o.updatedAt === 'string' &&
    // primitiveType optional for backward-compat with older persisted records
    (o.display === undefined || isValidDisplay(o.display))
  );
}
