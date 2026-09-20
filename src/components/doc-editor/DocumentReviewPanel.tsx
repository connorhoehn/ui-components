import { useRef, useState } from 'react';
import { InboxSection, InboxSectionRow } from '../inbox/InboxSection';
import { Stack, Inline } from '../ui/Stack';
import { Button } from '../ui/Button';
import Chip from '../shared/Chip';
import InlineAlert from '../shared/InlineAlert';
import MetaLine from '../shared/MetaLine';
import { Select } from '../forms/Select';
import { Textarea } from '../forms/Textarea';
import { Checkbox } from '../forms/Checkbox';

export interface DocumentReviewEntry {
  requestKey: string;
  reviewerId: string;
  reviewerName?: string;
  requestedBy: string;
  requestedByName?: string;
  state: 'pending' | 'approved' | 'changes_requested' | 'withdrawn';
  required: boolean;
  note?: string;
  comment?: string;
  dueDate?: string;
}
export interface DocumentReviewPanelProps {
  requests: DocumentReviewEntry[];
  /** Directory and permissions come from the host's authoritative service. */
  reviewers?: Array<{ id: string; displayName: string }>;
  currentUserId: string;
  loading?: boolean;
  error?: string | null;
  onRefresh: () => void;
  onRequest?: (input: { reviewerId: string; note: string; required: boolean }) => Promise<void>;
  onDecide?: (requestKey: string, state: 'approved' | 'changes_requested', comment: string) => Promise<void>;
  onWithdraw?: (requestKey: string) => Promise<void>;
}

/** The examples' human decision lane, reusable without an inbox or a REST client. */
function ReviewRow({ request, onDecide, onWithdraw }: {
  request: DocumentReviewEntry;
  onDecide?: DocumentReviewPanelProps['onDecide'];
  onWithdraw?: DocumentReviewPanelProps['onWithdraw'];
}) {
  const [comment, setComment] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const writing = useRef(false);
  async function write(action: () => Promise<void>) {
    if (writing.current) return;
    writing.current = true; setBusy(true); setError(null);
    try { await action(); setComment(''); }
    catch (cause) { setError(cause instanceof Error ? cause.message : 'The review could not be updated.'); }
    finally { writing.current = false; setBusy(false); }
  }
  const reviewer = request.reviewerName || request.reviewerId;
  const stateLabel = request.state.replace(/_/g, ' ');
  return <InboxSectionRow aria-label={`Review by ${reviewer}`} aria-busy={busy}>
    <Stack gap="sm">
      <Inline gap="sm" wrap>
        <strong>{reviewer}</strong>
        <Chip size="xs" tone={request.state === 'approved' ? 'success' : request.state === 'changes_requested' ? 'warning' : 'neutral'}>{stateLabel}</Chip>
        {request.required && <Chip size="xs" tone="warning">Required</Chip>}
      </Inline>
      <MetaLine items={[`Requested by ${request.requestedByName || request.requestedBy}`, request.dueDate ? `Due ${request.dueDate}` : null]} />
      {request.note && <p className="m-0 text-sm text-text-primary whitespace-pre-wrap">{request.note}</p>}
      {request.comment && <p className="m-0 text-sm text-text-secondary whitespace-pre-wrap">{request.comment}</p>}
      {error && <InlineAlert tone="error">{error}</InlineAlert>}
      {onDecide && request.state === 'pending' && <>
        <Textarea value={comment} onChange={event => setComment(event.target.value)} rows={2} disabled={busy}
          aria-label={`Review comment for ${reviewer}`} placeholder="Add a comment (optional)" />
        <Inline gap="sm" wrap>
          <Button size="sm" variant="secondary" disabled={busy} onClick={() => void write(() => onDecide(request.requestKey, 'changes_requested', comment))}>Request changes</Button>
          <Button size="sm" variant="primary" disabled={busy} onClick={() => void write(() => onDecide(request.requestKey, 'approved', comment))}>Approve review</Button>
        </Inline>
      </>}
      {onWithdraw && request.state === 'pending' && <Button size="sm" variant="ghost" disabled={busy}
        onClick={() => void write(() => onWithdraw(request.requestKey))}>Withdraw review</Button>}
    </Stack>
  </InboxSectionRow>;
}

export function DocumentReviewPanel({ requests, reviewers = [], currentUserId, loading, error, onRefresh, onRequest, onDecide, onWithdraw }: DocumentReviewPanelProps) {
  const [reviewerId, setReviewerId] = useState('');
  const [note, setNote] = useState('');
  const [required, setRequired] = useState(true);
  const [busy, setBusy] = useState(false);
  const [failure, setFailure] = useState<string | null>(null);
  const writing = useRef(false);
  async function requestReview() {
    if (!onRequest || !reviewers.some(person => person.id === reviewerId) || writing.current) return;
    writing.current = true; setBusy(true); setFailure(null);
    try { await onRequest({ reviewerId, note: note.trim(), required }); setNote(''); setReviewerId(''); }
    catch (cause) { setFailure(cause instanceof Error ? cause.message : 'The review could not be requested.'); }
    finally { writing.current = false; setBusy(false); }
  }
  return <Stack gap="md">
    {error && <InlineAlert tone="error">{error}</InlineAlert>}
    {onRequest && <Stack gap="sm">
      <Select aria-label="Reviewer" placeholder="Choose a reviewer" value={reviewerId} disabled={busy || loading}
        options={reviewers.map(person => ({ value: person.id, label: person.displayName }))} onChange={event => setReviewerId(event.target.value)} />
      <Textarea aria-label="Review request note" placeholder="What should they review?" rows={2} value={note} disabled={busy} onChange={event => setNote(event.target.value)} />
      <Inline as="label" gap="sm" align="center"><Checkbox checked={required} onChange={setRequired} disabled={busy} />Required review</Inline>
      {failure && <InlineAlert tone="error">{failure}</InlineAlert>}
      <Button size="sm" disabled={busy || loading || !reviewers.some(person => person.id === reviewerId)} onClick={() => void requestReview()}>{busy ? 'Requesting…' : 'Request review'}</Button>
    </Stack>}
    <InboxSection title="Document reviews" count={requests.length}
      hint={loading ? 'Loading…' : undefined} action={<Button size="sm" variant="ghost" disabled={loading} onClick={onRefresh}>Refresh reviews</Button>}
      empty={{ title: loading ? 'Loading reviews…' : error ? 'Reviews unavailable' : 'No reviews requested' }}>
      {requests.map(request => <ReviewRow key={request.requestKey} request={request}
        onDecide={request.reviewerId === currentUserId ? onDecide : undefined} onWithdraw={onWithdraw} />)}
    </InboxSection>
  </Stack>;
}
