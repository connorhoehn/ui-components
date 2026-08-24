// src/components/pipelines/nodes/vision-classify/VisionClassifyConfig.tsx
//
// Config panel for image:vision-classify.
//
// The label list was a hand-built tag editor — chip list, input, Add button,
// Enter handling — duplicating <TagEditor>, which the library already ships.
// `lowercase={false}` because the labels are a fixed vocabulary handed to the
// model, so their casing is the author's choice, not ours.

import { useId } from 'react';
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
  const uid = useId();
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
        render={({ describedById, labelId }) => (
          // A chip list plus its add-input: several controls, so the label
          // names the group rather than any one of them.
          <div role="group" aria-labelledby={labelId} aria-describedby={describedById}>
            <TagEditor
              value={labels}
              onChange={(next) => onChange({ labels: next })}
              placeholder="Add label…"
              lowercase={false}
            />
          </div>
        )}
      />

      <ConfigField
        label="Model"
        controlId={`${uid}-model`}
        render={({ controlId, describedById }) => (
          <Select
            size="sm"
            id={controlId}
            aria-describedby={describedById}
            value={data.model ?? models[0]?.value ?? ''}
            onChange={(e) => onChange({ model: e.target.value })}
            options={models.map((m) => ({ value: m.value, label: m.label ?? m.value }))}
          />
        )}
      />

      <ConfigField
        label="System prompt override"
        help="Optional. Sent verbatim — {{context.*}} is NOT substituted here."
        controlId={`${uid}-system-prompt`}
        render={({ controlId, describedById }) => (
          <Textarea
            rows={3}
            spellCheck={false}
            id={controlId}
            aria-describedby={describedById}
            value={data.systemPrompt ?? ''}
            onChange={(e) => onChange({ systemPrompt: e.target.value || undefined })}
            placeholder="Leave blank to use the default classification system prompt."
          />
        )}
      />

      <ConfigField
        label="Max output tokens"
        help="Default 256."
        controlId={`${uid}-max-output-tokens`}
        render={({ controlId, describedById }) => (
          <NumberInput
            size="sm"
            min={64}
            max={4096}
            step={64}
            value={data.maxOutputTokens ?? 256}
            onChange={(maxOutputTokens) => onChange({ maxOutputTokens })}
            id={controlId}
            aria-describedby={describedById}
            data-testid="vision-classify-max-output-tokens"
          />
        )}
      />
    </NodeConfigShell>
  );
}
