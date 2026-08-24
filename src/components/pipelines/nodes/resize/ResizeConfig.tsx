// src/components/pipelines/nodes/resize/ResizeConfig.tsx
//
// Config panel for the image:resize node.
//
// Width and height are genuinely optional — supplying only one lets the
// executor derive the other from the aspect ratio — so they clear back to
// `undefined` rather than coercing a blank field to a number.

import type { ImageResizeNodeData, ResizeFit } from '../../../../types/pipeline';
import {
  ConfigField,
  NodeConfigShell,
  SourceImagePathField,
  ToggleField,
} from '../shared';
import { Input } from '../../../forms/Input';
import { Select } from '../../../forms/Select';
import { NumberInput } from '../../../forms/NumberInput';

export interface ResizeConfigProps {
  data: ImageResizeNodeData;
  onChange: (patch: Partial<ImageResizeNodeData>) => void;
  /** Node being edited; derives real upstream image refs. */
  nodeId?: string;
}

const FIT_OPTIONS: { value: ResizeFit; label: string }[] = [
  { value: 'cover', label: 'cover' },
  { value: 'contain', label: 'contain' },
  { value: 'fill', label: 'fill' },
  { value: 'inside', label: 'inside' },
  { value: 'outside', label: 'outside' },
];

export default function ResizeConfig({ data, onChange, nodeId }: ResizeConfigProps) {
  const fit = data.fit ?? 'cover';
  const paddingApplies = fit === 'contain' || fit === 'fill';

  return (
    <NodeConfigShell>
      <SourceImagePathField
        value={data.sourceImagePath}
        onChange={(v) => onChange({ sourceImagePath: v })}
        nodeId={nodeId}
      />

      <div className="flex gap-2">
        <div className="flex-1">
          <ConfigField
            label="Width"
            controlId="resize-width"
            render={({ describedById, controlId }) => (
              <NumberInput
                id={controlId}
                aria-describedby={describedById}
                size="sm"
                min={1}
                step={1}
                unit="px"
                value={data.width}
                onChange={(width) => onChange({ width })}
                onClear={() => onChange({ width: undefined })}
                placeholder="e.g. 512"
                data-testid="resize-width"
              />
            )}
          />
        </div>
        <div className="flex-1">
          <ConfigField
            label="Height"
            controlId="resize-height"
            render={({ describedById, controlId }) => (
              <NumberInput
                id={controlId}
                aria-describedby={describedById}
                size="sm"
                min={1}
                step={1}
                unit="px"
                value={data.height}
                onChange={(height) => onChange({ height })}
                onClear={() => onChange({ height: undefined })}
                placeholder="e.g. 512"
                data-testid="resize-height"
              />
            )}
          />
        </div>
      </div>

      <ConfigField
        label="Fit mode"
        help="How the image fits the target dimensions. cover (default) crops, contain letterboxes, fill stretches."
        controlId="resize-fit"
        render={({ describedById, controlId }) => (
          <Select
            id={controlId}
            aria-describedby={describedById}
            size="sm"
            value={fit}
            onChange={(e) => onChange({ fit: e.target.value as ResizeFit })}
            options={FIT_OPTIONS}
          />
        )}
      />

      <ToggleField
        label="Do not enlarge if already smaller than target"
        checked={data.withoutEnlargement ?? false}
        onChange={(withoutEnlargement) => onChange({ withoutEnlargement })}
        data-testid="resize-without-enlargement"
      />

      <ConfigField
        label="Background colour"
        help={
          paddingApplies
            ? 'Hex colour used to fill letterbox padding.'
            : 'Only applies when fit is contain or fill.'
        }
        controlId="resize-background"
        render={({ describedById, controlId }) => (
          <Input
            id={controlId}
            aria-describedby={describedById}
            size="sm"
            mono
            spellCheck={false}
            value={data.background ?? ''}
            onChange={(e) => onChange({ background: e.target.value.trim() || undefined })}
            placeholder="#ffffff"
          />
        )}
      />
    </NodeConfigShell>
  );
}
