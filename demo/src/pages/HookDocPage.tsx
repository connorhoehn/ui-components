import { useParams } from 'react-router';
import { navigationTree } from '../navigation';

const hookDescriptions: Record<string, string> = {
  useWebSocket: 'Manages a WebSocket connection with automatic reconnection, heartbeat, and channel switching.',
  useActivityBus: 'Event bus for broadcasting and subscribing to cross-component activity events.',
  useApiCall: 'Wrapper around fetch with loading state, error handling, and automatic retries.',
  useApiHealth: 'Monitors API endpoint health with configurable polling intervals.',
  usePresence: 'Tracks online users in the current session, including their status and metadata.',
  useCursors: 'Shares and renders real-time cursor positions across connected clients.',
  useChat: 'Full chat functionality with message history, sending, and real-time updates.',
  useReactions: 'Emoji reaction system for messages or content items.',
  useDocuments: 'CRUD operations for documents with optimistic updates and conflict detection.',
  useCollaborativeDoc: 'Real-time collaborative text editing with operational transforms.',
  useDocumentComments: 'Threaded comments anchored to document positions.',
  useClickOutside: 'Detects clicks outside a referenced element for closing dropdowns/modals.',
  useKeyboardShortcuts: 'Registers and manages keyboard shortcuts with conflict resolution.',
  useIdleDetector: 'Detects user inactivity after a configurable timeout period.',
};

export default function HookDocPage() {
  const { hookName } = useParams();

  const description = hookName ? hookDescriptions[hookName] : undefined;

  // Find which group this hook belongs to (within Reference)
  const referenceSection = navigationTree.find(s => s.id === 'reference');
  let groupLabel = '';
  if (referenceSection && hookName) {
    for (const group of referenceSection.groups) {
      if (group.items.some(item => item.path === `/hooks/${hookName}`)) {
        groupLabel = group.label.replace(/^Hooks\s+[—-]\s+/, '');
        break;
      }
    }
  }

  return (
    <div>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8, color: '#0f172a', fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace' }}>
        {hookName}
      </h1>
      {groupLabel && (
        <span style={{
          display: 'inline-block',
          fontSize: 12,
          fontWeight: 500,
          color: '#6366f1',
          background: '#eef2ff',
          padding: '3px 10px',
          borderRadius: 12,
          marginBottom: 16,
        }}>
          {groupLabel}
        </span>
      )}
      <p style={{ fontSize: 15, color: '#475569', marginBottom: 32, lineHeight: 1.6, maxWidth: 640 }}>
        {description || `Documentation for ${hookName}.`}
      </p>

      <div style={{
        padding: 20,
        background: '#f8fafc',
        border: '1px solid #e2e8f0',
        borderRadius: 8,
        marginBottom: 24,
      }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#0f172a' }}>Usage</h3>
        <pre style={{
          background: '#1e293b',
          color: '#e2e8f0',
          padding: '14px 18px',
          borderRadius: 6,
          fontSize: 13,
          fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
          overflow: 'auto',
          margin: 0,
        }}>
{`import { ${hookName} } from '@connorhoehn/ui-components';

function MyComponent() {
  const result = ${hookName}();
  return <div>{/* use result */}</div>;
}`}
        </pre>
      </div>

      <div style={{
        padding: 16,
        background: '#fffbeb',
        border: '1px solid #fde68a',
        borderRadius: 8,
        fontSize: 13,
        color: '#92400e',
        lineHeight: 1.5,
      }}>
        Full API reference and interactive examples coming soon.
      </div>
    </div>
  );
}
