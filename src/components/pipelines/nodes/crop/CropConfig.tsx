// src/components/pipelines/nodes/crop/CropConfig.tsx
//
// Config panel for the image:crop node. The crop region is authored by
// painting a single bounding box on the upstream image via
// BBoxAuthoringCanvas — the same primitive VisionConfig uses for focus
// regions. The four coordinate values (x/y/w/h) are still displayed as
// read-only chips for precision.

import { useCallback, useMemo } from 'react';
import { cn } from '../../../../lib/cn';
import type {
  AuthoringBBox,
  BBox,
  ImageCropNodeData,
} from '../../../../types/pipeline';
import { usePipelineEditor } from '../../context/PipelineEditorContext';
import { useLatestStepForNode } from '../../context/PipelineRunsContext';
import { useImageUrl } from '../../services';
import Banner from '../../../shared/Banner';
import Chip from '../../../shared/Chip';
import { BBoxAuthoringCanvas } from '../../vision/BBoxAuthoringCanvas';
import { NodeConfigShell } from '../shared';

export interface CropConfigProps {
  data: ImageCropNodeData;
  onChange: (patch: Partial<ImageCropNodeData>) => void;
}

const SOURCE_IMAGE_SAMPLES = [
  '$.scatter.parentImageId',
  '$.trigger.imageRef',
  '$.steps.upload.output.imageId',
];

const BBOX_SAMPLES = [
  '$.scatter.item.bbox',
  '$.steps.visionAnalyze.output.extracted.regions[0].bbox',
  '$.trigger.payload.bbox',
];

const CROP_REGION_ID = 'crop-region';
const CROP_REGION_LABEL = 'crop';

