// src/components/pipelines/vision/VisionPromptBench.tsx
//
// Vision prompt bench panel. Lets authors paste a sample image + prompts,
// hit "Try", and see the structured JSON result immediately.
// Mounted as a "Bench" tab in the right sidebar for vision-family nodes.

import { useState, useCallback } from 'react';
import { cn } from '../../../lib/cn';
import { Select } from '../../forms/Select';
import { Textarea } from '../../forms/Textarea';
import { ImageUploader } from '../../image/ImageUploader';
import { VisionResultViewer } from './VisionResultViewer';
import type { VisionResult } from './types';
import type { UploadedImage } from '../services/PipelineEditorServicesContext';
import { usePipelineEditorServices } from '../services/PipelineEditorServicesContext';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface VisionPromptBenchProps {
  /** Pre-populated from the node config; user can edit + try. */
  systemPrompt: string;
  userPrompt: string;
  outputSchema?: Record<string, unknown>;
  model?: string;
  /** Save bench-tested values back to node.data. */
  onSave: (values: {
    systemPrompt: string;
    userPrompt: string;
    outputSchema?: Record<string, unknown>;
  }) => void;
  /** Base URL for platform-api calls. Defaults to '' (same origin). */
  apiBase?: string;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const MODELS = [
  { value: 'claude-haiku-4-5-20251001', label: 'Haiku 4.5' },
  { value: 'claude-sonnet-4-6', label: 'Sonnet 4.6' },
  { value: 'claude-opus-4-7', label: 'Opus 4.7' },
];

const DEFAULT_MODEL = 'claude-sonnet-4-6';

interface SchemaPreset {
  label: string;
  value: Record<string, unknown> | undefined;
  /**
   * Optional canned system prompt — selecting the preset overwrites the
   * bench's system-prompt textarea with this string (mirrors the canonical
   * PRESET_DEFAULT_PROMPTS map in platform-api/visionSchemaPresets.ts).
   */
  systemPrompt?: string;
}

const SCHEMA_PRESETS: SchemaPreset[] = [
  { label: '— None —', value: undefined },
  {
    label: 'Detection regions',
    value: {
      type: 'object',
      properties: {
        regions: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              label: { type: 'string' },
              x1: { type: 'number' }, y1: { type: 'number' },
              x2: { type: 'number' }, y2: { type: 'number' },
            },
            required: ['label', 'x1', 'y1', 'x2', 'y2'],
          },
        },
      },
      required: ['regions'],
    },
  },
  {
    label: 'Multi-label tags',
    value: {
      type: 'object',
      properties: {
        tags: { type: 'array', items: { type: 'string' } },
      },
      required: ['tags'],
    },
  },
  {
    label: 'Caption + setting',
    value: {
      type: 'object',
      properties: {
        caption: { type: 'string' },
        setting: { type: 'string' },
        mood: { type: 'string' },
      },
      required: ['caption'],
    },
  },
  {
    label: 'Classification (enum)',
    systemPrompt:
      'You are a precise image classification assistant. Return the single best label from the enum that describes the image. Edit the schema below to set your label set.',
    value: {
      type: 'object',
      required: ['label'],
      properties: {
        label: {
          type: 'string',
          enum: ['red', 'green', 'blue'],
        },
        confidence: { type: 'number', minimum: 0, maximum: 1 },
      },
    },
  },
  {
    label: 'Face detection',
    systemPrompt:
      'You are a face detection vision model. Identify all human faces in the image and return their bounding boxes (normalized [0,1] coordinates) with optional age/expression/gaze attributes when clearly visible. Return JSON conforming to the schema. Do NOT detect non-human faces.',
    value: {
      type: 'object',
      required: ['faces'],
      properties: {
        faces: {
          type: 'array',
          items: {
            type: 'object',
            required: ['bbox', 'confidence'],
            properties: {
              bbox: {
                type: 'object',
                required: ['x', 'y', 'width', 'height'],
                properties: {
                  x: { type: 'number', minimum: 0, maximum: 1 },
                  y: { type: 'number', minimum: 0, maximum: 1 },
                  width: { type: 'number', minimum: 0, maximum: 1 },
                  height: { type: 'number', minimum: 0, maximum: 1 },
                },
              },
              confidence: { type: 'number', minimum: 0, maximum: 1 },
              age: { type: 'string' },
              expression: { type: 'string' },
              gaze: { type: 'string' },
            },
          },
        },
      },
    },
  },
  {
    label: 'Color palette',
    systemPrompt:
      'Analyze the dominant colors in this image. Return the top 5 colors as hex codes with their approximate percentage coverage. Classify the overall temperature as warm/cool/neutral.',
    value: {
      type: 'object',
      required: ['dominant', 'temperature'],
      properties: {
        dominant: {
          type: 'array',
          maxItems: 5,
          items: {
            type: 'object',
            required: ['hex', 'percentage'],
            properties: {
              hex: { type: 'string' },
              percentage: { type: 'number', minimum: 0, maximum: 100 },
            },
          },
        },
        temperature: {
          type: 'string',
          enum: ['warm', 'cool', 'neutral'],
        },
      },
    },
  },
  {
    label: 'Image quality rating',
    systemPrompt:
      "Rate this image's technical and aesthetic quality on focus (sharpness), exposure (lighting), composition (framing/balance) — each 0-10. Provide an overall score 0-10 weighted as 30/30/40. Add one sentence rationale.",
    value: {
      type: 'object',
      required: ['focus', 'exposure', 'composition', 'overallScore', 'rationale'],
      properties: {
        focus: { type: 'integer', minimum: 0, maximum: 10 },
        exposure: { type: 'integer', minimum: 0, maximum: 10 },
        composition: { type: 'integer', minimum: 0, maximum: 10 },
        overallScore: { type: 'integer', minimum: 0, maximum: 10 },
        rationale: { type: 'string' },
      },
    },
  },
];

