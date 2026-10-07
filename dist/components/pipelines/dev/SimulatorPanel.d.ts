import type { PipelineEventMap } from '../../../types/pipeline';
import { type EventKey } from './EventPayloadEditor';
export type AssertEventTypesExhaustive<T extends never = Exclude<keyof PipelineEventMap, EventKey>> = T;
export interface SimHistoryEntry {
    eventType: EventKey;
    /** Raw payload string (kept verbatim so re-fire restores the exact JSON the dev sent). */
    payload: string;
    seq: string;
    /** Wall-clock ms epoch when the emit was queued. */
    ts: number;
}
export interface SimulatorPanelProps {
    open: boolean;
    onClose: () => void;
}
export default function SimulatorPanel({ open, onClose }: SimulatorPanelProps): import("react").JSX.Element | null;
//# sourceMappingURL=SimulatorPanel.d.ts.map