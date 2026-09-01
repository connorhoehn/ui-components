import { type ReactNode } from 'react';
export interface DockedPanelContextValue {
    /** The dock's own header already names the region — bodies should not
     *  repeat it. */
    hasHeader: boolean;
    /** The dock gives its body a definite height; bodies should fill it and
     *  let their own scrollable region absorb the slack. */
    fillsHeight: boolean;
}
/**
 * Read the surrounding dock, if any. `null` means "standalone" — the body
 * owns its own header and sizing.
 */
export declare function useDockedPanel(): DockedPanelContextValue | null;
export interface DockedPanelProviderProps extends Partial<DockedPanelContextValue> {
    children: ReactNode;
}
/** Wraps a dock's body slot. Docks render this; consumers rarely do. */
export declare function DockedPanelProvider({ hasHeader, fillsHeight, children, }: DockedPanelProviderProps): import("react").JSX.Element;
export default DockedPanelProvider;
//# sourceMappingURL=DockedPanelContext.d.ts.map