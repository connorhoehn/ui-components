import {
  Avatar,
  AvatarGroup,
  Chip,
  TONE_BG,
  TONE_BORDER,
  toneVar,
  type Tone,
} from '@connorhoehnslalom/ui-components/shared';
import type { ChipTone } from '@connorhoehnslalom/ui-components/shared';
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

// Tinted with the semantic tone scale rather than a private hex palette —
// the same four-role tokens every library surface uses.
const LAYERS = [
  { label: 'SharedTextEditor', sublabel: 'UI Component', tone: 'info' as Tone },
  { label: 'useCollaborativeDoc', sublabel: 'Orchestration hook', tone: 'accent' as Tone },
  { label: 'useYjsDoc + GatewayProvider', sublabel: 'Y.js lifecycle', tone: 'success' as Tone },
  { label: 'WebSocket Gateway', sublabel: 'Transport', tone: 'warning' as Tone },
];

/* ─── Participant mock data ───────────────────────────────────────────── */

const PARTICIPANTS = [
  { name: 'Alice Smith', color: '#6366f1', mode: 'editor' as const, section: 'Introduction', idle: false },
  { name: 'Bob Chen', color: '#10b981', mode: 'reviewer' as const, section: 'Action Items', idle: false },
  { name: 'Carol Davis', color: '#f59e0b', mode: 'reader' as const, section: 'Summary', idle: true },
];

// Participant modes map onto the library tone scale — no local palette.
const MODE_TONE: Record<string, ChipTone> = {
  editor: 'info',
  reviewer: 'accent',
  reader: 'neutral',
};

/* ─── Page ────────────────────────────────────────────────────────────── */

