import type { StoryObj } from '@storybook/react-vite';
import { OutcomeSection } from './OutcomeSection';
declare const meta: {
    title: string;
    component: typeof OutcomeSection;
    tags: string[];
    parameters: {
        layout: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const Empty: Story;
export declare const ReadOnly: Story;
export declare const Pending: Story;
export declare const Dark: Story;
//# sourceMappingURL=OutcomeSection.stories.d.ts.map