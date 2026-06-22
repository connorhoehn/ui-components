import { StoryObj } from '@storybook/react-vite';
import { WrappedPresencePanel } from './WrappedPresencePanel';
declare const meta: {
    title: string;
    component: typeof WrappedPresencePanel;
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
export declare const FiveUsers: Story;
export declare const WithTyping: Story;
export declare const NoCurrentUser: Story;
//# sourceMappingURL=WrappedPresencePanel.stories.d.ts.map