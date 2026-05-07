// frontend/src/components/pipelines/nodes/action/ActionConfig.tsx
//
// Config panel for Action nodes. See PIPELINES_PLAN.md §18.10.
//
// Per-subtype config lives in `data.config` (Record<string, unknown>) —
// a simple key/value editor covers all five subtypes for Phase 1. Real
// per-subtype forms arrive in Phase 2 once action adapters are defined.
//
// Error handling surfaces three choices in the UI:
//   - Route to error handle → onError = 'route-error'
//   - Halt pipeline         → onError = 'fail-run'
//   - Retry N times         → onError = 'fail-run' with config.retryCount = N
// The runtime type only admits two onError values, so "Retry" is
// represented as a halt with an attached retry budget in config.

import type { CSSProperties } from 'react';
import type { ActionNodeData, ActionType } from '../../../../types/pipeline';
import { fieldStyle, colors } from '../../../../constants/styles';
import RetryPolicyEditor from '../RetryPolicyEditor';

export interface ActionConfigProps {
  data: ActionNodeData;
  onChange: (patch: Partial<ActionNodeData>) => void;
}

const labelStyle: CSSProperties = { fontSize: 12, fontWeight: 600, color: colors.textSecondary };
const requiredDot: CSSProperties = { color: '#dc2626', marginLeft: 4 };
const helpStyle: CSSProperties = { fontSize: 11, color: colors.textTertiary, marginTop: 2 };

const ACTION_OPTIONS: Array<{ value: ActionType; label: string }> = [
  { value: 'update-document', label: 'Update document' },
  { value: 'post-comment',    label: 'Post comment' },
  { value: 'notify',          label: 'Notify user' },
  { value: 'webhook',         label: 'Webhook' },
  { value: 'mcp-tool',        label: 'MCP tool' },
  { value: 'sync-back',       label: 'Sync back to source' },
];

interface FieldDef {
  key: string;
  label: string;
  placeholder: string;
  help?: string;
  multiline?: boolean;
}

const SUBTYPE_FIELD_DEFS: Record<ActionType, FieldDef[]> = {
  'update-document': [
    { key: 'documentId', label: 'Document ID', placeholder: '{{current}}', help: 'Use {{current}} for the triggering document' },
    { key: 'field', label: 'Field name', placeholder: 'e.g. status, tags' },
    { key: 'value', label: 'New value', placeholder: '{{context.steps.<id>.response}}', help: 'Supports {{context.*}} template variables' },
  ],
  'post-comment': [
    { key: 'documentId', label: 'Document ID', placeholder: '{{current}}', help: 'Use {{current}} for the triggering document' },
    { key: 'body', label: 'Comment body', placeholder: '{{context.steps.<id>.response}}', multiline: true, help: 'Supports {{context.*}} template variables' },
  ],
  'notify': [
    { key: 'channel', label: 'Channel / Room', placeholder: 'e.g. general, moderation', help: 'Room ID where the notification is posted' },
    { key: 'message', label: 'Message', placeholder: 'Flagged: {{context.steps.<id>.output.reason}}', multiline: true, help: 'Supports {{context.*}} template variables' },
  ],
  'webhook': [
    { key: 'url', label: 'URL', placeholder: 'https://...' },
    { key: 'method', label: 'Method', placeholder: 'POST' },
    { key: 'body', label: 'Body (JSON)', placeholder: '{"key": "{{context.value}}"}', multiline: true },
  ],
  'mcp-tool': [
    { key: 'toolName', label: 'Tool name', placeholder: 'e.g. search, summarize' },
    { key: 'input', label: 'Input (JSON)', placeholder: '{}', multiline: true },
  ],
  'sync-back': [
    { key: 'sourceId', label: 'Source ID', placeholder: '{{document.metadata.sourceId}}', help: 'Ingest source to sync back to' },
    { key: 'documentId', label: 'Document ID', placeholder: '{{document.id}}', help: 'Document to push back to source' },
  ],
};

