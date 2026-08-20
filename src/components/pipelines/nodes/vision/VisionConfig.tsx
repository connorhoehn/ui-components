// src/components/pipelines/nodes/vision/VisionConfig.tsx
//
// Config panel for image:vision-analyze. Model, image-ref path, prompt, schema.
//
// Converted off hand-rolled controls. This panel carried its own inlined copy
// of the suggestion pills — a raw button list, not even the SamplePills copy
// the other panels shared — and its own pair of error-state class constants
// duplicating what ConfigField already does.

import { useCallback, useState } from 'react';
import type { AuthoringBBox, ImageVisionAnalyzeNodeData } from '../../../../types/pipeline';
import { BBoxAuthoringCanvas } from '../../vision/BBoxAuthoringCanvas';
import { ConfigField, NodeConfigShell, SamplePills } from '../shared';
import { Input } from '../../../forms/Input';
import { Select } from '../../../forms/Select';
import { Textarea } from '../../../forms/Textarea';
import { NumberInput } from '../../../forms/NumberInput';
import { useUpstreamImageRefs } from '../../context/useUpstreamContext';
import {
  useModelOptions,
  type ModelOption,
} from '../../services/PipelineEditorServicesContext';

export interface VisionConfigProps {
  data: ImageVisionAnalyzeNodeData;
  onChange: (patch: Partial<ImageVisionAnalyzeNodeData>) => void;
  /** Node being edited; enables real upstream-context pills. */
  nodeId?: string;
}

/** Replaceable via `modelOptions['image:vision-analyze']`. */
export const DEFAULT_ANALYZE_MODELS: readonly ModelOption[] = [
  { value: 'claude-opus-4-7' },
  { value: 'claude-sonnet-4-6' },
  { value: 'claude-haiku-4-5-20251001' },
];

/**
 * Returns true when the outputSchema matches the detection-regions preset
 * (i.e. it has a `properties.regions` array field). Used to gate the
 * BBoxAuthoringCanvas below the prompt textarea.
 */
function isDetectionRegionsPreset(schema: Record<string, unknown> | undefined): boolean {
  if (!schema) return false;
  const props = schema['properties'];
  if (!props || typeof props !== 'object' || Array.isArray(props)) return false;
  const regions = (props as Record<string, unknown>)['regions'];
  return typeof regions === 'object' && regions !== null;
}

function tryParseSchema(
  text: string,
): { ok: true; value: Record<string, unknown> | undefined } | { ok: false; error: string } {
  const trimmed = text.trim();
  if (trimmed.length === 0) return { ok: true, value: undefined };
  try {
    const parsed = JSON.parse(trimmed) as unknown;
    if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return { ok: false, error: 'Schema must be a JSON object' };
    }
    return { ok: true, value: parsed as Record<string, unknown> };
  } catch (err) {
    return { ok: false, error: (err as Error).message };
  }
}

const SCHEMA_PLACEHOLDER =
  '{\n  "type": "object",\n  "properties": {\n    "caption": { "type": "string" }\n  }\n}';

