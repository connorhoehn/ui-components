import type { StoryObj } from '@storybook/react-vite';
import { Drawer } from './Drawer';
declare const meta: {
    title: string;
    component: typeof Drawer;
    tags: string[];
    parameters: {
        layout: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Interactive: Story;
/** The same chrome, docked in the layout: no portal, no backdrop. */
export declare const Docked: Story;
/**
 * 2.391.0: a docked panel never outgrows its column. The 400px drawer sits in
 * a 320px column and FILLS it — its × and body stay inside — and the header
 * can drop its rule and take a bigger title (the call drawers' look).
 */
export declare const DockedFillsNarrowColumn: Story;
export declare const DockedFillsNarrowColumnDark: Story;
//# sourceMappingURL=Drawer.stories.d.ts.map