import { useState, useCallback } from 'react';
import { FormField } from '../shared/FormField';
import { StatusBadge } from '../shared/StatusBadge';
import { Button } from '../../ui/Button';
import EmptyState from '../../shared/EmptyState';
import ConfirmDialog from '../../shared/ConfirmDialog';
import Chip from '../../shared/Chip';
import Banner from '../../shared/Banner';

export interface MfaDevice {
  deviceId: string;
  deviceName: string;
  deviceType: string;
  isVerified: boolean;
  createdAt: string;
  lastUsed?: string;
}

export interface MfaDashboardPageProps {
  devices: MfaDevice[];
  userEmail?: string;
  mfaEnabled: boolean;
  onAddDevice: () => void;
  onRenameDevice: (deviceId: string, newName: string) => Promise<void>;
  onRemoveDevice: (deviceId: string) => Promise<void>;
  loading?: boolean;
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return iso;
  }
}

export function MfaDashboardPage({
  devices,
  userEmail,
  mfaEnabled,
  onAddDevice,
  onRenameDevice,
  onRemoveDevice,
  loading = false,
}: MfaDashboardPageProps) {
  const [confirmRemove, setConfirmRemove] = useState<string | null>(null);
  const [renaming, setRenaming] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState('');
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  // Both handlers used to reset in `finally`, so a rejected call closed the
  // dialog / left the rename form exactly as a success does, with no message
  // anywhere. On this page that is worse than on an admin table: a user who
  // thinks they removed their last MFA device — and did not — believes they
  // have turned MFA off, while the server still demands that device at the
  // next sign-in. Only close on success; surface the reason on failure.
  const handleRemove = useCallback(async () => {
    if (!confirmRemove) return;
    setActionLoading(true);
    setActionError(null);
    try {
      await onRemoveDevice(confirmRemove);
      setConfirmRemove(null);
    } catch (err: unknown) {
      setActionError(err instanceof Error ? err.message : 'Failed to remove device.');
    } finally {
      setActionLoading(false);
    }
  }, [confirmRemove, onRemoveDevice]);

  const handleRename = useCallback(async (deviceId: string) => {
    if (!renameValue.trim()) return;
    setActionLoading(true);
    setActionError(null);
    try {
      await onRenameDevice(deviceId, renameValue.trim());
      setRenaming(null);
      setRenameValue('');
    } catch (err: unknown) {
      setActionError(err instanceof Error ? err.message : 'Failed to rename device.');
    } finally {
      setActionLoading(false);
    }
  }, [renameValue, onRenameDevice]);

  const startRename = (device: MfaDevice) => {
    setRenaming(device.deviceId);
    setRenameValue(device.deviceName);
    setActionError(null);
  };

  return (
    <div className="min-h-full flex items-start justify-center p-6 bg-surface-panel">
      <div className="w-full max-w-[600px] bg-white rounded-xl shadow-md p-8" role="main" aria-label="MFA device management">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex flex-col gap-1">
            <h1 className="text-xl font-bold text-text-primary m-0">MFA Devices</h1>
            {userEmail && <p className="text-sm text-neutral m-0">{userEmail}</p>}
          </div>
          <div className="flex items-center gap-3">
            <Chip tone={mfaEnabled ? 'success' : 'warning'}>
              {mfaEnabled ? 'Enabled' : 'Disabled'}
            </Chip>
            <Button variant="primary" size="md" onClick={onAddDevice}>
              Add Device
            </Button>
          </div>
        </div>

        {/* A failed REMOVE keeps the confirm dialog open, and the dialog is a
            modal — a banner out here would be hidden behind it. So the page
            shows the error only while no dialog is up (i.e. rename failures);
            the remove error is rendered inside the dialog below. */}
        {actionError && !confirmRemove && (
          <div className="mb-5">
            <Banner variant="error">{actionError}</Banner>
          </div>
        )}

        {loading && (
          <p className="text-center text-text-tertiary text-sm py-8">
            Loading devices...
          </p>
        )}

        {!loading && devices.length === 0 && (
          <EmptyState
            icon="🔐"
            title="No MFA devices configured"
            body="Add a device to secure your account with multi-factor authentication."
            actionLabel="Add Device"
            onAction={onAddDevice}
          />
        )}

        {!loading && devices.length > 0 && (
          <div className="flex flex-col gap-3" role="list" aria-label="MFA devices">
            {devices.map(device => (
              <div key={device.deviceId} className="p-5 border border-border rounded-lg bg-white" role="listitem">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    {renaming === device.deviceId ? (
                      <form
                        onSubmit={e => { e.preventDefault(); handleRename(device.deviceId); }}
                        className="flex gap-2 items-center"
                      >
                        <FormField
                          label=""
                          name={`rename-${device.deviceId}`}
                          value={renameValue}
                          onChange={(v) => setRenameValue(String(v))}
                          disabled={actionLoading}
                        />
                        <Button type="submit" variant="primary" size="sm" disabled={actionLoading || !renameValue.trim()}>
                          Save
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => setRenaming(null)}>
                          Cancel
                        </Button>
                      </form>
                    ) : (
                      <>
                        <h3 className="text-[15px] font-semibold text-text-primary m-0">{device.deviceName}</h3>
                        <StatusBadge
                          status={device.isVerified ? 'CONFIRMED' : 'UNCONFIRMED'}
                        />
                      </>
                    )}
                  </div>
                </div>
                <p className="text-[11px] text-text-tertiary m-0 mb-3">
                  Type: {device.deviceType} &middot; Added: {formatDate(device.createdAt)}
                  {device.lastUsed && ` · Last used: ${formatDate(device.lastUsed)}`}
                </p>
                {renaming !== device.deviceId && (
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => startRename(device)}>
                      Rename
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => { setConfirmRemove(device.deviceId); setActionError(null); }}>
                      Remove
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <ConfirmDialog
          open={!!confirmRemove}
          onConfirm={() => { void handleRemove(); }}
          onCancel={() => { setConfirmRemove(null); setActionError(null); }}
          title="Remove Device"
          body="Are you sure you want to remove this MFA device? You will no longer be able to use it for verification."
          confirmLabel={actionLoading ? 'Removing...' : 'Remove'}
          confirmDisabled={actionLoading}
          tone="destructive"
        >
          {actionError && <Banner variant="error">{actionError}</Banner>}
        </ConfirmDialog>
      </div>
    </div>
  );
}

export default MfaDashboardPage;
