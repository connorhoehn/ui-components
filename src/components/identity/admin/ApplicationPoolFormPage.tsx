// src/components/identity/admin/ApplicationPoolFormPage.tsx
//
// Combined form to create both a user pool and an application in one step.

import { useState, useCallback } from 'react';
import { FormField } from '../shared/FormField';

export interface ApplicationPoolFormPageProps {
  onSubmit: (data: {
    clientName: string;
    poolName: string;
    redirectUris: string[];
    grantTypes?: string[];
  }) => Promise<void>;
  onCancel: () => void;
  error?: string | null;
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const pageStyle: React.CSSProperties = {
  maxWidth: '640px',
};

const titleStyle: React.CSSProperties = {
  fontSize: 'var(--ui-fontSizeLg)',
  fontWeight: 600,
  color: 'var(--ui-textPrimary)',
  marginBottom: 'var(--ui-spacingSm)',
};

const subtitleStyle: React.CSSProperties = {
  fontSize: 'var(--ui-fontSizeMd)',
  color: 'var(--ui-textSecondary)',
  marginBottom: 'var(--ui-spacingLg)',
};

const sectionTitleStyle: React.CSSProperties = {
  fontSize: 'var(--ui-fontSizeMd)',
  fontWeight: 600,
  color: 'var(--ui-textPrimary)',
  marginTop: 'var(--ui-spacingLg)',
  marginBottom: 'var(--ui-spacingSm)',
};

const multiInputRowStyle: React.CSSProperties = {
  display: 'flex',
  gap: '8px',
  alignItems: 'center',
  marginBottom: '6px',
};

const multiInputStyle: React.CSSProperties = {
  flex: 1,
  padding: 'var(--ui-spacingSm)',
  fontSize: 'var(--ui-fontSizeMd)',
  border: '1px solid var(--ui-border)',
  borderRadius: 'var(--ui-radiusSm)',
  backgroundColor: 'var(--ui-surface)',
  color: 'var(--ui-textPrimary)',
};

const removeBtnStyle: React.CSSProperties = {
  padding: '6px 10px',
  border: '1px solid var(--ui-danger)',
  borderRadius: 'var(--ui-radiusSm)',
  backgroundColor: 'transparent',
  color: 'var(--ui-danger)',
  cursor: 'pointer',
  fontSize: 'var(--ui-fontSizeSm)',
  font: 'inherit',
};

const addBtnStyle: React.CSSProperties = {
  padding: '6px 12px',
  border: '1px solid var(--ui-border)',
  borderRadius: 'var(--ui-radiusSm)',
  backgroundColor: 'var(--ui-surface)',
  color: 'var(--ui-textPrimary)',
  cursor: 'pointer',
  fontSize: 'var(--ui-fontSizeSm)',
  font: 'inherit',
};

const checkboxGroupStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  marginBottom: 'var(--ui-spacingMd)',
};

const checkboxLabelStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  fontSize: 'var(--ui-fontSizeMd)',
  color: 'var(--ui-textPrimary)',
  cursor: 'pointer',
};

const buttonRowStyle: React.CSSProperties = {
  display: 'flex',
  gap: 'var(--ui-spacingSm)',
  marginTop: 'var(--ui-spacingLg)',
};

const submitBtnStyle: React.CSSProperties = {
  padding: '10px 20px',
  backgroundColor: 'var(--ui-primary)',
  color: '#fff',
  border: 'none',
  borderRadius: 'var(--ui-radiusSm)',
  fontSize: 'var(--ui-fontSizeMd)',
  fontWeight: 500,
  cursor: 'pointer',
  font: 'inherit',
};

const cancelBtnStyle: React.CSSProperties = {
  padding: '10px 20px',
  backgroundColor: 'transparent',
  border: '1px solid var(--ui-border)',
  borderRadius: 'var(--ui-radiusSm)',
  fontSize: 'var(--ui-fontSizeMd)',
  color: 'var(--ui-textPrimary)',
  cursor: 'pointer',
  font: 'inherit',
};

