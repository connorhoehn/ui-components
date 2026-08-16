export interface EventItem {
    id: string;
    timestamp: string;
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