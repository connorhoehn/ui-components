// frontend/src/components/doc-types/DocumentTypesPage.tsx
//
// Master-detail page for document type management.
// Left sidebar: list of existing types + New button.
// Right panel: wizard (create or edit mode) or empty/idle state.
// State machine: idle → create → idle  |  idle → edit → idle
// Delete flows through a confirmation modal.

import { useEffect, useState } from 'react';
import { cn } from '../../lib/cn';
import { DocumentTypeWizard } from './DocumentTypeWizard';
import { useDocumentTypes } from '../../hooks/useDocumentTypes';
import type { DocumentType } from '../../types/documentType';
import Modal from '../shared/Modal';
import EmptyState from '../shared/EmptyState';
import CookbooksModal from './CookbooksModal';

export interface DocumentTypesPageProps {
  /**
   * Cognito ID token. When provided, saves dual-write to the new server-side
   * `/api/document-types` endpoint (Phase A.5). Without it, the wizard
   * remains the localStorage-only flow that shipped pre-Phase A.5.
   */
  idToken?: string | null;
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
          className="py-[7px] px-[18px] text-[13px] font-semibold bg-white border border-border-field rounded-[7px] cursor-pointer font-inherit"
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
          ? 'bg-[#ede9fe] border border-[#c4b5fd]'
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
          'border border-transparent cursor-pointer text-xs px-2 py-[3px] shrink-0 leading-none rounded font-semibold font-inherit hover:bg-[#ede9fe] hover:text-[#4c1d95]',
          active ? 'bg-[#c4b5fd] text-[#4c1d95]' : 'bg-transparent text-text-tertiary',
        )}
      >
        Edit
      </button>
      <button
        data-testid={`delete-type-${type.id}`}
        onClick={e => { e.stopPropagation(); onDeleteRequest(); }}
        title="Delete type"
        className="bg-transparent border-none text-[#ef4444] cursor-pointer text-base px-[5px] py-0.5 shrink-0 opacity-55 leading-none rounded hover:opacity-100"
      >
        ×
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------

export function DocumentTypesPage({ idToken }: DocumentTypesPageProps = {}) {
  const { types, createType, updateType, deleteType, lastSync } = useDocumentTypes({ idToken });

  const [mode, setMode] = useState<Mode>('idle');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [cookbooksOpen, setCookbooksOpen] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{ text: string; key: number; syncSuffix?: string } | null>(null);

  useEffect(() => {
    if (!lastSync || !saveMessage) return;
    if (saveMessage.syncSuffix !== undefined) return;
    if (lastSync.op === 'delete') return;
    const suffix = lastSync.ok ? ' — synced' : ' — offline';
    setSaveMessage((prev) => prev ? { ...prev, syncSuffix: suffix } : prev);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastSync?.key]);

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

  const handleSave = (data: Omit<DocumentType, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (mode === 'edit' && editingId) {
      updateType(editingId, data);
      setSaveMessage({ text: `"${data.name}" updated`, key: Date.now() });
    } else {
      createType(data);
      setSaveMessage({ text: `"${data.name}" created`, key: Date.now() });
    }
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

  const handleDeleteConfirm = () => {
    if (!confirmDeleteId) return;
    deleteType(confirmDeleteId);
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
        {/* Header */}
        <div className="py-3.5 px-4 border-b border-border flex items-center justify-between">
          <span className="text-[13px] font-bold text-[#374151]">
            Document Types
          </span>
          <div className="flex gap-1.5">
            <button
              data-testid="cookbooks-btn"
              onClick={() => setCookbooksOpen(true)}
              className="py-[5px] px-3 text-xs font-semibold bg-white text-primary border border-primary rounded-md cursor-pointer font-inherit"
            >
              Cookbooks
            </button>
            <button
              data-testid="create-type-btn"
              onClick={handleCreateClick}
              className="py-[5px] px-3 text-xs font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-inherit"
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

        {/* Save feedback banner */}
        {saveMessage && (
          <div
            key={saveMessage.key}
            data-testid="save-message"
            className="py-2 px-3.5 border-t border-success-border bg-success-bg text-xs text-success-fg font-medium"
          >
            ✓ {saveMessage.text}{saveMessage.syncSuffix ?? ''}
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
            onSave={handleSave}
            onCancel={handleCancel}
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
