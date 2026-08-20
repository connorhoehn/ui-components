// src/components/pipelines/nodes/watermark/WatermarkConfig.tsx
//
// Config panel for image:watermark.
//
// The offsets clear back to `undefined` rather than to 0. They read the same on
// the canvas, but "unset" lets the executor keep its own default if that ever
// stops being zero, where a stored 0 pins it.

import type { ImageWatermarkNodeData, WatermarkGravity } from '../../../../types/pipeline';
import { ConfigField, NodeConfigShell, SourceImagePathField } from '../shared';
import { Input } from '../../../forms/Input';
import { Select } from '../../../forms/Select';
import { NumberInput } from '../../../forms/NumberInput';

export interface WatermarkConfigProps {
  data: ImageWatermarkNodeData;
  onChange: (patch: Partial<ImageWatermarkNodeData>) => void;
  /** Node being edited; derives real upstream image refs. */
  nodeId?: string;
}

const GRAVITY_OPTIONS: { value: WatermarkGravity; label: string }[] = [
  'northwest', 'north', 'northeast',
  'west', 'center', 'east',
  'southwest', 'south', 'southeast',
].map((g) => ({ value: g as WatermarkGravity, label: g }));

export default function WatermarkConfig({ data, onChange, nodeId }: WatermarkConfigProps) {
  const overlayMissing = !data.overlayImageId?.trim();

  return (
    <NodeConfigShell>
      <SourceImagePathField
        value={data.sourceImagePath}
        onChange={(v) => onChange({ sourceImagePath: v })}
        nodeId={nodeId}
      />

      <ConfigField
        label="Overlay image ID"
        required
        error={overlayMissing ? 'Overlay image ID is required.' : undefined}
        help="The imageId of the watermark image already stored in the blob store."
      >
        <Input
          size="sm"
          mono
          spellCheck={false}
          invalid={overlayMissing}
          value={data.overlayImageId ?? ''}
          onChange={(e) => onChange({ overlayImageId: e.target.value.trim() })}
          placeholder="img_xxxxxxxx"
          aria-label="Overlay image ID"
        />
      </ConfigField>

      <ConfigField
        label="Gravity"
        help="Where the overlay sits on the source image. Default southeast."
      >
        <Select
          size="sm"
          value={data.gravity ?? 'southeast'}
          onChange={(e) => onChange({ gravity: e.target.value as WatermarkGravity })}
          aria-label="Gravity"
          options={GRAVITY_OPTIONS}
        />
      </ConfigField>

      <ConfigField label="Opacity" help="0 to 1. Default 1.">
        <NumberInput
          size="sm"
          min={0}
          max={1}
          step={0.05}
          value={data.opacity ?? 1}
          onChange={(opacity) => onChange({ opacity })}
          data-testid="watermark-opacity"
        />
      </ConfigField>

      <div className="flex gap-2">
        <div className="flex-1">
          <ConfigField label="Offset X">
            <NumberInput
              size="sm"
              step={1}
              unit="px"
              value={data.offsetX}
              onChange={(offsetX) => onChange({ offsetX })}
              onClear={() => onChange({ offsetX: undefined })}
              placeholder="0"
              data-testid="watermark-offset-x"
            />
          </ConfigField>
        </div>
        <div className="flex-1">
          <ConfigField label="Offset Y">
            <NumberInput
              size="sm"
              step={1}
              unit="px"
              value={data.offsetY}
              onChange={(offsetY) => onChange({ offsetY })}
              onClear={() => onChange({ offsetY: undefined })}
              placeholder="0"
              data-testid="watermark-offset-y"
            />
          </ConfigField>
        </div>
      </div>
    </NodeConfigShell>
  );
}
