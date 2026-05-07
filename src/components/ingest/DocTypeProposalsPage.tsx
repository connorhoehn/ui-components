// frontend/src/components/ingest/DocTypeProposalsPage.tsx
//
// Operator promotion queue for auto-discovered DocType proposals.
// AGENTIC_ETL_VISION §B Tier 3 — when the LLM mapper sees N similar files
// of an unknown shape, it proposes a new DocType. Operator promotes /
// rejects from this page.
//
// Per-row actions: Promote (resolves status='promoted' on the backend),
// Reject (resolves status='rejected'). The companion follow-up wires
// promotion through to the canonical DocType store; today this page just
// records the operator's decision against the proposal row.

import type { CSSProperties } from 'react';
import EmptyState from '../shared/EmptyState';
import SkeletonCard from '../shared/SkeletonCard';
import { colors, pageContainerStyle, saveBtnStyle, cancelBtnStyle } from '../../constants/styles';
import { useDocTypeProposals } from '../../hooks/useDocTypeProposals';
import type { DocTypeProposalRow } from '../../hooks/useDocTypeProposals';

const styles: Record<string, CSSProperties> = {
  header: { marginBottom: 16 },
  title: { fontSize: 22, fontWeight: 700, color: colors.textPrimary },
  subtitle: { fontSize: 12, color: colors.textTertiary, marginTop: 4 },
  errorBanner: { padding: '8px 12px', background: '#fef2f2', border: `1px solid ${colors.state.failed}`, color: colors.state.failed, borderRadius: 8, marginBottom: 12 },
  list: { display: 'flex', flexDirection: 'column', gap: 12 },
  card: { padding: 16, background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: 10, display: 'flex', flexDirection: 'column', gap: 10 },
  cardHeader: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
  proposedName: { fontSize: 16, fontWeight: 700, color: colors.textPrimary },
  meta: { fontSize: 12, color: colors.textSecondary, display: 'flex', gap: 16, flexWrap: 'wrap' },
  description: { fontSize: 13, color: colors.textPrimary, lineHeight: 1.5 },
  fieldList: { display: 'flex', flexWrap: 'wrap', gap: 6 },
  fieldChip: { fontSize: 11, padding: '2px 8px', borderRadius: 999, background: colors.surfaceInset, color: colors.textSecondary, fontFamily: 'ui-monospace, monospace' },
  reasoning: { fontSize: 12, color: colors.textTertiary, fontStyle: 'italic' },
  actions: { display: 'flex', gap: 8 },
};

export default function DocTypeProposalsPage() {
  const { proposals, loading, error, promote, reject } = useDocTypeProposals();

  return (
    <div data-testid="doctype-proposals-page" style={pageContainerStyle}>
      <div style={styles.header}>
        <div style={styles.title}>DocType proposals</div>
        <div style={styles.subtitle}>
          Auto-discovered candidate types from the LLM mapper. Promote to
          accept; reject to suppress similar future proposals.
        </div>
      </div>

      {error ? (
        <div data-testid="proposals-error" style={styles.errorBanner}>
          Couldn't load DocType proposals: {error}
        </div>
      ) : null}

      {loading && proposals.length === 0 ? (
        <div style={styles.list}>
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
        <div data-testid="proposals-list" style={styles.list}>
          {proposals.map((p) => (
            <ProposalRow
              key={p.proposalId}
              proposal={p}
              onPromote={() => void promote(p.proposalId)}
              onReject={() => void reject(p.proposalId)}
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
    <div data-testid={`proposal-row-${proposal.proposalId}`} style={styles.card}>
      <div style={styles.cardHeader}>
        <span style={styles.proposedName}>{proposal.proposedName}</span>
        <span style={{ fontSize: 11, color: colors.textTertiary }}>
          {proposal.sampleIngestIds.length} sample{proposal.sampleIngestIds.length === 1 ? '' : 's'}
        </span>
      </div>
      <div style={styles.meta}>
        <span>Source: {proposal.sourceId.slice(0, 12)}</span>
        <span>Signature: {proposal.signature.slice(0, 24)}</span>
      </div>
      {proposal.proposedDescription ? (
        <div style={styles.description}>{proposal.proposedDescription}</div>
      ) : null}
      {proposal.proposedFields.length > 0 ? (
        <div style={styles.fieldList}>
          {proposal.proposedFields.map((f) => (
            <span key={f.name} style={styles.fieldChip}>
              {f.name}
              {f.required ? '*' : ''}
            </span>
          ))}
        </div>
      ) : null}
      {proposal.reasoning ? (
        <div style={styles.reasoning} title={proposal.reasoning}>
          {proposal.reasoning.slice(0, 200)}
          {proposal.reasoning.length > 200 ? '…' : ''}
        </div>
      ) : null}
      <div style={styles.actions}>
        <button
          data-testid={`proposal-promote-${proposal.proposalId}`}
          style={saveBtnStyle(false)}
          onClick={onPromote}
        >
          Promote
        </button>
        <button
          data-testid={`proposal-reject-${proposal.proposalId}`}
          style={cancelBtnStyle}
          onClick={onReject}
        >
          Reject
        </button>
      </div>
    </div>
  );
}
