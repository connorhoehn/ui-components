import { StoryObj } from '@storybook/react-vite';
import { ChannelHeader } from './ChannelHeader';
declare const meta: {
    title: string;
    component: typeof ChannelHeader;
    tags: string[];
    parameters: {
        layout: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Basic: Story;
export declare const WithDescription: Story;
export declare const WithOnlineIndicator: Story;
export declare const Offline: Story;
export declare const WithActions: Story;
//# sourceMappingURL=ChannelHeader.stories.d.ts.map