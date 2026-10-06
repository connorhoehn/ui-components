import { type RecordResultItem, type RecordResultType } from './recordMarks';
export interface CitedRecordItem extends RecordResultItem {
    /** The record's citation number in the answer. */
    n: number;
    /** Source numbers this row cites; default `[n]`. */
    citations?: number[];
}
export interface CitedRecordSection {
    type: RecordResultType;
    title: string;
}
export interface CitedRecordListProps {
    records: CitedRecordItem[];
    /** Default: person → "People in context", work → "Work to coordinate". */
    sections?: CitedRecordSection[];
    onOpen: (record: CitedRecordItem) => void;
    /** Draws "View these connections →". */
    onViewConnections?: () => void;
    viewConnectionsLabel?: string;
    /** Default "Sources". */
    sourcesLabel?: string;
    /** A quiet closing line: "Based on project roles and linked work." */
    footnote?: string;
    className?: string;
    'data-testid'?: string;
}
export declare const DEFAULT_CITED_SECTIONS: CitedRecordSection[];
export declare function CitedRecordList({ records, sections, onOpen, onViewConnections, viewConnectionsLabel, sourcesLabel, footnote, className, 'data-testid': testId, }: CitedRecordListProps): import("react").JSX.Element | null;
export default CitedRecordList;
//# sourceMappingURL=CitedRecordList.d.ts.map