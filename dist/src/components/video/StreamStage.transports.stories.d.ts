import type { Meta, StoryObj } from '@storybook/react-vite';
import { StreamStage } from './StreamStage';
declare const meta: Meta<typeof StreamStage>;
export default meta;
type Story = StoryObj<typeof StreamStage>;
/**
 * NEAR-REALTIME. The stage takes an HLS playlist URL — typically from
 * `useLVSLiveHls`. This is the one to reach for when an audience watches.
 * (The URL here is fake, so the stage shows its playback error, which is
 * itself the point: an unplayable stream says so instead of sitting black.)
 */
export declare const NearRealtimeHls: Story;
/**
 * REALTIME. The stage takes a MediaStream — from `useLVSSubscriber`. Same
 * chrome exactly; the difference is latency and what it costs to serve.
 */
export declare const RealtimeWhep: Story;
/** No channel yet — the normal state before a broadcast starts. */
export declare const BeforeItStarts: Story;
/** Both given: `stream` wins, because it is the lower-latency source. */
export declare const BothGivenRealtimeWins: Story;
//# sourceMappingURL=StreamStage.transports.stories.d.ts.map