import type { StoryObj } from '@storybook/react-vite';
import type { RMConversationCallSource } from './conversationCallTypes';
declare const noop: () => void;
declare const meta: {
    title: string;
    component: import("./ConversationCallDock").ConversationCallDockComponent;
    tags: string[];
    parameters: {
        layout: string;
        docs: {
            description: {
                component: string;
            };
        };
    };
    args: {
        title: string;
        onOpenPeople: typeof noop;
        call: RMConversationCallSource;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Live: Story;
export declare const Calling: Story;
export declare const Ended: Story;
export declare const Failed: Story;
export declare const IncomingRing: Story;
//# sourceMappingURL=ConversationCallDock.stories.d.ts.map