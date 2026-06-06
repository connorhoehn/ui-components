// src/components/pipelines/nodes/generate/GenerateConfig.tsx
//
// Config panel for image:generate (Bedrock Titan).

import type { ImageGenerateNodeData } from '../../../../types/pipeline';

export interface GenerateConfigProps {
  data: ImageGenerateNodeData;
  onChange: (patch: Partial<ImageGenerateNodeData>) => void;
}

const MODEL_OPTIONS = [
  { value: 'amazon.titan-image-generator-v2:0', label: 'Titan v2 (default)' },
  { value: 'amazon.titan-image-generator-v1',   label: 'Titan v1' },
];

const inputCls = 'mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary';
const labelCls = 'text-[12px] font-semibold text-text-secondary';
const helpCls = 'text-[11px] text-text-tertiary mt-0.5';

export default function GenerateConfig({ data, onChange }: GenerateConfigProps) {
  return (
    <div className="flex flex-col gap-3 px-4 py-3">
      {/* Prompt */}
      <div>
        <label htmlFor="generate-prompt" className={labelCls}>Prompt</label>
        <textarea
          id="generate-prompt"
          rows={4}
          spellCheck={false}
          className={`${inputCls} resize-y min-h-20`}
          value={data.prompt ?? ''}
          onChange={(e) => onChange({ prompt: e.target.value })}
          placeholder="A photorealistic photograph of a golden retriever in a sunny meadow"
        />
        <div className={helpCls}>Text description of the image to generate. Required.</div>
      </div>

      {/* Model */}
      <div>
        <label htmlFor="generate-model" className={labelCls}>Model</label>
        <select
          id="generate-model"
          className={inputCls}
          value={data.model ?? 'amazon.titan-image-generator-v2:0'}
          onChange={(e) => onChange({ model: e.target.value })}
        >
          {MODEL_OPTIONS.map((m) => (
            <option key={m.value} value={m.value}>{m.label}</option>
          ))}
        </select>
      </div>

      {/* Dimensions */}
      <div className="flex gap-2">
        <div className="flex-1">
          <label htmlFor="generate-width" className={labelCls}>Width (px)</label>
          <input
            id="generate-width"
            type="number"
            min={64}
            max={2048}
            step={64}
            className={inputCls}
            value={data.width ?? 512}
            onChange={(e) => {
              const v = parseInt(e.target.value, 10);
              onChange({ width: Number.isFinite(v) && v > 0 ? v : 512 });
            }}
          />
        </div>
        <div className="flex-1">
          <label htmlFor="generate-height" className={labelCls}>Height (px)</label>
          <input
            id="generate-height"
            type="number"
            min={64}
            max={2048}
            step={64}
            className={inputCls}
            value={data.height ?? 512}
            onChange={(e) => {
              const v = parseInt(e.target.value, 10);
              onChange({ height: Number.isFinite(v) && v > 0 ? v : 512 });
            }}
          />
        </div>
      </div>

      {/* Seed */}
      <div>
        <label htmlFor="generate-seed" className={labelCls}>
          Seed <span className="text-text-tertiary font-normal">(optional — for reproducibility)</span>
        </label>
        <input
          id="generate-seed"
          type="number"
          min={0}
          step={1}
          className={inputCls}
          value={data.seed ?? ''}
          onChange={(e) => {
            const v = parseInt(e.target.value, 10);
            onChange({ seed: Number.isFinite(v) && v >= 0 ? v : undefined });
          }}
          placeholder="random"
        />
      </div>

      {/* numImages */}
      <div>
        <label htmlFor="generate-num-images" className={labelCls}>
          Number of images <span className="text-text-tertiary font-normal">(fan-out when &gt; 1)</span>
        </label>
        <input
          id="generate-num-images"
          type="number"
          min={1}
          max={8}
          step={1}
          className={inputCls}
          value={data.numImages ?? 1}
          onChange={(e) => {
            const v = parseInt(e.target.value, 10);
            onChange({ numImages: Number.isFinite(v) && v >= 1 ? Math.min(8, v) : 1 });
          }}
        />
        <div className={helpCls}>
          When &gt; 1, the step fans out with one arm per image. Each arm carries one imageId.
        </div>
      </div>
    </div>
  );
}
