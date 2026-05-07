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

import type { ActionNodeData, ActionType } from '../../../../types/pipeline';
import { ConfigField } from '../shared';
import RetryPolicyEditor from '../RetryPolicyEditor';

export interface ActionConfigProps {
  data: ActionNodeData;
  onChange: (patch: Partial<ActionNodeData>) => void;
}

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
    <div className="flex flex-col gap-3 px-4 py-3">
      {/* Action type */}
      <ConfigField label="Action type" required>
        <select
          className="border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-inherit"
          value={data.actionType}
          onChange={(e) => onChange({ actionType: e.target.value as ActionType, config: {} })}
        >
          {ACTION_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </ConfigField>

      {/* Per-subtype fields */}
      <ConfigField label="Configuration">
        <div className="flex flex-col gap-2.5">
          {fieldDefs.map(fd => (
            <div key={fd.key}>
              <label className="text-[11px] font-semibold text-text-secondary">{fd.label}</label>
              {fd.multiline ? (
                <textarea
                  className="border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-inherit resize-y min-h-[48px] mt-0.5"
                  rows={2}
                  placeholder={fd.placeholder}
                  value={typeof config[fd.key] === 'string' ? (config[fd.key] as string) : ''}
                  onChange={(e) => setConfigField(fd.key, e.target.value)}
                />
              ) : (
                <input
                  type="text"
                  className="border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-inherit mt-0.5"
                  placeholder={fd.placeholder}
                  value={typeof config[fd.key] === 'string' ? (config[fd.key] as string) : ''}
                  onChange={(e) => setConfigField(fd.key, e.target.value)}
                />
              )}
              {fd.help && <div className="text-[11px] text-text-tertiary mt-0.5">{fd.help}</div>}
            </div>
          ))}
        </div>
      </ConfigField>

      {/* Idempotent */}
      <div>
        <label className="text-xs font-semibold text-text-secondary flex items-center gap-1.5">
          <input
            type="checkbox"
            checked={!!data.idempotent}
            onChange={(e) => onChange({ idempotent: e.target.checked })}
          />
          Idempotent
        </label>
        <div className="text-[11px] text-text-tertiary mt-0.5">This action is safe to retry.</div>
      </div>

      {/* Idempotency mode — visible only when idempotent is checked */}
      {data.idempotent && (
        <ConfigField label="Dedup scope">
          <select
            className="border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-inherit"
            value={data.idempotencyMode ?? 'per-step'}
            onChange={(e) => onChange({ idempotencyMode: e.target.value as 'per-attempt' | 'per-step' })}
          >
            <option value="per-step">Per step — fire once regardless of retries</option>
            <option value="per-attempt">Per attempt — fire once per retry window</option>
          </select>
          <div className="text-[11px] text-text-tertiary mt-0.5">
            {(data.idempotencyMode ?? 'per-step') === 'per-step'
              ? 'Retries skip this action if it already succeeded. Best for post-comment, notify.'
              : 'Each retry attempt can execute the action. Best for idempotent PUTs/webhooks.'}
          </div>
        </ConfigField>
      )}

      {/* Retry policy (hub#1289) */}
      <RetryPolicyEditor
        value={data.retryPolicy}
        onChange={(next) => onChange({ retryPolicy: next })}
      />

      {/* On error */}
      <ConfigField label="On error">
        <div className="flex flex-col gap-1.5">
          <label className="flex items-center gap-1.5 text-[13px] text-text-primary cursor-pointer">
            <input
              type="radio"
              name="action-on-error"
              checked={onErrorUI === 'route-error'}
              onChange={() => setOnErrorUI('route-error')}
            />
            Route to error handle
          </label>
          <label className="flex items-center gap-1.5 text-[13px] text-text-primary cursor-pointer">
            <input
              type="radio"
              name="action-on-error"
              checked={onErrorUI === 'halt'}
              onChange={() => setOnErrorUI('halt')}
            />
            Halt pipeline
          </label>
          <label className="flex items-center gap-1.5 text-[13px] text-text-primary cursor-pointer">
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
              className="border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-16 flex-none font-inherit"
              value={retryCount}
              onChange={(e) => {
                const n = Math.max(1, parseInt(e.target.value, 10) || 1);
                onChange({ onError: 'fail-run', config: { ...config, retryCount: n } });
              }}
            />
            times
          </label>
        </div>
      </ConfigField>
    </div>
  );
}
