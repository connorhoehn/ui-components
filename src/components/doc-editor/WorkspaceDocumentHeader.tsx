import { useState, type ReactNode } from 'react';
import Banner from '../shared/Banner';
import { Button } from '../ui/Button';
import Chip from '../shared/Chip';
import ConfirmDialog from '../shared/ConfirmDialog';
import { DropdownMenu, type DropdownMenuSection } from '../shared/DropdownMenu';
import { StatusPill } from '../shared/StatusPill';
import { DocumentModePill } from './DocumentModePill';
import { DocumentOwnership, type DocumentPerson } from './DocumentOwnership';
import type { ViewMode, DocumentMeta, Participant } from '../../types/document';
import type { DocumentLifecycleStatus, LegacyFinalClaim, LifecycleAction, LifecycleFailureKind } from './documentLifecycleTypes';
import { ChatIcon, CloseIcon, ShareIcon } from '../ui/Icons';
import { IconButton } from '../ui/IconButton';
import { cn } from '../../lib/cn';
import { DocumentSaveStatus, type DocumentSaveState } from './DocumentSaveStatus';
import ParticipantAvatars from './ParticipantAvatars';

export interface LifecycleErrorView {
  kind: LifecycleFailureKind;
  message: string;
}

export interface WorkspaceDocumentHeaderProps {
  /** Host-controlled durable persistence receipt; omitted means unknown. */
  saveState?: DocumentSaveState;
  /** Actions scoped to the current source, such as draft/review/publish. */
  workflowActions?: ReactNode;
  formatActions?: ReactNode;
  className?: string;
  titleEditable?: boolean;
  onPrint?: () => void;

  extraMenuItems?: ReadonlyArray<{ id: string; label: string; onSelect: () => void }>;
  meta: DocumentMeta;

  mode: ViewMode;

  suggesting?: boolean;

  modeReason?: string;
  participants: Participant[];
  onUpdateMeta?: (patch: Partial<DocumentMeta>) => void;
  onExport?: (format: 'markdown' | 'pdf' | 'json') => void;
  exportFormats?: readonly ('markdown' | 'pdf' | 'json')[];
  onToggleHistory?: () => void;
  onToggleVideoCall?: () => void;
  onToggleVideoHistory?: () => void;
  isCallActive?: boolean;

  callVariant?: 'idle' | 'available' | 'active';
  callLabel?: string;
  onClearDocument?: () => void;
  onJumpToUser?: (participant: Participant) => void;
  sections?: { id: string; title: string }[];
  onToggleMyItems?: () => void;

  onToggleChat?: () => void;

  chatRoomName?: string | null;

  chatUnreadCount?: number;

  formatActionsRef?: (el: HTMLDivElement | null) => void;
  myItemCount?: number;
  commentCount?: number;
  onBack?: () => void;
  onFollowUser?: (participant: Participant) => void;
  followingUserId?: string | null;

  onFinalize?: () => void;

  onUnlock?: () => void;
  pastCallsCount?: number;

  lifecycleStatus?: DocumentLifecycleStatus;

  owner?: DocumentPerson | null;

  collaborators?: readonly DocumentPerson[];

  onShare?: () => void;

  lifecycleTerminal?: boolean;

  lifecycleLegacyClaim?: LegacyFinalClaim | null;

  lifecycleActions?: LifecycleAction[];

  lifecycleLoading?: boolean;

  lifecycleBusy?: boolean;

  lifecycleError?: LifecycleErrorView | null;
  onDismissLifecycleError?: () => void;

  onLifecycleAction?: (action: LifecycleAction, reason?: string) => void;

  onClaimOwnership?: () => void;

  onShareToRoom?: () => void;

  shareRoomName?: string | null;

  sharingToRoom?: boolean;

  shareStatus?: { tone: 'success' | 'error'; text: string } | null;
  onDismissShareStatus?: () => void;
}

const HEADER_CLASS =
  'flex shrink-0 flex-col gap-1.5 border-b border-border ' +
  'bg-surface px-4 py-2 text-text-primary';
const TITLE_INPUT_CLASS =
  'flex-1 min-w-[180px] rounded-[4px] border border-transparent bg-transparent px-2 py-1 ' +
  'font-[inherit] text-[16px] font-semibold text-text-primary outline-none ' +
  'focus:border-primary';

