// src/components/pipelines/nodes/adjust-layer/AdjustLayerConfig.tsx
//
// Config panel for the image:adjust-layer node. Wraps AdjustLayerSliderPanel
// which provides live ~150 ms preview feedback via the backend preview route.

import { useMemo } from 'react';
import type { ImageAdjustLayerNodeData, AdjustLayer } from '../../../../types/pipeline';
import { usePipelineEditor } from '../../context/PipelineEditorContext';
import { useLatestStepForNode } from '../../context/PipelineRunsContext';
import AdjustLayerSliderPanel from './AdjustLayerSliderPanel';
import { NodeConfigShell } from '../shared';

export interface AdjustLayerConfigProps {
  data: ImageAdjustLayerNodeData;
  onChange: (patch: Partial<ImageAdjustLayerNodeData>) => void;
}

const SOURCE_IMAGE_SAMPLES = [
  '$.scatter.parentImageId',
  '$.trigger.imageRef',
  '$.steps.upload.output.imageId',
];

function SamplePills({ samples, onSelect }: { samples: string[]; onSelect: (v: string) => void }) {
  return (
    <div className="mt-1.5 flex flex-wrap gap-1">
      {samples.map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => onSelect(s)}
          className="text-[10px] font-mono bg-surface-inset border border-border text-text-secondary rounded px-1.5 py-0.5 cursor-pointer"
        >
          {s}
        </button>
      ))}
    </div>
  );
}

const labelCls = 'text-[12px] font-semibold text-text-secondary';
const helpCls = 'text-[11px] text-text-tertiary mt-0.5';

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
  const autoSourceImageId = useUpstreamImageId(currentNodeId);
  const pinnedSourceImageId = data.previewSourceImageId;
  const layers = data.layers ?? [];

  return (
    <NodeConfigShell>
      {/* Source image path */}
      <div>
        <label htmlFor="adjust-layer-source-image-path" className={labelCls}>
          Source image path <span className="text-text-tertiary font-normal">(optional)</span>
        </label>
        <input
          id="adjust-layer-source-image-path"
          type="text"
          spellCheck={false}
          className="mt-1 w-full text-[12px] font-mono rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          value={data.sourceImagePath ?? ''}
          onChange={(e) => onChange({ sourceImagePath: e.target.value.trim() || undefined })}
          placeholder="$.scatter.parentImageId"
        />
        <div className={helpCls}>JSONPath to the imageId of the source image.</div>
        <SamplePills samples={SOURCE_IMAGE_SAMPLES} onSelect={(v) => onChange({ sourceImagePath: v })} />
      </div>

      {/* Live slider panel */}
      <div>
        <div className={`${labelCls} mb-1`}>
          Adjustment layers <span className="text-text-tertiary font-normal">(applied top-to-bottom)</span>
        </div>
        <AdjustLayerSliderPanel
          layers={layers}
          onChange={(next: AdjustLayer[]) => onChange({ layers: next })}
          autoSourceImageId={autoSourceImageId}
          pinnedSourceImageId={pinnedSourceImageId}
          onPinnedSourceImageIdChange={(next) =>
            onChange({ previewSourceImageId: next })
          }
        />
      </div>
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
