import type { StoryObj } from '@storybook/react-vite';
import { Highlight } from './Highlight';
declare const meta: {
    title: string;
    component: typeof Highlight;
    tags: string[];
    args: {
        text: string;
        terms: string[];
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const NoMatch: Story;
export declare const Dark: Story;
//# sourceMappingURL=Highlight.stories.d.ts.map