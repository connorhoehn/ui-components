// src/components/identity/admin/UserFormPage.tsx
//
// Create/Edit form for users with standard and custom attribute fields.

import { useState, useCallback } from 'react';
import { FormField } from '../shared/FormField';
import { cn } from '../../../lib/cn';

export interface UserFormPageProps {
  user?: {
    userId?: string;
    email: string;
    givenName?: string;
    familyName?: string;
    nickname?: string;
    picture?: string;
    website?: string;
    customAttributes?: Record<string, unknown>;
  };
  isEdit: boolean;
  poolId: string;
  customAttributeDefinitions?: Record<string, string>;
  onSubmit: (data: any) => Promise<void>;
  onCancel: () => void;
  error?: string | null;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function UserFormPage({
  user,
  isEdit,
  customAttributeDefinitions,
  onSubmit,
  onCancel,
  error,
}: UserFormPageProps) {
  const [email, setEmail] = useState(user?.email ?? '');
  const [password, setPassword] = useState('');
  const [givenName, setGivenName] = useState(user?.givenName ?? '');
  const [familyName, setFamilyName] = useState(user?.familyName ?? '');
  const [nickname, setNickname] = useState(user?.nickname ?? '');
  const [picture, setPicture] = useState(user?.picture ?? '');
  const [website, setWebsite] = useState(user?.website ?? '');
  const [customValues, setCustomValues] = useState<Record<string, string>>(
    Object.fromEntries(
      Object.entries(user?.customAttributes ?? {}).map(([k, v]) => [k, String(v)]),
    ),
  );
  const [submitting, setSubmitting] = useState(false);

  const handleCustomChange = useCallback((key: string, value: string) => {
    setCustomValues((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setSubmitting(true);
      try {
        await onSubmit({
          email,
          ...(!isEdit && password ? { password } : {}),
          givenName: givenName || undefined,
          familyName: familyName || undefined,
          nickname: nickname || undefined,
          picture: picture || undefined,
          website: website || undefined,
          customAttributes: customValues,
        });
      } finally {
        setSubmitting(false);
      }
    },
    [email, password, givenName, familyName, nickname, picture, website, customValues, isEdit, onSubmit],
  );

  return (
    <div className="max-w-[640px]">
      <h1 className="text-lg font-semibold text-text-primary mb-4">{isEdit ? 'Edit User' : 'Create User'}</h1>

      {error && <div className="px-4 py-2 bg-danger text-white rounded-sm mb-4 text-sm">{error}</div>}

      <form onSubmit={handleSubmit}>
        <FormField
          label="Email"
          name="email"
          type="email"
          value={email}
          onChange={(v) => setEmail(String(v))}
          required
          placeholder="user@example.com"
        />

        {!isEdit && (
          <FormField
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={(v) => setPassword(String(v))}
            required
            placeholder="Temporary password"
            helpText="User will be prompted to change on first login."
          />
        )}

        <FormField
          label="Given Name"
          name="givenName"
          value={givenName}
          onChange={(v) => setGivenName(String(v))}
          placeholder="John"
        />

        <FormField
          label="Family Name"
          name="familyName"
          value={familyName}
          onChange={(v) => setFamilyName(String(v))}
          placeholder="Doe"
        />

        <FormField
          label="Nickname"
          name="nickname"
          value={nickname}
          onChange={(v) => setNickname(String(v))}
          placeholder="johnny"
        />

        <FormField
          label="Picture URL"
          name="picture"
          value={picture}
          onChange={(v) => setPicture(String(v))}
          placeholder="https://..."
        />

        <FormField
          label="Website"
          name="website"
          value={website}
          onChange={(v) => setWebsite(String(v))}
          placeholder="https://..."
        />

        {/* Custom Attributes */}
        {customAttributeDefinitions && Object.keys(customAttributeDefinitions).length > 0 && (
          <section>
            <h3 className="text-base font-semibold text-text-primary mt-6 mb-2">Custom Attributes</h3>
            {Object.entries(customAttributeDefinitions).map(([key, type]) => (
              <FormField
                key={key}
                label={key}
                name={`custom_${key}`}
                type={type === 'number' ? 'number' : 'text'}
                value={customValues[key] ?? ''}
                onChange={(v) => handleCustomChange(key, String(v))}
                helpText={`Type: ${type}`}
              />
            ))}
          </section>
        )}

        <div className="flex gap-2 mt-6">
          <button
            type="submit"
            className="bg-primary text-white font-semibold rounded-md px-4 py-2 text-sm hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={submitting}
          >
            {submitting ? 'Saving...' : isEdit ? 'Update User' : 'Create User'}
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
