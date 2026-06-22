import { ImageVisionDescribeNodeData } from '../../../../types/pipeline';
export interface VisionDescribeConfigProps {
    data: ImageVisionDescribeNodeData;
    onChange: (patch: Partial<ImageVisionDescribeNodeData>) => void;
}
export default function VisionDescribeConfig({ data, onChange }: VisionDescribeConfigProps): import("react").JSX.Element;
//# sourceMappingURL=VisionDescribeConfig.d.ts.map