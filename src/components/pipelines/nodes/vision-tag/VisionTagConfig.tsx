// src/components/pipelines/nodes/vision-tag/VisionTagConfig.tsx
//
// Config panel for image:vision-tag.
//
// Converted off hand-rolled controls. Two things worth calling out:
//
//  - The candidate-tag editor was built by hand here — a chip list, an input,
//    an Add button and Enter-key handling — when the library already ships
//    <TagEditor>, which is that component. It keeps `lowercase={false}`
//    because candidate tags are a controlled vocabulary handed to the model,
//    so "Golden Retriever" must survive as written.
//  - The model list was hardcoded, so a host running different vision models
//    could not offer them. It now comes from the `modelOptions` seam under
//    `image:vision`, with this list as the default.

import type { ImageVisionTagNodeData } from '../../../../types/pipeline';
import { ConfigField, NodeConfigShell, SourceImagePathField } from '../shared';
import TagEditor from '../../../shared/TagEditor';
import { Select } from '../../../forms/Select';
import { Textarea } from '../../../forms/Textarea';
import { NumberInput } from '../../../forms/NumberInput';
import {
  useModelOptions,
  type ModelOption,
} from '../../services/PipelineEditorServicesContext';

export interface VisionTagConfigProps {
  data: ImageVisionTagNodeData;
  onChange: (patch: Partial<ImageVisionTagNodeData>) => void;
  /** Node being edited; enables real upstream image refs. */
  nodeId?: string;
}

/** Default vision models; replaceable via `modelOptions['image:vision']`. */
export const DEFAULT_VISION_MODELS: readonly ModelOption[] = [
  { value: 'claude-haiku-4-5', label: 'Claude Haiku 4.5 (default — fast)' },
  { value: 'claude-sonnet-4-6', label: 'Claude Sonnet 4.6 (more accurate)' },
];

export default function VisionTagConfig({ data, onChange, nodeId }: VisionTagConfigProps) {
  const models = useModelOptions('image:vision', DEFAULT_VISION_MODELS);
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
            ? 'Required — JSONPath to the imageId to tag.'
            : 'JSONPath to the imageId to tag.'
        }
      />

      <ConfigField
        label="Candidate tags"
        help="Restricts tagging to this vocabulary. Leave empty for open-ended tags."
      >
        <TagEditor
          value={data.candidateTags ?? []}
          onChange={(candidateTags) => onChange({ candidateTags })}
          placeholder="Add candidate tag…"
          lowercase={false}
        />
      </ConfigField>

      {/* Worked example of ConfigField's a11y wiring: `controlId` makes the
          <label htmlFor> association real, and `describedById` points the
          control at the help text. The other node panels still need this. */}
      <ConfigField
        label="Max tags"
        help="Default 10."
        controlId="vision-tag-max-tags"
        render={({ describedById, controlId }) => (
          <NumberInput
            size="sm"
            min={1}
            max={50}
            step={1}
            id={controlId}
            aria-describedby={describedById}
            value={data.maxTags ?? 10}
            onChange={(maxTags) => onChange({ maxTags })}
            data-testid="vision-tag-max-tags"
          />
        )}
      />

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
          placeholder="Leave blank to use the default tagging system prompt."
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
          data-testid="vision-tag-max-output-tokens"
        />
      </ConfigField>
    </NodeConfigShell>
  );
}
