import { type DeckSource } from './deckSpec';
/** One row the host's Documents search can return. */
export interface PresentationSourceOption {
    documentId: string;
    title: string;
    /** How the host would open it — a document page, or a recording transcript. */
    kind?: 'document' | 'transcript';
}
export interface SlideSourcesProps {
    /** The citations already on the slide. */
    sources: readonly DeckSource[];
    onChange: (sources: DeckSource[]) => void;
    /**
     * What the deck already has to hand — the run's own inputs. Offered before
     * anything is typed, because the slide's source is nearly always one of
     * them.
     */
    options: readonly PresentationSourceOption[];
    /** The Documents explorer's search. Absent, only `options` can be picked. */
    onSearchSources?: (query: string) => PresentationSourceOption[] | Promise<PresentationSourceOption[]>;
    readOnly?: boolean;
    /**
     * One line: the chips and a small "Add source" button that opens the
     * search. For the editor's agent layout, where the slide's form is folded
     * away but its citations cannot be — Save depends on them. Default false.
     */
    compact?: boolean;
    testIdPrefix: string;
}
export declare function SlideSources({ sources, onChange, options, onSearchSources, readOnly, compact, testIdPrefix, }: SlideSourcesProps): import("react").JSX.Element;
export default SlideSources;
//# sourceMappingURL=SlideSources.d.ts.map