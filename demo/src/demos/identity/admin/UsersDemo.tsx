import { useState } from 'react';
import { UserListPage, UserFormPage } from '@connorhoehn/ui-components/identity';
import { mockUsers } from '../mock-data';

export default function UsersDemo() {
  const [users, setUsers] = useState(mockUsers.slice(0, 5));
  const [showForm, setShowForm] = useState(false);

  if (showForm) {
    return (
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
    );
  }

  return (
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
  );
}
