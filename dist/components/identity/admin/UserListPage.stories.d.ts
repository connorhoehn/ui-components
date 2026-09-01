import type { StoryObj } from '@storybook/react-vite';
import { UserListPage } from './UserListPage';
declare const meta: {
    title: string;
    component: typeof UserListPage;
    tags: string[];
    parameters: {
        layout: string;
    };
    args: {
        users: ({
            userId: string;
            email: string;
            givenName: string;
            familyName: string;
            status: string;
            createdAt: string;
        } | {
            userId: string;
            email: string;
            givenName: string;
            status: string;
            createdAt: string;
            familyName?: undefined;
        } | {
            userId: string;
            email: string;
            status: string;
            createdAt: string;
            givenName?: undefined;
            familyName?: undefined;
        })[];
        poolId: string;
        poolName: string;
        onCreateUser: () => void;
        onEditUser: (id: string) => void;
        onDeleteUser: () => Promise<void>;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
/**
 * A spread of lifecycle states, so every StatusBadge tone appears at once —
 * including users with partial or missing names.
 */
export declare const MixedStatuses: Story;
/** Every user confirmed — the steady state for a mature pool. */
export declare const AllConfirmed: Story;
export declare const Empty: Story;
export declare const Loading: Story;
//# sourceMappingURL=UserListPage.stories.d.ts.map