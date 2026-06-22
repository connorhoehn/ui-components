import type { CSSProperties } from 'react';
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

const avatarCircle = (color: string, size = 30): CSSProperties => ({
  width: size,
  height: size,
  borderRadius: '50%',
  backgroundColor: color,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#fff',
  fontSize: 11,
  fontWeight: 700,
  flexShrink: 0,
});

const gridBg: CSSProperties = {
  backgroundImage: 'radial-gradient(circle, #d1d5db 1px, transparent 1px)',
  backgroundSize: '20px 20px',
};

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
        importPath="import { PresencePanel, CursorCanvas, ReactionButtons } from '@connorhoehnslalom/ui-components'"
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
        <div
          style={{
            border: '1px solid #e5e7eb',
            borderRadius: 4,
            padding: 12,
            fontFamily: 'monospace',
            maxWidth: 280,
          }}
        >
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              marginBottom: 8,
              color: '#374151',
            }}
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
            <div
              key={u.initials}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '4px 0',
                fontSize: 12,
              }}
            >
              <div style={avatarCircle(u.color, 20)}>{u.initials}</div>
              <span style={{ color: '#374151' }}>{u.name}</span>
              {u.you && <span style={{ color: '#9ca3af' }}>(you)</span>}
              {u.typing && (
                <span style={{ color: '#9ca3af', fontStyle: 'italic' }}>typing...</span>
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
        code={`import { usePresence } from '@connorhoehnslalom/ui-components';

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
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {[
            { initials: 'CH', color: avatarColors[0] },
            { initials: 'AS', color: avatarColors[1] },
            { initials: 'MK', color: avatarColors[2] },
            { initials: 'JL', color: avatarColors[3] },
            { initials: 'PP', color: avatarColors[4] },
          ].map((u, i) => (
            <div
              key={u.initials}
              style={{
                ...avatarCircle(u.color, 32),
                border: '2px solid white',
                marginLeft: i === 0 ? 0 : -10,
                zIndex: 5 - i,
                position: 'relative',
              }}
            >
              {u.initials}
            </div>
          ))}
          <span
            style={{
              marginLeft: 6,
              fontSize: 13,
              fontWeight: 600,
              color: '#64748b',
              background: '#f1f5f9',
              borderRadius: 12,
              padding: '2px 8px',
            }}
          >
            +3
          </span>
        </div>
      </ExampleBlock>

      {/* ------------------------------------------------------------------ */}
      {/* Freeform Cursors */}
      {/* ------------------------------------------------------------------ */}
      <ExampleBlock
        id="cursor-freeform"
        title="Freeform Cursors"
        description="A bounded region where mouse movement is tracked and broadcast. Remote users' cursors appear as colored circles with initials."
        code={`import { PresenceProvider, CursorCanvas } from '@connorhoehnslalom/ui-components';

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
          style={{
            position: 'relative',
            width: 500,
            height: 200,
            border: '2px solid #e5e7eb',
            borderRadius: 4,
            overflow: 'hidden',
            ...gridBg,
          }}
        >
          {/* Local cursor */}
          <div
            style={{
              position: 'absolute',
              left: 120,
              top: 90,
              transform: 'translate(-50%, -50%)',
              width: 24,
              height: 24,
              borderRadius: '50%',
              background: '#3b82f6',
              border: '2px dashed white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: 9,
              fontWeight: 700,
              boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
              zIndex: 11,
            }}
          >
            You
          </div>
          {/* Remote cursor: AS */}
          <div
            style={{
              position: 'absolute',
              left: 320,
              top: 60,
              transform: 'translate(-50%, -50%)',
              width: 24,
              height: 24,
              borderRadius: '50%',
              background: '#ec4899',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: 10,
              fontWeight: 700,
              boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
              zIndex: 10,
            }}
          >
            AS
          </div>
          {/* Remote cursor: MK */}
          <div
            style={{
              position: 'absolute',
              left: 400,
              top: 150,
              transform: 'translate(-50%, -50%)',
              width: 24,
              height: 24,
              borderRadius: '50%',
              background: '#10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: 10,
              fontWeight: 700,
              boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
              zIndex: 10,
            }}
          >
            MK
          </div>
          {/* Hint label */}
          <span
            style={{
              position: 'absolute',
              top: 4,
              left: 6,
              color: '#9ca3af',
              fontSize: 11,
              pointerEvents: 'none',
              userSelect: 'none',
            }}
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
        code={`import { TextCursorEditor } from '@connorhoehnslalom/ui-components';

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
        <div
          style={{
            position: 'relative',
            border: '1px solid #e5e7eb',
            borderRadius: 4,
            padding: 12,
            fontFamily: 'monospace',
            fontSize: 14,
            lineHeight: 1.6,
            minHeight: 80,
            whiteSpace: 'pre-wrap',
            color: '#1e293b',
          }}
        >
          {'This is a shared document. Click '}
          {/* Alice's cursor at char 34 */}
          <span style={{ position: 'relative', display: 'inline' }}>
            <span
              style={{
                position: 'absolute',
                top: -14,
                left: 0,
                fontSize: 10,
                background: '#ec4899',
                color: 'white',
                padding: '1px 3px',
                borderRadius: 2,
                whiteSpace: 'nowrap',
              }}
            >
              AS
            </span>
            <span
              style={{
                display: 'inline-block',
                width: 3,
                height: 18,
                background: '#ec4899',
                verticalAlign: 'text-bottom',
                marginRight: -1,
              }}
            />
          </span>
          {'here to set your '}
          {/* Marcus's selection highlight */}
          <span
            style={{
              position: 'relative',
              background: 'rgba(16, 185, 129, 0.25)',
            }}
          >
            <span
              style={{
                position: 'absolute',
                top: -14,
                left: 0,
                fontSize: 10,
                background: '#10b981',
                color: 'white',
                padding: '1px 3px',
                borderRadius: 2,
                whiteSpace: 'nowrap',
              }}
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
        code={`import { TableCursorGrid } from '@connorhoehnslalom/ui-components';

<TableCursorGrid
  cursors={remoteCursors}
  localCursor={localCursor}
  onCellClick={(row, col) => broadcastCellFocus(row, col)}
/>`}
      >
        <div style={{ overflow: 'auto' }}>
          <table
            style={{
              borderCollapse: 'collapse',
              fontFamily: 'monospace',
              fontSize: 13,
            }}
          >
            <thead>
              <tr>
                <th style={thStyle}></th>
                {['A', 'B', 'C', 'D'].map((h) => (
                  <th key={h} style={thStyle}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((row) => (
                <tr key={row}>
                  <th style={thStyle}>{row}</th>
                  {[0, 1, 2, 3].map((col) => {
                    const isLocal = row === 2 && col === 1;
                    const isAlice = row === 1 && col === 3;
                    const isMarcus = row === 4 && col === 0;
                    return (
                      <td
                        key={col}
                        style={{
                          position: 'relative',
                          width: 80,
                          height: 32,
                          border: '1px solid #e5e7eb',
                          padding: 6,
                          background: 'white',
                        }}
                      >
                        {isLocal && (
                          <>
                            <div
                              style={{
                                position: 'absolute',
                                inset: 0,
                                border: '2px dashed #3b82f6',
                                borderRadius: 3,
                                pointerEvents: 'none',
                              }}
                            />
                            <div
                              style={{
                                position: 'absolute',
                                top: -10,
                                right: 0,
                                fontSize: 10,
                                background: '#3b82f6',
                                color: 'white',
                                padding: '1px 4px',
                                borderRadius: 3,
                              }}
                            >
                              You
                            </div>
                          </>
                        )}
                        {isAlice && (
                          <>
                            <div
                              style={{
                                position: 'absolute',
                                inset: 0,
                                border: '3px solid #ec4899',
                                borderRadius: 3,
                                pointerEvents: 'none',
                              }}
                            />
                            <div
                              style={{
                                position: 'absolute',
                                top: -10,
                                left: 0,
                                fontSize: 10,
                                background: '#ec4899',
                                color: 'white',
                                padding: '1px 4px',
                                borderRadius: 3,
                              }}
                            >
                              AS
                            </div>
                          </>
                        )}
                        {isMarcus && (
                          <>
                            <div
                              style={{
                                position: 'absolute',
                                inset: 0,
                                border: '3px solid #10b981',
                                borderRadius: 3,
                                pointerEvents: 'none',
                              }}
                            />
                            <div
                              style={{
                                position: 'absolute',
                                top: -10,
                                left: 0,
                                fontSize: 10,
                                background: '#10b981',
                                color: 'white',
                                padding: '1px 4px',
                                borderRadius: 3,
                              }}
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
        code={`import { CanvasCursorBoard } from '@connorhoehnslalom/ui-components';

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
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <span style={{ fontSize: 11, color: '#6b7280' }}>Tool:</span>
            {['Brush', 'Pen', 'Eraser', 'Select'].map((t, i) => (
              <button
                key={t}
                type="button"
                style={{
                  fontSize: 12,
                  padding: '4px 10px',
                  border: '1px solid',
                  borderRadius: 4,
                  cursor: 'default',
                  background: i === 0 ? '#007bff' : 'white',
                  color: i === 0 ? 'white' : '#374151',
                  borderColor: i === 0 ? '#007bff' : '#ddd',
                }}
              >
                {t}
              </button>
            ))}
            <span style={{ fontSize: 11, color: '#6b7280', marginLeft: 8 }}>Color:</span>
            <div
              style={{
                width: 24,
                height: 24,
                borderRadius: 4,
                background: '#007bff',
                border: '1px solid #ddd',
              }}
            />
          </div>

          {/* Canvas area */}
          <div
            style={{
              position: 'relative',
              width: 400,
              height: 180,
              border: '2px solid #e5e7eb',
              borderRadius: 4,
              overflow: 'hidden',
              ...gridBg,
            }}
          >
            {/* Remote cursor 1: brush */}
            <div
              style={{
                position: 'absolute',
                left: 140,
                top: 70,
                transform: 'translate(-50%, -50%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                zIndex: 10,
                pointerEvents: 'none',
              }}
            >
              <div style={avatarCircle('#ec4899', 24)}>AS</div>
              <div
                style={{
                  fontSize: 11,
                  marginTop: 2,
                  color: 'white',
                  background: '#ec4899',
                  borderRadius: 3,
                  padding: '1px 4px',
                  whiteSpace: 'nowrap',
                  opacity: 0.85,
                }}
              >
                brush
              </div>
            </div>

            {/* Remote cursor 2: pen */}
            <div
              style={{
                position: 'absolute',
                left: 300,
                top: 120,
                transform: 'translate(-50%, -50%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                zIndex: 10,
                pointerEvents: 'none',
              }}
            >
              <div style={avatarCircle('#10b981', 24)}>MK</div>
              <div
                style={{
                  fontSize: 11,
                  marginTop: 2,
                  color: 'white',
                  background: '#10b981',
                  borderRadius: 3,
                  padding: '1px 4px',
                  whiteSpace: 'nowrap',
                  opacity: 0.85,
                }}
              >
                pen
              </div>
            </div>

            {/* Trail particles */}
            {[
              { x: 130, y: 80, color: '#ec4899', size: 5 },
              { x: 125, y: 85, color: '#ec4899', size: 5 },
              { x: 135, y: 75, color: '#ec4899', size: 5 },
              { x: 295, y: 125, color: '#10b981', size: 2 },
              { x: 290, y: 130, color: '#10b981', size: 2 },
              { x: 305, y: 118, color: '#10b981', size: 2 },
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
        code={`import { CursorModeSelector } from '@connorhoehnslalom/ui-components';

const [mode, setMode] = useState<CursorMode>('freeform');

<CursorModeSelector activeMode={mode} onModeChange={setMode} />`}
      >
        <div style={{ display: 'flex', gap: 8 }}>
          {['Freeform', 'Table', 'Text', 'Canvas'].map((label, i) => (
            <button
              key={label}
              type="button"
              style={{
                padding: '8px 16px',
                border: '2px solid',
                borderRadius: 6,
                cursor: 'default',
                fontSize: 14,
                fontFamily: 'monospace',
                background: i === 0 ? '#007bff' : 'white',
                color: i === 0 ? 'white' : '#374151',
                borderColor: i === 0 ? '#007bff' : '#d1d5db',
              }}
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
        code={`import { ReactionButtons, ReactionsOverlay } from '@connorhoehnslalom/ui-components';

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
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 16 }}>
            {['❤️', '😂', '👍', '👎', '😮', '😢', '😡', '🎉', '🔥', '⚡', '💯', '🚀'].map(
              (emoji) => (
                <button
                  key={emoji}
                  type="button"
                  style={{
                    fontSize: 18,
                    background: 'none',
                    border: '1px solid #e2e8f0',
                    borderRadius: 6,
                    cursor: 'default',
                    padding: '3px 6px',
                    lineHeight: 1,
                  }}
                >
                  {emoji}
                </button>
              )
            )}
          </div>

          {/* Simulated overlay area */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: 100,
              border: '1px dashed #e2e8f0',
              borderRadius: 6,
              overflow: 'hidden',
              background: '#fafafa',
            }}
          >
            <span
              style={{
                position: 'absolute',
                top: 4,
                left: 8,
                fontSize: 11,
                color: '#9ca3af',
              }}
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
        code={`import { ActivityPanel } from '@connorhoehnslalom/ui-components';

<ActivityPanel
  idToken={idToken}
  sendMessage={sendMessage}
  onMessage={onMessage}
  connectionState={connectionState}
/>`}
      >
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: 8,
            padding: '1.25rem',
            maxWidth: 400,
          }}
        >
          <h2
            style={{
              fontSize: 12,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: '#64748b',
              margin: '0 0 12px 0',
            }}
          >
            Activity
            <span
              style={{
                display: 'inline-block',
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: '#22c55e',
                marginLeft: 8,
                verticalAlign: 'middle',
              }}
            />
          </h2>
          {[
            { icon: '🚪', text: 'Joined room', time: '2m ago' },
            { icon: '✅', text: 'Pipeline completed', time: '5m ago' },
            { icon: '💬', text: 'Comment added', time: '8m ago' },
            { icon: '❤️', text: 'Reaction sent', time: '12m ago' },
            { icon: '💤', text: 'User went idle', time: '15m ago' },
          ].map((item, idx, arr) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                paddingTop: 8,
                paddingBottom: 8,
                borderBottom: idx < arr.length - 1 ? '1px solid #f1f5f9' : 'none',
              }}
            >
              <span style={{ width: 20, flexShrink: 0, textAlign: 'center' }}>
                {item.icon}
              </span>
              <span style={{ flex: 1, fontSize: 14, color: '#374151' }}>{item.text}</span>
              <span style={{ fontSize: 12, color: '#9ca3af', flexShrink: 0 }}>
                {item.time}
              </span>
            </div>
          ))}
        </div>
      </ExampleBlock>

      {/* ------------------------------------------------------------------ */}
      {/* Props Reference */}
      {/* ------------------------------------------------------------------ */}
      <div id="props" style={{ marginTop: 40 }}>
        <h2
          style={{
            fontSize: 22,
            fontWeight: 700,
            margin: '0 0 24px 0',
            color: '#0f172a',
          }}
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

const thStyle: CSSProperties = {
  fontWeight: 700,
  background: '#f9fafb',
  padding: 6,
  minWidth: 40,
  textAlign: 'center',
  border: '1px solid #e5e7eb',
  fontSize: 12,
};
