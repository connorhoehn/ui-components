export interface PiPButtonProps {
    /** Callback to obtain the `<video>` element to enter PiP with. */
    getVideoElement: () => HTMLVideoElement | null;
    className?: string;
    title?: string;
}
export declare function PiPButton({ getVideoElement, className, title, }: PiPButtonProps): import("react").JSX.Element;
export default PiPButton;
//# sourceMappingURL=PiPButton.d.ts.map