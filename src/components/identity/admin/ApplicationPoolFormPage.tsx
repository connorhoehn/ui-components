// src/components/identity/admin/ApplicationPoolFormPage.tsx
//
// Combined form to create both a user pool and an application in one step.

import { useState, useCallback } from 'react';
import { FormField } from '../shared/FormField';
import { cn } from '../../../lib/cn';

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
    <div className="max-w-[640px]">
      <h1 className="text-lg font-semibold text-text-primary mb-2">New Application + Pool</h1>
      <p className="text-base text-text-secondary mb-6">Create a user pool and register an application in one step.</p>

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
          <h3 className="text-base font-semibold text-text-primary mt-6 mb-2">Redirect URIs</h3>
          {redirectUris.map((uri, idx) => (
            <div key={idx} className="flex gap-2 items-center mb-1.5">
              <input
                className="flex-1 p-2 text-base border border-border rounded-sm bg-surface text-text-primary"
                value={uri}
                onChange={(e) => handleUriChange(idx, e.target.value)}
                placeholder="https://app.example.com/callback"
              />
              {redirectUris.length > 1 && (
                <button
                  type="button"
                  className="px-2.5 py-1.5 border border-danger rounded-sm bg-transparent text-danger cursor-pointer text-sm"
                  onClick={() => handleRemoveUri(idx)}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            className="px-3 py-1.5 border border-border rounded-sm bg-surface text-text-primary cursor-pointer text-sm"
            onClick={handleAddUri}
          >
            + Add URI
          </button>
        </section>

        {/* Grant Types */}
        <section>
          <h3 className="text-base font-semibold text-text-primary mt-6 mb-2">Grant Types</h3>
          <div className="flex flex-col gap-2 mb-4">
            {GRANT_TYPE_OPTIONS.map((gt) => (
              <label key={gt} className="flex items-center gap-2 text-base text-text-primary cursor-pointer">
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

        <div className="flex gap-2 mt-6">
          <button
            type="submit"
            className="bg-primary text-white font-semibold rounded-md px-4 py-2 text-sm hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={submitting}
          >
            {submitting ? 'Creating...' : 'Create Pool + Application'}
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
