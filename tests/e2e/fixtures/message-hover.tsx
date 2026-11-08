import '@connorhoehn/ui-components/styles.css';
import '/Users/connorhoehn/Projects/aws-agentcore/portal/src/app.css';
import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ChatPanel } from '@connorhoehn/ui-components/social';
import type { ChatMessage } from '../../../src/hooks/useChat';

const messages: ChatMessage[] = [
  { id: 'received-first', clientId: 'remote', userId: 'other', displayName: 'Carol Johnson', content: 'Please review the updated notes.', timestamp: '2026-10-10T14:00:00Z' },
  { id: 'sent', clientId: 'local', userId: 'self', displayName: 'Nora DaSilva', content: 'The notes are ready for review.', timestamp: '2026-10-10T14:03:00Z' },
  { id: 'sent-continued', clientId: 'local', userId: 'self', displayName: 'Nora DaSilva', content: 'I included the current dependency map.', timestamp: '2026-10-10T14:03:20Z' },
  { id: 'received-long', clientId: 'remote-2', userId: 'other-2', displayName: 'Very long participant display name for narrow pane wrapping', content: 'Thanks for the context.', timestamp: '2026-10-10T14:04:00Z' },
];
const params = new URLSearchParams(location.search);
document.documentElement.dataset.tenant = 'orgiq';
document.documentElement.dataset.theme = params.get('theme') ?? 'light';
function Fixture() {
  const [receipt, setReceipt] = useState('');
  return <div className="h-dvh bg-surface text-text-primary p-2 flex flex-col">
    <button data-testid="keyboard-start" className="shrink-0" onClick={() => undefined}>Start keyboard</button>
    <section aria-label="Inert native message fixture" data-testid="fixture-panel" className="min-h-0 flex-1 border border-border">
      <ChatPanel messages={messages} fill showHeader={false} currentUserId="self" onSend={() => undefined}
        composer={<div className="p-2">Inert composer — sends disabled</div>}
        onToggleReaction={(id, emoji) => setReceipt(`${id}:${emoji}`)} onReply={(m) => setReceipt(`reply:${m.id}`)}
        onForwardMessage={(m) => setReceipt(`forward:${m.id}`)} onCopyLink={(m) => setReceipt(`copy:${m.id}`)}
        onTogglePin={(m) => setReceipt(`pin:${m.id}`)} onEditMessage={() => undefined} onDeleteMessage={() => undefined} />
    </section>
    <output data-testid="fixture-receipt" className="shrink-0">{receipt}</output>
  </div>;
}
createRoot(document.getElementById('root')!).render(<StrictMode><Fixture /></StrictMode>);
