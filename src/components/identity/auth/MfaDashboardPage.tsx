// src/components/identity/auth/MfaDashboardPage.tsx
//
// Dashboard for managing MFA devices: view, rename, remove, add new.

import { useState, useCallback } from 'react';
import { cn } from '../../../lib/cn';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

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

  const handleRemove = useCallback(async () => {
    if (!confirmRemove) return;
    setActionLoading(true);
    try {
      await onRemoveDevice(confirmRemove);
    } finally {
      setActionLoading(false);
      setConfirmRemove(null);
    }
  }, [confirmRemove, onRemoveDevice]);

  const handleRename = useCallback(async (deviceId: string) => {
    if (!renameValue.trim()) return;
    setActionLoading(true);
    try {
      await onRenameDevice(deviceId, renameValue.trim());
    } finally {
      setActionLoading(false);
      setRenaming(null);
      setRenameValue('');
    }
  }, [renameValue, onRenameDevice]);

  const startRename = (device: MfaDevice) => {
    setRenaming(device.deviceId);
    setRenameValue(device.deviceName);
  };

  return (
    <div className="min-h-screen flex items-start justify-center p-6 bg-surface-panel">
      <div className="w-full max-w-[600px] bg-surface rounded-md shadow-md p-6" role="main" aria-label="MFA device management">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <div className="flex flex-col gap-1">
            <h1 className="text-lg font-semibold text-text-primary m-0">MFA Devices</h1>
            {userEmail && <p className="text-sm text-text-secondary m-0">{userEmail}</p>}
          </div>
          <div className="flex items-center gap-2">
            <span
              className={cn(
                'inline-block px-2.5 py-1 text-sm font-semibold rounded-sm',
                mfaEnabled
                  ? 'bg-success/15 text-success'
                  : 'bg-warning/15 text-warning'
              )}
            >
              {mfaEnabled ? 'MFA Enabled' : 'MFA Disabled'}
            </span>
            <button
              type="button"
              className="px-4 py-2.5 text-sm font-semibold bg-primary text-white border-none rounded-sm cursor-pointer font-[inherit]"
              onClick={onAddDevice}
            >
              Add Device
            </button>
          </div>
        </div>

        {/* Loading state */}
        {loading && (
          <p className="text-center text-text-tertiary text-sm">
            Loading devices...
          </p>
        )}

        {/* Empty state */}
        {!loading && devices.length === 0 && (
          <div className="text-center p-6 text-text-tertiary text-sm">
            <p className="mb-2 mt-0">No MFA devices configured.</p>
            <p className="m-0">Add a device to secure your account with multi-factor authentication.</p>
          </div>
        )}

        {/* Device list */}
        {!loading && devices.length > 0 && (
          <div className="flex flex-col gap-2" role="list" aria-label="MFA devices">
            {devices.map(device => (
              <div key={device.deviceId} className="p-4 border border-border rounded-sm bg-surface" role="listitem">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    {renaming === device.deviceId ? (
                      <form
                        onSubmit={e => { e.preventDefault(); handleRename(device.deviceId); }}
                        className="flex gap-1.5 items-center"
                      >
                        <input
                          type="text"
                          value={renameValue}
                          onChange={e => setRenameValue(e.target.value)}
                          className="px-3 py-2.5 text-sm border border-border rounded-sm bg-surface text-text-primary font-[inherit] outline-none w-[180px] box-border focus:ring-2 focus:ring-primary/25 focus:border-primary"
                          autoFocus
                          disabled={actionLoading}
                        />
                        <button
                          type="submit"
                          className="px-3 py-1.5 text-sm font-medium bg-surface text-text-secondary border border-border rounded-sm cursor-pointer font-[inherit]"
                          disabled={actionLoading || !renameValue.trim()}
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          className="px-3 py-1.5 text-sm font-medium bg-surface text-text-secondary border border-border rounded-sm cursor-pointer font-[inherit]"
                          onClick={() => setRenaming(null)}
                        >
                          Cancel
                        </button>
                      </form>
                    ) : (
                      <>
                        <h3 className="text-sm font-semibold text-text-primary m-0">{device.deviceName}</h3>
                        <span
                          className={cn(
                            'inline-block px-1.5 py-0.5 text-[11px] font-semibold rounded-sm ml-2',
                            device.isVerified
                              ? 'bg-success/15 text-success'
                              : 'bg-warning/15 text-warning'
                          )}
                        >
                          {device.isVerified ? 'Verified' : 'Unverified'}
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <p className="text-xs text-text-tertiary m-0">
                  Type: {device.deviceType} &middot; Added: {formatDate(device.createdAt)}
                  {device.lastUsed && ` · Last used: ${formatDate(device.lastUsed)}`}
                </p>
                {renaming !== device.deviceId && (
                  <div className="flex gap-2 mt-2">
                    <button
                      type="button"
                      className="px-3 py-1.5 text-sm font-medium bg-surface text-text-secondary border border-border rounded-sm cursor-pointer font-[inherit]"
                      onClick={() => startRename(device)}
                    >
                      Rename
                    </button>
                    <button
                      type="button"
                      className="px-3 py-1.5 text-sm font-medium bg-surface text-danger border border-danger rounded-sm cursor-pointer font-[inherit]"
                      onClick={() => setConfirmRemove(device.deviceId)}
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Confirm remove dialog */}
        {confirmRemove && (
          <div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-[1000]"
            role="dialog"
            aria-modal="true"
            aria-label="Confirm device removal"
            onClick={e => { if (e.target === e.currentTarget) setConfirmRemove(null); }}
          >
            <div className="w-full max-w-[380px] bg-surface rounded-md shadow-md p-6">
              <h2 className="text-sm font-semibold text-text-primary mb-2 mt-0">Remove Device</h2>
              <p className="text-sm text-text-secondary mb-4 mt-0">
                Are you sure you want to remove this MFA device? You will no longer be able to use it for verification.
              </p>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="px-3 py-1.5 text-sm font-medium bg-surface text-text-secondary border border-border rounded-sm cursor-pointer font-[inherit]"
                  onClick={() => setConfirmRemove(null)}
                  disabled={actionLoading}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="px-3 py-1.5 text-sm font-medium bg-surface text-danger border border-danger rounded-sm cursor-pointer font-[inherit]"
                  onClick={handleRemove}
                  disabled={actionLoading}
                >
                  {actionLoading ? 'Removing...' : 'Remove'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MfaDashboardPage;
