// src/components/pipelines/nodes/vision-classify/VisionClassifyConfig.tsx
//
// Config panel for image:vision-classify.
//
// The label list was a hand-built tag editor — chip list, input, Add button,
// Enter handling — duplicating <TagEditor>, which the library already ships.
// `lowercase={false}` because the labels are a fixed vocabulary handed to the
// model, so their casing is the author's choice, not ours.

import type { ImageVisionClassifyNodeData } from '../../../../types/pipeline';
import { ConfigField, NodeConfigShell, SourceImagePathField } from '../shared';
import TagEditor from '../../../shared/TagEditor';
import { Select } from '../../../forms/Select';
import { Textarea } from '../../../forms/Textarea';
import { NumberInput } from '../../../forms/NumberInput';
import { useModelOptions } from '../../services/PipelineEditorServicesContext';
import { DEFAULT_VISION_MODELS } from '../vision-tag/VisionTagConfig';

export interface VisionClassifyConfigProps {
  data: ImageVisionClassifyNodeData;
  onChange: (patch: Partial<ImageVisionClassifyNodeData>) => void;
  /** Node being edited; enables real upstream image refs. */
  nodeId?: string;
}

const MIN_LABELS = 2;

export default function VisionClassifyConfig({
  data,
  onChange,
  nodeId,
}: VisionClassifyConfigProps) {
  const models = useModelOptions('image:vision', DEFAULT_VISION_MODELS);
  const labels = data.labels ?? [];
  const pathMissing = !data.imageRefPath?.trim();

  return (
    <NodeConfigShell>
      <SourceImagePathField
        value={data.imageRefPath}
        onChange={(v) => onChange({ imageRefPath: v ?? '' })}
        nodeId={nodeId}
        label="Image ref path"
        help={
          pathMissing
            ? 'Required — JSONPath to the imageId to classify.'
            : 'JSONPath to the imageId to classify.'
        }
      />

      <ConfigField
        label="Labels"
        required
        error={
          labels.length < MIN_LABELS
            ? `At least ${MIN_LABELS} labels are required to classify between.`
            : undefined
        }
        help="The model returns the single best-matching label."
      >
        <TagEditor
          value={labels}
          onChange={(next) => onChange({ labels: next })}
          placeholder="Add label…"
          lowercase={false}
        />
      </ConfigField>

      <ConfigField label="Model">
        <Select
          size="sm"
          value={data.model ?? models[0]?.value ?? ''}
          onChange={(e) => onChange({ model: e.target.value })}
          aria-label="Model"
          options={models.map((m) => ({ value: m.value, label: m.label ?? m.value }))}
        />
      </ConfigField>

      <ConfigField
        label="System prompt override"
        help="Optional. Sent verbatim — {{context.*}} is NOT substituted here."
      >
        <Textarea
          rows={3}
          spellCheck={false}
          value={data.systemPrompt ?? ''}
          onChange={(e) => onChange({ systemPrompt: e.target.value || undefined })}
          placeholder="Leave blank to use the default classification system prompt."
          aria-label="System prompt override"
        />
      </ConfigField>

      <ConfigField label="Max output tokens" help="Default 256.">
        <NumberInput
          size="sm"
          min={64}
          max={4096}
          step={64}
          value={data.maxOutputTokens ?? 256}
          onChange={(maxOutputTokens) => onChange({ maxOutputTokens })}
          data-testid="vision-classify-max-output-tokens"
        />
      </ConfigField>
    </NodeConfigShell>
  );
}
