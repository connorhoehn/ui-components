import { type RefObject } from 'react';
export type ResolvedTheme = 'light' | 'dark';
/**
 * The theme currently in force for `ref`'s subtree, kept live.
 *
 * Re-reads on any `data-theme` mutation anywhere in the document (the
 * attribute can be set on <html> or on any ancestor) and on OS theme changes.
 */
export declare function useResolvedTheme(ref: RefObject<Element | null>): ResolvedTheme;
//# sourceMappingURL=useResolvedTheme.d.ts.map