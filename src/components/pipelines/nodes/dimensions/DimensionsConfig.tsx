// src/components/pipelines/nodes/dimensions/DimensionsConfig.tsx
//
// Config panel for the image:dimensions node.
//
// Converted to the ConfigField + composites pattern. The old hand-rolled
// version applied its `font-mono` class constant to BOTH fields, so "Max edge"
// rendered monospaced here and proportional in UpscaleConfig — the same field,
// two appearances, depending on which node you had selected.

import type { ImageDimensionsNodeData } from '../../../../types/pipeline';
import { ConfigField, NodeConfigShell, SourceImagePathField } from '../shared';
import { NumberInput } from '../../../forms/NumberInput';

export interface DimensionsConfigProps {
  data: ImageDimensionsNodeData;
  onChange: (patch: Partial<ImageDimensionsNodeData>) => void;
  /** Node being edited; derives real upstream image refs. */
  nodeId?: string;
}

const DEFAULT_MAX_EDGE = 1024;

export default function DimensionsConfig({ data, onChange, nodeId }: DimensionsConfigProps) {
  return (
    <NodeConfigShell>
      <SourceImagePathField
        value={data.sourceImagePath}
        onChange={(v) => onChange({ sourceImagePath: v })}
        nodeId={nodeId}
      />

      <ConfigField
        label="Max edge"
        help="Longest-edge cap. The derived genWidth/genHeight scale to fit within it while preserving aspect ratio — wire them into image:generate."
        controlId="dimensions-max-edge"
        render={({ describedById, controlId }) => (
          <NumberInput
            id={controlId}
            aria-describedby={describedById}
            size="sm"
            min={1}
            step={1}
            unit="px"
            value={data.maxEdge ?? DEFAULT_MAX_EDGE}
            onChange={(v) => onChange({ maxEdge: v })}
            data-testid="dimensions-max-edge"
          />
        )}
      />
    </NodeConfigShell>
  );
}
