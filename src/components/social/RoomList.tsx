// frontend/src/components/RoomList.tsx
//
// Room list section card — all sub-components co-located as unexported internals.
// Only RoomList is exported. Rooms state is owned by AppLayout (single useRooms instance).

import { useState } from 'react';
import type { RoomItem } from '../../hooks/useRooms';
import { useFriends } from '../../hooks/useFriends';
import type { PublicProfile } from '../../hooks/useFriends';
import { cn } from '../../lib/cn';
import { Input } from '../forms/Input';
import { Select } from '../forms/Select';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface RoomListProps {
  idToken: string | null;
  rooms: RoomItem[];
  createRoom: (name: string) => Promise<void>;
  createDM: (peerId: string) => Promise<void>;
  loading: boolean;
  /** Inline-render an error + retry control instead of the empty state when set. */
  error?: string | null;
  onRetry?: () => void;
  onRoomSelect: (room: RoomItem) => void;
  activeRoomId?: string | null;
  compact?: boolean;
}

// ---------------------------------------------------------------------------
// CreateRoomForm (internal)
// ---------------------------------------------------------------------------

interface CreateRoomFormProps {
  onCreate: (name: string) => Promise<void>;
  onDiscard: () => void;
  loading: boolean;
}

function CreateRoomForm({ onCreate, onDiscard, loading }: CreateRoomFormProps) {
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
      setFormError(err instanceof Error ? err.message : 'Failed to create room');
    }
  };

  return (
    <form onSubmit={(e) => { void handleSubmit(e); }} className="my-1 mb-2 p-2 bg-surface-panel rounded-md border border-border">
      <Input
        size="sm"
        value={name}
        onChange={e => setName(e.target.value.slice(0, 50))}
        placeholder="Room name"
        maxLength={50}
        required
        autoFocus
        className="mb-1.5"
      />
      <div className="flex gap-1.5">
        <button
          type="submit"
          disabled={!name.trim() || loading}
          className={cn(
            'flex-1 h-7 border-none rounded-[5px] text-xs font-semibold font-[inherit]',
            !name.trim() || loading ? 'bg-border text-text-tertiary cursor-default' : 'bg-primary text-white cursor-pointer',
          )}
        >
          {loading ? 'Creating…' : 'Create'}
        </button>
        <button
          type="button"
          onClick={onDiscard}
          className="h-7 px-2 border border-border rounded-[5px] bg-surface text-text-secondary text-xs cursor-pointer font-[inherit]"
        >
          Cancel
        </button>
      </div>
      {formError && (
        <div className="text-danger text-[11px] mt-1">
          {formError}
        </div>
      )}
    </form>
  );
}

// ---------------------------------------------------------------------------
// DMRoomButton (internal)
// ---------------------------------------------------------------------------

interface DMRoomButtonProps {
  onCreateDM: (peerId: string) => Promise<void>;
  loading: boolean;
  friends: PublicProfile[];
}

