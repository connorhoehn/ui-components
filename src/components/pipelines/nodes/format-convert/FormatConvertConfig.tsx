// src/components/pipelines/nodes/format-convert/FormatConvertConfig.tsx
//
// Config panel for image:format-convert.

import type { ImageFormatConvertNodeData, ImageFormat } from '../../../../types/pipeline';
import {
  ConfigField,
  NodeConfigShell,
  SourceImagePathField,
  ToggleField,
} from '../shared';
import { Select } from '../../../forms/Select';
import { NumberInput } from '../../../forms/NumberInput';

export interface FormatConvertConfigProps {
  data: ImageFormatConvertNodeData;
  onChange: (patch: Partial<ImageFormatConvertNodeData>) => void;
  /** Node being edited; derives real upstream image refs. */
  nodeId?: string;
}

const FORMAT_OPTIONS: { value: ImageFormat; label: string }[] = [
  { value: 'jpeg', label: 'JPEG' },
  { value: 'png', label: 'PNG' },
  { value: 'webp', label: 'WebP' },
  { value: 'avif', label: 'AVIF' },
];

const LOSSY_FORMATS: ImageFormat[] = ['jpeg', 'webp', 'avif'];
const LOSSLESS_CAPABLE: ImageFormat[] = ['webp', 'avif'];

export default function FormatConvertConfig({
  data,
  onChange,
  nodeId,
}: FormatConvertConfigProps) {
  const format = data.format ?? 'jpeg';
  const isLossy = LOSSY_FORMATS.includes(format);
  const canBeLossless = LOSSLESS_CAPABLE.includes(format);
  const lossless = data.lossless ?? false;

  return (
    <NodeConfigShell>
      <SourceImagePathField
        value={data.sourceImagePath}
        onChange={(v) => onChange({ sourceImagePath: v })}
        nodeId={nodeId}
      />

      <ConfigField label="Output format">
        <Select
          size="sm"
          value={format}
          onChange={(e) => onChange({ format: e.target.value as ImageFormat })}
          aria-label="Output format"
          options={FORMAT_OPTIONS}
        />
      </ConfigField>

      {isLossy && (
        <ConfigField
          label="Quality"
          help={
            lossless
              ? 'Ignored while lossless encoding is on.'
              : 'Higher is better quality and a larger file. 80 is a good default. Range 1–100.'
          }
        >
          <NumberInput
            size="sm"
            min={1}
            max={100}
            step={1}
            disabled={lossless}
            value={data.quality ?? 80}
            onChange={(quality) => onChange({ quality })}
            data-testid="format-convert-quality"
          />
        </ConfigField>
      )}

      {canBeLossless && (
        <ToggleField
          label="Lossless encoding"
          checked={lossless}
          onChange={(v) => onChange({ lossless: v })}
          help="Overrides quality when on. Larger files, no compression artefacts."
          data-testid="format-convert-lossless"
        />
      )}

      <ToggleField
        label="Strip EXIF and metadata"
        checked={data.stripMetadata ?? false}
        onChange={(stripMetadata) => onChange({ stripMetadata })}
        help="Removes camera EXIF, GPS and copyright tags. Reduces file size; recommended for web delivery."
        data-testid="format-convert-strip-metadata"
      />
    </NodeConfigShell>
  );
}
