import { StoryObj } from '@storybook/react-vite';
import { WrappedChatPanel } from './WrappedChatPanel';
declare const meta: {
    title: string;
    component: typeof WrappedChatPanel;
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
export declare const Empty: Story;
export declare const WithMessages: Story;
export declare const WithTypingFromPresence: Story;
export declare const WithTypingOverride: Story;
export declare const Disabled: Story;
//# sourceMappingURL=WrappedChatPanel.stories.d.ts.map