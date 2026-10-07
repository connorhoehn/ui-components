import type { StoryObj } from '@storybook/react-vite';
import { MfaDashboardPage, type MfaDevice } from './MfaDashboardPage';
declare const meta: {
    title: string;
    component: typeof MfaDashboardPage;
    tags: string[];
    parameters: {
        layout: string;
    };
    args: {
        devices: MfaDevice[];
        userEmail: string;
        mfaEnabled: true;
        onAddDevice: () => void;
        onRenameDevice: () => Promise<void>;
        onRemoveDevice: () => Promise<void>;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
/**
 * Verified and unverified devices side by side — `StatusBadge` maps the
 * boolean onto CONFIRMED / UNCONFIRMED. "Remove" opens a ConfirmDialog.
 */
export declare const WithDevices: Story;
/** No devices enrolled: the EmptyState carries the primary call to action. */
export declare const NoDevices: Story;
/**
 * Enforcement is off at the pool level even though a device exists — the
 * header chip and the device list disagree on purpose.
 */
export declare const EnforcementDisabled: Story;
/** Fetch in flight — the list area is replaced by a loading line. */
export declare const Loading: Story;
//# sourceMappingURL=MfaDashboardPage.stories.d.ts.map