function SamplePills({
  samples,
  onSelect,
}: {
  samples: string[];
  onSelect: (v: string) => void;
}) {
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

const inputCls =
  'mt-1 w-full text-[12px] font-mono rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary';
const labelCls = 'text-[12px] font-semibold text-text-secondary';
const helpCls = 'text-[11px] text-text-tertiary mt-0.5';

// ---------------------------------------------------------------------------
// Upstream image resolution (mirrors AdjustLayerConfig.useUpstreamImageId).
// We need imageUrl + imageWidth + imageHeight to mount BBoxAuthoringCanvas,
// so we go one level further than AdjustLayerConfig — picking up width/height
// off the produced image record on the upstream step.
// ---------------------------------------------------------------------------

interface UpstreamImage {
  imageId: string;
  width: number;
  height: number;
}

function useUpstreamImage(currentNodeId: string | null): UpstreamImage | null {
  const { definition } = usePipelineEditor();

  const upstreamNodeId = useMemo(() => {
    if (!currentNodeId || !definition) return null;
    const incoming = definition.edges.find((e) => e.target === currentNodeId);
    return incoming?.source ?? null;
  }, [definition, currentNodeId]);

  const upstreamStep = useLatestStepForNode(upstreamNodeId ?? '');
  const img = upstreamStep?.images?.[0];
  if (!img) return null;
  return { imageId: img.imageId, width: img.width, height: img.height };
}

// ---------------------------------------------------------------------------
// Inner config — has the editor context available, so it can resolve upstream.
// ---------------------------------------------------------------------------

function CropConfigInner({
  data,
  onChange,
  currentNodeId,
}: CropConfigProps & { currentNodeId: string | null }) {
  const materialize = data.materialize !== false;
  const upstream = useUpstreamImage(currentNodeId);
  const getImageUrl = useImageUrl();

  // The canvas is fully controlled. We project nodeData.bbox into the
  // single-box array shape the canvas expects, and on every onChange we
  // collapse the array back to the last box (single-box mode).
  const boxes: AuthoringBBox[] = useMemo(() => {
    if (!data.bbox) return [];
    return [
      {
        id: CROP_REGION_ID,
        x: data.bbox.x,
        y: data.bbox.y,
        width: data.bbox.width,
        height: data.bbox.height,
        label: CROP_REGION_LABEL,
      },
    ];
  }, [data.bbox]);

  const handleBoxesChange = useCallback(
    (next: AuthoringBBox[]) => {
      if (next.length === 0) {
        onChange({ bbox: undefined });
        return;
      }
      // Single-box invariant: take the LAST box drawn. Drawing a new box
      // replaces the existing one rather than stacking.
      const last = next[next.length - 1];
      const nextBBox: BBox = {
        x: Math.round(last.x),
        y: Math.round(last.y),
        width: Math.round(last.width),
        height: Math.round(last.height),
      };
      onChange({ bbox: nextBBox });
    },
    [onChange],
  );

  return (
    <NodeConfigShell>
      {/* Source image path */}
      <div>
        <label htmlFor="crop-source-image-path" className={labelCls}>
          Source image path{' '}
          <span className="text-text-tertiary font-normal">(optional)</span>
        </label>
        <input
          id="crop-source-image-path"
          type="text"
          spellCheck={false}
          className={inputCls}
          value={data.sourceImagePath ?? ''}
          onChange={(e) =>
            onChange({ sourceImagePath: e.target.value.trim() || undefined })
          }
          placeholder="$.scatter.parentImageId"
        />
        <div className={helpCls}>
          JSONPath to the imageId of the source image. Defaults server-side to{' '}
          <code>$.scatter.parentImageId</code>.
        </div>
        <SamplePills
          samples={SOURCE_IMAGE_SAMPLES}
          onSelect={(v) => onChange({ sourceImagePath: v })}
        />
      </div>

      {/* Bbox path */}
      <div>
        <label htmlFor="crop-bbox-path" className={labelCls}>
          Bounding-box path{' '}
          <span className="text-text-tertiary font-normal">(optional)</span>
        </label>
        <input
          id="crop-bbox-path"
          type="text"
          spellCheck={false}
          className={inputCls}
          value={data.bboxPath ?? ''}
          onChange={(e) =>
            onChange({ bboxPath: e.target.value.trim() || undefined })
          }
          placeholder="$.scatter.item.bbox"
        />
        <div className={helpCls}>
          JSONPath to a bbox object <code>{'{ x, y, width, height }'}</code> in
          pixels. Overrides the manual crop region below when present at run
          time.
        </div>
        <SamplePills
          samples={BBOX_SAMPLES}
          onSelect={(v) => onChange({ bboxPath: v })}
        />
      </div>

      {/* Crop region (visual authoring) */}
      <div data-testid="crop-region-section">
        <div className={labelCls}>
          Crop region{' '}
          <span className="text-text-tertiary font-normal">(optional)</span>
        </div>
        <div className={helpCls}>
          Drag on the source image to paint the crop box. Drawing a new box
          replaces the previous one.
        </div>

        {upstream ? (
          <>
            <BBoxAuthoringCanvas
              imageUrl={getImageUrl(upstream.imageId)}
              imageWidth={upstream.width}
              imageHeight={upstream.height}
              boxes={boxes}
              onChange={handleBoxesChange}
              className="mt-1.5"
            />
            <div
              className="mt-1.5 flex flex-wrap gap-1"
              data-testid="crop-region-chips"
            >
              {data.bbox ? (
                <>
                  <Chip tone="neutral" size="xs" mono data-testid="crop-chip-x">
                    x: {data.bbox.x}
                  </Chip>
                  <Chip tone="neutral" size="xs" mono data-testid="crop-chip-y">
                    y: {data.bbox.y}
                  </Chip>
                  <Chip
                    tone="neutral"
                    size="xs"
                    mono
                    data-testid="crop-chip-width"
                  >
                    w: {data.bbox.width}
                  </Chip>
                  <Chip
                    tone="neutral"
                    size="xs"
                    mono
                    data-testid="crop-chip-height"
                  >
                    h: {data.bbox.height}
                  </Chip>
                </>
              ) : (
                <span className={cn(helpCls, 'italic')}>
                  No crop region yet — drag on the image to add one.
                </span>
              )}
            </div>
          </>
        ) : (
          <Banner
            variant="info"
            className="mt-1.5"
            data-testid="crop-region-empty-banner"
          >
            Run the upstream node once to populate the source image, then drag
            here to paint a crop region.
          </Banner>
        )}
      </div>

      {/* Materialize toggle */}
      <label
        htmlFor="crop-materialize"
        className="flex items-center gap-2 text-[12px] font-semibold text-text-secondary cursor-pointer"
      >
        <input
          id="crop-materialize"
          type="checkbox"
          checked={materialize}
          onChange={(e) => onChange({ materialize: e.target.checked })}
          className="w-3.5 h-3.5 accent-primary"
        />
        Persist crop to blob store
      </label>
      <div className={helpCls}>
        When enabled (default), the cropped image is saved to the
        ImageBlobStore.
      </div>
    </NodeConfigShell>
  );
}

// ---------------------------------------------------------------------------
// Outer wrapper — reads selectedNodeId from the editor context so the inner
// component can call the upstream-image hook unconditionally.
// ---------------------------------------------------------------------------

export default function CropConfig(props: CropConfigProps) {
  const { selectedNodeId } = usePipelineEditor();
  return <CropConfigInner {...props} currentNodeId={selectedNodeId} />;
}
