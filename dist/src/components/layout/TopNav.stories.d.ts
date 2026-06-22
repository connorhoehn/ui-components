import { StoryObj } from '@storybook/react-vite';
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
//# sourceMappingURL=TopNav.stories.d.ts.map