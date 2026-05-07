// src/components/identity/auth/MfaSetupPage.tsx
//
// Multi-step MFA setup wizard: name device, scan QR, verify code, save backup codes.

import { useState, useCallback } from 'react';
import { QrCodeDisplay } from '../shared/QrCodeDisplay';
import { CodeInput } from '../shared/CodeInput';
import { cn } from '../../../lib/cn';

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
    <div className="min-h-screen flex items-center justify-center p-6 bg-surface-panel">
      <div className="w-full max-w-[480px] bg-surface rounded-md shadow-md p-6" role="main" aria-label="MFA setup">
        <h1 className="text-lg font-semibold text-text-primary mb-2 mt-0 text-center">
          Set Up Multi-Factor Authentication
        </h1>
        {userEmail && <p className="text-sm text-text-secondary mb-4 mt-0 text-center">{userEmail}</p>}

        {/* Step indicator */}
        <div className="flex justify-center gap-2 mb-4" role="group" aria-label="Setup progress">
          {STEPS.map((s, i) => (
            <div
              key={s}
              className={cn(
                'w-2.5 h-2.5 rounded-full transition-colors duration-200',
                i < currentStepIndex ? 'bg-success' : i === currentStepIndex ? 'bg-primary' : 'bg-border'
              )}
              aria-label={`Step ${i + 1}${i === currentStepIndex ? ' (current)' : i < currentStepIndex ? ' (completed)' : ''}`}
            />
          ))}
        </div>

        {/* Error */}
        {error && (
          <div role="alert" className="px-3.5 py-2.5 mb-4 bg-danger/10 border border-danger rounded-sm text-danger text-sm">
            {error}
          </div>
        )}

        {/* Step 1: Name device */}
        {step === 'name' && (
          <form onSubmit={handleNameSubmit} aria-label="Name your device">
            <div className="flex flex-col gap-1 mb-4">
              <label className="text-sm text-text-secondary font-medium" htmlFor="device-name">Device Name</label>
              <input
                id="device-name"
                type="text"
                placeholder="e.g., My Phone"
                required
                value={deviceName}
                onChange={e => setDeviceName(e.target.value)}
                className="px-3 py-2.5 text-sm border border-border rounded-sm bg-surface text-text-primary font-[inherit] outline-none w-full box-border focus:ring-2 focus:ring-primary/25 focus:border-primary"
                disabled={loading}
                autoFocus
              />
            </div>
            <button
              type="submit"
              className={cn(
                'w-full px-4 py-3 text-sm font-semibold bg-primary text-white border-none rounded-sm font-[inherit]',
                loading ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'
              )}
              disabled={loading || !deviceName.trim()}
            >
              {loading ? 'Setting up...' : 'Continue'}
            </button>
          </form>
        )}

        {/* Step 2: Scan QR */}
        {step === 'scan' && setupResult && (
          <div>
            <button
              type="button"
              className="bg-transparent border-none text-text-secondary text-sm cursor-pointer p-0 mb-2 font-[inherit]"
              onClick={() => setStep('name')}
              aria-label="Go back to name step"
            >
              &larr; Back
            </button>
            <p className="text-sm text-text-secondary mb-4 mt-0 text-center">
              Scan this QR code with your authenticator app
            </p>
            <div className="flex justify-center mb-4">
              <QrCodeDisplay
                value={setupResult.qrCode}
                size={200}
                label={`Device: ${deviceName}`}
              />
            </div>
            <p className="text-sm text-text-tertiary text-center mb-2 mt-0">
              Or enter this secret manually:
            </p>
            <div className="px-3.5 py-2.5 bg-surface-panel border border-border rounded-sm font-mono text-sm text-text-primary break-all text-center mb-4">
              {setupResult.secret}
            </div>
            <button
              type="button"
              className="w-full px-4 py-3 text-sm font-semibold bg-primary text-white border-none rounded-sm cursor-pointer font-[inherit]"
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
              className="bg-transparent border-none text-text-secondary text-sm cursor-pointer p-0 mb-2 font-[inherit]"
              onClick={() => setStep('scan')}
              aria-label="Go back to scan step"
            >
              &larr; Back
            </button>
            <p className="text-sm text-text-secondary mb-4 mt-0 text-center">
              Enter the 6-digit code from your authenticator app
            </p>
            <CodeInput
              onComplete={handleVerify}
              error={error}
              disabled={loading}
              autoFocus
            />
            {loading && (
              <p className="text-center text-sm text-text-tertiary mt-2">
                Verifying...
              </p>
            )}
          </div>
        )}

        {/* Step 4: Backup codes */}
        {step === 'backup' && (
          <div>
            <p className="text-sm text-text-secondary mb-2 mt-0 text-center">
              Save these backup codes in a safe place. Each code can only be used once.
            </p>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {backupCodes.map((code, i) => (
                <div key={i} className="px-3 py-2 bg-surface-panel border border-border rounded-sm font-mono text-sm text-text-primary text-center">
                  {code}
                </div>
              ))}
            </div>
            <button
              type="button"
              className="w-full px-4 py-3 text-sm font-semibold bg-primary text-white border-none rounded-sm cursor-pointer font-[inherit]"
              onClick={handleCopyAll}
            >
              {copied ? 'Copied!' : 'Copy All'}
            </button>
            <button
              type="button"
              className="w-full px-4 py-2.5 text-sm font-medium bg-surface text-text-secondary border border-border rounded-sm cursor-pointer font-[inherit] mt-2"
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
