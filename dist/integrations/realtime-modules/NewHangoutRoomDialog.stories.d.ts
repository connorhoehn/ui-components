import type { StoryObj } from '@storybook/react-vite';
import { NewHangoutRoomDialog } from './NewHangoutRoomDialog';
declare const meta: {
    title: string;
    component: typeof NewHangoutRoomDialog;
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
export declare const Open: Story;
export declare const DefaultPrivate: Story;
export declare const ServerError: Story;
//# sourceMappingURL=NewHangoutRoomDialog.stories.d.ts.map