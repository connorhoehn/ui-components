// src/components/pipelines/nodes/variation/VariationConfig.tsx
//
// Config panel for image:variation (Nova Canvas).

import type { ImageVariationNodeData } from '../../../../types/pipeline';
import { NodeConfigShell } from '../shared';
import { useUpstreamImageRefs } from '../../context/useUpstreamContext';

export interface VariationConfigProps {
  data: ImageVariationNodeData;
  onChange: (patch: Partial<ImageVariationNodeData>) => void;
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

const MODEL_OPTIONS = [
  { value: 'amazon.nova-canvas-v1:0', label: 'Nova Canvas v1 (default)' },
];

const inputCls = 'mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary';
const monoInputCls = `${inputCls} font-mono`;
const labelCls = 'text-[12px] font-semibold text-text-secondary';
const helpCls = 'text-[11px] text-text-tertiary mt-0.5';

export default function VariationConfig({ data, onChange, nodeId }: VariationConfigProps) {
  const imageRefOptions = useUpstreamImageRefs(nodeId ?? null);
  return (
    <NodeConfigShell>
      {/* Source image path */}
      <div>
        <label htmlFor="variation-source-image-path" className={labelCls}>
          Source image path <span className="text-text-tertiary font-normal">(optional)</span>
        </label>
        <input
          id="variation-source-image-path"
          type="text"
          spellCheck={false}
          className={monoInputCls}
          value={data.sourceImagePath ?? ''}
          onChange={(e) => onChange({ sourceImagePath: e.target.value.trim() || undefined })}
          placeholder="$.trigger.imageRef"
        />
        <SamplePills samples={imageRefOptions.map((o) => o.path)} onSelect={(v) => onChange({ sourceImagePath: v })} />
      </div>

      {/* Model */}
      <div>
        <label htmlFor="variation-model" className={labelCls}>Model</label>
        <select
          id="variation-model"
          className={inputCls}
          value={data.model ?? 'amazon.nova-canvas-v1:0'}
          onChange={(e) => onChange({ model: e.target.value })}
        >
          {MODEL_OPTIONS.map((m) => (
            <option key={m.value} value={m.value}>{m.label}</option>
          ))}
        </select>
      </div>

      {/* numVariations */}
      <div>
        <label htmlFor="variation-num-variations" className={labelCls}>
          Number of variations <span className="text-text-tertiary font-normal">(fan-out)</span>
        </label>
        <input
          id="variation-num-variations"
          type="number"
          min={1}
          max={8}
          step={1}
          className={inputCls}
          value={data.numVariations ?? 1}
          onChange={(e) => {
            const v = parseInt(e.target.value, 10);
            onChange({ numVariations: Number.isFinite(v) && v >= 1 ? Math.min(8, v) : 1 });
          }}
        />
        <div className={helpCls}>Always fans out — each variation becomes a separate arm downstream.</div>
      </div>

      {/* Similarity */}
      <div>
        <label htmlFor="variation-similarity" className={labelCls}>
          Similarity <span className="text-text-tertiary font-normal">(0.0–1.0, default 0.7)</span>
        </label>
        <input
          id="variation-similarity"
          type="number"
          min={0}
          max={1}
          step={0.05}
          className={inputCls}
          value={data.similarity ?? 0.7}
          onChange={(e) => {
            const v = parseFloat(e.target.value);
            onChange({ similarity: Number.isFinite(v) ? Math.min(1, Math.max(0, v)) : 0.7 });
          }}
        />
        <div className={helpCls}>0 = very different, 1 = nearly identical. 0.7 is a good starting point.</div>
      </div>
    </NodeConfigShell>
  );
}
