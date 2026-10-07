import type { StoryObj } from '@storybook/react-vite';
import { ConversationList, type ConversationItem } from './ConversationList';
declare const meta: {
    title: string;
    component: typeof ConversationList;
    tags: string[];
    args: {
        items: ConversationItem[];
        onSelect: () => void;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
/** Light inbox with unread badges, presence dots and a group row. */
export declare const Inbox: Story;
/** Dark tone on call chrome — the CallSidePanel / call-settings host. */
export declare const DarkTone: Story;
/** Empty inbox — default copy plus the "+ New chat" affordance. */
export declare const Empty: Story;
/** Custom empty label, no new-chat affordance. */
export declare const EmptyCustomLabel: Story;
//# sourceMappingURL=ConversationList.stories.d.ts.map