import type { ActionItem } from './actionItemsText';
/**
 * One candidate assignee.
 *
 * Same shape as `HitlPerson`, and for the same load-bearing reason: `id` is
 * the AUTH SUBJECT, because that is what `/api/items/mine` queries on. Writing
 * a display name here is what once left that endpoint unable to find a single
 * assigned item. The name is a label and is never written into the body.
 */
export interface AssignablePerson {
    id: string;
    name: string;
}
export interface ActionItemsBlockProps {
    items: readonly ActionItem[];
    /** False renders the checklist as a read-only list — no ticking, no edits. */
    editable?: boolean;
    onToggle?: (index: number) => void;
    onTextChange?: (index: number, text: string) => void;
    onRemoveItem?: (index: number) => void;
    onAddItem?: () => void;
    /** Takes the whole block off the page. Omitted when not editable. */
    onRemove?: () => void;
    /**
     * Who an item can be assigned to.
     *
     * The format has carried `assignee:` since it was written and this block
     * has always DISPLAYED it — an `@ana` chip — with nothing anywhere able to
     * SET it. So an action item created on a canvas could never be assigned,
     * and the inbox's Tasks lane could never be filled from the document shape
     * this product is moving to. Meanwhile Data Types ships a built-in whose
     * own description is "Task List — ASSIGNABLE action items with status
     * tracking", and the HITL callout next door has had a working picker all
     * along.
     *
     * Omitted renders no picker, which is right for a host with no directory:
     * a control listing nobody is worse than none.
     */
    people?: readonly AssignablePerson[];
    /** Only ever called with an id from `people`, or `''` to unassign. */
    onAssign?: (index: number, assigneeId: string) => void;
    /**
     * Sets `due:` on one item, or clears it with `''`.
     *
     * Same gap the assignee had: the format has always carried `due:` and this
     * block has always drawn the chip, with nothing able to write one. A
     * deadline that can only be typed by hand-editing the fence is a deadline
     * nobody sets, and `ActionItemMirrorRow.dueDate` — already projected into
     * the inbox row — was therefore always null.
     *
     * Omitted renders the chip and no control, which is what a read-only view
     * wants.
     */
    onDue?: (index: number, due: string) => void;
    'data-testid'?: string;
}
export declare function ActionItemsBlock({ items, editable, onToggle, onTextChange, onRemoveItem, onAddItem, onRemove, people, onAssign, onDue, 'data-testid': testId, }: ActionItemsBlockProps): import("react").JSX.Element;
export default ActionItemsBlock;
//# sourceMappingURL=ActionItemsBlock.d.ts.map