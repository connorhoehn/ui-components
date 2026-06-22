import { PipelineDefinition } from '../../../types/pipeline';
export interface VersionDiffModalProps {
    open: boolean;
    onClose: () => void;
    currentDef: PipelineDefinition;
    publishedDef: PipelineDefinition | null;
    onJumpToNode?: (nodeId: string) => void;
}
export type { NodeDiffRow } from './diffDefinitions';
declare function VersionDiffModal({ open, onClose, currentDef, publishedDef, onJumpToNode, }: VersionDiffModalProps): React.ReactElement | null;
export default VersionDiffModal;
//# sourceMappingURL=VersionDiffModal.d.ts.map