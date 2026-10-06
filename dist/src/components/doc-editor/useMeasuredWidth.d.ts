import { type Ref } from 'react';
export interface MeasuredWidth<T extends HTMLElement> {
    /** Attach to the element to measure. Also fills `forward`. */
    ref: (el: T | null) => void;
    /** Content-box width in px; `null` before the first measurement. */
    width: number | null;
}
/**
 * Measures an element's content-box width. `forward` is another ref (a
 * roving-toolbar hook's, say) that needs the same element.
 */
export declare function useMeasuredWidth<T extends HTMLElement>(forward?: Ref<T>): MeasuredWidth<T>;
export default useMeasuredWidth;
//# sourceMappingURL=useMeasuredWidth.d.ts.map