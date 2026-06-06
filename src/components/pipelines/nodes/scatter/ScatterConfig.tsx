// src/components/pipelines/nodes/scatter/ScatterConfig.tsx
//
// Config panel for the Scatter node. Configures itemsPath (required),
// itemAlias (optional), and maxConcurrency (optional).
//
// The itemsPath field uses <ScatterPathPicker> which renders a schema tree
// when the upstream node kind has a known output schema. Falls back to a
// plain <JsonPathInput> when no upstream is connected or the schema is
// dynamic (e.g. image:vision-classify).

import { useMemo } from 'react';
import type { ScatterNodeData } from '../../../../types/pipeline';
import { usePipelineEditor } from '../../context/PipelineEditorContext';
import { ScatterPathPicker } from './ScatterPathPicker';

export interface ScatterConfigProps {
  data: ScatterNodeData;
  onChange: (patch: Partial<ScatterNodeData>) => void;
}

const labelCls = 'text-[12px] font-semibold text-text-secondary';
const helpCls = 'text-[11px] text-text-tertiary mt-0.5';
const inputCls = 'mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary';

// ---------------------------------------------------------------------------
// Hook: find the upstream node kind for the selected scatter node
// ---------------------------------------------------------------------------

function useUpstreamKind(selectedNodeId: string | null): string | undefined {
  const { definition } = usePipelineEditor();
  return useMemo(() => {
    if (!selectedNodeId || !definition) return undefined;
    // Find an edge whose target is this scatter node.
    const incomingEdge = definition.edges.find((e) => e.target === selectedNodeId);
    if (!incomingEdge) return undefined;
    const sourceNode = definition.nodes.find((n) => n.id === incomingEdge.source);
    if (!sourceNode) return undefined;
    // node.type is the NodeType discriminant (e.g. 'image:vision-analyze').
    // For image handlers, that IS the node kind the output-schemas route uses.
    return sourceNode.type;
  }, [selectedNodeId, definition]);
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ScatterConfig({ data, onChange }: ScatterConfigProps) {
  const { selectedNodeId } = usePipelineEditor();
  const upstreamKind = useUpstreamKind(selectedNodeId);

  const rawConcurrency = data.maxConcurrency ?? '';

  return (
    <div className="flex flex-col gap-3 px-4 py-3">
      {/* Items path — schema-aware picker */}
      <div>
        <label className={labelCls}>
          Items path<span className="text-red-600 ml-1" aria-hidden>*</span>
        </label>
        <div className="mt-1">
          <ScatterPathPicker
            value={data.itemsPath ?? ''}
            onChange={(path) => onChange({ itemsPath: path })}
            upstreamKind={upstreamKind}
          />
        </div>
        {!data.itemsPath?.trim() && (
          <div role="alert" className="text-[11px] text-red-600 mt-0.5">
            Items path is required.
          </div>
        )}
        {!!data.itemsPath && !data.itemsPath.startsWith('$.') && (
          <div role="alert" className="text-[11px] text-red-600 mt-0.5">
            Path must start with <code>$.</code>
          </div>
        )}
        {!!data.itemsPath?.startsWith('$.') && (
          <div className={helpCls}>
            JSONPath into context resolving to an array. Each element becomes one scatter arm.
          </div>
        )}
      </div>

      {/* Item alias */}
      <div>
        <label htmlFor="scatter-item-alias" className={labelCls}>
          Item alias <span className="text-text-tertiary font-normal">(optional, default: item)</span>
        </label>
        <input
          id="scatter-item-alias"
          type="text"
          spellCheck={false}
          className={inputCls}
          value={data.itemAlias ?? ''}
          onChange={(e) => onChange({ itemAlias: e.target.value.trim() || undefined })}
          placeholder="item"
        />
        <div className={helpCls}>
          Key written to <code>{'$.scatter.<alias>'}</code> for each arm.
        </div>
      </div>

      {/* Max concurrency */}
      <div>
        <label htmlFor="scatter-max-concurrency" className={labelCls}>
          Max concurrency <span className="text-text-tertiary font-normal">(optional, default: 4)</span>
        </label>
        <input
          id="scatter-max-concurrency"
          type="number"
          min={1}
          max={64}
          className="mt-1 w-28 text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          value={rawConcurrency}
          onChange={(e) => {
            const v = e.target.value;
            onChange({
              maxConcurrency:
                v === '' ? undefined : Math.max(1, parseInt(v, 10) || 1),
            });
          }}
          placeholder="4"
        />
        <div className={helpCls}>
          Maximum number of arms executing concurrently.
        </div>
      </div>
    </div>
  );
}
