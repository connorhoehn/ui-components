import type { StoryObj } from '@storybook/react-vite';
import { UserMenu } from './UserMenu';
declare const meta: {
    title: string;
    component: typeof UserMenu;
    tags: string[];
    parameters: {
        layout: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const WithAvatarUrl: Story;
export declare const MinimalItems: Story;
//# sourceMappingURL=UserMenu.stories.d.ts.map