export default function ActionConfig({ data, onChange }: ActionConfigProps) {
  const fieldDefs = SUBTYPE_FIELD_DEFS[data.actionType];
  const config = data.config ?? {};
  const retryCount = typeof config.retryCount === 'number' ? config.retryCount : 3;

  // Map the UI three-way selection from the stored shape.
  const onErrorUI: 'route-error' | 'halt' | 'retry' =
    data.onError === 'route-error' ? 'route-error'
    : typeof config.retryCount === 'number' ? 'retry'
    : 'halt';

  const setConfigField = (key: string, value: unknown) => {
    onChange({ config: { ...config, [key]: value } });
  };

  const setOnErrorUI = (ui: 'route-error' | 'halt' | 'retry') => {
    if (ui === 'route-error') {
      const { retryCount: _rc, ...rest } = config;
      onChange({ onError: 'route-error', config: rest });
    } else if (ui === 'halt') {
      const { retryCount: _rc, ...rest } = config;
      onChange({ onError: 'fail-run', config: rest });
    } else {
      onChange({ onError: 'fail-run', config: { ...config, retryCount } });
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '12px 16px' }}>
      {/* Action type */}
      <div>
        <label style={labelStyle}>Action type<span style={requiredDot}>●</span></label>
        <select
          style={{ ...fieldStyle, marginTop: 4 }}
          value={data.actionType}
          onChange={(e) => onChange({ actionType: e.target.value as ActionType, config: {} })}
        >
          {ACTION_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      {/* Per-subtype fields */}
      <div>
        <label style={labelStyle}>Configuration</label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 4 }}>
          {fieldDefs.map(fd => (
            <div key={fd.key}>
              <label style={{ ...labelStyle, fontSize: 11 }}>{fd.label}</label>
              {fd.multiline ? (
                <textarea
                  style={{ ...fieldStyle, marginTop: 2, resize: 'vertical', minHeight: 48, fontFamily: 'inherit' }}
                  rows={2}
                  placeholder={fd.placeholder}
                  value={typeof config[fd.key] === 'string' ? (config[fd.key] as string) : ''}
                  onChange={(e) => setConfigField(fd.key, e.target.value)}
                />
              ) : (
                <input
                  type="text"
                  style={{ ...fieldStyle, marginTop: 2 }}
                  placeholder={fd.placeholder}
                  value={typeof config[fd.key] === 'string' ? (config[fd.key] as string) : ''}
                  onChange={(e) => setConfigField(fd.key, e.target.value)}
                />
              )}
              {fd.help && <div style={helpStyle}>{fd.help}</div>}
            </div>
          ))}
        </div>
      </div>

      {/* Idempotent */}
      <div>
        <label style={{ ...labelStyle, display: 'flex', alignItems: 'center', gap: 6 }}>
          <input
            type="checkbox"
            checked={!!data.idempotent}
            onChange={(e) => onChange({ idempotent: e.target.checked })}
          />
          Idempotent
        </label>
        <div style={helpStyle}>This action is safe to retry.</div>
      </div>

      {/* Idempotency mode — visible only when idempotent is checked */}
      {data.idempotent && (
        <div>
          <label style={labelStyle}>Dedup scope</label>
          <select
            style={{ ...fieldStyle, marginTop: 4 }}
            value={data.idempotencyMode ?? 'per-step'}
            onChange={(e) => onChange({ idempotencyMode: e.target.value as 'per-attempt' | 'per-step' })}
          >
            <option value="per-step">Per step — fire once regardless of retries</option>
            <option value="per-attempt">Per attempt — fire once per retry window</option>
          </select>
          <div style={helpStyle}>
            {(data.idempotencyMode ?? 'per-step') === 'per-step'
              ? 'Retries skip this action if it already succeeded. Best for post-comment, notify.'
              : 'Each retry attempt can execute the action. Best for idempotent PUTs/webhooks.'}
          </div>
        </div>
      )}

      {/* Retry policy (hub#1289) — canonical retryPolicy field, separate from
          the legacy config.retryCount UI below. */}
      <RetryPolicyEditor
        value={data.retryPolicy}
        onChange={(next) => onChange({ retryPolicy: next })}
      />

      {/* On error */}
      <div>
        <label style={labelStyle}>On error</label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 4 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: colors.textPrimary, cursor: 'pointer' }}>
            <input
              type="radio"
              name="action-on-error"
              checked={onErrorUI === 'route-error'}
              onChange={() => setOnErrorUI('route-error')}
            />
            Route to error handle
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: colors.textPrimary, cursor: 'pointer' }}>
            <input
              type="radio"
              name="action-on-error"
              checked={onErrorUI === 'halt'}
              onChange={() => setOnErrorUI('halt')}
            />
            Halt pipeline
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: colors.textPrimary, cursor: 'pointer' }}>
            <input
              type="radio"
              name="action-on-error"
              checked={onErrorUI === 'retry'}
              onChange={() => setOnErrorUI('retry')}
            />
            Retry up to
            <input
              type="number"
              min={1}
              disabled={onErrorUI !== 'retry'}
              style={{ ...fieldStyle, width: 64, flex: 'none' }}
              value={retryCount}
              onChange={(e) => {
                const n = Math.max(1, parseInt(e.target.value, 10) || 1);
                onChange({ onError: 'fail-run', config: { ...config, retryCount: n } });
              }}
            />
            times
          </label>
        </div>
      </div>
    </div>
  );
}
