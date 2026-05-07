// src/components/identity/auth/LoginPage.tsx
//
// Tabbed authentication page: Sign In, Register, Forgot Password.
// Props-driven with async handlers — no internal routing.

import { useState, useCallback } from 'react';
import { cn } from '../../../lib/cn';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface LoginPageProps {
  uid: string;
  interactionUrl: string;
  clientName?: string;
  logoUrl?: string;
  error?: string | null;
  onLogin: (email: string, password: string) => Promise<void>;
  onRegister: (data: {
    email: string;
    password: string;
    givenName?: string;
    familyName?: string;
    enableMfa?: boolean;
  }) => Promise<void>;
  onForgotPassword: (email: string) => Promise<void>;
  registrationEnabled?: boolean;
  forgotPasswordEnabled?: boolean;
}

type Tab = 'signin' | 'register' | 'forgot';

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function LoginPage({
  uid,
  interactionUrl,
  clientName,
  logoUrl,
  error = null,
  onLogin,
  onRegister,
  onForgotPassword,
  registrationEnabled = true,
  forgotPasswordEnabled = true,
}: LoginPageProps) {
  const [tab, setTab] = useState<Tab>('signin');
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  // Sign In state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register state
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirm, setRegConfirm] = useState('');
  const [regGivenName, setRegGivenName] = useState('');
  const [regFamilyName, setRegFamilyName] = useState('');
  const [regEnableMfa, setRegEnableMfa] = useState(false);

  // Forgot Password state
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState(false);

  const displayError = error || localError;

  const handleLogin = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    setLoading(true);
    try {
      await onLogin(loginEmail, loginPassword);
    } catch (err: any) {
      setLocalError(err?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  }, [loginEmail, loginPassword, onLogin]);

  const handleRegister = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    if (regPassword !== regConfirm) {
      setLocalError('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      await onRegister({
        email: regEmail,
        password: regPassword,
        givenName: regGivenName || undefined,
        familyName: regFamilyName || undefined,
        enableMfa: regEnableMfa || undefined,
      });
    } catch (err: any) {
      setLocalError(err?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  }, [regEmail, regPassword, regConfirm, regGivenName, regFamilyName, regEnableMfa, onRegister]);

  const handleForgot = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    setLoading(true);
    try {
      await onForgotPassword(forgotEmail);
      setForgotSuccess(true);
    } catch (err: any) {
      setLocalError(err?.message || 'Request failed');
    } finally {
      setLoading(false);
    }
  }, [forgotEmail, onForgotPassword]);

  const switchTab = (t: Tab) => {
    setTab(t);
    setLocalError(null);
    setForgotSuccess(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-surface-panel">
      <div className="w-full max-w-[420px] bg-surface rounded-md shadow-md p-6" role="main" aria-label="Authentication">
        {/* Header */}
        <header className="flex flex-col items-center gap-2 mb-4">
          {logoUrl && <img src={logoUrl} alt="" className="w-12 h-12 object-contain rounded-sm" />}
          {clientName && <h1 className="text-lg font-semibold text-text-primary m-0">{clientName}</h1>}
        </header>

        {/* Tabs */}
        <nav className="flex border-b border-border mb-4" role="tablist" aria-label="Authentication method">
          <button
            role="tab"
            aria-selected={tab === 'signin'}
            className={cn(
              'flex-1 px-2 py-2.5 bg-transparent border-none border-b-2 text-sm cursor-pointer font-[inherit] transition-[color,border-color] duration-150',
              tab === 'signin'
                ? 'border-b-primary text-primary font-semibold'
                : 'border-b-transparent text-text-secondary font-normal'
            )}
            onClick={() => switchTab('signin')}
            type="button"
          >
            Sign In
          </button>
          {registrationEnabled && (
            <button
              role="tab"
              aria-selected={tab === 'register'}
              className={cn(
                'flex-1 px-2 py-2.5 bg-transparent border-none border-b-2 text-sm cursor-pointer font-[inherit] transition-[color,border-color] duration-150',
                tab === 'register'
                  ? 'border-b-primary text-primary font-semibold'
                  : 'border-b-transparent text-text-secondary font-normal'
              )}
              onClick={() => switchTab('register')}
              type="button"
            >
              Register
            </button>
          )}
          {forgotPasswordEnabled && (
            <button
              role="tab"
              aria-selected={tab === 'forgot'}
              className={cn(
                'flex-1 px-2 py-2.5 bg-transparent border-none border-b-2 text-sm cursor-pointer font-[inherit] transition-[color,border-color] duration-150',
                tab === 'forgot'
                  ? 'border-b-primary text-primary font-semibold'
                  : 'border-b-transparent text-text-secondary font-normal'
              )}
              onClick={() => switchTab('forgot')}
              type="button"
            >
              Forgot Password
            </button>
          )}
        </nav>

        {/* Error */}
        {displayError && (
          <div role="alert" className="px-3.5 py-2.5 mb-4 bg-danger/10 border border-danger rounded-sm text-danger text-sm">
            {displayError}
          </div>
        )}

        {/* Sign In */}
        {tab === 'signin' && (
          <form onSubmit={handleLogin} aria-label="Sign in form">
            <input type="hidden" name="uid" value={uid} />
            <div className="flex flex-col gap-1 mb-3">
              <label className="text-sm text-text-secondary font-medium" htmlFor="login-email">Email</label>
              <input
                id="login-email"
                type="email"
                required
                autoComplete="email"
                value={loginEmail}
                onChange={e => setLoginEmail(e.target.value)}
                className="px-3 py-2.5 text-sm border border-border rounded-sm bg-surface text-text-primary font-[inherit] outline-none w-full box-border focus:ring-2 focus:ring-primary/25 focus:border-primary"
                disabled={loading}
              />
            </div>
            <div className="flex flex-col gap-1 mb-3">
              <label className="text-sm text-text-secondary font-medium" htmlFor="login-password">Password</label>
              <input
                id="login-password"
                type="password"
                required
                autoComplete="current-password"
                value={loginPassword}
                onChange={e => setLoginPassword(e.target.value)}
                className="px-3 py-2.5 text-sm border border-border rounded-sm bg-surface text-text-primary font-[inherit] outline-none w-full box-border focus:ring-2 focus:ring-primary/25 focus:border-primary"
                disabled={loading}
              />
            </div>
            <button
              type="submit"
              className={cn(
                'w-full px-4 py-3 text-sm font-semibold bg-primary text-white border-none rounded-sm font-[inherit] mt-2',
                loading ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'
              )}
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        )}

        {/* Register */}
        {tab === 'register' && (
          <form onSubmit={handleRegister} aria-label="Registration form">
            <div className="flex flex-col gap-1 mb-3">
              <label className="text-sm text-text-secondary font-medium" htmlFor="reg-email">Email</label>
              <input
                id="reg-email"
                type="email"
                required
                autoComplete="email"
                value={regEmail}
                onChange={e => setRegEmail(e.target.value)}
                className="px-3 py-2.5 text-sm border border-border rounded-sm bg-surface text-text-primary font-[inherit] outline-none w-full box-border focus:ring-2 focus:ring-primary/25 focus:border-primary"
                disabled={loading}
              />
            </div>
            <div className="flex gap-2">
              <div className="flex flex-col gap-1 mb-3 flex-1">
                <label className="text-sm text-text-secondary font-medium" htmlFor="reg-given">Given Name</label>
                <input
                  id="reg-given"
                  type="text"
                  autoComplete="given-name"
                  value={regGivenName}
                  onChange={e => setRegGivenName(e.target.value)}
                  className="px-3 py-2.5 text-sm border border-border rounded-sm bg-surface text-text-primary font-[inherit] outline-none w-full box-border focus:ring-2 focus:ring-primary/25 focus:border-primary"
                  disabled={loading}
                />
              </div>
              <div className="flex flex-col gap-1 mb-3 flex-1">
                <label className="text-sm text-text-secondary font-medium" htmlFor="reg-family">Family Name</label>
                <input
                  id="reg-family"
                  type="text"
                  autoComplete="family-name"
                  value={regFamilyName}
                  onChange={e => setRegFamilyName(e.target.value)}
                  className="px-3 py-2.5 text-sm border border-border rounded-sm bg-surface text-text-primary font-[inherit] outline-none w-full box-border focus:ring-2 focus:ring-primary/25 focus:border-primary"
                  disabled={loading}
                />
              </div>
            </div>
            <div className="flex flex-col gap-1 mb-3">
              <label className="text-sm text-text-secondary font-medium" htmlFor="reg-password">Password</label>
              <input
                id="reg-password"
                type="password"
                required
                autoComplete="new-password"
                value={regPassword}
                onChange={e => setRegPassword(e.target.value)}
                className="px-3 py-2.5 text-sm border border-border rounded-sm bg-surface text-text-primary font-[inherit] outline-none w-full box-border focus:ring-2 focus:ring-primary/25 focus:border-primary"
                disabled={loading}
              />
            </div>
            <div className="flex flex-col gap-1 mb-3">
              <label className="text-sm text-text-secondary font-medium" htmlFor="reg-confirm">Confirm Password</label>
              <input
                id="reg-confirm"
                type="password"
                required
                autoComplete="new-password"
                value={regConfirm}
                onChange={e => setRegConfirm(e.target.value)}
                className="px-3 py-2.5 text-sm border border-border rounded-sm bg-surface text-text-primary font-[inherit] outline-none w-full box-border focus:ring-2 focus:ring-primary/25 focus:border-primary"
                disabled={loading}
              />
            </div>
            <label className="flex items-center gap-2 mb-3 text-sm text-text-secondary">
              <input
                type="checkbox"
                checked={regEnableMfa}
                onChange={e => setRegEnableMfa(e.target.checked)}
                disabled={loading}
              />
              Enable Multi-Factor Authentication
            </label>
            <button
              type="submit"
              className={cn(
                'w-full px-4 py-3 text-sm font-semibold bg-primary text-white border-none rounded-sm font-[inherit] mt-2',
                loading ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'
              )}
              disabled={loading}
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>
        )}

        {/* Forgot Password */}
        {tab === 'forgot' && (
          <form onSubmit={handleForgot} aria-label="Forgot password form">
            {forgotSuccess ? (
              <div className="px-3.5 py-2.5 bg-success/10 border border-success rounded-sm text-success text-sm">
                If an account exists for that email, a password reset link has been sent.
              </div>
            ) : (
              <>
                <div className="flex flex-col gap-1 mb-3">
                  <label className="text-sm text-text-secondary font-medium" htmlFor="forgot-email">Email</label>
                  <input
                    id="forgot-email"
                    type="email"
                    required
                    autoComplete="email"
                    value={forgotEmail}
                    onChange={e => setForgotEmail(e.target.value)}
                    className="px-3 py-2.5 text-sm border border-border rounded-sm bg-surface text-text-primary font-[inherit] outline-none w-full box-border focus:ring-2 focus:ring-primary/25 focus:border-primary"
                    disabled={loading}
                  />
                </div>
                <button
                  type="submit"
                  className={cn(
                    'w-full px-4 py-3 text-sm font-semibold bg-primary text-white border-none rounded-sm font-[inherit] mt-2',
                    loading ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'
                  )}
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Send Reset Link'}
                </button>
              </>
            )}
          </form>
        )}
      </div>
    </div>
  );
}

export default LoginPage;
