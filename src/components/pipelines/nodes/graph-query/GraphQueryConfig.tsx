// src/components/pipelines/nodes/graph-query/GraphQueryConfig.tsx
//
// Config panel for the graph-query node. Selecting the node used to show
// "Configuration for graph-query — coming in Phase C", so the query, its
// parameters and the timeout were all unreachable after the node was placed.
//
// The copy here is VENDOR-NEUTRAL on purpose — nothing names a graph database
// or a query dialect, because which one stands behind this node is a property
// of the host's deployment, not of this library. A host running a specific
// engine supplies its own wording through `nodeVocabulary` on the editor
// services seam (e.g. relabelling "Graph query" as "openCypher query").
//
// Parameters are a Record<string,string> of bind parameters. They
// are edited as rows rather than raw JSON because a malformed blob is only
// discovered at run time, and because binding is the whole point: a user who
// cannot add a parameter row will interpolate values into the query string
// instead, which is how you get an injection into a graph database.

import { useId, useMemo, useState } from 'react';
import type { GraphQueryNodeData } from '../../../../types/pipeline';
import { ConfigField, ConfigSection, NodeConfigShell } from '../shared';
import { Input } from '../../../forms/Input';
import { Textarea } from '../../../forms/Textarea';
import { NumberInput } from '../../../forms/NumberInput';
import { Button } from '../../../ui/Button';
import RetryPolicyEditor from '../RetryPolicyEditor';
import { ContextVariablePicker } from '../../context/ContextVariablePicker';
import { useUpstreamContext } from '../../context/useUpstreamContext';
import { useNodeVocabulary } from '../../services/PipelineEditorServicesContext';

export interface GraphQueryConfigProps {
  data: GraphQueryNodeData;
  onChange: (patch: Partial<GraphQueryNodeData>) => void;
  /** Node being edited; drives the real upstream-context pills. */
  nodeId?: string;
}

// A query example cannot avoid picking a dialect. This one is only a default;
// a host running a different engine replaces it via `nodeVocabulary`.
const DEFAULT_QUERY_EXAMPLE =
  'MATCH (u:User {id: $userId})-[:AUTHORED]->(d:Doc)\nRETURN d.title LIMIT 10';

const MIN_TIMEOUT_MS = 100;
const MAX_TIMEOUT_MS = 300_000;

