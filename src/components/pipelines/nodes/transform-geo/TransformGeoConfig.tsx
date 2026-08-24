// src/components/pipelines/nodes/transform-geo/TransformGeoConfig.tsx
//
// Config panel for image:transform — chain editor for geometric ops.

import type {
  ImageTransformNodeData,
  GeometricOp,
  GeometricOpRotate,
} from '../../../../types/pipeline';
import {
  ConfigField,
  NodeConfigShell,
  SourceImagePathField,
  ToggleField,
} from '../shared';
import { Input } from '../../../forms/Input';
import { Select } from '../../../forms/Select';
import { NumberInput } from '../../../forms/NumberInput';
import { Button } from '../../../ui/Button';

export interface TransformGeoConfigProps {
  data: ImageTransformNodeData;
  onChange: (patch: Partial<ImageTransformNodeData>) => void;
  /** Node being edited; derives real upstream image refs. */
  nodeId?: string;
}

/** Shared by the visible label and the op-list group's accessible name. */
const OPERATIONS_LABEL = 'Operations';

const OP_OPTIONS = [
  { value: 'rotate', label: 'Rotate' },
  { value: 'flip', label: 'Flip (vertical)' },
  { value: 'flop', label: 'Flop (horizontal)' },
];

function defaultOp(opType: string): GeometricOp {
  switch (opType) {
    case 'rotate': return { op: 'rotate', degrees: 90 };
    case 'flip': return { op: 'flip' };
    case 'flop': return { op: 'flop' };
    default: return { op: 'rotate', degrees: 90 };
  }
}

interface OpCardProps {
  op: GeometricOp;
  index: number;
  onUpdate: (op: GeometricOp) => void;
  onRemove: () => void;
}

function OpCard({ op, index, onUpdate, onRemove }: OpCardProps) {
  const rotate = op as GeometricOpRotate;

  return (
    <div
      className="border border-border rounded-md p-2.5 bg-surface-inset flex flex-col gap-2"
      data-testid={`geo-op-card-${index}`}
    >
      <div className="flex items-center gap-2">
        <span className="text-[11px] text-text-tertiary font-semibold min-w-[20px]">
          {index + 1}.
        </span>
        <Select
          size="sm"
          className="flex-1"
          value={op.op}
          onChange={(e) => onUpdate(defaultOp(e.target.value))}
          aria-label={`Op ${index + 1} type`}
          options={OP_OPTIONS}
        />
        <Button
          size="sm"
          variant="ghost"
          onClick={onRemove}
          aria-label={`Remove op ${index + 1}`}
        >
          ✕
        </Button>
      </div>

      {op.op === 'rotate' && (
        <>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-text-tertiary min-w-[60px]">Degrees</span>
            <NumberInput
              size="sm"
              min={-360}
              max={360}
              step={90}
              unit="°"
              value={rotate.degrees}
              onChange={(degrees) => onUpdate({ ...op, degrees } as GeometricOpRotate)}
              data-testid={`geo-op-degrees-${index}`}
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-text-tertiary min-w-[60px]">Background</span>
            <Input
              size="sm"
              mono
              spellCheck={false}
              value={rotate.background ?? ''}
              onChange={(e) =>
                onUpdate({
                  ...op,
                  background: e.target.value.trim() || undefined,
                } as GeometricOpRotate)
              }
              placeholder="#000000"
              aria-label={`Op ${index + 1} background`}
            />
          </div>
          <ToggleField
            label="Trim after rotate"
            checked={rotate.trimAfter ?? false}
            onChange={(trimAfter) => onUpdate({ ...op, trimAfter } as GeometricOpRotate)}
            data-testid={`geo-op-trim-${index}`}
          />
        </>
      )}
    </div>
  );
}

export default function TransformGeoConfig({
  data,
  onChange,
  nodeId,
}: TransformGeoConfigProps) {
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
      <SourceImagePathField
        value={data.sourceImagePath}
        onChange={(v) => onChange({ sourceImagePath: v })}
        nodeId={nodeId}
      />

      {/* The field is a stack of op cards plus an Add button, not one
          labelable control, so its name goes on a `role="group"` — `htmlFor`
          has nothing single to point at. ConfigField keeps its label id
          private, so the group repeats the string as `aria-label`; the
          visible <label> labels nothing, so there is still one name. */}
      <ConfigField
        label={OPERATIONS_LABEL}
        error={ops.length === 0 ? 'Add at least one operation.' : undefined}
        help="Applied top-to-bottom. Rotate (any angle), Flip (top-to-bottom mirror), Flop (left-to-right mirror)."
        render={({ describedById, labelId }) => (
          <div
            role="group"
            aria-labelledby={labelId}
            aria-describedby={describedById}
          >
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
            <div className={ops.length > 0 ? 'mt-2' : ''}>
              <Button
                size="sm"
                variant="secondary"
                onClick={addOp}
                className="w-full"
                data-testid="add-geo-op-btn"
              >
                + Add operation
              </Button>
            </div>
          </div>
        )}
      />
    </NodeConfigShell>
  );
}
