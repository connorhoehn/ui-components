// src/components/pipelines/nodes/vision-tag/VisionTagConfig.tsx
//
// Config panel for image:vision-tag.

import { useState } from 'react';
import type { ImageVisionTagNodeData } from '../../../../types/pipeline';

export interface VisionTagConfigProps {
  data: ImageVisionTagNodeData;
  onChange: (patch: Partial<ImageVisionTagNodeData>) => void;
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
  { value: 'claude-haiku-4-5',   label: 'Claude Haiku 4.5 (default — fast)' },
  { value: 'claude-sonnet-4-6',  label: 'Claude Sonnet 4.6 (more accurate)' },
];

const inputCls = 'mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary';
const monoInputCls = `${inputCls} font-mono`;
const labelCls = 'text-[12px] font-semibold text-text-secondary';
const helpCls = 'text-[11px] text-text-tertiary mt-0.5';

export default function VisionTagConfig({ data, onChange }: VisionTagConfigProps) {
  const [newCandidate, setNewCandidate] = useState('');
  const candidateTags = data.candidateTags ?? [];

  const addCandidate = () => {
    const trimmed = newCandidate.trim();
    if (!trimmed || candidateTags.includes(trimmed)) return;
    onChange({ candidateTags: [...candidateTags, trimmed] });
    setNewCandidate('');
  };

  const removeCandidate = (idx: number) => {
    onChange({ candidateTags: candidateTags.filter((_, i) => i !== idx) });
  };

  return (
    <div className="flex flex-col gap-3 px-4 py-3">
      {/* Image ref path */}
      <div>
        <label htmlFor="vision-tag-image-ref-path" className={labelCls}>Image ref path</label>
        <input
          id="vision-tag-image-ref-path"
          type="text"
          spellCheck={false}
          className={monoInputCls}
          value={data.imageRefPath ?? ''}
          onChange={(e) => onChange({ imageRefPath: e.target.value.trim() })}
          placeholder="$.trigger.imageRef"
        />
        <div className={helpCls}>JSONPath to the imageId to tag. Required.</div>
        <SamplePills samples={IMAGE_REF_SAMPLES} onSelect={(v) => onChange({ imageRefPath: v })} />
      </div>

      {/* Candidate tags */}
      <div>
        <div className={labelCls}>
          Candidate tags <span className="text-text-tertiary font-normal">(optional — omit for open-vocabulary)</span>
        </div>
        {candidateTags.length > 0 && (
          <div className="mt-1.5 flex flex-wrap gap-1">
            {candidateTags.map((tag, idx) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 text-[11px] font-semibold bg-surface-inset border border-border rounded-full px-2 py-0.5 text-text-secondary"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeCandidate(idx)}
                  className="bg-transparent border-none cursor-pointer p-0 text-red-600 text-[11px] leading-none"
                  aria-label={`Remove candidate tag ${tag}`}
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        )}
        <div className="mt-1.5 flex gap-1.5">
          <input
            type="text"
            spellCheck={false}
            className={`${inputCls} flex-1 mt-0`}
            value={newCandidate}
            onChange={(e) => setNewCandidate(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addCandidate(); } }}
            placeholder="Add candidate tag…"
          />
          <button
            type="button"
            onClick={addCandidate}
            className="text-[12px] font-semibold bg-surface-hover text-text-secondary border border-border rounded-md cursor-pointer py-1 px-3 shrink-0"
          >
            Add
          </button>
        </div>
        <div className={helpCls}>Restricts tagging to this vocabulary. Leave empty for open-ended tags.</div>
      </div>

      {/* Max tags */}
      <div>
        <label htmlFor="vision-tag-max-tags" className={labelCls}>
          Max tags <span className="text-text-tertiary font-normal">(default 10)</span>
        </label>
        <input
          id="vision-tag-max-tags"
          type="number"
          min={1}
          max={50}
          step={1}
          className={inputCls}
          value={data.maxTags ?? 10}
          onChange={(e) => {
            const v = parseInt(e.target.value, 10);
            onChange({ maxTags: Number.isFinite(v) && v >= 1 ? v : 10 });
          }}
        />
      </div>

      {/* Model */}
      <div>
        <label htmlFor="vision-tag-model" className={labelCls}>Model</label>
        <select
          id="vision-tag-model"
          className={inputCls}
          value={data.model ?? 'claude-haiku-4-5'}
          onChange={(e) => onChange({ model: e.target.value })}
        >
          {MODEL_OPTIONS.map((m) => (
            <option key={m.value} value={m.value}>{m.label}</option>
          ))}
        </select>
      </div>

      {/* System prompt override */}
      <div>
        <label htmlFor="vision-tag-system-prompt" className={labelCls}>
          System prompt override <span className="text-text-tertiary font-normal">(optional)</span>
        </label>
        <textarea
          id="vision-tag-system-prompt"
          rows={3}
          spellCheck={false}
          className={`${inputCls} resize-y`}
          value={data.systemPrompt ?? ''}
          onChange={(e) => onChange({ systemPrompt: e.target.value || undefined })}
          placeholder="Leave blank to use the default tagging system prompt."
        />
      </div>

      {/* Max output tokens */}
      <div>
        <label htmlFor="vision-tag-max-output-tokens" className={labelCls}>
          Max output tokens <span className="text-text-tertiary font-normal">(default 256)</span>
        </label>
        <input
          id="vision-tag-max-output-tokens"
          type="number"
          min={64}
          max={4096}
          step={64}
          className={inputCls}
          value={data.maxOutputTokens ?? 256}
          onChange={(e) => {
            const v = parseInt(e.target.value, 10);
            onChange({ maxOutputTokens: Number.isFinite(v) && v > 0 ? v : 256 });
          }}
        />
      </div>
    </div>
  );
}
