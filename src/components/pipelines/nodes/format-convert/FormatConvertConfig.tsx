// src/components/pipelines/nodes/format-convert/FormatConvertConfig.tsx
//
// Config panel for image:format-convert.

import type { ImageFormatConvertNodeData, ImageFormat } from '../../../../types/pipeline';
import { NodeConfigShell } from '../shared';

export interface FormatConvertConfigProps {
  data: ImageFormatConvertNodeData;
  onChange: (patch: Partial<ImageFormatConvertNodeData>) => void;
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

const FORMAT_OPTIONS: { value: ImageFormat; label: string }[] = [
  { value: 'jpeg', label: 'JPEG' },
  { value: 'png',  label: 'PNG' },
  { value: 'webp', label: 'WebP' },
  { value: 'avif', label: 'AVIF' },
];

const inputCls = 'mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary';
const monoInputCls = `${inputCls} font-mono`;
const labelCls = 'text-[12px] font-semibold text-text-secondary';
const helpCls = 'text-[11px] text-text-tertiary mt-0.5';

export default function FormatConvertConfig({ data, onChange }: FormatConvertConfigProps) {
  const isLossyFormat = data.format === 'jpeg' || data.format === 'webp' || data.format === 'avif';

  return (
    <NodeConfigShell>
      {/* Source image path */}
      <div>
        <label htmlFor="format-convert-source-image-path" className={labelCls}>
          Source image path <span className="text-text-tertiary font-normal">(optional)</span>
        </label>
        <input
          id="format-convert-source-image-path"
          type="text"
          spellCheck={false}
          className={monoInputCls}
          value={data.sourceImagePath ?? ''}
          onChange={(e) => onChange({ sourceImagePath: e.target.value.trim() || undefined })}
          placeholder="$.trigger.imageRef"
        />
        <SamplePills samples={SOURCE_IMAGE_SAMPLES} onSelect={(v) => onChange({ sourceImagePath: v })} />
      </div>

      {/* Format */}
      <div>
        <label htmlFor="format-convert-format" className={labelCls}>Output format</label>
        <select
          id="format-convert-format"
          className={inputCls}
          value={data.format ?? 'jpeg'}
          onChange={(e) => onChange({ format: e.target.value as ImageFormat })}
        >
          {FORMAT_OPTIONS.map((f) => (
            <option key={f.value} value={f.value}>{f.label}</option>
          ))}
        </select>
      </div>

      {/* Quality (lossy formats) */}
      {isLossyFormat && (
        <div>
          <label htmlFor="format-convert-quality" className={labelCls}>
            Quality <span className="text-text-tertiary font-normal">(1–100, default 80)</span>
          </label>
          <input
            id="format-convert-quality"
            type="number"
            min={1}
            max={100}
            step={1}
            className={inputCls}
            value={data.quality ?? 80}
            onChange={(e) => {
              const v = parseInt(e.target.value, 10);
              onChange({ quality: Number.isFinite(v) ? Math.min(100, Math.max(1, v)) : 80 });
            }}
          />
          <div className={helpCls}>Higher = better quality, larger file. 80 is a good default.</div>
        </div>
      )}

      {/* Lossless (webp/avif only) */}
      {(data.format === 'webp' || data.format === 'avif') && (
        <div>
          <label htmlFor="format-convert-lossless" className="flex items-center gap-2 text-[12px] font-semibold text-text-secondary cursor-pointer">
            <input
              id="format-convert-lossless"
              type="checkbox"
              checked={data.lossless ?? false}
              onChange={(e) => onChange({ lossless: e.target.checked })}
              className="w-3.5 h-3.5 accent-primary"
            />
            Lossless encoding
          </label>
          <div className={helpCls}>
            Overrides quality when enabled. Produces larger files with no compression artefacts.
          </div>
        </div>
      )}

      {/* Strip metadata */}
      <div>
        <label htmlFor="format-convert-strip-metadata" className="flex items-center gap-2 text-[12px] font-semibold text-text-secondary cursor-pointer">
          <input
            id="format-convert-strip-metadata"
            type="checkbox"
            checked={data.stripMetadata ?? false}
            onChange={(e) => onChange({ stripMetadata: e.target.checked })}
            className="w-3.5 h-3.5 accent-primary"
          />
          Strip EXIF and metadata
        </label>
        <div className={helpCls}>
          Removes camera EXIF, GPS, copyright tags etc. Reduces file size; recommended for web delivery.
        </div>
      </div>
    </NodeConfigShell>
  );
}
