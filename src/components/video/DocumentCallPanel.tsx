// ui-components/src/components/video/DocumentCallPanel.tsx
//
// The call's side panel in the page's right column: the call (title and
// "4 people · 09:41"), People (CallPeopleList, with Invite...), Review
// documents (ReviewDocumentList — "Presenting · Alice", "Up next"),
// Present this document / Copy call link, and the access note. It is a
// column panel that stays open while the reader moves between the call's
// documents; the host keeps it mounted across navigation.

import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import Drawer from '../shared/Drawer';
import { Badge } from '../shared/Badge';
import SkeletonCard from '../shared/SkeletonCard';
import { Button } from '../ui/Button';
import { IconButton } from '../ui/IconButton';
import { LinkIcon, PlusIcon } from '../ui/Icons';
import { CallPeopleList, type CallPeopleListProps } from './CallPeopleList';
import { ReviewDocumentList, type ReviewDocumentListProps } from './ReviewDocumentList';
import { MonitorIcon, PopOutIcon } from './MediaIcons';
import { formatCallElapsed } from './CallDock';

export interface DocumentCallPanelProps {
  title: string;
  participantCount: number;
  elapsedMs: number | null;
  people: CallPeopleListProps;
  documents: Omit<ReviewDocumentListProps, 'trailing'> & { count: number; onAdd: () => void };
  /** Who presents which document, or nobody. */
  presenting: { documentId: string; userId: string; name: string } | null;
  /** The document the reader has open — what "Present this document" presents. */
  currentDocumentId: string;
  canPresent: boolean;
  /**
   * Whether the viewer may press Present. True while someone else presents
   * means "take over" (the button stays live, titled "Take over from Alice");
   * false disables it with `presentDisabledReason`.
   */
  /** Title of the disabled Present button, e.g. "Alice is presenting". */
  presentDisabledReason?: string;
  /** A document id to present, or null to stop. */
  onPresent: (documentId: string | null) => void;
  onCopyLink: () => void;
  onManageAccess: () => void;
  onPopOut: () => void;
  onClose: () => void;
  loading?: boolean;
  /** Above everything — e.g. an InlineAlert "Reconnecting to the call…". */
  notice?: ReactNode;
  className?: string;
  'data-testid'?: string;
}

export function DocumentCallPanel({
  title,
  participantCount,
  elapsedMs,
  people,
  documents,
  presenting,
  currentDocumentId,
  canPresent,
  presentDisabledReason,
  onPresent,
  onCopyLink,
  onManageAccess,
  onPopOut,
  onClose,
  loading = false,
  notice,
  className,
  'data-testid': testId = 'document-call-panel',
}: DocumentCallPanelProps) {
  const { count: docCount, onAdd, ...docList } = documents;
  const self = people.people.find((p) => p.isLocal);
  const iPresentThis = Boolean(presenting && self && presenting.userId === self.userId && presenting.documentId === currentDocumentId);
  // Someone else presents and the viewer may present anyway (mockup 06: the
  // host's button stays live) — pressing it takes over.
  const someoneElsePresents = Boolean(presenting && (!self || presenting.userId !== self.userId));
  const alone = people.people.filter((p) => p.state === 'in-call' && !p.isLocal).length === 0;
  const meta = `${participantCount === 1 ? '1 person' : `${participantCount} people`}${elapsedMs != null ? ` · ${formatCallElapsed(elapsedMs)}` : ''}`;

  return (
    <Drawer
      open
      docked
      onClose={onClose}
      title="Call"
      actions={
        <IconButton
          aria-label="Pop out the call"
          title="Pop out the call"
          size="sm"
          icon={<PopOutIcon size={18} />}
          onClick={onPopOut}
          data-testid="call-panel-popout"
          className="text-text-secondary"
        />
      }
      closeTestId="call-panel-close"
      className={cn(className)}
      headerClassName="border-b-0 px-5 pb-2 pt-5"
      titleClassName="text-lg"
      bodyClassName="flex flex-col gap-5 px-5 pt-2 pb-6"
      data-testid={testId}
    >
      {notice}
      <div className="flex flex-col gap-1">
        <h3 className="m-0 text-lg font-semibold text-text-primary" data-testid="call-panel-title">
          {title}
        </h3>
        <span className="text-sm tabular-nums text-text-tertiary" data-testid="call-panel-meta">
          {meta}
        </span>
      </div>

      <div className="-mt-2 h-px shrink-0 bg-border" aria-hidden="true" />

      {loading ? (
        <div className="flex flex-col gap-3" data-testid="call-panel-loading">
          {[0, 1, 2].map((i) => (
            <SkeletonCard key={i} height={52} rounded="md" />
          ))}
        </div>
      ) : (
        <>
          <CallPeopleList {...people} />
          {alone && (
            <p className="m-0 -mt-2 text-sm text-text-tertiary" data-testid="call-panel-waiting">
              Waiting for others —{' '}
              <Button variant="link" onClick={onCopyLink} className="text-sm">
                Copy call link
              </Button>
            </p>
          )}

          <div className="h-px shrink-0 bg-border" aria-hidden="true" />

          <section className="-mx-2 flex flex-col gap-2" aria-label="Review documents">
            <div className="flex items-center gap-2 px-2">
              <h3 className="m-0 text-base font-semibold text-text-primary">Review documents</h3>
              <Badge variant="count" value={docCount} color="muted" aria-label={`${docCount} documents`} />
              <Button variant="link" onClick={onAdd} data-testid="call-add-document" className="ml-auto inline-flex items-center gap-1 text-sm">
                <PlusIcon size={14} />
                Add
              </Button>
            </div>
            <ReviewDocumentList {...docList} trailing="open" data-testid="call-documents-list" rowTestIdPrefix="call-document" />
          </section>

          <div className="flex items-center justify-between gap-3">
            <Button
              variant="ghost"
              onClick={() => onPresent(iPresentThis ? null : currentDocumentId)}
              disabled={!iPresentThis && !canPresent}
              title={
                !iPresentThis && !canPresent
                  ? presentDisabledReason
                  : someoneElsePresents
                    ? `Take over from ${presenting!.name}`
                    : undefined
              }
              data-take-over={someoneElsePresents && canPresent ? 'true' : undefined}
              data-testid="call-present"
              className="inline-flex items-center gap-2 font-medium"
            >
              <MonitorIcon size={18} />
              {iPresentThis ? 'Stop presenting' : 'Present this document'}
            </Button>
            <Button variant="link" onClick={onCopyLink} data-testid="call-copy-link" className="inline-flex items-center gap-1.5 text-sm">
              <LinkIcon size={16} />
              Copy call link
            </Button>
          </div>

          <div className="h-px shrink-0 bg-border" aria-hidden="true" />

          <div className="flex items-center gap-3 text-xs">
            <span className="text-text-tertiary">Document access stays unchanged.</span>
            <Button variant="link" onClick={onManageAccess} data-testid="call-manage-access" className="text-sm">
              Manage access
            </Button>
          </div>
        </>
      )}
    </Drawer>
  );
}

export default DocumentCallPanel;
