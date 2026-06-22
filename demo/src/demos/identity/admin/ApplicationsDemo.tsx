import { useState } from 'react';
import { PageHeader, ExampleBlock } from '../../../shared';
import { ApplicationListPage } from '@connorhoehnslalom/ui-components/identity';
import { mockClients } from '../mock-data';

export default function ApplicationsDemo() {
  const [apps, setApps] = useState(mockClients);

  return (
    <div>
      <PageHeader
        title="Applications"
        description="OAuth/OIDC application registry. Each application has a client ID, associated pool, and redirect URIs. Supports creation, editing, and deletion with inline confirmation."
        importPath="import { ApplicationListPage, ApplicationFormPage } from '@connorhoehnslalom/ui-components/identity'"
      />

      <ExampleBlock
        id="app-list"
        title="Application List"
        description="Table view with sortable name column, pool association, and redirect URIs."
        code={`<ApplicationListPage
  applications={applications}
  onCreateApp={() => { ... }}
  onCreateAppWithPool={() => { ... }}
  onEditApp={(clientId) => { ... }}
  onDeleteApp={async (clientId) => { ... }}
/>`}
      >
        <ApplicationListPage
          applications={apps}
          onCreateApp={() => console.log('[ApplicationsDemo] Create app')}
          onCreateAppWithPool={() => console.log('[ApplicationsDemo] Create app + pool')}
          onEditApp={(id) => console.log('[ApplicationsDemo] Edit:', id)}
          onDeleteApp={async (id) => {
            await new Promise((r) => setTimeout(r, 300));
            setApps(apps.filter((a) => a.clientId !== id));
          }}
        />
      </ExampleBlock>
    </div>
  );
}
