const codeBlockStyle: React.CSSProperties = {
  background: '#1e293b',
  color: '#e2e8f0',
  padding: '16px 20px',
  borderRadius: 8,
  fontSize: 13,
  fontFamily: 'ui-monospace, "SF Mono", "Cascadia Code", Menlo, monospace',
  overflowX: 'auto',
  lineHeight: 1.6,
  marginBottom: 24,
};

export default function QuickStartPage() {
  return (
    <div>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8, color: '#0f172a' }}>
        Quick Start
      </h1>
      <p style={{ fontSize: 15, color: '#475569', marginBottom: 32, lineHeight: 1.6 }}>
        Get a component rendering in under 5 minutes.
      </p>

      <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12, color: '#0f172a' }}>
        Minimal example
      </h2>
      <p style={{ fontSize: 14, color: '#475569', marginBottom: 12 }}>
        Import a component and render it inside your app:
      </p>
      <pre style={codeBlockStyle}>
{`import { Button } from '@connorhoehn/ui-components';

function App() {
  return (
    <div style={{ padding: 40 }}>
      <Button variant="primary" onClick={() => alert('Clicked!')}>
        Hello World
      </Button>
    </div>
  );
}`}
      </pre>

      <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12, color: '#0f172a' }}>
        With providers (for real-time features)
      </h2>
      <p style={{ fontSize: 14, color: '#475569', marginBottom: 12 }}>
        To use collaboration hooks, wrap your app in the required context providers:
      </p>
      <pre style={codeBlockStyle}>
{`import { WebSocketProvider } from '@connorhoehn/ui-components';
import { IdentityProvider } from '@connorhoehn/ui-components';
import { PresenceProvider } from '@connorhoehn/ui-components';

function App() {
  return (
    <WebSocketProvider url="wss://your-server.com/ws">
      <IdentityProvider>
        <PresenceProvider>
          <YourApp />
        </PresenceProvider>
      </IdentityProvider>
    </WebSocketProvider>
  );
}`}
      </pre>

      <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12, color: '#0f172a' }}>
        Using hooks
      </h2>
      <pre style={codeBlockStyle}>
{`import { usePresence, useChat } from '@connorhoehn/ui-components';

function CollabPanel() {
  const { presenceUsers } = usePresence();
  const { messages, sendMessage } = useChat();

  return (
    <div>
      <p>{presenceUsers.length} users online</p>
      <ul>
        {messages.map(m => <li key={m.id}>{m.text}</li>)}
      </ul>
      <button onClick={() => sendMessage('Hello!')}>
        Send
      </button>
    </div>
  );
}`}
      </pre>

      <div style={{
        padding: 16,
        background: '#eff6ff',
        border: '1px solid #bfdbfe',
        borderRadius: 8,
        fontSize: 14,
        color: '#1e40af',
        lineHeight: 1.5,
      }}>
        <strong>Next step:</strong> Explore the Components section in the sidebar to see interactive examples
        of every available component.
      </div>
    </div>
  );
}
