// src/components/identity/admin/PoolFormPage.tsx
//
// Create/Edit form for user pools with password policy and custom attributes.

import { useState, useCallback } from 'react';
import { FormField } from '../shared/FormField';
import { cn } from '../../../lib/cn';

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
    <div className="max-w-[640px]">
      <h1 className="text-lg font-semibold text-text-primary mb-4">{isEdit ? 'Edit Pool' : 'Create Pool'}</h1>

      {error && <div className="px-4 py-2 bg-danger text-white rounded-sm mb-4 text-sm">{error}</div>}

      <form onSubmit={handleSubmit}>
        <FormField
          label="Pool Name"
          name="poolName"
          value={poolName}
          onChange={(v) => setPoolName(String(v))}
          required
          placeholder="my-user-pool"
        />

        <section className="mb-6">
          <h3 className="text-base font-semibold text-text-primary mb-2">MFA Configuration</h3>
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

        <section className="mb-6">
          <h3 className="text-base font-semibold text-text-primary mb-2">Password Policy</h3>
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

        <section className="mb-6">
          <h3 className="text-base font-semibold text-text-primary mb-2">Custom Attributes</h3>
          {customAttrs.map((attr, idx) => (
            <div key={idx} className="flex gap-2 items-center mb-2">
              <input
                className="flex-1 p-2 text-base border border-border rounded-sm bg-surface text-text-primary"
                placeholder="Attribute name"
                value={attr.key}
                onChange={(e) => handleAttrChange(idx, 'key', e.target.value)}
              />
              <input
                className="flex-1 p-2 text-base border border-border rounded-sm bg-surface text-text-primary"
                placeholder="Type (string, number, etc.)"
                value={attr.value}
                onChange={(e) => handleAttrChange(idx, 'value', e.target.value)}
              />
              <button
                type="button"
                className="px-2.5 py-1.5 border border-danger rounded-sm bg-transparent text-danger cursor-pointer text-sm"
                onClick={() => handleRemoveAttr(idx)}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            className="px-3 py-1.5 border border-border rounded-sm bg-surface text-text-primary cursor-pointer text-sm"
            onClick={handleAddAttr}
          >
            + Add Attribute
          </button>
        </section>

        <div className="flex gap-2 mt-6">
          <button
            type="submit"
            className="bg-primary text-white font-semibold rounded-md px-4 py-2 text-sm hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={submitting}
          >
            {submitting ? 'Saving...' : isEdit ? 'Update Pool' : 'Create Pool'}
          </button>
          <button
            type="button"
            className="px-5 py-2.5 bg-transparent border border-border rounded-sm text-base text-text-primary cursor-pointer"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
