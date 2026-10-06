import { type ReactNode, type RefObject } from 'react';
import { type ChipTone } from '../shared/Chip';
export interface WorkMetaOption {
    value: string;
    label: string;
    tone?: ChipTone;
}
/** A read-only toned tag on the meta row — "Blocked", in mono like the item key. Since 2.390.0. */
export interface WorkMetaFlag {
    label: string;
    tone?: ChipTone;
}
/** A person as the meta bar and its picker see one. */
export interface WorkPerson {
    id: string;
    name: string;
    avatarUrl?: string;
}
export interface WorkItemMetaBarProps {
    status?: {
        value: string | null;
        options: WorkMetaOption[];
        onChange?: (v: string) => void;
        readOnlyReason?: string;
        pending?: boolean;
    };
    points?: {
        value: number | null;
        onChange?: (v: number | null) => void;
        readOnlyReason?: string;
        pending?: boolean;
        max?: number;
    };
    owner?: {
        value: WorkPerson | null;
        onSearchPeople?: (q: string) => Promise<WorkPerson[]> | WorkPerson[];
        onChange?: (p: WorkPerson | null) => void;
        readOnlyReason?: string;
        pending?: boolean;
    };
    priority?: {
        value: string | null;
        options: WorkMetaOption[];
        onChange?: (v: string) => void;
        readOnlyReason?: string;
        pending?: boolean;
    };
    /**
     * `inline` (default): borderless fields at 13px with a rule between each.
     * `boxed` (since 2.386.15): the Work mockup's row — status and priority are
     * 36px bordered select boxes ("● Open ⌄", "Priority: High ⌄"), points and
     * owner plain 14–15px text with one rule between them.
     */
    appearance?: 'inline' | 'boxed';
    /**
     * Toned facts drawn as tags right after the status — `{ label: 'Blocked',
     * tone: 'danger' }`. Read-only; the host decides what they mean. Empty or
     * absent draws none. Since 2.390.0.
     */
    flags?: WorkMetaFlag[];
    /**
     * `default`: the fields in their usual order (status, points, owner,
     * priority). `divided` (since 2.390.0): the read-first row under a work
     * item's large title — status · flags · owner · points · priority, a rule
     * between each, at 15px ("● Open | Blocked | (EG) Eli Garcia | 2 points |
     * High priority"). Ignored when `appearance="boxed"`.
     */
    layout?: 'default' | 'divided';
    /**
     * `label` (default): "Priority:" then the value. `tag` (since 2.390.0): one
     * toned tag that says it all — "High priority". An editable priority keeps
     * its select, without the "Priority:" word.
     */
    priorityStyle?: 'label' | 'tag';
    'data-testid'?: string;
    className?: string;
}
export interface WorkSearchPickerProps<T> {
    trigger: RefObject<HTMLElement | null>;
    open: boolean;
    onClose: () => void;
    /** Accessible name for the dialog and the search box. */
    label: string;
    placeholder?: string;
    /** Called on open (with '') and on every query change. */
    search?: (q: string) => Promise<T[]> | T[];
    itemKey: (item: T) => string;
    renderItem: (item: T) => ReactNode;
    onPick: (item: T) => void;
    /** Above the search box (e.g. a relation select). */
    header?: ReactNode;
    /** Below the results (e.g. "Unassign"). */
    footer?: ReactNode;
    'data-testid'?: string;
}
export declare function WorkSearchPicker<T>({ trigger, open, onClose, label, placeholder, search, itemKey, renderItem, onPick, header, footer, 'data-testid': testId, }: WorkSearchPickerProps<T>): import("react").JSX.Element;
export declare function WorkItemMetaBar({ status, points, owner, priority, appearance, flags, layout, priorityStyle, className, 'data-testid': testId, }: WorkItemMetaBarProps): import("react").JSX.Element | null;
export default WorkItemMetaBar;
//# sourceMappingURL=WorkItemMetaBar.d.ts.map