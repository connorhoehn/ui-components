import type { TaskItem } from '../../types/document';
export interface TaskItemRowProps {
    item: TaskItem;
    editable: boolean;
    onUpdate: (patch: Partial<TaskItem>) => void;
    onRemove: () => void;
    /** When true, auto-focus the text input on mount. */
    autoFocusText?: boolean;
    /** Called after auto-focus completes so parent can reset the flag. */
    onDidAutoFocus?: () => void;
}
export default function TaskItemRow({ item, editable, onUpdate, onRemove, autoFocusText, onDidAutoFocus }: TaskItemRowProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=TaskItemRow.d.ts.map