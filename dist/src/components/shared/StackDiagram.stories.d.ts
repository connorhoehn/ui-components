import type { StoryObj } from '@storybook/react-vite';
import StackDiagram, { type StackLayerSpec } from './StackDiagram';
declare const meta: {
    title: string;
    component: typeof StackDiagram;
    tags: string[];
    parameters: {
        layout: string;
    };
    args: {
        layers: StackLayerSpec[];
        orientation: "vertical";
        connector: "arrow";
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Vertical: Story;
export declare const Horizontal: Story;
export declare const LineConnector: Story;
export declare const NoConnectors: Story;
//# sourceMappingURL=StackDiagram.stories.d.ts.map