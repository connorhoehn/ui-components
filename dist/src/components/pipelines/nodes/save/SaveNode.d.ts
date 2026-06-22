import { NodeProps, Node } from '@xyflow/react';
import { NodeExecutionState } from '../BaseNode';
import { ImageSaveNodeData } from '../../../../types/pipeline';
type SaveData = ImageSaveNodeData & {
    _state?: NodeExecutionState;
    _hasBreakpoint?: boolean;
    _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;
type SaveFlowNode = Node<SaveData, 'image:save'>;
export default function SaveNode(props: NodeProps<SaveFlowNode>): import("react").JSX.Element;
export {};
//# sourceMappingURL=SaveNode.d.ts.map