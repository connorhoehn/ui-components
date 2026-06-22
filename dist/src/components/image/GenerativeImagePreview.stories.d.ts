import { StoryObj } from '@storybook/react-vite';
import { GenerativeImagePreview } from './GenerativeImagePreview';
declare const meta: {
    title: string;
    component: typeof GenerativeImagePreview;
    tags: string[];
    parameters: {
        layout: string;
    };
    argTypes: {
        status: {
            control: "radio";
            options: string[];
        };
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Synthesizing: Story;
export declare const SynthesizingWithElapsed: Story;
export declare const Done: Story;
export declare const SynthesizingToDone: StoryObj;
export declare const NodeBodySize: Story;
//# sourceMappingURL=GenerativeImagePreview.stories.d.ts.map