import type { StoryObj } from '@storybook/react-vite';
import { FileKindMark } from './FileKindMark';
declare const meta: {
    title: string;
    component: typeof FileKindMark;
    tags: string[];
    parameters: {
        layout: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Page: Story;
/** Every kind at every size, with the name each one stands for. */
export declare const AllKinds: Story;
/** The pipelines directory's kinds (2.380.0), tinted and plain side by side. */
export declare const PipelineKinds: Story;
//# sourceMappingURL=FileKindMark.stories.d.ts.map