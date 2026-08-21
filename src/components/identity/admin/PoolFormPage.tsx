// src/components/identity/admin/PoolFormPage.tsx
//
// Create/Edit form for user pools with password policy and custom attributes.

import { useState, useCallback } from 'react';
import { FormField } from '../shared/FormField';
import { Card } from '../../ui/Card';
import { PageSection } from '../../ui/PageSection';
import { Button } from '../../ui/Button';
import { Input } from '../../forms/Input';
import Banner from '../../shared/Banner';
import type { PoolSettings } from '../../../types/identity';

export interface PoolFormPageProps {
  pool?: {
    poolId?: string;
    poolName: string;
    customAttributes: Record<string, string>;
    settings: PoolSettings;
  };
  isEdit: boolean;
  onSubmit: (data: {
    poolName: string;
    customAttributes: Record<string, string>;
    settings: PoolSettings;
  }) => Promise<void>;
  onCancel: () => void;
  error?: string | null;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function PoolFormPage({ pool, isEdit, onSubmit, onCancel, error }: PoolFormPageProps) {
  const [poolName, setPoolName] = useState(pool?.poolName ?? '');
  const [mfaConfig, setMfaConfig] = useState<'OFF' | 'OPTIONAL' | 'REQUIRED'>(pool?.settings?.mfaConfiguration ?? 'OFF');
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
    <PageSection title={isEdit ? 'Edit Pool' : 'Create Pool'} className="max-w-[640px]">
      {error && <Banner variant="error">{error}</Banner>}

      <Card padding="md">

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
            onChange={(v) => setMfaConfig(String(v) as 'OFF' | 'OPTIONAL' | 'REQUIRED')}
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
              <Input
                className="flex-1"
                placeholder="Attribute name"
                value={attr.key}
                onChange={(e) => handleAttrChange(idx, 'key', e.target.value)}
              />
              <Input
                className="flex-1"
                placeholder="Type (string, number, etc.)"
                value={attr.value}
                onChange={(e) => handleAttrChange(idx, 'value', e.target.value)}
              />
              <Button variant="danger" size="sm" onClick={() => handleRemoveAttr(idx)}>
                Remove
              </Button>
            </div>
          ))}
          <Button variant="ghost" size="sm" onClick={handleAddAttr}>
            + Add Attribute
          </Button>
        </section>

        <div className="flex gap-3 mt-6 pt-5 border-t border-border-subtle">
          <Button type="submit" variant="primary" size="lg" disabled={submitting}>
            {submitting ? 'Saving...' : isEdit ? 'Update Pool' : 'Create Pool'}
          </Button>
          <Button variant="ghost" size="lg" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
      </Card>
    </PageSection>
  );
}
