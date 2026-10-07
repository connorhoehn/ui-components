import { type DropdownMenuItem } from '../shared/DropdownMenu';
/** Browser media permission for one kind of device. */
export type MediaPermission = 'prompt' | 'granted' | 'denied' | 'unavailable';
export interface DeviceOption {
    deviceId: string;
    label: string;
}
export interface DeviceToggleSelectProps {
    kind: 'microphone' | 'camera';
    on: boolean;
    onToggle: () => void;
    devices: DeviceOption[];
    selectedDeviceId?: string;
    onSelectDevice: (deviceId: string) => void;
    permission: MediaPermission;
    /** 0..1 live input level (microphone only). Above 0.08 draws the speaking ring. */
    level?: number;
    /** `sm` = 32px (the dock), `md` = 40px (the incoming-call popover). Default `sm`. */
    size?: 'sm' | 'md';
    /** Show "Mic on" / "Camera off" beside the icon. Default false (icon only). */
    showLabel?: boolean;
    /** Extra menu rows after the device list, e.g. "Blur background…". */
    extraItems?: DropdownMenuItem[];
    /** Disables the toggle with this as its title (e.g. "Microphone blocked in the browser"). */
    disabledReason?: string;
    /**
     * Draw the device caret and its menu. Default true. `false` gives a bare
     * icon toggle (the shell footer), the host picking the device elsewhere.
     */
    deviceMenu?: boolean;
    className?: string;
    /** Test id on the toggle; the chevron gets `<id>-menu`. */
    'data-testid'?: string;
}
export declare function DeviceToggleSelect({ kind, on, onToggle, devices, selectedDeviceId, onSelectDevice, permission, level, size, showLabel, extraItems, disabledReason, deviceMenu, className, 'data-testid': testId, }: DeviceToggleSelectProps): import("react").JSX.Element;
export default DeviceToggleSelect;
//# sourceMappingURL=DeviceToggleSelect.d.ts.map