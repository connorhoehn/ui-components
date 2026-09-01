import type { StoryObj } from '@storybook/react-vite';
import { AuditPage } from './AuditPage';
declare const meta: {
    title: string;
    component: typeof AuditPage;
    tags: string[];
    parameters: {
        layout: string;
    };
    args: {
        records: ({
            timestamp: number;
            actor: {
                id: string;
                email: string;
            };
            entityType: string;
            entityId: string;
            operation: string;
        } | {
            timestamp: number;
            actor: string;
            entityType: string;
            entityId: string;
            operation: string;
        } | {
            timestamp: number;
            actor: {
                email: string;
                id?: undefined;
            };
            entityType: string;
            entityId: string;
            operation: string;
        })[];
        totalRecords: number;
        onQuery: () => Promise<void>;
        onViewEntity: (type: string, id: string) => void;
        onReplay: () => Promise<Record<string, unknown> | null>;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
/**
 * A mixed log: object actors (id + email), bare string actors for machine
 * principals, and all three operations.
 */
export declare const Default: Story;
/**
 * Point-in-time replay returns no snapshot — the entity did not exist at the
 * requested timestamp. Fill the replay fields and submit to see it.
 */
export declare const ReplayReturnsNothing: Story;
/** No records match the current filters. */
export declare const NoResults: Story;
export declare const Loading: Story;
//# sourceMappingURL=AuditPage.stories.d.ts.map