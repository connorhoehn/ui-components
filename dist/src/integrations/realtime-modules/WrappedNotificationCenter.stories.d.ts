import { StoryObj } from '@storybook/react-vite';
import { WrappedNotificationCenter } from './WrappedNotificationCenter';
declare const meta: {
    title: string;
    component: typeof WrappedNotificationCenter;
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
export declare const WithUnread: Story;
export declare const AllRead: Story;
export declare const SingleUnread: Story;
//# sourceMappingURL=WrappedNotificationCenter.stories.d.ts.map