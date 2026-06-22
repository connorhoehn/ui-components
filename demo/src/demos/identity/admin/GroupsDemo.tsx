import { useState } from 'react';
import { PageHeader, ExampleBlock } from '../../../shared';
import { GroupListPage, GroupFormPage } from '@connorhoehnslalom/ui-components/identity';
import { mockGroups } from '../mock-data';

export default function GroupsDemo() {
  const [groups, setGroups] = useState(mockGroups);
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <PageHeader
        title="Group Management"
        description="Group list and form for managing user groups within a pool. Groups aggregate users and can be used for role-based access control."
        importPath="import { GroupListPage, GroupFormPage } from '@connorhoehnslalom/ui-components/identity'"
      />

      <ExampleBlock
        id="group-list"
        title={showForm ? 'Create Group Form' : 'Group List'}
        description={showForm ? 'Form with group name, description, and member management.' : 'Sortable table with member count and action buttons.'}
        code={showForm
          ? `<GroupFormPage
  isEdit={false}
  poolId="pool-acme-prod"
  onSubmit={async (data) => { ... }}
  onCancel={() => { ... }}
/>`
          : `<GroupListPage
  groups={groups}
  poolId="pool-acme-prod"
  poolName="Acme Production"
  onCreateGroup={() => { ... }}
  onEditGroup={(id) => { ... }}
  onDeleteGroup={async (id) => { ... }}
/>`}
      >
        {showForm ? (
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
        ) : (
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
        )}
      </ExampleBlock>
    </div>
  );
}
