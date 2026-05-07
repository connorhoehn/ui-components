export interface SimulationEvent {
  delay: number; // ms after previous event (or from start if first)
  message: Record<string, unknown>; // The gateway message payload
  description?: string; // Human-readable label for UI
}

export interface SimulationTimeline {
  id: string;
  name: string;
  description: string;
  loop?: boolean; // restart from beginning when done
  events: SimulationEvent[];
}

export type SimulationState = 'idle' | 'playing' | 'paused';

export interface SimulationControls {
  state: SimulationState;
  speed: number; // 1 = normal, 2 = 2x, 0.5 = half speed
  currentEventIndex: number;
  totalEvents: number;
  play: () => void;
  pause: () => void;
  reset: () => void;
  setSpeed: (speed: number) => void;
  stepForward: () => void; // advance one event manually
}
