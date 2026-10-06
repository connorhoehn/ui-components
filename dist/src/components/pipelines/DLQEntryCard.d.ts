import type { DLQEntry } from '../../api/pipelineDLQ';
export interface DLQEntryCardProps {
    entry: DLQEntry;
    isHovered: boolean;
    isSelected: boolean;
    onToggleSelect: (id: string) => void;
    onRedrive: (ids: string[]) => void;
    onPurge: (ids: string[]) => void;
    onMouseEnter: (id: string) => void;
    onMouseLeave: () => void;
}
export declare function DLQEntryCard({ entry, isHovered, isSelected, onToggleSelect, onRedrive, onPurge, onMouseEnter, onMouseLeave, }: DLQEntryCardProps): import("react").JSX.Element;
//# sourceMappingURL=DLQEntryCard.d.ts.map