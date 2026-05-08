// src/components/identity/admin/EmailTemplateListPage.tsx
//
// Lists email templates with test-send modal and CRUD actions.

import { useState, useCallback, useMemo } from 'react';
import { EntityTable, type Column } from '../shared/EntityTable';
import { FormField } from '../shared/FormField';
import { PageSection } from '../../ui/PageSection';
import { Button } from '../../ui/Button';
import ConfirmDialog from '../../shared/ConfirmDialog';
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
    (item: TemplateRow) => (
      <>
        <Button variant="ghost" size="sm" onClick={() => onEditTemplate(item.templateId)}>
          Edit
        </Button>
        <Button variant="ghost" size="sm" onClick={() => { setTestModalId(item.templateId); setTestEmail(''); }}>
          Test Send
        </Button>
        <Button variant="danger" size="sm" onClick={() => setConfirmingId(item.templateId)}>
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
        onClose={() => setTestModalId(null)}
        title="Send Test Email"
        footer={
          <>
            <Button variant="ghost" size="md" onClick={() => setTestModalId(null)}>
              Cancel
            </Button>
            <Button variant="primary" size="md" onClick={handleTestSend} disabled={sending || !testEmail.trim()}>
              {sending ? 'Sending...' : 'Send'}
            </Button>
          </>
        }
      >
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
        onConfirm={() => confirmingId && handleDelete(confirmingId)}
        onCancel={() => setConfirmingId(null)}
        title="Delete Template"
        body="This action cannot be undone. The template will be permanently removed."
        tone="destructive"
        confirmLabel="Delete"
        confirmDisabled={deleting}
      />
    </PageSection>
  );
}
