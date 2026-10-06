import type { StoryObj } from '@storybook/react-vite';
import { EntityCell } from './EntityCell';
declare const meta: {
    title: string;
    component: typeof EntityCell;
    tags: string[];
    parameters: {
        layout: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const AsLink: Story;
//# sourceMappingURL=EntityCell.stories.d.ts.map