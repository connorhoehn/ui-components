import { useState, useCallback } from 'react';
import { FormField } from '../shared/FormField';
import { QrCodeDisplay } from '../shared/QrCodeDisplay';
import { CodeInput } from '../shared/CodeInput';
import { Button } from '../../ui/Button';
import Banner from '../../shared/Banner';
import { cn } from '../../../lib/cn';

/** The four wizard steps, in the order the user walks them. */
export type MfaSetupStep = 'name' | 'scan' | 'verify' | 'backup';

/** The enrolment payload the identity server returns from `onSetup`. */
export interface MfaSetupResult {
  deviceId: string;
  qrCode: string;
  secret: string;
  backupCodes: string[];
}

export interface MfaSetupPageProps {
  onSetup: (deviceName: string) => Promise<MfaSetupResult>;
  onVerify: (deviceId: string, code: string) => Promise<{
    success: boolean;
    backupCodes?: string[];
  }>;
  onComplete: () => void;
  userEmail?: string;
  /**
   * Step the wizard opens on. Optional and **initial-only** — the page keeps
   * owning the step afterwards, so Back/Continue still work exactly as they
   * do without the prop. Omit it and the wizard opens on `'name'`, which is
   * the historical behaviour.
   *
   * It exists because every step past the first was previously reachable
   * only by clicking through the one before it: a host cannot deep-link a
   * user back into a half-finished enrolment (`/mfa/setup?step=scan` after a
   * reload), a story cannot show the scan or backup screens, and a test has
   * to drive the whole flow to assert on the last one.
   *
   * `'scan'` renders the QR code, so it needs `initialSetupResult` as well;
   * without it the wizard falls back to `'name'` rather than rendering an
   * empty card.
   */
  initialStep?: MfaSetupStep;
  /**
   * Seeds the enrolment payload that `onSetup` would normally have returned,
   * so `initialStep` can open on a step that needs it — `'scan'` (QR code +
   * secret) and `'backup'` (the backup-code grid). Initial-only: a later
   * real `onSetup` call replaces it.
   *
   * Use it when the host already holds the payload (resuming an enrolment
   * after a reload) or when a story/test wants a specific step rendered
   * directly instead of clicking to it.
   */
  initialSetupResult?: MfaSetupResult;
  /**
   * Seeds the device-name field, so a wizard opened at a later
   * `initialStep` still shows the name the user typed on step 1 (it appears
   * as the QR caption). Initial-only — the field stays editable.
   */
  initialDeviceName?: string;
}

const STEPS: MfaSetupStep[] = ['name', 'scan', 'verify', 'backup'];
const STEP_LABELS = ['Name', 'Scan', 'Verify', 'Backup'];

