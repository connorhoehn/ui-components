import { type FileKind } from '../shared/FileKindMark';
import { type StatusPillTone } from '../shared/StatusPill';
export interface LinkedItem {
    id: string;
    title: string;
    kind?: FileKind;
    /** e.g. 'Depends on' | 'Decided by'. */
    relation?: string;
    status?: {
        label: string;
        tone: StatusPillTone;
    } | null;
    onOpen?: () => void;
    href?: string;
    onRemove?: () => void;
}
export interface LinkableDocument {
    id: string;
    title: string;
    kind?: FileKind;
}
export interface LinkRelationOption {
    value: string;
    label: string;
}
export interface LinkedItemsSectionProps {
    title?: string;
    items: LinkedItem[];
    onSearchDocuments?: (q: string) => Promise<LinkableDocument[]> | LinkableDocument[];
    onAdd?: (doc: LinkableDocument, relation: string) => void;
    relations?: LinkRelationOption[];
    emptyLabel?: string;
    first?: boolean;
    /**
     * `heading` (default since 2.386.15): a 16px heading, 14px rows, the status
     * as a soft tag, the relation read out (and on hover) rather than printed,
     * and "Add link" quiet until the section is hovered — a work item's Brief.
     * `label`: the small caption, printed relation and dotted pill.
     */
    variant?: 'label' | 'heading';
    className?: string;
    'data-testid'?: string;
}
export declare const DEFAULT_LINK_RELATIONS: LinkRelationOption[];
export declare function LinkedItemsSection({ title, items, onSearchDocuments, onAdd, relations, emptyLabel, first, variant, className, 'data-testid': testId, }: LinkedItemsSectionProps): import("react").JSX.Element;
export default LinkedItemsSection;
//# sourceMappingURL=LinkedItemsSection.d.ts.map