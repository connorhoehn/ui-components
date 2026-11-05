// src/components/identity/admin/SetupGuidePage.tsx
//
// Step-by-step setup checklist with expandable details and progress indicator.

import { useState, useMemo, useCallback, useId } from 'react';
import { Card } from '../../ui/Card';
import { PageSection } from '../../ui/PageSection';
import { Button } from '../../ui/Button';
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
  const panelIdPrefix = useId();

  const toggleStep = useCallback((idx: number) => {
    setExpanded((prev) => (prev === idx ? null : idx));
  }, []);

  const steps: Step[] = useMemo(
    () => [
      {
        title: 'Create User Pool',
        done: status.hasUserPools,
        content: (
          <div className="flex flex-col gap-2">
            <p className="m-0 text-sm text-text-secondary">
              {status.hasUserPools
                ? `${status.poolCount} pool(s) configured.`
                : 'No user pools yet.'}
            </p>
            <div>
              <Button variant="ghost" size="sm" onClick={() => onNavigate('/identity/admin/pools/new')}>
                Create a User Pool
              </Button>
            </div>
          </div>
        ),
      },
      {
        title: 'Register Application',
        done: status.hasClients,
        content: (
          <div className="flex flex-col gap-2">
            <p className="m-0 text-sm text-text-secondary">
              {status.hasClients
                ? `${status.clientCount} application(s) registered.`
                : 'No applications registered.'}
            </p>
            <div>
              <Button variant="ghost" size="sm" onClick={() => onNavigate('/identity/admin/applications/new')}>
                Register an Application
              </Button>
            </div>
          </div>
        ),
      },
      {
        title: 'Create Admin User',
        done: status.hasAdminUser,
        content: (
          <div className="flex flex-col gap-2">
            {status.hasAdminUser ? (
              <>
                <p className="m-0 text-sm text-text-secondary">Admin users: {status.adminEmails.join(', ')}</p>
                <p className="m-0 text-sm text-text-secondary">{status.totalUsers} total user(s) across all pools.</p>
              </>
            ) : (
              <p className="m-0 text-sm text-text-secondary">No admin user found. Create one in a user pool.</p>
            )}
            {status.firstPoolId && (
              <div>
                <Button variant="ghost" size="sm" onClick={() => onNavigate(`/identity/admin/pools/${status.firstPoolId}/users/new`)}>
                  Create Admin User
                </Button>
              </div>
            )}
          </div>
        ),
      },
      {
        title: 'Configure SMTP',
        done: status.smtpConfigured,
        content: (
          <p className="m-0 text-sm text-text-secondary">
            {status.smtpConfigured
              ? `SMTP configured: ${status.smtpHost}`
              : 'SMTP is not yet configured. Set SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASS environment variables.'}
          </p>
        ),
      },
      {
        title: 'Configure Issuer',
        done: status.issuerConfigured,
        content: (
          <div className="flex flex-col gap-2">
            <p className="m-0 text-sm text-text-secondary">
              Issuer: <code className="px-1.5 py-0.5 bg-surface-hover rounded text-xs font-mono">{status.issuer || 'Not set'}</code>
            </p>
            {status.wellKnownUrl && (
              <p className="m-0 text-sm text-text-secondary">
                Well-known URL:{' '}
                <a href={status.wellKnownUrl} target="_blank" rel="noopener noreferrer" className="text-info-fg underline">
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
          <div className="flex flex-col gap-3">
            {status.firstClientId ? (
              <>
                <p className="m-0 text-sm text-text-secondary">
                  Client ID: <code className="px-1.5 py-0.5 bg-surface-hover rounded text-xs font-mono">{status.firstClientId}</code>
                </p>
                <p className="m-0 text-sm text-text-secondary">Use this code snippet to test the OIDC authorization flow:</p>
                <pre className="px-4 py-3 bg-surface-inverse text-text-inverse rounded-md font-mono text-xs overflow-x-auto whitespace-pre m-0">{`// OIDC Authorization Code Flow
const authUrl = \`\${issuer}/authorize?\` + new URLSearchParams({
  client_id: '${status.firstClientId}',
  response_type: 'code',
  redirect_uri: 'http://localhost:3000/callback',
  scope: 'openid profile email',
}).toString();

window.location.href = authUrl;`}</pre>
              </>
            ) : (
              <p className="m-0 text-sm text-text-secondary">Complete the previous steps first to test the integration.</p>
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
    <PageSection
      title="Setup Guide"
      description={`${completedCount} of ${steps.length} steps completed (${progressPercent}%)`}
    >
      {/* Progress bar */}
      <div className="h-2 bg-surface-hover rounded-full overflow-hidden">
        <div
          className="h-full bg-success rounded-full transition-[width] duration-300 ease-in-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Steps */}
      <div className="flex flex-col gap-2">
        {steps.map((step, idx) => (
          <Card key={idx}>
            {/* A real <button>: this carried `role="button"` with no tabIndex
                and no key handler, so the setup steps could only be opened
                with a mouse. Nothing inside the header is interactive, so a
                button is the correct element rather than an ARIA patch. */}
            <button
              data-ui-part=""
              type="button"
              className="flex items-center justify-between w-full text-left px-5 py-4 cursor-pointer select-none bg-transparent border-none font-[inherit]"
              onClick={() => toggleStep(idx)}
              aria-expanded={expanded === idx}
              aria-controls={`${panelIdPrefix}-${idx}`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    'w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0',
                    step.done
                      ? 'bg-success text-white'
                      : 'bg-surface-hover text-text-tertiary'
                  )}
                >
                  {step.done ? '✓' : idx + 1}
                </div>
                <span className="text-sm font-medium text-text-primary">{step.title}</span>
              </div>
              <span className="text-text-tertiary text-sm" aria-hidden="true">
                {expanded === idx ? '▲' : '▼'}
              </span>
            </button>
            {expanded === idx && (
              <div id={`${panelIdPrefix}-${idx}`} className="px-5 pb-5 pt-0 border-t border-border-subtle">
                <div className="pt-4">
                  {step.content}
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </PageSection>
  );
}
