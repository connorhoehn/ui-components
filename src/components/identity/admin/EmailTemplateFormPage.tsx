// src/components/identity/admin/EmailTemplateFormPage.tsx
//
// Create/Edit form for email templates with HTML preview and variable tags.

import { useState, useCallback } from 'react';
import { FormField } from '../shared/FormField';
import { Card } from '../../ui/Card';
import { PageSection } from '../../ui/PageSection';
import { Button } from '../../ui/Button';
import Banner from '../../shared/Banner';

export interface EmailTemplateFormPageProps {
  template?: {
    templateId?: string;
    name: string;
    subject: string;
    htmlBody: string;
    textBody: string;
    variables: string[];
  };
  isEdit: boolean;
  onSubmit: (data: { name: string; subject: string; htmlBody: string; textBody: string; variables: string[] }) => Promise<void>;
  onCancel: () => void;
  error?: string | null;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function EmailTemplateFormPage({
  template,
  isEdit,
  onSubmit,
  onCancel,
  error,
}: EmailTemplateFormPageProps) {
  const [name, setName] = useState(template?.name ?? '');
  const [subject, setSubject] = useState(template?.subject ?? '');
  const [htmlBody, setHtmlBody] = useState(template?.htmlBody ?? '');
  const [textBody, setTextBody] = useState(template?.textBody ?? '');
  const [variables, setVariables] = useState<string[]>(template?.variables ?? []);
  const [varInput, setVarInput] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleVarKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const val = varInput.trim();
        if (val && !variables.includes(val)) {
          setVariables((prev) => [...prev, val]);
        }
        setVarInput('');
      }
    },
    [varInput, variables],
  );

  const removeVariable = useCallback((v: string) => {
    setVariables((prev) => prev.filter((x) => x !== v));
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setSubmitting(true);
      try {
        await onSubmit({ name, subject, htmlBody, textBody, variables });
      } finally {
        setSubmitting(false);
      }
    },
    [name, subject, htmlBody, textBody, variables, onSubmit],
  );

  return (
    <PageSection title={isEdit ? 'Edit Email Template' : 'Create Email Template'} className="max-w-[800px]">
      {error && <Banner variant="error">{error}</Banner>}

      <Card padding="md">

      <form onSubmit={handleSubmit}>
        <FormField
          label="Template Name"
          name="name"
          value={name}
          onChange={(v) => setName(String(v))}
          required
          placeholder="welcome-email"
        />

        <FormField
          label="Subject"
          name="subject"
          value={subject}
          onChange={(v) => setSubject(String(v))}
          required
          placeholder="Welcome to {{appName}}"
        />

        {/* HTML Body */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-semibold text-text-primary">
              HTML Body
            </label>
            <Button variant="ghost" size="sm" onClick={() => setShowPreview((v) => !v)}>
              {showPreview ? 'Hide Preview' : 'Show Preview'}
            </Button>
          </div>
          <textarea
            value={htmlBody}
            onChange={(e) => setHtmlBody(e.target.value)}
            placeholder="<html><body>...</body></html>"
            rows={10}
            className="w-full p-2 text-base border border-border rounded-sm bg-white text-text-primary resize-y box-border font-mono"
          />
          {showPreview && (
            <div
              className="border border-border rounded-sm p-4 bg-white min-h-[200px] mt-2"
              dangerouslySetInnerHTML={{ __html: htmlBody }}
            />
          )}
        </div>

        <FormField
          label="Text Body"
          name="textBody"
          type="textarea"
          value={textBody}
          onChange={(v) => setTextBody(String(v))}
          placeholder="Plain text version of the email..."
        />

        {/* Variables */}
        <section>
          <h3 className="text-base font-semibold text-text-primary mt-6 mb-2">Variables</h3>
          <div className="flex flex-wrap gap-1.5 mb-2">
            {variables.map((v) => (
              <span key={v} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-info text-white text-sm font-medium">
                {'{{' + v + '}}'}
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-0 text-white text-[14px] leading-none min-w-0 min-h-0"
                  onClick={() => removeVariable(v)}
                  aria-label={`Remove variable ${v}`}
                >
                  x
                </Button>
              </span>
            ))}
          </div>
          <input
            className="w-full p-2 text-base border border-border rounded-sm bg-white text-text-primary box-border"
            placeholder="Type variable name and press Enter"
            value={varInput}
            onChange={(e) => setVarInput(e.target.value)}
            onKeyDown={handleVarKeyDown}
          />
        </section>

        <div className="flex gap-3 mt-6 pt-5 border-t border-border-subtle">
          <Button type="submit" variant="primary" size="lg" disabled={submitting}>
            {submitting ? 'Saving...' : isEdit ? 'Update Template' : 'Create Template'}
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
