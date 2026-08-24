// src/components/identity/admin/EmailTemplateListPage.tsx
//
// Lists email templates with test-send modal and CRUD actions.

import { useState, useCallback, useMemo } from 'react';
import { EntityTable, type Column } from '../shared/EntityTable';
import { FormField } from '../shared/FormField';
import { PageSection } from '../../ui/PageSection';
import { Button } from '../../ui/Button';
import ConfirmDialog from '../../shared/ConfirmDialog';
import Banner from '../../shared/Banner';
import Modal from '../../shared/Modal';

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
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [testModalId, setTestModalId] = useState<string | null>(null);
  const [testEmail, setTestEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  // A rejected delete used to be swallowed whole: the close lived in
  // `finally`, so a 403/409/500 dismissed the dialog exactly like a success
  // while the row stayed in the table and nothing was ever shown or logged.
  // The admin's only clue was the row not disappearing, which reads as a
  // stale list — so the usual response was to reload and try again. Close on
  // success only; on failure keep the dialog up and name the reason.
  const handleDelete = useCallback(
    async (templateId: string) => {
      setDeleting(true);
      setDeleteError(null);
      try {
        await onDeleteTemplate(templateId);
        setConfirmingId(null);
      } catch (err: unknown) {
        setDeleteError(err instanceof Error ? err.message : 'Failed to delete template.');
      } finally {
        setDeleting(false);
      }
    },
    [onDeleteTemplate],
  );

  const closeConfirm = useCallback(() => {
    setConfirmingId(null);
    setDeleteError(null);
  }, []);

  // Already closed on success only — but a rejection left the modal open with
  // no message at all, so a bounced/unauthorised send looked identical to a
  // user who simply had not pressed the button yet.
  const handleTestSend = useCallback(async () => {
    if (!testModalId || !testEmail.trim()) return;
    setSending(true);
    setSendError(null);
    try {
      await onTestSend(testModalId, testEmail.trim());
      setTestModalId(null);
      setTestEmail('');
    } catch (err: unknown) {
      setSendError(err instanceof Error ? err.message : 'Failed to send test email.');
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
    (item: TemplateRow) => (
      <>
        <Button variant="ghost" size="sm" onClick={() => onEditTemplate(item.templateId)}>
          Edit
        </Button>
        <Button variant="ghost" size="sm" onClick={() => { setTestModalId(item.templateId); setTestEmail(''); setSendError(null); }}>
          Test Send
        </Button>
        <Button
          variant="danger"
          size="sm"
          onClick={() => { setConfirmingId(item.templateId); setDeleteError(null); }}
        >
          Delete
        </Button>
      </>
    ),
    [onEditTemplate],
  );

  return (
    <PageSection
      title="Email Templates"
      actions={
        <Button variant="primary" size="lg" onClick={onCreateTemplate}>
          Create Template
        </Button>
      }
    >
      <EntityTable<TemplateRow>
        columns={columns}
        data={templates}
        keyField="templateId"
        actions={renderActions}
        loading={loading}
        emptyMessage="No email templates configured."
        emptyIcon="✉️"
      />

      <Modal
        open={!!testModalId}
        onClose={() => { setTestModalId(null); setSendError(null); }}
        title="Send Test Email"
        footer={
          <>
            <Button variant="ghost" size="md" onClick={() => { setTestModalId(null); setSendError(null); }}>
              Cancel
            </Button>
            <Button variant="primary" size="md" onClick={() => { void handleTestSend(); }} disabled={sending || !testEmail.trim()}>
              {sending ? 'Sending...' : 'Send'}
            </Button>
          </>
        }
      >
        {sendError && (
          <div className="mb-3">
            <Banner variant="error">{sendError}</Banner>
          </div>
        )}
        <FormField
          label="Recipient Email"
          name="test-email"
          type="email"
          value={testEmail}
          onChange={(v) => setTestEmail(String(v))}
          placeholder="recipient@example.com"
        />
      </Modal>

      <ConfirmDialog
        open={!!confirmingId}
        onConfirm={() => { if (confirmingId) void handleDelete(confirmingId); }}
        onCancel={closeConfirm}
        title="Delete Template"
        body="This action cannot be undone. The template will be permanently removed."
        tone="destructive"
        confirmLabel="Delete"
        confirmDisabled={deleting}
      >
        {deleteError && <Banner variant="error">{deleteError}</Banner>}
      </ConfirmDialog>
    </PageSection>
  );
}
