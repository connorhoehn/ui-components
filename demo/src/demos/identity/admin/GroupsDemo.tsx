import { useState } from 'react';
import { GroupListPage, GroupFormPage } from '@connorhoehn/ui-components/identity';
import { mockGroups } from '../mock-data';

export default function GroupsDemo() {
  const [groups, setGroups] = useState(mockGroups);
  const [showForm, setShowForm] = useState(false);

  if (showForm) {
    return (
      <GroupFormPage
        isEdit={false}
        poolId="pool-acme-prod"
        onSubmit={async (data) => {
          await new Promise((r) => setTimeout(r, 500));
          setGroups([...groups, { groupId: `grp-${Date.now()}`, groupName: data.groupName, description: data.description || '', permissions: data.permissions || [] }]);
          setShowForm(false);
        }}
        onCancel={() => setShowForm(false)}
      />
    );
  }

  return (
    <GroupListPage
      groups={groups}
      poolId="pool-acme-prod"
      poolName="Acme Production"
      onCreateGroup={() => setShowForm(true)}
      onEditGroup={(id) => console.log('[GroupsDemo] Edit:', id)}
      onDeleteGroup={async (id) => {
        await new Promise((r) => setTimeout(r, 300));
        setGroups(groups.filter((g) => g.groupId !== id));
      }}
    />
  );
}
