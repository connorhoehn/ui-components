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
      <h1 className="text-[28px] font-bold mb-2 text-text-primary">
        Quick Start
      </h1>
      <p className="text-[15px] text-text-secondary mb-8 leading-[1.6]">
        Get a component rendering in under 5 minutes.
      </p>

      <h2 className="text-[18px] font-semibold mb-3 text-text-primary">
        Minimal example
      </h2>
      <p className="text-[14px] text-text-secondary mb-3">
        Import a component and render it inside your app:
      </p>
      <pre style={codeBlockStyle}>
{`import { Button } from '@connorhoehnslalom/ui-components';

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

      <h2 className="text-[18px] font-semibold mb-3 text-text-primary">
        With providers (for real-time features)
      </h2>
      <p className="text-[14px] text-text-secondary mb-3">
        To use collaboration hooks, wrap your app in the required context providers:
      </p>
      <pre style={codeBlockStyle}>
{`import { WebSocketProvider } from '@connorhoehnslalom/ui-components';
import { IdentityProvider } from '@connorhoehnslalom/ui-components';
import { PresenceProvider } from '@connorhoehnslalom/ui-components';

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

      <h2 className="text-[18px] font-semibold mb-3 text-text-primary">
        Using hooks
      </h2>
      <pre style={codeBlockStyle}>
{`import { usePresence, useChat } from '@connorhoehnslalom/ui-components';

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

      <div className="p-4 bg-info-bg border border-info-border rounded-lg text-[14px] text-info-fg leading-[1.5]">
        <strong>Next step:</strong> Explore the Components section in the sidebar to see interactive examples
        of every available component.
      </div>
    </div>
  );
}
