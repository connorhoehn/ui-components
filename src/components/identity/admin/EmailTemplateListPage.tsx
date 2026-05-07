// src/components/identity/admin/EmailTemplateListPage.tsx
//
// Lists email templates with test-send modal and CRUD actions.

import { useState, useCallback, useMemo } from 'react';
import { EntityTable, type Column } from '../shared/EntityTable';

export interface EmailTemplateListPageProps {
  templates: Array<{ templateId: string; name: string; subject: string }>;
  onCreateTemplate: () => void;
  onEditTemplate: (templateId: string) => void;
  onDeleteTemplate: (templateId: string) => Promise<void>;
  onTestSend: (templateId: string, email: string) => Promise<void>;
  loading?: boolean;
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const headerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 'var(--ui-spacingMd)',
};

const titleStyle: React.CSSProperties = {
  fontSize: 'var(--ui-fontSizeLg)',
  fontWeight: 600,
  color: 'var(--ui-textPrimary)',
};

const createBtnStyle: React.CSSProperties = {
  padding: '8px 16px',
  backgroundColor: 'var(--ui-primary)',
  color: '#fff',
  border: 'none',
  borderRadius: 'var(--ui-radiusSm)',
  fontSize: 'var(--ui-fontSizeSm)',
  fontWeight: 500,
  cursor: 'pointer',
  font: 'inherit',
};

const actionBtnStyle: React.CSSProperties = {
  padding: '4px 10px',
  fontSize: 'var(--ui-fontSizeSm)',
  border: '1px solid var(--ui-border)',
  borderRadius: 'var(--ui-radiusSm)',
  backgroundColor: 'var(--ui-surface)',
  color: 'var(--ui-textPrimary)',
  cursor: 'pointer',
  marginRight: '6px',
  font: 'inherit',
};

const dangerBtnStyle: React.CSSProperties = {
  ...actionBtnStyle,
  borderColor: 'var(--ui-danger)',
  color: 'var(--ui-danger)',
};

const infoBtnStyle: React.CSSProperties = {
  ...actionBtnStyle,
  borderColor: 'var(--ui-info)',
  color: 'var(--ui-info)',
};

const confirmStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  fontSize: 'var(--ui-fontSizeSm)',
  color: 'var(--ui-danger)',
};

const modalOverlayStyle: React.CSSProperties = {
  position: 'fixed',
  inset: 0,
  backgroundColor: 'rgba(0,0,0,0.4)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
};

const modalStyle: React.CSSProperties = {
  backgroundColor: 'var(--ui-surface)',
  borderRadius: 'var(--ui-radiusMd)',
  padding: 'var(--ui-spacingLg)',
  boxShadow: 'var(--ui-shadowMd)',
  minWidth: '320px',
  maxWidth: '90vw',
};

const modalTitleStyle: React.CSSProperties = {
  fontSize: 'var(--ui-fontSizeMd)',
  fontWeight: 600,
  color: 'var(--ui-textPrimary)',
  marginBottom: 'var(--ui-spacingMd)',
};

const modalInputStyle: React.CSSProperties = {
  width: '100%',
  padding: 'var(--ui-spacingSm)',
  fontSize: 'var(--ui-fontSizeMd)',
  border: '1px solid var(--ui-border)',
  borderRadius: 'var(--ui-radiusSm)',
  backgroundColor: 'var(--ui-surface)',
  color: 'var(--ui-textPrimary)',
  boxSizing: 'border-box',
  marginBottom: 'var(--ui-spacingMd)',
};

const modalBtnRowStyle: React.CSSProperties = {
  display: 'flex',
  gap: 'var(--ui-spacingSm)',
  justifyContent: 'flex-end',
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

type TemplateRow = EmailTemplateListPageProps['templates'][number];

export function EmailTemplateListPage({
  templates,
  onCreateTemplate,
  onEditTemplate,
  onDeleteTemplate,
  onTestSend,
  loading,
}: EmailTemplateListPageProps) {
  const [confirmingId, setConfirmingId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [testModalId, setTestModalId] = useState<string | null>(null);
  const [testEmail, setTestEmail] = useState('');
  const [sending, setSending] = useState(false);

  const handleDelete = useCallback(
    async (templateId: string) => {
      setDeleting(true);
      try {
        await onDeleteTemplate(templateId);
      } finally {
        setDeleting(false);
        setConfirmingId(null);
      }
    },
    [onDeleteTemplate],
  );

  const handleTestSend = useCallback(async () => {
    if (!testModalId || !testEmail.trim()) return;
    setSending(true);
    try {
      await onTestSend(testModalId, testEmail.trim());
      setTestModalId(null);
      setTestEmail('');
    } finally {
      setSending(false);
    }
  }, [testModalId, testEmail, onTestSend]);

  const columns: Column<TemplateRow>[] = useMemo(
    () => [
      { key: 'name', header: 'Name', sortable: true },
      { key: 'subject', header: 'Subject' },
    ],
    [],
  );

  const renderActions = useCallback(
    (item: TemplateRow) => {
      if (confirmingId === item.templateId) {
        return (
          <span style={confirmStyle}>
            Are you sure?
            <button
              type="button"
              style={{ ...dangerBtnStyle, fontWeight: 600 }}
              onClick={() => handleDelete(item.templateId)}
              disabled={deleting}
            >
              {deleting ? '...' : 'Yes'}
            </button>
            <button type="button" style={actionBtnStyle} onClick={() => setConfirmingId(null)}>
              No
            </button>
          </span>
        );
      }

      return (
        <>
          <button type="button" style={actionBtnStyle} onClick={() => onEditTemplate(item.templateId)}>
            Edit
          </button>
          <button type="button" style={infoBtnStyle} onClick={() => { setTestModalId(item.templateId); setTestEmail(''); }}>
            Test Send
          </button>
          <button type="button" style={dangerBtnStyle} onClick={() => setConfirmingId(item.templateId)}>
            Delete
          </button>
        </>
      );
    },
    [confirmingId, deleting, handleDelete, onEditTemplate],
  );

  return (
    <div>
      <div style={headerStyle}>
        <h1 style={titleStyle}>Email Templates</h1>
        <button type="button" style={createBtnStyle} onClick={onCreateTemplate}>
          Create Template
        </button>
      </div>

      <EntityTable<TemplateRow>
        columns={columns}
        data={templates}
        keyField="templateId"
        actions={renderActions}
        loading={loading}
        emptyMessage="No email templates configured."
      />

      {/* Test send modal */}
      {testModalId && (
        <div style={modalOverlayStyle} onClick={() => setTestModalId(null)}>
          <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
            <h3 style={modalTitleStyle}>Send Test Email</h3>
            <input
              style={modalInputStyle}
              type="email"
              placeholder="recipient@example.com"
              value={testEmail}
              onChange={(e) => setTestEmail(e.target.value)}
              autoFocus
            />
            <div style={modalBtnRowStyle}>
              <button type="button" style={actionBtnStyle} onClick={() => setTestModalId(null)}>
                Cancel
              </button>
              <button
                type="button"
                style={{ ...createBtnStyle, opacity: sending || !testEmail.trim() ? 0.6 : 1 }}
                onClick={handleTestSend}
                disabled={sending || !testEmail.trim()}
              >
                {sending ? 'Sending...' : 'Send'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
