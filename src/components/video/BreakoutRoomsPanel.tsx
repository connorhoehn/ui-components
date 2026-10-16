// BreakoutRoomsPanel — the Rooms pane. Participants see the room list (expand
// chevron for who is in a room, Open/Closed, Join); organizers also create
// rooms, place people, open and close them, rename and add rooms (also while
// they are open), run a timer, broadcast an announcement and end the session.
//
// Transport-agnostic: rooms and people are plain props and every action is a
// callback. `WrappedBreakoutRoomsPanel` (integrations/realtime-modules) binds
// it to realtime-modules' `useMeeting`.

import { useId, useState, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { InlineEditableText } from '../forms/InlineEditableText';
import { NumberInput } from '../forms/NumberInput';
import { Select } from '../forms/Select';
import { Textarea } from '../forms/Textarea';
import { Avatar } from '../shared/Avatar';
import { SegmentedControl } from '../shared/SegmentedControl';
import { StatusDot } from '../shared/StatusDot';
import { T } from '../shared/Text';
import { Button } from '../ui/Button';
import { ChevronIcon, CloseIcon } from '../ui/Icons';
import { IconButton } from '../ui/IconButton';
import { useCountdown } from './BreakoutRoomBanner';
import { formatCallElapsed } from './CallDock';
import { RaisedHandBadge } from './RaisedHandBadge';

export interface BreakoutPerson {
  id: string;
  name: string;
  avatarUrl?: string;
  /** `true` or the 1-based queue position. */
  handRaised?: boolean | number;
}

export interface BreakoutRoomView {
  id: string;
  name: string;
  state: 'open' | 'closed';
  members: BreakoutPerson[];
}

export type BreakoutPanelMode = 'assigned' | 'self-select';
export type BreakoutPanelPhase = 'none' | 'draft' | 'open';

export interface BreakoutRoomsPanelProps {
  rooms: BreakoutRoomView[];
  phase: BreakoutPanelPhase;
  mode: BreakoutPanelMode;
  /** The open room you are in, or null for the main meeting. */
  myRoomId?: string | null;
  isOrganizer?: boolean;
  /** Organizer view: people in the meeting placed in no room. */
  unassigned?: BreakoutPerson[];
  /** ISO end of the timer. */
  endsAt?: string | null;
  /** Server clock minus this device's, ms (`useMeeting().clockOffsetMs`). Default 0. Since 2.469.0. */
  clockOffsetMs?: number;
  /**
   * Rooms are in the closing grace (2.461.0; realtime-modules 0.124
   * `breakout.closing`): `endsAt` is the deadline. Organizers get Close now
   * (`onCloseRooms()` again) and Keep rooms open (`onOpenRooms()`); Join is
   * hidden for everyone.
   */
  closing?: boolean;
  /** Participants may leave a room for the main meeting. Default true. */
  allowReturnToMain?: boolean;

  onJoin?: (roomId: string) => void;
  onReturnToMain?: () => void;

  // organizer
  onCreateRooms?: (count: number, mode: BreakoutPanelMode) => void;
  onAutoAssign?: () => void;
  onAssign?: (userId: string, roomId: string | null) => void;
  onOpenRooms?: (roomIds?: string[]) => void;
  onCloseRooms?: (roomIds?: string[]) => void;
  onSetTimer?: (durationMs: number | null) => void;
  onBroadcast?: (message: string) => void;
  /**
   * Where organizers write announcements (2.466.0). `chat` (default): the
   * meeting chat, through `useMeetingChat`'s "To: All rooms"; the pane only
   * points there. `pane`: the old announcement box in this pane, kept for
   * hosts without a meeting chat. Before 2.466.0 the box always showed when
   * `onBroadcast` was set.
   */
  announceIn?: 'chat' | 'pane';
  onEnd?: () => void;
  /**
   * Discard the drafted rooms so they can be created again (2.458.1). Shown
   * only while rooms are closed; open rooms must be ended first.
   */
  onDeleteRooms?: () => void;
  /**
   * Rename a room (2.459.0). Organizers then click a room's name to edit it
   * in place, in any phase; Enter or blur commits, Escape cancels.
   */
  onRenameRoom?: (roomId: string, name: string) => void;
  /** Add one room (2.459.0), in draft or while rooms are open. It starts closed. */
  onAddRoom?: () => void;
  /** The server's room cap; Add room is disabled at it. Default 50. */
  maxRooms?: number;

  /** The header ✕. Omitted: no close button. */
  onClose?: () => void;
  title?: string;
  /** Rendered under the header — an error notice, say. */
  notice?: ReactNode;
  /** Minute choices for the timer. Default 5, 10, 15, 30, 60. */
  timerMinutes?: number[];
  className?: string;
  'data-testid'?: string;
}

const DEFAULT_TIMER_MINUTES = [5, 10, 15, 30, 60];
const DEFAULT_MAX_ROOMS = 50;
/** realtime-modules' MAX_ROOM_NAME_LENGTH. */
const MAX_ROOM_NAME_LENGTH = 80;

function RoomRow({
  room, mine, canJoin, canReturn, isOrganizer, rooms, onJoin, onReturnToMain, onAssign, onToggleRoom, onRenameRoom,
}: {
  room: BreakoutRoomView;
  mine: boolean;
  canJoin: boolean;
  canReturn: boolean;
  isOrganizer: boolean;
  rooms: BreakoutRoomView[];
  onJoin?: (roomId: string) => void;
  onReturnToMain?: () => void;
  onAssign?: (userId: string, roomId: string | null) => void;
  onToggleRoom?: (roomId: string, next: 'open' | 'closed') => void;
  onRenameRoom?: (roomId: string, name: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const bodyId = useId();
  const open = room.state === 'open';
  return (
    <li className="border-b border-border-subtle last:border-b-0" data-testid="breakout-room" data-room-id={room.id} data-room-state={room.state} data-mine={mine ? 'true' : undefined}>
      <div className="flex items-center gap-2 px-3 py-3">
        <IconButton
          aria-label={expanded ? `Hide people in ${room.name}` : `Show people in ${room.name}`}
          aria-expanded={expanded}
          aria-controls={bodyId}
          variant="ghost"
          size="sm"
          onClick={() => setExpanded((v) => !v)}
          data-testid="breakout-room-expand"
        >
          <ChevronIcon size={14} dir={expanded ? 'down' : 'right'} />
        </IconButton>
        <div className="flex min-w-0 flex-1 flex-col">
          {isOrganizer && onRenameRoom ? (
            <InlineEditableText
              value={room.name}
              onCommit={(name) => onRenameRoom(room.id, name)}
              label="Room name"
              maxLength={MAX_ROOM_NAME_LENGTH}
              required
              className="-ml-1 self-start"
              data-testid="breakout-room-name"
            />
          ) : (
            <T size="base" tone="primary" className="truncate" title={room.name}>{room.name}</T>
          )}
          {/* The state is carried by the dot's colour and the word; the word is
              secondary text, because success-green text is 3.3:1 on white (2.473.0). */}
          <T size="sm" tone="secondary" className="items-center gap-1.5" data-testid="breakout-room-status">
            <StatusDot size="sm" color={open ? 'var(--color-success)' : undefined} />
            {open ? 'Open' : 'Closed'}
            {room.members.length > 0 && <span>· {room.members.length}</span>}
          </T>
        </div>
        {isOrganizer && onToggleRoom && (
          <Button variant="ghost" size="sm" onClick={() => onToggleRoom(room.id, open ? 'closed' : 'open')} data-testid="breakout-room-toggle">
            {open ? 'Close' : 'Open'}
          </Button>
        )}
        {mine && canReturn && onReturnToMain && (
          <Button variant="secondary" size="sm" onClick={onReturnToMain} data-testid="breakout-room-leave">Leave</Button>
        )}
        {mine && !canReturn && <T size="sm" tone="secondary" data-testid="breakout-room-here">You're here</T>}
        {!mine && canJoin && onJoin && (
          <Button variant="secondary" size="sm" onClick={() => onJoin(room.id)} data-testid="breakout-room-join">Join</Button>
        )}
      </div>
      {expanded && (
        <ul id={bodyId} className="flex flex-col gap-1 pb-3 pl-12 pr-3" data-testid="breakout-room-members">
          {room.members.length === 0 && <li><T size="sm" tone="tertiary">Nobody yet</T></li>}
          {room.members.map((p) => (
            <li key={p.id} className="flex items-center gap-2" data-testid="breakout-member" data-user-id={p.id}>
              <Avatar name={p.name} src={p.avatarUrl} size={24} />
              <T size="sm" className="min-w-0 flex-1 truncate">{p.name}</T>
              <RaisedHandBadge raised={p.handRaised} />
              {isOrganizer && onAssign && (
                <MoveSelect person={p} rooms={rooms} current={room.id} onAssign={onAssign} />
              )}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

function MoveSelect({ person, rooms, current, onAssign }: {
  person: BreakoutPerson; rooms: BreakoutRoomView[]; current: string | null; onAssign: (userId: string, roomId: string | null) => void;
}) {
  return (
    <Select
      size="sm"
      aria-label={`Move ${person.name}`}
      value={current ?? ''}
      onChange={(e) => onAssign(person.id, e.target.value || null)}
      options={[{ value: '', label: 'Main meeting' }, ...rooms.map((r) => ({ value: r.id, label: r.name }))]}
      wrapperClassName="w-36 shrink-0"
      data-testid="breakout-move"
    />
  );
}

function CreateRooms({ onCreateRooms }: { onCreateRooms: (count: number, mode: BreakoutPanelMode) => void }) {
  const [count, setCount] = useState(3);
  const [mode, setMode] = useState<BreakoutPanelMode>('assigned');
  return (
    <div className="flex flex-col gap-3 border-b border-border px-4 py-4" data-testid="breakout-create">
      <T size="sm" tone="secondary" className="block">Split the meeting into smaller rooms.</T>
      <label className="flex items-center justify-between gap-3">
        <T size="sm">Rooms</T>
        <NumberInput value={count} onChange={setCount} min={1} max={50} size="sm" aria-label="Number of rooms" data-testid="breakout-create-count" />
      </label>
      <SegmentedControl
        aria-label="How people get into rooms"
        size="sm"
        fullWidth
        value={mode}
        onChange={(v) => setMode(v as BreakoutPanelMode)}
        options={[{ value: 'assigned', label: 'I assign people' }, { value: 'self-select', label: 'People choose' }]}
        data-testid="breakout-create-mode"
      />
      <Button variant="primary" size="sm" onClick={() => onCreateRooms(Math.max(1, Math.min(50, Math.round(count || 1))), mode)} data-testid="breakout-create-submit">
        Create rooms
      </Button>
    </div>
  );
}

function OrganizerControls(props: BreakoutRoomsPanelProps & { left: number | null }) {
  const {
    phase, mode, rooms, onOpenRooms, onCloseRooms, onAutoAssign, onSetTimer, onBroadcast, announceIn = 'chat', onEnd, onDeleteRooms, onAddRoom,
    left, timerMinutes = DEFAULT_TIMER_MINUTES, maxRooms = DEFAULT_MAX_ROOMS, closing = false,
  } = props;
  const [message, setMessage] = useState('');
  const anyOpen = rooms.some((r) => r.state === 'open');
  const send = () => {
    const text = message.trim();
    if (!text || !onBroadcast) return;
    onBroadcast(text);
    setMessage('');
  };
  return (
    <div className="flex flex-col gap-3 border-b border-border px-4 py-3" data-testid="breakout-controls">
      <div className="flex flex-wrap items-center gap-2">
        {closing && anyOpen ? (
          <>
            {onCloseRooms && <Button variant="danger" size="sm" onClick={() => onCloseRooms()} data-testid="breakout-close-now">Close now</Button>}
            {onOpenRooms && <Button variant="secondary" size="sm" onClick={() => onOpenRooms()} data-testid="breakout-keep-open">Keep rooms open</Button>}
          </>
        ) : anyOpen
          ? onCloseRooms && <Button variant="secondary" size="sm" onClick={() => onCloseRooms()} data-testid="breakout-close-all">Close rooms</Button>
          : onOpenRooms && <Button variant="primary" size="sm" onClick={() => onOpenRooms()} data-testid="breakout-open-all">Open rooms</Button>}
        {onAddRoom && (
          <Button
            variant="secondary"
            size="sm"
            onClick={onAddRoom}
            disabled={rooms.length >= maxRooms}
            title={rooms.length >= maxRooms ? `At most ${maxRooms} rooms` : undefined}
            data-testid="breakout-add-room"
          >
            Add room
          </Button>
        )}
        {mode === 'assigned' && onAutoAssign && (
          <Button variant="secondary" size="sm" onClick={onAutoAssign} data-testid="breakout-auto-assign">Assign automatically</Button>
        )}
        {onEnd && phase === 'open' && !closing && (
          <Button variant="ghost" size="sm" onClick={onEnd} className="text-danger" data-testid="breakout-end">End breakout rooms</Button>
        )}
        {onDeleteRooms && phase === 'draft' && (
          <Button variant="ghost" size="sm" onClick={onDeleteRooms} className="text-danger" data-testid="breakout-delete">Delete rooms</Button>
        )}
      </div>
      {onSetTimer && (
        <div className="flex items-center justify-between gap-3">
          <T size="sm">Timer</T>
          <div className="flex items-center gap-2">
            {left !== null && (
              <T size="sm" tone={closing ? 'inherit' : 'secondary'} tabular className={cn(closing && 'font-semibold text-danger')} data-testid="breakout-timer-left">
                {closing ? `Closing in ${formatCallElapsed(left)}` : `${formatCallElapsed(left)} left`}
              </T>
            )}
            <Select
              size="sm"
              aria-label="Breakout timer"
              disabled={phase !== 'open'}
              value={left !== null ? 'running' : ''}
              onChange={(e) => {
                const v = e.target.value;
                if (v === 'running') return;
                onSetTimer(v ? Number(v) * 60_000 : null);
              }}
              options={[
                { value: '', label: 'No timer' },
                ...(left !== null ? [{ value: 'running', label: 'Running' }] : []),
                ...timerMinutes.map((m) => ({ value: String(m), label: `${m} min` })),
              ]}
              wrapperClassName="w-32"
              data-testid="breakout-timer"
            />
          </div>
        </div>
      )}
      {onBroadcast && phase === 'open' && announceIn === 'chat' && (
        <T as="p" size="xs" tone="tertiary" data-testid="breakout-announce-hint">
          Send announcements to every room from the meeting chat.
        </T>
      )}
      {onBroadcast && phase === 'open' && announceIn === 'pane' && (
        <div className="flex items-end gap-2">
          <Textarea
            aria-label="Announcement to every room"
            placeholder="Send an announcement to every room"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) { e.preventDefault(); send(); } }}
            minRows={1}
            maxRows={4}
            autoResize
            maxLength={500}
            className="flex-1"
            data-testid="breakout-broadcast-input"
          />
          <Button variant="secondary" size="sm" onClick={send} disabled={!message.trim()} data-testid="breakout-broadcast-send">Send</Button>
        </div>
      )}
    </div>
  );
}

export function BreakoutRoomsPanel(props: BreakoutRoomsPanelProps) {
  const {
    rooms, phase, mode, myRoomId = null, isOrganizer = false, unassigned = [], endsAt = null, allowReturnToMain = true, closing = false,
    onJoin, onReturnToMain, onCreateRooms, onAssign, onOpenRooms, onCloseRooms, onRenameRoom, onClose,
    title = 'Breakout rooms', notice, className, 'data-testid': testId = 'breakout-rooms-panel',
  } = props;
  const left = useCountdown(phase === 'open' ? endsAt : null, props.clockOffsetMs);
  const canReturn = allowReturnToMain || isOrganizer;
  const toggleRoom = onOpenRooms && onCloseRooms
    ? (roomId: string, next: 'open' | 'closed') => (next === 'open' ? onOpenRooms([roomId]) : onCloseRooms([roomId]))
    : undefined;

  return (
    <aside aria-label={title} data-testid={testId} data-phase={phase} data-mode={mode} className={cn('flex h-full min-h-0 w-full min-w-0 flex-col bg-surface', className)}>
      <div className="flex shrink-0 items-center justify-between gap-2 border-b border-border px-4 py-3">
        <T as="div" size="lg" weight="semibold" role="heading" aria-label={title}>{title}</T>
        {onClose && (
          <IconButton aria-label={`Close ${title.toLowerCase()}`} variant="ghost" size="sm" icon={<CloseIcon />} onClick={onClose} data-testid={`${testId}-close`} />
        )}
      </div>
      {notice}
      <div className="min-h-0 flex-1 overflow-y-auto">
        {isOrganizer && phase === 'none' && onCreateRooms && <CreateRooms onCreateRooms={onCreateRooms} />}
        {isOrganizer && phase !== 'none' && <OrganizerControls {...props} left={left} />}
        {!isOrganizer && left !== null && (
          <T as="div" size="sm" tone={closing ? 'inherit' : 'secondary'} tabular className={cn('px-4 pt-3', closing && 'font-semibold text-danger')} data-testid="breakout-timer-left">
            {closing ? 'Closing' : 'Rooms close'} in {formatCallElapsed(left)}
          </T>
        )}
        {rooms.length === 0 && !isOrganizer && (
          <T as="p" size="sm" tone="secondary" className="block px-4 py-6" data-testid={`${testId}-empty`}>
            No breakout rooms yet. The organizer will open them.
          </T>
        )}
        {rooms.length > 0 && (
          <ul className="flex flex-col" data-testid="breakout-room-list">
            {rooms.map((room) => {
              const mine = room.id === myRoomId;
              const canJoin = room.state === 'open' && phase === 'open' && !closing && (mode === 'self-select' || isOrganizer);
              return (
                <RoomRow
                  key={room.id}
                  room={room}
                  mine={mine}
                  canJoin={canJoin}
                  canReturn={canReturn}
                  isOrganizer={isOrganizer}
                  rooms={rooms}
                  onJoin={onJoin}
                  onReturnToMain={onReturnToMain}
                  onAssign={onAssign}
                  onToggleRoom={toggleRoom}
                  onRenameRoom={onRenameRoom}
                />
              );
            })}
          </ul>
        )}
        {isOrganizer && phase !== 'none' && unassigned.length > 0 && (
          <section className="border-t border-border px-4 py-3" data-testid="breakout-unassigned" aria-label="Not in a room">
            <T as="div" size="sm" weight="semibold" className="mb-2">Not in a room ({unassigned.length})</T>
            <ul className="flex flex-col gap-1">
              {unassigned.map((p) => (
                <li key={p.id} className="flex items-center gap-2" data-testid="breakout-unassigned-person" data-user-id={p.id}>
                  <Avatar name={p.name} src={p.avatarUrl} size={24} />
                  <T size="sm" className="min-w-0 flex-1 truncate">{p.name}</T>
                  <RaisedHandBadge raised={p.handRaised} />
                  {onAssign && <MoveSelect person={p} rooms={rooms} current={null} onAssign={onAssign} />}
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </aside>
  );
}
