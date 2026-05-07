// frontend/src/components/pipelines/nodes/llm/LLMConfig.tsx
//
// Config panel for LLM nodes. See PIPELINES_PLAN.md §18.10.
//
// Provider + model dropdowns, system prompt + user template with
// clickable variable pills (insert at cursor), and a collapsible
// Advanced section for temperature / maxTokens / streaming.

import { useState } from 'react';
import type { CSSProperties } from 'react';
import type { LLMNodeData, LLMProvider } from '../../../../types/pipeline';
import { fieldStyle, saveBtnStyle, colors } from '../../../../constants/styles';
import CodeEditor from '../../../shared/CodeEditor';
import RetryPolicyEditor from '../RetryPolicyEditor';

export interface LLMConfigProps {
  data: LLMNodeData;
  onChange: (patch: Partial<LLMNodeData>) => void;
}

const labelStyle: CSSProperties = { fontSize: 12, fontWeight: 600, color: colors.textSecondary };
const requiredDot: CSSProperties = { color: '#dc2626', marginLeft: 4 };
const helpStyle: CSSProperties = { fontSize: 11, color: colors.textTertiary, marginTop: 2 };
const errorStyle: CSSProperties = { fontSize: 11, color: '#dc2626', marginTop: 2 };
const errorFieldStyle: CSSProperties = { ...fieldStyle, borderColor: '#dc2626' };

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
  const [advancedOpen, setAdvancedOpen] = useState(false);
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '12px 16px' }}>
      {/* Provider */}
      <div>
        <label style={labelStyle}>Provider<span style={requiredDot}>●</span></label>
        <select
          style={{ ...fieldStyle, marginTop: 4 }}
          value={data.provider}
          onChange={(e) => setProvider(e.target.value as LLMProvider)}
        >
          <option value="anthropic">Anthropic</option>
          <option value="bedrock">Bedrock</option>
          <option value="claude-code">Claude Code (subprocess)</option>
        </select>
      </div>

      {/* Model */}
      <div>
        <label style={labelStyle}>Model<span style={requiredDot}>●</span></label>
        <select
          style={{ ...fieldStyle, marginTop: 4 }}
          value={data.model}
          onChange={(e) => onChange({ model: e.target.value })}
        >
          {MODELS_BY_PROVIDER[data.provider].map(m => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </div>

      {/* System prompt */}
      <div>
        <label style={labelStyle}>System prompt<span style={requiredDot}>●</span></label>
        <textarea
          style={{
            ...(systemMissing ? errorFieldStyle : fieldStyle),
            marginTop: 4,
            minHeight: 80,
            resize: 'vertical',
            fontFamily: 'inherit',
          }}
          value={data.systemPrompt}
          onChange={(e) => onChange({ systemPrompt: e.target.value })}
        />
        {systemMissing
          ? <div style={errorStyle}>System prompt is required.</div>
          : <div style={helpStyle}>Sets the model's role and constraints.</div>
        }
      </div>

      {/* User prompt template */}
      <div>
        <label style={labelStyle}>User prompt template<span style={requiredDot}>●</span></label>
        <div style={{ marginTop: 4 }}>
          <CodeEditor
            value={data.userPromptTemplate}
            onChange={(next) => onChange({ userPromptTemplate: next })}
            language="template"
            variables={VARIABLES}
            minLines={6}
            aria-label="User prompt template"
          />
        </div>
        {userMissing
          ? <div style={errorStyle}>User prompt template is required.</div>
          : <div style={helpStyle}>Supports {'{{ context.* }}'} substitution — click a pill above to insert.</div>
        }
      </div>

      {/* Advanced */}
      <div>
        <button
          type="button"
          onClick={() => setAdvancedOpen(v => !v)}
          style={{
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            fontFamily: 'inherit',
            fontSize: 12,
            fontWeight: 600,
            color: colors.textSecondary,
            display: 'flex',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <span>{advancedOpen ? '▾' : '▸'}</span> Advanced
        </button>

        {advancedOpen && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 8 }}>
            <div>
              <label style={labelStyle}>
                Temperature <span style={{ color: colors.textTertiary, fontWeight: 400 }}>
                  {(data.temperature ?? 0.7).toFixed(1)}
                </span>
              </label>
              <input
                type="range"
                min={0}
                max={1}
                step={0.1}
                value={data.temperature ?? 0.7}
                onChange={(e) => onChange({ temperature: parseFloat(e.target.value) })}
                style={{ width: '100%', marginTop: 4 }}
              />
              <div style={helpStyle}>0 = deterministic, 1 = creative.</div>
            </div>

            <div>
              <label style={labelStyle}>Max tokens</label>
              <input
                type="number"
                min={1}
                style={{ ...fieldStyle, marginTop: 4 }}
                value={data.maxTokens ?? ''}
                onChange={(e) => {
                  const v = e.target.value;
                  onChange({ maxTokens: v === '' ? undefined : Math.max(1, parseInt(v, 10) || 0) });
                }}
              />
              <div style={helpStyle}>Upper bound on response length.</div>
            </div>

            <div>
              <label style={{ ...labelStyle, display: 'flex', alignItems: 'center', gap: 6 }}>
                <input
                  type="checkbox"
                  checked={data.streaming}
                  onChange={(e) => onChange({ streaming: e.target.checked })}
                />
                Streaming
              </label>
              <div style={helpStyle}>Stream tokens as they are generated.</div>
            </div>

            {/* Retry policy (hub#1289). Currently consulted only by action
                nodes in distributed-core; LLM auto-retry awaits hub#1686. */}
            <RetryPolicyEditor
              value={data.retryPolicy}
              onChange={(next) => onChange({ retryPolicy: next })}
            />
          </div>
        )}
      </div>

      {/* Preview */}
      <button
        type="button"
        onClick={() => setPreviewOpen((v) => !v)}
        style={saveBtnStyle(false)}
      >
        {previewOpen ? '▾' : '▶'} Preview with sample context
      </button>

      {previewOpen && (
        <div style={{
          background: colors.surfaceInset,
          border: `1px solid ${colors.border}`,
          borderRadius: 8,
          padding: 12,
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: colors.textSecondary, marginBottom: 4 }}>
              Resolved system prompt
            </div>
            <pre style={{
              fontSize: 12,
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              margin: 0,
              color: colors.textPrimary,
              background: colors.surface,
              padding: 8,
              borderRadius: 6,
              border: `1px solid ${colors.border}`,
              maxHeight: 120,
              overflow: 'auto',
            }}>
              {resolveTemplate(data.systemPrompt || '(empty)')}
            </pre>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: colors.textSecondary, marginBottom: 4 }}>
              Resolved user prompt
            </div>
            <pre style={{
              fontSize: 12,
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              margin: 0,
              color: colors.textPrimary,
              background: colors.surface,
              padding: 8,
              borderRadius: 6,
              border: `1px solid ${colors.border}`,
              maxHeight: 200,
              overflow: 'auto',
            }}>
              {resolveTemplate(data.userPromptTemplate || '(empty)')}
            </pre>
          </div>
          <div style={{ fontSize: 11, color: colors.textTertiary }}>
            Sample values: {Object.keys(SAMPLE_CONTEXT).map(k => `{{${k}}}`).join(', ')}
          </div>
        </div>
      )}
    </div>
  );
}
