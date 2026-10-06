import { type PresentationSourceOption } from './SlideSources';
import { type DeckSlide } from './deckSpec';
export interface SlideFormProps {
    slide: DeckSlide;
    onChange: (slide: DeckSlide) => void;
    sources: readonly PresentationSourceOption[];
    onSearchSources?: (query: string) => PresentationSourceOption[] | Promise<PresentationSourceOption[]>;
    readOnly?: boolean;
    /**
     * Render the citation picker at the foot of the form. Default true. The
     * editor turns it off when the sources sit in their own compact row outside
     * a collapsed form — Save depends on them, so they cannot be folded away.
     */
    showSources?: boolean;
    /**
     * Render the speaker-notes field. Default true. The editor turns it off when
     * the notes have their own pane under the stage (`SpeakerNotes`), so the
     * same field is not editable in two places at once.
     */
    showNotes?: boolean;
    testIdPrefix: string;
}
export declare function SlideForm({ slide, onChange, sources, onSearchSources, readOnly, showSources, showNotes, testIdPrefix, }: SlideFormProps): import("react").JSX.Element;
export default SlideForm;
//# sourceMappingURL=SlideForm.d.ts.map