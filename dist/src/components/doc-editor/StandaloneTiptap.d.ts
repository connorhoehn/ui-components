import * as Y from 'yjs';
import type { CollaborationProvider } from './TiptapEditor';
export interface StandaloneTiptapUser {
    name: string;
    color: string;
}
interface SharedProps {
    user: StandaloneTiptapUser;
    /** Y.XmlFragment name on the shared doc. Default: 'prosemirror'. */
    fragmentName?: string;
    editable?: boolean;
    placeholder?: string;
    className?: string;
    /**
     * Called once when the editor first connects to a non-null XmlFragment.
     * Useful for seeding initial content via consumer code.
     */
    onFragmentReady?: (fragment: Y.XmlFragment, ydoc: Y.Doc) => void;
    /** Slot shown while bootstrapping (Y.Doc not yet constructed). */
    loadingSlot?: React.ReactNode;
    /**
     * Wait for the provider's first sync before mounting the editor.
     *
     * Default `false`, which is the historical behaviour: the editor mounts on
     * the first commit, before any server snapshot has arrived. The user sees an
     * empty document with a placeholder and can start typing into it — and the
     * server's content then merges *around* what they wrote. Tiptap's
     * Collaboration extension also writes an empty paragraph into an empty
     * fragment, so a cold open can leave a stray block behind.
     *
     * Set `true` when the document is expected to have existing content and you
     * would rather show `loadingSlot` than risk that. It is opt-in rather than
     * the default because a gateway that sends no snapshot for a brand-new
     * document never fires `synced`, and gating on it there would hang the
     * editor forever.
     *
     * `onFragmentReady` respects this too: seeding content into an unsynced doc
     * is the same corruption by another route.
     */
    requireSync?: boolean;
}
export interface StandaloneTiptapBootstrapProps extends SharedProps {
    /** WebSocket URL of the gateway, e.g. wss://gateway.example.com/ws */
    gatewayUrl: string;
    /** Document id; the component subscribes to `doc:${docId}`. */
    docId: string;
    /** Bearer-style token forwarded as Sec-WebSocket-Protocol. May be ''. */
    authToken: string;
    /** Optional channel override; default `doc:${docId}`. */
    channel?: string;
    ydoc?: undefined;
    provider?: undefined;
    fragment?: undefined;
}
export interface StandaloneTiptapEscapeHatchProps extends SharedProps {
    ydoc: Y.Doc;
    provider: CollaborationProvider | null;
    /** If omitted, falls back to ydoc.getXmlFragment(fragmentName ?? 'prosemirror'). */
    fragment?: Y.XmlFragment;
    gatewayUrl?: undefined;
    docId?: undefined;
    authToken?: undefined;
    channel?: undefined;
}
export type StandaloneTiptapProps = StandaloneTiptapBootstrapProps | StandaloneTiptapEscapeHatchProps;
export default function StandaloneTiptap(props: StandaloneTiptapProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=StandaloneTiptap.d.ts.map