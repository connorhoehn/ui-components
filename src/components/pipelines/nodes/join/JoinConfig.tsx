// frontend/src/components/pipelines/nodes/join/JoinConfig.tsx
//
// Config panel for Join nodes. See PIPELINES_PLAN.md §18.10.
//
// Current-input count is computed at runtime from incoming edges; Phase 1
// renders a placeholder string so the layout matches the design.

import type { JoinNodeData, JoinMode, JoinMergeStrategy } from '../../../../types/pipeline';
import { ConfigField, NodeConfigShell } from '../shared';
import { RadioGroup } from '../../../forms/RadioGroup';
import { NumberInput } from '../../../forms/NumberInput';

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
    <NodeConfigShell>
      {/* Mode — a radio set plus its dependent count, i.e. several controls
          rather than one labelable element, so the field label names a group.
          htmlFor would have nothing valid to point at. */}
      <ConfigField
        label="Mode"
        required
        render={() => (
          <div role="group" aria-label="Mode">
            <RadioGroup
              name="join-mode"
              value={data.mode}
              onChange={(mode) => onChange({ mode })}
              options={MODE_OPTIONS.map((o) => ({
                value: o.value,
                label: o.label,
                description: o.hint,
              }))}
              data-testid="join-mode"
            />

            {data.mode === 'n_of_m' && (
              <div className="mt-2 flex items-center gap-2">
                <span className="text-[11px] font-semibold text-text-secondary">N</span>
                <NumberInput
                  size="sm"
                  min={1}
                  value={data.n ?? 1}
                  onChange={(n) => onChange({ n })}
                  aria-label="N"
                  data-testid="join-n"
                />
              </div>
            )}
          </div>
        )}
      />

      {/* Merge strategy */}
      <ConfigField
        label="Merge strategy"
        required
        render={() => (
          <div role="group" aria-label="Merge strategy">
            <RadioGroup
              name="join-merge"
              value={data.mergeStrategy}
              onChange={(mergeStrategy) => onChange({ mergeStrategy })}
              options={STRATEGY_OPTIONS.map((o) => ({
                value: o.value,
                label: o.label,
                description: o.hint,
              }))}
              data-testid="join-merge"
            />
          </div>
        )}
      />

      {/* Current inputs (read-only) */}
      <div className="p-2 bg-surface-inset border border-border rounded-md text-xs text-text-secondary">
        Current inputs: <strong>TBD</strong>
        <div className="text-[11px] text-text-tertiary mt-0.5">Derived from incoming edges once the canvas is connected.</div>
      </div>
    </NodeConfigShell>
  );
}
