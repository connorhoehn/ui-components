// ui-components/src/components/pdf-viewer/PdfViewer.tsx
//
// One page of a PDF at a time, with page navigation and zoom, drawn by pdf.js.
//
// pdf.js is an optional peer of the `./pdf-viewer` subpath and is loaded with a
// dynamic import the first time a viewer mounts, so importing the subpath costs
// nothing until a document is shown.
//
// THE WORKER. pdf.js parses in a Web Worker whose script the app must serve;
// the library cannot ship it, because a library build inlines assets and the
// worker is about a megabyte. Give the viewer its URL once, either with the
// `workerSrc` prop or with `setPdfWorkerSrc(url)` at start-up. In a Vite app:
//
//   import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
//   setPdfWorkerSrc(pdfWorkerUrl);
//
// The worker must come from the same pdfjs-dist version the app resolves.
import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import type { PDFDocumentProxy, RenderTask } from 'pdfjs-dist';
import { cn } from '../../lib/cn';
import { Toolbar, ToolbarGroup, ToolbarSeparator } from '../shared/Toolbar';
import { Text } from '../shared/Text';
import LoadingState from '../shared/LoadingState';
import ErrorState from '../shared/ErrorState';
import { IconButton } from '../ui/IconButton';
import { Button } from '../ui/Button';
import { ChevronIcon, MinusIcon, PlusIcon } from '../ui/Icons';

/** The zoom steps the buttons move between, as a fraction of the page's own size. */
export const PDF_ZOOM_STEPS: readonly number[] = [0.5, 0.75, 1, 1.25, 1.5, 2, 3];

export type PdfZoom = number | 'fit-width';

export interface PdfViewerProps {
  /** Where the PDF is. Same-origin requests carry the session cookie. */
  src?: string | URL;
  /** The PDF's bytes, when the app already holds them. Copied, never detached. */
  data?: Uint8Array | ArrayBuffer;
  /** Send cookies on a cross-origin `src`. */
  withCredentials?: boolean;
  /** URL of pdf.js's worker script. Overrides `setPdfWorkerSrc`. */
  workerSrc?: string;
  /** What the document is ("Résumé"), for the page image's accessible name. Default "Document". */
  title?: string;
  /** Page shown first (1-based). Default 1. */
  initialPage?: number;
  /** Called when the shown page changes. */
  onPageChange?: (page: number) => void;
  /** Starting zoom: a fraction (1 = the page's own size) or `'fit-width'` (default). */
  initialZoom?: PdfZoom;
  /** Called once the document is open. */
  onLoad?: (info: { pageCount: number }) => void;
  /** Called when the document cannot be opened. */
  onError?: (error: Error) => void;
  /** Extra controls at the toolbar's end (a download link, say). */
  actions?: ReactNode;
  /** `framed` (default) draws a rounded border; `flush` draws none. */
  variant?: 'framed' | 'flush';
  className?: string;
}

type PdfJs = typeof import('pdfjs-dist');

let configuredWorkerSrc: string | null = null;
let pdfjsPromise: Promise<PdfJs> | null = null;

/** Tell every PdfViewer where pdf.js's worker script is served. Call once at start-up. */
export function setPdfWorkerSrc(url: string): void {
  configuredWorkerSrc = url;
}

function loadPdfJs(): Promise<PdfJs> {
  pdfjsPromise ??= import('pdfjs-dist').catch((err: unknown) => {
    pdfjsPromise = null;
    throw err;
  });
  return pdfjsPromise;
}

type Load =
  | { status: 'loading' }
  | { status: 'ready'; doc: PDFDocumentProxy }
  | { status: 'error'; reason: 'password' | 'unreadable' };

const PAD = 32; // the page's inset inside the scroll area, both sides together

function clampPage(page: number, count: number): number {
  return Math.min(Math.max(1, Math.round(page) || 1), Math.max(1, count));
}

function stepZoom(current: number, dir: 1 | -1): number {
  if (dir > 0) return PDF_ZOOM_STEPS.find((z) => z > current + 0.001) ?? PDF_ZOOM_STEPS[PDF_ZOOM_STEPS.length - 1]!;
  return [...PDF_ZOOM_STEPS].reverse().find((z) => z < current - 0.001) ?? PDF_ZOOM_STEPS[0]!;
}

