// src/components/identity/auth/MfaDashboardPage.tsx
//
// Dashboard for managing MFA devices: view, rename, remove, add new.

import { useState, useCallback } from 'react';

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
// Styles
// ---------------------------------------------------------------------------

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 'var(--ui-spacingLg)',
    background: 'var(--ui-surfaceAlt)',
  } as React.CSSProperties,
  container: {
    width: '100%',
    maxWidth: 600,
    background: 'var(--ui-surface)',
    borderRadius: 'var(--ui-radiusMd)',
    boxShadow: 'var(--ui-shadowMd)',
    padding: 'var(--ui-spacingLg)',
  } as React.CSSProperties,
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 'var(--ui-spacingMd)',
    flexWrap: 'wrap' as const,
    gap: 'var(--ui-spacingSm)',
  } as React.CSSProperties,
  headerLeft: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 4,
  } as React.CSSProperties,
  heading: {
    fontSize: 'var(--ui-fontSizeLg)',
    fontWeight: 600,
    color: 'var(--ui-textPrimary)',
    margin: 0,
  } as React.CSSProperties,
  email: {
    fontSize: 'var(--ui-fontSizeSm)',
    color: 'var(--ui-textSecondary)',
    margin: 0,
  } as React.CSSProperties,
  badge: (enabled: boolean) => ({
    display: 'inline-block',
    padding: '4px 10px',
    fontSize: 'var(--ui-fontSizeSm)',
    fontWeight: 600,
    borderRadius: 'var(--ui-radiusSm)',
    background: enabled
      ? 'color-mix(in srgb, var(--ui-success) 15%, transparent)'
      : 'color-mix(in srgb, var(--ui-warning) 15%, transparent)',
    color: enabled ? 'var(--ui-success)' : 'var(--ui-warning)',
  }) as React.CSSProperties,
  addButton: {
    padding: '10px 16px',
    fontSize: 'var(--ui-fontSizeSm)',
    fontWeight: 600,
    background: 'var(--ui-primary)',
    color: '#fff',
    border: 'none',
    borderRadius: 'var(--ui-radiusSm)',
    cursor: 'pointer',
    fontFamily: 'inherit',
  } as React.CSSProperties,
  deviceList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 'var(--ui-spacingSm)',
  } as React.CSSProperties,
  deviceCard: {
    padding: 'var(--ui-spacingMd)',
    border: '1px solid var(--ui-border)',
    borderRadius: 'var(--ui-radiusSm)',
    background: 'var(--ui-surface)',
  } as React.CSSProperties,
  deviceHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  } as React.CSSProperties,
  deviceName: {
    fontSize: 'var(--ui-fontSizeMd)',
    fontWeight: 600,
    color: 'var(--ui-textPrimary)',
    margin: 0,
  } as React.CSSProperties,
  deviceMeta: {
    fontSize: 'var(--ui-fontSizeSm)',
    color: 'var(--ui-textMuted)',
    margin: 0,
  } as React.CSSProperties,
  deviceActions: {
    display: 'flex',
    gap: 8,
    marginTop: 8,
  } as React.CSSProperties,
  actionButton: {
    padding: '6px 12px',
    fontSize: 'var(--ui-fontSizeSm)',
    fontWeight: 500,
    background: 'var(--ui-surface)',
    color: 'var(--ui-textSecondary)',
    border: '1px solid var(--ui-border)',
    borderRadius: 'var(--ui-radiusSm)',
    cursor: 'pointer',
    fontFamily: 'inherit',
  } as React.CSSProperties,
  dangerButton: {
    padding: '6px 12px',
    fontSize: 'var(--ui-fontSizeSm)',
    fontWeight: 500,
    background: 'var(--ui-surface)',
    color: 'var(--ui-danger)',
    border: '1px solid var(--ui-danger)',
    borderRadius: 'var(--ui-radiusSm)',
    cursor: 'pointer',
    fontFamily: 'inherit',
  } as React.CSSProperties,
  emptyState: {
    textAlign: 'center' as const,
    padding: 'var(--ui-spacingLg)',
    color: 'var(--ui-textMuted)',
    fontSize: 'var(--ui-fontSizeSm)',
  } as React.CSSProperties,
  overlay: {
    position: 'fixed' as const,
    inset: 0,
    background: 'rgba(0,0,0,0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  } as React.CSSProperties,
  dialog: {
    width: '100%',
    maxWidth: 380,
    background: 'var(--ui-surface)',
    borderRadius: 'var(--ui-radiusMd)',
    boxShadow: 'var(--ui-shadowMd)',
    padding: 'var(--ui-spacingLg)',
  } as React.CSSProperties,
  dialogTitle: {
    fontSize: 'var(--ui-fontSizeMd)',
    fontWeight: 600,
    color: 'var(--ui-textPrimary)',
    margin: '0 0 var(--ui-spacingSm)',
  } as React.CSSProperties,
  dialogBody: {
    fontSize: 'var(--ui-fontSizeSm)',
    color: 'var(--ui-textSecondary)',
    margin: '0 0 var(--ui-spacingMd)',
  } as React.CSSProperties,
  dialogActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 8,
  } as React.CSSProperties,
  verifiedBadge: {
    display: 'inline-block',
    padding: '2px 6px',
    fontSize: 11,
    fontWeight: 600,
    borderRadius: 'var(--ui-radiusSm)',
    background: 'color-mix(in srgb, var(--ui-success) 15%, transparent)',
    color: 'var(--ui-success)',
    marginLeft: 8,
  } as React.CSSProperties,
  unverifiedBadge: {
    display: 'inline-block',
    padding: '2px 6px',
    fontSize: 11,
    fontWeight: 600,
    borderRadius: 'var(--ui-radiusSm)',
    background: 'color-mix(in srgb, var(--ui-warning) 15%, transparent)',
    color: 'var(--ui-warning)',
    marginLeft: 8,
  } as React.CSSProperties,
  input: {
    padding: '10px 12px',
    fontSize: 'var(--ui-fontSizeMd)',
    border: '1px solid var(--ui-border)',
    borderRadius: 'var(--ui-radiusSm)',
    background: 'var(--ui-surface)',
    color: 'var(--ui-textPrimary)',
    fontFamily: 'inherit',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box' as const,
    marginBottom: 'var(--ui-spacingMd)',
  } as React.CSSProperties,
};

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
    <div style={styles.page}>
      <div style={styles.container} role="main" aria-label="MFA device management">
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerLeft}>
            <h1 style={styles.heading}>MFA Devices</h1>
            {userEmail && <p style={styles.email}>{userEmail}</p>}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ui-spacingSm)' }}>
            <span style={styles.badge(mfaEnabled)}>
              {mfaEnabled ? 'MFA Enabled' : 'MFA Disabled'}
            </span>
            <button type="button" style={styles.addButton} onClick={onAddDevice}>
              Add Device
            </button>
          </div>
        </div>

        {/* Loading state */}
        {loading && (
          <p style={{ textAlign: 'center', color: 'var(--ui-textMuted)', fontSize: 'var(--ui-fontSizeSm)' }}>
            Loading devices...
          </p>
        )}

        {/* Empty state */}
        {!loading && devices.length === 0 && (
          <div style={styles.emptyState}>
            <p style={{ margin: '0 0 8px' }}>No MFA devices configured.</p>
            <p style={{ margin: 0 }}>Add a device to secure your account with multi-factor authentication.</p>
          </div>
        )}

        {/* Device list */}
        {!loading && devices.length > 0 && (
          <div style={styles.deviceList} role="list" aria-label="MFA devices">
            {devices.map(device => (
              <div key={device.deviceId} style={styles.deviceCard} role="listitem">
                <div style={styles.deviceHeader}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {renaming === device.deviceId ? (
                      <form
                        onSubmit={e => { e.preventDefault(); handleRename(device.deviceId); }}
                        style={{ display: 'flex', gap: 6, alignItems: 'center' }}
                      >
                        <input
                          type="text"
                          value={renameValue}
                          onChange={e => setRenameValue(e.target.value)}
                          style={{ ...styles.input, marginBottom: 0, width: 180 }}
                          autoFocus
                          disabled={actionLoading}
                        />
                        <button
                          type="submit"
                          style={styles.actionButton}
                          disabled={actionLoading || !renameValue.trim()}
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          style={styles.actionButton}
                          onClick={() => setRenaming(null)}
                        >
                          Cancel
                        </button>
                      </form>
                    ) : (
                      <>
                        <h3 style={styles.deviceName}>{device.deviceName}</h3>
                        <span style={device.isVerified ? styles.verifiedBadge : styles.unverifiedBadge}>
                          {device.isVerified ? 'Verified' : 'Unverified'}
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <p style={styles.deviceMeta}>
                  Type: {device.deviceType} &middot; Added: {formatDate(device.createdAt)}
                  {device.lastUsed && ` · Last used: ${formatDate(device.lastUsed)}`}
                </p>
                {renaming !== device.deviceId && (
                  <div style={styles.deviceActions}>
                    <button
                      type="button"
                      style={styles.actionButton}
                      onClick={() => startRename(device)}
                    >
                      Rename
                    </button>
                    <button
                      type="button"
                      style={styles.dangerButton}
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
            style={styles.overlay}
            role="dialog"
            aria-modal="true"
            aria-label="Confirm device removal"
            onClick={e => { if (e.target === e.currentTarget) setConfirmRemove(null); }}
          >
            <div style={styles.dialog}>
              <h2 style={styles.dialogTitle}>Remove Device</h2>
              <p style={styles.dialogBody}>
                Are you sure you want to remove this MFA device? You will no longer be able to use it for verification.
              </p>
              <div style={styles.dialogActions}>
                <button
                  type="button"
                  style={styles.actionButton}
                  onClick={() => setConfirmRemove(null)}
                  disabled={actionLoading}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  style={styles.dangerButton}
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
