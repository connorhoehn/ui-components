// src/components/pipelines/nodes/generate/GenerateConfig.tsx
//
// Config panel for image:generate.
//
// Rewritten twice over from its original form:
//
//  1. It hand-rolled every control — raw <textarea>, <select> and
//     <input type="number"> styled by three shared class-string constants —
//     instead of the ConfigField / Textarea / Select / NumberInput composites
//     every other config panel uses. That is the drift the component library
//     exists to prevent: the same field rendered two different ways depending
//     on which panel you opened.
//
//  2. The model list was a hardcoded pair of vendor model IDs, so a host
//     running any other image backend had no way to offer its own. The list is
//     now a default that the host replaces through `modelOptions` on the
//     editor services seam, keyed `image:generate`.

import type { ImageGenerateNodeData } from '../../../../types/pipeline';
import { ConfigField, NodeConfigShell } from '../shared';
import { Textarea } from '../../../forms/Textarea';
import { Select } from '../../../forms/Select';
import { NumberInput } from '../../../forms/NumberInput';
import {
  useModelOptions,
  useNodeVocabulary,
  type ModelOption,
} from '../../services/PipelineEditorServicesContext';

export interface GenerateConfigProps {
  data: ImageGenerateNodeData;
  onChange: (patch: Partial<ImageGenerateNodeData>) => void;
}

/**
 * Shipped so the editor is usable with no host wiring. A host that runs a
 * different image backend replaces this via `modelOptions['image:generate']`.
 */
export const DEFAULT_GENERATE_MODELS: readonly ModelOption[] = [
  { value: 'amazon.titan-image-generator-v2:0', label: 'Titan v2 (default)' },
  { value: 'amazon.titan-image-generator-v1', label: 'Titan v1' },
];

const MIN_EDGE = 64;
const MAX_EDGE = 2048;
const MAX_IMAGES = 8;

export default function GenerateConfig({ data, onChange }: GenerateConfigProps) {
  const models = useModelOptions('image:generate', DEFAULT_GENERATE_MODELS);
  const vocab = useNodeVocabulary('image:generate');

  const promptMissing = !data.prompt?.trim();

  // Fall back to the first offered model rather than a literal id — with a
  // host-supplied list, a hardcoded default may not be in it.
  const selectedModel = data.model ?? models[0]?.value ?? '';

  return (
    <NodeConfigShell>
      <ConfigField
        label={vocab.label('prompt', 'Prompt')}
        required
        error={promptMissing ? 'Prompt is required.' : undefined}
        help={
          !promptMissing
            ? vocab.help('prompt', 'Text description of the image to generate.')
            : undefined
        }
        controlId="generate-prompt"
        render={({ describedById, controlId }) => (
          <Textarea
            id={controlId}
            aria-describedby={describedById}
            rows={4}
            spellCheck={false}
            invalid={promptMissing}
            value={data.prompt ?? ''}
            onChange={(e) => onChange({ prompt: e.target.value })}
            placeholder={vocab.placeholder(
              'prompt',
              'A photorealistic photograph of a golden retriever in a sunny meadow',
            )}
          />
        )}
      />

      <ConfigField
        label={vocab.label('model', 'Model')}
        help={
          models.length === 0
            ? 'This host declares no image models.'
            : vocab.help('model')
        }
        controlId="generate-model"
        render={({ describedById, controlId }) => (
          <Select
            id={controlId}
            aria-describedby={describedById}
            size="sm"
            value={selectedModel}
            onChange={(e) => onChange({ model: e.target.value })}
            options={models.map((m) => ({ value: m.value, label: m.label ?? m.value }))}
          />
        )}
      />

      <div className="flex gap-2">
        <div className="flex-1">
          <ConfigField
            label={vocab.label('width', 'Width')}
            controlId="generate-width"
            render={({ describedById, controlId }) => (
              <NumberInput
                id={controlId}
                aria-describedby={describedById}
                size="sm"
                min={MIN_EDGE}
                max={MAX_EDGE}
                step={64}
                unit="px"
                value={data.width ?? 512}
                onChange={(v) => onChange({ width: v })}
                data-testid="generate-width"
              />
            )}
          />
        </div>
        <div className="flex-1">
          <ConfigField
            label={vocab.label('height', 'Height')}
            controlId="generate-height"
            render={({ describedById, controlId }) => (
              <NumberInput
                id={controlId}
                aria-describedby={describedById}
                size="sm"
                min={MIN_EDGE}
                max={MAX_EDGE}
                step={64}
                unit="px"
                value={data.height ?? 512}
                onChange={(v) => onChange({ height: v })}
                data-testid="generate-height"
              />
            )}
          />
        </div>
      </div>

      <ConfigField
        label={vocab.label('seed', 'Seed')}
        help="Optional — set for a reproducible result."
        controlId="generate-seed"
        render={({ describedById, controlId }) => (
          <NumberInput
            id={controlId}
            aria-describedby={describedById}
            size="sm"
            min={0}
            step={1}
            value={data.seed}
            onChange={(v) => onChange({ seed: v })}
            onClear={() => onChange({ seed: undefined })}
            placeholder="random"
            data-testid="generate-seed"
          />
        )}
      />

      <ConfigField
        label={vocab.label('numImages', 'Number of images')}
        help="Above 1, the step fans out with one arm per image, each carrying one imageId."
        controlId="generate-num-images"
        render={({ describedById, controlId }) => (
          <NumberInput
            id={controlId}
            aria-describedby={describedById}
            size="sm"
            min={1}
            max={MAX_IMAGES}
            step={1}
            value={data.numImages ?? 1}
            onChange={(v) => onChange({ numImages: v })}
            data-testid="generate-num-images"
          />
        )}
      />
    </NodeConfigShell>
  );
}
