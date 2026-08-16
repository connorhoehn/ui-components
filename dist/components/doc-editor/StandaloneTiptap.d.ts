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