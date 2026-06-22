import { StoryObj } from '@storybook/react-vite';
import { StatusPill } from './StatusPill';
declare const meta: {
    title: string;
    component: typeof StatusPill;
    tags: string[];
    parameters: {
        layout: string;
    };
    argTypes: {
        state: {
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
export declare const Success: Story;
export declare const Error: Story;
export declare const Warning: Story;
export declare const Info: Story;
export declare const Neutral: Story;
export declare const Pending: Story;
export declare const Small: Story;
export declare const WithIcon: Story;
export declare const AllStates: StoryObj;
export declare const AllStatesSm: StoryObj;
//# sourceMappingURL=StatusPill.stories.d.ts.map