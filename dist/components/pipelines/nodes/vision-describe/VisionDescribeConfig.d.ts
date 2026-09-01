import type { ImageVisionDescribeNodeData } from '../../../../types/pipeline';
export interface VisionDescribeConfigProps {
    data: ImageVisionDescribeNodeData;
    onChange: (patch: Partial<ImageVisionDescribeNodeData>) => void;
    /** Node being edited; enables real upstream image refs. */
    nodeId?: string;
}
export default function VisionDescribeConfig({ data, onChange, nodeId, }: VisionDescribeConfigProps): import("react").JSX.Element;
//# sourceMappingURL=VisionDescribeConfig.d.ts.map