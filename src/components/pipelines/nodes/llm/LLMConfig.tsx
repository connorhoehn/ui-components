// frontend/src/components/pipelines/nodes/llm/LLMConfig.tsx
//
// Config panel for LLM nodes. See PIPELINES_PLAN.md §18.10.
//
// Provider + model dropdowns, system prompt + user template with
// clickable variable pills (insert at cursor), and a collapsible
// Advanced section for temperature / maxTokens / streaming.

import { useId, useState } from 'react';
import type { LLMNodeData, LLMProvider } from '../../../../types/pipeline';
import { ConfigField, ConfigSection, NodeConfigShell, ToggleField } from '../shared';
import { cn } from '../../../../lib/cn';
import CodeEditor from '../../../shared/CodeEditor';
import RetryPolicyEditor from '../RetryPolicyEditor';
import { ContextVariablePicker } from '../../context/ContextVariablePicker';
import { useUpstreamContext } from '../../context/useUpstreamContext';
import { useModelOptionsResolver } from '../../services/PipelineEditorServicesContext';
import { Select } from '../../../forms/Select';
import { Textarea } from '../../../forms/Textarea';
import { NumberInput } from '../../../forms/NumberInput';
import { Slider } from '../../../forms/Slider';

export interface LLMConfigProps {
  data: LLMNodeData;
  onChange: (patch: Partial<LLMNodeData>) => void;
  /**
   * Node being edited. Supplied by ConfigPanel; when present the variable pills
   * and the resolved-prompt preview come from the node's real upstream graph
   * instead of a hardcoded sample.
   */
  nodeId?: string;
}

/**
 * Default model choices per provider, shipped so the editor is usable with no
 * host wiring. A hardcoded list goes stale the moment a host runs a different
 * deployment or the provider ships a new tier, so a host replaces any of these
 * through `modelOptions` on the editor services seam, keyed `llm:<provider>`.
 */
/** The providers the LLM node's data type allows. Values are frozen API. */
const PROVIDER_OPTIONS = [
  { value: 'anthropic', label: 'Anthropic' },
  { value: 'bedrock', label: 'Bedrock' },
  { value: 'claude-code', label: 'Claude Code (subprocess)' },
];

