// frontend/src/components/pipelines/nodes/fork/ForkConfig.tsx
//
// Config panel for Fork nodes. See PIPELINES_PLAN.md §18.10.
//
// branchCount is bounded to 2..8 (type-enforced in pipeline.ts). Each
// branch label is an optional free-form string; we keep the array sized
// to branchCount so downstream consumers can index safely.

import type { ForkNodeData } from '../../../../types/pipeline';
import { ConfigField } from '../shared';

export interface ForkConfigProps {
  data: ForkNodeData;
  onChange: (patch: Partial<ForkNodeData>) => void;
}

const MIN_BRANCHES = 2;
const MAX_BRANCHES = 8;

function resizeLabels(labels: string[] | undefined, count: number): string[] {
  const src = labels ?? [];
  if (src.length === count) return src;
  if (src.length > count) return src.slice(0, count);
  return [...src, ...Array<string>(count - src.length).fill('')];
}

export default function ForkConfig({ data, onChange }: ForkConfigProps) {
  const count = Math.max(MIN_BRANCHES, Math.min(MAX_BRANCHES, data.branchCount || MIN_BRANCHES));
  const labels = resizeLabels(data.branchLabels, count);

  const setBranchCount = (n: number) => {
    const clamped = Math.max(MIN_BRANCHES, Math.min(MAX_BRANCHES, n));
    onChange({
      branchCount: clamped,
      branchLabels: resizeLabels(data.branchLabels, clamped),
    });
  };

  const setLabel = (idx: number, value: string) => {
    const next = [...labels];
    next[idx] = value;
    onChange({ branchLabels: next });
  };

  return (
    <div className="flex flex-col gap-3 px-4 py-3">
      {/* Branch count */}
      <ConfigField
        label="Branch count"
        required
        help={`Between ${MIN_BRANCHES} and ${MAX_BRANCHES} parallel branches.`}
      >
        <span className="text-text-tertiary text-xs ml-2">{count}</span>
        <input
          type="range"
          min={MIN_BRANCHES}
          max={MAX_BRANCHES}
          step={1}
          value={count}
          onChange={(e) => setBranchCount(parseInt(e.target.value, 10))}
          className="w-full mt-1"
        />
        <input
          type="number"
          min={MIN_BRANCHES}
          max={MAX_BRANCHES}
          className="border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-20 font-inherit mt-1"
          value={count}
          onChange={(e) => setBranchCount(parseInt(e.target.value, 10) || MIN_BRANCHES)}
        />
      </ConfigField>

      {/* Branch labels */}
      <ConfigField label="Branch labels (optional)">
        <div className="flex flex-col gap-1.5">
          {labels.map((label, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="text-xs text-text-secondary min-w-[72px]">
                Branch {idx}:
              </span>
              <input
                type="text"
                className="border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none flex-1 min-w-[120px] font-inherit"
                value={label}
                onChange={(e) => setLabel(idx, e.target.value)}
                placeholder={idx === 0 ? 'primary' : `branch-${idx}`}
              />
            </div>
          ))}
        </div>
      </ConfigField>
    </div>
  );
}
