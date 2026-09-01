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
declare function LogRow({ row, isOpen, onToggle }: LogRowProps): import("react").JSX.Element;
declare const _default: import("react").MemoExoticComponent<typeof LogRow>;
export default _default;
//# sourceMappingURL=LogRow.d.ts.map