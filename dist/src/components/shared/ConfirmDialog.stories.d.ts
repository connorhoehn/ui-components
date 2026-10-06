import type { StoryObj } from '@storybook/react-vite';
import ConfirmDialog from './ConfirmDialog';
declare const meta: {
    title: string;
    component: typeof ConfirmDialog;
    tags: string[];
    parameters: {
        layout: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Info: Story;
export declare const Destructive: Story;
export declare const Caution: Story;
export declare const ConfirmDisabled: Story;
//# sourceMappingURL=ConfirmDialog.stories.d.ts.map