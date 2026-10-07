import type { StoryObj } from '@storybook/react-vite';
import { MfaSetupPage } from './MfaSetupPage';
declare const verifyOk: () => Promise<{
    success: boolean;
    backupCodes?: string[];
}>;
declare const meta: {
    title: string;
    component: typeof MfaSetupPage;
    tags: string[];
    parameters: {
        layout: string;
    };
    args: {
        userEmail: string;
        onSetup: () => Promise<{
            deviceId: string;
            qrCode: string;
            secret: string;
            backupCodes: string[];
        }>;
        onVerify: typeof verifyOk;
        onComplete: () => void;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
/**
 * The happy path from step 1. The page owns its own step state, so walk it:
 * name the device → scan/secret → enter any 6 digits → backup codes.
 */
export declare const HappyPath: Story;
/**
 * Step 2 rendered directly via `initialStep` + `initialSetupResult` — the
 * payload a host already holds when it resumes a half-finished enrolment.
 * Initial-only, so Back/Continue still walk the wizard from here.
 */
export declare const ScanStep: Story;
/** Step 3 rendered directly — the 6-digit confirmation. */
export declare const VerifyStep: Story;
/** Step 4 rendered directly — the backup-code grid and the copy-all action. */
export declare const BackupStep: Story;
/**
 * Verification always fails, so step 3 stays put and shows the inline error.
 * (The step is internal state — enter 6 digits to reach it.)
 */
export declare const VerificationRejected: Story;
/** The enrolment call itself fails, so step 1 never advances. */
export declare const EnrolmentFails: Story;
/** Anonymous enrolment — no email subtitle under the heading. */
export declare const WithoutEmail: Story;
//# sourceMappingURL=MfaSetupPage.stories.d.ts.map