export default function RealTimeEditingPage() {
  useRegisterToc(tocItems);

  return (
    <div>
      <PageHeader
        title="Real-time Editing"
        description="CRDT-powered collaborative document editing with Y.js. Conflict-free real-time sync, awareness state for participant tracking, and rich-text collaboration with automatic merge resolution."
        importPath="import { SharedTextEditor, useCollaborativeDoc, useYjsDoc } from '@connorhoehnslalom/ui-components'"
      />

      {/* ─── 1. Architecture Overview ─────────────────────────────────────── */}
      <ExampleBlock
        id="overview"
        title="Architecture Overview"
        description="The CRDT system is layered into focused responsibilities. Each layer handles a single concern and delegates to the layer below."
        code={`import { SharedTextEditor } from '@connorhoehnslalom/ui-components'
import { useCollaborativeDoc } from '@connorhoehnslalom/ui-components'
import { useYjsDoc } from '@connorhoehnslalom/ui-components'
import { GatewayProvider } from '@connorhoehnslalom/ui-components'

// Layer stack:
// SharedTextEditor    — Rich-text UI (contentEditable)
// useCollaborativeDoc — Orchestrates meta, sections, awareness, comments
// useYjsDoc           — Y.Doc lifecycle, WS subscribe/unsubscribe
// GatewayProvider     — Bridges Y.js updates to gateway messages
// WebSocket Gateway   — Transport layer (binary updates over JSON)`}
      >
        <div className="flex flex-col items-center gap-0">
          {LAYERS.map((layer, i) => (
            <div className="flex flex-col items-center" key={layer.label}>
              {i > 0 && (
                <div className="text-[20px] text-text-tertiary leading-[28px] select-none">
                  ↕
                </div>
              )}
              <div
                className={`${TONE_BG[layer.tone]} border ${TONE_BORDER[layer.tone]} rounded-[10px] py-3 px-7 min-w-70 text-center`}
              >
                <div className="font-semibold text-[14px] text-text-primary">{layer.label}</div>
                <div className="text-[12px] text-text-secondary mt-[2px]">{layer.sublabel}</div>
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
        code={`import { SharedTextEditor } from '@connorhoehnslalom/ui-components'
import { useCRDT } from '@connorhoehnslalom/ui-components'

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
        <div className="border border-border rounded-lg overflow-hidden">
          {/* Toolbar */}
          <div className="flex gap-1 flex-wrap py-2 px-3 bg-surface-panel border-b border-border items-center">
            {[
              { label: 'B', style: { fontWeight: 700 } },
              { label: 'I', style: { fontStyle: 'italic' } },
              { label: 'U', style: { textDecoration: 'underline' } },
              { label: 'S', className: 'line-through' },
              { label: '<>', className: 'font-mono text-[11px]' },
            ].map((btn, i) => (
              <div
                key={i}
                className={`w-7 h-7 flex items-center justify-center border border-border-field rounded bg-surface text-[13px] cursor-pointer ${btn.className ?? ''}`}
              >
                {btn.label}
              </div>
            ))}
            <div className="w-[1px] h-5 bg-border my-0 mx-1" />
            <div className="text-[12px] border border-border-field rounded py-1 px-2 bg-surface text-[#374151]">
              Paragraph ▾
            </div>
          </div>
          {/* Content area */}
          <div className="py-4 px-5 min-h-45 bg-surface text-[14px] leading-[1.7] text-[#1e293b]">
            <h3 className="mt-0 mr-0 mb-2 ml-0 text-[18px] font-semibold">Meeting Notes</h3>
            <p className="mt-0 mr-0 mb-2 ml-0">
              <strong>Date:</strong> May 7, 2026 — Sprint planning session
            </p>
            <p className="mt-0 mr-0 mb-3 ml-0 text-text-secondary">
              Discussed the migration timeline and agreed on the phased approach for the new CRDT backend integration.
            </p>
            <ul className="m-0 pl-5">
              <li className="mb-1">Finalize API contract by Friday</li>
              <li className="mb-1">Set up staging environment for load testing</li>
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
        code={`import { useCRDT } from '@connorhoehnslalom/ui-components'

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
        <div className="border border-border rounded-lg overflow-hidden">
          {/* Toolbar (compact) */}
          <div className="flex gap-1 py-2 px-3 bg-surface-panel border-b border-border">
            {['B', 'I', 'U'].map((l) => (
              <div className={`w-7 h-7 flex items-center justify-center border border-border-field rounded bg-surface text-[13px] ${l === 'B' ? 'font-bold' : 'font-normal'}`} key={l}>
                {l}
              </div>
            ))}
          </div>
          {/* Conflict banner */}
          <div className="flex items-center justify-between py-[10px] px-[14px] bg-[#fefce8] border border-warning-border border-l-0 border-r-0 text-[13px] text-[#92400e]">
            <span>⚠ Edits merged — your changes are preserved</span>
            <div className="w-[22px] h-[22px] flex items-center justify-center rounded cursor-pointer text-[14px] text-[#92400e] font-semibold">
              ✕
            </div>
          </div>
          {/* Content area */}
          <div className="py-4 px-5 min-h-30 bg-surface text-[14px] leading-[1.7] text-[#1e293b]">
            <p className="m-0">Both users edited the introduction paragraph simultaneously. Y.js merged both changes — no data was lost.</p>
          </div>
        </div>
      </ExampleBlock>

      {/* ─── 4. Participant Awareness ─────────────────────────────────────── */}
      <ExampleBlock
        id="awareness"
        title="Participant Awareness"
        description="Real-time presence tracking shows who is viewing the document, which section they are focused on, their role, and idle status."
        code={`import { useAwareness } from '@connorhoehnslalom/ui-components'

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
        <div className="bg-surface border border-border rounded-lg p-5">
          <div className="text-[14px] font-semibold text-text-primary mb-4">
            3 participants
          </div>
          <div className="flex flex-col gap-3">
            {PARTICIPANTS.map((p) => (
              <div className={`flex items-center gap-[10px] ${p.idle ? 'opacity-50' : 'opacity-100'}`}
                key={p.name}
              >
                {/* Avatar */}
                <Avatar
                  name={p.name}
                  initials={p.name.charAt(0)}
                  color={p.color}
                  size={28}
                />
                {/* Name */}
                <span className="text-[14px] font-medium text-text-primary min-w-25">{p.name}</span>
                {/* Mode badge */}
                <Chip tone={MODE_TONE[p.mode] ?? 'neutral'}>{p.mode}</Chip>
                {/* Section */}
                <span className="text-[12px] text-neutral">{'§'} {p.section}</span>
                {/* Idle label */}
                {p.idle && (
                  <span className="text-[11px] text-text-tertiary italic">idle</span>
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
        code={`import { useAwarenessState } from '@connorhoehnslalom/ui-components'

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
        <div className="bg-surface border border-border rounded-lg p-5">
          <div className="text-[13px] font-semibold text-text-secondary mb-3 uppercase tracking-[0.05em]">
            Awareness State (per client)
          </div>
          <div className="flex flex-col gap-2">
            {[
              { key: 'userId', value: '"user-123"', tone: 'success' as Tone },
              { key: 'displayName', value: '"Alice Smith"', tone: 'success' as Tone },
              { key: 'color', value: '"#6366f1"', tone: 'success' as Tone, swatch: '#6366f1' },
              { key: 'mode', value: '"editor"', tone: 'success' as Tone },
              { key: 'currentSectionId', value: '"section-intro"', tone: 'success' as Tone },
              { key: 'lastSeen', value: '1712345678000', tone: 'warning' as Tone },
              { key: 'idle', value: 'false', tone: 'info' as Tone },
            ].map((field) => (
              <div className="flex items-center gap-2 font-mono text-[13px]" key={field.key}>
                <span className="text-[#7c3aed] font-medium min-w-35">{field.key}:</span>
                <span style={{ color: toneVar(field.tone) }}>{field.value}</span>
                {field.swatch && (
                  <span className="w-3.5 h-3.5 rounded-[3px] inline-block border border-border" style={{ background: field.swatch }} />
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
        code={`import { useYjsDoc } from '@connorhoehnslalom/ui-components'

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
        <div className="bg-surface border border-border rounded-lg p-5">
          {/* Connection states */}
          <div className="flex gap-3 mb-5 flex-wrap">
            {([
              { label: 'Connecting', tone: 'warning' },
              { label: 'Synced', tone: 'success' },
              { label: 'Disconnected', tone: 'danger' },
            ] as const).map((state) => (
              <Chip key={state.label} tone={state.tone}>
                {state.label}
              </Chip>
            ))}
          </div>
          {/* Flow diagram */}
          <div className="flex items-center gap-2 flex-wrap font-mono text-[12px] text-text-secondary">
            {['Connect', 'Subscribe', 'Receive Snapshot', 'Synced', 'Stream Updates'].map((step, i) => (
              <span className="flex items-center gap-2" key={step}>
                <span className={`py-1 px-[10px] rounded font-medium whitespace-nowrap ${i === 3 ? 'bg-[#dcfce7] text-[#10b981]' : 'bg-surface-hover text-[#334155]'}`}>
                  {step}
                </span>
                {i < 4 && <span className="text-text-tertiary">{'→'}</span>}
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
        code={`import { useCollaborativeDoc } from '@connorhoehnslalom/ui-components'

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
        <div className="bg-surface border border-border rounded-lg p-5">
          <div className="text-[13px] font-semibold text-text-secondary mb-4 uppercase tracking-[0.05em]">
            Document State
          </div>
          <div className="flex flex-col gap-[14px]">
            {/* Meta */}
            <div className="flex items-center gap-[10px]">
              <span className="text-[13px] font-semibold text-text-primary min-w-[90px]">Document:</span>
              <span className="text-[13px] text-text-secondary">Sprint Planning Notes</span>
              <span className="text-[11px] py-[2px] px-2 rounded-[10px] bg-[#dcfce7] text-[#10b981] font-semibold">synced</span>
            </div>
            {/* Sections */}
            <div className="flex items-start gap-[10px]">
              <span className="text-[13px] font-semibold text-text-primary min-w-[90px]">Sections:</span>
              <div className="flex flex-col gap-1">
                {['Introduction', 'Action Items', 'Decisions'].map((s) => (
                  <span className="text-[13px] text-text-secondary" key={s}>{s}</span>
                ))}
              </div>
            </div>
            {/* Participants */}
            <div className="flex items-center gap-[10px]">
              <span className="text-[13px] font-semibold text-text-primary min-w-[90px]">Participants:</span>
              <AvatarGroup
                size={24}
                items={[
                  { name: 'A', initials: '', color: '#6366f1' },
                  { name: 'B', initials: '', color: '#10b981' },
                  { name: 'C', initials: '', color: '#f59e0b' },
                ]}
              />
            </div>
            {/* Comments */}
            <div className="flex items-center gap-[10px]">
              <span className="text-[13px] font-semibold text-text-primary min-w-[90px]">Comments:</span>
              <span className="text-[13px] text-text-secondary">4 threads</span>
            </div>
            {/* Reviews */}
            <div className="flex items-center gap-[10px]">
              <span className="text-[13px] font-semibold text-text-primary min-w-[90px]">Reviews:</span>
              <span className="text-[13px] text-text-secondary">2 sections reviewed</span>
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
        <div className="bg-[#1e293b] rounded-lg p-5 font-mono text-[13px] leading-[1.8]">
          <div className="text-border">
            <span className="text-[#93c5fd] font-semibold">Y.Doc</span>
            {'\n'}
            <span className="text-neutral">{'├── '}</span>
            <span className="text-[#c4b5fd]">Y.Map</span>
            <span className="text-neutral">(</span>
            <span className="text-[#4ade80]">"meta"</span>
            <span className="text-neutral">)</span>
            <span className="text-text-tertiary"> {'→'} {'{'} title, description, ownerId, status, ... {'}'}</span>
            {'\n'}
            <span className="text-neutral">{'├── '}</span>
            <span className="text-[#c4b5fd]">Y.Array</span>
            <span className="text-neutral">(</span>
            <span className="text-[#4ade80]">"sections"</span>
            <span className="text-neutral">)</span>
            <span className="text-text-tertiary"> {'→'} [{'{'} id, title, type, items {'}'}]</span>
            {'\n'}
            <span className="text-neutral">{'├── '}</span>
            <span className="text-[#c4b5fd]">Y.Map</span>
            <span className="text-neutral">(</span>
            <span className="text-[#4ade80]">"comments"</span>
            <span className="text-neutral">)</span>
            <span className="text-text-tertiary"> {'→'} {'{'} [sectionId]: CommentThread[] {'}'}</span>
            {'\n'}
            <span className="text-neutral">{'├── '}</span>
            <span className="text-[#c4b5fd]">Y.Map</span>
            <span className="text-neutral">(</span>
            <span className="text-[#4ade80]">"sectionReviews"</span>
            <span className="text-neutral">)</span>
            <span className="text-text-tertiary"> {'→'} {'{'} [sectionId:userId]: SectionReview {'}'}</span>
            {'\n'}
            <span className="text-neutral">{'└── '}</span>
            <span className="text-[#c4b5fd]">Y.XmlFragment</span>
            <span className="text-neutral">(</span>
            <span className="text-[#4ade80]">"section:{'<id>'}"</span>
            <span className="text-neutral">)</span>
            <span className="text-text-tertiary"> {'→'} Rich-text content per section</span>
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
        <div className="flex flex-col gap-[10px]">
          {[
            { direction: '→', label: 'Subscribe', msg: '{ service: \'crdt\', action: \'subscribe\', channel: \'doc-123\' }' },
            { direction: '←', label: 'Snapshot', msg: '{ type: \'crdt:snapshot\', channel: \'doc-123\', snapshot: \'base64...\' }' },
            { direction: '←', label: 'Update', msg: '{ type: \'crdt:update\', channel: \'doc-123\', update: \'base64...\' }' },
            { direction: '→', label: 'Publish', msg: '{ service: \'crdt\', action: \'update\', channel: \'doc-123\', update: \'base64...\' }' },
            { direction: '→', label: 'Awareness', msg: '{ service: \'crdt\', action: \'awareness\', channel: \'doc-123\', update: \'base64...\' }' },
          ].map((item, i) => (
            <div className="flex items-center gap-[10px]" key={i}>
              <span className={`text-[16px] font-bold w-5 text-center ${item.direction === '→' ? 'text-[#3b82f6]' : 'text-[#10b981]'}`}>
                {item.direction}
              </span>
              <span className={`text-[11px] font-semibold py-[2px] px-2 rounded min-w-[70px] text-center ${item.direction === '→' ? 'bg-[#dbeafe] text-[#1d4ed8]' : 'bg-[#dcfce7] text-[#047857]'}`}>
                {item.label}
              </span>
              <code className="flex-[1] text-[12px] font-mono bg-[#1e293b] text-border py-[6px] px-[10px] rounded overflow-x-auto whitespace-nowrap">
                {item.msg}
              </code>
            </div>
          ))}
        </div>
      </ExampleBlock>

      {/* ─── 10. Props Reference ──────────────────────────────────────────── */}
      <div className="mb-10" id="props">
        <h3 className="text-[18px] font-semibold mt-0 mr-0 mb-5 ml-0 text-text-primary">Props Reference</h3>

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
