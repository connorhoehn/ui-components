// DocumentLinkClick: a plain click on a same-origin /documents/ link opens it
// through the host and stops the Link mark's new-tab window.open; anything
// else (another site, a modified click) is left alone.
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import { DocumentLinkClick, DOCUMENT_LINK_CLICK_KEY, sameOriginDocumentPath } from '../DocumentLinkClick';

let editor: Editor | null = null;
afterEach(() => { editor?.destroy(); editor = null; vi.restoreAllMocks(); });

function mount(onOpen: (path: string) => void) {
  editor = new Editor({
    element: document.createElement('div'),
    extensions: [StarterKit, DocumentLinkClick.configure({ onOpen, resolve: (href) => sameOriginDocumentPath(href, 'http://app.test') })],
    content: '<p>Sources: <a href="/documents/rp-1">Release plan</a> · <a href="https://example.com/x">Elsewhere</a></p>',
  });
  return editor;
}

function click(ed: Editor, text: string, init: MouseEventInit = {}) {
  const anchor = [...ed.view.dom.querySelectorAll('a')].find((a) => a.textContent === text)!;
  const event = new MouseEvent('click', { button: 0, bubbles: true, cancelable: true, ...init });
  Object.defineProperty(event, 'target', { value: anchor });
  const plugin = DOCUMENT_LINK_CLICK_KEY.get(ed.state)!;
  return plugin.props.handleClick!.call(plugin, ed.view, 1, event);
}

describe('DocumentLinkClick', () => {
  it('resolves same-origin document paths only', () => {
    expect(sameOriginDocumentPath('/documents/a?type=page#h', 'http://app.test')).toBe('/documents/a?type=page#h');
    expect(sameOriginDocumentPath('http://app.test/documents/a', 'http://app.test')).toBe('/documents/a');
    expect(sameOriginDocumentPath('https://example.com/documents/a', 'http://app.test')).toBeNull();
    expect(sameOriginDocumentPath('/pipelines/x', 'http://app.test')).toBeNull();
  });

  it('opens an in-app document through the host and handles the click', () => {
    const onOpen = vi.fn();
    const ed = mount(onOpen);
    expect(click(ed, 'Release plan')).toBe(true);
    expect(onOpen).toHaveBeenCalledWith('/documents/rp-1');
  });

  it('leaves other links and modified clicks to the Link mark', () => {
    const onOpen = vi.fn();
    const ed = mount(onOpen);
    expect(click(ed, 'Elsewhere')).toBe(false);
    expect(click(ed, 'Release plan', { metaKey: true })).toBe(false);
    expect(onOpen).not.toHaveBeenCalled();
  });

  it('runs before the Link extension', () => {
    const ed = mount(vi.fn());
    const names = ed.extensionManager.extensions.map((e) => e.name);
    const link = ed.extensionManager.extensions.find((e) => e.name === 'link');
    const mine = ed.extensionManager.extensions.find((e) => e.name === 'documentLinkClick');
    expect(names).toContain('link');
    expect(mine!.config.priority!).toBeGreaterThan(link!.config.priority ?? 100);
  });
});
