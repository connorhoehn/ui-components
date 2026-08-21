// src/components/pipelines/nodes/image-source/ImageSourceConfig.tsx
//
// Config panel for image-source node.

import type { ImageSourceNodeData } from '../../../../types/pipeline';
import { Input } from '../../../forms/Input';
import { NodeConfigShell } from '../shared';

export interface ImageSourceConfigProps {
  data: ImageSourceNodeData;
  onChange: (patch: Partial<ImageSourceNodeData>) => void;
}

export default function ImageSourceConfig({ data, onChange }: ImageSourceConfigProps) {
  return (
    <NodeConfigShell>
      {/* Image ID */}
      <div>
        <label
          htmlFor="image-source-image-id"
          className="block text-[12px] font-semibold text-text-primary"
        >
          Image ID{' '}
          <span className="text-text-secondary font-normal">
            (optional &mdash; can be set at run time)
          </span>
        </label>
        <Input
          id="image-source-image-id"
          type="text"
          size="sm"
          mono
          spellCheck={false}
          className="mt-1"
          value={data.imageId ?? ''}
          onChange={(e) => onChange({ imageId: e.target.value.trim() || undefined })}
          placeholder="img_xxxxxxxx"
        />
        <p className="mt-0.5 text-[11px] text-text-secondary">
          The imageId of an image already in the blob store. Leave blank to have the trigger or a
          preceding step supply the image at runtime.
        </p>
      </div>

      {/* Output key */}
      <div>
        <label
          htmlFor="image-source-output-key"
          className="block text-[12px] font-semibold text-text-primary"
        >
          Output key{' '}
          <span className="text-text-secondary font-normal">(default: imageRef)</span>
        </label>
        <Input
          id="image-source-output-key"
          type="text"
          size="sm"
          mono
          spellCheck={false}
          className="mt-1"
          value={data.outputKey ?? ''}
          onChange={(e) => onChange({ outputKey: e.target.value.trim() || undefined })}
          placeholder="imageRef"
        />
        <p className="mt-0.5 text-[11px] text-text-secondary">
          The key written to pipeline context (accessible as{' '}
          <code>$.trigger.{'<key>'}</code> by downstream steps).
        </p>
      </div>
    </NodeConfigShell>
  );
}
