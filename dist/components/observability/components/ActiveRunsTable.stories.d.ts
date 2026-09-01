import type { StoryObj } from '@storybook/react-vite';
import ActiveRunsTable, { type ActiveRunRow } from './ActiveRunsTable';
declare const meta: {
    title: string;
    component: typeof ActiveRunsTable;
    tags: string[];
    parameters: {
        layout: string;
    };
    args: {
        runs: ActiveRunRow[];
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
/** Read-only: rows are inert until the host wires `onRowClick`. */
export declare const ReadOnly: Story;
/** Rows become activatable by click, Enter, or Space. */
export declare const Navigable: Story;
/**
 * With `onCancelRun` a per-row cancel control appears; it stops propagation so
 * cancelling never also navigates.
 */
export declare const Cancellable: Story;
/** Idle cluster. */
export declare const Empty: Story;
/** One long-running job — the common "why is this stuck" view. */
export declare const SingleStuckRun: Story;
//# sourceMappingURL=ActiveRunsTable.stories.d.ts.map