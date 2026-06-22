import { NodeType } from '../../../types/pipeline';
export interface QuickInsertPopoverProps {
    /** Screen coordinates where the popover anchors. */
    anchor: {
        x: number;
        y: number;
    } | null;
    /** Flow-space position where the new node will be placed. */
    flowPosition: {
        x: number;
        y: number;
    } | null;
    /** Types to hide (e.g. ['trigger'] if one is already placed). */
    disabledTypes?: NodeType[];
    onClose: () => void;
    onInsert: (type: NodeType, position: {
        x: number;
        y: number;
    }) => void;
}
export default function QuickInsertPopover({ anchor, flowPosition, disabledTypes, onClose, onInsert, }: QuickInsertPopoverProps): import("react").JSX.Element | null;
//# sourceMappingURL=QuickInsertPopover.d.ts.map