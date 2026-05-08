import { useCallback } from 'react';
import { useIdentityResource } from './useIdentityResource';
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
  const { data: templates, loading, error, setData: setTemplates, refresh, mutate } =
    useIdentityResource<EmailTemplate[]>([], { url: '/api/email-templates' });

  const createTemplate = useCallback(async (input: CreateEmailTemplateInput): Promise<EmailTemplate | null> => {
    const template = await mutate<EmailTemplate>('/api/email-templates', {
      method: 'POST',
      body: JSON.stringify(input),
    });
    if (template) setTemplates((prev) => [...prev, template]);
    return template;
  }, [mutate, setTemplates]);

  const updateTemplate = useCallback(async (templateId: string, input: UpdateEmailTemplateInput): Promise<EmailTemplate | null> => {
    const template = await mutate<EmailTemplate>(`/api/email-templates/${templateId}`, {
      method: 'PUT',
      body: JSON.stringify(input),
    });
    if (template) setTemplates((prev) => prev.map((t) => (t.templateId === templateId ? template : t)));
    return template;
  }, [mutate, setTemplates]);

  const deleteTemplate = useCallback(async (templateId: string): Promise<void> => {
    const result = await mutate<void>(`/api/email-templates/${templateId}`, { method: 'DELETE' });
    if (result !== null) setTemplates((prev) => prev.filter((t) => t.templateId !== templateId));
  }, [mutate, setTemplates]);

  const testSend = useCallback(async (templateId: string, recipientEmail: string): Promise<void> => {
    await mutate<void>(`/api/email-templates/${templateId}/test`, {
      method: 'POST',
      body: JSON.stringify({ recipientEmail }),
    });
  }, [mutate]);

  return { templates, loading, error, createTemplate, updateTemplate, deleteTemplate, testSend, refresh };
}
