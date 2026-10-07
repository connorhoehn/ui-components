import type { MediaPermission } from './DeviceToggleSelect';
export interface MediaPrecheckRowProps {
    micOn: boolean;
    cameraOn: boolean;
    /** Hide the camera toggle (an audio-only call). Default true. */
    showCamera?: boolean;
    /** One permission for both, or one per kind. */
    permission: MediaPermission | {
        microphone: MediaPermission;
        camera: MediaPermission;
    };
    onToggleMic: () => void;
    onToggleCamera: () => void;
    onOpenSettings: () => void;
    /** Prefix for the test ids: `<prefix>-mic`, `<prefix>-camera`, `<prefix>-settings`. Default `start-call-precheck`. */
    testIdPrefix?: string;
    /** Test id of the Settings link. Default `start-call-settings`. */
    settingsTestId?: string;
    className?: string;
}
export declare function MediaPrecheckRow({ micOn, cameraOn, showCamera, permission, onToggleMic, onToggleCamera, onOpenSettings, testIdPrefix, settingsTestId, className, }: MediaPrecheckRowProps): import("react").JSX.Element;
export default MediaPrecheckRow;
//# sourceMappingURL=MediaPrecheckRow.d.ts.map