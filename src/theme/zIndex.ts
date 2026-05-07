// frontend/src/theme/zIndex.ts
//
// Centralized z-index scale for layering UI elements.

export const zIndex = {
  /** Sticky headers, fixed toolbars */
  sticky: 20,
  /** Dropdowns, popovers, tooltips */
  dropdown: 50,
  /** Modals, dialogs, overlays */
  modal: 100,
  /** Toast notifications (above modals) */
  toast: 200,
} as const;
