import type { ReactNode } from 'react';
import { type RecordResultItem } from './recordMarks';
export interface RecordResultGroup {
    id: string;
    /** Section heading: "People". */
    label: string;
    /** How many records of this type exist (drawn beside the label). */
    count: number;
    /** The records to draw — may be fewer than `count`. */
    records: RecordResultItem[];
    /** "See all N →" target when `count > records.length`. */
    seeAllHref?: string;
    /** Called on a plain click of "See all"; a modified click on `seeAllHref` stays native. */
    onSeeAll?: () => void;
    /** Draw only the heading, with a ›. */
    collapsed?: boolean;
}
export interface RecordResultListProps {
    groups: RecordResultGroup[];
    /** Selected record keys — `recordResultKey(record)`, i.e. `${type}:${id}`. */
    selectedKeys: readonly string[];
    onToggleSelect: (record: RecordResultItem) => void;
    /** Row click, title click, chevron or open action. */
    onOpen: (record: RecordResultItem) => void;
    /** When set, the row ends in a labelled link ("Open work item ↗") instead of a chevron. */
    openLabel?: (record: RecordResultItem) => string;
    /** Terms marked in every row's title and description (plus each record's own `highlights`). */
    highlightTerms?: readonly string[];
    /** Expand/collapse a group from its heading. Omit and a collapsed heading's › opens "See all". */
    onToggleGroup?: (group: RecordResultGroup) => void;
    loading?: boolean;
    /** A failed read: draws the error and no rows. */
    error?: string | null;
    onRetry?: () => void;
    emptyState?: {
        title: string;
        description?: ReactNode;
    };
    /** Under the groups: "2 results in Design System API". */
    footer?: ReactNode;
    /** A quiet line at the end: "Select results to ask about them or view their connections." */
    hint?: string;
    'aria-label'?: string;
    className?: string;
    'data-testid'?: string;
}
export declare function RecordResultList({ groups, selectedKeys, onToggleSelect, onOpen, openLabel, highlightTerms, onToggleGroup, loading, error, onRetry, emptyState, footer, hint, 'aria-label': ariaLabel, className, 'data-testid': testId, }: RecordResultListProps): import("react").JSX.Element;
export default RecordResultList;
//# sourceMappingURL=RecordResultList.d.ts.map