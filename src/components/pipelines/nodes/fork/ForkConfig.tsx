// frontend/src/components/pipelines/nodes/fork/ForkConfig.tsx
//
// Config panel for Fork nodes. See PIPELINES_PLAN.md §18.10.
//
// branchCount is bounded to 2..8 (type-enforced in pipeline.ts). Each
// branch label is an optional free-form string; we keep the array sized
// to branchCount so downstream consumers can index safely.

import { useId } from 'react';
import type { ForkNodeData } from '../../../../types/pipeline';
import { ConfigField, NodeConfigShell } from '../shared';
import { Input } from '../../../forms/Input';
import { NumberInput } from '../../../forms/NumberInput';
import { Slider } from '../../../forms/Slider';

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
  const uid = useId();
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
    <NodeConfigShell>
      {/* Branch count — the slider and the number box are two editors of ONE
          value, so this stays an htmlFor association pointed at the number box
          rather than a role="group": there is no set of distinct settings here
          to group. The slider keeps its own name because <Slider> takes no
          `id`, and it is the same name because it edits the same thing. */}
      <ConfigField
        label="Branch count"
        required
        help={`Between ${MIN_BRANCHES} and ${MAX_BRANCHES} parallel branches.`}
        controlId={`${uid}-branch-count`}
        render={({ controlId, describedById }) => (
          <>
            <Slider
              min={MIN_BRANCHES}
              max={MAX_BRANCHES}
              step={1}
              value={count}
              onChange={setBranchCount}
              aria-label="Branch count"
              data-testid="fork-branch-slider"
            />
            <NumberInput
              size="sm"
              min={MIN_BRANCHES}
              max={MAX_BRANCHES}
              value={count}
              onChange={setBranchCount}
              id={controlId}
              aria-describedby={describedById}
              data-testid="fork-branch-count"
            />
          </>
        )}
      />

      {/* Branch labels — a set of per-branch inputs, each already carrying its
          own name, so the field label names the GROUP instead of trying to
          name one control. */}
      <ConfigField
        label="Branch labels (optional)"
        render={({ labelId }) => (
          <div
            role="group"
            aria-labelledby={labelId}
            className="flex flex-col gap-1.5"
          >
            {labels.map((label, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="text-xs text-text-secondary min-w-[72px]">
                  Branch {idx}:
                </span>
                <Input
                  size="sm"
                  value={label}
                  onChange={(e) => setLabel(idx, e.target.value)}
                  placeholder={idx === 0 ? 'primary' : `branch-${idx}`}
                  aria-label={`Branch ${idx} label`}
                />
              </div>
            ))}
          </div>
        )}
      />
    </NodeConfigShell>
  );
}
