import { useState, useCallback } from 'react';
import { Button } from '../../ui/Button';
import { cn } from '../../../lib/cn';

export interface ConsentPageProps {
  clientName: string;
  scopes: string[];
  redirectUri?: string;
  onAuthorize: () => Promise<void>;
  onDeny: () => Promise<void>;
  logoUrl?: string;
}

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
    <div className="min-h-full flex items-center justify-center p-6 bg-surface-panel">
      <div
        className="w-full max-w-[440px] bg-white rounded-xl shadow-md overflow-hidden"
        role="main"
        aria-label="Authorization consent"
      >
        <header className="flex flex-col items-center gap-3 px-8 pt-8 pb-5">
          {logoUrl && <img src={logoUrl} alt="" className="w-14 h-14 object-contain rounded-md" />}
          <h1 className="text-xl font-bold text-text-primary m-0 text-center">
            Authorize {clientName}
          </h1>
          <p className="text-sm text-neutral m-0 text-center leading-relaxed">
            This application is requesting access to your account.
          </p>
        </header>

        <div className="mx-8 border border-border rounded-md overflow-hidden mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-neutral px-4 py-2.5 m-0 bg-surface-panel border-b border-border">
            Requested Permissions
          </p>
          <ul className="list-none p-0 m-0" aria-label="Requested permissions">
            {scopes.map((scope, i) => (
              <li
                key={scope}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 text-sm text-text-primary',
                  i < scopes.length - 1 && 'border-b border-border'
                )}
              >
                <span className="w-2 h-2 rounded-full bg-info shrink-0" aria-hidden="true" />
                <span>{getScopeDescription(scope)}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="px-8 pb-8">
          {redirectUri && (
            <p className="text-[11px] text-text-tertiary mb-5 mt-0 break-all leading-relaxed">
              You will be redirected to: <strong className="text-neutral">{redirectUri}</strong>
            </p>
          )}

          <div className="flex gap-3">
            <Button
              variant="ghost"
              size="lg"
              fullWidth
              onClick={handleDeny}
              disabled={loading}
            >
              Deny
            </Button>
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={handleAuthorize}
              disabled={loading}
            >
              {loading ? 'Authorizing...' : 'Authorize'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConsentPage;
