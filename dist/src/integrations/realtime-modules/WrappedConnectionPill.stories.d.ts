import type { StoryObj } from '@storybook/react-vite';
import { WrappedConnectionPill } from './WrappedConnectionPill';
declare const meta: {
    title: string;
    component: typeof WrappedConnectionPill;
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
export declare const Connected: Story;
export declare const Connecting: Story;
export declare const Reconnecting: Story;
export declare const Disconnected: Story;
export declare const Idle: Story;
export declare const CompactDotOnly: Story;
//# sourceMappingURL=WrappedConnectionPill.stories.d.ts.map