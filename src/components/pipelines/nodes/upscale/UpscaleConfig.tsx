// src/components/pipelines/nodes/upscale/UpscaleConfig.tsx
//
// Config panel for the image:upscale node.

import type { ImageUpscaleNodeData } from '../../../../types/pipeline';
import { ConfigField, NodeConfigShell, SourceImagePathField } from '../shared';
import { Textarea } from '../../../forms/Textarea';
import { NumberInput } from '../../../forms/NumberInput';

export interface UpscaleConfigProps {
  data: ImageUpscaleNodeData;
  onChange: (patch: Partial<ImageUpscaleNodeData>) => void;
  /** Node being edited; derives real upstream image refs. */
  nodeId?: string;
}

const DEFAULT_MAX_EDGE = 1024;

export default function UpscaleConfig({ data, onChange, nodeId }: UpscaleConfigProps) {
  return (
    <NodeConfigShell>
      <ConfigField
        label="Prompt"
        help="Optional text guidance forwarded to the upscaler."
        controlId="upscale-prompt"
        render={({ describedById, controlId }) => (
          <Textarea
            id={controlId}
            aria-describedby={describedById}
            rows={3}
            spellCheck={false}
            value={data.prompt ?? ''}
            // Blank means "no guidance", which is absent rather than an empty
            // string — an empty prompt would be forwarded as one.
            onChange={(e) =>
              onChange({ prompt: e.target.value.trim() ? e.target.value : undefined })
            }
            placeholder="optional guidance forwarded to the upscaler"
          />
        )}
      />

      <ConfigField
        label="Max edge"
        help="Longest-edge cap applied before the super-resolution pass."
        controlId="upscale-max-edge"
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
            data-testid="upscale-max-edge"
          />
        )}
      />

      <SourceImagePathField
        value={data.sourceImagePath}
        onChange={(v) => onChange({ sourceImagePath: v })}
        nodeId={nodeId}
      />
    </NodeConfigShell>
  );
}
