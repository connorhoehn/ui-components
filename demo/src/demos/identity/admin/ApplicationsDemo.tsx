import { useState } from 'react';
import { ApplicationListPage } from '@connorhoehn/ui-components/identity';
import { mockClients } from '../mock-data';

export default function ApplicationsDemo() {
  const [apps, setApps] = useState(mockClients);

  return (
    <ApplicationListPage
      applications={apps}
      onCreateApp={() => console.log('[ApplicationsDemo] Create')}
      onCreateAppWithPool={() => console.log('[ApplicationsDemo] Create with pool')}
      onEditApp={(id) => console.log('[ApplicationsDemo] Edit:', id)}
      onDeleteApp={async (id) => {
        await new Promise((r) => setTimeout(r, 300));
        setApps(apps.filter((a) => a.clientId !== id));
      }}
    />
  );
}
