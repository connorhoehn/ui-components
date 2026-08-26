// frontend/src/components/doc-editor/AttachmentsPanel.tsx
//
// Per-document attachments: file references and linked documents.

import { useEffect, useState } from 'react';
import { cn } from '../../lib/cn';
import { Input } from '../forms/Input';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface FileAttachment {
  id: string;
  kind: 'file';
  name: string;
  url: string;
  addedAt: string;
}

interface DocumentLink {
  id: string;
  kind: 'document';
  title: string;
  addedAt: string;
}

type Attachment = FileAttachment | DocumentLink;

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

function storageKey(documentId: string) {
  return `ws_attachments_${documentId}`;
}

function loadAttachments(documentId: string): Attachment[] {
  try {
    const raw = localStorage.getItem(storageKey(documentId));
    return raw ? (JSON.parse(raw) as Attachment[]) : [];
  } catch {
    return [];
  }
}

function useDocumentAttachments(documentId: string) {
  const [attachments, setAttachments] = useState<Attachment[]>(() =>
    loadAttachments(documentId),
  );

  // A lazy useState initialiser runs ONCE per mount. EditorModeSwitch keeps this
  // panel mounted while documentId changes, so without this the panel kept
  // showing the previous document's attachments — and because `persist` writes
  // to the CURRENT documentId's key, adding a file to document B wrote
  // document A's list into B's storage.
  useEffect(() => {
    setAttachments(loadAttachments(documentId));
  }, [documentId]);

  const persist = (next: Attachment[]) => {
    localStorage.setItem(storageKey(documentId), JSON.stringify(next));
    setAttachments(next);
  };

  // Mutators read from storage rather than from `attachments`, so a write can
  // never be based on a list belonging to a different document (or on a stale
  // copy if another tab changed it).
  const addFile = (name: string, url: string) => {
    persist([
      ...loadAttachments(documentId),
      { id: crypto.randomUUID(), kind: 'file', name: name.trim(), url: url.trim(), addedAt: new Date().toISOString() },
    ]);
  };

  const addDocumentLink = (title: string) => {
    persist([
      ...loadAttachments(documentId),
      { id: crypto.randomUUID(), kind: 'document', title: title.trim(), addedAt: new Date().toISOString() },
    ]);
  };

  const remove = (id: string) => {
    persist(loadAttachments(documentId).filter(a => a.id !== id));
  };

  return { attachments, addFile, addDocumentLink, remove };
}

// ---------------------------------------------------------------------------
// Add form
// ---------------------------------------------------------------------------

type AddMode = null | 'file' | 'document';

function AddFileForm({ onAdd, onCancel }: { onAdd: (name: string, url: string) => void; onCancel: () => void }) {
  const [name, setName] = useState('');
  const [url, setUrl]   = useState('');

  const valid = name.trim().length > 0 && url.trim().length > 0;

  return (
    <div className={cn('flex gap-2 items-start flex-wrap')}>
      <Input
        autoFocus
        placeholder="File name"
        value={name}
        onChange={e => setName(e.target.value)}
        className={cn('flex-1 min-w-[120px]')}
      />
      <Input
        placeholder="URL or path"
        value={url}
        onChange={e => setUrl(e.target.value)}
        onKeyDown={e => { if (e.key === 'Enter' && valid) { onAdd(name, url); } }}
        className={cn('flex-[2] min-w-[120px]')}
      />
      <button
        type="button"
        disabled={!valid}
        onClick={() => { if (valid) onAdd(name, url); }}
        className={cn('px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shrink-0')}
      >
        Attach
      </button>
      <button type="button" onClick={onCancel} className={cn('px-3 py-1.5 text-[13px] bg-transparent border-none text-neutral cursor-pointer font-[inherit] shrink-0')}>Cancel</button>
    </div>
  );
}

