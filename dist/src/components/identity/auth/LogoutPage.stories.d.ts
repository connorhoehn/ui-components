import type { StoryObj } from '@storybook/react-vite';
import { LogoutPage } from './LogoutPage';
declare const meta: {
    title: string;
    component: typeof LogoutPage;
    tags: string[];
    parameters: {
        layout: string;
    };
    args: {
        onConfirm: () => void;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
/**
 * No `onCancel`, so sign-out is the only way forward — the shape used when
 * the RP has already ended its own session and only the IdP remains.
 */
export declare const ConfirmOnly: Story;
/** Both actions, the usual end-session prompt. */
export declare const WithCancel: Story;
/** Names the relying party being signed out of. */
export declare const ScopedToClient: Story;
//# sourceMappingURL=LogoutPage.stories.d.ts.map