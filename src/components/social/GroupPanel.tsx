// frontend/src/components/GroupPanel.tsx
//
// Group management panel. Supports compact mode for narrow sidebar rendering.

import { useState } from 'react';
import { useGroups } from '../../hooks/useGroups';
import type { GroupItem, MemberItem } from '../../hooks/useGroups';
import type { RoomItem } from '../../hooks/useRooms';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface GroupPanelProps {
  idToken: string | null;
  rooms: RoomItem[];
  createGroupRoom: (groupId: string, name: string) => Promise<void>;
  onRoomSelect?: (room: RoomItem) => void;
  roomsLoading: boolean;
  compact?: boolean;
}

// ---------------------------------------------------------------------------
// CompactGroupRow (sidebar-friendly)
// ---------------------------------------------------------------------------

function CompactGroupRow({ group, isSelected, onClick }: {
  group: GroupItem;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: 6,
        width: '100%', border: 'none', borderRadius: 5,
        padding: '6px 8px', cursor: 'pointer',
        background: isSelected ? '#ede9fe' : 'transparent',
        color: isSelected ? '#4c1d95' : '#374151',
        fontWeight: isSelected ? 600 : 400,
        fontSize: 13, textAlign: 'left',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      <span style={{ color: isSelected ? '#646cff' : '#94a3b8', fontSize: 12, flexShrink: 0 }}>
        {group.visibility === 'private' ? '🔒' : '👥'}
      </span>
      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>
        {group.name}
      </span>
    </button>
  );
}

// ---------------------------------------------------------------------------
// CompactCreateGroupForm
// ---------------------------------------------------------------------------

function CompactCreateGroupForm({ onCreate, onDiscard, loading }: {
  onCreate: (name: string, description?: string, visibility?: 'public' | 'private') => Promise<void>;
  onDiscard: () => void;
  loading: boolean;
}) {
  const [name, setName] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setFormError(null);
    try {
      await onCreate(name.trim());
      setName('');
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Failed to create group');
    }
  };

  return (
    <form onSubmit={(e) => { void handleSubmit(e); }} style={{ padding: '8px', background: '#f8fafc', borderRadius: 6, border: '1px solid #e2e8f0', margin: '4px 0 8px' }}>
      <input
        value={name}
        onChange={e => setName(e.target.value.slice(0, 50))}
        placeholder="Group name"
        maxLength={50}
        required
        autoFocus
        style={{
          width: '100%', boxSizing: 'border-box',
          border: '1px solid #d1d5db', borderRadius: 5,
          padding: '5px 8px', fontSize: 13,
          fontFamily: 'system-ui, -apple-system, sans-serif',
          background: '#fff', color: '#0f172a', marginBottom: 6,
        }}
      />
      <div style={{ display: 'flex', gap: 6 }}>
        <button type="submit" disabled={!name.trim() || loading} style={{
          flex: 1, height: 28, border: 'none', borderRadius: 5,
          background: !name.trim() || loading ? '#e2e8f0' : '#646cff',
          color: !name.trim() || loading ? '#9ca3af' : '#fff',
          fontSize: 12, fontWeight: 600, cursor: !name.trim() || loading ? 'default' : 'pointer',
          fontFamily: 'inherit',
        }}>
          {loading ? 'Creating…' : 'Create'}
        </button>
        <button type="button" onClick={onDiscard} style={{
          height: 28, padding: '0 8px', border: '1px solid #e2e8f0', borderRadius: 5,
          background: '#fff', color: '#64748b', fontSize: 12, cursor: 'pointer', fontFamily: 'inherit',
        }}>
          Cancel
        </button>
      </div>
      {formError && (
        <div style={{ color: '#dc2626', fontSize: 11, marginTop: 4 }}>{formError}</div>
      )}
    </form>
  );
}

// ---------------------------------------------------------------------------
// CompactGroupDetail (shown below groups list in sidebar when selected)
// ---------------------------------------------------------------------------

