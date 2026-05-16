// frontend/src/components/pipelines/nodes/llm/LLMConfig.tsx
//
// Config panel for LLM nodes. See PIPELINES_PLAN.md §18.10.
//
// Provider + model dropdowns, system prompt + user template with
// clickable variable pills (insert at cursor), and a collapsible
// Advanced section for temperature / maxTokens / streaming.

import { useState } from 'react';
import type { LLMNodeData, LLMProvider } from '../../../../types/pipeline';
import { ConfigField, ConfigSection, NodeConfigShell } from '../shared';
import { cn } from '../../../../lib/cn';
import CodeEditor from '../../../shared/CodeEditor';
import RetryPolicyEditor from '../RetryPolicyEditor';

export interface LLMConfigProps {
  data: LLMNodeData;
  onChange: (patch: Partial<LLMNodeData>) => void;
}

const MODELS_BY_PROVIDER: Record<LLMProvider, string[]> = {
  anthropic: [
    'claude-opus-4-7',
    'claude-sonnet-4-6',
    'claude-haiku-4-5-20251001',
  ],
  bedrock: [
    'claude-opus-4-7',
    'claude-sonnet-4-6',
    'claude-haiku-4-5-20251001',
  ],
  // CLI aliases — `claude --model sonnet` resolves to the latest of each tier
  // server-side, so we don't have to chase model-ID bumps in the frontend.
  'claude-code': [
    'opus',
    'sonnet',
    'haiku',
  ],
};

const VARIABLES = [
  'context.doc.body',
  'context.doc.title',
  'context.trigger.userId',
  'context.steps',
];

const SAMPLE_CONTEXT: Record<string, string> = {
  'context.doc.body': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  'context.doc.title': 'Sample Document Title',
  'context.trigger.userId': 'user_abc123',
  'context.steps': '["step-1: fetched document", "step-2: validated schema"]',
};

function resolveTemplate(template: string): string {
  return template.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (_, key) => {
    return SAMPLE_CONTEXT[key] ?? `{{${key}}}`;
  });
}

export default function LLMConfig({ data, onChange }: LLMConfigProps) {
  const [previewOpen, setPreviewOpen] = useState(false);

  const systemMissing = !data.systemPrompt?.trim();
  const userMissing   = !data.userPromptTemplate?.trim();

  // Switching provider resets the model to the provider's first option if
  // the current model isn't valid for the new provider.
  const setProvider = (provider: LLMProvider) => {
    const models = MODELS_BY_PROVIDER[provider];
    const model = models.includes(data.model) ? data.model : models[0];
    onChange({ provider, model });
  };

  return (
    <NodeConfigShell>
      {/* Provider */}
      <ConfigField label="Provider" required>
        <select
          className="border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-inherit"
          value={data.provider}
          onChange={(e) => setProvider(e.target.value as LLMProvider)}
        >
          <option value="anthropic">Anthropic</option>
          <option value="bedrock">Bedrock</option>
          <option value="claude-code">Claude Code (subprocess)</option>
        </select>
      </ConfigField>

      {/* Model */}
      <ConfigField label="Model" required>
        <select
          className="border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-inherit"
          value={data.model}
          onChange={(e) => onChange({ model: e.target.value })}
        >
          {MODELS_BY_PROVIDER[data.provider].map(m => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </ConfigField>

      {/* System prompt */}
      <ConfigField
        label="System prompt"
        required
        error={systemMissing ? 'System prompt is required.' : undefined}
        help={!systemMissing ? 'Sets the model\'s role and constraints.' : undefined}
      >
        <textarea
          className={cn(
            'border rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-inherit resize-y min-h-[80px]',
            systemMissing ? 'border-[#dc2626]' : 'border-border-field',
          )}
          value={data.systemPrompt}
          onChange={(e) => onChange({ systemPrompt: e.target.value })}
        />
      </ConfigField>

      {/* User prompt template */}
      <ConfigField
        label="User prompt template"
        required
        error={userMissing ? 'User prompt template is required.' : undefined}
        help={!userMissing ? 'Supports {{ context.* }} substitution — click a pill above to insert.' : undefined}
      >
        <CodeEditor
          value={data.userPromptTemplate}
          onChange={(next) => onChange({ userPromptTemplate: next })}
          language="template"
          variables={VARIABLES}
          minLines={6}
          aria-label="User prompt template"
        />
      </ConfigField>

      {/* Advanced */}
      <ConfigSection title="Advanced" defaultCollapsed>
        <ConfigField
          label="Temperature"
          help="0 = deterministic, 1 = creative."
        >
          <span className="text-text-tertiary text-xs ml-2">
            {(data.temperature ?? 0.7).toFixed(1)}
          </span>
          <input
            type="range"
            min={0}
            max={1}
            step={0.1}
            value={data.temperature ?? 0.7}
            onChange={(e) => onChange({ temperature: parseFloat(e.target.value) })}
            className="w-full mt-1"
          />
        </ConfigField>

        <ConfigField label="Max tokens" help="Upper bound on response length.">
          <input
            type="number"
            min={1}
            className="border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-inherit"
            value={data.maxTokens ?? ''}
            onChange={(e) => {
              const v = e.target.value;
              onChange({ maxTokens: v === '' ? undefined : Math.max(1, parseInt(v, 10) || 0) });
            }}
          />
        </ConfigField>

        <div>
          <label className="text-xs font-semibold text-text-secondary flex items-center gap-1.5">
            <input
              type="checkbox"
              checked={data.streaming}
              onChange={(e) => onChange({ streaming: e.target.checked })}
            />
            Streaming
          </label>
          <div className="text-[11px] text-text-tertiary mt-0.5">Stream tokens as they are generated.</div>
        </div>

        {/* Retry policy (hub#1289) */}
        <RetryPolicyEditor
          value={data.retryPolicy}
          onChange={(next) => onChange({ retryPolicy: next })}
        />
      </ConfigSection>

      {/* Preview */}
      <button
        type="button"
        onClick={() => setPreviewOpen((v) => !v)}
        className="px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-inherit shrink-0"
      >
        {previewOpen ? '▾' : '▶'} Preview with sample context
      </button>

      {previewOpen && (
        <div className="bg-surface-inset border border-border rounded-lg p-3 flex flex-col gap-2.5">
          <div>
            <div className="text-[11px] font-semibold text-text-secondary mb-1">
              Resolved system prompt
            </div>
            <pre className="text-xs whitespace-pre-wrap break-words m-0 text-text-primary bg-white p-2 rounded-md border border-border max-h-[120px] overflow-auto">
              {resolveTemplate(data.systemPrompt || '(empty)')}
            </pre>
          </div>
          <div>
            <div className="text-[11px] font-semibold text-text-secondary mb-1">
              Resolved user prompt
            </div>
            <pre className="text-xs whitespace-pre-wrap break-words m-0 text-text-primary bg-white p-2 rounded-md border border-border max-h-[200px] overflow-auto">
              {resolveTemplate(data.userPromptTemplate || '(empty)')}
            </pre>
          </div>
          <div className="text-[11px] text-text-tertiary">
            Sample values: {Object.keys(SAMPLE_CONTEXT).map(k => `{{${k}}}`).join(', ')}
          </div>
        </div>
      )}
    </NodeConfigShell>
  );
}
