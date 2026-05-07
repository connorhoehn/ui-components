// src/components/identity/auth/LoginPage.tsx
//
// Tabbed authentication page: Sign In, Register, Forgot Password.
// Props-driven with async handlers — no internal routing.

import { useState, useCallback } from 'react';

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
  header: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: 'var(--ui-spacingSm)',
    marginBottom: 'var(--ui-spacingMd)',
  } as React.CSSProperties,
  logo: {
    width: 48,
    height: 48,
    objectFit: 'contain' as const,
    borderRadius: 'var(--ui-radiusSm)',
  } as React.CSSProperties,
  clientName: {
    fontSize: 'var(--ui-fontSizeLg)',
    fontWeight: 600,
    color: 'var(--ui-textPrimary)',
    margin: 0,
  } as React.CSSProperties,
  tabs: {
    display: 'flex',
    gap: 0,
    borderBottom: '1px solid var(--ui-border)',
    marginBottom: 'var(--ui-spacingMd)',
  } as React.CSSProperties,
  tab: (active: boolean) => ({
    flex: 1,
    padding: '10px 8px',
    background: 'none',
    border: 'none',
    borderBottom: active ? '2px solid var(--ui-primary)' : '2px solid transparent',
    color: active ? 'var(--ui-primary)' : 'var(--ui-textSecondary)',
    fontWeight: active ? 600 : 400,
    fontSize: 'var(--ui-fontSizeSm)',
    cursor: 'pointer',
    fontFamily: 'inherit',
    transition: 'color 0.15s, border-color 0.15s',
  }) as React.CSSProperties,
  errorAlert: {
    padding: '10px 14px',
    marginBottom: 'var(--ui-spacingMd)',
    background: 'color-mix(in srgb, var(--ui-danger) 10%, transparent)',
    border: '1px solid var(--ui-danger)',
    borderRadius: 'var(--ui-radiusSm)',
    color: 'var(--ui-danger)',
    fontSize: 'var(--ui-fontSizeSm)',
  } as React.CSSProperties,
  field: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 4,
    marginBottom: 'var(--ui-spacingSm)',
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
  checkboxRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    marginBottom: 'var(--ui-spacingSm)',
    fontSize: 'var(--ui-fontSizeSm)',
    color: 'var(--ui-textSecondary)',
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
    marginTop: 'var(--ui-spacingSm)',
  }) as React.CSSProperties,
  successMessage: {
    padding: '10px 14px',
    background: 'color-mix(in srgb, var(--ui-success) 10%, transparent)',
    border: '1px solid var(--ui-success)',
    borderRadius: 'var(--ui-radiusSm)',
    color: 'var(--ui-success)',
    fontSize: 'var(--ui-fontSizeSm)',
  } as React.CSSProperties,
};

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
    <div style={styles.page}>
      <div style={styles.card} role="main" aria-label="Authentication">
        {/* Header */}
        <header style={styles.header}>
          {logoUrl && <img src={logoUrl} alt="" style={styles.logo} />}
          {clientName && <h1 style={styles.clientName}>{clientName}</h1>}
        </header>

        {/* Tabs */}
        <nav style={styles.tabs} role="tablist" aria-label="Authentication method">
          <button
            role="tab"
            aria-selected={tab === 'signin'}
            style={styles.tab(tab === 'signin')}
            onClick={() => switchTab('signin')}
            type="button"
          >
            Sign In
          </button>
          {registrationEnabled && (
            <button
              role="tab"
              aria-selected={tab === 'register'}
              style={styles.tab(tab === 'register')}
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
              style={styles.tab(tab === 'forgot')}
              onClick={() => switchTab('forgot')}
              type="button"
            >
              Forgot Password
            </button>
          )}
        </nav>

        {/* Error */}
        {displayError && (
          <div role="alert" style={styles.errorAlert}>{displayError}</div>
        )}

        {/* Sign In */}
        {tab === 'signin' && (
          <form onSubmit={handleLogin} aria-label="Sign in form">
            <input type="hidden" name="uid" value={uid} />
            <div style={styles.field}>
              <label style={styles.label} htmlFor="login-email">Email</label>
              <input
                id="login-email"
                type="email"
                required
                autoComplete="email"
                value={loginEmail}
                onChange={e => setLoginEmail(e.target.value)}
                style={styles.input}
                disabled={loading}
              />
            </div>
            <div style={styles.field}>
              <label style={styles.label} htmlFor="login-password">Password</label>
              <input
                id="login-password"
                type="password"
                required
                autoComplete="current-password"
                value={loginPassword}
                onChange={e => setLoginPassword(e.target.value)}
                style={styles.input}
                disabled={loading}
              />
            </div>
            <button type="submit" style={styles.primaryButton(loading)} disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        )}

        {/* Register */}
        {tab === 'register' && (
          <form onSubmit={handleRegister} aria-label="Registration form">
            <div style={styles.field}>
              <label style={styles.label} htmlFor="reg-email">Email</label>
              <input
                id="reg-email"
                type="email"
                required
                autoComplete="email"
                value={regEmail}
                onChange={e => setRegEmail(e.target.value)}
                style={styles.input}
                disabled={loading}
              />
            </div>
            <div style={{ display: 'flex', gap: 'var(--ui-spacingSm)' }}>
              <div style={{ ...styles.field, flex: 1 }}>
                <label style={styles.label} htmlFor="reg-given">Given Name</label>
                <input
                  id="reg-given"
                  type="text"
                  autoComplete="given-name"
                  value={regGivenName}
                  onChange={e => setRegGivenName(e.target.value)}
                  style={styles.input}
                  disabled={loading}
                />
              </div>
              <div style={{ ...styles.field, flex: 1 }}>
                <label style={styles.label} htmlFor="reg-family">Family Name</label>
                <input
                  id="reg-family"
                  type="text"
                  autoComplete="family-name"
                  value={regFamilyName}
                  onChange={e => setRegFamilyName(e.target.value)}
                  style={styles.input}
                  disabled={loading}
                />
              </div>
            </div>
            <div style={styles.field}>
              <label style={styles.label} htmlFor="reg-password">Password</label>
              <input
                id="reg-password"
                type="password"
                required
                autoComplete="new-password"
                value={regPassword}
                onChange={e => setRegPassword(e.target.value)}
                style={styles.input}
                disabled={loading}
              />
            </div>
            <div style={styles.field}>
              <label style={styles.label} htmlFor="reg-confirm">Confirm Password</label>
              <input
                id="reg-confirm"
                type="password"
                required
                autoComplete="new-password"
                value={regConfirm}
                onChange={e => setRegConfirm(e.target.value)}
                style={styles.input}
                disabled={loading}
              />
            </div>
            <label style={styles.checkboxRow}>
              <input
                type="checkbox"
                checked={regEnableMfa}
                onChange={e => setRegEnableMfa(e.target.checked)}
                disabled={loading}
              />
              Enable Multi-Factor Authentication
            </label>
            <button type="submit" style={styles.primaryButton(loading)} disabled={loading}>
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>
        )}

        {/* Forgot Password */}
        {tab === 'forgot' && (
          <form onSubmit={handleForgot} aria-label="Forgot password form">
            {forgotSuccess ? (
              <div style={styles.successMessage}>
                If an account exists for that email, a password reset link has been sent.
              </div>
            ) : (
              <>
                <div style={styles.field}>
                  <label style={styles.label} htmlFor="forgot-email">Email</label>
                  <input
                    id="forgot-email"
                    type="email"
                    required
                    autoComplete="email"
                    value={forgotEmail}
                    onChange={e => setForgotEmail(e.target.value)}
                    style={styles.input}
                    disabled={loading}
                  />
                </div>
                <button type="submit" style={styles.primaryButton(loading)} disabled={loading}>
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
