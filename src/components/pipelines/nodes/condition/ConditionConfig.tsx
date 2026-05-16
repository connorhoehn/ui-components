// frontend/src/components/pipelines/nodes/condition/ConditionConfig.tsx
//
// Config panel for Condition nodes. See PIPELINES_PLAN.md §18.10.
//
// Single-expression boolean branch. The optional label is surfaced on the
// node face on the canvas so the author can distinguish multiple branches.

import type { ConditionNodeData } from '../../../../types/pipeline';
import { ConfigField, NodeConfigShell } from '../shared';
import CodeEditor from '../../../shared/CodeEditor';

export interface ConditionConfigProps {
  data: ConditionNodeData;
  onChange: (patch: Partial<ConditionNodeData>) => void;
}

// Variables visible to boolean condition expressions.
const CONDITION_VARIABLES = ['context.trigger', 'context.steps'];

export default function ConditionConfig({ data, onChange }: ConditionConfigProps) {
  const expressionMissing = !data.expression?.trim();

  return (
    <NodeConfigShell>
      <ConfigField
        label="Expression"
        required
        error={expressionMissing ? 'Expression is required.' : undefined}
        help={!expressionMissing ? 'e.g. context.llm.response.length > 500' : undefined}
      >
        <CodeEditor
          value={data.expression}
          onChange={(next) => onChange({ expression: next })}
          language="javascript"
          variables={CONDITION_VARIABLES}
          aria-label="Condition expression"
        />
      </ConfigField>

      <ConfigField label="Label (optional — shown on node face)" help="A short name so this branch is easy to spot.">
        <input
          type="text"
          className="border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-inherit"
          value={data.label ?? ''}
          onChange={(e) => onChange({ label: e.target.value || undefined })}
          placeholder="Long summary?"
        />
      </ConfigField>

      <button
        type="button"
        onClick={() => { /* Phase 1 stub — wired in Phase 3 */ }}
        className="px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-inherit shrink-0"
      >
        ▶ Preview with sample context
      </button>
    </NodeConfigShell>
  );
}
