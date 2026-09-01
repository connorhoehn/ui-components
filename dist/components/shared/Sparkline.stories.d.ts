import type { StoryObj } from '@storybook/react-vite';
import Sparkline from './Sparkline';
declare const meta: {
    title: string;
    component: typeof Sparkline;
    tags: string[];
    parameters: {
        layout: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const Falling: Story;
export declare const Wide: Story;
export declare const Empty: Story;
//# sourceMappingURL=Sparkline.stories.d.ts.map