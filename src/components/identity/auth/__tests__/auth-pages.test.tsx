// Auth flow pages — the OIDC interaction screens. Presentational: each
// takes the interaction state and reports the user's decision.

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { LoginPage } from '../LoginPage';
import { ConsentPage } from '../ConsentPage';
import { MfaVerifyPage } from '../MfaVerifyPage';
import { MfaSetupPage } from '../MfaSetupPage';
import { LogoutPage } from '../LogoutPage';
import { ErrorPage } from '../ErrorPage';

const resolved = () => vi.fn().mockResolvedValue(undefined);

describe('LoginPage', () => {
  const renderLogin = (over: Partial<Parameters<typeof LoginPage>[0]> = {}) => {
    const props = {
      uid: 'i-1', interactionUrl: '/interaction/i-1',
      onLogin: resolved(), onRegister: resolved(), onForgotPassword: resolved(),
      ...over,
    };
    render(<LoginPage {...props} />);
    return props;
  };

  it('submits email + password through onLogin', async () => {
    const p = renderLogin();
    fireEvent.change(screen.getByLabelText(/Email/), { target: { value: 'ada@x.co' } });
    fireEvent.change(screen.getByLabelText(/Password/), { target: { value: 'hunter2' } });
    fireEvent.submit(screen.getByRole('form', { name: /Sign in form/i }));
    await waitFor(() => expect(p.onLogin).toHaveBeenCalledWith('ada@x.co', 'hunter2'));
  });

  it('shows the error banner when the interaction carries an error', () => {
    renderLogin({ error: 'Invalid credentials' });
    expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
  });

  it('hides registration when registrationEnabled is false', () => {
    renderLogin({ registrationEnabled: false });
    expect(screen.queryByRole('tab', { name: /Register|Sign up|Create/i })).toBeNull();
  });
});

describe('ConsentPage', () => {
  it('lists the requested scopes and reports authorize/deny', async () => {
    const onAuthorize = resolved();
    const onDeny = resolved();
    render(
      <ConsentPage clientName="Portal" scopes={['openid', 'email']} onAuthorize={onAuthorize} onDeny={onDeny} />,
    );
    expect(screen.getByText(/Portal/)).toBeInTheDocument();
    expect(screen.getByText(/email/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Authorize|Allow/i }));
    await waitFor(() => expect(onAuthorize).toHaveBeenCalled());
    expect(onDeny).not.toHaveBeenCalled();
  });
});

describe('MfaVerifyPage', () => {
  it('verifies the entered 6-digit code', async () => {
    const onVerify = resolved();
    render(<MfaVerifyPage onVerify={onVerify} onVerifyBackup={resolved()} />);
    const digits = screen.getAllByRole('textbox');
    '123456'.split('').forEach((d, i) => {
      fireEvent.change(digits[i], { target: { value: d } });
    });
    await waitFor(() => expect(onVerify).toHaveBeenCalledWith('123456'));
  });

  it('surfaces a verification error', () => {
    render(<MfaVerifyPage onVerify={resolved()} onVerifyBackup={resolved()} error="Code expired" />);
    expect(screen.getByText('Code expired')).toBeInTheDocument();
  });
});

describe('LogoutPage', () => {
  it('confirms sign-out', () => {
    const onConfirm = vi.fn();
    render(<LogoutPage onConfirm={onConfirm} clientName="Portal" />);
    fireEvent.click(screen.getByRole('button', { name: /Sign out|Log out|Yes/i }));
    expect(onConfirm).toHaveBeenCalled();
  });
});

describe('ErrorPage', () => {
  it('renders the message and optional retry', () => {
    const onRetry = vi.fn();
    render(<ErrorPage message="The interaction expired." onRetry={onRetry} />);
    expect(screen.getByText('The interaction expired.')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Try again|Retry/i }));
    expect(onRetry).toHaveBeenCalled();
  });
});

