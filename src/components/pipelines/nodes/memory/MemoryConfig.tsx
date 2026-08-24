// src/components/pipelines/nodes/memory/MemoryConfig.tsx
//
// Config panel for the memory node (read/write).
//
// Vendor-neutral by design: the node describes a scoped key/value memory, and
// which store stands behind it is a property of the host's deployment, not of
// this library. A host supplies its own wording through `nodeVocabulary` on
// the editor services seam.
//
// The editor rendered a placeholder for this node, so a placed memory node ran
// with whatever defaults it was created with and its mode/scope/namespace could
// not be changed afterwards. The matching executor handler ships in
// platform-api (src/pipeline/memory/) — 'session' scope binds to the runId and
// 'long-term' to the pipelineId, which is what the scope help text describes.
// That handler stores through an injected `MemoryStore` interface, so the
// backing store is a consumer extension rather than something this node knows
// anything about.

import { useId } from 'react';
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
  const uid = useId();
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
      {/* Every control here carried an aria-label that RESTATED the visible
          label with a different wording ("Memory mode" beside a label reading
          "Mode"), which is a second name for the same field. The visible label
          wins now that it is wired. */}
      <ConfigField
        label="Mode"
        required
        help={modeHelp}
        controlId={`${uid}-mode`}
        render={({ controlId, describedById }) => (
          <Select
            size="sm"
            id={controlId}
            aria-describedby={describedById}
            value={data.mode}
            onChange={(e) => onChange({ mode: e.target.value as MemoryMode })}
            options={MODES.map((m) => ({ value: m.value, label: m.label }))}
          />
        )}
      />

      <ConfigField
        label="Scope"
        required
        help={scopeHelp}
        controlId={`${uid}-scope`}
        render={({ controlId, describedById }) => (
          <Select
            size="sm"
            id={controlId}
            aria-describedby={describedById}
            value={data.scope}
            onChange={(e) => onChange({ scope: e.target.value as MemoryScope })}
            options={SCOPES.map((sc) => ({ value: sc.value, label: sc.label }))}
          />
        )}
      />

      <ConfigField
        label="Namespace"
        required
        error={namespaceMissing ? 'Namespace is required.' : undefined}
        help={!namespaceMissing ? 'Groups related records. Reads only see their own namespace.' : undefined}
        controlId={`${uid}-namespace`}
        render={({ controlId, describedById }) => (
          <Input
            size="sm"
            mono
            spellCheck={false}
            id={controlId}
            aria-describedby={describedById}
            value={data.namespace ?? ''}
            onChange={(e) => onChange({ namespace: e.target.value })}
            placeholder="support-conversations"
          />
        )}
      />

      <ConfigField
        label="Key expression"
        required
        error={keyMissing ? 'Key expression is required.' : undefined}
        help={!keyMissing ? 'Identifies the record. Supports {{ context.* }} substitution.' : undefined}
        controlId={`${uid}-key-expression`}
        render={({ controlId, describedById }) => (
          <Input
            size="sm"
            mono
            spellCheck={false}
            id={controlId}
            aria-describedby={describedById}
            value={data.keyExpression ?? ''}
            onChange={(e) => onChange({ keyExpression: e.target.value })}
            placeholder="{{context.trigger.userId}}"
          />
        )}
      />

      {/* A row of insert buttons, not a labelable control. */}
      <ConfigField
        label="Available context"
        render={() => (
          <div role="group" aria-label="Available context">
            <ContextVariablePicker
              paths={paths}
              unresolved={unresolved(
                `${data.keyExpression ?? ''}\n${isWrite ? (data.valueField ?? '') : ''}`,
              )}
              onInsert={(token) =>
                onChange({ keyExpression: `${data.keyExpression ?? ''}${token}` })
              }
            />
          </div>
        )}
      />

      {isWrite ? (
        <ConfigField
          label="Value field"
          required
          error={valueMissing ? 'Value field is required for a write.' : undefined}
          help={!valueMissing ? 'Context path whose value is persisted.' : undefined}
          controlId={`${uid}-value-field`}
          render={({ controlId, describedById }) => (
            <Input
              size="sm"
              mono
              spellCheck={false}
              id={controlId}
              aria-describedby={describedById}
              value={data.valueField ?? ''}
              onChange={(e) => onChange({ valueField: e.target.value || undefined })}
              placeholder="context.steps.llm-1.output"
            />
          )}
        />
      ) : (
        <ConfigField
          label="Output key"
          help="Where retrieved records land in context. Defaults to this step's output."
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
              placeholder="recalled"
            />
          )}
        />
      )}
    </NodeConfigShell>
  );
}