function CompactGroupDetail({ group, members, rooms, groupId, currentUserId, createGroupRoom, onRoomSelect, inviteUser, loading }: {
  group: GroupItem;
  members: MemberItem[];
  rooms: RoomItem[];
  groupId: string;
  currentUserId: string | null;
  createGroupRoom: (groupId: string, name: string) => Promise<void>;
  onRoomSelect?: (room: RoomItem) => void;
  inviteUser: (groupId: string, userId: string) => Promise<void>;
  loading: boolean;
}) {
  const [showInvite, setShowInvite] = useState(false);
  const [inviteId, setInviteId] = useState('');
  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const [roomName, setRoomName] = useState('');

  const isOwner = group.ownerId === currentUserId;
  const groupRooms = rooms.filter(r => r.groupId === groupId);

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteId.trim()) return;
    await inviteUser(groupId, inviteId.trim());
    setInviteId('');
    setShowInvite(false);
  };

  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomName.trim()) return;
    await createGroupRoom(groupId, roomName.trim());
    setRoomName('');
    setShowCreateRoom(false);
  };

  return (
    <div style={{ padding: '4px 8px 8px', borderTop: '1px solid #e2e8f0', marginTop: 4 }}>
      {/* Members count + invite */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
        <span style={{ fontSize: 11, color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          Members ({members.length})
        </span>
        {isOwner && (
          <button onClick={() => setShowInvite(v => !v)} style={{
            fontSize: 11, color: '#646cff', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit',
          }}>
            + Invite
          </button>
        )}
      </div>

      {showInvite && (
        <form onSubmit={(e) => { void handleInvite(e); }} style={{ display: 'flex', gap: 4, marginBottom: 6 }}>
          <input
            value={inviteId}
            onChange={e => setInviteId(e.target.value)}
            placeholder="User ID"
            style={{
              flex: 1, border: '1px solid #d1d5db', borderRadius: 4,
              padding: '3px 6px', fontSize: 12, fontFamily: 'inherit',
              background: '#fff', color: '#0f172a',
            }}
          />
          <button type="submit" disabled={!inviteId.trim()} style={{
            height: 24, padding: '0 8px', border: 'none', borderRadius: 4,
            background: !inviteId.trim() ? '#e2e8f0' : '#646cff',
            color: !inviteId.trim() ? '#9ca3af' : '#fff',
            fontSize: 11, cursor: !inviteId.trim() ? 'default' : 'pointer', fontFamily: 'inherit',
          }}>
            Invite
          </button>
        </form>
      )}

      {/* Member avatars row */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 8 }}>
        {members.slice(0, 8).map(m => (
          <div key={m.userId} title={m.displayName ?? m.userId} style={{
            width: 24, height: 24, borderRadius: '50%',
            background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 10, fontWeight: 600, color: '#374151',
          }}>
            {(m.displayName ?? m.userId).slice(0, 2).toUpperCase()}
          </div>
        ))}
        {members.length > 8 && (
          <span style={{ fontSize: 11, color: '#94a3b8', alignSelf: 'center' }}>+{members.length - 8}</span>
        )}
      </div>

      {/* Group rooms */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
        <span style={{ fontSize: 11, color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          Rooms ({groupRooms.length})
        </span>
        {isOwner && (
          <button onClick={() => setShowCreateRoom(v => !v)} style={{
            fontSize: 11, color: '#646cff', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit',
          }}>
            + Room
          </button>
        )}
      </div>

      {showCreateRoom && (
        <form onSubmit={(e) => { void handleCreateRoom(e); }} style={{ display: 'flex', gap: 4, marginBottom: 6 }}>
          <input
            value={roomName}
            onChange={e => setRoomName(e.target.value.slice(0, 50))}
            placeholder="Room name"
            style={{
              flex: 1, border: '1px solid #d1d5db', borderRadius: 4,
              padding: '3px 6px', fontSize: 12, fontFamily: 'inherit',
              background: '#fff', color: '#0f172a',
            }}
          />
          <button type="submit" disabled={!roomName.trim() || loading} style={{
            height: 24, padding: '0 8px', border: 'none', borderRadius: 4,
            background: !roomName.trim() || loading ? '#e2e8f0' : '#646cff',
            color: !roomName.trim() || loading ? '#9ca3af' : '#fff',
            fontSize: 11, cursor: !roomName.trim() || loading ? 'default' : 'pointer', fontFamily: 'inherit',
          }}>
            Create
          </button>
        </form>
      )}

      {groupRooms.map(room => (
        <button
          key={room.roomId}
          onClick={() => onRoomSelect?.(room)}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            width: '100%', border: 'none', borderRadius: 5,
            padding: '5px 8px', cursor: 'pointer',
            background: 'transparent', color: '#374151',
            fontSize: 13, textAlign: 'left', fontFamily: 'inherit',
          }}
        >
          <span style={{ color: '#94a3b8', fontSize: 12 }}>#</span>
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{room.name}</span>
        </button>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Full-size components (unchanged, for non-compact usage)
// ---------------------------------------------------------------------------

function CreateGroupForm({ onCreate, onDiscard, loading }: {
  onCreate: (name: string, description?: string, visibility?: 'public' | 'private') => Promise<void>;
  onDiscard: () => void;
  loading: boolean;
}) {
  const [name, setName] = useState('');
  const [visibility, setVisibility] = useState<'public' | 'private'>('public');
  const [formError, setFormError] = useState<string | null>(null);

  const inputStyle: React.CSSProperties = {
    width: '100%', boxSizing: 'border-box',
    border: '1px solid #d1d5db', borderRadius: 6,
    padding: '6px 10px', fontSize: 14,
    fontFamily: 'system-ui, -apple-system, sans-serif',
    background: '#f9fafb', color: '#0f172a',
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setFormError(null);
    try {
      await onCreate(name.trim(), undefined, visibility);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Failed to create group');
    }
  };

  return (
    <form onSubmit={(e) => { void handleSubmit(e); }} style={{ marginBottom: 12, padding: '12px', background: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0' }}>
      <div style={{ marginBottom: 12 }}>
        <label style={{ fontSize: 14, color: '#374151', display: 'block', marginBottom: 4 }}>Group name</label>
        <input value={name} onChange={e => setName(e.target.value.slice(0, 50))} placeholder="Group name" maxLength={50} required style={inputStyle} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
        <span style={{ fontSize: 13, color: '#374151', minWidth: 42 }}>{visibility === 'public' ? 'Public' : 'Private'}</span>
        <button type="button" role="switch" aria-checked={visibility === 'private'}
          onClick={() => setVisibility(v => v === 'public' ? 'private' : 'public')}
          style={{
            position: 'relative', width: 44, height: 24, borderRadius: 12,
            background: visibility === 'private' ? '#646cff' : '#d1d5db',
            border: 'none', cursor: 'pointer', padding: 0, transition: 'background 200ms ease', flexShrink: 0,
          }}>
          <span style={{
            position: 'absolute', top: 3, left: visibility === 'private' ? 23 : 3,
            width: 18, height: 18, borderRadius: '50%', background: '#fff',
            transition: 'left 200ms ease', boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
          }} />
        </button>
        <span style={{ fontSize: 12, color: '#94a3b8' }}>{visibility === 'public' ? 'Visible to everyone' : 'Invite only'}</span>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <button type="submit" disabled={!name.trim() || loading} style={{
          flex: 1, height: 36,
          background: !name.trim() || loading ? '#f1f5f9' : '#646cff',
          color: !name.trim() || loading ? '#9ca3af' : '#ffffff',
          border: !name.trim() || loading ? '1px solid #e2e8f0' : 'none',
          borderRadius: 8, fontSize: 14, fontWeight: 600,
          cursor: !name.trim() || loading ? 'default' : 'pointer', fontFamily: 'system-ui, -apple-system, sans-serif',
        }}>
          {loading ? 'Creating…' : 'Create Group'}
        </button>
        <button type="button" onClick={onDiscard} style={{ fontSize: 14, color: '#64748b', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
          Cancel
        </button>
      </div>
      {formError && <div style={{ color: '#dc2626', fontSize: 13, marginTop: 6 }}>{formError}</div>}
    </form>
  );
}

function GroupCard({ group, currentUserId, isSelected, onSelect, onDelete }: {
  group: GroupItem; currentUserId: string | null; isSelected: boolean;
  onSelect: (groupId: string) => void; onDelete: (groupId: string) => Promise<void>;
}) {
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const isOwner = group.ownerId === currentUserId;

  return (
    <div style={{ display: 'flex', alignItems: 'center', height: 56, borderBottom: '1px solid #f1f5f9', cursor: 'pointer' }} onClick={() => onSelect(group.groupId)}>
      <div style={{ flex: 1, minWidth: 0, paddingRight: 8 }}>
        <div style={{ fontSize: 16, color: '#0f172a', fontWeight: isSelected ? 600 : 400 }}>{group.name}</div>
        {group.description && <div style={{ fontSize: 14, color: '#64748b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{group.description}</div>}
      </div>
      <span style={{ fontSize: 12, padding: '2px 8px', borderRadius: 4, background: group.visibility === 'public' ? '#f0fdf4' : '#f1f5f9', color: group.visibility === 'public' ? '#16a34a' : '#64748b', flexShrink: 0, marginRight: 8 }}>
        {group.visibility}
      </span>
      {isOwner && (
        <div style={{ flexShrink: 0 }} onClick={e => e.stopPropagation()}>
          {confirmDeleteId === group.groupId ? (
            <div role="group" aria-label="Confirm delete group" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <button onClick={() => setConfirmDeleteId(null)} style={{ fontSize: 12, color: '#64748b', background: 'none', border: '1px solid #e2e8f0', borderRadius: 6, padding: '2px 8px', cursor: 'pointer', fontFamily: 'system-ui, -apple-system, sans-serif' }}>Cancel</button>
              <button onClick={() => { void onDelete(group.groupId); setConfirmDeleteId(null); }} style={{ fontSize: 12, color: '#ffffff', background: '#dc2626', border: 'none', borderRadius: 6, padding: '2px 8px', cursor: 'pointer', fontFamily: 'system-ui, -apple-system, sans-serif' }}>Delete</button>
            </div>
          ) : (
            <button onClick={() => setConfirmDeleteId(group.groupId)} style={{ fontSize: 12, color: '#dc2626', background: 'none', border: 'none', cursor: 'pointer', padding: '4px 8px', fontFamily: 'system-ui, -apple-system, sans-serif' }} aria-label={`Delete group ${group.name}`}>Delete</button>
          )}
        </div>
      )}
    </div>
  );
}

function InviteForm({ groupId, onInvite }: { groupId: string; onInvite: (groupId: string, userId: string) => Promise<void> }) {
  const [userId, setUserId] = useState('');
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); if (!userId.trim()) return; void onInvite(groupId, userId.trim()); setUserId(''); };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 8, marginTop: 8 }}>
      <input value={userId} onChange={e => setUserId(e.target.value)} placeholder="User ID to invite" style={{ flex: 1, border: '1px solid #d1d5db', borderRadius: 6, padding: '6px 10px', fontSize: 14, fontFamily: 'system-ui, -apple-system, sans-serif', background: '#f9fafb', color: '#0f172a' }} />
      <button type="submit" disabled={!userId.trim()} style={{ height: 36, padding: '0 12px', background: !userId.trim() ? '#f1f5f9' : '#646cff', color: !userId.trim() ? '#9ca3af' : '#ffffff', border: !userId.trim() ? '1px solid #e2e8f0' : 'none', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: !userId.trim() ? 'default' : 'pointer', fontFamily: 'system-ui, -apple-system, sans-serif' }}>Invite</button>
    </form>
  );
}

function MemberList({ members }: { members: MemberItem[] }) {
  const roleBadgeStyle = (role: 'owner' | 'admin' | 'member'): React.CSSProperties => {
    if (role === 'owner') return { background: '#f0fdf4', color: '#16a34a', fontSize: 12, padding: '2px 8px', borderRadius: 4 };
    if (role === 'admin') return { background: '#eff6ff', color: '#3b82f6', fontSize: 12, padding: '2px 8px', borderRadius: 4 };
    return { background: '#f1f5f9', color: '#64748b', fontSize: 12, padding: '2px 8px', borderRadius: 4 };
  };

  return (
    <div style={{ maxHeight: 200, overflowY: 'auto', marginTop: 8, borderTop: '1px solid #e2e8f0' }}>
      {members.map(member => (
        <div key={member.userId} style={{ display: 'flex', alignItems: 'center', gap: 8, height: 48, borderBottom: '1px solid #f1f5f9' }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600, color: '#374151', flexShrink: 0 }}>
            {(member.displayName ?? member.userId).slice(0, 2).toUpperCase()}
          </div>
          <div style={{ flex: 1, fontSize: 16, color: '#0f172a' }}>{member.displayName ?? member.userId}</div>
          <span style={roleBadgeStyle(member.role)}>{member.role}</span>
        </div>
      ))}
    </div>
  );
}

function GroupRoomList({ rooms, groupId, selectedGroupRole, createGroupRoom, onRoomSelect, loading }: {
  rooms: RoomItem[]; groupId: string; selectedGroupRole: string;
  createGroupRoom: (groupId: string, name: string) => Promise<void>;
  onRoomSelect?: (room: RoomItem) => void; loading: boolean;
}) {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [roomName, setRoomName] = useState('');
  const groupRooms = rooms.filter(r => r.groupId === groupId);

  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomName.trim()) return;
    await createGroupRoom(groupId, roomName.trim());
    setRoomName('');
    setShowCreateForm(false);
  };

  return (
    <div style={{ marginTop: 12 }}>
      <h3 style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748b', margin: '0 0 8px 0' }}>GROUP ROOMS</h3>
      {(selectedGroupRole === 'owner' || selectedGroupRole === 'admin') && (
        showCreateForm ? (
          <form onSubmit={handleCreateRoom} style={{ marginBottom: 8, padding: '12px', background: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', gap: 8 }}>
              <input value={roomName} onChange={e => setRoomName(e.target.value.slice(0, 50))} placeholder="Room name" maxLength={50} required style={{ flex: 1, border: '1px solid #d1d5db', borderRadius: 6, padding: '6px 10px', fontSize: 14, fontFamily: 'system-ui, -apple-system, sans-serif', background: '#f9fafb', color: '#0f172a' }} />
              <button type="submit" disabled={!roomName.trim() || loading} style={{ height: 36, padding: '0 12px', background: !roomName.trim() || loading ? '#f1f5f9' : '#646cff', color: !roomName.trim() || loading ? '#9ca3af' : '#ffffff', border: !roomName.trim() || loading ? '1px solid #e2e8f0' : 'none', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: !roomName.trim() || loading ? 'default' : 'pointer', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                {loading ? 'Creating…' : 'Create Room'}
              </button>
              <button type="button" onClick={() => setShowCreateForm(false)} style={{ fontSize: 14, color: '#64748b', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'system-ui, -apple-system, sans-serif' }}>Cancel</button>
            </div>
          </form>
        ) : (
          <button onClick={() => setShowCreateForm(true)} style={{ width: '100%', height: 36, marginBottom: 8, background: '#646cff', color: '#ffffff', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'system-ui, -apple-system, sans-serif' }}>Create Room</button>
        )
      )}
      {groupRooms.length === 0 ? (
        <div style={{ fontSize: 14, color: '#9ca3af', padding: '8px 0' }}>No rooms in this group yet.</div>
      ) : (
        groupRooms.map(room => (
          <div key={room.roomId} onClick={() => onRoomSelect?.(room)} style={{ display: 'flex', alignItems: 'center', height: 48, borderBottom: '1px solid #f1f5f9', cursor: 'pointer', paddingRight: 8 }}>
            <div style={{ flex: 1, fontSize: 16, color: '#0f172a' }}>{room.name}</div>
            <span style={{ background: '#eff6ff', color: '#3b82f6', fontSize: 12, padding: '2px 8px', borderRadius: 4 }}>group</span>
          </div>
        ))
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// GroupPanel (exported)
// ---------------------------------------------------------------------------

export function GroupPanel({ idToken, rooms, createGroupRoom, onRoomSelect, roomsLoading, compact }: GroupPanelProps) {
  const {
    groups,
    createGroup,
    deleteGroup,
    inviteUser,
    loadMembers,
    members,
    loading,
  } = useGroups({ idToken });

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);

  const currentUserId: string | null = idToken
    ? (() => { try { return (JSON.parse(atob(idToken.split('.')[1])) as { sub: string }).sub; } catch { return null; } })()
    : null;

  const handleCreateGroup = async (name: string, description?: string, visibility?: 'public' | 'private') => {
    await createGroup(name, description, visibility);
    setShowCreateForm(false);
  };

  const handleSelectGroup = (groupId: string) => {
    if (selectedGroupId === groupId) {
      setSelectedGroupId(null);
    } else {
      setSelectedGroupId(groupId);
      void loadMembers(groupId);
    }
  };

  // ---- Compact mode (sidebar) ----
  if (compact) {
    const selectedGroup = selectedGroupId ? groups.find(g => g.groupId === selectedGroupId) : null;

    return (
      <div style={{ padding: '8px 8px 0' }}>
        <button
          onClick={() => setShowCreateForm(prev => !prev)}
          style={{
            width: '100%', textAlign: 'left', padding: '5px 8px',
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: 12, color: '#646cff', fontWeight: 600,
            fontFamily: 'system-ui, -apple-system, sans-serif', borderRadius: 4,
          }}
        >
          + New Group
        </button>
        {showCreateForm && (
          <CompactCreateGroupForm
            onCreate={handleCreateGroup}
            onDiscard={() => setShowCreateForm(false)}
            loading={loading}
          />
        )}
        <div>
          {loading && groups.length === 0 ? (
            <div style={{ padding: '8px', color: '#94a3b8', fontSize: 12, textAlign: 'center' }}>Loading…</div>
          ) : groups.length === 0 ? (
            <div style={{ padding: '12px 8px', color: '#94a3b8', fontSize: 12 }}>No groups yet</div>
          ) : (
            groups.map(group => (
              <CompactGroupRow
                key={group.groupId}
                group={group}
                isSelected={group.groupId === selectedGroupId}
                onClick={() => handleSelectGroup(group.groupId)}
              />
            ))
          )}
        </div>
        {selectedGroup && (
          <CompactGroupDetail
            group={selectedGroup}
            members={members}
            rooms={rooms}
            groupId={selectedGroup.groupId}
            currentUserId={currentUserId}
            createGroupRoom={createGroupRoom}
            onRoomSelect={onRoomSelect}
            inviteUser={inviteUser}
            loading={roomsLoading}
          />
        )}
      </div>
    );
  }

  // ---- Full-size mode (standalone card) ----
  const selectedGroup = selectedGroupId ? groups.find(g => g.groupId === selectedGroupId) : null;
  const selectedGroupRole: string = selectedGroup && currentUserId
    ? (selectedGroup.ownerId === currentUserId ? 'owner' : 'member')
    : 'member';

  return (
    <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 8, padding: '1.25rem' }}>
      <h2 style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748b', margin: '0 0 0.75rem 0' }}>Groups</h2>

      <div style={{ maxHeight: 320, overflowY: 'auto', marginBottom: 12 }}>
        {groups.length === 0 ? (
          <div style={{ padding: '16px 0', textAlign: 'center' }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#374151', marginBottom: 4 }}>No groups yet</div>
            <div style={{ fontSize: 14, color: '#9ca3af' }}>Create a group or join a public one.</div>
          </div>
        ) : (
          groups.map(group => (
            <GroupCard key={group.groupId} group={group} currentUserId={currentUserId} isSelected={selectedGroupId === group.groupId} onSelect={handleSelectGroup} onDelete={deleteGroup} />
          ))
        )}
      </div>

      {selectedGroupId && (
        <div style={{ marginBottom: 12 }}>
          <MemberList members={members} />
          {(selectedGroupRole === 'owner' || selectedGroupRole === 'admin') && (
            <InviteForm groupId={selectedGroupId} onInvite={inviteUser} />
          )}
          <GroupRoomList rooms={rooms} groupId={selectedGroupId} selectedGroupRole={selectedGroupRole} createGroupRoom={createGroupRoom} onRoomSelect={onRoomSelect} loading={roomsLoading} />
        </div>
      )}

      <button
        onClick={() => setShowCreateForm(prev => !prev)}
        style={{ width: '100%', height: 36, marginBottom: showCreateForm ? 8 : 0, background: '#646cff', color: '#ffffff', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'system-ui, -apple-system, sans-serif' }}
      >
        {showCreateForm ? 'Cancel' : 'Create Group'}
      </button>
      {showCreateForm && <CreateGroupForm onCreate={handleCreateGroup} onDiscard={() => setShowCreateForm(false)} loading={loading} />}
    </div>
  );
}
