import { type LinkRow } from './linksText';
export interface LinksBlockProps {
    rows: readonly LinkRow[];
    /** False renders the list as anchors only — no editing. */
    editable?: boolean;
    onLabelChange?: (index: number, label: string) => void;
    onUrlChange?: (index: number, url: string) => void;
    onRemoveRow?: (index: number) => void;
    onAddRow?: () => void;
    /** Takes the whole block off the page. Omitted when not editable. */
    onRemove?: () => void;
    'data-testid'?: string;
}
export declare function LinksBlock({ rows, editable, onLabelChange, onUrlChange, onRemoveRow, onAddRow, onRemove, 'data-testid': testId, }: LinksBlockProps): import("react").JSX.Element;
export default LinksBlock;
//# sourceMappingURL=LinksBlock.d.ts.map