// ---------------------------------------------------------------------------
// Initial-state props
//
// LoginPage/MfaVerifyPage/MfaSetupPage each keep their tab/mode/step in
// internal state. The `defaultTab` / `defaultMode` / `initialStep` props seed
// that state so every screen can be rendered directly instead of clicked to.
// Each block asserts BOTH halves of the contract: omitting the prop keeps
// today's behaviour, and supplying it opens on the requested screen while
// leaving the component in charge of the state afterwards.
// ---------------------------------------------------------------------------

describe('LoginPage defaultTab', () => {
  const base = {
    uid: 'i-1',
    interactionUrl: '/interaction/i-1',
    onLogin: resolved(),
    onRegister: resolved(),
    onForgotPassword: resolved(),
  };

  it('opens on the sign-in tab when defaultTab is omitted (unchanged default)', () => {
    render(<LoginPage {...base} />);
    expect(screen.getByRole('form', { name: /Sign in form/i })).toBeInTheDocument();
    expect(screen.queryByRole('form', { name: /Registration form/i })).toBeNull();
    expect(screen.getByRole('tab', { name: /Sign In/i })).toHaveAttribute('aria-selected', 'true');
  });

  it('opens directly on the registration form', () => {
    render(<LoginPage {...base} defaultTab="register" />);
    expect(screen.getByRole('form', { name: /Registration form/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Register/i })).toHaveAttribute('aria-selected', 'true');
  });

  it('opens directly on the forgot-password form', () => {
    render(<LoginPage {...base} defaultTab="forgot" />);
    expect(screen.getByRole('form', { name: /Forgot password form/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Forgot Password/i })).toHaveAttribute('aria-selected', 'true');
  });

  it('falls back to sign-in when the requested tab is disabled', () => {
    render(<LoginPage {...base} defaultTab="register" registrationEnabled={false} />);
    expect(screen.getByRole('form', { name: /Sign in form/i })).toBeInTheDocument();
    expect(screen.queryByRole('form', { name: /Registration form/i })).toBeNull();
  });

  it('stays uncontrolled — the tab bar still switches away from defaultTab', () => {
    render(<LoginPage {...base} defaultTab="register" />);
    fireEvent.click(screen.getByRole('tab', { name: /Sign In/i }));
    expect(screen.getByRole('form', { name: /Sign in form/i })).toBeInTheDocument();
    expect(screen.queryByRole('form', { name: /Registration form/i })).toBeNull();
  });
});

describe('MfaVerifyPage defaultMode', () => {
  const base = { onVerify: resolved(), onVerifyBackup: resolved() };

  it('opens on the TOTP challenge when defaultMode is omitted (unchanged default)', () => {
    render(<MfaVerifyPage {...base} />);
    expect(screen.getByText(/6-digit code from your authenticator app/i)).toBeInTheDocument();
    expect(screen.queryByRole('form', { name: /Backup code verification/i })).toBeNull();
  });

  it('opens directly on the backup-code form', () => {
    render(<MfaVerifyPage {...base} defaultMode="backup" />);
    expect(screen.getByRole('form', { name: /Backup code verification/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /Backup Code/i })).toBeInTheDocument();
  });

  it('submits the backup code from a directly-rendered backup form', async () => {
    const onVerifyBackup = resolved();
    render(<MfaVerifyPage onVerify={resolved()} onVerifyBackup={onVerifyBackup} defaultMode="backup" />);
    fireEvent.change(screen.getByRole('textbox', { name: /Backup Code/i }), { target: { value: 'AAAA-BBBB' } });
    fireEvent.submit(screen.getByRole('form', { name: /Backup code verification/i }));
    await waitFor(() => expect(onVerifyBackup).toHaveBeenCalledWith('AAAA-BBBB'));
  });

  it('stays uncontrolled — the link still flips back to the TOTP challenge', () => {
    render(<MfaVerifyPage {...base} defaultMode="backup" />);
    fireEvent.click(screen.getByRole('button', { name: /Use authenticator code instead/i }));
    expect(screen.queryByRole('form', { name: /Backup code verification/i })).toBeNull();
    expect(screen.getByText(/6-digit code from your authenticator app/i)).toBeInTheDocument();
  });
});

