import type { StoryObj } from '@storybook/react-vite';
import { Tabs } from './Tabs';
declare const meta: {
    title: string;
    component: typeof Tabs;
    tags: string[];
    parameters: {
        layout: string;
    };
    argTypes: {
        variant: {
            control: "radio";
            options: string[];
        };
        size: {
            control: "radio";
            options: string[];
        };
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Underline: Story;
export declare const Pill: Story;
export declare const Segmented: Story;
export declare const Small: Story;
/** `stretch` grows every tab to equal width (`flex-1`) instead of sizing to
 *  its own label — for a tab bar spanning a fixed-width container. */
export declare const Stretch: Story;
export declare const WithBadgeAndDisabled: Story;
export declare const WithTestIds: Story;
/** The container hook, alongside the per-item one. */
export declare const WithContainerTestId: Story;
//# sourceMappingURL=Tabs.stories.d.ts.map