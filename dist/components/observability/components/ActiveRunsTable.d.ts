export interface ActiveRunRow {
    pipelineId: string;
    pipelineName: string;
    runId: string;
    currentStep: string;
    ownerNode: string;
    elapsed: string;
    status: string;
}
export interface ActiveRunsTableProps {
    runs: ActiveRunRow[];
    /**
     * Invoked when a row is activated (click, Enter, or Space). Wire this to a
     * `useNavigate(...)` call to drill into the per-run detail page.
     */
    onRowClick?: (run: ActiveRunRow) => void;
    /**
     * Optional: invoked when the per-row cancel control is activated. The cancel
     * button stops event propagation so it does not also trigger `onRowClick`.
     */
    onCancelRun?: (run: ActiveRunRow) => void;
}
declare function ActiveRunsTable({ runs, onRowClick, onCancelRun }: ActiveRunsTableProps): import("react").JSX.Element;
export default ActiveRunsTable;
//# sourceMappingURL=ActiveRunsTable.d.ts.map