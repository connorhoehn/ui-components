// src/components/pipelines/nodes/memory/MemoryConfig.tsx
//
// Config panel for the memory node (AgentCore Memory read/write).
//
// The executor has supported this node for a while, but the editor offered no
// settings — it rendered a placeholder — so every memory node ran with whatever
// defaults it was created with and the mode/scope/namespace could not be
// changed after placing it.

import type { MemoryNodeData, MemoryMode, MemoryScope } from '../../../../types/pipeline';
import { ConfigField, NodeConfigShell } from '../shared';
import { Input } from '../../../forms/Input';
import { Select } from '../../../forms/Select';
import { ContextVariablePicker } from '../../context/ContextVariablePicker';
import { useUpstreamContext } from '../../context/useUpstreamContext';

export interface MemoryConfigProps {
  data: MemoryNodeData;
  onChange: (patch: Partial<MemoryNodeData>) => void;
  /** Node being edited; drives the real upstream-context pills. */
  nodeId?: string;
}

const MODES: { value: MemoryMode; label: string; help: string }[] = [
  { value: 'read', label: 'Read', help: 'Look records up and write them into context.' },
  { value: 'write', label: 'Write', help: 'Persist a value from context into memory.' },
];

const SCOPES: { value: MemoryScope; label: string; help: string }[] = [
  { value: 'session', label: 'Session', help: 'Scoped to this run; cleared when the session ends.' },
  { value: 'long-term', label: 'Long-term', help: 'Persists across runs for the namespace.' },
];

export default function MemoryConfig({ data, onChange, nodeId }: MemoryConfigProps) {
  const { paths, unresolved } = useUpstreamContext(nodeId ?? null);

  const isWrite = data.mode === 'write';
  const namespaceMissing = !data.namespace?.trim();
  const keyMissing = !data.keyExpression?.trim();
  // Only a write needs a source field; requiring it on a read would be wrong.
  const valueMissing = isWrite && !data.valueField?.trim();

  const modeHelp = MODES.find((m) => m.value === data.mode)?.help;
  const scopeHelp = SCOPES.find((s) => s.value === data.scope)?.help;

  return (
    <NodeConfigShell>
      <ConfigField label="Mode" required help={modeHelp}>
        <Select
          size="sm"
          value={data.mode}
          onChange={(e) => onChange({ mode: e.target.value as MemoryMode })}
          aria-label="Memory mode"
          options={MODES.map((m) => ({ value: m.value, label: m.label }))}
        />
      </ConfigField>

      <ConfigField label="Scope" required help={scopeHelp}>
        <Select
          size="sm"
          value={data.scope}
          onChange={(e) => onChange({ scope: e.target.value as MemoryScope })}
          aria-label="Memory scope"
          options={SCOPES.map((sc) => ({ value: sc.value, label: sc.label }))}
        />
      </ConfigField>

      <ConfigField
        label="Namespace"
        required
        error={namespaceMissing ? 'Namespace is required.' : undefined}
        help={!namespaceMissing ? 'Groups related records. Reads only see their own namespace.' : undefined}
      >
        <Input
          size="sm"
          mono
          spellCheck={false}
          value={data.namespace ?? ''}
          onChange={(e) => onChange({ namespace: e.target.value })}
          placeholder="support-conversations"
          aria-label="Memory namespace"
        />
      </ConfigField>

      <ConfigField
        label="Key expression"
        required
        error={keyMissing ? 'Key expression is required.' : undefined}
        help={!keyMissing ? 'Identifies the record. Supports {{ context.* }} substitution.' : undefined}
      >
        <Input
          size="sm"
          mono
          spellCheck={false}
          value={data.keyExpression ?? ''}
          onChange={(e) => onChange({ keyExpression: e.target.value })}
          placeholder="{{context.trigger.userId}}"
          aria-label="Memory key expression"
        />
      </ConfigField>

      <ConfigField label="Available context">
        <ContextVariablePicker
          paths={paths}
          unresolved={unresolved(
            `${data.keyExpression ?? ''}\n${isWrite ? (data.valueField ?? '') : ''}`,
          )}
          onInsert={(token) =>
            onChange({ keyExpression: `${data.keyExpression ?? ''}${token}` })
          }
        />
      </ConfigField>

      {isWrite ? (
        <ConfigField
          label="Value field"
          required
          error={valueMissing ? 'Value field is required for a write.' : undefined}
          help={!valueMissing ? 'Context path whose value is persisted.' : undefined}
        >
          <Input
            size="sm"
            mono
            spellCheck={false}
            value={data.valueField ?? ''}
            onChange={(e) => onChange({ valueField: e.target.value || undefined })}
            placeholder="context.steps.llm-1.output"
            aria-label="Memory value field"
          />
        </ConfigField>
      ) : (
        <ConfigField
          label="Output key"
          help="Where retrieved records land in context. Defaults to this step's output."
        >
          <Input
            size="sm"
            mono
            spellCheck={false}
            value={data.outputKey ?? ''}
            onChange={(e) => onChange({ outputKey: e.target.value || undefined })}
            placeholder="recalled"
            aria-label="Memory output key"
          />
        </ConfigField>
      )}
    </NodeConfigShell>
  );
}
