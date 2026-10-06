export interface ComputeDockProps {
    /**
     * Bindings for the dock's own keys. Defaults on; pass false where the host
     * owns the keyboard, or where the dock is embedded in a surface that already
     * binds these chords.
     */
    hotkeys?: boolean;
    /**
     * Reconcile open tabs against the live fleet. Default true when a
     * ComputeProvider is above; a tab whose computer no longer exists can never
     * connect, and it sits there failing in a way indistinguishable from a
     * service problem.
     */
    reconcile?: boolean;
    className?: string;
}
export declare function ComputeDock({ hotkeys, reconcile, className }: ComputeDockProps): import("react").JSX.Element | null;
//# sourceMappingURL=ComputeDock.d.ts.map