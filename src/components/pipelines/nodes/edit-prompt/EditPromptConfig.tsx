// src/components/pipelines/nodes/edit-prompt/EditPromptConfig.tsx
//
// Config panel for image:edit-prompt (Nova Canvas inpaint).

import type { ImageEditPromptNodeData } from '../../../../types/pipeline';

export interface EditPromptConfigProps {
  data: ImageEditPromptNodeData;
  onChange: (patch: Partial<ImageEditPromptNodeData>) => void;
}

const SOURCE_IMAGE_SAMPLES = [
  '$.scatter.parentImageId',
  '$.trigger.imageRef',
  '$.steps.upload.output.imageId',
];

const MASK_SAMPLES = [
  '$.steps.mask.output.imageId',
  '$.trigger.maskRef',
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

const MODEL_OPTIONS = [
  { value: 'amazon.nova-canvas-v1:0', label: 'Nova Canvas v1 (default)' },
];

const inputCls = 'mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary';
const monoInputCls = `${inputCls} font-mono`;
const labelCls = 'text-[12px] font-semibold text-text-secondary';
const helpCls = 'text-[11px] text-text-tertiary mt-0.5';

export default function EditPromptConfig({ data, onChange }: EditPromptConfigProps) {
  return (
    <div className="flex flex-col gap-3 px-4 py-3">
      {/* Source image path */}
      <div>
        <label htmlFor="edit-prompt-source-image-path" className={labelCls}>
          Source image path <span className="text-text-tertiary font-normal">(optional)</span>
        </label>
        <input
          id="edit-prompt-source-image-path"
          type="text"
          spellCheck={false}
          className={monoInputCls}
          value={data.sourceImagePath ?? ''}
          onChange={(e) => onChange({ sourceImagePath: e.target.value.trim() || undefined })}
          placeholder="$.trigger.imageRef"
        />
        <SamplePills samples={SOURCE_IMAGE_SAMPLES} onSelect={(v) => onChange({ sourceImagePath: v })} />
      </div>

      {/* Mask image path */}
      <div>
        <label htmlFor="edit-prompt-mask-image-path" className={labelCls}>
          Mask image path <span className="text-text-tertiary font-normal">(optional)</span>
        </label>
        <input
          id="edit-prompt-mask-image-path"
          type="text"
          spellCheck={false}
          className={monoInputCls}
          value={data.maskImagePath ?? ''}
          onChange={(e) => onChange({ maskImagePath: e.target.value.trim() || undefined })}
          placeholder="$.steps.mask.output.imageId"
        />
        <div className={helpCls}>
          JSONPath to a mask image. White pixels = edit region, black = preserve. Omit for outpainting.
        </div>
        <SamplePills samples={MASK_SAMPLES} onSelect={(v) => onChange({ maskImagePath: v })} />
      </div>

      {/* Prompt */}
      <div>
        <label htmlFor="edit-prompt-prompt" className={labelCls}>Edit prompt</label>
        <textarea
          id="edit-prompt-prompt"
          rows={4}
          spellCheck={false}
          className={`${inputCls} resize-y min-h-20`}
          value={data.prompt ?? ''}
          onChange={(e) => onChange({ prompt: e.target.value })}
          placeholder="Replace the background with a sunny beach"
        />
        <div className={helpCls}>Describes what to generate in the masked region. Required.</div>
      </div>

      {/* Model */}
      <div>
        <label htmlFor="edit-prompt-model" className={labelCls}>Model</label>
        <select
          id="edit-prompt-model"
          className={inputCls}
          value={data.model ?? 'amazon.nova-canvas-v1:0'}
          onChange={(e) => onChange({ model: e.target.value })}
        >
          {MODEL_OPTIONS.map((m) => (
            <option key={m.value} value={m.value}>{m.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
