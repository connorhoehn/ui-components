// Auth flow pages — the OIDC interaction screens. Presentational: each
// takes the interaction state and reports the user's decision.

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { LoginPage } from '../LoginPage';
import { ConsentPage } from '../ConsentPage';
import { MfaVerifyPage } from '../MfaVerifyPage';
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
