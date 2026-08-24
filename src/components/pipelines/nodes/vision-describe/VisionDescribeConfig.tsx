// src/components/pipelines/nodes/vision-describe/VisionDescribeConfig.tsx
//
// Config panel for image:vision-describe.

import { useId } from 'react';
import type { ImageVisionDescribeNodeData } from '../../../../types/pipeline';
import { ConfigField, NodeConfigShell, SourceImagePathField } from '../shared';
import { Select } from '../../../forms/Select';
import { Textarea } from '../../../forms/Textarea';
import { NumberInput } from '../../../forms/NumberInput';
import { useModelOptions } from '../../services/PipelineEditorServicesContext';
import { DEFAULT_VISION_MODELS } from '../vision-tag/VisionTagConfig';

export interface VisionDescribeConfigProps {
  data: ImageVisionDescribeNodeData;
  onChange: (patch: Partial<ImageVisionDescribeNodeData>) => void;
  /** Node being edited; enables real upstream image refs. */
  nodeId?: string;
}

export default function VisionDescribeConfig({
  data,
  onChange,
  nodeId,
}: VisionDescribeConfigProps) {
  const uid = useId();
  const models = useModelOptions('image:vision', DEFAULT_VISION_MODELS);
  const pathMissing = !data.imageRefPath?.trim();
  const promptMissing = !data.userPrompt?.trim();

  return (
    <NodeConfigShell>
      <SourceImagePathField
        value={data.imageRefPath}
        onChange={(v) => onChange({ imageRefPath: v ?? '' })}
        nodeId={nodeId}
        label="Image ref path"
        help={
          pathMissing
            ? 'Required — JSONPath to the imageId to describe.'
            : 'JSONPath to the imageId to describe.'
        }
      />

      <ConfigField
        label="User prompt"
        required
        error={promptMissing ? 'User prompt is required.' : undefined}
        help="What to ask the model about the image."
        controlId={`${uid}-user-prompt`}
        render={({ controlId, describedById }) => (
          <Textarea
            rows={3}
            spellCheck={false}
            invalid={promptMissing}
            id={controlId}
            aria-describedby={describedById}
            value={data.userPrompt ?? ''}
            onChange={(e) => onChange({ userPrompt: e.target.value })}
            placeholder="Describe what you see in this image in one paragraph."
          />
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
            placeholder="Leave blank to use the default describe system prompt."
          />
        )}
      />

      <ConfigField
        label="Max output tokens"
        help="Default 512."
        controlId={`${uid}-max-output-tokens`}
        render={({ controlId, describedById }) => (
          <NumberInput
            size="sm"
            min={64}
            max={4096}
            step={64}
            value={data.maxOutputTokens ?? 512}
            onChange={(maxOutputTokens) => onChange({ maxOutputTokens })}
            id={controlId}
            aria-describedby={describedById}
            data-testid="vision-describe-max-output-tokens"
          />
        )}
      />
    </NodeConfigShell>
  );
}
