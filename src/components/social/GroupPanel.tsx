// frontend/src/components/GroupPanel.tsx
//
// Group management panel. Supports compact mode for narrow sidebar rendering.

import { useId, useState } from 'react';
import { useGroups } from '../../hooks/useGroups';
import type { GroupItem, MemberItem } from '../../hooks/useGroups';
import type { RoomItem } from '../../hooks/useRooms';
import { cn } from '../../lib/cn';
import { Input } from '../forms/Input';

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
      className={cn(
        'flex items-center gap-1.5 w-full border-none rounded-[5px] px-2 py-1.5 cursor-pointer text-[13px] text-left font-[system-ui,-apple-system,sans-serif]',
        isSelected ? 'bg-accent-bg text-accent-fg font-semibold' : 'bg-transparent text-text-primary font-normal',
      )}
    >
      <span className={cn('text-xs shrink-0', isSelected ? 'text-primary' : 'text-text-tertiary')}>
        {group.visibility === 'private' ? '🔒' : '👥'}
      </span>
      <span className="overflow-hidden text-ellipsis whitespace-nowrap flex-1">
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
    <form onSubmit={(e) => { void handleSubmit(e); }} className="p-2 bg-surface-panel rounded-md border border-border my-1 mb-2">
      <Input
        size="sm"
        value={name}
        onChange={e => setName(e.target.value.slice(0, 50))}
        placeholder="Group name"
        maxLength={50}
        required
        autoFocus
        className="mb-1.5"
      />
      <div className="flex gap-1.5">
        <button type="submit" disabled={!name.trim() || loading} className={cn(
          'flex-1 h-7 border-none rounded-[5px] text-xs font-semibold font-[inherit]',
          !name.trim() || loading ? 'bg-border text-text-tertiary cursor-default' : 'bg-primary text-on-primary cursor-pointer',
        )}>
          {loading ? 'Creating…' : 'Create'}
        </button>
        <button type="button" onClick={onDiscard} className="h-7 px-2 border border-border rounded-[5px] bg-surface text-text-secondary text-xs cursor-pointer font-[inherit]">
          Cancel
        </button>
      </div>
      {formError && (
        <div className="text-danger-fg text-[11px] mt-1">{formError}</div>
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
  const [inviteError, setInviteError] = useState<string | null>(null);
  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const [roomName, setRoomName] = useState('');
  const [roomError, setRoomError] = useState<string | null>(null);

  const isOwner = group.ownerId === currentUserId;
  const groupRooms = rooms.filter(r => r.groupId === groupId);

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteId.trim()) return;
    setInviteError(null);
    try {
      await inviteUser(groupId, inviteId.trim());
    } catch (err) {
      // Keep the typed id and the form open so the invite can be retried.
      setInviteError(err instanceof Error ? err.message : 'Failed to invite user');
      return;
    }
    setInviteId('');
    setShowInvite(false);
  };

  // Awaited with no `catch`: a rejected create surfaced as an unhandled
  // promise rejection and nothing else — the form sat there with the typed
  // name, indistinguishable from a click that never landed.
  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomName.trim()) return;
    setRoomError(null);
    try {
      await createGroupRoom(groupId, roomName.trim());
    } catch (err) {
      setRoomError(err instanceof Error ? err.message : 'Failed to create room');
      return;
    }
    setRoomName('');
    setShowCreateRoom(false);
  };

  return (
    <div className="px-2 pb-2 pt-1 border-t border-border mt-1">
      {/* Members count + invite */}
      <div className="flex items-center justify-between mb-1">
        <span className="text-[11px] text-text-secondary font-semibold uppercase tracking-wide">
          Members ({members.length})
        </span>
        {isOwner && (
          <button onClick={() => setShowInvite(v => !v)} className="text-[11px] text-primary bg-transparent border-none cursor-pointer font-[inherit]">
            + Invite
          </button>
        )}
      </div>

      {showInvite && (
        <form onSubmit={(e) => { void handleInvite(e); }} className="flex gap-1 mb-1.5">
          <Input
            size="sm"
            value={inviteId}
            onChange={e => setInviteId(e.target.value)}
            placeholder="User ID"
            className="flex-1"
          />
          <button type="submit" disabled={!inviteId.trim()} className={cn(
            'h-6 px-2 border-none rounded text-[11px] font-[inherit]',
            !inviteId.trim() ? 'bg-border text-text-tertiary cursor-default' : 'bg-primary text-on-primary cursor-pointer',
          )}>
            Invite
          </button>
        </form>
      )}
      {showInvite && inviteError && (
        <div role="alert" data-testid="compact-invite-error" className="text-danger-fg text-[11px] mb-1.5">
          {inviteError}
        </div>
      )}

      {/* Member avatars row */}
      <div className="flex flex-wrap gap-1 mb-2">
        {members.slice(0, 8).map(m => (
          <div key={m.userId} title={m.displayName ?? m.userId} className="w-6 h-6 rounded-full bg-border flex items-center justify-center text-[10px] font-semibold text-text-primary">
            {(m.displayName ?? m.userId).slice(0, 2).toUpperCase()}
          </div>
        ))}
        {members.length > 8 && (
          <span className="text-[11px] text-text-tertiary self-center">+{members.length - 8}</span>
        )}
      </div>

      {/* Group rooms */}
      <div className="flex items-center justify-between mb-1">
        <span className="text-[11px] text-text-secondary font-semibold uppercase tracking-wide">
          Rooms ({groupRooms.length})
        </span>
        {isOwner && (
          <button onClick={() => setShowCreateRoom(v => !v)} className="text-[11px] text-primary bg-transparent border-none cursor-pointer font-[inherit]">
            + Room
          </button>
        )}
      </div>

      {showCreateRoom && (
        <form onSubmit={(e) => { void handleCreateRoom(e); }} className="flex gap-1 mb-1.5">
          <Input
            size="sm"
            value={roomName}
            onChange={e => setRoomName(e.target.value.slice(0, 50))}
            placeholder="Room name"
            className="flex-1"
          />
          <button type="submit" disabled={!roomName.trim() || loading} className={cn(
            'h-6 px-2 border-none rounded text-[11px] font-[inherit]',
            !roomName.trim() || loading ? 'bg-border text-text-tertiary cursor-default' : 'bg-primary text-on-primary cursor-pointer',
          )}>
            Create
          </button>
        </form>
      )}
      {showCreateRoom && roomError && (
        <div role="alert" data-testid="compact-group-room-error" className="text-danger-fg text-[11px] mb-1.5">
          {roomError}
        </div>
      )}

      {/* The room name is worth listing either way, but `onRoomSelect` is
          optional and nothing else opens a room from here — as a <button>
          each row was a focus stop that swallowed the click. */}
      {groupRooms.map(room => {
        const Row = onRoomSelect ? 'button' : 'div';
        return (
          <Row
            key={room.roomId}
            type={onRoomSelect ? 'button' : undefined}
            onClick={onRoomSelect ? () => onRoomSelect(room) : undefined}
            className={cn(
              'flex items-center gap-1.5 w-full border-none rounded-[5px] px-2 py-1 bg-transparent text-text-primary text-[13px] text-left font-[inherit]',
              onRoomSelect && 'cursor-pointer',
            )}
          >
            <span className="text-text-tertiary text-xs">#</span>
            <span className="overflow-hidden text-ellipsis whitespace-nowrap">{room.name}</span>
          </Row>
        );
      })}
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
  const uid = useId();

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
    <form onSubmit={(e) => { void handleSubmit(e); }} className="mb-3 p-3 bg-surface-panel rounded-lg border border-border">
      {/* Detached <label>, no htmlFor: the name box announced unnamed, and the
          create failure below was rendered as plain text that nothing pointed
          at and nothing announced. */}
      <div className="mb-3">
        <label htmlFor={`${uid}-group-name`} className="text-sm text-text-primary block mb-1">Group name</label>
        <Input
          id={`${uid}-group-name`}
          aria-describedby={formError ? `${uid}-form-error` : undefined}
          aria-invalid={formError ? true : undefined}
          value={name}
          onChange={e => setName(e.target.value.slice(0, 50))}
          placeholder="Group name"
          maxLength={50}
          required
        />
      </div>
      <div className="flex items-center gap-2.5 mb-3.5">
        <span className="text-[13px] text-text-primary min-w-[42px]">{visibility === 'public' ? 'Public' : 'Private'}</span>
        {/* The switch had no name at all — the text either side of it is the
            current state and the consequence, not what the control is. */}
        <button type="button" role="switch" aria-label="Private group" aria-checked={visibility === 'private'}
          onClick={() => setVisibility(v => v === 'public' ? 'private' : 'public')}
          className={cn(
            'relative w-11 h-6 rounded-xl border-none cursor-pointer p-0 shrink-0 transition-colors duration-200',
            visibility === 'private' ? 'bg-primary' : 'bg-state-idle',
          )}>
          {/* `bg-white` is DELIBERATE — see Switch.tsx: the knob rides a
              coloured track, so it must stay light in both themes. */}
          <span className={cn('absolute top-[3px] w-[18px] h-[18px] rounded-full bg-white shadow-sm transition-[left] duration-200', visibility === 'private' ? 'left-[23px]' : 'left-[3px]')} />
        </button>
        <span className="text-xs text-text-tertiary">{visibility === 'public' ? 'Visible to everyone' : 'Invite only'}</span>
      </div>
      <div className="flex gap-2">
        <button type="submit" disabled={!name.trim() || loading} className={cn(
          'flex-1 h-9 rounded-lg text-sm font-semibold font-[system-ui,-apple-system,sans-serif]',
          !name.trim() || loading ? 'bg-surface-hover text-text-tertiary border border-border cursor-default' : 'bg-primary text-on-primary border-none cursor-pointer',
        )}>
          {loading ? 'Creating…' : 'Create Group'}
        </button>
        <button type="button" onClick={onDiscard} className="text-sm text-text-secondary bg-transparent border-none cursor-pointer font-[system-ui,-apple-system,sans-serif]">
          Cancel
        </button>
      </div>
      {formError && <div id={`${uid}-form-error`} role="alert" className="text-danger-fg text-[13px] mt-1.5">{formError}</div>}
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
    <div
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      aria-label={`Select group ${group.name}`}
      className="flex items-center h-14 border-b border-surface-hover cursor-pointer"
      onClick={() => onSelect(group.groupId)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(group.groupId);
        }
      }}
    >
      <div className="flex-1 min-w-0 pr-2">
        <div className={cn('text-base text-text-primary', isSelected ? 'font-semibold' : 'font-normal')}>{group.name}</div>
        {group.description && <div className="text-sm text-text-secondary overflow-hidden text-ellipsis whitespace-nowrap">{group.description}</div>}
      </div>
      <span className={cn(
        'text-xs px-2 py-0.5 rounded shrink-0 mr-2',
        group.visibility === 'public' ? 'bg-success-bg text-success' : 'bg-surface-hover text-text-secondary',
      )}>
        {group.visibility}
      </span>
      {isOwner && (
        <div className="shrink-0" onClick={e => e.stopPropagation()}>
          {confirmDeleteId === group.groupId ? (
            <div role="group" aria-label="Confirm delete group" className="flex items-center gap-1">
              <button onClick={() => setConfirmDeleteId(null)} className="text-xs text-text-secondary bg-transparent border border-border rounded-md px-2 py-0.5 cursor-pointer font-[system-ui,-apple-system,sans-serif]">Cancel</button>
              <button onClick={() => { void onDelete(group.groupId); setConfirmDeleteId(null); }} className="text-xs text-white bg-danger border-none rounded-md px-2 py-0.5 cursor-pointer font-[system-ui,-apple-system,sans-serif]">Delete</button>
            </div>
          ) : (
            <button onClick={() => setConfirmDeleteId(group.groupId)} className="text-xs text-danger-fg bg-transparent border-none cursor-pointer px-2 py-1 font-[system-ui,-apple-system,sans-serif]" aria-label={`Delete group ${group.name}`}>Delete</button>
          )}
        </div>
      )}
    </div>
  );
}

