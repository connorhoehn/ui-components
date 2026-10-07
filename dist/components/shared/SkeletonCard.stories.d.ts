import type { StoryObj } from '@storybook/react-vite';
import SkeletonCard from './SkeletonCard';
declare const meta: {
    title: string;
    component: typeof SkeletonCard;
    tags: string[];
    parameters: {
        layout: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const Small: Story;
export declare const Tall: Story;
export declare const FixedWidth: Story;
//# sourceMappingURL=SkeletonCard.stories.d.ts.map