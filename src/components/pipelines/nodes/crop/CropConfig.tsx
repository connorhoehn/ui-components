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
import {
  ConfigField,
  NodeConfigShell,
  SamplePills,
  SourceImagePathField,
  ToggleField,
} from '../shared';
import { Input } from '../../../forms/Input';
import { useUpstreamImageRefs } from '../../context/useUpstreamContext';

export interface CropConfigProps {
  data: ImageCropNodeData;
  onChange: (patch: Partial<ImageCropNodeData>) => void;
  /** Node being edited; derives real upstream image refs. */
  nodeId?: string;
}

const BBOX_SAMPLES = [
  '$.scatter.item.bbox',
  '$.steps.visionAnalyze.output.extracted.regions[0].bbox',
  '$.trigger.payload.bbox',
];

const CROP_REGION_ID = 'crop-region';
const CROP_REGION_LABEL = 'crop';
/** Shared by the visible field label and the section group's accessible name. */
const CROP_REGION_FIELD_LABEL = 'Crop region';

  'mt-1 w-full text-[12px] font-mono rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary';
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
  const imageRefOptions = useUpstreamImageRefs(currentNodeId ?? null);
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
      <SourceImagePathField
        value={data.sourceImagePath}
        onChange={(v) => onChange({ sourceImagePath: v })}
        nodeId={currentNodeId ?? undefined}
        help="JSONPath to the imageId of the source image. Defaults server-side to $.scatter.parentImageId."
        placeholder="$.scatter.parentImageId"
      />

      <ConfigField
        label="Bounding-box path"
        help="Optional. JSONPath to a bbox object { x, y, width, height } in pixels. Overrides the manual crop region below when present at run time."
        controlId="crop-bbox-path"
        render={({ describedById, controlId }) => (
          <>
            <Input
              id={controlId}
              aria-describedby={describedById}
              size="sm"
              mono
              spellCheck={false}
              value={data.bboxPath ?? ''}
              onChange={(e) => onChange({ bboxPath: e.target.value.trim() || undefined })}
              placeholder="$.scatter.item.bbox"
            />
            <SamplePills
              samples={BBOX_SAMPLES}
              onSelect={(v) => onChange({ bboxPath: v })}
              aria-label="Common bbox paths"
            />
          </>
        )}
      />

      {/* Crop region (visual authoring).

          The region is painted on a canvas and read back off chips, so there
          is no single labelable control for `htmlFor` to point at — and the
          canvas is a SIBLING of the ConfigField, not its child, because the
          help text has to stay above it. The whole section is therefore the
          group, named with the same string the visible label shows. */}
      <div
        data-testid="crop-region-section"
        role="group"
        aria-label={CROP_REGION_FIELD_LABEL}
      >
        <ConfigField
          label={CROP_REGION_FIELD_LABEL}
          help="Optional. Drag on the source image to paint the crop box. Drawing a new box replaces the previous one."
        >
          <></>
        </ConfigField>

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

      <ToggleField
        label="Persist crop to blob store"
        checked={materialize}
        onChange={(v) => onChange({ materialize: v })}
        help="On by default. The cropped image is saved to the image blob store."
        data-testid="crop-materialize"
      />
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
