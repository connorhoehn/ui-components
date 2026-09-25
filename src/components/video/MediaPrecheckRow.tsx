// ui-components/src/components/video/MediaPrecheckRow.tsx
//
// "Mic on | Camera on ........ Settings": the media you will join with,
// chosen before the call starts. Two plain toggles and a link to the full
// device settings. A blocked permission disables its toggle and says why in
// the title, in the danger tone, so nobody starts a call wondering why they
// cannot be heard.

import { cn } from '../../lib/cn';
import { Button } from '../ui/Button';
import { MicIcon, MicOffIcon, VideoIcon, VideoOffIcon } from './MediaIcons';
import type { MediaPermission } from './DeviceToggleSelect';

export interface MediaPrecheckRowProps {
  micOn: boolean;
  cameraOn: boolean;
  /** Hide the camera toggle (an audio-only call). Default true. */
  showCamera?: boolean;
  /** One permission for both, or one per kind. */
  permission: MediaPermission | { microphone: MediaPermission; camera: MediaPermission };
  onToggleMic: () => void;
  onToggleCamera: () => void;
  onOpenSettings: () => void;
  /** Prefix for the test ids: `<prefix>-mic`, `<prefix>-camera`, `<prefix>-settings`. Default `start-call-precheck`. */
  testIdPrefix?: string;
  /** Test id of the Settings link. Default `start-call-settings`. */
  settingsTestId?: string;
  className?: string;
}

const BLOCKED = {
  microphone: 'Microphone blocked in the browser',
  camera: 'Camera blocked in the browser',
} as const;

function reasonFor(kind: 'microphone' | 'camera', p: MediaPermission): string | undefined {
  if (p === 'denied') return BLOCKED[kind];
  if (p === 'unavailable') return kind === 'microphone' ? 'No microphone found' : 'No camera found';
  return undefined;
}

export function MediaPrecheckRow({
  micOn,
  cameraOn,
  showCamera = true,
  permission,
  onToggleMic,
  onToggleCamera,
  onOpenSettings,
  testIdPrefix = 'start-call-precheck',
  settingsTestId = 'start-call-settings',
  className,
}: MediaPrecheckRowProps) {
  const perm = typeof permission === 'string' ? { microphone: permission, camera: permission } : permission;
  const micReason = reasonFor('microphone', perm.microphone);
  const camReason = reasonFor('camera', perm.camera);
  const micShownOn = micOn && !micReason;
  const camShownOn = cameraOn && !camReason;

  const toggleClass = (blocked: boolean) =>
    cn(
      'inline-flex h-8 items-center gap-2 border-transparent px-2 py-0 font-medium',
      blocked ? 'text-danger-fg' : 'text-text-primary',
    );

  return (
    <div className={cn('flex items-center gap-2', className)} data-testid={`${testIdPrefix}-row`}>
      <Button
        variant="ghost"
        onClick={onToggleMic}
        disabled={Boolean(micReason)}
        title={micReason ?? (micShownOn ? 'Turn microphone off' : 'Turn microphone on')}
        aria-pressed={micShownOn}
        data-testid={`${testIdPrefix}-mic`}
        className={toggleClass(Boolean(micReason))}
      >
        {micShownOn ? <MicIcon size={18} /> : <MicOffIcon size={18} />}
        {micShownOn ? 'Mic on' : 'Mic off'}
      </Button>
      {showCamera && (
        <>
          <span aria-hidden="true" className="h-5 w-px shrink-0 bg-border" />
          <Button
            variant="ghost"
            onClick={onToggleCamera}
            disabled={Boolean(camReason)}
            title={camReason ?? (camShownOn ? 'Turn camera off' : 'Turn camera on')}
            aria-pressed={camShownOn}
            data-testid={`${testIdPrefix}-camera`}
            className={toggleClass(Boolean(camReason))}
          >
            {camShownOn ? <VideoIcon size={18} /> : <VideoOffIcon size={18} />}
            {camShownOn ? 'Camera on' : 'Camera off'}
          </Button>
        </>
      )}
      <Button
        variant="link"
        onClick={onOpenSettings}
        data-testid={settingsTestId}
        className="ml-auto text-sm"
      >
        Settings
      </Button>
    </div>
  );
}

export default MediaPrecheckRow;
