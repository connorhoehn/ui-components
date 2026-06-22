# Simulations

The demo application includes a simulation engine that replays WebSocket events on a timeline. This lets you build interactive demos, test real-time UI behavior, and develop new features without a live backend.

## Prerequisites

- The demo app (`npm run demo`)
- Understanding of the [WebSocket Provider](./websocket-provider.md) pattern

## Core Concept

`SimulatedProvider` replaces the real WebSocket connection with a mock that dispatches pre-recorded events on a timer. Components cannot tell the difference — they receive messages through the same `onMessage` subscription API.

```
SimulationTimeline → useEventSimulator → dispatch → subscribersRef → onMessage handlers
```

## SimulationTimeline and SimulationEvent

```tsx
interface SimulationEvent {
  delay: number;                    // ms after previous event (or from start if first)
  message: Record<string, unknown>; // The gateway message payload
  description?: string;             // Human-readable label for the controls UI
}

interface SimulationTimeline {
  id: string;
  name: string;
  description: string;
  loop?: boolean;         // restart from beginning when done
  events: SimulationEvent[];
}
```

## SimulationControls

The `useEventSimulator` hook returns a controls object:

```tsx
type SimulationState = 'idle' | 'playing' | 'paused';

interface SimulationControls {
  state: SimulationState;
  speed: number;              // 1 = normal, 2 = 2x, 0.5 = half speed
  currentEventIndex: number;
  totalEvents: number;
  play: () => void;
  pause: () => void;
  reset: () => void;
  setSpeed: (speed: number) => void;
  stepForward: () => void;    // advance one event manually
}
```

## Using SimulatedProvider

Wrap your component tree in `SimulatedProvider` instead of the real providers:

```tsx
import { SimulatedProvider } from '../engine/SimulatedProvider';
import type { SimulationTimeline } from '../engine/types';

const myTimeline: SimulationTimeline = {
  id: 'chat-demo',
  name: 'Chat Demo',
  description: 'Simulates a multi-user chat conversation',
  events: [
    {
      delay: 1000,
      message: { type: 'chat', action: 'sent', content: 'Hello!', sender: 'Alice' },
      description: 'Alice sends greeting',
    },
    {
      delay: 2000,
      message: { type: 'chat', action: 'sent', content: 'Hi Alice!', sender: 'Bob' },
      description: 'Bob responds',
    },
    {
      delay: 1500,
      message: { type: 'presence', action: 'joined', clientId: 'client-003', metadata: { displayName: 'Charlie' } },
      description: 'Charlie joins the channel',
    },
  ],
};

function ChatDemo() {
  return (
    <SimulatedProvider timeline={myTimeline} autoPlay>
      <ChatPanel />
    </SimulatedProvider>
  );
}
```

`SimulatedProvider` automatically sets up:
- `WebSocketProvider` with a mock connection (always `'connected'`)
- `IdentityProvider` with a demo user identity
- `PresenceProvider` with simulated online users
- `SimulationControlsPanel` overlay (when timeline has events)

## SimulatedProvider Props

```tsx
interface SimulatedProviderProps {
  children: ReactNode;
  timeline?: SimulationTimeline;  // undefined = no events, just mock providers
  autoPlay?: boolean;             // start playing on mount (default: false)
}
```

## Using useEventSimulator Directly

For custom control over simulation playback without the full provider wrapper:

```tsx
import { useEventSimulator } from '../engine/EventSimulator';
import type { SimulationTimeline, SimulationControls } from '../engine/types';

function CustomSimulation() {
  const dispatch = useCallback((message: Record<string, unknown>) => {
    // Handle the dispatched event however you like
    console.log('Event fired:', message);
  }, []);

  const controls: SimulationControls = useEventSimulator(timeline, dispatch);

  return (
    <div>
      <p>State: {controls.state}</p>
      <p>Progress: {controls.currentEventIndex} / {controls.totalEvents}</p>
      <button onClick={controls.play}>Play</button>
      <button onClick={controls.pause}>Pause</button>
      <button onClick={controls.stepForward}>Step</button>
      <button onClick={controls.reset}>Reset</button>
      <input
        type="range"
        min={0.25}
        max={4}
        step={0.25}
        value={controls.speed}
        onChange={(e) => controls.setSpeed(Number(e.target.value))}
      />
    </div>
  );
}
```

## Speed Control

The simulation engine divides each event's `delay` by the current `speed` value:

- `speed: 1` — real-time playback
- `speed: 2` — events fire at 2x speed (delays halved)
- `speed: 0.5` — slow-motion (delays doubled)

```tsx
controls.setSpeed(2);   // 2x speed
controls.setSpeed(0.5); // half speed
```

## Step-Forward

Manually advance one event at a time (useful for debugging or guided walkthroughs):

```tsx
controls.pause();        // pause if playing
controls.stepForward();  // fire the next event immediately
```

## Looping Timelines

Set `loop: true` on the timeline to restart automatically when all events have fired:

```tsx
const loopingTimeline: SimulationTimeline = {
  id: 'heartbeat',
  name: 'Heartbeat Loop',
  description: 'Continuous presence heartbeat',
  loop: true,
  events: [
    { delay: 3000, message: { type: 'presence', action: 'heartbeat' } },
  ],
};
```

## Creating a New Demo with Simulation

1. Create a timeline file in `demo/src/timelines/`:

```tsx
// demo/src/timelines/pipeline-run.ts
import type { SimulationTimeline } from '../engine/types';

export const pipelineRunTimeline: SimulationTimeline = {
  id: 'pipeline-run',
  name: 'Pipeline Execution',
  description: 'Simulates a 3-node pipeline running to completion',
  events: [
    {
      delay: 500,
      message: { type: 'pipeline', action: 'node-started', nodeId: 'ingest-01' },
      description: 'Ingest node starts',
    },
    {
      delay: 2000,
      message: { type: 'pipeline', action: 'node-completed', nodeId: 'ingest-01', metrics: { rows: 1420 } },
      description: 'Ingest node completes with 1420 rows',
    },
    {
      delay: 300,
      message: { type: 'pipeline', action: 'node-started', nodeId: 'transform-01' },
      description: 'Transform node starts',
    },
    {
      delay: 3000,
      message: { type: 'pipeline', action: 'node-completed', nodeId: 'transform-01', metrics: { rows: 1380 } },
      description: 'Transform node completes',
    },
    {
      delay: 300,
      message: { type: 'pipeline', action: 'node-started', nodeId: 'load-01' },
      description: 'Load node starts',
    },
    {
      delay: 1500,
      message: { type: 'pipeline', action: 'node-completed', nodeId: 'load-01', metrics: { rows: 1380 } },
      description: 'Load node completes — pipeline done',
    },
  ],
};
```

2. Create a demo page that uses it:

```tsx
// demo/src/pages/PipelineRunDemo.tsx
import { SimulatedProvider } from '../engine/SimulatedProvider';
import { PipelineCanvas } from '@connorhoehnslalom/ui-components/pipelines';
import { pipelineRunTimeline } from '../timelines/pipeline-run';

export function PipelineRunDemo() {
  return (
    <SimulatedProvider timeline={pipelineRunTimeline} autoPlay>
      <PipelineCanvas pipelineId="demo-pipeline" />
    </SimulatedProvider>
  );
}
```

## SimulationControlsPanel

When `timeline` is provided with at least one event, `SimulatedProvider` renders a floating control panel overlay. This panel shows:

- Play/pause button
- Current event index and progress bar
- Speed control
- Step-forward button
- Description of the last dispatched event

The panel is positioned fixed at the bottom of the viewport and does not interfere with the demo layout.
