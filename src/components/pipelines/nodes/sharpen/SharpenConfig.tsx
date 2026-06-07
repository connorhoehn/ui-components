// src/components/pipelines/nodes/sharpen/SharpenConfig.tsx
//
// Config panel for image:sharpen.

import type { ImageSharpenNodeData } from '../../../../types/pipeline';
import { NodeConfigShell } from '../shared';

export interface SharpenConfigProps {
  data: ImageSharpenNodeData;
  onChange: (patch: Partial<ImageSharpenNodeData>) => void;
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

const inputCls = 'mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary';
const labelCls = 'text-[12px] font-semibold text-text-secondary';
const helpCls = 'text-[11px] text-text-tertiary mt-0.5';

export default function SharpenConfig({ data, onChange }: SharpenConfigProps) {
  return (
    <NodeConfigShell>
      {/* Source image path */}
      <div>
        <label htmlFor="sharpen-source-image-path" className={labelCls}>
          Source image path <span className="text-text-tertiary font-normal">(optional)</span>
        </label>
        <input
          id="sharpen-source-image-path"
          type="text"
          spellCheck={false}
          className={`${inputCls} font-mono`}
          value={data.sourceImagePath ?? ''}
          onChange={(e) => onChange({ sourceImagePath: e.target.value.trim() || undefined })}
          placeholder="$.trigger.imageRef"
        />
        <SamplePills samples={SOURCE_IMAGE_SAMPLES} onSelect={(v) => onChange({ sourceImagePath: v })} />
      </div>

      {/* Sigma */}
      <div>
        <label htmlFor="sharpen-sigma" className={labelCls}>
          Sigma <span className="text-text-tertiary font-normal">(optional, default 1)</span>
        </label>
        <input
          id="sharpen-sigma"
          type="number"
          min={0.01}
          max={10}
          step={0.1}
          className={inputCls}
          value={data.sigma ?? ''}
          onChange={(e) => {
            const v = parseFloat(e.target.value);
            onChange({ sigma: Number.isFinite(v) && v > 0 ? v : undefined });
          }}
          placeholder="1"
        />
        <div className={helpCls}>
          Gaussian mask sigma. Higher = broader/stronger sharpening. Typical range: 0.5–3.
        </div>
      </div>

      {/* m1 */}
      <div>
        <label htmlFor="sharpen-m1" className={labelCls}>
          m1 — flat area level <span className="text-text-tertiary font-normal">(optional)</span>
        </label>
        <input
          id="sharpen-m1"
          type="number"
          min={0}
          max={1000000}
          step={0.1}
          className={inputCls}
          value={data.m1 ?? ''}
          onChange={(e) => {
            const v = parseFloat(e.target.value);
            onChange({ m1: Number.isFinite(v) && v >= 0 ? v : undefined });
          }}
          placeholder="leave blank for default"
        />
        <div className={helpCls}>Level of sharpening applied to flat (smooth) areas of the image.</div>
      </div>

      {/* m2 */}
      <div>
        <label htmlFor="sharpen-m2" className={labelCls}>
          m2 — jagged area level <span className="text-text-tertiary font-normal">(optional)</span>
        </label>
        <input
          id="sharpen-m2"
          type="number"
          min={0}
          max={1000000}
          step={0.1}
          className={inputCls}
          value={data.m2 ?? ''}
          onChange={(e) => {
            const v = parseFloat(e.target.value);
            onChange({ m2: Number.isFinite(v) && v >= 0 ? v : undefined });
          }}
          placeholder="leave blank for default"
        />
        <div className={helpCls}>Level of sharpening applied to jagged (edge) areas of the image.</div>
      </div>
    </NodeConfigShell>
  );
}