function DMRoomButton({ onCreateDM, loading, friends }: DMRoomButtonProps) {
  const [peerId, setPeerId] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!peerId.trim()) return;
    setFormError(null);
    try {
      await onCreateDM(peerId.trim());
      setPeerId('');
      setShowForm(false);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Failed to open DM');
    }
  };

  if (!showForm) {
    return (
      <button
        onClick={() => setShowForm(true)}
        className="w-full text-left px-2 py-1 bg-transparent border-none cursor-pointer text-xs text-primary font-semibold font-[system-ui,-apple-system,sans-serif] rounded mb-1"
      >
        + New DM
      </button>
    );
  }

  return (
    <form onSubmit={(e) => { void handleSubmit(e); }} className="my-1 mb-2 p-2 bg-surface-panel rounded-md border border-border">
      <Select
        size="sm"
        value={peerId}
        onChange={e => setPeerId(e.target.value)}
        disabled={friends.length === 0}
        className="mb-1.5"
        options={[
          { value: '', label: friends.length === 0 ? 'No mutual friends yet' : 'Select a friend…' },
          ...friends.map(f => ({ value: f.userId, label: f.displayName })),
        ]}
      />
      <div className="flex gap-1.5">
        <button
          type="submit"
          disabled={!peerId.trim() || loading || friends.length === 0}
          className={cn(
            'flex-1 h-7 border-none rounded-[5px] text-xs font-semibold font-[inherit]',
            !peerId.trim() || loading ? 'bg-border text-text-tertiary cursor-default' : 'bg-primary text-white cursor-pointer',
          )}
        >
          Open DM
        </button>
        <button
          type="button"
          onClick={() => setShowForm(false)}
          className="h-7 px-2 border border-border rounded-[5px] bg-surface text-text-secondary text-xs cursor-pointer font-[inherit]"
        >
          Cancel
        </button>
      </div>
      {formError && (
        <div className="text-danger text-[11px] mt-1">
          {formError}
        </div>
      )}
    </form>
  );
}

// ---------------------------------------------------------------------------
// RoomRow (internal — named RoomRow to avoid conflict with RoomItem type)
// ---------------------------------------------------------------------------

interface RoomRowProps {
  room: RoomItem;
  isActive: boolean;
  onClick: () => void;
}

function RoomRow({ room, isActive, onClick }: RoomRowProps) {
  const typeBadgeClass = (type: RoomItem['type']) => {
    if (type === 'standalone') return 'bg-accent-bg text-primary text-xs px-2 py-0.5 rounded';
    if (type === 'group') return 'bg-info-bg text-info text-xs px-2 py-0.5 rounded';
    return 'bg-success-bg text-success text-xs px-2 py-0.5 rounded';
  };

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isActive}
      className={cn(
        'flex items-center h-14 border-b border-surface-hover cursor-pointer pr-2',
        'w-full text-left font-[inherit]',
        isActive ? 'bg-surface-hover border-l-[3px] border-l-primary pl-[13px]' : 'bg-transparent border-l-[3px] border-l-transparent',
      )}
    >
      <div className={cn('flex-1 text-base text-text-primary', isActive ? 'font-semibold' : 'font-normal')}>
        {room.name}
      </div>
      <span className={typeBadgeClass(room.type)}>{room.type}</span>
    </button>
  );
}

// ---------------------------------------------------------------------------
// CompactRoomRow (internal — sidebar style)
// ---------------------------------------------------------------------------

function CompactRoomRow({ room, isActive, onClick }: RoomRowProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center gap-1.5 w-full border-none rounded-[5px] px-2 py-1.5 cursor-pointer text-[13px] text-left font-[system-ui,-apple-system,sans-serif]',
        isActive ? 'bg-accent-bg text-accent-fg font-semibold' : 'bg-transparent text-text-primary font-normal',
      )}
    >
      <span className={cn('text-[13px] shrink-0', isActive ? 'text-primary' : 'text-text-tertiary')}>
        {room.type === 'dm' ? '●' : '#'}
      </span>
      <span className="overflow-hidden text-ellipsis whitespace-nowrap flex-1">
        {room.name}
      </span>
    </button>
  );
}

// ---------------------------------------------------------------------------
// RoomsErrorState (internal)
// ---------------------------------------------------------------------------

interface RoomsErrorStateProps {
  message: string;
  onRetry?: () => void;
  compact?: boolean;
}

