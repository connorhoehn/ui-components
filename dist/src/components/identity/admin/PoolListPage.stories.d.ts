import type { StoryObj } from '@storybook/react-vite';
import { PoolListPage } from './PoolListPage';
declare const meta: {
    title: string;
    component: typeof PoolListPage;
    tags: string[];
    parameters: {
        layout: string;
    };
    args: {
        pools: {
            poolId: string;
            poolName: string;
            clientId: string;
            createdAt: string;
        }[];
        onCreatePool: () => void;
        onEditPool: (id: string) => void;
        onViewPool: (id: string) => void;
        onDeletePool: () => Promise<void>;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
/** Sortable table with view / edit / delete per row. */
export declare const Default: Story;
/**
 * Delete never resolves, so the ConfirmDialog stays open in its pending state
 * ("Deleting…", confirm disabled) — press Delete on any row to see it.
 */
export declare const DeletePending: Story;
/** No pools yet — EntityTable's Card empty state replaces the table. */
export declare const Empty: Story;
export declare const Loading: Story;
//# sourceMappingURL=PoolListPage.stories.d.ts.map