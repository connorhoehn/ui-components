import { VisionPerson } from './types';
export interface PeoplePanelProps {
    people: VisionPerson[];
    /** Highlight a specific person (from a click on the image overlay). */
    highlightedIndex?: number;
    onSelect?: (person: VisionPerson) => void;
    className?: string;
}
/**
 * Per-person detail rows.
 */
export declare function PeoplePanel({ people, highlightedIndex, onSelect, className }: PeoplePanelProps): import("react").JSX.Element | null;
export default PeoplePanel;
//# sourceMappingURL=PeoplePanel.d.ts.map