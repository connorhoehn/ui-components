import type { StoryObj } from '@storybook/react-vite';
import BaseNode from './BaseNode';
declare const meta: {
    title: string;
    component: typeof BaseNode;
    tags: string[];
    parameters: {
        layout: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const WithCategory: Story;
export declare const CategoryMatrix: StoryObj;
export declare const CategoryShapes: StoryObj;
export declare const BackCompatNoCategory: StoryObj;
//# sourceMappingURL=BaseNode.stories.d.ts.map