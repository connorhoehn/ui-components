import type { StoryObj } from '@storybook/react-vite';
import { TreeView } from './TreeView';
declare const meta: {
    title: string;
    component: typeof TreeView;
    tags: string[];
    parameters: {
        layout: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Interactive: Story;
export declare const WithReorder: Story;
/**
 * The Documents explorer: file-kind marks, the version revealed on hover or
 * focus, and a ⋯ menu per file (Version, Rename, Move, View details). Focus a
 * row and press Shift+F10 — or right-click it — to open the same menu.
 */
export declare const HoverMetaAndRowMenu: Story;
//# sourceMappingURL=TreeView.stories.d.ts.map