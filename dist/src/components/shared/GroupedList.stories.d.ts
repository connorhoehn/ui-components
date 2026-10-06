import type { StoryObj } from '@storybook/react-vite';
import { GroupedList } from './GroupedList';
declare const meta: {
    title: string;
    component: typeof GroupedList;
    tags: string[];
    parameters: {
        layout: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
/** Three groups, one collapsed; the second row is `current`. */
export declare const Directory: Story;
/** Controlled expansion: the host owns which groups are open. */
export declare const Controlled: Story;
/** No menu, no hover actions, no pills — the bare two-line rows. */
export declare const Plain: Story;
/**
 * A checkbox in `leading` (ticking it never opens the row), a `meta` line, and
 * `onReorder`: drag the grip handle, or focus a row and press Alt+↑/↓ (within the
 * group) or Alt+←/→ (to the end of the neighbouring group).
 */
export declare const LeadingMetaReorder: Story;
/** 2.389.0 — time-band groups as section labels, flat rows with no icon, and the current row barred. */
export declare const LabelHeadingsBarCurrent: Story;
//# sourceMappingURL=GroupedList.stories.d.ts.map