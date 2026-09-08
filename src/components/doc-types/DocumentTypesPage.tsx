// frontend/src/components/doc-types/DocumentTypesPage.tsx
//
// Master-detail page for document type management.
// Left sidebar: list of existing types + New button.
// Right panel: wizard (create or edit mode) or empty/idle state.
// State machine: idle → create → idle  |  idle → edit → idle
// Delete flows through a confirmation modal.

import { useState } from 'react';
import { cn } from '../../lib/cn';
import { DocumentTypeWizard } from './DocumentTypeWizard';
import { useDocumentTypes } from '../../hooks/useDocumentTypes';
import type { DocumentType } from '../../types/documentType';
import Modal from '../shared/Modal';
import EmptyState from '../shared/EmptyState';
import CookbooksModal from './CookbooksModal';

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
          data-testid="cancel-delete"
          onClick={onCancel}
          className="py-[7px] px-[18px] text-[13px] font-semibold bg-surface border border-border-field rounded-[7px] cursor-pointer font-inherit"
        >
          Cancel
        </button>
        <button
          data-testid="confirm-delete"
          onClick={onConfirm}
          className="py-[7px] px-[18px] text-[13px] font-semibold bg-danger text-white border-none rounded-[7px] cursor-pointer font-inherit"
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
}: {
  type: DocumentType;
  active: boolean;
  onSelect: () => void;
  onDeleteRequest: () => void;
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
        <div className="text-[13px] font-medium text-text-primary overflow-hidden text-ellipsis whitespace-nowrap">
          {type.name}
        </div>
        <div className="text-[11px] text-text-tertiary">
          {type.fields.length} field{type.fields.length !== 1 ? 's' : ''}
        </div>
      </div>
      <button
        data-testid={`edit-type-${type.id}`}
        onClick={onSelect}
        title="Edit type"
        className={cn(
          'border border-transparent cursor-pointer text-xs px-2 py-[3px] shrink-0 leading-none rounded font-semibold font-inherit hover:bg-accent-bg hover:text-accent-fg',
          active ? 'bg-accent-border text-accent-fg' : 'bg-transparent text-text-tertiary',
        )}
      >
        Edit
      </button>
      <button
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

export function DocumentTypesPage({ idToken, onExportSchema }: DocumentTypesPageProps = {}) {
  const { types, source, error, createType, updateType, deleteType } = useDocumentTypes({ idToken });

  const [mode, setMode] = useState<Mode>('idle');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [cookbooksOpen, setCookbooksOpen] = useState(false);
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

  const confirmDeleteType = confirmDeleteId
    ? types.find(t => t.id === confirmDeleteId)
    : null;

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <div className="flex h-full overflow-hidden font-inherit">

      {/* -- Left sidebar -- */}
      <div className="w-[264px] shrink-0 border-r border-border flex flex-col overflow-hidden bg-surface-inset">
        {/* Header. Stacked rather than a single row: the sidebar is 264px, and
            "Document Types" plus both buttons does not fit on one line at that
            width -- side by side, the title wrapped to two lines and "+ New"
            broke between the plus and the word. */}
        <div className="py-3.5 px-4 border-b border-border flex flex-col gap-2.5">
          <span className="text-[13px] font-bold text-text-primary">
            Document Types
          </span>
          <div className="flex gap-1.5">
            <button
              data-testid="cookbooks-btn"
              onClick={() => setCookbooksOpen(true)}
              className="py-[5px] px-3 text-xs font-semibold bg-surface text-primary border border-primary rounded-md cursor-pointer font-inherit whitespace-nowrap"
            >
              Cookbooks
            </button>
            <button
              data-testid="create-type-btn"
              onClick={handleCreateClick}
              className="py-[5px] px-3 text-xs font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-inherit whitespace-nowrap"
            >
              + New
            </button>
          </div>
        </div>

        {/* Type list */}
        <div className="flex-1 overflow-y-auto p-2" data-testid="type-list">
          {types.length === 0 ? (
            <div className="py-8 px-4 flex flex-col items-center gap-2">
              <div className="text-text-tertiary text-[13px]">No types yet.</div>
              <button
                onClick={handleCreateClick}
                className="bg-transparent border-none text-primary text-[13px] font-medium cursor-pointer py-1 px-2 font-inherit"
              >
                Create one →
              </button>
            </div>
          ) : (
            types.map(type => (
              <TypeListItem
                key={type.id}
                type={type}
                active={editingId === type.id}
                onSelect={() => handleTypeSelect(type)}
                onDeleteRequest={() => handleDeleteRequest(type.id)}
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
      <div className="flex-1 overflow-y-auto py-7 px-9" data-testid="right-panel">
        {mode === 'idle' && (
          <EmptyState
            testId="idle-panel"
            actionTestId="idle-create-btn"
            icon="📋"
            title={types.length > 0 ? 'Select a type to edit' : 'No document types yet'}
            body={types.length > 0
              ? 'Choose a type from the list to edit its fields and view modes.'
              : 'Document types define the structure and fields for your documents.'}
            actionLabel={types.length > 0 ? undefined : '+ Create Document Type'}
            onAction={types.length > 0 ? undefined : handleCreateClick}
          />
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
