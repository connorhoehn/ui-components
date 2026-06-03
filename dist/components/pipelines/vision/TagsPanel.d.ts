export interface TagsPanelProps {
    tags: string[];
    onTagClick?: (tag: string) => void;
    className?: string;
}
/**
 * Wrap-flow chip cloud for vision tags. Optional click handler enables
 * tag-filter navigation downstream (e.g. "find all images tagged 'beach'").
 */
export declare function TagsPanel({ tags, onTagClick, className }: TagsPanelProps): import("react/jsx-runtime").JSX.Element | null;
export default TagsPanel;
//# sourceMappingURL=TagsPanel.d.ts.map