// frontend/src/components/pipelines/nodes/transform/TransformConfig.tsx
//
// Config panel for Transform nodes. See PIPELINES_PLAN.md §18.10.
//
// Radio for transform type (JSONPath / Template / JavaScript), a mono
// expression textarea, an optional outputKey, and a visual-only
// "sample input | sample output" preview area (not yet implemented).

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
  const expressionMissing = !data.expression?.trim();

  return (
    <NodeConfigShell>
      {/* Type */}
      <ConfigField label="Type" required>
        <RadioGroup
          name="transform-type"
          value={data.transformType}
          onChange={(transformType) => onChange({ transformType })}
          options={RADIO_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
          data-testid="transform-type"
        />
      </ConfigField>

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
        <CodeEditor
          value={data.expression}
          onChange={(next) => onChange({ expression: next })}
          language={data.transformType === 'javascript' ? 'javascript' : 'jsonpath'}
          variables={TRANSFORM_VARIABLES}
          aria-label="Transform expression"
        />
      </ConfigField>

      {/* Output key */}
      <ConfigField
        label="Output key (optional)"
        help={`If set, writes to context.${data.outputKey || 'outputKey'}. Otherwise merges into root context.`}
      >
        <Input
          size="sm"
          mono
          spellCheck={false}
          value={data.outputKey ?? ''}
          onChange={(e) => onChange({ outputKey: e.target.value || undefined })}
          placeholder="activeItems"
          aria-label="Output key"
        />
      </ConfigField>

      {/* Retry policy (hub#1289) */}
      <RetryPolicyEditor
        value={data.retryPolicy}
        onChange={(next) => onChange({ retryPolicy: next })}
      />

      {/* Preview is not implemented. It used to render as two permanently
          disabled <textarea>s, which read as input fields the user had failed
          to enable rather than as a feature that does not exist yet. */}
      <ConfigField label="Preview">
        <EmptyState
          title="Preview not available yet"
          body="Sample input and output for a transform will render here once the preview runner ships."
        />
      </ConfigField>
    </NodeConfigShell>
  );
}
