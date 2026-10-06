import type { StoryObj } from '@storybook/react-vite';
import ConnectionPill from './ConnectionPill';
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
/** `tone="code"` for the pill in terminal / debugger chrome. A wrapper
 *  `className` could not do this: the colours live on the dot and label,
 *  which the caller never sees. */
export declare const CodeTone: Story;
//# sourceMappingURL=ConnectionPill.stories.d.ts.map