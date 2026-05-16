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
        <div className="flex flex-col gap-1.5">
          {RADIO_OPTIONS.map(opt => (
            <label
              key={opt.value}
              className="flex items-center gap-1.5 text-[13px] text-text-primary cursor-pointer"
            >
              <input
                type="radio"
                name="transform-type"
                value={opt.value}
                checked={data.transformType === opt.value}
                onChange={() => onChange({ transformType: opt.value })}
              />
              {opt.label}
            </label>
          ))}
        </div>
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
        <input
          type="text"
          className="border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-inherit"
          value={data.outputKey ?? ''}
          onChange={(e) => onChange({ outputKey: e.target.value || undefined })}
          placeholder="activeItems"
        />
      </ConfigField>

      {/* Retry policy (hub#1289) */}
      <RetryPolicyEditor
        value={data.retryPolicy}
        onChange={(next) => onChange({ retryPolicy: next })}
      />

      {/* Preview area (not yet implemented) */}
      <ConfigField label="Preview">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <div className="text-[11px] text-text-tertiary mb-1">Sample input</div>
            <textarea
              disabled
              className="border border-border-field rounded-md px-2.5 py-1.5 text-[11px] bg-surface-inset text-text-tertiary outline-none w-full font-mono resize-y min-h-[80px]"
              placeholder='{ "items": [...] }'
            />
          </div>
          <div>
            <div className="text-[11px] text-text-tertiary mb-1">Sample output</div>
            <textarea
              disabled
              className="border border-border-field rounded-md px-2.5 py-1.5 text-[11px] bg-surface-inset text-text-tertiary outline-none w-full font-mono resize-y min-h-[80px]"
              placeholder="(preview not yet available)"
            />
          </div>
        </div>
      </ConfigField>
    </NodeConfigShell>
  );
}
