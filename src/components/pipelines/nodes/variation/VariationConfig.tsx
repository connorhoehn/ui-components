// src/components/pipelines/nodes/variation/VariationConfig.tsx
//
// Config panel for image:variation.

import type { ImageVariationNodeData } from '../../../../types/pipeline';
import { ConfigField, NodeConfigShell, SourceImagePathField } from '../shared';
import { Select } from '../../../forms/Select';
import { NumberInput } from '../../../forms/NumberInput';
import {
  useModelOptions,
  type ModelOption,
} from '../../services/PipelineEditorServicesContext';

export interface VariationConfigProps {
  data: ImageVariationNodeData;
  onChange: (patch: Partial<ImageVariationNodeData>) => void;
  /** Node being edited; derives real upstream image refs. */
  nodeId?: string;
}

/** Replaceable via `modelOptions['image:edit']`. */
export const DEFAULT_IMAGE_EDIT_MODELS: readonly ModelOption[] = [
  { value: 'amazon.nova-canvas-v1:0', label: 'Nova Canvas v1 (default)' },
];

const MAX_VARIATIONS = 8;

export default function VariationConfig({ data, onChange, nodeId }: VariationConfigProps) {
  const models = useModelOptions('image:edit', DEFAULT_IMAGE_EDIT_MODELS);

  return (
    <NodeConfigShell>
      <SourceImagePathField
        value={data.sourceImagePath}
        onChange={(v) => onChange({ sourceImagePath: v })}
        nodeId={nodeId}
      />

      <ConfigField
        label="Model"
        controlId="variation-model"
        render={({ describedById, controlId }) => (
          <Select
            id={controlId}
            aria-describedby={describedById}
            size="sm"
            value={data.model ?? models[0]?.value ?? ''}
            onChange={(e) => onChange({ model: e.target.value })}
            options={models.map((m) => ({ value: m.value, label: m.label ?? m.value }))}
          />
        )}
      />

      <ConfigField
        label="Number of variations"
        help="Always fans out — each variation becomes a separate arm downstream."
        controlId="variation-num-variations"
        render={({ describedById, controlId }) => (
          <NumberInput
            id={controlId}
            aria-describedby={describedById}
            size="sm"
            min={1}
            max={MAX_VARIATIONS}
            step={1}
            value={data.numVariations ?? 1}
            onChange={(numVariations) => onChange({ numVariations })}
            data-testid="variation-num-variations"
          />
        )}
      />

      <ConfigField
        label="Similarity"
        help="0 is very different, 1 is nearly identical. 0.7 is a good starting point."
        controlId="variation-similarity"
        render={({ describedById, controlId }) => (
          <NumberInput
            id={controlId}
            aria-describedby={describedById}
            size="sm"
            min={0}
            max={1}
            step={0.05}
            value={data.similarity ?? 0.7}
            onChange={(similarity) => onChange({ similarity })}
            data-testid="variation-similarity"
          />
        )}
      />
    </NodeConfigShell>
  );
}
