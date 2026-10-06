import type { StoryObj } from '@storybook/react-vite';
import CodeEditor from './CodeEditor';
declare const meta: {
    title: string;
    component: typeof CodeEditor;
    tags: string[];
    parameters: {
        layout: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Interactive: Story;
export declare const WithVariablePills: Story;
export declare const ReadOnly: Story;
//# sourceMappingURL=CodeEditor.stories.d.ts.map