export default function VisionConfig({ data, onChange, nodeId }: VisionConfigProps) {
  const imageRefOptions = useUpstreamImageRefs(nodeId ?? null);
  const models = useModelOptions('image:vision-analyze', DEFAULT_ANALYZE_MODELS);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [schemaText, setSchemaText] = useState<string>(
    data.outputSchema ? JSON.stringify(data.outputSchema, null, 2) : '',
  );
  const [schemaErr, setSchemaErr] = useState<string | null>(null);

  const userMissing = !data.userPrompt?.trim();
  const refMissing = !data.imageRefPath?.trim();
  const refMalformed = !!data.imageRefPath && !data.imageRefPath.startsWith('$.');

  const showBBoxCanvas = isDetectionRegionsPreset(data.outputSchema);

  const onSeedRegionsChange = useCallback(
    (next: AuthoringBBox[]) => {
      onChange({ seedRegions: next });
    },
    [onChange],
  );

  const onSchemaTextChange = (next: string) => {
    setSchemaText(next);
    const parsed = tryParseSchema(next);
    if (!parsed.ok) {
      setSchemaErr(parsed.error);
      return;
    }
    setSchemaErr(null);
    onChange({ outputSchema: parsed.value });
  };

  const refError = refMissing
    ? 'Image reference path is required.'
    : refMalformed
      ? 'Path must start with $.'
      : undefined;

  return (
    <NodeConfigShell>
      <ConfigField
        label="Model"
        help="Requires the host's vision credentials on the executor."
      >
        <Select
          size="sm"
          value={data.model ?? 'claude-sonnet-4-6'}
          onChange={(e) => onChange({ model: e.target.value })}
          aria-label="Model"
          options={models.map((m) => ({ value: m.value, label: m.label ?? m.value }))}
        />
      </ConfigField>

      <ConfigField
        label="Image reference path"
        required
        error={refError}
        help="JSONPath into context. The value must be a string imageId, or an object with one."
      >
        <Input
          size="sm"
          mono
          spellCheck={false}
          invalid={!!refError}
          value={data.imageRefPath ?? ''}
          onChange={(e) => onChange({ imageRefPath: e.target.value })}
          placeholder="$.trigger.imageRef"
          aria-label="Image reference path"
        />
        <SamplePills
          samples={imageRefOptions.map((o) => o.path)}
          onSelect={(v) => onChange({ imageRefPath: v })}
          aria-label="Upstream image refs"
        />
      </ConfigField>

      <ConfigField
        label="User prompt"
        required
        error={userMissing ? 'User prompt is required.' : undefined}
        help="Supports {{ context.* }} substitution."
      >
        <Textarea
          rows={4}
          invalid={userMissing}
          value={data.userPrompt}
          onChange={(e) => onChange({ userPrompt: e.target.value })}
          aria-label="User prompt"
        />
      </ConfigField>

      {showBBoxCanvas && (
        <ConfigField
          label="Focus regions"
          help="Drag on the image to paint focus boxes. The next vision pass uses these as analysis hints."
        >
          <BBoxAuthoringCanvas
            imageUrl=""
            imageWidth={800}
            imageHeight={600}
            boxes={data.seedRegions ?? []}
            onChange={onSeedRegionsChange}
          />
          {(data.seedRegions?.length ?? 0) > 0 && (
            <div className="text-[11px] text-text-tertiary mt-0.5" data-testid="bbox-region-count">
              {data.seedRegions!.length} region{data.seedRegions!.length !== 1 ? 's' : ''} defined.
            </div>
          )}
        </ConfigField>
      )}

      <ConfigField
        label="Output schema"
        error={schemaErr ? `Invalid JSON: ${schemaErr}` : undefined}
        help={
          data.outputSchema
            ? 'Extract mode — the model must return JSON matching this schema.'
            : 'Leave blank for caption mode (freeform analysis text).'
        }
      >
        <Textarea
          rows={6}
          invalid={!!schemaErr}
          className="font-mono text-[11px]"
          value={schemaText}
          onChange={(e) => onSchemaTextChange(e.target.value)}
          placeholder={SCHEMA_PLACEHOLDER}
          aria-label="Output schema"
        />
      </ConfigField>

      <div>
        <button
          type="button"
          onClick={() => setAdvancedOpen((v) => !v)}
          aria-expanded={advancedOpen}
          className="bg-transparent border-none p-0 cursor-pointer font-inherit text-[12px] font-semibold text-text-secondary flex items-center gap-1"
        >
          <span aria-hidden="true">{advancedOpen ? '▾' : '▸'}</span> Advanced
        </button>

        {advancedOpen && (
          <div className="flex flex-col gap-3 mt-2">
            <ConfigField label="Max output tokens" help="Caps the response length. Default 2048.">
              <NumberInput
                size="sm"
                min={1}
                max={8192}
                value={data.maxOutputTokens}
                onChange={(maxOutputTokens) => onChange({ maxOutputTokens })}
                onClear={() => onChange({ maxOutputTokens: undefined })}
                data-testid="vision-max-output-tokens"
              />
            </ConfigField>

            <ConfigField
              label="System prompt override"
              help="Schema instructions are auto-appended when an output schema is set."
            >
              <Textarea
                rows={2}
                value={data.systemPrompt ?? ''}
                onChange={(e) => onChange({ systemPrompt: e.target.value || undefined })}
                placeholder="Leave blank to use the canned vision system prompt."
                aria-label="System prompt override"
              />
            </ConfigField>
          </div>
        )}
      </div>
    </NodeConfigShell>
  );
}
