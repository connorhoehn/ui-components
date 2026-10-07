import type { StoryObj } from '@storybook/react-vite';
import { NotificationBell } from './NotificationBell';
import type { NotificationItem } from './NotificationCenter';
declare const meta: {
    title: string;
    component: typeof NotificationBell;
    tags: string[];
    parameters: {
        layout: string;
    };
    args: {
        items: never[];
        onItemClick: (item: NotificationItem) => void;
        onMarkAllRead: () => void;
        onClearAll: () => void;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Empty: Story;
export declare const ThreeUnread: Story;
export declare const HundredTwentyUnread: Story;
export declare const HeaderSize: Story;
//# sourceMappingURL=NotificationBell.stories.d.ts.map