import type { VisionPerson } from './types';
export interface PeoplePanelProps {
    people: VisionPerson[];
    /** Highlight a specific person (from a click on the image overlay). */
    highlightedIndex?: number;
    onSelect?: (person: VisionPerson) => void;
    className?: string;
}
/**
 * Per-person detail rows: bbox indicator (badge), demographics chips,
 * activity verb, clothing description. Tight rows so 4-8 people fit
 * without scrolling, expands gracefully for larger groups.
 */
export declare function PeoplePanel({ people, highlightedIndex, onSelect, className }: PeoplePanelProps): import("react/jsx-runtime").JSX.Element | null;
export default PeoplePanel;
//# sourceMappingURL=PeoplePanel.d.ts.map