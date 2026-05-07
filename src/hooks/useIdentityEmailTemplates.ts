// Identity email templates hook — CRUD templates + test send.

import { useState, useEffect, useCallback } from 'react';
import { useIdentityContext } from '../contexts/IdentityContext';
import { apiFetch } from './identityApi';
import type {
  EmailTemplate,
  CreateEmailTemplateInput,
  UpdateEmailTemplateInput,
} from '../types/identity';

export interface UseIdentityEmailTemplatesReturn {
  templates: EmailTemplate[];
  loading: boolean;
  error: string | null;
  createTemplate: (input: CreateEmailTemplateInput) => Promise<EmailTemplate | null>;
  updateTemplate: (templateId: string, input: UpdateEmailTemplateInput) => Promise<EmailTemplate | null>;
  deleteTemplate: (templateId: string) => Promise<void>;
  testSend: (templateId: string, recipientEmail: string) => Promise<void>;
  refresh: () => Promise<void>;
}

export function useIdentityEmailTemplates(): UseIdentityEmailTemplatesReturn {
  const { idToken } = useIdentityContext();
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTemplates = useCallback(async () => {
    if (!idToken) return;
    setLoading(true);
    setError(null);
    try {
      const data = await apiFetch<EmailTemplate[]>('/api/email-templates', idToken);
      setTemplates(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [idToken]);

  useEffect(() => {
    fetchTemplates();
  }, [fetchTemplates]);

  const createTemplate = useCallback(async (input: CreateEmailTemplateInput): Promise<EmailTemplate | null> => {
    if (!idToken) return null;
    setLoading(true);
    setError(null);
    try {
      const template = await apiFetch<EmailTemplate>('/api/email-templates', idToken, {
        method: 'POST',
        body: JSON.stringify(input),
      });
      setTemplates((prev) => [...prev, template]);
      return template;
    } catch (err) {
      setError((err as Error).message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [idToken]);

  const updateTemplate = useCallback(async (templateId: string, input: UpdateEmailTemplateInput): Promise<EmailTemplate | null> => {
    if (!idToken) return null;
    setLoading(true);
    setError(null);
    try {
      const template = await apiFetch<EmailTemplate>(`/api/email-templates/${templateId}`, idToken, {
        method: 'PUT',
        body: JSON.stringify(input),
      });
      setTemplates((prev) => prev.map((t) => (t.templateId === templateId ? template : t)));
      return template;
    } catch (err) {
      setError((err as Error).message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [idToken]);

  const deleteTemplate = useCallback(async (templateId: string): Promise<void> => {
    if (!idToken) return;
    setLoading(true);
    setError(null);
    try {
      await apiFetch<void>(`/api/email-templates/${templateId}`, idToken, { method: 'DELETE' });
      setTemplates((prev) => prev.filter((t) => t.templateId !== templateId));
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [idToken]);

  const testSend = useCallback(async (templateId: string, recipientEmail: string): Promise<void> => {
    if (!idToken) return;
    setError(null);
    try {
      await apiFetch<void>(`/api/email-templates/${templateId}/test`, idToken, {
        method: 'POST',
        body: JSON.stringify({ recipientEmail }),
      });
    } catch (err) {
      setError((err as Error).message);
    }
  }, [idToken]);

  return { templates, loading, error, createTemplate, updateTemplate, deleteTemplate, testSend, refresh: fetchTemplates };
}
