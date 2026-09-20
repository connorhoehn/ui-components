import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { AuthenticatedDocumentImageView, DocumentImageProvider } from '../AuthenticatedDocumentImage';
import type { NodeViewProps } from '@tiptap/react';
vi.mock('@tiptap/react', () => ({
  NodeViewWrapper: ({ children, as: _as, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <div {...props}>{children}</div>,
  ReactNodeViewRenderer: vi.fn(),
}));
const props = (src: string) => ({ node: { attrs: { src, alt: 'Evidence' } }, selected: false }) as unknown as NodeViewProps;
beforeEach(() => {
  vi.stubGlobal('URL', { createObjectURL: vi.fn(() => 'blob:private-image'), revokeObjectURL: vi.fn() });
});
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });
it('loads protected bytes through the supplied identity without changing document src', async () => {
  const loadImage = vi.fn(async (_src: string, _signal: AbortSignal) => new Blob(['image']));
  const input = props('/api/uploads/asset');
  const { unmount } = render(<DocumentImageProvider loadImage={loadImage}><AuthenticatedDocumentImageView {...input} /></DocumentImageProvider>);
  await waitFor(() => expect(screen.getByAltText('Evidence')).toHaveAttribute('src', 'blob:private-image'));
  expect(loadImage).toHaveBeenCalledWith('/api/uploads/asset', expect.any(AbortSignal));
  expect(input.node.attrs.src).toBe('/api/uploads/asset');
  unmount();
  expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:private-image');
  expect(loadImage.mock.calls[0][1].aborted).toBe(true);
});
it('fails visibly when protected images have no authenticated loader', async () => {
  render(<AuthenticatedDocumentImageView {...props('/api/uploads/asset')} />);
  await waitFor(() => expect(screen.getByTestId('canvas-document-image')).toHaveAttribute('data-image-state', 'failed'));
  expect(screen.queryByRole('img')).toBeNull();
});
it('does not forward credentials for external image URLs', () => {
  const loadImage = vi.fn();
  render(<DocumentImageProvider loadImage={loadImage}><AuthenticatedDocumentImageView {...props('https://example.test/image.png')} /></DocumentImageProvider>);
  expect(screen.getByAltText('Evidence')).toHaveAttribute('src', 'https://example.test/image.png');
  expect(loadImage).not.toHaveBeenCalled();
});
it('discards a response arriving after the viewer identity changed', async () => {
  let resolve!: (blob: Blob) => void;
  const oldLoader = vi.fn(() => new Promise<Blob>(r => { resolve = r; }));
  const newLoader = vi.fn(async () => { throw new Error('Access revoked'); });
  const { rerender } = render(<DocumentImageProvider loadImage={oldLoader}><AuthenticatedDocumentImageView {...props('/api/uploads/asset')} /></DocumentImageProvider>);
  rerender(<DocumentImageProvider loadImage={newLoader}><AuthenticatedDocumentImageView {...props('/api/uploads/asset')} /></DocumentImageProvider>);
  resolve(new Blob(['old bytes']));
  await waitFor(() => expect(screen.getByTestId('canvas-document-image')).toHaveAttribute('data-image-state', 'failed'));
  expect(URL.createObjectURL).not.toHaveBeenCalled();
});
