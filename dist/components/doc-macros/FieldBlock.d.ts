import { type FieldType, type TypedField } from './fieldText';
/**
 * An in-progress edit of one control, held in BOTH state and a ref.
 *
 * `null` means "follow the document": a draft exists only while somebody is
 * typing into this row and is dropped on commit or cancel, so a value changed
 * by a collaborator lands immediately in every row nobody is holding and never
 * yanks the characters out from under one they are.
 *
 * The ref is not redundant. Escape must cancel, and cancelling is `set(null)`
 * followed by `blur()` — but `blur` fires SYNCHRONOUSLY, before React has
 * re-rendered, so the blur handler's closure still sees the abandoned draft and
 * commits exactly what Escape was pressed to discard. Measured: typing "x" into
 * "Ada" and pressing Escape wrote "Adax". The ref is what the handlers read;
 * the state is only what the input renders.
 */
export interface FieldBlockProps {
    field: TypedField;
    /** False in read/print, and for a reader without write access. */
    editable?: boolean;
    /** `undefined` clears the field — see `setFieldValueEdit`. */
    onValueChange?: (value: string | undefined) => void;
    onLabelChange?: (label: string) => void;
    onTypeChange?: (type: FieldType) => void;
    onRemove?: () => void;
    testId?: string;
}
export declare function FieldBlock({ field, editable, onValueChange, onLabelChange, onTypeChange, onRemove, testId, }: FieldBlockProps): import("react").JSX.Element;
export default FieldBlock;
//# sourceMappingURL=FieldBlock.d.ts.map