const errorBannerStyle: React.CSSProperties = {
  padding: 'var(--ui-spacingSm) var(--ui-spacingMd)',
  backgroundColor: 'var(--ui-danger)',
  color: '#fff',
  borderRadius: 'var(--ui-radiusSm)',
  marginBottom: 'var(--ui-spacingMd)',
  fontSize: 'var(--ui-fontSizeSm)',
};

const GRANT_TYPE_OPTIONS = ['authorization_code', 'client_credentials', 'refresh_token'];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ApplicationPoolFormPage({ onSubmit, onCancel, error }: ApplicationPoolFormPageProps) {
  const [poolName, setPoolName] = useState('');
  const [clientName, setClientName] = useState('');
  const [redirectUris, setRedirectUris] = useState<string[]>(['']);
  const [grantTypes, setGrantTypes] = useState<string[]>(['authorization_code']);
  const [submitting, setSubmitting] = useState(false);

  const toggleGrantType = useCallback((gt: string) => {
    setGrantTypes((prev) =>
      prev.includes(gt) ? prev.filter((g) => g !== gt) : [...prev, gt],
    );
  }, []);

  const handleAddUri = useCallback(() => {
    setRedirectUris((prev) => [...prev, '']);
  }, []);

  const handleRemoveUri = useCallback((idx: number) => {
    setRedirectUris((prev) => prev.filter((_, i) => i !== idx));
  }, []);

  const handleUriChange = useCallback((idx: number, val: string) => {
    setRedirectUris((prev) => prev.map((v, i) => (i === idx ? val : v)));
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setSubmitting(true);
      try {
        await onSubmit({
          poolName,
          clientName,
          redirectUris: redirectUris.filter((u) => u.trim()),
          grantTypes,
        });
      } finally {
        setSubmitting(false);
      }
    },
    [poolName, clientName, redirectUris, grantTypes, onSubmit],
  );

  return (
    <div style={pageStyle}>
      <h1 style={titleStyle}>New Application + Pool</h1>
      <p style={subtitleStyle}>Create a user pool and register an application in one step.</p>

      {error && <div style={errorBannerStyle}>{error}</div>}

      <form onSubmit={handleSubmit}>
        <FormField
          label="Pool Name"
          name="poolName"
          value={poolName}
          onChange={(v) => setPoolName(String(v))}
          required
          placeholder="my-user-pool"
        />

        <FormField
          label="Application Name"
          name="clientName"
          value={clientName}
          onChange={(v) => setClientName(String(v))}
          required
          placeholder="My App"
        />

        {/* Redirect URIs */}
        <section>
          <h3 style={sectionTitleStyle}>Redirect URIs</h3>
          {redirectUris.map((uri, idx) => (
            <div key={idx} style={multiInputRowStyle}>
              <input
                style={multiInputStyle}
                value={uri}
                onChange={(e) => handleUriChange(idx, e.target.value)}
                placeholder="https://app.example.com/callback"
              />
              {redirectUris.length > 1 && (
                <button type="button" style={removeBtnStyle} onClick={() => handleRemoveUri(idx)}>
                  Remove
                </button>
              )}
            </div>
          ))}
          <button type="button" style={addBtnStyle} onClick={handleAddUri}>
            + Add URI
          </button>
        </section>

        {/* Grant Types */}
        <section>
          <h3 style={sectionTitleStyle}>Grant Types</h3>
          <div style={checkboxGroupStyle}>
            {GRANT_TYPE_OPTIONS.map((gt) => (
              <label key={gt} style={checkboxLabelStyle}>
                <input
                  type="checkbox"
                  checked={grantTypes.includes(gt)}
                  onChange={() => toggleGrantType(gt)}
                />
                {gt}
              </label>
            ))}
          </div>
        </section>

        <div style={buttonRowStyle}>
          <button type="submit" style={submitBtnStyle} disabled={submitting}>
            {submitting ? 'Creating...' : 'Create Pool + Application'}
          </button>
          <button type="button" style={cancelBtnStyle} onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
