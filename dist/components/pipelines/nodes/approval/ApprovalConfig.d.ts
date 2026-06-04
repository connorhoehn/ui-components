import type { ApprovalNodeData } from '../../../../types/pipeline';
export interface ApprovalConfigProps {
    data: ApprovalNodeData;
    onChange: (patch: Partial<ApprovalNodeData>) => void;
}
export default function ApprovalConfig({ data, onChange }: ApprovalConfigProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=ApprovalConfig.d.ts.map