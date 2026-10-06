import type { StoryObj } from '@storybook/react-vite';
import { MessageBubble } from './MessageBubble';
declare const meta: {
    title: string;
    component: typeof MessageBubble;
    tags: string[];
    parameters: {
        layout: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Conversation: Story;
export declare const Streaming: Story;
//# sourceMappingURL=MessageBubble.stories.d.ts.map