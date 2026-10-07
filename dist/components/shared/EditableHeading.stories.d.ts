import type { StoryObj } from '@storybook/react-vite';
import { EditableHeading } from './EditableHeading';
declare const meta: {
    title: string;
    component: typeof EditableHeading;
    parameters: {
        layout: string;
    };
    args: {
        value: string;
        onCommit: () => void;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const Large: Story;
export declare const ReadOnly: Story;
export declare const Dark: Story;
//# sourceMappingURL=EditableHeading.stories.d.ts.map