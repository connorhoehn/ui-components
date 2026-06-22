import { PipelineRow } from './PipelinesPage';
export interface PipelineCardProps {
    row: PipelineRow;
    onOpen: () => void;
    onRun: () => void;
    onDuplicate: () => void;
    onExport: () => void;
    onDelete: () => void;
    selectionMode: boolean;
    selected: boolean;
    anySelected: boolean;
    onToggleSelect: (shiftKey: boolean) => void;
}
export default function PipelineCard({ row, onOpen, onRun, onDuplicate, onExport, onDelete, selectionMode, selected, anySelected, onToggleSelect, }: PipelineCardProps): import("react").JSX.Element;
//# sourceMappingURL=PipelineCard.d.ts.map