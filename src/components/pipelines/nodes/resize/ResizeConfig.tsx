// src/components/pipelines/nodes/resize/ResizeConfig.tsx
//
// Config panel for the image:resize node.

import type { ImageResizeNodeData, ResizeFit } from '../../../../types/pipeline';

export interface ResizeConfigProps {
  data: ImageResizeNodeData;
  onChange: (patch: Partial<ImageResizeNodeData>) => void;
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

const FIT_OPTIONS: ResizeFit[] = ['cover', 'contain', 'fill', 'inside', 'outside'];

const inputCls = 'mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 font-mono outline-none focus:border-primary focus:ring-1 focus:ring-primary';
const labelCls = 'text-[12px] font-semibold text-text-secondary';
const helpCls = 'text-[11px] text-text-tertiary mt-0.5';

export default function ResizeConfig({ data, onChange }: ResizeConfigProps) {
  return (
    <div className="flex flex-col gap-3 px-4 py-3">
      {/* Source image path */}
      <div>
        <label htmlFor="resize-source-image-path" className={labelCls}>
          Source image path <span className="text-text-tertiary font-normal">(optional)</span>
        </label>
        <input
          id="resize-source-image-path"
          type="text"
          spellCheck={false}
          className={inputCls}
          value={data.sourceImagePath ?? ''}
          onChange={(e) => onChange({ sourceImagePath: e.target.value.trim() || undefined })}
          placeholder="$.trigger.imageRef"
        />
        <SamplePills samples={SOURCE_IMAGE_SAMPLES} onSelect={(v) => onChange({ sourceImagePath: v })} />
      </div>

      {/* Width / Height */}
      <div className="flex gap-2">
        <div className="flex-1">
          <label htmlFor="resize-width" className={labelCls}>Width (px)</label>
          <input
            id="resize-width"
            type="number"
            min={1}
            step={1}
            className={inputCls}
            value={data.width ?? ''}
            onChange={(e) => {
              const v = parseInt(e.target.value, 10);
              onChange({ width: Number.isFinite(v) && v > 0 ? v : undefined });
            }}
            placeholder="e.g. 512"
          />
        </div>
        <div className="flex-1">
          <label htmlFor="resize-height" className={labelCls}>Height (px)</label>
          <input
            id="resize-height"
            type="number"
            min={1}
            step={1}
            className={inputCls}
            value={data.height ?? ''}
            onChange={(e) => {
              const v = parseInt(e.target.value, 10);
              onChange({ height: Number.isFinite(v) && v > 0 ? v : undefined });
            }}
            placeholder="e.g. 512"
          />
        </div>
      </div>

      {/* Fit mode */}
      <div>
        <label htmlFor="resize-fit" className={labelCls}>Fit mode</label>
        <select
          id="resize-fit"
          className={inputCls}
          value={data.fit ?? 'cover'}
          onChange={(e) => onChange({ fit: e.target.value as ResizeFit })}
        >
          {FIT_OPTIONS.map((f) => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>
        <div className={helpCls}>
          How the image is fit into the target dimensions. <code>cover</code> (default) crops; <code>contain</code> letterboxes; <code>fill</code> stretches.
        </div>
      </div>

      {/* Without enlargement */}
      <label htmlFor="resize-without-enlargement" className="flex items-center gap-2 text-[12px] font-semibold text-text-secondary cursor-pointer">
        <input
          id="resize-without-enlargement"
          type="checkbox"
          checked={data.withoutEnlargement ?? false}
          onChange={(e) => onChange({ withoutEnlargement: e.target.checked })}
          className="w-3.5 h-3.5 accent-primary"
        />
        Do not enlarge if already smaller than target
      </label>

      {/* Background colour */}
      <div>
        <label htmlFor="resize-background" className={labelCls}>
          Background colour <span className="text-text-tertiary font-normal">(optional, for contain / fill)</span>
        </label>
        <input
          id="resize-background"
          type="text"
          spellCheck={false}
          className={inputCls}
          value={data.background ?? ''}
          onChange={(e) => onChange({ background: e.target.value.trim() || undefined })}
          placeholder="#ffffff"
        />
        <div className={helpCls}>
          Hex colour used to fill letterbox padding. Only applies when fit is <code>contain</code> or <code>fill</code>.
        </div>
      </div>
    </div>
  );
}