function AddDocumentForm({ onAdd, onCancel }: { onAdd: (title: string) => void; onCancel: () => void }) {
  const [title, setTitle] = useState('');
  const valid = title.trim().length > 0;

  return (
    <div className={cn('flex gap-2 items-center flex-wrap')}>
      <Input
        autoFocus
        placeholder="Document name"
        value={title}
        onChange={e => setTitle(e.target.value)}
        onKeyDown={e => { if (e.key === 'Enter' && valid) onAdd(title); }}
        className={cn('flex-1 min-w-[120px]')}
      />
      <button
        type="button"
        disabled={!valid}
        onClick={() => { if (valid) onAdd(title); }}
        className={cn('px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shrink-0')}
      >
        Link
      </button>
      <button type="button" onClick={onCancel} className={cn('px-3 py-1.5 text-[13px] bg-transparent border-none text-neutral cursor-pointer font-[inherit] shrink-0')}>Cancel</button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Attachment row
// ---------------------------------------------------------------------------

function AttachmentRow({ attachment, onRemove, editable }: {
  attachment: Attachment;
  onRemove: () => void;
  editable: boolean;
}) {
  const isFile = attachment.kind === 'file';

  return (
    <div className={cn('flex items-center gap-2.5 px-2.5 py-[7px] rounded-md bg-surface-panel border border-border')}>
      <span className={cn('text-sm shrink-0 text-neutral')}>
        {isFile ? '📎' : '📄'}
      </span>
      <div className={cn('flex-1 min-w-0')}>
        {isFile ? (
          <a
            href={(attachment as FileAttachment).url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn('text-[13px] text-info-fg font-medium no-underline hover:underline')}
          >
            {(attachment as FileAttachment).name}
          </a>
        ) : (
          <span className={cn('text-[13px] text-text-primary font-medium')}>
            {(attachment as DocumentLink).title}
          </span>
        )}
        <div className={cn('text-[11px] text-text-tertiary mt-px')}>
          {isFile ? (attachment as FileAttachment).url : 'Linked document'}
        </div>
      </div>
      {editable && (
        <button
          type="button"
          onClick={onRemove}
          title="Remove"
          className={cn('bg-transparent border-none cursor-pointer text-danger-fg text-sm px-[5px] py-0.5 opacity-50 leading-none rounded shrink-0 hover:opacity-100')}
        >
          ×
        </button>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Panel
// ---------------------------------------------------------------------------

export interface AttachmentsPanelProps {
  documentId: string;
  editable: boolean;
}

export default function AttachmentsPanel({ documentId, editable }: AttachmentsPanelProps) {
  const { attachments, addFile, addDocumentLink, remove } = useDocumentAttachments(documentId);
  const [addMode, setAddMode] = useState<AddMode>(null);

  const hasItems = attachments.length > 0;

  return (
    <div className={cn('mt-4 border border-border rounded-[10px] overflow-hidden')}>
      {/* Header */}
      <div className={cn(
        'flex items-center justify-between px-3.5 py-2.5 bg-surface-panel',
        (hasItems || addMode) ? 'border-b border-border' : '',
      )}>
        <span className={cn('text-[13px] font-semibold text-text-primary')}>
          Attachments
          {hasItems && (
            <span className={cn('ml-1.5 text-[11px] text-text-tertiary font-normal')}>
              {attachments.length}
            </span>
          )}
        </span>
        {editable && addMode === null && (
          <div className={cn('flex gap-1.5')}>
            <button
              type="button"
              onClick={() => setAddMode('file')}
              className={cn('text-xs px-2.5 py-1 font-semibold bg-surface border border-border-field rounded-[5px] cursor-pointer font-[inherit] text-text-primary')}
            >
              + File
            </button>
            <button
              type="button"
              onClick={() => setAddMode('document')}
              className={cn('text-xs px-2.5 py-1 font-semibold bg-surface border border-border-field rounded-[5px] cursor-pointer font-[inherit] text-text-primary')}
            >
              + Document
            </button>
          </div>
        )}
      </div>

      {/* Attachment list */}
      {hasItems && (
        <div className={cn('flex flex-col gap-1.5 px-3.5 py-2.5')}>
          {attachments.map(a => (
            <AttachmentRow
              key={a.id}
              attachment={a}
              onRemove={() => remove(a.id)}
              editable={editable}
            />
          ))}
        </div>
      )}

      {/* Add forms */}
      {addMode === 'file' && (
        <div className={cn('px-3.5 py-2.5', hasItems ? 'border-t border-border' : '')}>
          <AddFileForm
            onAdd={(name, url) => { addFile(name, url); setAddMode(null); }}
            onCancel={() => setAddMode(null)}
          />
        </div>
      )}
      {addMode === 'document' && (
        <div className={cn('px-3.5 py-2.5', hasItems ? 'border-t border-border' : '')}>
          <AddDocumentForm
            onAdd={(title) => { addDocumentLink(title); setAddMode(null); }}
            onCancel={() => setAddMode(null)}
          />
        </div>
      )}

      {/* Empty state */}
      {!hasItems && !addMode && (
        <div className={cn('px-3.5 py-3.5 text-xs text-text-tertiary text-center')}>
          {editable ? 'No attachments yet — add a file or link a document above.' : 'No attachments.'}
        </div>
      )}
    </div>
  );
}
