import type { StoryObj } from '@storybook/react-vite';
import { DiagnosticsPage } from './DiagnosticsPage';
declare const meta: {
    title: string;
    component: typeof DiagnosticsPage;
    tags: string[];
    parameters: {
        layout: string;
    };
    args: {
        diagnostics: {
            node: {
                id: string;
                region: string;
                uptimeSeconds: number;
            };
            version: string;
            storage: {
                driver: string;
                table: string;
                healthy: boolean;
            };
            oidc: {
                issuer: string;
                jwksKeys: number;
                activeSessions: number;
            };
        };
        rates: {
            'login:global': {
                limit: number;
                remaining: number;
                windowSeconds: number;
            };
            'login:per-ip': {
                limit: number;
                remaining: number;
                windowSeconds: number;
            };
            'mfa:verify': {
                limit: number;
                remaining: number;
                windowSeconds: number;
            };
            'token:refresh': {
                limit: number;
                remaining: number;
                windowSeconds: number;
            };
        };
        dlq: ({
            id: string;
            payload: {
                type: string;
                templateId: string;
                to: string;
                userId?: undefined;
            };
            error: string;
            failedAt: string;
            retryCount: number;
        } | {
            id: string;
            payload: {
                templateId?: undefined;
                to?: undefined;
                type: string;
                userId: string;
            };
            error: string;
            failedAt: string;
            retryCount: number;
        })[];
        onRedrive: () => Promise<void>;
        onPurge: () => Promise<void>;
        onRefresh: () => void;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
/** Node info, rate-limiter counters, and two messages parked in the DLQ. */
export declare const Default: Story;
/** The healthy steady state: nothing in the dead-letter queue. */
export declare const EmptyDlq: Story;
/** No rate-limiter data reported — the table falls back to a message. */
export declare const NoRateData: Story;
/**
 * Every data prop is optional; this is what the page renders before the
 * first fetch resolves.
 */
export declare const NoDataYet: Story;
//# sourceMappingURL=DiagnosticsPage.stories.d.ts.map