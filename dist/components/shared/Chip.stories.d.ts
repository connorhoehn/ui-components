import type { StoryObj } from '@storybook/react-vite';
import Chip from './Chip';
declare const meta: {
    title: string;
    component: typeof Chip;
    tags: string[];
    parameters: {
        layout: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const SoftSuccess: Story;
export declare const SoftDanger: Story;
export declare const SolidInfo: Story;
export declare const Tiny: Story;
export declare const MonoCount: Story;
//# sourceMappingURL=Chip.stories.d.ts.map