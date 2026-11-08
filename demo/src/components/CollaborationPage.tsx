import { Avatar, AvatarGroup } from '@connorhoehn/ui-components/shared';
import { ExampleBlock, PropsTable, PageHeader, useRegisterToc } from '../shared';
import type { TocItem } from '../shared';

const tocItems: TocItem[] = [
  { id: 'presence-panel', label: 'Presence Panel', level: 2 },
  { id: 'presence-avatars', label: 'Avatar Stack', level: 2 },
  { id: 'cursor-freeform', label: 'Freeform Cursors', level: 2 },
  { id: 'cursor-text', label: 'Text Cursors', level: 2 },
  { id: 'cursor-table', label: 'Table Cursors', level: 2 },
  { id: 'cursor-canvas', label: 'Canvas Cursors (Drawing)', level: 2 },
  { id: 'cursor-modes', label: 'Cursor Mode Selector', level: 2 },
  { id: 'reactions', label: 'Reactions', level: 2 },
  { id: 'activity-feed', label: 'Activity Feed', level: 2 },
  { id: 'props', label: 'Props', level: 2 },
];

// ---------------------------------------------------------------------------
// Shared styles
// ---------------------------------------------------------------------------

const avatarColors = ['#6366f1', '#ec4899', '#10b981', '#f59e0b', '#ef4444'];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function CollaborationPage() {
  useRegisterToc(tocItems);

  return (
    <div>
      <PageHeader
        title="Collaboration"
        description="Real-time presence, multi-mode cursors, reactions, and activity feeds. These components show who's online, where they are, and what they're doing — powered by WebSocket subscriptions."
        importPath="import { PresencePanel, CursorCanvas, ReactionButtons } from '@connorhoehn/ui-components'"
      />

      {/* ------------------------------------------------------------------ */}
      {/* Presence Panel */}
      {/* ------------------------------------------------------------------ */}
      <ExampleBlock
        id="presence-panel"
        title="Presence Panel"
        description="Displays the list of users currently connected to a channel with colored avatars, initials, and typing indicators."
        code={`const users = [
  { clientId: 'client-1', metadata: { displayName: 'Connor Hoehn', isTyping: false } },
  { clientId: 'client-2', metadata: { displayName: 'Alice Smith', isTyping: true } },
  { clientId: 'client-3', metadata: { displayName: 'Marcus Kim' } },
  { clientId: 'client-4', metadata: { displayName: 'Jordan Lee' } },
  { clientId: 'client-5', metadata: { displayName: 'Priya Patel' } },
];

<PresencePanel users={users} currentClientId="client-1" />`}
      >
        <div className="border border-border rounded p-3 font-mono max-w-70"
        >
          <div className="text-[12px] font-bold mb-2 text-text-primary"
          >
            Online &middot; 5
          </div>
          {[
            { initials: 'CH', name: 'Connor Hoehn', color: avatarColors[0], you: true, typing: false },
            { initials: 'AS', name: 'Alice Smith', color: avatarColors[1], you: false, typing: true },
            { initials: 'MK', name: 'Marcus Kim', color: avatarColors[2], you: false, typing: false },
            { initials: 'JL', name: 'Jordan Lee', color: avatarColors[3], you: false, typing: false },
            { initials: 'PP', name: 'Priya Patel', color: avatarColors[4], you: false, typing: false },
          ].map((u) => (
            <div className="flex items-center gap-2 py-1 px-0 text-[12px]"
              key={u.initials}
            >
              <Avatar name={u.name} initials={u.initials} color={u.color} size={20} />
              <span className="text-text-primary">{u.name}</span>
              {u.you && <span className="text-text-tertiary">(you)</span>}
              {u.typing && (
                <span className="text-text-tertiary italic">typing...</span>
              )}
            </div>
          ))}
        </div>
      </ExampleBlock>

      {/* ------------------------------------------------------------------ */}
      {/* Avatar Stack */}
      {/* ------------------------------------------------------------------ */}
      <ExampleBlock
        id="presence-avatars"
        title="Avatar Stack"
        description="A compact horizontal stack of overlapping avatar circles — useful as a space-efficient presence indicator, similar to GitHub PR reviewer avatars."
        code={`import { usePresence } from '@connorhoehn/ui-components';

const { users } = usePresence(channelId);
const visible = users.slice(0, 5);
const overflow = users.length - visible.length;

<div style={{ display: 'flex', alignItems: 'center' }}>
  {visible.map((user, i) => (
    <div
      key={user.clientId}
      style={{
        width: 32, height: 32, borderRadius: '50%',
        backgroundColor: identityToColor(user.clientId),
        border: '2px solid white',
        marginLeft: i === 0 ? 0 : -10,
        zIndex: visible.length - i,
      }}
    >
      {identityToInitials(user.metadata.displayName)}
    </div>
  ))}
  {overflow > 0 && <span style={{ marginLeft: 6 }}>+{overflow}</span>}
</div>`}
      >
        <AvatarGroup
          size={32}
          total={8}
          items={[
            { name: 'CH', initials: 'CH', color: avatarColors[0] },
            { name: 'AS', initials: 'AS', color: avatarColors[1] },
            { name: 'MK', initials: 'MK', color: avatarColors[2] },
            { name: 'JL', initials: 'JL', color: avatarColors[3] },
            { name: 'PP', initials: 'PP', color: avatarColors[4] },
          ]}
        />
      </ExampleBlock>

      {/* ------------------------------------------------------------------ */}
      {/* Freeform Cursors */}
      {/* ------------------------------------------------------------------ */}
      <ExampleBlock
        id="cursor-freeform"
        title="Freeform Cursors"
        description="A bounded region where mouse movement is tracked and broadcast. Remote users' cursors appear as colored circles with initials."
        code={`import { PresenceProvider, CursorCanvas } from '@connorhoehn/ui-components';

<PresenceProvider channelId="room-123">
  <CursorCanvas
    cursors={remoteCursors}
    localCursor={localCursor}
    onMouseMove={(x, y) => broadcastPosition(x, y)}
    width={500}
    height={200}
  />
</PresenceProvider>`}
      >
        <div
          className="relative w-125 h-50 border-2 border-border rounded overflow-hidden bg-[radial-gradient(circle,_#d1d5db_1px,_transparent_1px)] bg-[length:20px_20px]"
        >
          {/* Local cursor */}
          <div className="absolute left-30 top-[90px] -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-info border-2 border-dashed border-white flex items-center justify-center text-white text-[9px] font-bold shadow-[0_2px_4px_rgba(0,0,0,0.3)] z-[11]"
          >
            You
          </div>
          {/* Remote cursor: AS */}
          <div className="absolute left-80 top-15 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-accent flex items-center justify-center text-white text-[10px] font-bold shadow-[0_2px_4px_rgba(0,0,0,0.3)] z-[10]"
          >
            AS
          </div>
          {/* Remote cursor: MK */}
          <div className="absolute left-100 top-[150px] -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-success flex items-center justify-center text-white text-[10px] font-bold shadow-[0_2px_4px_rgba(0,0,0,0.3)] z-[10]"
          >
            MK
          </div>
          {/* Hint label */}
          <span className="absolute top-1 left-[6px] text-text-tertiary text-[11px] pointer-events-none select-none"
          >
            Move your mouse here
          </span>
        </div>
      </ExampleBlock>

      {/* ------------------------------------------------------------------ */}
      {/* Text Cursors */}
      {/* ------------------------------------------------------------------ */}
      <ExampleBlock
        id="cursor-text"
        title="Text Cursors"
        description="A shared document editor showing remote cursor carets and text selection highlights. Each remote user gets a vertical colored line at their character offset."
        code={`import { TextCursorEditor } from '@connorhoehn/ui-components';

const cursors = new Map([
  ['client-2', { clientId: 'client-2', position: { position: 34 }, metadata: { mode: 'text', displayName: 'Alice' } }],
  ['client-3', { clientId: 'client-3', position: { position: 72 }, metadata: { mode: 'text', displayName: 'Marcus', hasSelection: true, selection: { start: 60, end: 85, text: 'cursor position' } } }],
]);

<TextCursorEditor
  cursors={cursors}
  onPositionChange={(pos, selection, hasSelection) => {
    broadcastCursor({ position: pos, hasSelection, selection });
  }}
/>`}
      >
        <div className="relative border border-border rounded p-3 font-mono text-[14px] leading-[1.6] min-h-20 whitespace-pre-wrap text-text-primary"
        >
          {'This is a shared document. Click '}
          {/* Alice's cursor at char 34 */}
          <span className="relative inline">
            <span className="absolute -top-[14px] left-0 text-[10px] bg-accent text-white py-[1px] px-[3px] rounded-sm whitespace-nowrap"
            >
              AS
            </span>
            <span className="inline-block w-[3px] h-[18px] bg-accent align-text-bottom -mr-[1px]"
            />
          </span>
          {'here to set your '}
          {/* Marcus's selection highlight */}
          <span className="relative bg-[rgba(16,185,129,0.25)]"
          >
            <span className="absolute -top-[14px] left-0 text-[10px] bg-success text-white py-[1px] px-[3px] rounded-sm whitespace-nowrap"
            >
              MK
            </span>
            {'cursor position'}
          </span>
          {'. Select text to broadcast a selection range.'}
        </div>
      </ExampleBlock>

      {/* ------------------------------------------------------------------ */}
      {/* Table Cursors */}
      {/* ------------------------------------------------------------------ */}
      <ExampleBlock
        id="cursor-table"
        title="Table Cursors"
        description="A spreadsheet-like grid showing which cell each user is focused on. Remote users get colored borders with initial badges; the local user gets a dashed blue border."
        code={`import { TableCursorGrid } from '@connorhoehn/ui-components';

<TableCursorGrid
  cursors={remoteCursors}
  localCursor={localCursor}
  onCellClick={(row, col) => broadcastCellFocus(row, col)}
/>`}
      >
        <div className="overflow-auto">
          <table className="border-collapse font-mono text-[13px]"
          >
            <thead>
              <tr>
                <th className={TH_CLS} />
                {['A', 'B', 'C', 'D'].map((h) => (
                  <th key={h} className={TH_CLS}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((row) => (
                <tr key={row}>
                  <th className={TH_CLS}>{row}</th>
                  {[0, 1, 2, 3].map((col) => {
                    const isLocal = row === 2 && col === 1;
                    const isAlice = row === 1 && col === 3;
                    const isMarcus = row === 4 && col === 0;
                    return (
                      <td className="relative w-20 h-8 border border-border p-[6px] bg-white"
                        key={col}
                      >
                        {isLocal && (
                          <>
                            <div className="absolute inset-0 border-2 border-dashed border-info rounded-[3px] pointer-events-none"
                            />
                            <div className="absolute -top-[10px] right-0 text-[10px] bg-info text-white py-[1px] px-1 rounded-[3px]"
                            >
                              You
                            </div>
                          </>
                        )}
                        {isAlice && (
                          <>
                            <div className="absolute inset-0 border-3 border-accent rounded-[3px] pointer-events-none"
                            />
                            <div className="absolute -top-[10px] left-0 text-[10px] bg-accent text-white py-[1px] px-1 rounded-[3px]"
                            >
                              AS
                            </div>
                          </>
                        )}
                        {isMarcus && (
                          <>
                            <div className="absolute inset-0 border-3 border-success rounded-[3px] pointer-events-none"
                            />
                            <div className="absolute -top-[10px] left-0 text-[10px] bg-success text-white py-[1px] px-1 rounded-[3px]"
                            >
                              MK
                            </div>
                          </>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ExampleBlock>

      {/* ------------------------------------------------------------------ */}
      {/* Canvas Cursors (Drawing) */}
      {/* ------------------------------------------------------------------ */}
      <ExampleBlock
        id="cursor-canvas"
        title="Canvas Cursors (Drawing)"
        description="A bounded drawing area with tool controls. Each remote user's cursor shows their selected tool. Ephemeral trail particles appear on mouse movement."
        code={`import { CanvasCursorBoard } from '@connorhoehn/ui-components';

<CanvasCursorBoard
  cursors={remoteCursors}
  localCursor={localCursor}
  onMouseMove={(x, y, tool, color, size) => {
    broadcastCanvasCursor(x, y, tool, color, size);
  }}
  width={400}
  height={180}
/>`}
      >
        <div>
          {/* Toolbar row */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] text-text-secondary">Tool:</span>
            {['Brush', 'Pen', 'Eraser', 'Select'].map((t, i) => (
              <button className={`text-[12px] py-1 px-[10px] border rounded cursor-default ${i === 0 ? 'bg-info text-white border-info' : 'bg-white text-text-primary border-border-field'}`}
                key={t}
                type="button"
              >
                {t}
              </button>
            ))}
            <span className="text-[11px] text-text-secondary ml-2">Color:</span>
            <div className="w-6 h-6 rounded bg-info border border-border-field"
            />
          </div>

          {/* Canvas area */}
          <div
            className="relative w-100 h-45 border-2 border-border rounded overflow-hidden bg-[radial-gradient(circle,_#d1d5db_1px,_transparent_1px)] bg-[length:20px_20px]"
          >
            {/* Remote cursor 1: brush */}
            <div className="absolute left-35 top-[70px] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-[10] pointer-events-none"
            >
              <Avatar name="AS" initials="AS" color="#ec4899" size={24} />
              <div className="text-[11px] mt-[2px] text-white bg-accent rounded-[3px] py-[1px] px-1 whitespace-nowrap opacity-85"
              >
                brush
              </div>
            </div>

            {/* Remote cursor 2: pen */}
            <div className="absolute left-75 top-30 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-[10] pointer-events-none"
            >
              <Avatar name="MK" initials="MK" color="#10b981" size={24} />
              <div className="text-[11px] mt-[2px] text-white bg-success rounded-[3px] py-[1px] px-1 whitespace-nowrap opacity-85"
              >
                pen
              </div>
            </div>

            {/* Trail particles */}
            {[
              { x: 130, y: 80, color: '#ec4899', size: 5 },
              { x: 125, y: 85, color: '#ec4899', size: 5 },
              { x: 135, y: 75, color: '#ec4899', size: 5 },
              { x: 295, y: 125, color: 'var(--color-success)', size: 2 },
              { x: 290, y: 130, color: 'var(--color-success)', size: 2 },
              { x: 305, y: 118, color: 'var(--color-success)', size: 2 },
            ].map((dot, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  left: dot.x,
                  top: dot.y,
                  width: dot.size,
                  height: dot.size,
                  borderRadius: '50%',
                  background: dot.color,
                  opacity: 0.6,
                  pointerEvents: 'none',
                }}
              />
            ))}
          </div>
        </div>
      </ExampleBlock>

      {/* ------------------------------------------------------------------ */}
      {/* Cursor Mode Selector */}
      {/* ------------------------------------------------------------------ */}
      <ExampleBlock
        id="cursor-modes"
        title="Cursor Mode Selector"
        description="A row of buttons for switching between cursor tracking modes. Switching triggers an unsubscribe/resubscribe cycle to change the cursor channel."
        code={`import { CursorModeSelector } from '@connorhoehn/ui-components';

const [mode, setMode] = useState<CursorMode>('freeform');

<CursorModeSelector activeMode={mode} onModeChange={setMode} />`}
      >
        <div className="flex gap-2">
          {['Freeform', 'Table', 'Text', 'Canvas'].map((label, i) => (
            <button className={`py-2 px-4 border-2 rounded-md cursor-default text-[14px] font-mono ${i === 0 ? 'bg-info text-white border-info' : 'bg-white text-text-primary border-border-field'}`}
              key={label}
              type="button"
            >
              {label}
            </button>
          ))}
        </div>
      </ExampleBlock>

      {/* ------------------------------------------------------------------ */}
      {/* Reactions */}
      {/* ------------------------------------------------------------------ */}
      <ExampleBlock
        id="reactions"
        title="Reactions"
        description="Emoji reaction buttons broadcast ephemeral reactions that float up and fade out across the viewport. The overlay is fixed-position with pointer-events: none."
        code={`import { ReactionButtons, ReactionsOverlay } from '@connorhoehn/ui-components';

const [activeReactions, setActiveReactions] = useState([]);

function handleReact(emoji: string) {
  const reaction = {
    id: crypto.randomUUID(),
    emoji,
    x: Math.random() * 80 + 10,
    y: Math.random() * 60 + 20,
  };
  setActiveReactions(prev => [...prev, reaction]);
  broadcastReaction(emoji);
}

<ReactionButtons onReact={handleReact} />
<ReactionsOverlay reactions={activeReactions} />`}
      >
        <div>
          {/* Reaction buttons grid */}
          <div className="flex gap-1 flex-wrap mb-4">
            {['❤️', '😂', '👍', '👎', '😮', '😢', '😡', '🎉', '🔥', '⚡', '💯', '🚀'].map(
              (emoji) => (
                <button className="text-[18px] bg-none border border-border rounded-md cursor-default py-[3px] px-[6px] leading-[1]"
                  key={emoji}
                  type="button"
                >
                  {emoji}
                </button>
              )
            )}
          </div>

          {/* Simulated overlay area */}
          <div className="relative w-full h-25 border border-dashed border-border rounded-md overflow-hidden bg-surface-inset"
          >
            <span className="absolute top-1 left-2 text-[11px] text-text-tertiary"
            >
              Reactions overlay (simulated)
            </span>
            {[
              { emoji: '❤️', left: '20%', top: '30%', opacity: 0.9 },
              { emoji: '🚀', left: '55%', top: '15%', opacity: 0.7 },
              { emoji: '🔥', left: '75%', top: '50%', opacity: 0.8 },
              { emoji: '😂', left: '40%', top: '60%', opacity: 0.6 },
            ].map((r, i) => (
              <span
                key={i}
                style={{
                  position: 'absolute',
                  left: r.left,
                  top: r.top,
                  fontSize: 28,
                  opacity: r.opacity,
                  userSelect: 'none',
                  pointerEvents: 'none',
                }}
              >
                {r.emoji}
              </span>
            ))}
          </div>
        </div>
      </ExampleBlock>

      {/* ------------------------------------------------------------------ */}
      {/* Activity Feed */}
      {/* ------------------------------------------------------------------ */}
      <ExampleBlock
        id="activity-feed"
        title="Activity Feed"
        description="Hydrates from REST on mount, then subscribes to live WebSocket events. Shows recent social actions with icons and relative timestamps."
        code={`import { ActivityPanel } from '@connorhoehn/ui-components';

<ActivityPanel
  idToken={idToken}
  sendMessage={sendMessage}
  onMessage={onMessage}
  connectionState={connectionState}
/>`}
      >
        <div className="bg-surface border border-border rounded-lg p-5 max-w-100"
        >
          <h2 className="text-[12px] font-semibold uppercase tracking-[0.05em] text-neutral mt-0 mr-0 mb-3 ml-0"
          >
            Activity
            <span className="inline-block w-2 h-2 rounded-full bg-success ml-2 align-middle"
            />
          </h2>
          {[
            { icon: '🚪', text: 'Joined room', time: '2m ago' },
            { icon: '✅', text: 'Pipeline completed', time: '5m ago' },
            { icon: '💬', text: 'Comment added', time: '8m ago' },
            { icon: '❤️', text: 'Reaction sent', time: '12m ago' },
            { icon: '💤', text: 'User went idle', time: '15m ago' },
          ].map((item, idx, arr) => (
            <div className={`flex items-center gap-2 pt-2 pb-2 ${idx < arr.length - 1 ? 'border-b border-surface-hover' : 'border-b-0'}`}
              key={idx}
            >
              <span className="w-5 shrink-0 text-center">
                {item.icon}
              </span>
              <span className="flex-[1] text-[14px] text-text-primary">{item.text}</span>
              <span className="text-[12px] text-text-tertiary shrink-0">
                {item.time}
              </span>
            </div>
          ))}
        </div>
      </ExampleBlock>

      {/* ------------------------------------------------------------------ */}
      {/* Props Reference */}
      {/* ------------------------------------------------------------------ */}
      <div className="mt-10" id="props">
        <h2 className="text-[22px] font-bold mt-0 mr-0 mb-6 ml-0 text-text-primary"
        >
          Props Reference
        </h2>

        <PropsTable
          componentName="PresencePanel"
          props={[
            {
              name: 'users',
              type: 'PresenceUser[]',
              required: true,
              description: 'Array of connected users with clientId and metadata (displayName, isTyping, etc.)',
            },
            {
              name: 'currentClientId',
              type: 'string | null',
              required: true,
              description: 'The local user\'s client ID. Used to display the "(you)" label.',
            },
          ]}
        />

        <PropsTable
          componentName="CursorCanvas"
          props={[
            {
              name: 'cursors',
              type: 'Map<string, RemoteCursor>',
              required: true,
              description: 'Map of remote cursor positions keyed by clientId.',
            },
            {
              name: 'localCursor',
              type: 'RemoteCursor | null',
              description: 'The local user\'s cursor data, rendered with a dashed border style.',
            },
            {
              name: 'onMouseMove',
              type: '(x: number, y: number) => void',
              required: true,
              description: 'Callback invoked on mouse movement within the canvas bounds.',
            },
            {
              name: 'width',
              type: 'number',
              default: '600',
              description: 'Canvas width in pixels.',
            },
            {
              name: 'height',
              type: 'number',
              default: '300',
              description: 'Canvas height in pixels.',
            },
          ]}
        />

        <PropsTable
          componentName="TextCursorEditor"
          props={[
            {
              name: 'cursors',
              type: 'Map<string, RemoteCursor>',
              required: true,
              description: 'Remote cursors with position.position (character offset) and optional selection metadata.',
            },
            {
              name: 'localCursor',
              type: 'RemoteCursor | null',
              description: 'The local user\'s cursor rendered as a dashed caret line.',
            },
            {
              name: 'onPositionChange',
              type: '(position: number, selection: TextSelectionData | null, hasSelection: boolean) => void',
              required: true,
              description: 'Fires on click/keyup with the current character offset and any active selection range.',
            },
          ]}
        />

        <PropsTable
          componentName="TableCursorGrid"
          props={[
            {
              name: 'cursors',
              type: 'Map<string, RemoteCursor>',
              required: true,
              description: 'Remote cursors with position.row and position.col indicating focused cell.',
            },
            {
              name: 'localCursor',
              type: 'RemoteCursor | null',
              description: 'The local user\'s selected cell, shown with a dashed blue border.',
            },
            {
              name: 'onCellClick',
              type: '(row: number, col: number) => void',
              required: true,
              description: 'Called when the local user clicks a cell to broadcast focus.',
            },
          ]}
        />

        <PropsTable
          componentName="CanvasCursorBoard"
          props={[
            {
              name: 'cursors',
              type: 'Map<string, RemoteCursor>',
              required: true,
              description: 'Remote cursors with canvas-mode metadata (tool, color, size).',
            },
            {
              name: 'localCursor',
              type: 'RemoteCursor | null',
              description: 'The local user\'s canvas cursor with tool label.',
            },
            {
              name: 'onMouseMove',
              type: '(x: number, y: number, tool: CanvasTool, color: string, size: number) => void',
              required: true,
              description: 'Broadcasts mouse position along with the active tool, color, and brush size.',
            },
            {
              name: 'width',
              type: 'number',
              default: '600',
              description: 'Board width in pixels.',
            },
            {
              name: 'height',
              type: 'number',
              default: '300',
              description: 'Board height in pixels.',
            },
          ]}
        />

        <PropsTable
          componentName="ReactionButtons"
          props={[
            {
              name: 'onReact',
              type: '(emoji: string) => void',
              required: true,
              description: 'Called with the selected emoji string when a reaction button is clicked.',
            },
            {
              name: 'disabled',
              type: 'boolean',
              default: 'false',
              description: 'Disables all buttons (e.g., when WebSocket is disconnected).',
            },
          ]}
        />

        <PropsTable
          componentName="ReactionsOverlay"
          props={[
            {
              name: 'reactions',
              type: 'EphemeralReaction[]',
              required: true,
              description: 'Array of active reactions with id, emoji, x (%), and y (%) for positioning. Each animates and fades out.',
            },
          ]}
        />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Table helper style
// ---------------------------------------------------------------------------

const TH_CLS =
  'font-bold bg-surface-inset p-1.5 min-w-10 text-center border border-border text-[12px]';