/**
 * A PDF, one page at a time, from a URL or bytes, with page navigation and zoom, drawn by pdf.js.
 *
 * Import from `@connorhoehn/ui-components/pdf-viewer`. Needs the optional peer
 * `pdfjs-dist`, and the app must serve pdf.js's worker script and pass its URL
 * (`workerSrc`, or `setPdfWorkerSrc` once).
 */
export function PdfViewer({
  src,
  data,
  withCredentials,
  workerSrc,
  title = 'Document',
  initialPage = 1,
  onPageChange,
  initialZoom = 'fit-width',
  onLoad,
  onError,
  actions,
  variant = 'framed',
  className,
}: PdfViewerProps) {
  const [load, setLoad] = useState<Load>({ status: 'loading' });
  const [attempt, setAttempt] = useState(0);
  const [page, setPage] = useState(() => Math.max(1, Math.round(initialPage) || 1));
  const [zoom, setZoom] = useState<PdfZoom>(initialZoom);
  const [shownScale, setShownScale] = useState<number | null>(null);
  const [width, setWidth] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const latest = useRef({ onLoad, onError, onPageChange, initialPage });
  latest.current = { onLoad, onError, onPageChange, initialPage };

  const srcKey = src === undefined ? '' : String(src);

  // Open the document.
  useEffect(() => {
    if (!srcKey && !data) return;
    let cancelled = false;
    let task: { promise: Promise<PDFDocumentProxy>; destroy: () => Promise<void> } | null = null;
    setLoad({ status: 'loading' });
    setShownScale(null);

    void (async () => {
      try {
        const pdfjs = await loadPdfJs();
        if (cancelled) return;
        const worker = workerSrc ?? configuredWorkerSrc;
        if (worker) pdfjs.GlobalWorkerOptions.workerSrc = worker;
        if (!pdfjs.GlobalWorkerOptions.workerSrc) {
          throw new Error(
            'PdfViewer: pdf.js has no worker. Serve pdfjs-dist/build/pdf.worker.min.mjs and pass its URL as `workerSrc` or to setPdfWorkerSrc().',
          );
        }
        // pdf.js transfers the buffer to its worker, which detaches it; hand
        // it a copy so the caller's bytes stay usable.
        const bytes = data ? (data instanceof Uint8Array ? data.slice() : new Uint8Array(data.slice(0))) : undefined;
        task = pdfjs.getDocument(bytes ? { data: bytes } : { url: srcKey, withCredentials: !!withCredentials });
        const doc = await task.promise;
        if (cancelled) return;
        setPage(clampPage(latest.current.initialPage, doc.numPages));
        setLoad({ status: 'ready', doc });
        latest.current.onLoad?.({ pageCount: doc.numPages });
      } catch (err) {
        if (cancelled) return;
        const error = err instanceof Error ? err : new Error(String(err));
        if (error.name !== 'PasswordException') console.error(error);
        setLoad({ status: 'error', reason: error.name === 'PasswordException' ? 'password' : 'unreadable' });
        latest.current.onError?.(error);
      }
    })();

    return () => {
      cancelled = true;
      void task?.destroy().catch(() => undefined);
    };
  }, [srcKey, data, withCredentials, workerSrc, attempt]);

  // Track the scroll area's width so fit-width follows the pane.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    setWidth(el.clientWidth);
    if (typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(() => setWidth(el.clientWidth));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const doc = load.status === 'ready' ? load.doc : null;
  const pageCount = doc?.numPages ?? 0;

  // Draw the page.
  useEffect(() => {
    if (!doc) return;
    let cancelled = false;
    let renderTask: RenderTask | null = null;
    void (async () => {
      try {
        const pdfPage = await doc.getPage(page);
        if (cancelled) return;
        const natural = pdfPage.getViewport({ scale: 1 });
        const scale = zoom === 'fit-width' ? (width > PAD ? (width - PAD) / natural.width : 1) : zoom;
        const ratio = typeof window !== 'undefined' && window.devicePixelRatio > 0 ? window.devicePixelRatio : 1;
        const viewport = pdfPage.getViewport({ scale: scale * ratio });
        const canvas = canvasRef.current;
        if (!canvas) return;
        canvas.width = Math.floor(viewport.width);
        canvas.height = Math.floor(viewport.height);
        canvas.style.width = `${Math.floor(viewport.width / ratio)}px`;
        canvas.style.height = `${Math.floor(viewport.height / ratio)}px`;
        renderTask = pdfPage.render({ canvas, viewport });
        setShownScale(scale);
        await renderTask.promise;
      } catch (err) {
        if (cancelled || (err instanceof Error && err.name === 'RenderingCancelledException')) return;
        console.error(err);
      }
    })();
    return () => {
      cancelled = true;
      renderTask?.cancel();
    };
  }, [doc, page, zoom, width]);

  const goTo = useCallback(
    (next: number) => {
      if (!pageCount) return;
      const clamped = clampPage(next, pageCount);
      if (clamped === page) return;
      setPage(clamped);
      latest.current.onPageChange?.(clamped);
      scrollRef.current?.scrollTo?.({ top: 0 });
    },
    [page, pageCount],
  );

  const currentScale = zoom === 'fit-width' ? (shownScale ?? 1) : zoom;
  const zoomBy = (dir: 1 | -1) => setZoom(stepZoom(currentScale, dir));
  const canZoomIn = currentScale < PDF_ZOOM_STEPS[PDF_ZOOM_STEPS.length - 1]! - 0.001;
  const canZoomOut = currentScale > PDF_ZOOM_STEPS[0]! + 0.001;

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!doc) return;
    if (e.key === 'PageDown') goTo(page + 1);
    else if (e.key === 'PageUp') goTo(page - 1);
    else if (e.key === '+' || e.key === '=') zoomBy(1);
    else if (e.key === '-') zoomBy(-1);
    else return;
    e.preventDefault();
  };

  const pageLabel = useMemo(() => (pageCount ? `Page ${page} of ${pageCount}` : 'Page'), [page, pageCount]);

  return (
    <div
      data-testid="pdf-viewer"
      data-state={load.status}
      data-page={doc ? page : undefined}
      data-page-count={pageCount || undefined}
      className={cn(
        'flex min-h-0 min-w-0 flex-col overflow-hidden bg-surface',
        variant === 'framed' && 'rounded-md border border-solid border-border',
        className,
      )}
    >
      <Toolbar aria-label={`${title} controls`} end={actions}>
        <ToolbarGroup aria-label="Pages">
          <IconButton
            aria-label="Previous page"
            size="sm"
            icon={<ChevronIcon dir="left" />}
            disabled={!doc || page <= 1}
            onClick={() => goTo(page - 1)}
          />
          <Text size="xs" tone="secondary" tabular role="status" data-testid="pdf-viewer-page">
            {pageLabel}
          </Text>
          <IconButton
            aria-label="Next page"
            size="sm"
            icon={<ChevronIcon dir="right" />}
            disabled={!doc || page >= pageCount}
            onClick={() => goTo(page + 1)}
          />
        </ToolbarGroup>
        <ToolbarSeparator />
        <ToolbarGroup aria-label="Zoom">
          <IconButton aria-label="Zoom out" size="sm" icon={<MinusIcon />} disabled={!doc || !canZoomOut} onClick={() => zoomBy(-1)} />
          <Text size="xs" tone="secondary" tabular data-testid="pdf-viewer-zoom">
            {`${Math.round(currentScale * 100)}%`}
          </Text>
          <IconButton aria-label="Zoom in" size="sm" icon={<PlusIcon />} disabled={!doc || !canZoomIn} onClick={() => zoomBy(1)} />
          <Button
            size="sm"
            variant="ghost"
            aria-pressed={zoom === 'fit-width'}
            disabled={!doc}
            onClick={() => setZoom('fit-width')}
          >
            Fit width
          </Button>
        </ToolbarGroup>
      </Toolbar>
      <div
        ref={scrollRef}
        role="region"
        aria-label={title}
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="relative min-h-0 flex-1 overflow-auto bg-surface-panel p-4 outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
      >
        {load.status === 'loading' && <LoadingState label="Opening the document…" />}
        {load.status === 'error' && (
          <ErrorState
            compact
            title={load.reason === 'password' ? 'This document is protected by a password.' : 'This document could not be shown.'}
            description={load.reason === 'password' ? 'It cannot be opened here.' : 'Try again in a moment.'}
            actionLabel={load.reason === 'password' ? undefined : 'Try again'}
            onAction={load.reason === 'password' ? undefined : () => setAttempt((n) => n + 1)}
          />
        )}
        <canvas
          ref={canvasRef}
          role="img"
          aria-label={doc ? `${title}, page ${page} of ${pageCount}` : title}
          data-testid="pdf-viewer-canvas"
          className={cn('mx-auto block bg-paper shadow-md', !doc && 'hidden')}
        />
      </div>
    </div>
  );
}

export default PdfViewer;
