// src/components/pipelines/nodes/vision-extract-text/VisionExtractTextConfig.tsx
//
// Config panel for image:vision-extract-text (OCR).

import type { ImageVisionExtractTextNodeData } from '../../../../types/pipeline';

export interface VisionExtractTextConfigProps {
  data: ImageVisionExtractTextNodeData;
  onChange: (patch: Partial<ImageVisionExtractTextNodeData>) => void;
}

const IMAGE_REF_SAMPLES = [
  '$.trigger.imageRef',
  '$.scatter.parentImageId',
  '$.steps.crop.output.imageId',
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
  { value: 'claude-sonnet-4-6', label: 'Claude Sonnet 4.6 (default — best OCR accuracy)' },
  { value: 'claude-haiku-4-5',  label: 'Claude Haiku 4.5 (faster, lower accuracy)' },
];

const inputCls = 'mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary';
const monoInputCls = `${inputCls} font-mono`;
const labelCls = 'text-[12px] font-semibold text-text-secondary';
const helpCls = 'text-[11px] text-text-tertiary mt-0.5';

export default function VisionExtractTextConfig({ data, onChange }: VisionExtractTextConfigProps) {
  return (
    <div className="flex flex-col gap-3 px-4 py-3">
      {/* Image ref path */}
      <div>
        <label htmlFor="vision-extract-text-image-ref-path" className={labelCls}>Image ref path</label>
        <input
          id="vision-extract-text-image-ref-path"
          type="text"
          spellCheck={false}
          className={monoInputCls}
          value={data.imageRefPath ?? ''}
          onChange={(e) => onChange({ imageRefPath: e.target.value.trim() })}
          placeholder="$.trigger.imageRef"
        />
        <div className={helpCls}>JSONPath to the imageId to extract text from. Required.</div>
        <SamplePills samples={IMAGE_REF_SAMPLES} onSelect={(v) => onChange({ imageRefPath: v })} />
      </div>

      {/* Model */}
      <div>
        <label htmlFor="vision-extract-text-model" className={labelCls}>Model</label>
        <select
          id="vision-extract-text-model"
          className={inputCls}
          value={data.model ?? 'claude-sonnet-4-6'}
          onChange={(e) => onChange({ model: e.target.value })}
        >
          {MODEL_OPTIONS.map((m) => (
            <option key={m.value} value={m.value}>{m.label}</option>
          ))}
        </select>
        <div className={helpCls}>Defaults to Sonnet for best OCR accuracy.</div>
      </div>

      {/* System prompt override */}
      <div>
        <label htmlFor="vision-extract-text-system-prompt" className={labelCls}>
          System prompt override <span className="text-text-tertiary font-normal">(optional)</span>
        </label>
        <textarea
          id="vision-extract-text-system-prompt"
          rows={3}
          spellCheck={false}
          className={`${inputCls} resize-y`}
          value={data.systemPrompt ?? ''}
          onChange={(e) => onChange({ systemPrompt: e.target.value || undefined })}
          placeholder="Leave blank to use the default OCR system prompt."
        />
      </div>

      {/* Max output tokens */}
      <div>
        <label htmlFor="vision-extract-text-max-output-tokens" className={labelCls}>
          Max output tokens <span className="text-text-tertiary font-normal">(default 1024)</span>
        </label>
        <input
          id="vision-extract-text-max-output-tokens"
          type="number"
          min={64}
          max={8192}
          step={64}
          className={inputCls}
          value={data.maxOutputTokens ?? 1024}
          onChange={(e) => {
            const v = parseInt(e.target.value, 10);
            onChange({ maxOutputTokens: Number.isFinite(v) && v > 0 ? v : 1024 });
          }}
        />
        <div className={helpCls}>Increase for documents with large amounts of text.</div>
      </div>
    </div>
  );
}
