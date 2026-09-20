import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { Node } from '@tiptap/core';
import { NodeViewWrapper, ReactNodeViewRenderer, type NodeViewProps } from '@tiptap/react';

/** Fetch bytes using the current viewer's identity; credentials never enter the document. */
export type DocumentImageLoader = (src: string, signal: AbortSignal) => Promise<Blob>;
export interface DocumentImageProviderProps {
  loadImage: DocumentImageLoader;
  /** Only these URLs are passed to the authenticated loader. Defaults to gateway uploads. */
  requiresAuthentication?: (src: string) => boolean;
  children: ReactNode;
}
const isUpload = (src: string) => src.startsWith('/api/uploads/');
const ImageContext = createContext<Omit<DocumentImageProviderProps, 'children'> | null>(null);

export function DocumentImageProvider({ children, ...value }: DocumentImageProviderProps) {
  return <ImageContext.Provider value={value}>{children}</ImageContext.Provider>;
}

/** Shared node view extracted from the reference document editor. */
export function AuthenticatedDocumentImageView({ node, selected }: NodeViewProps) {
  const src = (node.attrs.src as string | null) ?? '';
  const alt = (node.attrs.alt as string | null) ?? '';
  const title = (node.attrs.title as string | null) ?? '';
  const services = useContext(ImageContext);
  const loadImage = services?.loadImage;
  const requiresAuthentication = services?.requiresAuthentication ?? isUpload;
  const [result, setResult] = useState<{ src: string; loader: DocumentImageLoader | undefined; url: string | null; failed: boolean } | null>(null);
  const protectedImage = requiresAuthentication(src);
  // Never briefly display bytes loaded under a previous identity/source.
  const current = result?.src === src && result.loader === loadImage ? result : null;
  const resolved = protectedImage ? current?.url : src;
  const failed = protectedImage && !!current?.failed;

  useEffect(() => {
    if (!src || !protectedImage) return;
    const controller = new AbortController();
    let objectUrl: string | null = null;
    setResult(null);
    void (async () => {
      try {
        if (!loadImage) throw new Error('Document image authentication is not configured');
        const blob = await loadImage(src, controller.signal);
        if (controller.signal.aborted) return;
        objectUrl = URL.createObjectURL(blob);
        setResult({ src, loader: loadImage, url: objectUrl, failed: false });
      } catch {
        if (!controller.signal.aborted) setResult({ src, loader: loadImage, url: null, failed: true });
      }
    })();
    return () => {
      controller.abort();
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [src, protectedImage, loadImage]);

  return (
    <NodeViewWrapper as="div" data-testid="canvas-document-image" data-image-state={failed ? 'failed' : resolved ? 'ready' : 'loading'}>
      {resolved && !failed ? (
        <img src={resolved} alt={alt} {...(title ? { title } : {})}
          className={selected ? 'ProseMirror-selectednode' : undefined} draggable={false} />
      ) : (
        <span className={failed ? 'text-sm italic text-danger-fg' : 'text-sm italic text-text-tertiary'} data-testid="canvas-document-image-fallback">
          {failed ? `Could not load ${alt || 'image'}` : 'Loading image…'}
        </span>
      )}
    </NodeViewWrapper>
  );
}

/** Inject the caller's image extension to preserve one TipTap module graph. */
export function createAuthenticatedDocumentImage(image: Node): Node {
  return image.configure({ inline: false, allowBase64: false }).extend({
    addNodeView() { return ReactNodeViewRenderer(AuthenticatedDocumentImageView); },
  });
}
