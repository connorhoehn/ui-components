import type { StoryObj } from '@storybook/react-vite';
import DropdownMenu from './DropdownMenu';
declare const meta: {
    title: string;
    component: typeof DropdownMenu;
    tags: string[];
    parameters: {
        layout: string;
    };
    argTypes: {
        align: {
            control: "radio";
            options: string[];
        };
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const EndAligned: Story;
export declare const SingleSectionNoLabel: Story;
/**
 * A workflow that doesn't apply right now stays listed — muted, with the
 * reason as its second line and tooltip — so the menu still teaches what
 * exists. It is focusable (screen readers reach it and hear why) but click,
 * Enter and Space do nothing, and a disabled flyout row does not open.
 */
export declare const DisabledItems: Story;
//# sourceMappingURL=DropdownMenu.stories.d.ts.map