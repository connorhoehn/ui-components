/** Shared geometry for buttons, fields, menus and toolbar actions.
 * Change a token once to resize every consumer; explicit component sizes remain supported. */
export const CONTROL_HEIGHT = {
  sm: 'h-[var(--ui-control-sm,1.75rem)]',
  md: 'h-[var(--ui-control-md,2.25rem)]',
  lg: 'h-[var(--ui-control-lg,2.5rem)]',
} as const;
export const CONTROL_SQUARE = {
  sm: 'w-[var(--ui-control-sm,1.75rem)]',
  md: 'w-[var(--ui-control-md,2.25rem)]',
  lg: 'w-[var(--ui-control-lg,2.5rem)]',
} as const;