function RoomsErrorState({ message, onRetry, compact }: RoomsErrorStateProps) {
  return (
    <div
      role="alert"
      className={cn(
        'text-center flex flex-col items-center gap-1.5',
        compact ? 'px-2 py-3' : 'px-4 py-6',
      )}
    >
      <div className={cn('font-semibold text-danger-fg', compact ? 'text-xs' : 'text-sm')}>
        Couldn't load rooms
      </div>
      <div className={cn('text-text-secondary', compact ? 'text-[11px]' : 'text-xs')}>{message}</div>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className={cn(
            'mt-1 font-medium text-info-fg bg-info-bg border border-info-border rounded cursor-pointer font-[system-ui,-apple-system,sans-serif]',
            compact ? 'px-2.5 py-0.5 text-[11px]' : 'px-3.5 py-1 text-xs',
          )}
        >
          Retry
        </button>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// RoomList (exported)
// ---------------------------------------------------------------------------

export function RoomList({ idToken, rooms, createRoom, createDM, loading, error, onRetry, onRoomSelect, activeRoomId, compact }: RoomListProps) {
  const { friends } = useFriends({ idToken });

  const [showCreateForm, setShowCreateForm] = useState(false);

  const handleCreateRoom = async (name: string) => {
    await createRoom(name);
    setShowCreateForm(false);
  };

  if (compact) {
    return (
      <div className="px-2 pt-2">
        {/* Compact "+ New Room" link */}
        <button
          onClick={() => setShowCreateForm(prev => !prev)}
          className="w-full text-left px-2 py-1 bg-transparent border-none cursor-pointer text-xs text-primary font-semibold font-[system-ui,-apple-system,sans-serif] rounded"
        >
          + New Room
        </button>
        {showCreateForm && (
          <CreateRoomForm
            onCreate={handleCreateRoom}
            onDiscard={() => setShowCreateForm(false)}
            loading={loading}
          />
        )}
        <DMRoomButton onCreateDM={createDM} loading={loading} friends={friends} />
        <div>
          {loading && rooms.length === 0 ? (
            <div className="p-2 text-text-tertiary text-xs text-center">Loading…</div>
          ) : error && rooms.length === 0 ? (
            <RoomsErrorState message={error} onRetry={onRetry} compact />
          ) : rooms.length === 0 ? (
            <div className="px-2 py-3 text-text-tertiary text-xs">No rooms yet</div>
          ) : (
            rooms.map(room => (
              <CompactRoomRow
                key={room.roomId}
                room={room}
                isActive={room.roomId === activeRoomId}
                onClick={() => onRoomSelect(room)}
              />
            ))
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface border border-border rounded-lg p-5">
      <h2 className="text-xs font-semibold uppercase tracking-wide text-text-secondary mb-3">Rooms</h2>
      <button
        onClick={() => setShowCreateForm(prev => !prev)}
        className="w-full h-9 mb-2 bg-primary text-white border-none rounded-lg text-sm font-semibold cursor-pointer font-[system-ui,-apple-system,sans-serif]"
      >
        Create Room
      </button>
      {showCreateForm && (
        <CreateRoomForm
          onCreate={handleCreateRoom}
          onDiscard={() => setShowCreateForm(false)}
          loading={loading}
        />
      )}
      <DMRoomButton onCreateDM={createDM} loading={loading} friends={friends} />
      <div className="max-h-80 overflow-y-auto">
        {loading && rooms.length === 0 ? (
          <div className="flex items-center gap-2 p-4 justify-center text-text-secondary">
            <span className="inline-block w-4 h-4 border-2 border-border border-t-primary rounded-full animate-spin" />
            Loading...
          </div>
        ) : error && rooms.length === 0 ? (
          <RoomsErrorState message={error} onRetry={onRetry} />
        ) : rooms.length === 0 ? (
          <div className="py-6 text-center">
            <div className="text-sm font-semibold text-text-primary mb-1">
              No rooms yet
            </div>
            <div className="text-sm text-text-tertiary">
              Create a room or ask to be added.
            </div>
          </div>
        ) : (
          rooms.map(room => (
            <RoomRow
              key={room.roomId}
              room={room}
              isActive={room.roomId === activeRoomId}
              onClick={() => onRoomSelect(room)}
            />
          ))
        )}
      </div>
    </div>
  );
}
