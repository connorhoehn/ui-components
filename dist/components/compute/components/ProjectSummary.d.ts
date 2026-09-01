import { type ProjectRollup } from '../hooks/useComputeProjects';
export interface ProjectSummaryProps {
    project: ProjectRollup;
    /** Render the budget meter. Off in tight spaces like a rail row. */
    showMeter?: boolean;
    className?: string;
    'data-testid'?: string;
}
export declare function ProjectSummary({ project, showMeter, className, 'data-testid': testId, }: ProjectSummaryProps): import("react").JSX.Element;
//# sourceMappingURL=ProjectSummary.d.ts.map