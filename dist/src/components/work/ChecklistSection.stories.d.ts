import type { StoryObj } from '@storybook/react-vite';
import { ChecklistSection } from './ChecklistSection';
declare const meta: {
    title: string;
    component: typeof ChecklistSection;
    tags: string[];
    parameters: {
        layout: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const Empty: Story;
export declare const PendingItem: Story;
export declare const ReadOnly: Story;
export declare const Dark: Story;
//# sourceMappingURL=ChecklistSection.stories.d.ts.map