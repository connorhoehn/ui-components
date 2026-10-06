import type { StoryObj } from '@storybook/react-vite';
import { ReconnectingShim } from './ReconnectingShim';
declare const meta: {
    title: string;
    component: typeof ReconnectingShim;
    tags: string[];
    parameters: {
        layout: string;
        docs: {
            description: {
                component: string;
            };
        };
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Connecting: Story;
export declare const Reconnecting: Story;
export declare const Disconnected: Story;
export declare const DisconnectedNoRetry: Story;
export declare const Connected: Story;
export declare const Idle: Story;
//# sourceMappingURL=ReconnectingShim.stories.d.ts.map