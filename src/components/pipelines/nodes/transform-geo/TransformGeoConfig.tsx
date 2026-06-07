// src/components/pipelines/nodes/transform-geo/TransformGeoConfig.tsx
//
// Config panel for image:transform — chain editor for geometric ops.

import type { ImageTransformNodeData, GeometricOp, GeometricOpRotate } from '../../../../types/pipeline';
import { NodeConfigShell } from '../shared';

export interface TransformGeoConfigProps {
  data: ImageTransformNodeData;
  onChange: (patch: Partial<ImageTransformNodeData>) => void;
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

function defaultOp(opType: string): GeometricOp {
  switch (opType) {
    case 'rotate': return { op: 'rotate', degrees: 90 };
    case 'flip':   return { op: 'flip' };
    case 'flop':   return { op: 'flop' };
    default:       return { op: 'rotate', degrees: 90 };
  }
}

interface OpCardProps {
  op: GeometricOp;
  index: number;
  onUpdate: (op: GeometricOp) => void;
  onRemove: () => void;
}

const inputCls = 'text-[12px] rounded border border-border bg-white px-2 py-1 font-mono outline-none focus:border-primary focus:ring-1 focus:ring-primary';
const selectCls = 'flex-1 text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary';
const labelCls = 'text-[12px] font-semibold text-text-secondary';
const helpCls = 'text-[11px] text-text-tertiary mt-0.5';

function OpCard({ op, index, onUpdate, onRemove }: OpCardProps) {
  return (
    <div className="border border-border rounded-md p-2.5 bg-surface-inset flex flex-col gap-2" data-testid={`geo-op-card-${index}`}>
      <div className="flex items-center gap-2">
        <span className="text-[11px] text-text-tertiary font-semibold min-w-[20px]">{index + 1}.</span>
        <select
          className={selectCls}
          value={op.op}
          onChange={(e) => onUpdate(defaultOp(e.target.value))}
          aria-label={`Op ${index + 1} type`}
        >
          <option value="rotate">Rotate</option>
          <option value="flip">Flip (vertical)</option>
          <option value="flop">Flop (horizontal)</option>
        </select>
        <button
          type="button"
          onClick={onRemove}
          className="ml-auto text-[11px] font-semibold bg-transparent text-red-600 border border-transparent rounded px-2 py-0.5 cursor-pointer hover:bg-red-50"
          aria-label={`Remove op ${index + 1}`}
        >
          ✕
        </button>
      </div>
      {op.op === 'rotate' && (
        <>
          <div className="flex items-center gap-2">
            <label className="text-[11px] text-text-tertiary min-w-[60px]">Degrees</label>
            <input
              type="number"
              min={-360}
              max={360}
              step={90}
              className={`${inputCls} w-24`}
              value={(op as GeometricOpRotate).degrees}
              onChange={(e) => {
                const v = parseFloat(e.target.value);
                onUpdate({ ...op, degrees: Number.isFinite(v) ? v : 90 } as GeometricOpRotate);
              }}
              aria-label="Rotation degrees"
            />
            <span className="text-[11px] text-text-tertiary">°</span>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-[11px] text-text-tertiary min-w-[60px]">Background</label>
            <input
              type="text"
              spellCheck={false}
              className={`${inputCls} flex-1`}
              value={(op as GeometricOpRotate).background ?? ''}
              onChange={(e) => onUpdate({ ...op, background: e.target.value.trim() || undefined } as GeometricOpRotate)}
              placeholder="#000000"
            />
          </div>
          <label className="flex items-center gap-2 text-[12px] font-semibold text-text-secondary cursor-pointer">
            <input
              type="checkbox"
              checked={(op as GeometricOpRotate).trimAfter ?? false}
              onChange={(e) => onUpdate({ ...op, trimAfter: e.target.checked } as GeometricOpRotate)}
              className="w-3.5 h-3.5 accent-primary"
            />
            Trim after rotate
          </label>
        </>
      )}
    </div>
  );
}

export default function TransformGeoConfig({ data, onChange }: TransformGeoConfigProps) {
  const ops = data.operations ?? [];

  const updateOp = (index: number, op: GeometricOp) => {
    onChange({ operations: ops.map((o, i) => (i === index ? op : o)) });
  };

  const removeOp = (index: number) => {
    onChange({ operations: ops.filter((_, i) => i !== index) });
  };

  const addOp = () => {
    onChange({ operations: [...ops, { op: 'rotate', degrees: 90 }] });
  };

  return (
    <NodeConfigShell>
      {/* Source image path */}
      <div>
        <label htmlFor="transform-geo-source-image-path" className={labelCls}>
          Source image path <span className="text-text-tertiary font-normal">(optional)</span>
        </label>
        <input
          id="transform-geo-source-image-path"
          type="text"
          spellCheck={false}
          className={`mt-1 w-full ${inputCls}`}
          value={data.sourceImagePath ?? ''}
          onChange={(e) => onChange({ sourceImagePath: e.target.value.trim() || undefined })}
          placeholder="$.trigger.imageRef"
        />
        <SamplePills samples={SOURCE_IMAGE_SAMPLES} onSelect={(v) => onChange({ sourceImagePath: v })} />
      </div>

      {/* Operations stack */}
      <div>
        <div className={`${labelCls} mb-2`}>
          Operations <span className="text-text-tertiary font-normal">(applied top-to-bottom)</span>
        </div>
        {ops.length === 0 && (
          <div className="text-[11px] text-text-tertiary mb-2 italic">
            No operations — add at least one.
          </div>
        )}
        <div className="flex flex-col gap-1.5">
          {ops.map((op, idx) => (
            <OpCard
              key={idx}
              op={op}
              index={idx}
              onUpdate={(updated) => updateOp(idx, updated)}
              onRemove={() => removeOp(idx)}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={addOp}
          className={`w-full text-[12px] font-semibold bg-surface-hover text-text-secondary border border-border rounded-md cursor-pointer py-1.5 px-3 ${ops.length > 0 ? 'mt-2' : ''}`}
          data-testid="add-geo-op-btn"
        >
          + Add operation
        </button>
        <div className={`${helpCls} mt-1.5`}>
          Supported: Rotate (any angle), Flip (top-to-bottom mirror), Flop (left-to-right mirror).
        </div>
      </div>
    </NodeConfigShell>
  );
}
