import { useState } from 'react';
import { PoolListPage, PoolFormPage } from '@connorhoehn/ui-components/identity';
import { mockPools } from '../mock-data';

export default function PoolsDemo() {
  const [pools, setPools] = useState(mockPools);
  const [showForm, setShowForm] = useState(false);

  if (showForm) {
    return (
      <PoolFormPage
        isEdit={false}
        onSubmit={async (data) => {
          await new Promise((r) => setTimeout(r, 500));
          setPools([...pools, { poolId: `pool-${Date.now()}`, poolName: data.poolName, clientId: '', createdAt: new Date().toISOString() }]);
          setShowForm(false);
        }}
        onCancel={() => setShowForm(false)}
      />
    );
  }

  return (
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
  );
}
