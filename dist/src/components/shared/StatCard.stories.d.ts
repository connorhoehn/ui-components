import type { StoryObj } from '@storybook/react-vite';
import { StatCard } from './StatCard';
declare const meta: {
    title: string;
    component: typeof StatCard;
    tags: string[];
    parameters: {
        layout: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const WithDeltaAndSparkline: Story;
export declare const InvertedTone: Story;
export declare const AsLink: Story;
//# sourceMappingURL=StatCard.stories.d.ts.map