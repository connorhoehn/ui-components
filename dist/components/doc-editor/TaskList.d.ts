import type { MutableRefObject } from 'react';
import type { TaskItem } from '../../types/document';
export interface TaskListProps {
    items: TaskItem[];
    editable: boolean;
    onUpdateItem: (itemId: string, patch: Partial<TaskItem>) => void;
    onRemoveItem: (itemId: string) => void;
    /** When true, auto-focus the text input of the last item (reset after use). */
    focusLastItem?: MutableRefObject<boolean>;
}
export default function TaskList({ items, editable, onUpdateItem, onRemoveItem, focusLastItem }: TaskListProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=TaskList.d.ts.map