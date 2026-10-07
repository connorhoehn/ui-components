import type { StoryObj } from '@storybook/react-vite';
import { ContextColumn } from './ContextColumn';
declare const meta: {
    title: string;
    component: typeof ContextColumn;
    parameters: {
        layout: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
/** The ordinary tabbed column. */
export declare const Tabbed: Story;
/** A bare, wide panel: Start a call. */
export declare const BareDrawerWide: Story;
/** A bare panel at the drawer width: Call settings. */
export declare const BareDrawer: Story;
export declare const BareDrawerDark: Story;
/** A toast while Call settings is open: it sits left of the column, not over the drawer. */
export declare const ToastsClearOfColumn: Story;
export declare const ToastsClearOfColumnDark: Story;
//# sourceMappingURL=ContextColumn.stories.d.ts.map