import { useState } from 'react';
import { EmailTemplateListPage } from '@connorhoehn/ui-components/identity';
import { mockEmailTemplates } from '../mock-data';

export default function EmailTemplatesDemo() {
  const [templates, setTemplates] = useState(mockEmailTemplates);

  return (
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
  );
}
