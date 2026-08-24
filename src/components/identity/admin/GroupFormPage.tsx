// src/components/identity/admin/GroupFormPage.tsx
//
// Create/Edit form for groups with permission tags and member management.

import { useId, useState, useCallback } from 'react';
import { FormField } from '../shared/FormField';
import { Card } from '../../ui/Card';
import { PageSection } from '../../ui/PageSection';
import { Button } from '../../ui/Button';
import { Input } from '../../forms/Input';
import { Select } from '../../forms/Select';
import Banner from '../../shared/Banner';

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
  onSubmit: (data: { groupName: string; description: string; permissions: string[] }) => Promise<void>;
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
  const uid = useId();

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
    <PageSection title={isEdit ? 'Edit Group' : 'Create Group'} className="max-w-[640px]">
      {error && <Banner variant="error">{error}</Banner>}

      <Card padding="md">

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
          <h3 id={`${uid}-permissions`} className="text-base font-semibold text-text-primary mt-6 mb-2">Permissions</h3>
          <div className="flex flex-wrap gap-1.5 mb-2">
            {permissions.map((perm) => (
              <span key={perm} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-info text-white text-sm font-medium">
                {perm}
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-0 text-white text-[14px] leading-none min-w-0 min-h-0"
                  onClick={() => removePermission(perm)}
                  aria-label={`Remove permission ${perm}`}
                >
                  x
                </Button>
              </span>
            ))}
          </div>
          {/* Named from the visible "Permissions" heading. A hand-written
              aria-label would be a copy that drifts from the words on screen. */}
          <Input
            aria-labelledby={`${uid}-permissions`}
            placeholder="Type a permission and press Enter"
            value={permInput}
            onChange={(e) => setPermInput(e.target.value)}
            onKeyDown={handlePermKeyDown}
          />
        </section>

        {/* Members section (edit mode only) */}
        {isEdit && members && (
          <section>
            <h3 id={`${uid}-members`} className="text-base font-semibold text-text-primary mt-6 mb-2">Members</h3>
            {members.length === 0 ? (
              <p className="text-text-tertiary text-sm">
                No members yet.
              </p>
            ) : (
              members.map((m) => (
                <div key={m.userId} className="flex items-center justify-between py-1.5 border-b border-border">
                  <span className="text-base">{m.email}</span>
                  {onRemoveMember && (
                    <Button variant="danger" size="sm" onClick={() => onRemoveMember(m.userId)}>
                      Remove
                    </Button>
                  )}
                </div>
              ))
            )}

            {/* Add member */}
            {availableUsers && availableUsers.length > 0 && onAddMember && (
              <div className="flex gap-2 mt-2">
                <Select
                  aria-label="Add member"
                  className="flex-1"
                  value={selectedUser}
                  onChange={(e) => setSelectedUser(e.target.value)}
                  placeholder="Select user to add..."
                  options={availableUsers.map((u) => ({ value: u.userId, label: u.email }))}
                />
                <Button variant="ghost" size="sm" onClick={handleAddMember} disabled={!selectedUser}>
                  Add
                </Button>
              </div>
            )}
          </section>
        )}

        <div className="flex gap-3 mt-6 pt-5 border-t border-border-subtle">
          <Button type="submit" variant="primary" size="lg" disabled={submitting}>
            {submitting ? 'Saving...' : isEdit ? 'Update Group' : 'Create Group'}
          </Button>
          <Button variant="ghost" size="lg" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
      </Card>
    </PageSection>
  );
}
