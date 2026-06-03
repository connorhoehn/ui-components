export interface RemoteTileSlotProps {
    stream: MediaStream | undefined;
    displayName: string;
    /** Camera enabled by sender. False → show avatar even if a stream exists. */
    cameraOn: boolean;
    /** Avatar size when fallback renders. Default 96. */
    avatarSize?: number;
}
export declare function RemoteTileSlot({ stream, displayName, cameraOn, avatarSize, }: RemoteTileSlotProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=RemoteTileSlot.d.ts.map