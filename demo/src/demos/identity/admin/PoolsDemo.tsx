import { useState } from 'react';
import { PageHeader, ExampleBlock } from '../../../shared';
import { PoolListPage, PoolFormPage } from '@connorhoehn/ui-components/identity';
import { mockPools } from '../mock-data';

export default function PoolsDemo() {
  const [pools, setPools] = useState(mockPools);
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <PageHeader
        title="Pool Management"
        description="CRUD interface for user pools. Each pool groups users and can be associated with OAuth applications. Supports sortable table, inline delete confirmation, and a creation form."
        importPath="import { PoolListPage, PoolFormPage } from '@connorhoehn/ui-components/identity'"
      />

      <ExampleBlock
        id="pool-list"
        title={showForm ? 'Create Pool Form' : 'Pool List'}
        description={showForm ? 'Form for creating a new pool with custom attributes.' : 'Sortable table with View, Edit, and Delete actions. Click "Create Pool" to see the form.'}
        code={showForm
          ? `<PoolFormPage
  isEdit={false}
  onSubmit={async (data) => { ... }}
  onCancel={() => { ... }}
/>`
          : `<PoolListPage
  pools={pools}
  onCreatePool={() => { ... }}
  onEditPool={(id) => { ... }}
  onDeletePool={async (id) => { ... }}
  onViewPool={(id) => { ... }}
/>`}
      >
        {showForm ? (
          <PoolFormPage
            isEdit={false}
            onSubmit={async (data) => {
              await new Promise((r) => setTimeout(r, 500));
              setPools([...pools, { poolId: `pool-${Date.now()}`, poolName: data.poolName, clientId: '', createdAt: new Date().toISOString() }]);
              setShowForm(false);
            }}
            onCancel={() => setShowForm(false)}
          />
        ) : (
          <PoolListPage
            pools={pools}
            onCreatePool={() => setShowForm(true)}
            onEditPool={(id) => console.log('[PoolsDemo] Edit:', id)}
            onDeletePool={async (id) => {
              await new Promise((r) => setTimeout(r, 300));
              setPools(pools.filter((p) => p.poolId !== id));
            }}
            onViewPool={(id) => console.log('[PoolsDemo] View:', id)}
          />
        )}
      </ExampleBlock>
    </div>
  );
}
