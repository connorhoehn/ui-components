// The viewer against the real pdf.js, on a PDF generated here.
//
// jsdom can run pdf.js's parser (its "fake worker" loads the worker module in
// process from a file: URL) but has no canvas 2D context, so these tests read
// what the viewer laid out (page count, page label, the canvas's pixel size)
// rather than pixels. A failed draw is logged and ignored, as in a browser.
import { describe, it, expect, vi, beforeAll, afterAll, afterEach } from 'vitest';
import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { PdfViewer } from '../index';

const WORKER = pathToFileURL(resolve('node_modules/pdfjs-dist/build/pdf.worker.mjs')).href;

/** A valid PDF with `pages` blank pages of 200 x 100 points. */
function makePdf(pages: number): Uint8Array {
  const objs = [
    '<< /Type /Catalog /Pages 2 0 R >>',
    `<< /Type /Pages /Kids [${Array.from({ length: pages }, (_, i) => `${3 + i} 0 R`).join(' ')}] /Count ${pages} >>`,
    ...Array.from({ length: pages }, () => '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 200 100] >>'),
  ];
  let out = '%PDF-1.4\n';
  const offsets: number[] = [];
  objs.forEach((body, i) => {
    offsets.push(out.length);
    out += `${i + 1} 0 obj\n${body}\nendobj\n`;
  });
  const xref = out.length;
  out += `xref\n0 ${objs.length + 1}\n0000000000 65535 f \n`;
  out += offsets.map((o) => `${String(o).padStart(10, '0')} 00000 n \n`).join('');
  out += `trailer\n<< /Size ${objs.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`;
  return new TextEncoder().encode(out);
}

let errorSpy: ReturnType<typeof vi.spyOn>;
beforeAll(() => {
  // No canvas in jsdom: pdf.js's draw fails and the viewer logs it.
  errorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined);
});
afterAll(() => errorSpy.mockRestore());
afterEach(() => cleanup());

const viewer = () => screen.getByTestId('pdf-viewer');
const canvas = () => screen.getByTestId('pdf-viewer-canvas') as HTMLCanvasElement;

describe('PdfViewer with pdf.js', () => {
  it('opens a PDF from bytes, shows its first page and pages through it', async () => {
    const bytes = makePdf(3);
    const onLoad = vi.fn();
    const onPageChange = vi.fn();
    render(<PdfViewer data={bytes} workerSrc={WORKER} title="Résumé" onLoad={onLoad} onPageChange={onPageChange} />);

    expect(viewer().getAttribute('data-state')).toBe('loading');
    expect(screen.getByText('Opening the document…')).toBeTruthy();

    await waitFor(() => expect(viewer().getAttribute('data-state')).toBe('ready'), { timeout: 5000 });
    expect(onLoad).toHaveBeenCalledWith({ pageCount: 3 });
    expect(screen.getByTestId('pdf-viewer-page').textContent).toBe('Page 1 of 3');
    // The caller's bytes were copied, not handed to the worker and detached.
    expect(bytes.byteLength).toBeGreaterThan(0);

    // Laid out at the page's own size (jsdom has no width, so fit-width is 100%).
    await waitFor(() => expect(canvas().width).toBe(200));
    expect(canvas().height).toBe(100);
    expect(canvas().getAttribute('aria-label')).toBe('Résumé, page 1 of 3');

    const prev = screen.getByRole('button', { name: 'Previous page' }) as HTMLButtonElement;
    const next = screen.getByRole('button', { name: 'Next page' }) as HTMLButtonElement;
    expect(prev.disabled).toBe(true);
    fireEvent.click(next);
    fireEvent.click(next);
    expect(screen.getByTestId('pdf-viewer-page').textContent).toBe('Page 3 of 3');
    expect(next.disabled).toBe(true);
    expect(onPageChange.mock.calls.map((c) => c[0])).toEqual([2, 3]);

    // Keyboard paging on the focused page area.
    fireEvent.keyDown(screen.getByRole('region', { name: 'Résumé' }), { key: 'PageUp' });
    expect(viewer().getAttribute('data-page')).toBe('2');
  });

  it('zooms in steps and back to fit width', async () => {
    render(<PdfViewer data={makePdf(1)} workerSrc={WORKER} />);
    await waitFor(() => expect(canvas().width).toBe(200), { timeout: 5000 });
    expect(screen.getByTestId('pdf-viewer-zoom').textContent).toBe('100%');

    fireEvent.click(screen.getByRole('button', { name: 'Zoom in' }));
    await waitFor(() => expect(canvas().width).toBe(250));
    expect(screen.getByTestId('pdf-viewer-zoom').textContent).toBe('125%');
    expect(screen.getByRole('button', { name: 'Fit width' }).getAttribute('aria-pressed')).toBe('false');

    fireEvent.click(screen.getByRole('button', { name: 'Zoom out' }));
    fireEvent.click(screen.getByRole('button', { name: 'Zoom out' }));
    await waitFor(() => expect(canvas().width).toBe(150));
    expect(screen.getByTestId('pdf-viewer-zoom').textContent).toBe('75%');

    fireEvent.click(screen.getByRole('button', { name: 'Fit width' }));
    await waitFor(() => expect(canvas().width).toBe(200));
    expect(screen.getByRole('button', { name: 'Fit width' }).getAttribute('aria-pressed')).toBe('true');
  });

  it('starts on the requested page, kept inside the document', async () => {
    render(<PdfViewer data={makePdf(2)} workerSrc={WORKER} initialPage={9} />);
    await waitFor(() => expect(viewer().getAttribute('data-state')).toBe('ready'), { timeout: 5000 });
    expect(screen.getByTestId('pdf-viewer-page').textContent).toBe('Page 2 of 2');
  });

  it('says so when the bytes are not a PDF', async () => {
    const onError = vi.fn();
    render(<PdfViewer data={new TextEncoder().encode('not a pdf')} workerSrc={WORKER} onError={onError} />);
    await waitFor(() => expect(viewer().getAttribute('data-state')).toBe('error'), { timeout: 5000 });
    expect(screen.getByText('This document could not be shown.')).toBeTruthy();
    expect(onError).toHaveBeenCalledTimes(1);
    await act(async () => undefined);
  });
});
