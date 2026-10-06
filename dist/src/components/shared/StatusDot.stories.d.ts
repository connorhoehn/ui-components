import type { StoryObj } from '@storybook/react-vite';
import { StatusDot } from './StatusDot';
declare const meta: {
    title: string;
    component: typeof StatusDot;
    tags: string[];
    parameters: {
        layout: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const DotOnly: Story;
export declare const Labelled: Story;
export declare const Pulsing: Story;
export declare const Sizes: Story;
//# sourceMappingURL=StatusDot.stories.d.ts.map