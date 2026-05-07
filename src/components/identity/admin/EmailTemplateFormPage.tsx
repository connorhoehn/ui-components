// src/components/identity/admin/EmailTemplateFormPage.tsx
//
// Create/Edit form for email templates with HTML preview and variable tags.

import { useState, useCallback } from 'react';
import { FormField } from '../shared/FormField';

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
// Styles
// ---------------------------------------------------------------------------

const pageStyle: React.CSSProperties = {
  maxWidth: '800px',
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

const tagContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '6px',
  marginBottom: '8px',
};

const tagStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '4px',
  padding: '4px 10px',
  borderRadius: '999px',
  backgroundColor: 'var(--ui-info)',
  color: '#fff',
  fontSize: 'var(--ui-fontSizeSm)',
  fontWeight: 500,
};

const tagRemoveBtnStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  color: '#fff',
  cursor: 'pointer',
  fontSize: '14px',
  lineHeight: 1,
  padding: '0 2px',
};

const tagInputStyle: React.CSSProperties = {
  padding: 'var(--ui-spacingSm)',
  fontSize: 'var(--ui-fontSizeMd)',
  border: '1px solid var(--ui-border)',
  borderRadius: 'var(--ui-radiusSm)',
  backgroundColor: 'var(--ui-surface)',
  color: 'var(--ui-textPrimary)',
  width: '100%',
  boxSizing: 'border-box',
};

const previewToggleStyle: React.CSSProperties = {
  padding: '6px 14px',
  border: '1px solid var(--ui-border)',
  borderRadius: 'var(--ui-radiusSm)',
  backgroundColor: 'var(--ui-surface)',
  color: 'var(--ui-textPrimary)',
  cursor: 'pointer',
  fontSize: 'var(--ui-fontSizeSm)',
  font: 'inherit',
};

const previewFrameStyle: React.CSSProperties = {
  border: '1px solid var(--ui-border)',
  borderRadius: 'var(--ui-radiusSm)',
  padding: 'var(--ui-spacingMd)',
  backgroundColor: '#fff',
  minHeight: '200px',
  marginTop: 'var(--ui-spacingSm)',
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
    <div style={pageStyle}>
      <h1 style={titleStyle}>{isEdit ? 'Edit Email Template' : 'Create Email Template'}</h1>

      {error && <div style={errorBannerStyle}>{error}</div>}

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
        <div style={{ marginBottom: 'var(--ui-spacingMd)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
            <label style={{ fontSize: 'var(--ui-fontSizeSm)', fontWeight: 600, color: 'var(--ui-textPrimary)' }}>
              HTML Body
            </label>
            <button
              type="button"
              style={previewToggleStyle}
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
            style={{
              width: '100%',
              padding: 'var(--ui-spacingSm)',
              fontSize: 'var(--ui-fontSizeMd)',
              border: '1px solid var(--ui-border)',
              borderRadius: 'var(--ui-radiusSm)',
              backgroundColor: 'var(--ui-surface)',
              color: 'var(--ui-textPrimary)',
              resize: 'vertical',
              boxSizing: 'border-box',
              fontFamily: 'monospace',
            }}
          />
          {showPreview && (
            <div style={previewFrameStyle} dangerouslySetInnerHTML={{ __html: htmlBody }} />
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
          <h3 style={sectionTitleStyle}>Variables</h3>
          <div style={tagContainerStyle}>
            {variables.map((v) => (
              <span key={v} style={tagStyle}>
                {'{{' + v + '}}'}
                <button type="button" style={tagRemoveBtnStyle} onClick={() => removeVariable(v)}>
                  x
                </button>
              </span>
            ))}
          </div>
          <input
            style={tagInputStyle}
            placeholder="Type variable name and press Enter"
            value={varInput}
            onChange={(e) => setVarInput(e.target.value)}
            onKeyDown={handleVarKeyDown}
          />
        </section>

        <div style={buttonRowStyle}>
          <button type="submit" style={submitBtnStyle} disabled={submitting}>
            {submitting ? 'Saving...' : isEdit ? 'Update Template' : 'Create Template'}
          </button>
          <button type="button" style={cancelBtnStyle} onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