// ---------------------------------------------------------------------------
// Result chip helpers
// ---------------------------------------------------------------------------

interface UsageChips {
  inputTokens: number;
  outputTokens: number;
  cacheReadTokens?: number;
  cacheCreationTokens?: number;
}

function tokenSummary(usage: UsageChips): string {
  const parts = [`${usage.inputTokens} in`, `${usage.outputTokens} out`];
  if (usage.cacheReadTokens) parts.push(`${usage.cacheReadTokens} cached`);
  return parts.join(' / ');
}

// ---------------------------------------------------------------------------
// VisionPromptBench
// ---------------------------------------------------------------------------

export default function VisionPromptBench({
  systemPrompt: initSystem,
  userPrompt: initUser,
  outputSchema: initSchema,
  model: initModel,
  onSave,
  apiBase = '',
}: VisionPromptBenchProps) {
  const services = usePipelineEditorServices();

  // Local editable state — decoupled from node.data until "Save to node"
  const [sysPrompt, setSysPrompt] = useState(initSystem);
  const [usrPrompt, setUsrPrompt] = useState(initUser);
  const [model, setModel] = useState(initModel ?? DEFAULT_MODEL);
  const [schemaText, setSchemaText] = useState(
    initSchema ? JSON.stringify(initSchema, null, 2) : '',
  );
  const [selectedPreset, setSelectedPreset] = useState('0'); // index into SCHEMA_PRESETS

  // Sample image
  const [uploadedImage, setUploadedImage] = useState<UploadedImage | null>(null);

  // Bench state
  const [running, setRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    visionResult: VisionResult;
    rawExtracted: unknown;
    usage: UsageChips;
    latencyMs: number;
    costUsd: number;
  } | null>(null);

  // ── Schema helpers ─────────────────────────────────────────────────────

  const parseSchema = useCallback((): Record<string, unknown> | undefined => {
    const trimmed = schemaText.trim();
    if (!trimmed) return undefined;
    try {
      const parsed = JSON.parse(trimmed) as unknown;
      if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
        return parsed as Record<string, unknown>;
      }
    } catch {
      // fall through — caller handles
    }
    return undefined;
  }, [schemaText]);

  const applyPreset = useCallback((indexStr: string) => {
    setSelectedPreset(indexStr);
    const idx = Number(indexStr);
    const preset = SCHEMA_PRESETS[idx];
    if (!preset) return;
    setSchemaText(preset.value ? JSON.stringify(preset.value, null, 2) : '');
    if (preset.systemPrompt !== undefined) {
      setSysPrompt(preset.systemPrompt);
    }
  }, []);

  // ── Image URL resolution ────────────────────────────────────────────────
  //
  // `imageUrl` is only used to render the thumbnail in the result panel —
  // the send payload now ships `imageId` directly so the backend can resolve
  // it from the platform-managed image store (task #1375).

  const imageId = uploadedImage?.imageId ?? null;
  const imageUrl = imageId ? services.getImageUrl(imageId) : null;

  // ── Try call ─────────────────────────────────────────────────────────

  const handleTry = useCallback(async () => {
    if (!imageId) {
      setError('Upload or paste a sample image URL first.');
      return;
    }
    if (!usrPrompt.trim()) {
      setError('User prompt is required.');
      return;
    }

    setRunning(true);
    setError(null);
    setResult(null);

    const parsedSchema = parseSchema();

    try {
      const resp = await fetch(`${apiBase}/api/pipeline/preview/vision`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageId,
          systemPrompt: sysPrompt.trim() || undefined,
          userPrompt: usrPrompt.trim(),
          outputSchema: parsedSchema,
          model: model || DEFAULT_MODEL,
        }),
      });

      const json = await resp.json() as {
        caption?: string;
        extracted?: unknown;
        usage?: UsageChips;
        latencyMs?: number;
        costUsd?: number;
        failureReason?: string;
        error?: string;
      };

      if (!resp.ok) {
        setError(json.error ?? `Request failed with status ${resp.status}`);
        return;
      }

      if (json.failureReason) {
        setError(`Model refused to answer (${json.failureReason}).`);
        return;
      }

      // Build a VisionResult for the viewer — imageUrl is for the thumb only,
      // the backend already received imageId in the payload above.
      const visionResult: VisionResult = {
        imageUrl: imageUrl ?? '',
        caption: json.caption ?? '',
        rawText: typeof json.extracted === 'object' && json.extracted
          ? JSON.stringify(json.extracted, null, 2)
          : undefined,
        model: {
          endpointId: model,
          latencyMs: json.latencyMs ?? 0,
          tokensIn: json.usage?.inputTokens,
          tokensOut: json.usage?.outputTokens,
        },
      };

      setResult({
        visionResult,
        rawExtracted: json.extracted,
        usage: json.usage ?? { inputTokens: 0, outputTokens: 0 },
        latencyMs: json.latencyMs ?? 0,
        costUsd: json.costUsd ?? 0,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Network error');
    } finally {
      setRunning(false);
    }
  }, [imageId, imageUrl, usrPrompt, sysPrompt, model, parseSchema, apiBase]);

  // ── Save to node ──────────────────────────────────────────────────────

  const handleSave = () => {
    onSave({
      systemPrompt: sysPrompt,
      userPrompt: usrPrompt,
      outputSchema: parseSchema(),
    });
  };

  // ── Rendering ─────────────────────────────────────────────────────────

  const labelCls = 'text-[12px] font-semibold text-text-secondary';

  return (
    <div className="flex flex-col gap-4 px-4 py-3" data-testid="vision-prompt-bench">

      {/* 1. Sample image input */}
      <div>
        <div className={cn(labelCls, 'mb-1')}>Sample image</div>
        <ImageUploader
          value={uploadedImage}
          onChange={(img) => setUploadedImage(img)}
          data-testid="bench-image-uploader"
        />
      </div>

      {/* 2. Prompt editors */}
      <div className="flex flex-col gap-2">
        <div>
          <label className={labelCls}>System prompt</label>
          <Textarea
            value={sysPrompt}
            onChange={(e) => setSysPrompt(e.target.value)}
            rows={3}
            placeholder="Optional override of the default vision system prompt."
            data-testid="bench-system-prompt"
            className="mt-1 text-[12px] font-mono"
          />
        </div>
        <div>
          <label className={labelCls}>User prompt <span className="text-danger-fg">*</span></label>
          <Textarea
            value={usrPrompt}
            onChange={(e) => setUsrPrompt(e.target.value)}
            rows={3}
            placeholder="Describe what you want the model to do with the image."
            data-testid="bench-user-prompt"
            className="mt-1 text-[12px]"
          />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <label className={labelCls}>Output schema</label>
            <Select
              value={selectedPreset}
              onChange={(e) => applyPreset(e.target.value)}
              options={SCHEMA_PRESETS.map((p, i) => ({ value: String(i), label: p.label }))}
              size="sm"
              aria-label="Schema preset"
              data-testid="bench-schema-preset"
            />
          </div>
          <Textarea
            value={schemaText}
            onChange={(e) => setSchemaText(e.target.value)}
            rows={5}
            placeholder='Optional JSON Schema for structured output. Leave empty for caption-only mode.'
            data-testid="bench-schema-textarea"
            className="text-[11px] font-mono"
          />
        </div>
      </div>

      {/* 3. Model picker + Try button */}
      <div className="flex items-center gap-2">
        <Select
          value={model}
          onChange={(e) => setModel(e.target.value)}
          options={MODELS}
          size="sm"
          aria-label="Vision model"
          data-testid="bench-model-select"
        />
        <button
          type="button"
          onClick={() => void handleTry()}
          disabled={running}
          className={cn(
            'flex-1 py-1.5 px-4 text-[13px] font-semibold rounded-md cursor-pointer',
            'bg-primary text-white border-none',
            running ? 'opacity-60 cursor-not-allowed' : 'hover:bg-primary/90',
          )}
          data-testid="bench-try-btn"
        >
          {running ? 'Running…' : 'Try'}
        </button>
      </div>

      {/* Error */}
      {error && (
        <div
          role="alert"
          className="text-[12px] text-danger-fg bg-danger-bg border border-danger-border rounded px-3 py-2"
          data-testid="bench-error"
        >
          {error}
        </div>
      )}

      {/* 4. Result panel */}
      {result && (
        <div className="flex flex-col gap-2 border-t border-border pt-3" data-testid="bench-result">
          {/* Token / latency / cost chips */}
          <div className="flex flex-wrap gap-1.5">
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-surface-inset border border-border text-text-secondary">
              {tokenSummary(result.usage)} tokens
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-surface-inset border border-border text-text-secondary">
              {result.latencyMs} ms
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-surface-inset border border-border text-text-secondary">
              ${result.costUsd.toFixed(4)}
            </span>
          </div>

          {/* Caption / structured result */}
          <VisionResultViewer
            result={result.visionResult}
            showImage={false}
            showRawText={!!result.rawExtracted}
            data-testid="bench-vision-viewer"
          />

          {/* Extracted JSON if present */}
          {result.rawExtracted !== null && result.rawExtracted !== undefined && (
            <div className="flex flex-col gap-1">
              <div className="text-[11px] font-semibold text-text-secondary">Extracted JSON</div>
              <pre
                className="text-[10px] font-mono bg-surface-inset border border-border rounded p-2 overflow-x-auto"
                data-testid="bench-extracted-json"
              >
                {JSON.stringify(result.rawExtracted, null, 2)}
              </pre>
            </div>
          )}

          {/* Save to node */}
          <button
            type="button"
            onClick={handleSave}
            className={cn(
              'mt-1 w-full py-1.5 text-[12px] font-semibold rounded-md cursor-pointer',
              'bg-surface-hover border border-border text-text-primary',
              'hover:bg-surface-inset',
            )}
            data-testid="bench-save-btn"
          >
            Save to node
          </button>
        </div>
      )}
    </div>
  );
}
