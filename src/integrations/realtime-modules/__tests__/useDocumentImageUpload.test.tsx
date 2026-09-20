import { act, cleanup, renderHook } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';
import { useDocumentImageUpload, type DocumentFileUploadHook } from '../useDocumentImageUpload';
afterEach(cleanup);
const file = new File(['photo'], 'photo.png', { type: 'image/png' });
it('retains a server completion delivered before the PUT promise resolves', async () => {
  const useTransport: DocumentFileUploadHook = (_channel, options) => ({ upload: async () => {
    options.onComplete({ mine: true, transferId: 'server-id', downloadUrl: '/api/uploads/server-id' });
    return { status: 'completed', transferId: 'server-id' };
  } });
  const { result } = renderHook(() => useDocumentImageUpload('document', 'Ada', useTransport));
  await expect(result.current.uploadImage(file)).resolves.toBe('/api/uploads/server-id');
});
it('ignores other collaborators and refuses a missing server transfer id', async () => {
  const useTransport: DocumentFileUploadHook = (_channel, options) => ({ upload: async () => {
    options.onComplete({ mine: false, transferId: 'other', downloadUrl: '/api/uploads/other' });
    return { status: 'completed' };
  } });
  const { result } = renderHook(() => useDocumentImageUpload('document', 'Ada', useTransport));
  await expect(result.current.uploadImage(file)).rejects.toThrow('no transfer id');
});
it('rejects pending insertion when leaving the document', async () => {
  const useTransport: DocumentFileUploadHook = () => ({ upload: vi.fn(async () => ({ status: 'completed', transferId: 'server-id' })) });
  const { result, unmount } = renderHook(() => useDocumentImageUpload('document', 'Ada', useTransport));
  const pending = result.current.uploadImage(file);
  const assertion = expect(pending).rejects.toThrow('Document changed');
  await act(async () => { await Promise.resolve(); });
  unmount();
  await assertion;
});
