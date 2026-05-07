// src/components/identity/auth/ConsentPage.tsx
//
// OAuth2/OIDC consent screen. Shows requested scopes and lets the user
// authorize or deny the client application.

import { useState, useCallback } from 'react';
import { cn } from '../../../lib/cn';

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
    <div className="min-h-screen flex items-center justify-center p-6 bg-surface-panel">
      <div
        className="w-full max-w-[440px] bg-surface rounded-md shadow-md p-6"
        role="main"
        aria-label="Authorization consent"
      >
        <header className="flex flex-col items-center gap-2 mb-4">
          {logoUrl && <img src={logoUrl} alt="" className="w-12 h-12 object-contain rounded-sm" />}
          <h1 className="text-lg font-semibold text-text-primary m-0 text-center">
            Authorize {clientName}
          </h1>
          <p className="text-sm text-text-secondary m-0 text-center">
            This application is requesting access to your account.
          </p>
        </header>

        <ul className="list-none p-0 my-4 flex flex-col gap-2" aria-label="Requested permissions">
          {scopes.map(scope => (
            <li key={scope} className="flex items-center gap-2.5 px-3.5 py-2.5 bg-surface-panel rounded-sm text-sm text-text-primary">
              <span
                className="w-[18px] h-[18px] rounded-full bg-primary flex items-center justify-center shrink-0 text-white text-[11px] font-bold"
                aria-hidden="true"
              >
                &bull;
              </span>
              <span>{getScopeDescription(scope)}</span>
            </li>
          ))}
        </ul>

        {redirectUri && (
          <p className="text-sm text-text-tertiary mb-4 break-all">
            You will be redirected to: <strong>{redirectUri}</strong>
          </p>
        )}

        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleDeny}
            disabled={loading}
            className={cn(
              'flex-1 px-4 py-3 text-sm font-medium bg-surface text-text-secondary border border-border rounded-sm font-[inherit]',
              loading ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'
            )}
          >
            Deny
          </button>
          <button
            type="button"
            onClick={handleAuthorize}
            disabled={loading}
            className={cn(
              'flex-1 px-4 py-3 text-sm font-semibold bg-primary text-white border-none rounded-sm font-[inherit]',
              loading ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'
            )}
          >
            {loading ? 'Authorizing...' : 'Authorize'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConsentPage;
