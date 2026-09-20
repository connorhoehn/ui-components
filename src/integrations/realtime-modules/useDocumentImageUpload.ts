import { useCallback, useEffect, useRef } from 'react';

export const MAX_IMAGE_BYTES = 10 * 1024 * 1024;
export const MAX_ATTACHMENT_BYTES = 25 * 1024 * 1024;
export interface UploadedDocumentFile { url: string; name: string; size: number; type: string }
export interface DocumentImageUpload {
  uploadImage: (file: File) => Promise<string>;
  uploadFile: (file: File) => Promise<UploadedDocumentFile>;
  accepts: (file: File) => boolean;
}
export interface DocumentUploadCompletion { mine: boolean; transferId: string; downloadUrl?: string }
/** Structural injection keeps the UI package independent of the runtime package. */
export type DocumentFileUploadHook = (channel: string, options: {
  displayName: string; previewMaxEdge: number; onComplete: (completion: DocumentUploadCompletion) => void;
}) => { upload: (file: File) => Promise<{ status: string; error?: string; transferId?: string }> };
export function acceptsDocumentImage(file: File): boolean {
  return file.type.startsWith('image/') && file.size > 0 && file.size <= MAX_IMAGE_BYTES;
}
interface Waiter { resolve: (url: string) => void; reject: (error: Error) => void; timer: ReturnType<typeof setTimeout> }

/** Reference editor upload binding; waits for the server's stable asset URL, never a data URI. */
export function useDocumentImageUpload(
  documentId: string | null | undefined,
  displayName: string,
  useFileUpload: DocumentFileUploadHook,
  timeoutMs = 60_000,
): DocumentImageUpload {
  const pending = useRef(new Map<string, Waiter>());
  const early = useRef(new Map<string, DocumentUploadCompletion>());
  const inFlight = useRef(0);
  const epoch = useRef(0);
  const { upload } = useFileUpload(documentId ? `doc:${documentId}` : 'doc:pending', {
    displayName, previewMaxEdge: 0,
    onComplete: (completion) => {
      if (!completion.mine) return;
      const waiter = pending.current.get(completion.transferId);
      if (waiter) {
        pending.current.delete(completion.transferId);
        clearTimeout(waiter.timer);
        if (completion.downloadUrl) waiter.resolve(completion.downloadUrl);
        else waiter.reject(new Error('Upload finished without a download URL'));
      } else if (inFlight.current > 0) {
        // Completion can beat upload() resolving after PUT. Cache only while a
        // transfer is starting, with a bound independent of channel traffic.
        early.current.set(completion.transferId, completion);
        if (early.current.size > 64) early.current.delete(early.current.keys().next().value!);
      }
    },
  });
  useEffect(() => () => {
    epoch.current++;
    for (const waiter of pending.current.values()) {
      clearTimeout(waiter.timer);
      waiter.reject(new Error('Document changed before the upload completed'));
    }
    pending.current.clear();
    early.current.clear();
  }, [documentId]);

  const transfer = useCallback(async (file: File): Promise<string> => {
    if (!documentId) throw new Error('This document is not ready for uploads yet');
    const started = epoch.current;
    inFlight.current++;
    try {
      const state = await upload(file);
      if (epoch.current !== started) throw new Error('Document changed before the upload completed');
      if (state.status === 'failed') throw new Error(state.error || `Could not upload ${file.name}`);
      const id = state.transferId;
      if (!id) throw new Error('Upload returned no transfer id — the gateway never issued one');
      const completed = early.current.get(id);
      early.current.delete(id);
      if (completed) {
        if (!completed.downloadUrl) throw new Error('Upload finished without a download URL');
        return completed.downloadUrl;
      }
      return await new Promise<string>((resolve, reject) => {
        const timer = setTimeout(() => {
          pending.current.delete(id);
          reject(new Error(`Upload timed out: ${file.name}`));
        }, timeoutMs);
        pending.current.set(id, { resolve, reject, timer });
      });
    } finally {
      inFlight.current--;
      if (inFlight.current === 0) early.current.clear();
    }
  }, [documentId, upload, timeoutMs]);

  const uploadImage = useCallback(async (file: File) => {
    if (!file.type.startsWith('image/')) throw new Error(`${file.name} is not an image`);
    if (file.size === 0) throw new Error(`${file.name} is empty`);
    if (file.size > MAX_IMAGE_BYTES) throw new Error(`${file.name} is larger than ${MAX_IMAGE_BYTES / 1024 / 1024}MB`);
    return transfer(file);
  }, [transfer]);
  const uploadFile = useCallback(async (file: File): Promise<UploadedDocumentFile> => {
    if (file.size === 0) throw new Error(`${file.name} is empty`);
    if (file.size > MAX_ATTACHMENT_BYTES) throw new Error(`${file.name} is larger than ${MAX_ATTACHMENT_BYTES / 1024 / 1024}MB`);
    return { url: await transfer(file), name: file.name, size: file.size, type: file.type };
  }, [transfer]);
  return { uploadImage, uploadFile, accepts: acceptsDocumentImage };
}
