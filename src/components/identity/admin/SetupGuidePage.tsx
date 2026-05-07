// src/components/identity/admin/SetupGuidePage.tsx
//
// Step-by-step setup checklist with expandable details and progress indicator.

import { useState, useMemo, useCallback } from 'react';

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
// Styles
// ---------------------------------------------------------------------------

const pageStyle: React.CSSProperties = {
  maxWidth: '720px',
};

const titleStyle: React.CSSProperties = {
  fontSize: 'var(--ui-fontSizeLg)',
  fontWeight: 600,
  color: 'var(--ui-textPrimary)',
  marginBottom: 'var(--ui-spacingSm)',
};

const progressBarOuterStyle: React.CSSProperties = {
  height: '8px',
  backgroundColor: 'var(--ui-border)',
  borderRadius: '4px',
  overflow: 'hidden',
  marginBottom: 'var(--ui-spacingLg)',
};

const progressTextStyle: React.CSSProperties = {
  fontSize: 'var(--ui-fontSizeSm)',
  color: 'var(--ui-textSecondary)',
  marginBottom: '6px',
};

const stepCardStyle: React.CSSProperties = {
  border: '1px solid var(--ui-border)',
  borderRadius: 'var(--ui-radiusMd)',
  marginBottom: 'var(--ui-spacingSm)',
  overflow: 'hidden',
  backgroundColor: 'var(--ui-surface)',
};

const stepHeaderStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: 'var(--ui-spacingMd)',
  cursor: 'pointer',
  userSelect: 'none',
};

const stepStatusStyle = (done: boolean): React.CSSProperties => ({
  width: '24px',
  height: '24px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: done ? 'var(--ui-success)' : 'var(--ui-border)',
  color: done ? '#fff' : 'var(--ui-textMuted)',
  fontWeight: 700,
  fontSize: '14px',
  flexShrink: 0,
});

const stepTitleStyle: React.CSSProperties = {
  flex: 1,
  marginLeft: '12px',
  fontSize: 'var(--ui-fontSizeMd)',
  fontWeight: 500,
  color: 'var(--ui-textPrimary)',
};

const stepBodyStyle: React.CSSProperties = {
  padding: '0 var(--ui-spacingMd) var(--ui-spacingMd)',
  fontSize: 'var(--ui-fontSizeSm)',
  color: 'var(--ui-textSecondary)',
  lineHeight: 1.6,
};

const linkBtnStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  color: 'var(--ui-primary)',
  cursor: 'pointer',
  fontSize: 'var(--ui-fontSizeSm)',
  padding: 0,
  textDecoration: 'underline',
  font: 'inherit',
};

const codeStyle: React.CSSProperties = {
  padding: 'var(--ui-spacingSm) var(--ui-spacingMd)',
  backgroundColor: 'var(--ui-surfaceAlt)',
  border: '1px solid var(--ui-border)',
  borderRadius: 'var(--ui-radiusSm)',
  fontFamily: 'monospace',
  fontSize: 'var(--ui-fontSizeSm)',
  overflowX: 'auto',
  whiteSpace: 'pre',
  marginTop: '8px',
};

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
            <button type="button" style={linkBtnStyle} onClick={() => onNavigate('/identity/admin/pools/new')}>
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
            <button type="button" style={linkBtnStyle} onClick={() => onNavigate('/identity/admin/applications/new')}>
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
                style={linkBtnStyle}
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
                <a href={status.wellKnownUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--ui-primary)' }}>
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
                <pre style={codeStyle}>{`// OIDC Authorization Code Flow
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
    <div style={pageStyle}>
      <h1 style={titleStyle}>Setup Guide</h1>

      {/* Progress */}
      <p style={progressTextStyle}>
        {completedCount} of {steps.length} steps completed ({progressPercent}%)
      </p>
      <div style={progressBarOuterStyle}>
        <div
          style={{
            height: '100%',
            width: `${progressPercent}%`,
            backgroundColor: 'var(--ui-success)',
            borderRadius: '4px',
            transition: 'width 0.3s ease',
          }}
        />
      </div>

      {/* Steps */}
      {steps.map((step, idx) => (
        <div key={idx} style={stepCardStyle}>
          <div style={stepHeaderStyle} onClick={() => toggleStep(idx)}>
            <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
              <div style={stepStatusStyle(step.done)}>
                {step.done ? '✓' : idx + 1}
              </div>
              <span style={stepTitleStyle}>{step.title}</span>
            </div>
            <span style={{ color: 'var(--ui-textMuted)', fontSize: '18px' }}>
              {expanded === idx ? '▲' : '▼'}
            </span>
          </div>
          {expanded === idx && <div style={stepBodyStyle}>{step.content}</div>}
        </div>
      ))}
    </div>
  );
}
