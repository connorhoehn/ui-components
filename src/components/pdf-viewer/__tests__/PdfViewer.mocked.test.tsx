// The viewer's states and its contract with pdf.js, with pdf.js replaced, so
// failures, retries, a URL source and the worker set-up can be driven exactly.
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';

const pdfjs = vi.hoisted(() => {
  const state = {
    GlobalWorkerOptions: { workerSrc: '' },
    getDocument: vi.fn(),
  };
  return state;
});
vi.mock('pdfjs-dist', () => pdfjs);

import { PdfViewer, setPdfWorkerSrc } from '../index';

function fakeDoc(numPages: number) {
  const render = vi.fn(() => ({ promise: Promise.resolve(), cancel: vi.fn() }));
  return {
    numPages,
    render,
    getPage: vi.fn(async () => ({
      getViewport: ({ scale }: { scale: number }) => ({ width: 600 * scale, height: 800 * scale }),
      render,
    })),
  };
}

function task(promise: Promise<unknown>) {
  return { promise, destroy: vi.fn(() => Promise.resolve()) };
}

const viewer = () => screen.getByTestId('pdf-viewer');

let errorSpy: ReturnType<typeof vi.spyOn>;
beforeEach(() => {
  pdfjs.getDocument.mockReset();
  pdfjs.GlobalWorkerOptions.workerSrc = '';
  errorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined);
});
afterEach(() => {
  cleanup();
  errorSpy.mockRestore();
});

describe('PdfViewer states (pdf.js mocked)', () => {
  it('shows loading until the document opens, then draws the page', async () => {
    let open!: (doc: unknown) => void;
    const doc = fakeDoc(4);
    pdfjs.getDocument.mockReturnValue(task(new Promise((r) => (open = r))));
    render(<PdfViewer src="/api/files/resume.pdf" workerSrc="/pdf.worker.min.mjs" />);

    expect(viewer().getAttribute('data-state')).toBe('loading');
    expect(screen.getByText('Opening the document…')).toBeTruthy();
    expect((screen.getByRole('button', { name: 'Next page' }) as HTMLButtonElement).disabled).toBe(true);
    await waitFor(() => expect(pdfjs.getDocument).toHaveBeenCalledTimes(1));
    expect(pdfjs.getDocument).toHaveBeenCalledWith({ url: '/api/files/resume.pdf', withCredentials: false });
    expect(pdfjs.GlobalWorkerOptions.workerSrc).toBe('/pdf.worker.min.mjs');

    open(doc);
    await waitFor(() => expect(viewer().getAttribute('data-state')).toBe('ready'));
    expect(screen.queryByText('Opening the document…')).toBeNull();
    expect(screen.getByTestId('pdf-viewer-page').textContent).toBe('Page 1 of 4');
    await waitFor(() => expect(doc.render).toHaveBeenCalledTimes(1));
    const [args] = doc.render.mock.calls[0] as unknown as [{ canvas: HTMLCanvasElement }];
    expect(args.canvas).toBe(screen.getByTestId('pdf-viewer-canvas'));

    fireEvent.click(screen.getByRole('button', { name: 'Next page' }));
    await waitFor(() => expect(doc.getPage).toHaveBeenLastCalledWith(2));
    expect(screen.getByTestId('pdf-viewer-page').textContent).toBe('Page 2 of 4');
  });

  it('offers Try again after a failure, and recovers', async () => {
    pdfjs.getDocument
      .mockReturnValueOnce(task(Promise.reject(new Error('network down'))))
      .mockReturnValueOnce(task(Promise.resolve(fakeDoc(1))));
    const onError = vi.fn();
    render(<PdfViewer src="/resume.pdf" workerSrc="/w.mjs" onError={onError} />);
    await waitFor(() => expect(viewer().getAttribute('data-state')).toBe('error'));
    expect(screen.getByText('This document could not be shown.')).toBeTruthy();
    expect(onError.mock.calls[0]![0].message).toBe('network down');

    fireEvent.click(screen.getByRole('button', { name: 'Try again' }));
    await waitFor(() => expect(viewer().getAttribute('data-state')).toBe('ready'));
    expect(pdfjs.getDocument).toHaveBeenCalledTimes(2);
  });

  it('names a password-protected document and offers no retry', async () => {
    const err = Object.assign(new Error('No password given'), { name: 'PasswordException' });
    pdfjs.getDocument.mockReturnValue(task(Promise.reject(err)));
    render(<PdfViewer src="/locked.pdf" workerSrc="/w.mjs" />);
    await waitFor(() => expect(viewer().getAttribute('data-state')).toBe('error'));
    expect(screen.getByText('This document is protected by a password.')).toBeTruthy();
    expect(screen.queryByRole('button', { name: 'Try again' })).toBeNull();
  });

  it('refuses to start without a worker and tells the developer how to serve one', async () => {
    render(<PdfViewer src="/resume.pdf" />);
    await waitFor(() => expect(viewer().getAttribute('data-state')).toBe('error'));
    expect(pdfjs.getDocument).not.toHaveBeenCalled();
    expect(String(errorSpy.mock.calls[0]?.[0])).toContain('setPdfWorkerSrc');
  });

  it('uses the worker set once with setPdfWorkerSrc', async () => {
    pdfjs.getDocument.mockReturnValue(task(Promise.resolve(fakeDoc(1))));
    setPdfWorkerSrc('/assets/pdf.worker.min.mjs');
    render(<PdfViewer src="/resume.pdf" withCredentials />);
    await waitFor(() => expect(viewer().getAttribute('data-state')).toBe('ready'));
    expect(pdfjs.GlobalWorkerOptions.workerSrc).toBe('/assets/pdf.worker.min.mjs');
    expect(pdfjs.getDocument).toHaveBeenCalledWith({ url: '/resume.pdf', withCredentials: true });
  });

  it('hands pdf.js a copy of the bytes and closes the document on unmount', async () => {
    const t = task(Promise.resolve(fakeDoc(1)));
    pdfjs.getDocument.mockReturnValue(t);
    const bytes = new Uint8Array([37, 80, 68, 70]);
    const { unmount } = render(<PdfViewer data={bytes} workerSrc="/w.mjs" />);
    await waitFor(() => expect(viewer().getAttribute('data-state')).toBe('ready'));
    const passed = (pdfjs.getDocument.mock.calls[0]![0] as { data: Uint8Array }).data;
    expect(passed).not.toBe(bytes);
    expect([...passed]).toEqual([...bytes]);
    unmount();
    expect(t.destroy).toHaveBeenCalled();
  });
});
