import type { DocumentType } from '../../types/documentType';
import { type DocumentTypeCookbook } from '../doc-types/cookbooks';
/**
 * Which authoring surface a new document opens in.
 *
 * `page` becomes `meta.schemaVersion = 2` on the document's CRDT — the one
 * gate the editor branches on. Doing that translation is the host's job, not
 * this modal's; the modal only reports which shape the person chose.
 */
export type DocumentShape = 'page' | 'sections' | 'diagram' | 'presentation';
/** A thing a presentation can be generated FROM. */
export interface NewPresentationSource {
    id: string;
    title: string;
    kind?: 'document' | 'transcript';
    /** A date, a length — whatever tells two similar rows apart. */
    subtitle?: string;
}
export type NewPresentationOrigin = 'blank' | 'transcript' | 'document';
/**
 * What "New document → Presentation" asks the host for.
 *
 * `from` and `sourceId` are the generator's half of the contract: the host
 * posts them to `/api/deck/fixture`, which drafts a real `DeckSpec` from the
 * named transcript or document. `title` and `description` come along because
 * the host still has to create a document row, and asking for the title twice
 * — once here, once in a second dialog — is the flow this modal replaced.
 */
export interface NewPresentationFixtureRequest {
    from: NewPresentationOrigin;
    /** The transcript or document it is derived from. Absent for `blank`. */
    sourceId?: string;
    title: string;
    description?: string;
}
export interface NewDocumentModalProps {
    open: boolean;
    onClose: () => void;
    onCreate: (meta: {
        title: string;
        type: string;
        description?: string;
        icon: string;
        /**
         * Absent for a diagram: a whiteboard has no document type, so there is no id
         * to send. Optional rather than a sentinel — a fake id would be looked up
         * somewhere eventually and found missing.
         */
        documentTypeId?: string;
        shape: DocumentShape;
    }) => void;
    /**
     * Presentation only. Given this, "Create Document" hands over the deck's
     * starting point instead of calling `onCreate` — the host creates the row
     * AND asks the generator for a v1 in one step. Without it a presentation
     * falls back to an ordinary `onCreate` with `shape: 'presentation'`, which
     * makes an empty deck the person then fills by hand.
     */
    onCreateFromFixture?: (request: NewPresentationFixtureRequest) => void;
    /**
     * The Documents explorer's search, for "From a project document". The same
     * search the deck editor's source picker uses, so what is offered here is
     * what the generator can actually cite.
     */
    onSearchDocuments?: (query: string) => NewPresentationSource[] | Promise<NewPresentationSource[]>;
    /** Transcripts available to this person, for "From a transcript". */
    recordings?: readonly NewPresentationSource[];
    /** The blank picked when the modal opens (a "New ▾ → Diagram" menu). Default `page`. Since 2.389.7. */
    initialShape?: DocumentShape;
}
/**
 * Make sure a cookbook exists as a real document type, and return it.
 *
 * ## Why this writes to the cache and not to the server
 *
 * The editor populates a new document's sections by looking the type up BY NAME
 * (`DocumentEditorPage`'s template effect), cache first. So the one thing that
 * must have happened by the time we hand the document off is a cache entry —
 * anything slower and the document opens empty, which is the whole failure this
 * flow exists to avoid.
 *
 * The upload is not skipped, it is delegated: `refreshTypesFromServer` already
 * uploads every unmarked cache-only type it finds (that is the remote-first
 * migration), and this modal calls it on every open. So the type syncs on its
 * own, idempotently, without a second write path here that could disagree with
 * the hook's.
 *
 * Matched by name so picking "Meeting Notes" twice does not install it twice.
 */
export declare function ensureCookbookType(cookbook: DocumentTypeCookbook): DocumentType;
export default function NewDocumentModal({ open, onClose, onCreate, onCreateFromFixture, onSearchDocuments, recordings, initialShape, }: NewDocumentModalProps): import("react").JSX.Element | null;
//# sourceMappingURL=NewDocumentModal.d.ts.map