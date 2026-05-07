// src/components/identity/auth/MfaSetupPage.tsx
//
// Multi-step MFA setup wizard: name device, scan QR, verify code, save backup codes.

import { useState, useCallback } from 'react';
import { QrCodeDisplay } from '../shared/QrCodeDisplay';
import { CodeInput } from '../shared/CodeInput';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface MfaSetupPageProps {
  onSetup: (deviceName: string) => Promise<{
    deviceId: string;
    qrCode: string;
    secret: string;
    backupCodes: string[];
  }>;
  onVerify: (deviceId: string, code: string) => Promise<{
    success: boolean;
    backupCodes?: string[];
  }>;
  onComplete: () => void;
  userEmail?: string;
}

type Step = 'name' | 'scan' | 'verify' | 'backup';

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
    maxWidth: 480,
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
  stepper: {
    display: 'flex',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 'var(--ui-spacingMd)',
  } as React.CSSProperties,
  stepDot: (active: boolean, completed: boolean) => ({
    width: 10,
    height: 10,
    borderRadius: '50%',
    background: completed ? 'var(--ui-success)' : active ? 'var(--ui-primary)' : 'var(--ui-border)',
    transition: 'background 0.2s',
  }) as React.CSSProperties,
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
    fontFamily: 'inherit',
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
  secondaryButton: {
    width: '100%',
    padding: '10px 16px',
    fontSize: 'var(--ui-fontSizeSm)',
    fontWeight: 500,
    background: 'var(--ui-surface)',
    color: 'var(--ui-textSecondary)',
    border: '1px solid var(--ui-border)',
    borderRadius: 'var(--ui-radiusSm)',
    cursor: 'pointer',
    fontFamily: 'inherit',
    marginTop: 'var(--ui-spacingSm)',
  } as React.CSSProperties,
  secretBox: {
    padding: '10px 14px',
    background: 'var(--ui-surfaceAlt)',
    border: '1px solid var(--ui-border)',
    borderRadius: 'var(--ui-radiusSm)',
    fontFamily: 'monospace',
    fontSize: 'var(--ui-fontSizeSm)',
    color: 'var(--ui-textPrimary)',
    wordBreak: 'break-all' as const,
    textAlign: 'center' as const,
    marginBottom: 'var(--ui-spacingMd)',
  } as React.CSSProperties,
  backupGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 8,
    marginBottom: 'var(--ui-spacingMd)',
  } as React.CSSProperties,
  backupCode: {
    padding: '8px 12px',
    background: 'var(--ui-surfaceAlt)',
    border: '1px solid var(--ui-border)',
    borderRadius: 'var(--ui-radiusSm)',
    fontFamily: 'monospace',
    fontSize: 'var(--ui-fontSizeSm)',
    color: 'var(--ui-textPrimary)',
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
  backButton: {
    background: 'none',
    border: 'none',
    color: 'var(--ui-textSecondary)',
    fontSize: 'var(--ui-fontSizeSm)',
    cursor: 'pointer',
    padding: '4px 0',
    marginBottom: 'var(--ui-spacingSm)',
    fontFamily: 'inherit',
  } as React.CSSProperties,
};

