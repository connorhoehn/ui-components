// ui-components/src/components/video/DeviceToggleSelect.tsx
//
// A split button for one media device: the left half turns the microphone
// (or camera) on and off, the right half (▾) opens a menu of the devices of
// that kind. Clicking the toggle never opens the menu, and picking a device
// never toggles — they are two controls that share a border, the shape every
// call app uses for "mute" + "which mic".
//
// Pure: the device list, the permission and the level come from the host
// (RM `useMediaDevices` / `useAudioLevel`).

import type { ReactNode } from 'react';
import { BUTTON_WEIGHT } from '../ui/Button';
import { cn } from '../../lib/cn';
import { DISABLED_REASON_DIM, DisabledReasonTooltip, useDisabledReason } from '../shared/DisabledReason';
import { DropdownMenu, type DropdownMenuItem } from '../shared/DropdownMenu';
import { ChevronIcon } from '../ui/Icons';
import { MicIcon, MicOffIcon, VideoIcon, VideoOffIcon } from './MediaIcons';

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
  /**
   * Disables the toggle with this reason (e.g. "The host made you view-only").
   * The toggle stays focusable (`aria-disabled="true"`, a press does nothing)
   * and shows the reason in a `Tooltip` on hover and keyboard focus; it is
   * also the toggle's accessible description. A blocked or missing device
   * gets its own reason ("Microphone blocked in the browser") the same way.
   * The ▾ device menu stays usable: picking a device is not publishing.
   */
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

const NOUN = { microphone: 'Mic', camera: 'Camera' } as const;
const DEVICE_NOUN = { microphone: 'microphone', camera: 'camera' } as const;
const BLOCKED = {
  microphone: 'Microphone blocked in the browser',
  camera: 'Camera blocked in the browser',
} as const;
const NONE = { microphone: 'No microphone found', camera: 'No camera found' } as const;

export function DeviceToggleSelect({
  kind,
  on,
  onToggle,
  devices,
  selectedDeviceId,
  onSelectDevice,
  permission,
  level,
  size = 'sm',
  showLabel = false,
  extraItems,
  disabledReason,
  deviceMenu = true,
  className,
  'data-testid': testId = `device-toggle-${kind}`,
}: DeviceToggleSelectProps) {
  const blocked = permission === 'denied' || permission === 'unavailable';
  const reason =
    disabledReason ??
    (permission === 'denied' ? BLOCKED[kind] : permission === 'unavailable' ? NONE[kind] : undefined);
  const held = useDisabledReason(reason, blocked);
  const disabled = held.off;
  const isOn = on && !disabled;
  const speaking = kind === 'microphone' && isOn && (level ?? 0) > 0.08;

  const iconSize = size === 'md' ? 20 : 18;
  let icon: ReactNode;
  if (kind === 'microphone') icon = isOn ? <MicIcon size={iconSize} /> : <MicOffIcon size={iconSize} />;
  else icon = isOn ? <VideoIcon size={iconSize} /> : <VideoOffIcon size={iconSize} />;

  const stateLabel = `${NOUN[kind]} ${isOn ? 'on' : 'off'}`;
  const actionLabel = isOn ? `Turn ${DEVICE_NOUN[kind]} off` : `Turn ${DEVICE_NOUN[kind]} on`;

  const deviceItems: DropdownMenuItem[] = devices.length
    ? devices.map((d) => ({
        label: d.label,
        checked: d.deviceId === selectedDeviceId,
        onSelect: () => onSelectDevice(d.deviceId),
        'data-testid': `${testId}-device-${d.deviceId}`,
      }))
    : [{ label: NONE[kind], disabled: true }];

  const height = size === 'md' ? 'h-10' : 'h-8';
  // Off reads as a warning on the microphone only: a muted mic is the state
  // people forget they are in; a camera off is the ordinary default.
  const offTone = !isOn && kind === 'microphone' && !disabled ? 'text-danger-fg' : 'text-text-primary';

  return (
    <div
      className={cn(
        'inline-flex shrink-0 items-stretch rounded-md border border-border bg-surface',
        speaking && 'ring-2 ring-primary/50',
        height,
        className,
      )}
      data-kind={kind}
      data-on={isOn ? 'true' : 'false'}
      data-permission={permission}
    >
      <DisabledReasonTooltip reason={held.reason}>
      <button
        data-ui-part=""
        type="button"
        onClick={disabled ? undefined : onToggle}
        {...held.buttonProps}
        aria-pressed={isOn}
        aria-label={showLabel ? undefined : actionLabel}
        // With a reason the Tooltip says it; a native title would draw a second one.
        title={held.reason === undefined ? actionLabel : undefined}
        data-testid={testId}
        className={cn(
          'inline-flex cursor-pointer items-center gap-2 border-none bg-transparent font-[inherit] text-sm',
          deviceMenu ? 'rounded-l-md' : 'rounded-md',
          BUTTON_WEIGHT,
          // The inset outline stays inside the split button's shared border.
          'focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary',
          held.reason === undefined ? 'hover:bg-surface-hover disabled:cursor-not-allowed disabled:opacity-50' : DISABLED_REASON_DIM,
          size === 'md' ? 'px-2.5' : 'px-2',
          showLabel && 'min-w-0 flex-1 justify-start gap-1.5 pr-2',
          offTone,
        )}
      >
        {icon}
        {showLabel && <span className="min-w-0 truncate whitespace-nowrap">{stateLabel}</span>}
        {held.description}
      </button>
      </DisabledReasonTooltip>
      {deviceMenu && (
        <DropdownMenu
          trigger={<ChevronIcon size={14} />}
          triggerLabel={`Choose ${DEVICE_NOUN[kind]}`}
          triggerTitle={`Choose ${DEVICE_NOUN[kind]}`}
          triggerTestId={`${testId}-menu`}
          triggerVariant="link"
          triggerClassName={cn(
            'h-full shrink-0 rounded-none rounded-r-md px-2 text-text-secondary',
            size === 'md' && 'px-2',
        )}
        align="end"
        data-testid={`${testId}-menu-panel`}
        sections={[
          { label: kind === 'microphone' ? 'Microphone' : 'Camera', items: deviceItems },
          ...(extraItems?.length ? [{ items: extraItems }] : []),
        ]}
      />
      )}
    </div>
  );
}

export default DeviceToggleSelect;
