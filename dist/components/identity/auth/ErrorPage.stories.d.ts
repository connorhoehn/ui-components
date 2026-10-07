import type { StoryObj } from '@storybook/react-vite';
import { ErrorPage } from './ErrorPage';
declare const meta: {
    title: string;
    component: typeof ErrorPage;
    tags: string[];
    parameters: {
        layout: string;
    };
    args: {
        message: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
/** Message only — no actions, so the button row is omitted entirely. */
export declare const Default: Story;
/** The OIDC error code is shown verbatim in a monospace block for support. */
export declare const WithErrorCode: Story;
/** Both recovery paths offered. */
export declare const Recoverable: Story;
/** A terminal error where retrying cannot help — only "Go Back" is offered. */
export declare const AccessDenied: Story;
//# sourceMappingURL=ErrorPage.stories.d.ts.map