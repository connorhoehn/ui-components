// src/components/identity/auth/MfaVerifyPage.tsx
//
// MFA verification page: enter a 6-digit TOTP code or a backup code.

import { useState, useCallback } from 'react';
import { CodeInput } from '../shared/CodeInput';
import { cn } from '../../../lib/cn';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface MfaVerifyPageProps {
  onVerify: (code: string) => Promise<void>;
  onVerifyBackup: (code: string) => Promise<void>;
  error?: string | null;
}

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
    <div className="min-h-screen flex items-center justify-center p-6 bg-surface-panel">
      <div className="w-full max-w-[420px] bg-surface rounded-md shadow-md p-6" role="main" aria-label="Multi-factor verification">
        <h1 className="text-lg font-semibold text-text-primary mb-2 mt-0 text-center">Verify Your Identity</h1>

        {mode === 'totp' ? (
          <>
            <p className="text-sm text-text-secondary mb-4 mt-0 text-center">
              Enter the 6-digit code from your authenticator app
            </p>

            {displayError && (
              <div role="alert" className="px-3.5 py-2.5 mb-4 bg-danger/10 border border-danger rounded-sm text-danger text-sm">
                {displayError}
              </div>
            )}

            <CodeInput
              onComplete={handleTotpComplete}
              error={null}
              disabled={loading}
              autoFocus
            />

            {loading && <p className="text-center text-sm text-text-tertiary mt-2">Verifying...</p>}

            <button
              type="button"
              className="block text-center mt-4 text-sm text-primary bg-transparent border-none cursor-pointer font-[inherit] underline mx-auto"
              onClick={() => { setMode('backup'); setLocalError(null); }}
            >
              Use a backup code instead
            </button>
          </>
        ) : (
          <>
            <p className="text-sm text-text-secondary mb-4 mt-0 text-center">
              Enter one of your backup codes
            </p>

            {displayError && (
              <div role="alert" className="px-3.5 py-2.5 mb-4 bg-danger/10 border border-danger rounded-sm text-danger text-sm">
                {displayError}
              </div>
            )}

            <form onSubmit={handleBackupSubmit} aria-label="Backup code verification">
              <div className="flex flex-col gap-1 mb-4">
                <label className="text-sm text-text-secondary font-medium" htmlFor="backup-code">Backup Code</label>
                <input
                  id="backup-code"
                  type="text"
                  required
                  value={backupCode}
                  onChange={e => setBackupCode(e.target.value)}
                  className="px-3 py-2.5 text-sm border border-border rounded-sm bg-surface text-text-primary font-mono outline-none w-full box-border focus:ring-2 focus:ring-primary/25 focus:border-primary"
                  disabled={loading}
                  autoFocus
                  autoComplete="off"
                  placeholder="XXXX-XXXX-XXXX"
                />
              </div>
              <button
                type="submit"
                className={cn(
                  'w-full px-4 py-3 text-sm font-semibold bg-primary text-white border-none rounded-sm font-[inherit]',
                  loading ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'
                )}
                disabled={loading || !backupCode.trim()}
              >
                {loading ? 'Verifying...' : 'Verify Backup Code'}
              </button>
            </form>

            <button
              type="button"
              className="block text-center mt-4 text-sm text-primary bg-transparent border-none cursor-pointer font-[inherit] underline mx-auto"
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