export function MfaSetupPage({
  onSetup,
  onVerify,
  onComplete,
  userEmail,
  initialStep = 'name',
  initialSetupResult,
  initialDeviceName = '',
}: MfaSetupPageProps) {
  // 'scan' is the only step that renders nothing without an enrolment
  // payload, so treat a payload-less request for it as "start at the top"
  // rather than mounting a blank card.
  const [step, setStep] = useState<MfaSetupStep>(
    initialStep === 'scan' && !initialSetupResult ? 'name' : initialStep,
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [deviceName, setDeviceName] = useState(initialDeviceName);

  const [setupResult, setSetupResult] = useState<MfaSetupResult | null>(
    initialSetupResult ?? null,
  );

  const [backupCodes, setBackupCodes] = useState<string[]>(
    initialSetupResult?.backupCodes ?? [],
  );
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
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Setup failed');
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
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Verification failed');
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
    <div className="min-h-full flex items-center justify-center p-6 bg-surface-panel">
      <div className="w-full max-w-[480px] bg-white rounded-xl shadow-md p-8" role="main" aria-label="MFA setup">
        <h1 className="text-xl font-bold text-text-primary mb-2 mt-0 text-center">
          Set Up Multi-Factor Authentication
        </h1>
        {userEmail && <p className="text-sm text-neutral mb-5 mt-0 text-center">{userEmail}</p>}

        {/* Step indicator */}
        <div className="flex justify-center gap-6 mb-6" role="group" aria-label="Setup progress">
          {STEPS.map((s, i) => (
            <div key={s} className="flex flex-col items-center gap-1.5">
              <div
                className={cn(
                  'w-3 h-3 rounded-full transition-colors duration-200',
                  i < currentStepIndex ? 'bg-success' : i === currentStepIndex ? 'bg-info' : 'bg-surface-emphasis'
                )}
                aria-label={`Step ${i + 1}${i === currentStepIndex ? ' (current)' : i < currentStepIndex ? ' (completed)' : ''}`}
              />
              <span className={cn(
                'text-[10px] uppercase tracking-wide font-medium',
                i === currentStepIndex ? 'text-text-primary' : 'text-text-tertiary'
              )}>
                {STEP_LABELS[i]}
              </span>
            </div>
          ))}
        </div>

        {error && (
          <div className="mb-5">
            <Banner variant="error">{error}</Banner>
          </div>
        )}

        {step === 'name' && (
          <form onSubmit={handleNameSubmit} aria-label="Name your device">
            <p className="text-sm text-neutral mb-4 mt-0 text-center leading-relaxed">
              Give your authenticator device a name so you can identify it later.
            </p>
            <FormField
              label="Device Name"
              name="device-name"
              value={deviceName}
              onChange={(v) => setDeviceName(String(v))}
              required
              placeholder="e.g., My Phone"
              disabled={loading}
            />
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              disabled={loading || !deviceName.trim()}
            >
              {loading ? 'Setting up...' : 'Continue'}
            </Button>
          </form>
        )}

        {step === 'scan' && setupResult && (
          <div>
            <Button
              variant="ghost"
              size="sm"
              className="p-0 mb-4"
              onClick={() => setStep('name')}
              aria-label="Go back to name step"
            >
              &larr; Back
            </Button>
            <p className="text-sm text-neutral mb-5 mt-0 text-center leading-relaxed">
              Scan this QR code with your authenticator app
            </p>
            <div className="flex justify-center mb-5">
              <QrCodeDisplay
                value={setupResult.qrCode}
                size={200}
                // Never empty on the normal path (step 1 requires a name);
                // guards the caption when a host deep-links straight to
                // 'scan' without seeding `initialDeviceName`.
                label={deviceName ? `Device: ${deviceName}` : undefined}
              />
            </div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-text-tertiary text-center mb-2 mt-0">
              Or enter this secret manually
            </p>
            <div className="px-4 py-3 bg-surface-panel border border-border rounded-md font-mono text-sm text-text-primary break-all text-center mb-6 select-all">
              {setupResult.secret}
            </div>
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={() => setStep('verify')}
            >
              I&apos;ve scanned it
            </Button>
          </div>
        )}

        {step === 'verify' && (
          <div>
            <Button
              variant="ghost"
              size="sm"
              className="p-0 mb-4"
              onClick={() => setStep('scan')}
              aria-label="Go back to scan step"
            >
              &larr; Back
            </Button>
            <p className="text-sm text-neutral mb-6 mt-0 text-center leading-relaxed">
              Enter the 6-digit code from your authenticator app to confirm setup
            </p>
            <CodeInput
              onComplete={handleVerify}
              error={error}
              disabled={loading}
              autoFocus
            />
            {loading && (
              <p className="text-center text-sm text-text-tertiary mt-3">
                Verifying...
              </p>
            )}
          </div>
        )}

        {step === 'backup' && (
          <div>
            <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-success-bg flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-success-fg">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <p className="text-sm text-neutral mb-5 mt-0 text-center leading-relaxed">
              Save these backup codes in a safe place. Each code can only be used once.
            </p>
            <div className="grid grid-cols-2 gap-2.5 mb-6">
              {backupCodes.map((code, i) => (
                <div key={i} className="px-3 py-2.5 bg-surface-panel border border-border rounded-md font-mono text-sm text-text-primary text-center select-all">
                  {code}
                </div>
              ))}
            </div>
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={handleCopyAll}
            >
              {copied ? 'Copied!' : 'Copy All Codes'}
            </Button>
            <div className="mt-3">
              <Button
                variant="ghost"
                size="lg"
                fullWidth
                onClick={onComplete}
              >
                I&apos;ve saved them &mdash; Continue
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MfaSetupPage;
