import type { StoryObj } from '@storybook/react-vite';
import { NotificationCenter, type NotificationItem } from './NotificationCenter';
declare const meta: {
    title: string;
    component: typeof NotificationCenter;
    tags: string[];
    parameters: {
        layout: string;
    };
    args: {
        onItemClick: (item: NotificationItem) => void;
        onMarkAllRead: () => void;
        onClearAll: () => void;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Empty: Story;
export declare const WithUnread: Story;
export declare const AllRead: Story;
export declare const SingleUnread: Story;
//# sourceMappingURL=NotificationCenter.stories.d.ts.map