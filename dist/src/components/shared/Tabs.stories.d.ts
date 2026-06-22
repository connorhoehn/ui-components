import { StoryObj } from '@storybook/react-vite';
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
export declare const WithBadgeAndDisabled: Story;
//# sourceMappingURL=Tabs.stories.d.ts.map