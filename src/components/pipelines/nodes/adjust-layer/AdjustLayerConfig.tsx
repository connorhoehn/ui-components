// src/components/pipelines/nodes/adjust-layer/AdjustLayerConfig.tsx
//
// Config panel for the image:adjust-layer node. Wraps AdjustLayerSliderPanel
// which provides live ~150 ms preview feedback via the backend preview route.

import { useMemo } from 'react';
import type { ImageAdjustLayerNodeData, AdjustLayer } from '../../../../types/pipeline';
import { usePipelineEditor } from '../../context/PipelineEditorContext';
import { useLatestStepForNode } from '../../context/PipelineRunsContext';
import AdjustLayerSliderPanel from './AdjustLayerSliderPanel';
import { ConfigField, NodeConfigShell, SourceImagePathField } from '../shared';
import { useUpstreamImageRefs } from '../../context/useUpstreamContext';

export interface AdjustLayerConfigProps {
  data: ImageAdjustLayerNodeData;
  onChange: (patch: Partial<ImageAdjustLayerNodeData>) => void;
  /** Node being edited; derives real upstream image refs. */
  nodeId?: string;
}


/**
 * Resolve the sourceImageId to pass to the preview panel.
 *
 * Strategy:
 *   1. Walk edges backwards from the current node to find the direct upstream
 *      node id.
 *   2. Read the latest step execution for that node via useLatestStepForNode.
 *   3. Return the first produced image's imageId from step.images[0].
 *
 * This hook must be called at the top level of a component, so we keep it in
 * a wrapper hook here.
 */
function useUpstreamImageId(currentNodeId: string | null): string | undefined {
  const { definition } = usePipelineEditor();

  // Find the direct upstream node id.
  const upstreamNodeId = useMemo(() => {
    if (!currentNodeId || !definition) return null;
    const incomingEdge = definition.edges.find((e) => e.target === currentNodeId);
    return incomingEdge?.source ?? null;
  }, [definition, currentNodeId]);

  const upstreamStep = useLatestStepForNode(upstreamNodeId ?? '');
  return upstreamStep?.images?.[0]?.imageId;
}

/**
 * Inner component that can call the upstream hook. Receives currentNodeId
 * separately so it can call the hooks unconditionally.
 */
function AdjustLayerConfigInner({
  data,
  onChange,
  currentNodeId,
}: AdjustLayerConfigProps & { currentNodeId: string | null }) {
  const imageRefOptions = useUpstreamImageRefs(currentNodeId ?? null);
  const autoSourceImageId = useUpstreamImageId(currentNodeId);
  const pinnedSourceImageId = data.previewSourceImageId;
  const layers = data.layers ?? [];

  return (
    <NodeConfigShell>
      {/* Source image path */}
      <SourceImagePathField
        value={data.sourceImagePath}
        onChange={(v) => onChange({ sourceImagePath: v })}
        nodeId={currentNodeId ?? undefined}
        help="JSONPath to the imageId of the source image."
        placeholder="$.scatter.parentImageId"
      />

      {/* Live slider panel */}
      <ConfigField label="Adjustment layers" help="Applied top-to-bottom.">
        <AdjustLayerSliderPanel
          layers={layers}
          onChange={(next: AdjustLayer[]) => onChange({ layers: next })}
          autoSourceImageId={autoSourceImageId}
          pinnedSourceImageId={pinnedSourceImageId}
          onPinnedSourceImageIdChange={(next) =>
            onChange({ previewSourceImageId: next })
          }
        />
      </ConfigField>
    </NodeConfigShell>
  );
}

/**
 * Outer config component. Reads selectedNodeId from the editor context so
 * AdjustLayerConfigInner can call the upstream-image hook.
 */
export default function AdjustLayerConfig(props: AdjustLayerConfigProps) {
  const { selectedNodeId } = usePipelineEditor();
  return <AdjustLayerConfigInner {...props} currentNodeId={selectedNodeId} />;
}
