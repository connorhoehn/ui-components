import type { StoryObj } from '@storybook/react-vite';
import { TopNav } from './TopNav';
declare const meta: {
    title: string;
    component: typeof TopNav;
    tags: string[];
    parameters: {
        layout: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const WithBadgesAndRightSlot: Story;
export declare const WithOverflow: Story;
export declare const SubNav: Story;
/**
 * The pattern the two variants exist for: a primary row in the 53px header
 * (`pill`) and a section row in the content column under it (`underline`).
 *
 * The rows do NOT share a left edge and cannot — the header is anchored to the
 * window, the section strip to the content column, and the content column
 * moves when a sidebar collapses. What makes them read as a pair instead is
 * everything else: one item box (h-9 / px-3 / gap-1), one type scale, and an
 * active treatment that is unmistakably louder on the row above.
 */
export declare const StackedRows: Story;
//# sourceMappingURL=TopNav.stories.d.ts.map