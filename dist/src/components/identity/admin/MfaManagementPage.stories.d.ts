import type { StoryObj } from '@storybook/react-vite';
import { MfaManagementPage } from './MfaManagementPage';
declare const meta: {
    title: string;
    component: typeof MfaManagementPage;
    tags: string[];
    parameters: {
        layout: string;
    };
    args: {
        metrics: {
            totalUsers: number;
            mfaEnabled: number;
            mfaDisabled: number;
            adoptionRate: number;
        };
        users: {
            userId: string;
            email: string;
            mfaEnabled: boolean;
            deviceCount: number;
        }[];
        pools: {
            poolId: string;
            poolName: string;
            userCount: number;
        }[];
        onRefresh: () => void;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
/** Adoption metrics, the pool filter, and per-user MFA status. */
export declare const Default: Story;
/** Nobody has enrolled yet — the state that makes the metric worth showing. */
export declare const ZeroAdoption: Story;
/** Enforcement complete. */
export declare const FullAdoption: Story;
/**
 * Every data prop is optional, so the page must render with none of them —
 * the shape it lands in before the first fetch resolves.
 */
export declare const NoDataYet: Story;
//# sourceMappingURL=MfaManagementPage.stories.d.ts.map