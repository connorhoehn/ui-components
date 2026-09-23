// frontend/src/components/ingest/DocTypeProposalsPage.tsx
//
// Operator promotion queue for auto-discovered DocType proposals.

import { useState } from 'react';
import EmptyState from '../shared/EmptyState';
import SkeletonCard from '../shared/SkeletonCard';
import { useDocTypeProposals } from '../../hooks/useDocTypeProposals';
import type { DocTypeProposalRow } from '../../hooks/useDocTypeProposals';

export default function DocTypeProposalsPage() {
  const { proposals, loading, error, promote, reject } = useDocTypeProposals();
  // `promote` / `reject` REJECT on a non-2xx response. Both call sites were
  // `void promote(...)`, so a failed decision produced an unhandled promise
  // rejection and nothing else: the row stayed in the list, no message
  // appeared, and the operator's only reading was that Promote is broken —
  // or, worse, that the promotion had silently gone through. Same shape and
  // same treatment as MappingReviewPage.
  const [actionError, setActionError] = useState<string | null>(null);

  const runAction = (promise: Promise<void>): void => {
    setActionError(null);
    void promise.catch((err: unknown) => {
      setActionError(err instanceof Error ? err.message : String(err));
    });
  };

  return (
    <div data-testid="doctype-proposals-page" className="p-6 flex flex-col gap-3">
      <div className="mb-4">
        <div className="text-[22px] font-bold text-text-primary">DocType proposals</div>
        <div className="text-xs text-text-tertiary mt-1">
          Auto-discovered candidate types from the LLM mapper. Promote to
          accept; reject to suppress similar future proposals.
        </div>
      </div>

      {error ? (
        <div role="alert" data-testid="proposals-error" className="px-3 py-2 bg-danger-bg border border-[var(--color-state-failed)] text-[var(--color-state-failed)] rounded-lg mb-3">
          Couldn't load DocType proposals: {error}
        </div>
      ) : null}

      {/* Action-failure banner. Kept separate from the load error above so a
          rejected Promote never claims the queue failed to load — the list
          below it is correct and stays visible. */}
      {actionError ? (
        <div
          data-testid="proposals-action-error"
          role="alert"
          className="px-4 py-3 bg-danger-bg border border-danger-border text-danger-fg rounded-lg flex items-center justify-between gap-3 mb-3"
        >
          <span className="text-[13px] font-medium">
            That proposal was not updated: {actionError}
          </span>
          <button
            type="button"
            onClick={() => setActionError(null)}
            className="px-3.5 py-1.5 text-[13px] font-medium bg-surface text-danger-fg border border-danger-border rounded-md cursor-pointer font-[inherit]"
          >
            Dismiss
          </button>
        </div>
      ) : null}

      {loading && proposals.length === 0 ? (
        <div className="flex flex-col gap-3">
          <SkeletonCard height={120} />
          <SkeletonCard height={120} />
        </div>
      ) : proposals.length === 0 && !error ? (
        <EmptyState
          icon="🧬"
          title="No proposals waiting"
          body="When the LLM mapper sees N similar files of an unknown shape, the proposed DocType lands here."
          testId="proposals-empty"
        />
      ) : (
        <div data-testid="proposals-list" className="flex flex-col gap-3">
          {proposals.map((p) => (
            <ProposalRow
              key={p.proposalId}
              proposal={p}
              onPromote={() => runAction(promote(p.proposalId))}
              onReject={() => runAction(reject(p.proposalId))}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface ProposalRowProps {
  proposal: DocTypeProposalRow;
  onPromote: () => void;
  onReject: () => void;
}

function ProposalRow({ proposal, onPromote, onReject }: ProposalRowProps) {
  return (
    <div data-testid={`proposal-row-${proposal.proposalId}`} className="p-4 bg-surface border border-border rounded-[10px] flex flex-col gap-2.5">
      <div className="flex items-center justify-between gap-3">
        <span className="text-base font-bold text-text-primary">{proposal.proposedName}</span>
        <span className="text-[11px] text-text-tertiary">
          {proposal.sampleIngestIds.length} sample{proposal.sampleIngestIds.length === 1 ? '' : 's'}
        </span>
      </div>
      <div className="text-xs text-text-secondary flex gap-4 flex-wrap">
        <span>Source: {proposal.sourceId.slice(0, 12)}</span>
        <span>Signature: {proposal.signature.slice(0, 24)}</span>
      </div>
      {proposal.proposedDescription ? (
        <div className="text-[13px] text-text-primary leading-relaxed">{proposal.proposedDescription}</div>
      ) : null}
      {proposal.proposedFields.length > 0 ? (
        <div className="flex flex-wrap gap-1.5">
          {proposal.proposedFields.map((f) => (
            <span key={f.name} className="text-[11px] px-2 py-0.5 rounded-full bg-surface-inset text-text-secondary font-mono">
              {f.name}
              {f.required ? '*' : ''}
            </span>
          ))}
        </div>
      ) : null}
      {proposal.reasoning ? (
        <div className="text-xs text-text-tertiary italic" title={proposal.reasoning}>
          {proposal.reasoning.slice(0, 200)}
          {proposal.reasoning.length > 200 ? '…' : ''}
        </div>
      ) : null}
      <div className="flex gap-2">
        <button
          data-testid={`proposal-promote-${proposal.proposalId}`}
          className="px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-on-primary border-none rounded-md cursor-pointer font-[inherit] shrink-0"
          onClick={onPromote}
        >
          Promote
        </button>
        <button
          data-testid={`proposal-reject-${proposal.proposalId}`}
          className="px-3 py-1.5 text-[13px] bg-transparent border-none text-text-secondary cursor-pointer font-[inherit] shrink-0"
          onClick={onReject}
        >
          Reject
        </button>
      </div>
    </div>
  );
}
