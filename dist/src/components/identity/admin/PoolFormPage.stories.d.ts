import type { StoryObj } from '@storybook/react-vite';
import { PoolFormPage } from './PoolFormPage';
declare const meta: {
    title: string;
    component: typeof PoolFormPage;
    tags: string[];
    parameters: {
        layout: string;
    };
    args: {
        isEdit: false;
        onSubmit: () => Promise<void>;
        onCancel: () => void;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
/** Create: empty name, MFA off, and the default password policy. */
export declare const Create: Story;
/**
 * Edit: the form seeds its state from `pool` on mount, so a stricter policy
 * and two custom attributes come through pre-filled.
 */
export declare const Edit: Story;
/** A server-side failure surfaced above the form. */
export declare const WithError: Story;
/**
 * Submit never resolves — press Save and the buttons stay in their pending
 * state instead of flicking back.
 */
export declare const SubmitPending: Story;
//# sourceMappingURL=PoolFormPage.stories.d.ts.map