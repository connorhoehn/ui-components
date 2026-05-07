import {
  ExampleBlock,
  PropsTable,
  PageHeader,
  useRegisterToc,
} from '../shared';
import type { TocItem } from '../shared';

const tocItems: TocItem[] = [
  { id: 'overview', label: 'Architecture Overview', level: 2 },
  { id: 'shared-editor', label: 'SharedTextEditor', level: 2 },
  { id: 'conflict-resolution', label: 'Merge Conflict Indicator', level: 2 },
  { id: 'awareness', label: 'Participant Awareness', level: 2 },
  { id: 'awareness-state', label: 'Awareness State Broadcasting', level: 2 },
  { id: 'yjs-provider', label: 'Y.js Integration', level: 2 },
  { id: 'collaborative-doc', label: 'useCollaborativeDoc', level: 2 },
  { id: 'document-structure', label: 'Document Data Model', level: 2 },
  { id: 'gateway-protocol', label: 'Gateway Message Protocol', level: 2 },
  { id: 'props', label: 'Props Reference', level: 2 },
];

/* ─── Architecture diagram layer colors ───────────────────────────────── */

const LAYERS = [
  { label: 'SharedTextEditor', sublabel: 'UI Component', color: '#dbeafe', border: '#93c5fd' },
  { label: 'useCollaborativeDoc', sublabel: 'Orchestration hook', color: '#ede9fe', border: '#c4b5fd' },
  { label: 'useYjsDoc + GatewayProvider', sublabel: 'Y.js lifecycle', color: '#dcfce7', border: '#86efac' },
  { label: 'WebSocket Gateway', sublabel: 'Transport', color: '#fef3c7', border: '#fcd34d' },
];

/* ─── Participant mock data ───────────────────────────────────────────── */

const PARTICIPANTS = [
  { name: 'Alice Smith', color: '#6366f1', mode: 'editor' as const, section: 'Introduction', idle: false },
  { name: 'Bob Chen', color: '#10b981', mode: 'reviewer' as const, section: 'Action Items', idle: false },
  { name: 'Carol Davis', color: '#f59e0b', mode: 'reader' as const, section: 'Summary', idle: true },
];

const MODE_COLORS: Record<string, { bg: string; text: string }> = {
  editor: { bg: '#dbeafe', text: '#1d4ed8' },
  reviewer: { bg: '#ede9fe', text: '#7c3aed' },
  reader: { bg: '#f1f5f9', text: '#475569' },
};

/* ─── Page ────────────────────────────────────────────────────────────── */

