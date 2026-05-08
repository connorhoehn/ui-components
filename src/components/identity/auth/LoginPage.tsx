import { useState, useCallback } from 'react';
import { FormField } from '../shared/FormField';
import { Button } from '../../ui/Button';
import Banner from '../../shared/Banner';
import { cn } from '../../../lib/cn';

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

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirm, setRegConfirm] = useState('');
  const [regGivenName, setRegGivenName] = useState('');
  const [regFamilyName, setRegFamilyName] = useState('');
  const [regEnableMfa, setRegEnableMfa] = useState(false);

  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState(false);

  const displayError = error || localError;

  const handleLogin = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    setLoading(true);
    try {
      await onLogin(loginEmail, loginPassword);
    } catch (err: unknown) {
      setLocalError(err instanceof Error ? err.message : 'Login failed');
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
    } catch (err: unknown) {
      setLocalError(err instanceof Error ? err.message : 'Registration failed');
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
    } catch (err: unknown) {
      setLocalError(err instanceof Error ? err.message : 'Request failed');
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
    <div className="min-h-full flex items-center justify-center p-6 bg-slate-50">
      <div className="w-full max-w-[440px] bg-white rounded-xl shadow-md p-8" role="main" aria-label="Authentication">
        <header className="flex flex-col items-center gap-3 mb-6">
          {logoUrl && <img src={logoUrl} alt="" className="w-14 h-14 object-contain rounded-md" />}
          {clientName && <h1 className="text-xl font-bold text-slate-800 m-0">{clientName}</h1>}
        </header>

        <nav className="flex border-b border-slate-200 mb-6" role="tablist" aria-label="Authentication method">
          <Button
            variant="ghost"
            size="sm"
            role="tab"
            aria-selected={tab === 'signin'}
            className={cn(
              'flex-1 rounded-none border-b-2',
              tab === 'signin'
                ? 'border-b-[#3b82f6] text-blue-600 font-semibold'
                : 'border-b-transparent text-slate-500 font-normal'
            )}
            onClick={() => switchTab('signin')}
          >
            Sign In
          </Button>
          {registrationEnabled && (
            <Button
              variant="ghost"
              size="sm"
              role="tab"
              aria-selected={tab === 'register'}
              className={cn(
                'flex-1 rounded-none border-b-2',
                tab === 'register'
                  ? 'border-b-[#3b82f6] text-blue-600 font-semibold'
                  : 'border-b-transparent text-slate-500 font-normal'
              )}
              onClick={() => switchTab('register')}
            >
              Register
            </Button>
          )}
          {forgotPasswordEnabled && (
            <Button
              variant="ghost"
              size="sm"
              role="tab"
              aria-selected={tab === 'forgot'}
              className={cn(
                'flex-1 rounded-none border-b-2',
                tab === 'forgot'
                  ? 'border-b-[#3b82f6] text-blue-600 font-semibold'
                  : 'border-b-transparent text-slate-500 font-normal'
              )}
              onClick={() => switchTab('forgot')}
            >
              Forgot Password
            </Button>
          )}
        </nav>

        {displayError && (
          <div className="mb-5">
            <Banner variant="error">{displayError}</Banner>
          </div>
        )}

        {tab === 'signin' && (
          <form onSubmit={handleLogin} aria-label="Sign in form">
            <input type="hidden" name="uid" value={uid} />
            <FormField
              label="Email"
              name="login-email"
              type="email"
              value={loginEmail}
              onChange={(v) => setLoginEmail(String(v))}
              required
              placeholder="you@example.com"
              disabled={loading}
            />
            <FormField
              label="Password"
              name="login-password"
              type="password"
              value={loginPassword}
              onChange={(v) => setLoginPassword(String(v))}
              required
              disabled={loading}
            />
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
        )}

        {tab === 'register' && (
          <form onSubmit={handleRegister} aria-label="Registration form">
            <FormField
              label="Email"
              name="reg-email"
              type="email"
              value={regEmail}
              onChange={(v) => setRegEmail(String(v))}
              required
              placeholder="you@example.com"
              disabled={loading}
            />
            <div className="flex gap-3">
              <div className="flex-1">
                <FormField
                  label="Given Name"
                  name="reg-given"
                  value={regGivenName}
                  onChange={(v) => setRegGivenName(String(v))}
                  disabled={loading}
                />
              </div>
              <div className="flex-1">
                <FormField
                  label="Family Name"
                  name="reg-family"
                  value={regFamilyName}
                  onChange={(v) => setRegFamilyName(String(v))}
                  disabled={loading}
                />
              </div>
            </div>
            <FormField
              label="Password"
              name="reg-password"
              type="password"
              value={regPassword}
              onChange={(v) => setRegPassword(String(v))}
              required
              disabled={loading}
            />
            <FormField
              label="Confirm Password"
              name="reg-confirm"
              type="password"
              value={regConfirm}
              onChange={(v) => setRegConfirm(String(v))}
              required
              disabled={loading}
            />
            <FormField
              label="Enable Multi-Factor Authentication"
              name="reg-mfa"
              type="checkbox"
              value={regEnableMfa}
              onChange={(v) => setRegEnableMfa(Boolean(v))}
              disabled={loading}
            />
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              disabled={loading}
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>
        )}

        {tab === 'forgot' && (
          <form onSubmit={handleForgot} aria-label="Forgot password form">
            {forgotSuccess ? (
              <Banner variant="success">
                If an account exists for that email, a password reset link has been sent.
              </Banner>
            ) : (
              <>
                <p className="text-sm text-slate-500 mb-4 mt-0 leading-relaxed">
                  Enter your email address and we'll send you a link to reset your password.
                </p>
                <FormField
                  label="Email"
                  name="forgot-email"
                  type="email"
                  value={forgotEmail}
                  onChange={(v) => setForgotEmail(String(v))}
                  required
                  placeholder="you@example.com"
                  disabled={loading}
                />
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Send Reset Link'}
                </Button>
              </>
            )}
          </form>
        )}
      </div>
    </div>
  );
}

export default LoginPage;
