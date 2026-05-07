// src/components/identity/admin/GroupFormPage.tsx
//
// Create/Edit form for groups with permission tags and member management.

import { useState, useCallback } from 'react';
import { FormField } from '../shared/FormField';

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
// Styles
// ---------------------------------------------------------------------------

const pageStyle: React.CSSProperties = {
  maxWidth: '640px',
};

const titleStyle: React.CSSProperties = {
  fontSize: 'var(--ui-fontSizeLg)',
  fontWeight: 600,
  color: 'var(--ui-textPrimary)',
  marginBottom: 'var(--ui-spacingMd)',
};

const sectionTitleStyle: React.CSSProperties = {
  fontSize: 'var(--ui-fontSizeMd)',
  fontWeight: 600,
  color: 'var(--ui-textPrimary)',
  marginTop: 'var(--ui-spacingLg)',
  marginBottom: 'var(--ui-spacingSm)',
};

const tagContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '6px',
  marginBottom: '8px',
};

const tagStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '4px',
  padding: '4px 10px',
  borderRadius: '999px',
  backgroundColor: 'var(--ui-info)',
  color: '#fff',
  fontSize: 'var(--ui-fontSizeSm)',
  fontWeight: 500,
};

const tagRemoveBtnStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  color: '#fff',
  cursor: 'pointer',
  fontSize: '14px',
  lineHeight: 1,
  padding: '0 2px',
};

const tagInputStyle: React.CSSProperties = {
  padding: 'var(--ui-spacingSm)',
  fontSize: 'var(--ui-fontSizeMd)',
  border: '1px solid var(--ui-border)',
  borderRadius: 'var(--ui-radiusSm)',
  backgroundColor: 'var(--ui-surface)',
  color: 'var(--ui-textPrimary)',
  width: '100%',
  boxSizing: 'border-box',
};

const memberRowStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '6px 0',
  borderBottom: '1px solid var(--ui-border)',
};

const addMemberRowStyle: React.CSSProperties = {
  display: 'flex',
  gap: '8px',
  marginTop: 'var(--ui-spacingSm)',
};

const selectStyle: React.CSSProperties = {
  flex: 1,
  padding: 'var(--ui-spacingSm)',
  fontSize: 'var(--ui-fontSizeMd)',
  border: '1px solid var(--ui-border)',
  borderRadius: 'var(--ui-radiusSm)',
  backgroundColor: 'var(--ui-surface)',
  color: 'var(--ui-textPrimary)',
};

const buttonRowStyle: React.CSSProperties = {
  display: 'flex',
  gap: 'var(--ui-spacingSm)',
  marginTop: 'var(--ui-spacingLg)',
};

const submitBtnStyle: React.CSSProperties = {
  padding: '10px 20px',
  backgroundColor: 'var(--ui-primary)',
  color: '#fff',
  border: 'none',
  borderRadius: 'var(--ui-radiusSm)',
  fontSize: 'var(--ui-fontSizeMd)',
  fontWeight: 500,
  cursor: 'pointer',
  font: 'inherit',
};

const cancelBtnStyle: React.CSSProperties = {
  padding: '10px 20px',
  backgroundColor: 'transparent',
  border: '1px solid var(--ui-border)',
  borderRadius: 'var(--ui-radiusSm)',
  fontSize: 'var(--ui-fontSizeMd)',
  color: 'var(--ui-textPrimary)',
  cursor: 'pointer',
  font: 'inherit',
};

const smallBtnStyle: React.CSSProperties = {
  padding: '4px 10px',
  fontSize: 'var(--ui-fontSizeSm)',
  border: '1px solid var(--ui-border)',
  borderRadius: 'var(--ui-radiusSm)',
  backgroundColor: 'var(--ui-surface)',
  color: 'var(--ui-textPrimary)',
  cursor: 'pointer',
  font: 'inherit',
};

const errorBannerStyle: React.CSSProperties = {
  padding: 'var(--ui-spacingSm) var(--ui-spacingMd)',
  backgroundColor: 'var(--ui-danger)',
  color: '#fff',
  borderRadius: 'var(--ui-radiusSm)',
  marginBottom: 'var(--ui-spacingMd)',
  fontSize: 'var(--ui-fontSizeSm)',
};

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
    <div style={pageStyle}>
      <h1 style={titleStyle}>{isEdit ? 'Edit Group' : 'Create Group'}</h1>

      {error && <div style={errorBannerStyle}>{error}</div>}

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
          <h3 style={sectionTitleStyle}>Permissions</h3>
          <div style={tagContainerStyle}>
            {permissions.map((perm) => (
              <span key={perm} style={tagStyle}>
                {perm}
                <button type="button" style={tagRemoveBtnStyle} onClick={() => removePermission(perm)}>
                  x
                </button>
              </span>
            ))}
          </div>
          <input
            style={tagInputStyle}
            placeholder="Type a permission and press Enter"
            value={permInput}
            onChange={(e) => setPermInput(e.target.value)}
            onKeyDown={handlePermKeyDown}
          />
        </section>

        {/* Members section (edit mode only) */}
        {isEdit && members && (
          <section>
            <h3 style={sectionTitleStyle}>Members</h3>
            {members.length === 0 ? (
              <p style={{ color: 'var(--ui-textMuted)', fontSize: 'var(--ui-fontSizeSm)' }}>
                No members yet.
              </p>
            ) : (
              members.map((m) => (
                <div key={m.userId} style={memberRowStyle}>
                  <span style={{ fontSize: 'var(--ui-fontSizeMd)' }}>{m.email}</span>
                  {onRemoveMember && (
                    <button
                      type="button"
                      style={{ ...smallBtnStyle, borderColor: 'var(--ui-danger)', color: 'var(--ui-danger)' }}
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
              <div style={addMemberRowStyle}>
                <select
                  style={selectStyle}
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
                <button type="button" style={smallBtnStyle} onClick={handleAddMember} disabled={!selectedUser}>
                  Add
                </button>
              </div>
            )}
          </section>
        )}

        <div style={buttonRowStyle}>
          <button type="submit" style={submitBtnStyle} disabled={submitting}>
            {submitting ? 'Saving...' : isEdit ? 'Update Group' : 'Create Group'}
          </button>
          <button type="button" style={cancelBtnStyle} onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
