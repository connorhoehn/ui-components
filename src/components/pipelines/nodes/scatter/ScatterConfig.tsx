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
import { ConfigField, NodeConfigShell } from '../shared';
import { Input } from '../../../forms/Input';
import { NumberInput } from '../../../forms/NumberInput';

export interface ScatterConfigProps {
  data: ScatterNodeData;
  onChange: (patch: Partial<ScatterNodeData>) => void;
}


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
    <NodeConfigShell>
      {/* Items path — schema-aware picker */}
      <ConfigField
        label="Items path"
        required
        error={
          !data.itemsPath?.trim()
            ? 'Items path is required.'
            : !data.itemsPath.startsWith('$.')
              ? 'Path must start with $.'
              : undefined
        }
        help="JSONPath into context resolving to an array. Each element becomes one scatter arm."
      >
        <ScatterPathPicker
          value={data.itemsPath ?? ''}
          onChange={(path) => onChange({ itemsPath: path })}
          upstreamKind={upstreamKind}
        />
      </ConfigField>

      {/* Item alias */}
      <ConfigField
        label="Item alias"
        help="Optional, default 'item'. Key written to $.scatter.<alias> for each arm."
      >
        <Input
          size="sm"
          mono
          spellCheck={false}
          value={data.itemAlias ?? ''}
          onChange={(e) => onChange({ itemAlias: e.target.value.trim() || undefined })}
          placeholder="item"
          aria-label="Item alias"
        />
      </ConfigField>

      <ConfigField
        label="Max concurrency"
        help="Optional, default 4. Maximum number of arms executing concurrently."
      >
        <NumberInput
          size="sm"
          min={1}
          max={64}
          value={data.maxConcurrency}
          onChange={(maxConcurrency) => onChange({ maxConcurrency })}
          onClear={() => onChange({ maxConcurrency: undefined })}
          placeholder="4"
          data-testid="scatter-max-concurrency"
        />
      </ConfigField>
    </NodeConfigShell>
  );
}
