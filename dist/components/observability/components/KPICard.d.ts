export interface KPICardProps {
    title: string;
    value: number | string;
    delta?: {
        value: number;
        direction: 'up' | 'down';
    };
    sparklineData?: number[];
    onClick?: () => void;
}
declare function KPICard({ title, value, delta, sparklineData, onClick }: KPICardProps): import("react/jsx-runtime").JSX.Element;
export default KPICard;
//# sourceMappingURL=KPICard.d.ts.map