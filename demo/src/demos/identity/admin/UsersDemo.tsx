import { useState } from 'react';
import { PageHeader, ExampleBlock } from '../../../shared';
import { UserListPage, UserFormPage } from '@connorhoehn/ui-components/identity';
import { mockUsers } from '../mock-data';

export default function UsersDemo() {
  const [users, setUsers] = useState(mockUsers.slice(0, 5));
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <PageHeader
        title="User Management"
        description="User list with status badges, search, and CRUD actions. Users belong to a pool and can have custom attributes. Supports inline delete confirmation and a creation/edit form."
        importPath="import { UserListPage, UserFormPage } from '@connorhoehn/ui-components/identity'"
      />

      <ExampleBlock
        id="user-list"
        title={showForm ? 'Create User Form' : 'User List'}
        description={showForm ? 'Form with standard and custom attribute fields.' : 'Sortable table with status badges and action buttons.'}
        code={showForm
          ? `<UserFormPage
  isEdit={false}
  poolId="pool-acme-prod"
  onSubmit={async (data) => { ... }}
  onCancel={() => { ... }}
/>`
          : `<UserListPage
  users={users}
  poolId="pool-acme-prod"
  poolName="Acme Production"
  onCreateUser={() => { ... }}
  onEditUser={(id) => { ... }}
  onDeleteUser={async (id) => { ... }}
/>`}
      >
        {showForm ? (
          <UserFormPage
            isEdit={false}
            poolId="pool-acme-prod"
            onSubmit={async (data) => {
              await new Promise((r) => setTimeout(r, 500));
              setUsers([...users, { userId: `usr-${Date.now()}`, email: data.email, givenName: data.givenName || '', familyName: data.familyName || '', status: 'CONFIRMED', createdAt: new Date().toISOString() }]);
              setShowForm(false);
            }}
            onCancel={() => setShowForm(false)}
          />
        ) : (
          <UserListPage
            users={users}
            poolId="pool-acme-prod"
            poolName="Acme Production"
            onCreateUser={() => setShowForm(true)}
            onEditUser={(id) => console.log('[UsersDemo] Edit:', id)}
            onDeleteUser={async (id) => {
              await new Promise((r) => setTimeout(r, 300));
              setUsers(users.filter((u) => u.userId !== id));
            }}
          />
        )}
      </ExampleBlock>
    </div>
  );
}
