// src/components/pipelines/nodes/knowledge-base/KnowledgeBaseConfig.tsx
//
// Config panel for the knowledge-base node (RAG retrieval from a Bedrock
// Knowledge Base). Until now selecting the node showed "Configuration for
// knowledge-base — coming in Phase C", so a placed node kept whatever defaults
// it was created with and none of the retrieval settings could be reached.
//
// The query template is the interesting field: it is what actually gets
// embedded and searched, so it needs the same {{ context.* }} substitution and
// the same unresolved-path warning the LLM prompt gets — a typo'd path there
// silently searches for the literal text of the template.

import type { KnowledgeBaseNodeData } from '../../../../types/pipeline';
import { ConfigField, ConfigSection, NodeConfigShell } from '../shared';
import { Input } from '../../../forms/Input';
import { Textarea } from '../../../forms/Textarea';
import { NumberInput } from '../../../forms/NumberInput';
import RetryPolicyEditor from '../RetryPolicyEditor';
import { ContextVariablePicker } from '../../context/ContextVariablePicker';
import { useUpstreamContext } from '../../context/useUpstreamContext';

export interface KnowledgeBaseConfigProps {
  data: KnowledgeBaseNodeData;
  onChange: (patch: Partial<KnowledgeBaseNodeData>) => void;
  /** Node being edited; drives the real upstream-context pills. */
  nodeId?: string;
}

/** Bedrock caps a single retrieve call well below this; keep the UI honest. */
const MAX_TOP_K = 100;

export default function KnowledgeBaseConfig({
  data,
  onChange,
  nodeId,
}: KnowledgeBaseConfigProps) {
  const { paths, unresolved } = useUpstreamContext(nodeId ?? null);

  const idMissing = !data.knowledgeBaseId?.trim();
  const queryMissing = !data.queryTemplate?.trim();
  const topK = data.topK ?? 0;
  const topKInvalid = !Number.isFinite(topK) || topK < 1 || topK > MAX_TOP_K;

  // A threshold of 0 is meaningful ("keep everything"), so only an out-of-range
  // number is an error — `undefined` means "no threshold", which is also valid.
  const threshold = data.scoreThreshold;
  const thresholdInvalid =
    threshold !== undefined && (threshold < 0 || threshold > 1);

  return (
    <NodeConfigShell>
      <ConfigSection title="Knowledge base">
        <ConfigField
          label="Knowledge base ID"
          required
          error={idMissing ? 'Knowledge base ID is required.' : undefined}
          help={!idMissing ? 'The Bedrock Knowledge Base to retrieve from.' : undefined}
        >
          <Input
            size="sm"
            mono
            spellCheck={false}
            value={data.knowledgeBaseId ?? ''}
            onChange={(e) => onChange({ knowledgeBaseId: e.target.value })}
            placeholder="kb-3f9c1a2b"
            aria-label="Knowledge base ID"
          />
        </ConfigField>

        <ConfigField
          label="Query template"
          required
          error={queryMissing ? 'Query template is required.' : undefined}
          help={
            !queryMissing
              ? 'Text to embed and search. Supports {{ context.* }} substitution.'
              : undefined
          }
        >
          <Textarea
            rows={4}
            invalid={queryMissing}
            spellCheck={false}
            value={data.queryTemplate ?? ''}
            onChange={(e) => onChange({ queryTemplate: e.target.value })}
            placeholder="{{context.trigger.question}}"
            aria-label="Query template"
          />
        </ConfigField>

        <ConfigField label="Available context">
          <ContextVariablePicker
            paths={paths}
            unresolved={unresolved(data.queryTemplate ?? '')}
            onInsert={(token) =>
              onChange({ queryTemplate: `${data.queryTemplate ?? ''}${token}` })
            }
          />
        </ConfigField>
      </ConfigSection>

      <ConfigSection title="Retrieval">
        <ConfigField
          label="Top K"
          required
          error={topKInvalid ? `Must be between 1 and ${MAX_TOP_K}.` : undefined}
          help={!topKInvalid ? 'How many passages to retrieve.' : undefined}
        >
          <NumberInput
            size="sm"
            min={1}
            max={MAX_TOP_K}
            step={1}
            value={topK}
            onChange={(v) => onChange({ topK: v })}
            invalid={topKInvalid}
            data-testid="kb-top-k"
          />
        </ConfigField>

        <ConfigField
          label="Score threshold"
          error={thresholdInvalid ? 'Must be between 0 and 1.' : undefined}
          help={
            !thresholdInvalid
              ? 'Drop passages scoring below this. Leave empty for no filtering.'
              : undefined
          }
        >
          <NumberInput
            size="sm"
            min={0}
            max={1}
            step={0.05}
            value={threshold ?? 0}
            onChange={(v) => onChange({ scoreThreshold: v })}
            invalid={thresholdInvalid}
            data-testid="kb-score-threshold"
          />
        </ConfigField>

        <ConfigField
          label="Output key"
          help="Where retrieved passages land in context. Defaults to this step's output."
        >
          <Input
            size="sm"
            mono
            spellCheck={false}
            value={data.outputKey ?? ''}
            onChange={(e) => onChange({ outputKey: e.target.value || undefined })}
            placeholder="passages"
            aria-label="Output key"
          />
        </ConfigField>

        <RetryPolicyEditor
          value={data.retryPolicy}
          onChange={(next) => onChange({ retryPolicy: next })}
        />
      </ConfigSection>
    </NodeConfigShell>
  );
}
