export interface SkeletonCardProps {
    width?: number | string;
    height?: number | string;
    /**
     * Corner shape. 'full' makes a circle/pill — the avatar-placeholder case
     * that used to force pages to hand-roll their own skeleton rect.
     * @default 'lg'
     */
    rounded?: 'md' | 'lg' | 'full';
}
declare function SkeletonCard({ width, height, rounded }: SkeletonCardProps): import("react").JSX.Element;
export default SkeletonCard;
//# sourceMappingURL=SkeletonCard.d.ts.map