const HEADER_NOTE_CLASS = 'text-[11px] text-text-tertiary';
const EXTRAS_SCROLL_THRESHOLD = 6;

const CALL_VARIANT_CLASS: Record<'idle' | 'available' | 'active', string> = {
  active: 'bg-success-bg text-success-fg border-success-border',
  available: 'bg-info-bg text-info-fg border-info-border',
  idle: '',
};

const lifecycleActionLabels: Record<LifecycleAction, string> = {
  submit_for_review: 'Submit for review',
  withdraw: 'Withdraw from review',
  approve: 'Approve',
  request_changes: 'Request changes',
  revise: 'Back to draft',
  reopen: 'Reopen',
  finalize: 'Finalize',
};

const lifecycleActionBlurb: Record<LifecycleAction, string> = {
  submit_for_review: 'The document goes to its designated reviewers, who are then expected to respond.',
  withdraw: 'The document goes back to draft and the reviewers stop being asked for a verdict.',
  approve: 'The document is signed off and becomes read-only until its owner reopens it.',
  request_changes: 'The document goes back to its owner with your objection attached.',
  revise: 'The document returns to draft so the requested changes can be made.',
  reopen: 'An approved document becomes editable again, and its sign-off no longer stands.',
  finalize:
    'The document is closed permanently. It becomes read-only for everyone, ' +
    'and there is no unlock: no owner, reviewer or administrator can reopen ' +
    'it afterwards, and no further reviews can be requested on it. This is ' +
    'the only action in the document that cannot be undone.',
};

const FINALIZE_CONFIRMATION_WORD = 'FINALIZE';

const lifecycleTypedConfirmation: readonly LifecycleAction[] = ['finalize'];

const lifecycleReasonRequired: readonly LifecycleAction[] = ['request_changes'];

const lifecycleStatusTone: Record<
  DocumentLifecycleStatus,
  'success' | 'error' | 'warning' | 'info' | 'neutral' | 'pending'
> = {
  draft: 'neutral',
  in_review: 'pending',
  changes_requested: 'warning',
  approved: 'success',
  finalized: 'neutral',
};

function lifecycleStatusLabel(status: DocumentLifecycleStatus): string {
  return status.replace(/_/g, ' ');
}

const lifecycleRefusalLead: Record<LifecycleFailureKind, string> = {
  forbidden: 'You are not allowed to make this change.',
  conflict: 'Someone else changed this document — the latest status has been reloaded.',
  network: 'The server could not be reached, so nothing was changed.',
  invalid: 'That change is not possible from the document’s current status.',
  busy: 'A status change is already in progress.',
  unknown: 'The server refused the change.',
};

function isOwnerlessRefusal(error: LifecycleErrorView | null | undefined): boolean {
  return !!error && error.kind === 'forbidden' && /no established owner/i.test(error.message);
}

