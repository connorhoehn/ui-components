import type { StoryObj } from '@storybook/react-vite';
import { InlineMenu } from './InlineMenu';
declare const meta: {
    title: string;
    component: typeof InlineMenu;
    tags: string[];
    parameters: {
        layout: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
/** No portal, no focus trap — the panel is CSS-anchored (`position:
 *  absolute`) inside the `position: relative` wrapper the trigger lives
 *  in, and simply unmounts on close. Compare to `InlinePopover`, which
 *  portals and traps focus for panels that need to escape a clipping
 *  ancestor. */
export declare const Interactive: Story;
/** `role="menu"` for a panel whose children are all `menuitem`s. */
export declare const AsMenu: Story;
//# sourceMappingURL=InlineMenu.stories.d.ts.map