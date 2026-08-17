// src/components/pipelines/nodes/dimensions/DimensionsConfig.tsx
//
// Config panel for the image:dimensions node.

import type { ImageDimensionsNodeData } from '../../../../types/pipeline';
import { NodeConfigShell } from '../shared';
import { useUpstreamImageRefs } from '../../context/useUpstreamContext';

export interface DimensionsConfigProps {
  data: ImageDimensionsNodeData;
  onChange: (patch: Partial<ImageDimensionsNodeData>) => void;
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

const inputCls = 'mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 font-mono outline-none focus:border-primary focus:ring-1 focus:ring-primary';
const labelCls = 'text-[12px] font-semibold text-text-secondary';
const helpCls = 'text-[11px] text-text-tertiary mt-0.5';

export default function DimensionsConfig({ data, onChange, nodeId }: DimensionsConfigProps) {
  const imageRefOptions = useUpstreamImageRefs(nodeId ?? null);
  return (
    <NodeConfigShell>
      {/* Source image path */}
      <div>
        <label htmlFor="dimensions-source-image-path" className={labelCls}>
          Source image path <span className="text-text-tertiary font-normal">(optional)</span>
        </label>
        <input
          id="dimensions-source-image-path"
          type="text"
          spellCheck={false}
          className={inputCls}
          value={data.sourceImagePath ?? ''}
          onChange={(e) => onChange({ sourceImagePath: e.target.value.trim() || undefined })}
          placeholder="$.trigger.imageRef"
        />
        <SamplePills samples={imageRefOptions.map((o) => o.path)} onSelect={(v) => onChange({ sourceImagePath: v })} />
      </div>

      {/* Max edge */}
      <div>
        <label htmlFor="dimensions-max-edge" className={labelCls}>Max edge (px)</label>
        <input
          id="dimensions-max-edge"
          type="number"
          min={1}
          step={1}
          className={inputCls}
          value={data.maxEdge ?? 1024}
          onChange={(e) => {
            const v = parseInt(e.target.value, 10);
            onChange({ maxEdge: Number.isFinite(v) && v > 0 ? v : 1024 });
          }}
        />
        <div className={helpCls}>
          Longest-edge cap. The derived <code>genWidth</code>/<code>genHeight</code> are scaled to fit within this while preserving aspect ratio — wire them into <code>image:generate</code>.
        </div>
      </div>
    </NodeConfigShell>
  );
}
