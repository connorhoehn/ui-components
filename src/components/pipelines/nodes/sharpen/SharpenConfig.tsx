// src/components/pipelines/nodes/sharpen/SharpenConfig.tsx
//
// Config panel for image:sharpen.
//
// Converted from hand-rolled controls to the ConfigField + Input/NumberInput
// composites. Every optional numeric field here is genuinely optional — the
// executor falls back to its own default when the value is absent — so they
// pass `onClear` and hand back `undefined` rather than coercing a blank field
// to 0, which would silently mean "no sharpening at all" instead of "default".

import type { ImageSharpenNodeData } from '../../../../types/pipeline';
import { ConfigField, NodeConfigShell, SamplePills } from '../shared';
import { Input } from '../../../forms/Input';
import { NumberInput } from '../../../forms/NumberInput';
import { useUpstreamImageRefs } from '../../context/useUpstreamContext';

export interface SharpenConfigProps {
  data: ImageSharpenNodeData;
  onChange: (patch: Partial<ImageSharpenNodeData>) => void;
  /** Node being edited; derives real upstream image refs. */
  nodeId?: string;
}

export default function SharpenConfig({ data, onChange, nodeId }: SharpenConfigProps) {
  const imageRefOptions = useUpstreamImageRefs(nodeId ?? null);

  return (
    <NodeConfigShell>
      <ConfigField
        label="Source image path"
        help="Optional. Defaults to the image produced upstream."
      >
        <Input
          size="sm"
          mono
          spellCheck={false}
          value={data.sourceImagePath ?? ''}
          onChange={(e) =>
            onChange({ sourceImagePath: e.target.value.trim() || undefined })
          }
          placeholder="$.trigger.imageRef"
          aria-label="Source image path"
        />
        <SamplePills
          samples={imageRefOptions.map((o) => o.path)}
          onSelect={(v) => onChange({ sourceImagePath: v })}
          aria-label="Upstream image refs"
        />
      </ConfigField>

      <ConfigField
        label="Sigma"
        help="Gaussian mask sigma. Higher is broader and stronger. Typical range 0.5–3."
      >
        <NumberInput
          size="sm"
          min={0.01}
          max={10}
          step={0.1}
          value={data.sigma}
          onChange={(v) => onChange({ sigma: v })}
          onClear={() => onChange({ sigma: undefined })}
          placeholder="1"
          data-testid="sharpen-sigma"
        />
      </ConfigField>

      <ConfigField
        label="m1 — flat area level"
        help="Sharpening applied to flat (smooth) areas of the image."
      >
        <NumberInput
          size="sm"
          min={0}
          step={0.1}
          value={data.m1}
          onChange={(v) => onChange({ m1: v })}
          onClear={() => onChange({ m1: undefined })}
          placeholder="leave blank for default"
          data-testid="sharpen-m1"
        />
      </ConfigField>

      <ConfigField
        label="m2 — jagged area level"
        help="Sharpening applied to jagged (edge) areas of the image."
      >
        <NumberInput
          size="sm"
          min={0}
          step={0.1}
          value={data.m2}
          onChange={(v) => onChange({ m2: v })}
          onClear={() => onChange({ m2: undefined })}
          placeholder="leave blank for default"
          data-testid="sharpen-m2"
        />
      </ConfigField>
    </NodeConfigShell>
  );
}
