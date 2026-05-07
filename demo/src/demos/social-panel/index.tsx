import { SimulatedProvider } from '../../engine/SimulatedProvider';
import { socialActivityTimeline } from './simulation';
import { ChatMessages } from './ChatMessages';
import { RoomListPanel } from './RoomListPanel';

export default function SocialPanelDemo() {
  return (
    <SimulatedProvider timeline={socialActivityTimeline} autoPlay>
      <div style={{ padding: 24 }}>
        <div style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8, color: '#1a1a2e' }}>
            Social &amp; Chat
          </h2>
          <p style={{ color: '#64748b', fontSize: 14 }}>
            Chat rooms, typing indicators, reactions, and user presence — all driven by simulated
            real-time events.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 16, height: 500 }}>
          <RoomListPanel />
          <ChatMessages />
        </div>
      </div>
    </SimulatedProvider>
  );
}
