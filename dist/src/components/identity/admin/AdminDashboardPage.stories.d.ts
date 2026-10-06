import type { StoryObj } from '@storybook/react-vite';
import { AdminDashboardPage } from './AdminDashboardPage';
declare const meta: {
    title: string;
    component: typeof AdminDashboardPage;
    tags: string[];
    parameters: {
        layout: string;
    };
    args: {
        stats: {
            userPools: number;
            clients: number;
            totalUsers: number;
        };
        pools: {
            poolId: string;
            poolName: string;
            createdAt: string;
        }[];
        onNavigate: (path: string) => void;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
/** Stat cards plus the pool list and its quick-action links. */
export declare const Populated: Story;
/**
 * A brand-new deployment: the stats read zero and the pool list falls back to
 * an EmptyState that points at pool creation.
 */
export declare const FirstRun: Story;
/** Initial fetch — stat cards and the pool card render as pulsing skeletons. */
export declare const Loading: Story;
//# sourceMappingURL=AdminDashboardPage.stories.d.ts.map