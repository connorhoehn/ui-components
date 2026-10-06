import type { StoryObj } from '@storybook/react-vite';
import { Wizard } from './Wizard';
declare const meta: {
    title: string;
    component: typeof Wizard;
    tags: string[];
    parameters: {
        layout: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Interactive: Story;
export declare const BlockedStep: Story;
//# sourceMappingURL=Wizard.stories.d.ts.map