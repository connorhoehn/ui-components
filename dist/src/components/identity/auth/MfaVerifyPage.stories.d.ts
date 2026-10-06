import type { StoryObj } from '@storybook/react-vite';
import { MfaVerifyPage } from './MfaVerifyPage';
declare const meta: {
    title: string;
    component: typeof MfaVerifyPage;
    tags: string[];
    parameters: {
        layout: string;
    };
    args: {
        onVerify: () => Promise<void>;
        onVerifyBackup: () => Promise<void>;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
/**
 * The TOTP challenge — where the page lands when `defaultMode` is omitted.
 * "Use a backup code instead" flips to the backup form.
 */
export declare const Default: Story;
/**
 * The backup-code form, opened directly via `defaultMode` — what a host
 * renders for a user who has already told it they lost their authenticator.
 * The prop is initial-only, so the "use authenticator code instead" link
 * still flips back.
 */
export declare const BackupCodeMode: Story;
/** The backup form carrying a server error from a previous attempt. */
export declare const BackupCodeModeWithError: Story;
/** A server-supplied error, e.g. after a failed POST round-trip. */
export declare const WithServerError: Story;
/**
 * Both verifiers reject, so entering a code surfaces the thrown message as
 * the page's local error.
 */
export declare const RejectsCode: Story;
//# sourceMappingURL=MfaVerifyPage.stories.d.ts.map