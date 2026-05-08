// src/components/identity/admin/ApplicationPoolFormPage.tsx
//
// Combined form to create both a user pool and an application in one step.

import { useState, useCallback } from 'react';
import { FormField } from '../shared/FormField';
import { Card } from '../../ui/Card';
import { PageSection } from '../../ui/PageSection';
import { Button } from '../../ui/Button';
import Banner from '../../shared/Banner';

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
    <PageSection title="New Application + Pool" description="Create a user pool and register an application in one step." className="max-w-[640px]">
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
          <h3 className="text-base font-semibold text-slate-800 mt-6 mb-2">Redirect URIs</h3>
          {redirectUris.map((uri, idx) => (
            <div key={idx} className="flex gap-2 items-center mb-1.5">
              <input
                className="flex-1 p-2 text-base border border-slate-200 rounded-sm bg-white text-slate-800"
                value={uri}
                onChange={(e) => handleUriChange(idx, e.target.value)}
                placeholder="https://app.example.com/callback"
              />
              {redirectUris.length > 1 && (
                <Button variant="danger" size="sm" onClick={() => handleRemoveUri(idx)}>
                  Remove
                </Button>
              )}
            </div>
          ))}
          <Button variant="ghost" size="sm" onClick={handleAddUri}>
            + Add URI
          </Button>
        </section>

        {/* Grant Types */}
        <section>
          <h3 className="text-base font-semibold text-slate-800 mt-6 mb-2">Grant Types</h3>
          <div className="flex flex-col gap-2 mb-4">
            {GRANT_TYPE_OPTIONS.map((gt) => (
              <label key={gt} className="flex items-center gap-2 text-base text-slate-800 cursor-pointer">
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

        <div className="flex gap-3 mt-6 pt-5 border-t border-slate-100">
          <Button type="submit" variant="primary" size="lg" disabled={submitting}>
            {submitting ? 'Creating...' : 'Create Pool + Application'}
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
