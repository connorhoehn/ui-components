import { Button } from '../ui/Button';
import { cn } from '../../lib/cn';

/** Only a durable backend receipt may select `saved`. Connection/sync is insufficient. */
export interface DocumentSaveState {
  status: 'pending' | 'saved' | 'error' | 'offline';
  detail?: string;
  onRetry?: () => void;
}

const LABELS: Record<DocumentSaveState['status'], string> = {
  pending: 'Saving…', saved: 'Saved', error: 'Changes not saved', offline: 'Offline — changes not saved',
};

/** `className` (since 2.386.3) sizes the line for its host — an editor head reads it at 13px. */
export function DocumentSaveStatus({ state, className }: { state?: DocumentSaveState; className?: string }) {
  if (!state) return null;
  return (
    <span role="status" aria-live="polite" data-testid="document-save-status" data-save-state={state.status}
      className={cn(state.status === 'error' ? 'text-xs text-danger-fg' : 'text-xs text-text-tertiary', className)}>
      {state.detail ?? LABELS[state.status]}
      {(state.status === 'error' || state.status === 'offline') && state.onRetry && (
        <Button variant="ghost" size="sm" onClick={state.onRetry}>Retry save</Button>
      )}
    </span>
  );
}
