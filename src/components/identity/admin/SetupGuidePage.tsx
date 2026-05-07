// src/components/identity/admin/SetupGuidePage.tsx
//
// Step-by-step setup checklist with expandable details and progress indicator.

import { useState, useMemo, useCallback } from 'react';
import { cn } from '../../../lib/cn';

export interface SetupGuidePageProps {
  status: {
    hasUserPools: boolean;
    poolCount: number;
    hasClients: boolean;
    clientCount: number;
    hasAdminUser: boolean;
    totalUsers: number;
    adminEmails: string[];
    smtpConfigured: boolean;
    smtpHost?: string;
    issuer: string;
    issuerConfigured: boolean;
    wellKnownUrl?: string;
    firstPoolId?: string;
    firstClientId?: string;
  };
  onNavigate: (path: string) => void;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface Step {
  title: string;
  done: boolean;
  content: React.ReactNode;
}

export function SetupGuidePage({ status, onNavigate }: SetupGuidePageProps) {
  const [expanded, setExpanded] = useState<number | null>(null);

  const toggleStep = useCallback((idx: number) => {
    setExpanded((prev) => (prev === idx ? null : idx));
  }, []);

  const steps: Step[] = useMemo(
    () => [
      {
        title: 'Create User Pool',
        done: status.hasUserPools,
        content: (
          <div>
            {status.hasUserPools ? (
              <p>
                {status.poolCount} pool(s) configured.
              </p>
            ) : (
              <p>No user pools yet.</p>
            )}
            <button
              type="button"
              className="bg-transparent border-none text-primary cursor-pointer text-sm p-0 underline"
              onClick={() => onNavigate('/identity/admin/pools/new')}
            >
              Create a User Pool
            </button>
          </div>
        ),
      },
      {
        title: 'Register Application',
        done: status.hasClients,
        content: (
          <div>
            {status.hasClients ? (
              <p>{status.clientCount} application(s) registered.</p>
            ) : (
              <p>No applications registered.</p>
            )}
            <button
              type="button"
              className="bg-transparent border-none text-primary cursor-pointer text-sm p-0 underline"
              onClick={() => onNavigate('/identity/admin/applications/new')}
            >
              Register an Application
            </button>
          </div>
        ),
      },
      {
        title: 'Create Admin User',
        done: status.hasAdminUser,
        content: (
          <div>
            {status.hasAdminUser ? (
              <>
                <p>Admin users: {status.adminEmails.join(', ')}</p>
                <p>{status.totalUsers} total user(s) across all pools.</p>
              </>
            ) : (
              <p>No admin user found. Create one in a user pool.</p>
            )}
            {status.firstPoolId && (
              <button
                type="button"
                className="bg-transparent border-none text-primary cursor-pointer text-sm p-0 underline"
                onClick={() => onNavigate(`/identity/admin/pools/${status.firstPoolId}/users/new`)}
              >
                Create Admin User
              </button>
            )}
          </div>
        ),
      },
      {
        title: 'Configure SMTP',
        done: status.smtpConfigured,
        content: (
          <div>
            {status.smtpConfigured ? (
              <p>SMTP configured: {status.smtpHost}</p>
            ) : (
              <p>SMTP is not yet configured. Set SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASS environment variables.</p>
            )}
          </div>
        ),
      },
      {
        title: 'Configure Issuer',
        done: status.issuerConfigured,
        content: (
          <div>
            <p>Issuer: <code>{status.issuer || 'Not set'}</code></p>
            {status.wellKnownUrl && (
              <p>
                Well-known URL:{' '}
                <a href={status.wellKnownUrl} target="_blank" rel="noopener noreferrer" className="text-primary">
                  {status.wellKnownUrl}
                </a>
              </p>
            )}
          </div>
        ),
      },
      {
        title: 'Test Integration',
        done: status.hasUserPools && status.hasClients && status.issuerConfigured,
        content: (
          <div>
            {status.firstClientId ? (
              <>
                <p>Client ID: <code>{status.firstClientId}</code></p>
                <p>Use this code snippet to test the OIDC authorization flow:</p>
                <pre className="px-4 py-2 bg-surface-inset border border-border rounded-sm font-mono text-sm overflow-x-auto whitespace-pre mt-2">{`// OIDC Authorization Code Flow
const authUrl = \`\${issuer}/authorize?\` + new URLSearchParams({
  client_id: '${status.firstClientId}',
  response_type: 'code',
  redirect_uri: 'http://localhost:3000/callback',
  scope: 'openid profile email',
}).toString();

window.location.href = authUrl;`}</pre>
              </>
            ) : (
              <p>Complete the previous steps first to test the integration.</p>
            )}
          </div>
        ),
      },
    ],
    [status, onNavigate],
  );

  const completedCount = steps.filter((s) => s.done).length;
  const progressPercent = Math.round((completedCount / steps.length) * 100);

  return (
    <div className="max-w-[720px]">
      <h1 className="text-lg font-semibold text-text-primary mb-2">Setup Guide</h1>

      {/* Progress */}
      <p className="text-sm text-text-secondary mb-1.5">
        {completedCount} of {steps.length} steps completed ({progressPercent}%)
      </p>
      <div className="h-2 bg-border rounded-sm overflow-hidden mb-6">
        <div
          className="h-full bg-success rounded-sm transition-[width] duration-300 ease-in-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Steps */}
      {steps.map((step, idx) => (
        <div key={idx} className="border border-border rounded-md mb-2 overflow-hidden bg-surface">
          <div
            className="flex items-center justify-between p-4 cursor-pointer select-none"
            onClick={() => toggleStep(idx)}
          >
            <div className="flex items-center flex-1">
              <div
                className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center font-bold text-[14px] shrink-0",
                  step.done
                    ? "bg-success text-white"
                    : "bg-border text-text-tertiary"
                )}
              >
                {step.done ? '✓' : idx + 1}
              </div>
              <span className="flex-1 ml-3 text-base font-medium text-text-primary">{step.title}</span>
            </div>
            <span className="text-text-tertiary text-[18px]">
              {expanded === idx ? '▲' : '▼'}
            </span>
          </div>
          {expanded === idx && (
            <div className="px-4 pb-4 text-sm text-text-secondary leading-relaxed">
              {step.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
