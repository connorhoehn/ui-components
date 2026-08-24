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

import { useId } from 'react';
import type { ActionNodeData, ActionType } from '../../../../types/pipeline';
import { ConfigField, NodeConfigShell, ToggleField } from '../shared';
import RetryPolicyEditor from '../RetryPolicyEditor';
import { Input } from '../../../forms/Input';
import { Select } from '../../../forms/Select';
import { Textarea } from '../../../forms/Textarea';
import { NumberInput } from '../../../forms/NumberInput';
import { RadioGroup } from '../../../forms/RadioGroup';

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

const ON_ERROR_OPTIONS = [
  { value: 'route-error' as const, label: 'Route to error handle' },
  { value: 'halt' as const, label: 'Halt pipeline' },
  { value: 'retry' as const, label: 'Retry a fixed number of times' },
];

const IDEMPOTENCY_MODES = [
  { value: 'per-step', label: 'Per step — fire once regardless of retries' },
  { value: 'per-attempt', label: 'Per attempt — fire once per retry window' },
];

export default function ActionConfig({ data, onChange }: ActionConfigProps) {
  const uid = useId();
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
    <NodeConfigShell>
      {/* Action type */}
      <ConfigField
        label="Action type"
        required
        controlId={`${uid}-action-type`}
        render={({ controlId, describedById }) => (
          <Select
            size="sm"
            id={controlId}
            aria-describedby={describedById}
            value={data.actionType}
            onChange={(e) => onChange({ actionType: e.target.value as ActionType, config: {} })}
            options={ACTION_OPTIONS}
          />
        )}
      />

      {/* Per-subtype fields — a SET of controls, so "Configuration" names the
          group. The per-field labels inside had the same bug ConfigField had:
          no htmlFor and no wrapped control, so each named nothing and the
          control fell back to an aria-label that duplicated it. Each row now
          associates its own label, and its help text via aria-describedby. */}
      <ConfigField
        label="Configuration"
        render={() => (
          <div role="group" aria-label="Configuration" className="flex flex-col gap-2.5">
            {fieldDefs.map(fd => {
              const fieldId = `${uid}-cfg-${fd.key}`;
              const helpId = fd.help ? `${fieldId}-help` : undefined;
              const value =
                typeof config[fd.key] === 'string' ? (config[fd.key] as string) : '';
              return (
                <div key={fd.key}>
                  <label
                    htmlFor={fieldId}
                    className="text-[11px] font-semibold text-text-secondary"
                  >
                    {fd.label}
                  </label>
                  {fd.multiline ? (
                    <Textarea
                      rows={2}
                      id={fieldId}
                      aria-describedby={helpId}
                      placeholder={fd.placeholder}
                      value={value}
                      onChange={(e) => setConfigField(fd.key, e.target.value)}
                    />
                  ) : (
                    <Input
                      size="sm"
                      id={fieldId}
                      aria-describedby={helpId}
                      placeholder={fd.placeholder}
                      value={value}
                      onChange={(e) => setConfigField(fd.key, e.target.value)}
                    />
                  )}
                  {fd.help && (
                    <div id={helpId} className="text-[11px] text-text-tertiary mt-0.5">
                      {fd.help}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      />

      <ToggleField
        label="Idempotent"
        checked={!!data.idempotent}
        onChange={(idempotent) => onChange({ idempotent })}
        help="This action is safe to retry."
        data-testid="action-idempotent"
      />

      {/* Idempotency mode — visible only when idempotent is checked */}
      {data.idempotent && (
        <ConfigField
          label="Dedup scope"
          controlId={`${uid}-dedup-scope`}
          render={({ controlId }) => (
            <>
              <Select
                size="sm"
                id={controlId}
                // This field explains itself with its own hint node rather than
                // ConfigField's `help`, so it points aria-describedby there.
                aria-describedby={`${uid}-dedup-help`}
                value={data.idempotencyMode ?? 'per-step'}
                onChange={(e) =>
                  onChange({ idempotencyMode: e.target.value as 'per-attempt' | 'per-step' })
                }
                options={IDEMPOTENCY_MODES}
              />
              <div id={`${uid}-dedup-help`} className="text-[11px] text-text-tertiary mt-0.5">
                {(data.idempotencyMode ?? 'per-step') === 'per-step'
                  ? 'Retries skip this action if it already succeeded. Best for post-comment, notify.'
                  : 'Each retry attempt can execute the action. Best for idempotent PUTs/webhooks.'}
              </div>
            </>
          )}
        />
      )}

      {/* Retry policy (hub#1289) */}
      <RetryPolicyEditor
        value={data.retryPolicy}
        onChange={(next) => onChange({ retryPolicy: next })}
      />

      {/* On error — a radio set plus its dependent attempt count, so the label
          names a group; htmlFor has no single control to point at. */}
      <ConfigField
        label="On error"
        render={() => (
          <div role="group" aria-label="On error">
            <RadioGroup
              name="action-on-error"
              value={onErrorUI}
              onChange={setOnErrorUI}
              options={ON_ERROR_OPTIONS}
              data-testid="action-on-error"
            />

            {/* The count sits outside the radio label rather than inside it: a
                control nested in a <label> steals clicks meant for the option. */}
            {onErrorUI === 'retry' && (
              <div className="mt-2 flex items-center gap-2">
                <span className="text-[11px] font-semibold text-text-secondary">
                  Attempts
                </span>
                <NumberInput
                  size="sm"
                  min={1}
                  value={retryCount}
                  onChange={(n) =>
                    onChange({ onError: 'fail-run', config: { ...config, retryCount: n } })
                  }
                  aria-label="Attempts"
                  data-testid="action-retry-count"
                />
              </div>
            )}
          </div>
        )}
      />
    </NodeConfigShell>
  );
}
