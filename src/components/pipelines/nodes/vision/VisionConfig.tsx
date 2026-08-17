// src/components/pipelines/nodes/vision/VisionConfig.tsx
//
// Config panel for image:vision-analyze. Model, image-ref path, prompt, schema.

import { useCallback, useState } from 'react';
import type { AuthoringBBox, ImageVisionAnalyzeNodeData } from '../../../../types/pipeline';
import { BBoxAuthoringCanvas } from '../../vision/BBoxAuthoringCanvas';
import { NodeConfigShell } from '../shared';

export interface VisionConfigProps {
  data: ImageVisionAnalyzeNodeData;
  onChange: (patch: Partial<ImageVisionAnalyzeNodeData>) => void;
}

const VISION_MODELS = [
  'claude-opus-4-7',
  'claude-sonnet-4-6',
  'claude-haiku-4-5-20251001',
];

const REF_PATH_SAMPLES = [
  '$.trigger.imageRef',
  '$.trigger.image',
  '$.steps.upload.output.imageId',
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

function tryParseSchema(text: string): { ok: true; value: Record<string, unknown> | undefined } | { ok: false; error: string } {
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

const inputCls = 'mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary';
const inputErrorCls = 'mt-1 w-full text-[12px] rounded border border-danger bg-white px-2 py-1 outline-none';
const monoInputCls = `${inputCls} font-mono`;
const monoInputErrorCls = `${inputErrorCls} font-mono`;
const labelCls = 'text-[12px] font-semibold text-text-secondary';
const helpCls = 'text-[11px] text-text-tertiary mt-0.5';
const errorCls = 'text-[11px] text-danger-fg mt-0.5';

export default function VisionConfig({ data, onChange }: VisionConfigProps) {
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

  return (
    <NodeConfigShell>
      {/* Model */}
      <div>
        <label htmlFor="vision-model" className={labelCls}>Model</label>
        <select
          id="vision-model"
          className={inputCls}
          value={data.model ?? 'claude-sonnet-4-6'}
          onChange={(e) => onChange({ model: e.target.value })}
        >
          {VISION_MODELS.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
        <div className={helpCls}>Anthropic Messages API. Requires ANTHROPIC_API_KEY on platform-api.</div>
      </div>

      {/* Image ref path */}
      <div>
        <label htmlFor="vision-image-ref-path" className={labelCls}>
          Image reference path<span className="text-danger-fg ml-1">●</span>
        </label>
        <input
          id="vision-image-ref-path"
          type="text"
          spellCheck={false}
          aria-invalid={refMissing || refMalformed ? 'true' : undefined}
          aria-describedby={refMissing || refMalformed ? 'vision-image-ref-path-error' : undefined}
          className={refMissing || refMalformed ? monoInputErrorCls : monoInputCls}
          value={data.imageRefPath ?? ''}
          onChange={(e) => onChange({ imageRefPath: e.target.value })}
          placeholder="$.trigger.imageRef"
        />
        {refMissing ? (
          <div id="vision-image-ref-path-error" role="alert" className={errorCls}>Image reference path is required.</div>
        ) : refMalformed ? (
          <div id="vision-image-ref-path-error" role="alert" className={errorCls}>Path must start with <code>$.</code></div>
        ) : (
          <div className={helpCls}>JSONPath into context. The value must be a string imageId or object with imageId.</div>
        )}
        <div className="mt-1.5 flex flex-wrap gap-1">
          {REF_PATH_SAMPLES.map((sample) => (
            <button
              key={sample}
              type="button"
              onClick={() => onChange({ imageRefPath: sample })}
              className="text-[10px] font-mono bg-surface-inset border border-border text-text-secondary rounded px-1.5 py-0.5 cursor-pointer"
            >
              {sample}
            </button>
          ))}
        </div>
      </div>

      {/* User prompt */}
      <div>
        <label htmlFor="vision-user-prompt" className={labelCls}>
          User prompt<span className="text-danger-fg ml-1">●</span>
        </label>
        <textarea
          id="vision-user-prompt"
          aria-invalid={userMissing ? 'true' : undefined}
          aria-describedby={userMissing ? 'vision-user-prompt-error' : undefined}
          className={`${userMissing ? inputErrorCls : inputCls} min-h-20 resize-y`}
          value={data.userPrompt}
          onChange={(e) => onChange({ userPrompt: e.target.value })}
        />
        {userMissing ? (
          <div id="vision-user-prompt-error" role="alert" className={errorCls}>User prompt is required.</div>
        ) : (
          <div className={helpCls}>Supports {'{{ context.* }}'} substitution.</div>
        )}
      </div>

      {/* Seed regions (detection-regions preset only) */}
      {showBBoxCanvas && (
        <div>
          <div className={labelCls}>Focus regions (optional)</div>
          <div className={helpCls}>
            Drag on the image to paint focus boxes. The next vision pass will use these as analysis hints.
          </div>
          <BBoxAuthoringCanvas
            imageUrl=""
            imageWidth={800}
            imageHeight={600}
            boxes={data.seedRegions ?? []}
            onChange={onSeedRegionsChange}
            className="mt-1"
          />
          {(data.seedRegions?.length ?? 0) > 0 && (
            <div className={helpCls} data-testid="bbox-region-count">
              {data.seedRegions!.length} region{data.seedRegions!.length !== 1 ? 's' : ''} defined.
            </div>
          )}
        </div>
      )}

      {/* Output schema */}
      <div>
        <label htmlFor="vision-output-schema" className={labelCls}>Output schema (optional)</label>
        <textarea
          id="vision-output-schema"
          aria-invalid={schemaErr ? 'true' : undefined}
          aria-describedby={schemaErr ? 'vision-output-schema-error' : undefined}
          className={`${schemaErr ? inputErrorCls : inputCls} font-mono text-[11px] min-h-28 resize-y`}
          value={schemaText}
          onChange={(e) => onSchemaTextChange(e.target.value)}
          placeholder={'{\n  "type": "object",\n  "properties": {\n    "caption": { "type": "string" }\n  }\n}'}
        />
        {schemaErr ? (
          <div id="vision-output-schema-error" role="alert" className={errorCls}>Invalid JSON: {schemaErr}</div>
        ) : data.outputSchema ? (
          <div className={helpCls}>Extract mode — model must return JSON matching this schema.</div>
        ) : (
          <div className={helpCls}>Leave blank for caption mode (freeform analysis text).</div>
        )}
      </div>

      {/* Advanced */}
      <div>
        <button
          type="button"
          onClick={() => setAdvancedOpen((v) => !v)}
          className="bg-transparent border-none p-0 cursor-pointer font-inherit text-[12px] font-semibold text-text-secondary flex items-center gap-1"
        >
          <span>{advancedOpen ? '▾' : '▸'}</span> Advanced
        </button>

        {advancedOpen && (
          <div className="flex flex-col gap-3 mt-2">
            <div>
              <label htmlFor="vision-max-output-tokens" className={labelCls}>Max output tokens</label>
              <input
                id="vision-max-output-tokens"
                type="number"
                min={1}
                max={8192}
                className={inputCls}
                value={data.maxOutputTokens ?? ''}
                onChange={(e) => {
                  const v = e.target.value;
                  onChange({ maxOutputTokens: v === '' ? undefined : Math.max(1, parseInt(v, 10) || 0) });
                }}
              />
              <div className={helpCls}>Caps the response length. Default 2048.</div>
            </div>

            <div>
              <label htmlFor="vision-system-prompt" className={labelCls}>System prompt override (optional)</label>
              <textarea
                id="vision-system-prompt"
                className={`${inputCls} min-h-14 resize-y`}
                value={data.systemPrompt ?? ''}
                onChange={(e) => onChange({ systemPrompt: e.target.value || undefined })}
                placeholder="Leave blank to use the canned vision system prompt."
              />
              <div className={helpCls}>Schema instructions are auto-appended when output schema is set.</div>
            </div>
          </div>
        )}
      </div>
    </NodeConfigShell>
  );
}
