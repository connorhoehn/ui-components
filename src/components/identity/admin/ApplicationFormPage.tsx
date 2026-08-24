// src/components/identity/admin/ApplicationFormPage.tsx
//
// Create/Edit form for OAuth/OIDC applications with multi-value inputs.

import { useId, useState, useCallback } from 'react';
import { FormField } from '../shared/FormField';
import { Card } from '../../ui/Card';
import { PageSection } from '../../ui/PageSection';
import { Button } from '../../ui/Button';
import { Input } from '../../forms/Input';
import { Checkbox } from '../../forms/Checkbox';
import Banner from '../../shared/Banner';

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
  onSubmit: (data: {
    clientName: string;
    poolId: string;
    redirectUris: string[];
    postLogoutRedirectUris: string[];
    grantTypes: string[];
    responseTypes: string[];
    scope: string;
  }) => Promise<void>;
  onCancel: () => void;
  error?: string | null;
}

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
  const uid = useId();
  const handleAdd = () => onChange([...values, '']);
  const handleRemove = (idx: number) => onChange(values.filter((_, i) => i !== idx));
  const handleChange = (idx: number, val: string) =>
    onChange(values.map((v, i) => (i === idx ? val : v)));

  // The <label> here had no htmlFor and wrapped nothing, and it could not have
  // had one: it captions a repeating list, so there is no single control for
  // htmlFor to point at (pointing it at the wrapping <div> associates nothing —
  // browsers, screen readers and getByLabelText all ignore that). The list is a
  // role="group" named from the same label instead, and each row is named
  // positionally. Without this the only name the boxes had was the placeholder,
  // which vanishes as soon as a value is typed — and every "Remove" button was
  // identically named, so nothing said which row it removed.
  const labelId = `${uid}-label`;

  return (
    <div className="mb-4">
      <label id={labelId} className="block mb-1 text-sm font-semibold text-text-primary">
        {label}
      </label>
      <div role="group" aria-labelledby={labelId}>
        {values.map((val, idx) => (
          <div key={idx} className="flex gap-2 items-center mb-1.5">
            <Input
              aria-label={`${label} ${idx + 1}`}
              className="flex-1"
              value={val}
              onChange={(e) => handleChange(idx, e.target.value)}
              placeholder={placeholder}
            />
            <Button
              variant="danger"
              size="sm"
              aria-label={`Remove ${label} ${idx + 1}`}
              onClick={() => handleRemove(idx)}
            >
              Remove
            </Button>
          </div>
        ))}
        <Button variant="ghost" size="sm" aria-label={`Add ${label}`} onClick={handleAdd}>
          + Add
        </Button>
      </div>
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
    <PageSection title={isEdit ? 'Edit Application' : 'New Application'} className="max-w-[640px]">
      {error && <Banner variant="error">{error}</Banner>}

      <Card padding="md">

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
          <h3 className="text-base font-semibold text-text-primary mt-6 mb-2">Grant Types</h3>
          <div className="flex flex-col gap-2 mb-4">
            {GRANT_TYPE_OPTIONS.map((gt) => (
              <label key={gt} className="flex items-center gap-2 text-base text-text-primary cursor-pointer">
                <Checkbox
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
          <h3 className="text-base font-semibold text-text-primary mt-6 mb-2">Response Types</h3>
          <div className="flex flex-col gap-2 mb-4">
            {RESPONSE_TYPE_OPTIONS.map((rt) => (
              <label key={rt} className="flex items-center gap-2 text-base text-text-primary cursor-pointer">
                <Checkbox
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

        <div className="flex gap-3 mt-6 pt-5 border-t border-border-subtle">
          <Button type="submit" variant="primary" size="lg" disabled={submitting}>
            {submitting ? 'Saving...' : isEdit ? 'Update Application' : 'Create Application'}
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
