// frontend/src/components/doc-types/DocumentTypesPage.tsx
//
// Master-detail page for document type management.
// Left sidebar: list of existing types + the two ways to add one.
// Right panel: the gallery of known types (idle) or the wizard (create/edit).
// State machine: idle → create → idle  |  idle → edit → idle
// Delete flows through a confirmation modal.
//
// ## Why the wizard is no longer what this page leads with
//
// Defining a content type field by field before you may write anything is the
// Drupal bargain, and almost nobody wants to make it. Fourteen usable types
// already ship in `cookbooks/`, and they were reachable only through a button
// sitting NEXT TO the wizard — the good path nested inside the path we want
// taken last.
//
// So the idle panel now IS the gallery: pick a known type, it installs, and the
// sidebar has it a second later. Building one from scratch is still here, one
// click away, as the escape hatch it always should have been. Types are
// starting points, not schemas to get right up front.

import { useState, type ReactNode } from 'react';
import { Button } from '../ui/Button';
import { Stack } from '../ui/Stack';
import PageHeader from '../shared/PageHeader';
import { cn } from '../../lib/cn';
import { DocumentTypeWizard } from './DocumentTypeWizard';
import { useDocumentTypes } from '../../hooks/useDocumentTypes';
import type { DocumentType } from '../../types/documentType';
import Modal from '../shared/Modal';
import EmptyState from '../shared/EmptyState';
import CookbooksModal from './CookbooksModal';
import { CookbookPicker } from './cookbooks/CookbookPicker';
import type { DocumentTypeCookbook } from './cookbooks';

/**
 * The two things this page needs from its host. Both are OPTIONAL and both
 * are props rather than ambient lookups: a library component that reads a
 * global auth context or a module-scope API client is one an embedder cannot
 * mount twice, cannot point at a second backend, and cannot test.
 *
 * Everything else the page needs it owns — `useDocumentTypes` does its own
 * fetching and offline caching, and the save/delete outcome is reported in
 * the page's own banner rather than through a host toast bus.
 */
export interface DocumentTypesPageProps {
  /** Compact content layout for hosts that already provide workspace navigation. */
  layout?: 'split' | 'workspace';
  /** Link to the host's existing document-processing pipeline editor. */
  processingAction?: ReactNode;
  /**
   * Bearer token attached to every `/api/document-types` call. The server is
   * the source of truth (remote-first); localStorage is only the hook's
   * offline cache. In a dev stack with SKIP_AUTH the calls also work without
   * a token, which is why this is optional rather than required.
   */
  idToken?: string | null;
  /**
   * Overrides the wizard's "Export Schema" action. Omit and the wizard GETs
   * `/api/document-types/:id/schema` with the token above and hands the user
   * a download. Rejecting surfaces the reason inline in the wizard.
   */
  onExportSchema?: (type: DocumentType) => Promise<void>;
  /**
   * Start a document of this type, from the page where the type lives.
   *
   * Absent hides the action entirely. An embedder with no creation route
   * should not be shown a button that cannot do anything — the same rule the
   * document header applies to "Share to #room".
   */
  onCreateDocument?: (type: DocumentType) => void;
}

type Mode = 'idle' | 'create' | 'edit';

// ---------------------------------------------------------------------------
// Delete confirmation modal
// ---------------------------------------------------------------------------

function DeleteConfirmModal({
  typeName,
  onConfirm,
  onCancel,
}: {
  typeName: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <Modal
      open
      onClose={onCancel}
      maxWidth={380}
      backdropTestId="delete-modal"
      footer={<>
        <button
          data-ui-part=""
          data-testid="cancel-delete"
          onClick={onCancel}
          className="py-[7px] px-[18px] text-[13px] font-semibold bg-surface border border-border-field rounded-[7px] cursor-pointer"
        >
          Cancel
        </button>
        <button
          data-ui-part=""
          data-testid="confirm-delete"
          onClick={onConfirm}
          className="py-[7px] px-[18px] text-[13px] font-semibold bg-danger text-white border-none rounded-[7px] cursor-pointer"
        >
          Delete
        </button>
      </>}
    >
      <div className="text-base font-semibold text-text-primary mb-2.5">
        Delete document type?
      </div>
      <p className="text-[13px] text-neutral m-0">
        <strong>"{typeName}"</strong> will be permanently removed. Documents already
        created from this type are unaffected.
      </p>
    </Modal>
  );
}

