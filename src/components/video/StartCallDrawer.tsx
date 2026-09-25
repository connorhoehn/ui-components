// ui-components/src/components/video/StartCallDrawer.tsx
//
// "Start a call" from a document: a docked, non-modal drawer in the page's
// right column (the editor beside it keeps taking input). Top to bottom:
// the call's title (renameable), Video | Audio, the review documents, the
// people (search, chips, the document's collaborators with checkboxes), an
// optional message, "Ring online participants", the mic/camera pre-check,
// and a footer with the selection count, Copy invite link and Start call.
//
// Pure: every value and callback is the host's. The people search filters
// the list the host passes in (`collaborators.rows`) — it is not a dropdown —
// so a search result and a collaborator are ticked the same way.

import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import Drawer from '../shared/Drawer';
import { EditableHeading } from '../shared/EditableHeading';
import { SegmentedControl } from '../shared/SegmentedControl';
import Chip from '../shared/Chip';
import Banner from '../shared/Banner';
import { Spinner } from '../shared/Spinner';
import { Input } from '../forms/Input';
import { Textarea } from '../forms/Textarea';
import { Checkbox } from '../forms/Checkbox';
import { Button } from '../ui/Button';
import { LinkIcon, PlusIcon, SearchIcon } from '../ui/Icons';
import { ReviewDocumentList, type ReviewDocumentListProps } from './ReviewDocumentList';
import { CollaboratorCheckList, type CollaboratorCheckListProps } from './CollaboratorCheckList';
import { MediaPrecheckRow, type MediaPrecheckRowProps } from './MediaPrecheckRow';

export interface StartCallPeople {
  /** The search box. Typing filters `collaborators.rows` (the host's job). */
  query: string;
  onQueryChange: (q: string) => void;
  placeholder?: string;
  /** One chip per selected person, in selection order. */
  chips: { userId: string; name: string }[];
  onRemoveChip: (userId: string) => void;
  collaborators: CollaboratorCheckListProps;
}

export interface StartCallDrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  onTitleChange: (t: string) => void;
  media: 'video' | 'audio';
  onMediaChange: (m: 'video' | 'audio') => void;
  documents: Omit<ReviewDocumentListProps, 'trailing'> & { onAdd: () => void };
  onManageAccess: () => void;
  people: StartCallPeople;
  message: string;
  onMessageChange: (m: string) => void;
  /** Max message length. Default 280. */
  messageMaxLength?: number;
  ring: boolean;
  onRingChange: (r: boolean) => void;
  /** `showCamera` is derived from `media` unless given. */
  precheck: Omit<MediaPrecheckRowProps, 'showCamera'> & { showCamera?: boolean };
  selectedCount: number;
  onCopyLink: () => void;
  onStart: () => void;
  starting?: boolean;
  /** Disables Start call with this as the button's title. */
  startDisabledReason?: string;
  error?: { message: string; onRetry: () => void };
  /** Floating width in px. Docked (default), the drawer fills its column. */
  width?: number;
  docked?: boolean;
  className?: string;
  'data-testid'?: string;
}

function selectedLabel(n: number): string {
  if (n === 0) return 'No one selected';
  if (n === 1) return '1 person selected';
  return `${n} people selected`;
}

function SectionHeading({ children, action }: { children: ReactNode; action?: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <h3 className="m-0 text-[15px] font-semibold text-text-primary">{children}</h3>
      {action}
    </div>
  );
}

