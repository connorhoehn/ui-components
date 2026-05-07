// src/components/identity/admin/GroupFormPage.tsx
//
// Create/Edit form for groups with permission tags and member management.

import { useState, useCallback } from 'react';
import { FormField } from '../shared/FormField';
import { cn } from '../../../lib/cn';

export interface GroupFormPageProps {
  group?: {
    groupId?: string;
    groupName: string;
    description?: string;
    permissions: string[];
  };
  isEdit: boolean;
  poolId: string;
  members?: Array<{ userId: string; email: string }>;
  availableUsers?: Array<{ userId: string; email: string }>;
  onSubmit: (data: any) => Promise<void>;
  onAddMember?: (userId: string) => Promise<void>;
  onRemoveMember?: (userId: string) => Promise<void>;
  onCancel: () => void;
  error?: string | null;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function GroupFormPage({
  group,
  isEdit,
  members,
  availableUsers,
  onSubmit,
  onAddMember,
  onRemoveMember,
  onCancel,
  error,
}: GroupFormPageProps) {
  const [groupName, setGroupName] = useState(group?.groupName ?? '');
  const [description, setDescription] = useState(group?.description ?? '');
  const [permissions, setPermissions] = useState<string[]>(group?.permissions ?? []);
  const [permInput, setPermInput] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handlePermKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const val = permInput.trim();
        if (val && !permissions.includes(val)) {
          setPermissions((prev) => [...prev, val]);
        }
        setPermInput('');
      }
    },
    [permInput, permissions],
  );

  const removePermission = useCallback((perm: string) => {
    setPermissions((prev) => prev.filter((p) => p !== perm));
  }, []);

  const handleAddMember = useCallback(async () => {
    if (selectedUser && onAddMember) {
      await onAddMember(selectedUser);
      setSelectedUser('');
    }
  }, [selectedUser, onAddMember]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setSubmitting(true);
      try {
        await onSubmit({ groupName, description, permissions });
      } finally {
        setSubmitting(false);
      }
    },
    [groupName, description, permissions, onSubmit],
  );

  return (
    <div className="max-w-[640px]">
      <h1 className="text-lg font-semibold text-text-primary mb-4">{isEdit ? 'Edit Group' : 'Create Group'}</h1>

      {error && <div className="px-4 py-2 bg-danger text-white rounded-sm mb-4 text-sm">{error}</div>}

      <form onSubmit={handleSubmit}>
        <FormField
          label="Group Name"
          name="groupName"
          value={groupName}
          onChange={(v) => setGroupName(String(v))}
          required
          placeholder="admins"
        />

        <FormField
          label="Description"
          name="description"
          type="textarea"
          value={description}
          onChange={(v) => setDescription(String(v))}
          placeholder="Describe this group's purpose..."
        />

        {/* Permissions tag input */}
        <section>
          <h3 className="text-base font-semibold text-text-primary mt-6 mb-2">Permissions</h3>
          <div className="flex flex-wrap gap-1.5 mb-2">
            {permissions.map((perm) => (
              <span key={perm} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-info text-white text-sm font-medium">
                {perm}
                <button
                  type="button"
                  className="bg-transparent border-none text-white cursor-pointer text-[14px] leading-none px-0.5"
                  onClick={() => removePermission(perm)}
                >
                  x
                </button>
              </span>
            ))}
          </div>
          <input
            className="w-full p-2 text-base border border-border rounded-sm bg-surface text-text-primary box-border"
            placeholder="Type a permission and press Enter"
            value={permInput}
            onChange={(e) => setPermInput(e.target.value)}
            onKeyDown={handlePermKeyDown}
          />
        </section>

        {/* Members section (edit mode only) */}
        {isEdit && members && (
          <section>
            <h3 className="text-base font-semibold text-text-primary mt-6 mb-2">Members</h3>
            {members.length === 0 ? (
              <p className="text-text-tertiary text-sm">
                No members yet.
              </p>
            ) : (
              members.map((m) => (
                <div key={m.userId} className="flex items-center justify-between py-1.5 border-b border-border">
                  <span className="text-base">{m.email}</span>
                  {onRemoveMember && (
                    <button
                      type="button"
                      className="px-2.5 py-1 text-sm border border-danger rounded-sm bg-surface text-danger cursor-pointer"
                      onClick={() => onRemoveMember(m.userId)}
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))
            )}

            {/* Add member */}
            {availableUsers && availableUsers.length > 0 && onAddMember && (
              <div className="flex gap-2 mt-2">
                <select
                  className="flex-1 p-2 text-base border border-border rounded-sm bg-surface text-text-primary"
                  value={selectedUser}
                  onChange={(e) => setSelectedUser(e.target.value)}
                >
                  <option value="">Select user to add...</option>
                  {availableUsers.map((u) => (
                    <option key={u.userId} value={u.userId}>
                      {u.email}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  className="px-2.5 py-1 text-sm border border-border rounded-sm bg-surface text-text-primary cursor-pointer"
                  onClick={handleAddMember}
                  disabled={!selectedUser}
                >
                  Add
                </button>
              </div>
            )}
          </section>
        )}

        <div className="flex gap-2 mt-6">
          <button
            type="submit"
            className="bg-primary text-white font-semibold rounded-md px-4 py-2 text-sm hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={submitting}
          >
            {submitting ? 'Saving...' : isEdit ? 'Update Group' : 'Create Group'}
          </button>
          <button
            type="button"
            className="px-5 py-2.5 bg-transparent border border-border rounded-sm text-base text-text-primary cursor-pointer"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
