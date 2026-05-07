// frontend/src/components/pipelines/nodes/join/JoinConfig.tsx
//
// Config panel for Join nodes. See PIPELINES_PLAN.md §18.10.
//
// Current-input count is computed at runtime from incoming edges; Phase 1
// renders a placeholder string so the layout matches the design.

import type { JoinNodeData, JoinMode, JoinMergeStrategy } from '../../../../types/pipeline';
import { ConfigField } from '../shared';

export interface JoinConfigProps {
  data: JoinNodeData;
  onChange: (patch: Partial<JoinNodeData>) => void;
}

const MODE_OPTIONS: Array<{ value: JoinMode; label: string; hint: string }> = [
  { value: 'all',    label: 'All',     hint: 'Wait for every input.' },
  { value: 'any',    label: 'Any',     hint: 'Fire on the first input.' },
  { value: 'n_of_m', label: 'N of M',  hint: 'Fire after N inputs.' },
];

const STRATEGY_OPTIONS: Array<{ value: JoinMergeStrategy; label: string; hint: string }> = [
  { value: 'deep-merge',        label: 'Deep merge',        hint: 'Recursively merge input objects.' },
  { value: 'array-collect',     label: 'Array collect',     hint: 'Writes inputs to context.joinInputs[].' },
  { value: 'last-writer-wins',  label: 'Last writer wins',  hint: 'Most recent input replaces prior.' },
];

export default function JoinConfig({ data, onChange }: JoinConfigProps) {
  return (
    <div className="flex flex-col gap-3 px-4 py-3">
      {/* Mode */}
      <ConfigField label="Mode" required>
        <div className="flex flex-col gap-1.5">
          {MODE_OPTIONS.map(opt => (
            <label
              key={opt.value}
              className="flex items-center gap-1.5 text-[13px] text-text-primary cursor-pointer"
            >
              <input
                type="radio"
                name="join-mode"
                checked={data.mode === opt.value}
                onChange={() => onChange({ mode: opt.value })}
              />
              {opt.label}
              <span className="text-text-tertiary text-[11px]">— {opt.hint}</span>
            </label>
          ))}
        </div>

        {data.mode === 'n_of_m' && (
          <div className="mt-2 flex items-center gap-2">
            <label className="text-[11px] font-semibold text-text-secondary">N</label>
            <input
              type="number"
              min={1}
              className="border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-20 font-inherit"
              value={data.n ?? 1}
              onChange={(e) => onChange({ n: Math.max(1, parseInt(e.target.value, 10) || 1) })}
            />
          </div>
        )}
      </ConfigField>

      {/* Merge strategy */}
      <ConfigField label="Merge strategy" required>
        <div className="flex flex-col gap-1.5">
          {STRATEGY_OPTIONS.map(opt => (
            <label
              key={opt.value}
              className="flex items-center gap-1.5 text-[13px] text-text-primary cursor-pointer"
            >
              <input
                type="radio"
                name="join-merge"
                checked={data.mergeStrategy === opt.value}
                onChange={() => onChange({ mergeStrategy: opt.value })}
              />
              {opt.label}
              <span className="text-text-tertiary text-[11px]">— {opt.hint}</span>
            </label>
          ))}
        </div>
      </ConfigField>

      {/* Current inputs (read-only) */}
      <div className="p-2 bg-surface-inset border border-border rounded-md text-xs text-text-secondary">
        Current inputs: <strong>TBD</strong>
        <div className="text-[11px] text-text-tertiary mt-0.5">Derived from incoming edges once the canvas is connected.</div>
      </div>
    </div>
  );
}
