// frontend/src/components/doc-editor/DocumentListPage.tsx
//
// Card-based list view of all documents in the workspace.

import { useState, useCallback, useMemo } from 'react';
import NewDocumentModal from './NewDocumentModal';
import { cn } from '../../lib/cn';

// ---------------------------------------------------------------------------
// Exported types
// ---------------------------------------------------------------------------

export interface DocumentInfo {
  id: string;
  title: string;
  type: string;
  status: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  icon: string;
  description?: string;
  activeCallSessionId?: string;
}

export interface PresenceInfo {
  userId: string;
  displayName: string;
  color: string;
  mode?: string;
  idle?: boolean;
}

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface DocumentListPageProps {
  documents: DocumentInfo[];
  presence: Record<string, PresenceInfo[]>;
  onOpenDocument: (documentId: string) => void;
  onCreateDocument: (meta: { title: string; type: string; description?: string }) => void;
  onDeleteDocument: (documentId: string) => void;
  onJumpToUser: (documentId: string, userId: string) => void;
  hideHeader?: boolean;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function relativeTime(isoString: string): string {
  const now = Date.now();
  const then = new Date(isoString).getTime();
  if (isNaN(then)) return '';
  const diffMs = now - then;
  if (diffMs < 0) return 'just now';
  const seconds = Math.floor(diffMs / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
}

const STATUS_STYLES: Record<string, { bg: string; color: string }> = {
  draft: { bg: '#fef3c7', color: '#92400e' },
  review: { bg: '#dbeafe', color: '#1e40af' },
  final: { bg: '#d1fae5', color: '#065f46' },
  archived: { bg: '#f1f5f9', color: '#475569' },
};

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function StatusBadge({ status }: { status: string }) {
  const style = STATUS_STYLES[status] ?? STATUS_STYLES.draft;
  return (
    <span
      className={cn('inline-block px-2 py-0.5 text-[11px] font-semibold rounded-full capitalize leading-[18px]')}
      style={{ background: style.bg, color: style.color }}
    >
      {status}
    </span>
  );
}

const MODE_ICONS: Record<string, { icon: string; label: string }> = {
  editor: { icon: '✏', label: 'Editing' },
  reviewer: { icon: '✔', label: 'Reviewing' },
  reader: { icon: '👁', label: 'Viewing' },
};

function PresenceAvatars({
  users,
  onClickUser,
}: {
  users: PresenceInfo[];
  onClickUser: (userId: string) => void;
}) {
  const MAX_SHOWN = 5;
  const shown = users.slice(0, MAX_SHOWN);
  const overflow = users.length - MAX_SHOWN;

  return (
    <div className={cn('flex items-center gap-0.5')}>
      {shown.map((u, i) => {
        const modeInfo = MODE_ICONS[u.mode ?? 'editor'] ?? MODE_ICONS.editor;
        const isIdle = u.idle === true;
        const statusColor = isIdle ? '#f59e0b' : '#10b981';

        return (
          <div
            key={u.userId}
            title={`${u.displayName} — ${isIdle ? 'Away' : modeInfo.label}`}
            onClick={(e) => {
              e.stopPropagation();
              onClickUser(u.userId);
            }}
            className={cn('relative cursor-pointer')}
            style={{ marginLeft: i > 0 ? -6 : 0, zIndex: MAX_SHOWN - i }}
          >
            <div
              className={cn('w-8 h-8 rounded-full text-white text-[11px] font-bold flex items-center justify-center border-2 border-white')}
              style={{ background: isIdle ? `${u.color}99` : u.color }}
            >
              {u.displayName.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()}
            </div>
            <div
              className={cn('absolute -bottom-px -right-px w-2.5 h-2.5 rounded-full border-2 border-white')}
              style={{ background: statusColor }}
            />
            <div className={cn('absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-white border border-border flex items-center justify-center text-[8px] leading-none')}>
              {modeInfo.icon}
            </div>
          </div>
        );
      })}
      {overflow > 0 && (
        <div
          className={cn('w-8 h-8 rounded-full bg-[#94a3b8] text-white text-[10px] font-bold flex items-center justify-center border-2 border-white')}
          style={{ marginLeft: -6 }}
        >
          +{overflow}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function DocumentListPage({
  documents,
  presence,
  onOpenDocument,
  onCreateDocument,
  onDeleteDocument,
  onJumpToUser,
  hideHeader,
}: DocumentListPageProps) {
  const [showModal, setShowModal] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const DOCS_PER_PAGE = 10;
  const totalPages = Math.max(1, Math.ceil(documents.length / DOCS_PER_PAGE));

  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedDocs = useMemo(() => {
    const start = (safeCurrentPage - 1) * DOCS_PER_PAGE;
    return documents.slice(start, start + DOCS_PER_PAGE);
  }, [documents, safeCurrentPage]);

  const handleDelete = useCallback(
    (e: React.MouseEvent, docId: string, title: string) => {
      e.stopPropagation();
      if (window.confirm(`Delete "${title}"? This cannot be undone.`)) {
        onDeleteDocument(docId);
      }
    },
    [onDeleteDocument],
  );

  return (
    <div className={cn('px-4')}>
      {/* Header */}
      {!hideHeader && (
      <div className={cn('flex items-center justify-between mb-5')}>
        <h1 className={cn('m-0 text-[22px] font-bold text-[#1e293b]')}>Documents</h1>
        <button
          data-testid="new-document-btn"
          onClick={() => setShowModal(true)}
          className={cn('flex items-center gap-1.5 px-4 py-2 text-sm font-semibold border-none rounded-lg bg-[#3b82f6] text-white cursor-pointer font-[inherit]')}
        >
          <span className={cn('text-base leading-none')}>+</span>
          New Document
        </button>
      </div>
      )}

      {/* Document cards */}
      {documents.length === 0 ? (
        <div
          data-testid="documents-empty"
          className={cn('text-center px-4 py-12 text-text-tertiary text-[15px]')}
        >
          No documents yet. Create your first document to get started.
        </div>
      ) : (
        <div className={cn('flex flex-col gap-3')}>
          {paginatedDocs.map((doc) => {
            const users = presence[doc.id] ?? [];
            const isHovered = hoveredCard === doc.id;

            return (
              <div
                key={doc.id}
                data-testid={`document-card-${doc.id}`}
                onClick={() => onOpenDocument(doc.id)}
                onMouseEnter={() => setHoveredCard(doc.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className={cn(
                  'flex items-center gap-4 px-4 py-3.5 bg-white border border-border rounded-lg cursor-pointer relative transition-shadow duration-150',
                  isHovered ? 'shadow-[0_4px_12px_rgba(0,0,0,0.08)]' : '',
                )}
              >
                {/* Icon */}
                <span className={cn('text-2xl shrink-0')}>{doc.icon}</span>

                {/* Left: metadata */}
                <div className={cn('flex-1 min-w-0')}>
                  <div className={cn('flex items-center gap-2 mb-0.5')}>
                    <span className={cn('text-[15px] font-semibold text-[#1e293b] overflow-hidden text-ellipsis whitespace-nowrap')}>
                      {doc.title}
                    </span>
                    <StatusBadge status={doc.status} />
                    {doc.type && (
                      <span className={cn('inline-block px-2 py-px text-[11px] font-semibold rounded-full bg-[#f1f5f9] text-text-secondary whitespace-nowrap shrink-0')}>
                        {doc.type}
                      </span>
                    )}
                    {doc.activeCallSessionId && (
                      <span className={cn('inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-semibold rounded-full bg-[#dcfce7] text-[#166534] leading-[18px]')}>
                        <span className={cn('w-1.5 h-1.5 rounded-full bg-[#16a34a] animate-pulse')} />
                        Live Call
                      </span>
                    )}
                  </div>
                  {doc.description && (
                    <div className={cn('text-[13px] text-[#64748b] overflow-hidden text-ellipsis whitespace-nowrap mb-0.5')}>
                      {doc.description}
                    </div>
                  )}
                  <div className={cn('text-xs text-text-tertiary')}>
                    Updated {relativeTime(doc.updatedAt)}
                  </div>
                </div>

                {/* Right: presence */}
                {users.length > 0 && (
                  <div className={cn('shrink-0')}>
                    <PresenceAvatars
                      users={users}
                      onClickUser={(uid) => onJumpToUser(doc.id, uid)}
                    />
                  </div>
                )}

                {/* Delete button (hover-only) */}
                {isHovered && (
                  <button
                    onClick={(e) => handleDelete(e, doc.id, doc.title)}
                    title="Delete document"
                    className={cn('absolute top-2 right-2 w-[22px] h-[22px] flex items-center justify-center border-none rounded bg-[#fee2e2] text-[#dc2626] text-sm leading-none cursor-pointer font-[inherit] p-0')}
                  >
                    &#215;
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination controls */}
      {documents.length > DOCS_PER_PAGE && (
        <div
          data-testid="pagination-controls"
          className={cn('flex items-center justify-center gap-3 mt-4 pt-3 border-t border-border')}
        >
          <button
            data-testid="pagination-prev"
            disabled={safeCurrentPage <= 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className={cn(
              'px-3.5 py-1.5 text-[13px] font-semibold font-[inherit] border border-border rounded-md',
              safeCurrentPage <= 1 ? 'bg-[#f1f5f9] text-[#9ca3af] cursor-not-allowed' : 'bg-white text-text-secondary cursor-pointer',
            )}
          >
            Previous
          </button>
          <span
            data-testid="pagination-info"
            className={cn('text-[13px] text-text-secondary font-medium')}
          >
            Page {safeCurrentPage} of {totalPages}
          </span>
          <button
            data-testid="pagination-next"
            disabled={safeCurrentPage >= totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className={cn(
              'px-3.5 py-1.5 text-[13px] font-semibold font-[inherit] border border-border rounded-md',
              safeCurrentPage >= totalPages ? 'bg-[#f1f5f9] text-[#9ca3af] cursor-not-allowed' : 'bg-white text-text-secondary cursor-pointer',
            )}
          >
            Next
          </button>
        </div>
      )}

      {/* New document modal */}
      <NewDocumentModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onCreate={onCreateDocument}
      />
    </div>
  );
}
