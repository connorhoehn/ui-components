// src/components/pipelines/nodes/save/SaveConfig.tsx
//
// Config panel for the image:save node. Configures sourceImagePath and
// filenameTemplate. Quick-fill pills for common template vars.

import type { ImageSaveNodeData } from '../../../../types/pipeline';
import { Input } from '../../../forms/Input';
import { cn } from '../../../../lib/cn';

export interface SaveConfigProps {
  data: ImageSaveNodeData;
  onChange: (patch: Partial<ImageSaveNodeData>) => void;
}

const SOURCE_IMAGE_SAMPLES = [
  '$.scatter.parentImageId',
  '$.trigger.imageRef',
  '$.steps.crop.output.imageId',
];

const FILENAME_TEMPLATE_SAMPLES = [
  '{{scatter.item.label}}',
  '{{scatter.index}}',
  '{{scatter.parentImageId}}',
];

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
          className={cn(
            'text-[10px] font-mono',
            'bg-[#f3f4f6] border border-[#d1d5db] text-[#374151]',
            'rounded px-1.5 py-0.5 cursor-pointer',
            'hover:bg-[#e5e7eb] transition-colors duration-100',
          )}
        >
          {s}
        </button>
      ))}
    </div>
  );
}

export default function SaveConfig({ data, onChange }: SaveConfigProps) {
  return (
    <div className="flex flex-col gap-3 px-4 py-3">
      {/* Source image path */}
      <div>
        <label
          htmlFor="save-source-image-path"
          className="block text-[12px] font-semibold text-[#374151]"
        >
          Source image path{' '}
          <span className="text-[#6b7280] font-normal">(optional)</span>
        </label>
        <Input
          id="save-source-image-path"
          type="text"
          size="sm"
          mono
          spellCheck={false}
          className="mt-1"
          value={data.sourceImagePath ?? ''}
          onChange={(e) =>
            onChange({ sourceImagePath: e.target.value.trim() || undefined })
          }
          placeholder="$.scatter.parentImageId"
        />
        <p className="mt-0.5 text-[11px] text-[#6b7280]">
          JSONPath to the imageId to save. Defaults server-side to{' '}
          <code>$.scatter.parentImageId</code>.
        </p>
        <SamplePills
          samples={SOURCE_IMAGE_SAMPLES}
          onSelect={(v) => onChange({ sourceImagePath: v })}
        />
      </div>

      {/* Filename template */}
      <div>
        <label
          htmlFor="save-filename-template"
          className="block text-[12px] font-semibold text-[#374151]"
        >
          Filename template{' '}
          <span className="text-[#6b7280] font-normal">(optional)</span>
        </label>
        <Input
          id="save-filename-template"
          type="text"
          size="sm"
          mono
          spellCheck={false}
          className="mt-1"
          value={data.filenameTemplate ?? ''}
          onChange={(e) =>
            onChange({ filenameTemplate: e.target.value.trim() || undefined })
          }
          placeholder="crop-{{scatter.index}}.png"
        />
        <p className="mt-0.5 text-[11px] text-[#6b7280]">
          Output filename. Supports{' '}
          <code>{'{{scatter.item.label}}'}</code>,{' '}
          <code>{'{{scatter.index}}'}</code>, and{' '}
          <code>{'{{scatter.parentImageId}}'}</code> substitutions. Default:{' '}
          <code>crop-{'{{scatter.index}}'}.png</code>.
        </p>
        <div className="mt-1.5">
          <div className="text-[10px] text-[#6b7280] mb-1">Quick-fill variable:</div>
          <SamplePills
            samples={FILENAME_TEMPLATE_SAMPLES}
            onSelect={(v) => {
              const current = data.filenameTemplate ?? '';
              onChange({ filenameTemplate: current + v });
            }}
          />
        </div>
      </div>
    </div>
  );
}
