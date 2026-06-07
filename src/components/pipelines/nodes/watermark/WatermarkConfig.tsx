// src/components/pipelines/nodes/watermark/WatermarkConfig.tsx
//
// Config panel for image:watermark.

import type { ImageWatermarkNodeData, WatermarkGravity } from '../../../../types/pipeline';
import { NodeConfigShell } from '../shared';

export interface WatermarkConfigProps {
  data: ImageWatermarkNodeData;
  onChange: (patch: Partial<ImageWatermarkNodeData>) => void;
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

const GRAVITY_OPTIONS: WatermarkGravity[] = [
  'northwest', 'north', 'northeast',
  'west', 'center', 'east',
  'southwest', 'south', 'southeast',
];

const inputCls = 'mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary';
const monoInputCls = `${inputCls} font-mono`;
const labelCls = 'text-[12px] font-semibold text-text-secondary';
const helpCls = 'text-[11px] text-text-tertiary mt-0.5';

export default function WatermarkConfig({ data, onChange }: WatermarkConfigProps) {
  return (
    <NodeConfigShell>
      {/* Source image path */}
      <div>
        <label htmlFor="watermark-source-image-path" className={labelCls}>
          Source image path <span className="text-text-tertiary font-normal">(optional)</span>
        </label>
        <input
          id="watermark-source-image-path"
          type="text"
          spellCheck={false}
          className={monoInputCls}
          value={data.sourceImagePath ?? ''}
          onChange={(e) => onChange({ sourceImagePath: e.target.value.trim() || undefined })}
          placeholder="$.trigger.imageRef"
        />
        <SamplePills samples={SOURCE_IMAGE_SAMPLES} onSelect={(v) => onChange({ sourceImagePath: v })} />
      </div>

      {/* Overlay image id */}
      <div>
        <label htmlFor="watermark-overlay-image-id" className={labelCls}>Overlay image ID</label>
        <input
          id="watermark-overlay-image-id"
          type="text"
          spellCheck={false}
          className={monoInputCls}
          value={data.overlayImageId ?? ''}
          onChange={(e) => onChange({ overlayImageId: e.target.value.trim() })}
          placeholder="img_xxxxxxxx"
        />
        <div className={helpCls}>
          The imageId of the watermark/overlay image already stored in the blob store. Required.
        </div>
      </div>

      {/* Gravity */}
      <div>
        <label htmlFor="watermark-gravity" className={labelCls}>Gravity (placement)</label>
        <select
          id="watermark-gravity"
          className={inputCls}
          value={data.gravity ?? 'southeast'}
          onChange={(e) => onChange({ gravity: e.target.value as WatermarkGravity })}
        >
          {GRAVITY_OPTIONS.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
        <div className={helpCls}>Where the overlay is placed on the source image. Default: southeast.</div>
      </div>

      {/* Opacity */}
      <div>
        <label htmlFor="watermark-opacity" className={labelCls}>
          Opacity <span className="text-text-tertiary font-normal">(0.0–1.0, default 1.0)</span>
        </label>
        <input
          id="watermark-opacity"
          type="number"
          min={0}
          max={1}
          step={0.05}
          className={inputCls}
          value={data.opacity ?? 1}
          onChange={(e) => {
            const v = parseFloat(e.target.value);
            onChange({ opacity: Number.isFinite(v) ? Math.min(1, Math.max(0, v)) : 1 });
          }}
        />
      </div>

      {/* Offsets */}
      <div className="flex gap-2">
        <div className="flex-1">
          <label htmlFor="watermark-offset-x" className={labelCls}>Offset X (px)</label>
          <input
            id="watermark-offset-x"
            type="number"
            step={1}
            className={inputCls}
            value={data.offsetX ?? ''}
            onChange={(e) => {
              const v = parseInt(e.target.value, 10);
              onChange({ offsetX: Number.isFinite(v) ? v : undefined });
            }}
            placeholder="0"
          />
        </div>
        <div className="flex-1">
          <label htmlFor="watermark-offset-y" className={labelCls}>Offset Y (px)</label>
          <input
            id="watermark-offset-y"
            type="number"
            step={1}
            className={inputCls}
            value={data.offsetY ?? ''}
            onChange={(e) => {
              const v = parseInt(e.target.value, 10);
              onChange({ offsetY: Number.isFinite(v) ? v : undefined });
            }}
            placeholder="0"
          />
        </div>
      </div>
    </NodeConfigShell>
  );
}
