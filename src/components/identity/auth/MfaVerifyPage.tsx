// src/components/identity/auth/MfaVerifyPage.tsx
//
// MFA verification page: enter a 6-digit TOTP code or a backup code.

import { useState, useCallback } from 'react';
import { CodeInput } from '../shared/CodeInput';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface MfaVerifyPageProps {
  onVerify: (code: string) => Promise<void>;
  onVerifyBackup: (code: string) => Promise<void>;
  error?: string | null;
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 'var(--ui-spacingLg)',
    background: 'var(--ui-surfaceAlt)',
  } as React.CSSProperties,
  card: {
    width: '100%',
    maxWidth: 420,
    background: 'var(--ui-surface)',
    borderRadius: 'var(--ui-radiusMd)',
    boxShadow: 'var(--ui-shadowMd)',
    padding: 'var(--ui-spacingLg)',
  } as React.CSSProperties,
  heading: {
    fontSize: 'var(--ui-fontSizeLg)',
    fontWeight: 600,
    color: 'var(--ui-textPrimary)',
    margin: '0 0 var(--ui-spacingSm)',
    textAlign: 'center' as const,
  } as React.CSSProperties,
  subheading: {
    fontSize: 'var(--ui-fontSizeSm)',
    color: 'var(--ui-textSecondary)',
    margin: '0 0 var(--ui-spacingMd)',
    textAlign: 'center' as const,
  } as React.CSSProperties,
  errorAlert: {
    padding: '10px 14px',
    marginBottom: 'var(--ui-spacingMd)',
    background: 'color-mix(in srgb, var(--ui-danger) 10%, transparent)',
    border: '1px solid var(--ui-danger)',
    borderRadius: 'var(--ui-radiusSm)',
    color: 'var(--ui-danger)',
    fontSize: 'var(--ui-fontSizeSm)',
  } as React.CSSProperties,
  toggleLink: {
    display: 'block',
    textAlign: 'center' as const,
    marginTop: 'var(--ui-spacingMd)',
    fontSize: 'var(--ui-fontSizeSm)',
    color: 'var(--ui-primary)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontFamily: 'inherit',
    textDecoration: 'underline',
  } as React.CSSProperties,
  field: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 4,
    marginBottom: 'var(--ui-spacingMd)',
  } as React.CSSProperties,
  label: {
    fontSize: 'var(--ui-fontSizeSm)',
    color: 'var(--ui-textSecondary)',
    fontWeight: 500,
  } as React.CSSProperties,
  input: {
    padding: '10px 12px',
    fontSize: 'var(--ui-fontSizeMd)',
    border: '1px solid var(--ui-border)',
    borderRadius: 'var(--ui-radiusSm)',
    background: 'var(--ui-surface)',
    color: 'var(--ui-textPrimary)',
    fontFamily: 'monospace',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box' as const,
  } as React.CSSProperties,
  primaryButton: (loading: boolean) => ({
    width: '100%',
    padding: '12px 16px',
    fontSize: 'var(--ui-fontSizeMd)',
    fontWeight: 600,
    background: 'var(--ui-primary)',
    color: '#fff',
    border: 'none',
    borderRadius: 'var(--ui-radiusSm)',
    cursor: loading ? 'not-allowed' : 'pointer',
    opacity: loading ? 0.7 : 1,
    fontFamily: 'inherit',
  }) as React.CSSProperties,
  loadingText: {
    textAlign: 'center' as const,
    fontSize: 'var(--ui-fontSizeSm)',
    color: 'var(--ui-textMuted)',
    marginTop: 'var(--ui-spacingSm)',
  } as React.CSSProperties,
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function MfaVerifyPage({
  onVerify,
  onVerifyBackup,
  error = null,
}: MfaVerifyPageProps) {
  const [mode, setMode] = useState<'totp' | 'backup'>('totp');
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [backupCode, setBackupCode] = useState('');

  const displayError = error || localError;

  const handleTotpComplete = useCallback(async (code: string) => {
    setLocalError(null);
    setLoading(true);
    try {
      await onVerify(code);
    } catch (err: any) {
      setLocalError(err?.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  }, [onVerify]);

  const handleBackupSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!backupCode.trim()) return;
    setLocalError(null);
    setLoading(true);
    try {
      await onVerifyBackup(backupCode.trim());
    } catch (err: any) {
      setLocalError(err?.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  }, [backupCode, onVerifyBackup]);

  return (
    <div style={styles.page}>
      <div style={styles.card} role="main" aria-label="Multi-factor verification">
        <h1 style={styles.heading}>Verify Your Identity</h1>

        {mode === 'totp' ? (
          <>
            <p style={styles.subheading}>
              Enter the 6-digit code from your authenticator app
            </p>

            {displayError && (
              <div role="alert" style={styles.errorAlert}>{displayError}</div>
            )}

            <CodeInput
              onComplete={handleTotpComplete}
              error={null}
              disabled={loading}
              autoFocus
            />

            {loading && <p style={styles.loadingText}>Verifying...</p>}

            <button
              type="button"
              style={styles.toggleLink}
              onClick={() => { setMode('backup'); setLocalError(null); }}
            >
              Use a backup code instead
            </button>
          </>
        ) : (
          <>
            <p style={styles.subheading}>
              Enter one of your backup codes
            </p>

            {displayError && (
              <div role="alert" style={styles.errorAlert}>{displayError}</div>
            )}

            <form onSubmit={handleBackupSubmit} aria-label="Backup code verification">
              <div style={styles.field}>
                <label style={styles.label} htmlFor="backup-code">Backup Code</label>
                <input
                  id="backup-code"
                  type="text"
                  required
                  value={backupCode}
                  onChange={e => setBackupCode(e.target.value)}
                  style={styles.input}
                  disabled={loading}
                  autoFocus
                  autoComplete="off"
                  placeholder="XXXX-XXXX-XXXX"
                />
              </div>
              <button
                type="submit"
                style={styles.primaryButton(loading)}
                disabled={loading || !backupCode.trim()}
              >
                {loading ? 'Verifying...' : 'Verify Backup Code'}
              </button>
            </form>

            <button
              type="button"
              style={styles.toggleLink}
              onClick={() => { setMode('totp'); setLocalError(null); }}
            >
              Use authenticator code instead
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default MfaVerifyPage;
