import { StoryObj } from '@storybook/react-vite';
import { default as ErrorState } from './ErrorState';
declare const meta: {
    title: string;
    component: typeof ErrorState;
    tags: string[];
    parameters: {
        layout: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Basic: Story;
export declare const WithRetry: Story;
export declare const CustomIcon: Story;
export declare const RichDescription: Story;
//# sourceMappingURL=ErrorState.stories.d.ts.map