function InviteForm({ groupId, onInvite }: { groupId: string; onInvite: (groupId: string, userId: string) => Promise<void> }) {
  const [userId, setUserId] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Fire-and-forget + unconditional `setUserId('')` used to make a rejected
  // invite look exactly like an accepted one: the field emptied either way.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId.trim()) return;
    setError(null);
    try {
      await onInvite(groupId, userId.trim());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to invite user');
      return;
    }
    setUserId('');
  };

  return (
    <>
      <form onSubmit={(e) => { void handleSubmit(e); }} className="flex gap-2 mt-2">
        <Input className="flex-1" value={userId} onChange={e => setUserId(e.target.value)} placeholder="User ID to invite" />
        <button type="submit" disabled={!userId.trim()} className={cn(
          'h-9 px-3 rounded-lg text-sm font-semibold font-[system-ui,-apple-system,sans-serif]',
          !userId.trim() ? 'bg-surface-hover text-text-tertiary border border-border cursor-default' : 'bg-primary text-on-primary border-none cursor-pointer',
        )}>Invite</button>
      </form>
      {error && (
        <div role="alert" data-testid="invite-error" className="text-danger-fg text-xs mt-1">{error}</div>
      )}
    </>
  );
}

function MemberList({ members }: { members: MemberItem[] }) {
  const roleBadgeClass = (role: 'owner' | 'admin' | 'member') => {
    if (role === 'owner') return 'bg-success-bg text-success text-xs px-2 py-0.5 rounded';
    if (role === 'admin') return 'bg-info-bg text-info text-xs px-2 py-0.5 rounded';
    return 'bg-surface-hover text-text-secondary text-xs px-2 py-0.5 rounded';
  };

  return (
    <div className="max-h-[200px] overflow-y-auto mt-2 border-t border-border">
      {members.map(member => (
        <div key={member.userId} className="flex items-center gap-2 h-12 border-b border-surface-hover">
          <div className="w-8 h-8 rounded-full bg-border flex items-center justify-center text-xs font-semibold text-text-primary shrink-0">
            {(member.displayName ?? member.userId).slice(0, 2).toUpperCase()}
          </div>
          <div className="flex-1 text-base text-text-primary">{member.displayName ?? member.userId}</div>
          <span className={roleBadgeClass(member.role)}>{member.role}</span>
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
  const [roomError, setRoomError] = useState<string | null>(null);
  const groupRooms = rooms.filter(r => r.groupId === groupId);

  // Same fire-and-forget shape the compact detail panel had — see the note
  // there. A failed create left no trace on screen.
  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomName.trim()) return;
    setRoomError(null);
    try {
      await createGroupRoom(groupId, roomName.trim());
    } catch (err) {
      setRoomError(err instanceof Error ? err.message : 'Failed to create room');
      return;
    }
    setRoomName('');
    setShowCreateForm(false);
  };

  return (
    <div className="mt-3">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-text-secondary mb-2">GROUP ROOMS</h3>
      {(selectedGroupRole === 'owner' || selectedGroupRole === 'admin') && (
        showCreateForm ? (
          <form onSubmit={(e) => { void handleCreateRoom(e); }} className="mb-2 p-3 bg-surface-panel rounded-lg border border-border">
            <div className="flex gap-2">
              <Input className="flex-1" value={roomName} onChange={e => setRoomName(e.target.value.slice(0, 50))} placeholder="Room name" maxLength={50} required />
              <button type="submit" disabled={!roomName.trim() || loading} className={cn(
                'h-9 px-3 rounded-lg text-sm font-semibold font-[system-ui,-apple-system,sans-serif]',
                !roomName.trim() || loading ? 'bg-surface-hover text-text-tertiary border border-border cursor-default' : 'bg-primary text-on-primary border-none cursor-pointer',
              )}>
                {loading ? 'Creating…' : 'Create Room'}
              </button>
              <button type="button" onClick={() => setShowCreateForm(false)} className="text-sm text-text-secondary bg-transparent border-none cursor-pointer font-[system-ui,-apple-system,sans-serif]">Cancel</button>
            </div>
            {roomError && (
              <div role="alert" data-testid="group-room-error" className="text-danger-fg text-[13px] mt-1.5">{roomError}</div>
            )}
          </form>
        ) : (
          <button onClick={() => setShowCreateForm(true)} className="w-full h-9 mb-2 bg-primary text-on-primary border-none rounded-lg text-sm font-semibold cursor-pointer font-[system-ui,-apple-system,sans-serif]">Create Room</button>
        )
      )}
      {groupRooms.length === 0 ? (
        <div className="text-sm text-text-tertiary py-2">No rooms in this group yet.</div>
      ) : (
        groupRooms.map(room => (
          <div
            key={room.roomId}
            // Same optional-handler shape as the compact list: without
            // `onRoomSelect` this announced itself as "Open room X", took a
            // tab stop, and opened nothing.
            role={onRoomSelect ? 'button' : undefined}
            tabIndex={onRoomSelect ? 0 : undefined}
            aria-label={onRoomSelect ? `Open room ${room.name}` : undefined}
            className={cn(
              'flex items-center h-12 border-b border-surface-hover pr-2',
              onRoomSelect && 'cursor-pointer',
            )}
            onClick={onRoomSelect ? () => onRoomSelect(room) : undefined}
            onKeyDown={
              onRoomSelect
                ? (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onRoomSelect(room);
                    }
                  }
                : undefined
            }
          >
            <div className="flex-1 text-base text-text-primary">{room.name}</div>
            <span className="bg-info-bg text-info text-xs px-2 py-0.5 rounded">group</span>
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
    loaded,
    loadError,
    refresh,
  } = useGroups({ idToken });

  // "No groups yet" is only true once the server has actually answered.
  const listPending = !loaded && !loadError;

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
      <div className="px-2 pt-2">
        <button
          onClick={() => setShowCreateForm(prev => !prev)}
          className="w-full text-left px-2 py-1 bg-transparent border-none cursor-pointer text-xs text-primary font-semibold font-[system-ui,-apple-system,sans-serif] rounded"
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
          {listPending && groups.length === 0 ? (
            <div role="status" className="p-2 text-text-tertiary text-xs text-center">Loading…</div>
          ) : loadError && groups.length === 0 ? (
            <div role="alert" data-testid="compact-groups-load-error" className="px-2 py-3 text-danger-fg text-xs">
              <div>Couldn&rsquo;t load groups.</div>
              <div className="text-text-tertiary mt-0.5">{loadError}</div>
              <button
                type="button"
                onClick={() => { void refresh(); }}
                className="mt-1 text-[11px] text-primary bg-transparent border-none cursor-pointer p-0 font-[inherit]"
              >
                Retry
              </button>
            </div>
          ) : groups.length === 0 ? (
            <div className="px-2 py-3 text-text-tertiary text-xs">No groups yet</div>
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
    <div className="bg-surface border border-border rounded-lg p-5">
      <h2 className="text-xs font-semibold uppercase tracking-wide text-text-secondary mb-3">Groups</h2>

      <div className="max-h-80 overflow-y-auto mb-3">
        {/* `useGroups` returns a load error and this panel used to drop it, so
            a failed load rendered as "No groups yet — Create a group or join a
            public one": an outage told to the user as a fact about their own
            memberships. There was no `loading` branch either, so that same
            copy flashed during every normal fetch. */}
        {listPending && groups.length === 0 ? (
          <div role="status" className="py-4 text-center text-sm text-text-tertiary">Loading groups…</div>
        ) : loadError && groups.length === 0 ? (
          <div role="alert" data-testid="groups-load-error" className="py-4 text-center">
            <div className="text-sm font-semibold text-danger-fg mb-1">Couldn&rsquo;t load groups</div>
            <div className="text-sm text-text-tertiary mb-2">{loadError}</div>
            <button
              type="button"
              onClick={() => { void refresh(); }}
              className="text-sm text-primary bg-transparent border border-border rounded-lg px-3 py-1 cursor-pointer font-[system-ui,-apple-system,sans-serif]"
            >
              Retry
            </button>
          </div>
        ) : groups.length === 0 ? (
          <div className="py-4 text-center">
            <div className="text-sm font-semibold text-text-primary mb-1">No groups yet</div>
            <div className="text-sm text-text-tertiary">Create a group or join a public one.</div>
          </div>
        ) : (
          groups.map(group => (
            <GroupCard key={group.groupId} group={group} currentUserId={currentUserId} isSelected={selectedGroupId === group.groupId} onSelect={handleSelectGroup} onDelete={deleteGroup} />
          ))
        )}
      </div>

      {selectedGroupId && (
        <div className="mb-3">
          <MemberList members={members} />
          {(selectedGroupRole === 'owner' || selectedGroupRole === 'admin') && (
            <InviteForm groupId={selectedGroupId} onInvite={inviteUser} />
          )}
          <GroupRoomList rooms={rooms} groupId={selectedGroupId} selectedGroupRole={selectedGroupRole} createGroupRoom={createGroupRoom} onRoomSelect={onRoomSelect} loading={roomsLoading} />
        </div>
      )}

      <button
        onClick={() => setShowCreateForm(prev => !prev)}
        className={cn('w-full h-9 bg-primary text-on-primary border-none rounded-lg text-sm font-semibold cursor-pointer font-[system-ui,-apple-system,sans-serif]', showCreateForm && 'mb-2')}
      >
        {showCreateForm ? 'Cancel' : 'Create Group'}
      </button>
      {showCreateForm && <CreateGroupForm onCreate={handleCreateGroup} onDiscard={() => setShowCreateForm(false)} loading={loading} />}
    </div>
  );
}
