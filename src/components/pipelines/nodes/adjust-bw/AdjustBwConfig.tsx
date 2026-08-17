// src/components/pipelines/nodes/adjust-bw/AdjustBwConfig.tsx
//
// Config panel for the image:adjust-bw node.

import type { ImageAdjustBwNodeData } from '../../../../types/pipeline';
import { NodeConfigShell } from '../shared';
import { useUpstreamImageRefs } from '../../context/useUpstreamContext';

export interface AdjustBwConfigProps {
  data: ImageAdjustBwNodeData;
  onChange: (patch: Partial<ImageAdjustBwNodeData>) => void;
  /** Node being edited; derives real upstream image refs. */
  nodeId?: string;
}

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

export default function AdjustBwConfig({ data, onChange, nodeId }: AdjustBwConfigProps) {
  const imageRefOptions = useUpstreamImageRefs(nodeId ?? null);
  const algorithm = data.algorithm ?? 'luminosity';
  const contrast = data.contrast ?? 1;

  return (
    <NodeConfigShell>
      {/* Source image path */}
      <div>
        <label htmlFor="adjust-bw-source-image-path" className={labelCls}>
          Source image path <span className="text-text-tertiary font-normal">(optional)</span>
        </label>
        <input
          id="adjust-bw-source-image-path"
          type="text"
          spellCheck={false}
          className={`${inputCls} font-mono`}
          value={data.sourceImagePath ?? ''}
          onChange={(e) => onChange({ sourceImagePath: e.target.value.trim() || undefined })}
          placeholder="$.scatter.parentImageId"
        />
        <div className={helpCls}>
          JSONPath to the imageId of the source image.
        </div>
        <SamplePills samples={imageRefOptions.map((o) => o.path)} onSelect={(v) => onChange({ sourceImagePath: v })} />
      </div>

      {/* Algorithm */}
      <div>
        <label htmlFor="adjust-bw-algorithm" className={labelCls}>Greyscale algorithm</label>
        <select
          id="adjust-bw-algorithm"
          className={inputCls}
          value={algorithm}
          onChange={(e) => onChange({ algorithm: e.target.value as ImageAdjustBwNodeData['algorithm'] })}
        >
          <option value="luminosity">Luminosity — 0.21R + 0.72G + 0.07B (perceptually accurate)</option>
          <option value="average">Average — (R+G+B)/3 (fast, flat)</option>
          <option value="desaturate">Desaturate — (max+min)/2 (Lightness channel)</option>
        </select>
        <div className={helpCls}>Controls how RGB channels are weighted when converting to greyscale.</div>
      </div>

      {/* Contrast */}
      <div>
        <label htmlFor="adjust-bw-contrast" className={labelCls}>
          Contrast multiplier <span className="text-text-tertiary font-normal">(default: 1)</span>
        </label>
        <input
          id="adjust-bw-contrast"
          type="number"
          min={0}
          max={4}
          step={0.05}
          className="mt-1 w-28 text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          value={contrast}
          onChange={(e) => {
            const v = parseFloat(e.target.value);
            onChange({ contrast: Number.isFinite(v) ? Math.max(0, v) : 1 });
          }}
        />
        <div className={helpCls}>
          Applied after greyscale conversion. 1 = no change, {'<'}1 = lower contrast,{' >'}1 = higher contrast. Range 0–4.
        </div>
      </div>
    </NodeConfigShell>
  );
}
