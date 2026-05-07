// frontend/src/theme/shadows.ts
//
// Centralized box-shadow values for consistent elevation.

export const shadows = {
  /** Subtle shadow for cards, panels */
  sm: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)',
  /** Medium shadow for dropdowns, popovers */
  md: '0 4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)',
  /** Strong shadow for modals, dialogs */
  lg: '0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05)',
  /** Extra strong shadow for elevated modals */
  xl: '0 20px 25px rgba(0,0,0,0.15), 0 10px 10px rgba(0,0,0,0.04)',
} as const;
