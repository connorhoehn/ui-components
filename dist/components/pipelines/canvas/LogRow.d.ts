export interface LogRowData {
    id: number;
    at: number;
    eventType: string;
    payload: unknown;
}
export interface LogRowProps {
    row: LogRowData;
    isOpen: boolean;
    onToggle: (id: number) => void;
}
export default function LogRow({ row, isOpen, onToggle }: LogRowProps): import("react").JSX.Element;
//# sourceMappingURL=LogRow.d.ts.map