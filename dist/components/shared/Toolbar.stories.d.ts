import type { StoryObj } from '@storybook/react-vite';
import { Toolbar } from './Toolbar';
declare const meta: {
    title: string;
    component: typeof Toolbar;
    tags: string[];
    parameters: {
        layout: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const WithStatusLabel: Story;
export declare const Medium: Story;
export declare const CodeTone: Story;
//# sourceMappingURL=Toolbar.stories.d.ts.map