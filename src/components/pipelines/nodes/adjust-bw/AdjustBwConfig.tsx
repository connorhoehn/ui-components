// src/components/pipelines/nodes/adjust-bw/AdjustBwConfig.tsx
//
// Config panel for the image:adjust-bw node.

import type { ImageAdjustBwNodeData } from '../../../../types/pipeline';
import { ConfigField, NodeConfigShell, SourceImagePathField } from '../shared';
import { Select } from '../../../forms/Select';
import { NumberInput } from '../../../forms/NumberInput';

export interface AdjustBwConfigProps {
  data: ImageAdjustBwNodeData;
  onChange: (patch: Partial<ImageAdjustBwNodeData>) => void;
  /** Node being edited; derives real upstream image refs. */
  nodeId?: string;
}

const ALGORITHMS = [
  { value: 'luminosity', label: 'Luminosity — 0.21R + 0.72G + 0.07B (perceptually accurate)' },
  { value: 'average', label: 'Average — (R+G+B)/3 (fast, flat)' },
  { value: 'desaturate', label: 'Desaturate — (max+min)/2 (Lightness channel)' },
];

export default function AdjustBwConfig({ data, onChange, nodeId }: AdjustBwConfigProps) {
  const algorithm = data.algorithm ?? 'luminosity';
  const contrast = data.contrast ?? 1;

  return (
    <NodeConfigShell>
      <SourceImagePathField
        value={data.sourceImagePath}
        onChange={(v) => onChange({ sourceImagePath: v })}
        nodeId={nodeId}
        help="JSONPath to the imageId of the source image."
        placeholder="$.scatter.parentImageId"
      />

      <ConfigField
        label="Greyscale algorithm"
        help="Controls how RGB channels are weighted when converting to greyscale."
        controlId="adjust-bw-algorithm"
        render={({ describedById, controlId }) => (
          <Select
            id={controlId}
            aria-describedby={describedById}
            size="sm"
            value={algorithm}
            onChange={(e) =>
              onChange({ algorithm: e.target.value as ImageAdjustBwNodeData['algorithm'] })
            }
            options={ALGORITHMS}
          />
        )}
      />

      <ConfigField
        label="Contrast multiplier"
        help="Applied after greyscale conversion. 1 is no change, below 1 lowers contrast, above 1 raises it. Range 0–4."
        controlId="adjust-bw-contrast"
        render={({ describedById, controlId }) => (
          <NumberInput
            id={controlId}
            aria-describedby={describedById}
            size="sm"
            min={0}
            max={4}
            step={0.05}
            value={contrast}
            onChange={(v) => onChange({ contrast: v })}
            data-testid="adjust-bw-contrast"
          />
        )}
      />
    </NodeConfigShell>
  );
}
