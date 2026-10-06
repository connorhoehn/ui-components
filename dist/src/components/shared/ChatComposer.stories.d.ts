import type { StoryObj } from '@storybook/react-vite';
import { ChatComposer } from './ChatComposer';
declare const meta: {
    title: string;
    component: typeof ChatComposer;
    tags: string[];
    parameters: {
        layout: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const SingleLine: Story;
export declare const Multiline: Story;
export declare const Disabled: Story;
//# sourceMappingURL=ChatComposer.stories.d.ts.map