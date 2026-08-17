// src/components/pipelines/nodes/upscale/UpscaleConfig.tsx
//
// Config panel for the image:upscale node.

import type { ImageUpscaleNodeData } from '../../../../types/pipeline';
import { NodeConfigShell } from '../shared';
import { useUpstreamImageRefs } from '../../context/useUpstreamContext';

export interface UpscaleConfigProps {
  data: ImageUpscaleNodeData;
  onChange: (patch: Partial<ImageUpscaleNodeData>) => void;
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
const monoInputCls = `${inputCls} font-mono`;
const labelCls = 'text-[12px] font-semibold text-text-secondary';
const helpCls = 'text-[11px] text-text-tertiary mt-0.5';

export default function UpscaleConfig({ data, onChange, nodeId }: UpscaleConfigProps) {
  const imageRefOptions = useUpstreamImageRefs(nodeId ?? null);
  return (
    <NodeConfigShell>
      {/* Prompt */}
      <div>
        <label htmlFor="upscale-prompt" className={labelCls}>
          Prompt <span className="text-text-tertiary font-normal">(optional)</span>
        </label>
        <textarea
          id="upscale-prompt"
          rows={3}
          spellCheck={false}
          className={`${inputCls} resize-y min-h-16`}
          value={data.prompt ?? ''}
          onChange={(e) => onChange({ prompt: e.target.value.trim() ? e.target.value : undefined })}
          placeholder="optional guidance forwarded to the upscaler"
        />
        <div className={helpCls}>Optional text guidance forwarded to the self-hosted x4 upscaler.</div>
      </div>

      {/* Max edge */}
      <div>
        <label htmlFor="upscale-max-edge" className={labelCls}>Max edge (px)</label>
        <input
          id="upscale-max-edge"
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
        <div className={helpCls}>Longest-edge cap applied before the 4× super-resolution pass.</div>
      </div>

      {/* Source image path */}
      <div>
        <label htmlFor="upscale-source-image-path" className={labelCls}>
          Source image path <span className="text-text-tertiary font-normal">(optional)</span>
        </label>
        <input
          id="upscale-source-image-path"
          type="text"
          spellCheck={false}
          className={monoInputCls}
          value={data.sourceImagePath ?? ''}
          onChange={(e) => onChange({ sourceImagePath: e.target.value.trim() || undefined })}
          placeholder="$.trigger.imageRef"
        />
        <SamplePills samples={imageRefOptions.map((o) => o.path)} onSelect={(v) => onChange({ sourceImagePath: v })} />
      </div>
    </NodeConfigShell>
  );
}
