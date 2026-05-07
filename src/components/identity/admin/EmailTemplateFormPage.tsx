// src/components/identity/admin/EmailTemplateFormPage.tsx
//
// Create/Edit form for email templates with HTML preview and variable tags.

import { useState, useCallback } from 'react';
import { FormField } from '../shared/FormField';
import { cn } from '../../../lib/cn';

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
  onSubmit: (data: any) => Promise<void>;
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
    <div className="max-w-[800px]">
      <h1 className="text-lg font-semibold text-text-primary mb-4">{isEdit ? 'Edit Email Template' : 'Create Email Template'}</h1>

      {error && <div className="px-4 py-2 bg-danger text-white rounded-sm mb-4 text-sm">{error}</div>}

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
            <button
              type="button"
              className="px-3.5 py-1.5 border border-border rounded-sm bg-surface text-text-primary cursor-pointer text-sm"
              onClick={() => setShowPreview((v) => !v)}
            >
              {showPreview ? 'Hide Preview' : 'Show Preview'}
            </button>
          </div>
          <textarea
            value={htmlBody}
            onChange={(e) => setHtmlBody(e.target.value)}
            placeholder="<html><body>...</body></html>"
            rows={10}
            className="w-full p-2 text-base border border-border rounded-sm bg-surface text-text-primary resize-y box-border font-mono"
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
                <button
                  type="button"
                  className="bg-transparent border-none text-white cursor-pointer text-[14px] leading-none px-0.5"
                  onClick={() => removeVariable(v)}
                >
                  x
                </button>
              </span>
            ))}
          </div>
          <input
            className="w-full p-2 text-base border border-border rounded-sm bg-surface text-text-primary box-border"
            placeholder="Type variable name and press Enter"
            value={varInput}
            onChange={(e) => setVarInput(e.target.value)}
            onKeyDown={handleVarKeyDown}
          />
        </section>

        <div className="flex gap-2 mt-6">
          <button
            type="submit"
            className="bg-primary text-white font-semibold rounded-md px-4 py-2 text-sm hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={submitting}
          >
            {submitting ? 'Saving...' : isEdit ? 'Update Template' : 'Create Template'}
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
