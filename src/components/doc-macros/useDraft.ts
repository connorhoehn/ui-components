// ui-components/src/components/doc-macros/useDraft.ts
//
// A text draft that a blur handler can read back SYNCHRONOUSLY.
//
// ## The bug this exists to prevent
//
// The obvious way to make Escape cancel an inline edit is:
//
//     if (e.key === 'Escape') { setDraft(original); e.target.blur(); }
//
// and it commits the edit instead of discarding it. `setDraft` schedules a
// React state update; `blur()` fires its handler SYNCHRONOUSLY, before that
// update is applied and before the component re-renders. So the `onBlur`
// closure still holds the pre-Escape draft, compares it against the original,
// finds them different, and writes exactly what Escape was supposed to throw
// away.
//
// Observed: typing `x` into a field reading `Ada` and pressing Escape wrote
// `Adax`. Nothing errors, nothing looks wrong until you read the value back.
//
// The fix is a ref written on the same tick as the state, so a synchronous
// reader sees the restore. `read()` is what a blur handler must use; `value`
// is what the input renders from.
//
// Extracted from `FieldBlock` when `ActionItemsBlock` turned out to have the
// same bug, so the next editable macro inherits the fix rather than the shape.

import { useCallback, useRef, useState } from 'react';

export type Draft<T> = [value: T, set: (next: T) => void, read: () => T];

export function useDraft<T>(initial: T): Draft<T> {
    const [value, setValue] = useState<T>(initial);
    const ref = useRef<T>(initial);
    const set = useCallback((next: T) => {
        ref.current = next;
        setValue(next);
    }, []);
    const read = useCallback(() => ref.current, []);
    return [value, set, read];
}

export default useDraft;
