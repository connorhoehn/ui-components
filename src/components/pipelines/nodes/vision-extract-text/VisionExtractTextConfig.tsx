// src/components/pipelines/nodes/vision-extract-text/VisionExtractTextConfig.tsx
//
// Config panel for image:vision-extract-text.

import type { ImageVisionExtractTextNodeData } from '../../../../types/pipeline';
import { ConfigField, NodeConfigShell, SourceImagePathField } from '../shared';
import { Select } from '../../../forms/Select';
import { Textarea } from '../../../forms/Textarea';
import { NumberInput } from '../../../forms/NumberInput';
import {
  useModelOptions,
  type ModelOption,
} from '../../services/PipelineEditorServicesContext';

export interface VisionExtractTextConfigProps {
  data: ImageVisionExtractTextNodeData;
  onChange: (patch: Partial<ImageVisionExtractTextNodeData>) => void;
  /** Node being edited; enables real upstream image refs. */
  nodeId?: string;
}

/**
 * OCR reverses the usual default: the more capable model goes first, because
 * accuracy matters more than latency when transcribing a document.
 * Replaceable via `modelOptions['image:vision-ocr']`.
 */
export const DEFAULT_OCR_MODELS: readonly ModelOption[] = [
  { value: 'claude-sonnet-4-6', label: 'Claude Sonnet 4.6 (default — best OCR accuracy)' },
  { value: 'claude-haiku-4-5', label: 'Claude Haiku 4.5 (faster, lower accuracy)' },
];

export default function VisionExtractTextConfig({
  data,
  onChange,
  nodeId,
}: VisionExtractTextConfigProps) {
  const models = useModelOptions('image:vision-ocr', DEFAULT_OCR_MODELS);
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
            ? 'Required — JSONPath to the imageId to extract text from.'
            : 'JSONPath to the imageId to extract text from.'
        }
      />

      <ConfigField label="Model" help="Defaults to the more accurate model for OCR.">
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
          placeholder="Leave blank to use the default OCR system prompt."
          aria-label="System prompt override"
        />
      </ConfigField>

      <ConfigField
        label="Max output tokens"
        help="Default 1024. Increase for documents with large amounts of text."
      >
        <NumberInput
          size="sm"
          min={64}
          max={8192}
          step={64}
          value={data.maxOutputTokens ?? 1024}
          onChange={(maxOutputTokens) => onChange({ maxOutputTokens })}
          data-testid="vision-extract-text-max-output-tokens"
        />
      </ConfigField>
    </NodeConfigShell>
  );
}
