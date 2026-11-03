import { act, renderHook } from '@testing-library/react';
import { useRef } from 'react';
import { useFullscreen } from '../useFullscreen';

type FsDoc = Document & { fullscreenElement: Element | null; fullscreenEnabled: boolean };

function installFullscreenApi() {
  const doc = document as FsDoc;
  let current: Element | null = null;
  Object.defineProperty(doc, 'fullscreenElement', { configurable: true, get: () => current });
  Object.defineProperty(doc, 'fullscreenEnabled', { configurable: true, get: () => true });
  Element.prototype.requestFullscreen = vi.fn(function (this: Element) {
    current = this;
    document.dispatchEvent(new Event('fullscreenchange'));
    return Promise.resolve();
  });
  doc.exitFullscreen = vi.fn(() => {
    current = null;
    document.dispatchEvent(new Event('fullscreenchange'));
    return Promise.resolve();
  });
  return () => {
    delete (Element.prototype as { requestFullscreen?: unknown }).requestFullscreen;
    delete (doc as { exitFullscreen?: unknown }).exitFullscreen;
    delete (doc as { fullscreenElement?: unknown }).fullscreenElement;
    delete (doc as { fullscreenEnabled?: unknown }).fullscreenEnabled;
  };
}

describe('useFullscreen', () => {
  it('reports support, enters and leaves on the element, and follows fullscreenchange', async () => {
    const restore = installFullscreenApi();
    const el = document.createElement('div');
    document.body.appendChild(el);
    const { result } = renderHook(() => useFullscreen(useRef<HTMLDivElement>(el)));
    expect(result.current.supported).toBe(true);
    expect(result.current.active).toBe(false);
    await act(() => result.current.toggle());
    expect(result.current.active).toBe(true);
    expect(Element.prototype.requestFullscreen).toHaveBeenCalledTimes(1);
    await act(() => result.current.toggle());
    expect(result.current.active).toBe(false);
    expect(document.exitFullscreen).toHaveBeenCalledTimes(1);
    expect(result.current.error).toBe(false);
    document.body.removeChild(el);
    restore();
  });

  it('is unsupported, and an entry request is an error rather than a throw, without the API', async () => {
    const el = document.createElement('div');
    const { result } = renderHook(() => useFullscreen(useRef<HTMLDivElement>(el)));
    expect(result.current.supported).toBe(false);
    await act(() => result.current.enter());
    expect(result.current.active).toBe(false);
    expect(result.current.error).toBe(true);
  });
});
