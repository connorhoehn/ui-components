// src/components/pipelines/nodes/adjust-layer/AdjustLayerConfig.tsx
//
// Config panel for the image:adjust-layer node. Stacked layer editor.

import type { ImageAdjustLayerNodeData, AdjustLayer } from '../../../../types/pipeline';

export interface AdjustLayerConfigProps {
  data: ImageAdjustLayerNodeData;
  onChange: (patch: Partial<ImageAdjustLayerNodeData>) => void;
}

const SOURCE_IMAGE_SAMPLES = [
  '$.scatter.parentImageId',
  '$.trigger.imageRef',
  '$.steps.upload.output.imageId',
];

function SamplePills({ samples, onSelect }: { samples: string[]; onSelect: (v: string) => void }) {
  return (
    <div className="mt-1.5 flex flex-wrap gap-1">
      {samples.map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => onSelect(s)}
          className="text-[10px] font-mono bg-surface-inset border border-border text-text-secondary rounded px-1.5 py-0.5 cursor-pointer"
        >
          {s}
        </button>
      ))}
    </div>
  );
}

type LayerKind = AdjustLayer['kind'];

const KIND_LABELS: Record<LayerKind, string> = {
  brightness: 'Brightness',
  contrast:   'Contrast',
  saturation: 'Saturation',
  hue:        'Hue',
  blur:       'Blur',
};

function defaultLayerForKind(kind: LayerKind): AdjustLayer {
  switch (kind) {
    case 'brightness': return { kind, value: 1 };
    case 'contrast':   return { kind, value: 1 };
    case 'saturation': return { kind, value: 1 };
    case 'hue':        return { kind, degrees: 0 };
    case 'blur':       return { kind, radiusPx: 1 };
  }
}

interface LayerCardProps {
  layer: AdjustLayer;
  index: number;
  onUpdate: (patch: AdjustLayer) => void;
  onRemove: () => void;
}

const inputCls = 'text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary';

function LayerCard({ layer, index, onUpdate, onRemove }: LayerCardProps) {
  const handleKindChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newKind = e.target.value as LayerKind;
    onUpdate(defaultLayerForKind(newKind));
  };

  let valueInput: React.ReactElement;
  switch (layer.kind) {
    case 'brightness':
    case 'contrast':
    case 'saturation':
      valueInput = (
        <input
          type="number"
          min={0}
          max={4}
          step={0.05}
          className={`${inputCls} w-24`}
          value={layer.value}
          onChange={(e) => {
            const v = parseFloat(e.target.value);
            onUpdate({ kind: layer.kind, value: Number.isFinite(v) ? Math.max(0, v) : 1 });
          }}
          aria-label={`${layer.kind} value`}
        />
      );
      break;
    case 'hue':
      valueInput = (
        <input
          type="number"
          min={-360}
          max={360}
          step={1}
          className={`${inputCls} w-24`}
          value={layer.degrees}
          onChange={(e) => {
            const v = parseFloat(e.target.value);
            onUpdate({ kind: 'hue', degrees: Number.isFinite(v) ? v : 0 });
          }}
          aria-label="hue degrees"
        />
      );
      break;
    case 'blur':
      valueInput = (
        <input
          type="number"
          min={0}
          max={50}
          step={0.5}
          className={`${inputCls} w-24`}
          value={layer.radiusPx}
          onChange={(e) => {
            const v = parseFloat(e.target.value);
            onUpdate({ kind: 'blur', radiusPx: Number.isFinite(v) ? Math.max(0, v) : 1 });
          }}
          aria-label="blur radius px"
        />
      );
      break;
  }

  const unitLabel = layer.kind === 'hue' ? '°' : layer.kind === 'blur' ? 'px' : '×';

  return (
    <div className="border border-border rounded-md p-2.5 bg-surface-inset flex flex-col gap-2" data-testid={`layer-card-${index}`}>
      <div className="flex items-center gap-2">
        <span className="text-[11px] text-text-tertiary font-semibold min-w-[20px]">{index + 1}.</span>
        <select
          className={`${inputCls} flex-1`}
          value={layer.kind}
          onChange={handleKindChange}
          aria-label={`Layer ${index + 1} kind`}
        >
          {(Object.keys(KIND_LABELS) as LayerKind[]).map((k) => (
            <option key={k} value={k}>{KIND_LABELS[k]}</option>
          ))}
        </select>
        <button
          type="button"
          onClick={onRemove}
          className="ml-auto text-[11px] font-semibold bg-transparent text-red-600 border border-transparent rounded px-2 py-0.5 cursor-pointer hover:bg-red-50"
          aria-label={`Remove layer ${index + 1}`}
        >
          ✕
        </button>
      </div>
      <div className="flex items-center gap-2">
        {valueInput}
        <span className="text-[11px] text-text-tertiary">{unitLabel}</span>
      </div>
    </div>
  );
}

const labelCls = 'text-[12px] font-semibold text-text-secondary';
const helpCls = 'text-[11px] text-text-tertiary mt-0.5';

export default function AdjustLayerConfig({ data, onChange }: AdjustLayerConfigProps) {
  const layers = data.layers ?? [];

  const updateLayer = (index: number, patch: AdjustLayer) => {
    const next = layers.map((l, i) => (i === index ? patch : l));
    onChange({ layers: next });
  };

  const removeLayer = (index: number) => {
    onChange({ layers: layers.filter((_, i) => i !== index) });
  };

  const addLayer = () => {
    onChange({ layers: [...layers, defaultLayerForKind('brightness')] });
  };

  return (
    <div className="flex flex-col gap-3 px-4 py-3">
      {/* Source image path */}
      <div>
        <label htmlFor="adjust-layer-source-image-path" className={labelCls}>
          Source image path <span className="text-text-tertiary font-normal">(optional)</span>
        </label>
        <input
          id="adjust-layer-source-image-path"
          type="text"
          spellCheck={false}
          className="mt-1 w-full text-[12px] font-mono rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          value={data.sourceImagePath ?? ''}
          onChange={(e) => onChange({ sourceImagePath: e.target.value.trim() || undefined })}
          placeholder="$.scatter.parentImageId"
        />
        <div className={helpCls}>JSONPath to the imageId of the source image.</div>
        <SamplePills samples={SOURCE_IMAGE_SAMPLES} onSelect={(v) => onChange({ sourceImagePath: v })} />
      </div>

      {/* Layer stack editor */}
      <div>
        <div className={`${labelCls} mb-2`}>
          Adjustment layers <span className="text-text-tertiary font-normal">(applied top-to-bottom)</span>
        </div>
        {layers.length === 0 && (
          <div className="text-[11px] text-text-tertiary mb-2 italic">
            No layers configured — add at least one.
          </div>
        )}
        <div className="flex flex-col gap-1.5">
          {layers.map((layer, idx) => (
            <LayerCard
              key={idx}
              layer={layer}
              index={idx}
              onUpdate={(patch) => updateLayer(idx, patch)}
              onRemove={() => removeLayer(idx)}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={addLayer}
          className={`w-full text-[12px] font-semibold bg-surface-hover text-text-secondary border border-border rounded-md cursor-pointer py-1.5 px-3 ${layers.length > 0 ? 'mt-2' : ''}`}
          data-testid="add-layer-btn"
        >
          + Add layer
        </button>
      </div>
    </div>
  );
}
