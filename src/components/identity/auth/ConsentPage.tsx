// src/components/identity/auth/ConsentPage.tsx
//
// OAuth2/OIDC consent screen. Shows requested scopes and lets the user
// authorize or deny the client application.

import { useState, useCallback } from 'react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ConsentPageProps {
  clientName: string;
  scopes: string[];
  redirectUri?: string;
  onAuthorize: () => Promise<void>;
  onDeny: () => Promise<void>;
  logoUrl?: string;
}

// ---------------------------------------------------------------------------
// Scope descriptions
// ---------------------------------------------------------------------------

const SCOPE_DESCRIPTIONS: Record<string, string> = {
  openid: 'Verify your identity',
  profile: 'Access your name and profile information',
  email: 'Access your email address',
  address: 'Access your mailing address',
  phone: 'Access your phone number',
  offline_access: 'Maintain access when you are not present',
};

function getScopeDescription(scope: string): string {
  return SCOPE_DESCRIPTIONS[scope] || `Access: ${scope}`;
}

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
    maxWidth: 440,
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
  heading: {
    fontSize: 'var(--ui-fontSizeLg)',
    fontWeight: 600,
    color: 'var(--ui-textPrimary)',
    margin: 0,
    textAlign: 'center' as const,
  } as React.CSSProperties,
  description: {
    fontSize: 'var(--ui-fontSizeSm)',
    color: 'var(--ui-textSecondary)',
    margin: 0,
    textAlign: 'center' as const,
  } as React.CSSProperties,
  scopeList: {
    listStyle: 'none',
    padding: 0,
    margin: `var(--ui-spacingMd) 0`,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 'var(--ui-spacingSm)',
  } as React.CSSProperties,
  scopeItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '10px 14px',
    background: 'var(--ui-surfaceAlt)',
    borderRadius: 'var(--ui-radiusSm)',
    fontSize: 'var(--ui-fontSizeSm)',
    color: 'var(--ui-textPrimary)',
  } as React.CSSProperties,
  scopeCheck: {
    width: 18,
    height: 18,
    borderRadius: '50%',
    background: 'var(--ui-primary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    color: '#fff',
    fontSize: 11,
    fontWeight: 700,
  } as React.CSSProperties,
  redirectInfo: {
    fontSize: 'var(--ui-fontSizeSm)',
    color: 'var(--ui-textMuted)',
    marginBottom: 'var(--ui-spacingMd)',
    wordBreak: 'break-all' as const,
  } as React.CSSProperties,
  actions: {
    display: 'flex',
    gap: 'var(--ui-spacingSm)',
  } as React.CSSProperties,
  primaryButton: (loading: boolean) => ({
    flex: 1,
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
  secondaryButton: (loading: boolean) => ({
    flex: 1,
    padding: '12px 16px',
    fontSize: 'var(--ui-fontSizeMd)',
    fontWeight: 500,
    background: 'var(--ui-surface)',
    color: 'var(--ui-textSecondary)',
    border: '1px solid var(--ui-border)',
    borderRadius: 'var(--ui-radiusSm)',
    cursor: loading ? 'not-allowed' : 'pointer',
    opacity: loading ? 0.7 : 1,
    fontFamily: 'inherit',
  }) as React.CSSProperties,
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ConsentPage({
  clientName,
  scopes,
  redirectUri,
  onAuthorize,
  onDeny,
  logoUrl,
}: ConsentPageProps) {
  const [loading, setLoading] = useState(false);

  const handleAuthorize = useCallback(async () => {
    setLoading(true);
    try {
      await onAuthorize();
    } finally {
      setLoading(false);
    }
  }, [onAuthorize]);

  const handleDeny = useCallback(async () => {
    setLoading(true);
    try {
      await onDeny();
    } finally {
      setLoading(false);
    }
  }, [onDeny]);

  return (
    <div style={styles.page}>
      <div style={styles.card} role="main" aria-label="Authorization consent">
        <header style={styles.header}>
          {logoUrl && <img src={logoUrl} alt="" style={styles.logo} />}
          <h1 style={styles.heading}>Authorize {clientName}</h1>
          <p style={styles.description}>
            This application is requesting access to your account.
          </p>
        </header>

        <ul style={styles.scopeList} aria-label="Requested permissions">
          {scopes.map(scope => (
            <li key={scope} style={styles.scopeItem}>
              <span style={styles.scopeCheck} aria-hidden="true">&bull;</span>
              <span>{getScopeDescription(scope)}</span>
            </li>
          ))}
        </ul>

        {redirectUri && (
          <p style={styles.redirectInfo}>
            You will be redirected to: <strong>{redirectUri}</strong>
          </p>
        )}

        <div style={styles.actions}>
          <button
            type="button"
            onClick={handleDeny}
            disabled={loading}
            style={styles.secondaryButton(loading)}
          >
            Deny
          </button>
          <button
            type="button"
            onClick={handleAuthorize}
            disabled={loading}
            style={styles.primaryButton(loading)}
          >
            {loading ? 'Authorizing...' : 'Authorize'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConsentPage;
