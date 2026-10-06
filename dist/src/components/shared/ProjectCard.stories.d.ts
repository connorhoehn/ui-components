import type { StoryObj } from '@storybook/react-vite';
import { ProjectCard } from './ProjectCard';
declare const meta: {
    title: string;
    component: typeof ProjectCard;
    tags: string[];
    parameters: {
        layout: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Active: Story;
export declare const Paused: Story;
//# sourceMappingURL=ProjectCard.stories.d.ts.map