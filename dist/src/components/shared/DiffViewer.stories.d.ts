import type { StoryObj } from '@storybook/react-vite';
import { DiffViewer } from './DiffViewer';
declare const meta: {
    title: string;
    component: typeof DiffViewer;
    tags: string[];
    parameters: {
        layout: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const WithAnnotations: Story;
export declare const Plain: Story;
export declare const Collapsed: Story;
//# sourceMappingURL=DiffViewer.stories.d.ts.map