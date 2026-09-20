import * as Y from 'yjs';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';
import WrappedCanvasDocument, { type RMUseCanvasDocumentReturn } from '../WrappedCanvasDocument';
vi.mock('../../../components/doc-editor/CanvasDocumentView', () => ({
  default: ({ onConvert }: { onConvert: () => Promise<string | null> }) => <button onClick={() => void onConvert()}>Convert</button>,
}));
afterEach(cleanup);
const schema = { nodes: {}, marks: {} };
function canvas() {
  return { isCanvas: false, schemaVersion: 1, body: null, exportMarkdown: () => '', materialize: vi.fn(() => ({ ok: true, unsupported: [] })), importMarkdown: vi.fn() } as RMUseCanvasDocumentReturn;
}
it('waits for legacy writers to unmount before materializing', async () => {
  let release!: () => void;
  const beforeConvert = vi.fn(() => new Promise<void>(r => { release = r; }));
  const doc = canvas();
  render(<WrappedCanvasDocument canvas={doc} schema={schema} extensions={[]} beforeConvert={beforeConvert} ydoc={new Y.Doc()} provider={null} user={{ name: 'Ada', color: '#123456' }} />);
  fireEvent.click(screen.getByText('Convert'));
  expect(doc.materialize).not.toHaveBeenCalled();
  release();
  await waitFor(() => expect(doc.materialize).toHaveBeenCalledOnce());
});
it('does not materialize if the transition gate refuses', async () => {
  const doc = canvas();
  const beforeConvert = vi.fn(async () => { throw new Error('Legacy writer still mounted'); });
  render(<WrappedCanvasDocument canvas={doc} schema={schema} extensions={[]} beforeConvert={beforeConvert} ydoc={new Y.Doc()} provider={null} user={{ name: 'Ada', color: '#123456' }} />);
  fireEvent.click(screen.getByText('Convert'));
  await waitFor(() => expect(beforeConvert).toHaveBeenCalledOnce());
  expect(doc.materialize).not.toHaveBeenCalled();
});
