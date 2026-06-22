import { StoryObj } from '@storybook/react-vite';
import { default as StandaloneTiptap } from './StandaloneTiptap';
declare const meta: {
    title: string;
    component: typeof StandaloneTiptap;
    tags: string[];
    parameters: {
        layout: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const ReadOnlySurface: Story;
export declare const NamedFragment: Story;
export declare const BootstrapDescription: Story;
//# sourceMappingURL=StandaloneTiptap.stories.d.ts.map