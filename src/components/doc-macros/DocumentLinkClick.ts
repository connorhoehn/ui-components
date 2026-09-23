// DocumentLinkClick — a plain click on a link to another document in the app
// opens it in place (the host's router), instead of the Link mark's default
// `window.open(href, '_blank')` new browser tab.
//
// A page's "Sources: Release plan · Auth architecture" line is a list of
// references to other documents in the same app. Opening each in a new tab
// dropped the explorer, the workbench and the session around it. The host
// says which hrefs are its own (`resolve`) and how to go there (`onOpen`);
// every other link keeps the Link mark's behaviour. A modified click (⌘, ctrl,
// shift, alt) or a middle click is left to the browser.
//
// Runs as a ProseMirror `handleClick` prop at a priority above the Link
// extension's (1000), so returning true stops the Link handler from opening
// the tab. Since 2.385.3.
import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state';

export interface DocumentLinkClickOptions {
  /** The in-app path to open for this href, or null for "not ours — leave it to the Link mark". */
  resolve: (href: string) => string | null;
  /** Go there. Called with what `resolve` returned. */
  onOpen: (path: string) => void;
}

export const DOCUMENT_LINK_CLICK_KEY = new PluginKey('documentLinkClick');

/** The default `resolve`: same-origin `/documents/<id>…` links, as a path with query and hash. */
export function sameOriginDocumentPath(href: string, origin: string = globalThis.location?.origin ?? ''): string | null {
  let url: URL;
  try { url = new URL(href, origin || undefined); } catch { return null; }
  if (origin && url.origin !== origin) return null;
  if (!/^\/documents\/[^/]+/.test(url.pathname)) return null;
  return `${url.pathname}${url.search}${url.hash}`;
}

export const DocumentLinkClick = Extension.create<DocumentLinkClickOptions>({
  name: 'documentLinkClick',
  priority: 1001,
  addOptions() {
    return { resolve: (href: string) => sameOriginDocumentPath(href), onOpen: () => {} };
  },
  addProseMirrorPlugins() {
    const options = this.options;
    return [new Plugin({
      key: DOCUMENT_LINK_CLICK_KEY,
      props: {
        handleClick: (view, _pos, event) => {
          if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return false;
          const target = event.target as Element | null;
          const anchor = target && typeof target.closest === 'function' ? target.closest('a[href]') : null;
          if (!anchor || !view.dom.contains(anchor)) return false;
          const path = options.resolve(anchor.getAttribute('href') ?? '');
          if (!path) return false;
          event.preventDefault();
          options.onOpen(path);
          return true;
        },
      },
    })];
  },
});
