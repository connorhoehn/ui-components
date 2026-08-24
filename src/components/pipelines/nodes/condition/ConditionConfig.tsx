// frontend/src/components/pipelines/nodes/condition/ConditionConfig.tsx
//
// Config panel for Condition nodes. See PIPELINES_PLAN.md §18.10.
//
// Single-expression boolean branch. The optional label is surfaced on the
// node face on the canvas so the author can distinguish multiple branches.
//
// A primary-styled "Preview with sample context" button used to sit at the
// bottom with an empty onClick — a Phase 1 stub that was never wired up. It
// looked like a real action and did nothing at all when clicked, so it is
// removed rather than left advertising a feature that does not exist.

import { useId } from 'react';
import type { ConditionNodeData } from '../../../../types/pipeline';
import { ConfigField, NodeConfigShell } from '../shared';
import CodeEditor from '../../../shared/CodeEditor';
import { Input } from '../../../forms/Input';

export interface ConditionConfigProps {
  data: ConditionNodeData;
  onChange: (patch: Partial<ConditionNodeData>) => void;
}

// Variables visible to boolean condition expressions.
const CONDITION_VARIABLES = ['context.trigger', 'context.steps'];

export default function ConditionConfig({ data, onChange }: ConditionConfigProps) {
  const uid = useId();
  const expressionMissing = !data.expression?.trim();

  return (
    <NodeConfigShell>
      <ConfigField
        label="Expression"
        required
        error={expressionMissing ? 'Expression is required.' : undefined}
        help={!expressionMissing ? 'e.g. context.llm.response.length > 500' : undefined}
      >
        {/* CodeEditor accepts no `id`, so ConfigField's htmlFor has nothing to
            point at here. The next best thing is a single name that matches the
            visible label verbatim: this used to announce as "Condition
            expression", a second, different name for the field on screen. */}
        <CodeEditor
          value={data.expression}
          onChange={(next) => onChange({ expression: next })}
          language="javascript"
          variables={CONDITION_VARIABLES}
          aria-label="Expression"
        />
      </ConfigField>

      <ConfigField
        label="Label (optional — shown on node face)"
        help="A short name so this branch is easy to spot."
        controlId={`${uid}-label`}
        render={({ controlId, describedById }) => (
          <Input
            size="sm"
            id={controlId}
            aria-describedby={describedById}
            value={data.label ?? ''}
            onChange={(e) => onChange({ label: e.target.value || undefined })}
            placeholder="Long summary?"
          />
        )}
      />
    </NodeConfigShell>
  );
}
