import type { StoryObj } from '@storybook/react-vite';
import { FilterPopover } from './FilterPopover';
declare const meta: {
    title: string;
    component: typeof FilterPopover;
    tags: string[];
    parameters: {
        layout: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
/** One filter active: the button carries a count badge. Click it. */
export declare const WithActiveCount: Story;
/** Nothing active, no clear row. */
export declare const Idle: Story;
/** Controlled open, so the panel is visible without a click. */
export declare const OpenPanel: Story;
//# sourceMappingURL=FilterPopover.stories.d.ts.map