// src/components/identity/admin/PoolFormPage.tsx
//
// Create/Edit form for user pools with password policy and custom attributes.

import { useState, useCallback } from 'react';
import { FormField } from '../shared/FormField';

export interface PoolFormPageProps {
  pool?: {
    poolId?: string;
    poolName: string;
    customAttributes: Record<string, string>;
    settings: any;
  };
  isEdit: boolean;
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

const sectionStyle: React.CSSProperties = {
  marginBottom: 'var(--ui-spacingLg)',
};

const sectionTitleStyle: React.CSSProperties = {
  fontSize: 'var(--ui-fontSizeMd)',
  fontWeight: 600,
  color: 'var(--ui-textPrimary)',
  marginBottom: 'var(--ui-spacingSm)',
};

const attrRowStyle: React.CSSProperties = {
  display: 'flex',
  gap: '8px',
  alignItems: 'center',
  marginBottom: '8px',
};

const attrInputStyle: React.CSSProperties = {
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
// Component
// ---------------------------------------------------------------------------

export function PoolFormPage({ pool, isEdit, onSubmit, onCancel, error }: PoolFormPageProps) {
  const [poolName, setPoolName] = useState(pool?.poolName ?? '');
  const [mfaConfig, setMfaConfig] = useState<string>(pool?.settings?.mfaConfiguration ?? 'OFF');
  const [minLength, setMinLength] = useState<number>(pool?.settings?.passwordPolicy?.minLength ?? 8);
  const [requireUppercase, setRequireUppercase] = useState<boolean>(pool?.settings?.passwordPolicy?.requireUppercase ?? true);
  const [requireLowercase, setRequireLowercase] = useState<boolean>(pool?.settings?.passwordPolicy?.requireLowercase ?? true);
  const [requireNumbers, setRequireNumbers] = useState<boolean>(pool?.settings?.passwordPolicy?.requireNumbers ?? true);
  const [requireSymbols, setRequireSymbols] = useState<boolean>(pool?.settings?.passwordPolicy?.requireSymbols ?? false);
  const [customAttrs, setCustomAttrs] = useState<Array<{ key: string; value: string }>>(
    Object.entries(pool?.customAttributes ?? {}).map(([key, value]) => ({ key, value })),
  );
  const [submitting, setSubmitting] = useState(false);

  const handleAddAttr = useCallback(() => {
    setCustomAttrs((prev) => [...prev, { key: '', value: '' }]);
  }, []);

  const handleRemoveAttr = useCallback((index: number) => {
    setCustomAttrs((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handleAttrChange = useCallback((index: number, field: 'key' | 'value', val: string) => {
    setCustomAttrs((prev) =>
      prev.map((attr, i) => (i === index ? { ...attr, [field]: val } : attr)),
    );
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setSubmitting(true);
      try {
        const attrs: Record<string, string> = {};
        for (const { key, value } of customAttrs) {
          if (key.trim()) attrs[key.trim()] = value;
        }
        await onSubmit({
          poolName,
          customAttributes: attrs,
          settings: {
            mfaConfiguration: mfaConfig,
            passwordPolicy: {
              minLength,
              requireUppercase,
              requireLowercase,
              requireNumbers,
              requireSymbols,
            },
          },
        });
      } finally {
        setSubmitting(false);
      }
    },
    [poolName, mfaConfig, minLength, requireUppercase, requireLowercase, requireNumbers, requireSymbols, customAttrs, onSubmit],
  );

  return (
    <div style={pageStyle}>
      <h1 style={titleStyle}>{isEdit ? 'Edit Pool' : 'Create Pool'}</h1>

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

        <section style={sectionStyle}>
          <h3 style={sectionTitleStyle}>MFA Configuration</h3>
          <FormField
            label="MFA Mode"
            name="mfaConfig"
            type="select"
            value={mfaConfig}
            onChange={(v) => setMfaConfig(String(v))}
            options={[
              { value: 'OFF', label: 'Off' },
              { value: 'OPTIONAL', label: 'Optional' },
              { value: 'REQUIRED', label: 'Required' },
            ]}
          />
        </section>

        <section style={sectionStyle}>
          <h3 style={sectionTitleStyle}>Password Policy</h3>
          <FormField
            label="Minimum Length"
            name="minLength"
            type="number"
            value={minLength}
            onChange={(v) => setMinLength(Number(v))}
          />
          <FormField
            label="Require Uppercase"
            name="requireUppercase"
            type="checkbox"
            value={requireUppercase}
            onChange={(v) => setRequireUppercase(Boolean(v))}
          />
          <FormField
            label="Require Lowercase"
            name="requireLowercase"
            type="checkbox"
            value={requireLowercase}
            onChange={(v) => setRequireLowercase(Boolean(v))}
          />
          <FormField
            label="Require Numbers"
            name="requireNumbers"
            type="checkbox"
            value={requireNumbers}
            onChange={(v) => setRequireNumbers(Boolean(v))}
          />
          <FormField
            label="Require Symbols"
            name="requireSymbols"
            type="checkbox"
            value={requireSymbols}
            onChange={(v) => setRequireSymbols(Boolean(v))}
          />
        </section>

        <section style={sectionStyle}>
          <h3 style={sectionTitleStyle}>Custom Attributes</h3>
          {customAttrs.map((attr, idx) => (
            <div key={idx} style={attrRowStyle}>
              <input
                style={attrInputStyle}
                placeholder="Attribute name"
                value={attr.key}
                onChange={(e) => handleAttrChange(idx, 'key', e.target.value)}
              />
              <input
                style={attrInputStyle}
                placeholder="Type (string, number, etc.)"
                value={attr.value}
                onChange={(e) => handleAttrChange(idx, 'value', e.target.value)}
              />
              <button type="button" style={removeBtnStyle} onClick={() => handleRemoveAttr(idx)}>
                Remove
              </button>
            </div>
          ))}
          <button type="button" style={addBtnStyle} onClick={handleAddAttr}>
            + Add Attribute
          </button>
        </section>

        <div style={buttonRowStyle}>
          <button type="submit" style={submitBtnStyle} disabled={submitting}>
            {submitting ? 'Saving...' : isEdit ? 'Update Pool' : 'Create Pool'}
          </button>
          <button type="button" style={cancelBtnStyle} onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
