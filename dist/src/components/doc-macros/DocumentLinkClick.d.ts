import { Extension } from '@tiptap/core';
import { PluginKey } from '@tiptap/pm/state';
export interface DocumentLinkClickOptions {
    /** The in-app path to open for this href, or null for "not ours — leave it to the Link mark". */
    resolve: (href: string) => string | null;
    /** Go there. Called with what `resolve` returned. */
    onOpen: (path: string) => void;
}
export declare const DOCUMENT_LINK_CLICK_KEY: PluginKey<any>;
/** The default `resolve`: same-origin `/documents/<id>…` links, as a path with query and hash. */
export declare function sameOriginDocumentPath(href: string, origin?: string): string | null;
export declare const DocumentLinkClick: Extension<DocumentLinkClickOptions, any>;
//# sourceMappingURL=DocumentLinkClick.d.ts.map