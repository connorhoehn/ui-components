import type { StoryObj } from '@storybook/react-vite';
import EventRow from './EventRow';
declare const meta: {
    title: string;
    component: typeof EventRow;
    tags: string[];
    parameters: {
        layout: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Info: Story;
export declare const Warning: Story;
export declare const Error: Story;
export declare const Selected: Story;
export declare const Clickable: Story;
//# sourceMappingURL=EventRow.stories.d.ts.map