// src/components/identity/admin/ApplicationFormPage.tsx
//
// Create/Edit form for OAuth/OIDC applications with multi-value inputs.

import { useState, useCallback } from 'react';
import { FormField } from '../shared/FormField';

export interface ApplicationFormPageProps {
  application?: {
    clientId?: string;
    clientName: string;
    poolId: string;
    redirectUris: string[];
    postLogoutRedirectUris?: string[];
    grantTypes: string[];
    responseTypes?: string[];
    scope?: string;
  };
  isEdit: boolean;
  pools: Array<{ poolId: string; poolName: string }>;
  onSubmit: (data: any) => Promise<void>;
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
  marginBottom: 'var(--ui-spacingMd)',
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

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function MultiInput({
  label,
  values,
  onChange,
  placeholder,
}: {
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
}) {
  const handleAdd = () => onChange([...values, '']);
  const handleRemove = (idx: number) => onChange(values.filter((_, i) => i !== idx));
  const handleChange = (idx: number, val: string) =>
    onChange(values.map((v, i) => (i === idx ? val : v)));

  return (
    <div style={{ marginBottom: 'var(--ui-spacingMd)' }}>
      <label style={{ display: 'block', marginBottom: '4px', fontSize: 'var(--ui-fontSizeSm)', fontWeight: 600, color: 'var(--ui-textPrimary)' }}>
        {label}
      </label>
      {values.map((val, idx) => (
        <div key={idx} style={multiInputRowStyle}>
          <input
            style={multiInputStyle}
            value={val}
            onChange={(e) => handleChange(idx, e.target.value)}
            placeholder={placeholder}
          />
          <button type="button" style={removeBtnStyle} onClick={() => handleRemove(idx)}>
            Remove
          </button>
        </div>
      ))}
      <button type="button" style={addBtnStyle} onClick={handleAdd}>
        + Add
      </button>
    </div>
  );
}

const GRANT_TYPE_OPTIONS = [
  'authorization_code',
  'client_credentials',
  'refresh_token',
];

const RESPONSE_TYPE_OPTIONS = ['code', 'token', 'id_token'];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ApplicationFormPage({
  application,
  isEdit,
  pools,
  onSubmit,
  onCancel,
  error,
}: ApplicationFormPageProps) {
  const [clientName, setClientName] = useState(application?.clientName ?? '');
  const [poolId, setPoolId] = useState(application?.poolId ?? '');
  const [redirectUris, setRedirectUris] = useState<string[]>(application?.redirectUris ?? ['']);
  const [postLogoutUris, setPostLogoutUris] = useState<string[]>(application?.postLogoutRedirectUris ?? []);
  const [grantTypes, setGrantTypes] = useState<string[]>(application?.grantTypes ?? ['authorization_code']);
  const [responseTypes, setResponseTypes] = useState<string[]>(application?.responseTypes ?? ['code']);
  const [scope, setScope] = useState(application?.scope ?? 'openid profile email');
  const [submitting, setSubmitting] = useState(false);

  const toggleGrantType = useCallback((gt: string) => {
    setGrantTypes((prev) =>
      prev.includes(gt) ? prev.filter((g) => g !== gt) : [...prev, gt],
    );
  }, []);

  const toggleResponseType = useCallback((rt: string) => {
    setResponseTypes((prev) =>
      prev.includes(rt) ? prev.filter((r) => r !== rt) : [...prev, rt],
    );
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setSubmitting(true);
      try {
        await onSubmit({
          clientName,
          poolId,
          redirectUris: redirectUris.filter((u) => u.trim()),
          postLogoutRedirectUris: postLogoutUris.filter((u) => u.trim()),
          grantTypes,
          responseTypes,
          scope,
        });
      } finally {
        setSubmitting(false);
      }
    },
    [clientName, poolId, redirectUris, postLogoutUris, grantTypes, responseTypes, scope, onSubmit],
  );

  return (
    <div style={pageStyle}>
      <h1 style={titleStyle}>{isEdit ? 'Edit Application' : 'New Application'}</h1>

      {error && <div style={errorBannerStyle}>{error}</div>}

      <form onSubmit={handleSubmit}>
        <FormField
          label="Application Name"
          name="clientName"
          value={clientName}
          onChange={(v) => setClientName(String(v))}
          required
          placeholder="My App"
        />

        <FormField
          label="User Pool"
          name="poolId"
          type="select"
          value={poolId}
          onChange={(v) => setPoolId(String(v))}
          required
          options={pools.map((p) => ({ value: p.poolId, label: p.poolName }))}
          placeholder="Select a pool..."
        />

        <MultiInput
          label="Redirect URIs"
          values={redirectUris}
          onChange={setRedirectUris}
          placeholder="https://app.example.com/callback"
        />

        <MultiInput
          label="Post-Logout Redirect URIs"
          values={postLogoutUris}
          onChange={setPostLogoutUris}
          placeholder="https://app.example.com/logout"
        />

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

        {/* Response Types */}
        <section>
          <h3 style={sectionTitleStyle}>Response Types</h3>
          <div style={checkboxGroupStyle}>
            {RESPONSE_TYPE_OPTIONS.map((rt) => (
              <label key={rt} style={checkboxLabelStyle}>
                <input
                  type="checkbox"
                  checked={responseTypes.includes(rt)}
                  onChange={() => toggleResponseType(rt)}
                />
                {rt}
              </label>
            ))}
          </div>
        </section>

        <FormField
          label="Scope"
          name="scope"
          value={scope}
          onChange={(v) => setScope(String(v))}
          placeholder="openid profile email"
          helpText="Space-separated list of scopes."
        />

        <div style={buttonRowStyle}>
          <button type="submit" style={submitBtnStyle} disabled={submitting}>
            {submitting ? 'Saving...' : isEdit ? 'Update Application' : 'Create Application'}
          </button>
          <button type="button" style={cancelBtnStyle} onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
