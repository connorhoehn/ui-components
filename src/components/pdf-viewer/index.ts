// ui-components/src/components/pdf-viewer/index.ts
//
// The PDF viewer. Its own `./pdf-viewer` subpath so pdf.js (an optional peer,
// loaded on first mount) never reaches an app that shows no PDFs.

export { PdfViewer, setPdfWorkerSrc, PDF_ZOOM_STEPS } from './PdfViewer';
export type { PdfViewerProps, PdfZoom } from './PdfViewer';
