// frontend/src/components/pipelines/nodes/transform/TransformConfig.tsx
//
// Config panel for Transform nodes. See PIPELINES_PLAN.md §18.10.
//
// Radio for transform type (JSONPath / Template / JavaScript), a mono
// expression textarea, an optional outputKey, and a visual-only
// "sample input | sample output" preview area (not yet implemented).

import { useId } from 'react';
import type { TransformNodeData, TransformType } from '../../../../types/pipeline';
import { ConfigField, NodeConfigShell } from '../shared';
import CodeEditor from '../../../shared/CodeEditor';
import RetryPolicyEditor from '../RetryPolicyEditor';
import { Input } from '../../../forms/Input';
import EmptyState from '../../../shared/EmptyState';
import { RadioGroup } from '../../../forms/RadioGroup';

export interface TransformConfigProps {
  data: TransformNodeData;
  onChange: (patch: Partial<TransformNodeData>) => void;
}

// Variables available to Transform expressions. Rendered as clickable pills
// above the CodeEditor so authors can insert without typing dot paths by hand.
const TRANSFORM_VARIABLES = ['context', 'context.steps', 'context.trigger'];

const RADIO_OPTIONS: Array<{ value: TransformType; label: string }> = [
  { value: 'jsonpath',   label: 'JSONPath' },
  { value: 'template',   label: 'Template' },
  { value: 'javascript', label: 'JavaScript' },
];

export default function TransformConfig({ data, onChange }: TransformConfigProps) {
  const uid = useId();
  const expressionMissing = !data.expression?.trim();

  return (
    <NodeConfigShell>
      {/* Type — a radio set, so the label names a group rather than one
          control; htmlFor cannot point at a radio group. */}
      <ConfigField
        label="Type"
        required
        render={() => (
          <div role="group" aria-label="Type">
            <RadioGroup
              name="transform-type"
              value={data.transformType}
              onChange={(transformType) => onChange({ transformType })}
              options={RADIO_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
              data-testid="transform-type"
            />
          </div>
        )}
      />

      {/* Expression */}
      <ConfigField
        label="Expression"
        required
        error={expressionMissing ? 'Expression is required.' : undefined}
        help={!expressionMissing ? (
          data.transformType === 'jsonpath'   ? 'e.g. $.items[?(@.status == "active")]' :
          data.transformType === 'template'   ? 'Mustache-style: {{ context.doc.title }}' :
          data.transformType === 'javascript' ? 'return ctx.items.filter(x => x.active)' :
          undefined
        ) : undefined}
      >
        {/* CodeEditor accepts no `id`, so ConfigField's htmlFor has nothing to
            point at. One name, matching the visible label verbatim — it used to
            announce as "Transform expression" while the screen said
            "Expression". */}
        <CodeEditor
          value={data.expression}
          onChange={(next) => onChange({ expression: next })}
          language={data.transformType === 'javascript' ? 'javascript' : 'jsonpath'}
          variables={TRANSFORM_VARIABLES}
          aria-label="Expression"
        />
      </ConfigField>

      {/* Output key */}
      <ConfigField
        label="Output key (optional)"
        help={`If set, writes to context.${data.outputKey || 'outputKey'}. Otherwise merges into root context.`}
        controlId={`${uid}-output-key`}
        render={({ controlId, describedById }) => (
          <Input
            size="sm"
            mono
            spellCheck={false}
            id={controlId}
            aria-describedby={describedById}
            value={data.outputKey ?? ''}
            onChange={(e) => onChange({ outputKey: e.target.value || undefined })}
            placeholder="activeItems"
          />
        )}
      />

      {/* Retry policy (hub#1289) */}
      <RetryPolicyEditor
        value={data.retryPolicy}
        onChange={(next) => onChange({ retryPolicy: next })}
      />

      {/* Preview is not implemented. It used to render as two permanently
          disabled <textarea>s, which read as input fields the user had failed
          to enable rather than as a feature that does not exist yet. */}
      {/* Deliberately NOT wired: there is no control here to name — EmptyState
          is static copy. Adding a role="group" would announce an interactive
          grouping that contains nothing to interact with. */}
      <ConfigField label="Preview">
        <EmptyState
          title="Preview not available yet"
          body="Sample input and output for a transform will render here once the preview runner ships."
        />
      </ConfigField>
    </NodeConfigShell>
  );
}
