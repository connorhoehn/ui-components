import type { StoryObj } from '@storybook/react-vite';
import { PoolScopedLayout } from './PoolScopedLayout';
declare const meta: {
    title: string;
    component: typeof PoolScopedLayout;
    tags: string[];
    parameters: {
        layout: string;
    };
    args: {
        poolId: string;
        poolName: string;
        onNavigate: (path: string) => void;
        onBack: () => void;
        children: import("react").JSX.Element;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
/** The Users tab — breadcrumb reads Pools / <name> / Users. */
export declare const Users: Story;
export declare const Groups: Story;
export declare const Mfa: Story;
/**
 * No `activeSection`: the breadcrumb stops at the pool name and no tab is
 * selected — the state a pool overview route lands in.
 */
export declare const NoSectionSelected: Story;
//# sourceMappingURL=PoolScopedLayout.stories.d.ts.map