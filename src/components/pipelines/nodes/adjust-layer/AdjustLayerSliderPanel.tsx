// src/components/pipelines/nodes/adjust-layer/AdjustLayerSliderPanel.tsx
//
// Live-preview slider panel for the image:adjust-layer node.
// Each slider change debounces 150 ms then calls POST /api/pipeline/preview/adjust-layer.
// The preview thumbnail swaps to the returned data: URL.

import { useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '../../../../lib/cn';
import { NumberInput } from '../../../forms/NumberInput';
import { Select } from '../../../forms/Select';
import { ImageThumbnail } from '../../../image/ImageThumbnail';
import { ImageUploader } from '../../../image/ImageUploader';
import Chip from '../../../shared/Chip';
import { Button } from '../../../ui/Button';
import type { UploadedImage } from '../../services';
import type { AdjustLayer } from '../../../../types/pipeline';
import { Slider } from '../../../forms/Slider';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface AdjustLayerSliderPanelProps {
  /** Current layer stack from node.data.layers. Controlled. */
  layers: AdjustLayer[];
  onChange: (next: AdjustLayer[]) => void;
  /**
   * Auto-wired source imageId resolved from the upstream run's latest step
   * output. May be undefined if no run exists yet.
   */
  autoSourceImageId?: string;
  /**
   * Manual pin (from node.data.previewSourceImageId). When set, wins over
   * `autoSourceImageId`.
   */
  pinnedSourceImageId?: string;
  /**
   * Called when the user pins or clears a manual override. Writes through
   * to `nodeData.previewSourceImageId` in the host editor.
   */
  onPinnedSourceImageIdChange?: (next: string | undefined) => void;
  /**
   * Deprecated single-source prop kept for backwards compatibility. If
   * neither `autoSourceImageId` nor `pinnedSourceImageId` is supplied, this
   * is treated as the auto-wired source.
   * @deprecated Use `autoSourceImageId` + `pinnedSourceImageId`.
   */
  sourceImageId?: string;
  /** Base URL for the platform-api. Defaults to '' (same origin). */
  apiBase?: string;
}

type LayerKind = AdjustLayer['kind'];

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const KIND_LABELS: Record<LayerKind, string> = {
  brightness: 'Brightness',
  contrast:   'Contrast',
  saturation: 'Saturation',
  hue:        'Hue',
  blur:       'Blur',
};

const KIND_OPTIONS = (Object.keys(KIND_LABELS) as LayerKind[]).map((k) => ({
  value: k,
  label: KIND_LABELS[k],
}));

interface LayerRange {
  min: number;
  max: number;
  step: number;
  unit: string;
  defaultValue: number;
}

const LAYER_RANGE: Record<LayerKind, LayerRange> = {
  brightness: { min: 0, max: 2,    step: 0.01, unit: '×', defaultValue: 1 },
  contrast:   { min: 0, max: 2,    step: 0.01, unit: '×', defaultValue: 1 },
  saturation: { min: 0, max: 2,    step: 0.01, unit: '×', defaultValue: 1 },
  hue:        { min: -180, max: 180, step: 1,  unit: '°', defaultValue: 0 },
  blur:       { min: 0, max: 50,   step: 0.5,  unit: 'px', defaultValue: 1 },
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function defaultLayerForKind(kind: LayerKind): AdjustLayer {
  switch (kind) {
    case 'brightness': return { kind, value: 1 };
    case 'contrast':   return { kind, value: 1 };
    case 'saturation': return { kind, value: 1 };
    case 'hue':        return { kind, degrees: 0 };
    case 'blur':       return { kind, radiusPx: 1 };
  }
}

function getLayerValue(layer: AdjustLayer): number {
  switch (layer.kind) {
    case 'hue':  return layer.degrees;
    case 'blur': return layer.radiusPx;
    default:     return layer.value;
  }
}

function setLayerValue(layer: AdjustLayer, newVal: number): AdjustLayer {
  switch (layer.kind) {
    case 'hue':  return { kind: 'hue', degrees: newVal };
    case 'blur': return { kind: 'blur', radiusPx: newVal };
    default:     return { kind: layer.kind, value: newVal } as AdjustLayer;
  }
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

const DRAG_HANDLE_CLS = cn(
  'w-4 h-full flex items-center justify-center',
  'text-[14px] text-text-tertiary cursor-grab select-none shrink-0',
);

const KIND_CHIP_CLS = cn(
  'text-[11px] font-semibold px-2 py-0.5 rounded-full',
  'bg-surface-hover border border-border text-text-secondary',
  'whitespace-nowrap shrink-0',
);

interface LayerRowProps {
  layer: AdjustLayer;
  index: number;
  onUpdate: (updated: AdjustLayer) => void;
  onRemove: () => void;
}

function LayerRow({ layer, index, onUpdate, onRemove }: LayerRowProps) {
  const range = LAYER_RANGE[layer.kind];
  const value = getLayerValue(layer);

  const handleKindChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onUpdate(defaultLayerForKind(e.target.value as LayerKind));
  };

  const handleNumberChange = (newVal: number) => {
    onUpdate(setLayerValue(layer, newVal));
  };

  return (
    <div
      className="flex items-center gap-2 px-2 py-1.5 rounded-md border border-border bg-surface-inset"
      data-testid={`layer-row-${index}`}
    >
      {/* Drag affordance (visual only) */}
      <span className={DRAG_HANDLE_CLS} aria-hidden="true" title="Drag handle">
        ⠿
      </span>

      {/* Kind chip with select */}
      <Select
        value={layer.kind}
        onChange={handleKindChange}
        options={KIND_OPTIONS}
        size="sm"
        aria-label={`Layer ${index + 1} kind`}
        data-testid={`layer-kind-select-${index}`}
        className="shrink-0"
      />

      {/* Range slider */}
      <Slider
        min={range.min}
        max={range.max}
        step={range.step}
        value={value}
        onChange={handleNumberChange}
        readout={false}
        className="flex-1 min-w-0"
        aria-label={`${KIND_LABELS[layer.kind]} slider`}
        data-testid={`layer-slider-${index}`}
      />

      {/* Numeric readout */}
      <NumberInput
        value={value}
        onChange={handleNumberChange}
        min={range.min}
        max={range.max}
        step={range.step}
        unit={range.unit}
        size="sm"
        data-testid={`layer-number-${index}`}
      />

      {/* Delete */}
      <button
        type="button"
        onClick={onRemove}
        className={cn(
          'shrink-0 w-6 h-6 flex items-center justify-center rounded',
          'text-[12px] text-text-tertiary bg-transparent border-none',
          'cursor-pointer hover:text-danger-fg hover:bg-danger-bg',
        )}
        aria-label={`Remove layer ${index + 1}`}
        data-testid={`layer-remove-${index}`}
      >
        ✕
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Preview hook
// ---------------------------------------------------------------------------

const DEBOUNCE_MS = 150;

function useAdjustPreview(
  imageId: string | undefined,
  layers: AdjustLayer[],
  apiBase: string,
) {
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const fetchPreview = useCallback(
    async (id: string, l: AdjustLayer[]) => {
      abortRef.current?.abort();
      const ctrl = new AbortController();
      abortRef.current = ctrl;
      setLoading(true);
      try {
        const resp = await fetch(`${apiBase}/api/pipeline/preview/adjust-layer`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ imageId: id, layers: l }),
          signal: ctrl.signal,
        });
        if (!resp.ok) return;
        const json = await resp.json() as { dataUrl?: string };
        if (json.dataUrl) {
          setPreviewSrc(json.dataUrl);
        }
      } catch {
        // Aborted or network error — ignore
      } finally {
        setLoading(false);
      }
    },
    [apiBase],
  );

  useEffect(() => {
    if (!imageId) {
      setPreviewSrc(null);
      return;
    }
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      void fetchPreview(imageId, layers);
    }, DEBOUNCE_MS);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageId, JSON.stringify(layers), fetchPreview]);

  return { previewSrc, loading };
}

