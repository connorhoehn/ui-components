import type { WorkActivityBanner, WorkComputeDetail } from './types';
/** "2m 14s", "30m", "1h 04m". Seconds only matter while they are all there is. */
export declare function formatElapsed(ms: number | undefined): string;
export interface WorkComputePaneProps {
    compute: WorkComputeDetail;
    /**
     * The banner the host authored, if any. Absent, the pane derives the session
     * card from the compute data — the state line every detail pane opens with,
     * said in the words this kind of node has.
     */
    banner?: WorkActivityBanner;
    className?: string;
    'data-testid'?: string;
}
export declare function WorkComputePane({ compute, banner, className, 'data-testid': testId, }: WorkComputePaneProps): import("react").JSX.Element;
export default WorkComputePane;
//# sourceMappingURL=WorkComputePane.d.ts.map