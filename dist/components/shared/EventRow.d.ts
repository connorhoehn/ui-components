export interface EventRowProps {
    timestamp: string;
    type: string;
    summary: string;
    severity?: 'info' | 'warning' | 'error' | 'success';
    onClick?: () => void;
    selected?: boolean;
}
declare function EventRow({ timestamp, type, summary, severity, onClick, selected }: EventRowProps): import("react/jsx-runtime").JSX.Element;
export default EventRow;
//# sourceMappingURL=EventRow.d.ts.map