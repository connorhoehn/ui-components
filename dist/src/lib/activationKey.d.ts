import type { KeyboardEvent } from 'react';
/** True for the keys that activate a `role="button"`: Enter and Space. */
export declare function isActivationKey(key: string): boolean;
/**
 * Build an `onKeyDown` handler that runs `action` on Enter or Space and
 * suppresses the browser default (page scroll on Space, and for good measure
 * any implicit form submit on Enter).
 *
 * ```tsx
 * <div role="button" tabIndex={0} onClick={open} onKeyDown={onActivationKey(open)} />
 * ```
 */
export declare function onActivationKey<E extends KeyboardEvent<Element>>(action: (e: E) => void): (e: E) => void;
export default onActivationKey;
//# sourceMappingURL=activationKey.d.ts.map