export default function WorkspaceDocumentHeader({
  saveState, workflowActions, formatActions, className, titleEditable, onPrint, exportFormats = ['markdown', 'pdf', 'json'],
  meta,
  mode,
  suggesting = false,
  modeReason,
  participants,
  onUpdateMeta,
  onExport,
  extraMenuItems,
  onToggleHistory,
  onToggleVideoCall,
  onToggleVideoHistory,
  callVariant,
  callLabel,
  onClearDocument,
  onJumpToUser,
  sections,
  onToggleMyItems,
  onToggleChat,
  chatRoomName,
  chatUnreadCount,
  formatActionsRef,
  myItemCount,
  commentCount,
  onBack,
  onFollowUser,
  followingUserId,
  pastCallsCount,
  onShareToRoom,
  shareRoomName,
  sharingToRoom,
  shareStatus,
  onDismissShareStatus,
  lifecycleStatus,
  owner,
  collaborators,
  onShare,
  lifecycleTerminal,
  lifecycleLegacyClaim,
  lifecycleActions,
  lifecycleLoading,
  lifecycleBusy,
  lifecycleError,
  onDismissLifecycleError,
  onLifecycleAction,
  onClaimOwnership,
}: WorkspaceDocumentHeaderProps) {
  const [confirmClear, setConfirmClear] = useState(false);
  const [pendingAction, setPendingAction] = useState<LifecycleAction | null>(null);
  const [reason, setReason] = useState('');
  const [typedConfirmation, setTypedConfirmation] = useState('');
  const [confirmClaim, setConfirmClaim] = useState(false);

  const offeredActions = lifecycleActions ?? [];
  const reasonRequired = pendingAction != null && lifecycleReasonRequired.includes(pendingAction);
  const typedRequired =
    pendingAction != null && lifecycleTypedConfirmation.includes(pendingAction);
  const typedSatisfied =
    !typedRequired ||
    typedConfirmation.trim().toUpperCase() === FINALIZE_CONFIRMATION_WORD;
  const ownerless = isOwnerlessRefusal(lifecycleError);

  const closeLifecycleDialog = () => {
    setPendingAction(null);
    setReason('');
    setTypedConfirmation('');
  };
  const docLabel = meta.title.trim() || 'Untitled document';
  const extras = extraMenuItems ?? [];
  const shareItems = extras.filter((i) => i.id.startsWith('share-'));
  const insertItems = extras.filter((i) => i.id.startsWith('insert-'));
  const toggleItems = extras.filter((i) => i.id.startsWith('toggle-'));
  const otherItems = extras.filter((i) => !i.id.startsWith('share-') && !i.id.startsWith('insert-') && !i.id.startsWith('toggle-'));
  const row = (item: { id: string; label: string; onSelect: () => void }) => ({
    label: item.label,
    onSelect: item.onSelect,
    'data-testid': `document-header-menu-${item.id}`,
  });
  const toggleRow = (item: { id: string; label: string; onSelect: () => void }) => ({
    ...row(item),
    label: item.label.replace(/^(Hide|Show) /, '').replace(/^From what you said$/, 'Spoken items').replace(/^./, (c) => c.toUpperCase()),
    checked: /^Hide /.test(item.label),
  });
  const menuSections: DropdownMenuSection[] = [
    {
      items: [
        ...(onToggleHistory ? [{ label: 'Version history', onSelect: onToggleHistory, 'data-testid': 'document-header-history' }] : []),
        ...(onToggleVideoHistory && (pastCallsCount ?? 0) > 0
          ? [{ label: 'Past calls', trailing: String(pastCallsCount), onSelect: onToggleVideoHistory }]
          : []),
        ...otherItems.map(row),
        ...toggleItems.map(toggleRow),
      ],
    },
    ...((shareItems.length > 0 || insertItems.length > 0)
      ? [{
          items: [
            ...(shareItems.length > 0
              ? [{
                  label: 'Share to…',
                  description: `${shareItems.length} conversation${shareItems.length === 1 ? '' : 's'}`,
                  'data-testid': 'document-header-menu-share',
                  submenu: [{ 'data-testid': 'document-header-menu-extras', scroll: shareItems.length > EXTRAS_SCROLL_THRESHOLD, items: shareItems.map((i) => ({ ...row(i), label: i.label.replace(/^Share to /, '') })) }],
                }]
              : []),
            ...(insertItems.length > 0
              ? [{
                  label: 'Insert…',
                  'data-testid': 'document-header-menu-insert',
                  submenu: [{ items: insertItems.map((i) => ({ ...row(i), label: i.label.replace(/^Insert (a |an )?/, '').replace(/^./, (c) => c.toUpperCase()) })) }],
                }]
              : []),
          ],
        }]
      : []),
    {
      items: [
        ...(onPrint ? [{ label: 'Print', trailing: '⌘P', onSelect: onPrint, 'data-testid': 'document-header-print' }] : []),
        ...(onExport && exportFormats.length > 0 ? [{
          label: 'Download as…',
          'data-testid': 'document-header-menu-download',
          submenu: [{ items: exportFormats.map(format => ({
            label: { markdown: 'Markdown (.md)', pdf: 'PDF (.pdf)', json: 'JSON (.json)' }[format],
            onSelect: () => onExport(format), 'data-testid': `document-header-export-${format}`,
          })) }],
        }] : []),
      ],
    },
    ...(onClearDocument ? [{
      items: [{ label: 'Clear document', danger: true, onSelect: () => setConfirmClear(true), 'data-testid': 'clear-document-btn' }],
    }] : []),
  ];

  return (
    <header data-testid="document-header" className={cn(HEADER_CLASS, className)}>

      <div className="flex items-center justify-between gap-2">

        <div className="flex flex-1 min-w-0 items-center gap-[10px]">
          {onBack && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="border-none px-0 py-0.5 text-[13px] font-normal text-primary"
            >
              &larr; Documents
            </Button>
          )}

          <input
            aria-label="Document title"
            readOnly={!(titleEditable ?? mode === 'editor') || !onUpdateMeta}
            className={TITLE_INPUT_CLASS}
            value={meta.title}
            placeholder="Untitled document"
            onChange={(e) => { if ((titleEditable ?? mode === 'editor') && onUpdateMeta) onUpdateMeta({ title: e.target.value }); }}
          />

          {lifecycleStatus && (
            <StatusPill
              data-testid="lifecycle-status"
              state={lifecycleStatusTone[lifecycleStatus]}
              label={lifecycleStatusLabel(lifecycleStatus)}
            />
          )}

          {(owner !== undefined || collaborators !== undefined || onShare) && <DocumentOwnership
            owner={owner ?? null}
            collaborators={collaborators ?? []}
            {...(onShare ? { onShare } : {})}
          />}

          {lifecycleTerminal && (
            <span
              data-testid="lifecycle-terminal-note"
              className="text-[11px] italic text-[var(--color-text-tertiary)]"
            >
              Closed permanently — no further changes, for anyone
            </span>
          )}
          <DocumentSaveStatus state={saveState} />
          {meta.updatedAt && (
            <span className={HEADER_NOTE_CLASS}>
              Last edited {(() => {
                const diff = Date.now() - new Date(meta.updatedAt).getTime();
                const mins = Math.floor(diff / 60000);
                if (mins < 1) return 'just now';
                if (mins < 60) return `${mins}m ago`;
                const hrs = Math.floor(mins / 60);
                if (hrs < 24) return `${hrs}h ago`;
                return `${Math.floor(hrs / 24)}d ago`;
              })()}
            </span>
          )}
          {commentCount != null && commentCount > 0 && (
            <Chip
              tone="neutral"
              size="sm"
              className="rounded-full px-2.5"
              icon={<ChatIcon size={12} />}
            >
              {commentCount}
            </Chip>
          )}
        </div>
        {participants.length > 0 && (
          <ParticipantAvatars participants={participants} sections={sections} onJumpToUser={onJumpToUser} onFollowUser={onFollowUser} followingUserId={followingUserId} />
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-1">
        <DocumentModePill
          mode={mode === 'editor' ? (suggesting ? 'suggesting' : 'editing') : mode === 'ack' ? 'review' : 'read'}
          {...(modeReason ? { reason: modeReason } : {})}
        />
        <div className="flex items-center gap-2">

          {workflowActions}
          {formatActions}
          {formatActionsRef && (
            <div ref={formatActionsRef} className="flex items-center gap-2" />
          )}

          {onToggleMyItems && (
            <Button variant="secondary" size="sm" onClick={onToggleMyItems}>
              My Items{myItemCount ? ` (${myItemCount})` : ''}
            </Button>
          )}

          {(onToggleChat || onShareToRoom || (onToggleVideoCall && (callVariant === 'available' || callVariant === 'active'))) && (
            <div
              className="flex h-8 items-center gap-0.5 rounded-md border border-border bg-surface pl-0.5 pr-0.5"
              data-testid="document-room-pill"
              data-room={chatRoomName ?? shareRoomName ?? ''}
            >
              {onToggleChat ? (
                <Button
                  variant="ghost"
                  size="sm"
                  className="inline-flex items-center gap-1.5 whitespace-nowrap border-0"
                  data-testid="document-chat-toggle"
                  onClick={onToggleChat}
                  title={chatRoomName ? `Open the conversation in ${chatRoomName}` : 'Open this page\u2019s conversation'}
                >
                  <ChatIcon size={13} />
                  <span>{chatRoomName ? `#${chatRoomName}` : 'Conversation'}</span>
                  {chatUnreadCount ? (
                    <Chip tone="accent" size="xs" mono data-testid="document-chat-unread">{chatUnreadCount}</Chip>
                  ) : null}
                </Button>
              ) : (chatRoomName ?? shareRoomName) ? (
                <span className="px-1.5 text-xs font-medium text-text-primary">#{chatRoomName ?? shareRoomName}</span>
              ) : null}
              {onShareToRoom && (
                <IconButton
                  aria-label={sharingToRoom ? 'Sharing…' : `Share to #${shareRoomName ?? 'room'}`}
                  title={shareRoomName ? `Post a link to this page in #${shareRoomName}` : 'Post a link to this page in the room'}
                  variant="ghost"
                  size="sm"
                  className="border-0"
                  data-testid="share-to-room-btn"
                  data-sharing={sharingToRoom ? 'true' : 'false'}
                  disabled={sharingToRoom}
                  onClick={onShareToRoom}
                  icon={<ShareIcon size={13} />}
                />
              )}
              {onToggleVideoCall && callVariant === 'available' && (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={onToggleVideoCall}
                  data-call-variant="available"
                  data-testid="doc-call-button"
                  title="This room has a call going — join it"
                >
                  {callLabel ?? 'Join call'}
                </Button>
              )}
              {onToggleVideoCall && callVariant === 'active' && (
                <Button
                  variant="secondary"
                  size="sm"
                  className={CALL_VARIANT_CLASS.active}
                  onClick={onToggleVideoCall}
                  aria-pressed
                  data-call-variant="active"
                  data-testid="doc-call-button"
                >
                  {callLabel ?? 'In call'}
                </Button>
              )}
            </div>
          )}

          {shareStatus && (
            <span
              role="status"
              data-testid="share-to-room-status"
              data-tone={shareStatus.tone}
              className={`inline-flex items-center gap-1 text-[12px] ${
                shareStatus.tone === 'error' ? 'text-danger-fg' : 'text-success-fg'
              }`}
            >
              {shareStatus.text}
              {shareStatus.tone === 'error' && onDismissShareStatus && (
                <IconButton
                  aria-label="Dismiss share error"
                  variant="ghost"
                  size="sm"
                  onClick={onDismissShareStatus}
                  className="border-none p-0 text-current"
                  icon={<CloseIcon size={12} />}
                />
              )}
            </span>
          )}

          {onLifecycleAction && (
            <div data-testid="lifecycle-actions" className="flex items-center gap-1.5">
              {lifecycleLoading && offeredActions.length === 0 && (
                <span
                  data-testid="lifecycle-loading"
                  className="text-xs text-[var(--color-text-tertiary)]"
                >
                  Checking review status…
                </span>
              )}
              {offeredActions.map((action) => (
                <Button
                  key={action}
                  type="button"
                  size="sm"
                  variant={action === 'finalize' ? 'danger' : 'secondary'}
                  data-testid={`lifecycle-action-${action}`}
                  disabled={lifecycleBusy}
                  onClick={() => {
                    setReason('');
                    setTypedConfirmation('');
                    setPendingAction(action);
                  }}
                >
                  {lifecycleActionLabels[action]}
                </Button>
              ))}

              {onClaimOwnership && (
                <Button
                  type="button"
                  size="sm"
                  variant="secondary"
                  data-testid="claim-ownership-btn"
                  onClick={() => setConfirmClaim(true)}
                >
                  Take ownership
                </Button>
              )}
            </div>
          )}

          {menuSections.some(section => section.items.length > 0) && <DropdownMenu
            trigger={<span className="tracking-wide">⋯</span>}
            triggerLabel="More actions"
            triggerTitle="More actions"
            triggerClassName="h-8 rounded-md border border-border bg-surface px-2.5 text-[13px] text-text-primary hover:bg-surface-hover"
            align="end"
            data-testid="document-header-menu"
            sections={menuSections}
          />}
        </div>
      </div>

      {lifecycleError && (
        <Banner
          variant={lifecycleError.kind === 'conflict' ? 'warning' : 'error'}
          {...(onDismissLifecycleError ? { onDismiss: onDismissLifecycleError } : {})}
        >

          <span data-testid="lifecycle-error" data-kind={lifecycleError.kind}>
            <strong>{lifecycleRefusalLead[lifecycleError.kind]}</strong>{' '}
            <span data-testid="lifecycle-error-detail">{lifecycleError.message}</span>
            {ownerless && (
              <>
                {' '}
                <span data-testid="lifecycle-ownerless-note">
                  Nobody owns this document yet. Ownership is never taken on your behalf —
                  {onClaimOwnership
                    ? ' use “Take ownership” above if it should be yours.'
                    : ' its owner has to claim it deliberately.'}
                </span>
              </>
            )}
          </span>
        </Banner>
      )}

      {lifecycleLegacyClaim && (
        <Banner
          variant="warning"
          title="This document was marked final before the status moved to the server."
          data-testid="lifecycle-legacy-claim"
        >
          Nothing on the server records it being finalized, reviewed or approved, so it
          counts as{' '}
          <strong>{lifecycleStatusLabel(lifecycleLegacyClaim.serverStatus)}</strong> and is
          editable again. The old marker was a value any connected client could set, which
          is why it is not being taken as a status. To close it for good, take it through
          review and use Finalize — that route records who approved it and when.
        </Banner>
      )}

      <ConfirmDialog
        open={pendingAction != null}
        tone={typedRequired ? 'destructive' : reasonRequired ? 'caution' : 'info'}
        title={pendingAction ? `${lifecycleActionLabels[pendingAction]} — “${docLabel}”?` : ''}
        body={pendingAction ? lifecycleActionBlurb[pendingAction] : ''}
        confirmLabel={pendingAction ? lifecycleActionLabels[pendingAction] : 'Confirm'}
        cancelLabel={typedRequired ? 'Keep it open' : 'Cancel'}
        confirmDisabled={(reasonRequired && reason.trim().length === 0) || !typedSatisfied}
        onConfirm={() => {
          const action = pendingAction;
          const text = reason.trim();
          closeLifecycleDialog();
          if (action) onLifecycleAction?.(action, text || undefined);
        }}
        onCancel={closeLifecycleDialog}
      >
        {typedRequired && (
          <div className="mb-3">
            <label
              className="mb-1 block text-xs font-semibold text-[var(--color-text-primary)]"
              htmlFor="lifecycle-finalize-confirm"
            >
              Type {FINALIZE_CONFIRMATION_WORD} to confirm
            </label>
            <input
              id="lifecycle-finalize-confirm"
              data-testid="lifecycle-finalize-confirm-input"
              value={typedConfirmation}
              autoComplete="off"
              onChange={(e) => setTypedConfirmation(e.target.value)}
              placeholder={FINALIZE_CONFIRMATION_WORD}
              className="w-full rounded-md border border-[var(--color-border-field)] bg-[var(--color-surface)] p-2 font-mono text-sm text-[var(--color-text-primary)]"
            />
          </div>
        )}
        <label
          className="mb-1 block text-xs font-semibold text-[var(--color-text-primary)]"
          htmlFor="lifecycle-reason"
        >
          {reasonRequired ? 'Reason (required)' : 'Reason (optional)'}
        </label>
        <textarea
          id="lifecycle-reason"
          data-testid="lifecycle-reason-input"
          value={reason}
          rows={3}
          onChange={(e) => setReason(e.target.value)}
          placeholder={
            reasonRequired
              ? 'What needs to change, and why?'
              : typedRequired
                ? 'Recorded against this document permanently'
                : 'Anything the others should know'
          }
          className="w-full rounded-md border border-[var(--color-border-field)] bg-[var(--color-surface)] p-2 text-[13px] text-[var(--color-text-primary)]"
        />
      </ConfirmDialog>

      <ConfirmDialog
        open={confirmClaim}
        tone="caution"
        title={`Take ownership of “${docLabel}”?`}
        body={
          'You become the owner of this document. Owner-only actions — submitting it for review, ' +
          'reopening it after approval — become yours, and nobody else can claim it afterwards. ' +
          'The claim is recorded against your name.'
        }
        confirmLabel="Take ownership"
        cancelLabel="Leave it unowned"
        onConfirm={() => { setConfirmClaim(false); onClaimOwnership?.(); }}
        onCancel={() => setConfirmClaim(false)}
      />

      <ConfirmDialog
        open={confirmClear}
        tone="destructive"
        title={`Clear “${docLabel}”?`}
        body={
          'Every section and everything written in it is removed — for everyone in the document, ' +
          'not just on your screen. There is no undo; the only way back is restoring an earlier ' +
          'version from History.'
        }
        confirmLabel="Clear document"
        cancelLabel="Keep content"
        onConfirm={() => { setConfirmClear(false); onClearDocument?.(); }}
        onCancel={() => setConfirmClear(false)}
      />
    </header>
  );
}