export default function GraphQueryConfig({
  data,
  onChange,
  nodeId,
}: GraphQueryConfigProps) {
  const uid = useId();
  const { paths, unresolved } = useUpstreamContext(nodeId ?? null);
  const vocab = useNodeVocabulary('graph-query');

  const graphMissing = !data.graphId?.trim();
  const queryMissing = !data.query?.trim();

  const timeout = data.timeoutMs;
  const timeoutInvalid =
    timeout !== undefined &&
    (!Number.isFinite(timeout) || timeout < MIN_TIMEOUT_MS || timeout > MAX_TIMEOUT_MS);

  // Rendered as a stable list so typing in one row doesn't reorder the others.
  const paramRows = useMemo(
    () => Object.entries(data.parameters ?? {}),
    [data.parameters],
  );

  const setParams = (next: Record<string, string>) =>
    onChange({ parameters: Object.keys(next).length > 0 ? next : undefined });

  // Parameters are a Record, so two rows cannot share a name: renaming `b` to
  // `a` would overwrite `a`'s value and silently delete a row. Refuse the
  // collision and say why instead of quietly losing the binding.
  const [collision, setCollision] = useState<string | null>(null);

  const renameParam = (from: string, to: string) => {
    if (to !== from && to.trim() !== '' && to in (data.parameters ?? {})) {
      setCollision(to);
      return;
    }
    setCollision(null);
    // Rebuild in order so the renamed row keeps its position.
    const next: Record<string, string> = {};
    for (const [k, v] of paramRows) next[k === from ? to : k] = v;
    setParams(next);
  };

  const setParamValue = (key: string, value: string) =>
    setParams({ ...(data.parameters ?? {}), [key]: value });

  const removeParam = (key: string) => {
    const next = { ...(data.parameters ?? {}) };
    delete next[key];
    setParams(next);
  };

  const addParam = () => {
    // Never clobber an existing row by reusing its key.
    let i = paramRows.length + 1;
    let key = `param${i}`;
    while (key in (data.parameters ?? {})) key = `param${++i}`;
    setParams({ ...(data.parameters ?? {}), [key]: '' });
  };

  return (
    <NodeConfigShell>
      <ConfigSection title="Graph">
        <ConfigField
          label={vocab.label('graphId', 'Graph ID')}
          required
          error={graphMissing ? 'Graph ID is required.' : undefined}
          help={!graphMissing ? vocab.help('graphId', 'The graph to query.') : undefined}
          controlId={`${uid}-graph-id`}
          render={({ controlId, describedById }) => (
            <Input
              size="sm"
              mono
              spellCheck={false}
              id={controlId}
              aria-describedby={describedById}
              value={data.graphId ?? ''}
              onChange={(e) => onChange({ graphId: e.target.value })}
              placeholder={vocab.placeholder('graphId', 'my-graph')}
            />
          )}
        />

        <ConfigField
          label={vocab.label('query', 'Graph query')}
          required
          error={queryMissing ? 'Query is required.' : undefined}
          help={
            !queryMissing
              ? 'Bind values with $parameters below rather than interpolating them.'
              : undefined
          }
          controlId={`${uid}-query`}
          render={({ controlId, describedById }) => (
            <Textarea
              rows={6}
              invalid={queryMissing}
              spellCheck={false}
              id={controlId}
              aria-describedby={describedById}
              value={data.query ?? ''}
              onChange={(e) => onChange({ query: e.target.value })}
              placeholder={vocab.placeholder('query', DEFAULT_QUERY_EXAMPLE)}
            />
          )}
        />
      </ConfigSection>

      <ConfigSection title="Parameters">
        {/* Bind parameters — rows of name/value inputs and a remove button,
            each already named; the field label names the group instead. */}
        <ConfigField
          label="Bind parameters"
          help="Each row binds one $name in the query. Values support {{ context.* }}."
          render={({ describedById }) => (
            <div
              role="group"
              aria-label="Bind parameters"
              aria-describedby={describedById}
              className="flex flex-col gap-2"
              data-testid="graph-query-params"
            >
              {paramRows.length === 0 ? (
                <p className="text-[12px] text-[var(--color-text-secondary)]">
                  No parameters. The query runs exactly as written.
                </p>
              ) : null}

              {paramRows.map(([key, value], index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    size="sm"
                    mono
                    spellCheck={false}
                    value={key}
                    onChange={(e) => renameParam(key, e.target.value)}
                    invalid={key.trim() === ''}
                    placeholder="userId"
                    aria-label={`Parameter ${index + 1} name`}
                  />
                  <Input
                    size="sm"
                    mono
                    spellCheck={false}
                    value={value}
                    onChange={(e) => setParamValue(key, e.target.value)}
                    placeholder="{{context.trigger.userId}}"
                    aria-label={`Parameter ${index + 1} value`}
                  />
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => removeParam(key)}
                    aria-label={`Remove parameter ${key || index + 1}`}
                  >
                    ×
                  </Button>
                </div>
              ))}

              {collision ? (
                <p className="text-[12px] text-[var(--color-danger)]" role="alert">
                  A parameter named “{collision}” already exists. Rename or remove
                  it first — two rows cannot share a name.
                </p>
              ) : null}

              <div>
                <Button size="sm" variant="secondary" onClick={addParam}>
                  + Add parameter
                </Button>
              </div>
            </div>
          )}
        />

        {/* A row of insert buttons, not a labelable control. */}
        <ConfigField
          label="Available context"
          render={() => (
            <div role="group" aria-label="Available context">
              <ContextVariablePicker
                paths={paths}
                unresolved={unresolved(paramRows.map(([, v]) => v).join('\n'))}
                onInsert={(token) => {
                  // Append to the last parameter row — inserting into the query
                  // itself would encourage exactly the interpolation this
                  // node's parameters exist to avoid.
                  const last = paramRows[paramRows.length - 1];
                  if (!last) {
                    setParams({ ...(data.parameters ?? {}), param1: token });
                    return;
                  }
                  setParamValue(last[0], `${last[1]}${token}`);
                }}
              />
            </div>
          )}
        />
      </ConfigSection>

      <ConfigSection title="Execution">
        <ConfigField
          label="Timeout"
          error={
            timeoutInvalid
              ? `Must be between ${MIN_TIMEOUT_MS} and ${MAX_TIMEOUT_MS} ms.`
              : undefined
          }
          help={!timeoutInvalid ? 'Leave empty to use the executor default.' : undefined}
          controlId={`${uid}-timeout`}
          render={({ controlId, describedById }) => (
            <NumberInput
              size="sm"
              min={MIN_TIMEOUT_MS}
              max={MAX_TIMEOUT_MS}
              step={100}
              unit="ms"
              value={timeout ?? 0}
              onChange={(v) => onChange({ timeoutMs: v })}
              invalid={timeoutInvalid}
              id={controlId}
              aria-describedby={describedById}
              data-testid="graph-query-timeout"
            />
          )}
        />

        <ConfigField
          label="Output key"
          help="Where rows land in context. Defaults to this step's output."
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
              placeholder="rows"
            />
          )}
        />

        <RetryPolicyEditor
          value={data.retryPolicy}
          onChange={(next) => onChange({ retryPolicy: next })}
        />
      </ConfigSection>
    </NodeConfigShell>
  );
}
