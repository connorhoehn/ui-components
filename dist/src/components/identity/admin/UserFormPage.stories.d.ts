import type { StoryObj } from '@storybook/react-vite';
import { UserFormPage } from './UserFormPage';
declare const meta: {
    title: string;
    component: typeof UserFormPage;
    tags: string[];
    parameters: {
        layout: string;
    };
    args: {
        isEdit: false;
        poolId: string;
        onSubmit: () => Promise<void>;
        onCancel: () => void;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
/** Create: standard OIDC profile claims only. */
export declare const Create: Story;
/** Edit: the form seeds from `user`, and the password field stays blank. */
export declare const Edit: Story;
/**
 * The pool declares custom attributes, so extra fields are appended and
 * coerced per the declared type before they reach `onSubmit`.
 */
export declare const WithCustomAttributes: Story;
/** Server-side rejection surfaced above the form. */
export declare const WithError: Story;
//# sourceMappingURL=UserFormPage.stories.d.ts.map