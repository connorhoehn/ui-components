import { useState } from 'react';
import { PageHeader, ExampleBlock } from '../../../shared';
import { EmailTemplateListPage } from '@connorhoehn/ui-components/identity';
import { mockEmailTemplates } from '../mock-data';

export default function EmailTemplatesDemo() {
  const [templates, setTemplates] = useState(mockEmailTemplates);

  return (
    <div>
      <PageHeader
        title="Email Templates"
        description="Manage transactional email templates (verification, password reset, welcome, etc.). Supports editing, preview, test send, and deletion."
        importPath="import { EmailTemplateListPage, EmailTemplateFormPage } from '@connorhoehn/ui-components/identity'"
      />

      <ExampleBlock
        id="email-template-list"
        title="Template List"
        description="Table with template name, type, subject, and action buttons including test send."
        code={`<EmailTemplateListPage
  templates={templates}
  onCreateTemplate={() => { ... }}
  onEditTemplate={(id) => { ... }}
  onDeleteTemplate={async (id) => { ... }}
  onTestSend={async (id, email) => { ... }}
/>`}
      >
        <EmailTemplateListPage
          templates={templates}
          onCreateTemplate={() => console.log('[EmailTemplatesDemo] Create')}
          onEditTemplate={(id) => console.log('[EmailTemplatesDemo] Edit:', id)}
          onDeleteTemplate={async (id) => {
            await new Promise((r) => setTimeout(r, 300));
            setTemplates(templates.filter((t) => t.templateId !== id));
          }}
          onTestSend={async (id, email) => {
            await new Promise((r) => setTimeout(r, 500));
            console.log('[EmailTemplatesDemo] Test send:', { id, email });
          }}
        />
      </ExampleBlock>
    </div>
  );
}
