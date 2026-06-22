import { StoryObj } from '@storybook/react-vite';
import { default as ConnectionPill } from './ConnectionPill';
declare const meta: {
    title: string;
    component: typeof ConnectionPill;
    tags: string[];
    parameters: {
        layout: string;
    };
    argTypes: {
        state: {
            control: "radio";
            options: string[];
        };
        compact: {
            control: "boolean";
        };
        withLabel: {
            control: "boolean";
        };
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Idle: Story;
export declare const Connecting: Story;
export declare const Connected: Story;
export declare const Reconnecting: Story;
export declare const Disconnected: Story;
export declare const Compact: Story;
export declare const CustomLabels: Story;
export declare const AllStates: Story;
//# sourceMappingURL=ConnectionPill.stories.d.ts.map