export default function RealTimeEditingPage() {
  useRegisterToc(tocItems);

  return (
    <div>
      <PageHeader
        title="Real-time Editing"
        description="CRDT-powered collaborative document editing with Y.js. Conflict-free real-time sync, awareness state for participant tracking, and rich-text collaboration with automatic merge resolution."
        importPath="import { SharedTextEditor, useCollaborativeDoc, useYjsDoc } from '@connorhoehn/ui-components'"
      />

      {/* ─── 1. Architecture Overview ─────────────────────────────────────── */}
      <ExampleBlock
        id="overview"
        title="Architecture Overview"
        description="The CRDT system is layered into focused responsibilities. Each layer handles a single concern and delegates to the layer below."
        code={`import { SharedTextEditor } from '@connorhoehn/ui-components'
import { useCollaborativeDoc } from '@connorhoehn/ui-components'
import { useYjsDoc } from '@connorhoehn/ui-components'
import { GatewayProvider } from '@connorhoehn/ui-components'

// Layer stack:
// SharedTextEditor    — Rich-text UI (contentEditable)
// useCollaborativeDoc — Orchestrates meta, sections, awareness, comments
// useYjsDoc           — Y.Doc lifecycle, WS subscribe/unsubscribe
// GatewayProvider     — Bridges Y.js updates to gateway messages
// WebSocket Gateway   — Transport layer (binary updates over JSON)`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
          {LAYERS.map((layer, i) => (
            <div key={layer.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {i > 0 && (
                <div style={{ fontSize: 20, color: '#94a3b8', lineHeight: '28px', userSelect: 'none' }}>
                  ↕
                </div>
              )}
              <div
                style={{
                  background: layer.color,
                  border: `1px solid ${layer.border}`,
                  borderRadius: 10,
                  padding: '12px 28px',
                  minWidth: 280,
                  textAlign: 'center',
                }}
              >
                <div style={{ fontWeight: 600, fontSize: 14, color: '#0f172a' }}>{layer.label}</div>
                <div style={{ fontSize: 12, color: '#475569', marginTop: 2 }}>{layer.sublabel}</div>
              </div>
            </div>
          ))}
        </div>
      </ExampleBlock>

      {/* ─── 2. SharedTextEditor ──────────────────────────────────────────── */}
      <ExampleBlock
        id="shared-editor"
        title="SharedTextEditor"
        description="A WYSIWYG rich-text editor bound to CRDT content. Toolbar provides formatting commands, and the editor surface syncs bidirectionally with the Y.js document."
        code={`import { SharedTextEditor } from '@connorhoehn/ui-components'
import { useCRDT } from '@connorhoehn/ui-components'

function Editor() {
  const { content, applyLocalEdit, hasConflict, dismissConflict } = useCRDT({
    sendMessage,
    onMessage,
    currentChannel: 'doc-123',
    connectionState: 'connected',
  })

  return (
    <SharedTextEditor
      content={content}
      applyLocalEdit={applyLocalEdit}
      hasConflict={hasConflict}
      onDismissConflict={dismissConflict}
    />
  )
}`}
        background="#ffffff"
      >
        <div style={{ border: '1px solid #e2e8f0', borderRadius: 8, overflow: 'hidden' }}>
          {/* Toolbar */}
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', padding: '8px 12px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', alignItems: 'center' }}>
            {[
              { label: 'B', style: { fontWeight: 700 } },
              { label: 'I', style: { fontStyle: 'italic' } },
              { label: 'U', style: { textDecoration: 'underline' } },
              { label: 'S', style: { textDecoration: 'line-through' } },
              { label: '<>', style: { fontFamily: 'monospace', fontSize: 11 } },
            ].map((btn, i) => (
              <div
                key={i}
                style={{
                  width: 28,
                  height: 28,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid #d1d5db',
                  borderRadius: 4,
                  background: '#ffffff',
                  fontSize: 13,
                  cursor: 'pointer',
                  ...btn.style,
                }}
              >
                {btn.label}
              </div>
            ))}
            <div style={{ width: 1, height: 20, background: '#e2e8f0', margin: '0 4px' }} />
            <div style={{ fontSize: 12, border: '1px solid #d1d5db', borderRadius: 4, padding: '4px 8px', background: '#ffffff', color: '#374151' }}>
              Paragraph ▾
            </div>
          </div>
          {/* Content area */}
          <div style={{ padding: '16px 20px', minHeight: 180, background: '#ffffff', fontSize: 14, lineHeight: 1.7, color: '#1e293b' }}>
            <h3 style={{ margin: '0 0 8px 0', fontSize: 18, fontWeight: 600 }}>Meeting Notes</h3>
            <p style={{ margin: '0 0 8px 0' }}>
              <strong>Date:</strong> May 7, 2026 — Sprint planning session
            </p>
            <p style={{ margin: '0 0 12px 0', color: '#475569' }}>
              Discussed the migration timeline and agreed on the phased approach for the new CRDT backend integration.
            </p>
            <ul style={{ margin: 0, paddingLeft: 20 }}>
              <li style={{ marginBottom: 4 }}>Finalize API contract by Friday</li>
              <li style={{ marginBottom: 4 }}>Set up staging environment for load testing</li>
              <li>Review awareness performance benchmarks</li>
            </ul>
          </div>
        </div>
      </ExampleBlock>

      {/* ─── 3. Merge Conflict Indicator ──────────────────────────────────── */}
      <ExampleBlock
        id="conflict-resolution"
        title="Merge Conflict Indicator"
        description="When remote edits merge into a document with local changes, a non-blocking banner informs the user. Conflicts are automatically resolved by Y.js — the banner is informational only."
        code={`import { useCRDT } from '@connorhoehn/ui-components'

function EditorWithConflicts() {
  const { content, applyLocalEdit, hasConflict, dismissConflict } = useCRDT({
    sendMessage,
    onMessage,
    currentChannel: 'doc-123',
    connectionState: 'connected',
  })

  // hasConflict becomes true when a remote transaction modifies a doc
  // that already has local content. Y.js resolves the conflict automatically
  // — the banner is purely informational.

  return (
    <SharedTextEditor
      content={content}
      applyLocalEdit={applyLocalEdit}
      hasConflict={hasConflict}
      onDismissConflict={dismissConflict}
    />
  )
}`}
        background="#ffffff"
      >
        <div style={{ border: '1px solid #e2e8f0', borderRadius: 8, overflow: 'hidden' }}>
          {/* Toolbar (compact) */}
          <div style={{ display: 'flex', gap: 4, padding: '8px 12px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
            {['B', 'I', 'U'].map((l) => (
              <div key={l} style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #d1d5db', borderRadius: 4, background: '#fff', fontSize: 13, fontWeight: l === 'B' ? 700 : 400 }}>
                {l}
              </div>
            ))}
          </div>
          {/* Conflict banner */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 14px',
            background: '#fefce8',
            border: '1px solid #fde68a',
            borderLeft: 'none',
            borderRight: 'none',
            fontSize: 13,
            color: '#92400e',
          }}>
            <span>⚠ Edits merged — your changes are preserved</span>
            <div style={{
              width: 22,
              height: 22,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 4,
              cursor: 'pointer',
              fontSize: 14,
              color: '#92400e',
              fontWeight: 600,
            }}>
              ✕
            </div>
          </div>
          {/* Content area */}
          <div style={{ padding: '16px 20px', minHeight: 120, background: '#ffffff', fontSize: 14, lineHeight: 1.7, color: '#1e293b' }}>
            <p style={{ margin: 0 }}>Both users edited the introduction paragraph simultaneously. Y.js merged both changes — no data was lost.</p>
          </div>
        </div>
      </ExampleBlock>

      {/* ─── 4. Participant Awareness ─────────────────────────────────────── */}
      <ExampleBlock
        id="awareness"
        title="Participant Awareness"
        description="Real-time presence tracking shows who is viewing the document, which section they are focused on, their role, and idle status."
        code={`import { useAwareness } from '@connorhoehn/ui-components'

function ParticipantsPanel({ provider }) {
  const { participants } = useAwareness(provider, {
    userId: 'user-1',
    displayName: 'Alice Smith',
    color: '#6366f1',
    mode: 'editor',
  })

  return (
    <div>
      <h4>{participants.length} participants</h4>
      {participants.map((p) => (
        <div key={p.clientId} style={{ opacity: p.idle ? 0.5 : 1 }}>
          <Avatar color={p.color} name={p.displayName} />
          <span>{p.displayName}</span>
          <Badge>{p.mode}</Badge>
          {p.currentSectionId && <span>§ {p.currentSectionId}</span>}
          {p.idle && <span className="idle-label">idle</span>}
        </div>
      ))}
    </div>
  )
}`}
      >
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 8, padding: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#0f172a', marginBottom: 16 }}>
            3 participants
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {PARTICIPANTS.map((p) => (
              <div
                key={p.name}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  opacity: p.idle ? 0.5 : 1,
                }}
              >
                {/* Avatar */}
                <div style={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  background: p.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  fontSize: 12,
                  fontWeight: 600,
                }}>
                  {p.name.charAt(0)}
                </div>
                {/* Name */}
                <span style={{ fontSize: 14, fontWeight: 500, color: '#0f172a', minWidth: 100 }}>{p.name}</span>
                {/* Mode badge */}
                <span style={{
                  fontSize: 11,
                  fontWeight: 600,
                  padding: '2px 8px',
                  borderRadius: 10,
                  background: MODE_COLORS[p.mode].bg,
                  color: MODE_COLORS[p.mode].text,
                }}>
                  {p.mode}
                </span>
                {/* Section */}
                <span style={{ fontSize: 12, color: '#64748b' }}>{'§'} {p.section}</span>
                {/* Idle label */}
                {p.idle && (
                  <span style={{ fontSize: 11, color: '#94a3b8', fontStyle: 'italic' }}>idle</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </ExampleBlock>

      {/* ─── 5. Awareness State Broadcasting ──────────────────────────────── */}
      <ExampleBlock
        id="awareness-state"
        title="Awareness State Broadcasting"
        description="Each participant broadcasts their awareness state, which is merged (never overwritten) by the useAwarenessState hook. Fields include identity, role, focus, and idle status."
        code={`import { useAwarenessState } from '@connorhoehn/ui-components'

function MyEditor({ provider }) {
  const awareness = useAwarenessState(provider, {
    userId: 'user-123',
    displayName: 'Alice Smith',
    color: '#6366f1',
    mode: 'editor',
    currentSectionId: null,
  })

  // Update section focus when user scrolls
  awareness.updateSection('section-intro')

  // Switch mode
  awareness.updateMode('reviewer')

  // Reset idle manually (auto-detected via useIdleDetector)
  awareness.updateIdle(false)
}`}
      >
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 8, padding: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#475569', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Awareness State (per client)
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { key: 'userId', value: '"user-123"', color: '#4ade80' },
              { key: 'displayName', value: '"Alice Smith"', color: '#4ade80' },
              { key: 'color', value: '"#6366f1"', color: '#4ade80', swatch: '#6366f1' },
              { key: 'mode', value: '"editor"', color: '#4ade80' },
              { key: 'currentSectionId', value: '"section-intro"', color: '#4ade80' },
              { key: 'lastSeen', value: '1712345678000', color: '#fbbf24' },
              { key: 'idle', value: 'false', color: '#93c5fd' },
            ].map((field) => (
              <div key={field.key} style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'monospace', fontSize: 13 }}>
                <span style={{ color: '#7c3aed', fontWeight: 500, minWidth: 140 }}>{field.key}:</span>
                <span style={{ color: field.color }}>{field.value}</span>
                {field.swatch && (
                  <span style={{ width: 14, height: 14, borderRadius: 3, background: field.swatch, display: 'inline-block', border: '1px solid #e2e8f0' }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </ExampleBlock>

      {/* ─── 6. Y.js Integration ──────────────────────────────────────────── */}
      <ExampleBlock
        id="yjs-provider"
        title="Y.js Integration"
        description="The useYjsDoc hook manages the full lifecycle of a Y.Doc and its GatewayProvider, including subscription, snapshot application, and synced state tracking."
        code={`import { useYjsDoc } from '@connorhoehn/ui-components'

function DocumentView({ documentId, ws, onMessage }) {
  const { ydoc, provider, synced, docVersion } = useYjsDoc({
    documentId,
    ws,
    onMessage,
  })

  // synced = true after the first snapshot is applied
  // docVersion increments on Y.Doc rebuild (e.g., version restore)

  if (!synced) return <LoadingSpinner />

  return <Editor ydoc={ydoc} provider={provider} />
}`}
      >
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 8, padding: 20 }}>
          {/* Connection states */}
          <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
            {[
              { label: 'Connecting', color: '#f59e0b', bg: '#fef3c7' },
              { label: 'Synced', color: '#10b981', bg: '#dcfce7' },
              { label: 'Disconnected', color: '#ef4444', bg: '#fee2e2' },
            ].map((state) => (
              <span key={state.label} style={{
                fontSize: 12,
                fontWeight: 600,
                padding: '4px 12px',
                borderRadius: 12,
                background: state.bg,
                color: state.color,
              }}>
                {state.label}
              </span>
            ))}
          </div>
          {/* Flow diagram */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', fontFamily: 'monospace', fontSize: 12, color: '#475569' }}>
            {['Connect', 'Subscribe', 'Receive Snapshot', 'Synced', 'Stream Updates'].map((step, i) => (
              <span key={step} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{
                  padding: '4px 10px',
                  borderRadius: 4,
                  background: i === 3 ? '#dcfce7' : '#f1f5f9',
                  color: i === 3 ? '#10b981' : '#334155',
                  fontWeight: 500,
                  whiteSpace: 'nowrap',
                }}>
                  {step}
                </span>
                {i < 4 && <span style={{ color: '#94a3b8' }}>{'→'}</span>}
              </span>
            ))}
          </div>
        </div>
      </ExampleBlock>

      {/* ─── 7. useCollaborativeDoc ───────────────────────────────────────── */}
      <ExampleBlock
        id="collaborative-doc"
        title="useCollaborativeDoc"
        description="The top-level orchestration hook that composes useYjsDoc, useDocumentMetadata, useSectionList, useAwareness, and useDocumentExport into a single API surface."
        code={`import { useCollaborativeDoc } from '@connorhoehn/ui-components'

function DocumentEditor({ documentId }) {
  const {
    meta,
    sections,
    synced,
    participants,
    comments,
    sectionReviews,
    addSection,
    updateSection,
    addComment,
    reviewSection,
    awareness,
    exportJSON,
  } = useCollaborativeDoc({
    documentId,
    mode: 'editor',
    ws,
    userId: 'user-1',
    displayName: 'Alice',
    color: '#6366f1',
    onMessage,
  })

  // Add a new section
  addSection({ id: 'sec-3', type: 'tasks', title: 'Action Items', collapsed: false, items: [] })

  // Comment on a section
  addComment('sec-1', { text: 'Looks good!', userId, displayName, color })

  // Mark a section as reviewed
  reviewSection('sec-2', 'approved', 'No issues found')
}`}
      >
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 8, padding: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#475569', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Document State
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {/* Meta */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#0f172a', minWidth: 90 }}>Document:</span>
              <span style={{ fontSize: 13, color: '#475569' }}>Sprint Planning Notes</span>
              <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 10, background: '#dcfce7', color: '#10b981', fontWeight: 600 }}>synced</span>
            </div>
            {/* Sections */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#0f172a', minWidth: 90 }}>Sections:</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {['Introduction', 'Action Items', 'Decisions'].map((s) => (
                  <span key={s} style={{ fontSize: 13, color: '#475569' }}>{s}</span>
                ))}
              </div>
            </div>
            {/* Participants */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#0f172a', minWidth: 90 }}>Participants:</span>
              <div style={{ display: 'flex', gap: -4 }}>
                {['#6366f1', '#10b981', '#f59e0b'].map((c, i) => (
                  <div key={i} style={{ width: 24, height: 24, borderRadius: '50%', background: c, border: '2px solid #fff', marginLeft: i > 0 ? -6 : 0 }} />
                ))}
              </div>
            </div>
            {/* Comments */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#0f172a', minWidth: 90 }}>Comments:</span>
              <span style={{ fontSize: 13, color: '#475569' }}>4 threads</span>
            </div>
            {/* Reviews */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#0f172a', minWidth: 90 }}>Reviews:</span>
              <span style={{ fontSize: 13, color: '#475569' }}>2 sections reviewed</span>
            </div>
          </div>
        </div>
      </ExampleBlock>

      {/* ─── 8. Document Data Model ───────────────────────────────────────── */}
      <ExampleBlock
        id="document-structure"
        title="Document Data Model"
        description="The Y.js document is structured as a hierarchy of shared types. Each top-level key maps to a specific concern: metadata, sections, comments, and reviews."
        code={`// Accessing Y.js shared structures directly
const meta = ydoc.getMap('meta')       // Y.Map<DocumentMeta fields>
const sections = ydoc.getArray('sections') // Y.Array<Y.Map<Section>>
const comments = ydoc.getMap('comments')   // Y.Map<CommentThread[]>
const reviews = ydoc.getMap('sectionReviews') // Y.Map<SectionReview>

// Each section's rich-text content lives in a Y.XmlFragment:
const fragment = ydoc.getXmlFragment(\`section:\${sectionId}\`)

// Transactional updates ensure atomic changes:
ydoc.transact(() => {
  meta.set('title', 'Updated Title')
  meta.set('updatedAt', new Date().toISOString())
})`}
      >
        <div style={{ background: '#1e293b', borderRadius: 8, padding: 20, fontFamily: 'monospace', fontSize: 13, lineHeight: 1.8 }}>
          <div style={{ color: '#e2e8f0' }}>
            <span style={{ color: '#93c5fd', fontWeight: 600 }}>Y.Doc</span>
            {'\n'}
            <span style={{ color: '#64748b' }}>{'├── '}</span>
            <span style={{ color: '#c4b5fd' }}>Y.Map</span>
            <span style={{ color: '#64748b' }}>(</span>
            <span style={{ color: '#4ade80' }}>"meta"</span>
            <span style={{ color: '#64748b' }}>)</span>
            <span style={{ color: '#94a3b8' }}> {'→'} {'{'} title, description, ownerId, status, ... {'}'}</span>
            {'\n'}
            <span style={{ color: '#64748b' }}>{'├── '}</span>
            <span style={{ color: '#c4b5fd' }}>Y.Array</span>
            <span style={{ color: '#64748b' }}>(</span>
            <span style={{ color: '#4ade80' }}>"sections"</span>
            <span style={{ color: '#64748b' }}>)</span>
            <span style={{ color: '#94a3b8' }}> {'→'} [{'{'} id, title, type, items {'}'}]</span>
            {'\n'}
            <span style={{ color: '#64748b' }}>{'├── '}</span>
            <span style={{ color: '#c4b5fd' }}>Y.Map</span>
            <span style={{ color: '#64748b' }}>(</span>
            <span style={{ color: '#4ade80' }}>"comments"</span>
            <span style={{ color: '#64748b' }}>)</span>
            <span style={{ color: '#94a3b8' }}> {'→'} {'{'} [sectionId]: CommentThread[] {'}'}</span>
            {'\n'}
            <span style={{ color: '#64748b' }}>{'├── '}</span>
            <span style={{ color: '#c4b5fd' }}>Y.Map</span>
            <span style={{ color: '#64748b' }}>(</span>
            <span style={{ color: '#4ade80' }}>"sectionReviews"</span>
            <span style={{ color: '#64748b' }}>)</span>
            <span style={{ color: '#94a3b8' }}> {'→'} {'{'} [sectionId:userId]: SectionReview {'}'}</span>
            {'\n'}
            <span style={{ color: '#64748b' }}>{'└── '}</span>
            <span style={{ color: '#c4b5fd' }}>Y.XmlFragment</span>
            <span style={{ color: '#64748b' }}>(</span>
            <span style={{ color: '#4ade80' }}>"section:{'<id>'}"</span>
            <span style={{ color: '#64748b' }}>)</span>
            <span style={{ color: '#94a3b8' }}> {'→'} Rich-text content per section</span>
          </div>
        </div>
      </ExampleBlock>

      {/* ─── 9. Gateway Message Protocol ──────────────────────────────────── */}
      <ExampleBlock
        id="gateway-protocol"
        title="Gateway Message Protocol"
        description="The GatewayProvider communicates with the WebSocket gateway using a JSON message protocol. Updates are encoded as base64 Y.js binary data."
        code={`// GatewayProvider handles all message encoding/decoding internally.
// The protocol flow:

// 1. Client subscribes to a document channel
ws.sendMessage({ service: 'crdt', action: 'subscribe', channel: 'doc:abc-123' })

// 2. Server responds with the latest snapshot
// <- { type: 'crdt:snapshot', channel: 'doc:abc-123', snapshot: 'base64...' }

// 3. Server streams incremental updates
// <- { type: 'crdt:update', channel: 'doc:abc-123', update: 'base64...' }

// 4. Client publishes local edits
ws.sendMessage({ service: 'crdt', action: 'update', channel: 'doc:abc-123', update: 'base64...' })

// 5. Awareness updates (debounced at 50ms)
ws.sendMessage({ service: 'crdt', action: 'awareness', channel: 'doc:abc-123', update: 'base64...' })`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { direction: '→', label: 'Subscribe', msg: '{ service: \'crdt\', action: \'subscribe\', channel: \'doc-123\' }' },
            { direction: '←', label: 'Snapshot', msg: '{ type: \'crdt:snapshot\', channel: \'doc-123\', snapshot: \'base64...\' }' },
            { direction: '←', label: 'Update', msg: '{ type: \'crdt:update\', channel: \'doc-123\', update: \'base64...\' }' },
            { direction: '→', label: 'Publish', msg: '{ service: \'crdt\', action: \'update\', channel: \'doc-123\', update: \'base64...\' }' },
            { direction: '→', label: 'Awareness', msg: '{ service: \'crdt\', action: \'awareness\', channel: \'doc-123\', update: \'base64...\' }' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{
                fontSize: 16,
                color: item.direction === '→' ? '#3b82f6' : '#10b981',
                fontWeight: 700,
                width: 20,
                textAlign: 'center',
              }}>
                {item.direction}
              </span>
              <span style={{
                fontSize: 11,
                fontWeight: 600,
                padding: '2px 8px',
                borderRadius: 4,
                background: item.direction === '→' ? '#dbeafe' : '#dcfce7',
                color: item.direction === '→' ? '#1d4ed8' : '#047857',
                minWidth: 70,
                textAlign: 'center',
              }}>
                {item.label}
              </span>
              <code style={{
                flex: 1,
                fontSize: 12,
                fontFamily: 'monospace',
                background: '#1e293b',
                color: '#e2e8f0',
                padding: '6px 10px',
                borderRadius: 4,
                overflowX: 'auto',
                whiteSpace: 'nowrap',
              }}>
                {item.msg}
              </code>
            </div>
          ))}
        </div>
      </ExampleBlock>

      {/* ─── 10. Props Reference ──────────────────────────────────────────── */}
      <div id="props" style={{ marginBottom: 40 }}>
        <h3 style={{ fontSize: 18, fontWeight: 600, margin: '0 0 20px 0', color: '#0f172a' }}>Props Reference</h3>

        <PropsTable
          componentName="SharedTextEditor"
          props={[
            { name: 'content', type: 'string', required: true, description: 'Current HTML content from the CRDT document (Y.Text string)' },
            { name: 'applyLocalEdit', type: '(newText: string) => void', required: true, description: 'Callback to push local editor changes into the Y.js document' },
            { name: 'hasConflict', type: 'boolean', default: 'false', description: 'Whether a remote merge conflict has been detected' },
            { name: 'onDismissConflict', type: '() => void', description: 'Callback to dismiss the merge conflict banner' },
            { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables editing (e.g., when disconnected)' },
          ]}
        />

        <PropsTable
          componentName="useYjsDoc Return"
          props={[
            { name: 'ydoc', type: 'Y.Doc | null', required: true, description: 'The shared Y.js document instance (null before initialization)' },
            { name: 'provider', type: 'GatewayProvider | null', required: true, description: 'The gateway provider bridging Y.js to the WebSocket transport' },
            { name: 'synced', type: 'boolean', required: true, description: 'True after the first snapshot has been applied from the server' },
            { name: 'docVersion', type: 'number', required: true, description: 'Increments on Y.Doc rebuild (initial mount = 0). Useful as a dependency for sibling hooks.' },
          ]}
        />

        <PropsTable
          componentName="useCollaborativeDoc Return"
          props={[
            { name: 'meta', type: 'DocumentMeta | null', required: true, description: 'Document metadata (title, owner, status, timestamps)' },
            { name: 'sections', type: 'Section[]', required: true, description: 'Ordered list of document sections with items' },
            { name: 'synced', type: 'boolean', required: true, description: 'Whether the Y.Doc has received its initial snapshot' },
            { name: 'participants', type: 'Participant[]', required: true, description: 'List of remote participants (excluding self) with awareness state' },
            { name: 'comments', type: 'Record<string, CommentThread[]>', required: true, description: 'Comment threads indexed by section ID' },
            { name: 'addSection', type: '(section: Section) => void', required: true, description: 'Append a new section to the document' },
            { name: 'updateSection', type: '(id: string, partial: Partial<Section>) => void', required: true, description: 'Partially update a section by ID' },
            { name: 'addComment', type: '(sectionId: string, opts: CommentOpts) => void', required: true, description: 'Add a comment or reply to a section thread' },
            { name: 'reviewSection', type: '(sectionId: string, status, comment?) => void', required: true, description: 'Submit a review status (approved/changes-requested) for a section' },
            { name: 'sectionReviews', type: 'Record<string, SectionReview[]>', required: true, description: 'Review records indexed by section ID' },
            { name: 'awareness', type: 'AwarenessUpdaters', required: true, description: 'Functions to update local awareness state (section, mode, idle)' },
          ]}
        />

        <PropsTable
          componentName="Participant"
          props={[
            { name: 'clientId', type: 'string', required: true, description: 'Unique Y.js client identifier for this connection' },
            { name: 'userId', type: 'string', required: true, description: 'Application-level user ID' },
            { name: 'displayName', type: 'string', required: true, description: 'Human-readable name shown in the UI' },
            { name: 'color', type: 'string', required: true, description: 'Hex color assigned to this participant for avatars and cursors' },
            { name: 'mode', type: "'editor' | 'reviewer' | 'reader'", required: true, description: 'Current interaction mode determining permissions' },
            { name: 'currentSectionId', type: 'string | null', required: true, description: 'ID of the section the participant is currently focused on' },
            { name: 'lastSeen', type: 'number', description: 'Unix ms timestamp of last activity (used for idle detection)' },
            { name: 'idle', type: 'boolean', default: 'false', description: 'True when the user has been inactive for 2+ minutes' },
          ]}
        />
      </div>
    </div>
  );
}