const STEPS: Step[] = ['name', 'scan', 'verify', 'backup'];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function MfaSetupPage({
  onSetup,
  onVerify,
  onComplete,
  userEmail,
}: MfaSetupPageProps) {
  const [step, setStep] = useState<Step>('name');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Step 1: device name
  const [deviceName, setDeviceName] = useState('');

  // Step 2: setup result
  const [setupResult, setSetupResult] = useState<{
    deviceId: string;
    qrCode: string;
    secret: string;
    backupCodes: string[];
  } | null>(null);

  // Step 4: backup codes (may come from verify response)
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const currentStepIndex = STEPS.indexOf(step);

  const handleNameSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!deviceName.trim()) return;
    setError(null);
    setLoading(true);
    try {
      const result = await onSetup(deviceName.trim());
      setSetupResult(result);
      setBackupCodes(result.backupCodes);
      setStep('scan');
    } catch (err: any) {
      setError(err?.message || 'Setup failed');
    } finally {
      setLoading(false);
    }
  }, [deviceName, onSetup]);

  const handleVerify = useCallback(async (code: string) => {
    if (!setupResult) return;
    setError(null);
    setLoading(true);
    try {
      const result = await onVerify(setupResult.deviceId, code);
      if (result.success) {
        if (result.backupCodes) {
          setBackupCodes(result.backupCodes);
        }
        setStep('backup');
      } else {
        setError('Verification failed. Please try again.');
      }
    } catch (err: any) {
      setError(err?.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  }, [setupResult, onVerify]);

  const handleCopyAll = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(backupCodes.join('\n'));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: select text for manual copy
    }
  }, [backupCodes]);

  return (
    <div style={styles.page}>
      <div style={styles.card} role="main" aria-label="MFA setup">
        <h1 style={styles.heading}>Set Up Multi-Factor Authentication</h1>
        {userEmail && <p style={styles.subheading}>{userEmail}</p>}

        {/* Step indicator */}
        <div style={styles.stepper} role="group" aria-label="Setup progress">
          {STEPS.map((s, i) => (
            <div
              key={s}
              style={styles.stepDot(i === currentStepIndex, i < currentStepIndex)}
              aria-label={`Step ${i + 1}${i === currentStepIndex ? ' (current)' : i < currentStepIndex ? ' (completed)' : ''}`}
            />
          ))}
        </div>

        {/* Error */}
        {error && <div role="alert" style={styles.errorAlert}>{error}</div>}

        {/* Step 1: Name device */}
        {step === 'name' && (
          <form onSubmit={handleNameSubmit} aria-label="Name your device">
            <div style={styles.field}>
              <label style={styles.label} htmlFor="device-name">Device Name</label>
              <input
                id="device-name"
                type="text"
                placeholder="e.g., My Phone"
                required
                value={deviceName}
                onChange={e => setDeviceName(e.target.value)}
                style={styles.input}
                disabled={loading}
                autoFocus
              />
            </div>
            <button type="submit" style={styles.primaryButton(loading)} disabled={loading || !deviceName.trim()}>
              {loading ? 'Setting up...' : 'Continue'}
            </button>
          </form>
        )}

        {/* Step 2: Scan QR */}
        {step === 'scan' && setupResult && (
          <div>
            <button
              type="button"
              style={styles.backButton}
              onClick={() => setStep('name')}
              aria-label="Go back to name step"
            >
              &larr; Back
            </button>
            <p style={{ ...styles.subheading, marginBottom: 'var(--ui-spacingMd)' }}>
              Scan this QR code with your authenticator app
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 'var(--ui-spacingMd)' }}>
              <QrCodeDisplay
                value={setupResult.qrCode}
                size={200}
                label={`Device: ${deviceName}`}
              />
            </div>
            <p style={{ fontSize: 'var(--ui-fontSizeSm)', color: 'var(--ui-textMuted)', textAlign: 'center', margin: '0 0 var(--ui-spacingSm)' }}>
              Or enter this secret manually:
            </p>
            <div style={styles.secretBox}>{setupResult.secret}</div>
            <button
              type="button"
              style={styles.primaryButton(false)}
              onClick={() => setStep('verify')}
            >
              I&apos;ve scanned it
            </button>
          </div>
        )}

        {/* Step 3: Verify */}
        {step === 'verify' && (
          <div>
            <button
              type="button"
              style={styles.backButton}
              onClick={() => setStep('scan')}
              aria-label="Go back to scan step"
            >
              &larr; Back
            </button>
            <p style={{ ...styles.subheading, marginBottom: 'var(--ui-spacingMd)' }}>
              Enter the 6-digit code from your authenticator app
            </p>
            <CodeInput
              onComplete={handleVerify}
              error={error}
              disabled={loading}
              autoFocus
            />
            {loading && (
              <p style={{ textAlign: 'center', fontSize: 'var(--ui-fontSizeSm)', color: 'var(--ui-textMuted)', marginTop: 'var(--ui-spacingSm)' }}>
                Verifying...
              </p>
            )}
          </div>
        )}

        {/* Step 4: Backup codes */}
        {step === 'backup' && (
          <div>
            <p style={{ ...styles.subheading, marginBottom: 'var(--ui-spacingSm)' }}>
              Save these backup codes in a safe place. Each code can only be used once.
            </p>
            <div style={styles.backupGrid}>
              {backupCodes.map((code, i) => (
                <div key={i} style={styles.backupCode}>{code}</div>
              ))}
            </div>
            <button
              type="button"
              style={styles.primaryButton(false)}
              onClick={handleCopyAll}
            >
              {copied ? 'Copied!' : 'Copy All'}
            </button>
            <button
              type="button"
              style={styles.secondaryButton}
              onClick={onComplete}
            >
              I&apos;ve saved them
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MfaSetupPage;