export function StartCallDrawer({
  open,
  onClose,
  title,
  onTitleChange,
  media,
  onMediaChange,
  documents,
  onManageAccess,
  people,
  message,
  onMessageChange,
  messageMaxLength = 280,
  ring,
  onRingChange,
  precheck,
  selectedCount,
  onCopyLink,
  onStart,
  starting = false,
  startDisabledReason,
  error,
  width = 400,
  docked = true,
  className,
  'data-testid': testId = 'start-call-drawer',
}: StartCallDrawerProps) {
  const { onAdd, ...docList } = documents;
  const startDisabled = Boolean(startDisabledReason) || starting || !title.trim();

  const footer = (
    <div className="flex flex-col gap-3">
      {error && (
        <Banner
          variant="error"
          title={`Could not start the call — ${error.message}`}
          action={
            <Button variant="ghost" size="sm" onClick={error.onRetry} data-testid="start-call-retry">
              Retry
            </Button>
          }
          data-testid="start-call-error"
        />
      )}
      <span className="text-xs text-text-tertiary" data-testid="start-call-selected-count">
        {selectedLabel(selectedCount)}
      </span>
      <div className="flex items-center justify-between gap-3">
        <Button variant="ghost" onClick={onCopyLink} data-testid="start-call-copy-link" className="inline-flex items-center gap-2 font-medium">
          <LinkIcon size={16} />
          Copy invite link
        </Button>
        <Button
          onClick={onStart}
          disabled={startDisabled}
          title={startDisabledReason ?? (!title.trim() ? 'Give the call a title' : undefined)}
          data-testid="start-call-submit"
          className="inline-flex items-center gap-2 px-5"
        >
          {starting && <Spinner size="sm" color="currentColor" decorative />}
          {starting ? 'Starting…' : 'Start call'}
        </Button>
      </div>
    </div>
  );

  return (
    <Drawer
      open={open}
      onClose={onClose}
      title="Start a call"
      docked={docked}
      modal={false}
      backdrop={false}
      trapFocus={false}
      {...(docked ? {} : { width })}
      footer={footer}
      className={className}
      headerClassName="border-b-0 px-5 pb-3 pt-5"
      titleClassName="text-lg"
      bodyClassName="flex flex-col gap-4 px-5 pt-1 pb-4"
      footerClassName="bg-surface px-5 py-4"
      closeTestId={`${testId}-close`}
      data-testid={testId}
    >
      <EditableHeading
        value={title}
        onCommit={onTitleChange}
        placeholder="Call title"
        editLabel="Rename call"
        data-testid="start-call-title"
      />
      <SegmentedControl
        options={[
          { value: 'video', label: 'Video' },
          { value: 'audio', label: 'Audio' },
        ]}
        value={media}
        onChange={(v) => onMediaChange(v as 'video' | 'audio')}
        fullWidth
        aria-label="Call type"
        data-testid="start-call-media"
      />

      <section className="flex flex-col gap-1.5">
        <SectionHeading
          action={
            <Button variant="link" onClick={onAdd} data-testid="start-call-add-document" className="inline-flex items-center gap-1 text-sm">
              <PlusIcon size={14} />
              Add
            </Button>
          }
        >
          Review documents
        </SectionHeading>
        <ReviewDocumentList {...docList} trailing="remove" data-testid="start-call-documents" rowTestIdPrefix="start-call-document" />
        <div className="flex items-center justify-between gap-2 text-xs">
          <span className="text-text-tertiary">Existing document access applies.</span>
          <Button variant="link" onClick={onManageAccess} data-testid="start-call-manage" className="text-xs">
            Manage
          </Button>
        </div>
      </section>

      <section className="flex flex-col gap-2.5">
        <SectionHeading>People</SectionHeading>
        <Input
          value={people.query}
          onChange={(e) => people.onQueryChange(e.target.value)}
          placeholder={people.placeholder ?? 'Find people, teams or channels'}
          aria-label={people.placeholder ?? 'Find people, teams or channels'}
          prefix={<SearchIcon size={16} />}
          data-testid="start-call-people-search"
        />
        {people.chips.length > 0 && (
          <div className="flex flex-wrap gap-2" data-testid="start-call-chips">
            {people.chips.map((c) => (
              <Chip
                key={c.userId}
                tone="neutral"
                onRemove={() => people.onRemoveChip(c.userId)}
                removeLabel={`Remove ${c.name}`}
                removeTestId={`start-call-chip-remove-${c.userId}`}
                data-testid={`start-call-chip-${c.userId}`}
                className="rounded-md px-2.5 py-1 text-[13px]"
              >
                {c.name}
              </Chip>
            ))}
          </div>
        )}
        <CollaboratorCheckList
          title="Document collaborators"
          footnote="Offline people can use the invite link."
          {...people.collaborators}
        />
      </section>

      <div className="h-px shrink-0 bg-border" aria-hidden="true" />

      <section className="flex flex-col gap-1.5">
        <label htmlFor={`${testId}-message`} className="text-sm text-text-primary">
          Message <span className="text-text-tertiary">(optional)</span>
        </label>
        <Textarea
          id={`${testId}-message`}
          value={message}
          onChange={(e) => onMessageChange(e.target.value.slice(0, messageMaxLength))}
          maxLength={messageMaxLength}
          rows={2}
          data-testid="start-call-message"
        />
      </section>

      <label className="flex cursor-pointer items-center gap-2.5 text-sm text-text-primary">
        <Checkbox checked={ring} onChange={(v) => onRingChange(v)} className="h-[18px] w-[18px]" data-testid="start-call-ring" />
        Ring online participants
      </label>

      <div className="h-px shrink-0 bg-border" aria-hidden="true" />

      <MediaPrecheckRow showCamera={media === 'video'} {...precheck} />
    </Drawer>
  );
}

export default StartCallDrawer;
