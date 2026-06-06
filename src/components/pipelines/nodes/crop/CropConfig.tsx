// src/components/pipelines/nodes/crop/CropConfig.tsx
//
// Config panel for the image:crop node.

import type { ImageCropNodeData } from '../../../../types/pipeline';

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

const inputCls = 'mt-1 w-full text-[12px] font-mono rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary';
const labelCls = 'text-[12px] font-semibold text-text-secondary';
const helpCls = 'text-[11px] text-text-tertiary mt-0.5';

export default function CropConfig({ data, onChange }: CropConfigProps) {
  const materialize = data.materialize !== false;

  return (
    <div className="flex flex-col gap-3 px-4 py-3">
      {/* Source image path */}
      <div>
        <label htmlFor="crop-source-image-path" className={labelCls}>
          Source image path <span className="text-text-tertiary font-normal">(optional)</span>
        </label>
        <input
          id="crop-source-image-path"
          type="text"
          spellCheck={false}
          className={inputCls}
          value={data.sourceImagePath ?? ''}
          onChange={(e) => onChange({ sourceImagePath: e.target.value.trim() || undefined })}
          placeholder="$.scatter.parentImageId"
        />
        <div className={helpCls}>
          JSONPath to the imageId of the source image. Defaults server-side to{' '}
          <code>$.scatter.parentImageId</code>.
        </div>
        <SamplePills samples={SOURCE_IMAGE_SAMPLES} onSelect={(v) => onChange({ sourceImagePath: v })} />
      </div>

      {/* Bbox path */}
      <div>
        <label htmlFor="crop-bbox-path" className={labelCls}>
          Bounding-box path <span className="text-text-tertiary font-normal">(optional)</span>
        </label>
        <input
          id="crop-bbox-path"
          type="text"
          spellCheck={false}
          className={inputCls}
          value={data.bboxPath ?? ''}
          onChange={(e) => onChange({ bboxPath: e.target.value.trim() || undefined })}
          placeholder="$.scatter.item.bbox"
        />
        <div className={helpCls}>
          JSONPath to a bbox object <code>{'{ x, y, width, height }'}</code> in pixels.
        </div>
        <SamplePills samples={BBOX_SAMPLES} onSelect={(v) => onChange({ bboxPath: v })} />
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
        When enabled (default), the cropped image is saved to the ImageBlobStore.
      </div>
    </div>
  );
}
