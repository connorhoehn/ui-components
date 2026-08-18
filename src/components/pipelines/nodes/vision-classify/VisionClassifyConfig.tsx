// src/components/pipelines/nodes/vision-classify/VisionClassifyConfig.tsx
//
// Config panel for image:vision-classify.

import { useState } from 'react';
import type { ImageVisionClassifyNodeData } from '../../../../types/pipeline';
import { NodeConfigShell, SamplePills } from '../shared';
import { useUpstreamImageRefs } from '../../context/useUpstreamContext';

export interface VisionClassifyConfigProps {
  data: ImageVisionClassifyNodeData;
  onChange: (patch: Partial<ImageVisionClassifyNodeData>) => void;
  /** Node being edited; enables real upstream-context pills. */
  nodeId?: string;
}

const MODEL_OPTIONS = [
  { value: 'claude-haiku-4-5',   label: 'Claude Haiku 4.5 (default — fast)' },
  { value: 'claude-sonnet-4-6',  label: 'Claude Sonnet 4.6 (more accurate)' },
];

const inputCls = 'mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary';
const monoInputCls = `${inputCls} font-mono`;
const labelCls = 'text-[12px] font-semibold text-text-secondary';
const helpCls = 'text-[11px] text-text-tertiary mt-0.5';

export default function VisionClassifyConfig({ data, onChange, nodeId }: VisionClassifyConfigProps) {
  const imageRefOptions = useUpstreamImageRefs(nodeId ?? null);
  const [newLabel, setNewLabel] = useState('');
  const labels = data.labels ?? [];

  const addLabel = () => {
    const trimmed = newLabel.trim();
    if (!trimmed || labels.includes(trimmed)) return;
    onChange({ labels: [...labels, trimmed] });
    setNewLabel('');
  };

  const removeLabel = (idx: number) => {
    onChange({ labels: labels.filter((_, i) => i !== idx) });
  };

  return (
    <NodeConfigShell>
      {/* Image ref path */}
      <div>
        <label htmlFor="vision-classify-image-ref-path" className={labelCls}>Image ref path</label>
        <input
          id="vision-classify-image-ref-path"
          type="text"
          spellCheck={false}
          className={monoInputCls}
          value={data.imageRefPath ?? ''}
          onChange={(e) => onChange({ imageRefPath: e.target.value.trim() })}
          placeholder="$.trigger.imageRef"
        />
        <div className={helpCls}>JSONPath to the imageId to classify. Required.</div>
        <SamplePills samples={imageRefOptions.map((o) => o.path)} onSelect={(v) => onChange({ imageRefPath: v })} />
      </div>

      {/* Labels */}
      <div>
        <div className={labelCls}>Labels (at least 2 required)</div>
        {labels.length > 0 && (
          <div className="mt-1.5 flex flex-wrap gap-1">
            {labels.map((lbl, idx) => (
              <span
                key={lbl}
                className="inline-flex items-center gap-1 text-[11px] font-semibold bg-surface-inset border border-border rounded-full px-2 py-0.5 text-text-secondary"
              >
                {lbl}
                <button
                  type="button"
                  onClick={() => removeLabel(idx)}
                  className="bg-transparent border-none cursor-pointer p-0 text-danger-fg text-[11px] leading-none"
                  aria-label={`Remove label ${lbl}`}
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
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addLabel(); } }}
            placeholder="Add label…"
          />
          <button
            type="button"
            onClick={addLabel}
            className="text-[12px] font-semibold bg-surface-hover text-text-secondary border border-border rounded-md cursor-pointer py-1 px-3 shrink-0"
          >
            Add
          </button>
        </div>
        <div className={helpCls}>Press Enter or click Add. The model returns the single best-matching label.</div>
      </div>

      {/* Model */}
      <div>
        <label htmlFor="vision-classify-model" className={labelCls}>Model</label>
        <select
          id="vision-classify-model"
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
        <label htmlFor="vision-classify-system-prompt" className={labelCls}>
          System prompt override <span className="text-text-tertiary font-normal">(optional)</span>
        </label>
        <textarea
          id="vision-classify-system-prompt"
          rows={3}
          spellCheck={false}
          className={`${inputCls} resize-y`}
          value={data.systemPrompt ?? ''}
          onChange={(e) => onChange({ systemPrompt: e.target.value || undefined })}
          placeholder="Leave blank to use the default classification system prompt."
        />
      </div>

      {/* Max output tokens */}
      <div>
        <label htmlFor="vision-classify-max-output-tokens" className={labelCls}>
          Max output tokens <span className="text-text-tertiary font-normal">(default 256)</span>
        </label>
        <input
          id="vision-classify-max-output-tokens"
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
    </NodeConfigShell>
  );
}
