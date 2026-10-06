export interface ChecklistItem {
    id: string;
    text: string;
    done: boolean;
    pending?: boolean;
}
export interface ChecklistSectionProps {
    title?: string;
    items: ChecklistItem[];
    onToggle?: (id: string, done: boolean) => void;
    onAdd?: (text: string) => void;
    onEdit?: (id: string, text: string) => void;
    onRemove?: (id: string) => void;
    onMove?: (id: string, toIndex: number) => void;
    readOnlyReason?: string;
    emptyLabel?: string;
    addPlaceholder?: string;
    first?: boolean;
    /**
     * `heading` (default since 2.386.15): a 16px sentence-case heading, 14px
     * rows, no tally, and "Add a criterion" as a quiet control that opens the
     * field only when asked — a work item's Brief. `label`: the small uppercase
     * caption with the tally and an always-open add field, for a side panel.
     */
    variant?: 'label' | 'heading';
    className?: string;
    'data-testid'?: string;
}
export declare function ChecklistSection({ title, items, onToggle, onAdd, onEdit, onRemove, onMove, readOnlyReason, emptyLabel, addPlaceholder, first, variant, className, 'data-testid': testId, }: ChecklistSectionProps): import("react").JSX.Element;
export default ChecklistSection;
//# sourceMappingURL=ChecklistSection.d.ts.map