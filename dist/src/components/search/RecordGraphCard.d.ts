import { type RecordGraphEdge, type RecordGraphRecord } from '../graph/recordGraphLayout';
export interface RecordGraphCardProps {
    records: RecordGraphRecord[];
    /** `source`/`target` are `type:id` keys (`recordGraphKey`). */
    edges: RecordGraphEdge[];
    /**
     * Selected `type:id` keys, shared with the host's other views. The
     * collapsed header shows these records' marks (else the best-connected
     * records); the expanded graph frames them (`focusKeys`).
     */
    selectedKeys?: string[];
    /** The card's heading. Default "Connections". */
    title?: string;
    /** The line after the title. Default "N records · M connections". */
    summary?: string;
    /** Controlled expanded state. Omit to let the card hold it (starts collapsed). */
    expanded?: boolean;
    onToggleExpanded?: (next: boolean) => void;
    /** "Open graph ↗" — the host switches to its full Connections view. Omitted, no button. */
    onOpen?: () => void;
    /** Selection changes from the expanded graph. Omitted, the card holds the selection itself. */
    onSelectionChange?: (keys: string[]) => void;
    /** "Open record ↗" in the expanded graph while one record is selected. */
    onOpenRecord?: (record: RecordGraphRecord) => void;
    /** "Ask about selection →" in the expanded graph. Omitted, no button. */
    onAskSelection?: () => void;
    /** The expanded canvas's height in px (the graph's toolbar included). Default 320. */
    height?: number;
    className?: string;
    'data-testid'?: string;
}
/** "25 records · 31 connections". Exported for hosts that echo it. */
export declare function recordGraphSummary(records: number, connections: number): string;
export declare function RecordGraphCard({ records, edges, selectedKeys, title, summary, expanded: controlledExpanded, onToggleExpanded, onOpen, onSelectionChange, onOpenRecord, onAskSelection, height, className, 'data-testid': testId, }: RecordGraphCardProps): import("react").JSX.Element;
export default RecordGraphCard;
//# sourceMappingURL=RecordGraphCard.d.ts.map