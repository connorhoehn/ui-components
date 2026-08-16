import type { ReactNode } from 'react';
export interface MetricCardProps {
    title: string;
    timeRange?: string;
    children: ReactNode;
    onMaximize?: () => void;
}
declare function MetricCard({ title, timeRange, children, onMaximize }: MetricCardProps): import("react").JSX.Element;
export default MetricCard;
//# sourceMappingURL=MetricCard.d.ts.map