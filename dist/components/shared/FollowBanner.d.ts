export interface FollowBannerProps {
    /** Who is being followed. Null renders nothing. */
    name: string | null;
    onStop: () => void;
    /**
     * End follow on the viewer's own mousedown / keydown / wheel. Default on;
     * turn off only where the host routes those interactions itself.
     */
    autoStopOnInteract?: boolean;
    className?: string;
    'data-testid'?: string;
}
export declare function FollowBanner({ name, onStop, autoStopOnInteract, className, 'data-testid': testId, }: FollowBannerProps): import("react").JSX.Element | null;
export default FollowBanner;
//# sourceMappingURL=FollowBanner.d.ts.map