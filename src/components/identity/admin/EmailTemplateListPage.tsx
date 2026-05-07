// src/components/identity/admin/EmailTemplateListPage.tsx
//
// Lists email templates with test-send modal and CRUD actions.

import { useState, useCallback, useMemo } from 'react';
import { EntityTable, type Column } from '../shared/EntityTable';
import { cn } from '../../../lib/cn';

export interface EmailTemplateListPageProps {
  templates: Array<{ templateId: string; name: string; subject: string }>;
  onCreateTemplate: () => void;
  onEditTemplate: (templateId: string) => void;
  onDeleteTemplate: (templateId: string) => Promise<void>;
  onTestSend: (templateId: string, email: string) => Promise<void>;
  loading?: boolean;
}

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
          <span className="inline-flex items-center gap-1.5 text-sm text-danger">
            Are you sure?
            <button
              type="button"
              className="px-2.5 py-1 text-sm border border-danger rounded-sm bg-surface text-danger cursor-pointer font-semibold mr-1.5"
              onClick={() => handleDelete(item.templateId)}
              disabled={deleting}
            >
              {deleting ? '...' : 'Yes'}
            </button>
            <button
              type="button"
              className="px-2.5 py-1 text-sm border border-border rounded-sm bg-surface text-text-primary cursor-pointer mr-1.5"
              onClick={() => setConfirmingId(null)}
            >
              No
            </button>
          </span>
        );
      }

      return (
        <>
          <button
            type="button"
            className="px-2.5 py-1 text-sm border border-border rounded-sm bg-surface text-text-primary cursor-pointer mr-1.5"
            onClick={() => onEditTemplate(item.templateId)}
          >
            Edit
          </button>
          <button
            type="button"
            className="px-2.5 py-1 text-sm border border-info rounded-sm bg-surface text-info cursor-pointer mr-1.5"
            onClick={() => { setTestModalId(item.templateId); setTestEmail(''); }}
          >
            Test Send
          </button>
          <button
            type="button"
            className="px-2.5 py-1 text-sm border border-danger rounded-sm bg-surface text-danger cursor-pointer mr-1.5"
            onClick={() => setConfirmingId(item.templateId)}
          >
            Delete
          </button>
        </>
      );
    },
    [confirmingId, deleting, handleDelete, onEditTemplate],
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-semibold text-text-primary">Email Templates</h1>
        <button
          type="button"
          className="bg-primary text-white font-semibold rounded-md px-4 py-2 text-sm hover:bg-primary-hover cursor-pointer"
          onClick={onCreateTemplate}
        >
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
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-[1000]"
          onClick={() => setTestModalId(null)}
        >
          <div
            className="bg-surface rounded-md p-6 shadow-md min-w-[320px] max-w-[90vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-base font-semibold text-text-primary mb-4">Send Test Email</h3>
            <input
              className="w-full p-2 text-base border border-border rounded-sm bg-surface text-text-primary box-border mb-4"
              type="email"
              placeholder="recipient@example.com"
              value={testEmail}
              onChange={(e) => setTestEmail(e.target.value)}
              autoFocus
            />
            <div className="flex gap-2 justify-end">
              <button
                type="button"
                className="px-2.5 py-1 text-sm border border-border rounded-sm bg-surface text-text-primary cursor-pointer"
                onClick={() => setTestModalId(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className={cn(
                  "bg-primary text-white font-semibold rounded-md px-4 py-2 text-sm hover:bg-primary-hover cursor-pointer",
                  (sending || !testEmail.trim()) && "opacity-60"
                )}
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
