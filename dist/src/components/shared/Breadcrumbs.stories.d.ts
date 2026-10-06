import type { StoryObj } from '@storybook/react-vite';
import { Breadcrumbs } from './Breadcrumbs';
declare const meta: {
    title: string;
    component: typeof Breadcrumbs;
    tags: string[];
    parameters: {
        layout: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const TwoLevel: Story;
export declare const Truncated: Story;
export declare const CustomSeparator: Story;
export declare const OverflowMenu: Story;
export declare const GroupCrumbsAreInert: Story;
export declare const HiddenWhenShallow: Story;
//# sourceMappingURL=Breadcrumbs.stories.d.ts.map