describe('MfaSetupPage initialStep', () => {
  const SETUP_RESULT = {
    deviceId: 'dev-1',
    qrCode: 'data:image/svg+xml;utf8,<svg/>',
    secret: 'JBSWY3DPEHPK3PXP',
    backupCodes: ['AAAA-1111', 'BBBB-2222'],
  };

  const base = {
    onSetup: vi.fn().mockResolvedValue(SETUP_RESULT),
    onVerify: vi.fn().mockResolvedValue({ success: true }),
    onComplete: vi.fn(),
  };

  it('opens on the name step when initialStep is omitted (unchanged default)', () => {
    render(<MfaSetupPage {...base} />);
    expect(screen.getByRole('form', { name: /Name your device/i })).toBeInTheDocument();
    expect(screen.getByLabelText('Step 1 (current)')).toBeInTheDocument();
  });

  it('opens directly on the scan step when the enrolment payload is seeded', () => {
    render(
      <MfaSetupPage
        {...base}
        initialStep="scan"
        initialSetupResult={SETUP_RESULT}
        initialDeviceName="Dana's Pixel"
      />,
    );
    expect(screen.getByText(/Scan this QR code/i)).toBeInTheDocument();
    expect(screen.getByText(SETUP_RESULT.secret)).toBeInTheDocument();
    expect(screen.getByText(/Device: Dana's Pixel/)).toBeInTheDocument();
    expect(screen.getByLabelText('Step 2 (current)')).toBeInTheDocument();
  });

  it('opens directly on the verify step', () => {
    render(<MfaSetupPage {...base} initialStep="verify" initialSetupResult={SETUP_RESULT} />);
    expect(screen.getByText(/Enter the 6-digit code/i)).toBeInTheDocument();
    expect(screen.getAllByRole('textbox')).toHaveLength(6);
    expect(screen.getByLabelText('Step 3 (current)')).toBeInTheDocument();
  });

  it('opens directly on the backup step and lists the seeded codes', () => {
    render(<MfaSetupPage {...base} initialStep="backup" initialSetupResult={SETUP_RESULT} />);
    expect(screen.getByText(/Save these backup codes/i)).toBeInTheDocument();
    for (const code of SETUP_RESULT.backupCodes) {
      expect(screen.getByText(code)).toBeInTheDocument();
    }
    expect(screen.getByLabelText('Step 4 (current)')).toBeInTheDocument();
  });

  it('falls back to the name step when scan is requested without a payload', () => {
    render(<MfaSetupPage {...base} initialStep="scan" />);
    expect(screen.getByRole('form', { name: /Name your device/i })).toBeInTheDocument();
    expect(screen.getByLabelText('Step 1 (current)')).toBeInTheDocument();
  });

  it('stays uncontrolled — Back still walks away from initialStep', () => {
    render(<MfaSetupPage {...base} initialStep="verify" initialSetupResult={SETUP_RESULT} />);
    fireEvent.click(screen.getByRole('button', { name: /Go back to scan step/i }));
    expect(screen.getByText(/Scan this QR code/i)).toBeInTheDocument();
  });

  it('verifies from a directly-rendered verify step using the seeded deviceId', async () => {
    const onVerify = vi.fn().mockResolvedValue({ success: true, backupCodes: ['ZZZZ-9999'] });
    render(
      <MfaSetupPage {...base} onVerify={onVerify} initialStep="verify" initialSetupResult={SETUP_RESULT} />,
    );
    const digits = screen.getAllByRole('textbox');
    '654321'.split('').forEach((d, i) => {
      fireEvent.change(digits[i], { target: { value: d } });
    });
    await waitFor(() => expect(onVerify).toHaveBeenCalledWith('dev-1', '654321'));
    await waitFor(() => expect(screen.getByText('ZZZZ-9999')).toBeInTheDocument());
  });
});