// ---------------------------------------------------------------------------
// AdjustLayerSliderPanel
// ---------------------------------------------------------------------------

function shortenImageId(id: string): string {
  if (id.length <= 8) return id;
  return `${id.slice(0, 8)}…`;
}

export default function AdjustLayerSliderPanel({
  layers,
  onChange,
  autoSourceImageId,
  pinnedSourceImageId,
  onPinnedSourceImageIdChange,
  sourceImageId,
  apiBase = '',
}: AdjustLayerSliderPanelProps) {
  const [newKind, setNewKind] = useState<LayerKind>('brightness');
  const [showUploader, setShowUploader] = useState(false);

  // Resolve effective source: pin wins over auto-wire; legacy
  // `sourceImageId` prop is treated as auto-wired for back-compat.
  const effectiveAutoId = autoSourceImageId ?? sourceImageId;
  const effectiveSourceId = pinnedSourceImageId ?? effectiveAutoId;
  const isPinned = !!pinnedSourceImageId;

  const { previewSrc, loading } = useAdjustPreview(effectiveSourceId, layers, apiBase);

  const handleClearPin = () => {
    onPinnedSourceImageIdChange?.(undefined);
  };

  const handleUploaderChange = (next: UploadedImage | null) => {
    if (next?.imageId) {
      onPinnedSourceImageIdChange?.(next.imageId);
      setShowUploader(false);
    }
  };

  const updateLayer = (index: number, updated: AdjustLayer) => {
    onChange(layers.map((l, i) => (i === index ? updated : l)));
  };

  const removeLayer = (index: number) => {
    onChange(layers.filter((_, i) => i !== index));
  };

  const addLayer = () => {
    onChange([...layers, defaultLayerForKind(newKind)]);
  };

  const handleNewKindChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNewKind(e.target.value as LayerKind);
  };

  return (
    <div className="flex gap-3 p-3" data-testid="adjust-layer-slider-panel">
      {/* Left: layer stack */}
      <div className="flex-1 flex flex-col gap-2 min-w-0">
        {layers.length === 0 && (
          <div className="text-[11px] text-text-tertiary italic">
            No layers — add one below.
          </div>
        )}
        {layers.map((layer, idx) => (
          <LayerRow
            key={idx}
            layer={layer}
            index={idx}
            onUpdate={(updated) => updateLayer(idx, updated)}
            onRemove={() => removeLayer(idx)}
          />
        ))}
        {/* Add layer row */}
        <div className="flex items-center gap-2 mt-1">
          <Select
            value={newKind}
            onChange={handleNewKindChange}
            options={KIND_OPTIONS}
            size="sm"
            aria-label="New layer kind"
            data-testid="new-layer-kind-select"
          />
          <button
            type="button"
            onClick={addLayer}
            className={cn(
              'text-[12px] font-semibold px-3 py-1 rounded-md cursor-pointer',
              'bg-primary text-white border-none hover:bg-primary/90',
            )}
            data-testid="add-layer-btn"
          >
            + Add layer
          </button>
        </div>
      </div>

      {/* Right: live preview */}
      <div className="shrink-0 flex flex-col items-stretch gap-1.5">
        <div className="text-[11px] font-semibold text-text-tertiary">Preview</div>

        {/* Source attribution caption + override controls */}
        <div
          className={cn('flex items-center gap-1.5 flex-wrap')}
          data-testid="adjust-layer-source-caption-row"
        >
          {isPinned && effectiveSourceId ? (
            <Chip
              tone="neutral"
              size="xs"
              data-testid="adjust-layer-source-chip-pinned"
            >
              <span>Source: pinned ({shortenImageId(effectiveSourceId)})</span>
              <button
                type="button"
                onClick={handleClearPin}
                aria-label="Clear pinned source image"
                data-testid="adjust-layer-source-clear-pin"
                className={cn(
                  'ml-1 inline-flex items-center justify-center',
                  'w-3 h-3 rounded-full text-[10px] leading-none',
                  'bg-transparent border-none cursor-pointer text-current',
                  'hover:bg-surface-emphasis',
                )}
              >
                ×
              </button>
            </Chip>
          ) : effectiveAutoId ? (
            <Chip
              tone="info"
              size="xs"
              data-testid="adjust-layer-source-chip-auto"
            >
              Source: {shortenImageId(effectiveAutoId)} from upstream run
            </Chip>
          ) : null}

          {onPinnedSourceImageIdChange && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowUploader((v) => !v)}
              data-testid="adjust-layer-override-btn"
            >
              Override
            </Button>
          )}
        </div>

        {/* Optional inline uploader. Mounted only when user clicks Override. */}
        {showUploader && onPinnedSourceImageIdChange && (
          <div
            className="w-48"
            data-testid="adjust-layer-override-uploader-wrap"
          >
            <ImageUploader
              value={null}
              onChange={handleUploaderChange}
              data-testid="adjust-layer-override-uploader"
            />
          </div>
        )}

        {effectiveSourceId ? (
          <div className="relative">
            <ImageThumbnail
              src={previewSrc ?? ''}
              alt="Adjust layer preview"
              size="lg"
              aspectRatio="auto"
              loading="eager"
              data-testid="adjust-layer-preview-thumb"
            />
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/60 rounded-md">
                <span className="text-[11px] text-text-secondary">Loading…</span>
              </div>
            )}
          </div>
        ) : (
          <div
            className={cn(
              'w-48 h-32 rounded-md border border-dashed border-border',
              'flex items-center justify-center text-[11px] text-text-tertiary',
              'bg-surface-inset',
            )}
            data-testid="adjust-layer-no-source"
          >
            No source image
          </div>
        )}
      </div>
    </div>
  );
}
