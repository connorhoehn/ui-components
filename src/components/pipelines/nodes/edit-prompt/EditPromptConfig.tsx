// src/components/pipelines/nodes/edit-prompt/EditPromptConfig.tsx
//
// Config panel for image:edit-prompt.

import type { ImageEditPromptNodeData } from '../../../../types/pipeline';
import {
  ConfigField,
  NodeConfigShell,
  SamplePills,
  SourceImagePathField,
} from '../shared';
import { Input } from '../../../forms/Input';
import { Select } from '../../../forms/Select';
import { Textarea } from '../../../forms/Textarea';
import { useModelOptions } from '../../services/PipelineEditorServicesContext';
import { DEFAULT_IMAGE_EDIT_MODELS } from '../variation/VariationConfig';

export interface EditPromptConfigProps {
  data: ImageEditPromptNodeData;
  onChange: (patch: Partial<ImageEditPromptNodeData>) => void;
  /** Node being edited; derives real upstream image refs. */
  nodeId?: string;
}

const MASK_SAMPLES = ['$.steps.mask.output.imageId', '$.trigger.maskRef'];

export default function EditPromptConfig({ data, onChange, nodeId }: EditPromptConfigProps) {
  const models = useModelOptions('image:edit', DEFAULT_IMAGE_EDIT_MODELS);
  const promptMissing = !data.prompt?.trim();

  return (
    <NodeConfigShell>
      <SourceImagePathField
        value={data.sourceImagePath}
        onChange={(v) => onChange({ sourceImagePath: v })}
        nodeId={nodeId}
      />

      <ConfigField
        label="Mask image path"
        help="Optional. White pixels are the edit region, black is preserved. Omit for outpainting."
      >
        <Input
          size="sm"
          mono
          spellCheck={false}
          value={data.maskImagePath ?? ''}
          onChange={(e) => onChange({ maskImagePath: e.target.value.trim() || undefined })}
          placeholder="$.steps.mask.output.imageId"
          aria-label="Mask image path"
        />
        <SamplePills
          samples={MASK_SAMPLES}
          onSelect={(v) => onChange({ maskImagePath: v })}
          aria-label="Common mask paths"
        />
      </ConfigField>

      <ConfigField
        label="Edit prompt"
        required
        error={promptMissing ? 'Edit prompt is required.' : undefined}
        help="Describes what to generate in the masked region."
      >
        <Textarea
          rows={4}
          spellCheck={false}
          invalid={promptMissing}
          value={data.prompt ?? ''}
          onChange={(e) => onChange({ prompt: e.target.value })}
          placeholder="Replace the background with a sunny beach"
          aria-label="Edit prompt"
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
    </NodeConfigShell>
  );
}
