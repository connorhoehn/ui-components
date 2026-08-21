import { useState, useCallback } from 'react';
import { FormField } from '../shared/FormField';
import { CodeInput } from '../shared/CodeInput';
import { Button } from '../../ui/Button';
import Banner from '../../shared/Banner';

export interface MfaVerifyPageProps {
  onVerify: (code: string) => Promise<void>;
  onVerifyBackup: (code: string) => Promise<void>;
  error?: string | null;
}

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
    } catch (err: unknown) {
      setLocalError(err instanceof Error ? err.message : 'Verification failed');
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
    } catch (err: unknown) {
      setLocalError(err instanceof Error ? err.message : 'Verification failed');
    } finally {
      setLoading(false);
    }
  }, [backupCode, onVerifyBackup]);

  return (
    <div className="min-h-full flex items-center justify-center p-6 bg-surface-panel">
      <div className="w-full max-w-[440px] bg-white rounded-xl shadow-md p-8" role="main" aria-label="Multi-factor verification">
        <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-info-bg flex items-center justify-center">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-info-fg">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>

        <h1 className="text-xl font-bold text-text-primary mb-2 mt-0 text-center">Verify Your Identity</h1>

        {mode === 'totp' ? (
          <>
            <p className="text-sm text-neutral mb-6 mt-0 text-center leading-relaxed">
              Enter the 6-digit code from your authenticator app
            </p>

            {displayError && (
              <div className="mb-5">
                <Banner variant="error">{displayError}</Banner>
              </div>
            )}

            <CodeInput
              onComplete={handleTotpComplete}
              error={null}
              disabled={loading}
              autoFocus
            />

            {loading && <p className="text-center text-sm text-text-tertiary mt-3">Verifying...</p>}

            <Button
              variant="ghost"
              size="sm"
              className="block mt-6 mx-auto underline text-info-fg"
              onClick={() => { setMode('backup'); setLocalError(null); }}
            >
              Use a backup code instead
            </Button>
          </>
        ) : (
          <>
            <p className="text-sm text-neutral mb-6 mt-0 text-center leading-relaxed">
              Enter one of your backup codes
            </p>

            {displayError && (
              <div className="mb-5">
                <Banner variant="error">{displayError}</Banner>
              </div>
            )}

            <form onSubmit={handleBackupSubmit} aria-label="Backup code verification">
              <FormField
                label="Backup Code"
                name="backup-code"
                value={backupCode}
                onChange={(v) => setBackupCode(String(v))}
                required
                placeholder="XXXX-XXXX-XXXX"
                disabled={loading}
              />
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                disabled={loading || !backupCode.trim()}
              >
                {loading ? 'Verifying...' : 'Verify Backup Code'}
              </Button>
            </form>

            <Button
              variant="ghost"
              size="sm"
              className="block mt-6 mx-auto underline text-info-fg"
              onClick={() => { setMode('totp'); setLocalError(null); }}
            >
              Use authenticator code instead
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

export default MfaVerifyPage;
