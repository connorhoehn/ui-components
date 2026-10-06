import type { StoryObj } from '@storybook/react-vite';
import { InlinePanel } from './InlinePanel';
declare const meta: {
    title: string;
    component: typeof InlinePanel;
    tags: string[];
    argTypes: {
        variant: {
            control: "radio";
            options: string[];
        };
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
/** The host reserves the slot's width (here, a fixed-width flex sibling);
 *  `InlinePanel` just fills whatever box it's given. */
export declare const InSidebarSlot: Story;
export declare const Dark: Story;
//# sourceMappingURL=InlinePanel.stories.d.ts.map