// ---------------------------------------------------------------------------
// Type list item
// ---------------------------------------------------------------------------

function TypeListItem({
  type,
  active,
  onSelect,
  onDeleteRequest,
  onCreateDocument,
}: {
  type: DocumentType;
  active: boolean;
  onSelect: () => void;
  onDeleteRequest: () => void;
  onCreateDocument?: () => void;
}) {
  return (
    <div
      data-testid={`type-item-${type.id}`}
      className={cn(
        'flex items-center gap-2 py-2 px-2.5 rounded-[7px] mb-0.5 transition-colors',
        active
          ? 'bg-accent-bg border border-accent-border'
          : 'bg-transparent border border-transparent',
      )}
    >
      <span className="text-lg shrink-0">{type.icon}</span>
      <div className="flex-1 min-w-0">
        {/* `title` because this ellipsises constantly and the row is the only
            place the name appears. Measured in the sidebar: the name box is
            70px, "Meeting Notes" needs 90 and "Sprint Retrospective" needs 127
            — so it read "Sprint Re…" with no way to recover the rest. Three
            buttons and a field count share this row, so widening it is not the
            answer; making the full name reachable is. */}
        <div
          title={type.name}
          className="text-[13px] font-medium text-text-primary overflow-hidden text-ellipsis whitespace-nowrap"
        >
          {type.name}
        </div>
        <div className="text-[11px] text-text-tertiary">
          {type.fields.length} field{type.fields.length !== 1 ? 's' : ''}
        </div>
      </div>
      {/* Use the type, from the place you installed it.
          Until this existed, the row offered only Edit and Delete: you could
          add "Bug Report" here and then had to leave for the documents list and
          search for it again to write one. Absent rather than disabled when the
          host passes no handler — an embedder with no creation route should not
          show a button that does nothing. */}
      {onCreateDocument && (
        <button
          data-ui-part=""
          data-testid={`new-doc-from-type-${type.id}`}
          onClick={(e) => { e.stopPropagation(); onCreateDocument(); }}
          title={`Start a new ${type.name}`}
          className="border border-transparent cursor-pointer text-xs px-2 py-[3px] shrink-0 leading-none rounded font-semibold bg-transparent text-primary hover:bg-accent-bg hover:text-accent-fg"
        >
          New
        </button>
      )}
      <button
        data-ui-part=""
        data-testid={`edit-type-${type.id}`}
        onClick={onSelect}
        title="Edit type"
        className={cn(
          'border border-transparent cursor-pointer text-xs px-2 py-[3px] shrink-0 leading-none rounded font-semibold hover:bg-accent-bg hover:text-accent-fg',
          active ? 'bg-accent-border text-accent-fg' : 'bg-transparent text-text-tertiary',
        )}
      >
        Edit
      </button>
      <button
        data-ui-part=""
        data-testid={`delete-type-${type.id}`}
        onClick={e => { e.stopPropagation(); onDeleteRequest(); }}
        title="Delete type"
        className="bg-transparent border-none text-danger-fg cursor-pointer text-base px-[5px] py-0.5 shrink-0 opacity-55 leading-none rounded hover:opacity-100"
      >
        ×
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------

export function DocumentTypesPage({ idToken, onExportSchema, onCreateDocument, layout = 'split', processingAction }: DocumentTypesPageProps = {}) {
  const { types, source, error, createType, updateType, deleteType } = useDocumentTypes({ idToken });

  const [mode, setMode] = useState<Mode>('idle');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [cookbooksOpen, setCookbooksOpen] = useState(false);
  /** True while a known type picked from the idle gallery is being installed. */
  const [installing, setInstalling] = useState(false);
  // tone drives the banner styling: success, offline (amber) or failure (red).
  // The old `syncSuffix` effect appended "— synced"/"— offline" AFTER the fact
  // to a banner that had already claimed success; with a write-through hook the
  // outcome is known before anything is said, so it is said once, correctly.
  const [saveMessage, setSaveMessage] = useState<{ text: string; key: number; tone: 'success' | 'offline' | 'error' } | null>(null);

  const editingType = editingId ? types.find(t => t.id === editingId) : undefined;

  // ---------------------------------------------------------------------------
  // Handlers
  // ---------------------------------------------------------------------------

  const handleCreateClick = () => {
    setEditingId(null);
    setMode('create');
    setSaveMessage(null);
  };

  const handleTypeSelect = (type: DocumentType) => {
    setEditingId(type.id);
    setMode('edit');
    setSaveMessage(null);
  };

  // Write-through: server first. A rejected save (server 4xx) keeps the
  // wizard OPEN with a red banner — nothing was saved, and pretending
  // otherwise is exactly the lie that used to lose people's types.
  const handleSave = async (data: Omit<DocumentType, 'id' | 'createdAt' | 'updatedAt'>) => {
    const verb = mode === 'edit' && editingId ? 'updated' : 'created';
    const outcome = mode === 'edit' && editingId
      ? await updateType(editingId, data)
      : await createType(data);

    if (outcome.status === 'rejected') {
      setSaveMessage({
        text: `"${data.name}" NOT saved — server rejected it (${outcome.error})`,
        key: Date.now(),
        tone: 'error',
      });
      return; // keep the wizard open; the user's work is not persisted anywhere
    }

    setSaveMessage(
      outcome.status === 'synced'
        ? { text: `"${data.name}" ${verb} — synced`, key: Date.now(), tone: 'success' }
        : { text: `"${data.name}" ${verb} — offline (saved locally, server unreachable)`, key: Date.now(), tone: 'offline' },
    );
    setMode('idle');
    setEditingId(null);
  };

  const handleCancel = () => {
    setMode('idle');
    setEditingId(null);
  };

  const handleDeleteRequest = (id: string) => {
    setConfirmDeleteId(id);
  };

  const handleDeleteConfirm = async () => {
    if (!confirmDeleteId) return;
    const doomed = types.find(t => t.id === confirmDeleteId);
    const outcome = await deleteType(confirmDeleteId);
    if (outcome.status === 'rejected') {
      setSaveMessage({
        text: `"${doomed?.name ?? confirmDeleteId}" NOT deleted — server rejected it (${outcome.error})`,
        key: Date.now(),
        tone: 'error',
      });
      setConfirmDeleteId(null);
      return;
    }
    if (editingId === confirmDeleteId) {
      setMode('idle');
      setEditingId(null);
    }
    setConfirmDeleteId(null);
  };

  const handleDeleteCancel = () => {
    setConfirmDeleteId(null);
  };

  const handleCookbookCreated = (typeId: string) => {
    setEditingId(typeId);
    setMode('edit');
    setSaveMessage(null);
  };

  /**
   * Install a known type from the idle gallery.
   *
   * Deliberately does NOT open the wizard afterwards, unlike the modal path.
   * The point of picking a ready-made type is that you do not have to edit
   * fields; dropping the person into the field editor anyway would put the
   * wizard back at the centre of the page it was just moved off. The new type
   * appears in the sidebar, where Edit is one click away if they want it.
   */
  const handleInstallKnownType = async (cookbook: DocumentTypeCookbook) => {
    if (installing) return; // a second click while in flight installs it twice
    setInstalling(true);
    setSaveMessage(null);
    try {
      const built = cookbook.build();
      const outcome = await createType(built);
      setSaveMessage(
        outcome.status === 'rejected'
          ? { text: `"${built.name}" NOT added — server rejected it (${outcome.error})`, key: Date.now(), tone: 'error' }
          : outcome.status === 'synced'
            ? { text: `"${built.name}" added — ready to use`, key: Date.now(), tone: 'success' }
            : { text: `"${built.name}" added — offline (saved locally, server unreachable)`, key: Date.now(), tone: 'offline' },
      );
    } catch (err) {
      setSaveMessage({
        text: `"${cookbook.name}" NOT added — ${err instanceof Error ? err.message : String(err)}`,
        key: Date.now(),
        tone: 'error',
      });
    } finally {
      setInstalling(false);
    }
  };

  const confirmDeleteType = confirmDeleteId
    ? types.find(t => t.id === confirmDeleteId)
    : null;

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  const workspace = layout === 'workspace';
  return (
    <div className={cn('flex h-full min-h-0 min-w-0', workspace ? 'flex-col overflow-y-auto' : 'overflow-hidden')}>
      {workspace && (
        <Stack gap="sm" className="shrink-0 px-5 pt-4 pb-3">
          <PageHeader
            title="Templates"
            description="Create and manage reusable document templates. Pick a starter below or build your own."
            actions={processingAction}
          />
        </Stack>
      )}

      {/* -- Left sidebar -- */}
      <div className={cn('shrink-0 border-border flex flex-col bg-surface-inset', workspace ? 'border-b mx-5 rounded-lg' : 'w-[264px] border-r overflow-hidden')}>
        {/* Header. Stacked rather than a single row: the sidebar is 264px, and
            "Document Types" plus both buttons does not fit on one line at that
            width -- side by side, the title wrapped to two lines and "+ New"
            broke between the plus and the word. */}
        <div className={cn('px-4 flex gap-2.5', workspace ? 'py-2 items-center justify-between' : 'py-3.5 border-b border-border flex-col')}>
          <span className="text-[13px] font-bold text-text-primary">
            {workspace ? 'Your templates' : 'Document Types'}
          </span>
          {/* The workspace already shows the starter gallery below. The modal
              entry remains useful in the standalone split layout. */}
          <div className="flex gap-1.5">
            {!workspace && <Button
              size="sm"
              data-testid="cookbooks-btn"
              onClick={() => setCookbooksOpen(true)}
              title="Browse the ready-made document types"
              className="py-[5px] px-3 text-xs font-semibold bg-primary text-on-primary border-none rounded-md cursor-pointer whitespace-nowrap"
            >
              Known types
            </Button>}
            <Button
              variant="secondary"
              size="sm"
              data-testid="create-type-btn"
              onClick={handleCreateClick}
              title="Build a document type field by field"
              className="py-[5px] px-3 text-xs bg-transparent text-text-secondary border border-border rounded-md cursor-pointer whitespace-nowrap"
            >
              {workspace ? 'New template' : 'From scratch'}
            </Button>
          </div>
        </div>

        {/* Type list */}
        <div className={cn(workspace ? 'grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-2 px-2 pb-2' : 'flex-1 overflow-y-auto p-2')} data-testid="type-list">
          {types.length === 0 ? (
            <div className={workspace ? "px-2 py-1 text-xs text-text-secondary" : "py-8 px-4 flex flex-col items-center gap-2"}>
              <div className="text-text-tertiary text-[13px]">{workspace ? 'No saved templates yet. Add one from the starters below.' : 'No types yet.'}</div>
              {/* Points at the gallery, not the wizard — picking a ready type
                  is the shorter road to a first type by a long way. */}
              {!workspace && <button
                data-ui-part=""
                data-testid="empty-browse-types-btn"
                onClick={() => setCookbooksOpen(true)}
                className="bg-transparent border-none text-primary text-[13px] font-medium cursor-pointer py-1 px-2"
              >
                Browse known types →
              </button>}
            </div>
          ) : (
            types.map(type => (
              <TypeListItem
                key={type.id}
                type={type}
                active={editingId === type.id}
                onSelect={() => handleTypeSelect(type)}
                onDeleteRequest={() => handleDeleteRequest(type.id)}
                onCreateDocument={onCreateDocument ? () => onCreateDocument(type) : undefined}
              />
            ))
          )}
        </div>

        {/* Offline notice — the list above is the cached copy, not the server's */}
        {source === 'cache' && (
          <div
            data-testid="types-offline-notice"
            className="py-2 px-3.5 border-t border-warning-border bg-warning-bg text-xs text-warning-fg font-medium"
          >
            ⚠ Offline — showing cached types ({error ?? 'server unreachable'})
          </div>
        )}

        {/* Save feedback banner */}
        {saveMessage && (
          <div
            key={saveMessage.key}
            data-testid="save-message"
            className={cn(
              'py-2 px-3.5 border-t text-xs font-medium',
              saveMessage.tone === 'success' && 'border-success-border bg-success-bg text-success-fg',
              saveMessage.tone === 'offline' && 'border-warning-border bg-warning-bg text-warning-fg',
              saveMessage.tone === 'error' && 'border-danger-border bg-danger-bg text-danger-fg',
            )}
          >
            {saveMessage.tone === 'error' ? '✗' : '✓'} {saveMessage.text}
          </div>
        )}
      </div>

      {/* -- Right panel -- */}
      <div className={cn('min-w-0', workspace ? 'shrink-0 px-5 py-4' : 'flex-1 overflow-y-auto py-7 px-9')} data-testid="right-panel">
        {mode === 'idle' && (
          <div data-testid="known-types-panel" className="flex flex-col gap-4">
            {/* Compact: this used to be a 220px-tall centred card that WAS the
                whole panel. It is now a caption on the gallery below it. */}
            {!workspace && <EmptyState
              testId="idle-panel"
              className="min-h-0 p-0 gap-1"
              icon="📋"
              title={types.length > 0 ? 'Select a type to edit' : 'No document types yet'}
              description={types.length > 0
                ? 'Choose a type from the list to edit its fields — or add another known type below.'
                : 'Start from a known type below. It installs as your own type, and you can change any of it afterwards.'}
              action={
                <button
                  data-ui-part=""
                  data-testid="idle-create-btn"
                  onClick={handleCreateClick}
                  className="px-3.5 py-2 text-[13px] font-medium bg-transparent text-text-secondary border border-border rounded-lg cursor-pointer"
                >
                  Build a type from scratch
                </button>
              }
            />}

            <div className={workspace ? '' : 'border-t border-border pt-4'}>
              <div className="text-[13px] font-bold text-text-primary mb-1">
                {workspace ? 'Start from a template' : 'Known types'}
              </div>
              {workspace && <p className="text-[13px] text-text-secondary mt-0 mb-3">Choose a starter to add it to Your templates. You can edit it afterwards.</p>}
              {/* Its own testid prefixes: the Cookbooks modal renders the same
                  picker, and two `cookbooks-grid` nodes on one screen is a
                  strict-mode selector collision in every spec that addresses
                  it. */}
              {/* `installedNames` is what stops this page offering a type you
                  already have. Measured before it existed: all fourteen
                  cookbooks showed "Add this type" including the three already
                  installed, and clicking one produced a SECOND type with the
                  same name, icon and field count — indistinguishable from the
                  first in this list, in the create dialog, and on every
                  document's type chip. */}
              <CookbookPicker
                onPick={handleInstallKnownType}
                busy={installing}
                actionLabel={workspace ? "Add template" : "Add this type"}
                idPrefix="type-starters"
                cardPrefix="type-starter"
                layout="fluid"
                gridHeightClassName="max-h-none"
                installedNames={types.map((t) => t.name)}
                onOpenInstalled={(cookbook) => {
                  // Take them to the one they already have rather than
                  // refusing without saying where it went.
                  const existing = types.find(
                    (t) => t.name.trim().toLowerCase() === cookbook.name.trim().toLowerCase(),
                  );
                  if (existing) { setEditingId(existing.id); setMode('edit'); }
                }}
              />
            </div>
          </div>
        )}

        {(mode === 'create' || mode === 'edit') && (
          <DocumentTypeWizard
            key={editingId ?? 'create'}
            initialType={editingType}
            idToken={idToken}
            onSave={handleSave}
            onCancel={handleCancel}
            onExportSchema={onExportSchema}
          />
        )}
      </div>

      {/* -- Delete confirmation modal -- */}
      {confirmDeleteId && confirmDeleteType && (
        <DeleteConfirmModal
          typeName={confirmDeleteType.name}
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      )}

      {/* -- Cookbooks gallery modal -- */}
      <CookbooksModal
        open={cookbooksOpen}
        onClose={() => setCookbooksOpen(false)}
        onCreated={handleCookbookCreated}
        createType={createType}
      />
    </div>
  );
}
