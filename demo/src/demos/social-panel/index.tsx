import { SimulatedProvider } from '../../engine/SimulatedProvider';
import { socialActivityTimeline } from './simulation';
import { ChatMessages } from './ChatMessages';
import { RoomListPanel } from './RoomListPanel';

export default function SocialPanelDemo() {
  return (
    <SimulatedProvider timeline={socialActivityTimeline} autoPlay>
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-[20px] font-semibold mb-2 text-[#1a1a2e]">
            Social &amp; Chat
          </h2>
          <p className="text-neutral text-[14px]">
            Chat rooms, typing indicators, reactions, and user presence — all driven by simulated
            real-time events.
          </p>
        </div>
        <div className="flex gap-4 h-125">
          <RoomListPanel />
          <ChatMessages />
        </div>
      </div>
    </SimulatedProvider>
  );
}
