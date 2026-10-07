import type { StoryObj } from '@storybook/react-vite';
import Toast from './Toast';
declare const meta: {
    title: string;
    component: typeof Toast;
    tags: string[];
    parameters: {
        layout: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Info: Story;
export declare const Success: Story;
export declare const Warning: Story;
export declare const Error: Story;
export declare const Exiting: Story;
//# sourceMappingURL=Toast.stories.d.ts.map