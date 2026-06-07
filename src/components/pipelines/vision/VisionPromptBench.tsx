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

const SCHEMA_PRESETS: { label: string; value: Record<string, unknown> | undefined }[] = [
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
  }, []);

  // ── Image URL resolution ────────────────────────────────────────────────

  const imageUrl = uploadedImage
    ? services.getImageUrl(uploadedImage.imageId)
    : null;

  // ── Try call ─────────────────────────────────────────────────────────

  const handleTry = useCallback(async () => {
    if (!imageUrl) {
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
          imageUrl,
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

      // Build a VisionResult for the viewer
      const visionResult: VisionResult = {
        imageUrl,
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
  }, [imageUrl, usrPrompt, sysPrompt, model, parseSchema, apiBase]);

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
          <label className={labelCls}>User prompt <span className="text-red-500">*</span></label>
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
          className="text-[12px] text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2"
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
