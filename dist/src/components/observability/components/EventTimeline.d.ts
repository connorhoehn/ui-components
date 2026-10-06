export interface EventItem {
    id: string;
    /** Display-only clock string (`HH:MM:SS.mmm`) — carries no date. */
    timestamp: string;
    /**
     * Epoch ms the event was received. `timestamp` is a formatted clock string
     * with no date, so it cannot be compared; this is what EventsPage's
     * time-range filter measures against.
     */
    receivedAt?: number;
    type: string;
    summary: string;
    severity?: 'info' | 'warning' | 'error' | 'success';
    payload?: unknown;
}
export interface EventTimelineProps {
    events: EventItem[];
    selectedId?: string | null;
    onSelect?: (id: string) => void;
    live?: boolean;
}
declare function EventTimeline({ events, selectedId, onSelect, live }: EventTimelineProps): import("react").JSX.Element;
export default EventTimeline;
//# sourceMappingURL=EventTimeline.d.ts.map