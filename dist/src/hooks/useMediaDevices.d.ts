export interface MediaDeviceOption {
    deviceId: string;
    label: string;
    kind: MediaDeviceKind;
}
export interface MediaDevices {
    microphones: MediaDeviceOption[];
    cameras: MediaDeviceOption[];
    speakers: MediaDeviceOption[];
    /** True until the first enumeration has answered. */
    loading: boolean;
    /** False where `enumerateDevices` does not exist (insecure context, SSR). */
    supported: boolean;
    /** False where the browser cannot route audio to a chosen output. */
    canSelectSpeaker: boolean;
    /** True when at least one device came back without a label — permission not yet granted. */
    labelsHidden: boolean;
    refresh: () => Promise<void>;
}
export declare function useMediaDevices(): MediaDevices;
export default useMediaDevices;
//# sourceMappingURL=useMediaDevices.d.ts.map