export const DEFAULT_MODELS_BY_PROVIDER: Record<LLMProvider, string[]> = {
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

/**
 * Placeholder for a path in the preview.
 *
 * Describes the SHAPE rather than inventing a value. The previous version
 * substituted lorem-ipsum for four hardcoded paths, which made the preview look
 * authoritative while telling the author nothing about their own pipeline.
 */
function previewValueFor(path: string, kind: string): string {
  switch (kind) {
    case 'image': return `<image from ${path}>`;
    case 'number': return '123';
    case 'boolean': return 'true';
    case 'array': return '[ … ]';
    case 'object': return '{ … }';
    default: return `<${path}>`;
  }
}

function resolveTemplate(template: string, kinds: Map<string, string>): string {
  return template.replace(/\{\{\s*([\w.[\]-]+)\s*\}\}/g, (_, key: string) => {
    const kind = kinds.get(key);
    // Unknown path: leave it visibly unresolved rather than faking a value.
    return kind ? previewValueFor(key, kind) : `{{${key}}}`;
  });
}

export default function LLMConfig({ data, onChange, nodeId }: LLMConfigProps) {
  const uid = useId();
  const [previewOpen, setPreviewOpen] = useState(false);
  const { paths, unresolved } = useUpstreamContext(nodeId ?? null);
  const kinds = new Map<string, string>(paths.map((p) => [p.path, p.kind]));
  const unresolvedPaths = unresolved(
    `${data.systemPrompt ?? ''}\n${data.userPromptTemplate ?? ''}`,
  );

  const systemMissing = !data.systemPrompt?.trim();
  const userMissing   = !data.userPromptTemplate?.trim();

  const resolveModels = useModelOptionsResolver();
  const modelsFor = (provider: LLMProvider) =>
    resolveModels(
      `llm:${provider}`,
      DEFAULT_MODELS_BY_PROVIDER[provider].map((value) => ({ value })),
    );
  const modelOptions = modelsFor(data.provider);

  // Switching provider resets the model to the provider's first option if
  // the current model isn't valid for the new provider.
  const setProvider = (provider: LLMProvider) => {
    // Read the NEW provider's list from the host, falling back to the default.
    const models = modelsFor(provider).map((m) => m.value);
    const model = models.includes(data.model) ? data.model : models[0];
    onChange({ provider, model });
  };

  return (
    <NodeConfigShell>
      {/* Provider */}
      <ConfigField
        label="Provider"
        required
        controlId={`${uid}-provider`}
        render={({ controlId, describedById }) => (
          <Select
            size="sm"
            id={controlId}
            aria-describedby={describedById}
            value={data.provider}
            onChange={(e) => setProvider(e.target.value as LLMProvider)}
            options={PROVIDER_OPTIONS}
          />
        )}
      />

      {/* Model */}
      <ConfigField
        label="Model"
        required
        controlId={`${uid}-model`}
        render={({ controlId, describedById }) => (
          <Select
            size="sm"
            id={controlId}
            aria-describedby={describedById}
            value={data.model}
            onChange={(e) => onChange({ model: e.target.value })}
            options={modelOptions.map((m) => ({
              value: m.value,
              label: m.label ?? m.value,
            }))}
          />
        )}
      />

      {/* Available run context, derived from the graph upstream of this node.
          A row of insert buttons, not a labelable control, so the field label
          names the group. */}
      <ConfigField
        label="Available context"
        render={({ labelId }) => (
          <div role="group" aria-labelledby={labelId}>
            <ContextVariablePicker
              paths={paths}
              unresolved={unresolvedPaths}
              onInsert={(token) =>
                onChange({ userPromptTemplate: `${data.userPromptTemplate ?? ''}${token}` })
              }
            />
          </div>
        )}
      />

      {/* System prompt */}
      <ConfigField
        label="System prompt"
        required
        error={systemMissing ? 'System prompt is required.' : undefined}
        help={!systemMissing ? 'Sets the model\'s role and constraints.' : undefined}
        controlId={`${uid}-system-prompt`}
        render={({ controlId, describedById }) => (
          <Textarea
            rows={4}
            invalid={systemMissing}
            id={controlId}
            aria-describedby={describedById}
            value={data.systemPrompt}
            onChange={(e) => onChange({ systemPrompt: e.target.value })}
          />
        )}
      />

      {/* User prompt template */}
      <ConfigField
        label="User prompt template"
        required
        error={userMissing ? 'User prompt template is required.' : undefined}
        help={!userMissing ? 'Supports {{ context.* }} substitution — click a pill above to append.' : undefined}
      >
        {/* CodeEditor accepts no `id`, so ConfigField's htmlFor has nothing to
            point at; the control's own name is kept and already matches the
            visible label verbatim. */}
        <CodeEditor
          value={data.userPromptTemplate}
          onChange={(next) => onChange({ userPromptTemplate: next })}
          language="template"
          variables={paths.map((p) => p.path)}
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
          {/* <Slider> accepts no `id` either, so the same rule applies: one
              name, matching the visible label. */}
          <Slider
            min={0}
            max={1}
            step={0.1}
            value={data.temperature ?? 0.7}
            onChange={(temperature) => onChange({ temperature })}
            readout={(v) => v.toFixed(1)}
            aria-label="Temperature"
            data-testid="llm-temperature"
          />
        </ConfigField>

        <ConfigField
          label="Max tokens"
          help="Upper bound on response length."
          controlId={`${uid}-max-tokens`}
          render={({ controlId, describedById }) => (
            <NumberInput
              size="sm"
              min={1}
              value={data.maxTokens}
              onChange={(maxTokens) => onChange({ maxTokens })}
              onClear={() => onChange({ maxTokens: undefined })}
              id={controlId}
              aria-describedby={describedById}
              data-testid="llm-max-tokens"
            />
          )}
        />

        <div>
          <ToggleField
            label="Streaming"
            checked={data.streaming}
            onChange={(streaming) => onChange({ streaming })}
            help="Stream tokens as they are generated."
            data-testid="llm-streaming"
          />
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
              {resolveTemplate(data.systemPrompt || '(empty)', kinds)}
            </pre>
          </div>
          <div>
            <div className="text-[11px] font-semibold text-text-secondary mb-1">
              Resolved user prompt
            </div>
            <pre className="text-xs whitespace-pre-wrap break-words m-0 text-text-primary bg-white p-2 rounded-md border border-border max-h-[200px] overflow-auto">
              {resolveTemplate(data.userPromptTemplate || '(empty)', kinds)}
            </pre>
          </div>
          <div className="text-[11px] text-text-tertiary">
            {paths.length > 0
              ? 'Placeholders describe the shape of each upstream value; unresolved paths stay in braces.'
              : 'No upstream context — connect this node to see what it can reference.'}
          </div>
        </div>
      )}
    </NodeConfigShell>
  );
}
