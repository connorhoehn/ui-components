import type { StoryObj } from '@storybook/react-vite';
import { SetupGuidePage } from './SetupGuidePage';
declare const meta: {
    title: string;
    component: typeof SetupGuidePage;
    tags: string[];
    parameters: {
        layout: string;
    };
    args: {
        status: {
            smtpConfigured: boolean;
            issuer: string;
            issuerConfigured: boolean;
            hasUserPools: boolean;
            poolCount: number;
            firstPoolId: string;
            hasClients: boolean;
            clientCount: number;
            firstClientId: string;
            hasAdminUser: boolean;
            totalUsers: number;
            adminEmails: string[];
        };
        onNavigate: (path: string) => void;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
/** Halfway: pool, application and admin user done; SMTP and issuer outstanding. */
export declare const PartiallyComplete: Story;
/** A brand-new deployment — nothing done, every step actionable. */
export declare const NothingConfigured: Story;
/** Every step satisfied, including a real issuer and discovery document. */
export declare const FullyConfigured: Story;
/**
 * Production issuer and SMTP are set, but no pool exists yet — an ordering
 * the checklist has to tolerate rather than assume away.
 */
export declare const InfrastructureOnly: Story;
//# sourceMappingURL=SetupGuidePage.stories.d.ts.map